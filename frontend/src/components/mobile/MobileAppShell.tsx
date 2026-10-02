import React, { useState } from 'react';
import {
  Scissors,
  LayoutTemplate,
  Sparkles,
  Bell,
  User,
  Plus,
  Image as ImageIcon,
  Wand2,
  Subtitles,
  Smartphone,
  Layers,
  Settings,
  X,
  Play,
  Pause,
  ChevronRight,
  Share2,
  Clock,
  HelpCircle,
  Mic,
  Camera,
  Music,
  Type,
  Sliders,
  Crop,
  Download,
  Check,
  Send,
  Zap
} from 'lucide-react';
import type { Project, Clip } from '../../types/project';

interface MobileAppShellProps {
  project: Project;
  currentTimeMs: number;
  selectedId?: string;
  onSelectClip: (id?: string) => void;
  onSeek: (time: number) => void;
  onSplitClip: (id: string, time: number) => void;
  onDeleteClip: (id: string) => void;
  onDuplicateClip: (id: string) => void;
  onOpenDesktopMode: () => void;
  onOpenUniversalModal: () => void;
  onOpenInfraModal?: () => void;
  onExportVideo: () => void;
  onAutoGenerateSubtitles: () => void;
  onUpdateProjectName: (name: string) => void;
  videoPreviewSlot: React.ReactNode;
}

