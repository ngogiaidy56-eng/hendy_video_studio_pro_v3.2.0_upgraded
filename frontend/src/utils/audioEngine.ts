export type ChannelId = 'video' | 'bgm' | 'tts' | 'master';
export type ChannelConfig = { gain: number; muted: boolean; ducking: boolean };

export class AudioEngine {
  readonly context: AudioContext | null = null;
  readonly input: Record<ChannelId, GainNode>;
  readonly ducking?: DynamicsCompressorNode;
  private analyser?: AnalyserNode;

  constructor() {
    let ctx: AudioContext | null = null;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (typeof AudioCtx !== 'undefined') {
        ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn('AudioContext unavailable:', e);
    }

    this.context = ctx;
    if (ctx) {
      try {
        const master = ctx.createGain();
        const limiter = ctx.createDynamicsCompressor();
        limiter.threshold.value = -2;
        limiter.knee.value = 0;
        limiter.ratio.value = 20;
        limiter.attack.value = 0.003;
        limiter.release.value = 0.08;
        this.ducking = ctx.createDynamicsCompressor();
        this.analyser = ctx.createAnalyser();
        this.analyser.fftSize = 1024;
        master.connect(limiter).connect(this.analyser).connect(ctx.destination);
        this.input = {
          video: this.node('video', master),
          bgm: this.node('bgm', master),
          tts: this.node('tts', master),
          master
        } as Record<ChannelId, GainNode>;
        return;
      } catch (err) {
        console.warn('Audio graph creation failed:', err);
      }
    }

    this.input = {
      video: {} as GainNode,
      bgm: {} as GainNode,
      tts: {} as GainNode,
      master: {} as GainNode,
    };
  }

  private node(_id: string, destination: AudioNode) {
    if (!this.context) return {} as GainNode;
    const gain = this.context.createGain();
    gain.connect(destination);
    return gain;
  }

  setGain(id: ChannelId, gain: number, muted = false) {
    const node = this.input[id];
    if (this.context && node && node.gain) {
      try {
        node.gain.setTargetAtTime(muted ? 0 : gain, this.context.currentTime, 0.03);
      } catch {}
    }
  }

  setDucking(enabled: boolean, gain = 0.2) {
    const bgm = this.input.bgm;
    if (this.context && bgm && bgm.gain) {
      try {
        bgm.gain.setTargetAtTime(enabled ? gain : bgm.gain.value, this.context.currentTime, 0.08);
      } catch {}
    }
  }

  meter(_id: ChannelId): number {
    if (!this.analyser) return 0;
    try {
      const data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / Math.max(1, data.length);
      return Math.min(1, avg / 128);
    } catch {
      return 0;
    }
  }

  async resume() {
    if (this.context && this.context.state !== 'running') {
      try {
        await this.context.resume();
      } catch (e) {
        console.warn('AudioContext resume failed:', e);
      }
    }
  }

  close() {
    if (this.context) {
      void this.context.close().catch(() => {});
    }
  }
}
