import { GoogleGenAI } from '@google/genai';

export function gemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');
  return new GoogleGenAI({ apiKey });
}

export function modelFor(key: string, fallback: string) {
  return process.env[`GEMINI_${key.toUpperCase()}_MODEL`] || fallback;
}

export function cleanJson(text: string): string {
  return text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
}
