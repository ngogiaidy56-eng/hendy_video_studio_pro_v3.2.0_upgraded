export interface Env {
  API_BASE_PATH: string;
  AI: Ai;
  CLOUDFLARE_TTS_MODEL?: string;
  APP_VERSION?: string;
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
      return json({ ok: true, edge: true, version: env.APP_VERSION || '3.2.0', ai: true });
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
        // Cloudflare's AI typings narrow this branch to an intersection
        // that is not directly assignable to Uint8Array under strict TS.
        // The runtime value is an ArrayBufferView, so normalize it through
        // unknown before slicing the exact byte range into an ArrayBuffer.
        const view = result as unknown as Uint8Array;
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
