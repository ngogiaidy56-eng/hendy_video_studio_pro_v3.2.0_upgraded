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

```text
GEMINI_API_KEY
TELEGRAM_BOT_TOKEN
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
ADMIN_USER_IDS
MCP_OTP_SECRET
```

Telegram Worker:

```text
TELEGRAM_BOT_TOKEN
ADMIN_USER_IDS
MCP_OTP_SECRET
TELEGRAM_SECRET_TOKEN
```

Không ghi các giá trị này vào Git, ZIP source hoặc frontend.

## 4. R2

SOT đang cấu hình bucket `hendy-video-studio-pro-media`, Account ID và S3 endpoint. Access Key/Secret Key chỉ là Cloudflare Worker Secrets.

## 5. Telegram webhook

Production webhook:

`https://hendy-video-studio-pro.ngogiaidy56.workers.dev/telegram/webhook`

Chạy `node system-config/scripts/set-telegram-webhook.mjs` sau khi đặt `TELEGRAM_BOT_TOKEN` và `TELEGRAM_WEBHOOK_URL` trong môi trường deploy.

## 6. Kiểm tra sau deploy

```bash
npm run production:check
```

Gateway health:

`https://hendy-video-studio-pro.ngogiaidy56.workers.dev/health`

Full health:

`https://hendy-video-studio-pro.ngogiaidy56.workers.dev/health/all`

`health/all` sẽ kiểm tra Gateway, Backend readiness, AI, MCP và Telegram.
