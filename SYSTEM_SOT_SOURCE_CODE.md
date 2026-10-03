# Hendy Video Studio Pro v3.2.0 — Full Source Snapshot

Generated from the repository working tree. Secrets, node_modules, dist, temp files and binary production artifacts are excluded.

## File index

- `.env.example`
- `.github/workflows/system-gate.yml`
- `BUILD_ARTIFACTS.md`
- `CLOUDFLARE_BUILD_FIX.md`
- `CLOUDFLARE_WORKERS_BUILDS.txt`
- `DEPLOYMENT_MATRIX.md`
- `FILE_LIST.txt`
- `PRODUCTION_SETUP.md`
- `README.md`
- `SYSTEM_MAP_AND_USAGE_V3.2.0.txt`
- `SYSTEM_SOT_ARCHITECTURE.md`
- `UPGRADE_NOTES_V3.2.0.txt`
- `backend/package.json`
- `backend/src/app.ts`
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
- `backend/src/worker.ts`
- `backend/tsconfig.json`
- `backend/wrangler.jsonc`
- `capacitor.config.ts`
- `docs/EDITOR_AI_PIPELINE.md`
- `example_bot/README.md`
- `example_bot/docs/tgcloud-sdk.md`
- `example_bot/handlers/callback_query.js`
- `example_bot/handlers/message.js`
- `example_bot/handlers/webhook.js`
- `example_bot/package.json`
- `example_bot/schema.js`
- `example_bot/src/worker.ts`
- `example_bot/tsconfig.json`
- `example_bot/wrangler.jsonc`
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
- `frontend/src/components/editor/ProjectSettingsModal.tsx`
- `frontend/src/components/editor/SubtitleTableModal.tsx`
- `frontend/src/components/editor/Timeline.tsx`
- `frontend/src/components/system/Header.tsx`
- `frontend/src/components/system/PwaInstallBanner.tsx`
- `frontend/src/components/system/SystemControlPanel.tsx`
- `frontend/src/edge.ts`
- `frontend/src/generated/system-config.ts`
- `frontend/src/generated/system-env.ts`
- `frontend/src/generated/system-layout.tsx`
- `frontend/src/generated/system-theme.css`
- `frontend/src/main.tsx`
- `frontend/src/services/ai.ts`
- `frontend/src/services/api.ts`
- `frontend/src/services/projectStorage.ts`
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
- `index.html`
- `mcp/cloudflare/package.json`
- `mcp/cloudflare/src/index.ts`
- `mcp/cloudflare/src/policies/allowlist.ts`
- `mcp/cloudflare/src/runtime-config.ts`
- `mcp/cloudflare/src/tools/cloudflare.ts`
- `mcp/cloudflare/src/tools/config.ts`
- `mcp/cloudflare/src/tools/github.ts`
- `mcp/cloudflare/src/tools/observability.ts`
- `mcp/cloudflare/src/tools/sandbox.ts`
- `mcp/cloudflare/src/worker.ts`
- `mcp/cloudflare/tsconfig.json`
- `mcp/cloudflare/wrangler.jsonc`
- `metadata.json`
- `package.json`
- `public/manifest.json`
- `public/sw.js`
- `server.ts`
- `shared/constants/limits.ts`
- `shared/types/config.ts`
- `shared/types/media.ts`
- `shared/types/render.ts`
- `shared/types/timeline.ts`
- `src/generated/system-config.ts`
- `src/generated/system-theme.css`
- `system-config/README.md`
- `system-config/package.json`
- `system-config/sandbox/dryRun.mjs`
- `system-config/sandbox/policy.mjs`
- `system-config/sandbox/server.mjs`
- `system-config/schema/system-config.schema.json`
- `system-config/scripts/deploy-all.mjs`
- `system-config/scripts/export-source-md.mjs`
- `system-config/scripts/production-check.mjs`
- `system-config/scripts/push-env-to-cf.mjs`
- `system-config/scripts/release-gate.mjs`
- `system-config/scripts/set-telegram-webhook.mjs`
- `system-config/scripts/sync-config.mjs`
- `system-config/scripts/validate-config.mjs`
- `system-config/system.config.json`
- `worker/package.json`
- `worker/src/index.ts`
- `worker/tsconfig.json`
- `worker/wrangler.jsonc`
- `wrangler.jsonc`

## `.env.example`

```example
# Local unified server
PORT=3000
NODE_ENV=development

# Server-side AI secret (NEVER expose to VITE_*)
GEMINI_API_KEY=

# Telegram server-side secrets
TELEGRAM_BOT_TOKEN=
ADMIN_USER_IDS=
MCP_OTP_SECRET=
TELEGRAM_SECRET_TOKEN=

# Cloudflare R2 S3-compatible access
R2_ACCOUNT_ID=918ff2f016938fc978ed23b96505b21e
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=hendy-video-studio-pro-media
R2_ENDPOINT=https://918ff2f016938fc978ed23b96505b21e.r2.cloudflarestorage.com

# Optional frontend build-time values (safe/non-secret only)
VITE_API_BASE_URL=
VITE_TELEGRAM_BOT_USERNAME=

```

## `.github/workflows/system-gate.yml`

```yml
name: Hendy SOT Release Gate

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.2.15
      - run: bun install
      - run: bun run config:validate
      - run: bun run config:dry-run -- --strict-dry-run
      - run: bun run typecheck
      - run: bun run build

```

## `BUILD_ARTIFACTS.md`

```md
# Production build artifacts

The repository does not commit signed APK/AAB/EXE/DMG binaries. Add release artifacts under the configured storage location before enabling the Smart Download Gateway.

Expected artifacts:

- `ai-studio-pro-latest.apk`
- `ai-studio-pro-release.aab`
- `ai-studio-pro-setup.exe`
- `ai-studio-pro-release.dmg`

Never commit production credentials, debug certificates or unsigned private release files.

```

## `CLOUDFLARE_BUILD_FIX.md`

```md
# Cloudflare Workers Build Fix — v3.2.0

## Root cause addressed

The old ZIP used Cloudflare Pages configuration (`pages_build_output_dir`) and a single deploy command that could try to deploy multiple Worker configs under the same connected Worker. The upgraded ZIP uses a Gateway Worker plus four dedicated Workers.

## Required Workers Builds

Create five Workers Build projects from the same repository. Each service uses its own root directory and matching Wrangler `name`.

``\`text
/                    -> hendy-video-studio-pro
/backend/            -> hendy-video-studio-pro-backend
/worker/             -> hendy-video-studio-pro-ai
/mcp/cloudflare/     -> hendy-video-studio-pro-mcp
/example_bot/        -> hendy-video-studio-pro-telegram
``\`

## Commands

Build is compile-only. Deploy is the only step that publishes a Worker. This prevents required Cloudflare secrets from blocking a compile-only build.

Gateway:
`bun run build`
`bun run worker:deploy`

Service Workers:
`bun run build`
`bunx wrangler deploy --config wrangler.jsonc`

Cloudflare Workers Builds supports a separate root directory and build/deploy commands per connected Worker.

## Static assets

The Gateway uses Workers Static Assets (`frontend/dist`) and Service Bindings for internal routing. It is no longer a Pages-only deployment.

```

## `CLOUDFLARE_WORKERS_BUILDS.txt`

```txt
HENDY VIDEO STUDIO PRO v3.2.0
CLOUDFLARE WORKERS BUILDS SETUP
================================

Repository
----------
ngogiaidy56-eng/hendy-video-studio-pro
Branch: main

WORKER 1 — GATEWAY
-------------------
Worker: hendy-video-studio-pro
Root: /
Build: bun run build
Deploy: bun run worker:deploy
Watch: frontend/**, system-config/**, package.json, bun.lock, wrangler.jsonc

WORKER 2 — BACKEND
-------------------
Worker: hendy-video-studio-pro-backend
Root: /backend/
Build: bun run build
Deploy: bunx wrangler deploy --config wrangler.jsonc
Watch: backend/**, shared/**, system-config/**
Secrets: GEMINI_API_KEY, TELEGRAM_BOT_TOKEN, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, ADMIN_USER_IDS, MCP_OTP_SECRET

WORKER 3 — AI
---------------
Worker: hendy-video-studio-pro-ai
Root: /worker/
Build: bun run build
Deploy: bunx wrangler deploy --config wrangler.jsonc
Watch: worker/**, system-config/**
Binding: AI

WORKER 4 — MCP
----------------
Worker: hendy-video-studio-pro-mcp
Root: /mcp/cloudflare/
Build: bun run build
Deploy: bunx wrangler deploy --config wrangler.jsonc
Watch: mcp/cloudflare/**, system-config/**
Route: /mcp

WORKER 5 — TELEGRAM
--------------------
Worker: hendy-video-studio-pro-telegram
Root: /example_bot/
Build: bun run build
Deploy: bunx wrangler deploy --config wrangler.jsonc
Watch: example_bot/**, system-config/**
Secrets: TELEGRAM_BOT_TOKEN, ADMIN_USER_IDS, MCP_OTP_SECRET, TELEGRAM_SECRET_TOKEN
D1 binding: DB

GATEWAY ROUTES
--------------
/health           -> Gateway health
/health/all       -> Gateway + Backend + AI + MCP + Telegram health
/api/*            -> Backend
/api/ai/*         -> AI Worker
/mcp/*            -> MCP Worker
/telegram/*       -> Telegram Worker
other paths      -> React Static Assets

LOCAL
-----
Unified server: http://127.0.0.1:3000
Vite:           http://127.0.0.1:5173
Sandbox:         ws://127.0.0.1:8799/ws

SECURITY
--------
Do NOT put API keys, Telegram bot tokens, R2 access keys or OTP secrets in this file, Git or frontend code. Set them in Cloudflare Worker Secrets.

```

## `DEPLOYMENT_MATRIX.md`

```md
# Hendy Video Studio Pro v3.2.0 — Cloudflare Deployment Matrix

| Worker | Dashboard Root | Build | Deploy |
|---|---|---|---|
| hend­­y-video-studio-pro | `/` | `bun run build` | `bun run worker:deploy` |
| hend­­y-video-studio-pro-backend | `/backend/` | `bun run build` | `bunx wrangler deploy --config wrangler.jsonc` |
| hend­­y-video-studio-pro-ai | `/worker/` | `bun run build` | `bunx wrangler deploy --config wrangler.jsonc` |
| hend­­y-video-studio-pro-mcp | `/mcp/cloudflare/` | `bun run build` | `bunx wrangler deploy --config wrangler.jsonc` |
| hend­­y-video-studio-pro-telegram | `/example_bot/` | `bun run build` | `bunx wrangler deploy --config wrangler.jsonc` |

## Service bindings

Gateway bindings:

``\`text
BACKEND   -> hend­­y-video-studio-pro-backend
AI_EDGE   -> hend­­y-video-studio-pro-ai
MCP       -> hend­­y-video-studio-pro-mcp
TELEGRAM  -> hend­­y-video-studio-pro-telegram
``\`

## Deployment order

``\`text
Backend -> AI -> MCP -> Telegram -> Gateway
``\`

The target Workers should exist before the Gateway deploy that uses their Service Bindings.

```

## `FILE_LIST.txt`

```txt
.env.example
.github/workflows/system-gate.yml
BUILD_ARTIFACTS.md
CLOUDFLARE_BUILD_FIX.md
CLOUDFLARE_WORKERS_BUILDS.txt
DEPLOYMENT_MATRIX.md
FILE_LIST.txt
PRODUCTION_SETUP.md
README.md
SYSTEM_MAP_AND_USAGE_V3.2.0.txt
SYSTEM_SOT_ARCHITECTURE.md
backend/package.json
backend/src/app.ts
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
backend/src/worker.ts
backend/tsconfig.json
backend/wrangler.jsonc
capacitor.config.ts
docs/EDITOR_AI_PIPELINE.md
example_bot/README.md
example_bot/docs/tgcloud-sdk.md
example_bot/handlers/callback_query.js
example_bot/handlers/message.js
example_bot/handlers/webhook.js
example_bot/package.json
example_bot/schema.js
example_bot/src/worker.ts
example_bot/tsconfig.json
example_bot/wrangler.jsonc
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
frontend/src/components/editor/ProjectSettingsModal.tsx
frontend/src/components/editor/SubtitleTableModal.tsx
frontend/src/components/editor/Timeline.tsx
frontend/src/components/system/Header.tsx
frontend/src/components/system/PwaInstallBanner.tsx
frontend/src/components/system/SystemControlPanel.tsx
frontend/src/edge.ts
frontend/src/generated/system-config.ts
frontend/src/generated/system-env.ts
frontend/src/generated/system-layout.tsx
frontend/src/generated/system-theme.css
frontend/src/main.tsx
frontend/src/services/ai.ts
frontend/src/services/api.ts
frontend/src/services/projectStorage.ts
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
index.html
mcp/cloudflare/package.json
mcp/cloudflare/src/index.ts
mcp/cloudflare/src/policies/allowlist.ts
mcp/cloudflare/src/runtime-config.ts
mcp/cloudflare/src/tools/cloudflare.ts
mcp/cloudflare/src/tools/config.ts
mcp/cloudflare/src/tools/github.ts
mcp/cloudflare/src/tools/observability.ts
mcp/cloudflare/src/tools/sandbox.ts
mcp/cloudflare/src/worker.ts
mcp/cloudflare/tsconfig.json
mcp/cloudflare/wrangler.jsonc
metadata.json
package.json
public/manifest.json
public/sw.js
server.ts
shared/constants/limits.ts
shared/types/config.ts
shared/types/media.ts
shared/types/render.ts
shared/types/timeline.ts
src/generated/system-config.ts
src/generated/system-theme.css
system-config/README.md
system-config/package.json
system-config/sandbox/dryRun.mjs
system-config/sandbox/policy.mjs
system-config/sandbox/server.mjs
system-config/schema/system-config.schema.json
system-config/scripts/deploy-all.mjs
system-config/scripts/export-source-md.mjs
system-config/scripts/production-check.mjs
system-config/scripts/push-env-to-cf.mjs
system-config/scripts/release-gate.mjs
system-config/scripts/set-telegram-webhook.mjs
system-config/scripts/sync-config.mjs
system-config/scripts/validate-config.mjs
system-config/system.config.json
worker/package.json
worker/src/index.ts
worker/tsconfig.json
worker/wrangler.jsonc
wrangler.jsonc

```

## `PRODUCTION_SETUP.md`

