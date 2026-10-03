# Telegram Worker v3.2.0

Telegram runtime for Hendy Video Studio Pro. It is a Cloudflare Worker, not a Node/Express server.

## Cloudflare Build

```text
Root directory: /example_bot/
Build command: bun run build
Deploy command: bunx wrangler deploy --config wrangler.jsonc
```

## Required Secrets

```text
TELEGRAM_BOT_TOKEN
ADMIN_USER_IDS
MCP_OTP_SECRET
TELEGRAM_SECRET_TOKEN
```

D1 is bound as `DB` using the database configured in `example_bot/wrangler.jsonc`.
