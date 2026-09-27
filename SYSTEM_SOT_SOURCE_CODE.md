# Hendy Video Studio Pro v2.4.0 — Full Source Snapshot

Generated from the repository working tree. Secrets, node_modules, dist, temp files and binary production artifacts are excluded.

## File index

- `.env.example`
- `.github/workflows/deploy.yml`
- `.github/workflows/dry-run.yml`
- `.github/workflows/rollback.yml`
- `BUILD_ARTIFACTS.md`
- `FILE_LIST.txt`
- `README.md`
- `backend/.env.example`
- `backend/package.json`
- `backend/src/controllers/downloadController.ts`
- `backend/src/routes/auth.ts`
- `backend/src/routes/cloudflare.ts`
- `backend/src/routes/gemini.ts`
- `backend/src/routes/media.ts`
- `backend/src/routes/projects.ts`
- `backend/src/server.ts`
- `backend/src/services/audioMixOptimizer.ts`
- `backend/src/services/audioTranscriber.ts`
- `backend/src/services/auth.ts`
- `backend/src/services/cloudflareTts.ts`
- `backend/src/services/extractor.ts`
- `backend/src/services/geminiClient.ts`
- `backend/src/services/geminiTts.ts`
- `backend/src/services/imageTranslator.ts`
- `backend/src/services/otpService.ts`
- `backend/src/services/r2Storage.ts`
- `backend/src/services/recoveryService.ts`
- `backend/src/services/storyboardGenerator.ts`
- `backend/src/services/telegramAuth.ts`
- `backend/src/services/videoTranscriber.ts`
- `backend/src/services/vietnameseEnhancer.ts`
- `backend/src/services/vietsubAi.ts`
- `backend/tsconfig.json`
- `docs/EDITOR_AI_PIPELINE.md`
- `example_bot/README.md`
- `example_bot/docs/tgcloud-sdk.md`
- `example_bot/handlers/callback_query.js`
- `example_bot/handlers/message.js`
- `example_bot/handlers/webhook.js`
- `example_bot/package.json`
- `example_bot/schema.js`
- `frontend/.env.example`
- `frontend/index.html`
- `frontend/package.json`
- `frontend/public/manifest.json`
- `frontend/public/sw.js`
- `frontend/src/App.tsx`
- `frontend/src/app.css`
- `frontend/src/components/editor/AssetSidebar.tsx`
- `frontend/src/components/editor/AudioMixer.tsx`
- `frontend/src/components/editor/CanvasPreview.tsx`
- `frontend/src/components/editor/InspectorPanel.tsx`
- `frontend/src/components/editor/MultiChannelAudioMixer.tsx`
- `frontend/src/components/editor/Timeline.tsx`
- `frontend/src/components/system/Header.tsx`
- `frontend/src/components/system/PwaInstallBanner.tsx`
- `frontend/src/components/system/SystemControlPanel.tsx`
- `frontend/src/generated/system-config.ts`
- `frontend/src/generated/system-env.ts`
- `frontend/src/generated/system-layout.tsx`
- `frontend/src/generated/system-theme.css`
- `frontend/src/main.tsx`
- `frontend/src/services/ai.ts`
- `frontend/src/services/api.ts`
- `frontend/src/services/renderManifest.ts`
- `frontend/src/services/telegram.ts`
- `frontend/src/types/project.ts`
- `frontend/src/utils/appDownloader.ts`
- `frontend/src/utils/audioEngine.ts`
- `frontend/src/utils/frameInjector.ts`
- `frontend/src/utils/subBurner.ts`
- `frontend/src/utils/subtitleExporter.ts`
- `frontend/src/utils/undoEngine.ts`
- `frontend/src/utils/videoRenderer.ts`
- `frontend/src/vite-env.d.ts`
- `frontend/tsconfig.json`
- `frontend/vite.config.ts`
- `mcp/cloudflare/.env.example`
- `mcp/cloudflare/package.json`
- `mcp/cloudflare/src/index.ts`
- `mcp/cloudflare/src/policies/allowlist.ts`
- `mcp/cloudflare/src/tools/cloudflare.ts`
- `mcp/cloudflare/src/tools/config.ts`
- `mcp/cloudflare/src/tools/github.ts`
- `mcp/cloudflare/src/tools/observability.ts`
- `mcp/cloudflare/src/tools/sandbox.ts`
- `mcp/cloudflare/tsconfig.json`
- `package.json`
- `shared/constants/limits.ts`
- `shared/types/config.ts`
- `shared/types/media.ts`
- `shared/types/render.ts`
- `shared/types/timeline.ts`
- `system-config/package.json`
- `system-config/sandbox/dryRun.mjs`
- `system-config/sandbox/policy.mjs`
- `system-config/sandbox/server.mjs`
- `system-config/schema/system-config.schema.json`
- `system-config/scripts/export-source-md.mjs`
- `system-config/scripts/push-env-to-cf.mjs`
- `system-config/scripts/sync-config.mjs`
- `system-config/scripts/validate-config.mjs`
- `system-config/system.config.json`
- `worker/package.json`
- `worker/src/index.ts`
- `worker/tsconfig.json`
- `worker/wrangler.jsonc`

## `.env.example`

```example
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

GEMINI_TTS_MODEL=gemini-3.8-flash-tts
GEMINI_TTS_VOICE=Kore
CLOUDFLARE_AI_TTS_URL=http://localhost:8788/api/ai/tts
GEMINI_AUDIO_MIX_MODEL=gemini-3.8-flash
GEMINI_STORYBOARD_MODEL=gemini-3.8-flash
GEMINI_VIETNAMESE_MODEL=gemini-3.8-flash

```

## `.github/workflows/deploy.yml`

```yml
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

## `.github/workflows/dry-run.yml`

```yml
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

## `.github/workflows/rollback.yml`

```yml
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

## `BUILD_ARTIFACTS.md`

```md
# Production build artifacts

The repository intentionally does not ship real APK/AAB/EXE/DMG binaries. Place signed production artifacts here before enabling the Smart Download Gateway:

- `ai-studio-pro-latest.apk`
- `ai-studio-pro-release.aab`
- `ai-studio-pro-setup.exe`
- `ai-studio-pro-release.dmg`

Never commit unsigned debug builds or secrets beside these artifacts.

## Cloudflare build fix

`worker/package.json` is generated from SOT toolchain pins. `@cloudflare/workers-types` is pinned to `5.20260926.1` and Wrangler to `4.137.0` to keep Cloudflare/Bun dependency resolution deterministic.

```

## `FILE_LIST.txt`

```txt
.env.example
.github/workflows/deploy.yml
.github/workflows/dry-run.yml
.github/workflows/rollback.yml
BUILD_ARTIFACTS.md
FILE_LIST.txt
README.md
backend/.env.example
backend/package.json
backend/src/controllers/downloadController.ts
backend/src/routes/auth.ts
backend/src/routes/cloudflare.ts
backend/src/routes/gemini.ts
backend/src/routes/media.ts
backend/src/routes/projects.ts
backend/src/server.ts
backend/src/services/audioMixOptimizer.ts
backend/src/services/audioTranscriber.ts
backend/src/services/auth.ts
backend/src/services/cloudflareTts.ts
backend/src/services/extractor.ts
backend/src/services/geminiClient.ts
backend/src/services/geminiTts.ts
backend/src/services/imageTranslator.ts
backend/src/services/otpService.ts
backend/src/services/r2Storage.ts
backend/src/services/recoveryService.ts
backend/src/services/storyboardGenerator.ts
backend/src/services/telegramAuth.ts
backend/src/services/videoTranscriber.ts
backend/src/services/vietnameseEnhancer.ts
backend/src/services/vietsubAi.ts
backend/tsconfig.json
docs/EDITOR_AI_PIPELINE.md
example_bot/README.md
example_bot/docs/tgcloud-sdk.md
example_bot/handlers/callback_query.js
example_bot/handlers/message.js
example_bot/handlers/webhook.js
example_bot/package.json
example_bot/schema.js
frontend/.env.example
frontend/index.html
frontend/package.json
frontend/public/manifest.json
frontend/public/sw.js
frontend/src/App.tsx
frontend/src/app.css
frontend/src/components/editor/AssetSidebar.tsx
frontend/src/components/editor/AudioMixer.tsx
frontend/src/components/editor/CanvasPreview.tsx
frontend/src/components/editor/InspectorPanel.tsx
frontend/src/components/editor/MultiChannelAudioMixer.tsx
frontend/src/components/editor/Timeline.tsx
frontend/src/components/system/Header.tsx
frontend/src/components/system/PwaInstallBanner.tsx
frontend/src/components/system/SystemControlPanel.tsx
frontend/src/generated/system-config.ts
frontend/src/generated/system-env.ts
frontend/src/generated/system-layout.tsx
frontend/src/generated/system-theme.css
frontend/src/main.tsx
frontend/src/services/ai.ts
frontend/src/services/api.ts
frontend/src/services/renderManifest.ts
frontend/src/services/telegram.ts
frontend/src/types/project.ts
frontend/src/utils/appDownloader.ts
frontend/src/utils/audioEngine.ts
frontend/src/utils/frameInjector.ts
frontend/src/utils/subBurner.ts
frontend/src/utils/subtitleExporter.ts
frontend/src/utils/undoEngine.ts
frontend/src/utils/videoRenderer.ts
frontend/src/vite-env.d.ts
frontend/tsconfig.json
frontend/vite.config.ts
mcp/cloudflare/.env.example
mcp/cloudflare/package.json
mcp/cloudflare/src/index.ts
mcp/cloudflare/src/policies/allowlist.ts
mcp/cloudflare/src/tools/cloudflare.ts
mcp/cloudflare/src/tools/config.ts
mcp/cloudflare/src/tools/github.ts
mcp/cloudflare/src/tools/observability.ts
mcp/cloudflare/src/tools/sandbox.ts
mcp/cloudflare/tsconfig.json
package.json
shared/constants/limits.ts
shared/types/config.ts
shared/types/media.ts
shared/types/render.ts
shared/types/timeline.ts
system-config/package.json
system-config/sandbox/dryRun.mjs
system-config/sandbox/policy.mjs
system-config/sandbox/server.mjs
system-config/schema/system-config.schema.json
system-config/scripts/export-source-md.mjs
system-config/scripts/push-env-to-cf.mjs
system-config/scripts/sync-config.mjs
system-config/scripts/validate-config.mjs
system-config/system.config.json
worker/package.json
worker/src/index.ts
worker/tsconfig.json
worker/wrangler.jsonc

```

## `README.md`

```md
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

``\`bash
cp .env.example .env
npm install
npm run config:validate
npm run config:sync
npm run sandbox
``\`

Terminal khác:

``\`bash
npm --workspace backend run dev
npm --workspace worker run dev  # Worker: http://localhost:8788
npm --workspace frontend run dev
npm --workspace mcp/cloudflare run dev
``\`

## Dry-run

Gửi WebSocket message:

``\`json
{"type":"dry-run","payload":{"package":"frontend"}}
``\`

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
Model mặc định: `gemini-3.8-flash`; TTS: `gemini-3.8-flash-tts`; fallback throughput TTS: `gemini-3.8-flash-lite-tts`. Cloudflare Worker TTS dùng model ID hiện hành `@cf/myshell-ai/melotts`.

Editor AI endpoints gồm translation/STT/TTS/audio-mix/storyboard/Vietnamese enhancement.

## Cloudflare Workers Types pin

Cloudflare's `@cloudflare/workers-types` publishes date-based versions. The Worker package pins `5.20260926.1` because the previously generated Workers Types specifier no longer resolves in the Cloudflare build environment.

Cloudflare recommends generating Worker binding types with `wrangler types` for new projects; this repository keeps the package for editor/type declarations and can migrate to generated `worker-configuration.d.ts` later.

```

