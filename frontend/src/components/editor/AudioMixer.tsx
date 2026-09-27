import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Mic, Music, Video, Sliders, Play, Square, Download, Sparkles } from 'lucide-react';
import { AudioEngine, type ChannelId } from '../../utils/audioEngine';
import { SYSTEM_CONFIG } from '../../generated/system-config';

type ChannelState = {
  gain: number;
  muted: boolean;
  ducking: boolean;
};

const CHANNELS: { id: ChannelId; name: string; icon: React.ReactNode; defaultGain: number }[] = [
  { id: 'video', name: 'Video Sound', icon: <Video className="w-3.5 h-3.5 text-cyan-400" />, defaultGain: 1.0 },
  { id: 'bgm', name: 'BGM Music', icon: <Music className="w-3.5 h-3.5 text-purple-400" />, defaultGain: 0.8 },
  { id: 'tts', name: 'AI Voiceover', icon: <Mic className="w-3.5 h-3.5 text-emerald-400" />, defaultGain: 1.0 },
  { id: 'master', name: 'Master Fader', icon: <Sliders className="w-3.5 h-3.5 text-amber-400" />, defaultGain: 1.0 },
];

export function AudioMixer({
  activeSubtitleText,
  onAiOptimize,
}: {
  activeSubtitleText?: string;
  onAiOptimize?: (channels: Record<ChannelId, ChannelState>) => Promise<Record<string, unknown> | void>;
}) {
  const [channels, setChannels] = useState<Record<ChannelId, ChannelState>>({
    video: { gain: 1.0, muted: false, ducking: false },
    bgm: { gain: 0.8, muted: false, ducking: true },
    tts: { gain: 1.0, muted: false, ducking: false },
    master: { gain: 1.0, muted: false, ducking: false },
  });

  const [duckingEnabled, setDuckingEnabled] = useState(true);
  const [isDuckingActive, setIsDuckingActive] = useState(false);
  const [running, setRunning] = useState(false);
  const [isPlayingBgmDemo, setIsPlayingBgmDemo] = useState(false);
  const [isSpeakingTts, setIsSpeakingTts] = useState(false);
  const [recordStatus, setRecordStatus] = useState<string | null>(null);

  const engine = useRef<AudioEngine | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const bgmNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);

  // Initialize or start audio engine
  const startAudio = async () => {
    try {
      if (!engine.current) {
        engine.current = new AudioEngine();
      }
      await engine.current.resume();
      setRunning(true);
    } catch (e) {
      console.warn('AudioEngine resume failed:', e);
    }
  };

  // Sync gains & ducking
  useEffect(() => {
    if (!engine.current) return;
    for (const ch of CHANNELS) {
      engine.current.setGain(ch.id, channels[ch.id].gain, channels[ch.id].muted);
    }
    const duckingGain = isDuckingActive ? (SYSTEM_CONFIG.editor?.duckingGain ?? 0.2) : channels.bgm.gain;
    engine.current.setDucking(duckingEnabled && isDuckingActive, duckingGain);
  }, [channels, duckingEnabled, isDuckingActive]);

  // Waveform visualization on Master channel
  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mounted = true;
    const draw = () => {
      if (!mounted) return;
      ctx.fillStyle = '#0a0f18';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const level = engine.current?.meter('master') || 0;
      const t = Date.now() / 200;

      // Draw dynamic multi-frequency waveform
      ctx.lineWidth = 2;
      ctx.strokeStyle = isDuckingActive ? '#fbbf24' : '#22d3ee';
      ctx.beginPath();
      const mid = canvas.height / 2;
      for (let x = 0; x < canvas.width; x++) {
        const norm = (x / canvas.width) * 4 * Math.PI;
        const amp = (level * 16 + (isPlayingBgmDemo || isSpeakingTts ? 10 : 2)) * Math.sin(norm + t) * Math.cos(norm * 0.5 - t * 0.3);
        const y = mid + amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      mounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [running, isPlayingBgmDemo, isSpeakingTts, isDuckingActive]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopBgmDemo();
      engine.current?.close();
    };
  }, []);

  // Play procedural Cinematic Ambient Chords demo on BGM channel
  const toggleBgmDemo = async () => {
    if (isPlayingBgmDemo) {
      stopBgmDemo();
      return;
    }

    await startAudio();
    if (!engine.current?.context) return;
    const ctx = engine.current.context;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const demoGain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(196.00, ctx.currentTime); // G3

      demoGain.gain.setValueAtTime(0.01, ctx.currentTime);
      demoGain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 1.2);

      osc1.connect(demoGain);
      osc2.connect(demoGain);

      // Connect to engine's BGM node
      demoGain.connect(engine.current.input.bgm);

      osc1.start();
      osc2.start();

      bgmNodesRef.current = { osc1, osc2, gain: demoGain };
      setIsPlayingBgmDemo(true);
    } catch (e) {
      console.warn('Could not start BGM synth demo:', e);
    }
  };

  const stopBgmDemo = () => {
    if (bgmNodesRef.current) {
      try {
        const { osc1, osc2, gain } = bgmNodesRef.current;
        if (engine.current?.context) {
          gain.gain.setValueAtTime(gain.gain.value, engine.current.context.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, engine.current.context.currentTime + 0.3);
        }
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
            osc1.disconnect();
            osc2.disconnect();
            gain.disconnect();
          } catch {}
        }, 350);
      } catch {}
      bgmNodesRef.current = null;
    }
    setIsPlayingBgmDemo(false);
  };

  // Web Speech API: "AI DỊCH VIETSUB"
  const speakVietnameseSubtitle = async () => {
    const textToSpeak = activeSubtitleText || 'Xin chào từ Hendy Video Studio Pro, hệ thống âm thanh 4 kênh đã sẵn sàng.';
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ Web Speech API.');
      return;
    }

    await startAudio();
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Trigger Auto-Ducking
    utterance.onstart = () => {
      setIsSpeakingTts(true);
      if (duckingEnabled) {
        setIsDuckingActive(true);
      }
    };

    utterance.onend = () => {
      setIsSpeakingTts(false);
      setIsDuckingActive(false);
    };

    utterance.onerror = () => {
      setIsSpeakingTts(false);
      setIsDuckingActive(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Export Master Audio recording via MediaRecorder
  const toggleRecordMaster = async () => {
    await startAudio();
    if (!engine.current?.context) return;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      return;
    }

    try {
      const dest = engine.current.context.createMediaStreamDestination();
      engine.current.input.master.connect(dest);

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const mr = new MediaRecorder(dest.stream, { mimeType });
      recordedChunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mixed-audio-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setRecordStatus(null);
      };

      mr.start();
      mediaRecorderRef.current = mr;
      setRecordStatus('RECORDING');
    } catch (e) {
      console.warn('MediaRecorder error:', e);
      setRecordStatus('ERROR');
    }
  };

  return (
    <section className="panel stack" style={{ background: '#0a101d', border: '1px solid rgba(148,163,184,0.14)' }}>
      {/* Header */}
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="row" style={{ gap: '8px' }}>
          <Sliders className="w-4 h-4 text-cyan-400" />
          <strong style={{ fontSize: '13px' }}>4-Channel Hardware Mixer</strong>
          {isDuckingActive && (
            <span style={{ fontSize: '10px', background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
              DUCKING 20%
            </span>
          )}
        </div>
        <div className="row" style={{ gap: '6px' }}>
          <button className="button" style={{ fontSize: '11px', padding: '4px 8px' }} onClick={startAudio}>
            {running ? 'Audio ON' : 'Start Audio'}
          </button>
          <button
            className="button"
            style={{ fontSize: '11px', padding: '4px 8px', color: duckingEnabled ? '#22d3ee' : '#888' }}
            onClick={() => setDuckingEnabled(v => !v)}
            title="Auto-Ducking giảm 80% volume BGM khi TTS phát"
          >
            {duckingEnabled ? 'Ducking ON' : 'Ducking OFF'}
          </button>
        </div>
      </div>

      {/* Live Waveform Canvas */}
      <div style={{ position: 'relative', width: '100%', height: '46px', background: '#080d16', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(148,163,184,0.1)' }}>
        <canvas ref={canvasRef} width={400} height={46} style={{ width: '100%', height: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', top: 4, right: 8, fontSize: '9px', color: '#64748b', fontFamily: 'monospace' }}>
          MASTER WAVEFORM
        </div>
      </div>

      {/* 4 Hardware Faders */}
      <div className="stack" style={{ gap: '8px' }}>
        {CHANNELS.map(ch => {
          const state = channels[ch.id];
          const isDucked = ch.id === 'bgm' && isDuckingActive && duckingEnabled;
          const displayGain = isDucked ? 0.2 : state.gain;

          return (
            <div key={ch.id} className="row" style={{ gap: '8px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '4px 8px', borderRadius: '6px' }}>
              <div className="row" style={{ width: '92px', gap: '5px' }}>
                {ch.icon}
                <span style={{ fontSize: '11px', fontWeight: 600 }}>{ch.name.split(' ')[0]}</span>
              </div>

              <input
                type="range"
                min="0"
                max="1.5"
                step="0.01"
                value={state.gain}
                disabled={state.muted}
                style={{ flex: 1, accentColor: isDucked ? '#fbbf24' : '#22d3ee' }}
                onChange={e => {
                  const val = Number(e.target.value);
                  setChannels(s => ({ ...s, [ch.id]: { ...s[ch.id], gain: val } }));
                }}
              />

              <span style={{ width: '38px', fontSize: '11px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: isDucked ? '#fbbf24' : 'inherit' }}>
                {(displayGain * 100).toFixed(0)}%
              </span>

              <button
                className="button"
                style={{ padding: '3px 6px', fontSize: '10px', color: state.muted ? '#fb7185' : 'inherit' }}
                onClick={() => setChannels(s => ({ ...s, [ch.id]: { ...s[ch.id], muted: !s[ch.id].muted } }))}
              >
                {state.muted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Action Toolbar */}
      <div className="row" style={{ gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
        <button
          className="button"
          style={{ flex: 1, fontSize: '11px', padding: '6px 8px', background: isPlayingBgmDemo ? 'rgba(139,92,246,0.2)' : undefined, borderColor: isPlayingBgmDemo ? '#8b5cf6' : undefined }}
          onClick={toggleBgmDemo}
          title="Chơi nhạc nền Ambient Chords thử nghiệm kênh BGM"
        >
          {isPlayingBgmDemo ? <Square className="w-3 h-3 inline mr-1 text-purple-400" /> : <Play className="w-3 h-3 inline mr-1" />}
          {isPlayingBgmDemo ? 'Dừng BGM Demo' : '🎵 BGM Ambient Chords'}
        </button>

        <button
          className="button primary"
          style={{ flex: 1.2, fontSize: '11px', padding: '6px 8px', background: isSpeakingTts ? '#10b981' : undefined }}
          onClick={speakVietnameseSubtitle}
          title="Web Speech API đọc thuyết minh tiếng Việt và tự động kích hoạt Auto-Ducking"
        >
          <Mic className="w-3 h-3 inline mr-1" />
          {isSpeakingTts ? 'Đang đọc thuyết minh…' : '🗣️ AI DỊCH VIETSUB'}
        </button>

        <button
          className="button"
          style={{ fontSize: '11px', padding: '6px 8px', borderColor: recordStatus ? '#ef4444' : undefined, color: recordStatus ? '#ef4444' : undefined }}
          onClick={toggleRecordMaster}
          title="MediaRecorder xuất file hòa âm master"
        >
          <Download className="w-3 h-3 inline mr-1" />
          {recordStatus === 'RECORDING' ? 'Dừng & Tải Audio' : 'Xuất Audio'}
        </button>
      </div>

      {/* AI Mix Recommendation Button */}
      <button
        className="button"
        style={{ fontSize: '11px', padding: '6px', background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.25)', color: '#22d3ee' }}
        onClick={async () => {
          await startAudio();
          await onAiOptimize?.(channels);
        }}
      >
        <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
        AI Tối Ưu Hóa Cân Bằng Âm Thanh (AI Mix)
      </button>
    </section>
  );
}

export default AudioMixer;
