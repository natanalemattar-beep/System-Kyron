"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const SUPPORTED_LANGUAGES = [
  {
    code: "es",
    name: "Español",
    nativeName: "Español",
    displayCode: "ES",
    flag: "https://flagcdn.com/w320/es.png",
    region: "España / Latinoamérica",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    displayCode: "EN",
    flag: "https://flagcdn.com/w320/us.png",
    region: "United States / Global",
  },
] as const;

export type SupportedLocale = (typeof SUPPORTED_LANGUAGES)[number]["code"];

interface LanguageSwitcherProps {
  variant?: "default" | "compact" | "icon-only";
  align?: "start" | "center" | "end";
}

export function LanguageSwitcher({
  variant = "default",
  align = "end",
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations("LanguageSwitcher");
  const [open, setOpen] = useState(false);
  const [switching, setSwitching] = useState<string | null>(null);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === currentLocale);

  const switchLocale = (newLocale: SupportedLocale) => {
    if (newLocale === currentLocale) {
      setOpen(false);
      return;
    }
    setSwitching(newLocale);
    router.push(pathname, { locale: newLocale });
    setTimeout(() => setSwitching(null), 1500);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative gap-2 rounded-xl border border-transparent hover:border-border/60 hover:bg-muted/60 transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary/40",
            variant === "icon-only" ? "h-9 w-9 p-0" : "h-9 px-3"
          )}
          aria-label={t("select")}
        >
          <span className="relative flex items-center gap-2">
            {currentLang?.flag ? (
              <span className="relative flex items-center justify-center overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10" style={{ width: 18, height: 13 }}>
                <Image
                  src={currentLang.flag}
                  alt={currentLang.name}
                  fill
                  sizes="18px"
                  className="object-cover"
                  priority
                />
              </span>
            ) : (
              <Globe className="h-4 w-4 text-muted-foreground" />
            )}
            {variant !== "icon-only" && (
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hidden sm:inline">
                {currentLang?.displayCode ?? "LANG"}
              </span>
            )}
          </span>
          {variant === "default" && (
            <ChevronDown
              className={cn(
                "h-2.5 w-2.5 text-muted-foreground/50 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        sideOffset={8}
        className="w-[220px] p-2 rounded-2xl border-border/60 bg-card/98 backdrop-blur-3xl shadow-xl"
      >
        <DropdownMenuLabel className="px-3 py-2 mb-1">
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3 text-primary/60" />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground">
              {t("label")}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 opacity-30" />

        <div className="space-y-0.5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = lang.code === currentLocale;
            const isLoading = switching === lang.code;

            return (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => switchLocale(lang.code as SupportedLocale)}
                className={cn(
                  "relative cursor-pointer rounded-xl px-3 py-2.5 focus:bg-muted/60 transition-all duration-150",
                  isActive && "bg-primary/8 focus:bg-primary/10"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <span
                    className="relative flex-shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10"
                    style={{ width: 22, height: 16 }}
                  >
                    <Image
                      src={lang.flag}
                      alt={lang.name}
                      fill
                      sizes="22px"
                      className="object-cover"
                    />
                  </span>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span
                      className={cn(
                        "text-[11px] font-bold leading-tight truncate",
                        isActive ? "text-primary" : "text-foreground"
                      )}
                    >
                      {lang.nativeName}
                    </span>
                    <span className="text-[9px] text-muted-foreground/60 font-medium truncate mt-0.5">
                      {lang.region}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isActive && !isLoading && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex-shrink-0"
                      >
                        <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center shadow-glow-sm">
                          <Check className="h-2.5 w-2.5 text-primary-foreground stroke-[3]" />
                        </div>
                      </motion.div>
                    )}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-shrink-0 h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {isActive && (
                  <span className="absolute inset-0 rounded-xl ring-1 ring-primary/20 pointer-events-none" />
                )}
              </DropdownMenuItem>
            );
          })}
        </div>

        <div className="mt-2 pt-2 border-t border-border/30 px-3 pb-1">
          <p className="text-[8px] font-medium text-muted-foreground/40 uppercase tracking-widest">
            {SUPPORTED_LANGUAGES.length} {t("available")}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
