import type { ReactNode } from 'react';
import { Undo2, Redo2, Settings, Subtitles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  version: string;
  admin: boolean;
  projectName?: string;
  lastSavedAt?: string;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onOpenSettings?: () => void;
  onOpenSubtitles?: () => void;
  actions?: ReactNode;
}

export function Header({
  version,
  admin,
  projectName,
  lastSavedAt,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenSettings,
  onOpenSubtitles,
  actions
}: HeaderProps) {
  const formattedTime = lastSavedAt
    ? new Date(lastSavedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : null;

  return (
    <header className="panel row" style={{ justifyContent: 'space-between', position: 'sticky', top: 8, zIndex: 30, flexWrap: 'wrap', gap: 8 }}>
      <div className="row" style={{ gap: 12 }}>
        <div>
          <div className="row" style={{ gap: 6 }}>
            <strong>🎬 AI Studio Pro</strong>
            {projectName && (
              <span style={{ fontSize: 13, color: '#22d3ee', fontWeight: 600 }}>
                · {projectName}
              </span>
            )}
          </div>
          <div className="muted" style={{ fontSize: 11 }}>
            v{version} · {admin ? 'QUẢN TRỊ VIÊN' : 'BIÊN TẬP VIÊN'} · React 19
          </div>
        </div>

        {/* Auto-save indicator */}
        {formattedTime && (
          <div
            className="row"
            style={{
              gap: 4,
              fontSize: 11,
              color: '#34d399',
              background: 'rgba(52, 211, 153, 0.1)',
              padding: '3px 8px',
              borderRadius: 6,
              border: '1px solid rgba(52, 211, 153, 0.2)'
            }}
            title="Dự án được tự động lưu vào bộ nhớ trình duyệt (localStorage)"
          >
            <CheckCircle2 size={12} />
            <span>Đã lưu lúc {formattedTime}</span>
          </div>
        )}
      </div>

      {/* Middle Tooling Buttons: Undo, Redo, Subtitle Table, Settings */}
      <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
        <button
          type="button"
          className="button"
          style={{ padding: '6px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
          disabled={!canUndo}
          onClick={onUndo}
          title="Hoàn tác thao tác vừa rồi (Ctrl+Z)"
        >
          <Undo2 size={13} /> Hoàn tác
        </button>

        <button
          type="button"
          className="button"
          style={{ padding: '6px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
          disabled={!canRedo}
          onClick={onRedo}
          title="Làm lại thao tác vừa hoàn tác (Ctrl+Y)"
        >
          <Redo2 size={13} /> Làm lại
        </button>

        <button
          type="button"
          className="button"
          style={{ padding: '6px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
          onClick={onOpenSubtitles}
          title="Mở bảng danh sách phụ đề"
        >
          <Subtitles size={13} color="#fbbf24" /> Quản lý phụ đề
        </button>

        <button
          type="button"
          className="button"
          style={{ padding: '6px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
          onClick={onOpenSettings}
          title="Cài đặt dự án & Tỉ lệ khung hình"
        >
          <Settings size={13} color="#22d3ee" /> Cài đặt dự án
        </button>

        {actions}
      </div>
    </header>
  );
}
