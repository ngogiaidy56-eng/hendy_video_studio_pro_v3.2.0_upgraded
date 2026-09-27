import { Router } from 'express';
import multer from 'multer';
import { translateSubtitleChunk } from '../services/vietsubAi.js';
import { transcribeAudio } from '../services/audioTranscriber.js';
import { synthesizeGeminiTts } from '../services/geminiTts.js';
import { optimizeAudioMix } from '../services/audioMixOptimizer.js';
import { createStoryboard } from '../services/storyboardGenerator.js';
import { enhanceVietnamese } from '../services/vietnameseEnhancer.js';

const upload = multer({ limits: { fileSize: Number(process.env.MAX_AI_UPLOAD_BYTES || 50_000_000) } });
export const geminiRouter = Router();

geminiRouter.post('/subtitles', async (req, res, next) => { try { res.json({ cues: await translateSubtitleChunk(req.body?.cues || [], req.body?.targetLanguage || 'vi') }); } catch (e) { next(e); } });
geminiRouter.post('/tts', async (req, res, next) => { try { const r = await synthesizeGeminiTts({ text: String(req.body?.text || ''), voice: req.body?.voice, style: req.body?.style, mimeType: req.body?.mimeType, sampleRate: req.body?.sampleRate }); res.json(r); } catch (e) { next(e); } });
geminiRouter.post('/audio-mix', async (req, res, next) => { try { res.json(await optimizeAudioMix(req.body || { channels: [] })); } catch (e) { next(e); } });
geminiRouter.post('/create-video', async (req, res, next) => { try { res.json(await createStoryboard(String(req.body?.script || ''))); } catch (e) { next(e); } });
geminiRouter.post('/transcribe', upload.single('audio'), async (req, res, next) => { try { if (!req.file) return res.status(400).json({ error: 'audio file is required' }); res.json({ cues: await transcribeAudio(req.file.buffer, req.file.mimetype) }); } catch (e) { next(e); } });
geminiRouter.post('/enhance-vietnamese', async (req, res, next) => { try { res.json(await enhanceVietnamese(String(req.body?.text || ''))); } catch (e) { next(e); } });