```md
# Hendy Video Studio Pro v3.2.0 — Production Setup

## 1. Tạo 5 Workers Builds

Kết nối cùng repository `ngogiaidy56-eng/hendy-video-studio-pro` tới 5 Workers riêng. Cloudflare Workers Builds cho phép mỗi Worker có root directory và watch paths riêng trong monorepo.

| Worker | Root directory | Build command | Deploy command | Watch paths |
|---|---|---|---|---|
| `hendy-video-studio-pro` | `/` | `bun run build` | `bun run worker:deploy` | `frontend/**`, `system-config/**`, `package.json`, `bun.lock`, `wrangler.jsonc` |
| `hendy-video-studio-pro-backend` | `/backend/` | `bun run build` | `bunx wrangler deploy --config wrangler.jsonc` | `backend/**`, `shared/**`, `system-config/**` |
| `hendy-video-studio-pro-ai` | `/worker/` | `bun run build` | `bunx wrangler deploy --config wrangler.jsonc` | `worker/**`, `system-config/**` |
| `hendy-video-studio-pro-mcp` | `/mcp/cloudflare/` | `bun run build` | `bunx wrangler deploy --config wrangler.jsonc` | `mcp/cloudflare/**`, `system-config/**` |
| `hendy-video-studio-pro-telegram` | `/example_bot/` | `bun run build` | `bunx wrangler deploy --config wrangler.jsonc` | `example_bot/**`, `system-config/**` |

Root directory là thư mục chứa `package.json` và `wrangler.jsonc` của từng Worker. Không dùng Pages project cũ cho Gateway.

## 2. Gateway

Gateway sử dụng Cloudflare Workers Static Assets và Service Bindings. Static assets được lấy từ `./frontend/dist`; `/api/*`, `/mcp/*`, `/telegram/*` chạy qua Worker trước khi Assets fallback.

## 3. Backend secrets

Đặt trực tiếp trong Cloudflare Worker Secrets:

``\`text
GEMINI_API_KEY
TELEGRAM_BOT_TOKEN
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
ADMIN_USER_IDS
MCP_OTP_SECRET
``\`

Telegram Worker:

``\`text
TELEGRAM_BOT_TOKEN
ADMIN_USER_IDS
MCP_OTP_SECRET
TELEGRAM_SECRET_TOKEN
``\`

Không ghi các giá trị này vào Git, ZIP source hoặc frontend.

## 4. R2

SOT đang cấu hình bucket `hendy-video-studio-pro-media`, Account ID và S3 endpoint. Access Key/Secret Key chỉ là Cloudflare Worker Secrets.

## 5. Telegram webhook

Production webhook:

`https://hendy-video-studio-pro.ngogiaidy56.workers.dev/telegram/webhook`

Chạy `node system-config/scripts/set-telegram-webhook.mjs` sau khi đặt `TELEGRAM_BOT_TOKEN` và `TELEGRAM_WEBHOOK_URL` trong môi trường deploy.

## 6. Kiểm tra sau deploy

``\`bash
npm run production:check
``\`

Gateway health:

`https://hendy-video-studio-pro.ngogiaidy56.workers.dev/health`

Full health:

`https://hendy-video-studio-pro.ngogiaidy56.workers.dev/health/all`

`health/all` sẽ kiểm tra Gateway, Backend readiness, AI, MCP và Telegram.

```

## `README.md`

```md
# Hendy Video Studio Pro v3.2.0

Monorepo cho AI video editor đa nền tảng: React 19, Gateway Worker, Express Backend Worker, Workers AI, R2, Telegram + D1 và MCP control plane.

## Kiến trúc

``\`text
Browser / PWA / Telegram Mini App
              │
              ▼
   hend­­y-video-studio-pro (Gateway)
      ├── /api/* ───────► Backend Worker
      ├── /api/ai/* ────► AI Worker / Workers AI
      ├── /mcp/* ───────► MCP Worker
      └── /telegram/* ─► Telegram Worker / D1

Backend Worker ──► Gemini API
               └─► Cloudflare R2

Local Sandbox: 127.0.0.1:8799/ws
``\`

## Cấu trúc runtime

- `system-config/` — Single Source of Truth + validation + sync + release gate.
- `frontend/` — React editor, timeline, canvas, audio mixer, subtitle tools, PWA.
- `backend/` — Express API chạy trên Workers Node compatibility.
- `worker/` — Workers AI / MeloTTS edge service.
- `mcp/cloudflare/` — stateless MCP Streamable HTTP.
- `example_bot/` — Telegram webhook + D1 telemetry/admin.
- `shared/` — contracts/types dùng chung.

## Local

``\`bash
bun install
bun run config:validate
bun run config:sync
bun run release:gate
``\`

Unified local server:

``\`bash
bun run dev
``\`

Các service riêng:

``\`bash
npm --workspace backend run dev
npm --workspace worker run dev
npm --workspace frontend run dev
npm --workspace mcp/cloudflare run dev
``\`

## Release

``\`bash
bun run release:gate
bun run deploy:all
``\`

Trong Cloudflare Workers Builds của Gateway, `bun run worker:deploy` chỉ deploy Gateway. 4 Worker con có Workers Build riêng.

## Bảo mật

Secrets chỉ nằm trong Cloudflare Worker Secrets hoặc môi trường local. Không đưa Gemini key, Telegram bot token, R2 access/secret key hay MCP OTP secret vào frontend, SOT, IndexedDB, Telegram CloudStorage hoặc Git.

## Cloudflare

Gateway dùng Static Assets + Service Bindings. Workers AI dùng binding `env.AI`. MCP dùng `createMcpHandler` stateless.

```

## `SYSTEM_MAP_AND_USAGE_V3.2.0.txt`

```txt
HENDY VIDEO STUDIO PRO v3.2.0 — UPGRADED SYSTEM MAP + USAGE
==============================================================================

1. ARCHITECTURE

Browser / PWA / Telegram Mini App
        │
        ▼
hendy-video-studio-pro  [Gateway Worker]
        ├── React 19 static assets (Cloudflare Static Assets)
        ├── /api/*      ──Service Binding──> BACKEND
        ├── /api/ai/*  ──Service Binding──> AI_EDGE
        ├── /mcp/*     ──Service Binding──> MCP
        └── /telegram/*──Service Binding──> TELEGRAM

BACKEND Worker
  ├── Express API / auth / upload / AI orchestration
  ├── Gemini API
  └── Cloudflare R2 (S3 compatible)

AI Worker
  └── Cloudflare Workers AI / MeloTTS

MCP Worker
  └── Stateless Streamable HTTP MCP (/mcp)

TELEGRAM Worker
  ├── Telegram webhook
  ├── Mini App/admin commands
  └── D1 binding DB

LOCAL SANDBOX
  └── 127.0.0.1:8799/ws  (public access disabled)

2. DIRECTORY TREE

├── .github/
│   └── workflows/
│       └── system-gate.yml
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── downloadController.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── cloudflare.ts
│   │   │   ├── gemini.ts
│   │   │   ├── media.ts
│   │   │   └── projects.ts
│   │   ├── services/
│   │   │   ├── audioMixOptimizer.ts
│   │   │   ├── audioTranscriber.ts
│   │   │   ├── auth.ts
│   │   │   ├── cloudflareTts.ts
│   │   │   ├── extractor.ts
│   │   │   ├── geminiClient.ts
│   │   │   ├── geminiTts.ts
│   │   │   ├── imageTranslator.ts
│   │   │   ├── otpService.ts
│   │   │   ├── r2Storage.ts
│   │   │   ├── recoveryService.ts
│   │   │   ├── storyboardGenerator.ts
│   │   │   ├── telegramAuth.ts
│   │   │   ├── videoTranscriber.ts
│   │   │   ├── vietnameseEnhancer.ts
│   │   │   └── vietsubAi.ts
│   │   ├── app.ts
│   │   ├── server.ts
│   │   └── worker.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── wrangler.jsonc
├── docs/
│   └── EDITOR_AI_PIPELINE.md
├── example_bot/
│   ├── docs/
│   │   └── tgcloud-sdk.md
│   ├── handlers/
│   │   ├── callback_query.js
│   │   ├── message.js
│   │   └── webhook.js
│   ├── src/
│   │   └── worker.ts
│   ├── package.json
│   ├── README.md
│   ├── schema.js
│   ├── schema.sql
│   ├── tsconfig.json
│   └── wrangler.jsonc
├── frontend/
│   ├── public/
│   │   ├── _headers
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── sw.js
│   ├── src/
│   │   ├── components/
│   │   │   ├── editor/
│   │   │   │   ├── AssetSidebar.tsx
│   │   │   │   ├── AudioMixer.tsx
│   │   │   │   ├── CanvasPreview.tsx
│   │   │   │   ├── InspectorPanel.tsx
│   │   │   │   ├── MultiChannelAudioMixer.tsx
│   │   │   │   ├── ProjectSettingsModal.tsx
│   │   │   │   ├── SubtitleTableModal.tsx
│   │   │   │   └── Timeline.tsx
│   │   │   └── system/
│   │   │       ├── Header.tsx
│   │   │       ├── PwaInstallBanner.tsx
│   │   │       └── SystemControlPanel.tsx
│   │   ├── generated/
│   │   │   ├── system-config.ts
│   │   │   ├── system-env.ts
│   │   │   ├── system-layout.tsx
│   │   │   └── system-theme.css
│   │   ├── services/
│   │   │   ├── ai.ts
│   │   │   ├── api.ts
│   │   │   ├── projectStorage.ts
│   │   │   ├── renderManifest.ts
│   │   │   └── telegram.ts
│   │   ├── types/
│   │   │   └── project.ts
│   │   ├── utils/
│   │   │   ├── appDownloader.ts
│   │   │   ├── audioEngine.ts
│   │   │   ├── frameInjector.ts
│   │   │   ├── subBurner.ts
│   │   │   ├── subtitleExporter.ts
│   │   │   ├── undoEngine.ts
│   │   │   └── videoRenderer.ts
│   │   ├── app.css
│   │   ├── App.tsx
│   │   ├── edge.ts
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── mcp/
│   └── cloudflare/
│       ├── src/
│       │   ├── policies/
│       │   │   └── allowlist.ts
│       │   ├── tools/
│       │   │   ├── cloudflare.ts
│       │   │   ├── config.ts
│       │   │   ├── github.ts
│       │   │   ├── observability.ts
│       │   │   └── sandbox.ts
│       │   ├── index.ts
│       │   ├── runtime-config.ts
│       │   └── worker.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── wrangler.jsonc
├── public/
│   ├── _headers
│   ├── manifest.json
│   └── sw.js
├── shared/
│   ├── constants/
│   │   └── limits.ts
│   └── types/
│       ├── config.ts
│       ├── media.ts
│       ├── render.ts
│       └── timeline.ts
├── src/
│   └── generated/
│       ├── system-config.ts
│       └── system-theme.css
├── system-config/
│   ├── sandbox/
│   │   ├── dryRun.mjs
│   │   ├── policy.mjs
│   │   └── server.mjs
│   ├── schema/
│   │   └── system-config.schema.json
│   ├── scripts/
│   │   ├── deploy-all.mjs
│   │   ├── export-source-md.mjs
│   │   ├── production-check.mjs
│   │   ├── push-env-to-cf.mjs
│   │   ├── release-gate.mjs
│   │   ├── set-telegram-webhook.mjs
│   │   ├── sync-config.mjs
│   │   └── validate-config.mjs
│   ├── package.json
│   ├── README.md
│   └── system.config.json
├── worker/
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── wrangler.jsonc
├── .env.example
├── .gitignore
├── BUILD_ARTIFACTS.md
├── bun.lock
├── capacitor.config.ts
├── CLOUDFLARE_BUILD_FIX.md
├── CLOUDFLARE_WORKERS_BUILDS.txt
├── DEPLOYMENT_MATRIX.md
├── FILE_LIST.txt
├── index.html
├── metadata.json
├── package.json
├── PRODUCTION_SETUP.md
├── README.md
├── server.ts
├── SYSTEM_SOT_ARCHITECTURE.md
├── SYSTEM_SOT_SOURCE_CODE.md
└── wrangler.jsonc

3. SOURCE OF TRUTH

- Config: system-config/system.config.json
- Schema: system-config/schema/system-config.schema.json
- Sync: node system-config/scripts/sync-config.mjs --sync
- Validate: node system-config/scripts/validate-config.mjs
- Strict drift check: node system-config/scripts/sync-config.mjs --dry-run --strict-dry-run

SOT VERSION: 3.2.0
PUBLIC APP: https://hendy-video-studio-pro.ngogiaidy56.workers.dev
R2 BUCKET: hendy-video-studio-pro-media
R2 ENDPOINT: https://918ff2f016938fc978ed23b96505b21e.r2.cloudflarestorage.com

4. LOCAL DEVELOPMENT

Prerequisites: Node >=22 <25 and Bun 1.2.15.

Install:
  bun install

Run unified local server:
  bun run dev

Sandbox only:
  bun run sandbox

Frontend only:
  bun --cwd frontend run dev

5. RELEASE GATE

Fast configuration check:
  bun run config:validate
  bun run config:dry-run -- --strict-dry-run

Full gate:
  bun run release:gate

Note: the provided build environment used for this upgrade did not have Bun or a network-backed npm/Bun cache, so a full dependency install/typecheck/build was not executed here. Static/config/syntax checks were executed.

6. CLOUDFLARE WORKERS BUILDS — 5 PROJECTS

Gateway
  Worker: hendy-video-studio-pro
  Root: /
  Build: bun run build
  Deploy: bun run worker:deploy

Backend
  Worker: hendy-video-studio-pro-backend
  Root: /backend/
  Build: bun run build
  Deploy: bunx wrangler deploy --config wrangler.jsonc

AI
  Worker: hendy-video-studio-pro-ai
  Root: /worker/
  Build: bun run build
  Deploy: bunx wrangler deploy --config wrangler.jsonc

MCP
  Worker: hendy-video-studio-pro-mcp
  Root: /mcp/cloudflare/
  Build: bun run build
  Deploy: bunx wrangler deploy --config wrangler.jsonc

Telegram
  Worker: hendy-video-studio-pro-telegram
  Root: /example_bot/
  Build: bun run build
  Deploy: bunx wrangler deploy --config wrangler.jsonc

Deploy order for a first bootstrap:
  Backend → AI → MCP → Telegram → Gateway

7. REQUIRED SECRETS

Backend:
  GEMINI_API_KEY
  TELEGRAM_BOT_TOKEN
  R2_ACCESS_KEY_ID
  R2_SECRET_ACCESS_KEY
  ADMIN_USER_IDS
  MCP_OTP_SECRET

Telegram:
  TELEGRAM_BOT_TOKEN
  ADMIN_USER_IDS
  MCP_OTP_SECRET
  TELEGRAM_SECRET_TOKEN

Never place these values in Git, frontend VITE_* variables, or this ZIP.

8. R2 CONFIG

Non-secret metadata kept in SOT:
  accountId: 918ff2f016938fc978ed23b96505b21e
  endpoint: https://918ff2f016938fc978ed23b96505b21e.r2.cloudflarestorage.com
  bucket: hendy-video-studio-pro-media

Secrets must be entered with Cloudflare Worker Secrets / Variables. Do not paste new credentials into chat.

9. API / ROUTING

  /health            → gateway health
  /health/all        → gateway probes all four child Workers
  /api/*             → backend
  /api/ai/*          → AI Worker
  /mcp               → MCP Worker
  /mcp/*             → MCP Worker
  /telegram/*        → Telegram Worker

10. PWA / OFFLINE

- Service worker caches shell assets only.
- /api, /mcp and /telegram are explicitly bypassed by offline cache.
- Navigation falls back to cached / when offline.
- PWA manifest is generated from SOT.

11. QUALITY/SANITY CHECKS PERFORMED

- SOT validation: PASS
- Strict configuration drift check: PASS (28 managed targets)
- JS/MJS syntax check: PASS
- TypeScript syntax transpile check: PASS
- JSON/JSONC parsing: PASS
- Secret hygiene scan: PASS (no real credential values in package)

12. CLOUDFlARE NOTES

- Each child Worker must exist before Gateway Service Bindings can deploy.
- Each Workers Build project uses the same GitHub repo with a different root directory.
- Keep Worker names exactly equal to Wrangler "name" fields.
- Do not use a legacy Pages deployment for the Gateway.

Generated: 2026-10-02T14:29:44

```

## `SYSTEM_SOT_ARCHITECTURE.md`

```md
# Hendy Video Studio Pro v3.2.0 — System Architecture

## Production topology

``\`text
                         ┌────────────────────────────┐
                         │ Browser / PWA / Telegram   │
                         └─────────────┬──────────────┘
                                       │ HTTPS
                                       ▼
                    ┌──────────────────────────────────┐
                    │ hend­­y-video-studio-pro          │
                    │ Gateway Worker + Static Assets    │
                    │ frontend/dist                     │
                    └──────┬────────┬────────┬──────────┘
                           │        │        │
             /api/*        │        │        └── /telegram/* ─► Telegram Worker ─► D1
                           │        └────────── /mcp/* ───────► MCP Worker
                           └──────────────── /api/ai/* ──────► AI Worker ─► Workers AI
                           │
                           └──────────────── /api/* ─────────► Backend Worker
                                                        ├── Gemini API
                                                        └── Cloudflare R2

 Local only: 127.0.0.1:8799/ws → Sandbox / AutoPatch / strict dry-run
``\`

## Five Cloudflare Workers

| Worker | Root | Role |
|---|---|---|
| `hendy-video-studio-pro` | `/` | Gateway, React assets, routing |
| `hendy-video-studio-pro-backend` | `/backend/` | Express API, Gemini, R2 |
| `hendy-video-studio-pro-ai` | `/worker/` | Workers AI / MeloTTS |
| `hendy-video-studio-pro-mcp` | `/mcp/cloudflare/` | Stateless MCP |
| `hendy-video-studio-pro-telegram` | `/example_bot/` | Telegram webhook + D1 |

## Configuration authority

`system-config/system.config.json` is the only source that should be edited for runtime topology, versions, ports, public URL, R2 metadata, Worker names, build/deploy commands, security secret names and editor defaults.

`system-config/scripts/sync-config.mjs` generates Wrangler configs, frontend runtime config, theme variables, PWA manifest and worker package toolchain pins.

## Service bindings

The gateway declares `BACKEND`, `AI_EDGE`, `MCP` and `TELEGRAM`. These are internal Worker-to-Worker calls, not public URLs. Cloudflare Service Bindings provide this separation without requiring public routes.

## Static assets

The gateway uses `assets.directory = ./frontend/dist` and SPA fallback. API/MCP/Telegram paths are handled by the Worker before the asset fallback.

## Security boundaries

- Secrets stay in Cloudflare Worker Secrets and local environment only.
- R2 Account ID, bucket and endpoint are non-secret configuration.
- Sandbox is loopback-only.
- Telegram admin is controlled by server-side user ID allowlisting.
- MCP is stateless and should be protected by the chosen authentication layer before exposing privileged tools.

```

## `UPGRADE_NOTES_V3.2.0.txt`

```txt
HENDY VIDEO STUDIO PRO v3.2.0
ZIP UPGRADE NOTES
===============================

MỤC TIÊU
- Chuyển kiến trúc từ Pages/legacy sang Cloudflare Workers Gateway + Static Assets.
- Chuẩn hóa 5 Workers trong monorepo với Root Directory riêng.
- Đưa cấu hình về một SOT duy nhất: system-config/system.config.json.
- Đồng bộ Build/Deploy/Watch paths cho Cloudflare Workers Builds.
- Giảm dependency thừa của Telegram Worker.
- Chuẩn hóa R2 metadata, secrets, health checks, PWA/offline và Service Bindings.

5 WORKERS
1. Gateway: hendy-video-studio-pro
   Root: /
   Build: bun run build
   Deploy: bun run worker:deploy

2. Backend: hendy-video-studio-pro-backend
   Root: /backend/
   Build: bun run build
   Deploy: bunx wrangler deploy --config wrangler.jsonc

3. AI: hendy-video-studio-pro-ai
   Root: /worker/
   Build: bun run build
   Deploy: bunx wrangler deploy --config wrangler.jsonc

4. MCP: hendy-video-studio-pro-mcp
   Root: /mcp/cloudflare/
   Build: bun run build
   Deploy: bunx wrangler deploy --config wrangler.jsonc

5. Telegram: hendy-video-studio-pro-telegram
   Root: /example_bot/
   Build: bun run build
   Deploy: bunx wrangler deploy --config wrangler.jsonc

SERVICE BINDINGS
Gateway -> BACKEND -> hendy-video-studio-pro-backend
Gateway -> AI_EDGE -> hendy-video-studio-pro-ai
Gateway -> MCP -> hendy-video-studio-pro-mcp
Gateway -> TELEGRAM -> hendy-video-studio-pro-telegram

R2
Bucket: hendy-video-studio-pro-media
Account ID và endpoint nằm trong SOT dưới storage; Access Key/Secret Key KHÔNG nằm trong ZIP.

SECRETS
Backend:
- GEMINI_API_KEY
- TELEGRAM_BOT_TOKEN
- R2_ACCESS_KEY_ID
- R2_SECRET_ACCESS_KEY
- ADMIN_USER_IDS
- MCP_OTP_SECRET

Telegram:
- TELEGRAM_BOT_TOKEN
- ADMIN_USER_IDS
- MCP_OTP_SECRET
- TELEGRAM_SECRET_TOKEN

KHÔNG commit secrets vào Git hoặc frontend VITE_*.

LOCAL
- Prerequisites: Node >=22 <25, Bun 1.2.15.
- Install: bun install
- Unified server: bun run dev
- Sandbox: bun run sandbox
- Frontend: bun --cwd frontend run dev

QUALITY COMMANDS
- bun run config:validate
- bun run config:dry-run -- --strict-dry-run
- bun run typecheck
- bun run build:all
- bun run production:check

BOOTSTRAP ORDER
Backend -> AI -> MCP -> Telegram -> Gateway.
Worker đích của Service Binding phải tồn tại trước Gateway.

ĐÃ KIỂM TRA TRÊN BẢN ZIP NÀY
- SOT validation: PASS
- Strict SOT dry-run: PASS (28 managed targets)
- JSON/JSONC parse: PASS
- Node JS/MJS syntax: PASS
- TypeScript syntax transpile check: PASS
- Secret hygiene: PASS

GIỚI HẠN MÔI TRƯỜNG ĐÓNG GÓI
Môi trường tạo ZIP không có Bun executable và không có cache mạng/npm đầy đủ, vì vậy chưa chạy được full bun install + full TypeScript/Vite production build tại đây. Các kiểm tra cấu hình và syntax đã chạy thành công; build dependency đầy đủ nên chạy lại trong Cloudflare/GitHub bằng Bun 1.2.15.

BẢO MẬT
Các credential đã từng được gửi trong chat không được ghi vào ZIP. Hãy rotate/revoke credential đã lộ và nhập credential mới trực tiếp vào Cloudflare Secrets.

```

## `backend/package.json`

```json
{
  "name": "@hendy/backend",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "prebuild": "node ../system-config/scripts/sync-config.mjs --sync",
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "start": "node dist/server.js",
    "deploy": "wrangler deploy --config wrangler.jsonc"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.888.0",
    "@google/genai": "^2.24.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
    "multer": "^2.0.2",
    "uuid": "^11.1.0",
    "ws": "^8.18.3"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "5.20260927.1",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.3",
    "@types/multer": "^2.0.0",
    "@types/node": "^24.4.0",
    "tsx": "^4.20.5",
    "typescript": "^5.9.3",
    "wrangler": "4.141.0"
  }
}

```

## `backend/src/app.ts`

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

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors({origin:(process.env.FRONTEND_ORIGIN || '*').split(',')}));
  app.use(express.json({limit:'4mb'}));
  app.get(['/health','/api/health'],(req,res)=>res.json({ok:true,service:'express-backend',version:process.env.APP_VERSION || '3.2.0',runtime:'workers-node-compat'}));
  app.get('/health/ready',(req,res)=>{
    const checks = {
      gemini:Boolean(process.env.GEMINI_API_KEY),
      telegram:Boolean(process.env.TELEGRAM_BOT_TOKEN),
      r2:Boolean(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET),
      auth:Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.ADMIN_USER_IDS && process.env.MCP_OTP_SECRET)
    };
    const ready=Object.values(checks).every(Boolean);
    res.status(ready?200:503).json({ok:ready,checks});
  });
  app.use('/api/v1/auth',authRouter);
  app.use('/api/v1/media',mediaRouter);
  app.use('/api/v1/projects',projectRouter);
  app.use('/api/gemini',geminiRouter);
  app.use('/api/cloudflare',cloudflareRouter);
  app.get('/tai-app',smartDownload);
  app.use((err:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{
    console.error(err);
    res.status(500).json({error:'Internal server error'});
  });
  return app;
}
export const app=createApp();

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
import {issueOtp,verifyOtp} from '../services/otpService.js';

export const authRouter=Router();

authRouter.post('/telegram/verify',(req,res)=>{
  try{
    const user=verifyTelegramRequest(String(req.body?.initData || ''));
    res.json({ok:true,user});
  }catch(e){
    res.status(401).json({ok:false,error:e instanceof Error?e.message:'Unauthorized'});
  }
});

authRouter.post('/mcp/otp/issue',(req,res)=>{
  try{
    const initData=String(req.header('x-telegram-init-data') || req.body?.initData || '');
    const user=verifyTelegramRequest(initData);
    if(!['admin','maintainer'].includes(user.role)) return res.status(403).json({ok:false,error:'Admin role required'});
    const ttl=Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60);
    const otp=issueOtp('admin:'+user.id,ttl);
    res.status(201).json({ok:true,otp,expiresIn:ttl});
  }catch(e){
    res.status(401).json({ok:false,error:e instanceof Error?e.message:'Unauthorized'});
  }
});

authRouter.post('/mcp/otp/verify',(req,res)=>{
  try{
    const initData=String(req.header('x-telegram-init-data') || '');
    const user=verifyTelegramRequest(initData);
    if(!['admin','maintainer'].includes(user.role)) return res.status(403).json({ok:false,error:'Admin role required'});
    const ttl=Number(process.env.TELEGRAM_OTP_TTL_SECONDS || 60);
    const ok=verifyOtp('admin:'+user.id,String(req.body?.otp || ''),ttl);
    res.json({ok});
  }catch(e){
    res.status(401).json({ok:false,error:e instanceof Error?e.message:'Unauthorized'});
  }
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
import {app} from './app.js';
const port=Number(process.env.BACKEND_PORT || 8787);
app.listen(port,'0.0.0.0',()=>console.log('Backend listening on :' + port));

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
export async function synthesizeCloudflareTts(text:string,lang='vi'){
  const endpoint=process.env.CLOUDFLARE_AI_TTS_URL || ((process.env.PUBLIC_APP_URL || 'https://hendy-video-studio-pro.ngogiaidy56.workers.dev') + '/api/ai/tts');
  const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({text,lang})});
  if(!response.ok) throw new Error('Cloudflare TTS failed: '+response.status+' '+await response.text());
  const contentType=response.headers.get('content-type') || 'audio/mpeg';
  const buffer=Buffer.from(await response.arrayBuffer());
  return {mimeType:contentType,base64:buffer.toString('base64'),bytes:buffer.byteLength};
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

export function issueOtp(scope:string,ttlSeconds=60):string{
  return deriveOtp(scope,Math.floor(Date.now()/(ttlSeconds*1000)));
}

export function verifyOtp(scope:string,otp:string,ttlSeconds=60):boolean{
  const step=Math.floor(Date.now()/(ttlSeconds*1000));
  return constantTimeEqual(deriveOtp(scope,step),otp) || constantTimeEqual(deriveOtp(scope,step-1),otp);
}

function deriveOtp(scope:string,step:number):string{
  const secret=process.env.MCP_OTP_SECRET;
  if(!secret) throw new Error('MCP_OTP_SECRET is not configured');
  const digest=crypto.createHmac('sha256',secret).update(scope+':'+step).digest('hex');
  return digest.slice(0,8).toUpperCase();
}

function constantTimeEqual(a:string,b:string):boolean{
  const x=Buffer.from(a); const y=Buffer.from(String(b).toUpperCase());
  return x.length===y.length && crypto.timingSafeEqual(x,y);
}

```

## `backend/src/services/r2Storage.ts`

```ts
import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import type {Readable} from 'node:stream';

const account = process.env.R2_ACCOUNT_ID || '';
const endpoint = process.env.R2_ENDPOINT || (account ? `https://${account}.r2.cloudflarestorage.com` : undefined);
const memoryStore = new Map<string, { buffer: Buffer; contentType: string }>();

function getClient(): S3Client | null {
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) return null;
  return new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

export const r2 = getClient();
const bucket = process.env.R2_BUCKET || 'ai-studio-pro';

export async function uploadToR2(key:string, body:Buffer|string|Readable, contentType='application/octet-stream') {
  const client = getClient();
  if (client) {
    try {
      await client.send(new PutObjectCommand({Bucket:bucket,Key:key,Body:body as never,ContentType:contentType}));
      return {bucket,key};
    } catch (err) {
      console.warn('R2 upload failed, falling back to memory store:', err);
    }
  }
  const buf = Buffer.isBuffer(body) ? body : Buffer.from(typeof body === 'string' ? body : '');
  memoryStore.set(key, { buffer: buf, contentType });
  return {bucket: 'memory', key};
}
export async function getFromR2(key:string) {
  const client = getClient();
  if (client) {
    return client.send(new GetObjectCommand({Bucket:bucket,Key:key}));
  }
  const item = memoryStore.get(key);
  if (!item) throw new Error(`Not found: ${key}`);
  return { Body: item.buffer, ContentType: item.contentType };
}

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

## `backend/src/worker.ts`

```ts
import { httpServerHandler } from 'cloudflare:node';
import { app } from './app.js';
app.listen(8787);
export default httpServerHandler({port:8787});

```

## `backend/tsconfig.json`

```json
{
  "compilerOptions":{"target":"ES2022","module":"NodeNext","moduleResolution":"NodeNext","outDir":"dist","strict":true,"esModuleInterop":true,"skipLibCheck":true,"types":["node"]},
  "include":["src/app.ts","src/server.ts","src/routes/**/*.ts","src/controllers/**/*.ts","src/services/**/*.ts"]
}

```

## `backend/wrangler.jsonc`

```jsonc
{
  "$schema": "../node_modules/wrangler/config-schema.json",
  "name": "hendy-video-studio-pro-backend",
  "main": "src/worker.ts",
  "compatibility_date": "2026-10-02",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "vars": {
    "APP_VERSION": "3.2.0",
    "FRONTEND_ORIGIN": "https://hendy-video-studio-pro.ngogiaidy56.workers.dev",
    "PUBLIC_APP_URL": "https://hendy-video-studio-pro.ngogiaidy56.workers.dev",
    "R2_BUCKET": "hendy-video-studio-pro-media",
    "R2_ACCOUNT_ID": "918ff2f016938fc978ed23b96505b21e",
    "R2_ENDPOINT": "https://918ff2f016938fc978ed23b96505b21e.r2.cloudflarestorage.com",
    "MAX_AI_UPLOAD_BYTES": "104857600",
    "TELEGRAM_OTP_TTL_SECONDS": "60"
  },
  "secrets": {
    "required": [
      "GEMINI_API_KEY",
      "TELEGRAM_BOT_TOKEN",
      "R2_ACCESS_KEY_ID",
      "R2_SECRET_ACCESS_KEY",
      "ADMIN_USER_IDS",
      "MCP_OTP_SECRET"
    ]
  },
  "dev": {
    "port": 8787
  }
}

```

## `capacitor.config.ts`

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.aistudiopro.vietsub",
  appName: "Hendy Video Studio Pro",
  webDir: 'dist',
  bundledWebRuntime: false,
  server: { androidScheme: 'https', iosScheme: 'https' }
};

export default config;

```

## `docs/EDITOR_AI_PIPELINE.md`

```md
# Editor AI Pipeline v3.2.0

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
# Telegram Worker v3.2.0

Telegram runtime for Hendy Video Studio Pro. It is a Cloudflare Worker, not a Node/Express server.

## Cloudflare Build

``\`text
Root directory: /example_bot/
Build command: bun run build
Deploy command: bunx wrangler deploy --config wrangler.jsonc
``\`

## Required Secrets

``\`text
TELEGRAM_BOT_TOKEN
ADMIN_USER_IDS
MCP_OTP_SECRET
TELEGRAM_SECRET_TOKEN
``\`

D1 is bound as `DB` using the database configured in `example_bot/wrangler.jsonc`.

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
{
  "name": "@hendy/telegram-worker",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "prebuild": "node ../system-config/scripts/sync-config.mjs --sync",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "deploy": "wrangler deploy --config wrangler.jsonc"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "5.20260927.1",
    "typescript": "^5.9.3",
    "wrangler": "4.141.0"
  }
}

```

## `example_bot/schema.js`

```js
export const incidentsSchema={name:'incidents',fields:{id:'string',created_at:'number',level:'string',message:'string',commit_sha:'string|null'}};

```

## `example_bot/src/worker.ts`

```ts
export interface Env {
  TELEGRAM_BOT_TOKEN: string;
  ADMIN_USER_IDS?: string;
  ADMIN_ID?: string; // legacy alias
  APP_VERSION?: string;
  TELEGRAM_SECRET_TOKEN?: string;
  ADMIN_APP_URL?: string;
  MCP_OTP_SECRET?: string;
  DB?: D1Database;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/health' || url.pathname === '/telegram/health') {
      return Response.json({ ok: true, service: 'telegram-bot', version: env.APP_VERSION || '3.2.0' });
    }

    if (request.method !== 'POST' || (url.pathname !== '/webhook' && url.pathname !== '/telegram/webhook')) {
      return new Response('Not Found', { status: 404 });
    }

    const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (env.TELEGRAM_SECRET_TOKEN && secretToken !== env.TELEGRAM_SECRET_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      const update = (await request.json()) as any;

      if (update.message) {
        ctx.waitUntil(handleMessage(update.message, env));
      }

      if (update.callback_query) {
        ctx.waitUntil(handleCallbackQuery(update.callback_query, env));
      }

      return new Response('OK', { status: 200 });
    } catch (err: unknown) {
      console.error('Lỗi xử lý Webhook:', err);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};

// ==========================================
// 1. GIAO DIỆN HỆ THỐNG & ĐIỀU HÀNH
// ==========================================

// Giao diện Menu Chính
function getMainMenuData(firstName: string, isAdmin = false, version = '3.2.0') {
  const text =
    `👋 <b>Xin chào ${escapeHtml(firstName)}!</b>\n\n` +
    `Chào mừng bạn đến với <b>Trung tâm kiểm soát hệ thống (SOT v${version})</b>.\n` +
    `<i>Nguồn chuẩn duy nhất - Điều hành CRM</i>`;

  const inline_keyboard: Array<Array<{ text: string; callback_data?: string; url?: string }>> = [
    [
      { text: '🎛️ Trung tâm Kiểm soát SOT', callback_data: 'view_sot_panel' },
      { text: '💼 Điều hành CRM', callback_data: 'view_crm' }
    ],
    [
      { text: '🎬 Mở Video Studio Pro', url: 'https://hendy-video-studio-pro.ngogiaidy56.workers.dev' },
      { text: '📊 Trạng thái SOT', callback_data: 'view_sot' }
    ]
  ];

  if (isAdmin) {
    inline_keyboard.push([
      { text: '⚙️ Bảng Điều Khiển Admin', callback_data: 'refresh_admin' }
    ]);
  }

  return { text, replyMarkup: { inline_keyboard } };
}

// Bảng Trung tâm Kiểm soát SOT
async function getSOTControlPanelData(env: Env, version = env.APP_VERSION || '3.2.0') {
  const wsUrl = (await getSetting(env, 'ws_url')) || 'ws://127.0.0.1:8799/ws';
  const dryRunStatus = (await getSetting(env, 'dry_run_status')) || 'CHỜ LỆNH';
  const sandboxStatus = (await getSetting(env, 'sandbox_status')) || '🔴 NGOẠI TUYẾN';

  const text =
    `🛡️ <b>TRUNG TÂM KIỂM SOÁT HỆ THỐNG</b> | <code>SOT v${version}</code>\n` +
    `<i>Nguồn chuẩn duy nhất - ĐIỀU HÀNH CRM</i>\n\n` +
    `🛡️ <b>Cổng kiểm định phát hành:</b> <code>${dryRunStatus}</code>\n` +
    `📡 <b>Môi trường Sandbox:</b> <b>${sandboxStatus}</b>\n` +
    `🔌 <b>Cổng WebSocket:</b> <code>${wsUrl}</code>\n` +
    `📱 <b>Nền tảng:</b> WEB | PWA | ANDROID | IOS\n\n` +
    `<i>Bấm nút bên dưới để phát lệnh điều khiển:</i>`;

  const replyMarkup = {
    inline_keyboard: [
      [
        { text: '🧪 KIỂM TRA (DRY-RUN)', callback_data: 'sot_dry_run' },
        { text: '🛠️ TỰ ĐỘNG VÁ', callback_data: 'sot_auto_patch' }
      ],
      [
        { text: '🔑 ĐỒNG BỘ TẤT CẢ', callback_data: 'sot_sync_all' }
      ],
      [
        { text: '⚡ Đổi Trạng Thái Sandbox', callback_data: 'sot_toggle_sandbox' },
        { text: '📜 Nhật ký Telemetry', callback_data: 'sot_telemetry' }
      ],
      [
        { text: '◀️ Quay lại Menu Chính', callback_data: 'back_to_main' }
      ]
    ]
  };

  return { text, replyMarkup };
}

// Bảng Điều khiển Admin
async function getAdminPanelData(env: Env) {
  const isMaint = (await getSetting(env, 'maintenance')) === '1';
  const statusBadge = isMaint ? '🔴 ĐANG BẢO TRÌ' : '🟢 HOẠT ĐỘNG BÌNH THƯỜNG';
  const toggleBtnText = isMaint ? '🟢 Mở lại Hệ thống' : '🔴 Bật Chế độ Bảo trì';

  const text =
    `⚙️ <b>BẢNG ĐIỀU HÀNH ADMIN</b>\n\n` +
    `ID Admin: <code>${escapeHtml(adminIdsLabel(env))}</code>\n` +
    `Trạng thái máy chủ: <b>${statusBadge}</b>\n\n` +
    `<i>Chọn tác vụ quản trị:</i>`;

  const replyMarkup = {
    inline_keyboard: [
      [{ text: toggleBtnText, callback_data: 'toggle_maint' }],
      [
        { text: '📊 Thống kê D1', callback_data: 'view_stats' },
        { text: '🔄 Tải lại Bảng Admin', callback_data: 'refresh_admin' }
      ],
      [
        { text: '◀️ Quay lại Menu Chính', callback_data: 'back_to_main' }
      ]
    ]
  };

  return { text, replyMarkup };
}

// ==========================================
// 2. XỬ LÝ TIN NHẮN VĂN BẢN (INCOMING MESSAGES)
// ==========================================
async function handleMessage(message: any, env: Env): Promise<void> {
  const chatId = message.chat?.id;
  const userId = message.from?.id;
  if (!chatId || !userId) return;

  const username = message.from?.username || '';
  const firstName = message.from?.first_name || '';
  const text = String(message.text || '').trim();
  const isAdmin = isAdminUser(env, userId);

  // Lưu thông tin người dùng và lịch sử chat vào D1
  try {
    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO users (user_id, username, first_name)
        VALUES (?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
          username = excluded.username,
          first_name = excluded.first_name
      `).bind(userId, username, firstName).run();

      await env.DB.prepare(`
        INSERT INTO logs (user_id, message) VALUES (?, ?)
      `).bind(userId, text).run();
    }
  } catch (err) {
    console.error('Lỗi lưu D1:', err);
  }

  // Cấu hình đổi WebSocket URL trực tiếp bằng cách nhắn văn bản bắt đầu bằng ws:// hoặc wss://
  if (isAdmin && (text.startsWith('ws://') || text.startsWith('wss://'))) {
    await setSetting(env, 'ws_url', text.trim());
    await logEvent(env, userId, `Cập nhật Cổng WebSocket thành: ${text.trim()}`);
    await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, `✅ <b>Đã cập nhật Cổng WebSocket mới:</b>\n<code>${text.trim()}</code>`);
    return;
  }

  // Kiểm tra Chế độ Bảo trì
  const isMaint = (await getSetting(env, 'maintenance')) === '1';
  if (isMaint && !isAdmin) {
    await sendMessage(
      env.TELEGRAM_BOT_TOKEN,
      chatId,
      '🚧 <b>HỆ THỐNG ĐANG BẢO TRÌ</b>\n\nHệ thống đang nâng cấp. Vui lòng quay lại sau ít phút!'
    );
    return;
  }

  // Lệnh /admin
  if (isAdmin && text === '/admin') {
    const { text: adminText, replyMarkup } = await getAdminPanelData(env);
    await sendMessageWithKeyboard(env.TELEGRAM_BOT_TOKEN, chatId, adminText, replyMarkup);
    return;
  }

  // Lệnh /start hoặc tin nhắn khác: hiển thị Menu Chính
  const { text: mainText, replyMarkup } = getMainMenuData(firstName, isAdmin, env.APP_VERSION || '3.2.0');
  await sendMessageWithKeyboard(env.TELEGRAM_BOT_TOKEN, chatId, mainText, replyMarkup);
}

