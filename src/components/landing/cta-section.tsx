
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { CheckCircle, Send } from "lucide-react";

export function CtaSection() {
    const { toast } = useToast();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        const form = e.target as HTMLFormElement;
        const requiredFields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[required]');
        let allValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allValid = false;
            }
            if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
                allValid = false;
            }
        });

        const privacyCheckbox = form.querySelector<HTMLInputElement>('#privacy-policy');
        if (!privacyCheckbox?.checked) {
            allValid = false;
             toast({
                variant: "destructive",
                title: "Error de Validación",
                description: "Debe aceptar la política de privacidad para continuar.",
            });
            return;
        }

        if (allValid) {
            setIsSubmitted(true);
            toast({
                title: "Solicitud Enviada",
                description: "Gracias por tu interés. Nos pondremos en contacto contigo a la brevedad.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error de Validación",
                description: "Por favor, completa todos los campos obligatorios y asegúrate de que el correo electrónico sea válido.",
            });
        }
    };

    if (isSubmitted) {
        return (
            <section className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-card border">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold">¡Solicitud Recibida!</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Gracias por contactarnos. Un miembro de nuestro equipo se pondrá en contacto contigo pronto para agendar tu demo.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contacto" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="max-w-3xl mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl md:text-4xl">Solicita una Demo Gratuita</CardTitle>
                        <CardDescription className="pt-2">Descubre cómo Kyron puede transformar tu negocio. Completa el formulario y nos pondremos en contacto.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="nombre">Nombre Completo</Label>
                                    <Input id="nombre" placeholder="Juan Pérez" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="empresa">Nombre de la Empresa</Label>
                                    <Input id="empresa" placeholder="Tu Empresa, C.A." required />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="telefono">Teléfono</Label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-secondary text-muted-foreground text-sm">
                                          +58
                                        </span>
                                        <Input id="telefono" type="tel" placeholder="414-1234567" className="rounded-l-none" required />
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input id="email" type="email" placeholder="contacto@tuempresa.com" required />
                                </div>
                            </div>
                              <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="tipo-empresa">Tipo de Empresa</Label>
                                    <Select name="tipo-empresa" required>
                                        <SelectTrigger id="tipo-empresa">
                                            <SelectValue placeholder="Selecciona un tipo..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="srl">SRL</SelectItem>
                                            <SelectItem value="ca">C.A.</SelectItem>
                                            <SelectItem value="comerciante">Comerciante Individual</SelectItem>
                                            <SelectItem value="otro">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="num-empleados">Número de Empleados</Label>
                                    <Select name="num-empleados" required>
                                        <SelectTrigger id="num-empleados">
                                            <SelectValue placeholder="Selecciona un rango..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-5">1-5</SelectItem>
                                            <SelectItem value="6-20">6-20</SelectItem>
                                            <SelectItem value="21-50">21-50</SelectItem>
                                            <SelectItem value="51+">51+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="mensaje">Mensaje</Label>
                                <Textarea id="mensaje" placeholder="Ej: Me interesa una demo para entender cómo funciona la gestión fiscal..." rows={4} />
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="privacy-policy" required />
                                <Label htmlFor="privacy-policy" className="text-xs text-muted-foreground font-normal">
                                    Acepto la <Link href="/politica-privacidad" className="underline hover:text-primary">política de privacidad</Link> y los <Link href="/terms" className="underline hover:text-primary">términos de servicio</Link>.
                                </Label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full text-lg h-12">
                                <Send className="mr-2 h-5 w-5"/>
                                Solicitar Demo Gratuita
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </section>
    );
}
