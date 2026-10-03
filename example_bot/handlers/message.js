import crypto from 'node:crypto';
const TTL=Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60);
export function handleCommand(command){switch(command){case '/start':return 'AI Studio Pro ready.';case '/status':return 'NOMINAL';case '/token':return createToken();default:return 'Commands: /start /status /token';}}
export function createToken(){return crypto.randomBytes(4).toString('hex').toUpperCase();}
if(import.meta.url===`file://${process.argv[1]}`)console.log(handleCommand(process.argv[2] || '/status'),`TTL=${TTL}s`);
