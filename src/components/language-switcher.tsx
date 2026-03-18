
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import Image from "next/image";
import { countries } from "@/lib/countries";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

const languages = [
    { code: "es", displayCode: "ESP", name: "Español", flag: countries.find(c => c.code === "ESP")?.flag },
    { code: "en", displayCode: "USA", name: "English", flag: countries.find(c => c.code === "USA")?.flag },
];

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const switchLocale = (newLocale: string) => {
        if (newLocale === currentLocale) return;
        const segments = pathname.split('/');
        if (segments[1] === 'es' || segments[1] === 'en') {
            segments[1] = newLocale;
        } else {
            segments.splice(1, 0, newLocale);
        }
        const newPath = segments.join('/') || '/';
        router.push(newPath);
    };

    const currentLang = languages.find(l => l.code === currentLocale);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 h-9 px-3 rounded-xl border border-transparent hover:border-border transition-all">
                    {currentLang?.flag ? (
                        <Image src={currentLang.flag} alt={currentLang.name} width={18} height={13} className="rounded-sm" />
                    ) : (
                        <Globe className="h-4 w-4" />
                    )}
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hidden sm:inline">
                        {currentLang?.displayCode ?? 'LANG'}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px]">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => switchLocale(lang.code)}
                        className={cn(
                            "cursor-pointer",
                            lang.code === currentLocale && "bg-primary/5 text-primary"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            {lang.flag && (
                                <Image src={lang.flag} alt={lang.name} width={20} height={14} className="rounded-sm" />
                            )}
                            <span className="text-sm font-medium">{lang.name}</span>
                            {lang.code === currentLocale && (
                                <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-primary">✓</span>
                            )}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
