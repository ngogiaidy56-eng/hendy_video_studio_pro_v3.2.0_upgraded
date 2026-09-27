import { useEffect, useRef } from 'react';
import type { Clip } from '../../types/project';
import { drawSubtitle } from '../../utils/subBurner';
export function CanvasPreview({clips,currentTimeMs,onSeek}:{clips:Clip[];currentTimeMs:number;onSeek?:(ms:number)=>void}){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{const c=ref.current;if(!c)return;c.width=1280;c.height=720;const ctx=c.getContext('2d')!;ctx.fillStyle='#111113';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#777';ctx.font='42px system-ui';ctx.textAlign='center';ctx.fillText(`Preview · ${(currentTimeMs/1000).toFixed(2)}s`,c.width/2,80);const subs=clips.filter(x=>x.kind==='subtitle'&&x.startMs<=currentTimeMs&&x.endMs>=currentTimeMs&&x.text);if(subs[0])drawSubtitle(ctx,subs[0].text!,{fontFamily:'Arial',fontSize:46,color:'#fff',strokeColor:'#000',strokeWidth:7,bottomPx:55},c.width,c.height)},[clips,currentTimeMs]);
  const duration=Math.max(...clips.map(c=>c.endMs),60000);
  return <section className="panel"><div className="row" style={{justifyContent:'space-between'}}><strong>Canvas Preview</strong><span className="muted">1280×720 · PiP ready · {Math.round(duration/1000)}s</span></div><canvas ref={ref} onClick={e=>{const r=e.currentTarget.getBoundingClientRect();onSeek?.((e.clientX-r.left)/r.width*duration)}} style={{display:'block',width:'100%',borderRadius:12,marginTop:10,cursor:'crosshair'}}/></section>;
}
