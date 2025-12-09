
"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export const Credentials = ({ user, password, code }: { user?: string; password?: string, code?: string }) => {
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