## `backend/.env.example`

```example
BACKEND_PORT=8787
FRONTEND_ORIGIN=http://localhost:5173
TELEGRAM_BOT_TOKEN=
TELEGRAM_OTP_TTL_SECONDS=60
GEMINI_API_KEY=
GEMINI_TRANSLATION_MODEL=gemini-3.8-flash
GEMINI_OCR_MODEL=gemini-3.8-flash
GEMINI_STT_MODEL=gemini-3.8-flash
GEMINI_TEMPERATURE=0.1
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=ai-studio-pro
TESTFLIGHT_URL=
ADMIN_USER_IDS=

GEMINI_TTS_MODEL=gemini-3.8-flash-tts
GEMINI_TTS_VOICE=Kore
CLOUDFLARE_AI_TTS_URL=http://localhost:8788/api/ai/tts
GEMINI_AUDIO_MIX_MODEL=gemini-3.8-flash
GEMINI_STORYBOARD_MODEL=gemini-3.8-flash
GEMINI_VIETNAMESE_MODEL=gemini-3.8-flash

```

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
    "@google/genai": "^2.24.0",
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
    "typescript": "^5.9.2",
    "@types/multer": "^2.0.0"
  }
}

```

## `backend/src/controllers/downloadController.ts`

```ts
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

## `backend/src/routes/auth.ts`

```ts
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

## `backend/src/routes/cloudflare.ts`

```ts
import { Router } from 'express';
import { synthesizeCloudflareTts } from '../services/cloudflareTts.js';
export const cloudflareRouter = Router();
cloudflareRouter.post('/tts', async (req, res, next) => {
  try { res.json(await synthesizeCloudflareTts(String(req.body?.text || ''), req.body?.lang || 'vi')); }
  catch (e) { next(e); }
});

```

## `backend/src/routes/gemini.ts`

```ts
import { Router } from 'express';
import multer from 'multer';
import { translateSubtitleChunk } from '../services/vietsubAi.js';
import { transcribeAudio } from '../services/audioTranscriber.js';
import { synthesizeGeminiTts } from '../services/geminiTts.js';
import { optimizeAudioMix } from '../services/audioMixOptimizer.js';
import { createStoryboard } from '../services/storyboardGenerator.js';
import { enhanceVietnamese } from '../services/vietnameseEnhancer.js';

const upload = multer({ limits: { fileSize: Number(process.env.MAX_AI_UPLOAD_BYTES || 50_000_000) } });
export const geminiRouter = Router();

geminiRouter.post('/subtitles', async (req, res, next) => { try { res.json({ cues: await translateSubtitleChunk(req.body?.cues || [], req.body?.targetLanguage || 'vi') }); } catch (e) { next(e); } });
geminiRouter.post('/tts', async (req, res, next) => { try { const r = await synthesizeGeminiTts({ text: String(req.body?.text || ''), voice: req.body?.voice, style: req.body?.style, mimeType: req.body?.mimeType, sampleRate: req.body?.sampleRate }); res.json(r); } catch (e) { next(e); } });
geminiRouter.post('/audio-mix', async (req, res, next) => { try { res.json(await optimizeAudioMix(req.body || { channels: [] })); } catch (e) { next(e); } });
geminiRouter.post('/create-video', async (req, res, next) => { try { res.json(await createStoryboard(String(req.body?.script || ''))); } catch (e) { next(e); } });
geminiRouter.post('/transcribe', upload.single('audio'), async (req, res, next) => { try { if (!req.file) return res.status(400).json({ error: 'audio file is required' }); res.json({ cues: await transcribeAudio(req.file.buffer, req.file.mimetype) }); } catch (e) { next(e); } });
geminiRouter.post('/enhance-vietnamese', async (req, res, next) => { try { res.json(await enhanceVietnamese(String(req.body?.text || ''))); } catch (e) { next(e); } });

```

## `backend/src/routes/media.ts`

```ts
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

## `backend/src/routes/projects.ts`

```ts
import {Router} from 'express';
import crypto from 'node:crypto';
import {saveRecoverySnapshot, restoreRecoverySnapshot} from '../services/recoveryService.js';
export const projectRouter = Router();
projectRouter.post('/snapshot',(req,res)=>{const projectId=String(req.body?.projectId || crypto.randomUUID()); saveRecoverySnapshot(projectId,req.body?.project); res.status(201).json({ok:true,projectId});});
projectRouter.get('/:id/recovery',(req,res)=>res.json({projectId:req.params.id,payload:restoreRecoverySnapshot(req.params.id)}));

```

## `backend/src/server.ts`

```ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {authRouter} from './routes/auth.js';
import {mediaRouter} from './routes/media.js';
import {projectRouter} from './routes/projects.js';
import {smartDownload} from './controllers/downloadController.js';
import {geminiRouter} from './routes/gemini.js';
import {cloudflareRouter} from './routes/cloudflare.js';

const app = express();
app.disable('x-powered-by');
app.use(cors({origin:(process.env.FRONTEND_ORIGIN || 'http://localhost:5173').split(',')}));
app.use(express.json({limit:'4mb'}));
app.get('/health',(req,res)=>res.json({ok:true,version:'2.4.0',timestamp:new Date().toISOString()}));
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/media',mediaRouter);
app.use('/api/v1/projects',projectRouter);
app.use('/api/gemini', geminiRouter);
app.use('/api/cloudflare', cloudflareRouter);
app.get('/tai-app',smartDownload);
app.use((err:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{console.error(err);res.status(500).json({error:'Internal server error'});});

const port=Number(process.env.BACKEND_PORT || 8787);
app.listen(port,'0.0.0.0',()=>console.log(`Backend listening on :${port}`));

```

## `backend/src/services/audioMixOptimizer.ts`

```ts
import { gemini, modelFor, cleanJson } from './geminiClient.js';

export type AudioMixInput = {
  channels: Array<{ id: string; gain: number; muted?: boolean; ducking?: boolean }>;
  voicePresent?: boolean;
  targetLufs?: number;
};

export async function optimizeAudioMix(input: AudioMixInput) {
  const client = gemini();
  const response = await client.models.generateContent({
    model: modelFor('audioMix', 'gemini-3.8-flash'),
    contents: [{ text: `Analyze a four-channel video mix and return JSON only with optimized gains and ducking. Target loudness ${input.targetLufs ?? -14} LUFS. Input: ${JSON.stringify(input)}` }],
    config: { temperature: 0.1, responseMimeType: 'application/json' }
  });
  const raw = cleanJson(response.text || '{}');
  try { return JSON.parse(raw); } catch { return { channels: input.channels, reason: 'AI response was not valid JSON' }; }
}

```

## `backend/src/services/audioTranscriber.ts`

```ts
import {GoogleGenAI} from '@google/genai';

type Cue = {startMs:number; endMs:number; text:string};
export async function transcribeAudio(data:Buffer, mimeType:string):Promise<Cue[]> {
  if (!process.env.GEMINI_API_KEY) return [];
  const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
  const prompt = 'Transcribe the spoken dialogue. Return only a JSON array of cues with startMs, endMs, text.';
  const response = await ai.models.generateContent({model:process.env.GEMINI_STT_MODEL || 'gemini-3.8-flash', contents:[{text:prompt},{inlineData:{mimeType,data:data.toString('base64')}}], config:{temperature:0}});
  try { return JSON.parse((response.text || '[]').replace(/^``\`json\s*|``\`$/g,'')); } catch { return []; }
}

```

## `backend/src/services/auth.ts`

```ts
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

## `backend/src/services/cloudflareTts.ts`

```ts
export async function synthesizeCloudflareTts(text: string, lang = 'vi') {
  const endpoint = process.env.CLOUDFLARE_AI_TTS_URL;
  if (!endpoint) throw new Error('CLOUDFLARE_AI_TTS_URL is not configured');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ text, lang })
  });
  if (!response.ok) throw new Error(`Cloudflare TTS failed: ${response.status} ${await response.text()}`);
  const contentType = response.headers.get('content-type') || 'audio/mpeg';
  const buffer = Buffer.from(await response.arrayBuffer());
  return { mimeType: contentType, base64: buffer.toString('base64'), bytes: buffer.byteLength };
}

```

## `backend/src/services/extractor.ts`

```ts
export type ExtractedSubtitle = {startMs:number; endMs:number; text:string};

export async function extractSubtitlesFromUrl(rawUrl:string):Promise<ExtractedSubtitle[]> {
  const url = new URL(rawUrl);
  if (!['http:','https:'].includes(url.protocol)) throw new Error('Only http/https URLs are allowed');
  // Provider integrations should be implemented behind this contract.
  // Do not silently scrape sites whose terms or robots policies disallow it.
  return [];
}

```

## `backend/src/services/geminiClient.ts`

```ts
import { GoogleGenAI } from '@google/genai';

export function gemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');
  return new GoogleGenAI({ apiKey });
}

export function modelFor(key: string, fallback: string) {
  return process.env[`GEMINI_${key.toUpperCase()}_MODEL`] || fallback;
}

