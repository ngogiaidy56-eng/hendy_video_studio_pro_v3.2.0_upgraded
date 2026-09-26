export type MediaKind='video'|'image'|'audio'|'subtitle'|'transition';
export type TimelineClip={id:string;kind:MediaKind;startMs:number;endMs:number;assetId?:string;text?:string;style?:Record<string,unknown>;transform?:{x:number;y:number;scale:number;rotation:number;crop?:{x:number;y:number;width:number;height:number}};keyframes?:Array<{timeMs:number;x?:number;y?:number;scale?:number;rotation?:number}>};
export type TimelineProject={id:string;width:number;height:number;fps:number;durationMs:number;clips:TimelineClip[]};
