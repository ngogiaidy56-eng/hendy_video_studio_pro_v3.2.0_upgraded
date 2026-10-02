import { useEffect, useMemo, useReducer, useRef, useState, useCallback } from 'react';
import { SYSTEM_CONFIG } from './generated/system-config';
import { SystemLayout } from './generated/system-layout';
import './generated/system-theme.css';
import { SystemControlPanel } from './components/system/SystemControlPanel';
import { PwaInstallBanner } from './components/system/PwaInstallBanner';
import { Header } from './components/system/Header';
import { AssetSidebar } from './components/editor/AssetSidebar';
import { CanvasPreview } from './components/editor/CanvasPreview';
import { Timeline } from './components/editor/Timeline';
import { InspectorPanel } from './components/editor/InspectorPanel';
import { MultiChannelAudioMixer } from './components/editor/MultiChannelAudioMixer';
import { ProjectSettingsModal } from './components/editor/ProjectSettingsModal';
import { SubtitleTableModal } from './components/editor/SubtitleTableModal';
import { buildRenderManifest } from './services/renderManifest';
import { api } from './services/api';
import { toAss, toSrt, toVtt, downloadText } from './utils/subtitleExporter';
import { exportCanvasVideo } from './utils/videoRenderer';
import { drawSubtitle, type SubtitleStyle } from './utils/subBurner';
import { generateGeminiTts, transcribeAudioFile, enhanceVietnamese } from './services/ai';
import {
  loadStoredProject,
  saveProjectToStorage,
  DEFAULT_PROJECT
} from './services/projectStorage';
import type { Clip, Project } from './types/project';

type State = {
  project: Project;
  selectedId?: string;
  currentTimeMs: number;
  theme: 'dark' | 'light';
};

type Action =
  | { type: 'select'; id?: string }
  | { type: 'seek'; time: number }
  | { type: 'theme' }
  | { type: 'set_project'; project: Project }
  | { type: 'update_project_meta'; patch: Partial<Project> }
  | { type: 'add_clips'; clips: Clip[] }
  | { type: 'patch_clip'; id: string; patch: Partial<Clip> }
  | { type: 'delete_clip'; id: string }
  | { type: 'split_clip'; id: string; splitAtMs: number }
  | { type: 'duplicate_clip'; id: string }
  | { type: 'add_subtitle_cue'; timeMs: number };

