'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

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

    const [prefix, setPrefix] = useState(fallbackPrefix);
    const [number, setNumber] = useState('');

    useEffect(() => {
        if (value) {
            const parts = value.match(/^([A-Z])-(.*)$/);
            if (parts) {
                setPrefix(parts[1]);
                setNumber(parts[2]);
            } else {
                setNumber(value);
            }
        } else {
            setPrefix(fallbackPrefix);
            setNumber('');
        }
    }, [value, fallbackPrefix]);

    const handlePrefixChange = (newPrefix: string) => {
        setPrefix(newPrefix);
        onChange(`${newPrefix}-${number}`);
    };

    const handleNumberChange = (num: string) => {
        const cleaned = type === 'rif' ? num.replace(/[^0-9-]/g, '') : num.replace(/[^0-9]/g, '');
        setNumber(cleaned);
        onChange(`${prefix}-${cleaned}`);
    };

    return (
        <div className={cn("flex gap-2 items-center", className)}>
            <Select value={prefix} onValueChange={handlePrefixChange}>
                <SelectTrigger className={cn(
                    "w-[64px] shrink-0 font-bold text-base bg-white/5 border-white/10 text-white",
                    error && 'border-destructive'
                )}>
                    <span className="text-white font-bold">{prefix}</span>
                </SelectTrigger>
                <SelectContent>
                    {prefixes.map(p => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="text-white/30 font-bold text-lg select-none">–</div>
            <Input
                value={number}
                onChange={e => handleNumberChange(e.target.value)}
                placeholder={type === 'cedula' ? '18745632' : '12345678-9'}
                className={cn("flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-cyan-500/20", error && 'border-destructive')}
            />
        </div>
    );
}
