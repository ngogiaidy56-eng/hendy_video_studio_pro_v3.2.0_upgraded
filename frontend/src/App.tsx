import {useMemo,useState} from 'react';
import {SYSTEM_CONFIG} from './generated/system-config';
import {SystemLayout} from './generated/system-layout';
import './generated/system-theme.css';
import {SystemControlPanel} from './components/system/SystemControlPanel';
import {PwaInstallBanner} from './components/system/PwaInstallBanner';
import {AssetSidebar} from './components/editor/AssetSidebar';
import {CanvasPreview} from './components/editor/CanvasPreview';
import {AudioMixer} from './components/editor/AudioMixer';
import {Timeline} from './components/editor/Timeline';
import type {Clip} from './types/project';

export default function App(){const [clips,setClips]=useState<Clip[]>([{id:'video-1',track:0,kind:'video',startMs:0,endMs:10000,label:'Main Video'},{id:'bgm-1',track:1,kind:'audio',startMs:0,endMs:10000,label:'BGM'},{id:'sub-1',track:2,kind:'subtitle',startMs:500,endMs:3200,label:'Subtitle',text:'Xin chào'}]);const [theme,setTheme]=useState(true);const params=useMemo(()=>new URLSearchParams(location.search),[]);const admin=params.get('admin')==='true';const onUpload=(file:File)=>setClips(c=>[...c,{id:crypto.randomUUID(),track:0,kind:file.type.startsWith('audio')?'audio':file.type.startsWith('image')?'video':'video',startMs:0,endMs:5000,label:file.name}]);return <SystemLayout><div className="stack"><header className="row" style={{justifyContent:'space-between'}}><div><h1 style={{margin:'0 0 4px'}}>🎬 {SYSTEM_CONFIG.system.name}</h1><div className="muted">v{SYSTEM_CONFIG.system.version} · Offline-first Editor</div></div><button className="button" onClick={()=>setTheme(v=>!v)}>{theme?'LIGHT':'DARK'}</button></header>{admin&&<SystemControlPanel/>}<div className="workspace"><AssetSidebar onUpload={onUpload}/><div className="stack"><CanvasPreview/><Timeline clips={clips}/></div><AudioMixer/></div><PwaInstallBanner/></div></SystemLayout>}
