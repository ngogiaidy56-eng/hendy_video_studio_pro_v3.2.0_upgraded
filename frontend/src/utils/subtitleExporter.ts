export type SubtitleCue = { startMs: number; endMs: number; text: string };
const time = (ms: number) => {
  const h = Math.floor(ms / 3600000); const m = Math.floor((ms % 3600000) / 60000); const s = Math.floor((ms % 60000) / 1000); const x = ms % 1000;
  return { h, m, s, x };
};
const srtTime = (ms: number) => { const t = time(ms); return `${String(t.h).padStart(2,'0')}:${String(t.m).padStart(2,'0')}:${String(t.s).padStart(2,'0')},${String(t.x).padStart(3,'0')}`; };
const vttTime = (ms: number) => srtTime(ms).replace(',', '.');
const assTime = (ms: number) => { const t = time(ms); return `${t.h}:${String(t.m).padStart(2,'0')}:${String(t.s).padStart(2,'0')}.${String(Math.floor(t.x/10)).padStart(2,'0')}`; };

export function toSrt(cues: SubtitleCue[]) { return cues.map((c,i)=>`${i+1}\n${srtTime(c.startMs)} --> ${srtTime(c.endMs)}\n${c.text}\n`).join('\n'); }
export function toVtt(cues: SubtitleCue[]) { return `WEBVTT\n\n${cues.map(c=>`${vttTime(c.startMs)} --> ${vttTime(c.endMs)}\n${c.text}\n`).join('\n')}`; }
export function toAss(cues: SubtitleCue[]) { return `[Script Info]\nTitle: Hendy Video Studio Pro\nScriptType: v4.00+\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BorderStyle, Outline, Shadow, Alignment, MarginV\nStyle: Default,Arial,46,&H00FFFFFF,&H00000000,1,3,0,2,52\n\n[Events]\nFormat: Layer, Start, End, Style, Text\n${cues.map(c=>`Dialogue: 0,${assTime(c.startMs)},${assTime(c.endMs)},Default,${c.text.replace(/\n/g,'\\N')}`).join('\n')}\n`; }
export function downloadText(text: string, fileName: string, mime = 'text/plain;charset=utf-8') { const blob = new Blob([text], { type: mime }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = fileName; a.click(); URL.revokeObjectURL(url); }
