import {Router} from 'express';
import multer from 'multer';
import {transcribeAudio} from '../services/audioTranscriber.js';
import {transcribeVideoAudio} from '../services/videoTranscriber.js';
import {translateImage} from '../services/imageTranslator.js';
import {uploadToR2} from '../services/r2Storage.js';
import {extractSubtitlesFromUrl} from '../services/extractor.js';

const upload = multer({storage:multer.memoryStorage(),limits:{fileSize:512*1024*1024}});
export const mediaRouter = Router();
mediaRouter.post('/audio/transcribe',upload.single('file'),async(req,res)=>{ if(!req.file)return res.status(400).json({error:'file required'}); res.json({cues:await transcribeAudio(req.file.buffer,req.file.mimetype)}); });
mediaRouter.post('/video/transcribe',upload.single('file'),async(req,res)=>{ if(!req.file)return res.status(400).json({error:'file required'}); res.json({cues:await transcribeVideoAudio(req.file.buffer)}); });
mediaRouter.post('/image/translate',upload.single('file'),async(req,res)=>{ if(!req.file)return res.status(400).json({error:'file required'}); res.json(await translateImage(req.file.buffer,req.file.mimetype,String(req.body?.target || 'vi'))); });
mediaRouter.post('/extract-url',async(req,res)=>{
  const url = String(req.body?.url || '').trim();
  if(!url) return res.status(400).json({error:'url is required'});
  try {
    const result = await extractSubtitlesFromUrl(url);
    res.json(result);
  } catch(err: unknown) {
    res.status(500).json({error: err instanceof Error ? err.message : 'Extraction failed'});
  }
});
mediaRouter.post('/upload',upload.single('file'),async(req,res)=>{ if(!req.file)return res.status(400).json({error:'file required'}); const key=`uploads/${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9._-]/g,'_')}`; res.status(201).json(await uploadToR2(key,req.file.buffer,req.file.mimetype)); });
