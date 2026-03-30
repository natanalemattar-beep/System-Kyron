'use client';

import { useRouter } from '@/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/navigation';

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export function BackButton({ href, label = 'Volver', className }: BackButtonProps) {
  const router = useRouter();

  if (href) {
    return (
      <Link href={href as any}>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 text-muted-foreground hover:text-foreground ${className || ''}`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`gap-2 text-muted-foreground hover:text-foreground ${className || ''}`}
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </Button>
  );
}
