import {GoogleGenAI} from '@google/genai';

type Cue = {startMs:number; endMs:number; text:string};

export async function translateSubtitleChunk(cues:Cue[], targetLanguage='vi'):Promise<Cue[]> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return cues;
  const ai = new GoogleGenAI({apiKey:key});
  const prompt = `Translate subtitle cues to ${targetLanguage}. Preserve JSON shape exactly. Return only JSON array. Cues: ${JSON.stringify(cues)}`;
  const response = await ai.models.generateContent({model:process.env.GEMINI_TRANSLATION_MODEL || 'gemini-2.5-flash', contents:prompt, config:{temperature:Number(process.env.GEMINI_TEMPERATURE || '0.1')}});
  const text = response.text?.trim() || '[]';
  try { return JSON.parse(text.replace(/^```json\s*|```$/g,'')); } catch { return cues; }
}
