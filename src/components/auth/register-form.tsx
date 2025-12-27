
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { countries } from "@/lib/countries";
import { Alert, AlertDescription } from "@/components/ui/alert";


const idByCountry: Record<string, { label: string, placeholder: string }> = {
    "VEN": { label: "Cédula de Identidad", placeholder: "V-12345678" },
    "USA": { label: "Email / Username", placeholder: "user@email.com" },
    "ESP": { label: "DNI / NIE", placeholder: "12345678A" },
    "COL": { label: "Cédula de Ciudadanía", placeholder: "1234567890" },
    "ARG": { label: "Documento Nacional de Identidad (DNI)", placeholder: "12.345.678" },
    "MEX": { label: "Clave Única de Registro de Población (CURP)", placeholder: "ABCD123456HOMBRE12" },
    "CHL": { label: "Rol Único Nacional (RUN)", placeholder: "12.345.678-K" },
    "BRA": { label: "Cadastro de Pessoas Físicas (CPF)", placeholder: "123.456.789-00" },
    "DEU": { label: "Personalausweisnummer", placeholder: "L01X00T29" },
    "FRA": { label: "Numéro de Carte Nationale d'Identité", placeholder: "123456789012" },
    "ITA": { label: "Codice Fiscale", placeholder: "ABCDEF12G34H567I" },
    "NLD": { label: "Burgerservicenummer (BSN)", placeholder: "123456789" },
    "CHN": { label: "Resident Identity Card Number", placeholder: "110101199003071234" },
    "ARE": { label: "Emirates ID Number", placeholder: "784-1980-1234567-1" },
    "CAN": { label: "Social Insurance Number (SIN)", placeholder: "123-456-789" },
    "PRT": { label: "Cartão de Cidadão", placeholder: "12345678 9 ZZ1" },
};

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
}

export function RegisterForm({ icon: Icon, title, description, fields, submitButtonText, footerLinkHref, footerLinkText, onSubmit, error }: RegisterFormProps) {
    const { toast } = useToast();
    const pathname = usePathname();
    const STORAGE_KEY = `kyron_borrador_registro_${pathname.replace(/\//g, '_')}`;

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [country, setCountry] = useState("VEN");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
    const [isLoading, setIsLoading] = useState(false);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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

    const handleCountryChange = (newCountryCode: string) => {
        setCountry(newCountryCode);
        handleInputChange('idNumber', '');
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
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            setIsLoading(true);
            await onSubmit(formData);
            setIsLoading(false);
        } else {
            // Default behavior if no onSubmit is provided
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                toast({
                    title: "¡Registro Exitoso!",
                    description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
                });
                // Potentially clear draft on successful submission
                localStorage.removeItem(STORAGE_KEY);
            }, 1500);
        }
    };

    const renderSaveStatus = () => {
        switch (saveStatus) {
            case 'saving': return <span className="flex items-center gap-1 text-xs text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin"/> Guardando...</span>;
            case 'saved': return <span className="flex items-center gap-1 text-xs text-green-500"><CheckCircle className="h-3 w-3"/> Borrador guardado</span>;
            default: return <div className="h-5" />;
        }
    };

    const renderField = (field: RegisterField) => {
        if (field.id === 'country') {
             return (
                <div key={field.id} className="space-y-2">
                    <Label>{field.label}</Label>
                    <Select value={country} onValueChange={handleCountryChange}>
                        <SelectTrigger><SelectValue placeholder="Seleccionar país..." /></SelectTrigger>
                        <SelectContent>{countries.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
            );
        }
        
        if (field.id === 'idNumber' && !isClient) {
            return (
                <div key="id-placeholder" className="space-y-2">
                    <Label>Identificación</Label>
                    <Input disabled placeholder="Cargando..." />
                </div>
            );
        }

        const dynamicLabel = field.id === 'idNumber' ? (idByCountry[country]?.label || 'Identificación') : field.label;
        const dynamicPlaceholder = field.id === 'idNumber' ? (idByCountry[country]?.placeholder || '') : field.placeholder;

        return (
             <div key={field.id} className="space-y-2 relative">
                <Label htmlFor={field.id}>{dynamicLabel}</Label>
                <Input
                    id={field.id}
                    type={field.type === 'password' && !passwordVisible ? 'password' : 'text'}
                    placeholder={dynamicPlaceholder}
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
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border hover-glow">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                {fields.length > 0 && (
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
                )}
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

    
