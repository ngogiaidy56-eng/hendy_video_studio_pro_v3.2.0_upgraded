import { useState, useMemo } from 'react';
import type { Clip } from '../../types/project';
import { Subtitles, X, Search, Plus, Trash2, Play } from 'lucide-react';

interface SubtitleTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  clips: Clip[];
  selectedId?: string;
  onSelectCue: (id: string) => void;
  onSeek: (ms: number) => void;
  onUpdateCueText: (id: string, text: string) => void;
  onDeleteCue: (id: string) => void;
  onAddCue: () => void;
}

function formatMs(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const remSec = s % 60;
  const remMs = Math.floor((ms % 1000) / 100);
  return `${m.toString().padStart(2, '0')}:${remSec.toString().padStart(2, '0')}.${remMs}`;
}

export function SubtitleTableModal({
  isOpen,
  onClose,
  clips,
  selectedId,
  onSelectCue,
  onSeek,
  onUpdateCueText,
  onDeleteCue,
  onAddCue
}: SubtitleTableModalProps) {
  const [query, setQuery] = useState('');

  const subtitleClips = useMemo(() => {
    return clips
      .filter(c => c.kind === 'subtitle')
      .sort((a, b) => a.startMs - b.startMs);
  }, [clips]);

  const filteredCues = useMemo(() => {
    if (!query.trim()) return subtitleClips;
    const lower = query.toLowerCase();
    return subtitleClips.filter(c => (c.text || '').toLowerCase().includes(lower) || c.label.toLowerCase().includes(lower));
  }, [subtitleClips, query]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
      }}
      onClick={onClose}
    >
      <div
        className="panel stack"
        style={{
          width: '100%',
          maxWidth: 720,
          maxHeight: '85vh',
          background: '#0d131f',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 16,
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          padding: 20,
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="row" style={{ justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12 }}>
          <div className="row" style={{ gap: 8 }}>
            <Subtitles size={18} color="#fbbf24" />
            <strong style={{ fontSize: 16 }}>Danh sách & Quản lý phụ đề ({subtitleClips.length} câu)</strong>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button
              type="button"
              className="button primary"
              style={{ fontSize: 12, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}
              onClick={onAddCue}
            >
              <Plus size={14} /> Thêm phụ đề mới
            </button>
            <button
              type="button"
              className="button"
              style={{ padding: '4px 8px' }}
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="row" style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, color: '#64748b' }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm kiếm nội dung phụ đề tiếng Việt..."
            style={{ width: '100%', paddingLeft: 32 }}
          />
        </div>

        {/* Table Content */}
        <div style={{ flex: 1, overflowY: 'auto', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, background: '#080d14' }}>
          {filteredCues.length === 0 ? (
            <div className="muted" style={{ padding: '32px 16px', textAlign: 'center' }}>
              {query ? 'Không tìm thấy câu phụ đề nào phù hợp' : 'Chưa có phụ đề nào. Nhấn "+ Thêm phụ đề mới" để bắt đầu.'}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#111827', color: '#94a3b8', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '8px 10px', width: 45 }}>#</th>
                  <th style={{ padding: '8px 10px', width: 140 }}>Thời gian</th>
                  <th style={{ padding: '8px 10px' }}>Nội dung phụ đề</th>
                  <th style={{ padding: '8px 10px', width: 80, textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCues.map((c, index) => {
                  const isSelected = selectedId === c.id;
                  return (
                    <tr
                      key={c.id}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        background: isSelected ? 'rgba(34, 211, 238, 0.08)' : undefined
                      }}
                    >
                      <td style={{ padding: '8px 10px', color: '#64748b' }}>{index + 1}</td>
                      <td style={{ padding: '8px 10px', fontFamily: 'monospace', color: '#22d3ee' }}>
                        {formatMs(c.startMs)} → {formatMs(c.endMs)}
                      </td>
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          value={c.text || ''}
                          onChange={e => onUpdateCueText(c.id, e.target.value)}
                          onFocus={() => onSelectCue(c.id)}
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: '1px solid transparent',
                            borderRadius: 4,
                            padding: '4px 6px',
                            color: '#fff'
                          }}
                          onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.border = '1px solid transparent'}
                        />
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                        <div className="row" style={{ justifyContent: 'center', gap: 4 }}>
                          <button
                            type="button"
                            className="button"
                            style={{ padding: '3px 6px' }}
                            title="Nhảy tới phụ đề này trên Timeline"
                            onClick={() => {
                              onSelectCue(c.id);
                              onSeek(c.startMs);
                            }}
                          >
                            <Play size={11} color="#34d399" />
                          </button>
                          <button
                            type="button"
                            className="button"
                            style={{ padding: '3px 6px', color: '#f87171' }}
                            title="Xoá câu phụ đề này"
                            onClick={() => onDeleteCue(c.id)}
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
