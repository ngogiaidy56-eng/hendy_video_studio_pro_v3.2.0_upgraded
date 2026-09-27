import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {authRouter} from './routes/auth.js';
import {mediaRouter} from './routes/media.js';
import {projectRouter} from './routes/projects.js';
import {smartDownload} from './controllers/downloadController.js';
import {geminiRouter} from './routes/gemini.js';
import {cloudflareRouter} from './routes/cloudflare.js';
import {mcpRouter} from './routes/mcp.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors({origin:(process.env.FRONTEND_ORIGIN || '*').split(',')}));
  app.use(express.json({limit:'4mb'}));
  app.get(['/health','/api/health'],(req,res)=>res.json({ok:true,service:'express-backend',version:'2.4.0',runtime:'workers-node-compat'}));
  app.get('/health/ready',(req,res)=>{
    const checks = {
      gemini:Boolean(process.env.GEMINI_API_KEY),
      telegram:Boolean(process.env.TELEGRAM_BOT_TOKEN),
      r2:Boolean(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET)
    };
    const ready=Object.values(checks).every(Boolean);
    res.status(ready?200:503).json({ok:ready,checks});
  });
  app.use('/api/v1/auth',authRouter);
  app.use('/api/v1/media',mediaRouter);
  app.use('/api/v1/projects',projectRouter);
  app.use('/api/gemini',geminiRouter);
  app.use('/api/cloudflare',cloudflareRouter);
  app.use('/mcp',mcpRouter);
  app.get('/tai-app',smartDownload);
  app.use((err:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{
    console.error(err);
    res.status(500).json({error:'Internal server error'});
  });
  return app;
}
export const app=createApp();
