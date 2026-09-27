type Env={TELEGRAM_BOT_TOKEN:string;ADMIN_APP_URL?:string};
async function telegram(env:Env,method:string,body:unknown){
  const r=await fetch('https://api.telegram.org/bot'+env.TELEGRAM_BOT_TOKEN+'/'+method,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  return r.json();
}
async function send(env:Env,chatId:number|string,text:string,extra:Record<string,unknown>={}){return telegram(env,'sendMessage',{chat_id:chatId,text,...extra});}
export default {async fetch(request:Request,env:Env):Promise<Response>{
  const url=new URL(request.url);
  if(url.pathname==='/health') return Response.json({ok:true,service:'telegram',version:'2.4.0'});
  if(request.method!=='POST'||url.pathname!='/telegram/webhook') return new Response('Not Found',{status:404});
  const update=await request.json<any>(); const msg=update.message; const chatId=msg?.chat?.id; const command=String(msg?.text||'').trim();
  if(chatId&&command==='/start') await send(env,chatId,'AI Studio Pro ready.');
  else if(chatId&&command==='/status') await send(env,chatId,'NOMINAL · Hendy Video Studio Pro v2.4.0');
  else if(chatId&&command==='/admin') await send(env,chatId,'Open Admin',{reply_markup:{inline_keyboard:[[{text:'Open Admin',url:(env.ADMIN_APP_URL||'https://hendy-video-studio-pro.workers.dev')+'?admin=true'}]]}});
  return Response.json({ok:true});
}};
