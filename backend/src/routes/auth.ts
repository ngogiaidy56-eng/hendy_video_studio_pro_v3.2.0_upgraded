import {Router} from 'express';
import {verifyTelegramRequest} from '../services/auth.js';
import {issueOtp, verifyOtp} from '../services/otpService.js';

export const authRouter = Router();
authRouter.post('/telegram/verify',(req,res)=>{
  try { const user = verifyTelegramRequest(String(req.body?.initData || '')); res.json({ok:true,user}); }
  catch(e){ res.status(401).json({ok:false,error:e instanceof Error?e.message:'Unauthorized'}); }
});

authRouter.post('/mcp/otp/issue',(req,res)=>{
  const scope = String(req.body?.scope || 'admin');
  const otp = issueOtp(scope, Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60));
  // Production: deliver OTP privately through Telegram bot, never expose this route publicly.
  res.status(201).json({ok:true,otp,expiresIn:Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60)});
});

authRouter.post('/mcp/otp/verify',(req,res)=>{
  const ok = verifyOtp(String(req.body?.scope || 'admin'),String(req.body?.otp || ''));
  res.json({ok});
});
