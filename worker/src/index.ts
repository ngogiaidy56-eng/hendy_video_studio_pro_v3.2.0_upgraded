export interface Env { API_BASE_PATH:string }
export default { async fetch(req:Request, env:Env):Promise<Response> {
  const url=new URL(req.url);
  if(url.pathname==='/health') return Response.json({ok:true,edge:true,version:'2.4.0'});
  if(url.pathname.startsWith(env.API_BASE_PATH || '/api/v1')) return Response.json({ok:true,service:'edge-worker',path:url.pathname});
  return new Response('Not Found',{status:404});
}} satisfies ExportedHandler<Env>;
