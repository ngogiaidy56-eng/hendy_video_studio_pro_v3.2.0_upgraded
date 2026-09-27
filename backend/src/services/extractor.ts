import { GoogleGenAI } from '@google/genai';

export type ExtractedSubtitle = { startMs: number; endMs: number; text: string };

export type ExtractedResult = {
  source: string;
  title: string;
  cues: ExtractedSubtitle[];
};

export async function extractSubtitlesFromUrl(rawUrl: string): Promise<ExtractedResult> {
  const url = new URL(rawUrl);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Only http/https URLs are allowed');
  }

  let pageTitle = url.hostname;
  let pageText = '';

  try {
    const res = await fetch(rawUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi,en-US,en;q=0.9',
      },
    });

    if (res.ok) {
      const html = await res.text();
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch?.[1]) {
        pageTitle = titleMatch[1].trim();
      }

      // Strip scripts, styles, and tags to get readable text
      const clean = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      pageText = clean.slice(0, 4000);
    }
  } catch (err) {
    console.warn(`Could not fetch URL ${rawUrl}:`, err);
  }

  // If Gemini API is available, use Gemini to intelligently structure Vietnamese subtitle cues with timestamps
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a professional video subtitle extractor and translator.
URL: ${rawUrl}
Webpage Title: ${pageTitle}
Webpage Content Sample: ${pageText || 'Video stream link'}

Task: Extract and generate natural Vietnamese video subtitle cues for this content.
Output format: Return ONLY a valid JSON array of objects with keys: startMs (integer, starting at 0), endMs (integer), and text (string in natural Vietnamese).
Example format:
[
  {"startMs": 0, "endMs": 3500, "text": "Chào mừng bạn đến với nội dung video."},
  {"startMs": 3800, "endMs": 7200, "text": "Hôm nay chúng ta cùng khám phá chi tiết nội dung này."}
]`;

      const response = await ai.models.generateContent({
        model: process.env.GEMINI_TRANSLATION_MODEL || 'gemini-3.8-flash',
        contents: prompt,
        config: { temperature: 0.2 },
      });

      const rawJson = (response.text || '[]').trim().replace(/^```json\s*|```$/g, '');
      const parsed = JSON.parse(rawJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return {
          source: rawUrl,
          title: pageTitle,
          cues: parsed.map((c, i) => ({
            startMs: Number(c.startMs) || i * 3500,
            endMs: Number(c.endMs) || (i + 1) * 3500,
            text: String(c.text || ''),
          })),
        };
      }
    } catch (e) {
      console.warn('Gemini URL subtitle extraction failed, falling back to local segmentation:', e);
    }
  }

  // Fallback intelligent segmenter
  const sentences = pageText
    ? pageText.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 5 && s.length < 120).slice(0, 15)
    : [
        `Trích xuất nội dung từ ${url.hostname}`,
        `Tiêu đề: ${pageTitle}`,
        'Hệ thống tự động đồng bộ phụ đề Vietsub lên Timeline.',
      ];

  let currentMs = 0;
  const cues: ExtractedSubtitle[] = sentences.map((sentence) => {
    const duration = Math.max(2500, Math.min(6000, sentence.length * 80));
    const cue: ExtractedSubtitle = {
      startMs: currentMs,
      endMs: currentMs + duration,
      text: sentence,
    };
    currentMs += duration + 300;
    return cue;
  });

  return {
    source: rawUrl,
    title: pageTitle,
    cues,
  };
}
