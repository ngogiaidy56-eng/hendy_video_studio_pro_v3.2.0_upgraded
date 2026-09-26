export const SYSTEM_CONFIG = {
  "system": {
    "name": "Hendy Video Studio Pro",
    "version": "2.4.0",
    "environment": "production"
  },
  "network": {
    "sandboxPort": 8799,
    "backendPort": 8787,
    "frontendPort": 5173,
    "apiBasePath": "/api/v1",
    "mcpPath": "/mcp"
  },
  "features": {
    "enableMCP": true,
    "enableLinkExtractor": true,
    "enableImageOCR": true,
    "enableAudioSTT": true,
    "enableTelegramAdmin": true,
    "enableOfflineFirst": true,
    "enableAudioDucking": true
  },
  "ai": {
    "provider": "google",
    "models": {
      "translation": "gemini-2.5-flash",
      "ocr": "gemini-2.5-flash",
      "stt": "gemini-2.5-flash"
    },
    "temperature": 0.1
  },
  "storage": {
    "provider": "cloudflare-r2",
    "bucketEnv": "R2_BUCKET",
    "zeroEgress": true
  },
  "editor": {
    "audioChannels": [
      "video",
      "bgm",
      "tts",
      "master"
    ],
    "duckingGain": 0.2,
    "transitionGapSeconds": 1.5
  },
  "theme": {
    "darkBackgroundColor": "#17171a",
    "darkContainerBackgroundColor": "#232324",
    "accentColor": "#ff8a00",
    "textColor": "#f5f5f5"
  },
  "managedFiles": [
    "frontend/src/generated/system-config.ts",
    "frontend/src/generated/system-env.ts",
    "frontend/src/generated/system-theme.css",
    "frontend/src/generated/system-layout.tsx",
    "frontend/public/manifest.json",
    "frontend/index.html",
    "worker/wrangler.jsonc"
  ]
} as const;
