
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, AlertTriangle, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


const cardVariants = cva(
  "w-full max-w-md mx-auto bg-card/60 dark:bg-card/30 backdrop-blur-lg border overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-primary/20",
        juridico: "border-blue-500/20",
        fintech: "border-green-500/20",
        ventas: "border-rose-500/20",
        tecnologia: "border-cyan-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface Field {
  id: string;
  label: string;
  type: 'text' | 'password' | 'select' | 'checkbox' | 'email';
  placeholder?: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
  link?: { href: string; label: string };
  rememberMe?: boolean;
  required?: boolean;
}

interface LinkGroup {
  title: string;
  links: { href: string; label: string; icon: React.ElementType }[];
}

export interface LoginCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  icon: React.ElementType;
  title: string;
  description: string;
  fields: Field[];
  submitButtonText: string;
  submitButtonHref: string;
  credentials?: { user: string; password?: string, code?: string };
  footerLinks?: {
    text?: string;
    mainLink?: { href: string; label: string };
    secondaryLinks?: LinkGroup;
  };
}

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

const Credentials = ({ user, password, code }: { user?: string; password?: string, code?: string }) => {
    const { toast } = useToast();

    const copyToClipboard = (text: string, field: string) => {
        if (text) {
            navigator.clipboard.writeText(text);
            toast({
                title: `${field} copiado`,
                description: `${text} ha sido copiado al portapapeles.`,
            });
        }
    };

    return (
        <div className="mt-6 w-full space-y-3 text-sm">
            {code && (
                 <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-lg">
                    <span className="text-muted-foreground">Código: <strong className="text-foreground font-mono">{code}</strong></span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(code, 'Código')}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {user && (
                 <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-lg">
                    <span className="text-muted-foreground">Usuario: <strong className="text-foreground font-mono">{user}</strong></span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(user, 'Usuario')}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {password && (
                <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-lg">
                    <span className="text-muted-foreground">Contraseña: <strong className="text-foreground font-mono">{password}</strong></span>
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(password, 'Contraseña')}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            )}
        </div>
    );
};


export const LoginCard = React.forwardRef<HTMLDivElement, LoginCardProps>(
  ({ className, variant, icon: Icon, title, description, fields, submitButtonText, submitButtonHref, credentials, footerLinks, ...props }, ref) => {
    
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [country, setCountry] = useState("VEN");
    const [formData, setFormData] = useState<Record<string, string>>(() => {
        const initialData: Record<string, string> = {};
        fields.forEach(field => {
            if (field.defaultValue) {
                initialData[field.id] = field.defaultValue;
            }
        });
        return initialData;
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const auth = useAuth();


    useEffect(() => {
        setIsClient(true);
    }, []);


    const currentIdInfo = idByCountry[country] || { label: "Identificación Personal", placeholder: "" };

    const handleCountryChange = (newCountryCode: string) => {
        setCountry(newCountryCode);
        setFormData(prev => ({...prev, idValue: ''}));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        if (!auth) {
            setError("Servicio de autenticación no disponible.");
            setIsLoading(false);
            return;
        }

        const emailField = fields.find(f => f.type === 'email');
        const passField = fields.find(f => f.type === 'password');
        
        if (!emailField || !passField) {
            setError("Configuración de formulario inválida.");
            setIsLoading(false);
            return;
        }

        const email = formData[emailField.id];
        const password = formData[passField.id];
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged in the provider will handle the redirect.
            router.push(submitButtonHref);
        } catch (err: any) {
            switch (err.code) {
                case 'auth/user-not-found':
                    setError("No se encontró ningún usuario con este correo electrónico.");
                    break;
                case 'auth/wrong-password':
                    setError("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
                    break;
                case 'auth/invalid-credential':
                    setError("Credenciales inválidas. Verifica tu correo y contraseña.");
                    break;
                case 'auth/invalid-email':
                    setError("El formato del correo electrónico es inválido.");
                    break;
                default:
                    setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };
  
    const renderField = (field: Field) => {
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
        
        if (field.id === 'idValue' && !isClient) {
            return <div key="id-placeholder" className="space-y-2"><Label>Identificación</Label><Input disabled placeholder="Cargando..." /></div>;
        }

        const dynamicFieldId = field.id === 'idValue' ? currentIdInfo.label.toLowerCase().replace(/ /g, '-') : field.id;
        const dynamicLabel = field.id === 'idValue' ? currentIdInfo.label : field.label;
        const dynamicPlaceholder = field.id === 'idValue' ? currentIdInfo.placeholder : field.placeholder;
        
        const value = formData[field.id] || '';


        switch (field.type) {
        case 'password':
            return (
            <div key={field.id} className="space-y-2 relative">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input id={field.id} type={passwordVisible ? "text" : "password"} placeholder={field.placeholder} value={value} onChange={handleInputChange} className="pr-10" required/>
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">{passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
            </div>
            );
        case 'checkbox':
            return (
                <div key={field.id} className="flex items-center justify-between text-sm">
                    {field.rememberMe && (
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember-me" />
                            <Label htmlFor="remember-me" className="font-normal">Recuérdame</Label>
                        </div>
                    )}
                    {field.link && <Link href={field.link.href} className="text-primary hover:underline">{field.link.label}</Link>}
                </div>
            );
        default: {
            return (
            <div key={field.id} className="space-y-2">
                <Label htmlFor={dynamicFieldId}>{dynamicLabel}</Label>
                <Input id={field.id} type={field.type} placeholder={dynamicPlaceholder} value={value} onChange={handleInputChange} required={field.required}/>
            </div>
            );
        }
        }
    };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card ref={ref} className={cn(cardVariants({ variant, className }))} {...props}>
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
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}
            {fields.map(renderField)}
            </CardContent>
            <CardFooter className="p-6 pt-0 flex-col">
            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                {submitButtonText}
            </Button>
            {credentials && <Credentials {...credentials} />}
            </CardFooter>
        </form>
        {footerLinks && (
            <CardFooter className="flex-col gap-4 p-6 border-t text-sm">
            {footerLinks.text && <p className="text-muted-foreground">{footerLinks.text}</p>}
            {footerLinks.secondaryLinks ? (
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
                    {footerLinks.secondaryLinks.links.map(link => (
                        <Button key={link.href} asChild variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                            <Link href={link.href} className="flex items-center gap-1">
                                <link.icon className="h-4 w-4" />{link.label}
                            </Link>
                        </Button>
                    ))}
                </div>
            ) : footerLinks.mainLink?.href && (
                <Button asChild variant="link" className="p-0">
                    <Link href={footerLinks.mainLink.href} className="font-medium">{footerLinks.mainLink.label}</Link>
                </Button>
            )}
            </CardFooter>
        )}
        </Card>
    </motion.div>
  );
})
LoginCard.displayName = "LoginCard"


    
    