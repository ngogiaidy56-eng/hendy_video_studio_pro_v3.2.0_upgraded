import { useMemo, useReducer, useState } from 'react';
import { SYSTEM_CONFIG } from './generated/system-config';
import { SystemLayout } from './generated/system-layout';
import './generated/system-theme.css';
import { SystemControlPanel } from './components/system/SystemControlPanel';
import { PwaInstallBanner } from './components/system/PwaInstallBanner';
import { Header } from './components/system/Header';
import { AssetSidebar } from './components/editor/AssetSidebar';
import { CanvasPreview } from './components/editor/CanvasPreview';
import { Timeline } from './components/editor/Timeline';
import { InspectorPanel } from './components/editor/InspectorPanel';
import { MultiChannelAudioMixer } from './components/editor/MultiChannelAudioMixer';
import { buildRenderManifest } from './services/renderManifest';
import { api } from './services/api';
import { toAss, toSrt, toVtt, downloadText } from './utils/subtitleExporter';
import { exportCanvasVideo } from './utils/videoRenderer';
import { generateGeminiTts, transcribeAudioFile, enhanceVietnamese } from './services/ai';
import type { Clip, Project } from './types/project';

type State={project:Project;selectedId?:string;currentTimeMs:number;theme:'dark'|'light'};
const initial:State={project:{id:crypto.randomUUID(),width:1280,height:720,fps:30,durationMs:60000,clips:[{id:'video-1',track:0,kind:'video',startMs:0,endMs:10000,label:'Main Video'},{id:'bgm-1',track:1,kind:'audio',startMs:0,endMs:10000,label:'BGM'},{id:'sub-1',track:2,kind:'subtitle',startMs:500,endMs:3200,label:'Subtitle',text:'Xin chào từ AI Studio Pro'}]},currentTimeMs:0,theme:'dark'};
function reducer(s:State,a:{type:string;id?:string;patch?:Partial<Clip>;clips?:Clip[];time?:number}):State{
  if(a.type==='select')return{...s,selectedId:a.id}; if(a.type==='seek')return{...s,currentTimeMs:a.time||0}; if(a.type==='theme')return{...s,theme:s.theme==='dark'?'light':'dark'};
  if(a.type==='add')return{...s,project:{...s.project,clips:[...s.project.clips,...(a.clips||[])]}};
  if(a.type==='patch')return{...s,project:{...s.project,clips:s.project.clips.map(c=>c.id===a.id?{...c,...a.patch}:c)}};
  return s;
}

