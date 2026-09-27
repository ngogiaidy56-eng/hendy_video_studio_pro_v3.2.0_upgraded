type Env={TELEGRAM_BOT_TOKEN:string;MCP_OTP_SECRET:string;ADMIN_APP_URL?:string};
async function telegram(env:Env,method:string,body:unknown){
  const r=await fetch('https://api.telegram.org/bot'+env.TELEGRAM_BOT_TOKEN+'/'+method,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  return r.json();
}
async function send(env:Env,chatId:number|string,text:string,extra:Record<string,unknown>={}){return telegram(env,'sendMessage',{chat_id:chatId,text,...extra});}
function otpFor(secret:string,userId:number,ttl=60){
  const step=Math.floor(Date.now()/(ttl*1000));
  const data=new TextEncoder().encode('admin:'+userId+':'+step);
  const keyData=new TextEncoder().encode(secret);
  return crypto.subtle.importKey('raw',keyData,{name:'HMAC',hash:'SHA-256'},false,['sign']).then(key=>crypto.subtle.sign('HMAC',key,data)).then(buf=>Array.from(new Uint8Array(buf)).map(x=>x.toString(16).padStart(2,'0')).join('').slice(0,8).toUpperCase());
}
export default {async fetch(request:Request,env:Env):Promise<Response>{
  const url=new URL(request.url);
  if(url.pathname==='/health'||url.pathname==='/telegram/health') return Response.json({ok:true,service:'telegram',version:'2.4.0'});
  if(request.method!=='POST'||url.pathname!='/telegram/webhook') return new Response('Not Found',{status:404});
  const update=await request.json<any>();
  const msg=update.message; const chatId=msg?.chat?.id; const userId=msg?.from?.id; const command=String(msg?.text||'').trim();
  if(chatId&&command==='/start') await send(env,chatId,'AI Studio Pro ready.');
  else if(chatId&&command==='/status') await send(env,chatId,'NOMINAL · Hendy Video Studio Pro v2.4.0');
  else if(chatId&&command==='/token'&&userId){const otp=await otpFor(env.MCP_OTP_SECRET,userId);await send(env,chatId,'Maintenance OTP: '+otp+' · expires in 60s');}
  else if(chatId&&command==='/admin') await send(env,chatId,'Open Admin',{reply_markup:{inline_keyboard:[[{text:'Open Admin',url:(env.ADMIN_APP_URL||'https://hendy-video-studio-pro.ngogiaidy56.workers.dev')+'?admin=true'}]]}});
  return Response.json({ok:true});
}};
