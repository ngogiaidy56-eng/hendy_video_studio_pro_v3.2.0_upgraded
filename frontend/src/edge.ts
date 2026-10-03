import {SYSTEM_CONFIG_VERSION} from './generated/system-config';

export interface Env {
  ASSETS: Fetcher;
  BACKEND: Fetcher;
  AI_EDGE: Fetcher;
  MCP: Fetcher;
  TELEGRAM: Fetcher;
}

const noStore={'cache-control':'no-store'};

async function probe(fetcher:Fetcher,path:string,request:Request){
  try{
    const url=new URL(request.url);
    url.pathname=path;
    const response=await fetcher.fetch(new Request(url.toString(),{method:'GET',headers:{'cache-control':'no-cache'}}));
    return {status:response.status,ok:response.ok};
  }catch(error){
    return {status:0,ok:false,error:error instanceof Error?error.message:String(error)};
  }
}

export default {
  async fetch(request:Request,env:Env):Promise<Response>{
    const url=new URL(request.url);
    if(url.pathname==='/health') return Response.json({ok:true,service:'gateway',version:SYSTEM_CONFIG_VERSION,runtime:'cloudflare-workers'},{headers:noStore});
    if(url.pathname==='/health/all'){
      const [backend,backendReady,ai,mcp,telegram]=await Promise.all([
        probe(env.BACKEND,'/health',request),
        probe(env.BACKEND,'/health/ready',request),
        probe(env.AI_EDGE,'/health',request),
        probe(env.MCP,'/health',request),
        probe(env.TELEGRAM,'/health',request)
      ]);
      const checks={gateway:{status:200,ok:true},backend,backendReady,ai,mcp,telegram};
      const ok=Object.values(checks).every(x=>x.ok);
      return Response.json({ok,checks,version:SYSTEM_CONFIG_VERSION},{status:ok?200:503,headers:noStore});
    }
    if(url.pathname==='/mcp'||url.pathname.startsWith('/mcp/')) return env.MCP.fetch(request);
    if(url.pathname==='/telegram'||url.pathname.startsWith('/telegram/')) return env.TELEGRAM.fetch(request);
    if(url.pathname==='/api/ai'||url.pathname.startsWith('/api/ai/')) return env.AI_EDGE.fetch(request);
    if(url.pathname==='/api'||url.pathname.startsWith('/api/')) return env.BACKEND.fetch(request);
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
