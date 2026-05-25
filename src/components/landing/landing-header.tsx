'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu, ChevronDown, ShieldCheck, ArrowRight, ChevronRight,
  KeyRound, UserPlus, Globe, Zap, Cpu, Lock, Headphones,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from "@/components/language-switcher";
import { useBannerVisible } from "@/components/demo-banner";
import { WhatIsNewModal, ChangelogTrigger } from "./what-is-new-modal";

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const t = useTranslations('LandingHeader');
  const bannerVisible = useBannerVisible();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { labelKey: 'home' as const, href: '/' },
    { labelKey: 'platform' as const, href: '/#caracteristicas' },
    { labelKey: 'plans' as const, href: '/precios' },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <WhatIsNewModal forceOpen={showWhatsNew} onClose={() => setShowWhatsNew(false)} />
      <header
        className="fixed left-0 right-0 z-[150] transition-all duration-700 ease-out"
        style={{
          top: bannerVisible ? 36 : 0,
          transform: `translateY(${scrolled ? 12 : 0}px)`,
        }}
      >
        <div
          className={cn(
            "mx-auto px-4 transition-all duration-700",
            scrolled
              ? "max-w-[1400px] rounded-[3rem] border border-border dark:border-white/10 bg-background/60 backdrop-blur-lg shadow-2xl"
              : "max-w-full px-6 md:px-12"
          )}
        >
          {scrolled && (
            <div
              className="absolute bottom-0 left-10 right-10 h-[2px] rounded-full bg-gradient-to-r from-kyron-cyan via-blue-500 to-violet-500 origin-left"
              style={{ transform: `scaleX(${Math.min(1, (typeof window !== 'undefined' ? window.scrollY : 0) / 80)})` }}
            />
          )}

          <div className="flex items-center justify-between h-14 sm:h-20 w-full">
            <Link href="/" prefetch={false} className="flex items-center gap-3.5 group shrink-0">
              <div className="relative">
                <Logo className="h-12 w-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-glow shrink-0" />
                <div className="absolute -inset-2 bg-kyron-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[16px] font-black tracking-tighter uppercase text-foreground transition-colors italic">
                  System <span className="text-glow-cyan not-italic">Kyron</span>
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
              <div className="flex items-center gap-2 p-2 bg-muted/50 dark:bg-white/[0.03] border border-border dark:border-white/5 rounded-[1.5rem]">
                {navItems.map((item) => (
                  <Link
                    key={item.labelKey}
                    href={item.href as any}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 hover:text-foreground transition-all duration-500 rounded-xl hover:bg-muted dark:hover:bg-white/5 relative group"
                  >
                    {t(item.labelKey)}
                    <span className="absolute bottom-1.5 left-6 right-6 h-[2px] bg-kyron-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-3 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 hover:text-foreground transition-all duration-500 rounded-xl hover:bg-muted dark:hover:bg-white/5 outline-none group">
                    {t('solutions')}
                    <ChevronDown className="h-3.5 w-3.5 opacity-30 group-data-[state=open]:rotate-180 transition-transform" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-80 p-4 rounded-[2.5rem] border border-border dark:border-white/10 bg-background/95 backdrop-blur-md shadow-2xl mt-6 space-y-1">
                    {[
                      { href: "/login-linea?type=personal" as any, icon: Cpu, title: t('connectivity_title'), desc: t('connectivity_desc'), iconClass: "bg-kyron-cyan/10 border-kyron-cyan/20 text-kyron-cyan" },
                      { href: "/login-escritorio-juridico", icon: ShieldCheck, title: t('legal_title'), desc: t('legal_desc'), iconClass: "bg-kyron-emerald/10 border-kyron-emerald/20 text-kyron-emerald" },
                      { href: "/soporte", icon: Headphones, title: "Atención al Cliente", desc: "Soporte con IA", iconClass: "bg-kyron-cyan/10 border-kyron-cyan/20 text-kyron-cyan" },
                    ].map((item, i) => (
                      <DropdownMenuItem
                        key={i}
                        asChild
                        className="rounded-[1.5rem] p-4 flex items-center gap-5 hover:bg-muted dark:hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-border dark:hover:border-white/5"
                      >
                        <Link href={item.href}>
                          <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center ${item.iconClass}`}>
                            <item.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase tracking-tight text-foreground">{item.title}</p>
                            <p className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest">{item.desc}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground/30 group-hover:text-kyron-cyan group-hover:translate-x-2 transition-all" />
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden lg:flex items-center gap-2 mr-4">
                <ChangelogTrigger onOpen={() => setShowWhatsNew(true)} />
                <LanguageSwitcher variant="default" align="end" />
                <ThemeToggle />
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="group relative h-11 px-10 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 transition-all duration-500 hover:border-kyron-cyan/40 hover:bg-kyron-cyan/10 active:scale-95 shadow-[0_0_25px_rgba(0,0,0,0.05)] dark:shadow-[0_0_25px_rgba(0,0,0,0.5)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-kyron-cyan/20 via-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-kyron-cyan/50 to-transparent opacity-30 group-hover:opacity-100 group-hover:via-kyron-cyan transition-all duration-500" />
                    <span className="relative z-10 flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground/80 group-hover:text-foreground transition-all duration-500">
                      <div className="relative">
                        <KeyRound className="h-4 w-4 text-kyron-cyan/50 group-hover:text-kyron-cyan transition-all duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-kyron-cyan blur-sm opacity-0 group-hover:opacity-40 transition-opacity" />
                      </div>
                      {t('login')}
                    </span>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="text-[11px] font-black uppercase tracking-[0.3em] bg-foreground hover:bg-foreground/80 text-background dark:bg-white dark:hover:bg-kyron-cyan/90 dark:text-black rounded-2xl px-10 h-12 shadow-2xl shadow-foreground/10 dark:shadow-white/10 transition-all active:scale-95 group border-none">
                    {t('register')}
                    <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden rounded-2xl h-11 w-11 border border-black/[0.08] dark:border-white/[0.08] text-foreground bg-black/[0.02] dark:bg-white/[0.02] active:scale-90 transition-transform"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88vw] max-w-[380px] p-0 bg-background dark:bg-[#040712] border-r border-border dark:border-white/[0.06] flex flex-col overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-kyron-cyan/10 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full" />
                  </div>

                  <SheetHeader className="p-8 pb-6 border-b border-border dark:border-white/[0.06] flex flex-row items-center gap-4 shrink-0 space-y-0 relative z-10">
                    <Logo className="h-10 w-10 shrink-0 drop-shadow-glow" />
                    <div>
                      <SheetTitle className="text-[18px] font-black tracking-tight text-foreground leading-none uppercase italic">System Kyron</SheetTitle>
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] mt-2 bg-gradient-to-r from-kyron-cyan via-blue-400 to-violet-400 bg-clip-text text-transparent block">
                        {t('mobile_portal_sub')}
                      </span>
                    </div>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto relative z-10 p-6 space-y-8">
                    <nav className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-4 px-4">Directorio</p>
                      {[
                        { label: t('home'), href: '/', icon: Globe },
                        { label: t('platform'), href: '/#caracteristicas', icon: Cpu },
                        { label: t('plans'), href: '/precios', icon: Zap },
                      ].map((item) => (
                        <SheetClose key={item.href} asChild>
                          <Link
                            href={item.href as any}
                            onClick={(e) => handleAnchorClick(e as any, item.href)}
                            className="flex items-center justify-between p-4 rounded-[1.5rem] bg-muted/30 dark:bg-white/[0.02] border border-border dark:border-white/5 hover:bg-muted/50 dark:hover:bg-white/[0.05] hover:border-border/80 dark:hover:border-white/10 transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-muted/50 dark:bg-white/5 flex items-center justify-center">
                                <item.icon className="h-5 w-5 text-muted-foreground/60 group-hover:text-kyron-cyan transition-colors" />
                              </div>
                              <span className="text-sm font-black uppercase tracking-widest text-muted-foreground/80 group-hover:text-foreground transition-colors">
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-kyron-cyan transition-all" />
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-4 px-4">Soluciones</p>
                      {[
                        { href: "/soporte", icon: Headphones, label: "Atención al Cliente", color: "kyron-cyan" },
                        { href: "/login-linea?type=personal" as any, icon: Cpu, label: t('connectivity_title'), color: "kyron-cyan" },
                        { href: "/login-escritorio-juridico", icon: ShieldCheck, label: t('legal_title'), color: "kyron-emerald" },
                      ].map((item, i) => (
                        <SheetClose key={i} asChild>
                          <Link
                            href={item.href}
                            className="flex items-center justify-between p-4 rounded-[1.5rem] bg-muted/30 dark:bg-white/[0.02] border border-border dark:border-white/5 hover:bg-muted/50 dark:hover:bg-white/[0.05] hover:border-border/80 dark:hover:border-white/10 transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-muted/50 dark:bg-white/5 flex items-center justify-center">
                                <item.icon className="h-5 w-5 text-muted-foreground/60 group-hover:text-kyron-cyan transition-colors" />
                              </div>
                              <span className="text-sm font-black uppercase tracking-widest text-muted-foreground/80 group-hover:text-foreground transition-colors">{item.label}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-kyron-cyan transition-all" />
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-4 px-4">Portal de Acceso</p>
                      <Link href="/login" className="block">
                        <Button variant="ghost" className="w-full justify-start gap-4 h-16 rounded-[2rem] bg-kyron-cyan/5 dark:bg-kyron-cyan/5 border border-kyron-cyan/20 text-muted-foreground/80 hover:text-foreground hover:bg-kyron-cyan/10 px-8 group transition-all">
                          <div className="h-10 w-10 rounded-xl bg-kyron-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <KeyRound className="h-5 w-5 text-kyron-cyan" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-xs font-black uppercase tracking-widest">{t('login')}</span>
                            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-kyron-cyan/50">{t('secure_portal')}</span>
                          </div>
                        </Button>
                      </Link>
                      <Link href="/register" className="block">
                        <Button className="w-full justify-start gap-4 h-14 rounded-2xl bg-kyron-cyan hover:bg-kyron-cyan/90 text-primary-foreground border border-kyron-cyan/20 px-6 shadow-xl shadow-kyron-cyan/20">
                          <UserPlus className="h-5 w-5" />
                          <span className="text-xs font-black uppercase tracking-widest">{t('register')}</span>
                          <ArrowRight className="h-4 w-4 ml-auto" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-8 border-t border-border dark:border-white/[0.06] bg-muted/30 dark:bg-black/40 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <LanguageSwitcher variant="default" align="start" />
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/30 dark:bg-white/[0.02] border border-border dark:border-white/5 rounded-2xl">
                      <Lock className="h-4 w-4 text-kyron-emerald/50" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">{t('encryption_active')}</span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
