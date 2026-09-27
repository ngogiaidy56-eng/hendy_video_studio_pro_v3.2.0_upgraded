import { useRef, useState } from 'react';

export function AssetSidebar({onUpload,onRecord,onTranscribe}:{onUpload:(file:File)=>void;onRecord?:()=>void;onTranscribe?:(file:File)=>void}){
  const ref=useRef<HTMLInputElement>(null); const [drag,setDrag]=useState(false); const [recording,setRecording]=useState(false); const recorder=useRef<MediaRecorder>(); const chunks=useRef<BlobPart[]>([]); const lastAudio=useRef<File>();
  const importFile=(file:File)=>{lastAudio.current=file.type.startsWith('audio/')?file:lastAudio.current;onUpload(file)};
  const startRecord=async()=>{
    if(recording)return;
    if(!navigator.mediaDevices?.getUserMedia){onRecord?.();return;}
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    const media=new MediaRecorder(stream); recorder.current=media; chunks.current=[];
    media.ondataavailable=e=>e.data.size&&chunks.current.push(e.data);
    media.onstop=()=>{const blob=new Blob(chunks.current,{type:media.mimeType||'audio/webm'});const file=new File([blob],`recording-${Date.now()}.webm`,{type:blob.type});stream.getTracks().forEach(t=>t.stop());setRecording(false);importFile(file)};
    media.start();setRecording(true);
  };
  const stopRecord=()=>recorder.current?.state==='recording'&&recorder.current.stop();
  return <section className={`panel stack ${drag?'dragging':''}`} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f)importFile(f)}}>
    <strong>Assets</strong><button className="button primary" onClick={()=>ref.current?.click()}>Import Media</button>
    <button className="button" onClick={recording?stopRecord:startRecord}>{recording?'■ Stop Recording':'● Record Mic'}</button>
    <button className="button" disabled={!lastAudio.current} onClick={()=>lastAudio.current&&onTranscribe?.(lastAudio.current)}>🧠 Transcribe Latest Audio</button>
    <input ref={ref} hidden type="file" accept="video/*,audio/*,image/*" onChange={e=>{const f=e.target.files?.[0];if(f)importFile(f)}}/>
    <div className="muted">Kéo video/audio/ảnh vào đây. Audio mới nhất có thể chạy Speech-to-Text và đưa cue lên Timeline.</div>
  </section>;
}
