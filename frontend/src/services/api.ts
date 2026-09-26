import {runtimeEnv} from '../generated/system-env';
export async function api<T>(path:string, init:RequestInit={}):Promise<T>{const r=await fetch(`${runtimeEnv.API_BASE_URL}${path}`,{...init,headers:{'content-type':'application/json',...(init.headers||{})}});if(!r.ok)throw new Error(await r.text());return r.json();}
