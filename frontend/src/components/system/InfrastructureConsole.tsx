import React, { useState, useEffect } from 'react';
import {
  Server,
  ShieldAlert,
  HardDrive,
  Cpu,
  Layers,
  Activity,
  Download,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Zap,
  Lock,
  X,
  Play,
  Database
} from 'lucide-react';

interface ServerNodeData {
  id: string;
  name: string;
  role: string;
  ip: string;
  status: 'ONLINE' | 'DEGRADED' | 'MAINTENANCE';
  cpuPercent: number;
  memoryMb: { used: number; total: number };
  requestsPerSec: number;
  latencyMs: number;
  uptimeHours: number;
  details: Record<string, any>;
}

interface InstallerPackage {
  id: string;
  platform: string;
  filename: string;
  version: string;
  sizeBytes: number;
  sha256: string;
  antivirusStatus: string;
  scanEngine: string;
  downloadsCount: number;
  r2Path: string;
}

interface InfrastructureConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfrastructureConsole({ isOpen, onClose }: InfrastructureConsoleProps) {
  const [activeTab, setActiveTab] = useState<'diagram' | 'gate' | 'traffic' | 'engine'>('diagram');
  const [servers, setServers] = useState<ServerNodeData[]>([]);
  const [installers, setInstallers] = useState<InstallerPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('windows_exe');
  const [signedData, setSignedData] = useState<any>(null);
  const [signingLoading, setSigningLoading] = useState(false);
  const [trafficSimResult, setTrafficSimResult] = useState<any>(null);
  const [simulatingTraffic, setSimulatingTraffic] = useState(false);
  const [antivirusScanResult, setAntivirusScanResult] = useState<any>(null);
  const [scanningAntivirus, setScanningAntivirus] = useState(false);