export default function App(){
  const [state,dispatch]=useReducer(reducer,initial); const [status,setStatus]=useState('NOMINAL');
  const params=useMemo(()=>new URLSearchParams(location.search),[]); const admin=params.get('admin')==='true';
  const selected=state.project.clips.find(c=>c.id===state.selectedId);
  const onUpload=(file:File)=>dispatch({type:'add',clips:[{id:crypto.randomUUID(),track:file.type.startsWith('audio')?1:0,kind:file.type.startsWith('audio')?'audio':file.type.startsWith('image')?'video':'video',startMs:0,endMs:5000,label:file.name}]});
  const transcribe=async(file:File)=>{setStatus('TRANSCRIBING…');try{const r=await transcribeAudioFile(file);dispatch({type:'add',clips:r.cues.map((c,i)=>({id:crypto.randomUUID(),track:2,kind:'subtitle' as const,startMs:c.startMs,endMs:c.endMs,label:`STT ${i+1}`,text:c.text}))});setStatus('NOMINAL')}catch{setStatus('STT ERROR')}};
  const generateTts=async(clip:Clip)=>{if(!clip.text)return;setStatus('TTS…');try{const r=await generateGeminiTts(clip.text,{voice:'Kore',style:'natural cinematic Vietnamese narration'});const bytes=Uint8Array.from(atob(r.base64),c=>c.charCodeAt(0));const url=URL.createObjectURL(new Blob([bytes],{type:r.mimeType}));dispatch({type:'add',clips:[{id:crypto.randomUUID(),track:3,kind:'audio',startMs:clip.startMs,endMs:clip.startMs+Math.max(900,clip.endMs-clip.startMs),label:`TTS · ${clip.label}`,assetId:url}]});setStatus('NOMINAL')}catch{setStatus('TTS ERROR')}};
  const enhance=async(clip:Clip)=>{if(!clip.text)return;setStatus('ENHANCING…');try{const r=await enhanceVietnamese(clip.text);dispatch({type:'patch',id:clip.id,patch:{text:r.text}});setStatus('NOMINAL')}catch{setStatus('VI ENHANCE ERROR')}};
  const optimize=async(channels:Record<string,unknown>)=>{setStatus('AI MIX…');try{const r=await api<Record<string,unknown>>('/api/gemini/audio-mix',{method:'POST',body:JSON.stringify({channels:Object.entries(channels).map(([id,v])=>({id,...(v as object)})),voicePresent:true})});setStatus('NOMINAL');return r;}catch{setStatus('AI OFFLINE');}};
  const exportSub=(kind:'srt'|'vtt'|'ass')=>{const cues=state.project.clips.filter(c=>c.kind==='subtitle'&&c.text).map(c=>({startMs:c.startMs,endMs:c.endMs,text:c.text!}));const text=kind==='srt'?toSrt(cues):kind==='vtt'?toVtt(cues):toAss(cues);downloadText(text,`hendy-${state.project.id}.${kind}`,'text/plain;charset=utf-8');};
  const exportVideo=async()=>{const canvas=document.querySelector('canvas');if(!(canvas instanceof HTMLCanvasElement))return;setStatus('RENDERING…');try{const blob=await exportCanvasVideo(canvas,(ctx,timeMs)=>{ctx.fillStyle='#111113';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#777';ctx.font='42px system-ui';ctx.textAlign='center';ctx.fillText(`Hendy Video Studio Pro · ${(timeMs/1000).toFixed(2)}s`,canvas.width/2,80);const sub=state.project.clips.find(c=>c.kind==='subtitle'&&c.startMs<=timeMs&&c.endMs>=timeMs&&c.text);if(sub){const y=canvas.height-55;ctx.font='46px Arial';ctx.lineWidth=7;ctx.strokeStyle='#000';ctx.strokeText(sub.text!,canvas.width/2,y);ctx.fillStyle='#fff';ctx.fillText(sub.text!,canvas.width/2,y)}},state.project.durationMs,state.project.fps); const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='hendy-studio-export.'+(blob.type.includes('mp4')?'mp4':'webm');a.click();URL.revokeObjectURL(url);setStatus('NOMINAL')}catch{setStatus('RENDER ERROR')}};
  return <SystemLayout><div className="stack"><Header version={SYSTEM_CONFIG.system.version} admin={admin} actions={<><button className="button" onClick={()=>dispatch({type:'theme'})}>{state.theme==='dark'?'LIGHT':'DARK'}</button><span className="status">● {status}</span></>}/>{admin&&<SystemControlPanel/>}
    <div className="workspace"><AssetSidebar onUpload={onUpload} onRecord={()=>setStatus('RECORD BLOCKED')} onTranscribe={transcribe}/><div className="stack"><CanvasPreview clips={state.project.clips} currentTimeMs={state.currentTimeMs} onSeek={time=>dispatch({type:'seek',time})}/><Timeline clips={state.project.clips} selectedId={state.selectedId} onSelect={id=>dispatch({type:'select',id})}/></div><div className="stack"><InspectorPanel clip={selected} onChange={patch=>selected&&dispatch({type:'patch',id:selected.id,patch})} onGenerateTts={generateTts} onEnhance={enhance}/><MultiChannelAudioMixer onAiOptimize={optimize}/><section className="panel stack"><strong>Export / Manifest</strong><button className="button primary" onClick={()=>navigator.clipboard?.writeText(JSON.stringify(buildRenderManifest(state.project),null,2))}>Copy Render Manifest</button><div className="row"><button className="button" onClick={()=>exportSub('srt')}>SRT</button><button className="button" onClick={()=>exportSub('vtt')}>VTT</button><button className="button" onClick={()=>exportSub('ass')}>ASS</button></div><button className="button" onClick={exportVideo}>Render Preview</button></section></div></div><PwaInstallBanner/></div></SystemLayout>;
}
