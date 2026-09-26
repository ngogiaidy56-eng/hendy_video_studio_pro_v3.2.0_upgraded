import crypto from 'node:crypto';

type Entry = {hash:string; expiresAt:number};
const entries = new Map<string, Entry>();

export function issueOtp(scope:string, ttlSeconds:number): string {
  const otp = crypto.randomBytes(4).toString('hex').toUpperCase();
  entries.set(scope, {hash:hashOtp(otp), expiresAt:Date.now()+ttlSeconds*1000});
  return otp;
}

export function verifyOtp(scope:string, otp:string): boolean {
  const entry = entries.get(scope);
  if (!entry || Date.now() > entry.expiresAt) { entries.delete(scope); return false; }
  const actual = Buffer.from(hashOtp(otp));
  const expected = Buffer.from(entry.hash);
  const ok = actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
  if (ok) entries.delete(scope);
  return ok;
}

function hashOtp(value:string): string { return crypto.createHash('sha256').update(value).digest('hex'); }
