# Hendy Video Studio Pro v2.4.0 — Production Setup

## Cloudflare Workers Build
Build command: `bun run build`
Deploy command: `bun run deploy`

This repository is a Workers monorepo. Cloudflare Workers Builds deploys the Worker connected to that build project; Cloudflare documents that the connected Worker name must match the Wrangler Worker name, and monorepos should connect each Worker separately. The deploy script detects the Workers Builds context (`WORKERS_CI=1`) and deploys only the top-level gateway Worker from this repository. Local/manual `bun run deploy` still deploys all five targets.

Create/connect five Cloudflare Workers Build projects to this repository (one per Worker):
- root: `hendy-video-studio-pro`
- backend: `hendy-video-studio-pro-backend`
- AI: `hendy-video-studio-pro-ai`
- MCP: `hendy-video-studio-pro-mcp`
- Telegram: `hendy-video-studio-pro-telegram`

For each project, make sure the connected Worker name matches its Wrangler `name` value. The root Worker serves React static assets and proxies `/api/*`, `/mcp` and `/telegram/*` to dedicated Workers.

## Runtime Workers
- `hendy-video-studio-pro` — React 19 gateway + static assets
- `hendy-video-studio-pro-backend` — Express 5 API on Workers
- `hendy-video-studio-pro-ai` — Cloudflare Workers AI / MeloTTS
- `hendy-video-studio-pro-mcp` — MCP Streamable HTTP
- `hendy-video-studio-pro-telegram` — Telegram webhook

## Backend Secrets
Add these as Cloudflare Worker Secrets on `hendy-video-studio-pro-backend`:
- `GEMINI_API_KEY`
- `TELEGRAM_BOT_TOKEN`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `ADMIN_USER_IDS`
- `MCP_OTP_SECRET`

R2 account ID and endpoint are non-secret SOT variables and are generated into the backend Wrangler config.

`R2_BUCKET` is generated from SOT `storage.bucketName`. Set it to the real existing R2 bucket.

## Telegram
Add `TELEGRAM_BOT_TOKEN` and `MCP_OTP_SECRET` as Secrets on `hendy-video-studio-pro-telegram`.

Set the Telegram webhook to:
`https://hendy-video-studio-pro.ngogiaidy56.workers.dev/telegram/webhook`

Run `node system-config/scripts/set-telegram-webhook.mjs` with `TELEGRAM_BOT_TOKEN` and `TELEGRAM_WEBHOOK_URL` in the environment.

## R2
Create the R2 bucket named by `storage.bucketName`, or change the SOT to an existing bucket.

## E2E Check
After deployment:
`bun run production:check`

Direct health endpoint:
`https://hendy-video-studio-pro.ngogiaidy56.workers.dev/health/all`

Expected:
`PRODUCTION E2E HEALTH: PASS`

The readiness check is strict: the backend must report Gemini, Telegram and R2 credentials as configured.

## Main routes
- `/api/gemini/subtitles`
- `/api/gemini/tts`
- `/api/gemini/transcribe`
- `/api/gemini/audio-mix`
- `/api/gemini/create-video`
- `/api/gemini/enhance-vietnamese`
- `/api/cloudflare/tts`
- `/api/v1/auth/telegram/verify`
- `/api/v1/media/upload`
- `/api/v1/media/audio/transcribe`
- `/api/v1/media/video/transcribe`
- `/api/v1/media/image/translate`
- `/mcp`
- `/telegram/webhook`