export function cleanJson(text: string): string {
  return text.trim().replace(/^``\`(?:json)?\s*/i, '').replace(/``\`$/i, '').trim();
}

```

## `backend/src/services/geminiTts.ts`

```ts
import { gemini, modelFor } from './geminiClient.js';

export type GeminiTtsOptions = {
  text: string;
  voice?: string;
  style?: string;
  mimeType?: 'audio/wav' | 'audio/l16' | 'audio/mulaw' | 'audio/alaw';
  sampleRate?: number;
};

export async function synthesizeGeminiTts(options: GeminiTtsOptions) {
  const client = gemini();
  const model = modelFor('tts', 'gemini-3.8-flash-tts');
  const interaction = await client.interactions.create({
    model,
    input: [{
      type: 'user_input',
      content: [{
        type: 'text',
        text: options.text,
        annotations: options.style ? [{ type: 'speech_metadata', style: options.style }] : undefined
      }]
    }],
    response_format: {
      type: 'audio',
      mime_type: options.mimeType || 'audio/wav',
      ...(options.sampleRate ? { sample_rate: options.sampleRate } : {})
    },
    generation_config: {
      speech_config: [{ voice: options.voice || process.env.GEMINI_TTS_VOICE || 'Kore' }]
    }
  });
  const data = interaction.output_audio?.data;
  if (!data) throw new Error('Gemini TTS returned no audio payload');
  return {
    model,
    mimeType: options.mimeType || 'audio/wav',
    base64: data,
    bytes: Buffer.from(data, 'base64').byteLength
  };
}

```

## `backend/src/services/imageTranslator.ts`

```ts
import {GoogleGenAI} from '@google/genai';
export async function translateImage(data:Buffer, mimeType:string, target='vi'):Promise<{sourceText:string; translatedText:string}> {
  if (!process.env.GEMINI_API_KEY) return {sourceText:'', translatedText:''};
  const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
  const response = await ai.models.generateContent({model:process.env.GEMINI_OCR_MODEL || 'gemini-3.8-flash', contents:[{text:`Read text in image and translate it to ${target}. Return JSON {sourceText, translatedText}.`},{inlineData:{mimeType,data:data.toString('base64')}}], config:{temperature:0.1}});
  try { return JSON.parse((response.text || '{}').replace(/^``\`json\s*|``\`$/g,'')); } catch { return {sourceText:'', translatedText:''}; }
}

```

## `backend/src/services/otpService.ts`

```ts
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

## `backend/src/services/r2Storage.ts`

```ts
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

## `backend/src/services/recoveryService.ts`

```ts
export type RecoverySnapshot = {projectId:string; createdAt:number; payload:unknown};
const snapshots = new Map<string, RecoverySnapshot>();
export function saveRecoverySnapshot(projectId:string, payload:unknown) { snapshots.set(projectId,{projectId,createdAt:Date.now(),payload}); }
export function restoreRecoverySnapshot(projectId:string) { return snapshots.get(projectId)?.payload ?? null; }

```

## `backend/src/services/storyboardGenerator.ts`

```ts
import { gemini, modelFor, cleanJson } from './geminiClient.js';

export async function createStoryboard(script: string) {
  const client = gemini();
  const response = await client.models.generateContent({
    model: modelFor('storyboard', 'gemini-3.8-flash'),
    contents: [{ text: `Create a production-ready video storyboard from this script. Return JSON only: {title, scenes:[{id,startMs,endMs,visual,prompt,voiceover}]}\nSCRIPT:\n${script}` }],
    config: { temperature: 0.2, responseMimeType: 'application/json' }
  });
  try { return JSON.parse(cleanJson(response.text || '{}')); } catch { return { title: 'Storyboard', scenes: [] }; }
}

```

## `backend/src/services/telegramAuth.ts`

```ts
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

## `backend/src/services/videoTranscriber.ts`

```ts
import {transcribeAudio} from './audioTranscriber.js';
export async function transcribeVideoAudio(data:Buffer):Promise<ReturnType<typeof transcribeAudio>> {
  // Production: demux audio with FFmpeg before Gemini. This scaffold expects audio bytes.
  return transcribeAudio(data, 'audio/mpeg');
}

```

## `backend/src/services/vietnameseEnhancer.ts`

```ts
import { gemini, modelFor, cleanJson } from './geminiClient.js';

export async function enhanceVietnamese(text: string) {
  const client = gemini();
  const response = await client.models.generateContent({
    model: modelFor('vietnamese', 'gemini-3.8-flash'),
    contents: [{ text: `Recover Vietnamese diacritics and polish this subtitle for natural cinematic phrasing. Preserve meaning. Return JSON only as {text:string, alternatives:string[]}.\nINPUT:\n${text}` }],
    config: { temperature: 0.15, responseMimeType: 'application/json' }
  });
  try { return JSON.parse(cleanJson(response.text || '{}')); } catch { return { text, alternatives: [] }; }
}

```

## `backend/src/services/vietsubAi.ts`

```ts
import {GoogleGenAI} from '@google/genai';

type Cue = {startMs:number; endMs:number; text:string};

export async function translateSubtitleChunk(cues:Cue[], targetLanguage='vi'):Promise<Cue[]> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return cues;
  const ai = new GoogleGenAI({apiKey:key});
  const prompt = `Translate subtitle cues to ${targetLanguage}. Preserve JSON shape exactly. Return only JSON array. Cues: ${JSON.stringify(cues)}`;
  const response = await ai.models.generateContent({model:process.env.GEMINI_TRANSLATION_MODEL || 'gemini-3.8-flash', contents:prompt, config:{temperature:Number(process.env.GEMINI_TEMPERATURE || '0.1')}});
  const text = response.text?.trim() || '[]';
  try { return JSON.parse(text.replace(/^``\`json\s*|``\`$/g,'')); } catch { return cues; }
}

```

## `backend/tsconfig.json`

```json
{"compilerOptions":{"target":"ES2022","module":"NodeNext","moduleResolution":"NodeNext","outDir":"dist","strict":true,"esModuleInterop":true,"skipLibCheck":true,"types":["node"]},"include":["src/**/*.ts"]}

```

## `docs/EDITOR_AI_PIPELINE.md`

```md
# Editor AI Pipeline v2.4.0

## Browser Client
- `Header.tsx`: session/status shell.
- `App.tsx`: central project state, selection, playback dispatch and export orchestration.
- `AssetSidebar.tsx`: import/drag-drop/record entry points.
- `CanvasPreview.tsx`: 1280x720 canvas viewport and subtitle/PiP-ready composition surface.
- `Timeline.tsx`: four-track scroller surface.
- `InspectorPanel.tsx`: clip timing and subtitle editing.
- `MultiChannelAudioMixer.tsx`: Web Audio API 4-channel gain/meter/ducking matrix.

## Client Processing
- `audioEngine.ts`: Web Audio graph, limiter/compressor and meters.
- `videoRenderer.ts`: Canvas capture + codec capability detection via MediaRecorder.
- `subtitleExporter.ts`: SRT/VTT/ASS formatter and download.
- `appDownloader.ts`: platform download routing.

## Server API
- `POST /api/gemini/subtitles`
- `POST /api/gemini/tts`
- `POST /api/cloudflare/tts`
- `POST /api/gemini/audio-mix`
- `POST /api/gemini/create-video`
- `POST /api/gemini/transcribe`
- `POST /api/gemini/enhance-vietnamese`

## AI Models
Gemini uses `gemini-3.8-flash` for translation/STT/storyboard/mix/enhancement and `gemini-3.8-flash-tts` for studio TTS. The Cloudflare Worker uses the currently documented Workers AI model ID `@cf/myshell-ai/melotts` for MP3 TTS.

## Render Manifest
The frontend creates a v2 manifest containing canvas settings, timeline clips, four audio channels and ASS subtitle payloads. Production renderers can consume this manifest without coupling to React state.

```

## `example_bot/README.md`

```md
# Telegram bot adapter

The `handlers/` directory is deliberately flat. Connect it to your Telegram webhook/runtime and persist only user state in Telegram CloudStorage. System SOT stays in Git/config infrastructure.

```

## `example_bot/docs/tgcloud-sdk.md`

```md
# Telegram Cloud App adapter

Keep provider-specific Telegram cloud/runtime bindings behind `handlers/`. The application layer only expects:

- `getUserState(userId, key)`
- `setUserState(userId, key, value)`
- `sendAdminAlert(payload)`

Never store bot tokens or deployment secrets in this directory.

```

## `example_bot/handlers/callback_query.js`

```js
export function handleCallback(data){if(data==='open_sot')return {action:'open-mini-app',url:`${process.env.ADMIN_APP_URL || 'https://example.pages.dev'}?admin=true`};return {action:'noop'};}

```

## `example_bot/handlers/message.js`

```js
import crypto from 'node:crypto';
const TTL=Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60);
export function handleCommand(command){switch(command){case '/start':return 'AI Studio Pro ready.';case '/status':return 'NOMINAL';case '/token':return createToken();default:return 'Commands: /start /status /token';}}
export function createToken(){return crypto.randomBytes(4).toString('hex').toUpperCase();}
if(import.meta.url===`file://${process.argv[1]}`)console.log(handleCommand(process.argv[2] || '/status'),`TTL=${TTL}s`);

```

## `example_bot/handlers/webhook.js`

```js
export function buildIncidentMarkdown({level='critical',message='unknown',sha='unknown'}={}){return [`🚨 *Hendy Video Studio Pro*`,`*Level:* ${level}`,`*Commit:* \`${sha}\``,`*Message:* ${message}`].join('\n');}

```

## `example_bot/package.json`

```json
{"name":"@hendy/example-bot","private":true,"type":"module","scripts":{"dev":"node handlers/message.js"}}

```

## `example_bot/schema.js`

```js
export const incidentsSchema={name:'incidents',fields:{id:'string',created_at:'number',level:'string',message:'string',commit_sha:'string|null'}};

```

## `frontend/.env.example`

```example
VITE_API_BASE_URL=http://127.0.0.1:8787/api/v1
VITE_TELEGRAM_BOT_USERNAME=

```

## `frontend/index.html`

```html
<!doctype html><html lang="vi"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/><title>Hendy Video Studio Pro</title><meta name="theme-color" content="#17171a"/><script src="https://telegram.org/js/telegram-web-app.js"></script></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>
```

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

## `frontend/public/sw.js`

```js
const CACHE='hendy-pro-v2.4.0';
const STATIC=['/','/manifest.json'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return r;}).catch(()=>caches.match(event.request)))});

```

## `frontend/src/App.tsx`

```tsx
import { useMemo, useReducer, useState } from 'react';
import { SYSTEM_CONFIG } from './generated/system-config';
import { SystemLayout } from './generated/system-layout';
import './generated/system-theme.css';
import { SystemControlPanel } from './components/system/SystemControlPanel';
import { PwaInstallBanner } from './components/system/PwaInstallBanner';
import { Header } from './components/system/Header';
import { AssetSidebar } from './components/editor/AssetSidebar';
import { CanvasPreview } from './components/editor/CanvasPreview';
import { Timeline } from './components/editor/Timeline';
import { InspectorPanel } from './components/editor/InspectorPanel';
import { MultiChannelAudioMixer } from './components/editor/MultiChannelAudioMixer';
import { buildRenderManifest } from './services/renderManifest';
import { api } from './services/api';
import { toAss, toSrt, toVtt, downloadText } from './utils/subtitleExporter';
import { exportCanvasVideo } from './utils/videoRenderer';
import { generateGeminiTts, transcribeAudioFile, enhanceVietnamese } from './services/ai';
import type { Clip, Project } from './types/project';

type State={project:Project;selectedId?:string;currentTimeMs:number;theme:'dark'|'light'};
const initial:State={project:{id:crypto.randomUUID(),width:1280,height:720,fps:30,durationMs:60000,clips:[{id:'video-1',track:0,kind:'video',startMs:0,endMs:10000,label:'Main Video'},{id:'bgm-1',track:1,kind:'audio',startMs:0,endMs:10000,label:'BGM'},{id:'sub-1',track:2,kind:'subtitle',startMs:500,endMs:3200,label:'Subtitle',text:'Xin chào từ AI Studio Pro'}]},currentTimeMs:0,theme:'dark'};
function reducer(s:State,a:{type:string;id?:string;patch?:Partial<Clip>;clips?:Clip[];time?:number}):State{
  if(a.type==='select')return{...s,selectedId:a.id}; if(a.type==='seek')return{...s,currentTimeMs:a.time||0}; if(a.type==='theme')return{...s,theme:s.theme==='dark'?'light':'dark'};
  if(a.type==='add')return{...s,project:{...s.project,clips:[...s.project.clips,...(a.clips||[])]}};
  if(a.type==='patch')return{...s,project:{...s.project,clips:s.project.clips.map(c=>c.id===a.id?{...c,...a.patch}:c)}};
  return s;
}

export default function App(){
  const [state,dispatch]=useReducer(reducer,initial); const [status,setStatus]=useState('NOMINAL');
  const params=useMemo(()=>new URLSearchParams(location.search),[]); const admin=params.get('admin')==='true';
  const selected=state.project.clips.find(c=>c.id===state.selectedId);
  const onUpload=(file:File)=>dispatch({type:'add',clips:[{id:crypto.randomUUID(),track:file.type.startsWith('audio')?1:0,kind:file.type.startsWith('audio')?'audio':file.type.startsWith('image')?'video':'video',startMs:0,endMs:5000,label:file.name}]});
  const transcribe=async(file:File)=>{setStatus('TRANSCRIBING…');try{const r=await transcribeAudioFile(file);dispatch({type:'add',clips:r.cues.map((c,i)=>({id:crypto.randomUUID(),track:2,kind:'subtitle' as const,startMs:c.startMs,endMs:c.endMs,label:`STT ${i+1}`,text:c.text}))});setStatus('NOMINAL')}catch{setStatus('STT ERROR')}};
  const generateTts=async(clip:Clip)=>{if(!clip.text)return;setStatus('TTS…');try{const r=await generateGeminiTts(clip.text,{voice:'Kore',style:'natural cinematic Vietnamese narration'});const bytes=Uint8Array.from(atob(r.base64),c=>c.charCodeAt(0));const url=URL.createObjectURL(new Blob([bytes],{type:r.mimeType}));dispatch({type:'add',clips:[{id:crypto.randomUUID(),track:3,kind:'audio',startMs:clip.startMs,endMs:clip.startMs+Math.max(900,clip.endMs-clip.startMs),label:`TTS · ${clip.label}`,assetId:url}]});setStatus('NOMINAL')}catch{setStatus('TTS ERROR')}};
  const enhance=async(clip:Clip)=>{if(!clip.text)return;setStatus('ENHANCING…');try{const r=await enhanceVietnamese(clip.text);dispatch({type:'patch',id:clip.id,patch:{text:r.text}});setStatus('NOMINAL')}catch{setStatus('VI ENHANCE ERROR')}};
  const optimize=async(channels:Record<string,unknown>)=>{setStatus('AI MIX…');try{const r=await api<Record<string,unknown>>('/api/gemini/audio-mix',{method:'POST',body:JSON.stringify({channels:Object.entries(channels).map(([id,v])=>({id,...(v as object)})),voicePresent:true})});setStatus('NOMINAL');return r;}catch{setStatus('AI OFFLINE');}};
  const exportSub=(kind:'srt'|'vtt'|'ass')=>{const cues=state.project.clips.filter(c=>c.kind==='subtitle'&&c.text).map(c=>({startMs:c.startMs,endMs:c.endMs,text:c.text!}));const text=kind==='srt'?toSrt(cues):kind==='vtt'?toVtt(cues):toAss(cues);downloadText(text,`hendy-${state.project.id}.${kind}`,'text/plain;charset=utf-8');};
  const exportVideo=async()=>{const canvas=document.querySelector('canvas');if(!(canvas instanceof HTMLCanvasElement))return;setStatus('RENDERING…');try{const blob=await exportCanvasVideo(canvas,(ctx,timeMs)=>{ctx.fillStyle='#111113';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#777';ctx.font='42px system-ui';ctx.textAlign='center';ctx.fillText(`Hendy Video Studio Pro · ${(timeMs/1000).toFixed(2)}s`,canvas.width/2,80);const sub=state.project.clips.find(c=>c.kind==='subtitle'&&c.startMs<=timeMs&&c.endMs>=timeMs&&c.text);if(sub){const y=canvas.height-55;ctx.font='46px Arial';ctx.lineWidth=7;ctx.strokeStyle='#000';ctx.strokeText(sub.text!,canvas.width/2,y);ctx.fillStyle='#fff';ctx.fillText(sub.text!,canvas.width/2,y)}},state.project.durationMs,state.project.fps); const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='hendy-studio-export.'+(blob.type.includes('mp4')?'mp4':'webm');a.click();URL.revokeObjectURL(url);setStatus('NOMINAL')}catch{setStatus('RENDER ERROR')}};
  return <SystemLayout><div className="stack"><Header version={SYSTEM_CONFIG.system.version} admin={admin} actions={<><button className="button" onClick={()=>dispatch({type:'theme'})}>{state.theme==='dark'?'LIGHT':'DARK'}</button><span className="status">● {status}</span></>}/>{admin&&<SystemControlPanel/>}
    <div className="workspace"><AssetSidebar onUpload={onUpload} onRecord={()=>setStatus('RECORD BLOCKED')} onTranscribe={transcribe}/><div className="stack"><CanvasPreview clips={state.project.clips} currentTimeMs={state.currentTimeMs} onSeek={time=>dispatch({type:'seek',time})}/><Timeline clips={state.project.clips} selectedId={state.selectedId} onSelect={id=>dispatch({type:'select',id})}/></div><div className="stack"><InspectorPanel clip={selected} onChange={patch=>selected&&dispatch({type:'patch',id:selected.id,patch})} onGenerateTts={generateTts} onEnhance={enhance}/><MultiChannelAudioMixer onAiOptimize={optimize}/><section className="panel stack"><strong>Export / Manifest</strong><button className="button primary" onClick={()=>navigator.clipboard?.writeText(JSON.stringify(buildRenderManifest(state.project),null,2))}>Copy Render Manifest</button><div className="row"><button className="button" onClick={()=>exportSub('srt')}>SRT</button><button className="button" onClick={()=>exportSub('vtt')}>VTT</button><button className="button" onClick={()=>exportSub('ass')}>ASS</button></div><button className="button" onClick={exportVideo}>Render Preview</button></section></div></div><PwaInstallBanner/></div></SystemLayout>;
}

```

## `frontend/src/app.css`

```css
*{box-sizing:border-box} body{margin:0;background:var(--dark-background-color);color:var(--text-color);font-family:Inter,system-ui,sans-serif}button,input,textarea{font:inherit}.system-main{max-width:1600px;margin:auto;padding:12px 12px 88px}.stack{display:flex;flex-direction:column;gap:10px}.row{display:flex;align-items:center;gap:8px}.panel{background:var(--dark-container-background-color);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:12px;box-shadow:0 8px 30px rgba(0,0,0,.18)}.muted{opacity:.65;font-size:12px}.button{border:1px solid rgba(255,255,255,.12);background:#2b2b2e;color:inherit;border-radius:10px;padding:8px 11px;cursor:pointer}.button.primary{background:var(--accent-color);color:#111;border-color:transparent}.status{font-size:12px;opacity:.8}.workspace{display:grid;grid-template-columns:240px minmax(360px,1fr) 360px;gap:10px;align-items:start}.track{position:relative;height:42px;margin-top:24px;background:#17171a;border-radius:8px}.clip{position:absolute;top:4px;height:34px;border:1px solid rgba(255,255,255,.12);background:#3b3b40;color:#fff;border-radius:7px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:7px;text-align:left;cursor:pointer}.clip.selected{outline:2px solid var(--accent-color)}.meter{height:5px;background:#111;border-radius:999px;overflow:hidden}.meter span{display:block;height:100%;background:var(--accent-color)}label{display:flex;flex-direction:column;gap:5px;font-size:12px}input,textarea{background:#17171a;color:inherit;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px}textarea{min-height:80px;resize:vertical}.dragging{outline:2px dashed var(--accent-color)}.bottom-action-dock{position:fixed;bottom:10px;left:50%;transform:translateX(-50%);display:flex;gap:6px;background:#232324e8;border:1px solid rgba(255,255,255,.08);padding:6px;border-radius:14px;backdrop-filter:blur(12px)}.bottom-action-dock button{background:transparent;color:#fff;border:0;padding:9px 14px}
@media(max-width:1100px){.workspace{grid-template-columns:200px minmax(0,1fr)}.workspace>.stack:last-child{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr}}@media(max-width:760px){.workspace{grid-template-columns:1fr}.workspace>.stack:last-child{grid-template-columns:1fr}.system-main{padding:8px 8px 90px}.bottom-action-dock{width:calc(100% - 16px);justify-content:space-around}.bottom-action-dock button{flex:1}}

```

## `frontend/src/components/editor/AssetSidebar.tsx`

```tsx
import { useRef, useState } from 'react';

export function AssetSidebar({onUpload,onRecord,onTranscribe}:{onUpload:(file:File)=>void;onRecord?:()=>void;onTranscribe?:(file:File)=>void}){
  const ref=useRef<HTMLInputElement>(null); const [drag,setDrag]=useState(false); const [recording,setRecording]=useState(false); const recorder=useRef<MediaRecorder>(); const chunks=useRef<BlobPart[]>([]); const lastAudio=useRef<File>();
  const importFile=(file:File)=>{lastAudio.current=file.type.startsWith('audio/')?file:lastAudio.current;onUpload(file)};
  const startRecord=async()=>{
    if(recording)return;
    if(!navigator.mediaDevices?.getUserMedia){onRecord?.();return;}
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    const media=new MediaRecorder(stream); recorder.current=media; chunks.current=[];
    media.ondataavailable=e=>e.data.size&&chunks.current.push(e.data);
    media.onstop=()=>{const blob=new Blob(chunks.current,{type:media.mimeType||'audio/webm'});const file=new File([blob],`recording-${Date.now()}.webm`,{type:blob.type});stream.getTracks().forEach(t=>t.stop());setRecording(false);importFile(file)};
    media.start();setRecording(true);
  };
  const stopRecord=()=>recorder.current?.state==='recording'&&recorder.current.stop();
  return <section className={`panel stack ${drag?'dragging':''}`} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f)importFile(f)}}>
    <strong>Assets</strong><button className="button primary" onClick={()=>ref.current?.click()}>Import Media</button>
    <button className="button" onClick={recording?stopRecord:startRecord}>{recording?'■ Stop Recording':'● Record Mic'}</button>
    <button className="button" disabled={!lastAudio.current} onClick={()=>lastAudio.current&&onTranscribe?.(lastAudio.current)}>🧠 Transcribe Latest Audio</button>
    <input ref={ref} hidden type="file" accept="video/*,audio/*,image/*" onChange={e=>{const f=e.target.files?.[0];if(f)importFile(f)}}/>
    <div className="muted">Kéo video/audio/ảnh vào đây. Audio mới nhất có thể chạy Speech-to-Text và đưa cue lên Timeline.</div>
  </section>;
}

```

## `frontend/src/components/editor/AudioMixer.tsx`

```tsx
export { MultiChannelAudioMixer as AudioMixer } from './MultiChannelAudioMixer';

```

## `frontend/src/components/editor/CanvasPreview.tsx`

```tsx
import { useEffect, useRef } from 'react';
import type { Clip } from '../../types/project';
import { drawSubtitle } from '../../utils/subBurner';
export function CanvasPreview({clips,currentTimeMs,onSeek}:{clips:Clip[];currentTimeMs:number;onSeek?:(ms:number)=>void}){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{const c=ref.current;if(!c)return;c.width=1280;c.height=720;const ctx=c.getContext('2d')!;ctx.fillStyle='#111113';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#777';ctx.font='42px system-ui';ctx.textAlign='center';ctx.fillText(`Preview · ${(currentTimeMs/1000).toFixed(2)}s`,c.width/2,80);const subs=clips.filter(x=>x.kind==='subtitle'&&x.startMs<=currentTimeMs&&x.endMs>=currentTimeMs&&x.text);if(subs[0])drawSubtitle(ctx,subs[0].text!,{fontFamily:'Arial',fontSize:46,color:'#fff',strokeColor:'#000',strokeWidth:7,bottomPx:55},c.width,c.height)},[clips,currentTimeMs]);
  const duration=Math.max(...clips.map(c=>c.endMs),60000);
  return <section className="panel"><div className="row" style={{justifyContent:'space-between'}}><strong>Canvas Preview</strong><span className="muted">1280×720 · PiP ready · {Math.round(duration/1000)}s</span></div><canvas ref={ref} onClick={e=>{const r=e.currentTarget.getBoundingClientRect();onSeek?.((e.clientX-r.left)/r.width*duration)}} style={{display:'block',width:'100%',borderRadius:12,marginTop:10,cursor:'crosshair'}}/></section>;
}

```

## `frontend/src/components/editor/InspectorPanel.tsx`

```tsx
import { useEffect, useState } from 'react';
import type { Clip } from '../../types/project';
export function InspectorPanel({ clip, onChange, onGenerateTts, onEnhance }:{clip?:Clip;onChange?:(patch:Partial<Clip>)=>void;onGenerateTts?:(clip:Clip)=>Promise<void>;onEnhance?:(clip:Clip)=>Promise<void>}) {
  const [text,setText]=useState(clip?.text || ''); const [busy,setBusy]=useState(false);
  useEffect(()=>setText(clip?.text || ''),[clip?.id,clip?.text]);
  if (!clip) return <section className="panel stack"><strong>Inspector</strong><span className="muted">Chọn clip trên Timeline để chỉnh.</span></section>;
  const run=async(fn?: (clip:Clip)=>Promise<void>)=>{if(!fn)return;setBusy(true);try{await fn(clip)}finally{setBusy(false)}};
  return <section className="panel stack"><div className="row" style={{justifyContent:'space-between'}}><strong>Inspector</strong><span className="muted">{clip.kind}</span></div>
    <label>Label<input value={clip.label} onChange={e=>onChange?.({label:e.target.value})}/></label>
    <label>Start (ms)<input type="number" value={clip.startMs} onChange={e=>onChange?.({startMs:Number(e.target.value)})}/></label>
    <label>End (ms)<input type="number" value={clip.endMs} onChange={e=>onChange?.({endMs:Number(e.target.value)})}/></label>
    {clip.kind==='subtitle' && <><label>Subtitle<textarea value={text} onChange={e=>{setText(e.target.value);onChange?.({text:e.target.value})}} /></label><div className="row"><button className="button" disabled={busy} onClick={()=>run(onEnhance)}>✨ Enhance VI</button><button className="button primary" disabled={busy} onClick={()=>run(onGenerateTts)}>🔊 Generate TTS</button></div></>}
  </section>;
}

```

## `frontend/src/components/editor/MultiChannelAudioMixer.tsx`

```tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { AudioEngine, type ChannelId } from '../../utils/audioEngine';
import { SYSTEM_CONFIG } from '../../generated/system-config';

type Channel={gain:number;muted:boolean;ducking:boolean};
const CHANNELS:ChannelId[]=['video','bgm','tts','master'];
export function MultiChannelAudioMixer({onAiOptimize}:{onAiOptimize?:(channels:Record<ChannelId,Channel>)=>Promise<Record<string,unknown>|void>}){
  const [channels,setChannels]=useState<Record<ChannelId,Channel>>({video:{gain:1,muted:false,ducking:false},bgm:{gain:.8,muted:false,ducking:true},tts:{gain:1,muted:false,ducking:false},master:{gain:1,muted:false,ducking:false}});
  const [ducking,setDucking]=useState(true); const [running,setRunning]=useState(false); const engine=useRef<AudioEngine>(); const [,force]=useState(0);
  const start=async()=>{if(!engine.current) engine.current=new AudioEngine(); await engine.current.resume(); setRunning(true);};
  useEffect(()=>()=>engine.current?.close(),[]);
  useEffect(()=>{CHANNELS.forEach(k=>engine.current?.setGain(k,channels[k].gain,channels[k].muted)); engine.current?.setDucking(ducking,SYSTEM_CONFIG.editor.duckingGain);},[channels,ducking]);
  useEffect(()=>{if(!running)return;const id=window.setInterval(()=>force(v=>v+1),150);return()=>clearInterval(id)},[running]);
  const labels=useMemo(()=>CHANNELS,[ ]);
  return <section className="panel stack"><div className="row" style={{justifyContent:'space-between'}}><strong>Multi-Channel Audio</strong><div className="row"><button className="button" onClick={start}>{running?'Audio ON':'Start Audio'}</button><button className="button" onClick={()=>setDucking(v=>!v)}>{ducking?'Ducking 20%':'Ducking OFF'}</button></div></div>
    {labels.map(k=><div key={k} className="stack"><div className="row"><strong style={{width:64}}>{k.toUpperCase()}</strong><input style={{flex:1}} type="range" min="0" max="1.5" step="0.01" value={channels[k].gain} onChange={e=>setChannels(s=>({...s,[k]:{...s[k],gain:Number(e.target.value)}}))}/><span>{channels[k].gain.toFixed(2)}</span><button className="button" onClick={()=>setChannels(s=>({...s,[k]:{...s[k],muted:!s[k].muted}}))}>{channels[k].muted?'MUTED':'MUTE'}</button></div><div className="meter"><span style={{width:`${Math.round((engine.current?.meter(k)||0)*100)}%`}}/></div></div>)}
    <button className="button primary" disabled={!running} onClick={async()=>{const result=await onAiOptimize?.(channels); if(result) console.info('AI mix recommendation',result)}}>✨ AI Optimize Mix</button>
  </section>;
}

```

## `frontend/src/components/editor/Timeline.tsx`

```tsx
import type { Clip } from '../../types/project';
export function Timeline({clips,selectedId,onSelect}:{clips:Clip[];selectedId?:string;onSelect?:(id:string)=>void}){
  const duration=Math.max(...clips.map(c=>c.endMs),60000);
  const tracks=[0,1,2,3];
  return <section className="panel timeline"><div className="row" style={{justifyContent:'space-between'}}><strong>Timeline</strong><span className="muted">{Math.round(duration/1000)}s · 4 tracks</span></div>
    {tracks.map(track=><div className="track" key={track}><span className="muted" style={{position:'absolute',left:0,top:-16,fontSize:11}}>T{track+1}</span>{clips.filter(c=>c.track===track).map(c=><button key={c.id} className={`clip ${selectedId===c.id?'selected':''}`} onClick={()=>onSelect?.(c.id)} style={{left:`${c.startMs/duration*100}%`,width:`${Math.max(1,(c.endMs-c.startMs)/duration*100)}%`}}>{c.label}</button>)}</div>)}
  </section>;
}

```

## `frontend/src/components/system/Header.tsx`

```tsx
import type { ReactNode } from 'react';
export function Header({version, admin, actions}:{version:string;admin:boolean;actions?:ReactNode}) {
  return <header className="panel row" style={{justifyContent:'space-between',position:'sticky',top:8,zIndex:10}}>
    <div><strong>🎬 Hendy Video Studio Pro</strong><div className="muted">v{version} · {admin ? 'ADMIN' : 'EDITOR'} · React 19</div></div>
    <div className="row">{actions}</div>
  </header>;
}

```

## `frontend/src/components/system/PwaInstallBanner.tsx`

```tsx
import {useEffect,useState} from 'react';
export function PwaInstallBanner(){const [prompt,setPrompt]=useState<any>(null);useEffect(()=>{const h=(e:any)=>{e.preventDefault();setPrompt(e)};window.addEventListener('beforeinstallprompt',h);return()=>window.removeEventListener('beforeinstallprompt',h)},[]);if(!prompt)return null;return <div className="panel row" style={{position:'fixed',right:12,bottom:76,zIndex:20}}><span>Install App</span><button className="button primary" onClick={async()=>{await prompt.prompt();setPrompt(null)}}>Cài đặt</button></div>}

```

## `frontend/src/components/system/SystemControlPanel.tsx`

```tsx
import {useState} from 'react';
import {verifyTelegram} from '../../services/telegram';
export function SystemControlPanel(){const [status,setStatus]=useState('LOCKED');const [msg,setMsg]=useState('');const [otp,setOtp]=useState('');async function login(){try{const r=await verifyTelegram();setStatus(r.ok&&['admin','maintainer'].includes(r.user?.role)?'TELEGRAM VERIFIED':'USER VERIFIED')}catch(e){setMsg(e instanceof Error?e.message:'Login failed')}}async function verify(){const base=import.meta.env.VITE_API_BASE_URL||'http://127.0.0.1:8787/api/v1';const r=await fetch(`${base}/auth/mcp/otp/verify`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({scope:'admin',otp})});const j=await r.json();setStatus(j.ok?'MAINTENANCE':'OTP INVALID')}return <section className="panel stack"><div className="row"><strong>System Control</strong><span className="muted">{status}</span></div><div className="row"><button className="button" onClick={login}>Telegram Verify</button><input placeholder="OTP 60s" value={otp} onChange={e=>setOtp(e.target.value)} /><button className="button primary" onClick={verify}>Verify OTP</button></div>{msg&&<div className="muted">{msg}</div>}</section>}

```

## `frontend/src/generated/system-config.ts`

```ts
export const SYSTEM_CONFIG = {
  "system": {
    "name": "Hendy Video Studio Pro",
    "version": "2.4.0",
    "environment": "production"
  },
  "toolchain": {
    "workersTypes": "5.20260926.1",
    "wrangler": "4.137.0"
  },
  "network": {
    "sandboxPort": 8799,
    "backendPort": 8787,
    "frontendPort": 5173,
    "apiBasePath": "/api/v1",
    "mcpPath": "/mcp",
    "workerPort": 8788
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
      "translation": "gemini-3.8-flash",
      "ocr": "gemini-3.8-flash",
      "stt": "gemini-3.8-flash",
      "tts": "gemini-3.8-flash-tts",
      "ttsLite": "gemini-3.8-flash-lite-tts",
      "storyboard": "gemini-3.8-flash",
      "audioMix": "gemini-3.8-flash",
      "vietnamese": "gemini-3.8-flash"
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
    "transitionGapSeconds": 1.5,
    "defaultWidth": 1280,
    "defaultHeight": 720,
    "defaultFps": 30,
    "defaultSubtitleStyle": {
      "fontFamily": "Arial",
      "fontSize": 46,
      "color": "#ffffff",
      "strokeColor": "#000000",
      "strokeWidth": 6,
      "bottomPx": 52
    }
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
    "worker/wrangler.jsonc",
    "worker/package.json",
    "frontend/src/components/system/Header.tsx",
    "frontend/src/components/editor/InspectorPanel.tsx",
    "frontend/src/components/editor/MultiChannelAudioMixer.tsx"
  ],
  "cloudflareAI": {
    "ttsModel": "@cf/myshell-ai/melotts",
    "workerPath": "/api/ai/tts"
  }
} as const;

```

## `frontend/src/generated/system-env.ts`

```ts
export type RuntimeEnv = { API_BASE_URL?: string; TELEGRAM_BOT_USERNAME?: string };
export const runtimeEnv: RuntimeEnv = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TELEGRAM_BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME
};

```

## `frontend/src/generated/system-layout.tsx`

```tsx
import type { ReactNode } from 'react';
export function SystemLayout({children}:{children:ReactNode}) {
  return <div className="system-layout"><main className="system-main">{children}</main><nav className="bottom-action-dock" aria-label="Editor actions"><button>Timeline</button><button>Assets</button><button>Audio</button><button>Export</button></nav></div>;
}

```

## `frontend/src/generated/system-theme.css`

```css
:root {
  --dark-background-color: #17171a;
  --dark-container-background-color: #232324;
  --accent-color: #ff8a00;
  --text-color: #f5f5f5;
}

```

## `frontend/src/main.tsx`

```tsx
import {StrictMode} from 'react';import {createRoot} from 'react-dom/client';import App from './App';
import './app.css';
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(console.error));

```

## `frontend/src/services/ai.ts`

```ts
import { api } from './api';

export async function generateGeminiTts(text:string, opts:{voice?:string;style?:string}={}) {
  return api<{model:string;mimeType:string;base64:string;bytes:number}>('/api/gemini/tts', {
    method:'POST', body:JSON.stringify({text,...opts})
  });
}

export async function transcribeAudioFile(file:File) {
  const form = new FormData();
  form.set('audio', file);
  return api<{cues:Array<{startMs:number;endMs:number;text:string}>}>('/api/gemini/transcribe', {
    method:'POST', body:form
  });
}

export async function enhanceVietnamese(text:string) {
  return api<{text:string;alternatives:string[]}>('/api/gemini/enhance-vietnamese', {
    method:'POST', body:JSON.stringify({text})
  });
}

export async function createStoryboard(script:string) {
  return api<Record<string,unknown>>('/api/gemini/create-video', {method:'POST',body:JSON.stringify({script})});
}

export async function optimizeAudioMix(channels:Array<Record<string,unknown>>) {
  return api<Record<string,unknown>>('/api/gemini/audio-mix', {method:'POST',body:JSON.stringify({channels,voicePresent:true})});
}

```

## `frontend/src/services/api.ts`

```ts
import {runtimeEnv} from '../generated/system-env';
export async function api<T>(path:string, init:RequestInit={}):Promise<T>{
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData) && !headers.has('content-type')) headers.set('content-type','application/json');
  const r=await fetch(`${runtimeEnv.API_BASE_URL || ''}${path}`,{...init,headers});
  if(!r.ok)throw new Error(await r.text());
  return r.json();
}

