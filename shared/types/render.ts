export type AudioTrack={id:string;type:'video'|'bgm'|'tts'|'master';assetId?:string;gain:number;muted?:boolean;ducking?:boolean};
export type RenderManifest={version:1;projectId:string;canvas:{width:number;height:number;fps:number};clips:unknown[];audio:AudioTrack[];subtitle:{format:'ass'|'text';items:unknown[]};output:{container:'mp4'|'webm';videoCodec:string;audioCodec:string}};
