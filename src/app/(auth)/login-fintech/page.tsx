
"use client";

import { useState } from "react";
import { Banknote, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginFintechPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [country, setCountry] = useState("VEN");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard-empresa');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
          <Banknote className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">FinTech y Banca Digital</CardTitle>
        <CardDescription>Acceso al panel de control principal de la empresa.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
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
            <Input type="text" placeholder="admin.user" required />
          </div>
          <div className="space-y-2 relative">
            <Label>Contraseña</Label>
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
              required
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
            <Link href="#" className="text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button type="submit" className="w-full h-11 text-base">
            Acceder
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
