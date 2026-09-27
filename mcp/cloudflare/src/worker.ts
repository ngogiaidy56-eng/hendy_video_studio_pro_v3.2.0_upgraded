import {createMcpHandler} from 'agents/mcp/server';
import {McpServer} from '@modelcontextprotocol/server';
import * as z from 'zod/v4';

const handler=createMcpHandler(() => {
  const server=new McpServer({name:'Hendy Video Studio Pro Control Plane',version:'2.4.0'});

  server.registerTool('system.health',{
    title:'System health',
    description:'Check the public Hendy production gateway and service health.',
    inputSchema:z.object({})
  },async()=>{
    const base='https://hendy-video-studio-pro.ngogiaidy56.workers.dev';
    const paths=['/health','/api/health','/api/ai/health','/telegram/health'];
    const checks=await Promise.all(paths.map(async p=>{
      try{
        const r=await fetch(base+p,{cache:'no-store'});
        return {path:p,status:r.status,ok:r.ok};
      }catch(e){
        return {path:p,status:0,ok:false,error:e instanceof Error?e.message:String(e)};
      }
    }));
    return {content:[{type:'text',text:JSON.stringify({ok:checks.every(x=>x.ok),checks},null,2)}]};
  });

  server.registerTool('release.info',{
    title:'Release info',
    description:'Return current application release information.',
    inputSchema:z.object({})
  },async()=>{
    return {content:[{type:'text',text:JSON.stringify({
      version:'2.4.0',
      architecture:'gateway+express-worker+ai-worker+mcp-worker+telegram-worker',
      status:'production'
    },null,2)}]};
  });

  return server;
});

export default {
  fetch(request:Request,env:unknown,ctx:ExecutionContext){
    return handler(request,env,ctx);
  }
};
