import { useEffect, useRef, useState, useCallback } from 'react';
import type { Clip, Project } from '../../types/project';
import { drawSubtitle, type SubtitleStyle } from '../../utils/subBurner';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Maximize2, PictureInPicture } from 'lucide-react';

function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const hundredths = Math.floor((totalSeconds % 1) * 100);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
}

export function CanvasPreview({
  project,
  currentTimeMs,
  onSeek
}: {
  project: Project;
  currentTimeMs: number;
  onSeek: (ms: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const isPlayingRef = useRef(false);
  isPlayingRef.current = isPlaying;
  const playbackRateRef = useRef(playbackRate);
  playbackRateRef.current = playbackRate;
  const currentTimeMsRef = useRef(currentTimeMs);
  currentTimeMsRef.current = currentTimeMs;

  const duration = Math.max(project.durationMs || 60000, ...project.clips.map(c => c.endMs));

  // Playback animation loop
  useEffect(() => {
    if (!isPlaying) return;
    let lastTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const delta = (now - lastTime) * playbackRateRef.current;
      lastTime = now;
      const nextTime = currentTimeMsRef.current + delta;
      if (nextTime >= duration) {
        onSeek(0);
        setIsPlaying(false);
      } else {
        onSeek(nextTime);
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, duration, onSeek]);

  // Spacebar toggle playback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(v => !v);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        onSeek(Math.max(0, currentTimeMsRef.current - 1000));
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        onSeek(Math.min(duration, currentTimeMsRef.current + 1000));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration, onSeek]);

  // Render canvas frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = project.width || 1280;
    const height = project.height || 720;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient / dark canvas
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0a0f18');
    bgGrad.addColorStop(1, '#05070c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const step = 64;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Header badge inside canvas
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(20, 20, 260, 42);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
    ctx.strokeRect(20, 20, 260, 42);

    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 16px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('🎬 AI STUDIO PRO', 36, 47);

    // Timecode in canvas corner
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${(currentTimeMs / 1000).toFixed(2)}s / ${(duration / 1000).toFixed(1)}s`, width - 24, 47);

    // Active visual clips preview representation
    const activeVideoClips = project.clips.filter(c => c.kind === 'video' && c.startMs <= currentTimeMs && c.endMs >= currentTimeMs);
    if (activeVideoClips.length > 0) {
      const activeClip = activeVideoClips[0];
      ctx.fillStyle = 'rgba(79, 124, 255, 0.12)';
      ctx.fillRect(40, 80, width - 80, height - 160);
      ctx.strokeStyle = 'rgba(79, 124, 255, 0.3)';
      ctx.strokeRect(40, 80, width - 80, height - 160);

      ctx.fillStyle = '#93c5fd';
      ctx.font = 'bold 24px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`▶ ${activeClip.label}`, width / 2, height / 2 - 10);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px monospace';
      ctx.fillText(`Clip ID: ${activeClip.id} · ${(activeClip.startMs / 1000).toFixed(1)}s - ${(activeClip.endMs / 1000).toFixed(1)}s`, width / 2, height / 2 + 25);
    } else {
      ctx.fillStyle = '#475569';
      ctx.font = '18px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Không có clip video tại thời điểm này', width / 2, height / 2);
    }

    // Active subtitle rendering
    const activeSubs = project.clips.filter(x => x.kind === 'subtitle' && x.startMs <= currentTimeMs && x.endMs >= currentTimeMs && x.text);
    if (activeSubs.length > 0) {
      const sub = activeSubs[0];
      const style: SubtitleStyle = {
        fontFamily: sub.style?.fontFamily || 'Arial, sans-serif',
        fontSize: sub.style?.fontSize || 42,
        color: sub.style?.color || '#ffffff',
        strokeColor: sub.style?.strokeColor || '#000000',
        strokeWidth: sub.style?.strokeWidth ?? 6,
        bottomPx: sub.style?.bottomPx || 55
      };
      drawSubtitle(ctx, sub.text!, style, width, height);
    }
  }, [project, currentTimeMs, duration]);

  const togglePiP = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        return;
      }
      if (!hiddenVideoRef.current) {
        const video = document.createElement('video');
        video.muted = true;
        video.autoplay = true;
        hiddenVideoRef.current = video;
      }
      const stream = canvas.captureStream(30);
      hiddenVideoRef.current.srcObject = stream;
      await hiddenVideoRef.current.play();
      await hiddenVideoRef.current.requestPictureInPicture();
    } catch (err) {
      console.warn('PiP không khả dụng:', err);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.warn(err));
    } else {
      document.exitFullscreen().catch(err => console.warn(err));
    }
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek(Math.max(0, Math.min(duration, ratio * duration)));
  };

  return (
    <section ref={containerRef} className="panel stack" style={{ position: 'relative' }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="row">
          <strong>Khung xem trước (Player)</strong>
          <span className="muted">
            {project.width}×{project.height} · {project.aspectRatio || '16:9'} · {project.fps} FPS
          </span>
        </div>
        <div className="row" style={{ gap: 4 }}>
          <button
            type="button"
            className="button"
            style={{ padding: '4px 8px', fontSize: 11 }}
            onClick={togglePiP}
            title="Hình trong hình (Picture-in-Picture)"
          >
            <PictureInPicture size={14} style={{ display: 'inline', marginRight: 4 }} /> PiP
          </button>
          <button
            type="button"
            className="button"
            style={{ padding: '4px 8px', fontSize: 11 }}
            onClick={toggleFullscreen}
            title="Toàn màn hình"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Screen Frame */}
      <div style={{ position: 'relative', width: '100%', borderRadius: 12, overflow: 'hidden', background: '#05070c' }}>
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: `${project.width} / ${project.height}`,
            maxHeight: '440px',
            objectFit: 'contain',
            cursor: 'pointer',
            margin: '0 auto'
          }}
        />
      </div>

      {/* Scrubber Progress Bar */}
      <div className="stack" style={{ gap: 6, marginTop: 4 }}>
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            onSeek(Math.max(0, Math.min(duration, ratio * duration)));
          }}
          style={{
            position: 'relative',
            height: 10,
            background: '#1a2234',
            borderRadius: 6,
            cursor: 'pointer',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, (currentTimeMs / duration) * 100)}%`,
              background: 'linear-gradient(90deg, #4f7cff, #22d3ee)',
              borderRadius: 6,
              transition: isPlaying ? 'none' : 'width 0.1s ease'
            }}
          />
        </div>

        {/* Player Controls Bar */}
        <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div className="row" style={{ gap: 6 }}>
            <button
              type="button"
              className={`button ${isPlaying ? 'primary' : ''}`}
              onClick={() => setIsPlaying(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 'bold' }}
              title="Phát / Dừng (Phím Space)"
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              {isPlaying ? 'Tạm dừng' : 'Phát'}
            </button>

            <button
              type="button"
              className="button"
              onClick={() => { onSeek(0); setIsPlaying(false); }}
              title="Về đầu (0s)"
            >
              <RotateCcw size={14} />
            </button>

            <button
              type="button"
              className="button"
              onClick={() => onSeek(Math.max(0, currentTimeMs - 1000))}
              title="Lùi 1 giây"
            >
              <SkipBack size={14} /> -1s
            </button>

            <button
              type="button"
              className="button"
              onClick={() => onSeek(Math.min(duration, currentTimeMs + 1000))}
              title="Tiến 1 giây"
            >
              +1s <SkipForward size={14} />
            </button>
          </div>

          <div className="row" style={{ gap: 10 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 'bold', color: '#22d3ee' }}>
              {formatTime(currentTimeMs)} <span style={{ color: '#64748b' }}>/ {formatTime(duration)}</span>
            </span>

            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(Number(e.target.value))}
              style={{
                background: '#1a2234',
                color: '#e2e8f0',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '4px 8px',
                fontSize: 12,
                cursor: 'pointer'
              }}
            >
              <option value="0.5">0.5x</option>
              <option value="1">1.0x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