// ==========================================
// 3. XỬ LÝ SỰ KIỆN NÚT BẤM (INLINE CALLBACKS)
// ==========================================
async function handleCallbackQuery(callbackQuery: any, env: Env): Promise<void> {
  const queryId = callbackQuery.id;
  const userId = callbackQuery.from?.id;
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const firstName = callbackQuery.from?.first_name || '';
  const action = callbackQuery.data;
  const isAdmin = isAdminUser(env, userId);

  if (!chatId || !messageId) return;

  await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId);

  // 1. Nút Quay lại Menu Chính
  if (action === 'back_to_main') {
    const { text, replyMarkup } = getMainMenuData(firstName, isAdmin, env.APP_VERSION || '3.2.0');
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 2. Mở Trung tâm Kiểm soát SOT Panel
  if (action === 'view_sot_panel') {
    const { text, replyMarkup } = await getSOTControlPanelData(env, env.APP_VERSION || '3.2.0');
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 3. Tác vụ: KIỂM TRA (DRY-RUN)
  if (action === 'sot_dry_run') {
    await setSetting(env, 'dry_run_status', 'ĐANG KIỂM TRA (RUNNING)');
    await logEvent(env, userId, 'Chạy kiểm định Dry-Run');
    await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId, '🧪 Đã phát lệnh Kiểm tra Dry-Run!');

    const { text, replyMarkup } = await getSOTControlPanelData(env, env.APP_VERSION || '3.2.0');
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 4. Tác vụ: TỰ ĐỘNG VÁ
  if (action === 'sot_auto_patch') {
    await logEvent(env, userId, 'Kích hoạt Tự động vá lỗi SOT');
    await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId, '🛠️ Tiến trình Tự động vá lỗi đã bắt đầu!', true);
    return;
  }

  // 5. Tác vụ: ĐỒNG BỘ TẤT CẢ
  if (action === 'sot_sync_all') {
    await logEvent(env, userId, 'Đồng bộ toàn bộ WebSocket, CRM & D1');
    await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId, '🔑 Đã phát lệnh Đồng bộ tất cả kênh dữ liệu!');
    return;
  }

  // 6. Tác vụ: Đổi Trạng thái Sandbox
  if (action === 'sot_toggle_sandbox') {
    const currentStatus = await getSetting(env, 'sandbox_status');
    const newStatus = currentStatus && currentStatus.includes('TRỰC TUYẾN')
      ? '🔴 NGOẠI TUYẾN'
      : '🟢 TRỰC TUYẾN (ws://127.0.0.1:8799/ws)';
    await setSetting(env, 'sandbox_status', newStatus);
    await logEvent(env, userId, `Chuyển trạng thái Sandbox: ${newStatus}`);

    const { text, replyMarkup } = await getSOTControlPanelData(env, env.APP_VERSION || '3.2.0');
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 7. Tác vụ: Xem Nhật ký Telemetry
  if (action === 'sot_telemetry') {
    let logLines = '<i>Chưa có dữ liệu sự kiện.</i>';
    try {
      if (env.DB) {
        const logs = await env.DB.prepare('SELECT message, created_at FROM logs ORDER BY id DESC LIMIT 6').all<{ message: string; created_at: string }>();
        if (logs && logs.results && logs.results.length > 0) {
          logLines = logs.results.map(l => `• <code>[${l.created_at || 'Mới'}]</code> ${escapeHtml(l.message)}`).join('\n');
        }
      }
    } catch (e) {
      console.error('Lỗi đọc logs:', e);
    }

    const telemetryText =
      `📜 <b>NHẬT KÝ SỰ KIỆN (TELEMETRY)</b>\n\n${logLines}\n\n` +
      `<i>Gửi tin nhắn bắt đầu bằng <code>ws://</code> để đổi Cổng WebSocket.</i>`;

    const replyMarkup = {
      inline_keyboard: [
        [{ text: '🔄 Làm mới Logs', callback_data: 'sot_telemetry' }],
        [
          { text: '◀️ Quay lại SOT Panel', callback_data: 'view_sot_panel' },
          { text: '🏠 Menu Chính', callback_data: 'back_to_main' }
        ]
      ]
    };

    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, telemetryText, replyMarkup);
    return;
  }

  // 8. Giao diện Điều hành CRM
  if (action === 'view_crm') {
    const crmText =
      `💼 <b>ĐIỀU HÀNH CRM HỆ THỐNG</b>\n\n` +
      `🌐 <b>Trạng thái phân hệ:</b> ĐANG HOẠT ĐỘNG\n` +
      `📡 <b>Webhook Hub:</b> Cloudflare Workers -> Telegram Bot\n` +
      `🗄️ <b>Cơ sở dữ liệu:</b> Cloudflare D1 Storage\n\n` +
      `<i>Chọn thao tác điều hành:</i>`;

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: '🔑 Đồng bộ CRM', callback_data: 'sot_sync_all' },
          { text: '📊 Thống kê CRM', callback_data: 'view_stats' }
        ],
        [{ text: '◀️ Quay lại Menu Chính', callback_data: 'back_to_main' }]
      ]
    };

    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, crmText, replyMarkup);
    return;
  }

  // 9. Xem Trạng thái SOT
  if (action === 'view_sot') {
    const sotText =
      `📊 <b>TRẠNG THÁI HỆ THỐNG SOT</b>\n\n` +
      `🟢 WebSocket Hub (Port 8799): <b>ONLINE</b>\n` +
      `🟢 Express API (Port 3000): <b>ONLINE</b>\n` +
      `🟢 Cloudflare Worker: <b>ACTIVE</b>\n` +
      `🟢 D1 Database: <b>CONNECTED</b>`;

    const replyMarkup = {
      inline_keyboard: [
        [{ text: '◀️ Quay lại Menu Chính', callback_data: 'back_to_main' }]
      ]
    };

    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, sotText, replyMarkup);
    return;
  }

  // Kiểm tra quyền Admin đối với các chức năng Admin
  if (!isAdmin && (action === 'toggle_maint' || action === 'refresh_admin' || action === 'view_stats')) {
    await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId, '⚠️ Bạn không có quyền Admin!', true);
    return;
  }

  // 10. Bảng Admin
  if (action === 'refresh_admin') {
    const { text, replyMarkup } = await getAdminPanelData(env);
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 11. Bật/tắt bảo trì
  if (action === 'toggle_maint') {
    const currentStatus = await getSetting(env, 'maintenance');
    const newStatus = currentStatus === '1' ? '0' : '1';
    await setSetting(env, 'maintenance', newStatus);

    const { text, replyMarkup } = await getAdminPanelData(env);
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 12. Xem thống kê D1
  if (action === 'view_stats') {
    let userCount = 0;
    let logCount = 0;
    try {
      if (env.DB) {
        const u = await env.DB.prepare('SELECT COUNT(*) as count FROM users').first<{ count: number }>();
        const l = await env.DB.prepare('SELECT COUNT(*) as count FROM logs').first<{ count: number }>();
        userCount = u?.count ?? 0;
        logCount = l?.count ?? 0;
      }
    } catch (e) {
      console.error('Lỗi thống kê D1:', e);
    }

    const statsText =
      `📊 <b>THỐNG KÊ CƠ SỞ DỮ LIỆU D1</b>\n\n` +
      `👥 Tổng người dùng: <code>${userCount}</code>\n` +
      `💬 Tổng nhật ký tin nhắn: <code>${logCount}</code>`;

    const replyMarkup = {
      inline_keyboard: [
        [{ text: '◀️ Quay lại Admin Panel', callback_data: 'refresh_admin' }],
        [{ text: '🏠 Quay lại Menu Chính', callback_data: 'back_to_main' }]
      ]
    };

    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, statsText, replyMarkup);
    return;
  }
}

// ==========================================
// 4. HELPERS CƠ SỞ DỮ LIỆU D1
// ==========================================
async function getSetting(env: Env, key: string): Promise<string | null> {
  try {
    if (env.DB) {
      const row = await env.DB.prepare('SELECT value FROM settings WHERE key = ?').bind(key).first<{ value: string }>();
      return row ? row.value : null;
    }
  } catch (e) {
    return null;
  }
  return null;
}

async function setSetting(env: Env, key: string, value: string): Promise<void> {
  try {
    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO settings (key, value) VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `).bind(key, value).run();
    }
  } catch (e) {
    console.error('Lỗi setSetting:', e);
  }
}

async function logEvent(env: Env, userId: number | string, eventMessage: string): Promise<void> {
  try {
    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO logs (user_id, message) VALUES (?, ?)
      `).bind(userId, `[SOT LOG] ${eventMessage}`).run();
    }
  } catch (e) {
    console.error('Lỗi logEvent:', e);
  }
}

// ==========================================
// 5. HELPERS TELEGRAM BOT API
// ==========================================
async function sendMessage(token: string, chatId: number | string, text: string): Promise<void> {
  if (!token) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
  });
}

async function sendMessageWithKeyboard(
  token: string,
  chatId: number | string,
  text: string,
  replyMarkup: unknown
): Promise<void> {
  if (!token) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', reply_markup: replyMarkup })
  });
}

async function editMessageText(
  token: string,
  chatId: number | string,
  messageId: number,
  text: string,
  replyMarkup: unknown = null
): Promise<void> {
  if (!token) return;
  const payload: Record<string, unknown> = { chat_id: chatId, message_id: messageId, text, parse_mode: 'HTML' };
  if (replyMarkup) payload.reply_markup = replyMarkup;

  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

async function answerCallbackQuery(
  token: string,
  callbackQueryId: string,
  text = '',
  showAlert = false
): Promise<void> {
  if (!token) return;
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text, show_alert: showAlert })
  });
}


function adminIds(env: Env): Set<string> {
  const raw = env.ADMIN_USER_IDS || env.ADMIN_ID || '';
  return new Set(raw.split(',').map(v => v.trim()).filter(Boolean));
}

function isAdminUser(env: Env, userId: number | string | undefined): boolean {
  return userId != null && adminIds(env).has(String(userId));
}

function adminIdsLabel(env: Env): string {
  const ids = [...adminIds(env)];
  return ids.length ? ids.join(', ') : 'Chưa thiết lập';
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

```

## `example_bot/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "types": ["@cloudflare/workers-types"],
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src/**/*"]
}

```

## `example_bot/wrangler.jsonc`

```jsonc
{
  "$schema": "../node_modules/wrangler/config-schema.json",
  "name": "hendy-video-studio-pro-telegram",
  "main": "src/worker.ts",
  "compatibility_date": "2026-10-02",
  "vars": {
    "APP_VERSION": "3.2.0",
    "ADMIN_APP_URL": "https://hendy-video-studio-pro.ngogiaidy56.workers.dev"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "databaseName": "telegram-bot-db",
      "databaseId": "4925d076-24b7-4d08-a63c-342766ba4036"
    }
  ],
  "secrets": {
    "required": [
      "TELEGRAM_BOT_TOKEN",
      "ADMIN_USER_IDS",
      "MCP_OTP_SECRET",
      "TELEGRAM_SECRET_TOKEN"
    ]
  },
  "dev": {
    "port": 8791
  }
}

```

## `frontend/index.html`

```html
<!doctype html><html lang="vi"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"/><meta name="theme-color" content="#070b12"/><meta name="mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-capable" content="yes"/><link rel="manifest" href="/manifest.json"/><title>Hendy Video Studio Pro</title><meta name="description" content="AI video editor, Vietnamese subtitles, TTS voiceover, multi-channel audio and Cloudflare production workspace."/><script src="https://telegram.org/js/telegram-web-app.js"></script></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>

```

## `frontend/package.json`

```json
{
  "name": "@hendy/frontend",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.4",
    "lucide-react": "^1.48.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3",
    "vite": "^7.3.6"
  }
}

```

## `frontend/public/manifest.json`

```json
{
  "name": "Hendy Video Studio Pro",
  "short_name": "Hendy Studio Pro",
  "description": "AI video editor, Vietnamese subtitles, TTS voiceover, multi-channel audio and Cloudflare production workspace.",
  "lang": "vi",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "any",
  "theme_color": "#070b12",
  "background_color": "#070b12",
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
const CACHE="hendy-studio-3-2-0";
const SHELL=['/','/manifest.json'];
const BYPASS=/^\/(api|mcp|telegram)(\/|$)/;
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin||BYPASS.test(new URL(r.url).pathname))return;if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{caches.open(CACHE).then(c=>c.put(r,res.clone()));return res}).catch(()=>caches.match('/')));return;}e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(res=>{if(res.ok)caches.open(CACHE).then(c=>c.put(r,res.clone()));return res})));});

```

## `frontend/src/App.tsx`

```tsx
import { useEffect, useMemo, useReducer, useRef, useState, useCallback } from 'react';
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
import { ProjectSettingsModal } from './components/editor/ProjectSettingsModal';
import { SubtitleTableModal } from './components/editor/SubtitleTableModal';
import { buildRenderManifest } from './services/renderManifest';
import { api } from './services/api';
import { toAss, toSrt, toVtt, downloadText } from './utils/subtitleExporter';
import { exportCanvasVideo } from './utils/videoRenderer';
import { drawSubtitle, type SubtitleStyle } from './utils/subBurner';
import { generateGeminiTts, transcribeAudioFile, enhanceVietnamese } from './services/ai';
import {
  loadStoredProject,
  saveProjectToStorage,
  DEFAULT_PROJECT
} from './services/projectStorage';
import type { Clip, Project } from './types/project';

type State = {
  project: Project;
  selectedId?: string;
  currentTimeMs: number;
  theme: 'dark' | 'light';
};

type Action =
  | { type: 'select'; id?: string }
  | { type: 'seek'; time: number }
  | { type: 'theme' }
  | { type: 'set_project'; project: Project }
  | { type: 'update_project_meta'; patch: Partial<Project> }
  | { type: 'add_clips'; clips: Clip[] }
  | { type: 'patch_clip'; id: string; patch: Partial<Clip> }
  | { type: 'delete_clip'; id: string }
  | { type: 'split_clip'; id: string; splitAtMs: number }
  | { type: 'duplicate_clip'; id: string }
  | { type: 'add_subtitle_cue'; timeMs: number };

function getInitialState(): State {
  const stored = loadStoredProject();
  return {
    project: stored ? stored.project : DEFAULT_PROJECT,
    selectedId: stored?.project.clips[0]?.id || DEFAULT_PROJECT.clips[0]?.id,
    currentTimeMs: 0,
    theme: 'dark'
  };
}

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'select':
      return { ...s, selectedId: a.id };

    case 'seek':
      return { ...s, currentTimeMs: Math.max(0, a.time) };

    case 'theme':
      return { ...s, theme: s.theme === 'dark' ? 'light' : 'dark' };

    case 'set_project':
      return {
        ...s,
        project: a.project,
        selectedId: a.project.clips[0]?.id,
        currentTimeMs: 0
      };

    case 'update_project_meta':
      return {
        ...s,
        project: {
          ...s.project,
          ...a.patch
        }
      };

    case 'add_clips':
      return {
        ...s,
        project: {
          ...s.project,
          clips: [...s.project.clips, ...a.clips]
        }
      };

    case 'patch_clip':
      return {
        ...s,
        project: {
          ...s.project,
          clips: s.project.clips.map(c => (c.id === a.id ? { ...c, ...a.patch } : c))
        }
      };

    case 'delete_clip':
      return {
        ...s,
        selectedId: s.selectedId === a.id ? undefined : s.selectedId,
        project: {
          ...s.project,
          clips: s.project.clips.filter(c => c.id !== a.id)
        }
      };

    case 'split_clip': {
      const target = s.project.clips.find(c => c.id === a.id);
      if (!target || a.splitAtMs <= target.startMs || a.splitAtMs >= target.endMs) return s;
      const firstPart: Clip = {
        ...target,
        endMs: Math.round(a.splitAtMs),
        label: `${target.label} (Phần 1)`
      };
      const secondPart: Clip = {
        ...target,
        id: crypto.randomUUID(),
        startMs: Math.round(a.splitAtMs),
        label: `${target.label} (Phần 2)`
      };
      return {
        ...s,
        selectedId: secondPart.id,
        project: {
          ...s.project,
          clips: s.project.clips.map(c => (c.id === a.id ? firstPart : c)).concat(secondPart)
        }
      };
    }

    case 'duplicate_clip': {
      const target = s.project.clips.find(c => c.id === a.id);
      if (!target) return s;
      const duration = target.endMs - target.startMs;
      const clone: Clip = {
        ...target,
        id: crypto.randomUUID(),
        label: `${target.label} (Bản sao)`,
        startMs: target.endMs + 200,
        endMs: target.endMs + 200 + duration
      };
      return {
        ...s,
        selectedId: clone.id,
        project: {
          ...s.project,
          clips: [...s.project.clips, clone]
        }
      };
    }

    case 'add_subtitle_cue': {
      const cueStart = Math.round(a.timeMs);
      const cueEnd = cueStart + 3000;
      const count = s.project.clips.filter(c => c.kind === 'subtitle').length;
      const newCue: Clip = {
        id: crypto.randomUUID(),
        track: 2,
        kind: 'subtitle',
        startMs: cueStart,
        endMs: cueEnd,
        label: `Phụ đề ${count + 1}`,
        text: 'Nội dung phụ đề mới'
      };
      return {
        ...s,
        selectedId: newCue.id,
        project: {
          ...s.project,
          clips: [...s.project.clips, newCue]
        }
      };
    }

    default:
      return s;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const [status, setStatus] = useState('CHUẨN (NOMINAL)');
  const [lastSavedAt, setLastSavedAt] = useState<string | undefined>(() => {
    const stored = loadStoredProject();
    return stored?.savedAt;
  });

  // Modal visibility states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSubtitlesOpen, setIsSubtitlesOpen] = useState(false);

  // Undo / Redo stacks
  const undoStackRef = useRef<Project[]>([]);
  const redoStackRef = useRef<Project[]>([]);
  const [historyCount, setHistoryCount] = useState({ undo: 0, redo: 0 });

  const params = useMemo(() => new URLSearchParams(location.search), []);
  const admin = params.get('admin') === 'true';
  const selected = state.project.clips.find(c => c.id === state.selectedId);

  // Auto-save whenever state.project changes
  const saveTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => {
      const savedTime = saveProjectToStorage(state.project);
      setLastSavedAt(savedTime);
    }, 400);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state.project]);

  // Dispatch helper that tracks project history for Undo/Redo
  const dispatchWithHistory = useCallback((action: Action) => {
    const isProjectMutation =
      action.type === 'add_clips' ||
      action.type === 'patch_clip' ||
      action.type === 'delete_clip' ||
      action.type === 'split_clip' ||
      action.type === 'duplicate_clip' ||
      action.type === 'add_subtitle_cue' ||
      action.type === 'update_project_meta';

    if (isProjectMutation) {
      undoStackRef.current.push(JSON.parse(JSON.stringify(state.project)));
      if (undoStackRef.current.length > 30) undoStackRef.current.shift();
      redoStackRef.current = [];
      setHistoryCount({
        undo: undoStackRef.current.length,
        redo: 0
      });
    }

    dispatch(action);
  }, [state.project]);

  const handleUndo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;
    const prev = undoStackRef.current.pop()!;
    redoStackRef.current.push(JSON.parse(JSON.stringify(state.project)));
    setHistoryCount({
      undo: undoStackRef.current.length,
      redo: redoStackRef.current.length
    });
    dispatch({ type: 'set_project', project: prev });
  }, [state.project]);

  const handleRedo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;
    const next = redoStackRef.current.pop()!;
    undoStackRef.current.push(JSON.parse(JSON.stringify(state.project)));
    setHistoryCount({
      undo: undoStackRef.current.length,
      redo: redoStackRef.current.length
    });
    dispatch({ type: 'set_project', project: next });
  }, [state.project]);

  // Global Keyboard Shortcuts (Undo/Redo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  const onUpload = (file: File) => {
    const isAudio = file.type.startsWith('audio/');
    const isVideo = file.type.startsWith('video/');
    const kind = isAudio ? 'audio' : 'video';
    const track = isAudio ? 1 : 0;
    dispatchWithHistory({
      type: 'add_clips',
      clips: [
        {
          id: crypto.randomUUID(),
          track,
          kind,
          startMs: 0,
          endMs: 8000,
          label: file.name
        }
      ]
    });
  };

  const transcribe = async (file: File) => {
    setStatus('ĐANG NHẬN DẠNG…');
    try {
      const r = await transcribeAudioFile(file);
      dispatchWithHistory({
        type: 'add_clips',
        clips: r.cues.map((c, i) => ({
          id: crypto.randomUUID(),
          track: 2,
          kind: 'subtitle' as const,
          startMs: c.startMs,
          endMs: c.endMs,
          label: `Phụ đề ${i + 1}`,
          text: c.text
        }))
      });
      setStatus('CHUẨN (NOMINAL)');
    } catch {
      setStatus('LỖI NHẬN DẠNG (STT)');
    }
  };

  const generateTts = async (clip: Clip) => {
    if (!clip.text) return;
    setStatus('ĐANG TẠO GIỌNG ĐỌC…');
    try {
      const r = await generateGeminiTts(clip.text, {
        voice: 'Kore',
        style: 'natural cinematic Vietnamese narration'
      });
      const bytes = Uint8Array.from(atob(r.base64), c => c.charCodeAt(0));
      const url = URL.createObjectURL(new Blob([bytes], { type: r.mimeType }));
      dispatchWithHistory({
        type: 'add_clips',
        clips: [
          {
            id: crypto.randomUUID(),
            track: 3,
            kind: 'audio',
            startMs: clip.startMs,
            endMs: clip.startMs + Math.max(900, clip.endMs - clip.startMs),
            label: `Giọng đọc · ${clip.label}`,
            assetId: url
          }
        ]
      });
      setStatus('CHUẨN (NOMINAL)');
    } catch {
      setStatus('LỖI GIỌNG ĐỌC (TTS)');
    }
  };

  const enhance = async (clip: Clip) => {
    if (!clip.text) return;
    setStatus('ĐANG TRAU CHUỐT…');
    try {
      const r = await enhanceVietnamese(clip.text);
      dispatchWithHistory({
        type: 'patch_clip',
        id: clip.id,
        patch: { text: r.text }
      });
      setStatus('CHUẨN (NOMINAL)');
    } catch {
      setStatus('LỖI TRAU CHUỐT');
    }
  };

  const optimize = async (channels: Record<string, unknown>) => {
    setStatus('ĐANG TỐI ƯU MIX…');
    try {
      const r = await api<Record<string, unknown>>('/api/gemini/audio-mix', {
        method: 'POST',
        body: JSON.stringify({
          channels: Object.entries(channels).map(([id, v]) => ({ id, ...(v as object) })),
          voicePresent: true
        })
      });
      setStatus('CHUẨN (NOMINAL)');
      return r;
    } catch {
      setStatus('AI NGOẠI TUYẾN');
    }
  };

  const exportSub = (kind: 'srt' | 'vtt' | 'ass') => {
    const cues = state.project.clips
      .filter(c => c.kind === 'subtitle' && c.text)
      .sort((a, b) => a.startMs - b.startMs)
      .map(c => ({
        startMs: c.startMs,
        endMs: c.endMs,
        text: c.text!
      }));
    const text = kind === 'srt' ? toSrt(cues) : kind === 'vtt' ? toVtt(cues) : toAss(cues);
    const safeName = (state.project.name || 'vietsub').toLowerCase().replace(/\s+/g, '-');
    downloadText(text, `${safeName}-${state.project.id.slice(0, 8)}.${kind}`, 'text/plain;charset=utf-8');
  };

  const exportVideo = async () => {
    const canvas = document.querySelector('canvas');
    if (!(canvas instanceof HTMLCanvasElement)) return;
    setStatus('ĐANG XUẤT VIDEO…');
    try {
      const duration = state.project.durationMs;
      const width = state.project.width || 1280;
      const height = state.project.height || 720;

      const blob = await exportCanvasVideo(
        canvas,
        (ctx, timeMs) => {
          // Background
          const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
          bgGrad.addColorStop(0, '#0a0f18');
          bgGrad.addColorStop(1, '#05070c');
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, width, height);

          // Watermark / title header
          ctx.fillStyle = '#22d3ee';
          ctx.font = 'bold 20px Inter, system-ui, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(`🎬 ${state.project.name || 'AI Studio Pro'}`, 30, 45);

          ctx.fillStyle = '#94a3b8';
          ctx.font = '16px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(`${(timeMs / 1000).toFixed(2)}s / ${(duration / 1000).toFixed(1)}s`, width - 30, 45);

          // Subtitle drawing with custom style
          const sub = state.project.clips.find(
            c => c.kind === 'subtitle' && c.startMs <= timeMs && c.endMs >= timeMs && c.text
          );
          if (sub) {
            const style: SubtitleStyle = {
              fontFamily: sub.style?.fontFamily || 'Arial, sans-serif',
              fontSize: sub.style?.fontSize || 42,
              color: sub.style?.color || '#ffffff',
              strokeColor: sub.style?.strokeColor || '#000000',
              strokeWidth: sub.style?.strokeWidth ?? 6,
              bottomPx: sub.style?.bottomPx || 55
            };
            drawSubtitle(ctx, sub.text!, style, width, height);
          }
        },
        duration,
        state.project.fps
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = blob.type.includes('mp4') ? 'mp4' : 'webm';
      const safeName = (state.project.name || 'video-xuat-ban').toLowerCase().replace(/\s+/g, '-');
      a.download = `${safeName}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus('CHUẨN (NOMINAL)');
    } catch {
      setStatus('LỖI XUẤT VIDEO');
    }
  };

  return (
    <SystemLayout>
      <div className="stack">
        <Header
          version={SYSTEM_CONFIG.app?.version || (SYSTEM_CONFIG as any).system?.version || '3.2.0'}
          admin={admin}
          projectName={state.project.name}
          lastSavedAt={lastSavedAt}
          canUndo={historyCount.undo > 0}
          canRedo={historyCount.redo > 0}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenSubtitles={() => setIsSubtitlesOpen(true)}
          actions={
            <>
              <button
                type="button"
                className="button"
                onClick={() => dispatch({ type: 'theme' })}
              >
                {state.theme === 'dark' ? 'GIAO DIỆN SÁNG' : 'GIAO DIỆN TỐI'}
              </button>
              <span className="status">● {status}</span>
            </>
          }
        />

        <div className="workspace">
          {/* Left Panel: Media Assets & Recording & STT */}
          <AssetSidebar
            onUpload={onUpload}
            onRecord={() => setStatus('THU ÂM BỊ CHẶN')}
            onTranscribe={transcribe}
          />

          {/* Center Main Panel: Canvas Video Player & Timeline */}
          <div className="stack">
            <CanvasPreview
              project={state.project}
              currentTimeMs={state.currentTimeMs}
              onSeek={time => dispatch({ type: 'seek', time })}
            />

            <Timeline
              clips={state.project.clips}
              selectedId={state.selectedId}
              currentTimeMs={state.currentTimeMs}
              durationMs={state.project.durationMs}
              onSelect={id => dispatch({ type: 'select', id })}
              onSeek={time => dispatch({ type: 'seek', time })}
              onAddSubtitleAtPlayhead={() =>
                dispatchWithHistory({
                  type: 'add_subtitle_cue',
                  timeMs: state.currentTimeMs
                })
              }
              onSplitClip={(id, splitAtMs) =>
                dispatchWithHistory({ type: 'split_clip', id, splitAtMs })
              }
              onDeleteClip={id =>
                dispatchWithHistory({ type: 'delete_clip', id })
              }
              onDuplicateClip={id =>
                dispatchWithHistory({ type: 'duplicate_clip', id })
              }
            />
          </div>

          {/* Right Panel: Inspector & Multi-Channel Mixer & Exporter */}
          <div className="stack">
            <InspectorPanel
              clip={selected}
              onChange={patch =>
                selected &&
                dispatchWithHistory({
                  type: 'patch_clip',
                  id: selected.id,
                  patch
                })
              }
              onGenerateTts={generateTts}
              onEnhance={enhance}
              onDelete={id => dispatchWithHistory({ type: 'delete_clip', id })}
              onDuplicate={id => dispatchWithHistory({ type: 'duplicate_clip', id })}
            />

            <MultiChannelAudioMixer onAiOptimize={optimize} />

            {/* Export & Render Manifest Section */}
            <section className="panel stack">
              <strong>Xuất bản & Cấu hình dựng</strong>

              <button
                type="button"
                className="button primary"
                onClick={() =>
                  navigator.clipboard?.writeText(
                    JSON.stringify(buildRenderManifest(state.project), null, 2)
                  )
                }
              >
                Sao chép Manifest kết xuất
              </button>

              <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                <button
                  type="button"
                  className="button"
                  onClick={() => exportSub('srt')}
                  title="Xuất file phụ đề SubRip (.srt)"
                >
                  Xuất SRT
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => exportSub('vtt')}
                  title="Xuất file WebVTT (.vtt)"
                >
                  Xuất VTT
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => exportSub('ass')}
                  title="Xuất file Advanced SubStation Alpha (.ass)"
                >
                  Xuất ASS
                </button>
              </div>

              <button
                type="button"
                className="button"
                style={{ fontWeight: 'bold' }}
                onClick={exportVideo}
              >
                Xuất video xem trước (.mp4 / .webm)
              </button>
            </section>
          </div>
        </div>

        {/* Modals */}
        <ProjectSettingsModal
          project={state.project}
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onUpdateProject={patch =>
            dispatchWithHistory({ type: 'update_project_meta', patch })
          }
          onResetProject={() => {
            undoStackRef.current.push(JSON.parse(JSON.stringify(state.project)));
            redoStackRef.current = [];
            dispatch({
              type: 'set_project',
              project: { ...DEFAULT_PROJECT, id: crypto.randomUUID() }
            });
          }}
          onLoadProject={newProject => {
            undoStackRef.current.push(JSON.parse(JSON.stringify(state.project)));
            redoStackRef.current = [];
            dispatch({ type: 'set_project', project: newProject });
          }}
        />

        <SubtitleTableModal
          isOpen={isSubtitlesOpen}
          onClose={() => setIsSubtitlesOpen(false)}
          clips={state.project.clips}
          selectedId={state.selectedId}
          onSelectCue={id => dispatch({ type: 'select', id })}
          onSeek={time => dispatch({ type: 'seek', time })}
          onUpdateCueText={(id, text) =>
            dispatchWithHistory({ type: 'patch_clip', id, patch: { text } })
          }
          onDeleteCue={id => dispatchWithHistory({ type: 'delete_clip', id })}
          onAddCue={() =>
            dispatchWithHistory({
              type: 'add_subtitle_cue',
              timeMs: state.currentTimeMs
            })
          }
        />

        <PwaInstallBanner />
        <SystemControlPanel />
      </div>
    </SystemLayout>
  );
}

```

## `frontend/src/app.css`

```css
@import "tailwindcss";

*{box-sizing:border-box} body{margin:0;background:var(--dark-background-color);color:var(--text-color);font-family:Inter,system-ui,sans-serif}button,input,textarea{font:inherit}.system-main{max-width:1600px;margin:auto;padding:12px 12px 88px}.stack{display:flex;flex-direction:column;gap:10px}.row{display:flex;align-items:center;gap:8px}.panel{background:var(--dark-container-background-color);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:12px;box-shadow:0 8px 30px rgba(0,0,0,.18)}.muted{opacity:.65;font-size:12px}.button{border:1px solid rgba(255,255,255,.12);background:#2b2b2e;color:inherit;border-radius:10px;padding:8px 11px;cursor:pointer}.button.primary{background:var(--accent-color);color:#111;border-color:transparent}.status{font-size:12px;opacity:.8}.workspace{display:grid;grid-template-columns:240px minmax(360px,1fr) 360px;gap:10px;align-items:start}.track{position:relative;height:42px;margin-top:24px;background:#17171a;border-radius:8px}.clip{position:absolute;top:4px;height:34px;border:1px solid rgba(255,255,255,.12);background:#3b3b40;color:#fff;border-radius:7px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:7px;text-align:left;cursor:pointer}.clip.selected{outline:2px solid var(--accent-color)}.meter{height:5px;background:#111;border-radius:999px;overflow:hidden}.meter span{display:block;height:100%;background:var(--accent-color)}label{display:flex;flex-direction:column;gap:5px;font-size:12px}input,textarea{background:#17171a;color:inherit;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px}textarea{min-height:80px;resize:vertical}.dragging{outline:2px dashed var(--accent-color)}.bottom-action-dock{position:fixed;bottom:10px;left:50%;transform:translateX(-50%);display:flex;gap:6px;background:#232324e8;border:1px solid rgba(255,255,255,.08);padding:6px;border-radius:14px;backdrop-filter:blur(12px)}.bottom-action-dock button{background:transparent;color:#fff;border:0;padding:9px 14px}
@media(max-width:1100px){.workspace{grid-template-columns:200px minmax(0,1fr)}.workspace>.stack:last-child{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr}}@media(max-width:760px){.workspace{grid-template-columns:1fr}.workspace>.stack:last-child{grid-template-columns:1fr}.system-main{padding:8px 8px 90px}.bottom-action-dock{width:calc(100% - 16px);justify-content:space-around}.bottom-action-dock button{flex:1}}

```

## `frontend/src/components/editor/AssetSidebar.tsx`

```tsx
import { useRef, useState } from 'react';

export function AssetSidebar({onUpload,onRecord,onTranscribe}:{onUpload:(file:File)=>void;onRecord?:()=>void;onTranscribe?:(file:File)=>void}){
  const ref=useRef<HTMLInputElement>(null);
  const [drag,setDrag]=useState(false);
  const [recording,setRecording]=useState(false);
  const [deviceNotice,setDeviceNotice]=useState<string | null>(null);
  const recorder=useRef<MediaRecorder | undefined>(undefined);
  const streamRef=useRef<MediaStream | undefined>(undefined);
  const chunks=useRef<BlobPart[]>([]);
  const lastAudio=useRef<File | undefined>(undefined);

  const importFile=(file:File)=>{
    lastAudio.current=file.type.startsWith('audio/')?file:lastAudio.current;
    onUpload(file);
  };

  const startRecord=async()=>{
    if(recording)return;
    setDeviceNotice(null);
    if(!navigator.mediaDevices?.getUserMedia){
      setDeviceNotice('Trình duyệt hiện tại không hỗ trợ thu âm micro.');
      onRecord?.();
      return;
    }
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      streamRef.current=stream;
      const media=new MediaRecorder(stream);
      recorder.current=media;
      chunks.current=[];
      media.ondataavailable=e=>e.data.size&&chunks.current.push(e.data);
      media.onstop=()=>{
        const blob=new Blob(chunks.current,{type:media.mimeType||'audio/webm'});
        const file=new File([blob],`thu-am-${Date.now()}.webm`,{type:blob.type});
        stream.getTracks().forEach(t=>t.stop());
        streamRef.current=undefined;
        setRecording(false);
        importFile(file);
      };
      media.onerror=(e)=>{
        console.warn('Recording stream error:', e);
        setRecording(false);
        stream.getTracks().forEach(t=>t.stop());
        streamRef.current=undefined;
      };
      media.start();
      setRecording(true);
    }catch(err: unknown){
      setRecording(false);
      if(streamRef.current){
        streamRef.current.getTracks().forEach(t=>t.stop());
        streamRef.current=undefined;
      }
      const errObj = err as { name?: string; message?: string } | undefined;
      const name = errObj?.name || '';
      const msg = errObj?.message || String(err);
      if(name==='NotFoundError' || msg.includes('Requested device not found') || msg.toLowerCase().includes('not found')){
        setDeviceNotice('Không tìm thấy thiết bị micro. Bạn có thể tải tệp âm thanh trực tiếp.');
      } else if (name==='NotAllowedError' || name==='SecurityError'){
        setDeviceNotice('Quyền truy cập micro đã bị từ chối. Vui lòng cấp quyền hoặc tải file âm thanh.');
      } else {
        setDeviceNotice('Chưa thể thu âm micro. Vui lòng tải tệp âm thanh thay thế.');
      }
      onRecord?.();
    }
  };

  const stopRecord=()=>{
    try{
      if(recorder.current && recorder.current.state==='recording'){
        recorder.current.stop();
      }
    }catch(e){
      console.warn('Could not stop recorder cleanly:', e);
    }finally{
      if(streamRef.current){
        streamRef.current.getTracks().forEach(t=>t.stop());
        streamRef.current=undefined;
      }
      setRecording(false);
    }
  };

  return <section className={`panel stack ${drag?'dragging':''}`} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f)importFile(f)}}>
    <strong>Tài nguyên & Media</strong><button className="button primary" onClick={()=>ref.current?.click()}>Tải lên media</button>
    <button className="button" onClick={recording?stopRecord:startRecord}>{recording?'■ Dừng thu âm':'● Thu âm micro'}</button>
    {deviceNotice && (
      <div style={{fontSize:'12px',padding:'6px 10px',background:'rgba(240,80,80,0.12)',border:'1px solid rgba(240,80,80,0.3)',borderRadius:'6px',color:'#ff9999',lineHeight:1.4}}>
        ℹ️ {deviceNotice}
      </div>
    )}
    <button className="button" disabled={!lastAudio.current} onClick={()=>lastAudio.current&&onTranscribe?.(lastAudio.current)}>🧠 Chuyển giọng nói sang phụ đề (STT)</button>
    <input ref={ref} hidden type="file" accept="video/*,audio/*,image/*" onChange={e=>{const f=e.target.files?.[0];if(f)importFile(f)}}/>
    <div className="muted">Kéo thả video, âm thanh hoặc ảnh vào đây. File âm thanh mới nhất có thể chuyển thành phụ đề tự động (STT) và đưa lên Timeline.</div>
  </section>;
}

```

## `frontend/src/components/editor/AudioMixer.tsx`

```tsx
export { MultiChannelAudioMixer as AudioMixer } from './MultiChannelAudioMixer';

```

## `frontend/src/components/editor/CanvasPreview.tsx`

```tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import type { Clip, Project } from '../../types/project';
import { drawSubtitle, type SubtitleStyle } from '../../utils/subBurner';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Maximize2, PictureInPicture } from 'lucide-react';

function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const hundredths = Math.floor((totalSeconds % 1) * 100);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
}

export function CanvasPreview({
  project,
  currentTimeMs,
  onSeek
}: {
  project: Project;
  currentTimeMs: number;
  onSeek: (ms: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const isPlayingRef = useRef(false);
  isPlayingRef.current = isPlaying;
  const playbackRateRef = useRef(playbackRate);
  playbackRateRef.current = playbackRate;
  const currentTimeMsRef = useRef(currentTimeMs);
  currentTimeMsRef.current = currentTimeMs;

  const duration = Math.max(project.durationMs || 60000, ...project.clips.map(c => c.endMs));

  // Playback animation loop
  useEffect(() => {
    if (!isPlaying) return;
    let lastTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const delta = (now - lastTime) * playbackRateRef.current;
      lastTime = now;
      const nextTime = currentTimeMsRef.current + delta;
      if (nextTime >= duration) {
        onSeek(0);
        setIsPlaying(false);
      } else {
        onSeek(nextTime);
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, duration, onSeek]);

  // Spacebar toggle playback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(v => !v);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        onSeek(Math.max(0, currentTimeMsRef.current - 1000));
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        onSeek(Math.min(duration, currentTimeMsRef.current + 1000));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration, onSeek]);

  // Render canvas frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = project.width || 1280;
    const height = project.height || 720;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient / dark canvas
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0a0f18');
    bgGrad.addColorStop(1, '#05070c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const step = 64;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Header badge inside canvas
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(20, 20, 260, 42);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
    ctx.strokeRect(20, 20, 260, 42);

    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 16px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('🎬 AI STUDIO PRO', 36, 47);

    // Timecode in canvas corner
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${(currentTimeMs / 1000).toFixed(2)}s / ${(duration / 1000).toFixed(1)}s`, width - 24, 47);

    // Active visual clips preview representation
    const activeVideoClips = project.clips.filter(c => c.kind === 'video' && c.startMs <= currentTimeMs && c.endMs >= currentTimeMs);
    if (activeVideoClips.length > 0) {
      const activeClip = activeVideoClips[0];
      ctx.fillStyle = 'rgba(79, 124, 255, 0.12)';
      ctx.fillRect(40, 80, width - 80, height - 160);
      ctx.strokeStyle = 'rgba(79, 124, 255, 0.3)';
      ctx.strokeRect(40, 80, width - 80, height - 160);

      ctx.fillStyle = '#93c5fd';
      ctx.font = 'bold 24px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`▶ ${activeClip.label}`, width / 2, height / 2 - 10);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px monospace';
      ctx.fillText(`Clip ID: ${activeClip.id} · ${(activeClip.startMs / 1000).toFixed(1)}s - ${(activeClip.endMs / 1000).toFixed(1)}s`, width / 2, height / 2 + 25);
    } else {
      ctx.fillStyle = '#475569';
      ctx.font = '18px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Không có clip video tại thời điểm này', width / 2, height / 2);
    }

    // Active subtitle rendering
    const activeSubs = project.clips.filter(x => x.kind === 'subtitle' && x.startMs <= currentTimeMs && x.endMs >= currentTimeMs && x.text);
    if (activeSubs.length > 0) {
      const sub = activeSubs[0];
      const style: SubtitleStyle = {
        fontFamily: sub.style?.fontFamily || 'Arial, sans-serif',
        fontSize: sub.style?.fontSize || 42,
        color: sub.style?.color || '#ffffff',
        strokeColor: sub.style?.strokeColor || '#000000',
        strokeWidth: sub.style?.strokeWidth ?? 6,
        bottomPx: sub.style?.bottomPx || 55
      };
      drawSubtitle(ctx, sub.text!, style, width, height);
    }
  }, [project, currentTimeMs, duration]);

  const togglePiP = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        return;
      }
      if (!hiddenVideoRef.current) {
        const video = document.createElement('video');
        video.muted = true;
        video.autoplay = true;
        hiddenVideoRef.current = video;
      }
      const stream = canvas.captureStream(30);
      hiddenVideoRef.current.srcObject = stream;
      await hiddenVideoRef.current.play();
      await hiddenVideoRef.current.requestPictureInPicture();
    } catch (err) {
      console.warn('PiP không khả dụng:', err);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.warn(err));
    } else {
      document.exitFullscreen().catch(err => console.warn(err));
    }
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek(Math.max(0, Math.min(duration, ratio * duration)));
  };

  return (
    <section ref={containerRef} className="panel stack" style={{ position: 'relative' }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="row">
          <strong>Khung xem trước (Player)</strong>
          <span className="muted">
            {project.width}×{project.height} · {project.aspectRatio || '16:9'} · {project.fps} FPS
          </span>
        </div>
        <div className="row" style={{ gap: 4 }}>
          <button
            type="button"
            className="button"
            style={{ padding: '4px 8px', fontSize: 11 }}
            onClick={togglePiP}
            title="Hình trong hình (Picture-in-Picture)"
          >
            <PictureInPicture size={14} style={{ display: 'inline', marginRight: 4 }} /> PiP
          </button>
          <button
            type="button"
            className="button"
            style={{ padding: '4px 8px', fontSize: 11 }}
            onClick={toggleFullscreen}
            title="Toàn màn hình"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Screen Frame */}
      <div style={{ position: 'relative', width: '100%', borderRadius: 12, overflow: 'hidden', background: '#05070c' }}>
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: `${project.width} / ${project.height}`,
            maxHeight: '440px',
            objectFit: 'contain',
            cursor: 'pointer',
            margin: '0 auto'
          }}
        />
      </div>

      {/* Scrubber Progress Bar */}
      <div className="stack" style={{ gap: 6, marginTop: 4 }}>
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            onSeek(Math.max(0, Math.min(duration, ratio * duration)));
          }}
          style={{
            position: 'relative',
            height: 10,
            background: '#1a2234',
            borderRadius: 6,
            cursor: 'pointer',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, (currentTimeMs / duration) * 100)}%`,
              background: 'linear-gradient(90deg, #4f7cff, #22d3ee)',
              borderRadius: 6,
              transition: isPlaying ? 'none' : 'width 0.1s ease'
            }}
          />
        </div>

        {/* Player Controls Bar */}
        <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div className="row" style={{ gap: 6 }}>
            <button
              type="button"
              className={`button ${isPlaying ? 'primary' : ''}`}
              onClick={() => setIsPlaying(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 'bold' }}
              title="Phát / Dừng (Phím Space)"
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              {isPlaying ? 'Tạm dừng' : 'Phát'}
            </button>

            <button
              type="button"
              className="button"
              onClick={() => { onSeek(0); setIsPlaying(false); }}
              title="Về đầu (0s)"
            >
              <RotateCcw size={14} />
            </button>

            <button
              type="button"
              className="button"
              onClick={() => onSeek(Math.max(0, currentTimeMs - 1000))}
              title="Lùi 1 giây"
            >
              <SkipBack size={14} /> -1s
            </button>

            <button
              type="button"
              className="button"
              onClick={() => onSeek(Math.min(duration, currentTimeMs + 1000))}
              title="Tiến 1 giây"
            >
              +1s <SkipForward size={14} />
            </button>
          </div>

          <div className="row" style={{ gap: 10 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 'bold', color: '#22d3ee' }}>
              {formatTime(currentTimeMs)} <span style={{ color: '#64748b' }}>/ {formatTime(duration)}</span>
            </span>

            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(Number(e.target.value))}
              style={{
                background: '#1a2234',
                color: '#e2e8f0',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '4px 8px',
                fontSize: 12,
                cursor: 'pointer'
              }}
            >
              <option value="0.5">0.5x</option>
              <option value="1">1.0x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

```

