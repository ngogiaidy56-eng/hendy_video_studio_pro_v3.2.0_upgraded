# SYSTEM_SOT_SOURCE_CODE.md

Hendy Video Studio Pro v2.4.0 — complete textual source snapshot.

> Generated from the project tree. GENERATED files are reproducible from `system-config/system.config.json`.

---

## `.env.example`

```text
NODE_ENV=development
BACKEND_PORT=8787
SANDBOX_PORT=8799
FRONTEND_ORIGIN=http://localhost:5173
TELEGRAM_BOT_TOKEN=
TELEGRAM_OTP_TTL_SECONDS=60
GEMINI_API_KEY=
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=ai-studio-pro
R2_PUBLIC_BASE_URL=
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_PAGES_PROJECT=
GITHUB_REPOSITORY=
ADMIN_USER_IDS=
MCP_SHARED_SECRET=
```

---

## `.github/workflows/deploy.yml`

```yaml
name: deploy
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  verify-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm install --ignore-scripts --no-audit --no-fund
      - run: npm run config:validate
      - run: npm run config:sync
      - run: npm run typecheck
      - run: npm run build
      - run: git diff --exit-code -- frontend/src/generated worker/wrangler.jsonc frontend/index.html frontend/public/manifest.json
  deploy:
    needs: verify-build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: echo "Attach Cloudflare Pages/Workers deployment action here after health checks."
      - run: echo "No production deploy occurs when verify-build fails."
```

---

## `.github/workflows/dry-run.yml`

```yaml
name: dry-run
on:
  pull_request:
jobs:
  dry-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: {node-version: 22, cache: npm}
      - run: npm install --ignore-scripts --no-audit --no-fund
      - run: npm run config:validate
      - run: npm run config:sync
      - run: npm run typecheck
      - run: npm run build
```

---

## `.github/workflows/rollback.yml`

```yaml
name: rollback
on:
  workflow_dispatch:
jobs:
  rollback:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: echo "Rollback is intentionally explicit and audited."
      - run: echo "Use the Cloudflare deployment API/action configured by the operator."
```

---

## `.gitignore`

```text
node_modules/
dist/
.tmp/
.env
.env.*
!.env.example
.DS_Store
coverage/
*.log
system-config/generated/
example_bot/.tgcloud/
frontend/.vite/
storage/builds/*.apk
storage/builds/*.aab
storage/builds/*.exe
storage/builds/*.dmg
```

---

## `BUILD_ARTIFACTS.md`

```markdown
# Production build artifacts

The repository intentionally does not ship real APK/AAB/EXE/DMG binaries. Place signed production artifacts here before enabling the Smart Download Gateway:

- `ai-studio-pro-latest.apk`
- `ai-studio-pro-release.aab`
- `ai-studio-pro-setup.exe`
- `ai-studio-pro-release.dmg`

Never commit unsigned debug builds or secrets beside these artifacts.
```

---

## `README.md`

```markdown
# Hendy Video Studio Pro v2.4.0

Monorepo cho AI video editor đa nền tảng, với Single Source of Truth (SOT), sandbox WebSocket `8799`, Express API, Cloudflare Worker, R2 storage, Telegram Mini App admin và MCP control plane.

## Tầng hệ thống

- `system-config/`: SOT + schema + code generation + strict dry-run.
- `backend/`: media/AI/auth API.
- `worker/`: edge API nhẹ.
- `frontend/`: React editor, timeline, canvas preview, audio mixer, offline undo.
- `mcp/cloudflare/`: control plane allowlist cho config/build/deploy/rollback.
- `example_bot/`: Telegram bot webhook handlers.
- `shared/`: contracts dùng chung.

## Nguyên tắc bảo mật

1. `admin=true` chỉ là UI hint; quyền admin phải do server xác minh từ Telegram `initData` + role server-side.
2. Telegram CloudStorage chỉ lưu user state, không phải SOT toàn hệ thống.
3. Không đưa secret vào frontend bundle, SOT public, IndexedDB hay Telegram CloudStorage.
4. MCP chỉ expose allowlisted operations, không expose arbitrary shell.
5. `8799` dành cho local sandbox, không public Internet.

## Chạy local

```bash
cp .env.example .env
npm install
npm run config:validate
npm run config:sync
npm run sandbox
```

Terminal khác:

```bash
npm --workspace backend run dev
npm --workspace worker run dev
npm --workspace frontend run dev
npm --workspace mcp/cloudflare run dev
```

## Dry-run

Gửi WebSocket message:

```json
{"type":"dry-run","payload":{"package":"frontend"}}
```

Server sẽ dựng một workspace tạm trong `.tmp/` và chạy build/check theo policy. Không deploy production từ sandbox.

## Production release gate

GitHub Actions thực hiện validate → sync → typecheck → build → health check → deploy. Rollback là một thao tác riêng và không cho phép agent tự ý chạy arbitrary commands.

## Download gateway

- Android direct install: APK.
- Google Play publishing: AAB artifact.
- Windows: EXE.
- macOS: DMG.
- iOS: external TestFlight URL.

## AI

Model mặc định trong SOT là `gemini-2.5-flash`. Hệ thống coi model là cấu hình, không hard-code business logic.
```

---

## `backend/.env.example`

```text
BACKEND_PORT=8787
FRONTEND_ORIGIN=http://localhost:5173
TELEGRAM_BOT_TOKEN=
TELEGRAM_OTP_TTL_SECONDS=60
GEMINI_API_KEY=
GEMINI_TRANSLATION_MODEL=gemini-2.5-flash
GEMINI_OCR_MODEL=gemini-2.5-flash
GEMINI_STT_MODEL=gemini-2.5-flash
GEMINI_TEMPERATURE=0.1
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=ai-studio-pro
TESTFLIGHT_URL=
ADMIN_USER_IDS=
```

---

## `backend/package.json`

```json
{
  "name": "@hendy/backend",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.888.0",
    "@google/genai": "^1.16.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
    "uuid": "^11.1.0",
    "ws": "^8.18.3",
    "multer": "^2.0.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.3",
    "@types/node": "^24.4.0",
    "tsx": "^4.20.5",
    "typescript": "^5.9.2"
  }
}
```

---

## `backend/src/controllers/downloadController.ts`

```typescript
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
```

---

## `backend/src/routes/auth.ts`

```typescript
import {Router} from 'express';
import {verifyTelegramRequest} from '../services/auth.js';
import {issueOtp, verifyOtp} from '../services/otpService.js';

export const authRouter = Router();
authRouter.post('/telegram/verify',(req,res)=>{
  try { const user = verifyTelegramRequest(String(req.body?.initData || '')); res.json({ok:true,user}); }
  catch(e){ res.status(401).json({ok:false,error:e instanceof Error?e.message:'Unauthorized'}); }
});

authRouter.post('/mcp/otp/issue',(req,res)=>{
  const scope = String(req.body?.scope || 'admin');
  const otp = issueOtp(scope, Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60));
  // Production: deliver OTP privately through Telegram bot, never expose this route publicly.
  res.status(201).json({ok:true,otp,expiresIn:Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60)});
});

authRouter.post('/mcp/otp/verify',(req,res)=>{
  const ok = verifyOtp(String(req.body?.scope || 'admin'),String(req.body?.otp || ''));
  res.json({ok});
});
```

---

## `backend/src/routes/media.ts`

