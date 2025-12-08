
"use client";

import { useState } from "react";
import { Banknote, Eye, EyeOff, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const Credentials = ({ user, password }: { user: string; password?: string }) => {
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
            <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-lg">
                <span className="text-muted-foreground">Usuario: <strong className="text-foreground font-mono">{user}</strong></span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(user, 'Usuario')}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </div>
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

export default function LoginAdminPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [country, setCountry] = useState("VEN");

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-xl mb-4 mx-auto">
          <Banknote className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">FinTech y Banca Digital</CardTitle>
        <CardDescription>Acceso al panel de control principal de la empresa.</CardDescription>
      </CardHeader>
      <form>
        <CardContent className="p-6 space-y-6">
           <div className="space-y-2">
            <Label>País</Label>
            <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                <SelectValue placeholder="Seleccionar país..." />
                </SelectTrigger>
                <SelectContent>
                {countries.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
                </SelectContent>
            </Select>
            </div>
          <div className="space-y-2">
            <Label>Usuario (Admin)</Label>
            <Input id="username" type="text" placeholder="admin.user" required defaultValue="admin.user"/>
          </div>
          <div className="space-y-2 relative">
            <Label>Contraseña</Label>
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
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="font-normal">Recuérdame</Label>
            </div>
            <a href="#" className="text-primary hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex-col">
          <Button asChild type="submit" className="w-full h-11 text-base">
            <Link href="/dashboard-empresa">Acceder</Link>
          </Button>
          <Credentials user="admin.user" password="password123" />
        </CardFooter>
      </form>
    </Card>
  );
}