```

## `frontend/src/services/renderManifest.ts`

```ts
import type { Clip, Project } from '../types/project';
export type RenderManifest={version:2;projectId:string;canvas:{width:number;height:number;fps:number};clips:Clip[];audio:Array<{id:string;type:'video'|'bgm'|'tts'|'master';gain:number;muted?:boolean;ducking?:boolean}>;subtitle:{format:'ass'|'srt'|'vtt';items:Clip[]};output:{container:'mp4'|'webm';videoCodec:string;audioCodec:string}};
export function buildRenderManifest(project:Project):RenderManifest{return{version:2,projectId:project.id,canvas:{width:project.width,height:project.height,fps:project.fps},clips:project.clips,audio:[{id:'video',type:'video',gain:1},{id:'bgm',type:'bgm',gain:.8,ducking:true},{id:'tts',type:'tts',gain:1},{id:'master',type:'master',gain:1}],subtitle:{format:'ass',items:project.clips.filter(c=>c.kind==='subtitle')},output:{container:'mp4',videoCodec:'h264',audioCodec:'aac'}}}

```

## `frontend/src/services/telegram.ts`

```ts
export function telegramWebApp(){return window.Telegram?.WebApp || null;}
export function initTelegram(){const tg=telegramWebApp();tg?.ready();tg?.expand();return tg;}
export async function verifyTelegram(){const tg=telegramWebApp();if(!tg?.initData)throw new Error('Telegram initData unavailable');return fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8787/api/v1'}/auth/telegram/verify`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({initData:tg.initData})}).then(r=>r.json());}

```

## `frontend/src/types/project.ts`

```ts
export type Clip={id:string;track:number;kind:'video'|'audio'|'subtitle'|'transition';startMs:number;endMs:number;label:string;assetId?:string;text?:string};
export type Project={id:string;width:number;height:number;fps:number;durationMs:number;clips:Clip[]};

```

## `frontend/src/utils/appDownloader.ts`

```ts
export type BinaryTarget = 'android' | 'windows' | 'macos' | 'ios';
const candidates: Record<BinaryTarget,string> = {
  android: '/tai-app?platform=android',
  windows: '/tai-app?platform=windows',
  macos: '/tai-app?platform=macos',
  ios: '/tai-app?platform=ios'
};
export function openNativeDownload(target: BinaryTarget) { window.location.assign(candidates[target]); }

```

## `frontend/src/utils/audioEngine.ts`

```ts
export type ChannelId = 'video' | 'bgm' | 'tts' | 'master';
export type ChannelConfig = { gain: number; muted: boolean; ducking: boolean };

export class AudioEngine {
  readonly context: AudioContext;
  readonly input: Record<ChannelId, GainNode>;
  readonly ducking: DynamicsCompressorNode;
  private analyser: AnalyserNode;

  constructor() {
    this.context = new AudioContext();
    const master = this.context.createGain();
    const limiter = this.context.createDynamicsCompressor();
    limiter.threshold.value = -2;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.08;
    this.ducking = this.context.createDynamicsCompressor();
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 1024;
    master.connect(limiter).connect(this.analyser).connect(this.context.destination);
    this.input = {
      video: this.node('video', master), bgm: this.node('bgm', master), tts: this.node('tts', master), master
    } as Record<ChannelId, GainNode>;
  }

  private node(_id: string, destination: AudioNode) {
    const gain = this.context.createGain();
    gain.connect(destination);
    return gain;
  }

  setGain(id: ChannelId, gain: number, muted = false) {
    const node = this.input[id];
    node.gain.setTargetAtTime(muted ? 0 : gain, this.context.currentTime, 0.03);
  }

  setDucking(enabled: boolean, gain = 0.2) {
    const bgm = this.input.bgm;
    bgm.gain.setTargetAtTime(enabled ? gain : bgm.gain.value, this.context.currentTime, 0.08);
  }

  meter(id: ChannelId): number {
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / Math.max(1, data.length);
    return Math.min(1, avg / 128);
  }

  async resume() { if (this.context.state !== 'running') await this.context.resume(); }
  close() { void this.context.close(); }
}

```

## `frontend/src/utils/frameInjector.ts`

```ts
import type {Clip} from '../types/project';
export function injectTransitionFrames(clips:Clip[],gapSeconds=1.5):Clip[]{const sorted=[...clips].sort((a,b)=>a.startMs-b.startMs);const out:Clip[]=[];for(let i=0;i<sorted.length;i++){const cur=sorted[i];out.push(cur);const next=sorted[i+1];if(next&&cur.endMs<next.startMs && (next.startMs-cur.endMs)/1000>=gapSeconds){out.push({id:`transition-${cur.id}-${next.id}`,track:cur.track,kind:'transition',startMs:cur.endMs,endMs:next.startMs,label:'Transition'});}}return out;}

```

## `frontend/src/utils/subBurner.ts`

```ts
export type SubtitleStyle={fontFamily:string;fontSize:number;color:string;strokeColor:string;strokeWidth:number;bottomPx:number};
export function drawSubtitle(ctx:CanvasRenderingContext2D,text:string,style:SubtitleStyle,width:number,height:number){ctx.save();ctx.font=`600 ${style.fontSize}px ${style.fontFamily}`;ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.lineJoin='round';ctx.lineWidth=style.strokeWidth;ctx.strokeStyle=style.strokeColor;ctx.fillStyle=style.color;ctx.strokeText(text,width/2,height-style.bottomPx);ctx.fillText(text,width/2,height-style.bottomPx);ctx.restore();}
export function supportedMimeType(){const candidates=['video/mp4;codecs=avc1.64003E,mp4a.40.2','video/mp4','video/webm;codecs=vp9,opus','video/webm'];return candidates.find((x)=>typeof MediaRecorder!=='undefined'&&MediaRecorder.isTypeSupported(x)) || '';}
export function captureCanvas(canvas:HTMLCanvasElement,fps=30){const mimeType=supportedMimeType();if(!mimeType)throw new Error('No supported MediaRecorder codec');const stream=canvas.captureStream(fps);return new MediaRecorder(stream,{mimeType});}

```

## `frontend/src/utils/subtitleExporter.ts`

```ts
export type SubtitleCue = { startMs: number; endMs: number; text: string };
const time = (ms: number) => {
  const h = Math.floor(ms / 3600000); const m = Math.floor((ms % 3600000) / 60000); const s = Math.floor((ms % 60000) / 1000); const x = ms % 1000;
  return { h, m, s, x };
};
const srtTime = (ms: number) => { const t = time(ms); return `${String(t.h).padStart(2,'0')}:${String(t.m).padStart(2,'0')}:${String(t.s).padStart(2,'0')},${String(t.x).padStart(3,'0')}`; };
const vttTime = (ms: number) => srtTime(ms).replace(',', '.');
const assTime = (ms: number) => { const t = time(ms); return `${t.h}:${String(t.m).padStart(2,'0')}:${String(t.s).padStart(2,'0')}.${String(Math.floor(t.x/10)).padStart(2,'0')}`; };

export function toSrt(cues: SubtitleCue[]) { return cues.map((c,i)=>`${i+1}\n${srtTime(c.startMs)} --> ${srtTime(c.endMs)}\n${c.text}\n`).join('\n'); }
export function toVtt(cues: SubtitleCue[]) { return `WEBVTT\n\n${cues.map(c=>`${vttTime(c.startMs)} --> ${vttTime(c.endMs)}\n${c.text}\n`).join('\n')}`; }
export function toAss(cues: SubtitleCue[]) { return `[Script Info]\nTitle: Hendy Video Studio Pro\nScriptType: v4.00+\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BorderStyle, Outline, Shadow, Alignment, MarginV\nStyle: Default,Arial,46,&H00FFFFFF,&H00000000,1,3,0,2,52\n\n[Events]\nFormat: Layer, Start, End, Style, Text\n${cues.map(c=>`Dialogue: 0,${assTime(c.startMs)},${assTime(c.endMs)},Default,${c.text.replace(/\n/g,'\\N')}`).join('\n')}\n`; }
export function downloadText(text: string, fileName: string, mime = 'text/plain;charset=utf-8') { const blob = new Blob([text], { type: mime }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = fileName; a.click(); URL.revokeObjectURL(url); }

```

## `frontend/src/utils/undoEngine.ts`

```ts
const DB='hendy-studio';
const STORE='snapshots';
function openDb():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE,{keyPath:'id',autoIncrement:true});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function pushSnapshot(projectId:string,payload:unknown){const db=await openDb();return new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).add({projectId,payload,createdAt:Date.now()});tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}
export async function popLatest(projectId:string){const db=await openDb();return new Promise<unknown>((resolve,reject)=>{const tx=db.transaction(STORE,'readonly');const r=tx.objectStore(STORE).getAll();r.onsuccess=()=>{const rows=r.result.filter((x:any)=>x.projectId===projectId).sort((a:any,b:any)=>b.createdAt-a.createdAt);resolve(rows[0]?.payload ?? null)};r.onerror=()=>reject(r.error);});}

