export function telegramWebApp(){return window.Telegram?.WebApp || null;}
export function initTelegram(){const tg=telegramWebApp();tg?.ready();tg?.expand();return tg;}
export async function verifyTelegram(){const tg=telegramWebApp();if(!tg?.initData)throw new Error('Telegram initData unavailable');return fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8787/api/v1'}/auth/telegram/verify`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({initData:tg.initData})}).then(r=>r.json());}
