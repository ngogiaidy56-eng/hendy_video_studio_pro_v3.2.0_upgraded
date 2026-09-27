import {GoogleGenAI} from '@google/genai';
export async function translateImage(data:Buffer, mimeType:string, target='vi'):Promise<{sourceText:string; translatedText:string}> {
  if (!process.env.GEMINI_API_KEY) return {sourceText:'', translatedText:''};
  const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
  const response = await ai.models.generateContent({model:process.env.GEMINI_OCR_MODEL || 'gemini-3.8-flash', contents:[{text:`Read text in image and translate it to ${target}. Return JSON {sourceText, translatedText}.`},{inlineData:{mimeType,data:data.toString('base64')}}], config:{temperature:0.1}});
  try { return JSON.parse((response.text || '{}').replace(/^```json\s*|```$/g,'')); } catch { return {sourceText:'', translatedText:''}; }
}
