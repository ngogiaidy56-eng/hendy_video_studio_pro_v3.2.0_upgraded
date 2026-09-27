# Editor AI Pipeline v2.4.0

## Browser Client
- `Header.tsx`: session/status shell.
- `App.tsx`: central project state, selection, playback dispatch and export orchestration.
- `AssetSidebar.tsx`: import/drag-drop/record entry points.
- `CanvasPreview.tsx`: 1280x720 canvas viewport and subtitle/PiP-ready composition surface.
- `Timeline.tsx`: four-track scroller surface.
- `InspectorPanel.tsx`: clip timing and subtitle editing.
- `MultiChannelAudioMixer.tsx`: Web Audio API 4-channel gain/meter/ducking matrix.

## Client Processing
- `audioEngine.ts`: Web Audio graph, limiter/compressor and meters.
- `videoRenderer.ts`: Canvas capture + codec capability detection via MediaRecorder.
- `subtitleExporter.ts`: SRT/VTT/ASS formatter and download.
- `appDownloader.ts`: platform download routing.

## Server API
- `POST /api/gemini/subtitles`
- `POST /api/gemini/tts`
- `POST /api/cloudflare/tts`
- `POST /api/gemini/audio-mix`
- `POST /api/gemini/create-video`
- `POST /api/gemini/transcribe`
- `POST /api/gemini/enhance-vietnamese`

## AI Models
Gemini uses `gemini-3.8-flash` for translation/STT/storyboard/mix/enhancement and `gemini-3.8-flash-tts` for studio TTS. The Cloudflare Worker uses the currently documented Workers AI model ID `@cf/myshell-ai/melotts` for MP3 TTS.

## Render Manifest
The frontend creates a v2 manifest containing canvas settings, timeline clips, four audio channels and ASS subtitle payloads. Production renderers can consume this manifest without coupling to React state.
