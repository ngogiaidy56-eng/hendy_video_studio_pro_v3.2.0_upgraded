export interface Env {
  ASSETS: Fetcher;
  BACKEND: Fetcher;
  AI_EDGE: Fetcher;
  MCP: Fetcher;
  TELEGRAM: Fetcher;
}

async function probe(fetcher:Fetcher, path:string, request:Request) {
  try {
    const u=new URL(request.url);
    u.pathname=path;
    const r=await fetcher.fetch(new Request(u.toString(),{method:'GET'}));
    return {status:r.status,ok:r.ok};
  } catch(e) {
    return {status:0,ok:false,error:e instanceof Error?e.message:String(e)};
  }
}

export default {
  async fetch(request:Request,env:Env):Promise<Response> {
    const url=new URL(request.url);

    if(url.pathname==='/health') {
      return Response.json({ok:true,service:'gateway',version:'2.4.0',runtime:'cloudflare-workers'});
    }

    if(url.pathname==='/health/all') {
      const [backend,backendReady,ai,mcp,telegram]=await Promise.all([
        probe(env.BACKEND,'/health',request),
        probe(env.BACKEND,'/health/ready',request),
        probe(env.AI_EDGE,'/health',request),
        probe(env.MCP,'/health',request),
        probe(env.TELEGRAM,'/health',request)
      ]);
      const checks={gateway:{status:200,ok:true},backend,backendReady,ai,mcp,telegram};
      return Response.json({ok:Object.values(checks).every(x=>x.ok),checks,version:'2.4.0'},{
        status:Object.values(checks).every(x=>x.ok)?200:503,
        headers:{'cache-control':'no-store'}
      });
    }

    if(url.pathname==='/mcp' || url.pathname.startsWith('/mcp/')) return env.MCP.fetch(request);
    if(url.pathname==='/telegram' || url.pathname.startsWith('/telegram/')) return env.TELEGRAM.fetch(request);
    if(url.pathname==='/api/ai' || url.pathname.startsWith('/api/ai/')) return env.AI_EDGE.fetch(request);
    if(url.pathname==='/api/' || url.pathname.startsWith('/api/')) return env.BACKEND.fetch(request);
    if(url.pathname==='/tai-app') return env.BACKEND.fetch(request);
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