## `frontend/src/components/editor/InspectorPanel.tsx`

```tsx
import { useEffect, useState } from 'react';
import type { Clip, SubtitleStyle } from '../../types/project';
import { Type, Sparkles, Volume2, Trash2, Copy, Sliders } from 'lucide-react';

interface InspectorProps {
  clip?: Clip;
  onChange?: (patch: Partial<Clip>) => void;
  onGenerateTts?: (clip: Clip) => Promise<void>;
  onEnhance?: (clip: Clip) => Promise<void>;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

const FONT_OPTIONS = [
  'Arial, sans-serif',
  'Roboto, sans-serif',
  'Montserrat, sans-serif',
  'Be Vietnam Pro, sans-serif',
  'Impact, sans-serif',
  'Times New Roman, serif'
];

export function InspectorPanel({
  clip,
  onChange,
  onGenerateTts,
  onEnhance,
  onDelete,
  onDuplicate
}: InspectorProps) {
  const [text, setText] = useState(clip?.text || '');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setText(clip?.text || '');
  }, [clip?.id, clip?.text]);

  if (!clip) {
    return (
      <section className="panel stack">
        <div className="row" style={{ gap: 6 }}>
          <Sliders size={16} color="#22d3ee" />
          <strong>Bảng thuộc tính (Inspector)</strong>
        </div>
        <div className="muted" style={{ padding: '16px 8px', textAlign: 'center', background: '#0e1420', borderRadius: 8 }}>
          Chưa chọn clip nào.<br />Nhấn vào một clip trên Timeline để tinh chỉnh chi tiết.
        </div>
      </section>
    );
  }

  const run = async (fn?: (clip: Clip) => Promise<void>) => {
    if (!fn) return;
    setBusy(true);
    try {
      await fn(clip);
    } finally {
      setBusy(false);
    }
  };

  const style: SubtitleStyle = {
    fontFamily: clip.style?.fontFamily || 'Arial, sans-serif',
    fontSize: clip.style?.fontSize || 42,
    color: clip.style?.color || '#ffffff',
    strokeColor: clip.style?.strokeColor || '#000000',
    strokeWidth: clip.style?.strokeWidth ?? 6,
    bottomPx: clip.style?.bottomPx || 55
  };

  const updateStyle = (patch: Partial<SubtitleStyle>) => {
    onChange?.({
      style: {
        ...style,
        ...patch
      }
    });
  };

  const kindLabel =
    clip.kind === 'video' ? 'Clip Video' :
    clip.kind === 'audio' ? 'Clip Âm thanh' :
    clip.kind === 'subtitle' ? 'Phụ đề Vietsub' : 'Hiệu ứng';

  return (
    <section className="panel stack">
      {/* Title & Kind */}
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="row" style={{ gap: 6 }}>
          <Sliders size={15} color="#22d3ee" />
          <strong>Bảng thuộc tính</strong>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            padding: '2px 8px',
            borderRadius: 6,
            background: clip.kind === 'subtitle' ? 'rgba(245,158,11,0.2)' : 'rgba(79,124,255,0.2)',
            color: clip.kind === 'subtitle' ? '#fbbf24' : '#60a5fa'
          }}
        >
          {kindLabel}
        </span>
      </div>

      {/* Basic metadata */}
      <label>
        Tên hiển thị
        <input
          value={clip.label}
          onChange={e => onChange?.({ label: e.target.value })}
          placeholder="Nhập tên clip..."
        />
      </label>

      <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <label>
          Bắt đầu (ms)
          <input
            type="number"
            step="100"
            value={clip.startMs}
            onChange={e => onChange?.({ startMs: Math.max(0, Number(e.target.value)) })}
          />
        </label>
        <label>
          Kết thúc (ms)
          <input
            type="number"
            step="100"
            value={clip.endMs}
            onChange={e => onChange?.({ endMs: Math.max(clip.startMs + 100, Number(e.target.value)) })}
          />
        </label>
      </div>

      <div className="muted" style={{ fontSize: 11 }}>
        Thời lượng: {((clip.endMs - clip.startMs) / 1000).toFixed(2)} giây · Rãnh T{clip.track + 1}
      </div>

      {/* Subtitle Specific Features */}
      {clip.kind === 'subtitle' && (
        <div className="stack" style={{ gap: 8, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
          <label>
            <div className="row" style={{ gap: 4 }}>
              <Type size={13} color="#fbbf24" />
              <span>Nội dung phụ đề</span>
            </div>
            <textarea
              rows={3}
              value={text}
              placeholder="Nhập phụ đề tiếng Việt..."
              onChange={e => {
                setText(e.target.value);
                onChange?.({ text: e.target.value });
              }}
            />
          </label>

          {/* AI Assistance Buttons */}
          <div className="row" style={{ gap: 6 }}>
            <button
              type="button"
              className="button"
              style={{ flex: 1, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
              disabled={busy || !clip.text}
              onClick={() => run(onEnhance)}
              title="Sử dụng Gemini AI để chuẩn hoá chính tả, dấu câu và phong cách dịch tiếng Việt"
            >
              <Sparkles size={13} color="#22d3ee" /> Trau chuốt câu từ
            </button>
            <button
              type="button"
              className="button primary"
              style={{ flex: 1, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
              disabled={busy || !clip.text}
              onClick={() => run(onGenerateTts)}
              title="Chuyển văn bản thành giọng nói tiếng Việt tự nhiên (Gemini TTS)"
            >
              <Volume2 size={13} /> Giọng đọc AI
            </button>
          </div>

          {/* Subtitle Typography & Visual Styling */}
          <div className="stack" style={{ background: '#0e1420', padding: 8, borderRadius: 8, gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 'bold', color: '#94a3b8' }}>Kiểu dáng hiển thị phụ đề</span>

            <div className="row" style={{ gap: 6 }}>
              <select
                value={style.fontFamily}
                onChange={e => updateStyle({ fontFamily: e.target.value })}
                style={{ flex: 1, background: '#17171a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 6px', fontSize: 11 }}
              >
                {FONT_OPTIONS.map(f => (
                  <option key={f} value={f}>{f.split(',')[0]}</option>
                ))}
              </select>

              <div className="row" style={{ gap: 4, alignItems: 'center' }}>
                <span style={{ fontSize: 11 }}>Cỡ:</span>
                <input
                  type="number"
                  min="16"
                  max="96"
                  value={style.fontSize}
                  onChange={e => updateStyle({ fontSize: Number(e.target.value) })}
                  style={{ width: 50, padding: '4px 6px', fontSize: 11 }}
                />
              </div>
            </div>

            <div className="row" style={{ justifyContent: 'space-between', gap: 8 }}>
              <label style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11 }}>Màu chữ:</span>
                <input
                  type="color"
                  value={style.color}
                  onChange={e => updateStyle({ color: e.target.value })}
                  style={{ width: 28, height: 26, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
              </label>

              <label style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11 }}>Viền chữ:</span>
                <input
                  type="color"
                  value={style.strokeColor}
                  onChange={e => updateStyle({ strokeColor: e.target.value })}
                  style={{ width: 28, height: 26, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
              </label>

              <label style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11 }}>Độ dày:</span>
                <input
                  type="number"
                  min="0"
                  max="16"
                  value={style.strokeWidth}
                  onChange={e => updateStyle({ strokeWidth: Number(e.target.value) })}
                  style={{ width: 42, padding: '3px 4px', fontSize: 11 }}
                />
              </label>
            </div>

            <div className="row" style={{ alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11 }}>Cách đáy:</span>
              <input
                type="range"
                min="20"
                max="250"
                value={style.bottomPx}
                onChange={e => updateStyle({ bottomPx: Number(e.target.value) })}
                style={{ flex: 1 }}
              />
              <span style={{ fontSize: 11, width: 32 }}>{style.bottomPx}px</span>
            </div>
          </div>
        </div>
      )}

      {/* Audio / Video Volume Controls */}
      {(clip.kind === 'audio' || clip.kind === 'video') && (
        <div className="stack" style={{ gap: 6, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 'bold' }}>Âm lượng clip</span>
            <span style={{ fontSize: 11 }}>{Math.round((clip.volume ?? 1) * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={clip.volume ?? 1}
            onChange={e => onChange?.({ volume: Number(e.target.value) })}
          />
        </div>
      )}

      {/* Clip Actions */}
      <div className="row" style={{ gap: 6, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
        <button
          type="button"
          className="button"
          style={{ flex: 1, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
          onClick={() => onDuplicate?.(clip.id)}
          title="Nhân bản clip này"
        >
          <Copy size={13} /> Nhân bản
        </button>
        <button
          type="button"
          className="button"
          style={{ fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: '#f87171' }}
          onClick={() => onDelete?.(clip.id)}
          title="Xoá clip này khỏi dự án"
        >
          <Trash2 size={13} /> Xoá clip
        </button>
      </div>
    </section>
  );
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
  const [ducking,setDucking]=useState(true); const [running,setRunning]=useState(false); const engine=useRef<AudioEngine | undefined>(undefined); const [,force]=useState(0);
  const start=async()=>{if(!engine.current) engine.current=new AudioEngine(); await engine.current.resume(); setRunning(true);};
  useEffect(()=>()=>engine.current?.close(),[]);
  useEffect(()=>{CHANNELS.forEach(k=>engine.current?.setGain(k,channels[k].gain,channels[k].muted)); engine.current?.setDucking(ducking,SYSTEM_CONFIG.editor.duckingGain);},[channels,ducking]);
  useEffect(()=>{if(!running)return;const id=window.setInterval(()=>force(v=>v+1),150);return()=>clearInterval(id)},[running]);
  const labels=useMemo(()=>CHANNELS,[ ]);
  const channelDisplayNames: Record<ChannelId, string> = {
    video: 'VIDEO',
    bgm: 'NHẠC NỀN',
    tts: 'GIỌNG AI',
    master: 'TỔNG MASTER'
  };
  return <section className="panel stack"><div className="row" style={{justifyContent:'space-between'}}><strong>Bàn trộn âm thanh đa kênh</strong><div className="row"><button className="button" onClick={start}>{running?'Âm thanh BẬT':'Bật âm thanh'}</button><button className="button" onClick={()=>setDucking(v=>!v)}>{ducking?'Hạ nhạc 20%':'Tắt hạ nhạc'}</button></div></div>
    {labels.map(k=><div key={k} className="stack"><div className="row"><strong style={{width:80,fontSize:11}}>{channelDisplayNames[k]}</strong><input style={{flex:1}} type="range" min="0" max="1.5" step="0.01" value={channels[k].gain} onChange={e=>setChannels(s=>({...s,[k]:{...s[k],gain:Number(e.target.value)}}))}/><span>{channels[k].gain.toFixed(2)}</span><button className="button" onClick={()=>setChannels(s=>({...s,[k]:{...s[k],muted:!s[k].muted}}))}>{channels[k].muted?'ĐÃ TẮT':'TẮT'}</button></div><div className="meter"><span style={{width:`${Math.round((engine.current?.meter(k)||0)*100)}%`}}/></div></div>)}
    <button className="button primary" disabled={!running} onClick={async()=>{const result=await onAiOptimize?.(channels); if(result) console.info('Gợi ý mix AI',result)}}>✨ AI tối ưu âm lượng đa kênh</button>
  </section>;
}

```

## `frontend/src/components/editor/ProjectSettingsModal.tsx`

```tsx
import { useState, useRef } from 'react';
import type { Project, AspectRatio } from '../../types/project';
import { exportProjectAsJson, importProjectFromJson } from '../../services/projectStorage';
import { Settings, X, Download, Upload, RefreshCw } from 'lucide-react';

interface ProjectSettingsModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProject: (patch: Partial<Project>) => void;
  onResetProject: () => void;
  onLoadProject: (newProject: Project) => void;
}

const PRESETS: Record<AspectRatio, { width: number; height: number; desc: string }> = {
  '16:9': { width: 1280, height: 720, desc: '1280×720 · Chuẩn YouTube / Video ngang' },
  '9:16': { width: 720, height: 1280, desc: '720×1280 · Chuẩn TikTok / Reels / Shorts' },
  '1:1': { width: 1080, height: 1080, desc: '1080×1080 · Chuẩn Vuông Instagram / Facebook' }
};

export function ProjectSettingsModal({
  project,
  isOpen,
  onClose,
  onUpdateProject,
  onResetProject,
  onLoadProject
}: ProjectSettingsModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(project.name || 'Dự án AI Studio');
  const [aspect, setAspect] = useState<AspectRatio>(project.aspectRatio || '16:9');
  const [fps, setFps] = useState<number>(project.fps || 30);
  const [durationSec, setDurationSec] = useState<number>(Math.round((project.durationMs || 60000) / 1000));
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    const preset = PRESETS[aspect];
    onUpdateProject({
      name,
      aspectRatio: aspect,
      width: preset.width,
      height: preset.height,
      fps,
      durationMs: durationSec * 1000
    });
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    try {
      const imported = await importProjectFromJson(file);
      onLoadProject(imported);
      onClose();
    } catch (err: unknown) {
      setImportError((err as Error).message || 'Lỗi khi nhập file dự án JSON');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
      }}
      onClick={onClose}
    >
      <div
        className="panel stack"
        style={{
          width: '100%',
          maxWidth: 480,
          background: '#0d131f',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 16,
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          padding: 20
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="row" style={{ justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12 }}>
          <div className="row" style={{ gap: 8 }}>
            <Settings size={18} color="#22d3ee" />
            <strong style={{ fontSize: 16 }}>Cài đặt cấu hình dự án</strong>
          </div>
          <button
            type="button"
            className="button"
            style={{ padding: '4px 8px' }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Controls */}
        <label>
          Tên dự án
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ví dụ: Video giới thiệu sản phẩm..."
          />
        </label>

        <label>
          Tỉ lệ khung hình (Aspect Ratio)
          <div className="stack" style={{ gap: 6, marginTop: 4 }}>
            {(['16:9', '9:16', '1:1'] as AspectRatio[]).map(key => (
              <button
                key={key}
                type="button"
                className={`button ${aspect === key ? 'primary' : ''}`}
                style={{ textAlign: 'left', padding: '8px 12px' }}
                onClick={() => setAspect(key)}
              >
                <div style={{ fontWeight: 'bold' }}>{key}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{PRESETS[key].desc}</div>
              </button>
            ))}
          </div>
        </label>

        <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <label>
            Số khung hình / giây (FPS)
            <select
              value={fps}
              onChange={e => setFps(Number(e.target.value))}
              style={{ background: '#17171a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 8 }}
            >
              <option value="24">24 FPS (Cinematic)</option>
              <option value="30">30 FPS (Chuẩn web/mobile)</option>
              <option value="60">60 FPS (Mượt mà cao cấp)</option>
            </select>
          </label>

          <label>
            Thời lượng dự án (Giây)
            <input
              type="number"
              min="5"
              max="600"
              value={durationSec}
              onChange={e => setDurationSec(Math.max(5, Number(e.target.value)))}
            />
          </label>
        </div>

        {/* Project Import / Export */}
        <div className="stack" style={{ background: '#080d14', padding: 12, borderRadius: 10, gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 'bold', color: '#94a3b8' }}>Sao lưu & Khôi phục dự án</span>
          <div className="row" style={{ gap: 8 }}>
            <button
              type="button"
              className="button"
              style={{ flex: 1, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              onClick={() => exportProjectAsJson(project)}
            >
              <Download size={13} color="#22d3ee" /> Xuất file JSON
            </button>
            <button
              type="button"
              className="button"
              style={{ flex: 1, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={13} color="#34d399" /> Nhập file JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              hidden
              onChange={handleFileChange}
            />
          </div>
          {importError && (
            <div style={{ color: '#f87171', fontSize: 11 }}>⚠️ {importError}</div>
          )}
        </div>

        {/* Actions */}
        <div className="row" style={{ justifyContent: 'space-between', marginTop: 8, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            type="button"
            className="button"
            style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn tạo lại dự án mới từ đầu? Mọi thay đổi hiện tại sẽ bị đặt lại.')) {
                onResetProject();
                onClose();
              }
            }}
          >
            <RefreshCw size={13} /> Tạo dự án mới
          </button>

          <div className="row" style={{ gap: 8 }}>
            <button
              type="button"
              className="button"
              onClick={onClose}
            >
              Huỷ
            </button>
            <button
              type="button"
              className="button primary"
              style={{ fontWeight: 'bold' }}
              onClick={handleSave}
            >
              Áp dụng thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

```

