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
npm --workspace worker run dev  # Worker: http://localhost:8788
npm --workspace frontend run dev
npm --workspace mcp/cloudflare run dev
```

## Dry-run

Gửi WebSocket message:

```json
{"type":"dry-run","payload":{"package":"frontend"}}
```

Server sẽ dựng một workspace tạm trong `.tmp/` và chạy build/check theo policy. Không deploy production từ sandbox.

## Cloudflare build/deploy

Repo là monorepo. Bản này dùng `wrangler.jsonc` ở root để trỏ rõ vào `worker/src/index.ts`.

Workers Build settings:

```text
Build command: bun run build
Deploy command: bun run deploy
```

Không dùng `npm install` làm build command sau `bun install`; npm có thể mutate dependency tree/lockfile.

Frontend Pages nên là project riêng: root directory `frontend`, build command `bun run build`, output directory `dist`; không chạy Worker deploy trong Pages project.

## Production release gate

Cloudflare Workers Build thực hiện release gate → build → deploy theo `bun run worker:deploy`. Rollback là một thao tác riêng và không cho phép agent tự ý chạy arbitrary commands.

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


## Full cloud production

Use `PRODUCTION_SETUP.md` for the five-runtime deployment, required secrets, Telegram webhook and E2E health check. The React editor, Express API, AI Worker, MCP Worker and Telegram Worker are deployed behind the root gateway.


## Current Cloudflare Build command

The existing Workers Build deploy command `bun run worker:deploy` is intentionally retained. It now runs the release gate (`config:validate` → `config:sync` → frontend/backend/worker/MCP build) and then deploys Backend → AI Edge → MCP → Telegram → Gateway in order.
