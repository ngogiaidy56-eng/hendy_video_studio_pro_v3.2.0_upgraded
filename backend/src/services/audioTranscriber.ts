import {GoogleGenAI} from '@google/genai';

type Cue = {startMs:number; endMs:number; text:string};
export async function transcribeAudio(data:Buffer, mimeType:string):Promise<Cue[]> {
  if (!process.env.GEMINI_API_KEY) return [];
  const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
  const prompt = 'Transcribe the spoken dialogue. Return only a JSON array of cues with startMs, endMs, text.';
  const response = await ai.models.generateContent({model:process.env.GEMINI_STT_MODEL || 'gemini-3.8-flash', contents:[{text:prompt},{inlineData:{mimeType,data:data.toString('base64')}}], config:{temperature:0}});
  try { return JSON.parse((response.text || '[]').replace(/^```json\s*|```$/g,'')); } catch { return []; }
}
