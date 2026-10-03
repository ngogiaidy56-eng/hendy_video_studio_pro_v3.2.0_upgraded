import {Router} from 'express';
import crypto from 'node:crypto';
import {saveRecoverySnapshot, restoreRecoverySnapshot} from '../services/recoveryService.js';
export const projectRouter = Router();
projectRouter.post('/snapshot',(req,res)=>{const projectId=String(req.body?.projectId || crypto.randomUUID()); saveRecoverySnapshot(projectId,req.body?.project); res.status(201).json({ok:true,projectId});});
projectRouter.get('/:id/recovery',(req,res)=>res.json({projectId:req.params.id,payload:restoreRecoverySnapshot(req.params.id)}));
