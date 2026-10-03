# Hendy Video Studio Pro v3.2.0 — System Architecture

## Production topology

```text
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
```

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
