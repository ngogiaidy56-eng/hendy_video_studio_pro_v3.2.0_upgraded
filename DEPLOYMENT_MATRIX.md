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

```text
BACKEND   -> hend­­y-video-studio-pro-backend
AI_EDGE   -> hend­­y-video-studio-pro-ai
MCP       -> hend­­y-video-studio-pro-mcp
TELEGRAM  -> hend­­y-video-studio-pro-telegram
```

## Deployment order

```text
Backend -> AI -> MCP -> Telegram -> Gateway
```

The target Workers should exist before the Gateway deploy that uses their Service Bindings.
