import {Router} from 'express';
import {verifyTelegramRequest} from '../services/auth.js';
import {issueOtp,verifyOtp} from '../services/otpService.js';

export const authRouter=Router();

authRouter.post('/telegram/verify',(req,res)=>{
  try{
    const user=verifyTelegramRequest(String(req.body?.initData || ''));
    res.json({ok:true,user});
  }catch(e){
    res.status(401).json({ok:false,error:e instanceof Error?e.message:'Unauthorized'});
  }
});

authRouter.post('/mcp/otp/issue',(req,res)=>{
  try{
    const initData=String(req.header('x-telegram-init-data') || req.body?.initData || '');
    const user=verifyTelegramRequest(initData);
    if(!['admin','maintainer'].includes(user.role)) return res.status(403).json({ok:false,error:'Admin role required'});
    const ttl=Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60);
    const otp=issueOtp('admin:'+user.id,ttl);
    res.status(201).json({ok:true,otp,expiresIn:ttl});
  }catch(e){
    res.status(401).json({ok:false,error:e instanceof Error?e.message:'Unauthorized'});
  }
});

authRouter.post('/mcp/otp/verify',(req,res)=>{
  try{
    const initData=String(req.header('x-telegram-init-data') || '');
    const user=verifyTelegramRequest(initData);
    if(!['admin','maintainer'].includes(user.role)) return res.status(403).json({ok:false,error:'Admin role required'});
    const ttl=Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60);
    const ok=verifyOtp('admin:'+user.id,String(req.body?.otp || ''),ttl);
    res.json({ok});
  }catch(e){
    res.status(401).json({ok:false,error:e instanceof Error?e.message:'Unauthorized'});
  }
});
