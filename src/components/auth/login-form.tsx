
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
import { Credentials } from "./credentials";

interface Field {
  id: string;
  label: string;
  type: 'text' | 'password' | 'select' | 'checkbox';
  placeholder?: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
  link?: { href: string; label: string };
  rememberMe?: boolean;
}

interface LinkGroup {
  title: string;
  links: { href: string; label: string; icon: React.ElementType }[];
}

interface LoginFormProps {
  icon: React.ElementType;
  title: string;
  description: string;
  fields: Field[];
  submitButtonText: string;
  submitButtonHref: string;
  credentials?: { user: string; password?: string };
  footerLinks?: {
    text?: string;
    mainLink: { href: string; label: string };
    secondaryLinks?: LinkGroup;
  };
  footerContent?: React.ReactNode;
}

const idByCountry: Record<string, { label: string, placeholder: string, defaultValue: string }> = {
    "VEN": { label: "Cédula de Identidad", placeholder: "V-12345678", defaultValue: "V-12345678" },
    "USA": { label: "Email / Username", placeholder: "user@email.com", defaultValue: "user@email.com" },
    "ESP": { label: "DNI / NIE", placeholder: "12345678A", defaultValue: "12345678A" },
    "COL": { label: "Cédula de Ciudadanía", placeholder: "1234567890", defaultValue: "1234567890" },
    "ARG": { label: "Documento Nacional de Identidad (DNI)", placeholder: "12.345.678", defaultValue: "12.345.678" },
    "MEX": { label: "Clave Única de Registro de Población (CURP)", placeholder: "ABCD123456HOMBRE12", defaultValue: "ABCD123456HOMBRE12" },
    "CHL": { label: "Rol Único Nacional (RUN)", placeholder: "12.345.678-K", defaultValue: "12.345.678-K" },
    "BRA": { label: "Cadastro de Pessoas Físicas (CPF)", placeholder: "123.456.789-00", defaultValue: "123.456.789-00" },
    "DEU": { label: "Personalausweisnummer", placeholder: "L01X00T29", defaultValue: "L01X00T29" },
    "FRA": { label: "Numéro de Carte Nationale d'Identité", placeholder: "123456789012", defaultValue: "123456789012" },
    "ITA": { label: "Codice Fiscale", placeholder: "ABCDEF12G34H567I", defaultValue: "ABCDEF12G34H567I" },
    "NLD": { label: "Burgerservicenummer (BSN)", placeholder: "123456789", defaultValue: "123456789" },
    "CHN": { label: "Resident Identity Card Number", placeholder: "110101199003071234", defaultValue: "110101199003071234" },
    "ARE": { label: "Emirates ID Number", placeholder: "784-1980-1234567-1", defaultValue: "784-1980-1234567-1" },
    "CAN": { label: "Social Insurance Number (SIN)", placeholder: "123-456-789", defaultValue: "123-456-789" },
};


export function LoginForm({ icon: Icon, title, description, fields, submitButtonText, submitButtonHref, credentials, footerLinks, footerContent }: LoginFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [country, setCountry] = useState("VEN");

  const currentId = idByCountry[country] || { label: "Identificación Personal", placeholder: "", defaultValue: "" };
  
  const renderField = (field: Field) => {
    switch (field.type) {
      case 'select':
        if (field.id === 'country') {
            return (
                <div key={field.id} className="space-y-2">
                    <Label>{field.label}</Label>
                    <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger><SelectValue placeholder="Seleccionar país..." /></SelectTrigger>
                        <SelectContent>{countries.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
            );
        }
        return (
            <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Select defaultValue={field.defaultValue}><SelectTrigger id={field.id}><SelectValue placeholder={field.placeholder} /></SelectTrigger><SelectContent>{field.options?.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent></Select>
            </div>
        );
      case 'password':
        return (
          <div key={field.id} className="space-y-2 relative">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input id={field.id} type={passwordVisible ? "text" : "password"} placeholder={field.placeholder} defaultValue={field.defaultValue} className="pr-10" required/>
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
      default:
        let label = field.label;
        let placeholder = field.placeholder;
        let defaultValue = field.defaultValue;

        if (field.id === 'idValue') {
            label = currentId.label;
            placeholder = currentId.placeholder;
            defaultValue = currentId.defaultValue;
        }

        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{label}</Label>
            <Input id={field.id} type={field.type} placeholder={placeholder} defaultValue={defaultValue} required/>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form>
        <CardContent className="p-6 space-y-6">
          {fields.map(renderField)}
        </CardContent>
        <CardFooter className="p-6 pt-0 flex-col">
          <Button asChild type="submit" className="w-full h-11 text-base">
            <Link href={submitButtonHref}>{submitButtonText}</Link>
          </Button>
          {credentials && <Credentials user={fields.some(f => f.id === 'idValue') ? currentId.defaultValue : credentials.user} password={credentials.password} />}
        </CardFooter>
      </form>
       {footerContent ? (
        <CardFooter className="flex-col gap-4 p-6 border-t text-sm text-center">
          {footerContent}
        </CardFooter>
      ) : footerLinks && (
        <CardFooter className="flex-col gap-4 p-6 border-t text-sm">
          {footerLinks.text && <p className="text-muted-foreground">{footerLinks.text}</p>}
           {footerLinks.secondaryLinks ? (
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
                {footerLinks.secondaryLinks.links.map(link => (
                    <Button key={link.href} asChild variant="link" className="p-0">
                        <Link href={link.href} className="flex items-center gap-1">
                            <link.icon className="h-4 w-4" />{link.label}
                        </Link>
                    </Button>
                ))}
            </div>
           ) : (
             <Button asChild variant="link" className="p-0">
                <Link href={footerLinks.mainLink.href} className="font-medium">{footerLinks.mainLink.label}</Link>
            </Button>
           )}
        </CardFooter>
      )}
    </Card>
  );
}
