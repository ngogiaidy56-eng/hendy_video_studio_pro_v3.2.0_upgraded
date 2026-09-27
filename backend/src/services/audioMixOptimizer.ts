import { gemini, modelFor, cleanJson } from './geminiClient.js';

export type AudioMixInput = {
  channels: Array<{ id: string; gain: number; muted?: boolean; ducking?: boolean }>;
  voicePresent?: boolean;
  targetLufs?: number;
};

export async function optimizeAudioMix(input: AudioMixInput) {
  const client = gemini();
  const response = await client.models.generateContent({
    model: modelFor('audioMix', 'gemini-3.8-flash'),
    contents: [{ text: `Analyze a four-channel video mix and return JSON only with optimized gains and ducking. Target loudness ${input.targetLufs ?? -14} LUFS. Input: ${JSON.stringify(input)}` }],
    config: { temperature: 0.1, responseMimeType: 'application/json' }
  });
  const raw = cleanJson(response.text || '{}');
  try { return JSON.parse(raw); } catch { return { channels: input.channels, reason: 'AI response was not valid JSON' }; }
}
