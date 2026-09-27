import { useRef, useState } from 'react';
import { Link2, Image as ImageIcon, Mic, UploadCloud, Brain, Loader2 } from 'lucide-react';

export function AssetSidebar({
  onUpload,
  onRecord,
  onTranscribe,
  onExtractUrl,
  onImageOcr,
}: {
  onUpload: (file: File) => void;
  onRecord?: () => void;
  onTranscribe?: (file: File) => void;
  onExtractUrl?: (url: string) => Promise<void>;
  onImageOcr?: (file: File) => Promise<void>;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [recording, setRecording] = useState(false);
  const [deviceNotice, setDeviceNotice] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isOcrLoading, setIsOcrLoading] = useState(false);

  const recorder = useRef<MediaRecorder | undefined>(undefined);
  const streamRef = useRef<MediaStream | undefined>(undefined);
  const chunks = useRef<BlobPart[]>([]);
  const lastAudio = useRef<File | undefined>(undefined);
  const lastImage = useRef<File | undefined>(undefined);

  const importFile = (file: File) => {
    if (file.type.startsWith('audio/')) lastAudio.current = file;
    if (file.type.startsWith('image/')) lastImage.current = file;
    onUpload(file);
  };

  const startRecord = async () => {
    if (recording) return;
    setDeviceNotice(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setDeviceNotice('Microphone is not supported in this browser environment.');
      onRecord?.();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const media = new MediaRecorder(stream);
      recorder.current = media;
      chunks.current = [];
      media.ondataavailable = e => e.data.size && chunks.current.push(e.data);
      media.onstop = () => {
        const blob = new Blob(chunks.current, { type: media.mimeType || 'audio/webm' });
        const file = new File([blob], `recording-${Date.now()}.webm`, { type: blob.type });
        stream.getTracks().forEach(t => t.stop());
        streamRef.current = undefined;
        setRecording(false);
        importFile(file);
      };
      media.onerror = (e) => {
        console.warn('Recording stream error:', e);
        setRecording(false);
        stream.getTracks().forEach(t => t.stop());
        streamRef.current = undefined;
      };
      media.start();
      setRecording(true);
    } catch (err: unknown) {
      setRecording(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = undefined;
      }
      const errObj = err as { name?: string; message?: string } | undefined;
      const name = errObj?.name || '';
      const msg = errObj?.message || String(err);
      if (name === 'NotFoundError' || msg.includes('Requested device not found') || msg.toLowerCase().includes('not found')) {
        setDeviceNotice('No microphone found on this device. You can import audio files directly.');
      } else if (name === 'NotAllowedError' || name === 'SecurityError') {
        setDeviceNotice('Microphone access was denied. Please allow microphone access or upload audio.');
      } else {
        setDeviceNotice('Recording unavailable. Please upload an audio file instead.');
      }
      onRecord?.();
    }
  };

  const stopRecord = () => {
    try {
      if (recorder.current && recorder.current.state === 'recording') {
        recorder.current.stop();
      }
    } catch (e) {
      console.warn('Could not stop recorder cleanly:', e);
    } finally {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = undefined;
      }
      setRecording(false);
    }
  };

  const handleExtractUrl = async () => {
    const trimmed = urlInput.trim();
    if (!trimmed || isExtracting) return;
    setIsExtracting(true);
    try {
      await onExtractUrl?.(trimmed);
      setUrlInput('');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleImageOcrClick = async () => {
    if (lastImage.current) {
      setIsOcrLoading(true);
      try {
        await onImageOcr?.(lastImage.current);
      } finally {
        setIsOcrLoading(false);
      }
    } else {
      imgRef.current?.click();
    }
  };

  return (
    <section
      className={`panel stack ${drag ? 'dragging' : ''}`}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) importFile(f);
      }}
    >
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <strong>Đầu Vào Đa Phương Tiện</strong>
        <span className="muted" style={{ fontSize: '10px' }}>Media Assets</span>
      </div>

      {/* URL Link Extractor */}
      <div className="stack" style={{ gap: '6px', background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(148,163,184,0.1)' }}>
        <div className="row" style={{ fontSize: '11px', color: '#22d3ee', fontWeight: 600 }}>
          <Link2 className="w-3.5 h-3.5" />
          <span>Dán Link (YouTube / TikTok / Báo)</span>
        </div>
        <div className="row" style={{ gap: '4px' }}>
          <input
            style={{ flex: 1, fontSize: '11px', padding: '6px 8px' }}
            placeholder="https://..."
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleExtractUrl()}
          />
          <button
            className="button primary"
            style={{ fontSize: '11px', padding: '6px 10px', whiteSpace: 'nowrap' }}
            disabled={!urlInput.trim() || isExtracting}
            onClick={handleExtractUrl}
          >
            {isExtracting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Bóc Sub'}
          </button>
        </div>
      </div>

      {/* Import & Recording Buttons */}
      <button className="button primary" onClick={() => ref.current?.click()}>
        <UploadCloud className="w-3.5 h-3.5 inline mr-1.5" />
        Nhập Tệp Video / Audio / Ảnh
      </button>

      <button className="button" onClick={recording ? stopRecord : startRecord}>
        <Mic className="w-3.5 h-3.5 inline mr-1.5" />
        {recording ? '■ Dừng Ghi Âm Mic' : '● Ghi Âm Mic Trực Tiếp'}
      </button>

      {deviceNotice && (
        <div style={{ fontSize: '11px', padding: '6px 8px', background: 'rgba(240,80,80,0.12)', border: '1px solid rgba(240,80,80,0.3)', borderRadius: '6px', color: '#ff9999', lineHeight: 1.4 }}>
          ℹ️ {deviceNotice}
        </div>
      )}

      {/* AI Speech-to-Text & Image OCR Action */}
      <button
        className="button"
        disabled={!lastAudio.current}
        onClick={() => lastAudio.current && onTranscribe?.(lastAudio.current)}
      >
        <Brain className="w-3.5 h-3.5 inline mr-1.5 text-cyan-400" />
        {lastAudio.current ? '🎧 Bóc Băng Audio Mới (STT)' : 'Bóc Băng Audio (Chưa có file)'}
      </button>

      <button
        className="button"
        onClick={handleImageOcrClick}
        disabled={isOcrLoading}
      >
        <ImageIcon className="w-3.5 h-3.5 inline mr-1.5 text-purple-400" />
        {isOcrLoading ? 'Đang quét ảnh OCR…' : lastImage.current ? '🔍 Quét Chữ Ảnh (OCR) Mới' : 'Quét Chữ Ảnh (OCR Sang Sub)'}
      </button>

      <input
        ref={ref}
        hidden
        type="file"
        accept="video/*,audio/*,image/*"
        onChange={e => {
          const f = e.target.files?.[0];
          if (f) importFile(f);
        }}
      />

      <input
        ref={imgRef}
        hidden
        type="file"
        accept="image/*"
        onChange={e => {
          const f = e.target.files?.[0];
          if (f) {
            importFile(f);
            onImageOcr?.(f);
          }
        }}
      />

      <div className="muted" style={{ fontSize: '11px', lineHeight: 1.5 }}>
        Kéo thả file video, audio hoặc ảnh vào đây. Dữ liệu sẽ tự động chuyển thành clip hoặc phụ đề Vietsub trên Timeline.
      </div>
    </section>
  );
}
