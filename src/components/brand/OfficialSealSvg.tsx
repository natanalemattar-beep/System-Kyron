export function OfficialSealSvg({ className, size = 80 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 400 400" className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="circleClipSeal"><circle cx="200" cy="200" r="195" /></clipPath>
      </defs>
      <circle cx="200" cy="200" r="195" fill="none" />
      <circle cx="200" cy="200" r="192" fill="none" stroke="#0f172a" strokeWidth="3" />
      <circle cx="200" cy="200" r="185" fill="none" stroke="#0f172a" strokeWidth="1" />
      <circle cx="200" cy="200" r="178" fill="none" stroke="#0f172a" strokeWidth="0.5" />
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        const rad = (angle * Math.PI) / 180;
        const x = 200 + 187 * Math.cos(rad);
        const y = 200 + 187 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="2.5" fill="#0f172a" />;
      })}
      <path id="arcTopSeal" d="M 65 200 A 135 135 0 0 1 335 200" fill="none" />
      <path id="arcBottomSeal" d="M 75 210 A 125 125 0 0 0 325 210" fill="none" />
      <text fontSize="12" fontWeight="900" fontFamily="Arial,sans-serif" fill="#0f172a" letterSpacing="5">
        <textPath href="#arcTopSeal" startOffset="50%" textAnchor="middle">SYSTEM KYRON</textPath>
      </text>
      <text fontSize="8" fontWeight="700" fontFamily="Arial,sans-serif" fill="#475569" letterSpacing="2">
        <textPath href="#arcBottomSeal" startOffset="50%" textAnchor="middle">INTELIGENCIA CORPORATIVA</textPath>
      </text>
      <image href="/images/logo-black.png" x="160" y="160" width="80" height="80" opacity="0.95" />
      <text x="200" y="295" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="Arial,sans-serif" fill="#0f172a" letterSpacing="3">RIF J-50832149-9</text>
    </svg>
  );
}