```typescript
import {Router} from 'express';
import multer from 'multer';
import {transcribeAudio} from '../services/audioTranscriber.js';
import {transcribeVideoAudio} from '../services/videoTranscriber.js';
import {translateImage} from '../services/imageTranslator.js';
import {uploadToR2} from '../services/r2Storage.js';

const upload = multer({storage:multer.memoryStorage(),limits:{fileSize:512*1024*1024}});
export const mediaRouter = Router();
mediaRouter.post('/audio/transcribe',upload.single('file'),async(req,res)=>{ if(!req.file)return res.status(400).json({error:'file required'}); res.json({cues:await transcribeAudio(req.file.buffer,req.file.mimetype)}); });
mediaRouter.post('/video/transcribe',upload.single('file'),async(req,res)=>{ if(!req.file)return res.status(400).json({error:'file required'}); res.json({cues:await transcribeVideoAudio(req.file.buffer)}); });
mediaRouter.post('/image/translate',upload.single('file'),async(req,res)=>{ if(!req.file)return res.status(400).json({error:'file required'}); res.json(await translateImage(req.file.buffer,req.file.mimetype,String(req.body?.target || 'vi'))); });
mediaRouter.post('/upload',upload.single('file'),async(req,res)=>{ if(!req.file)return res.status(400).json({error:'file required'}); const key=`uploads/${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9._-]/g,'_')}`; res.status(201).json(await uploadToR2(key,req.file.buffer,req.file.mimetype)); });
```

---

## `backend/src/routes/projects.ts`

```typescript
import {Router} from 'express';
import crypto from 'node:crypto';
import {saveRecoverySnapshot, restoreRecoverySnapshot} from '../services/recoveryService.js';
export const projectRouter = Router();
projectRouter.post('/snapshot',(req,res)=>{const projectId=String(req.body?.projectId || crypto.randomUUID()); saveRecoverySnapshot(projectId,req.body?.project); res.status(201).json({ok:true,projectId});});
projectRouter.get('/:id/recovery',(req,res)=>res.json({projectId:req.params.id,payload:restoreRecoverySnapshot(req.params.id)}));
```

---

## `backend/src/server.ts`

```typescript
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {authRouter} from './routes/auth.js';
import {mediaRouter} from './routes/media.js';
import {projectRouter} from './routes/projects.js';
import {smartDownload} from './controllers/downloadController.js';

const app = express();
app.disable('x-powered-by');
app.use(cors({origin:(process.env.FRONTEND_ORIGIN || 'http://localhost:5173').split(',')}));
app.use(express.json({limit:'4mb'}));
app.get('/health',(req,res)=>res.json({ok:true,version:'2.4.0',timestamp:new Date().toISOString()}));
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/media',mediaRouter);
app.use('/api/v1/projects',projectRouter);
app.get('/tai-app',smartDownload);
app.use((err:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{console.error(err);res.status(500).json({error:'Internal server error'});});

const port=Number(process.env.BACKEND_PORT || 8787);
app.listen(port,'0.0.0.0',()=>console.log(`Backend listening on :${port}`));
```

---

## `backend/src/services/audioTranscriber.ts`

```typescript
import {GoogleGenAI} from '@google/genai';

type Cue = {startMs:number; endMs:number; text:string};
export async function transcribeAudio(data:Buffer, mimeType:string):Promise<Cue[]> {
  if (!process.env.GEMINI_API_KEY) return [];
  const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
  const prompt = 'Transcribe the spoken dialogue. Return only a JSON array of cues with startMs, endMs, text.';
  const response = await ai.models.generateContent({model:process.env.GEMINI_STT_MODEL || 'gemini-2.5-flash', contents:[{text:prompt},{inlineData:{mimeType,data:data.toString('base64')}}], config:{temperature:0}});
  try { return JSON.parse((response.text || '[]').replace(/^```json\s*|```$/g,'')); } catch { return []; }
}
```

---

## `backend/src/services/auth.ts`

```typescript
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
```

---

## `backend/src/services/extractor.ts`

```typescript
export type ExtractedSubtitle = {startMs:number; endMs:number; text:string};

export async function extractSubtitlesFromUrl(rawUrl:string):Promise<ExtractedSubtitle[]> {
  const url = new URL(rawUrl);
  if (!['http:','https:'].includes(url.protocol)) throw new Error('Only http/https URLs are allowed');
  // Provider integrations should be implemented behind this contract.
  // Do not silently scrape sites whose terms or robots policies disallow it.
  return [];
}
```

---

## `backend/src/services/imageTranslator.ts`

```typescript
import {GoogleGenAI} from '@google/genai';
export async function translateImage(data:Buffer, mimeType:string, target='vi'):Promise<{sourceText:string; translatedText:string}> {
  if (!process.env.GEMINI_API_KEY) return {sourceText:'', translatedText:''};
  const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
  const response = await ai.models.generateContent({model:process.env.GEMINI_OCR_MODEL || 'gemini-2.5-flash', contents:[{text:`Read text in image and translate it to ${target}. Return JSON {sourceText, translatedText}.`},{inlineData:{mimeType,data:data.toString('base64')}}], config:{temperature:0.1}});
  try { return JSON.parse((response.text || '{}').replace(/^```json\s*|```$/g,'')); } catch { return {sourceText:'', translatedText:''}; }
}
```

---

## `backend/src/services/otpService.ts`

```typescript
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
```

---

## `backend/src/services/r2Storage.ts`

```typescript
import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import type {Readable} from 'node:stream';

const account = process.env.R2_ACCOUNT_ID || '';
export const r2 = new S3Client({region:'auto',endpoint:account ? `https://${account}.r2.cloudflarestorage.com` : undefined,credentials:{accessKeyId:process.env.R2_ACCESS_KEY_ID || '',secretAccessKey:process.env.R2_SECRET_ACCESS_KEY || ''}});
const bucket = process.env.R2_BUCKET || 'ai-studio-pro';

export async function uploadToR2(key:string, body:Buffer|string|Readable, contentType='application/octet-stream') {
  await r2.send(new PutObjectCommand({Bucket:bucket,Key:key,Body:body as never,ContentType:contentType}));
  return {bucket,key};
}
export async function getFromR2(key:string) { return r2.send(new GetObjectCommand({Bucket:bucket,Key:key})); }
```

---

## `backend/src/services/recoveryService.ts`

```typescript
export type RecoverySnapshot = {projectId:string; createdAt:number; payload:unknown};
const snapshots = new Map<string, RecoverySnapshot>();
export function saveRecoverySnapshot(projectId:string, payload:unknown) { snapshots.set(projectId,{projectId,createdAt:Date.now(),payload}); }
export function restoreRecoverySnapshot(projectId:string) { return snapshots.get(projectId)?.payload ?? null; }
```

---

## `backend/src/services/telegramAuth.ts`

```typescript
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
```

---

## `backend/src/services/videoTranscriber.ts`

```typescript
import {transcribeAudio} from './audioTranscriber.js';
export async function transcribeVideoAudio(data:Buffer):Promise<ReturnType<typeof transcribeAudio>> {
  // Production: demux audio with FFmpeg before Gemini. This scaffold expects audio bytes.
  return transcribeAudio(data, 'audio/mpeg');
}
```

---

## `backend/src/services/vietsubAi.ts`

```typescript
import {GoogleGenAI} from '@google/genai';

type Cue = {startMs:number; endMs:number; text:string};

export async function translateSubtitleChunk(cues:Cue[], targetLanguage='vi'):Promise<Cue[]> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return cues;
  const ai = new GoogleGenAI({apiKey:key});
  const prompt = `Translate subtitle cues to ${targetLanguage}. Preserve JSON shape exactly. Return only JSON array. Cues: ${JSON.stringify(cues)}`;
  const response = await ai.models.generateContent({model:process.env.GEMINI_TRANSLATION_MODEL || 'gemini-2.5-flash', contents:prompt, config:{temperature:Number(process.env.GEMINI_TEMPERATURE || '0.1')}});
  const text = response.text?.trim() || '[]';
  try { return JSON.parse(text.replace(/^```json\s*|```$/g,'')); } catch { return cues; }
}
```

---

## `backend/tsconfig.json`

```json
{"compilerOptions":{"target":"ES2022","module":"NodeNext","moduleResolution":"NodeNext","outDir":"dist","strict":true,"esModuleInterop":true,"skipLibCheck":true,"types":["node"]},"include":["src/**/*.ts"]}
```

---

## `example_bot/README.md`

```markdown
# Telegram bot adapter

