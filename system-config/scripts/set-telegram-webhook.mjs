const token=process.env.TELEGRAM_BOT_TOKEN;
const url=process.env.TELEGRAM_WEBHOOK_URL;
if(!token||!url){console.log('Telegram webhook setup skipped.');process.exit(0);}
const r=await fetch('https://api.telegram.org/bot'+token+'/setWebhook',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url,allowed_updates:['message','callback_query'],drop_pending_updates:false})});
const data=await r.json();
if(!r.ok||!data.ok){console.error(data);process.exit(1);}
console.log('Telegram webhook configured: '+url);
