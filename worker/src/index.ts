export interface Env {
  API_BASE_PATH: string;
  AI: Ai;
  CLOUDFLARE_TTS_MODEL?: string;
}

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, { headers: { 'cache-control': 'no-store' }, ...init });
}

const audioHeaders = {
  'content-type': 'audio/mpeg',
  'cache-control': 'no-store'
};

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (req.method === 'GET' && (url.pathname === '/health' || url.pathname === '/api/ai/health')) {
      return json({ ok: true, edge: true, version: '2.4.0', ai: true });
    }

    if (req.method === 'POST' && url.pathname === '/api/ai/tts') {
      const body = await req.json<{ text?: string; lang?: string }>();

      if (!body.text?.trim()) {
        return json({ error: 'text is required' }, { status: 400 });
      }

      const result = await env.AI.run(
        env.CLOUDFLARE_TTS_MODEL || '@cf/myshell-ai/melotts',
        {
          prompt: body.text,
          lang: body.lang || 'vi'
        }
      );

      if (result instanceof ArrayBuffer) {
        return new Response(result, { headers: audioHeaders });
      }

      if (ArrayBuffer.isView(result)) {
        const view = result as Uint8Array;
        const bodyBuffer = view.buffer.slice(
          view.byteOffset,
          view.byteOffset + view.byteLength
        ) as ArrayBuffer;
        return new Response(bodyBuffer, { headers: audioHeaders });
      }

      return json(result);
    }

    if (url.pathname.startsWith(env.API_BASE_PATH || '/api/v1')) {
      return json({ ok: true, service: 'edge-worker', path: url.pathname });
    }

    return new Response('Not Found', { status: 404 });
  }
} satisfies ExportedHandler<Env>;