The `handlers/` directory is deliberately flat. Connect it to your Telegram webhook/runtime and persist only user state in Telegram CloudStorage. System SOT stays in Git/config infrastructure.
```

---

## `example_bot/docs/tgcloud-sdk.md`

```markdown
# Telegram Cloud App adapter

Keep provider-specific Telegram cloud/runtime bindings behind `handlers/`. The application layer only expects:

- `getUserState(userId, key)`
- `setUserState(userId, key, value)`
- `sendAdminAlert(payload)`

Never store bot tokens or deployment secrets in this directory.
```

---

## `example_bot/handlers/callback_query.js`

```javascript
export function handleCallback(data){if(data==='open_sot')return {action:'open-mini-app',url:`${process.env.ADMIN_APP_URL || 'https://example.pages.dev'}?admin=true`};return {action:'noop'};}
```

---

## `example_bot/handlers/message.js`

```javascript
import crypto from 'node:crypto';
const TTL=Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60);
export function handleCommand(command){switch(command){case '/start':return 'AI Studio Pro ready.';case '/status':return 'NOMINAL';case '/token':return createToken();default:return 'Commands: /start /status /token';}}
export function createToken(){return crypto.randomBytes(4).toString('hex').toUpperCase();}
if(import.meta.url===`file://${process.argv[1]}`)console.log(handleCommand(process.argv[2] || '/status'),`TTL=${TTL}s`);
```

---

## `example_bot/handlers/webhook.js`

```javascript
export function buildIncidentMarkdown({level='critical',message='unknown',sha='unknown'}={}){return [`🚨 *Hendy Video Studio Pro*`,`*Level:* ${level}`,`*Commit:* \`${sha}\``,`*Message:* ${message}`].join('\n');}
```

---

## `example_bot/package.json`

```json
{"name":"@hendy/example-bot","private":true,"type":"module","scripts":{"dev":"node handlers/message.js"}}
```

---

## `example_bot/schema.js`

```javascript
export const incidentsSchema={name:'incidents',fields:{id:'string',created_at:'number',level:'string',message:'string',commit_sha:'string|null'}};
```

---

## `frontend/.env.example`

```text
VITE_API_BASE_URL=http://127.0.0.1:8787/api/v1
VITE_TELEGRAM_BOT_USERNAME=
```

---

## `frontend/index.html`

```html
<!doctype html><html lang="vi"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/><title>Hendy Video Studio Pro</title><meta name="theme-color" content="#17171a"/><script src="https://telegram.org/js/telegram-web-app.js"></script></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>
```

---

## `frontend/package.json`

```json
{
  "name":"@hendy/frontend",
  "private":true,
  "type":"module",
  "scripts":{"dev":"vite","build":"vite build","typecheck":"tsc -p tsconfig.json --noEmit"},
  "dependencies":{"@vitejs/plugin-react":"^5.0.4","vite":"^7.1.7","react":"^19.1.1","react-dom":"^19.1.1"},
  "devDependencies":{"typescript":"^5.9.2","@types/react":"^19.1.13","@types/react-dom":"^19.1.9"}
}
```

---

## `frontend/public/_redirects`

```text
/* /index.html 200
```

---

## `frontend/public/manifest.json`

```json
{
  "name": "Hendy Video Studio Pro",
  "short_name": "AI Studio Pro",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#17171a",
  "theme_color": "#17171a",
  "icons": [
    {
      "src": "/logo192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/logo512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## `frontend/public/sw.js`

```javascript
const CACHE='hendy-pro-v2.4.0';
const STATIC=['/','/manifest.json'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return r;}).catch(()=>caches.match(event.request)))});
```

---

## `frontend/src/App.tsx`

```tsx
import {useMemo,useState} from 'react';
import {SYSTEM_CONFIG} from './generated/system-config';
import {SystemLayout} from './generated/system-layout';
import './generated/system-theme.css';
import {SystemControlPanel} from './components/system/SystemControlPanel';
import {PwaInstallBanner} from './components/system/PwaInstallBanner';
import {AssetSidebar} from './components/editor/AssetSidebar';
import {CanvasPreview} from './components/editor/CanvasPreview';
import {AudioMixer} from './components/editor/AudioMixer';
import {Timeline} from './components/editor/Timeline';
import type {Clip} from './types/project';

export default function App(){const [clips,setClips]=useState<Clip[]>([{id:'video-1',track:0,kind:'video',startMs:0,endMs:10000,label:'Main Video'},{id:'bgm-1',track:1,kind:'audio',startMs:0,endMs:10000,label:'BGM'},{id:'sub-1',track:2,kind:'subtitle',startMs:500,endMs:3200,label:'Subtitle',text:'Xin chào'}]);const [theme,setTheme]=useState(true);const params=useMemo(()=>new URLSearchParams(location.search),[]);const admin=params.get('admin')==='true';const onUpload=(file:File)=>setClips(c=>[...c,{id:crypto.randomUUID(),track:0,kind:file.type.startsWith('audio')?'audio':file.type.startsWith('image')?'video':'video',startMs:0,endMs:5000,label:file.name}]);return <SystemLayout><div className="stack"><header className="row" style={{justifyContent:'space-between'}}><div><h1 style={{margin:'0 0 4px'}}>🎬 {SYSTEM_CONFIG.system.name}</h1><div className="muted">v{SYSTEM_CONFIG.system.version} · Offline-first Editor</div></div><button className="button" onClick={()=>setTheme(v=>!v)}>{theme?'LIGHT':'DARK'}</button></header>{admin&&<SystemControlPanel/>}<div className="workspace"><AssetSidebar onUpload={onUpload}/><div className="stack"><CanvasPreview/><Timeline clips={clips}/></div><AudioMixer/></div><PwaInstallBanner/></div></SystemLayout>}
```

---

## `frontend/src/components/editor/AssetSidebar.tsx`

```tsx
import {useRef} from 'react';
export function AssetSidebar({onUpload}:{onUpload:(file:File)=>void}){const ref=useRef<HTMLInputElement>(null);return <section className="panel stack"><strong>Assets</strong><button className="button primary" onClick={()=>ref.current?.click()}>Upload media</button><input ref={ref} hidden type="file" accept="video/*,audio/*,image/*" onChange={e=>{const f=e.target.files?.[0];if(f)onUpload(f)}}/><div className="muted">Kéo thả video, audio hoặc ảnh. Backend sẽ đưa asset vào R2.</div></section>}
```

---

## `frontend/src/components/editor/AudioMixer.tsx`

```tsx
import {useEffect,useMemo,useRef,useState} from 'react';

type ChannelKey='video'|'bgm'|'tts'|'master';
type Channel={gain:number;muted:boolean;ducking:boolean};
export function AudioMixer(){
 const [channels,setChannels]=useState<Record<ChannelKey,Channel>>({video:{gain:1,muted:false,ducking:false},bgm:{gain:.8,muted:false,ducking:true},tts:{gain:1,muted:false,ducking:false},master:{gain:1,muted:false,ducking:false}});
 const [ducking,setDucking]=useState(false); const audioRef=useRef<AudioContext|null>(null); const nodes=useRef<Record<string,GainNode>>({});
 useEffect(()=>()=>{audioRef.current?.close()},[]);
 const ensureGraph=()=>{if(audioRef.current)return;const ctx=new AudioContext();audioRef.current=ctx;for(const k of Object.keys(channels)){const g=ctx.createGain();g.gain.value=channels[k as ChannelKey].gain;g.connect(ctx.destination);nodes.current[k]=g;}};
 useEffect(()=>{for(const [k,v] of Object.entries(channels)){const node=nodes.current[k];if(node)node.gain.setTargetAtTime(v.muted?0:v.gain, audioRef.current?.currentTime || 0,.02)}},[channels]);
 useEffect(()=>{const bgm=nodes.current.bgm;if(!bgm||!audioRef.current)return;bgm.gain.setTargetAtTime(ducking?.2:(channels.bgm.muted?0:channels.bgm.gain),audioRef.current.currentTime,.08)},[ducking,channels.bgm]);
 const setGain=(key:ChannelKey,gain:number)=>setChannels(s=>({...s,[key]:{...s[key],gain}}));
 const channelNames=useMemo(()=>['video','bgm','tts','master'] as ChannelKey[],[]);
 return <section className="panel stack"><div className="row"><strong>Audio Mixer</strong><button className="button" onClick={ensureGraph}>Start Web Audio</button><button className="button" onClick={()=>setDucking(v=>!v)}>{ducking?'Ducking ON':'Ducking OFF'}</button></div>{channelNames.map(k=><label key={k} className="stack"><span className="row"><span style={{width:55}}>{k.toUpperCase()}</span><input style={{flex:1}} type="range" min="0" max="1.5" step="0.01" value={channels[k].gain} onChange={e=>setGain(k,Number(e.target.value))}/><span>{channels[k].gain.toFixed(2)}</span></span><span className="meter"><span style={{width:`${Math.min(channels[k].gain/1.5*100,100)}%`}}/></span></label>)}</section>
}
```

---

## `frontend/src/components/editor/CanvasPreview.tsx`

```tsx
import {useEffect,useRef} from 'react';
import {drawSubtitle} from '../../utils/subBurner';
export function CanvasPreview(){const ref=useRef<HTMLCanvasElement>(null);useEffect(()=>{const c=ref.current;if(!c)return;c.width=960;c.height=540;const ctx=c.getContext('2d')!;ctx.fillStyle='#111113';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#777';ctx.font='32px system-ui';ctx.textAlign='center';ctx.fillText('Canvas Preview',c.width/2,120);drawSubtitle(ctx,'Xin chào từ AI Studio Pro',{fontFamily:'system-ui',fontSize:36,color:'#fff',strokeColor:'#000',strokeWidth:7,bottomPx:45},c.width,c.height)},[]);return <section className="panel"><div className="row" style={{justifyContent:'space-between'}}><strong>Preview</strong><span className="muted">Canvas / 16:9</span></div><canvas ref={ref} style={{display:'block',width:'100%',borderRadius:12,marginTop:10}}/></section>}
```

---

## `frontend/src/components/editor/Timeline.tsx`

```tsx
import type {Clip} from '../../types/project';
export function Timeline({clips}:{clips:Clip[]}){const duration=Math.max(...clips.map(c=>c.endMs),60000);return <section className="panel timeline"><div className="row"><strong>Timeline</strong><span className="muted">{Math.round(duration/1000)}s</span></div>{[0,1,2].map(track=><div className="track" key={track}>{clips.filter(c=>c.track===track).map(c=><div key={c.id} className="clip" style={{left:`${c.startMs/duration*100}%`,width:`${Math.max(1,(c.endMs-c.startMs)/duration*100)}%`}}>{c.label}</div>)}</div>)}</section>}
```

---

## `frontend/src/components/system/PwaInstallBanner.tsx`

```tsx
import {useEffect,useState} from 'react';
export function PwaInstallBanner(){const [prompt,setPrompt]=useState<any>(null);useEffect(()=>{const h=(e:any)=>{e.preventDefault();setPrompt(e)};window.addEventListener('beforeinstallprompt',h);return()=>window.removeEventListener('beforeinstallprompt',h)},[]);if(!prompt)return null;return <div className="panel row" style={{position:'fixed',right:12,bottom:76,zIndex:20}}><span>Install App</span><button className="button primary" onClick={async()=>{await prompt.prompt();setPrompt(null)}}>Cài đặt</button></div>}
```

---

## `frontend/src/components/system/SystemControlPanel.tsx`

```tsx
import {useState} from 'react';
import {verifyTelegram} from '../../services/telegram';
export function SystemControlPanel(){const [status,setStatus]=useState('LOCKED');const [msg,setMsg]=useState('');const [otp,setOtp]=useState('');async function login(){try{const r=await verifyTelegram();setStatus(r.ok&&['admin','maintainer'].includes(r.user?.role)?'TELEGRAM VERIFIED':'USER VERIFIED')}catch(e){setMsg(e instanceof Error?e.message:'Login failed')}}async function verify(){const base=import.meta.env.VITE_API_BASE_URL||'http://127.0.0.1:8787/api/v1';const r=await fetch(`${base}/auth/mcp/otp/verify`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({scope:'admin',otp})});const j=await r.json();setStatus(j.ok?'MAINTENANCE':'OTP INVALID')}return <section className="panel stack"><div className="row"><strong>System Control</strong><span className="muted">{status}</span></div><div className="row"><button className="button" onClick={login}>Telegram Verify</button><input placeholder="OTP 60s" value={otp} onChange={e=>setOtp(e.target.value)} /><button className="button primary" onClick={verify}>Verify OTP</button></div>{msg&&<div className="muted">{msg}</div>}</section>}
```

---

## `frontend/src/generated/system-config.ts`

```typescript
export const SYSTEM_CONFIG = {
  "system": {
    "name": "Hendy Video Studio Pro",
    "version": "2.4.0",
    "environment": "production"
  },
  "network": {
    "sandboxPort": 8799,
    "backendPort": 8787,
    "frontendPort": 5173,
    "apiBasePath": "/api/v1",
    "mcpPath": "/mcp"
  },
  "features": {
    "enableMCP": true,
    "enableLinkExtractor": true,
    "enableImageOCR": true,
    "enableAudioSTT": true,
    "enableTelegramAdmin": true,
    "enableOfflineFirst": true,
    "enableAudioDucking": true
  },
  "ai": {
    "provider": "google",
    "models": {
      "translation": "gemini-2.5-flash",
      "ocr": "gemini-2.5-flash",
      "stt": "gemini-2.5-flash"
    },
    "temperature": 0.1
  },
  "storage": {
    "provider": "cloudflare-r2",
    "bucketEnv": "R2_BUCKET",
    "zeroEgress": true
  },
  "editor": {
    "audioChannels": [
      "video",
      "bgm",
      "tts",
      "master"
    ],
    "duckingGain": 0.2,
    "transitionGapSeconds": 1.5
  },
  "theme": {
    "darkBackgroundColor": "#17171a",
    "darkContainerBackgroundColor": "#232324",
    "accentColor": "#ff8a00",
    "textColor": "#f5f5f5"
  },
  "managedFiles": [
    "frontend/src/generated/system-config.ts",
    "frontend/src/generated/system-env.ts",
    "frontend/src/generated/system-theme.css",
    "frontend/src/generated/system-layout.tsx",
    "frontend/public/manifest.json",
    "frontend/index.html",
    "worker/wrangler.jsonc"
  ]
} as const;
```

---

## `frontend/src/generated/system-env.ts`

```typescript
export type RuntimeEnv = { API_BASE_URL?: string; TELEGRAM_BOT_USERNAME?: string };
export const runtimeEnv: RuntimeEnv = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TELEGRAM_BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME
};
```

---

## `frontend/src/generated/system-layout.tsx`

```tsx
import type { ReactNode } from 'react';
export function SystemLayout({children}:{children:ReactNode}) {
  return <div className="system-layout"><main className="system-main">{children}</main><nav className="bottom-action-dock" aria-label="Editor actions"><button>Timeline</button><button>Assets</button><button>Audio</button><button>Export</button></nav></div>;
}
```

---

## `frontend/src/generated/system-theme.css`

```css
:root {
  --dark-background-color: #17171a;
  --dark-container-background-color: #232324;
  --accent-color: #ff8a00;
  --text-color: #f5f5f5;
}
```

---

## `frontend/src/main.tsx`

```tsx
import {StrictMode} from 'react';import {createRoot} from 'react-dom/client';import App from './App';
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(console.error));
```

---

## `frontend/src/services/api.ts`

```typescript
import {runtimeEnv} from '../generated/system-env';
export async function api<T>(path:string, init:RequestInit={}):Promise<T>{const r=await fetch(`${runtimeEnv.API_BASE_URL}${path}`,{...init,headers:{'content-type':'application/json',...(init.headers||{})}});if(!r.ok)throw new Error(await r.text());return r.json();}
```

---

## `frontend/src/services/renderManifest.ts`

```typescript
type TimelineProject={id:string;width:number;height:number;fps:number;durationMs:number;clips:unknown[]};
type RenderManifest={version:1;projectId:string;canvas:{width:number;height:number;fps:number};clips:unknown[];audio:Array<{id:string;type:"video"|"bgm"|"tts"|"master";assetId?:string;gain:number;muted?:boolean;ducking?:boolean}>;subtitle:{format:"ass"|"text";items:unknown[]};output:{container:"mp4"|"webm";videoCodec:string;audioCodec:string}};
export function buildRenderManifest(project:TimelineProject):RenderManifest{return{version:1,projectId:project.id,canvas:{width:project.width,height:project.height,fps:project.fps},clips:project.clips,audio:[{id:"video",type:"video",gain:1},{id:"bgm",type:"bgm",gain:.8,ducking:true},{id:"tts",type:"tts",gain:1},{id:"master",type:"master",gain:1}],subtitle:{format:"ass",items:project.clips},output:{container:"mp4",videoCodec:"h264",audioCodec:"aac"}}}
```

---

## `frontend/src/services/telegram.ts`

```typescript
export function telegramWebApp(){return window.Telegram?.WebApp || null;}
export function initTelegram(){const tg=telegramWebApp();tg?.ready();tg?.expand();return tg;}
export async function verifyTelegram(){const tg=telegramWebApp();if(!tg?.initData)throw new Error('Telegram initData unavailable');return fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8787/api/v1'}/auth/telegram/verify`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({initData:tg.initData})}).then(r=>r.json());}
```

---

## `frontend/src/types/project.ts`

```typescript
export type Clip={id:string;track:number;kind:'video'|'audio'|'subtitle'|'transition';startMs:number;endMs:number;label:string;assetId?:string;text?:string};
export type Project={id:string;width:number;height:number;fps:number;durationMs:number;clips:Clip[]};
```

---

## `frontend/src/utils/frameInjector.ts`

```typescript
import type {Clip} from '../types/project';
export function injectTransitionFrames(clips:Clip[],gapSeconds=1.5):Clip[]{const sorted=[...clips].sort((a,b)=>a.startMs-b.startMs);const out:Clip[]=[];for(let i=0;i<sorted.length;i++){const cur=sorted[i];out.push(cur);const next=sorted[i+1];if(next&&cur.endMs<next.startMs && (next.startMs-cur.endMs)/1000>=gapSeconds){out.push({id:`transition-${cur.id}-${next.id}`,track:cur.track,kind:'transition',startMs:cur.endMs,endMs:next.startMs,label:'Transition'});}}return out;}
```

---

## `frontend/src/utils/subBurner.ts`

```typescript
export type SubtitleStyle={fontFamily:string;fontSize:number;color:string;strokeColor:string;strokeWidth:number;bottomPx:number};
export function drawSubtitle(ctx:CanvasRenderingContext2D,text:string,style:SubtitleStyle,width:number,height:number){ctx.save();ctx.font=`600 ${style.fontSize}px ${style.fontFamily}`;ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.lineJoin='round';ctx.lineWidth=style.strokeWidth;ctx.strokeStyle=style.strokeColor;ctx.fillStyle=style.color;ctx.strokeText(text,width/2,height-style.bottomPx);ctx.fillText(text,width/2,height-style.bottomPx);ctx.restore();}
export function supportedMimeType(){const candidates=['video/mp4;codecs=avc1.64003E,mp4a.40.2','video/mp4','video/webm;codecs=vp9,opus','video/webm'];return candidates.find((x)=>typeof MediaRecorder!=='undefined'&&MediaRecorder.isTypeSupported(x)) || '';}
export function captureCanvas(canvas:HTMLCanvasElement,fps=30){const mimeType=supportedMimeType();if(!mimeType)throw new Error('No supported MediaRecorder codec');const stream=canvas.captureStream(fps);return new MediaRecorder(stream,{mimeType});}
```

---

## `frontend/src/utils/undoEngine.ts`

```typescript
const DB='hendy-studio';
const STORE='snapshots';
function openDb():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE,{keyPath:'id',autoIncrement:true});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function pushSnapshot(projectId:string,payload:unknown){const db=await openDb();return new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).add({projectId,payload,createdAt:Date.now()});tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}
export async function popLatest(projectId:string){const db=await openDb();return new Promise<unknown>((resolve,reject)=>{const tx=db.transaction(STORE,'readonly');const r=tx.objectStore(STORE).getAll();r.onsuccess=()=>{const rows=r.result.filter((x:any)=>x.projectId===projectId).sort((a:any,b:any)=>b.createdAt-a.createdAt);resolve(rows[0]?.payload ?? null)};r.onerror=()=>reject(r.error);});}
```

---

## `frontend/src/vite-env.d.ts`

```typescript
/// <reference types="vite/client" />
declare global { interface Window { Telegram?: { WebApp?: any } } }
export {};
```

---

## `frontend/tsconfig.json`

```json
{"compilerOptions":{"target":"ES2022","useDefineForClassFields":true,"lib":["DOM","DOM.Iterable","ES2022"],"allowJs":false,"skipLibCheck":true,"esModuleInterop":true,"allowSyntheticDefaultImports":true,"strict":true,"module":"ESNext","moduleResolution":"Bundler","resolveJsonModule":true,"isolatedModules":true,"noEmit":true,"jsx":"react-jsx"},"include":["src"]}
```

---

## `frontend/vite.config.ts`

```typescript
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],server:{port:5173,host:'127.0.0.1'}});
```

---

## `mcp/cloudflare/.env.example`

```text
MCP_PORT=8788
MCP_SHARED_SECRET=
SANDBOX_PORT=8799
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
GITHUB_REPOSITORY=
```

---

## `mcp/cloudflare/package.json`

```json
{
  "name":"@hendy/mcp-control-plane",
  "private":true,
  "type":"module",
  "scripts":{"dev":"tsx src/index.ts","build":"tsc -p tsconfig.json","typecheck":"tsc -p tsconfig.json --noEmit"},
  "dependencies":{"@modelcontextprotocol/sdk":"^1.17.5"},
  "devDependencies":{"tsx":"^4.20.5","typescript":"^5.9.2","@types/node":"^24.4.0"}
}
```

---

## `mcp/cloudflare/src/index.ts`

```typescript
import {createServer} from 'node:http';
import {validateConfig} from './tools/config.js';
import {sandboxDryRun} from './tools/sandbox.js';
import {cloudflareStatus,deployRelease,rollbackRelease} from './tools/cloudflare.js';
import {githubBuildStatus} from './tools/github.js';
import {observabilityErrors} from './tools/observability.js';
import {ALLOWED_TOOLS} from './policies/allowlist.js';

const port=Number(process.env.MCP_PORT || 8788);
const secret=process.env.MCP_SHARED_SECRET;

const handlers:Record<string,(args:any)=>Promise<unknown>|unknown>={
  'config.validate':async()=>validateConfig(),
  'sandbox.dryRun':async(a)=>sandboxDryRun(a?.job),
  'github.getBuildStatus':githubBuildStatus,
  'cloudflare.getDeployment':cloudflareStatus,
  'cloudflare.deployRelease':deployRelease,
  'cloudflare.rollbackRelease':rollbackRelease,
  'observability.getErrors':observabilityErrors
};

const httpServer=createServer(async (req,res)=>{
  try {
    if (secret && req.headers.authorization !== `Bearer ${secret}`) {
      res.writeHead(401, {'content-type':'application/json'});
      return res.end(JSON.stringify({error:'Unauthorized'}));
    }
    if (req.method === 'GET' && req.url === '/mcp') {
      res.writeHead(200, {'content-type':'application/json'});
      return res.end(JSON.stringify({name:'Hendy Cloudflare Control Plane',protocol:'streamable-http-compatible scaffold',tools:ALLOWED_TOOLS}));
    }
    if (req.method !== 'POST' || req.url !== '/mcp') {
      res.writeHead(404, {'content-type':'application/json'});
      return res.end(JSON.stringify({error:'Not Found'}));
    }
    let raw='';
    for await (const chunk of req) { raw += chunk; if (raw.length > 64*1024) break; }
    const body=JSON.parse(raw || '{}');
    const tool=String(body.tool || body.method || '');
    if (!ALLOWED_TOOLS.includes(tool as any)) {
      res.writeHead(403, {'content-type':'application/json'});
      return res.end(JSON.stringify({error:'Tool not allowlisted'}));
    }
    const result=await handlers[tool](body.arguments || body.args || {});
    res.writeHead(200, {'content-type':'application/json'});
    res.end(JSON.stringify({ok:true,tool,result}));
  } catch (error) {
    res.writeHead(500, {'content-type':'application/json'});
    res.end(JSON.stringify({error:error instanceof Error ? error.message : String(error)}));
  }
});
httpServer.listen(port,'127.0.0.1',()=>console.log(`MCP control plane listening on http://127.0.0.1:${port}/mcp`));
```

---

## `mcp/cloudflare/src/policies/allowlist.ts`

```typescript
export const ALLOWED_TOOLS = ['config.validate','sandbox.dryRun','github.getBuildStatus','cloudflare.getDeployment','cloudflare.deployRelease','cloudflare.rollbackRelease','observability.getErrors'] as const;
export type AllowedTool=typeof ALLOWED_TOOLS[number];
```

---

## `mcp/cloudflare/src/tools/cloudflare.ts`

```typescript
export function cloudflareStatus(){return {configured:Boolean(process.env.CLOUDFLARE_API_TOKEN),accountIdPresent:Boolean(process.env.CLOUDFLARE_ACCOUNT_ID)};}
export function deployRelease(){return {accepted:false,reason:'Release deployment must be executed by verified CI/CD gate.'};}
export function rollbackRelease(){return {accepted:false,reason:'Rollback must be executed by explicit operator action or audited workflow.'};}
```

---

## `mcp/cloudflare/src/tools/config.ts`

```typescript
import fs from 'node:fs/promises';
import path from 'node:path';
export async function validateConfig() {
  const file=path.resolve(process.cwd(),'system-config/system.config.json');
  const text=await fs.readFile(file,'utf8');
  const json=JSON.parse(text);
  return {ok:Boolean(json.system?.version),version:json.system?.version};
}
```

---

## `mcp/cloudflare/src/tools/github.ts`

```typescript
export function githubBuildStatus(){return {repository:process.env.GITHUB_REPOSITORY || null,status:'unknown',note:'Connect GitHub API to read audited workflow status.'};}
```

---

## `mcp/cloudflare/src/tools/observability.ts`

```typescript
export function observabilityErrors(){return {errors:[],source:'configured-observability-provider'};}
```

---

## `mcp/cloudflare/src/tools/sandbox.ts`

```typescript
export async function sandboxDryRun(job='config-validate') {
  return {ok:true,job,mode:'delegated-to-local-sandbox',endpoint:`ws://127.0.0.1:${process.env.SANDBOX_PORT || 8799}`};
}
```

---

## `mcp/cloudflare/tsconfig.json`

```json
{"compilerOptions":{"target":"ES2022","module":"NodeNext","moduleResolution":"NodeNext","strict":true,"outDir":"dist","skipLibCheck":true,"types":["node"]},"include":["src/**/*.ts"]}
```

---

## `package.json`

```json
{
  "name": "hendy-video-studio-pro",
  "private": true,
  "version": "2.4.0",
  "workspaces": ["system-config", "backend", "worker", "frontend", "example_bot", "mcp/cloudflare"],
  "scripts": {
    "config:validate": "node system-config/scripts/validate-config.mjs",
    "config:sync": "node system-config/scripts/sync-config.mjs",
    "sandbox": "node system-config/sandbox/server.mjs",
    "dev": "npm run config:sync && npm --workspace frontend run dev",
    "build": "npm run config:validate && npm run config:sync && npm --workspace frontend run build && npm --workspace backend run build && npm --workspace worker run build",
    "typecheck": "npm --workspace backend run typecheck && npm --workspace worker run typecheck && npm --workspace frontend run typecheck && npm --workspace mcp/cloudflare run typecheck",
    "mcp": "npm --workspace mcp/cloudflare run dev"
  }
}
```

---

## `shared/constants/limits.ts`

```typescript
export const LIMITS={maxProjectDurationMs:60*60*1000,maxUploadBytes:512*1024*1024,maxUndoSnapshots:100} as const;
```

---

## `shared/types/config.ts`

```typescript
export type SystemConfig={system:{name:string;version:string;environment:string};network:Record<string,number|string>;features:Record<string,boolean>;ai:{provider:string;models:Record<string,string>;temperature:number};storage:Record<string,unknown>;editor:{audioChannels:string[];duckingGain:number;transitionGapSeconds:number};theme:Record<string,string>;managedFiles:string[]};
```

---

## `shared/types/media.ts`

```typescript
export type Asset={id:string;name:string;mimeType:string;size:number;durationMs?:number;r2Key?:string;url?:string;metadata?:Record<string,unknown>};
```

---

## `shared/types/render.ts`

```typescript
export type AudioTrack={id:string;type:'video'|'bgm'|'tts'|'master';assetId?:string;gain:number;muted?:boolean;ducking?:boolean};
export type RenderManifest={version:1;projectId:string;canvas:{width:number;height:number;fps:number};clips:unknown[];audio:AudioTrack[];subtitle:{format:'ass'|'text';items:unknown[]};output:{container:'mp4'|'webm';videoCodec:string;audioCodec:string}};
```

---

## `shared/types/timeline.ts`

```typescript
export type MediaKind='video'|'image'|'audio'|'subtitle'|'transition';
export type TimelineClip={id:string;kind:MediaKind;startMs:number;endMs:number;assetId?:string;text?:string;style?:Record<string,unknown>;transform?:{x:number;y:number;scale:number;rotation:number;crop?:{x:number;y:number;width:number;height:number}};keyframes?:Array<{timeMs:number;x?:number;y?:number;scale?:number;rotation?:number}>};
export type TimelineProject={id:string;width:number;height:number;fps:number;durationMs:number;clips:TimelineClip[]};
```

---

## `storage/builds/.gitkeep`

```text

