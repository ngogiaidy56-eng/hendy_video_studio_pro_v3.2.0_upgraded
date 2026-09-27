export type RenderFrame = (ctx: CanvasRenderingContext2D, timeMs: number) => void;

export function createCanvasStream(canvas: HTMLCanvasElement, fps = 30) {
  return canvas.captureStream(fps);
}

export function exportCanvasVideo(canvas: HTMLCanvasElement, renderFrame: RenderFrame, durationMs: number, fps = 30): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const stream = createCanvasStream(canvas, fps);
    const preferred = [
      'video/mp4;codecs=avc1.64003E',
      'video/mp4',
      'video/webm;codecs=vp9,opus',
      'video/webm'
    ].find((type) => MediaRecorder.isTypeSupported(type));
    if (!preferred) return reject(new Error('No supported MediaRecorder video codec in this browser'));
    const chunks: BlobPart[] = [];
    const recorder = new MediaRecorder(stream, { mimeType: preferred, videoBitsPerSecond: 8_000_000 });
    const started = performance.now();
    recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
    recorder.onerror = (e) => reject((e as ErrorEvent).error || new Error('MediaRecorder failed'));
    recorder.onstop = () => resolve(new Blob(chunks, { type: preferred }));
    recorder.start(200);
    const tick = (now: number) => {
      const elapsed = now - started;
      renderFrame(canvas.getContext('2d')!, Math.min(durationMs, elapsed));
      if (elapsed >= durationMs) recorder.stop(); else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
