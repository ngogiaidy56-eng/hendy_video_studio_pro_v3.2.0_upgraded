import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {authRouter} from './routes/auth.js';
import {mediaRouter} from './routes/media.js';
import {projectRouter} from './routes/projects.js';
import {smartDownload} from './controllers/downloadController.js';

const app = express();
app.disable('x-powered-by');
app.use(cors({origin:(process.env.FRONTEND_ORIGIN || 'http://localhost:5173').split(',')}));
app.use(express.json({limit:'4mb'}));
app.get('/health',(req,res)=>res.json({ok:true,version:'2.4.0',timestamp:new Date().toISOString()}));
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/media',mediaRouter);
app.use('/api/v1/projects',projectRouter);
app.get('/tai-app',smartDownload);
app.use((err:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{console.error(err);res.status(500).json({error:'Internal server error'});});

const port=Number(process.env.BACKEND_PORT || 8787);
app.listen(port,'0.0.0.0',()=>console.log(`Backend listening on :${port}`));
