import Image from "next/image";

interface QrCodeProps {
  data: string;
  size?: number;
  bgColor?: string;
  color?: string;
  className?: string;
  alt?: string;
}

export function QrCode({ data, size = 200, bgColor = "#ffffff", color = "#111111", className, alt }: QrCodeProps) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&bgcolor=${bgColor.replace("#", "")}&color=${color.replace("#", "")}`;
  return (
    <Image
      src={url}
      alt={alt || `QR: ${data.slice(0, 40)}`}
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}