## `frontend/src/components/editor/SubtitleTableModal.tsx`

```tsx
import { useState, useMemo } from 'react';
import type { Clip } from '../../types/project';
import { Subtitles, X, Search, Plus, Trash2, Play } from 'lucide-react';

interface SubtitleTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  clips: Clip[];
  selectedId?: string;
  onSelectCue: (id: string) => void;
  onSeek: (ms: number) => void;
  onUpdateCueText: (id: string, text: string) => void;
  onDeleteCue: (id: string) => void;
  onAddCue: () => void;
}

function formatMs(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const remSec = s % 60;
  const remMs = Math.floor((ms % 1000) / 100);
  return `${m.toString().padStart(2, '0')}:${remSec.toString().padStart(2, '0')}.${remMs}`;
}

export function SubtitleTableModal({
  isOpen,
  onClose,
  clips,
  selectedId,
  onSelectCue,
  onSeek,
  onUpdateCueText,
  onDeleteCue,
  onAddCue
}: SubtitleTableModalProps) {
  const [query, setQuery] = useState('');

  const subtitleClips = useMemo(() => {
    return clips
      .filter(c => c.kind === 'subtitle')
      .sort((a, b) => a.startMs - b.startMs);
  }, [clips]);

  const filteredCues = useMemo(() => {
    if (!query.trim()) return subtitleClips;
    const lower = query.toLowerCase();
    return subtitleClips.filter(c => (c.text || '').toLowerCase().includes(lower) || c.label.toLowerCase().includes(lower));
  }, [subtitleClips, query]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
      }}
      onClick={onClose}
    >
      <div
        className="panel stack"
        style={{
          width: '100%',
          maxWidth: 720,
          maxHeight: '85vh',
          background: '#0d131f',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 16,
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          padding: 20,
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="row" style={{ justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12 }}>
          <div className="row" style={{ gap: 8 }}>
            <Subtitles size={18} color="#fbbf24" />
            <strong style={{ fontSize: 16 }}>Danh sách & Quản lý phụ đề ({subtitleClips.length} câu)</strong>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button
              type="button"
              className="button primary"
              style={{ fontSize: 12, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}
              onClick={onAddCue}
            >
              <Plus size={14} /> Thêm phụ đề mới
            </button>
            <button
              type="button"
              className="button"
              style={{ padding: '4px 8px' }}
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="row" style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, color: '#64748b' }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm kiếm nội dung phụ đề tiếng Việt..."
            style={{ width: '100%', paddingLeft: 32 }}
          />
        </div>

        {/* Table Content */}
        <div style={{ flex: 1, overflowY: 'auto', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, background: '#080d14' }}>
          {filteredCues.length === 0 ? (
            <div className="muted" style={{ padding: '32px 16px', textAlign: 'center' }}>
              {query ? 'Không tìm thấy câu phụ đề nào phù hợp' : 'Chưa có phụ đề nào. Nhấn "+ Thêm phụ đề mới" để bắt đầu.'}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#111827', color: '#94a3b8', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '8px 10px', width: 45 }}>#</th>
                  <th style={{ padding: '8px 10px', width: 140 }}>Thời gian</th>
                  <th style={{ padding: '8px 10px' }}>Nội dung phụ đề</th>
                  <th style={{ padding: '8px 10px', width: 80, textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCues.map((c, index) => {
                  const isSelected = selectedId === c.id;
                  return (
                    <tr
                      key={c.id}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        background: isSelected ? 'rgba(34, 211, 238, 0.08)' : undefined
                      }}
                    >
                      <td style={{ padding: '8px 10px', color: '#64748b' }}>{index + 1}</td>
                      <td style={{ padding: '8px 10px', fontFamily: 'monospace', color: '#22d3ee' }}>
                        {formatMs(c.startMs)} → {formatMs(c.endMs)}
                      </td>
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          value={c.text || ''}
                          onChange={e => onUpdateCueText(c.id, e.target.value)}
                          onFocus={() => onSelectCue(c.id)}
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: '1px solid transparent',
                            borderRadius: 4,
                            padding: '4px 6px',
                            color: '#fff'
                          }}
                          onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.border = '1px solid transparent'}
                        />
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                        <div className="row" style={{ justifyContent: 'center', gap: 4 }}>
                          <button
                            type="button"
                            className="button"
                            style={{ padding: '3px 6px' }}
                            title="Nhảy tới phụ đề này trên Timeline"
                            onClick={() => {
                              onSelectCue(c.id);
                              onSeek(c.startMs);
                            }}
                          >
                            <Play size={11} color="#34d399" />
                          </button>
                          <button
                            type="button"
                            className="button"
                            style={{ padding: '3px 6px', color: '#f87171' }}
                            title="Xoá câu phụ đề này"
                            onClick={() => onDeleteCue(c.id)}
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

```

## `frontend/src/components/editor/Timeline.tsx`

```tsx
import React, { useRef } from 'react';
import type { Clip } from '../../types/project';
import { Plus, Scissors, Trash2, Copy } from 'lucide-react';

interface TimelineProps {
  clips: Clip[];
  selectedId?: string;
  currentTimeMs: number;
  durationMs: number;
  onSelect?: (id: string) => void;
  onSeek?: (ms: number) => void;
  onAddSubtitleAtPlayhead?: () => void;
  onSplitClip?: (id: string, splitAtMs: number) => void;
  onDeleteClip?: (id: string) => void;
  onDuplicateClip?: (id: string) => void;
}

const TRACK_CONFIG = [
  { track: 0, label: 'R1: Video', bg: 'linear-gradient(90deg, #1d4ed8, #2563eb)', border: '#3b82f6' },
  { track: 1, label: 'R2: Nhạc (BGM)', bg: 'linear-gradient(90deg, #047857, #059669)', border: '#10b981' },
  { track: 2, label: 'R3: Phụ đề Vietsub', bg: 'linear-gradient(90deg, #b45309, #d97706)', border: '#f59e0b' },
  { track: 3, label: 'R4: Giọng đọc AI (TTS)', bg: 'linear-gradient(90deg, #6d28d9, #7c3aed)', border: '#8b5cf6' },
];

export function Timeline({
  clips,
  selectedId,
  currentTimeMs,
  durationMs,
  onSelect,
  onSeek,
  onAddSubtitleAtPlayhead,
  onSplitClip,
  onDeleteClip,
  onDuplicateClip
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const duration = Math.max(durationMs || 60000, ...clips.map(c => c.endMs));
  const selectedClip = clips.find(c => c.id === selectedId);

  const canSplit = Boolean(
    selectedClip &&
    currentTimeMs > selectedClip.startMs + 200 &&
    currentTimeMs < selectedClip.endMs - 200
  );

  const handleRulerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek?.(ratio * duration);
  };

  // Generate 6 time markers
  const markers = [0, 0.2, 0.4, 0.6, 0.8, 1].map(r => ({
    ratio: r,
    label: `${Math.round((r * duration) / 1000)}s`
  }));

  return (
    <section className="panel stack" style={{ position: 'relative' }}>
      {/* Header & Quick Action Buttons */}
      <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div className="row">
          <strong>Dòng thời gian (Timeline)</strong>
          <span className="muted">{Math.round(duration / 1000)} giây · 4 rãnh đa phương tiện</span>
        </div>

        <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="button"
            style={{ fontSize: 11, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 4, background: '#1e293b' }}
            onClick={onAddSubtitleAtPlayhead}
            title="Thêm phụ đề ngay tại thời điểm đang phát"
          >
            <Plus size={13} color="#f59e0b" /> + Phụ đề tại điểm phát
          </button>

          {selectedClip && (
            <>
              <button
                type="button"
                className="button"
                disabled={!canSplit}
                style={{ fontSize: 11, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 4 }}
                onClick={() => canSplit && onSplitClip?.(selectedClip.id, currentTimeMs)}
                title="Tách clip được chọn tại vị trí phát hiện tại"
              >
                <Scissors size={13} color="#22d3ee" /> Tách clip
              </button>

              <button
                type="button"
                className="button"
                style={{ fontSize: 11, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 4 }}
                onClick={() => onDuplicateClip?.(selectedClip.id)}
                title="Nhân bản clip đã chọn"
              >
                <Copy size={13} color="#34d399" /> Nhân bản
              </button>

              <button
                type="button"
                className="button"
                style={{ fontSize: 11, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 4, color: '#f87171' }}
                onClick={() => onDeleteClip?.(selectedClip.id)}
                title="Xoá clip đang chọn"
              >
                <Trash2 size={13} /> Xoá
              </button>
            </>
          )}
        </div>
      </div>

      {/* Timeline Ruler & Tracks Area */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          background: '#0d131f',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 10,
          padding: '10px 12px 14px',
          overflowX: 'auto',
          userSelect: 'none'
        }}
      >
        {/* Ruler */}
        <div
          onClick={handleRulerClick}
          style={{
            position: 'relative',
            height: 22,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: 10,
            cursor: 'pointer'
          }}
        >
          {markers.map((m, idx) => (
            <span
              key={idx}
              style={{
                position: 'absolute',
                left: `${m.ratio * 100}%`,
                transform: m.ratio === 1 ? 'translateX(-100%)' : 'translateX(-50%)',
                fontSize: 10,
                color: '#64748b',
                fontFamily: 'monospace'
              }}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Tracks */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {TRACK_CONFIG.map(({ track, label, bg, border }) => {
            const trackClips = clips.filter(c => c.track === track);
            return (
              <div
                key={track}
                onClick={handleRulerClick}
                style={{
                  position: 'relative',
                  height: 38,
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: 6,
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer'
                }}
              >
                {/* Track Label Badge */}
                <div
                  style={{
                    position: 'absolute',
                    left: 6,
                    top: 2,
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.45)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                >
                  {label}
                </div>

                {/* Clips in this track */}
                {trackClips.map(c => {
                  const isSelected = selectedId === c.id;
                  const leftPct = (c.startMs / duration) * 100;
                  const widthPct = Math.max(1.5, ((c.endMs - c.startMs) / duration) * 100);

                  return (
                    <div
                      key={c.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect?.(c.id);
                      }}
                      style={{
                        position: 'absolute',
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                        top: 2,
                        bottom: 2,
                        background: bg,
                        border: isSelected ? '2px solid #22d3ee' : `1px solid ${border}`,
                        boxShadow: isSelected ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none',
                        borderRadius: 5,
                        padding: '3px 6px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        color: '#ffffff',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer',
                        zIndex: isSelected ? 4 : 3,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title={`${c.label} (${(c.startMs / 1000).toFixed(1)}s - ${(c.endMs / 1000).toFixed(1)}s)`}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.text ? `💬 ${c.text}` : c.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Interactive Playhead Line */}
          <div
            style={{
              position: 'absolute',
              top: -26,
              bottom: 0,
              left: `${Math.min(100, Math.max(0, (currentTimeMs / duration) * 100))}%`,
              width: 2,
              background: '#22d3ee',
              pointerEvents: 'none',
              zIndex: 10,
              boxShadow: '0 0 8px #22d3ee'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: -5,
                width: 12,
                height: 12,
                background: '#22d3ee',
                borderRadius: '50%',
                boxShadow: '0 0 6px #22d3ee'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

```

## `frontend/src/components/system/Header.tsx`

```tsx
import type { ReactNode } from 'react';
import { Undo2, Redo2, Settings, Subtitles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  version: string;
  admin: boolean;
  projectName?: string;
  lastSavedAt?: string;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onOpenSettings?: () => void;
  onOpenSubtitles?: () => void;
  actions?: ReactNode;
}

export function Header({
  version,
  admin,
  projectName,
  lastSavedAt,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenSettings,
  onOpenSubtitles,
  actions
}: HeaderProps) {
  const formattedTime = lastSavedAt
    ? new Date(lastSavedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : null;

  return (
    <header className="panel row" style={{ justifyContent: 'space-between', position: 'sticky', top: 8, zIndex: 30, flexWrap: 'wrap', gap: 8 }}>
      <div className="row" style={{ gap: 12 }}>
        <div>
          <div className="row" style={{ gap: 6 }}>
            <strong>🎬 AI Studio Pro</strong>
            {projectName && (
              <span style={{ fontSize: 13, color: '#22d3ee', fontWeight: 600 }}>
                · {projectName}
              </span>
            )}
          </div>
          <div className="muted" style={{ fontSize: 11 }}>
            v{version} · {admin ? 'QUẢN TRỊ VIÊN' : 'BIÊN TẬP VIÊN'} · React 19
          </div>
        </div>

        {/* Auto-save indicator */}
        {formattedTime && (
          <div
            className="row"
            style={{
              gap: 4,
              fontSize: 11,
              color: '#34d399',
              background: 'rgba(52, 211, 153, 0.1)',
              padding: '3px 8px',
              borderRadius: 6,
              border: '1px solid rgba(52, 211, 153, 0.2)'
            }}
            title="Dự án được tự động lưu vào bộ nhớ trình duyệt (localStorage)"
          >
            <CheckCircle2 size={12} />
            <span>Đã lưu lúc {formattedTime}</span>
          </div>
        )}
      </div>

      {/* Middle Tooling Buttons: Undo, Redo, Subtitle Table, Settings */}
      <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
        <button
          type="button"
          className="button"
          style={{ padding: '6px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
          disabled={!canUndo}
          onClick={onUndo}
          title="Hoàn tác thao tác vừa rồi (Ctrl+Z)"
        >
          <Undo2 size={13} /> Hoàn tác
        </button>

        <button
          type="button"
          className="button"
          style={{ padding: '6px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
          disabled={!canRedo}
          onClick={onRedo}
          title="Làm lại thao tác vừa hoàn tác (Ctrl+Y)"
        >
          <Redo2 size={13} /> Làm lại
        </button>

        <button
          type="button"
          className="button"
          style={{ padding: '6px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
          onClick={onOpenSubtitles}
          title="Mở bảng danh sách phụ đề"
        >
          <Subtitles size={13} color="#fbbf24" /> Quản lý phụ đề
        </button>

        <button
          type="button"
          className="button"
          style={{ padding: '6px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
          onClick={onOpenSettings}
          title="Cài đặt dự án & Tỉ lệ khung hình"
        >
          <Settings size={13} color="#22d3ee" /> Cài đặt dự án
        </button>

        {actions}
      </div>
    </header>
  );
}

```

## `frontend/src/components/system/PwaInstallBanner.tsx`

```tsx
import {useEffect,useState} from 'react';
export function PwaInstallBanner(){const [prompt,setPrompt]=useState<any>(null);useEffect(()=>{const h=(e:any)=>{e.preventDefault();setPrompt(e)};window.addEventListener('beforeinstallprompt',h);return()=>window.removeEventListener('beforeinstallprompt',h)},[]);if(!prompt)return null;return <div className="panel row" style={{position:'fixed',right:12,bottom:76,zIndex:20}}><span>Cài đặt ứng dụng PWA</span><button className="button primary" onClick={async()=>{await prompt.prompt();setPrompt(null)}}>Cài đặt ngay</button></div>}

```

## `frontend/src/components/system/SystemControlPanel.tsx`

```tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  CheckCircle2,
  CircleDot,
  CloudCog,
  RefreshCw,
  ShieldCheck,
  Terminal,
  Wifi,
  X,
  Wrench,
} from 'lucide-react';
import { SYSTEM_CONFIG } from '../../generated/system-config';

type GateStatus = 'IDLE' | 'RUNNING' | 'NOMINAL' | 'FAILED';

type TelemetryEvent = {
  ts?: string;
  event: string;
  [key: string]: unknown;
};

const STATUS_META: Record<GateStatus, { label: string; note: string }> = {
  IDLE: { label: 'CHỜ LỆNH', note: 'Sandbox đang chờ lệnh' },
  RUNNING: { label: 'ĐANG XỬ LÝ', note: 'Đang kiểm tra và chạy quy trình' },
  NOMINAL: { label: 'CHUẨN (NOMINAL)', note: 'Các bước kiểm định tự động đã vượt qua' },
  FAILED: { label: 'LỖI (FAILED)', note: 'Phát hiện lỗi — đã chặn đồng bộ' },
};

export const SystemControlPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<GateStatus>('IDLE');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Sandbox ngoại tuyến');
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [busy, setBusy] = useState(false);
  const [wsOverride, setWsOverride] = useState('');
  const socketRef = useRef<WebSocket | null>(null);

  const wsUrl = useMemo(() => {
    const saved = wsOverride.trim() || localStorage.getItem('systemSandboxWs') || '';
    if (saved) return saved;
    const { host, port, wsPath } = SYSTEM_CONFIG.runtime.sandbox;
    return `ws://${host}:${port}${wsPath}`;
  }, [wsOverride]);

  const enabledPlatforms = useMemo(
    () => Object.entries(SYSTEM_CONFIG.platforms).filter(([, item]) => item.enabled).map(([name]) => name),
    []
  );

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let ws: WebSocket;
    try {
      ws = new WebSocket(wsUrl);
      socketRef.current = ws;
      setBusy(true);

      ws.onopen = () => {
        if (cancelled) return;
        setConnected(true);
        setBusy(false);
        setMessage('Đã kết nối Sandbox');
        ws.send(JSON.stringify({ command: 'status' }));
      };

      ws.onmessage = (event) => {
        try {
          const item = JSON.parse(event.data) as TelemetryEvent;
          if (item.gate && typeof item.gate === 'object') {
            const gate = item.gate as { status?: GateStatus; progress?: number; message?: string };
            setStatus(gate.status ?? 'IDLE');
            setProgress(Number(gate.progress ?? 0));
            setMessage(gate.message ?? '');
          }
          if (item.event === 'GATE_STARTED') setStatus('RUNNING');
          if (item.event === 'GATE_NOMINAL') {
            setStatus('NOMINAL');
            setProgress(100);
          }
          if (item.event === 'GATE_FAILED') {
            setStatus('FAILED');
            setProgress(100);
          }
          if (item.message) setMessage(String(item.message));
          if (item.event) setEvents(prev => [...prev.slice(-29), item]);
        } catch {
          setEvents(prev => [...prev.slice(-29), { event: 'RAW', ts: new Date().toISOString(), data: event.data }]);
        }
      };

      ws.onerror = () => {
        if (cancelled) return;
        setConnected(false);
        setBusy(false);
        setMessage('Sandbox chưa sẵn sàng');
      };

      ws.onclose = () => {
        if (cancelled) return;
        setConnected(false);
        setBusy(false);
      };
    } catch {
      setConnected(false);
      setBusy(false);
      setMessage('Địa chỉ WebSocket không hợp lệ');
    }

    return () => {
      cancelled = true;
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [open, wsUrl]);

  const command = (name: 'dry-run' | 'auto-patch' | 'sync') => {
    const ws = socketRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      setMessage('Hãy khởi chạy System Sandbox trước');
      return;
    }
    setBusy(true);
    setStatus('RUNNING');
    setProgress(5);
    ws.send(JSON.stringify({ command: name }));
  };

  const saveOverride = () => {
    const value = wsOverride.trim();
    if (value) localStorage.setItem('systemSandboxWs', value);
    else localStorage.removeItem('systemSandboxWs');
    setMessage(value ? 'Đã lưu cổng kết nối riêng' : 'Đang dùng cổng mặc định SOT');
  };

  const statusIcon =
    status === 'NOMINAL' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
    status === 'FAILED' ? <X className="w-4 h-4 text-rose-400" /> :
    status === 'RUNNING' ? <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" /> :
    <CircleDot className="w-4 h-4 text-slate-500" />;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="fixed right-4 bottom-4 z-[70] group flex items-center gap-2 rounded-full border border-slate-700/80 bg-[#09111c]/95 px-3 py-2 text-[11px] font-black text-slate-100 shadow-2xl shadow-black/30 backdrop-blur-xl hover:border-cyan-500/40 hover:bg-[#111a28] transition-all cursor-pointer"
        title="Bảng điều khiển hệ thống"
      >
        <span className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
        <Activity className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden sm:inline">HỆ THỐNG</span>
        <span className="hidden md:inline text-slate-500">·</span>
        <span className="hidden md:inline text-[10px] text-slate-400">{status}</span>
      </button>

      {open && (
        <aside className="fixed right-4 bottom-16 z-[71] w-[min(480px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-slate-700/80 bg-[#080f1a]/98 shadow-2xl shadow-black/50 backdrop-blur-2xl text-slate-100">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-3 bg-gradient-to-r from-cyan-950/40 via-slate-950/25 to-purple-950/35">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl border border-cyan-500/20 bg-cyan-500/10 flex items-center justify-center shrink-0">
                <CloudCog className="w-4 h-4 text-cyan-300" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black tracking-tight flex items-center gap-2">
                  Trung tâm kiểm soát hệ thống
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[9px]">ĐIỀU HÀNH CRM</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">Nguồn chuẩn duy nhất (SOT) · v{SYSTEM_CONFIG.app.version}</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
          </div>

          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500"><ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Cổng kiểm định phát hành</div>
                <div className="mt-2 flex items-center gap-2 text-sm font-bold">{statusIcon}<span>{STATUS_META[status].label}</span></div>
                <div className="mt-1 text-[10px] text-slate-500 truncate">{message || STATUS_META[status].note}</div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-900 overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all" style={{ width: `${progress}%` }} /></div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500"><Wifi className="w-3.5 h-3.5 text-emerald-400" /> Môi trường Sandbox</div>
                <div className="mt-2 flex items-center gap-2 text-sm font-bold"><span className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />{connected ? 'ĐÃ KẾT NỐI' : 'NGOẠI TUYẾN'}</div>
                <div className="mt-1 text-[10px] text-slate-500 truncate">{wsUrl}</div>
                <div className="mt-2 flex flex-wrap gap-1">{enabledPlatforms.map(p => <span key={p} className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-slate-400">{p}</span>)}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button disabled={busy || !connected} onClick={() => command('dry-run')} className="rounded-lg border border-slate-800 bg-slate-900/80 px-2 py-2 text-[10px] font-bold text-slate-300 hover:border-cyan-500/30 hover:text-cyan-200 disabled:opacity-40 cursor-pointer">KIỂM TRA (DRY-RUN)</button>
              <button disabled={busy || !connected} onClick={() => command('auto-patch')} className="rounded-lg border border-slate-800 bg-slate-900/80 px-2 py-2 text-[10px] font-bold text-slate-300 hover:border-amber-500/30 hover:text-amber-200 disabled:opacity-40 cursor-pointer">TỰ ĐỘNG VÁ</button>
              <button disabled={busy || !connected} onClick={() => command('sync')} className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 px-2 py-2 text-[10px] font-black text-emerald-300 hover:bg-emerald-950/40 disabled:opacity-40 cursor-pointer"><Wrench className="inline w-3 h-3 mr-1" />ĐỒNG BỘ TẤT CẢ</button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/55 p-3 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-indigo-400" /> Cổng kết nối WebSocket</div>
              <div className="flex gap-2">
                <input value={wsOverride} onChange={e => setWsOverride(e.target.value)} placeholder={wsUrl} className="min-w-0 flex-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-2 text-[10px] font-mono text-slate-300" />
                <button onClick={saveOverride} className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-[10px] font-bold text-slate-200 hover:bg-slate-700 cursor-pointer">Lưu</button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-800 bg-slate-900/70 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Nhật ký sự kiện (Telemetry)</span>
                <span className="text-[10px] text-slate-600">{events.length} sự kiện</span>
              </div>
              <div className="max-h-48 overflow-y-auto divide-y divide-slate-900">
                {events.length === 0 ? (
                  <div className="px-3 py-6 text-center text-[10px] text-slate-600">Chưa có dữ liệu sự kiện.</div>
                ) : events.slice().reverse().map((item, idx) => (
                  <div key={`${item.ts ?? 'e'}-${idx}`} className="px-3 py-2 grid grid-cols-[auto_1fr] gap-2">
                    <span className="font-mono text-[9px] text-slate-600">{item.ts ? new Date(item.ts).toLocaleTimeString() : '--:--:--'}</span>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-300">{item.event}</div>
                      {Boolean(item.message) && <div className="text-[9px] text-slate-500 truncate">{String(item.message)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
export default SystemControlPanel;

```

## `frontend/src/edge.ts`

```ts
import {SYSTEM_CONFIG_VERSION} from './generated/system-config';

export interface Env {
  ASSETS: Fetcher;
  BACKEND: Fetcher;
  AI_EDGE: Fetcher;
  MCP: Fetcher;
  TELEGRAM: Fetcher;
}

const noStore={'cache-control':'no-store'};

async function probe(fetcher:Fetcher,path:string,request:Request){
  try{
    const url=new URL(request.url);
    url.pathname=path;
    const response=await fetcher.fetch(new Request(url.toString(),{method:'GET',headers:{'cache-control':'no-cache'}}));
    return {status:response.status,ok:response.ok};
  }catch(error){
    return {status:0,ok:false,error:error instanceof Error?error.message:String(error)};
  }
}

export default {
  async fetch(request:Request,env:Env):Promise<Response>{
    const url=new URL(request.url);
    if(url.pathname==='/health') return Response.json({ok:true,service:'gateway',version:SYSTEM_CONFIG_VERSION,runtime:'cloudflare-workers'},{headers:noStore});
    if(url.pathname==='/health/all'){
      const [backend,backendReady,ai,mcp,telegram]=await Promise.all([
        probe(env.BACKEND,'/health',request),
        probe(env.BACKEND,'/health/ready',request),
        probe(env.AI_EDGE,'/health',request),
        probe(env.MCP,'/health',request),
        probe(env.TELEGRAM,'/health',request)
      ]);
      const checks={gateway:{status:200,ok:true},backend,backendReady,ai,mcp,telegram};
      const ok=Object.values(checks).every(x=>x.ok);
      return Response.json({ok,checks,version:SYSTEM_CONFIG_VERSION},{status:ok?200:503,headers:noStore});
    }
    if(url.pathname==='/mcp'||url.pathname.startsWith('/mcp/')) return env.MCP.fetch(request);
    if(url.pathname==='/telegram'||url.pathname.startsWith('/telegram/')) return env.TELEGRAM.fetch(request);
    if(url.pathname==='/api/ai'||url.pathname.startsWith('/api/ai/')) return env.AI_EDGE.fetch(request);
    if(url.pathname==='/api'||url.pathname.startsWith('/api/')) return env.BACKEND.fetch(request);
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;

```

## `frontend/src/generated/system-config.ts`

```ts
export const SYSTEM_CONFIG = {
  "$schema": "./schema/system-config.schema.json",
  "app": {
    "name": "Hendy Video Studio Pro",
    "shortName": "Hendy Studio Pro",
    "product": "AI Video + Vietsub Workspace",
    "version": "3.2.0",
    "description": "AI video editor, Vietnamese subtitles, TTS voiceover, multi-channel audio and Cloudflare production workspace.",
    "language": "vi"
  },
  "toolchain": {
    "bun": "1.2.15",
    "node": ">=22 <25",
    "wrangler": "4.141.0",
    "workersTypes": "5.20260927.1",
    "typescript": "5.9.3"
  },
  "features": {
    "linkExtractor": true,
    "imageOCR": true,
    "audioSTT": true,
    "audioDucking": true,
    "offlineFirst": true,
    "telegramAdmin": true,
    "mcpControlPlane": true,
    "r2Storage": true,
    "d1Telemetry": true
  },
  "api": {
    "basePath": "/api/v1",
    "aiPath": "/api/ai",
    "mcpPath": "/mcp",
    "telegramPath": "/telegram",
    "maxJsonBodyBytes": 4194304,
    "maxUploadBytes": 104857600,
    "requestTimeoutMs": 30000
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
    "temperature": 0.1,
    "cloudflareTtsModel": "@cf/myshell-ai/melotts"
  },
  "storage": {
    "provider": "cloudflare-r2",
    "bucketName": "hendy-video-studio-pro-media",
    "bucketEnv": "R2_BUCKET",
    "accountId": "918ff2f016938fc978ed23b96505b21e",
    "endpoint": "https://918ff2f016938fc978ed23b96505b21e.r2.cloudflarestorage.com",
    "zeroEgress": true,
    "publicAccess": false
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
  "ui": {
    "theme": {
      "bg": "#070b12",
      "panel": "#0c121c",
      "panel2": "#0f1724",
      "surface": "#121b2a",
      "border": "rgba(148,163,184,0.12)",
      "borderStrong": "rgba(148,163,184,0.20)",
      "text": "#e6edf7",
      "muted": "#8793a6",
      "cyan": "#22d3ee",
      "blue": "#4f7cff",
      "purple": "#8b5cf6",
      "success": "#34d399",
      "warning": "#fbbf24",
      "danger": "#fb7185"
    },
    "layout": {
      "headerHeight": 60,
      "workspaceGap": 8,
      "panelRadius": 14,
      "gridSize": 32
    },
    "status": {
      "nominalLabel": "NOMINAL",
      "nominalDescription": "Automated checks passed; ready for sync.",
      "warningLabel": "WARNING",
      "failedLabel": "FAILED"
    }
  },
  "runtime": {
    "sandbox": {
      "host": "127.0.0.1",
      "port": 8799,
      "wsPath": "/ws",
      "autoStartHint": true,
      "publicAccess": false
    },
    "dev": {
      "vitePort": 5173,
      "unifiedServerPort": 3000
    },
    "cloudflare": {
      "compatibilityDate": "2026-10-02",
      "publicAppUrl": "https://hendy-video-studio-pro.ngogiaidy56.workers.dev",
      "gateway": {
        "workerName": "hendy-video-studio-pro",
        "rootDirectory": "/",
        "main": "frontend/src/edge.ts",
        "assetsDirectory": "./frontend/dist",
        "buildCommand": "bun run build",
        "deployCommand": "bun run worker:deploy",
        "watchPaths": [
          "frontend/**",
          "system-config/**",
          "package.json",
          "bun.lock",
          "wrangler.jsonc"
        ]
      },
      "workers": {
        "backend": {
          "workerName": "hendy-video-studio-pro-backend",
          "rootDirectory": "/backend/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "backend/**",
            "shared/**",
            "system-config/**"
          ]
        },
        "ai": {
          "workerName": "hendy-video-studio-pro-ai",
          "rootDirectory": "/worker/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "worker/**",
            "system-config/**"
          ]
        },
        "mcp": {
          "workerName": "hendy-video-studio-pro-mcp",
          "rootDirectory": "/mcp/cloudflare/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "mcp/cloudflare/**",
            "system-config/**"
          ]
        },
        "telegram": {
          "workerName": "hendy-video-studio-pro-telegram",
          "rootDirectory": "/example_bot/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "example_bot/**",
            "system-config/**"
          ]
        }
      },
      "deployOrder": [
        "backend",
        "ai",
        "mcp",
        "telegram",
        "gateway"
      ]
    }
  },
  "telegram": {
    "adminUserIdsEnv": "ADMIN_USER_IDS",
    "webhookPath": "/telegram/webhook",
    "secretHeader": "X-Telegram-Bot-Api-Secret-Token",
    "d1": {
      "binding": "DB",
      "databaseName": "telegram-bot-db",
      "databaseId": "4925d076-24b7-4d08-a63c-342766ba4036"
    }
  },
  "security": {
    "telegramInitDataMaxAgeSeconds": 300,
    "otpTtlSeconds": 60,
    "requiredSecrets": {
      "backend": [
        "GEMINI_API_KEY",
        "TELEGRAM_BOT_TOKEN",
        "R2_ACCESS_KEY_ID",
        "R2_SECRET_ACCESS_KEY",
        "ADMIN_USER_IDS",
        "MCP_OTP_SECRET"
      ],
      "telegram": [
        "TELEGRAM_BOT_TOKEN",
        "ADMIN_USER_IDS",
        "MCP_OTP_SECRET",
        "TELEGRAM_SECRET_TOKEN"
      ]
    },
    "frontendSecretsForbidden": true,
    "sandboxPublicAccessForbidden": true
  },
  "platforms": {
    "web": {
      "enabled": true
    },
    "pwa": {
      "enabled": true,
      "startUrl": "/",
      "display": "standalone",
      "themeColor": "#070b12",
      "backgroundColor": "#070b12"
    },
    "android": {
      "enabled": true,
      "packageId": "com.aistudiopro.vietsub",
      "appName": "Hendy Video Studio Pro"
    },
    "ios": {
      "enabled": true,
      "bundleId": "com.aistudiopro.vietsub",
      "appName": "Hendy Video Studio Pro"
    }
  },
  "sync": {
    "broadcastEvent": "SYSTEM_CONFIG_SYNCED",
    "releaseGate": "NOMINAL",
    "managedFiles": [
      "package.json",
      "capacitor.config.ts",
      "wrangler.jsonc",
      "backend/package.json",
      "backend/wrangler.jsonc",
      "worker/package.json",
      "worker/wrangler.jsonc",
      "mcp/cloudflare/package.json",
      "mcp/cloudflare/wrangler.jsonc",
      "mcp/cloudflare/src/runtime-config.ts",
      "example_bot/package.json",
      "example_bot/wrangler.jsonc",
      "public/manifest.json",
      "public/_headers",
      "public/sw.js",
      "src/generated/system-config.ts",
      "src/generated/system-theme.css",
      "index.html",
      "frontend/index.html",
      "frontend/package.json",
      "frontend/vite.config.ts",
      "frontend/public/manifest.json",
      "frontend/public/_headers",
      "frontend/public/sw.js",
      "frontend/src/generated/system-config.ts",
      "frontend/src/generated/system-env.ts",
      "frontend/src/generated/system-layout.tsx",
      "frontend/src/generated/system-theme.css"
    ]
  },
  "system": {
    "name": "Hendy Video Studio Pro",
    "version": "3.2.0",
    "environment": "production"
  }
} as const;
export const SYSTEM_CONFIG_VERSION = "3.2.0";

```

## `frontend/src/generated/system-env.ts`

```ts
export type RuntimeEnv = { API_BASE_URL?: string; TELEGRAM_BOT_USERNAME?: string; APP_VERSION: string };
export const runtimeEnv: RuntimeEnv = { API_BASE_URL: import.meta.env.VITE_API_BASE_URL, TELEGRAM_BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME, APP_VERSION: "3.2.0" };

```

## `frontend/src/generated/system-layout.tsx`

```tsx
import type { ReactNode } from 'react';
export function SystemLayout({children}:{children:ReactNode}) { return <div className="system-layout"><main className="system-main">{children}</main><nav className="bottom-action-dock" aria-label="Editor actions"><button>Timeline</button><button>Assets</button><button>Audio</button><button>Export</button></nav></div>; }

```

## `frontend/src/generated/system-theme.css`

```css
:root {
  --sys-bg:#070b12;
  --sys-panel:#0c121c;
  --sys-panel-2:#0f1724;
  --sys-surface:#121b2a;
  --sys-border:rgba(148,163,184,0.12);
  --sys-border-strong:rgba(148,163,184,0.20);
  --sys-text:#e6edf7;
  --sys-muted:#8793a6;
  --sys-cyan:#22d3ee;
  --sys-blue:#4f7cff;
  --sys-purple:#8b5cf6;
  --sys-success:#34d399;
  --sys-warning:#fbbf24;
  --sys-danger:#fb7185;
  --sys-header-height:60px;
  --sys-workspace-gap:8px;
  --sys-panel-radius:14px;
  --sys-grid-size:32px;
  --dark-background-color:var(--sys-bg);
  --dark-container-background-color:var(--sys-panel);
  --accent-color:var(--sys-cyan);
  --text-color:var(--sys-text);
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

## `frontend/src/services/projectStorage.ts`

```ts
import type { Project } from '../types/project';

const STORAGE_KEY = 'aistudio_video_project_v1';

export type StoredPayload = {
  version: 1;
  project: Project;
  savedAt: string;
};

export const DEFAULT_PROJECT: Project = {
  id: 'project-default',
  name: 'Dự án video mới',
  width: 1280,
  height: 720,
  fps: 30,
  durationMs: 60000,
  aspectRatio: '16:9',
  clips: [
    {
      id: 'video-1',
      track: 0,
      kind: 'video',
      startMs: 0,
      endMs: 12000,
      label: 'Video chính'
    },
    {
      id: 'bgm-1',
      track: 1,
      kind: 'audio',
      startMs: 0,
      endMs: 15000,
      label: 'Nhạc nền (BGM)'
    },
    {
      id: 'sub-1',
      track: 2,
      kind: 'subtitle',
      startMs: 500,
      endMs: 4000,
      label: 'Phụ đề 1',
      text: 'Chào mừng bạn đến với AI Studio Pro — Video & Vietsub Workspace'
    },
    {
      id: 'sub-2',
      track: 2,
      kind: 'subtitle',
      startMs: 4500,
      endMs: 8500,
      label: 'Phụ đề 2',
      text: 'Tự động lưu dự án, tách giọng nói STT và tạo thuyết minh AI siêu tốc.'
    }
  ]
};

export function loadStoredProject(): { project: Project; savedAt: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredPayload;
    if (data && data.project && Array.isArray(data.project.clips)) {
      return {
        project: {
          ...DEFAULT_PROJECT,
          ...data.project,
          // ensure clips has valid array
          clips: data.project.clips
        },
        savedAt: data.savedAt || new Date().toISOString()
      };
    }
  } catch (err) {
    console.warn('Lỗi đọc dự án từ localStorage:', err);
  }
  return null;
}

export function saveProjectToStorage(project: Project): string {
  try {
    const now = new Date().toISOString();
    const payload: StoredPayload = {
      version: 1,
      project,
      savedAt: now
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return now;
  } catch (err) {
    console.error('Lỗi lưu dự án vào localStorage:', err);
    return new Date().toISOString();
  }
}

export function clearStoredProject(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Lỗi xoá dự án khỏi localStorage:', err);
  }
}

export function exportProjectAsJson(project: Project): void {
  const json = JSON.stringify(project, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = (project.name || 'du-an-video').toLowerCase().replace(/\s+/g, '-');
  a.href = url;
  a.download = `${safeName}-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importProjectFromJson(file: File): Promise<Project> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text) as Project;
        if (!parsed || !Array.isArray(parsed.clips)) {
          throw new Error('Định dạng file dự án JSON không hợp lệ');
        }
        resolve({
          ...DEFAULT_PROJECT,
          ...parsed,
          id: parsed.id || crypto.randomUUID(),
          clips: parsed.clips
        });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Không thể đọc file'));
    reader.readAsText(file);
  });
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
export type SubtitleStyle = {
  fontFamily: string;
  fontSize: number;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  bottomPx: number;
};

export type ClipKind = 'video' | 'audio' | 'subtitle' | 'transition';

export type Clip = {
  id: string;
  track: number;
  kind: ClipKind;
  startMs: number;
  endMs: number;
  label: string;
  assetId?: string;
  text?: string;
  volume?: number;
  style?: Partial<SubtitleStyle>;
};

export type AspectRatio = '16:9' | '9:16' | '1:1';

export type Project = {
  id: string;
  name?: string;
  width: number;
  height: number;
  fps: number;
  durationMs: number;
  aspectRatio?: AspectRatio;
  clips: Clip[];
};

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
  readonly context: AudioContext | null = null;
  readonly input: Record<ChannelId, GainNode>;
  readonly ducking?: DynamicsCompressorNode;
  private analyser?: AnalyserNode;

  constructor() {
    let ctx: AudioContext | null = null;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (typeof AudioCtx !== 'undefined') {
        ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn('AudioContext unavailable:', e);
    }

    this.context = ctx;
    if (ctx) {
      try {
        const master = ctx.createGain();
        const limiter = ctx.createDynamicsCompressor();
        limiter.threshold.value = -2;
        limiter.knee.value = 0;
        limiter.ratio.value = 20;
        limiter.attack.value = 0.003;
        limiter.release.value = 0.08;
        this.ducking = ctx.createDynamicsCompressor();
        this.analyser = ctx.createAnalyser();
        this.analyser.fftSize = 1024;
        master.connect(limiter).connect(this.analyser).connect(ctx.destination);
        this.input = {
          video: this.node('video', master),
          bgm: this.node('bgm', master),
          tts: this.node('tts', master),
          master
        } as Record<ChannelId, GainNode>;
        return;
      } catch (err) {
        console.warn('Audio graph creation failed:', err);
      }
    }

    this.input = {
      video: {} as GainNode,
      bgm: {} as GainNode,
      tts: {} as GainNode,
      master: {} as GainNode,
    };
  }

  private node(_id: string, destination: AudioNode) {
    if (!this.context) return {} as GainNode;
    const gain = this.context.createGain();
    gain.connect(destination);
    return gain;
  }

  setGain(id: ChannelId, gain: number, muted = false) {
    const node = this.input[id];
    if (this.context && node && node.gain) {
      try {
        node.gain.setTargetAtTime(muted ? 0 : gain, this.context.currentTime, 0.03);
      } catch {}
    }
  }

  setDucking(enabled: boolean, gain = 0.2) {
    const bgm = this.input.bgm;
    if (this.context && bgm && bgm.gain) {
      try {
        bgm.gain.setTargetAtTime(enabled ? gain : bgm.gain.value, this.context.currentTime, 0.08);
      } catch {}
    }
  }

  meter(_id: ChannelId): number {
    if (!this.analyser) return 0;
    try {
      const data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / Math.max(1, data.length);
      return Math.min(1, avg / 128);
    } catch {
      return 0;
    }
  }

  async resume() {
    if (this.context && this.context.state !== 'running') {
      try {
        await this.context.resume();
      } catch (e) {
        console.warn('AudioContext resume failed:', e);
      }
    }
  }

  close() {
    if (this.context) {
      void this.context.close().catch(() => {});
    }
  }
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
    recorder.onerror = (e) => reject((e as ErrorEvent).error || new Error('MediaRecorder failed'));
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
{"compilerOptions":{"target":"ES2022","useDefineForClassFields":true,"lib":["DOM","DOM.Iterable","ES2022"],"allowJs":false,"skipLibCheck":true,"esModuleInterop":true,"allowSyntheticDefaultImports":true,"strict":true,"module":"ESNext","moduleResolution":"Bundler","resolveJsonModule":true,"isolatedModules":true,"noEmit":true,"jsx":"react-jsx"},"include":["src"],"exclude":["src/edge.ts"]}

```

## `frontend/vite.config.ts`

```ts
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({plugins:[tailwindcss(),react()],server:{port:5173,host:'127.0.0.1',strictPort:true,hmr:true}});

```

## `index.html`

```html
<!doctype html><html lang="vi"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"/><meta name="theme-color" content="#070b12"/><meta name="mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-capable" content="yes"/><link rel="manifest" href="/manifest.json"/><title>Hendy Video Studio Pro</title><meta name="description" content="AI video editor, Vietnamese subtitles, TTS voiceover, multi-channel audio and Cloudflare production workspace."/><script src="https://telegram.org/js/telegram-web-app.js"></script></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>

```

## `mcp/cloudflare/package.json`

```json
{
  "name": "@hendy/mcp-control-plane",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx src/index.ts",
    "prebuild": "node ../../system-config/scripts/sync-config.mjs --sync",
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "deploy": "wrangler deploy --config wrangler.jsonc"
  },
  "dependencies": {
    "@modelcontextprotocol/server": "2.0.0",
    "agents": "0.24.0",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "5.20260927.1",
    "@types/node": "^24.4.0",
    "tsx": "^4.20.5",
    "typescript": "^5.9.3",
    "wrangler": "4.141.0"
  }
}

```

## `mcp/cloudflare/src/index.ts`

```ts
import {createServer} from 'node:http';
const port=Number(process.env.MCP_PORT || 8790);
createServer((req,res)=>{
  if(req.url==='/health'){res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({ok:true,service:'mcp-local'}));return;}
  res.writeHead(404);res.end();
}).listen(port,'127.0.0.1',()=>console.log('MCP local health server on :' + port));

```

## `mcp/cloudflare/src/policies/allowlist.ts`

```ts
export const ALLOWED_TOOLS = ['config.validate','sandbox.dryRun','github.getBuildStatus','cloudflare.getDeployment','cloudflare.deployRelease','cloudflare.rollbackRelease','observability.getErrors'] as const;
export type AllowedTool=typeof ALLOWED_TOOLS[number];

```

## `mcp/cloudflare/src/runtime-config.ts`

```ts
export const MCP_RUNTIME = {
  "version": "3.2.0",
  "publicAppUrl": "https://hendy-video-studio-pro.ngogiaidy56.workers.dev"
} as const;

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

## `mcp/cloudflare/src/worker.ts`

```ts
import {createMcpHandler} from 'agents/mcp/server';
import {McpServer} from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import {MCP_RUNTIME} from './runtime-config.js';

function createServer(){
  const server=new McpServer({name:'Hendy Video Studio Pro Control Plane',version:MCP_RUNTIME.version});

  server.registerTool('system.health',{
    title:'System health',
    description:'Check the public Hendy production gateway and service health.',
    inputSchema:z.object({})
  },async()=>{
    const paths=['/health','/api/health','/api/ai/health','/telegram/health'];
    const checks=await Promise.all(paths.map(async p=>{
      try{
        const r=await fetch(MCP_RUNTIME.publicAppUrl+p,{cache:'no-store'});
        return {path:p,status:r.status,ok:r.ok};
      }catch(e){
        return {path:p,status:0,ok:false,error:e instanceof Error?e.message:String(e)};
      }
    }));
    return {content:[{type:'text',text:JSON.stringify({ok:checks.every(x=>x.ok),checks},null,2)}]};
  });

  server.registerTool('release.info',{
    title:'Release info',
    description:'Return current application release information.',
    inputSchema:z.object({})
  },async()=>({content:[{type:'text',text:JSON.stringify({
    version:MCP_RUNTIME.version,
    architecture:'gateway+backend-worker+ai-worker+mcp-worker+telegram-worker',
    status:'production'
  },null,2)}]}));

  return server;
}

const handler=createMcpHandler(createServer);

export default {
  fetch(request:Request,env:unknown,ctx:ExecutionContext){
    const url=new URL(request.url);
    if(url.pathname==='/health'){
      return Response.json({ok:true,service:'mcp',version:MCP_RUNTIME.version,runtime:'cloudflare-workers'},{headers:{'cache-control':'no-store'}});
    }
    return handler(request,env,ctx);
  }
} satisfies ExportedHandler;

```

## `mcp/cloudflare/tsconfig.json`

```json
{
  "compilerOptions":{"target":"ES2022","module":"ESNext","moduleResolution":"Bundler","strict":true,"skipLibCheck":true,"types":["@cloudflare/workers-types"]},
  "include":["src/worker.ts"]
}

```

## `mcp/cloudflare/wrangler.jsonc`

```jsonc
{
  "$schema": "../../node_modules/wrangler/config-schema.json",
  "name": "hendy-video-studio-pro-mcp",
  "main": "src/worker.ts",
  "compatibility_date": "2026-10-02",
  "vars": {
    "APP_VERSION": "3.2.0",
    "PUBLIC_APP_URL": "https://hendy-video-studio-pro.ngogiaidy56.workers.dev"
  },
  "dev": {
    "port": 8790
  }
}

```

## `metadata.json`

```json
{
  "name": "Hendy Video Studio Pro",
  "description": "Professional AI-powered video and subtitle editing studio with multi-track timeline, Vietnamese text enhancement, and Gemini audio processing.",
  "capabilities": [
    "MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"
  ],
  "version": "3.2.0"
}

```

## `package.json`

```json
{
  "name": "hendy-video-studio-pro",
  "private": true,
  "version": "3.2.0",
  "type": "module",
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
    "config:sync": "node system-config/scripts/sync-config.mjs --sync",
    "config:dry-run": "node system-config/scripts/sync-config.mjs --dry-run",
    "config:auto-patch": "node system-config/scripts/sync-config.mjs --auto-patch",
    "dev": "npm run config:sync && tsx server.ts",
    "build": "npm run config:validate && npm run config:sync && npm --workspace frontend run build",
    "build:all": "npm run release:gate",
    "start": "tsx server.ts",
    "typecheck": "npm run typecheck:frontend && npm run typecheck:backend && npm run typecheck:worker && npm run typecheck:mcp && npm run typecheck:telegram",
    "typecheck:frontend": "npm --workspace frontend run typecheck",
    "typecheck:backend": "npm --workspace backend run typecheck",
    "typecheck:worker": "npm --workspace worker run typecheck",
    "typecheck:mcp": "npm --workspace mcp/cloudflare run typecheck",
    "typecheck:telegram": "npm --workspace example_bot run typecheck",
    "sandbox": "node system-config/sandbox/server.mjs",
    "release:gate": "npm run config:validate && npm run config:sync && npm run typecheck && npm --workspace frontend run build && npm --workspace backend run build && npm --workspace worker run build && npm --workspace mcp/cloudflare run build && npm --workspace example_bot run build",
    "worker:deploy": "node system-config/scripts/deploy-all.mjs",
    "deploy": "node system-config/scripts/deploy-all.mjs",
    "deploy:all": "node system-config/scripts/deploy-all.mjs",
    "production:check": "node system-config/scripts/production-check.mjs"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
    "ws": "^8.22.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.3",
    "@types/node": "^24.4.0",
    "@types/ws": "^8.18.1",
    "tsx": "^4.20.5",
    "typescript": "^5.9.3",
    "vite": "^7.3.6"
  },
  "engines": {
    "node": ">=22 <25"
  },
  "packageManager": "bun@1.2.15"
}

```

## `public/manifest.json`

```json
{
  "name": "Hendy Video Studio Pro",
  "short_name": "Hendy Studio Pro",
  "description": "AI video editor, Vietnamese subtitles, TTS voiceover, multi-channel audio and Cloudflare production workspace.",
  "lang": "vi",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "any",
  "theme_color": "#070b12",
  "background_color": "#070b12",
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

## `public/sw.js`

```js
const CACHE="hendy-studio-3-2-0";
const SHELL=['/','/manifest.json'];
const BYPASS=/^\/(api|mcp|telegram)(\/|$)/;
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin||BYPASS.test(new URL(r.url).pathname))return;if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{caches.open(CACHE).then(c=>c.put(r,res.clone()));return res}).catch(()=>caches.match('/')));return;}e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(res=>{if(res.ok)caches.open(CACHE).then(c=>c.put(r,res.clone()));return res})));});

```

## `server.ts`

```ts
import 'dotenv/config';
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import express from 'express';
import { createApp } from './backend/src/app.js';

async function startServer() {
  const app = createApp();
  const httpServer = http.createServer(app);
  const PORT = Number(process.env.PORT || 3000);
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      root: path.resolve('frontend'),
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        hmr: {
          server: httpServer,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use(async (req, res, next) => {
      if (req.method !== 'GET' || req.originalUrl.startsWith('/api/') || req.originalUrl.startsWith('/health')) {
        return next();
      }
      try {
        const url = req.originalUrl;
        const templatePath = path.resolve('frontend/index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve('frontend/dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.use((req, res, next) => {
        if (req.method === 'GET' && !req.originalUrl.startsWith('/api/')) {
          return res.sendFile(path.join(distPath, 'index.html'));
        }
        next();
      });
    }
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

```

## `shared/constants/limits.ts`

```ts
export const LIMITS={maxProjectDurationMs:60*60*1000,maxUploadBytes:100*1024*1024,maxUndoSnapshots:100} as const;

```

## `shared/types/config.ts`

```ts
export type SystemConfig={app:{name:string;shortName:string;product:string;version:string;description:string;language:string};toolchain:Record<string,string>;features:Record<string,boolean>;api:Record<string,number|string>;ai:{provider:string;models:Record<string,string>;temperature:number;cloudflareTtsModel:string};storage:{provider:string;bucketName:string;bucketEnv:string;accountId:string;endpoint:string;zeroEgress:boolean;publicAccess:boolean};editor:{audioChannels:string[];duckingGain:number;transitionGapSeconds:number;defaultWidth:number;defaultHeight:number;defaultFps:number;defaultSubtitleStyle:Record<string,unknown>};ui:Record<string,unknown>;runtime:Record<string,unknown>;telegram:Record<string,unknown>;security:Record<string,unknown>;platforms:Record<string,unknown>;sync:{broadcastEvent:string;releaseGate:string;managedFiles:string[]}};

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

## `src/generated/system-config.ts`

```ts
export const SYSTEM_CONFIG = {
  "$schema": "./schema/system-config.schema.json",
  "app": {
    "name": "Hendy Video Studio Pro",
    "shortName": "Hendy Studio Pro",
    "product": "AI Video + Vietsub Workspace",
    "version": "3.2.0",
    "description": "AI video editor, Vietnamese subtitles, TTS voiceover, multi-channel audio and Cloudflare production workspace.",
    "language": "vi"
  },
  "toolchain": {
    "bun": "1.2.15",
    "node": ">=22 <25",
    "wrangler": "4.141.0",
    "workersTypes": "5.20260927.1",
    "typescript": "5.9.3"
  },
  "features": {
    "linkExtractor": true,
    "imageOCR": true,
    "audioSTT": true,
    "audioDucking": true,
    "offlineFirst": true,
    "telegramAdmin": true,
    "mcpControlPlane": true,
    "r2Storage": true,
    "d1Telemetry": true
  },
  "api": {
    "basePath": "/api/v1",
    "aiPath": "/api/ai",
    "mcpPath": "/mcp",
    "telegramPath": "/telegram",
    "maxJsonBodyBytes": 4194304,
    "maxUploadBytes": 104857600,
    "requestTimeoutMs": 30000
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
    "temperature": 0.1,
    "cloudflareTtsModel": "@cf/myshell-ai/melotts"
  },
  "storage": {
    "provider": "cloudflare-r2",
    "bucketName": "hendy-video-studio-pro-media",
    "bucketEnv": "R2_BUCKET",
    "accountId": "918ff2f016938fc978ed23b96505b21e",
    "endpoint": "https://918ff2f016938fc978ed23b96505b21e.r2.cloudflarestorage.com",
    "zeroEgress": true,
    "publicAccess": false
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
  "ui": {
    "theme": {
      "bg": "#070b12",
      "panel": "#0c121c",
      "panel2": "#0f1724",
      "surface": "#121b2a",
      "border": "rgba(148,163,184,0.12)",
      "borderStrong": "rgba(148,163,184,0.20)",
      "text": "#e6edf7",
      "muted": "#8793a6",
      "cyan": "#22d3ee",
      "blue": "#4f7cff",
      "purple": "#8b5cf6",
      "success": "#34d399",
      "warning": "#fbbf24",
      "danger": "#fb7185"
    },
    "layout": {
      "headerHeight": 60,
      "workspaceGap": 8,
      "panelRadius": 14,
      "gridSize": 32
    },
    "status": {
      "nominalLabel": "NOMINAL",
      "nominalDescription": "Automated checks passed; ready for sync.",
      "warningLabel": "WARNING",
      "failedLabel": "FAILED"
    }
  },
  "runtime": {
    "sandbox": {
      "host": "127.0.0.1",
      "port": 8799,
      "wsPath": "/ws",
      "autoStartHint": true,
      "publicAccess": false
    },
    "dev": {
      "vitePort": 5173,
      "unifiedServerPort": 3000
    },
    "cloudflare": {
      "compatibilityDate": "2026-10-02",
      "publicAppUrl": "https://hendy-video-studio-pro.ngogiaidy56.workers.dev",
      "gateway": {
        "workerName": "hendy-video-studio-pro",
        "rootDirectory": "/",
        "main": "frontend/src/edge.ts",
        "assetsDirectory": "./frontend/dist",
        "buildCommand": "bun run build",
        "deployCommand": "bun run worker:deploy",
        "watchPaths": [
          "frontend/**",
          "system-config/**",
          "package.json",
          "bun.lock",
          "wrangler.jsonc"
        ]
      },
      "workers": {
        "backend": {
          "workerName": "hendy-video-studio-pro-backend",
          "rootDirectory": "/backend/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "backend/**",
            "shared/**",
            "system-config/**"
          ]
        },
        "ai": {
          "workerName": "hendy-video-studio-pro-ai",
          "rootDirectory": "/worker/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "worker/**",
            "system-config/**"
          ]
        },
        "mcp": {
          "workerName": "hendy-video-studio-pro-mcp",
          "rootDirectory": "/mcp/cloudflare/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "mcp/cloudflare/**",
            "system-config/**"
          ]
        },
        "telegram": {
          "workerName": "hendy-video-studio-pro-telegram",
          "rootDirectory": "/example_bot/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "example_bot/**",
            "system-config/**"
          ]
        }
      },
      "deployOrder": [
        "backend",
        "ai",
        "mcp",
        "telegram",
        "gateway"
      ]
    }
  },
  "telegram": {
    "adminUserIdsEnv": "ADMIN_USER_IDS",
    "webhookPath": "/telegram/webhook",
    "secretHeader": "X-Telegram-Bot-Api-Secret-Token",
    "d1": {
      "binding": "DB",
      "databaseName": "telegram-bot-db",
      "databaseId": "4925d076-24b7-4d08-a63c-342766ba4036"
    }
  },
  "security": {
    "telegramInitDataMaxAgeSeconds": 300,
    "otpTtlSeconds": 60,
    "requiredSecrets": {
      "backend": [
        "GEMINI_API_KEY",
        "TELEGRAM_BOT_TOKEN",
        "R2_ACCESS_KEY_ID",
        "R2_SECRET_ACCESS_KEY",
        "ADMIN_USER_IDS",
        "MCP_OTP_SECRET"
      ],
      "telegram": [
        "TELEGRAM_BOT_TOKEN",
        "ADMIN_USER_IDS",
        "MCP_OTP_SECRET",
        "TELEGRAM_SECRET_TOKEN"
      ]
    },
    "frontendSecretsForbidden": true,
    "sandboxPublicAccessForbidden": true
  },
  "platforms": {
    "web": {
      "enabled": true
    },
    "pwa": {
      "enabled": true,
      "startUrl": "/",
      "display": "standalone",
      "themeColor": "#070b12",
      "backgroundColor": "#070b12"
    },
    "android": {
      "enabled": true,
      "packageId": "com.aistudiopro.vietsub",
      "appName": "Hendy Video Studio Pro"
    },
    "ios": {
      "enabled": true,
      "bundleId": "com.aistudiopro.vietsub",
      "appName": "Hendy Video Studio Pro"
    }
  },
  "sync": {
    "broadcastEvent": "SYSTEM_CONFIG_SYNCED",
    "releaseGate": "NOMINAL",
    "managedFiles": [
      "package.json",
      "capacitor.config.ts",
      "wrangler.jsonc",
      "backend/package.json",
      "backend/wrangler.jsonc",
      "worker/package.json",
      "worker/wrangler.jsonc",
      "mcp/cloudflare/package.json",
      "mcp/cloudflare/wrangler.jsonc",
      "mcp/cloudflare/src/runtime-config.ts",
      "example_bot/package.json",
      "example_bot/wrangler.jsonc",
      "public/manifest.json",
      "public/_headers",
      "public/sw.js",
      "src/generated/system-config.ts",
      "src/generated/system-theme.css",
      "index.html",
      "frontend/index.html",
      "frontend/package.json",
      "frontend/vite.config.ts",
      "frontend/public/manifest.json",
      "frontend/public/_headers",
      "frontend/public/sw.js",
      "frontend/src/generated/system-config.ts",
      "frontend/src/generated/system-env.ts",
      "frontend/src/generated/system-layout.tsx",
      "frontend/src/generated/system-theme.css"
    ]
  },
  "system": {
    "name": "Hendy Video Studio Pro",
    "version": "3.2.0",
    "environment": "production"
  }
} as const;
export const SYSTEM_CONFIG_VERSION = "3.2.0";

```

## `src/generated/system-theme.css`

```css
:root {
  --sys-bg:#070b12;
  --sys-panel:#0c121c;
  --sys-panel-2:#0f1724;
  --sys-surface:#121b2a;
  --sys-border:rgba(148,163,184,0.12);
  --sys-border-strong:rgba(148,163,184,0.20);
  --sys-text:#e6edf7;
  --sys-muted:#8793a6;
  --sys-cyan:#22d3ee;
  --sys-blue:#4f7cff;
  --sys-purple:#8b5cf6;
  --sys-success:#34d399;
  --sys-warning:#fbbf24;
  --sys-danger:#fb7185;
  --sys-header-height:60px;
  --sys-workspace-gap:8px;
  --sys-panel-radius:14px;
  --sys-grid-size:32px;
  --dark-background-color:var(--sys-bg);
  --dark-container-background-color:var(--sys-panel);
  --accent-color:var(--sys-cyan);
  --text-color:var(--sys-text);
}

```

## `system-config/README.md`

```md
# System Config v3.2.0 — Single Source of Truth

`system-config/system.config.json` là nguồn cấu hình chuẩn duy nhất cho Hendy Video Studio Pro.

## Quy trình chuẩn

``\`bash
npm run config:validate
npm run config:dry-run
npm run config:sync
npm run release:gate
``\`

`config:validate` kiểm tra cấu trúc SOT.
`config:dry-run` phát hiện drift trước khi sync.
`config:sync` tạo lại các file được quản lý.
`release:gate` chạy typecheck + build cho các workspace trước khi deploy production.

## Cloudflare monorepo

Có 5 Workers:

- `hendy-video-studio-pro` — Gateway + React Static Assets
- `hendy-video-studio-pro-backend` — Express API + Gemini + R2
- `hendy-video-studio-pro-ai` — Workers AI / MeloTTS
- `hendy-video-studio-pro-mcp` — MCP stateless Streamable HTTP
- `hendy-video-studio-pro-telegram` — Telegram Webhook + D1

Mỗi Worker có `rootDirectory`, `buildCommand`, `deployCommand` và `watchPaths` trong SOT để Dashboard Cloudflare dùng cùng một chuẩn.

## Security

Không lưu API key, bot token, R2 Access Key/Secret hoặc OTP secret trong SOT/frontend bundle. SOT chỉ lưu tên secret và thông tin non-secret như Account ID, bucket, endpoint.

Sandbox WebSocket `127.0.0.1:8799/ws` chỉ dành cho local development.

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
  "dependencies": {}
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
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import { watch as watchFile } from 'node:fs';
import WebSocket, { WebSocketServer } from 'ws';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const SOT = path.join(ROOT, 'system-config/system.config.json');
let config = await loadConfig();
const PORT = config.runtime.sandbox.port;
const HOST = config.runtime.sandbox.host;
const telemetry = [];
const clients = new Set();
let lastGate = { status: 'IDLE', progress: 0, message: 'Sandbox ready' };
let running = false;
let debounceTimer = null;

async function loadConfig() {
  return JSON.parse(await fs.readFile(SOT, 'utf8'));
}

function push(event, payload = {}) {
  const item = { ts: new Date().toISOString(), event, ...payload };
  telemetry.push(item);
  while (telemetry.length > 250) telemetry.shift();
  const text = JSON.stringify(item);
  for (const ws of clients) if (ws.readyState === WebSocket.OPEN) ws.send(text);
}

function runNode(args) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, args, { cwd: ROOT, env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '';
    child.stdout.on('data', d => output += d.toString());
    child.stderr.on('data', d => output += d.toString());
    child.on('close', code => resolve({ code: code ?? 1, output }));
  });
}

async function gate({ autoPatch = false, sync = false, reason = 'manual' } = {}) {
  if (running) return { ok: false, busy: true };
  running = true;
  try {
    config = await loadConfig();
    lastGate = { status: 'RUNNING', progress: 5, message: 'Starting isolated validation gate' };
    push('GATE_STARTED', { autoPatch, sync, reason, version: config.app.version });

    const steps = [];
    if (autoPatch) {
      const r = await runNode(['system-config/scripts/sync-config.mjs', '--auto-patch']);
      steps.push({ name: 'auto-patch', ...r });
      push('AUTO_PATCH', { ok: r.code === 0, output: r.output.slice(-3000) });
      if (r.code !== 0) return finish(false, steps, 'Auto-patch failed');
      config = await loadConfig();
    }

    lastGate = { status: 'RUNNING', progress: 35, message: 'Validating source of truth' };
    const valid = await runNode(['system-config/scripts/sync-config.mjs', '--validate']);
    steps.push({ name: 'validate', ...valid });
    push('VALIDATION', { ok: valid.code === 0, output: valid.output.slice(-3000) });
    if (valid.code !== 0) return finish(false, steps, 'Configuration validation failed');

    if (sync) {
      lastGate = { status: 'RUNNING', progress: 48, message: 'Staging synchronized configuration locally' };
      const staged = await runNode(['system-config/scripts/sync-config.mjs', '--sync']);
      steps.push({ name: 'sync-stage', ...staged });
      push('SYNC_STAGED', { ok: staged.code === 0, output: staged.output.slice(-3000) });
      if (staged.code !== 0) return finish(false, steps, 'Configuration staging failed');
      config = await loadConfig();
    }

    lastGate = { status: 'RUNNING', progress: 60, message: 'Running strict configuration dry-run' };
    const dry = await runNode(['system-config/scripts/sync-config.mjs', '--dry-run', '--strict-dry-run']);
    steps.push({ name: 'dry-run', ...dry });
    push('DRY_RUN', { ok: dry.code === 0, output: dry.output.slice(-3000) });
    if (dry.code !== 0) return finish(false, steps, 'Managed configuration drift detected');

    lastGate = { status: 'RUNNING', progress: 85, message: 'Running TypeScript/build gate' };
    const gateResult = await runNode(['system-config/scripts/release-gate.mjs']);
    steps.push({ name: 'release-gate', ...gateResult });
    push('BUILD_GATE', { ok: gateResult.code === 0, output: gateResult.output.slice(-4000) });
    if (gateResult.code !== 0) return finish(false, steps, 'Static/build gate failed');

    config = await loadConfig();
    lastGate = { status: 'NOMINAL', progress: 100, message: 'All automated static/build checks passed' };
    push('GATE_NOMINAL', { progress: 100, message: lastGate.message });
    if (sync) {
      const platforms = Object.entries(config.platforms).filter(([, v]) => v.enabled).map(([k]) => k);
      push(config.sync.broadcastEvent, { version: config.app.version, platforms });
    }
    return { ok: true, steps };
  } finally {
    running = false;
  }
}

function finish(ok, steps, message) {
  lastGate = { status: 'FAILED', progress: 100, message };
  push('GATE_FAILED', { steps, message });
  return { ok, steps };
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: lastGate.status !== 'FAILED', status: lastGate.status, gate: lastGate, clients: clients.size, running, version: config.app.version }));
    return;
  }
  res.writeHead(404);
  res.end('Not found');
});

const wss = new WebSocketServer({ server, path: config.runtime.sandbox.wsPath });
wss.on('connection', (ws) => {
  clients.add(ws);
  ws.send(JSON.stringify({ ts: new Date().toISOString(), event: 'SANDBOX_CONNECTED', gate: lastGate, version: config.app.version }));
  ws.send(JSON.stringify({ ts: new Date().toISOString(), event: 'TELEMETRY_SNAPSHOT', items: telemetry.slice(-50) }));
  ws.on('message', async raw => {
    let message;
    try { message = JSON.parse(raw.toString()); } catch { ws.send(JSON.stringify({ event: 'ERROR', message: 'Invalid JSON' })); return; }
    if (message.command === 'status') {
      ws.send(JSON.stringify({ event: 'STATUS', gate: lastGate, clients: clients.size, version: config.app.version }));
      return;
    }
    if (message.command === 'dry-run') await gate({ reason: 'remote-dry-run' });
    else if (message.command === 'auto-patch') await gate({ autoPatch: true, reason: 'remote-auto-patch' });
    else if (message.command === 'sync') await gate({ autoPatch: true, sync: true, reason: 'remote-sync' });
    else ws.send(JSON.stringify({ event: 'ERROR', message: 'Unknown command' }));
  });
  ws.on('close', () => clients.delete(ws));
});

if (process.argv.includes('--watch')) {
  let lastMtime = 0;
  watchFile(SOT, { persistent: true }, async (_event, stat) => {
    if (!stat?.mtimeMs || stat.mtimeMs === lastMtime) return;
    lastMtime = stat.mtimeMs;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      push('SOT_CHANGED', { file: 'system-config/system.config.json' });
      const result = await gate({ autoPatch: true, sync: true, reason: 'source-of-truth-change' });
      if (!result.ok) push('AUTO_SYNC_BLOCKED', { reason: 'NOMINAL gate not reached' });
    }, 250);
  });
}

server.listen(PORT, HOST, () => {
  console.log(`System WebSocket Sandbox listening on ws://${HOST}:${PORT}${config.runtime.sandbox.wsPath}`);
  push('SANDBOX_READY', { host: HOST, port: PORT, wsPath: config.runtime.sandbox.wsPath, version: config.app.version, watch: process.argv.includes('--watch') });
});

```

## `system-config/schema/system-config.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://hendy-video-studio.local/schemas/system-config-v3.2.json",
  "title": "Hendy Video Studio Pro v3.2 System Source of Truth",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "$schema",
    "app",
    "toolchain",
    "features",
    "api",
    "ai",
    "storage",
    "editor",
    "ui",
    "runtime",
    "telegram",
    "security",
    "platforms",
    "sync"
  ],
  "properties": {
    "$schema": {
      "type": "string"
    },
    "app": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "name",
        "shortName",
        "product",
        "version",
        "description",
        "language"
      ],
      "properties": {
        "name": {
          "type": "string",
          "minLength": 2
        },
        "shortName": {
          "type": "string",
          "minLength": 2
        },
        "product": {
          "type": "string",
          "minLength": 2
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+\\.\\d+$"
        },
        "description": {
          "type": "string",
          "minLength": 10
        },
        "language": {
          "type": "string",
          "minLength": 2
        }
      }
    },
    "toolchain": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "bun",
        "node",
        "wrangler",
        "workersTypes",
        "typescript"
      ],
      "properties": {
        "bun": {
          "type": "string"
        },
        "node": {
          "type": "string"
        },
        "wrangler": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+\\.\\d+$"
        },
        "workersTypes": {
          "type": "string",
          "pattern": "^\\d+\\.\\d{8}\\.\\d+$"
        },
        "typescript": {
          "type": "string"
        }
      }
    },
    "features": {
      "type": "object",
      "additionalProperties": {
        "type": "boolean"
      }
    },
    "api": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "basePath",
        "aiPath",
        "mcpPath",
        "telegramPath",
        "maxJsonBodyBytes",
        "maxUploadBytes",
        "requestTimeoutMs"
      ],
      "properties": {
        "basePath": {
          "type": "string",
          "pattern": "^/"
        },
        "aiPath": {
          "type": "string",
          "pattern": "^/"
        },
        "mcpPath": {
          "type": "string",
          "pattern": "^/"
        },
        "telegramPath": {
          "type": "string",
          "pattern": "^/"
        },
        "maxJsonBodyBytes": {
          "type": "integer",
          "minimum": 1024
        },
        "maxUploadBytes": {
          "type": "integer",
          "minimum": 1024
        },
        "requestTimeoutMs": {
          "type": "integer",
          "minimum": 1000
        }
      }
    },
    "ai": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "provider",
        "models",
        "temperature",
        "cloudflareTtsModel"
      ],
      "properties": {
        "provider": {
          "type": "string"
        },
        "models": {
          "type": "object",
          "additionalProperties": {
            "type": "string",
            "minLength": 1
          }
        },
        "temperature": {
          "type": "number",
          "minimum": 0,
          "maximum": 2
        },
        "cloudflareTtsModel": {
          "type": "string",
          "minLength": 1
        }
      }
    },
    "storage": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "provider",
        "bucketName",
        "bucketEnv",
        "accountId",
        "endpoint",
        "zeroEgress",
        "publicAccess"
      ],
      "properties": {
        "provider": {
          "type": "string"
        },
        "bucketName": {
          "type": "string",
          "minLength": 3
        },
        "bucketEnv": {
          "type": "string",
          "minLength": 1
        },
        "accountId": {
          "type": "string",
          "minLength": 20
        },
        "endpoint": {
          "type": "string",
          "pattern": "^https://.+\\.r2\\.cloudflarestorage\\.com$"
        },
        "zeroEgress": {
          "type": "boolean"
        },
        "publicAccess": {
          "type": "boolean"
        }
      }
    },
    "editor": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "audioChannels",
        "duckingGain",
        "transitionGapSeconds",
        "defaultWidth",
        "defaultHeight",
        "defaultFps",
        "defaultSubtitleStyle"
      ],
      "properties": {
        "audioChannels": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string"
          }
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
          "additionalProperties": false,
          "required": [
            "fontFamily",
            "fontSize",
            "color",
            "strokeColor",
            "strokeWidth",
            "bottomPx"
          ],
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
      }
    },
    "ui": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "theme",
        "layout",
        "status"
      ],
      "properties": {
        "theme": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "bg",
            "panel",
            "panel2",
            "surface",
            "border",
            "borderStrong",
            "text",
            "muted",
            "cyan",
            "blue",
            "purple",
            "success",
            "warning",
            "danger"
          ],
          "properties": {
            "bg": {
              "type": "string"
            },
            "panel": {
              "type": "string"
            },
            "panel2": {
              "type": "string"
            },
            "surface": {
              "type": "string"
            },
            "border": {
              "type": "string"
            },
            "borderStrong": {
              "type": "string"
            },
            "text": {
              "type": "string"
            },
            "muted": {
              "type": "string"
            },
            "cyan": {
              "type": "string"
            },
            "blue": {
              "type": "string"
            },
            "purple": {
              "type": "string"
            },
            "success": {
              "type": "string"
            },
            "warning": {
              "type": "string"
            },
            "danger": {
              "type": "string"
            }
          }
        },
        "layout": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "headerHeight",
            "workspaceGap",
            "panelRadius",
            "gridSize"
          ],
          "properties": {
            "headerHeight": {
              "type": "integer",
              "minimum": 32
            },
            "workspaceGap": {
              "type": "integer",
              "minimum": 0
            },
            "panelRadius": {
              "type": "integer",
              "minimum": 0
            },
            "gridSize": {
              "type": "integer",
              "minimum": 8
            }
          }
        },
        "status": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "nominalLabel",
            "nominalDescription",
            "warningLabel",
            "failedLabel"
          ],
          "properties": {
            "nominalLabel": {
              "type": "string"
            },
            "nominalDescription": {
              "type": "string"
            },
            "warningLabel": {
              "type": "string"
            },
            "failedLabel": {
              "type": "string"
            }
          }
        }
      }
    },
    "runtime": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "sandbox",
        "dev",
        "cloudflare"
      ],
      "properties": {
        "sandbox": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "host",
            "port",
            "wsPath",
            "autoStartHint",
            "publicAccess"
          ],
          "properties": {
            "host": {
              "type": "string"
            },
            "port": {
              "type": "integer",
              "minimum": 1024,
              "maximum": 65535
            },
            "wsPath": {
              "type": "string",
              "pattern": "^/"
            },
            "autoStartHint": {
              "type": "boolean"
            },
            "publicAccess": {
              "type": "boolean"
            }
          }
        },
        "dev": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "vitePort",
            "unifiedServerPort"
          ],
          "properties": {
            "vitePort": {
              "type": "integer",
              "minimum": 1024,
              "maximum": 65535
            },
            "unifiedServerPort": {
              "type": "integer",
              "minimum": 1024,
              "maximum": 65535
            }
          }
        },
        "cloudflare": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "compatibilityDate",
            "publicAppUrl",
            "gateway",
            "workers",
            "deployOrder"
          ],
          "properties": {
            "compatibilityDate": {
              "type": "string"
            },
            "publicAppUrl": {
              "type": "string",
              "pattern": "^https://"
            },
            "gateway": {
              "$ref": "#/$defs/workerTarget"
            },
            "workers": {
              "type": "object",
              "additionalProperties": false,
              "required": [
                "backend",
                "ai",
                "mcp",
                "telegram"
              ],
              "properties": {
                "backend": {
                  "$ref": "#/$defs/workerTarget"
                },
                "ai": {
                  "$ref": "#/$defs/workerTarget"
                },
                "mcp": {
                  "$ref": "#/$defs/workerTarget"
                },
                "telegram": {
                  "$ref": "#/$defs/workerTarget"
                }
              }
            },
            "deployOrder": {
              "type": "array",
              "minItems": 5,
              "items": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "telegram": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "adminUserIdsEnv",
        "webhookPath",
        "secretHeader",
        "d1"
      ],
      "properties": {
        "adminUserIdsEnv": {
          "type": "string"
        },
        "webhookPath": {
          "type": "string",
          "pattern": "^/"
        },
        "secretHeader": {
          "type": "string"
        },
        "d1": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "binding",
            "databaseName",
            "databaseId"
          ],
          "properties": {
            "binding": {
              "type": "string"
            },
            "databaseName": {
              "type": "string"
            },
            "databaseId": {
              "type": "string"
            }
          }
        }
      }
    },
    "security": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "telegramInitDataMaxAgeSeconds",
        "otpTtlSeconds",
        "requiredSecrets",
        "frontendSecretsForbidden",
        "sandboxPublicAccessForbidden"
      ],
      "properties": {
        "telegramInitDataMaxAgeSeconds": {
          "type": "integer",
          "minimum": 60
        },
        "otpTtlSeconds": {
          "type": "integer",
          "minimum": 30
        },
        "requiredSecrets": {
          "type": "object",
          "additionalProperties": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "frontendSecretsForbidden": {
          "type": "boolean"
        },
        "sandboxPublicAccessForbidden": {
          "type": "boolean"
        }
      }
    },
    "platforms": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "web",
        "pwa",
        "android",
        "ios"
      ],
      "properties": {
        "web": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "enabled"
          ],
          "properties": {
            "enabled": {
              "type": "boolean"
            }
          }
        },
        "pwa": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "enabled",
            "startUrl",
            "display",
            "themeColor",
            "backgroundColor"
          ],
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "startUrl": {
              "type": "string"
            },
            "display": {
              "type": "string"
            },
            "themeColor": {
              "type": "string"
            },
            "backgroundColor": {
              "type": "string"
            }
          }
        },
        "android": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "enabled",
            "packageId",
            "appName"
          ],
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "packageId": {
              "type": "string"
            },
            "appName": {
              "type": "string"
            }
          }
        },
        "ios": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "enabled",
            "bundleId",
            "appName"
          ],
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "bundleId": {
              "type": "string"
            },
            "appName": {
              "type": "string"
            }
          }
        }
      }
    },
    "sync": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "broadcastEvent",
        "releaseGate",
        "managedFiles"
      ],
      "properties": {
        "broadcastEvent": {
          "type": "string"
        },
        "releaseGate": {
          "const": "NOMINAL"
        },
        "managedFiles": {
          "type": "array",
          "uniqueItems": true,
          "items": {
            "type": "string"
          }
        }
      }
    }
  },
  "$defs": {
    "workerTarget": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "workerName",
        "rootDirectory",
        "buildCommand",
        "deployCommand",
        "watchPaths"
      ],
      "properties": {
        "workerName": {
          "type": "string",
          "pattern": "^[a-z0-9-]+$"
        },
        "rootDirectory": {
          "type": "string",
          "pattern": "^/"
        },
        "main": {
          "type": "string"
        },
        "assetsDirectory": {
          "type": "string"
        },
        "buildCommand": {
          "type": "string",
          "minLength": 1
        },
        "deployCommand": {
          "type": "string",
          "minLength": 1
        },
        "watchPaths": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string"
          }
        }
      }
    }
  }
}

```

## `system-config/scripts/deploy-all.mjs`

```mjs
import {spawnSync} from 'node:child_process';
const bun=process.platform==='win32'?'bun.exe':'bun';
const run=(label,args)=>{console.log(`\n=== ${label} ===`);const r=spawnSync(bun,args,{stdio:'inherit',shell:false});if(r.status!==0)process.exit(r.status??1)};
const isWorkersBuild=process.env.WORKERS_CI==='1';
const connected=process.env.WRANGLER_CI_OVERRIDE_NAME?.trim();
if(isWorkersBuild){
  if(connected && connected!=='hendy-video-studio-pro'){console.error(`ERROR: connected Worker ${connected} is not the gateway.`);process.exit(2)}
  run('GATEWAY BUILD',['run','build']);
  run('GATEWAY DEPLOY',['x','wrangler','deploy','--config','wrangler.jsonc']);
  console.log('\nWORKERS BUILDS GATEWAY DEPLOYED: hendy-video-studio-pro');
  process.exit(0);
}
run('RELEASE GATE',['run','release:gate']);
for(const t of [
  ['BACKEND','backend/wrangler.jsonc'],['AI EDGE','worker/wrangler.jsonc'],['MCP','mcp/cloudflare/wrangler.jsonc'],['TELEGRAM','example_bot/wrangler.jsonc'],['GATEWAY','wrangler.jsonc']
]) run(t[0]+ ' DEPLOY',['x','wrangler','deploy','--config',t[1]]);
console.log('\nALL HENDY CLOUD RUNTIMES DEPLOYED.');

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
const version = (() => { try { return JSON.parse(fs.readFileSync(path.join(root,'system-config/system.config.json'),'utf8')).app.version; } catch { return 'unknown'; } })();
let md=`# Hendy Video Studio Pro v${version} — Full Source Snapshot\n\nGenerated from the repository working tree. Secrets, node_modules, dist, temp files and binary production artifacts are excluded.\n\n## File index\n\n${files.map(f=>`- \`${f}\``).join('\n')}\n\n`;
for (const rel of files) {
  const content=fs.readFileSync(path.join(root,rel),'utf8').replace(/``\`/g,'``\\`');
  const lang=path.extname(rel).slice(1) || (rel.endsWith('Dockerfile')?'dockerfile':'text');
  md += `## \`${rel}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`;
}
fs.writeFileSync(out,md);
fs.writeFileSync(path.join(root,'FILE_LIST.txt'), files.join('\n')+'\n');
console.log(`Exported ${files.length} text/source files.`);

```

## `system-config/scripts/production-check.mjs`

```mjs
const base=process.env.PUBLIC_APP_URL || 'https://hendy-video-studio-pro.ngogiaidy56.workers.dev';
const r=await fetch(base+'/health/all',{cache:'no-store'});
const data=await r.json();
console.log(JSON.stringify(data,null,2));
if(!r.ok || !data.ok) process.exit(1);
console.log('PRODUCTION E2E HEALTH: PASS');

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

## `system-config/scripts/release-gate.mjs`

```mjs
import { spawn } from 'node:child_process';
import process from 'node:process';

const run = (cmd, args) => new Promise((resolve) => {
  const child = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  child.on('exit', code => resolve(code ?? 1));
});

const steps = [
  ['node', ['system-config/scripts/sync-config.mjs', '--auto-patch']],
  ['node', ['system-config/scripts/sync-config.mjs', '--validate']],
  ['node', ['system-config/scripts/sync-config.mjs', '--dry-run', '--strict-dry-run']],
  ['npm', ['run', 'typecheck']],
  ['npm', ['run', 'build']]
];

for (const [cmd, args] of steps) {
  console.log(`\n[GATE] ${cmd} ${args.join(' ')}`);
  const code = await run(cmd, args);
  if (code !== 0) {
    console.error('RELEASE GATE: FAILED');
    process.exit(1);
  }
}
console.log('RELEASE GATE: NOMINAL — all automated static/build gates passed. This is not a guarantee of runtime safety.');

```

## `system-config/scripts/set-telegram-webhook.mjs`

```mjs
const token=process.env.TELEGRAM_BOT_TOKEN;
const url=process.env.TELEGRAM_WEBHOOK_URL;
if(!token||!url){console.log('Telegram webhook setup skipped.');process.exit(0);}
const r=await fetch('https://api.telegram.org/bot'+token+'/setWebhook',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url,allowed_updates:['message','callback_query'],drop_pending_updates:false})});
const data=await r.json();
if(!r.ok||!data.ok){console.error(data);process.exit(1);}
console.log('Telegram webhook configured: '+url);

```

## `system-config/scripts/sync-config.mjs`

```mjs
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import crypto from 'node:crypto';

function findRoot(start){ let dir=path.resolve(start); while(true){ const candidate=path.join(dir,'system-config','system.config.json'); if(fsSync.existsSync(candidate)) return dir; const parent=path.dirname(dir); if(parent===dir) throw new Error('Cannot locate repository root from '+start); dir=parent; } }
const ROOT = findRoot(process.cwd());
const SOT = path.join(ROOT, 'system-config', 'system.config.json');
const args = new Set(process.argv.slice(2));

const stableJson = value => JSON.stringify(value, null, 2) + '\n';
const hash = text => crypto.createHash('sha256').update(text).digest('hex').slice(0, 12);
const deepClone = value => JSON.parse(JSON.stringify(value));

function validate(c) {
  const errors = [];
  const need = (ok, msg) => { if (!ok) errors.push(msg); };
  need(/^\d+\.\d+\.\d+$/.test(String(c?.app?.version ?? '')), 'app.version must be semver');
  need(Number.isInteger(c?.runtime?.sandbox?.port) && c.runtime.sandbox.port >= 1024 && c.runtime.sandbox.port <= 65535, 'sandbox port invalid');
  need(Number.isInteger(c?.runtime?.dev?.vitePort) && c.runtime.dev.vitePort >= 1024 && c.runtime.dev.vitePort <= 65535, 'vite port invalid');
  need(c?.runtime?.sandbox?.publicAccess === false, 'sandbox publicAccess must be false');
  need(c?.storage?.publicAccess === false, 'R2 publicAccess must be false');
  need(/^https:\/\/.+\.r2\.cloudflarestorage\.com$/.test(String(c?.storage?.endpoint ?? '')), 'R2 endpoint invalid');
  need(/^https:\/\//.test(String(c?.runtime?.cloudflare?.publicAppUrl ?? '')), 'publicAppUrl must be https');
  const workers = c?.runtime?.cloudflare?.workers ?? {};
  const names = Object.entries(workers).map(([key, target]) => [key, target?.workerName]);
  need(names.length === 4 && new Set(names.map(x => x[1])).size === 4, 'four dedicated Worker names must be unique');
  need(c?.runtime?.cloudflare?.gateway?.workerName === 'hendy-video-studio-pro', 'gateway worker name must be hendy-video-studio-pro');
  need(c?.security?.requiredSecrets?.backend?.length >= 4, 'backend required secrets incomplete');
  return errors;
}

function autoPatch(input) {
  const c = deepClone(input);
  const patches = [];
  const patch = (p, next) => {
    const parts = p.split('.');
    let ref = c;
    while (parts.length > 1) ref = ref[parts.shift()] ??= {};
    const leaf = parts[0];
    if (ref[leaf] !== next) { patches.push(`${p}: ${JSON.stringify(ref[leaf])} -> ${JSON.stringify(next)}`); ref[leaf] = next; }
  };
  if (!/^\d+\.\d+\.\d+$/.test(String(c.app?.version ?? ''))) patch('app.version', '3.2.0');
  if (!(Number.isInteger(c.runtime?.sandbox?.port) && c.runtime.sandbox.port >= 1024 && c.runtime.sandbox.port <= 65535)) patch('runtime.sandbox.port', 8799);
  if (!(Number.isInteger(c.runtime?.dev?.vitePort) && c.runtime.dev.vitePort >= 1024 && c.runtime.dev.vitePort <= 65535)) patch('runtime.dev.vitePort', 5173);
  patch('runtime.sandbox.publicAccess', false);
  patch('storage.publicAccess', false);
  patch('sync.releaseGate', 'NOMINAL');
  return {out:c, patches};
}

function packageRoot(c) {
  return {
    name: 'hendy-video-studio-pro', private: true, version: c.app.version, type: 'module',
    workspaces: ['system-config','backend','worker','frontend','example_bot','mcp/cloudflare'],
    scripts: {
      'config:validate':'node system-config/scripts/validate-config.mjs',
      'config:sync':'node system-config/scripts/sync-config.mjs --sync',
      'config:dry-run':'node system-config/scripts/sync-config.mjs --dry-run',
      'config:auto-patch':'node system-config/scripts/sync-config.mjs --auto-patch',
      'dev':'npm run config:sync && tsx server.ts',
      'build':'npm run config:validate && npm run config:sync && npm --workspace frontend run build',
      'build:all':'npm run release:gate',
      'start':'tsx server.ts',
      'typecheck':'npm run typecheck:frontend && npm run typecheck:backend && npm run typecheck:worker && npm run typecheck:mcp && npm run typecheck:telegram',
      'typecheck:frontend':'npm --workspace frontend run typecheck',
      'typecheck:backend':'npm --workspace backend run typecheck',
      'typecheck:worker':'npm --workspace worker run typecheck',
      'typecheck:mcp':'npm --workspace mcp/cloudflare run typecheck',
      'typecheck:telegram':'npm --workspace example_bot run typecheck',
      'sandbox':'node system-config/sandbox/server.mjs',
      'release:gate':'npm run config:validate && npm run config:sync && npm run typecheck && npm --workspace frontend run build && npm --workspace backend run build && npm --workspace worker run build && npm --workspace mcp/cloudflare run build && npm --workspace example_bot run build',
      'worker:deploy':'node system-config/scripts/deploy-all.mjs',
      'deploy':'node system-config/scripts/deploy-all.mjs',
      'deploy:all':'node system-config/scripts/deploy-all.mjs',
      'production:check':'node system-config/scripts/production-check.mjs'
    },
    dependencies: { 'cors':'^2.8.5', 'dotenv':'^17.2.2', 'express':'^5.1.0', 'ws':'^8.22.0' },
    devDependencies: { '@types/cors':'^2.8.19', '@types/express':'^5.0.3', '@types/node':'^24.4.0', '@types/ws':'^8.18.1', 'tsx':'^4.20.5', 'typescript':`^${c.toolchain.typescript}`, 'vite':'^7.3.6' },
    engines:{node:c.toolchain.node}, packageManager:`bun@${c.toolchain.bun}`
  };
}

function capacitor(c) {
  return `import type { CapacitorConfig } from '@capacitor/cli';\n\nconst config: CapacitorConfig = {\n  appId: ${JSON.stringify(c.platforms.android.packageId)},\n  appName: ${JSON.stringify(c.app.name)},\n  webDir: 'dist',\n  bundledWebRuntime: false,\n  server: { androidScheme: 'https', iosScheme: 'https' }\n};\n\nexport default config;\n`;
}

function manifest(c) {
  return stableJson({name:c.app.name,short_name:c.app.shortName,description:c.app.description,lang:c.app.language,start_url:c.platforms.pwa.startUrl,scope:'/',display:c.platforms.pwa.display,orientation:'any',theme_color:c.platforms.pwa.themeColor,background_color:c.platforms.pwa.backgroundColor,icons:[{src:'/logo192.png',sizes:'192x192',type:'image/png'},{src:'/logo512.png',sizes:'512x512',type:'image/png'}]});
}

function headers(c) {
  return `/* ${c.app.name} ${c.app.version} */\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: microphone=(self), camera=(self)\n  Content-Security-Policy: default-src 'self'; script-src 'self' https://telegram.org; connect-src 'self' https://*.workers.dev wss:; img-src 'self' data: blob: https:; media-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; worker-src 'self' blob:; frame-src https://t.me; object-src 'none'; base-uri 'self'\n\n/manifest.json\n  Content-Type: application/manifest+json\n  Cache-Control: public, max-age=300\n\n/sw.js\n  Cache-Control: no-cache\n`;
}

function rootWrangler(c) {
  const g = c.runtime.cloudflare.gateway;
  return stableJson({$schema:'./node_modules/wrangler/config-schema.json',name:g.workerName,main:g.main,compatibility_date:c.runtime.cloudflare.compatibilityDate,assets:{directory:g.assetsDirectory,binding:'ASSETS',not_found_handling:'single-page-application',run_worker_first:['/api/*','/mcp','/mcp/*','/telegram/*']},services:[{binding:'BACKEND',service:c.runtime.cloudflare.workers.backend.workerName},{binding:'AI_EDGE',service:c.runtime.cloudflare.workers.ai.workerName},{binding:'MCP',service:c.runtime.cloudflare.workers.mcp.workerName},{binding:'TELEGRAM',service:c.runtime.cloudflare.workers.telegram.workerName}]});
}

function backendWrangler(c) {
  const w=c.runtime.cloudflare.workers.backend;
  return stableJson({$schema:'../node_modules/wrangler/config-schema.json',name:w.workerName,main:'src/worker.ts',compatibility_date:c.runtime.cloudflare.compatibilityDate,compatibility_flags:['nodejs_compat'],vars:{APP_VERSION:c.app.version,FRONTEND_ORIGIN:c.runtime.cloudflare.publicAppUrl,PUBLIC_APP_URL:c.runtime.cloudflare.publicAppUrl,R2_BUCKET:c.storage.bucketName,R2_ACCOUNT_ID:c.storage.accountId,R2_ENDPOINT:c.storage.endpoint,MAX_AI_UPLOAD_BYTES:String(c.api.maxUploadBytes),TELEGRAM_OTP_TTL_SECONDS:String(c.security.otpTtlSeconds)},secrets:{required:c.security.requiredSecrets.backend},dev:{port:8787}});
}

function aiWrangler(c) {
  const w=c.runtime.cloudflare.workers.ai;
  return stableJson({$schema:'../node_modules/wrangler/config-schema.json',name:w.workerName,main:'src/index.ts',compatibility_date:c.runtime.cloudflare.compatibilityDate,vars:{APP_VERSION:c.app.version,API_BASE_PATH:c.api.basePath,CLOUDFLARE_TTS_MODEL:c.ai.cloudflareTtsModel},ai:{binding:'AI'},dev:{port:8788}});
}

function mcpWrangler(c) {
  const w=c.runtime.cloudflare.workers.mcp;
  return stableJson({$schema:'../../node_modules/wrangler/config-schema.json',name:w.workerName,main:'src/worker.ts',compatibility_date:c.runtime.cloudflare.compatibilityDate,vars:{APP_VERSION:c.app.version,PUBLIC_APP_URL:c.runtime.cloudflare.publicAppUrl},dev:{port:8790}});
}

function botWrangler(c) {
  const w=c.runtime.cloudflare.workers.telegram;
  return stableJson({$schema:'../node_modules/wrangler/config-schema.json',name:w.workerName,main:'src/worker.ts',compatibility_date:c.runtime.cloudflare.compatibilityDate,vars:{APP_VERSION:c.app.version,ADMIN_APP_URL:c.runtime.cloudflare.publicAppUrl},d1_databases:[c.telegram.d1],secrets:{required:c.security.requiredSecrets.telegram},dev:{port:8791}});
}

function generatedTs(c) {
  const safe={...c, system:{name:c.app.name,version:c.app.version,environment:'production'}};
  return `export const SYSTEM_CONFIG = ${JSON.stringify(safe,null,2)} as const;\nexport const SYSTEM_CONFIG_VERSION = ${JSON.stringify(c.app.version)};\n`;
}

function generatedEnv(c) {
  return `export type RuntimeEnv = { API_BASE_URL?: string; TELEGRAM_BOT_USERNAME?: string; APP_VERSION: string };\nexport const runtimeEnv: RuntimeEnv = { API_BASE_URL: import.meta.env.VITE_API_BASE_URL, TELEGRAM_BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME, APP_VERSION: ${JSON.stringify(c.app.version)} };\n`;
}

function generatedCss(c) {
  const t=c.ui.theme,l=c.ui.layout;
  return `:root {\n  --sys-bg:${t.bg};\n  --sys-panel:${t.panel};\n  --sys-panel-2:${t.panel2};\n  --sys-surface:${t.surface};\n  --sys-border:${t.border};\n  --sys-border-strong:${t.borderStrong};\n  --sys-text:${t.text};\n  --sys-muted:${t.muted};\n  --sys-cyan:${t.cyan};\n  --sys-blue:${t.blue};\n  --sys-purple:${t.purple};\n  --sys-success:${t.success};\n  --sys-warning:${t.warning};\n  --sys-danger:${t.danger};\n  --sys-header-height:${l.headerHeight}px;\n  --sys-workspace-gap:${l.workspaceGap}px;\n  --sys-panel-radius:${l.panelRadius}px;\n  --sys-grid-size:${l.gridSize}px;\n  --dark-background-color:var(--sys-bg);\n  --dark-container-background-color:var(--sys-panel);\n  --accent-color:var(--sys-cyan);\n  --text-color:var(--sys-text);\n}\n`;
}

function layout() { return `import type { ReactNode } from 'react';\nexport function SystemLayout({children}:{children:ReactNode}) { return <div className="system-layout"><main className="system-main">{children}</main><nav className="bottom-action-dock" aria-label="Editor actions"><button>Timeline</button><button>Assets</button><button>Audio</button><button>Export</button></nav></div>; }\n`; }

function indexHtml(c) { return `<!doctype html><html lang="${c.app.language}"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"/><meta name="theme-color" content="${c.platforms.pwa.themeColor}"/><meta name="mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-capable" content="yes"/><link rel="manifest" href="/manifest.json"/><title>${c.app.name}</title><meta name="description" content="${c.app.description}"/><script src="https://telegram.org/js/telegram-web-app.js"></script></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n`; }

function serviceWorker(c) {
  const cache=`hendy-studio-${c.app.version.replaceAll('.','-')}`;
  return `const CACHE=${JSON.stringify(cache)};\nconst SHELL=['/','/manifest.json'];\nconst BYPASS=/^\\/(api|mcp|telegram)(\\/|$)/;\nself.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));\nself.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));\nself.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin||BYPASS.test(new URL(r.url).pathname))return;if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{caches.open(CACHE).then(c=>c.put(r,res.clone()));return res}).catch(()=>caches.match('/')));return;}e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(res=>{if(res.ok)caches.open(CACHE).then(c=>c.put(r,res.clone()));return res})));});\n`;
}

function packages(c) {
  return {
    root:packageRoot(c),
    frontend:{name:'@hendy/frontend',private:true,type:'module',scripts:{dev:'vite',build:'vite build',typecheck:'tsc -p tsconfig.json --noEmit'},dependencies:{'@vitejs/plugin-react':'^5.0.4','lucide-react':'^1.48.0','react':'^19.1.1','react-dom':'^19.1.1'},devDependencies:{'@tailwindcss/vite':'^4.3.3','@types/react':'^19.1.13','@types/react-dom':'^19.1.9','tailwindcss':'^4.3.3','typescript':`^${c.toolchain.typescript}`,'vite':'^7.3.6'}},
    backend:{name:'@hendy/backend',private:true,type:'module',scripts:{dev:'tsx watch src/server.ts',prebuild:'node ../system-config/scripts/sync-config.mjs --sync',build:'tsc -p tsconfig.json',typecheck:'tsc -p tsconfig.json --noEmit',start:'node dist/server.js',deploy:'wrangler deploy --config wrangler.jsonc'},dependencies:{'@aws-sdk/client-s3':'^3.888.0','@google/genai':'^2.24.0','cors':'^2.8.5','dotenv':'^17.2.2','express':'^5.1.0','multer':'^2.0.2','uuid':'^11.1.0','ws':'^8.18.3'},devDependencies:{'@cloudflare/workers-types':c.toolchain.workersTypes,'@types/cors':'^2.8.19','@types/express':'^5.0.3','@types/multer':'^2.0.0','@types/node':'^24.4.0','tsx':'^4.20.5','typescript':`^${c.toolchain.typescript}`,'wrangler':c.toolchain.wrangler}},
    worker:{name:'@hendy/worker',private:true,type:'module',scripts:{dev:'wrangler dev --port 8788',prebuild:'node ../system-config/scripts/sync-config.mjs --sync',build:'tsc -p tsconfig.json',typecheck:'tsc -p tsconfig.json --noEmit',deploy:'wrangler deploy --config wrangler.jsonc'},devDependencies:{'@cloudflare/workers-types':c.toolchain.workersTypes,typescript:`^${c.toolchain.typescript}`,wrangler:c.toolchain.wrangler}},
    mcp:{name:'@hendy/mcp-control-plane',private:true,type:'module',scripts:{dev:'tsx src/index.ts',prebuild:'node ../../system-config/scripts/sync-config.mjs --sync',build:'tsc -p tsconfig.json',typecheck:'tsc -p tsconfig.json --noEmit',deploy:'wrangler deploy --config wrangler.jsonc'},dependencies:{'@modelcontextprotocol/server':'2.0.0',agents:'0.24.0',zod:'^4.1.12'},devDependencies:{'@cloudflare/workers-types':c.toolchain.workersTypes,'@types/node':'^24.4.0',tsx:'^4.20.5',typescript:`^${c.toolchain.typescript}`,wrangler:c.toolchain.wrangler}},
    telegram:{name:'@hendy/telegram-worker',private:true,type:'module',scripts:{build:'tsc -p tsconfig.json',prebuild:'node ../system-config/scripts/sync-config.mjs --sync',typecheck:'tsc -p tsconfig.json --noEmit',deploy:'wrangler deploy --config wrangler.jsonc'},devDependencies:{'@cloudflare/workers-types':c.toolchain.workersTypes,typescript:`^${c.toolchain.typescript}`,wrangler:c.toolchain.wrangler}}
  };
}
async function readJson(file, fallback={}) { try{return JSON.parse(await fs.readFile(path.join(ROOT,file),'utf8'));}catch{return fallback;} }
async function writeFile(relative, content) { const file=path.join(ROOT,relative); await fs.mkdir(path.dirname(file),{recursive:true}); await fs.writeFile(file,content); }

async function outputs(c) {
  const p=packages(c);
  return new Map([
    ['package.json',stableJson(p.root)],['capacitor.config.ts',capacitor(c)],['wrangler.jsonc',rootWrangler(c)],['frontend/package.json',stableJson(p.frontend)],['backend/package.json',stableJson(p.backend)],['backend/wrangler.jsonc',backendWrangler(c)],['worker/package.json',stableJson(p.worker)],['worker/wrangler.jsonc',aiWrangler(c)],['example_bot/package.json',stableJson(p.telegram)],['example_bot/wrangler.jsonc',botWrangler(c)],['mcp/cloudflare/package.json',stableJson(p.mcp)],['mcp/cloudflare/wrangler.jsonc',mcpWrangler(c)],['mcp/cloudflare/src/runtime-config.ts',`export const MCP_RUNTIME = ${JSON.stringify({version:c.app.version,publicAppUrl:c.runtime.cloudflare.publicAppUrl},null,2)} as const;\n`],['public/manifest.json',manifest(c)],['public/_headers',headers(c)],['public/sw.js',serviceWorker(c)],['src/generated/system-config.ts',generatedTs(c)],['src/generated/system-theme.css',generatedCss(c)],['index.html',indexHtml(c)],['frontend/index.html',indexHtml(c)],['frontend/vite.config.ts',`import {defineConfig} from 'vite';\nimport react from '@vitejs/plugin-react';\nimport tailwindcss from '@tailwindcss/vite';\nexport default defineConfig({plugins:[tailwindcss(),react()],server:{port:${c.runtime.dev.vitePort},host:'127.0.0.1',strictPort:true,hmr:true}});\n`],['frontend/public/manifest.json',manifest(c)],['frontend/public/_headers',headers(c)],['frontend/public/sw.js',serviceWorker(c)],['frontend/src/generated/system-config.ts',generatedTs(c)],['frontend/src/generated/system-env.ts',generatedEnv(c)],['frontend/src/generated/system-layout.tsx',layout()],['frontend/src/generated/system-theme.css',generatedCss(c)]]);
}

async function sync(c) { const map=await outputs(c); for(const [rel,content] of map) await writeFile(rel,content); return map; }
async function dry(c) { const map=await outputs(c); const drift=[]; for(const [rel,expected] of map){let current=null;try{current=await fs.readFile(path.join(ROOT,rel),'utf8')}catch{} if(current!==expected) drift.push({file:rel,currentHash:current?hash(current):null,expectedHash:hash(expected)});} return {map,drift}; }

async function main(){
  let c=await readJson('system-config/system.config.json');
  if(args.has('--auto-patch')){const p=autoPatch(c);c=p.out;if(p.patches.length){await writeFile('system-config/system.config.json',stableJson(c));console.log(`AUTO-PATCH: applied ${p.patches.length} patch(es)`);for(const x of p.patches)console.log('  '+x);}}
  const errors=validate(c);
  if(errors.length){console.error(`SYSTEM CONFIG INVALID — ${c?.app?.name??'unknown'}`);errors.forEach(e=>console.error('ERROR: '+e));process.exit(1);}
  console.log(`SYSTEM CONFIG NOMINAL — ${c.app.name} v${c.app.version}`);
  if(args.has('--validate')) return;
  if(args.has('--dry-run')){const {drift,map}=await dry(c);console.log(`DRY-RUN: ${map.size} managed targets inspected`);for(const d of drift)console.log(`  DRIFT ${d.file} ${d.currentHash??'MISSING'} -> ${d.expectedHash}`);if(!drift.length)console.log('DRY-RUN: no configuration drift detected');if(args.has('--strict-dry-run')&&drift.length)process.exit(2);return;}
  if(args.has('--sync')){await sync(c);console.log(`SYNC: ${c.sync.managedFiles.length} managed targets generated from SOT`);return;}
}
main().catch(err=>{console.error(err);process.exit(1)});

```

## `system-config/scripts/validate-config.mjs`

```mjs
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

```

## `system-config/system.config.json`

```json
{
  "$schema": "./schema/system-config.schema.json",
  "app": {
    "name": "Hendy Video Studio Pro",
    "shortName": "Hendy Studio Pro",
    "product": "AI Video + Vietsub Workspace",
    "version": "3.2.0",
    "description": "AI video editor, Vietnamese subtitles, TTS voiceover, multi-channel audio and Cloudflare production workspace.",
    "language": "vi"
  },
  "toolchain": {
    "bun": "1.2.15",
    "node": ">=22 <25",
    "wrangler": "4.141.0",
    "workersTypes": "5.20260927.1",
    "typescript": "5.9.3"
  },
  "features": {
    "linkExtractor": true,
    "imageOCR": true,
    "audioSTT": true,
    "audioDucking": true,
    "offlineFirst": true,
    "telegramAdmin": true,
    "mcpControlPlane": true,
    "r2Storage": true,
    "d1Telemetry": true
  },
  "api": {
    "basePath": "/api/v1",
    "aiPath": "/api/ai",
    "mcpPath": "/mcp",
    "telegramPath": "/telegram",
    "maxJsonBodyBytes": 4194304,
    "maxUploadBytes": 104857600,
    "requestTimeoutMs": 30000
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
    "temperature": 0.1,
    "cloudflareTtsModel": "@cf/myshell-ai/melotts"
  },
  "storage": {
    "provider": "cloudflare-r2",
    "bucketName": "hendy-video-studio-pro-media",
    "bucketEnv": "R2_BUCKET",
    "accountId": "918ff2f016938fc978ed23b96505b21e",
    "endpoint": "https://918ff2f016938fc978ed23b96505b21e.r2.cloudflarestorage.com",
    "zeroEgress": true,
    "publicAccess": false
  },
  "editor": {
    "audioChannels": ["video", "bgm", "tts", "master"],
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
  "ui": {
    "theme": {
      "bg": "#070b12",
      "panel": "#0c121c",
      "panel2": "#0f1724",
      "surface": "#121b2a",
      "border": "rgba(148,163,184,0.12)",
      "borderStrong": "rgba(148,163,184,0.20)",
      "text": "#e6edf7",
      "muted": "#8793a6",
      "cyan": "#22d3ee",
      "blue": "#4f7cff",
      "purple": "#8b5cf6",
      "success": "#34d399",
      "warning": "#fbbf24",
      "danger": "#fb7185"
    },
    "layout": {
      "headerHeight": 60,
      "workspaceGap": 8,
      "panelRadius": 14,
      "gridSize": 32
    },
    "status": {
      "nominalLabel": "NOMINAL",
      "nominalDescription": "Automated checks passed; ready for sync.",
      "warningLabel": "WARNING",
      "failedLabel": "FAILED"
    }
  },
  "runtime": {
    "sandbox": {
      "host": "127.0.0.1",
      "port": 8799,
      "wsPath": "/ws",
      "autoStartHint": true,
      "publicAccess": false
    },
    "dev": {
      "vitePort": 5173,
      "unifiedServerPort": 3000
    },
    "cloudflare": {
      "compatibilityDate": "2026-10-02",
      "publicAppUrl": "https://hendy-video-studio-pro.ngogiaidy56.workers.dev",
      "gateway": {
        "workerName": "hendy-video-studio-pro",
        "rootDirectory": "/",
        "main": "frontend/src/edge.ts",
        "assetsDirectory": "./frontend/dist",
        "buildCommand": "bun run build",
        "deployCommand": "bun run worker:deploy",
        "watchPaths": ["frontend/**", "system-config/**", "package.json", "bun.lock", "wrangler.jsonc"]
      },
      "workers": {
        "backend": {
          "workerName": "hendy-video-studio-pro-backend",
          "rootDirectory": "/backend/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": ["backend/**", "shared/**", "system-config/**"]
        },
        "ai": {
          "workerName": "hendy-video-studio-pro-ai",
          "rootDirectory": "/worker/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": ["worker/**", "system-config/**"]
        },
        "mcp": {
          "workerName": "hendy-video-studio-pro-mcp",
          "rootDirectory": "/mcp/cloudflare/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": ["mcp/cloudflare/**", "system-config/**"]
        },
        "telegram": {
          "workerName": "hendy-video-studio-pro-telegram",
          "rootDirectory": "/example_bot/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": ["example_bot/**", "system-config/**"]
        }
      },
      "deployOrder": ["backend", "ai", "mcp", "telegram", "gateway"]
    }
  },
  "telegram": {
    "adminUserIdsEnv": "ADMIN_USER_IDS",
    "webhookPath": "/telegram/webhook",
    "secretHeader": "X-Telegram-Bot-Api-Secret-Token",
    "d1": {
      "binding": "DB",
      "databaseName": "telegram-bot-db",
      "databaseId": "4925d076-24b7-4d08-a63c-342766ba4036"
    }
  },
  "security": {
    "telegramInitDataMaxAgeSeconds": 300,
    "otpTtlSeconds": 60,
    "requiredSecrets": {
      "backend": ["GEMINI_API_KEY", "TELEGRAM_BOT_TOKEN", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "ADMIN_USER_IDS", "MCP_OTP_SECRET"],
      "telegram": ["TELEGRAM_BOT_TOKEN", "ADMIN_USER_IDS", "MCP_OTP_SECRET", "TELEGRAM_SECRET_TOKEN"]
    },
    "frontendSecretsForbidden": true,
    "sandboxPublicAccessForbidden": true
  },
  "platforms": {
    "web": {"enabled": true},
    "pwa": {
      "enabled": true,
      "startUrl": "/",
      "display": "standalone",
      "themeColor": "#070b12",
      "backgroundColor": "#070b12"
    },
    "android": {
      "enabled": true,
      "packageId": "com.aistudiopro.vietsub",
      "appName": "Hendy Video Studio Pro"
    },
    "ios": {
      "enabled": true,
      "bundleId": "com.aistudiopro.vietsub",
      "appName": "Hendy Video Studio Pro"
    }
  },
  "sync": {
    "broadcastEvent": "SYSTEM_CONFIG_SYNCED",
    "releaseGate": "NOMINAL",
    "managedFiles": [
      "package.json",
      "capacitor.config.ts",
      "wrangler.jsonc",
      "backend/package.json",
      "backend/wrangler.jsonc",
      "worker/package.json",
      "worker/wrangler.jsonc",
      "mcp/cloudflare/package.json",
      "mcp/cloudflare/wrangler.jsonc",
      "mcp/cloudflare/src/runtime-config.ts",
      "example_bot/package.json",
      "example_bot/wrangler.jsonc",
      "public/manifest.json",
      "public/_headers",
      "public/sw.js",
      "src/generated/system-config.ts",
      "src/generated/system-theme.css",
      "index.html",
      "frontend/index.html",
      "frontend/package.json",
      "frontend/vite.config.ts",
      "frontend/public/manifest.json",
      "frontend/public/_headers",
      "frontend/public/sw.js",
      "frontend/src/generated/system-config.ts",
      "frontend/src/generated/system-env.ts",
      "frontend/src/generated/system-layout.tsx",
      "frontend/src/generated/system-theme.css"
    ]
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
    "prebuild": "node ../system-config/scripts/sync-config.mjs --sync",
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "deploy": "wrangler deploy --config wrangler.jsonc"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "5.20260927.1",
    "typescript": "^5.9.3",
    "wrangler": "4.141.0"
  }
}

```

## `worker/src/index.ts`

```ts
export interface Env {
  API_BASE_PATH: string;
  AI: Ai;
  CLOUDFLARE_TTS_MODEL?: string;
  APP_VERSION?: string;
}

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, { headers: { 'cache-control': 'no-store' }, ...init });
}

const audioHeaders = {
  'content-type': 'audio/mpeg',
  'cache-control': 'no-store'
};

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (req.method === 'GET' && (url.pathname === '/health' || url.pathname === '/api/ai/health')) {
      return json({ ok: true, edge: true, version: env.APP_VERSION || '3.2.0', ai: true });
    }

    if (req.method === 'POST' && url.pathname === '/api/ai/tts') {
      const body = await req.json<{ text?: string; lang?: string }>();

      if (!body.text?.trim()) {
        return json({ error: 'text is required' }, { status: 400 });
      }

      const result = await env.AI.run(
        env.CLOUDFLARE_TTS_MODEL || '@cf/myshell-ai/melotts',
        {
          prompt: body.text,
          lang: body.lang || 'vi'
        }
      );

      if (result instanceof ArrayBuffer) {
        return new Response(result, { headers: audioHeaders });
      }

      if (ArrayBuffer.isView(result)) {
        // Cloudflare's AI typings narrow this branch to an intersection
        // that is not directly assignable to Uint8Array under strict TS.
        // The runtime value is an ArrayBufferView, so normalize it through
        // unknown before slicing the exact byte range into an ArrayBuffer.
        const view = result as unknown as Uint8Array;
        const bodyBuffer = view.buffer.slice(
          view.byteOffset,
          view.byteOffset + view.byteLength
        ) as ArrayBuffer;
        return new Response(bodyBuffer, { headers: audioHeaders });
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
  "$schema": "../node_modules/wrangler/config-schema.json",
  "name": "hendy-video-studio-pro-ai",
  "main": "src/index.ts",
  "compatibility_date": "2026-10-02",
  "vars": {
    "APP_VERSION": "3.2.0",
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

## `wrangler.jsonc`

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "hendy-video-studio-pro",
  "main": "frontend/src/edge.ts",
  "compatibility_date": "2026-10-02",
  "assets": {
    "directory": "./frontend/dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application",
    "run_worker_first": [
      "/api/*",
      "/mcp",
      "/mcp/*",
      "/telegram/*"
    ]
  },
  "services": [
    {
      "binding": "BACKEND",
      "service": "hendy-video-studio-pro-backend"
    },
    {
      "binding": "AI_EDGE",
      "service": "hendy-video-studio-pro-ai"
    },
    {
      "binding": "MCP",
      "service": "hendy-video-studio-pro-mcp"
    },
    {
      "binding": "TELEGRAM",
      "service": "hendy-video-studio-pro-telegram"
    }
  ]
}

```

