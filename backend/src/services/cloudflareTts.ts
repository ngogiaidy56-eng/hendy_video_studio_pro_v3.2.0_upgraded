export async function synthesizeCloudflareTts(text:string,lang='vi'){
  const endpoint=process.env.CLOUDFLARE_AI_TTS_URL || ((process.env.PUBLIC_APP_URL || 'https://hendy-video-studio-pro.ngogiaidy56.workers.dev') + '/api/ai/tts');
  const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({text,lang})});
  if(!response.ok) throw new Error('Cloudflare TTS failed: '+response.status+' '+await response.text());
  const contentType=response.headers.get('content-type') || 'audio/mpeg';
  const buffer=Buffer.from(await response.arrayBuffer());
  return {mimeType:contentType,base64:buffer.toString('base64'),bytes:buffer.byteLength};
}
