'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  length?: number;
  accentColor?: string;
  className?: string;
}

export function OtpInput({
  value,
  onChange,
  onComplete,
  disabled,
  length = 6,
  accentColor = 'primary',
  className,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusNext = useCallback((index: number) => {
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [length]);

  const focusPrev = useCallback((index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, []);

  const handleChange = useCallback((index: number, char: string) => {
    const digit = char.replace(/\D/g, '').slice(-1);
    if (!digit && char.length > 0) return;

    const digits = value.split('');
    digits[index] = digit;

    if (char.length > 1) {
      const pasted = char.replace(/\D/g, '').slice(0, length);
      const newVal = pasted.padEnd(length, '').slice(0, length);
      onChange(newVal);
      if (pasted.length >= length) {
        onComplete?.(newVal);
      } else {
        inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
      }
      return;
    }

    const newVal = digits.join('');
    onChange(newVal);

    if (digit) {
      if (index === length - 1) {
        onComplete?.(newVal);
      }
      focusNext(index);
    }
  }, [value, onChange, onComplete, focusNext, length]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      const digits = value.split('');
      digits[index - 1] = '';
      onChange(digits.join(''));
      focusPrev(index);
    }
    if (e.key === 'ArrowLeft') focusPrev(index);
    if (e.key === 'ArrowRight') focusNext(index);
  }, [value, onChange, focusPrev, focusNext]);

  const accentRing = cn(
    accentColor === 'amber' && 'focus:ring-amber-500/20 focus:border-amber-500/40',
    accentColor === 'emerald' && 'focus:ring-emerald-500/20 focus:border-emerald-500/40',
    accentColor === 'blue' && 'focus:ring-blue-500/20 focus:border-blue-500/40',
    accentColor === 'cyan' && 'focus:ring-cyan-500/20 focus:border-cyan-500/40',
    accentColor === 'violet' && 'focus:ring-violet-500/20 focus:border-violet-500/40',
    accentColor === 'primary' && 'focus:ring-primary/20 focus:border-primary/40',
  );

  return (
    <div className={cn('flex justify-center gap-2 sm:gap-3', className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          data-digit={i}
          className={cn(
            'w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black font-mono rounded-xl',
            'bg-white/5 dark:bg-slate-800/50 border border-white/10 dark:border-slate-700/30',
            'text-foreground dark:text-white placeholder:text-muted-foreground/30',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'transition-all duration-150',
            'disabled:opacity-30 disabled:cursor-not-allowed',
            value[i] && 'border-opacity-50 shadow-sm',
            accentRing,
          )}
          placeholder="○"
        />
      ))}
    </div>
  );
}
