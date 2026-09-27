# Production build artifacts

The repository intentionally does not ship real APK/AAB/EXE/DMG binaries. Place signed production artifacts here before enabling the Smart Download Gateway:

- `ai-studio-pro-latest.apk`
- `ai-studio-pro-release.aab`
- `ai-studio-pro-setup.exe`
- `ai-studio-pro-release.dmg`

Never commit unsigned debug builds or secrets beside these artifacts.

## Cloudflare build fix

`worker/package.json` is generated from SOT toolchain pins. `@cloudflare/workers-types` is pinned to `5.20260926.1` and Wrangler to `4.137.0` to keep Cloudflare/Bun dependency resolution deterministic.
