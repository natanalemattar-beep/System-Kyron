
'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight } from "lucide-react";

export function WelcomeTutorial() {
    const [showTutorial, setShowTutorial] = useState(false);

    useEffect(() => {
        // This effect runs only on the client side, after the initial render.
        const hasSeen = localStorage.getItem("hasSeenKyronTutorial");
        if (!hasSeen) {
            const timer = setTimeout(() => {
                setShowTutorial(true);
                localStorage.setItem("hasSeenKyronTutorial", "true");
            }, 2500); // Wait for other animations to settle
            return () => clearTimeout(timer);
        }
    }, []);
    
    // By default, the component renders nothing on the server and on initial client render.
    // The dialog is only shown after the useEffect hook has run on the client.
    if (!showTutorial) {
        return null;
    }

    return (
        <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center items-center">
                    <div className="p-3 rounded-full bg-destructive/10 mb-4">
                        <AlertTriangle className="h-10 w-10 text-destructive" />
                    </div>
                    <DialogTitle className="text-2xl">Atención: Esta es una Versión de Prueba</DialogTitle>
                    <DialogDescription className="pt-2">
                       La página es un prototipo, puede tener errores.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center pt-4">
                     <Button onClick={() => setShowTutorial(false)}>
                        Entendido y Continuar <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