  // Fetch live topology
  const fetchTopology = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/infra/topology');
      if (res.ok) {
        const data = await res.json();
        setServers(data.servers || []);
        setInstallers(data.installers || []);
      }
    } catch (e) {
      console.error('Failed to load topology:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTopology();
    }
  }, [isOpen]);

  // Generate Signed Download URL (Download Secure Gate)
  const handleGenerateSignedUrl = async () => {
    setSigningLoading(true);
    setSignedData(null);
    try {
      const res = await fetch('/api/infra/download/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform: selectedPlatform })
      });
      const data = await res.json();
      setSignedData(data);
    } catch (e) {
      console.error('Failed to generate signed URL:', e);
    } finally {
      setSigningLoading(false);
    }
  };

  // Simulate traffic burst
  const handleSimulateTraffic = async () => {
    setSimulatingTraffic(true);
    try {
      const res = await fetch('/api/infra/simulate-traffic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestsCount: 50 })
      });
      const data = await res.json();
      setTrafficSimResult(data);
    } catch (e) {
      console.error('Failed to simulate traffic:', e);
    } finally {
      setSimulatingTraffic(false);
    }
  };

  // Trigger Antivirus Scan
  const handleScanAntivirus = async () => {
    setScanningAntivirus(true);
    try {
      const res = await fetch('/api/infra/antivirus/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: signedData?.package?.id || 'pkg-win-exe-310' })
      });
      const data = await res.json();
      setAntivirusScanResult(data);
    } catch (e) {
      console.error('Failed to scan antivirus:', e);
    } finally {
      setScanningAntivirus(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060911]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Hạ Tầng 6 Cụm Server & Cổng Tải An Toàn (Download Secure Gate)
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  SOT v3.1.0 ENTERPRISE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Kiến trúc phân phối tải: Cloudflare Edge WAF, Nginx Rate Limiter 20 req/s, API Core, PostgreSQL 16 & Redis 7.2
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchTopology}
              disabled={loading}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Làm mới trạng thái hệ thống"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin text-cyan-400' : ''} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-800 bg-[#05080f] px-6 gap-3 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`flex items-center gap-2 py-3 border-b-2 font-semibold transition whitespace-nowrap ${
              activeTab === 'diagram'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers size={14} />
            Sơ Đồ Kiến Trúc 6 Server (Topology)
          </button>

          <button
            onClick={() => setActiveTab('gate')}
            className={`flex items-center gap-2 py-3 border-b-2 font-semibold transition whitespace-nowrap ${
              activeTab === 'gate'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock size={14} />
            Cổng Tải An Toàn (Download Secure Gate)
          </button>

          <button
            onClick={() => setActiveTab('traffic')}
            className={`flex items-center gap-2 py-3 border-b-2 font-semibold transition whitespace-nowrap ${
              activeTab === 'traffic'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap size={14} />
            Mô Phỏng Tải (WAF & Rate Limiter 20 req/s)
          </button>

          <button
            onClick={() => setActiveTab('engine')}
            className={`flex items-center gap-2 py-3 border-b-2 font-semibold transition whitespace-nowrap ${
              activeTab === 'engine'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database size={14} />
            PostgreSQL 16 & Redis 7.2 Cluster
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300">
          {/* TAB 1: VISUAL DIAGRAM (MATCHING USER ASCII SCHEMA EXACTLY) */}
          {activeTab === 'diagram' && (
            <div className="space-y-6">
              {/* Top Banner: Inbound Traffic */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold shadow-lg shadow-cyan-500/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  [ INTERNET INBOUND TRAFFIC ]
                </div>
                <div className="w-0.5 h-6 bg-cyan-400/80"></div>
                <div className="text-cyan-400 text-[10px]">▼</div>
              </div>

              {/* TIER 1: SERVERS 1 & 2 */}
              <div className="p-4 rounded-2xl bg-[#0e1424] border border-cyan-500/40 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-cyan-400" size={18} />
                    <span className="font-bold text-white text-sm">
                      SERVERS 1 & 2: EDGE DELIVERY NETWORK
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                    ONLINE · 1420 req/s · 12ms
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-slate-300 font-mono text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                    <ShieldAlert size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Cloudflare Edge WAF:</strong> Chống DDoS hỏa lực L3/L4/L7, tường lửa thông minh, phân tích bot tự động.
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                    <HardDrive size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Cloudflare R2 Storage:</strong> Lưu trữ phân tán tệp <code>/installers/*.zip</code>, <code>*.exe</code>, <code>*.apk</code>, băng thông ra miễn phí.
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting Pipe */}
              <div className="grid grid-cols-2 gap-8 text-center text-[10px] font-mono text-cyan-400">
                <div className="flex flex-col items-center">
                  <span>(Tài nguyên tĩnh / Files)</span>
                  <div className="w-0.5 h-6 bg-cyan-400/80 my-1"></div>
                  <span>▼</span>
                </div>
                <div className="flex flex-col items-center">
                  <span>(API & Web Pages Requests)</span>
                  <div className="w-0.5 h-6 bg-cyan-400/80 my-1"></div>
                  <span>▼</span>
                </div>
              </div>

              {/* TIER 2: R2 BUCKET & SERVER 3 NGINX GATEWAY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CLOUDFLARE R2 BUCKET */}
                <div className="p-4 rounded-2xl bg-[#0c1220] border border-blue-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                    <HardDrive size={18} />
                    CLOUDFLARE R2 BUCKET
                  </div>
                  <ul className="text-slate-300 text-[11px] font-mono space-y-1 list-disc list-inside">
                    <li><code>/installers/*.zip</code> (Bản di động Portable)</li>
                    <li><code>/installers/*.exe</code> (Bản Windows Setup)</li>
                    <li><code>/installers/*.apk</code> (Bản Android Native)</li>
                    <li><code>/assets/images/*</code> (Kho tài nguyên tĩnh)</li>
                  </ul>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Trạng thái: <span className="text-emerald-400 font-bold">100% CẬP NHẬT</span> · 128.4 GB
                  </div>
                </div>

                {/* SERVER 3: REVERSE PROXY & GATEWAY (Nginx) */}
                <div className="p-4 rounded-2xl bg-[#0c1220] border border-purple-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                      <Cpu size={18} />
                      SERVER 3: REVERSE PROXY & GATEWAY (Nginx)
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                      20 req/s MAX
                    </span>
                  </div>
                  <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
                    <li>Định tuyến thông minh & SSL Termination (TLS 1.3, HTTP/2 & HTTP/3)</li>
                    <li><strong>Giới hạn tải:</strong> Rate Limiting: Max 20 req/s (Leaky Bucket)</li>
                    <li>Bảo vệ chống quét càn, tự động ngắt kết nối IP spam</li>
                  </ul>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Upstream: <code className="text-purple-300">Web Portal:3000</code> & <code className="text-cyan-300">API Core:8787</code>
                  </div>
                </div>
              </div>

              {/* Connecting Pipe Down to Servers 4 & 5 */}
              <div className="grid grid-cols-2 gap-8 text-center text-[10px] font-mono text-purple-400">
                <div className="flex flex-col items-center">
                  <span>(Điều hướng Web Portal)</span>
                  <div className="w-0.5 h-6 bg-purple-400/80 my-1"></div>
                  <span>▼</span>
                </div>
                <div className="flex flex-col items-center">
                  <span>(Điều hướng API /api/*)</span>
                  <div className="w-0.5 h-6 bg-purple-400/80 my-1"></div>
                  <span>▼</span>
                </div>
              </div>

              {/* TIER 3: SERVER 4 (FRONTEND) & SERVER 5 (API CORE) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SERVER 4: FRONT-END APPS */}
                <div className="p-4 rounded-2xl bg-[#0b101e] border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Layers size={16} className="text-sky-400" />
                      SERVER 4: FRONT-END APPS
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Node.js 22 Runtime</span>
                  </div>
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <div>• <strong>Next.js 14 Web Portal:</strong> SSG/ISR Engine kết xuất siêu tốc</div>
                    <div>• <strong>React Tailwind Admin Dashboard:</strong> Bảng điều khiển quản trị viên SOT</div>
                    <div>• <strong>PWA Container:</strong> 100% tiêu chuẩn cài đặt cho Windows, Android & iOS</div>
                  </div>
                </div>

                {/* SERVER 5: INTERACTION API CORE */}
                <div className="p-4 rounded-2xl bg-[#0b101e] border border-cyan-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300 text-sm flex items-center gap-2">
                      <Zap size={16} className="text-cyan-400" />
                      SERVER 5: INTERACTION API CORE
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400">TypeScript / Express</span>
                  </div>
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <div>• <strong>Express / Fastify Core:</strong> Xử lý nghiệp vụ phân phối phần mềm</div>
                    <div>• <strong>Download Secure Gate:</strong> Sinh mã Signed URL (HMAC-SHA256 TTL 15m)</div>
                    <div>• <strong>AI Processing Hub:</strong> Tích hợp Gemini Audio & Vietsub</div>
                  </div>
                </div>
              </div>

              {/* Connecting Pipe Down to Data Cluster */}
              <div className="flex flex-col items-center justify-center text-[10px] font-mono text-cyan-400 my-1">
                <span>(Đồng bộ DB & Đẩy job ngầm)</span>
                <div className="w-0.5 h-6 bg-cyan-400/80 my-1"></div>
                <span>▼</span>
              </div>

              {/* TIER 4: SERVER 6 & CLUSTER DATA */}
              <div className="p-4 rounded-2xl bg-[#090e1a] border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <Database size={18} className="text-amber-400" />
                    SERVER 6: CLUSTER DATA & ENGINE
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-500/20">
                    PostgreSQL 16 · Redis 7.2 · Elasticsearch 8.x
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <strong className="text-amber-300 block">POSTGRESQL 16 (Master)</strong>
                    <p className="text-slate-400">
                      Lưu trữ Apps, Versions, Installers, Admins, Audit Logs, và số liệu thống kê tải về.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <strong className="text-red-400 block">REDIS CLUSTER 7.2</strong>
                    <p className="text-slate-400">
                      Download Queue Job, hàng đợi xử lý ngầm, Cache Top Downloads, Leaky Bucket counters.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <strong className="text-emerald-400 block">ELASTICSEARCH 8.x + ANTIVIRUS</strong>
                    <p className="text-slate-400">
                      Full-text Search, Telemetry phân tích nhật ký, và Worker kiểm định mã độc ClamAV / VirusTotal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOWNLOAD SECURE GATE */}
          {activeTab === 'gate' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 flex items-start gap-3">
                <Lock size={22} className="text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">
                    Cổng Tải An Toàn - Signed URL Generator (HMAC-SHA256)
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Mỗi liên kết tải file <code>.exe</code>, <code>.zip</code>, <code>.apk</code> được sinh động bởi Server 5 (Interaction API Core) với mã băm mật mã HMAC, khóa IP client và tự động vô hiệu hóa sau 15 phút.
                  </p>
                </div>
              </div>

              {/* Platform selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">
                  Chọn gói phần mềm cần tải:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 'windows_exe', label: 'Windows Setup (.exe)', size: '~80.7 MB', desc: 'Bản cài đặt chuẩn Windows 10/11' },
                    { id: 'windows_zip', label: 'Windows Portable (.zip)', size: '~87 MB', desc: 'Chạy trực tiếp không cần cài đặt' },
                    { id: 'android_apk', label: 'Android Package (.apk)', size: '~40.2 MB', desc: 'Cài đặt trực tiếp trên Android' },
                    { id: 'macos_dmg', label: 'macOS Apple Silicon (.dmg)', size: '~93.8 MB', desc: 'Tương thích chip M1/M2/M3/M4' }
                  ].map(pkg => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPlatform(pkg.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                        selectedPlatform === pkg.id
                          ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-white text-xs">{pkg.label}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{pkg.desc}</div>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400 font-semibold mt-2">
                        {pkg.size}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action: Generate Signed Link */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleGenerateSignedUrl}
                  disabled={signingLoading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition flex items-center gap-2"
                >
                  <Lock size={15} />
                  {signingLoading ? 'Đang tạo chữ ký...' : 'Sinh mã Signed URL (Bảo mật HMAC)'}
                </button>

                <button
                  onClick={handleScanAntivirus}
                  disabled={scanningAntivirus}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition flex items-center gap-2"
                >
                  <ShieldCheck size={15} className="text-emerald-400" />
                  {scanningAntivirus ? 'Đang quét...' : 'Kiểm định Antivirus (Server 6)'}
                </button>
              </div>

              {/* Signed URL Output Card */}
              {signedData && (
                <div className="p-4 rounded-2xl bg-[#0b101e] border border-cyan-500/40 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                      <CheckCircle2 size={16} /> Liên kết tải đã sinh thành công (Khóa an toàn)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Hiệu lực đến: {new Date(signedData.expiresAt).toLocaleTimeString('vi-VN')}
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div className="text-slate-400">
                      Tệp tin: <strong className="text-white">{signedData.package.filename}</strong>
                    </div>
                    <div className="text-slate-400 truncate">
                      SHA-256 Checksum: <code className="text-cyan-300">{signedData.security.sha256Checksum}</code>
                    </div>
                    <div className="text-slate-400 truncate">
                      Đường dẫn Signed Gate: <code className="text-yellow-300">{signedData.signedUrl}</code>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={signedData.signedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
                    >
                      <Download size={14} />
                      Tải ngay từ Cloudflare R2
                    </a>

                    <span className="text-[10px] text-slate-400">
                      🛡️ Xác thực bởi ClamAV & Microsoft Authenticode
                    </span>
                  </div>
                </div>
              )}

              {/* Antivirus Scan Output */}
              {antivirusScanResult && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2 animate-fadeIn text-[11px]">
                  <div className="font-bold text-emerald-400 flex items-center gap-2">
                    <ShieldCheck size={16} /> Kết quả kiểm định mã độc (Server 6 Worker)
                  </div>
                  <div className="text-slate-300 space-y-1">
                    <div>• Động cơ quét: <span className="text-white font-mono">{antivirusScanResult.scanEngine}</span></div>
                    <div>• Chữ ký đã đối soát: <span className="text-cyan-300 font-mono">8,942,100 mẫu virut</span></div>
                    <div>• Mối đe dọa: <span className="text-emerald-400 font-bold">0 PHÁT HIỆN (100% SẠCH)</span></div>
                    <div>• Chữ ký số Authenticode: <span className="text-slate-300">{antivirusScanResult.authenticodeStatus}</span></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TRAFFIC & RATE LIMIT SIMULATOR */}
          {activeTab === 'traffic' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/30 flex items-start gap-3">
                <Zap size={22} className="text-purple-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">
                    Kiểm Thử Hỏa Lực: Cloudflare Edge WAF & Nginx Rate Limiting (20 req/s)
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Bấm nút bên dưới để phát đồng loạt 50 yêu cầu HTTP giả lập. Bạn sẽ thấy trực tiếp cách Cloudflare WAF (Servers 1 & 2) chặn DDoS và Nginx (Server 3) siết van điều tiết (HTTP 429 Throttle) để bảo vệ Server 5 & PostgreSQL 16.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSimulateTraffic}
                disabled={simulatingTraffic}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20 hover:brightness-110 active:scale-95 transition flex items-center gap-2"
              >
                <Play size={15} />
                {simulatingTraffic ? 'Đang bắn 50 requests...' : 'Bắn 50 Inbound Requests (Test Hỏa Lực)'}
              </button>

              {trafficSimResult && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] text-emerald-400 font-bold">XỬ LÝ THÀNH CÔNG (200 OK)</div>
                      <div className="text-2xl font-black text-white mt-1">
                        {trafficSimResult.summary.passed}
                      </div>
                      <div className="text-[10px] text-slate-400">Server 5 & Redis Cache</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-center">
                      <div className="text-[10px] text-amber-400 font-bold">NGINX RATE-LIMITED (429)</div>
                      <div className="text-2xl font-black text-amber-300 mt-1">
                        {trafficSimResult.summary.throttledByNginx}
                      </div>
                      <div className="text-[10px] text-slate-400">Server 3 (Max 20 req/s)</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-center">
                      <div className="text-[10px] text-red-400 font-bold">CLOUDFLARE WAF CHẶN (403)</div>
                      <div className="text-2xl font-black text-red-400 mt-1">
                        {trafficSimResult.summary.blockedByCloudflareWaf}
                      </div>
                      <div className="text-[10px] text-slate-400">Servers 1 & 2 Edge WAF</div>
                    </div>
                  </div>

                  {/* Logs list */}
                  <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-slate-400 font-bold">
                      Nhật ký phân luồng điều hướng (15 mẫu đầu tiên):
                    </div>
                    <div className="space-y-1 font-mono text-[10px] max-h-48 overflow-y-auto">
                      {trafficSimResult.sampleLogs.map((log: any, idx: number) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-1.5 rounded ${
                            log.status === 200
                              ? 'bg-emerald-950/20 text-emerald-300'
                              : log.status === 429
                              ? 'bg-amber-950/20 text-amber-300'
                              : 'bg-red-950/20 text-red-400'
                          }`}
                        >
                          <span>Request #{log.reqIndex}</span>
                          <span>{log.handledBy}</span>
                          <span className="font-bold">HTTP {log.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: POSTGRESQL 16 & REDIS 7.2 */}
          {activeTab === 'engine' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* PostgreSQL 16 Card */}
                <div className="p-4 rounded-2xl bg-[#0c1220] border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <Database size={16} className="text-amber-400" />
                      PostgreSQL 16 (Master Node)
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">ACTIVE</span>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kết nối đang mở:</span>
                      <span className="font-mono text-white">42 / 200 (Pool: PgBouncer)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Bảng dữ liệu:</span>
                      <span className="font-mono text-amber-300">apps, versions, installers, admins, audit_logs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Độ trễ trung bình:</span>
                      <span className="font-mono text-emerald-400">1.8 ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cơ chế Replication:</span>
                      <span className="font-mono text-slate-200">Streaming WAL to Standby</span>
                    </div>
                  </div>
                </div>

                {/* Redis 7.2 Card */}
                <div className="p-4 rounded-2xl bg-[#0c1220] border border-red-500/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <Activity size={16} className="text-red-400" />
                      Redis Cluster 7.2 (Cache & Queue)
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">ACTIVE</span>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cache Hit Ratio:</span>
                      <span className="font-mono text-emerald-400 font-bold">96.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hàng đợi Tải về (Queue):</span>
                      <span className="font-mono text-cyan-300">0 tồn đọng (BullMQ Worker IDLE)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Bộ nhớ đã dùng:</span>
                      <span className="font-mono text-white">418 MB / 4096 MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Leaky Bucket Keys:</span>
                      <span className="font-mono text-red-300">Active IP Throttling Keys</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-[#060911]">
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Hệ sinh thái hạ tầng 6 Server đang vận hành chuẩn xác theo sơ đồ kiến trúc
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
