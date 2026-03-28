'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const CEDULA_PREFIXES = [
    { value: 'V', label: 'V — Venezolano' },
    { value: 'E', label: 'E — Extranjero' },
];

const RIF_PREFIXES = [
    { value: 'J', label: 'J — Jurídico' },
    { value: 'G', label: 'G — Gobierno' },
    { value: 'V', label: 'V — Natural' },
    { value: 'E', label: 'E — Extranjero' },
    { value: 'P', label: 'P — Pasaporte' },
    { value: 'C', label: 'C — Comunal' },
    { value: 'F', label: 'F — Firma' },
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
        <div className={cn("flex gap-2", className)}>
            <Select value={currentPrefix} onValueChange={handlePrefixChange}>
                <SelectTrigger className={cn("w-[130px] shrink-0", error && 'border-destructive')}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {prefixes.map(p => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                value={currentNumber}
                onChange={e => handleNumberChange(e.target.value)}
                placeholder={type === 'cedula' ? '12345678' : '12345678-9'}
                className={cn("flex-1", error && 'border-destructive')}
            />
        </div>
    );
}
