# Cloudflare Workers Build Fix — v3.2.0

## Root cause addressed

The old ZIP used Cloudflare Pages configuration (`pages_build_output_dir`) and a single deploy command that could try to deploy multiple Worker configs under the same connected Worker. The upgraded ZIP uses a Gateway Worker plus four dedicated Workers.

## Required Workers Builds

Create five Workers Build projects from the same repository. Each service uses its own root directory and matching Wrangler `name`.

```text
/                    -> hendy-video-studio-pro
/backend/            -> hendy-video-studio-pro-backend
/worker/             -> hendy-video-studio-pro-ai
/mcp/cloudflare/     -> hendy-video-studio-pro-mcp
/example_bot/        -> hendy-video-studio-pro-telegram
```

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
