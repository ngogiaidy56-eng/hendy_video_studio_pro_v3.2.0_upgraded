import {useEffect,useMemo,useRef,useState} from 'react';

type ChannelKey='video'|'bgm'|'tts'|'master';
type Channel={gain:number;muted:boolean;ducking:boolean};
export function AudioMixer(){
 const [channels,setChannels]=useState<Record<ChannelKey,Channel>>({video:{gain:1,muted:false,ducking:false},bgm:{gain:.8,muted:false,ducking:true},tts:{gain:1,muted:false,ducking:false},master:{gain:1,muted:false,ducking:false}});
 const [ducking,setDucking]=useState(false); const audioRef=useRef<AudioContext|null>(null); const nodes=useRef<Record<string,GainNode>>({});
 useEffect(()=>()=>{audioRef.current?.close()},[]);
 const ensureGraph=()=>{if(audioRef.current)return;const ctx=new AudioContext();audioRef.current=ctx;for(const k of Object.keys(channels)){const g=ctx.createGain();g.gain.value=channels[k as ChannelKey].gain;g.connect(ctx.destination);nodes.current[k]=g;}};
 useEffect(()=>{for(const [k,v] of Object.entries(channels)){const node=nodes.current[k];if(node)node.gain.setTargetAtTime(v.muted?0:v.gain, audioRef.current?.currentTime || 0,.02)}},[channels]);
 useEffect(()=>{const bgm=nodes.current.bgm;if(!bgm||!audioRef.current)return;bgm.gain.setTargetAtTime(ducking?.2:(channels.bgm.muted?0:channels.bgm.gain),audioRef.current.currentTime,.08)},[ducking,channels.bgm]);
 const setGain=(key:ChannelKey,gain:number)=>setChannels(s=>({...s,[key]:{...s[key],gain}}));
 const channelNames=useMemo(()=>['video','bgm','tts','master'] as ChannelKey[],[]);
 return <section className="panel stack"><div className="row"><strong>Audio Mixer</strong><button className="button" onClick={ensureGraph}>Start Web Audio</button><button className="button" onClick={()=>setDucking(v=>!v)}>{ducking?'Ducking ON':'Ducking OFF'}</button></div>{channelNames.map(k=><label key={k} className="stack"><span className="row"><span style={{width:55}}>{k.toUpperCase()}</span><input style={{flex:1}} type="range" min="0" max="1.5" step="0.01" value={channels[k].gain} onChange={e=>setGain(k,Number(e.target.value))}/><span>{channels[k].gain.toFixed(2)}</span></span><span className="meter"><span style={{width:`${Math.min(channels[k].gain/1.5*100,100)}%`}}/></span></label>)}</section>
}
