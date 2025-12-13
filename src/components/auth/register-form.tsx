
"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";
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
import { Credentials } from "./credentials";
import { usePathname } from 'next/navigation';

interface RegisterField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
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
    credentials?: { user: string; password?: string, code?: string };
}

export function RegisterForm({ icon: Icon, title, description, fields, submitButtonText, footerLinkHref, footerLinkText, credentials }: RegisterFormProps) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const pathname = usePathname();
    
    // Determine the dashboard href based on the registration page path
    const getDashboardHref = () => {
        if (pathname.includes('/register/informatica')) return '/dashboard-informatica';
        if (pathname.includes('/register/marketing')) return '/asesoria-publicidad';
        if (pathname.includes('/register/rrhh')) return '/dashboard-rrhh';
        if (pathname.includes('/register/socios')) return '/dashboard-socios';
        if (pathname.includes('/register/telecom')) return '/dashboard-telecom';
        if (pathname.includes('/register/ventas')) return '/analisis-ventas';
        if (pathname.includes('/register/juridico')) return '/escritorio-juridico';
        if (pathname.includes('/register/natural')) return '/dashboard';
        if (pathname.includes('/register/juridica')) return '/dashboard-empresa';
        return '/'; // Fallback
    }

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
                    {fields.map((field) => (
                         <div key={field.id} className="space-y-2 relative">
                            <Label htmlFor={field.id}>{field.label}</Label>
                            <Input
                                id={field.id}
                                type={field.type === 'password' && !passwordVisible ? 'password' : 'text'}
                                placeholder={field.placeholder}
                                defaultValue={field.defaultValue}
                                required={field.required}
                                className={field.type === 'password' ? 'pr-10' : ''}
                            />
                            {field.type === 'password' && (
                                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                                    {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            )}
                        </div>
                    ))}
                </CardContent>
                 <CardFooter className="p-6 pt-0 flex-col">
                    <Button asChild type="submit" className="w-full h-11 text-base">
                        <Link href={getDashboardHref()}>{submitButtonText}</Link>
                    </Button>
                    {credentials && <Credentials {...credentials} />}
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
