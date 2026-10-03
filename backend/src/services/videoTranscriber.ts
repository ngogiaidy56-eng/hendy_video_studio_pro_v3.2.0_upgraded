import {transcribeAudio} from './audioTranscriber.js';
export async function transcribeVideoAudio(data:Buffer):Promise<ReturnType<typeof transcribeAudio>> {
  // Production: demux audio with FFmpeg before Gemini. This scaffold expects audio bytes.
  return transcribeAudio(data, 'audio/mpeg');
}
