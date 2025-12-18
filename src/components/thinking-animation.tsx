
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const thinkingSteps = [
    "Analizando solicitud...",
    "Identificando parámetros clave...",
    "Consultando base de conocimiento...",
    "Formulando estrategia de solución...",
    "Generando código optimizado...",
    "Compilando respuesta...",
];

export function ThinkingAnimation() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => {
                if (prevStep >= thinkingSteps.length - 1) {
                    clearInterval(interval);
                    return prevStep;
                }
                return prevStep + 1;
            });
        }, 800); // Change step every 800ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-start space-y-2 text-sm">
            {thinkingSteps.map((step, index) => (
                <AnimatePresence key={index}>
                    {currentStep >= index && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2"
                        >
                            <span className={`w-2 h-2 rounded-full ${currentStep > index ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></span>
                            <span className={`${currentStep > index ? 'text-muted-foreground' : 'text-foreground font-semibold'}`}>{step}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            ))}
        </div>
    );
}
