export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return '';
  const parts: string[] = [];
  parts.push(navigator.userAgent || '');
  parts.push(navigator.language || '');
  parts.push(screen.width + 'x' + screen.height + 'x' + screen.colorDepth);
  parts.push(navigator.platform || '');
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 2, 15);
    parts.push(canvas.toDataURL());
  }
  const timezone = Intl.DateTimeFormat?.().resolvedOptions?.().timeZone || '';
  parts.push(timezone);
  const cores = navigator.hardwareConcurrency || 0;
  parts.push(String(cores));
  return simpleHash(parts.join('|||'));
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'fp_' + Math.abs(hash).toString(36);
}