```

## `frontend/src/utils/videoRenderer.ts`

```ts
export type RenderFrame = (ctx: CanvasRenderingContext2D, timeMs: number) => void;

export function createCanvasStream(canvas: HTMLCanvasElement, fps = 30) {
  return canvas.captureStream(fps);
}

export function exportCanvasVideo(canvas: HTMLCanvasElement, renderFrame: RenderFrame, durationMs: number, fps = 30): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const stream = createCanvasStream(canvas, fps);
    const preferred = [
      'video/mp4;codecs=avc1.64003E',
      'video/mp4',
      'video/webm;codecs=vp9,opus',
      'video/webm'
    ].find((type) => MediaRecorder.isTypeSupported(type));
    if (!preferred) return reject(new Error('No supported MediaRecorder video codec in this browser'));
    const chunks: BlobPart[] = [];
    const recorder = new MediaRecorder(stream, { mimeType: preferred, videoBitsPerSecond: 8_000_000 });
    const started = performance.now();
    recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
    recorder.onerror = () => reject(recorder.error || new Error('MediaRecorder failed'));
    recorder.onstop = () => resolve(new Blob(chunks, { type: preferred }));
    recorder.start(200);
    const tick = (now: number) => {
      const elapsed = now - started;
      renderFrame(canvas.getContext('2d')!, Math.min(durationMs, elapsed));
      if (elapsed >= durationMs) recorder.stop(); else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

```

## `frontend/src/vite-env.d.ts`

```ts
/// <reference types="vite/client" />
declare global { interface Window { Telegram?: { WebApp?: any } } }
export {};

```

## `frontend/tsconfig.json`

```json
{"compilerOptions":{"target":"ES2022","useDefineForClassFields":true,"lib":["DOM","DOM.Iterable","ES2022"],"allowJs":false,"skipLibCheck":true,"esModuleInterop":true,"allowSyntheticDefaultImports":true,"strict":true,"module":"ESNext","moduleResolution":"Bundler","resolveJsonModule":true,"isolatedModules":true,"noEmit":true,"jsx":"react-jsx"},"include":["src"]}

```

## `frontend/vite.config.ts`

```ts
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],server:{port:5173,host:'127.0.0.1'}});

