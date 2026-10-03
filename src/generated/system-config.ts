export const SYSTEM_CONFIG = {
  "$schema": "./schema/system-config.schema.json",
  "app": {
    "name": "Hendy Video Studio Pro",
    "shortName": "Hendy Studio Pro",
    "product": "AI Video + Vietsub Workspace",
    "version": "3.2.0",
    "description": "AI video editor, Vietnamese subtitles, TTS voiceover, multi-channel audio and Cloudflare production workspace.",
    "language": "vi"
  },
  "toolchain": {
    "bun": "1.2.15",
    "node": ">=22 <25",
    "wrangler": "4.141.0",
    "workersTypes": "5.20260927.1",
    "typescript": "5.9.3"
  },
  "features": {
    "linkExtractor": true,
    "imageOCR": true,
    "audioSTT": true,
    "audioDucking": true,
    "offlineFirst": true,
    "telegramAdmin": true,
    "mcpControlPlane": true,
    "r2Storage": true,
    "d1Telemetry": true
  },
  "api": {
    "basePath": "/api/v1",
    "aiPath": "/api/ai",
    "mcpPath": "/mcp",
    "telegramPath": "/telegram",
    "maxJsonBodyBytes": 4194304,
    "maxUploadBytes": 104857600,
    "requestTimeoutMs": 30000
  },
  "ai": {
    "provider": "google",
    "models": {
      "translation": "gemini-3.8-flash",
      "ocr": "gemini-3.8-flash",
      "stt": "gemini-3.8-flash",
      "tts": "gemini-3.8-flash-tts",
      "ttsLite": "gemini-3.8-flash-lite-tts",
      "storyboard": "gemini-3.8-flash",
      "audioMix": "gemini-3.8-flash",
      "vietnamese": "gemini-3.8-flash"
    },
    "temperature": 0.1,
    "cloudflareTtsModel": "@cf/myshell-ai/melotts"
  },
  "storage": {
    "provider": "cloudflare-r2",
    "bucketName": "hendy-video-studio-pro-media",
    "bucketEnv": "R2_BUCKET",
    "accountId": "918ff2f016938fc978ed23b96505b21e",
    "endpoint": "https://918ff2f016938fc978ed23b96505b21e.r2.cloudflarestorage.com",
    "zeroEgress": true,
    "publicAccess": false
  },
  "editor": {
    "audioChannels": [
      "video",
      "bgm",
      "tts",
      "master"
    ],
    "duckingGain": 0.2,
    "transitionGapSeconds": 1.5,
    "defaultWidth": 1280,
    "defaultHeight": 720,
    "defaultFps": 30,
    "defaultSubtitleStyle": {
      "fontFamily": "Arial",
      "fontSize": 46,
      "color": "#ffffff",
      "strokeColor": "#000000",
      "strokeWidth": 6,
      "bottomPx": 52
    }
  },
  "ui": {
    "theme": {
      "bg": "#070b12",
      "panel": "#0c121c",
      "panel2": "#0f1724",
      "surface": "#121b2a",
      "border": "rgba(148,163,184,0.12)",
      "borderStrong": "rgba(148,163,184,0.20)",
      "text": "#e6edf7",
      "muted": "#8793a6",
      "cyan": "#22d3ee",
      "blue": "#4f7cff",
      "purple": "#8b5cf6",
      "success": "#34d399",
      "warning": "#fbbf24",
      "danger": "#fb7185"
    },
    "layout": {
      "headerHeight": 60,
      "workspaceGap": 8,
      "panelRadius": 14,
      "gridSize": 32
    },
    "status": {
      "nominalLabel": "NOMINAL",
      "nominalDescription": "Automated checks passed; ready for sync.",
      "warningLabel": "WARNING",
      "failedLabel": "FAILED"
    }
  },
  "runtime": {
    "sandbox": {
      "host": "127.0.0.1",
      "port": 8799,
      "wsPath": "/ws",
      "autoStartHint": true,
      "publicAccess": false
    },
    "dev": {
      "vitePort": 5173,
      "unifiedServerPort": 3000
    },
    "cloudflare": {
      "compatibilityDate": "2026-10-02",
      "publicAppUrl": "https://hendy-video-studio-pro.ngogiaidy56.workers.dev",
      "gateway": {
        "workerName": "hendy-video-studio-pro",
        "rootDirectory": "/",
        "main": "frontend/src/edge.ts",
        "assetsDirectory": "./frontend/dist",
        "buildCommand": "bun run build",
        "deployCommand": "bun run worker:deploy",
        "watchPaths": [
          "frontend/**",
          "system-config/**",
          "package.json",
          "bun.lock",
          "wrangler.jsonc"
        ]
      },
      "workers": {
        "backend": {
          "workerName": "hendy-video-studio-pro-backend",
          "rootDirectory": "/backend/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "backend/**",
            "shared/**",
            "system-config/**"
          ]
        },
        "ai": {
          "workerName": "hendy-video-studio-pro-ai",
          "rootDirectory": "/worker/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "worker/**",
            "system-config/**"
          ]
        },
        "mcp": {
          "workerName": "hendy-video-studio-pro-mcp",
          "rootDirectory": "/mcp/cloudflare/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "mcp/cloudflare/**",
            "system-config/**"
          ]
        },
        "telegram": {
          "workerName": "hendy-video-studio-pro-telegram",
          "rootDirectory": "/example_bot/",
          "buildCommand": "bun run build",
          "deployCommand": "bunx wrangler deploy --config wrangler.jsonc",
          "watchPaths": [
            "example_bot/**",
            "system-config/**"
          ]
        }
      },
      "deployOrder": [
        "backend",
        "ai",
        "mcp",
        "telegram",
        "gateway"
      ]
    }
  },
  "telegram": {
    "adminUserIdsEnv": "ADMIN_USER_IDS",
    "webhookPath": "/telegram/webhook",
    "secretHeader": "X-Telegram-Bot-Api-Secret-Token",
    "d1": {
      "binding": "DB",
      "databaseName": "telegram-bot-db",
      "databaseId": "4925d076-24b7-4d08-a63c-342766ba4036"
    }
  },
  "security": {
    "telegramInitDataMaxAgeSeconds": 300,
    "otpTtlSeconds": 60,
    "requiredSecrets": {
      "backend": [
        "GEMINI_API_KEY",
        "TELEGRAM_BOT_TOKEN",
        "R2_ACCESS_KEY_ID",
        "R2_SECRET_ACCESS_KEY",
        "ADMIN_USER_IDS",
        "MCP_OTP_SECRET"
      ],
      "telegram": [
        "TELEGRAM_BOT_TOKEN",
        "ADMIN_USER_IDS",
        "MCP_OTP_SECRET",
        "TELEGRAM_SECRET_TOKEN"
      ]
    },
    "frontendSecretsForbidden": true,
    "sandboxPublicAccessForbidden": true
  },
  "platforms": {
    "web": {
      "enabled": true
    },
    "pwa": {
      "enabled": true,
      "startUrl": "/",
      "display": "standalone",
      "themeColor": "#070b12",
      "backgroundColor": "#070b12"
    },
    "android": {
      "enabled": true,
      "packageId": "com.aistudiopro.vietsub",
      "appName": "Hendy Video Studio Pro"
    },
    "ios": {
      "enabled": true,
      "bundleId": "com.aistudiopro.vietsub",
      "appName": "Hendy Video Studio Pro"
    }
  },
  "sync": {
    "broadcastEvent": "SYSTEM_CONFIG_SYNCED",
    "releaseGate": "NOMINAL",
    "managedFiles": [
      "package.json",
      "capacitor.config.ts",
      "wrangler.jsonc",
      "backend/package.json",
      "backend/wrangler.jsonc",
      "worker/package.json",
      "worker/wrangler.jsonc",
      "mcp/cloudflare/package.json",
      "mcp/cloudflare/wrangler.jsonc",
      "mcp/cloudflare/src/runtime-config.ts",
      "example_bot/package.json",
      "example_bot/wrangler.jsonc",
      "public/manifest.json",
      "public/_headers",
      "public/sw.js",
      "src/generated/system-config.ts",
      "src/generated/system-theme.css",
      "index.html",
      "frontend/index.html",
      "frontend/package.json",
      "frontend/vite.config.ts",
      "frontend/public/manifest.json",
      "frontend/public/_headers",
      "frontend/public/sw.js",
      "frontend/src/generated/system-config.ts",
      "frontend/src/generated/system-env.ts",
      "frontend/src/generated/system-layout.tsx",
      "frontend/src/generated/system-theme.css"
    ]
  },
  "system": {
    "name": "Hendy Video Studio Pro",
    "version": "3.2.0",
    "environment": "production"
  }
} as const;
export const SYSTEM_CONFIG_VERSION = "3.2.0";
