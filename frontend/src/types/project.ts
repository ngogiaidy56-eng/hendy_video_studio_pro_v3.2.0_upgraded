export type Clip={id:string;track:number;kind:'video'|'audio'|'subtitle'|'transition';startMs:number;endMs:number;label:string;assetId?:string;text?:string};
export type Project={id:string;width:number;height:number;fps:number;durationMs:number;clips:Clip[]};
