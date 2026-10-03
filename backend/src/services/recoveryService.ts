export type RecoverySnapshot = {projectId:string; createdAt:number; payload:unknown};
const snapshots = new Map<string, RecoverySnapshot>();
export function saveRecoverySnapshot(projectId:string, payload:unknown) { snapshots.set(projectId,{projectId,createdAt:Date.now(),payload}); }
export function restoreRecoverySnapshot(projectId:string) { return snapshots.get(projectId)?.payload ?? null; }
