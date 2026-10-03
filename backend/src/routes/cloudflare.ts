import { Router } from 'express';
import { synthesizeCloudflareTts } from '../services/cloudflareTts.js';
export const cloudflareRouter = Router();
cloudflareRouter.post('/tts', async (req, res, next) => {
  try { res.json(await synthesizeCloudflareTts(String(req.body?.text || ''), req.body?.lang || 'vi')); }
  catch (e) { next(e); }
});
