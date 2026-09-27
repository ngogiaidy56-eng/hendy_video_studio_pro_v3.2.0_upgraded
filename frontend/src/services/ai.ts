import { api } from './api';

export async function generateGeminiTts(text:string, opts:{voice?:string;style?:string}={}) {
  return api<{model:string;mimeType:string;base64:string;bytes:number}>('/api/gemini/tts', {
    method:'POST', body:JSON.stringify({text,...opts})
  });
}

export async function transcribeAudioFile(file:File) {
  const form = new FormData();
  form.set('audio', file);
  return api<{cues:Array<{startMs:number;endMs:number;text:string}>}>('/api/gemini/transcribe', {
    method:'POST', body:form
  });
}

export async function enhanceVietnamese(text:string) {
  return api<{text:string;alternatives:string[]}>('/api/gemini/enhance-vietnamese', {
    method:'POST', body:JSON.stringify({text})
  });
}

export async function createStoryboard(script:string) {
  return api<Record<string,unknown>>('/api/gemini/create-video', {method:'POST',body:JSON.stringify({script})});
}

export async function optimizeAudioMix(channels:Array<Record<string,unknown>>) {
  return api<Record<string,unknown>>('/api/gemini/audio-mix', {method:'POST',body:JSON.stringify({channels,voicePresent:true})});
}
