import fs from 'node:fs/promises';
import path from 'node:path';
import fsSync from 'node:fs';
function findRoot(start){let dir=path.resolve(start);while(true){if(fsSync.existsSync(path.join(dir,'system-config','system.config.json')))return dir;const parent=path.dirname(dir);if(parent===dir)throw new Error('Cannot locate repository root');dir=parent;}}
const ROOT=findRoot(process.cwd());
const c=JSON.parse(await fs.readFile(path.join(ROOT,'system-config/system.config.json'),'utf8'));
const errors=[];
const check=(ok,msg)=>{if(!ok)errors.push(msg)};
check(/^\d+\.\d+\.\d+$/.test(c.app.version),'app.version invalid');
check(c.app.version==='3.2.0','app.version must be 3.2.0 for this upgrade');
check(c.runtime.sandbox.publicAccess===false,'sandbox must remain private');
check(c.storage.publicAccess===false,'R2 publicAccess must remain false');
check(/^https:\/\/[^/]+\.r2\.cloudflarestorage\.com$/.test(c.storage.endpoint),'R2 endpoint invalid');
check(c.runtime.cloudflare.gateway.workerName==='hendy-video-studio-pro','gateway Worker name mismatch');
for(const [key,w] of Object.entries(c.runtime.cloudflare.workers)){check(w.workerName && w.rootDirectory && w.buildCommand && w.deployCommand,`${key} worker target incomplete`)}
check(c.security.requiredSecrets.backend.includes('GEMINI_API_KEY'),'backend GEMINI secret missing');
check(c.security.requiredSecrets.backend.includes('R2_ACCESS_KEY_ID'),'backend R2 access secret missing');
check(c.security.requiredSecrets.backend.includes('R2_SECRET_ACCESS_KEY'),'backend R2 secret missing');
check(c.security.requiredSecrets.telegram.includes('TELEGRAM_BOT_TOKEN'),'telegram bot secret missing');
if(errors.length){console.error(`SOT INVALID — ${c.app.name} v${c.app.version}`);errors.forEach(e=>console.error(`ERROR: ${e}`));process.exit(1)}
console.log(`SOT VALID — ${c.app.name} v${c.app.version}`);
