import type { Project } from '../types/project';

const STORAGE_KEY = 'aistudio_video_project_v1';

export type StoredPayload = {
  version: 1;
  project: Project;
  savedAt: string;
};

export const DEFAULT_PROJECT: Project = {
  id: 'project-default',
  name: 'Dự án video mới',
  width: 1280,
  height: 720,
  fps: 30,
  durationMs: 60000,
  aspectRatio: '16:9',
  clips: [
    {
      id: 'video-1',
      track: 0,
      kind: 'video',
      startMs: 0,
      endMs: 12000,
      label: 'Video chính'
    },
    {
      id: 'bgm-1',
      track: 1,
      kind: 'audio',
      startMs: 0,
      endMs: 15000,
      label: 'Nhạc nền (BGM)'
    },
    {
      id: 'sub-1',
      track: 2,
      kind: 'subtitle',
      startMs: 500,
      endMs: 4000,
      label: 'Phụ đề 1',
      text: 'Chào mừng bạn đến với AI Studio Pro — Video & Vietsub Workspace'
    },
    {
      id: 'sub-2',
      track: 2,
      kind: 'subtitle',
      startMs: 4500,
      endMs: 8500,
      label: 'Phụ đề 2',
      text: 'Tự động lưu dự án, tách giọng nói STT và tạo thuyết minh AI siêu tốc.'
    }
  ]
};

export function loadStoredProject(): { project: Project; savedAt: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredPayload;
    if (data && data.project && Array.isArray(data.project.clips)) {
      return {
        project: {
          ...DEFAULT_PROJECT,
          ...data.project,
          // ensure clips has valid array
          clips: data.project.clips
        },
        savedAt: data.savedAt || new Date().toISOString()
      };
    }
  } catch (err) {
    console.warn('Lỗi đọc dự án từ localStorage:', err);
  }
  return null;
}

export function saveProjectToStorage(project: Project): string {
  try {
    const now = new Date().toISOString();
    const payload: StoredPayload = {
      version: 1,
      project,
      savedAt: now
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return now;
  } catch (err) {
    console.error('Lỗi lưu dự án vào localStorage:', err);
    return new Date().toISOString();
  }
}

export function clearStoredProject(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Lỗi xoá dự án khỏi localStorage:', err);
  }
}

export function exportProjectAsJson(project: Project): void {
  const json = JSON.stringify(project, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = (project.name || 'du-an-video').toLowerCase().replace(/\s+/g, '-');
  a.href = url;
  a.download = `${safeName}-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importProjectFromJson(file: File): Promise<Project> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text) as Project;
        if (!parsed || !Array.isArray(parsed.clips)) {
          throw new Error('Định dạng file dự án JSON không hợp lệ');
        }
        resolve({
          ...DEFAULT_PROJECT,
          ...parsed,
          id: parsed.id || crypto.randomUUID(),
          clips: parsed.clips
        });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Không thể đọc file'));
    reader.readAsText(file);
  });
}
