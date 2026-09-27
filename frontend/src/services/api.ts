import {runtimeEnv} from '../generated/system-env';
export async function api<T>(path:string, init:RequestInit={}):Promise<T>{
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData) && !headers.has('content-type')) headers.set('content-type','application/json');
  const r=await fetch(`${runtimeEnv.API_BASE_URL || ''}${path}`,{...init,headers});
  if(!r.ok)throw new Error(await r.text());
  return r.json();
}
