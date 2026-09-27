export type ChannelId = 'video' | 'bgm' | 'tts' | 'master';
export type ChannelConfig = { gain: number; muted: boolean; ducking: boolean };

export class AudioEngine {
  readonly context: AudioContext;
  readonly input: Record<ChannelId, GainNode>;
  readonly ducking: DynamicsCompressorNode;
  private analyser: AnalyserNode;

  constructor() {
    this.context = new AudioContext();
    const master = this.context.createGain();
    const limiter = this.context.createDynamicsCompressor();
    limiter.threshold.value = -2;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.08;
    this.ducking = this.context.createDynamicsCompressor();
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 1024;
    master.connect(limiter).connect(this.analyser).connect(this.context.destination);
    this.input = {
      video: this.node('video', master), bgm: this.node('bgm', master), tts: this.node('tts', master), master
    } as Record<ChannelId, GainNode>;
  }

  private node(_id: string, destination: AudioNode) {
    const gain = this.context.createGain();
    gain.connect(destination);
    return gain;
  }

  setGain(id: ChannelId, gain: number, muted = false) {
    const node = this.input[id];
    node.gain.setTargetAtTime(muted ? 0 : gain, this.context.currentTime, 0.03);
  }

  setDucking(enabled: boolean, gain = 0.2) {
    const bgm = this.input.bgm;
    bgm.gain.setTargetAtTime(enabled ? gain : bgm.gain.value, this.context.currentTime, 0.08);
  }

  meter(id: ChannelId): number {
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / Math.max(1, data.length);
    return Math.min(1, avg / 128);
  }

  async resume() { if (this.context.state !== 'running') await this.context.resume(); }
  close() { void this.context.close(); }
}
