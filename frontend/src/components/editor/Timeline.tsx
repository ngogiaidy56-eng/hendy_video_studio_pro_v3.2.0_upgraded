import React, { useRef } from 'react';
import type { Clip } from '../../types/project';
import { Plus, Scissors, Trash2, Copy } from 'lucide-react';

interface TimelineProps {
  clips: Clip[];
  selectedId?: string;
  currentTimeMs: number;
  durationMs: number;
  onSelect?: (id: string) => void;
  onSeek?: (ms: number) => void;
  onAddSubtitleAtPlayhead?: () => void;
  onSplitClip?: (id: string, splitAtMs: number) => void;
  onDeleteClip?: (id: string) => void;
  onDuplicateClip?: (id: string) => void;
}

const TRACK_CONFIG = [
  { track: 0, label: 'R1: Video', bg: 'linear-gradient(90deg, #1d4ed8, #2563eb)', border: '#3b82f6' },
  { track: 1, label: 'R2: Nhạc (BGM)', bg: 'linear-gradient(90deg, #047857, #059669)', border: '#10b981' },
  { track: 2, label: 'R3: Phụ đề Vietsub', bg: 'linear-gradient(90deg, #b45309, #d97706)', border: '#f59e0b' },
  { track: 3, label: 'R4: Giọng đọc AI (TTS)', bg: 'linear-gradient(90deg, #6d28d9, #7c3aed)', border: '#8b5cf6' },
];

export function Timeline({
  clips,
  selectedId,
  currentTimeMs,
  durationMs,
  onSelect,
  onSeek,
  onAddSubtitleAtPlayhead,
  onSplitClip,
  onDeleteClip,
  onDuplicateClip
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const duration = Math.max(durationMs || 60000, ...clips.map(c => c.endMs));
  const selectedClip = clips.find(c => c.id === selectedId);

  const canSplit = Boolean(
    selectedClip &&
    currentTimeMs > selectedClip.startMs + 200 &&
    currentTimeMs < selectedClip.endMs - 200
  );

  const handleRulerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek?.(ratio * duration);
  };

  // Generate 6 time markers
  const markers = [0, 0.2, 0.4, 0.6, 0.8, 1].map(r => ({
    ratio: r,
    label: `${Math.round((r * duration) / 1000)}s`
  }));

  return (
    <section className="panel stack" style={{ position: 'relative' }}>
      {/* Header & Quick Action Buttons */}
      <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div className="row">
          <strong>Dòng thời gian (Timeline)</strong>
          <span className="muted">{Math.round(duration / 1000)} giây · 4 rãnh đa phương tiện</span>
        </div>

        <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="button"
            style={{ fontSize: 11, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 4, background: '#1e293b' }}
            onClick={onAddSubtitleAtPlayhead}
            title="Thêm phụ đề ngay tại thời điểm đang phát"
          >
            <Plus size={13} color="#f59e0b" /> + Phụ đề tại điểm phát
          </button>

          {selectedClip && (
            <>
              <button
                type="button"
                className="button"
                disabled={!canSplit}
                style={{ fontSize: 11, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 4 }}
                onClick={() => canSplit && onSplitClip?.(selectedClip.id, currentTimeMs)}
                title="Tách clip được chọn tại vị trí phát hiện tại"
              >
                <Scissors size={13} color="#22d3ee" /> Tách clip
              </button>

              <button
                type="button"
                className="button"
                style={{ fontSize: 11, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 4 }}
                onClick={() => onDuplicateClip?.(selectedClip.id)}
                title="Nhân bản clip đã chọn"
              >
                <Copy size={13} color="#34d399" /> Nhân bản
              </button>

              <button
                type="button"
                className="button"
                style={{ fontSize: 11, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 4, color: '#f87171' }}
                onClick={() => onDeleteClip?.(selectedClip.id)}
                title="Xoá clip đang chọn"
              >
                <Trash2 size={13} /> Xoá
              </button>
            </>
          )}
        </div>
      </div>

      {/* Timeline Ruler & Tracks Area */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          background: '#0d131f',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 10,
          padding: '10px 12px 14px',
          overflowX: 'auto',
          userSelect: 'none'
        }}
      >
        {/* Ruler */}
        <div
          onClick={handleRulerClick}
          style={{
            position: 'relative',
            height: 22,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: 10,
            cursor: 'pointer'
          }}
        >
          {markers.map((m, idx) => (
            <span
              key={idx}
              style={{
                position: 'absolute',
                left: `${m.ratio * 100}%`,
                transform: m.ratio === 1 ? 'translateX(-100%)' : 'translateX(-50%)',
                fontSize: 10,
                color: '#64748b',
                fontFamily: 'monospace'
              }}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Tracks */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {TRACK_CONFIG.map(({ track, label, bg, border }) => {
            const trackClips = clips.filter(c => c.track === track);
            return (
              <div
                key={track}
                onClick={handleRulerClick}
                style={{
                  position: 'relative',
                  height: 38,
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: 6,
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer'
                }}
              >
                {/* Track Label Badge */}
                <div
                  style={{
                    position: 'absolute',
                    left: 6,
                    top: 2,
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.45)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                >
                  {label}
                </div>

                {/* Clips in this track */}
                {trackClips.map(c => {
                  const isSelected = selectedId === c.id;
                  const leftPct = (c.startMs / duration) * 100;
                  const widthPct = Math.max(1.5, ((c.endMs - c.startMs) / duration) * 100);

                  return (
                    <div
                      key={c.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect?.(c.id);
                      }}
                      style={{
                        position: 'absolute',
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                        top: 2,
                        bottom: 2,
                        background: bg,
                        border: isSelected ? '2px solid #22d3ee' : `1px solid ${border}`,
                        boxShadow: isSelected ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none',
                        borderRadius: 5,
                        padding: '3px 6px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        color: '#ffffff',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer',
                        zIndex: isSelected ? 4 : 3,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title={`${c.label} (${(c.startMs / 1000).toFixed(1)}s - ${(c.endMs / 1000).toFixed(1)}s)`}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.text ? `💬 ${c.text}` : c.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Interactive Playhead Line */}
          <div
            style={{
              position: 'absolute',
              top: -26,
              bottom: 0,
              left: `${Math.min(100, Math.max(0, (currentTimeMs / duration) * 100))}%`,
              width: 2,
              background: '#22d3ee',
              pointerEvents: 'none',
              zIndex: 10,
              boxShadow: '0 0 8px #22d3ee'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: -5,
                width: 12,
                height: 12,
                background: '#22d3ee',
                borderRadius: '50%',
                boxShadow: '0 0 6px #22d3ee'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
