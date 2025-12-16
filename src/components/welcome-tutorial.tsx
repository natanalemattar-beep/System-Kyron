
'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight } from "lucide-react";

export function WelcomeTutorial() {
    const [isMounted, setIsMounted] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);

    useEffect(() => {
        // This flag ensures the rest of the effect runs only on the client
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Don't run this logic on the server or before the component is mounted
        if (!isMounted) {
            return;
        }

        const hasSeen = localStorage.getItem("hasSeenKyronTutorial");
        if (!hasSeen) {
            const timer = setTimeout(() => {
                setShowTutorial(true);
                localStorage.setItem("hasSeenKyronTutorial", "true");
            }, 2500); // Wait for other animations to settle

            return () => clearTimeout(timer);
        }
    }, [isMounted]); // Re-run when isMounted becomes true
    
    // Render nothing on the server or on the initial client render
    if (!isMounted) {
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
