import crypto from 'node:crypto';

export function issueOtp(scope:string,ttlSeconds=60):string{
  return deriveOtp(scope,Math.floor(Date.now()/(ttlSeconds*1000)));
}

export function verifyOtp(scope:string,otp:string,ttlSeconds=60):boolean{
  const step=Math.floor(Date.now()/(ttlSeconds*1000));
  return constantTimeEqual(deriveOtp(scope,step),otp) || constantTimeEqual(deriveOtp(scope,step-1),otp);
}

function deriveOtp(scope:string,step:number):string{
  const secret=process.env.MCP_OTP_SECRET;
  if(!secret) throw new Error('MCP_OTP_SECRET is not configured');
  const digest=crypto.createHmac('sha256',secret).update(scope+':'+step).digest('hex');
  return digest.slice(0,8).toUpperCase();
}

function constantTimeEqual(a:string,b:string):boolean{
  const x=Buffer.from(a); const y=Buffer.from(String(b).toUpperCase());
  return x.length===y.length && crypto.timingSafeEqual(x,y);
}
