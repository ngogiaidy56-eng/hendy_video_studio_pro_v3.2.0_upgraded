import type { ReactNode } from 'react';
import {
  Undo2,
  Redo2,
  Settings,
  Subtitles,
  CheckCircle2,
  Smartphone,
  Monitor,
  Download,
  Send,
  Server
} from 'lucide-react';

interface HeaderProps {
  version: string;
  admin: boolean;
  projectName?: string;
  lastSavedAt?: string;
  canUndo?: boolean;
  canRedo?: boolean;
  isMobileView?: boolean;
  onToggleViewMode?: () => void;
  onOpenUniversalModal?: () => void;
  onOpenInfraModal?: () => void;
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
  isMobileView,
  onToggleViewMode,
  onOpenUniversalModal,
  onOpenInfraModal,
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
            <strong>🎬 Hendy Video Studio Pro</strong>
            {projectName && (
              <span style={{ fontSize: 13, color: '#22d3ee', fontWeight: 600 }}>
                · {projectName}
              </span>
            )}
          </div>
          <div className="muted" style={{ fontSize: 11 }}>
            v{version} SOT · {admin ? 'QUẢN TRỊ VIÊN' : 'BIÊN TẬP VIÊN'} · Windows & Mobile
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

      {/* Middle Tooling Buttons: View switcher, Universal Modal, Undo, Redo, Subtitle Table, Settings */}
      <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
        {/* Toggle Mobile vs Desktop Mode */}
        {onToggleViewMode && (
          <button
            type="button"
            className="button"
            style={{
              padding: '6px 10px',
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              borderColor: '#06b6d4',
              color: '#22d3ee',
              fontWeight: 600
            }}
            onClick={onToggleViewMode}
            title="Chuyển đổi giữa Giao diện Di động (CapCut UI) và Giao diện Máy tính (Windows Studio)"
          >
            {isMobileView ? (
              <>
                <Monitor size={13} /> Chế độ Máy tính
              </>
            ) : (
              <>
                <Smartphone size={13} /> Chế độ Di động
              </>
            )}
          </button>
        )}

        {/* Universal Install Modal */}
        {onOpenUniversalModal && (
          <button
            type="button"
            className="button"
            style={{
              padding: '6px 10px',
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))',
              borderColor: 'rgba(6,182,212,0.4)',
              color: '#38bdf8',
              fontWeight: 600
            }}
            onClick={onOpenUniversalModal}
            title="Cài đặt ứng dụng cho Windows, Android & iOS"
          >
            <Download size={13} /> Cài đặt Đa nền tảng
          </button>
        )}

        {/* Infrastructure 6 Servers Console */}
        {onOpenInfraModal && (
          <button
            type="button"
            className="button"
            style={{
              padding: '6px 10px',
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(6,182,212,0.15))',
              borderColor: 'rgba(168,85,247,0.4)',
              color: '#c084fc',
              fontWeight: 600
            }}
            onClick={onOpenInfraModal}
            title="Mở Bảng điều khiển Hạ tầng 6 Cụm Server & Cổng Tải An Toàn"
          >
            <Server size={13} /> Hạ tầng 6 Server
          </button>
        )}

        {/* Telegram Bot */}
        <a
          href="https://t.me/hendy_video_bot"
          target="_blank"
          rel="noreferrer"
          className="button"
          style={{
            padding: '6px 10px',
            fontSize: 11,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(36,161,222,0.15)',
            borderColor: '#24A1DE',
            color: '#38bdf8'
          }}
          title="Mở Telegram Bot điều hành"
        >
          <Send size={13} /> Telegram Bot
        </a>

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
