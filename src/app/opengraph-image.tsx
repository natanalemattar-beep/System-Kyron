import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'System Kyron — Inteligencia Corporativa Venezuela';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #020810 0%, #0a1628 40%, #0d1f3c 70%, #020810 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(14,165,233,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, rgba(34,197,94,0.08) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #0ea5e9 30%, #22c55e 70%, transparent 100%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M32 4L56 18v28L32 60 8 46V18L32 4z" fill="#0a1628" stroke="#0ea5e9" strokeWidth="2"/>
            <path d="M32 16L44 23v14L32 44 20 37V23L32 16z" fill="none" stroke="url(#g)" strokeWidth="2.5"/>
            <circle cx="32" cy="30" r="4" fill="#22c55e"/>
            <defs><linearGradient id="g" x1="20" y1="16" x2="44" y2="44"><stop stopColor="#0ea5e9"/><stop offset="1" stopColor="#22c55e"/></linearGradient></defs>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '42px', fontWeight: 900, color: 'white', letterSpacing: '-1px', lineHeight: 1 }}>
              SYSTEM KYRON
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', letterSpacing: '6px', textTransform: 'uppercase' as const, marginTop: '6px' }}>
              INTELIGENCIA CORPORATIVA
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          {['Contabilidad', 'RRHH', 'Telecom 5G', 'IA Legal', 'Eco-Créditos'].map((label) => (
            <span
              key={label}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#94a3b8',
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(148,163,184,0.15)',
                background: 'rgba(255,255,255,0.03)',
                letterSpacing: '1px',
                textTransform: 'uppercase' as const,
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '40px',
            fontSize: '15px',
            fontWeight: 600,
            color: '#475569',
            letterSpacing: '3px',
            textTransform: 'uppercase' as const,
          }}
        >
          100% adaptado a Venezuela · VEN-NIF · SENIAT
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #22c55e 30%, #0ea5e9 70%, transparent 100%)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
