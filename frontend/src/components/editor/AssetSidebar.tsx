import { useRef, useState } from 'react';

export function AssetSidebar({onUpload,onRecord,onTranscribe}:{onUpload:(file:File)=>void;onRecord?:()=>void;onTranscribe?:(file:File)=>void}){
  const ref=useRef<HTMLInputElement>(null);
  const [drag,setDrag]=useState(false);
  const [recording,setRecording]=useState(false);
  const [deviceNotice,setDeviceNotice]=useState<string | null>(null);
  const recorder=useRef<MediaRecorder | undefined>(undefined);
  const streamRef=useRef<MediaStream | undefined>(undefined);
  const chunks=useRef<BlobPart[]>([]);
  const lastAudio=useRef<File | undefined>(undefined);

  const importFile=(file:File)=>{
    lastAudio.current=file.type.startsWith('audio/')?file:lastAudio.current;
    onUpload(file);
  };

  const startRecord=async()=>{
    if(recording)return;
    setDeviceNotice(null);
    if(!navigator.mediaDevices?.getUserMedia){
      setDeviceNotice('Trình duyệt hiện tại không hỗ trợ thu âm micro.');
      onRecord?.();
      return;
    }
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      streamRef.current=stream;
      const media=new MediaRecorder(stream);
      recorder.current=media;
      chunks.current=[];
      media.ondataavailable=e=>e.data.size&&chunks.current.push(e.data);
      media.onstop=()=>{
        const blob=new Blob(chunks.current,{type:media.mimeType||'audio/webm'});
        const file=new File([blob],`thu-am-${Date.now()}.webm`,{type:blob.type});
        stream.getTracks().forEach(t=>t.stop());
        streamRef.current=undefined;
        setRecording(false);
        importFile(file);
      };
      media.onerror=(e)=>{
        console.warn('Recording stream error:', e);
        setRecording(false);
        stream.getTracks().forEach(t=>t.stop());
        streamRef.current=undefined;
      };
      media.start();
      setRecording(true);
    }catch(err: unknown){
      setRecording(false);
      if(streamRef.current){
        streamRef.current.getTracks().forEach(t=>t.stop());
        streamRef.current=undefined;
      }
      const errObj = err as { name?: string; message?: string } | undefined;
      const name = errObj?.name || '';
      const msg = errObj?.message || String(err);
      if(name==='NotFoundError' || msg.includes('Requested device not found') || msg.toLowerCase().includes('not found')){
        setDeviceNotice('Không tìm thấy thiết bị micro. Bạn có thể tải tệp âm thanh trực tiếp.');
      } else if (name==='NotAllowedError' || name==='SecurityError'){
        setDeviceNotice('Quyền truy cập micro đã bị từ chối. Vui lòng cấp quyền hoặc tải file âm thanh.');
      } else {
        setDeviceNotice('Chưa thể thu âm micro. Vui lòng tải tệp âm thanh thay thế.');
      }
      onRecord?.();
    }
  };

  const stopRecord=()=>{
    try{
      if(recorder.current && recorder.current.state==='recording'){
        recorder.current.stop();
      }
    }catch(e){
      console.warn('Could not stop recorder cleanly:', e);
    }finally{
      if(streamRef.current){
        streamRef.current.getTracks().forEach(t=>t.stop());
        streamRef.current=undefined;
      }
      setRecording(false);
    }
  };

  return <section className={`panel stack ${drag?'dragging':''}`} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f)importFile(f)}}>
    <strong>Tài nguyên & Media</strong><button className="button primary" onClick={()=>ref.current?.click()}>Tải lên media</button>
    <button className="button" onClick={recording?stopRecord:startRecord}>{recording?'■ Dừng thu âm':'● Thu âm micro'}</button>
    {deviceNotice && (
      <div style={{fontSize:'12px',padding:'6px 10px',background:'rgba(240,80,80,0.12)',border:'1px solid rgba(240,80,80,0.3)',borderRadius:'6px',color:'#ff9999',lineHeight:1.4}}>
        ℹ️ {deviceNotice}
      </div>
    )}
    <button className="button" disabled={!lastAudio.current} onClick={()=>lastAudio.current&&onTranscribe?.(lastAudio.current)}>🧠 Chuyển giọng nói sang phụ đề (STT)</button>
    <input ref={ref} hidden type="file" accept="video/*,audio/*,image/*" onChange={e=>{const f=e.target.files?.[0];if(f)importFile(f)}}/>
    <div className="muted">Kéo thả video, âm thanh hoặc ảnh vào đây. File âm thanh mới nhất có thể chuyển thành phụ đề tự động (STT) và đưa lên Timeline.</div>
  </section>;
}
