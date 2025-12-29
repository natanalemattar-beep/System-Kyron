
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LoginCardProps {
    portalName: string;
    portalDescription: string;
    redirectPath: string;
}

export function LoginCard({ portalName, portalDescription, redirectPath }: LoginCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            router.push(redirectPath);
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
                <CardHeader className="text-center p-8">
                    <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">{portalName}</CardTitle>
                    <CardDescription className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                        {portalDescription}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" type="email" placeholder="tu@email.com" required className="text-base" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" required className="text-base" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-8">
                        <Button type="submit" className="w-full text-lg" disabled={isLoading}>{
                            isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Acceder'
                        }</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
