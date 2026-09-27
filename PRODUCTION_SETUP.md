# Hendy Video Studio Pro v2.4.0 — Production Setup

## Cloudflare Workers Build
Build command: `bun run build`
Deploy command: `bun run deploy`

The root Worker `hendy-video-studio-pro` serves React static assets and proxies `/api/*`, `/mcp` and `/telegram/*` to dedicated Workers.

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
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `ADMIN_USER_IDS`

`R2_BUCKET` is generated from SOT `storage.bucketName`. Set it to the real existing R2 bucket.

## Telegram
Add `TELEGRAM_BOT_TOKEN` as a Secret on `hendy-video-studio-pro-telegram`.

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