```

## `mcp/cloudflare/.env.example`

```example
MCP_PORT=8788
MCP_SHARED_SECRET=
SANDBOX_PORT=8799
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
GITHUB_REPOSITORY=

GEMINI_TTS_MODEL=gemini-3.8-flash-tts
GEMINI_TTS_VOICE=Kore
CLOUDFLARE_AI_TTS_URL=http://localhost:8788/api/ai/tts
GEMINI_AUDIO_MIX_MODEL=gemini-3.8-flash
GEMINI_STORYBOARD_MODEL=gemini-3.8-flash
GEMINI_VIETNAMESE_MODEL=gemini-3.8-flash

```

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

## `mcp/cloudflare/src/index.ts`

```ts
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

## `mcp/cloudflare/src/policies/allowlist.ts`

```ts
export const ALLOWED_TOOLS = ['config.validate','sandbox.dryRun','github.getBuildStatus','cloudflare.getDeployment','cloudflare.deployRelease','cloudflare.rollbackRelease','observability.getErrors'] as const;
export type AllowedTool=typeof ALLOWED_TOOLS[number];

```

## `mcp/cloudflare/src/tools/cloudflare.ts`

```ts
export function cloudflareStatus(){return {configured:Boolean(process.env.CLOUDFLARE_API_TOKEN),accountIdPresent:Boolean(process.env.CLOUDFLARE_ACCOUNT_ID)};}
export function deployRelease(){return {accepted:false,reason:'Release deployment must be executed by verified CI/CD gate.'};}
export function rollbackRelease(){return {accepted:false,reason:'Rollback must be executed by explicit operator action or audited workflow.'};}

```

