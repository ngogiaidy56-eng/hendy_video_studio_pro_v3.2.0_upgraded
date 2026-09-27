import { useEffect, useState } from 'react';
import type { Clip } from '../../types/project';
export function InspectorPanel({ clip, onChange, onGenerateTts, onEnhance }:{clip?:Clip;onChange?:(patch:Partial<Clip>)=>void;onGenerateTts?:(clip:Clip)=>Promise<void>;onEnhance?:(clip:Clip)=>Promise<void>}) {
  const [text,setText]=useState(clip?.text || ''); const [busy,setBusy]=useState(false);
  useEffect(()=>setText(clip?.text || ''),[clip?.id,clip?.text]);
  if (!clip) return <section className="panel stack"><strong>Inspector</strong><span className="muted">Chọn clip trên Timeline để chỉnh.</span></section>;
  const run=async(fn?: (clip:Clip)=>Promise<void>)=>{if(!fn)return;setBusy(true);try{await fn(clip)}finally{setBusy(false)}};
  return <section className="panel stack"><div className="row" style={{justifyContent:'space-between'}}><strong>Inspector</strong><span className="muted">{clip.kind}</span></div>
    <label>Label<input value={clip.label} onChange={e=>onChange?.({label:e.target.value})}/></label>
    <label>Start (ms)<input type="number" value={clip.startMs} onChange={e=>onChange?.({startMs:Number(e.target.value)})}/></label>
    <label>End (ms)<input type="number" value={clip.endMs} onChange={e=>onChange?.({endMs:Number(e.target.value)})}/></label>
    {clip.kind==='subtitle' && <><label>Subtitle<textarea value={text} onChange={e=>{setText(e.target.value);onChange?.({text:e.target.value})}} /></label><div className="row"><button className="button" disabled={busy} onClick={()=>run(onEnhance)}>✨ Enhance VI</button><button className="button primary" disabled={busy} onClick={()=>run(onGenerateTts)}>🔊 Generate TTS</button></div></>}
  </section>;
}
