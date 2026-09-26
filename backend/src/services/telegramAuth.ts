import crypto from 'node:crypto';

export type TelegramInitData = {
  user?: {id:number; username?:string; first_name?:string; last_name?:string};
  auth_date?: number;
  query_id?: string;
  [key:string]: unknown;
};

function secretKey(botToken: string): Buffer {
  return crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
}

export function validateTelegramInitData(initData: string, botToken: string, maxAgeSeconds = 86400): TelegramInitData {
  if (!botToken) throw new Error('TELEGRAM_BOT_TOKEN is not configured');
  const params = new URLSearchParams(initData);
  const receivedHash = params.get('hash');
  if (!receivedHash) throw new Error('Missing Telegram hash');
  params.delete('hash');
  const dataCheckString = [...params.entries()].sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => `${k}=${v}`).join('\n');
  const expected = crypto.createHmac('sha256', secretKey(botToken)).update(dataCheckString).digest('hex');
  const a = Buffer.from(receivedHash, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length || !crypto.timingSafeEqual(a,b)) throw new Error('Invalid Telegram signature');
  const authDate = Number(params.get('auth_date') || 0);
  if (!authDate || (Date.now()/1000) - authDate > maxAgeSeconds) throw new Error('Expired Telegram initData');
  const user = params.get('user');
  return { ...Object.fromEntries(params.entries()), auth_date:authDate, user:user ? JSON.parse(user) : undefined };
}
