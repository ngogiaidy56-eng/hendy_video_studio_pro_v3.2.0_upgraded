import { useEffect, useMemo, useRef, useState } from 'react';
import { AudioEngine, type ChannelId } from '../../utils/audioEngine';
import { SYSTEM_CONFIG } from '../../generated/system-config';

type Channel={gain:number;muted:boolean;ducking:boolean};
const CHANNELS:ChannelId[]=['video','bgm','tts','master'];
export function MultiChannelAudioMixer({onAiOptimize}:{onAiOptimize?:(channels:Record<ChannelId,Channel>)=>Promise<Record<string,unknown>|void>}){
  const [channels,setChannels]=useState<Record<ChannelId,Channel>>({video:{gain:1,muted:false,ducking:false},bgm:{gain:.8,muted:false,ducking:true},tts:{gain:1,muted:false,ducking:false},master:{gain:1,muted:false,ducking:false}});
  const [ducking,setDucking]=useState(true); const [running,setRunning]=useState(false); const engine=useRef<AudioEngine | undefined>(undefined); const [,force]=useState(0);
  const start=async()=>{if(!engine.current) engine.current=new AudioEngine(); await engine.current.resume(); setRunning(true);};
  useEffect(()=>()=>engine.current?.close(),[]);
  useEffect(()=>{CHANNELS.forEach(k=>engine.current?.setGain(k,channels[k].gain,channels[k].muted)); engine.current?.setDucking(ducking,SYSTEM_CONFIG.editor.duckingGain);},[channels,ducking]);
  useEffect(()=>{if(!running)return;const id=window.setInterval(()=>force(v=>v+1),150);return()=>clearInterval(id)},[running]);
  const labels=useMemo(()=>CHANNELS,[ ]);
  return <section className="panel stack"><div className="row" style={{justifyContent:'space-between'}}><strong>Multi-Channel Audio</strong><div className="row"><button className="button" onClick={start}>{running?'Audio ON':'Start Audio'}</button><button className="button" onClick={()=>setDucking(v=>!v)}>{ducking?'Ducking 20%':'Ducking OFF'}</button></div></div>
    {labels.map(k=><div key={k} className="stack"><div className="row"><strong style={{width:64}}>{k.toUpperCase()}</strong><input style={{flex:1}} type="range" min="0" max="1.5" step="0.01" value={channels[k].gain} onChange={e=>setChannels(s=>({...s,[k]:{...s[k],gain:Number(e.target.value)}}))}/><span>{channels[k].gain.toFixed(2)}</span><button className="button" onClick={()=>setChannels(s=>({...s,[k]:{...s[k],muted:!s[k].muted}}))}>{channels[k].muted?'MUTED':'MUTE'}</button></div><div className="meter"><span style={{width:`${Math.round((engine.current?.meter(k)||0)*100)}%`}}/></div></div>)}
    <button className="button primary" disabled={!running} onClick={async()=>{const result=await onAiOptimize?.(channels); if(result) console.info('AI mix recommendation',result)}}>✨ AI Optimize Mix</button>
  </section>;
}
