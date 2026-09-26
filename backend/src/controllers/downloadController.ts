import type {Request, Response} from 'express';
import path from 'node:path';
import fs from 'node:fs';

const builds = path.resolve(process.cwd(), '../storage/builds');
export function smartDownload(req:Request, res:Response) {
  const ua = (req.get('user-agent') || '').toLowerCase();
  if (/android/.test(ua)) return sendFile(res,'ai-studio-pro-latest.apk');
  if (/windows/.test(ua)) return sendFile(res,'ai-studio-pro-setup.exe');
  if (/macintosh|mac os x/.test(ua)) return sendFile(res,'ai-studio-pro-release.dmg');
  if (/iphone|ipad|ipod/.test(ua)) return res.redirect(process.env.TESTFLIGHT_URL || '/');
  return res.status(200).json({platforms:{android:'/tai-app?platform=android',windows:'/tai-app?platform=windows',macos:'/tai-app?platform=macos',ios:process.env.TESTFLIGHT_URL || null}});
}
function sendFile(res:Response,name:string) {
  const file = path.join(builds,name);
  if (!fs.existsSync(file)) return res.status(404).json({error:`Build artifact missing: ${name}`});
  res.download(file,name);
}
