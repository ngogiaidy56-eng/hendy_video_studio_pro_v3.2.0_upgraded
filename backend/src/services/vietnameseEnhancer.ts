import { gemini, modelFor, cleanJson } from './geminiClient.js';

export async function enhanceVietnamese(text: string) {
  const client = gemini();
  const response = await client.models.generateContent({
    model: modelFor('vietnamese', 'gemini-3.8-flash'),
    contents: [{ text: `Recover Vietnamese diacritics and polish this subtitle for natural cinematic phrasing. Preserve meaning. Return JSON only as {text:string, alternatives:string[]}.\nINPUT:\n${text}` }],
    config: { temperature: 0.15, responseMimeType: 'application/json' }
  });
  try { return JSON.parse(cleanJson(response.text || '{}')); } catch { return { text, alternatives: [] }; }
}
