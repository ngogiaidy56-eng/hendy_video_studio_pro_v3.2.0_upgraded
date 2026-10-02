import React, { useState } from 'react';
import { Download, X, Share2, PlusSquare, Smartphone, Monitor } from 'lucide-react';
import { usePWAInstall } from '../../utils/usePWAInstall';

export function PwaInstallBanner() {
  const { isInstallable, isInstalled, isIOS, isWindows, isAndroid, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed or dismissed, hide
  if (isInstalled || dismissed) return null;

  // Platform specific title
  const platformLabel = isWindows
    ? 'Cài đặt Hendy Video cho Windows'
    : isAndroid
    ? 'Cài đặt ứng dụng cho Android'
    : isIOS
    ? 'Thêm vào màn hình chính iPhone'
    : 'Cài đặt ứng dụng PWA';

  return (
    <>
      {/* Floating Prompt Bar */}
      {(isInstallable || isIOS) && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-40 max-w-sm animate-bounce-subtle">
          <div className="p-3.5 rounded-2xl bg-[#0f172a]/95 backdrop-blur-md border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 flex items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/30">
                {isWindows ? (
                  <Monitor size={18} className="text-white" />
                ) : (
                  <Smartphone size={18} className="text-white" />
                )}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white leading-tight">{platformLabel}</h4>
                <p className="text-[10px] text-slate-300">
                  Dùng mượt mà không cần mở trình duyệt, hỗ trợ offline.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {isInstallable && (
                <button
                  onClick={install}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition flex items-center gap-1"
                >
                  <Download size={13} />
                  Cài ngay
                </button>
              )}

              {isIOS && (
                <button
                  onClick={() => setShowIOSGuide(true)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:brightness-110 active:scale-95 transition flex items-center gap-1"
                >
                  Hướng dẫn
                </button>
              )}

              <button
                onClick={() => setDismissed(true)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition"
                title="Bỏ qua"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Safari Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xs bg-[#131b2e] rounded-2xl border border-slate-700 p-5 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm">Cài đặt trên iPhone / iPad</h3>
              <button onClick={() => setShowIOSGuide(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <ol className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                <span>Mở bằng trình duyệt Safari.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                <span className="flex items-center gap-1">
                  Bấm nút <Share2 size={13} className="text-cyan-400" /> <strong>Chia sẻ</strong> ở dưới thanh công cụ.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                <span className="flex items-center gap-1">
                  Chọn <PlusSquare size={13} className="text-cyan-400" /> <strong>Thêm vào MH chính</strong>.
                </span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-center transition"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
}