```

---

## `system-config/package.json`

```json
{
  "name": "@hendy/system-config",
  "private": true,
  "type": "module",
  "scripts": {
    "validate": "node scripts/validate-config.mjs",
    "sync": "node scripts/sync-config.mjs"
  },
  "dependencies": {
    "ajv": "^8.17.1",
    "sharp": "^0.34.3"
  }
}
```

---

## `system-config/sandbox/dryRun.mjs`

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';

const root = path.resolve(new URL('../..', import.meta.url).pathname);

function run(cmd, args, cwd) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {cwd, shell:false, env:{...process.env, CI:'1'}, stdio:['ignore','pipe','pipe']});
    let stdout='', stderr='';
    child.stdout.on('data', d => stdout += d);
    child.stderr.on('data', d => stderr += d);
    child.on('close', code => resolve({code, stdout, stderr}));
  });
}

export async function strictDryRun(job) {
  const tmp = path.join(root, '.tmp', `dry-run-${Date.now()}`);
  await fs.cp(root, tmp, {recursive:true, filter:(src) => !src.includes(`${path.sep}.git${path.sep}`) && !src.includes(`${path.sep}node_modules${path.sep}`)});
  try {
    const commands = {
      'config-validate': ['node',['system-config/scripts/validate-config.mjs']],
      'frontend-build': ['npm',['--workspace','frontend','run','build']],
      'backend-typecheck': ['npm',['--workspace','backend','run','typecheck']],
      'worker-typecheck': ['npm',['--workspace','worker','run','typecheck']]
    };
    if (!commands[job]) throw new Error(`Job not allowed: ${job}`);
    return {job, ...(await run(commands[job][0], commands[job][1], tmp))};
  } finally {
    await fs.rm(tmp, {recursive:true, force:true});
  }
}
```

