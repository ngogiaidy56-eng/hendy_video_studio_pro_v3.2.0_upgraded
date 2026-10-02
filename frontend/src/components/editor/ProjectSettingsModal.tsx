import { useState, useRef } from 'react';
import type { Project, AspectRatio } from '../../types/project';
import { exportProjectAsJson, importProjectFromJson } from '../../services/projectStorage';
import { Settings, X, Download, Upload, RefreshCw } from 'lucide-react';

interface ProjectSettingsModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProject: (patch: Partial<Project>) => void;
  onResetProject: () => void;
  onLoadProject: (newProject: Project) => void;
}

const PRESETS: Record<AspectRatio, { width: number; height: number; desc: string }> = {
  '16:9': { width: 1280, height: 720, desc: '1280×720 · Chuẩn YouTube / Video ngang' },
  '9:16': { width: 720, height: 1280, desc: '720×1280 · Chuẩn TikTok / Reels / Shorts' },
  '1:1': { width: 1080, height: 1080, desc: '1080×1080 · Chuẩn Vuông Instagram / Facebook' }
};

export function ProjectSettingsModal({
  project,
  isOpen,
  onClose,
  onUpdateProject,
  onResetProject,
  onLoadProject
}: ProjectSettingsModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(project.name || 'Dự án AI Studio');
  const [aspect, setAspect] = useState<AspectRatio>(project.aspectRatio || '16:9');
  const [fps, setFps] = useState<number>(project.fps || 30);
  const [durationSec, setDurationSec] = useState<number>(Math.round((project.durationMs || 60000) / 1000));
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    const preset = PRESETS[aspect];
    onUpdateProject({
      name,
      aspectRatio: aspect,
      width: preset.width,
      height: preset.height,
      fps,
      durationMs: durationSec * 1000
    });
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    try {
      const imported = await importProjectFromJson(file);
      onLoadProject(imported);
      onClose();
    } catch (err: unknown) {
      setImportError((err as Error).message || 'Lỗi khi nhập file dự án JSON');
    }
  };

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
          maxWidth: 480,
          background: '#0d131f',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 16,
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          padding: 20
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="row" style={{ justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12 }}>
          <div className="row" style={{ gap: 8 }}>
            <Settings size={18} color="#22d3ee" />
            <strong style={{ fontSize: 16 }}>Cài đặt cấu hình dự án</strong>
          </div>
          <button
            type="button"
            className="button"
            style={{ padding: '4px 8px' }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Controls */}
        <label>
          Tên dự án
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ví dụ: Video giới thiệu sản phẩm..."
          />
        </label>

        <label>
          Tỉ lệ khung hình (Aspect Ratio)
          <div className="stack" style={{ gap: 6, marginTop: 4 }}>
            {(['16:9', '9:16', '1:1'] as AspectRatio[]).map(key => (
              <button
                key={key}
                type="button"
                className={`button ${aspect === key ? 'primary' : ''}`}
                style={{ textAlign: 'left', padding: '8px 12px' }}
                onClick={() => setAspect(key)}
              >
                <div style={{ fontWeight: 'bold' }}>{key}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{PRESETS[key].desc}</div>
              </button>
            ))}
          </div>
        </label>

        <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <label>
            Số khung hình / giây (FPS)
            <select
              value={fps}
              onChange={e => setFps(Number(e.target.value))}
              style={{ background: '#17171a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 8 }}
            >
              <option value="24">24 FPS (Cinematic)</option>
              <option value="30">30 FPS (Chuẩn web/mobile)</option>
              <option value="60">60 FPS (Mượt mà cao cấp)</option>
            </select>
          </label>

          <label>
            Thời lượng dự án (Giây)
            <input
              type="number"
              min="5"
              max="600"
              value={durationSec}
              onChange={e => setDurationSec(Math.max(5, Number(e.target.value)))}
            />
          </label>
        </div>

        {/* Project Import / Export */}
        <div className="stack" style={{ background: '#080d14', padding: 12, borderRadius: 10, gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 'bold', color: '#94a3b8' }}>Sao lưu & Khôi phục dự án</span>
          <div className="row" style={{ gap: 8 }}>
            <button
              type="button"
              className="button"
              style={{ flex: 1, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              onClick={() => exportProjectAsJson(project)}
            >
              <Download size={13} color="#22d3ee" /> Xuất file JSON
            </button>
            <button
              type="button"
              className="button"
              style={{ flex: 1, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={13} color="#34d399" /> Nhập file JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              hidden
              onChange={handleFileChange}
            />
          </div>
          {importError && (
            <div style={{ color: '#f87171', fontSize: 11 }}>⚠️ {importError}</div>
          )}
        </div>

        {/* Actions */}
        <div className="row" style={{ justifyContent: 'space-between', marginTop: 8, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            type="button"
            className="button"
            style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn tạo lại dự án mới từ đầu? Mọi thay đổi hiện tại sẽ bị đặt lại.')) {
                onResetProject();
                onClose();
              }
            }}
          >
            <RefreshCw size={13} /> Tạo dự án mới
          </button>

          <div className="row" style={{ gap: 8 }}>
            <button
              type="button"
              className="button"
              onClick={onClose}
            >
              Huỷ
            </button>
            <button
              type="button"
              className="button primary"
              style={{ fontWeight: 'bold' }}
              onClick={handleSave}
            >
              Áp dụng thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
