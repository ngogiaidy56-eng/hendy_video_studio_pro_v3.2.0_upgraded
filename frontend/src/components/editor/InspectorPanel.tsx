import { useEffect, useState } from 'react';
import type { Clip, SubtitleStyle } from '../../types/project';
import { Type, Sparkles, Volume2, Trash2, Copy, Sliders } from 'lucide-react';

interface InspectorProps {
  clip?: Clip;
  onChange?: (patch: Partial<Clip>) => void;
  onGenerateTts?: (clip: Clip) => Promise<void>;
  onEnhance?: (clip: Clip) => Promise<void>;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

const FONT_OPTIONS = [
  'Arial, sans-serif',
  'Roboto, sans-serif',
  'Montserrat, sans-serif',
  'Be Vietnam Pro, sans-serif',
  'Impact, sans-serif',
  'Times New Roman, serif'
];

export function InspectorPanel({
  clip,
  onChange,
  onGenerateTts,
  onEnhance,
  onDelete,
  onDuplicate
}: InspectorProps) {
  const [text, setText] = useState(clip?.text || '');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setText(clip?.text || '');
  }, [clip?.id, clip?.text]);

  if (!clip) {
    return (
      <section className="panel stack">
        <div className="row" style={{ gap: 6 }}>
          <Sliders size={16} color="#22d3ee" />
          <strong>Bảng thuộc tính (Inspector)</strong>
        </div>
        <div className="muted" style={{ padding: '16px 8px', textAlign: 'center', background: '#0e1420', borderRadius: 8 }}>
          Chưa chọn clip nào.<br />Nhấn vào một clip trên Timeline để tinh chỉnh chi tiết.
        </div>
      </section>
    );
  }

  const run = async (fn?: (clip: Clip) => Promise<void>) => {
    if (!fn) return;
    setBusy(true);
    try {
      await fn(clip);
    } finally {
      setBusy(false);
    }
  };

  const style: SubtitleStyle = {
    fontFamily: clip.style?.fontFamily || 'Arial, sans-serif',
    fontSize: clip.style?.fontSize || 42,
    color: clip.style?.color || '#ffffff',
    strokeColor: clip.style?.strokeColor || '#000000',
    strokeWidth: clip.style?.strokeWidth ?? 6,
    bottomPx: clip.style?.bottomPx || 55
  };

  const updateStyle = (patch: Partial<SubtitleStyle>) => {
    onChange?.({
      style: {
        ...style,
        ...patch
      }
    });
  };

  const kindLabel =
    clip.kind === 'video' ? 'Clip Video' :
    clip.kind === 'audio' ? 'Clip Âm thanh' :
    clip.kind === 'subtitle' ? 'Phụ đề Vietsub' : 'Hiệu ứng';

  return (
    <section className="panel stack">
      {/* Title & Kind */}
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="row" style={{ gap: 6 }}>
          <Sliders size={15} color="#22d3ee" />
          <strong>Bảng thuộc tính</strong>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            padding: '2px 8px',
            borderRadius: 6,
            background: clip.kind === 'subtitle' ? 'rgba(245,158,11,0.2)' : 'rgba(79,124,255,0.2)',
            color: clip.kind === 'subtitle' ? '#fbbf24' : '#60a5fa'
          }}
        >
          {kindLabel}
        </span>
      </div>

      {/* Basic metadata */}
      <label>
        Tên hiển thị
        <input
          value={clip.label}
          onChange={e => onChange?.({ label: e.target.value })}
          placeholder="Nhập tên clip..."
        />
      </label>

      <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <label>
          Bắt đầu (ms)
          <input
            type="number"
            step="100"
            value={clip.startMs}
            onChange={e => onChange?.({ startMs: Math.max(0, Number(e.target.value)) })}
          />
        </label>
        <label>
          Kết thúc (ms)
          <input
            type="number"
            step="100"
            value={clip.endMs}
            onChange={e => onChange?.({ endMs: Math.max(clip.startMs + 100, Number(e.target.value)) })}
          />
        </label>
      </div>

      <div className="muted" style={{ fontSize: 11 }}>
        Thời lượng: {((clip.endMs - clip.startMs) / 1000).toFixed(2)} giây · Rãnh T{clip.track + 1}
      </div>

      {/* Subtitle Specific Features */}
      {clip.kind === 'subtitle' && (
        <div className="stack" style={{ gap: 8, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
          <label>
            <div className="row" style={{ gap: 4 }}>
              <Type size={13} color="#fbbf24" />
              <span>Nội dung phụ đề</span>
            </div>
            <textarea
              rows={3}
              value={text}
              placeholder="Nhập phụ đề tiếng Việt..."
              onChange={e => {
                setText(e.target.value);
                onChange?.({ text: e.target.value });
              }}
            />
          </label>

          {/* AI Assistance Buttons */}
          <div className="row" style={{ gap: 6 }}>
            <button
              type="button"
              className="button"
              style={{ flex: 1, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
              disabled={busy || !clip.text}
              onClick={() => run(onEnhance)}
              title="Sử dụng Gemini AI để chuẩn hoá chính tả, dấu câu và phong cách dịch tiếng Việt"
            >
              <Sparkles size={13} color="#22d3ee" /> Trau chuốt câu từ
            </button>
            <button
              type="button"
              className="button primary"
              style={{ flex: 1, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
              disabled={busy || !clip.text}
              onClick={() => run(onGenerateTts)}
              title="Chuyển văn bản thành giọng nói tiếng Việt tự nhiên (Gemini TTS)"
            >
              <Volume2 size={13} /> Giọng đọc AI
            </button>
          </div>

          {/* Subtitle Typography & Visual Styling */}
          <div className="stack" style={{ background: '#0e1420', padding: 8, borderRadius: 8, gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 'bold', color: '#94a3b8' }}>Kiểu dáng hiển thị phụ đề</span>

            <div className="row" style={{ gap: 6 }}>
              <select
                value={style.fontFamily}
                onChange={e => updateStyle({ fontFamily: e.target.value })}
                style={{ flex: 1, background: '#17171a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 6px', fontSize: 11 }}
              >
                {FONT_OPTIONS.map(f => (
                  <option key={f} value={f}>{f.split(',')[0]}</option>
                ))}
              </select>

              <div className="row" style={{ gap: 4, alignItems: 'center' }}>
                <span style={{ fontSize: 11 }}>Cỡ:</span>
                <input
                  type="number"
                  min="16"
                  max="96"
                  value={style.fontSize}
                  onChange={e => updateStyle({ fontSize: Number(e.target.value) })}
                  style={{ width: 50, padding: '4px 6px', fontSize: 11 }}
                />
              </div>
            </div>

            <div className="row" style={{ justifyContent: 'space-between', gap: 8 }}>
              <label style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11 }}>Màu chữ:</span>
                <input
                  type="color"
                  value={style.color}
                  onChange={e => updateStyle({ color: e.target.value })}
                  style={{ width: 28, height: 26, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
              </label>

              <label style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11 }}>Viền chữ:</span>
                <input
                  type="color"
                  value={style.strokeColor}
                  onChange={e => updateStyle({ strokeColor: e.target.value })}
                  style={{ width: 28, height: 26, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
              </label>

              <label style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11 }}>Độ dày:</span>
                <input
                  type="number"
                  min="0"
                  max="16"
                  value={style.strokeWidth}
                  onChange={e => updateStyle({ strokeWidth: Number(e.target.value) })}
                  style={{ width: 42, padding: '3px 4px', fontSize: 11 }}
                />
              </label>
            </div>

            <div className="row" style={{ alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11 }}>Cách đáy:</span>
              <input
                type="range"
                min="20"
                max="250"
                value={style.bottomPx}
                onChange={e => updateStyle({ bottomPx: Number(e.target.value) })}
                style={{ flex: 1 }}
              />
              <span style={{ fontSize: 11, width: 32 }}>{style.bottomPx}px</span>
            </div>
          </div>
        </div>
      )}

      {/* Audio / Video Volume Controls */}
      {(clip.kind === 'audio' || clip.kind === 'video') && (
        <div className="stack" style={{ gap: 6, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 'bold' }}>Âm lượng clip</span>
            <span style={{ fontSize: 11 }}>{Math.round((clip.volume ?? 1) * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={clip.volume ?? 1}
            onChange={e => onChange?.({ volume: Number(e.target.value) })}
          />
        </div>
      )}

      {/* Clip Actions */}
      <div className="row" style={{ gap: 6, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
        <button
          type="button"
          className="button"
          style={{ flex: 1, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
          onClick={() => onDuplicate?.(clip.id)}
          title="Nhân bản clip này"
        >
          <Copy size={13} /> Nhân bản
        </button>
        <button
          type="button"
          className="button"
          style={{ fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: '#f87171' }}
          onClick={() => onDelete?.(clip.id)}
          title="Xoá clip này khỏi dự án"
        >
          <Trash2 size={13} /> Xoá clip
        </button>
      </div>
    </section>
  );
}