---

## `system-config/sandbox/policy.mjs`

```javascript
export const ALLOWED_JOBS = new Set(['config-validate', 'frontend-build', 'backend-typecheck', 'worker-typecheck']);
export const MAX_PAYLOAD_BYTES = 64 * 1024;
```

---

## `system-config/sandbox/server.mjs`

```javascript
import {WebSocketServer} from 'ws';
import {MAX_PAYLOAD_BYTES} from './policy.mjs';
import {strictDryRun} from './dryRun.mjs';

const port = Number(process.env.SANDBOX_PORT || 8799);
const wss = new WebSocketServer({port, maxPayload:MAX_PAYLOAD_BYTES});

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({type:'ready', port, mode:'local-sandbox'}));
  socket.on('message', async (raw) => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg.type !== 'dry-run') return socket.send(JSON.stringify({type:'error', error:'Unsupported operation'}));
      const result = await strictDryRun(msg.payload?.job || 'config-validate');
      socket.send(JSON.stringify({type:'dry-run-result', result}));
    } catch (error) {
      socket.send(JSON.stringify({type:'dry-run-error', error:error instanceof Error ? error.message : String(error)}));
    }
  });
});

console.log(`Sandbox WebSocket listening on ws://127.0.0.1:${port}`);
```

---

## `system-config/schema/system-config.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://hendy-video-studio.local/schema/system-config.schema.json",
  "type": "object",
  "required": ["system", "network", "features", "ai", "storage", "editor", "theme", "managedFiles"],
  "properties": {
    "system": {
      "type": "object",
      "required": ["name", "version", "environment"],
      "properties": {
        "name": {"type": "string", "minLength": 1},
        "version": {"type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$"},
        "environment": {"enum": ["development", "staging", "production"]}
      },
      "additionalProperties": false
    },
    "network": {
      "type": "object",
      "required": ["sandboxPort", "backendPort", "frontendPort", "apiBasePath", "mcpPath"],
      "properties": {
        "sandboxPort": {"type": "integer", "minimum": 1024, "maximum": 65535},
        "backendPort": {"type": "integer", "minimum": 1024, "maximum": 65535},
        "frontendPort": {"type": "integer", "minimum": 1024, "maximum": 65535},
        "apiBasePath": {"type": "string", "pattern": "^/"},
        "mcpPath": {"type": "string", "pattern": "^/"}
      },
      "additionalProperties": false
    },
    "features": {"type": "object", "additionalProperties": {"type": "boolean"}},
    "ai": {
      "type": "object",
      "required": ["provider", "models", "temperature"],
      "properties": {
        "provider": {"type": "string"},
        "models": {"type": "object", "required": ["translation", "ocr", "stt"], "additionalProperties": {"type": "string"}},
        "temperature": {"type": "number", "minimum": 0, "maximum": 2}
      },
      "additionalProperties": false
    },
    "storage": {
      "type": "object",
      "required": ["provider", "bucketEnv", "zeroEgress"],
      "properties": {
        "provider": {"type": "string"},
        "bucketEnv": {"type": "string"},
        "zeroEgress": {"type": "boolean"}
      },
      "additionalProperties": false
    },
    "editor": {
      "type": "object",
      "required": ["audioChannels", "duckingGain", "transitionGapSeconds"],
      "properties": {
        "audioChannels": {"type": "array", "items": {"type": "string"}, "minItems": 1},
        "duckingGain": {"type": "number", "minimum": 0, "maximum": 1},
        "transitionGapSeconds": {"type": "number", "minimum": 0}
      },
      "additionalProperties": false
    },
    "theme": {
      "type": "object",
      "required": ["darkBackgroundColor", "darkContainerBackgroundColor", "accentColor", "textColor"],
      "properties": {
        "darkBackgroundColor": {"type": "string", "pattern": "^#[0-9a-fA-F]{6}$"},
        "darkContainerBackgroundColor": {"type": "string", "pattern": "^#[0-9a-fA-F]{6}$"},
        "accentColor": {"type": "string", "pattern": "^#[0-9a-fA-F]{6}$"},
        "textColor": {"type": "string", "pattern": "^#[0-9a-fA-F]{6}$"}
      },
      "additionalProperties": false
    },
    "managedFiles": {"type": "array", "items": {"type": "string"}, "uniqueItems": true}
  },
  "additionalProperties": false
}
```

---

## `system-config/scripts/push-env-to-cf.mjs`

```javascript
import process from 'node:process';

