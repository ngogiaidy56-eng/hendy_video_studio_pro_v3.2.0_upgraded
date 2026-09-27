import { gemini, modelFor, cleanJson } from './geminiClient.js';

export async function createStoryboard(script: string) {
  const client = gemini();
  const response = await client.models.generateContent({
    model: modelFor('storyboard', 'gemini-3.8-flash'),
    contents: [{ text: `Create a production-ready video storyboard from this script. Return JSON only: {title, scenes:[{id,startMs,endMs,visual,prompt,voiceover}]}\nSCRIPT:\n${script}` }],
    config: { temperature: 0.2, responseMimeType: 'application/json' }
  });
  try { return JSON.parse(cleanJson(response.text || '{}')); } catch { return { title: 'Storyboard', scenes: [] }; }
}
