'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const CEDULA_PREFIXES = [
    { value: 'V', label: 'V — Venezolano', short: 'V' },
    { value: 'E', label: 'E — Extranjero', short: 'E' },
];

const RIF_PREFIXES = [
    { value: 'J', label: 'J — Jurídico', short: 'J' },
    { value: 'G', label: 'G — Gobierno', short: 'G' },
    { value: 'V', label: 'V — Natural', short: 'V' },
    { value: 'E', label: 'E — Extranjero', short: 'E' },
    { value: 'P', label: 'P — Pasaporte', short: 'P' },
    { value: 'C', label: 'C — Comunal', short: 'C' },
    { value: 'F', label: 'F — Firma', short: 'F' },
];

interface DocumentInputProps {
    type: 'cedula' | 'rif';
    value: string;
    onChange: (fullValue: string) => void;
    error?: boolean;
    className?: string;
    defaultPrefix?: string;
}

export function DocumentInput({ type, value, onChange, error, className, defaultPrefix }: DocumentInputProps) {
    const prefixes = type === 'cedula' ? CEDULA_PREFIXES : RIF_PREFIXES;
    const fallbackPrefix = defaultPrefix || prefixes[0].value;

    const parts = value?.match(/^([A-Z])-(.*)$/);
    const currentPrefix = parts ? parts[1] : fallbackPrefix;
    const currentNumber = parts ? parts[2] : (value?.replace(/^[A-Z]-/, '') || '');

    const handlePrefixChange = (prefix: string) => {
        onChange(`${prefix}-${currentNumber}`);
    };

    const handleNumberChange = (num: string) => {
        const cleaned = type === 'rif' ? num.replace(/[^0-9-]/g, '') : num.replace(/[^0-9]/g, '');
        onChange(`${currentPrefix}-${cleaned}`);
    };

    return (
        <div className={cn("flex gap-2 items-center", className)}>
            <Select value={currentPrefix} onValueChange={handlePrefixChange}>
                <SelectTrigger className={cn(
                    "w-[64px] shrink-0 font-bold text-base bg-muted/50 border-input",
                    error && 'border-destructive'
                )}>
                    <span className="text-foreground font-bold">{currentPrefix}</span>
                </SelectTrigger>
                <SelectContent>
                    {prefixes.map(p => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="text-muted-foreground font-bold text-lg select-none">–</div>
            <Input
                value={currentNumber}
                onChange={e => handleNumberChange(e.target.value)}
                placeholder={type === 'cedula' ? '18745632' : '12345678-9'}
                className={cn("flex-1 bg-background border-input", error && 'border-destructive')}
            />
        </div>
    );
}