function getInitialState(): State {
  const stored = loadStoredProject();
  return {
    project: stored ? stored.project : DEFAULT_PROJECT,
    selectedId: stored?.project.clips[0]?.id || DEFAULT_PROJECT.clips[0]?.id,
    currentTimeMs: 0,
    theme: 'dark'
  };
}

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'select':
      return { ...s, selectedId: a.id };

    case 'seek':
      return { ...s, currentTimeMs: Math.max(0, a.time) };

    case 'theme':
      return { ...s, theme: s.theme === 'dark' ? 'light' : 'dark' };

    case 'set_project':
      return {
        ...s,
        project: a.project,
        selectedId: a.project.clips[0]?.id,
        currentTimeMs: 0
      };

    case 'update_project_meta':
      return {
        ...s,
        project: {
          ...s.project,
          ...a.patch
        }
      };

    case 'add_clips':
      return {
        ...s,
        project: {
          ...s.project,
          clips: [...s.project.clips, ...a.clips]
        }
      };

    case 'patch_clip':
      return {
        ...s,
        project: {
          ...s.project,
          clips: s.project.clips.map(c => (c.id === a.id ? { ...c, ...a.patch } : c))
        }
      };

    case 'delete_clip':
      return {
        ...s,
        selectedId: s.selectedId === a.id ? undefined : s.selectedId,
        project: {
          ...s.project,
          clips: s.project.clips.filter(c => c.id !== a.id)
        }
      };

    case 'split_clip': {
      const target = s.project.clips.find(c => c.id === a.id);
      if (!target || a.splitAtMs <= target.startMs || a.splitAtMs >= target.endMs) return s;
      const firstPart: Clip = {
        ...target,
        endMs: Math.round(a.splitAtMs),
        label: `${target.label} (Phần 1)`
      };
      const secondPart: Clip = {
        ...target,
        id: crypto.randomUUID(),
        startMs: Math.round(a.splitAtMs),
        label: `${target.label} (Phần 2)`
      };
      return {
        ...s,
        selectedId: secondPart.id,
        project: {
          ...s.project,
          clips: s.project.clips.map(c => (c.id === a.id ? firstPart : c)).concat(secondPart)
        }
      };
    }

    case 'duplicate_clip': {
      const target = s.project.clips.find(c => c.id === a.id);
      if (!target) return s;
      const duration = target.endMs - target.startMs;
      const clone: Clip = {
        ...target,
        id: crypto.randomUUID(),
        label: `${target.label} (Bản sao)`,
        startMs: target.endMs + 200,
        endMs: target.endMs + 200 + duration
      };
      return {
        ...s,
        selectedId: clone.id,
        project: {
          ...s.project,
          clips: [...s.project.clips, clone]
        }
      };
    }

    case 'add_subtitle_cue': {
      const cueStart = Math.round(a.timeMs);
      const cueEnd = cueStart + 3000;
      const count = s.project.clips.filter(c => c.kind === 'subtitle').length;
      const newCue: Clip = {
        id: crypto.randomUUID(),
        track: 2,
        kind: 'subtitle',
        startMs: cueStart,
        endMs: cueEnd,
        label: `Phụ đề ${count + 1}`,
        text: 'Nội dung phụ đề mới'
      };
      return {
        ...s,
        selectedId: newCue.id,
        project: {
          ...s.project,
          clips: [...s.project.clips, newCue]
        }
      };
    }

    default:
      return s;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const [status, setStatus] = useState('CHUẨN (NOMINAL)');
  const [lastSavedAt, setLastSavedAt] = useState<string | undefined>(() => {
    const stored = loadStoredProject();
    return stored?.savedAt;
  });

  // Modal visibility states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSubtitlesOpen, setIsSubtitlesOpen] = useState(false);

  // Undo / Redo stacks
  const undoStackRef = useRef<Project[]>([]);
  const redoStackRef = useRef<Project[]>([]);
  const [historyCount, setHistoryCount] = useState({ undo: 0, redo: 0 });

  const params = useMemo(() => new URLSearchParams(location.search), []);
  const admin = params.get('admin') === 'true';
  const selected = state.project.clips.find(c => c.id === state.selectedId);

  // Auto-save whenever state.project changes
  const saveTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => {
      const savedTime = saveProjectToStorage(state.project);
      setLastSavedAt(savedTime);
    }, 400);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state.project]);

  // Dispatch helper that tracks project history for Undo/Redo
  const dispatchWithHistory = useCallback((action: Action) => {
    const isProjectMutation =
      action.type === 'add_clips' ||
      action.type === 'patch_clip' ||
      action.type === 'delete_clip' ||
      action.type === 'split_clip' ||
      action.type === 'duplicate_clip' ||
      action.type === 'add_subtitle_cue' ||
      action.type === 'update_project_meta';

    if (isProjectMutation) {
      undoStackRef.current.push(JSON.parse(JSON.stringify(state.project)));
      if (undoStackRef.current.length > 30) undoStackRef.current.shift();
      redoStackRef.current = [];
      setHistoryCount({
        undo: undoStackRef.current.length,
        redo: 0
      });
    }

    dispatch(action);
  }, [state.project]);

  const handleUndo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;
    const prev = undoStackRef.current.pop()!;
    redoStackRef.current.push(JSON.parse(JSON.stringify(state.project)));
    setHistoryCount({
      undo: undoStackRef.current.length,
      redo: redoStackRef.current.length
    });
    dispatch({ type: 'set_project', project: prev });
  }, [state.project]);

  const handleRedo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;
    const next = redoStackRef.current.pop()!;
    undoStackRef.current.push(JSON.parse(JSON.stringify(state.project)));
    setHistoryCount({
      undo: undoStackRef.current.length,
      redo: redoStackRef.current.length
    });
    dispatch({ type: 'set_project', project: next });
  }, [state.project]);

  // Global Keyboard Shortcuts (Undo/Redo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  const onUpload = (file: File) => {
    const isAudio = file.type.startsWith('audio/');
    const isVideo = file.type.startsWith('video/');
    const kind = isAudio ? 'audio' : 'video';
    const track = isAudio ? 1 : 0;
    dispatchWithHistory({
      type: 'add_clips',
      clips: [
        {
          id: crypto.randomUUID(),
          track,
          kind,
          startMs: 0,
          endMs: 8000,
          label: file.name
        }
      ]
    });
  };

  const transcribe = async (file: File) => {
    setStatus('ĐANG NHẬN DẠNG…');
    try {
      const r = await transcribeAudioFile(file);
      dispatchWithHistory({
        type: 'add_clips',
        clips: r.cues.map((c, i) => ({
          id: crypto.randomUUID(),
          track: 2,
          kind: 'subtitle' as const,
          startMs: c.startMs,
          endMs: c.endMs,
          label: `Phụ đề ${i + 1}`,
          text: c.text
        }))
      });
      setStatus('CHUẨN (NOMINAL)');
    } catch {
      setStatus('LỖI NHẬN DẠNG (STT)');
    }
  };

  const generateTts = async (clip: Clip) => {
    if (!clip.text) return;
    setStatus('ĐANG TẠO GIỌNG ĐỌC…');
    try {
      const r = await generateGeminiTts(clip.text, {
        voice: 'Kore',
        style: 'natural cinematic Vietnamese narration'
      });
      const bytes = Uint8Array.from(atob(r.base64), c => c.charCodeAt(0));
      const url = URL.createObjectURL(new Blob([bytes], { type: r.mimeType }));
      dispatchWithHistory({
        type: 'add_clips',
        clips: [
          {
            id: crypto.randomUUID(),
            track: 3,
            kind: 'audio',
            startMs: clip.startMs,
            endMs: clip.startMs + Math.max(900, clip.endMs - clip.startMs),
            label: `Giọng đọc · ${clip.label}`,
            assetId: url
          }
        ]
      });
      setStatus('CHUẨN (NOMINAL)');
    } catch {
      setStatus('LỖI GIỌNG ĐỌC (TTS)');
    }
  };

  const enhance = async (clip: Clip) => {
    if (!clip.text) return;
    setStatus('ĐANG TRAU CHUỐT…');
    try {
      const r = await enhanceVietnamese(clip.text);
      dispatchWithHistory({
        type: 'patch_clip',
        id: clip.id,
        patch: { text: r.text }
      });
      setStatus('CHUẨN (NOMINAL)');
    } catch {
      setStatus('LỖI TRAU CHUỐT');
    }
  };

  const optimize = async (channels: Record<string, unknown>) => {
    setStatus('ĐANG TỐI ƯU MIX…');
    try {
      const r = await api<Record<string, unknown>>('/api/gemini/audio-mix', {
        method: 'POST',
        body: JSON.stringify({
          channels: Object.entries(channels).map(([id, v]) => ({ id, ...(v as object) })),
          voicePresent: true
        })
      });
      setStatus('CHUẨN (NOMINAL)');
      return r;
    } catch {
      setStatus('AI NGOẠI TUYẾN');
    }
  };

  const exportSub = (kind: 'srt' | 'vtt' | 'ass') => {
    const cues = state.project.clips
      .filter(c => c.kind === 'subtitle' && c.text)
      .sort((a, b) => a.startMs - b.startMs)
      .map(c => ({
        startMs: c.startMs,
        endMs: c.endMs,
        text: c.text!
      }));
    const text = kind === 'srt' ? toSrt(cues) : kind === 'vtt' ? toVtt(cues) : toAss(cues);
    const safeName = (state.project.name || 'vietsub').toLowerCase().replace(/\s+/g, '-');
    downloadText(text, `${safeName}-${state.project.id.slice(0, 8)}.${kind}`, 'text/plain;charset=utf-8');
  };

  const exportVideo = async () => {
    const canvas = document.querySelector('canvas');
    if (!(canvas instanceof HTMLCanvasElement)) return;
    setStatus('ĐANG XUẤT VIDEO…');
    try {
      const duration = state.project.durationMs;
      const width = state.project.width || 1280;
      const height = state.project.height || 720;

      const blob = await exportCanvasVideo(
        canvas,
        (ctx, timeMs) => {
          // Background
          const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
          bgGrad.addColorStop(0, '#0a0f18');
          bgGrad.addColorStop(1, '#05070c');
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, width, height);

          // Watermark / title header
          ctx.fillStyle = '#22d3ee';
          ctx.font = 'bold 20px Inter, system-ui, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(`🎬 ${state.project.name || 'AI Studio Pro'}`, 30, 45);

          ctx.fillStyle = '#94a3b8';
          ctx.font = '16px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(`${(timeMs / 1000).toFixed(2)}s / ${(duration / 1000).toFixed(1)}s`, width - 30, 45);

          // Subtitle drawing with custom style
          const sub = state.project.clips.find(
            c => c.kind === 'subtitle' && c.startMs <= timeMs && c.endMs >= timeMs && c.text
          );
          if (sub) {
            const style: SubtitleStyle = {
              fontFamily: sub.style?.fontFamily || 'Arial, sans-serif',
              fontSize: sub.style?.fontSize || 42,
              color: sub.style?.color || '#ffffff',
              strokeColor: sub.style?.strokeColor || '#000000',
              strokeWidth: sub.style?.strokeWidth ?? 6,
              bottomPx: sub.style?.bottomPx || 55
            };
            drawSubtitle(ctx, sub.text!, style, width, height);
          }
        },
        duration,
        state.project.fps
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = blob.type.includes('mp4') ? 'mp4' : 'webm';
      const safeName = (state.project.name || 'video-xuat-ban').toLowerCase().replace(/\s+/g, '-');
      a.download = `${safeName}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus('CHUẨN (NOMINAL)');
    } catch {
      setStatus('LỖI XUẤT VIDEO');
    }
  };

  return (
    <SystemLayout>
      <div className="stack">
        <Header
          version={SYSTEM_CONFIG.app?.version || (SYSTEM_CONFIG as any).system?.version || '3.1.0'}
          admin={admin}
          projectName={state.project.name}
          lastSavedAt={lastSavedAt}
          canUndo={historyCount.undo > 0}
          canRedo={historyCount.redo > 0}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenSubtitles={() => setIsSubtitlesOpen(true)}
          actions={
            <>
              <button
                type="button"
                className="button"
                onClick={() => dispatch({ type: 'theme' })}
              >
                {state.theme === 'dark' ? 'GIAO DIỆN SÁNG' : 'GIAO DIỆN TỐI'}
              </button>
              <span className="status">● {status}</span>
            </>
          }
        />

        <div className="workspace">
          {/* Left Panel: Media Assets & Recording & STT */}
          <AssetSidebar
            onUpload={onUpload}
            onRecord={() => setStatus('THU ÂM BỊ CHẶN')}
            onTranscribe={transcribe}
          />

          {/* Center Main Panel: Canvas Video Player & Timeline */}
          <div className="stack">
            <CanvasPreview
              project={state.project}
              currentTimeMs={state.currentTimeMs}
              onSeek={time => dispatch({ type: 'seek', time })}
            />

            <Timeline
              clips={state.project.clips}
              selectedId={state.selectedId}
              currentTimeMs={state.currentTimeMs}
              durationMs={state.project.durationMs}
              onSelect={id => dispatch({ type: 'select', id })}
              onSeek={time => dispatch({ type: 'seek', time })}
              onAddSubtitleAtPlayhead={() =>
                dispatchWithHistory({
                  type: 'add_subtitle_cue',
                  timeMs: state.currentTimeMs
                })
              }
              onSplitClip={(id, splitAtMs) =>
                dispatchWithHistory({ type: 'split_clip', id, splitAtMs })
              }
              onDeleteClip={id =>
                dispatchWithHistory({ type: 'delete_clip', id })
              }
              onDuplicateClip={id =>
                dispatchWithHistory({ type: 'duplicate_clip', id })
              }
            />
          </div>

          {/* Right Panel: Inspector & Multi-Channel Mixer & Exporter */}
          <div className="stack">
            <InspectorPanel
              clip={selected}
              onChange={patch =>
                selected &&
                dispatchWithHistory({
                  type: 'patch_clip',
                  id: selected.id,
                  patch
                })
              }
              onGenerateTts={generateTts}
              onEnhance={enhance}
              onDelete={id => dispatchWithHistory({ type: 'delete_clip', id })}
              onDuplicate={id => dispatchWithHistory({ type: 'duplicate_clip', id })}
            />

            <MultiChannelAudioMixer onAiOptimize={optimize} />

            {/* Export & Render Manifest Section */}
            <section className="panel stack">
              <strong>Xuất bản & Cấu hình dựng</strong>

              <button
                type="button"
                className="button primary"
                onClick={() =>
                  navigator.clipboard?.writeText(
                    JSON.stringify(buildRenderManifest(state.project), null, 2)
                  )
                }
              >
                Sao chép Manifest kết xuất
              </button>

              <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                <button
                  type="button"
                  className="button"
                  onClick={() => exportSub('srt')}
                  title="Xuất file phụ đề SubRip (.srt)"
                >
                  Xuất SRT
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => exportSub('vtt')}
                  title="Xuất file WebVTT (.vtt)"
                >
                  Xuất VTT
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => exportSub('ass')}
                  title="Xuất file Advanced SubStation Alpha (.ass)"
                >
                  Xuất ASS
                </button>
              </div>

              <button
                type="button"
                className="button"
                style={{ fontWeight: 'bold' }}
                onClick={exportVideo}
              >
                Xuất video xem trước (.mp4 / .webm)
              </button>
            </section>
          </div>
        </div>

        {/* Modals */}
        <ProjectSettingsModal
          project={state.project}
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onUpdateProject={patch =>
            dispatchWithHistory({ type: 'update_project_meta', patch })
          }
          onResetProject={() => {
            undoStackRef.current.push(JSON.parse(JSON.stringify(state.project)));
            redoStackRef.current = [];
            dispatch({
              type: 'set_project',
              project: { ...DEFAULT_PROJECT, id: crypto.randomUUID() }
            });
          }}
          onLoadProject={newProject => {
            undoStackRef.current.push(JSON.parse(JSON.stringify(state.project)));
            redoStackRef.current = [];
            dispatch({ type: 'set_project', project: newProject });
          }}
        />

        <SubtitleTableModal
          isOpen={isSubtitlesOpen}
          onClose={() => setIsSubtitlesOpen(false)}
          clips={state.project.clips}
          selectedId={state.selectedId}
          onSelectCue={id => dispatch({ type: 'select', id })}
          onSeek={time => dispatch({ type: 'seek', time })}
          onUpdateCueText={(id, text) =>
            dispatchWithHistory({ type: 'patch_clip', id, patch: { text } })
          }
          onDeleteCue={id => dispatchWithHistory({ type: 'delete_clip', id })}
          onAddCue={() =>
            dispatchWithHistory({
              type: 'add_subtitle_cue',
              timeMs: state.currentTimeMs
            })
          }
        />

        <PwaInstallBanner />
        <SystemControlPanel />
      </div>
    </SystemLayout>
  );
}
