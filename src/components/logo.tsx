
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  id?: string;
  variant?: 'light' | 'dark' | 'normal';
}

export function Logo({ className, id, variant }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine logo source based on variant or theme
  let logoSrc = "/images/logo-kyron.svg";

  if (variant === 'dark') {
    logoSrc = "/images/logo-kyron.svg";
  } else if (variant === 'light' || variant === 'normal') {
    logoSrc = "/images/logo-kyron.svg";
  } else if (mounted) {
    logoSrc = "/images/logo-kyron.svg";
  }

  return (
    <div
      id={id}
      className={cn(
        "relative flex items-center justify-center shrink-0",
        className
      )}
    >
      <Image
        src={logoSrc}
        alt="System Kyron"
        width={512}
        height={512}
        className="w-full h-full object-contain relative z-10"
        priority
      />
    </div>
  );
}
