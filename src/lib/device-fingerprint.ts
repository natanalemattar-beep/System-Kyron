function base64ToHex(b64: string): string {
  const raw = atob(b64);
  let hex = '';
  for (let i = 0; i < raw.length; i++) {
    const h = raw.charCodeAt(i).toString(16);
    if (h.length === 1) hex += '0';
    hex += h;
  }
  return hex;
}

async function sha256Hex(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  return 'fp_' + hex.slice(0, 16);
}

export async function getDeviceFingerprint(): Promise<string> {
  if (typeof window === 'undefined') return '';
  const parts: string[] = [];
  parts.push(navigator.userAgent || '');
  parts.push(navigator.language || '');
  parts.push(navigator.platform || '');
  parts.push(screen.width + 'x' + screen.height + 'x' + screen.colorDepth);

  const timezone = Intl.DateTimeFormat?.().resolvedOptions?.().timeZone || '';
  parts.push(timezone);
  parts.push(String(navigator.hardwareConcurrency || 0));
  parts.push(String((navigator as any).deviceMemory || 0));
  parts.push(String(navigator.maxTouchPoints || 0));

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'alphabetic';
    ctx.font = '18px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 2, 35);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.font = '16px Courier New';
    ctx.fillText('abcdefghijklmnopqrstuvwxyz', 4, 52);
    parts.push(canvas.toDataURL());
  }

  try {
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        parts.push(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '');
        parts.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '');
      }
    }
  } catch {}

  try {
    const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ac.createOscillator();
    const analyser = ac.createAnalyser();
    osc.type = 'sawtooth';
    osc.frequency.value = 440;
    analyser.fftSize = 256;
    osc.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    parts.push(Array.from(data.slice(0, 32)).join(','));
    ac.close();
  } catch {}

  if ((navigator as any).pdfViewerEnabled !== undefined) {
    parts.push(String((navigator as any).pdfViewerEnabled));
  }

  return sha256Hex(parts.join('|||'));
}
