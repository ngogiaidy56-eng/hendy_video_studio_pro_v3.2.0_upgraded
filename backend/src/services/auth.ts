import type {Request, Response, NextFunction} from 'express';
import {validateTelegramInitData} from './telegramAuth.js';

export type AuthUser = {id:number; username?:string; role:'admin'|'maintainer'|'user'};

const adminIds = new Set((process.env.ADMIN_USER_IDS || '').split(',').map(v => v.trim()).filter(Boolean));

export function verifyTelegramRequest(initData:string): AuthUser {
  const data = validateTelegramInitData(initData, process.env.TELEGRAM_BOT_TOKEN || '');
  if (!data.user?.id) throw new Error('Telegram user missing');
  const key = String(data.user.id);
  const role = adminIds.has(key) ? 'admin' : 'user';
  return {id:data.user.id, username:data.user.username, role};
}

export function authMiddleware(req:Request, res:Response, next:NextFunction) {
  try {
    const header = req.header('x-telegram-init-data');
    if (!header) return res.status(401).json({error:'Missing Telegram initData'});
    (req as Request & {authUser:AuthUser}).authUser = verifyTelegramRequest(header);
    next();
  } catch (error) {
    res.status(401).json({error:error instanceof Error ? error.message : 'Unauthorized'});
  }
}

export function requireAdmin(req:Request, res:Response, next:NextFunction) {
  const user = (req as Request & {authUser?:AuthUser}).authUser;
  if (!user || (user.role !== 'admin' && user.role !== 'maintainer')) return res.status(403).json({error:'Admin role required'});
  next();
}
