

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { User, Eye, EyeOff, Save, Trash2, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = 'kyron_borrador_registro';

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

type FormData = {
    country: string;
    idNumber: string;
    email: string;
};

export default function RegisterNaturalPage() {
    const [formData, setFormData] = useState<FormData>({
        country: "VEN",
        idNumber: "",
        email: "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
    const { toast } = useToast();
    
    // Debounce timer reference
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    // Load draft from localStorage on initial render
    useEffect(() => {
        try {
            const savedDraft = localStorage.getItem(STORAGE_KEY);
            if (savedDraft) {
                const draftData = JSON.parse(savedDraft);
                setFormData(prev => ({ ...prev, ...draftData }));
                toast({
                    title: "Borrador Recuperado",
                    description: "Hemos cargado tus datos no enviados. ¡Puedes continuar donde lo dejaste!",
                });
            }
        } catch (error) {
            console.error("Failed to load draft from localStorage", error);
        }
    }, [toast]);

    // Debounced save function
    const debouncedSave = useCallback((data: FormData) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        setSaveStatus("saving");
        debounceTimeout.current = setTimeout(() => {
            try {
                // Exclude password from being saved
                const { ...dataToSave } = data;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
                setSaveStatus("saved");
                setTimeout(() => setSaveStatus("idle"), 2000);
            } catch (error) {
                console.error("Failed to save draft to localStorage", error);
                setSaveStatus("idle");
            }
        }, 500);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [id]: value };
            debouncedSave(newData);
            return newData;
        });
    };
    
     const handleCountryChange = (newCountryCode: string) => {
        setFormData(prev => {
            const newData = { ...prev, country: newCountryCode, idNumber: '' };
            debouncedSave(newData);
            return newData;
        });
    };

    const handleDiscardDraft = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            setFormData({ country: "VEN", idNumber: "", email: "" });
            // Also clear password fields if they are separate states
            toast({
                title: "Borrador Descartado",
                description: "El formulario ha sido limpiado.",
            });
        } catch (error) {
             console.error("Failed to discard draft", error);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would have your Firebase logic
        // For now, we simulate a successful submission
        console.log("Submitting:", formData);

        // On successful submission:
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error("Failed to clear draft on submit", error);
        }
        
        toast({
            title: "Registro Exitoso",
            description: "Tu cuenta ha sido creada.",
        });

        // Redirect or clear form
        // window.location.href = "/dashboard";
    };

    const currentIdInfo = idByCountry[formData.country] || { label: "Identificación Personal", placeholder: "" };
    
    const renderSaveStatus = () => {
        switch (saveStatus) {
            case 'saving':
                return <span className="flex items-center gap-1 text-xs text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin"/> Guardando...</span>;
            case 'saved':
                return <span className="flex items-center gap-1 text-xs text-green-500"><CheckCircle className="h-3 w-3"/> Borrador guardado</span>;
            default:
                return <div className="h-5" />; // Placeholder to prevent layout shift
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
                    <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Registro Personal</CardTitle>
                <CardDescription>Crea tu cuenta para gestionar tus trámites personales.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label>País</Label>
                        <Select value={formData.country} onValueChange={handleCountryChange}>
                            <SelectTrigger><SelectValue placeholder="Seleccionar país..." /></SelectTrigger>
                            <SelectContent>{countries.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="idNumber">{currentIdInfo.label}</Label>
                        <Input id="idNumber" type="text" placeholder={currentIdInfo.placeholder} value={formData.idNumber} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" type="email" placeholder="tu@correo.com" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2 relative">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type={passwordVisible ? "text" : "password"} placeholder="••••••••" className="pr-10" required />
                        <button type="button" onClick={() => setPasswordVisible(prev => !prev)} className="absolute right-3 top-8 text-muted-foreground">{passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                    </div>
                    <div className="flex justify-end h-5">
                       {renderSaveStatus()}
                    </div>
                </CardContent>
                 <CardFooter className="p-6 pt-0 flex-col gap-2">
                    <Button asChild type="submit" className="w-full h-11 text-base">
                       <Link href="/dashboard">Crear Cuenta</Link>
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={handleDiscardDraft}>
                       <Trash2 className="mr-2 h-3 w-3"/> Descartar borrador
                    </Button>
                </CardFooter>
            </form>
            <CardFooter className="flex-col p-6 border-t text-sm">
                <p className="text-muted-foreground">¿Ya tienes una cuenta?</p>
                <Link href="/login" className="font-medium text-primary hover:underline">
                    Inicia sesión aquí
                </Link>
            </CardFooter>
        </Card>
    );
}
