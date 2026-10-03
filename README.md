# Hendy Video Studio Pro v3.2.0

Monorepo cho AI video editor đa nền tảng: React 19, Gateway Worker, Express Backend Worker, Workers AI, R2, Telegram + D1 và MCP control plane.

## Kiến trúc

```text
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
```

## Cấu trúc runtime

- `system-config/` — Single Source of Truth + validation + sync + release gate.
- `frontend/` — React editor, timeline, canvas, audio mixer, subtitle tools, PWA.
- `backend/` — Express API chạy trên Workers Node compatibility.
- `worker/` — Workers AI / MeloTTS edge service.
- `mcp/cloudflare/` — stateless MCP Streamable HTTP.
- `example_bot/` — Telegram webhook + D1 telemetry/admin.
- `shared/` — contracts/types dùng chung.

## Local

```bash
bun install
bun run config:validate
bun run config:sync
bun run release:gate
```

Unified local server:

```bash
bun run dev
```

Các service riêng:

```bash
npm --workspace backend run dev
npm --workspace worker run dev
npm --workspace frontend run dev
npm --workspace mcp/cloudflare run dev
```

## Release

```bash
bun run release:gate
bun run deploy:all
```

Trong Cloudflare Workers Builds của Gateway, `bun run worker:deploy` chỉ deploy Gateway. 4 Worker con có Workers Build riêng.

## Bảo mật

Secrets chỉ nằm trong Cloudflare Worker Secrets hoặc môi trường local. Không đưa Gemini key, Telegram bot token, R2 access/secret key hay MCP OTP secret vào frontend, SOT, IndexedDB, Telegram CloudStorage hoặc Git.

## Cloudflare

Gateway dùng Static Assets + Service Bindings. Workers AI dùng binding `env.AI`. MCP dùng `createMcpHandler` stateless.