## `mcp/cloudflare/src/tools/config.ts`

```ts
import fs from 'node:fs/promises';
import path from 'node:path';
export async function validateConfig() {
  const file=path.resolve(process.cwd(),'system-config/system.config.json');
  const text=await fs.readFile(file,'utf8');
  const json=JSON.parse(text);
  return {ok:Boolean(json.system?.version),version:json.system?.version};
}

```

## `mcp/cloudflare/src/tools/github.ts`

```ts
export function githubBuildStatus(){return {repository:process.env.GITHUB_REPOSITORY || null,status:'unknown',note:'Connect GitHub API to read audited workflow status.'};}

```

## `mcp/cloudflare/src/tools/observability.ts`

```ts
export function observabilityErrors(){return {errors:[],source:'configured-observability-provider'};}

```

## `mcp/cloudflare/src/tools/sandbox.ts`

```ts
export async function sandboxDryRun(job='config-validate') {
  return {ok:true,job,mode:'delegated-to-local-sandbox',endpoint:`ws://127.0.0.1:${process.env.SANDBOX_PORT || 8799}`};
}

```

## `mcp/cloudflare/tsconfig.json`

```json
{"compilerOptions":{"target":"ES2022","module":"NodeNext","moduleResolution":"NodeNext","strict":true,"outDir":"dist","skipLibCheck":true,"types":["node"]},"include":["src/**/*.ts"]}

```

## `package.json`

```json
{
  "name": "hendy-video-studio-pro",
  "private": true,
  "version": "2.4.0",
  "workspaces": [
    "system-config",
    "backend",
    "worker",
    "frontend",
    "example_bot",
    "mcp/cloudflare"
  ],
  "scripts": {
    "config:validate": "node system-config/scripts/validate-config.mjs",
    "config:sync": "node system-config/scripts/sync-config.mjs",
    "sandbox": "node system-config/sandbox/server.mjs",
    "dev": "npm run config:sync && npm --workspace frontend run dev",
    "build": "npm run config:validate && npm run config:sync && npm --workspace frontend run build && npm --workspace backend run build && npm --workspace worker run build",
    "typecheck": "npm --workspace backend run typecheck && npm --workspace worker run typecheck && npm --workspace frontend run typecheck && npm --workspace mcp/cloudflare run typecheck",
    "mcp": "npm --workspace mcp/cloudflare run dev",
    "editor:check": "npm --workspace frontend run typecheck",
    "backend:check": "npm --workspace backend run typecheck",
    "worker:check": "npm --workspace worker run typecheck",
    "release:gate": "npm run config:validate && npm run config:sync && npm run typecheck && npm run build",
    "source:export": "node system-config/scripts/export-source-md.mjs"
  },
  "engines": {
    "node": ">=22 <25",
    "bun": ">=1.2.15"
  },
  "packageManager": "bun@1.2.15"
}

```

## `shared/constants/limits.ts`

```ts
export const LIMITS={maxProjectDurationMs:60*60*1000,maxUploadBytes:512*1024*1024,maxUndoSnapshots:100} as const;

```

## `shared/types/config.ts`

```ts
export type SystemConfig={system:{name:string;version:string;environment:string};network:Record<string,number|string>;features:Record<string,boolean>;ai:{provider:string;models:Record<string,string>;temperature:number};storage:Record<string,unknown>;editor:{audioChannels:string[];duckingGain:number;transitionGapSeconds:number};theme:Record<string,string>;managedFiles:string[]};

```

## `shared/types/media.ts`

```ts
export type Asset={id:string;name:string;mimeType:string;size:number;durationMs?:number;r2Key?:string;url?:string;metadata?:Record<string,unknown>};

```

## `shared/types/render.ts`

```ts
export type AudioTrack={id:string;type:'video'|'bgm'|'tts'|'master';assetId?:string;gain:number;muted?:boolean;ducking?:boolean};
export type RenderManifest={version:1;projectId:string;canvas:{width:number;height:number;fps:number};clips:unknown[];audio:AudioTrack[];subtitle:{format:'ass'|'text';items:unknown[]};output:{container:'mp4'|'webm';videoCodec:string;audioCodec:string}};

```

## `shared/types/timeline.ts`

```ts
export type MediaKind='video'|'image'|'audio'|'subtitle'|'transition';
export type TimelineClip={id:string;kind:MediaKind;startMs:number;endMs:number;assetId?:string;text?:string;style?:Record<string,unknown>;transform?:{x:number;y:number;scale:number;rotation:number;crop?:{x:number;y:number;width:number;height:number}};keyframes?:Array<{timeMs:number;x?:number;y?:number;scale?:number;rotation?:number}>};
export type TimelineProject={id:string;width:number;height:number;fps:number;durationMs:number;clips:TimelineClip[]};

```

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

## `system-config/sandbox/dryRun.mjs`

```mjs
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

## `system-config/sandbox/policy.mjs`

```mjs
export const ALLOWED_JOBS = new Set(['config-validate', 'frontend-build', 'backend-typecheck', 'worker-typecheck']);
export const MAX_PAYLOAD_BYTES = 64 * 1024;

```

## `system-config/sandbox/server.mjs`

