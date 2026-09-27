export type BinaryTarget = 'android' | 'windows' | 'macos' | 'ios';
const candidates: Record<BinaryTarget,string> = {
  android: '/tai-app?platform=android',
  windows: '/tai-app?platform=windows',
  macos: '/tai-app?platform=macos',
  ios: '/tai-app?platform=ios'
};
export function openNativeDownload(target: BinaryTarget) { window.location.assign(candidates[target]); }
