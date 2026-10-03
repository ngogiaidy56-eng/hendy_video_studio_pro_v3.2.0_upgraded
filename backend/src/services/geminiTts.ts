import { gemini, modelFor } from './geminiClient.js';

export type GeminiTtsOptions = {
  text: string;
  voice?: string;
  style?: string;
  mimeType?: 'audio/wav' | 'audio/l16' | 'audio/mulaw' | 'audio/alaw';
  sampleRate?: number;
};

export async function synthesizeGeminiTts(options: GeminiTtsOptions) {
  const client = gemini();
  const model = modelFor('tts', 'gemini-3.8-flash-tts');
  const interaction = await client.interactions.create({
    model,
    input: [{
      type: 'user_input',
      content: [{
        type: 'text',
        text: options.text,
        annotations: options.style ? [{ type: 'speech_metadata', style: options.style }] : undefined
      }]
    }],
    response_format: {
      type: 'audio',
      mime_type: options.mimeType || 'audio/wav',
      ...(options.sampleRate ? { sample_rate: options.sampleRate } : {})
    },
    generation_config: {
      speech_config: [{ voice: options.voice || process.env.GEMINI_TTS_VOICE || 'Kore' }]
    }
  });
  const data = interaction.output_audio?.data;
  if (!data) throw new Error('Gemini TTS returned no audio payload');
  return {
    model,
    mimeType: options.mimeType || 'audio/wav',
    base64: data,
    bytes: Buffer.from(data, 'base64').byteLength
  };
}
