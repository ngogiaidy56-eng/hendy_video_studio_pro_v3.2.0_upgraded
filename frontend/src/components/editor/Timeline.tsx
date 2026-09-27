import type { Clip } from '../../types/project';
export function Timeline({clips,selectedId,onSelect}:{clips:Clip[];selectedId?:string;onSelect?:(id:string)=>void}){
  const duration=Math.max(...clips.map(c=>c.endMs),60000);
  const tracks=[0,1,2,3];
  return <section className="panel timeline"><div className="row" style={{justifyContent:'space-between'}}><strong>Timeline</strong><span className="muted">{Math.round(duration/1000)}s · 4 tracks</span></div>
    {tracks.map(track=><div className="track" key={track}><span className="muted" style={{position:'absolute',left:0,top:-16,fontSize:11}}>T{track+1}</span>{clips.filter(c=>c.track===track).map(c=><button key={c.id} className={`clip ${selectedId===c.id?'selected':''}`} onClick={()=>onSelect?.(c.id)} style={{left:`${c.startMs/duration*100}%`,width:`${Math.max(1,(c.endMs-c.startMs)/duration*100)}%`}}>{c.label}</button>)}</div>)}
  </section>;
}
