# System Config v3.2.0 — Single Source of Truth

`system-config/system.config.json` là nguồn cấu hình chuẩn duy nhất cho Hendy Video Studio Pro.

## Quy trình chuẩn

```bash
npm run config:validate
npm run config:dry-run
npm run config:sync
npm run release:gate
```

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
