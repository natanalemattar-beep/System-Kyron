'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader as Loader2, Send, Building2, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loginOptions } from "@/lib/login-options";
import { useToast } from "@/hooks/use-toast";
import { sendDemoRequestAction } from "@/app/actions/send-demo-request";
import { useTranslations } from 'next-intl';

export function CtaForm() {
    const t = useTranslations('CtaSection');
    const validation = {
        name_short: t('validation.name_short'),
        role_required: t('validation.role_required'),
        email_invalid: t('validation.email_invalid'),
        phone_invalid: t('validation.phone_invalid'),
        company_short: t('validation.company_short'),
        size_required: t('validation.size_required'),
        sector_required: t('validation.sector_required'),
        urgency_required: t('validation.urgency_required'),
        module_required: t('validation.module_required'),
    };

    const formSchema = z.object({
        name: z.string().min(2, validation.name_short),
        role: z.string().min(2, validation.role_required),
        email: z.string().email(validation.email_invalid),
        phone: z.string().min(10, validation.phone_invalid),
        company: z.string().min(2, validation.company_short),
        companySize: z.string().min(1, validation.size_required),
        sector: z.string().min(1, validation.sector_required),
        urgency: z.string().min(1, validation.urgency_required),
        module: z.string().min(1, validation.module_required),
    });

    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const roles = t.raw('roles') as string[];
    const sectors = t.raw('sectors') as string[];
    const urgencies = t.raw('urgencies') as string[];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            email: "",
            phone: "",
            company: "",
            companySize: "",
            sector: "",
            urgency: "",
            module: "Contabilidad",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const result = await sendDemoRequestAction(values);
            if (result.success) {
                toast({
                    title: t('toast_success_title'),
                    description: t('toast_success_desc'),
                    action: <ShieldCheck className="text-primary h-4 w-4" />
                });
                form.reset();
            } else {
                toast({
                    variant: "destructive",
                    title: t('toast_error_title'),
                    description: result.error || t('toast_error_desc'),
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: t('toast_error_title'),
                description: t('toast_error_desc'),
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="glass-liquid space-y-4 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Building2 className="h-24 w-24 md:h-32 md:w-32 rotate-12 text-primary/20" />
                </div>
                
                <div className="space-y-1 mb-6 relative z-10 text-center sm:text-left">
                    <h3 className="text-lg md:text-2xl font-black tracking-tight uppercase italic text-foreground">{t('form_title')}</h3>
                    <p className="text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t('form_subtitle')}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('field_name')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('field_name_placeholder')} {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                </FormControl>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('field_role')}</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold">
                                            <SelectValue placeholder={t('field_role_placeholder')} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl">
                                        {roles.map(r => (
                                            <SelectItem key={r} value={r} className="text-xs uppercase font-bold">{r}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('field_email')}</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder={t('field_email_placeholder')} {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                </FormControl>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('field_phone')}</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder={t('field_phone_placeholder')} {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                </FormControl>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('field_company')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('field_company_placeholder')} {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                </FormControl>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="companySize"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('field_size')}</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold">
                                            <SelectValue placeholder={t('field_size_placeholder')} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl">
                                        {["1-5", "6-20", "21-50", "51-200", "200+"].map(s => (
                                            <SelectItem key={s} value={s} className="text-xs uppercase font-bold">{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('field_sector')}</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold">
                                            <SelectValue placeholder={t('field_sector_placeholder')} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl">
                                        {sectors.map(s => (
                                            <SelectItem key={s} value={s} className="text-xs uppercase font-bold">{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="urgency"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('field_urgency')}</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold">
                                            <SelectValue placeholder={t('field_urgency_placeholder')} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl">
                                        {urgencies.map(u => (
                                            <SelectItem key={u} value={u} className="text-xs uppercase font-bold">{u}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="module"
                    render={({ field }) => (
                        <FormItem className="space-y-1.5 text-left">
                            <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('field_module')}</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold">
                                        <SelectValue placeholder={t('field_module_placeholder')} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl">
                                    {loginOptions.map(opt => (
                                        <SelectItem key={opt.href} value={opt.label} className="text-xs font-bold uppercase">{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-[8px]" />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full text-[9px] md:text-[10px] font-black h-12 md:h-14 mt-4 shadow-xl btn-3d-primary rounded-xl" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> {t('btn_submitting')}</>
                    ) : (
                        <span className="flex items-center gap-2 justify-center">{t('btn_submit')} <Send className="h-3 w-3" /></span>
                    )}
                </Button>
                <p className="text-center text-[7px] md:text-[8px] text-muted-foreground/70 uppercase font-black tracking-[0.4em] mt-4">{t('footer_text')}</p>
            </form>
        </Form>
    );
}