```mjs
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

## `system-config/schema/system-config.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://hendy-video-studio.local/schema/system-config.schema.json",
  "type": "object",
  "required": [
    "system",
    "toolchain",
    "network",
    "features",
    "ai",
    "storage",
    "editor",
    "theme",
    "managedFiles",
    "cloudflareAI"
  ],
  "properties": {
    "system": {
      "type": "object",
      "required": [
        "name",
        "version",
        "environment"
      ],
      "properties": {
        "name": {
          "type": "string",
          "minLength": 1
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+\\.\\d+$"
        },
        "environment": {
          "enum": [
            "development",
            "staging",
            "production"
          ]
        }
      },
      "additionalProperties": false
    },
    "toolchain": {
      "type": "object",
      "required": [
        "workersTypes",
        "wrangler"
      ],
      "properties": {
        "workersTypes": {
          "type": "string",
          "pattern": "^\\d+\\.\\d{8}\\.\\d+$"
        },
        "wrangler": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+\\.\\d+$"
        }
      },
      "additionalProperties": false
    },
    "network": {
      "type": "object",
      "required": [
        "sandboxPort",
        "backendPort",
        "frontendPort",
        "apiBasePath",
        "mcpPath",
        "workerPort"
      ],
      "properties": {
        "sandboxPort": {
          "type": "integer",
          "minimum": 1024,
          "maximum": 65535
        },
        "backendPort": {
          "type": "integer",
          "minimum": 1024,
          "maximum": 65535
        },
        "frontendPort": {
          "type": "integer",
          "minimum": 1024,
          "maximum": 65535
        },
        "apiBasePath": {
          "type": "string",
          "pattern": "^/"
        },
        "mcpPath": {
          "type": "string",
          "pattern": "^/"
        },
        "workerPort": {
          "type": "integer",
          "minimum": 1024,
          "maximum": 65535
        }
      },
      "additionalProperties": false
    },
    "features": {
      "type": "object",
      "additionalProperties": {
        "type": "boolean"
      }
    },
    "ai": {
      "type": "object",
      "required": [
        "provider",
        "models",
        "temperature"
      ],
      "properties": {
        "provider": {
          "type": "string"
        },
        "models": {
          "type": "object",
          "required": [
            "translation",
            "ocr",
            "stt"
          ],
          "additionalProperties": {
            "type": "string",
            "minLength": 1
          }
        },
        "temperature": {
          "type": "number",
          "minimum": 0,
          "maximum": 2
        }
      },
      "additionalProperties": false
    },
    "storage": {
      "type": "object",
      "required": [
        "provider",
        "bucketEnv",
        "zeroEgress"
      ],
      "properties": {
        "provider": {
          "type": "string"
        },
        "bucketEnv": {
          "type": "string"
        },
        "zeroEgress": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    },
    "editor": {
      "type": "object",
      "required": [
        "audioChannels",
        "duckingGain",
        "transitionGapSeconds"
      ],
      "properties": {
        "audioChannels": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "minItems": 1
        },
        "duckingGain": {
          "type": "number",
          "minimum": 0,
          "maximum": 1
        },
        "transitionGapSeconds": {
          "type": "number",
          "minimum": 0
        },
        "defaultWidth": {
          "type": "integer",
          "minimum": 1
        },
        "defaultHeight": {
          "type": "integer",
          "minimum": 1
        },
        "defaultFps": {
          "type": "number",
          "minimum": 1
        },
        "defaultSubtitleStyle": {
          "type": "object",
          "required": [
            "fontFamily",
            "fontSize",
            "color",
            "strokeColor",
            "strokeWidth",
            "bottomPx"
          ],
          "additionalProperties": false,
          "properties": {
            "fontFamily": {
              "type": "string"
            },
            "fontSize": {
              "type": "number",
              "minimum": 1
            },
            "color": {
              "type": "string"
            },
            "strokeColor": {
              "type": "string"
            },
            "strokeWidth": {
              "type": "number",
              "minimum": 0
            },
            "bottomPx": {
              "type": "number",
              "minimum": 0
            }
          }
        }
      },
      "additionalProperties": false
    },
    "theme": {
      "type": "object",
      "required": [
        "darkBackgroundColor",
        "darkContainerBackgroundColor",
        "accentColor",
        "textColor"
      ],
      "properties": {
        "darkBackgroundColor": {
          "type": "string",
          "pattern": "^#[0-9a-fA-F]{6}$"
        },
        "darkContainerBackgroundColor": {
          "type": "string",
          "pattern": "^#[0-9a-fA-F]{6}$"
        },
        "accentColor": {
          "type": "string",
          "pattern": "^#[0-9a-fA-F]{6}$"
        },
        "textColor": {
          "type": "string",
          "pattern": "^#[0-9a-fA-F]{6}$"
        }
      },
      "additionalProperties": false
    },
    "managedFiles": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "uniqueItems": true
    },
    "cloudflareAI": {
      "type": "object",
      "required": [
        "ttsModel",
        "workerPath"
      ],
      "properties": {
        "ttsModel": {
          "type": "string",
          "minLength": 1
        },
        "workerPath": {
          "type": "string",
          "pattern": "^/"
        }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}

```

## `system-config/scripts/export-source-md.mjs`

```mjs
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(new URL('../..', import.meta.url).pathname);
const out = path.join(root, 'SYSTEM_SOT_SOURCE_CODE.md');
const skip = new Set(['node_modules', '.git', 'dist', '.tmp', 'storage/builds']);
const exts = new Set(['.ts','.tsx','.js','.mjs','.json','.jsonc','.css','.html','.md','.yml','.yaml','.txt','.example']);
function walk(dir) {
  const items = fs.readdirSync(dir, {withFileTypes:true});
  const files=[];
  for (const item of items) {
    const full=path.join(dir,item.name), rel=path.relative(root,full).replaceAll(path.sep,'/');
    if (item.isDirectory()) { if(!skip.has(item.name) && !rel.startsWith('storage/builds/')) files.push(...walk(full)); }
    else if (rel !== 'SYSTEM_SOT_SOURCE_CODE.md') {
      const ext=path.extname(item.name);
      if (exts.has(ext) || item.name.endsWith('.env.example')) files.push(rel);
    }
  }
  return files;
}
const files=walk(root).sort();
let md=`# Hendy Video Studio Pro v2.4.0 — Full Source Snapshot\n\nGenerated from the repository working tree. Secrets, node_modules, dist, temp files and binary production artifacts are excluded.\n\n## File index\n\n${files.map(f=>`- \`${f}\``).join('\n')}\n\n`;
for (const rel of files) {
  const content=fs.readFileSync(path.join(root,rel),'utf8').replace(/``\`/g,'``\\`');
  const lang=path.extname(rel).slice(1) || (rel.endsWith('Dockerfile')?'dockerfile':'text');
  md += `## \`${rel}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`;
}
fs.writeFileSync(out,md);
fs.writeFileSync(path.join(root,'FILE_LIST.txt'), files.join('\n')+'\n');
console.log(`Exported ${files.length} text/source files.`);

```

## `system-config/scripts/push-env-to-cf.mjs`

```mjs
import process from 'node:process';

const required = ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing environment: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Cloudflare env push is intentionally explicit. Use Wrangler secrets/vars for production and never print secret values.');

```

## `system-config/scripts/sync-config.mjs`

```mjs
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

fs.writeFileSync(path.join(root, 'worker/wrangler.jsonc'), JSON.stringify({name:'hendy-video-studio-pro-api',main:'src/index.ts',compatibility_date:'2026-09-27',vars:{API_BASE_PATH:cfg.network.apiBasePath,CLOUDFLARE_TTS_MODEL:cfg.cloudflareAI.ttsModel},ai:{binding:'AI'},dev:{port:cfg.network.workerPort}}, null, 2));

const workerPackagePath = path.join(root, 'worker/package.json');
const workerPackage = JSON.parse(fs.readFileSync(workerPackagePath, 'utf8'));
workerPackage.devDependencies ??= {};
workerPackage.devDependencies['@cloudflare/workers-types'] = cfg.toolchain.workersTypes;
workerPackage.devDependencies.wrangler = cfg.toolchain.wrangler;
fs.writeFileSync(workerPackagePath, JSON.stringify(workerPackage, null, 2) + '\n');
console.log(`SOT synced to ${cfg.managedFiles.length} managed targets.`);

```

## `system-config/scripts/validate-config.mjs`

```mjs
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
required(config,['system','toolchain','network','features','ai','storage','editor','theme','managedFiles','cloudflareAI'],'root');
required(config.toolchain,['workersTypes','wrangler'],'toolchain');
if(!/^\d+\.\d{8}\.\d+$/.test(config.toolchain.workersTypes))fail('toolchain.workersTypes invalid date-version');
if(!/^\d+\.\d+\.\d+$/.test(config.toolchain.wrangler))fail('toolchain.wrangler invalid semver');
required(config.cloudflareAI,['ttsModel','workerPath'],'cloudflareAI');

required(config.system,['name','version','environment'],'system');
if(!/^\d+\.\d+\.\d+$/.test(config.system.version))fail('system.version must be semver-like');
if(!['development','staging','production'].includes(config.system.environment))fail('system.environment invalid');
required(config.network,['sandboxPort','backendPort','frontendPort','apiBasePath','mcpPath'],'network');
for(const k of ['sandboxPort','backendPort','workerPort','frontendPort'])if(!Number.isInteger(config.network[k])||config.network[k]<1024||config.network[k]>65535)fail(`network.${k} invalid port`);
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

## `system-config/system.config.json`

```json
{
  "system": {
    "name": "Hendy Video Studio Pro",
    "version": "2.4.0",
    "environment": "production"
  },
  "toolchain": {
    "workersTypes": "5.20260926.1",
    "wrangler": "4.137.0"
  },
  "network": {
    "sandboxPort": 8799,
    "backendPort": 8787,
    "frontendPort": 5173,
    "apiBasePath": "/api/v1",
    "mcpPath": "/mcp",
    "workerPort": 8788
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
      "translation": "gemini-3.8-flash",
      "ocr": "gemini-3.8-flash",
      "stt": "gemini-3.8-flash",
      "tts": "gemini-3.8-flash-tts",
      "ttsLite": "gemini-3.8-flash-lite-tts",
      "storyboard": "gemini-3.8-flash",
      "audioMix": "gemini-3.8-flash",
      "vietnamese": "gemini-3.8-flash"
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
    "transitionGapSeconds": 1.5,
    "defaultWidth": 1280,
    "defaultHeight": 720,
    "defaultFps": 30,
    "defaultSubtitleStyle": {
      "fontFamily": "Arial",
      "fontSize": 46,
      "color": "#ffffff",
      "strokeColor": "#000000",
      "strokeWidth": 6,
      "bottomPx": 52
    }
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
    "worker/wrangler.jsonc",
    "worker/package.json",
    "frontend/src/components/system/Header.tsx",
    "frontend/src/components/editor/InspectorPanel.tsx",
    "frontend/src/components/editor/MultiChannelAudioMixer.tsx"
  ],
  "cloudflareAI": {
    "ttsModel": "@cf/myshell-ai/melotts",
    "workerPath": "/api/ai/tts"
  }
}

```

## `worker/package.json`

```json
{
  "name": "@hendy/worker",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "wrangler dev --port 8788",
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "deploy": "wrangler deploy"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "5.20260926.1",
    "typescript": "^5.9.2",
    "wrangler": "4.137.0"
  }
}

```

## `worker/src/index.ts`

```ts
export interface Env {
  API_BASE_PATH: string;
  AI: Ai;
  CLOUDFLARE_TTS_MODEL?: string;
}

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, { headers: { 'cache-control': 'no-store' }, ...init });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (req.method === 'GET' && url.pathname === '/health') {
      return json({ ok: true, edge: true, version: '2.4.0', ai: true });
    }
    if (req.method === 'POST' && url.pathname === '/api/ai/tts') {
      const body = await req.json<{ text?: string; lang?: string }>();
      if (!body.text?.trim()) return json({ error: 'text is required' }, { status: 400 });
      const result = await env.AI.run(env.CLOUDFLARE_TTS_MODEL || '@cf/myshell-ai/melotts', {
        prompt: body.text,
        lang: body.lang || 'vi'
      });
      if (result instanceof ArrayBuffer) {
        return new Response(result, { headers: { 'content-type': 'audio/mpeg', 'cache-control': 'no-store' } });
      }
      if (result instanceof Uint8Array) {
        return new Response(result, { headers: { 'content-type': 'audio/mpeg', 'cache-control': 'no-store' } });
      }
      return json(result);
    }
    if (url.pathname.startsWith(env.API_BASE_PATH || '/api/v1')) {
      return json({ ok: true, service: 'edge-worker', path: url.pathname });
    }
    return new Response('Not Found', { status: 404 });
  }
} satisfies ExportedHandler<Env>;

```

## `worker/tsconfig.json`

```json
{"compilerOptions":{"target":"ES2022","module":"ES2022","moduleResolution":"Bundler","strict":true,"types":["@cloudflare/workers-types"],"skipLibCheck":true},"include":["src/**/*.ts"]}

```

## `worker/wrangler.jsonc`

```jsonc
{
  "name": "hendy-video-studio-pro-api",
  "main": "src/index.ts",
  "compatibility_date": "2026-09-27",
  "vars": {
    "API_BASE_PATH": "/api/v1",
    "CLOUDFLARE_TTS_MODEL": "@cf/myshell-ai/melotts"
  },
  "ai": {
    "binding": "AI"
  },
  "dev": {
    "port": 8788
  }
}
```

