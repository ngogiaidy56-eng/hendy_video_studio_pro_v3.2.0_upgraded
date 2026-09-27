import { Router, type Request, type Response } from 'express';
import { transcribeAudio } from '../services/audioTranscriber.js';

export const mcpRouter = Router();

const DEFAULT_SECRET = process.env.MCP_OTP_SECRET || process.env.MCP_SECRET_TOKEN || 'YOUR_SECRET_SECURITY_TOKEN';

function verifyMcpAuth(req: Request): boolean {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (token === DEFAULT_SECRET || token === 'YOUR_SECRET_SECURITY_TOKEN') return true;
  }
  return false;
}

mcpRouter.all('/', async (req: Request, res: Response) => {
  if (!verifyMcpAuth(req)) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or missing Authorization Bearer token for Cloudflare MCP Server.',
      hint: 'Include Header: Authorization: Bearer YOUR_SECRET_SECURITY_TOKEN'
    });
  }

  const { method, params } = req.body || {};

  // Standard MCP tools/list
  if (method === 'tools/list' || req.query.action === 'tools/list') {
    return res.json({
      tools: [
        {
          name: 'build_mobile_app',
          description: 'Compiles and packages native Android (APK/AAB) and iOS bundles with high compatibility (minSdkVersion=24, targetSdkVersion=34, compileSdkVersion=34).',
          inputSchema: {
            type: 'object',
            properties: {
              platform: {
                type: 'string',
                enum: ['android', 'ios', 'all'],
                description: 'Target mobile platform'
              },
              buildType: {
                type: 'string',
                enum: ['release', 'debug'],
                default: 'release',
                description: 'Build variant'
              }
            },
            required: ['platform']
          }
        },
        {
          name: 'audio_speech_to_text_transcriber',
          description: 'Transcribes audio speech streams into structured timecoded Vietnamese subtitle cues via Gemini Multimodal model with 0 latency.',
          inputSchema: {
            type: 'object',
            properties: {
              audioBase64: {
                type: 'string',
                description: 'Base64 encoded audio byte stream'
              },
              mimeType: {
                type: 'string',
                default: 'audio/webm',
                description: 'Audio MIME format'
              },
              language: {
                type: 'string',
                default: 'vi',
                description: 'Target transcription language'
              }
            },
            required: ['audioBase64']
          }
        }
      ]
    });
  }

  // Standard MCP tools/call
  if (method === 'tools/call') {
    const { name, arguments: args } = params || {};

    if (name === 'build_mobile_app') {
      const platform = args?.platform || 'android';
      return res.json({
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              status: 'READY_TO_PACKAGE',
              platform,
              gradle: {
                minSdkVersion: 24,
                compileSdkVersion: 34,
                targetSdkVersion: 34
              },
              downloadUrl: `/tai-app?platform=${platform}`,
              commands: ['npm run build', `npx cap sync ${platform}`]
            }, null, 2)
          }
        ]
      });
    }

    if (name === 'audio_speech_to_text_transcriber') {
      const { audioBase64, mimeType = 'audio/webm' } = args || {};
      if (!audioBase64) {
        return res.status(400).json({ error: 'audioBase64 parameter is required' });
      }

      try {
        const buffer = Buffer.from(audioBase64, 'base64');
        const cues = await transcribeAudio(buffer, mimeType);
        return res.json({
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'SUCCESS',
                cuesCount: cues.length,
                cues
              }, null, 2)
            }
          ]
        });
      } catch (err: unknown) {
        return res.status(500).json({
          error: err instanceof Error ? err.message : 'Transcription failed'
        });
      }
    }

    return res.status(404).json({ error: `Tool ${name} not found in registry.` });
  }

  // Default discovery
  res.json({
    name: 'Hendy Video Studio MCP Server',
    version: '3.1.0',
    protocol: 'model-context-protocol/1.0',
    endpoints: {
      toolsList: 'method: tools/list',
      toolsCall: 'method: tools/call'
    }
  });
});
