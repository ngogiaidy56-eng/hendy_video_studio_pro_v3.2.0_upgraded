export interface Env {
  ASSETS: Fetcher;
  BACKEND: Fetcher;
  AI_EDGE: Fetcher;
  MCP: Fetcher;
  TELEGRAM: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/health') {
      return Response.json({ok:true,service:'gateway',version:'2.4.0'});
    }
    if (url.pathname === '/mcp' || url.pathname.startsWith('/mcp/')) return env.MCP.fetch(request);
    if (url.pathname === '/telegram/health' || url.pathname === '/telegram/webhook') return env.TELEGRAM.fetch(request);
    if (url.pathname === '/api/ai/health' || url.pathname.startsWith('/api/ai/')) return env.AI_EDGE.fetch(request);
    if (url.pathname === '/api/health' || url.pathname.startsWith('/api/')) return env.BACKEND.fetch(request);
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
