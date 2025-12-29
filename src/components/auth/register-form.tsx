
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Eye, EyeOff, Loader2, CheckCircle, Trash2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { usePathname } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RegisterField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'select';
    placeholder?: string;
    required?: boolean;
    defaultValue?: string;
}

interface RegisterFormProps {
    icon: React.ElementType;
    title: string;
    description: string;
    fields: RegisterField[];
    submitButtonText: string;
    footerLinkHref: string;
    footerLinkText: string;
    onSubmit?: (formData: Record<string, string>) => Promise<void>;
    error?: string | null;
    isLoading?: boolean;
}

export function RegisterForm({ icon: Icon, title, description, fields, submitButtonText, footerLinkHref, footerLinkText, onSubmit, error, isLoading }: RegisterFormProps) {
    const { toast } = useToast();
    const pathname = usePathname();
    const STORAGE_KEY = `kyron_borrador_registro_${pathname.replace(/\//g, '_')}`;

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const [formData, setFormData] = useState<Record<string, string>>(() => {
        const initialData: Record<string, string> = {};
        fields.forEach(field => {
            if (field.defaultValue) {
                initialData[field.id] = field.defaultValue;
            }
        });
        return initialData;
    });

    useEffect(() => {
        try {
            const savedDraft = localStorage.getItem(STORAGE_KEY);
            if (savedDraft) {
                setFormData(JSON.parse(savedDraft));
                toast({
                    title: "Borrador Recuperado",
                    description: "Hemos cargado tus datos no enviados.",
                });
            }
        } catch (error) {
            console.error("Failed to load draft from localStorage", error);
        }
    }, [STORAGE_KEY, toast]);

    const debouncedSave = useCallback((data: Record<string, string>) => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        setSaveStatus("saving");
        debounceTimeout.current = setTimeout(() => {
            try {
                const { password, ...dataToSave } = data; // Exclude password
                localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
                setSaveStatus("saved");
                setTimeout(() => setSaveStatus("idle"), 2000);
            } catch (error) {
                console.error("Failed to save draft", error);
                setSaveStatus("idle");
            }
        }, 500);
    }, [STORAGE_KEY]);

    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => {
            const newData = { ...prev, [id]: value };
            debouncedSave(newData);
            return newData;
        });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            // On successful submission, clear the draft
            if (!error) {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    };
    
    const handleDiscardDraft = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            const resetData: Record<string, string> = {};
            fields.forEach(f => resetData[f.id] = f.defaultValue || '');
            setFormData(resetData);
            toast({ title: "Borrador Descartado", description: "El formulario ha sido limpiado." });
        } catch (error) {
            console.error("Failed to discard draft", error);
        }
    };

    const renderSaveStatus = () => {
        switch (saveStatus) {
            case 'saving': return <span className="flex items-center gap-1 text-xs text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin"/> Guardando...</span>;
            case 'saved': return <span className="flex items-center gap-1 text-xs text-green-500"><CheckCircle className="h-3 w-3"/> Borrador guardado</span>;
            default: return <div className="h-5" />;
        }
    };

    const renderField = (field: RegisterField) => (
        <div key={field.id} className="space-y-2 relative">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
                id={field.id}
                type={field.type === 'password' && !passwordVisible ? 'password' : 'text'}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                required={field.required}
                className={field.type === 'password' ? 'pr-10' : ''}
            />
            {field.type === 'password' && (
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                    {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
            )}
        </div>
    );

    return (
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="p-6 space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {fields.map(renderField)}
                    <div className="flex justify-end h-5">
                        {renderSaveStatus()}
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex-col gap-2">
                    <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                        {submitButtonText}
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={handleDiscardDraft}>
                        <Trash2 className="mr-2 h-3 w-3"/> Descartar borrador
                    </Button>
                </CardFooter>
            </form>
            <CardFooter className="flex-col p-6 border-t text-sm">
                <p className="text-muted-foreground">¿Ya tienes una cuenta?</p>
                <Link href={footerLinkHref} className="font-medium text-primary hover:underline">
                    {footerLinkText}
                </Link>
            </CardFooter>
        </Card>
    );
}
