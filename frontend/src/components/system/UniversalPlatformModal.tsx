import { useState } from 'react';
import {
  Monitor,
  Smartphone,
  Apple,
  Download,
  CheckCircle,
  ExternalLink,
  X,
  Share2,
  PlusSquare,
  ShieldCheck,
  Bot,
  Database
} from 'lucide-react';
import { usePWAInstall } from '../../utils/usePWAInstall';

interface UniversalPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UniversalPlatformModal({ isOpen, onClose }: UniversalPlatformModalProps) {
  const { isInstallable, isInstalled, platform, isIOS, isAndroid, isWindows, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'windows' | 'android' | 'ios' | 'sot'>('windows');
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0b1120]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Hệ điều hành & Đa nền tảng (Universal Apps)
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  v3.1.0 SOT
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Hỗ trợ Windows, Android, iOS, macOS và Linux với trải nghiệm Native hoàn chỉnh
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-800 bg-[#070b14] px-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('windows')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'windows'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor size={15} />
            Windows 10 / 11
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'android'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone size={15} />
            Android (APK / WebAPK)
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'ios'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Apple size={15} />
            iOS (iPhone / iPad)
          </button>

          <button
            onClick={() => setActiveTab('sot')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'sot'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck size={15} />
            Hạ tầng Cloudflare & D1
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* TAB WINDOWS */}
          {activeTab === 'windows' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/40 to-slate-900/60 border border-blue-500/30 flex items-start gap-4">
                <Monitor className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-sm font-bold text-white">
                    Ứng dụng máy tính Windows (Desktop App)
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Chạy độc lập như một phần mềm Windows 64-bit chính thống, hỗ trợ phím tắt bàn phím đầy đủ, chạy mượt mà không thanh địa chỉ trình duyệt, hoạt động ngoại tuyến (Offline) và tự động đồng bộ dự án lên Cloudflare D1.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-400" />
                    Cài đặt 1-Click (PWA / Edge / Chrome)
                  </span>
                  <p className="text-slate-400">
                    Bấm nút bên dưới trên Microsoft Edge hoặc Google Chrome để cài ứng dụng trực tiếp vào Start Menu và Taskbar của Windows.
                  </p>
                  {isInstalled ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-medium py-1">
                      <CheckCircle size={15} /> Đã cài đặt trên thiết bị này!
                    </div>
                  ) : isInstallable ? (
                    <button
                      onClick={handleInstallClick}
                      className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:brightness-110 shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2"
                    >
                      <Download size={15} /> Cài đặt ứng dụng Windows ngay
                    </button>
                  ) : (
                    <div className="p-2.5 rounded bg-slate-800/80 text-slate-300 text-[11px] leading-relaxed">
                      💡 <strong>Mẹo cài đặt:</strong> Trên trình duyệt Edge hoặc Chrome trên Windows, bấm biểu tượng <span className="text-cyan-300 font-mono">[⊕ Cài đặt]</span> trên thanh địa chỉ (URL bar).
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <Monitor size={14} className="text-cyan-400" />
                    Đóng gói MSIX & Microsoft Store
                  </span>
                  <p className="text-slate-400">
                    Ứng dụng đã chuẩn hóa 100% tệp kê khai <code>manifest.json</code> và service worker theo chuẩn PWA Builder của Microsoft.
                  </p>
                  <div className="p-2.5 rounded bg-slate-800/80 text-slate-300 font-mono text-[11px]">
                    pwabuilder.com → Nhập URL → Xuất file .msixbundle
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB ANDROID */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-4">
                <Smartphone className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-sm font-bold text-white">
                    Ứng dụng di động Android (APK / WebAPK / TWA)
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Hỗ trợ đầy đủ màn hình cảm ứng, vuốt timeline mượt mà, cảm biến rung haptic, chế độ toàn màn hình không viền (Full-screen standalone) và tích hợp thông báo Push Notification.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="font-semibold text-white">Cách cài đặt trực tiếp trên Android:</h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                  <li>Mở website trên trình duyệt <strong>Google Chrome</strong> hoặc <strong>Samsung Internet</strong>.</li>
                  <li>Bấm vào menu <strong>3 chấm (⋮)</strong> ở góc trên bên phải màn hình.</li>
                  <li>Chọn <strong>"Cài đặt ứng dụng"</strong> hoặc <strong>"Thêm vào Màn hình chính"</strong>.</li>
                  <li>Biểu tượng <strong>Hendy Video Studio Pro</strong> sẽ xuất hiện trên màn hình điện thoại như ứng dụng CH Play.</li>
                </ol>

                {isInstallable && (
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold hover:brightness-110 shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 mt-2"
                  >
                    <Download size={15} /> Thêm vào màn hình chính Android
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB IOS */}
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900/60 border border-purple-500/30 flex items-start gap-4">
                <Apple className="w-8 h-8 text-purple-400 shrink-0 mt-1" />
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-sm font-bold text-white">
                    Ứng dụng iPhone & iPad (iOS WebKit Standalone)
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Tương thích hoàn hảo với màn hình tai thỏ và Dynamic Island (hỗ trợ <code>viewport-fit=cover</code>), thanh trạng thái mờ trong suốt, và lưu trữ dự án cục bộ an toàn.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="font-semibold text-white">Hướng dẫn 3 bước cài đặt trên iPhone / iPad:</h4>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                    <span className="text-slate-200">Mở trang web trong trình duyệt <strong>Safari</strong> trên iPhone.</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                    <div className="flex items-center gap-2 text-slate-200">
                      Bấm vào nút <strong className="flex items-center gap-1"><Share2 size={13} className="text-cyan-400" /> Chia sẻ (Share)</strong> ở thanh dưới.
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                    <div className="flex items-center gap-2 text-slate-200">
                      Cuộn xuống và chọn <strong className="flex items-center gap-1"><PlusSquare size={13} className="text-cyan-400" /> Thêm vào MH chính</strong> (Add to Home Screen).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CLOUDFLARE SOT */}
          {activeTab === 'sot' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-500/30 flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0 mt-1" />
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-sm font-bold text-white">
                    Hạ tầng đám mây Single Source of Truth (SOT v3.1.0)
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Dữ liệu dự án, cấu hình bảo trì, tài khoản và logs được lưu trữ phân tán trên Cloudflare Workers Edge và cơ sở dữ liệu Cloudflare D1.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <Bot size={15} /> Telegram Bot Hub
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div>Trạng thái: <span className="text-emerald-400 font-bold">ONLINE (v3.1.0)</span></div>
                    <div>Worker: <code className="text-cyan-300 text-[10px]">hendy-video-studio-pro-telegram</code></div>
                    <div>Admin ID: <code className="text-slate-200">6138197737</code></div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <Database size={15} /> Cloudflare D1 Storage
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div>Cơ sở dữ liệu: <code className="text-cyan-300 text-[10px]">telegram-bot-db</code></div>
                    <div>UUID: <code className="text-slate-300 text-[10px]">4925d076...ba4036</code></div>
                    <div>Bảng dữ liệu: <code className="text-emerald-300">users, logs, settings</code></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800 bg-[#070b14]">
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Hệ sinh thái sẵn sàng cho Windows, Android, iOS & Web
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