export function MobileAppShell({
  project,
  currentTimeMs,
  selectedId,
  onSelectClip,
  onSeek,
  onSplitClip,
  onDeleteClip,
  onDuplicateClip,
  onOpenDesktopMode,
  onOpenUniversalModal,
  onOpenInfraModal,
  onExportVideo,
  onAutoGenerateSubtitles,
  onUpdateProjectName,
  videoPreviewSlot
}: MobileAppShellProps) {
  // Navigation tabs: 'edit' | 'template' | 'ailab' | 'inbox' | 'profile'
  const [activeTab, setActiveTab] = useState<'edit' | 'template' | 'ailab' | 'inbox' | 'profile'>('edit');
  // In-editor view state (matching Photos 5, 7, 8)
  const [isInEditor, setIsInEditor] = useState(false);
  // Modals
  const [showAllToolsModal, setShowAllToolsModal] = useState(false);
  const [showAutoSubModal, setShowAutoSubModal] = useState(false);
  const [selectedSubStyle, setSelectedSubStyle] = useState('default');
  const [promptInput, setPromptInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // Open Telegram bot link
  const openTelegramBot = () => {
    window.open('https://t.me/hendy_video_bot', '_blank');
  };

  // Helper format mm:ss
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ============================================================
  // VIEW: IN-STUDIO MOBILE VIDEO EDITOR (Screenshots 5, 7, 8)
  // ============================================================
  if (isInEditor) {
    return (
      <div className="fixed inset-0 z-40 bg-[#070b14] text-white flex flex-col select-none overflow-hidden font-sans">
        {/* Top bar (Photo 5) */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-[#0a101d] border-b border-slate-800/80 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInEditor(false)}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Đóng editor và quay lại màn hình chính"
            >
              <X size={20} />
            </button>
            <span className="text-xs font-semibold text-slate-200 truncate max-w-[130px]">
              {project.name || 'Dự án mới'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold flex items-center gap-1">
              💎 Dùng 1
            </span>

            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium">
              AI UHD ▾
            </span>

            <button
              onClick={onExportVideo}
              className="px-3.5 py-1 rounded-md bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition"
            >
              Xuất
            </button>
          </div>
        </div>

        {/* Video Canvas Preview & Floating Badges */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[220px]">
          {videoPreviewSlot}

          {/* Floating Telegram Badge (Photo 5) */}
          <button
            onClick={openTelegramBot}
            className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-[#24A1DE] text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition"
            title="Mở Telegram Bot Điều hành SOT"
          >
            <Send size={20} className="translate-x-[-1px] translate-y-[1px]" />
          </button>

          {/* Floating AI Glow Quick Action (Photo 5, 7, 8) */}
          <button
            onClick={() => setShowAutoSubModal(true)}
            className="absolute bottom-4 left-4 z-30 w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-cyan-400/40 hover:scale-110 active:scale-95 transition ring-2 ring-cyan-300/40"
            title="Kích hoạt Phụ đề Tự động bằng AI"
          >
            <Sparkles size={18} />
          </button>

          {/* Floating center play/pause indicator if touched */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition duration-200"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="translate-x-0.5" />}
          </button>
        </div>

        {/* Timeline Header & Timecode Scrub Bar (Photo 5) */}
        <div className="bg-[#0f172a] border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] text-slate-300">
          <div className="font-mono flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">{formatTime(currentTimeMs)}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{formatTime(project.durationMs || 7000)}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (selectedId) onSplitClip(selectedId, currentTimeMs);
              }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-medium transition"
            >
              ✂️ Tách đoạn
            </button>
            <button
              onClick={onOpenDesktopMode}
              className="text-[10px] text-cyan-400 hover:underline"
            >
              🖥️ Chế độ Máy tính
            </button>
          </div>
        </div>

        {/* Video Filmstrip & Subtitle Timeline Ruler */}
        <div className="bg-[#0a0f1d] px-3 py-3 border-b border-slate-800/80 overflow-x-auto space-y-2">
          {/* Tick markers */}
          <div className="flex justify-between text-[9px] text-slate-500 font-mono px-2 select-none">
            <span>00:00</span>
            <span>00:02</span>
            <span>00:04</span>
            <span>00:06</span>
            <span>00:08</span>
          </div>

          {/* Filmstrip Clips Track */}
          <div className="relative h-14 bg-slate-900/90 rounded-lg border border-slate-800 overflow-hidden flex items-center p-1 gap-1">
            {project.clips.map((clip, index) => {
              const isSelected = clip.id === selectedId;
              return (
                <div
                  key={clip.id}
                  onClick={() => onSelectClip(clip.id)}
                  className={`relative flex-1 h-full rounded flex items-center justify-center text-[10px] font-medium transition cursor-pointer select-none px-2 truncate ${
                    isSelected
                      ? 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/30'
                      : 'bg-slate-800/70 border border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span className="truncate">
                    {clip.kind === 'subtitle' ? `💬 ${clip.text || 'Phụ đề'}` : `🎬 Video ${index + 1}`}
                  </span>
                </div>
              );
            })}

            {/* Split marker cursor */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee] pointer-events-none"
              style={{
                left: `${Math.min(100, Math.max(0, (currentTimeMs / (project.durationMs || 7000)) * 100))}%`
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 -translate-x-[4px] -translate-y-1 shadow"></div>
            </div>
          </div>
        </div>

        {/* Subtitle Quick Action Bar (Photo 5) */}
        <div className="bg-[#0b101e] px-2 py-2 border-b border-slate-800/70 flex items-center justify-around text-[10px] text-slate-300 overflow-x-auto gap-2">
          <button
            onClick={() => setShowAutoSubModal(true)}
            className="flex flex-col items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-800/60 transition min-w-[70px]"
          >
            <Subtitles size={16} className="text-cyan-400" />
            <span>Phụ đề tự động</span>
          </button>

          <button
            onClick={() => setShowAutoSubModal(true)}
            className="flex flex-col items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-800/60 transition min-w-[70px]"
          >
            <LayoutTemplate size={16} className="text-yellow-400" />
            <span>Mẫu phụ đề</span>
          </button>

          <button
            onClick={() => setShowAutoSubModal(true)}
            className="flex flex-col items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-800/60 transition min-w-[70px]"
          >
            <Music size={16} className="text-purple-400" />
            <span>Lời bài hát tự động</span>
          </button>

          <button
            onClick={() => onSeek(0)}
            className="flex flex-col items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-800/60 transition min-w-[70px]"
          >
            <Clock size={16} className="text-emerald-400" />
            <span>Về đầu (00:00)</span>
          </button>
        </div>

        {/* Primary Bottom Tool Bar (Photos 7 & 8) */}
        <div className="bg-[#070b14] px-3 py-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-300 overflow-x-auto gap-3">
          <button
            onClick={() => {
              if (selectedId) onSplitClip(selectedId, currentTimeMs);
            }}
            className="flex flex-col items-center gap-1 min-w-[50px] hover:text-cyan-400 transition"
          >
            <Scissors size={18} />
            <span>Chỉnh sửa</span>
          </button>

          <button
            onClick={() => setShowAutoSubModal(true)}
            className="flex flex-col items-center gap-1 min-w-[50px] hover:text-cyan-400 transition"
          >
            <Music size={18} />
            <span>Âm thanh</span>
          </button>

          <button
            onClick={() => setShowAutoSubModal(true)}
            className="flex flex-col items-center gap-1 min-w-[50px] hover:text-cyan-400 transition"
          >
            <Type size={18} />
            <span>Văn bản</span>
          </button>

          <button
            onClick={() => setShowAllToolsModal(true)}
            className="flex flex-col items-center gap-1 min-w-[50px] hover:text-cyan-400 transition"
          >
            <Wand2 size={18} />
            <span>Hiệu ứng</span>
          </button>

          <button
            onClick={() => setShowAutoSubModal(true)}
            className="flex flex-col items-center gap-1 min-w-[50px] hover:text-cyan-400 transition"
          >
            <Subtitles size={18} />
            <span>Phụ đề</span>
          </button>

          <button
            onClick={() => setShowAllToolsModal(true)}
            className="flex flex-col items-center gap-1 min-w-[50px] hover:text-cyan-400 transition"
          >
            <Sliders size={18} />
            <span>Bộ lọc</span>
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // VIEW: MAIN MOBILE APP (Screenshots 1, 2, 3, 4)
  // ============================================================
  return (
    <div className="min-h-screen bg-[#f3f7fb] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans select-none pb-20">
      {/* TAB 1: CHỈNH SỬA (Photos 3 & 4) */}
      {activeTab === 'edit' && (
        <div className="flex-1 flex flex-col p-4 space-y-4 max-w-md mx-auto w-full">
          {/* Top Diamond Banner (Photo 3) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-100 via-sky-100 to-cyan-50 dark:from-cyan-950/60 dark:to-slate-900 border border-cyan-200 dark:border-cyan-500/20 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-800 dark:text-cyan-300">
              <span className="text-sm">💎</span>
              <span>Standard</span>
              <span className="text-[11px] font-normal text-slate-600 dark:text-slate-400 ml-1">
                7 ngày dùng thử 0đ
              </span>
            </div>

            <button
              onClick={onOpenUniversalModal}
              className="px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-[11px] hover:opacity-90 active:scale-95 transition"
            >
              Nhận bản dùng thử
            </button>
          </div>

          {/* 2 Hero Action Cards (Photo 3) */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Card 1: Video mới */}
            <button
              onClick={() => setIsInEditor(true)}
              className="h-28 rounded-2xl bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-400 dark:from-cyan-500 dark:to-blue-600 p-4 flex flex-col items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-98 transition text-slate-950 dark:text-white"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-xl">
                <Plus size={24} />
              </div>
              <span className="font-bold text-sm tracking-wide">Video mới</span>
            </button>

            {/* Card 2: Chỉnh sửa ảnh */}
            <button
              onClick={() => setShowAllToolsModal(true)}
              className="h-28 rounded-2xl bg-gradient-to-br from-sky-300 via-cyan-400 to-teal-400 dark:from-sky-500 dark:to-teal-600 p-4 flex flex-col items-center justify-center gap-2 shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-98 transition text-slate-950 dark:text-white"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-xl">
                <ImageIcon size={22} />
              </div>
              <span className="font-bold text-sm tracking-wide">Chỉnh sửa ảnh</span>
            </button>
          </div>

          {/* 8 Quick Tools Grid (Photo 3) */}
          <div className="grid grid-cols-4 gap-3 bg-white dark:bg-[#0c1222] p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm text-center">
            {/* 1. AutoCut */}
            <button
              onClick={() => setIsInEditor(true)}
              className="flex flex-col items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Scissors size={18} />
              </div>
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">AutoCut</span>
            </button>

            {/* 2. Làm đẹp */}
            <button
              onClick={() => setShowAllToolsModal(true)}
              className="flex flex-col items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-500 flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Làm đẹp</span>
            </button>

            {/* 3. Công cụ AI */}
            <button
              onClick={() => setShowAllToolsModal(true)}
              className="flex flex-col items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-500 flex items-center justify-center">
                <Wand2 size={18} />
              </div>
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Tạo bởi AI</span>
            </button>

            {/* 4. Phụ đề tự động */}
            <button
              onClick={() => setShowAutoSubModal(true)}
              className="flex flex-col items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center">
                <Subtitles size={18} />
              </div>
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Phụ đề AI</span>
            </button>

            {/* 5. Trình sửa ảnh */}
            <button
              onClick={() => setShowAllToolsModal(true)}
              className="flex flex-col items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
                <Crop size={18} />
              </div>
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Sửa ảnh</span>
            </button>

            {/* 6. Tạo ảnh bìa */}
            <button
              onClick={() => setShowAllToolsModal(true)}
              className="flex flex-col items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center">
                <ImageIcon size={18} />
              </div>
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Ảnh bìa</span>
            </button>

            {/* 7. Trình sửa trên máy tính (Windows / Mac) */}
            <button
              onClick={onOpenUniversalModal}
              className="flex flex-col items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
              title="Đồng bộ với Windows Desktop"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center">
                <Smartphone size={18} />
              </div>
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Windows/PC</span>
            </button>

            {/* 8. Tất cả công cụ */}
            <button
              onClick={() => setShowAllToolsModal(true)}
              className="flex flex-col items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <Layers size={18} />
              </div>
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Tất cả</span>
            </button>
          </div>

          {/* Section Dự án (Photos 3 & 4) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Dự án</span>
              <button
                onClick={onOpenDesktopMode}
                className="text-xs text-cyan-600 dark:text-cyan-400 font-medium hover:underline flex items-center gap-1"
              >
                Mở Desktop Studio ▾
              </button>
            </div>

            {/* Empty state or Project card */}
            {project.clips.length > 0 ? (
              <div
                onClick={() => setIsInEditor(true)}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 flex items-center gap-3.5 cursor-pointer hover:border-cyan-500/50 shadow-sm transition"
              >
                <div className="w-16 h-12 rounded-lg bg-gradient-to-tr from-cyan-900 to-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs shrink-0">
                  🎬 HD
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {project.name || 'Dự án biên tập hiện tại'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {project.clips.length} phân đoạn · {formatTime(project.durationMs || 7000)}
                  </p>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setIsInEditor(true);
                  }}
                  className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold text-xs hover:bg-cyan-500/20"
                >
                  Sửa
                </button>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white dark:bg-[#0c1222] border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900/80 flex items-center justify-center text-slate-400">
                  <Scissors size={28} />
                </div>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Các dự án của bạn sẽ xuất hiện tại đây. Bắt đầu tạo ngay.
                </p>
                <button
                  onClick={() => setIsInEditor(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  + Tạo dự án mới
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MẪU (TEMPLATES) */}
      {activeTab === 'template' && (
        <div className="flex-1 p-4 space-y-4 max-w-md mx-auto w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 dark:text-white">
              Mẫu CapCut & Video Studio Pro
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
              Xu hướng 🔥
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Reel Tình Yêu Lãng Mạn', duration: '00:15', uses: '142k' },
              { title: 'Beat Drop Giật Giật TikTok', duration: '00:12', uses: '89k' },
              { title: 'Vlog Du Lịch Chill', duration: '00:24', uses: '210k' },
              { title: 'Vietsub Ca Khúc Hot Trend', duration: '00:30', uses: '305k' }
            ].map((tpl, i) => (
              <div
                key={i}
                onClick={() => {
                  onUpdateProjectName(tpl.title);
                  setIsInEditor(true);
                }}
                className="rounded-2xl overflow-hidden bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-cyan-500 transition group"
              >
                <div className="h-36 bg-gradient-to-br from-slate-800 to-slate-900 relative flex items-center justify-center">
                  <Play size={24} className="text-white opacity-80 group-hover:scale-110 transition" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white">
                    {tpl.duration}
                  </span>
                </div>
                <div className="p-2.5 space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {tpl.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{tpl.uses} lượt dùng</span>
                    <span className="text-cyan-500 font-semibold">Phối lại</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AI LAB (Photo 2) */}
      {activeTab === 'ailab' && (
        <div className="flex-1 p-4 space-y-4 max-w-md mx-auto w-full flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
              Chúng ta sẽ tạo gì hôm nay nhỉ?
            </h2>

            {/* Carousel Phối lại nội dung thịnh hành (Photo 2) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Phối lại nội dung thịnh hành</span>
                <ChevronRight size={14} />
              </div>

              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {[
                  { time: '00:11', label: 'Búp bê AI' },
                  { time: '00:18', label: 'Cặp đôi khiêu vũ' },
                  { time: '00:18', label: 'Mô tô đêm' },
                  { time: '00:24', label: 'Em bé dễ thương' }
                ].map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      onUpdateProjectName(item.label);
                      setIsInEditor(true);
                    }}
                    className="w-24 h-32 rounded-xl bg-gradient-to-t from-slate-900 to-slate-800 border border-slate-700 relative shrink-0 overflow-hidden flex flex-col justify-end p-2 cursor-pointer hover:border-cyan-400 transition"
                  >
                    <span className="text-[9px] font-mono text-white/90 bg-black/60 px-1 rounded self-start">
                      {item.time}
                    </span>
                    <span className="text-[10px] font-semibold text-white mt-1 truncate">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Chips (Photo 2) */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowAllToolsModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 hover:border-cyan-400 shadow-sm transition"
              >
                <ImageIcon size={16} className="text-cyan-500" />
                Chỉnh sửa ảnh nhanh
              </button>

              <button
                onClick={() => setIsInEditor(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 hover:border-cyan-400 shadow-sm transition"
              >
                <Scissors size={16} className="text-blue-500" />
                AutoCut
              </button>

              <button
                onClick={() => setIsInEditor(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 hover:border-cyan-400 shadow-sm transition"
              >
                <Wand2 size={16} className="text-purple-500" />
                Tạo video bằng AI
              </button>

              <button
                onClick={() => setShowAutoSubModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 hover:border-cyan-400 shadow-sm transition"
              >
                <Sparkles size={16} className="text-yellow-500" />
                Dùng thử Seedance 2.5
              </button>
            </div>
          </div>

          {/* Bottom AI Prompt Input Bar (Photo 2) */}
          <div className="pt-4">
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-300 dark:border-slate-800 shadow-lg">
              <button
                onClick={() => setIsInEditor(true)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <Plus size={16} />
              </button>
              <input
                type="text"
                value={promptInput}
                onChange={e => setPromptInput(e.target.value)}
                placeholder="Làm video hoạt hình hài hước"
                className="flex-1 bg-transparent border-none text-xs text-slate-800 dark:text-slate-200 outline-none"
              />
              <button
                onClick={() => {
                  if (promptInput) {
                    onUpdateProjectName(promptInput);
                    setIsInEditor(true);
                  }
                }}
                className="p-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
              >
                <Mic size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HỘP THƯ ĐẾN (INBOX) */}
      {activeTab === 'inbox' && (
        <div className="flex-1 p-4 space-y-4 max-w-md mx-auto w-full">
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Hộp thư đến & Thông báo
          </h2>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                <span>🤖 Telegram Bot Webhook Active</span>
                <span className="text-[10px] text-slate-400">Vừa xong</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Bot Telegram và cơ sở dữ liệu Cloudflare D1 (v3.1.0) đã kết nối trực tuyến.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>📱 Hỗ trợ đa nền tảng (Universal)</span>
                <span className="text-[10px] text-slate-400">Mới</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Sẵn sàng cài đặt trên Windows 10/11, Android và iOS qua PWA.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TÔI (PROFILE - Photo 1) */}
      {activeTab === 'profile' && (
        <div className="flex-1 p-4 space-y-4 max-w-md mx-auto w-full">
          {/* Header Profile (Photo 1) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <User size={28} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Bấm để đăng nhập
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  Để đồng bộ hóa dự án và mẫu của bạn <ChevronRight size={13} />
                </p>
              </div>
            </div>

            <button
              onClick={openTelegramBot}
              className="w-10 h-10 rounded-full bg-[#24A1DE] text-white flex items-center justify-center shadow-md shadow-cyan-500/20 hover:scale-105 transition"
              title="Telegram Bot"
            >
              <Send size={18} />
            </button>
          </div>

          {/* Standard Banner (Photo 1) */}
          <div className="rounded-2xl p-4 bg-gradient-to-r from-cyan-100 via-sky-100 to-cyan-50 dark:from-cyan-950/70 dark:to-slate-900 border border-cyan-200 dark:border-cyan-500/30 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-cyan-800 dark:text-cyan-300 flex items-center gap-1">
                  💎 Standard
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Nhận 7 ngày dùng bản Standard với giá 0đ
                </p>
              </div>
              <button
                onClick={onOpenUniversalModal}
                className="px-3 py-1 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold"
              >
                Nhận bản dùng thử
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-cyan-200/60 dark:border-cyan-500/20 text-center">
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">Tài nguyên</div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">Công cụ Pro</div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">Hiệu ứng AI</div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">Làm đẹp</div>
            </div>
          </div>

          {/* Menu items (Photo 1) */}
          <div className="rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm text-xs font-medium">
            <button
              onClick={() => setIsInEditor(true)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left transition"
            >
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <Clock size={16} />
                Lịch sử xem
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </button>

            <button
              onClick={onOpenUniversalModal}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left transition"
            >
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <HelpCircle size={16} />
                Trung tâm trợ giúp & Cài đặt Đa nền tảng
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </button>

            {onOpenInfraModal && (
              <button
                onClick={onOpenInfraModal}
                className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left transition"
              >
                <div className="flex items-center gap-2.5 text-purple-600 dark:text-purple-400 font-bold">
                  <span className="text-sm">🖥️</span>
                  Hạ tầng 6 Cụm Server & Cổng Tải An Toàn
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>
            )}

            <button
              onClick={onOpenDesktopMode}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left transition"
            >
              <div className="flex items-center gap-2.5 text-cyan-600 dark:text-cyan-400 font-bold">
                <Smartphone size={16} />
                Chuyển sang giao diện Máy tính (Windows / PC)
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Telegram Action Button (Photos 1, 2, 3, 4) */}
      <button
        onClick={openTelegramBot}
        className="fixed bottom-20 right-4 z-30 w-12 h-12 rounded-full bg-[#24A1DE] text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:scale-110 active:scale-95 transition"
        title="Mở Telegram Bot Điều hành SOT"
      >
        <Send size={22} className="translate-x-[-1px] translate-y-[1px]" />
      </button>

      {/* BOTTOM NAVIGATION TAB BAR (Photos 1, 2, 3, 4) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#070b14]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-2 px-3 flex items-center justify-around max-w-md mx-auto">
        {/* Tab 1: Chỉnh sửa */}
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'edit'
              ? 'text-cyan-600 dark:text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <Scissors size={20} />
          <span className="text-[10px]">Chỉnh sửa</span>
        </button>

        {/* Tab 2: Mẫu */}
        <button
          onClick={() => setActiveTab('template')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'template'
              ? 'text-cyan-600 dark:text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <LayoutTemplate size={20} />
          <span className="text-[10px]">Mẫu</span>
        </button>

        {/* Tab 3: AI Lab */}
        <button
          onClick={() => setActiveTab('ailab')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'ailab'
              ? 'text-cyan-600 dark:text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles size={20} />
          <span className="text-[10px]">AI Lab</span>
        </button>

        {/* Tab 4: Hộp thư đến */}
        <button
          onClick={() => setActiveTab('inbox')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'inbox'
              ? 'text-cyan-600 dark:text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <Bell size={20} />
          <span className="text-[10px]">Hộp thư đến</span>
        </button>

        {/* Tab 5: Tôi */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'profile'
              ? 'text-cyan-600 dark:text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <User size={20} />
          <span className="text-[10px]">Tôi</span>
        </button>
      </nav>

      {/* ============================================================ */}
      {/* MODAL: TẤT CẢ CÔNG CỤ (Screenshot 9) */}
      {/* ============================================================ */}
      {showAllToolsModal && (
        <div className="fixed inset-0 z-50 bg-[#070b14] text-white flex flex-col font-sans overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white">Tất cả công cụ</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={openTelegramBot}
                className="w-8 h-8 rounded-full bg-[#24A1DE] text-white flex items-center justify-center"
              >
                <Send size={15} />
              </button>
              <button
                onClick={() => setShowAllToolsModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Tools Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs pb-24">
            {/* 1. Thao tác nhanh */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-300">Thao tác nhanh</h3>
              <div className="grid grid-cols-4 gap-2.5 text-center">
                {[
                  'Làm đẹp', 'Phụ đề tự động', 'Máy nhắc chữ', 'Máy ảnh',
                  'Tự động cải thiện', 'Điều chỉnh tốc độ', 'Ghi âm', 'Ghép ảnh',
                  'Chụp khung hình', 'Sửa trên máy tính'
                ].map((tool, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setShowAllToolsModal(false);
                      if (tool === 'Phụ đề tự động') setShowAutoSubModal(true);
                      else setIsInEditor(true);
                    }}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center gap-1.5 transition"
                  >
                    <Wand2 size={16} className="text-cyan-400" />
                    <span className="text-[10px] text-slate-300 leading-tight">{tool}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Công cụ AI */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-300">Công cụ AI</h3>
              <div className="grid grid-cols-4 gap-2.5 text-center">
                {[
                  'AutoCut', 'Ảnh đại diện AI', 'Trình dịch video', 'Cảnh đối thoại AI',
                  'Tạo hình ảnh AI', 'Hiệu ứng AI', 'Tạo video bằng AI', 'Cắt bằng AI',
                  'Xu hướng AI', 'Tạo phương tiện'
                ].map((tool, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setShowAllToolsModal(false);
                      setIsInEditor(true);
                    }}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 flex flex-col items-center gap-1.5 transition"
                  >
                    <Sparkles size={16} className="text-purple-400" />
                    <span className="text-[10px] text-slate-300 leading-tight">{tool}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Chỉnh sửa ảnh */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-300">Chỉnh sửa ảnh</h3>
              <div className="grid grid-cols-4 gap-2.5 text-center">
                {[
                  'Sửa ảnh', 'Xóa nền', 'Ánh sáng thông minh', 'Mở rộng AI'
                ].map((tool, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setShowAllToolsModal(false);
                      setIsInEditor(true);
                    }}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 flex flex-col items-center gap-1.5 transition"
                  >
                    <ImageIcon size={16} className="text-emerald-400" />
                    <span className="text-[10px] text-slate-300 leading-tight">{tool}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom + Dự án mới Button (Photo 9) */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#070b14] border-t border-slate-800">
            <button
              onClick={() => {
                setShowAllToolsModal(false);
                setIsInEditor(true);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-98 transition"
            >
              <Plus size={16} />
              + Dự án mới
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: PHỤ ĐỀ TỰ ĐỘNG (Screenshot 6) */}
      {/* ============================================================ */}
      {showAutoSubModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div className="w-full max-w-md bg-[#131b2e] rounded-t-3xl border-t border-slate-700/80 p-5 space-y-4 text-white font-sans animate-slideUp">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm">Phụ đề tự động</h3>
              <button
                onClick={() => setShowAutoSubModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Row 1: Tạo từ */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <span className="text-slate-300">Tạo từ</span>
              <span className="text-slate-400 flex items-center gap-1 font-medium">
                Video <ChevronRight size={14} />
              </span>
            </div>

            {/* Row 2: Ngôn ngữ nói */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <span className="text-slate-300">Ngôn ngữ nói</span>
              <span className="text-slate-400 flex items-center gap-1 font-medium">
                Tự động phát hiện (Tiếng Việt) <ChevronRight size={14} />
              </span>
            </div>

            {/* Row 3: Mẫu phụ đề (Photo 6) */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Mẫu kiểu chữ</span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'default', label: 'Mặc định', style: 'font-sans font-bold' },
                  { id: 'quick', label: 'THE QUICK', style: 'font-mono text-lime-400 font-black' },
                  { id: 'fox', label: 'brown fox', style: 'font-serif italic text-amber-300' },
                  { id: 'neon', label: 'sống như 💎', style: 'text-cyan-400 drop-shadow' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSubStyle(item.id)}
                    className={`h-16 rounded-xl border p-1.5 flex flex-col items-center justify-center text-center transition ${
                      selectedSubStyle === item.id
                        ? 'border-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-400'
                        : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                    }`}
                  >
                    <span className={`text-[10px] truncate max-w-full ${item.style}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced options preview */}
            <div className="flex items-center justify-between text-xs text-purple-400 pt-1">
              <span>💎 Tùy chọn nâng cao (Gemini AI TTS & Sync)</span>
              <span>▾</span>
            </div>

            {/* Bottom button (Photo 6) */}
            <div className="space-y-2 pt-2">
              <div className="text-[10px] text-right text-slate-400">
                1 lượt sử dụng/tháng
              </div>
              <button
                onClick={() => {
                  setShowAutoSubModal(false);
                  setIsInEditor(true);
                  onAutoGenerateSubtitles();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-98 transition flex items-center justify-center gap-2"
              >
                <Zap size={16} />
                Tạo phụ đề ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