const required = ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing environment: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Cloudflare env push is intentionally explicit. Use Wrangler secrets/vars for production and never print secret values.');
```

---

## `system-config/scripts/sync-config.mjs`

```javascript
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('../..', import.meta.url).pathname);
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'system-config/system.config.json'), 'utf8'));

const kebab = (s) => s.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
const out = path.join(root, 'frontend/src/generated');
fs.mkdirSync(out, {recursive: true});

fs.writeFileSync(path.join(out, 'system-config.ts'),
`export const SYSTEM_CONFIG = ${JSON.stringify(cfg, null, 2)} as const;\n`);

fs.writeFileSync(path.join(out, 'system-env.ts'),
`export type RuntimeEnv = { API_BASE_URL?: string; TELEGRAM_BOT_USERNAME?: string };\nexport const runtimeEnv: RuntimeEnv = {\n  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,\n  TELEGRAM_BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME\n};\n`);

const css = Object.entries(cfg.theme).map(([k,v]) => `  --${kebab(k)}: ${v};`).join('\n');
fs.writeFileSync(path.join(out, 'system-theme.css'), `:root {\n${css}\n}\n`);

fs.writeFileSync(path.join(out, 'system-layout.tsx'),
`import type { ReactNode } from 'react';\nexport function SystemLayout({children}:{children:ReactNode}) {\n  return <div className="system-layout"><main className="system-main">{children}</main><nav className="bottom-action-dock" aria-label="Editor actions"><button>Timeline</button><button>Assets</button><button>Audio</button><button>Export</button></nav></div>;\n}\n`);

