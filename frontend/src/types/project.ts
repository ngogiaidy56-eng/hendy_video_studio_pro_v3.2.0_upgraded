export type SubtitleStyle = {
  fontFamily: string;
  fontSize: number;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  bottomPx: number;
};

export type ClipKind = 'video' | 'audio' | 'subtitle' | 'transition';

export type Clip = {
  id: string;
  track: number;
  kind: ClipKind;
  startMs: number;
  endMs: number;
  label: string;
  assetId?: string;
  text?: string;
  volume?: number;
  style?: Partial<SubtitleStyle>;
};

export type AspectRatio = '16:9' | '9:16' | '1:1';

export type Project = {
  id: string;
  name?: string;
  width: number;
  height: number;
  fps: number;
  durationMs: number;
  aspectRatio?: AspectRatio;
  clips: Clip[];
};
