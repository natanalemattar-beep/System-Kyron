
"use client";

import { useState } from "react";
import { Users, Eye, EyeOff, Copy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Credentials = ({ user, password, code }: { user?: string; password?: string, code?: string }) => {
    const { toast } = useToast();
    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: `${field} copiado`,
            description: `${text} ha sido copiado al portapapeles.`,
        });
    };

    return (
        <div className="mt-6 w-full space-y-3 text-sm">
            {code && (
                 <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-md">
                    <span className="text-muted-foreground">Código: <strong className="text-foreground font-mono">{code}</strong></span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(code, 'Código')}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {user && (
                 <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-md">
                    <span className="text-muted-foreground">Usuario: <strong className="text-foreground font-mono">{user}</strong></span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(user, 'Usuario')}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {password && (
                <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-md">
                    <span className="text-muted-foreground">Contraseña: <strong className="text-foreground font-mono">{password}</strong></span>
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(password, 'Contraseña')}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default function RegisterSociosPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
                    <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Registro de Socios</CardTitle>
                <CardDescription>Crea tu cuenta para el portal de socios y directivos.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="invite-code">Código de Invitación</Label>
                    <Input id="invite-code" placeholder="Código exclusivo para socios" required defaultValue="SOCIO-KYRON-2024"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="socio@tuempresa.com" required defaultValue="socio@kyron.com"/>
                </div>
                <div className="space-y-2 relative">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10"
                        required
                        defaultValue="password123"
                    />
                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                        {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                <Button type="submit" className="w-full h-11 text-base">Crear Cuenta de Socio</Button>
                <Credentials code="SOCIO-KYRON-2024" user="socio@kyron.com" password="password123" />
            </CardContent>
            <CardFooter className="flex-col p-6 border-t text-sm">
                 <p className="text-muted-foreground">¿Ya tienes una cuenta?</p>
                <Link href="/login-socios" className="font-medium text-primary hover:underline">
                    Inicia sesión aquí
                </Link>
            </CardFooter>
        </Card>
    );
}