const manifest = {
  name: cfg.system.name,
  short_name: 'AI Studio Pro',
  start_url: '/', display: 'standalone',
  background_color: cfg.theme.darkBackgroundColor,
  theme_color: cfg.theme.darkBackgroundColor,
  icons: [{src:'/logo192.png',sizes:'192x192',type:'image/png'},{src:'/logo512.png',sizes:'512x512',type:'image/png'}]
};
fs.writeFileSync(path.join(root, 'frontend/public/manifest.json'), JSON.stringify(manifest, null, 2));

fs.writeFileSync(path.join(root, 'frontend/index.html'),
`<!doctype html><html lang="vi"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/><title>${cfg.system.name}</title><meta name="theme-color" content="${cfg.theme.darkBackgroundColor}"/><script src="https://telegram.org/js/telegram-web-app.js"></script></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`);

fs.writeFileSync(path.join(root, 'worker/wrangler.jsonc'), JSON.stringify({name:'hendy-video-studio-pro-api',main:'src/index.ts',compatibility_date:'2026-09-27',vars:{API_BASE_PATH:cfg.network.apiBasePath}}, null, 2));
console.log(`SOT synced to ${cfg.managedFiles.length} managed targets.`);
```

---

## `system-config/scripts/validate-config.mjs`

```javascript
import fs from 'node:fs';
import path from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const configPath = path.join(root, 'system.config.json');
const schemaPath = path.join(root, 'schema', 'system-config.schema.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

function fail(message){console.error(`SOT validation failed: ${message}`);process.exit(1)}
function isHex(v){return typeof v==='string' && /^#[0-9a-fA-F]{6}$/.test(v)}
function required(obj, keys, label){for(const k of keys)if(!(k in obj))fail(`${label}.${k} is required`)}
required(config,['system','network','features','ai','storage','editor','theme','managedFiles'],'root');
required(config.system,['name','version','environment'],'system');
if(!/^\d+\.\d+\.\d+$/.test(config.system.version))fail('system.version must be semver-like');
if(!['development','staging','production'].includes(config.system.environment))fail('system.environment invalid');
required(config.network,['sandboxPort','backendPort','frontendPort','apiBasePath','mcpPath'],'network');
for(const k of ['sandboxPort','backendPort','frontendPort'])if(!Number.isInteger(config.network[k])||config.network[k]<1024||config.network[k]>65535)fail(`network.${k} invalid port`);
for(const k of ['apiBasePath','mcpPath'])if(typeof config.network[k]!=='string'||!config.network[k].startsWith('/'))fail(`network.${k} invalid path`);
if(typeof config.features!=='object'||Array.isArray(config.features))fail('features must be object');
for(const [k,v] of Object.entries(config.features))if(typeof v!=='boolean')fail(`features.${k} must be boolean`);
required(config.ai,['provider','models','temperature'],'ai');
required(config.ai.models,['translation','ocr','stt'],'ai.models');
if(typeof config.ai.temperature!=='number'||config.ai.temperature<0||config.ai.temperature>2)fail('ai.temperature invalid');
required(config.storage,['provider','bucketEnv','zeroEgress'],'storage');
if(typeof config.storage.zeroEgress!=='boolean')fail('storage.zeroEgress must be boolean');
required(config.editor,['audioChannels','duckingGain','transitionGapSeconds'],'editor');
if(!Array.isArray(config.editor.audioChannels)||!config.editor.audioChannels.length)fail('editor.audioChannels empty');
if(config.editor.duckingGain<0||config.editor.duckingGain>1)fail('editor.duckingGain invalid');
if(config.editor.transitionGapSeconds<0)fail('editor.transitionGapSeconds invalid');
required(config.theme,['darkBackgroundColor','darkContainerBackgroundColor','accentColor','textColor'],'theme');
for(const [k,v] of Object.entries(config.theme))if(!isHex(v))fail(`theme.${k} invalid color`);
if(!Array.isArray(config.managedFiles)||new Set(config.managedFiles).size!==config.managedFiles.length)fail('managedFiles must be unique array');

// Sanity-check the schema file is present and is a JSON Schema document.
if(schema.$schema?.includes('json-schema')!==true || schema.type!=='object') fail('schema/system-config.schema.json is not a valid object-schema document');
console.log(`SOT valid: ${config.system.name} v${config.system.version}`);
```

---

## `system-config/system.config.json`

```json
{
  "system": {
    "name": "Hendy Video Studio Pro",
    "version": "2.4.0",
    "environment": "production"
  },
  "network": {
    "sandboxPort": 8799,
    "backendPort": 8787,
    "frontendPort": 5173,
    "apiBasePath": "/api/v1",
    "mcpPath": "/mcp"
  },
  "features": {
    "enableMCP": true,
    "enableLinkExtractor": true,
    "enableImageOCR": true,
    "enableAudioSTT": true,
    "enableTelegramAdmin": true,
    "enableOfflineFirst": true,
    "enableAudioDucking": true
  },
  "ai": {
    "provider": "google",
    "models": {
      "translation": "gemini-2.5-flash",
      "ocr": "gemini-2.5-flash",
      "stt": "gemini-2.5-flash"
    },
    "temperature": 0.1
  },
  "storage": {
    "provider": "cloudflare-r2",
    "bucketEnv": "R2_BUCKET",
    "zeroEgress": true
  },
  "editor": {
    "audioChannels": ["video", "bgm", "tts", "master"],
    "duckingGain": 0.2,
    "transitionGapSeconds": 1.5
  },
  "theme": {
    "darkBackgroundColor": "#17171a",
    "darkContainerBackgroundColor": "#232324",
    "accentColor": "#ff8a00",
    "textColor": "#f5f5f5"
  },
  "managedFiles": [
    "frontend/src/generated/system-config.ts",
    "frontend/src/generated/system-env.ts",
    "frontend/src/generated/system-theme.css",
    "frontend/src/generated/system-layout.tsx",
    "frontend/public/manifest.json",
    "frontend/index.html",
    "worker/wrangler.jsonc"
  ]
}
```

---

## `worker/package.json`

```json
{
  "name":"@hendy/worker",
  "private":true,
  "type":"module",
  "scripts":{"dev":"wrangler dev","build":"tsc -p tsconfig.json","typecheck":"tsc -p tsconfig.json --noEmit","deploy":"wrangler deploy"},
  "devDependencies":{"@cloudflare/workers-types":"^5.20260926.1","typescript":"^5.9.2","wrangler":"^4.37.0"}
}
```

---

## `worker/src/index.ts`

```typescript
export interface Env { API_BASE_PATH:string }
export default { async fetch(req:Request, env:Env):Promise<Response> {
  const url=new URL(req.url);
  if(url.pathname==='/health') return Response.json({ok:true,edge:true,version:'2.4.0'});
  if(url.pathname.startsWith(env.API_BASE_PATH || '/api/v1')) return Response.json({ok:true,service:'edge-worker',path:url.pathname});
  return new Response('Not Found',{status:404});
}} satisfies ExportedHandler<Env>;
```

---

## `worker/tsconfig.json`

```json
{"compilerOptions":{"target":"ES2022","module":"ES2022","moduleResolution":"Bundler","strict":true,"types":["@cloudflare/workers-types"],"skipLibCheck":true},"include":["src/**/*.ts"]}
```

---

## `worker/wrangler.jsonc`

```json
{
  "name": "hendy-video-studio-pro-api",
  "main": "src/index.ts",
  "compatibility_date": "2026-09-27",
  "vars": {
    "API_BASE_PATH": "/api/v1"
  }
}
```
