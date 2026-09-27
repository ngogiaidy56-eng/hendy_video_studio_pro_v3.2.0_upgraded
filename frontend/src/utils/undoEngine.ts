const DB = 'hendy-studio';
const STORE = 'snapshots';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => {
      if (!r.result.objectStoreNames.contains(STORE)) {
        r.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
      }
    };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

export async function pushSnapshot(projectId: string, payload: unknown): Promise<void> {
  try {
    const db = await openDb();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).add({
        projectId,
        payload: JSON.parse(JSON.stringify(payload)),
        createdAt: Date.now()
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Could not save undo snapshot to IndexedDB:', err);
  }
}

export async function popPrevious(projectId: string): Promise<unknown | null> {
  try {
    const db = await openDb();
    return new Promise<unknown>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const rows = (req.result || [])
          .filter((x: any) => x.projectId === projectId)
          .sort((a: any, b: any) => b.createdAt - a.createdAt);

        if (rows.length <= 1) {
          // No previous state to undo to
          resolve(rows[0]?.payload ?? null);
          return;
        }

        // Delete top snapshot
        const top = rows[0];
        store.delete(top.id);

        // Return the prior state
        const prior = rows[1];
        resolve(prior.payload);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not pop snapshot from IndexedDB:', err);
    return null;
  }
}

export async function popLatest(projectId: string): Promise<unknown | null> {
  return popPrevious(projectId);
}
