
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Camera, CheckCircle, RefreshCw, AlertTriangle, Cpu, Shield, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function RegistroCompradorPage() {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useEffect(() => {
        const getCameraPermission = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error('La API de Media Devices no está disponible en este navegador.');
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Cámara no Soportada',
                    description: 'Tu navegador no soporta el acceso a la cámara.',
                });
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setHasCameraPermission(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error al acceder a la cámara:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Acceso a la Cámara Denegado',
                    description: 'Por favor, habilita los permisos de la cámara en tu navegador para continuar.',
                });
            }
        };

        getCameraPermission();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [toast]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/png');
                setCapturedImage(dataUrl);
            }
        }
    };
    
    const handleRetake = () => {
        setCapturedImage(null);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!capturedImage) {
            toast({
                variant: 'destructive',
                title: 'Foto Faltante',
                description: 'Por favor, captura una foto facial antes de registrar.',
            });
            return;
        }
        toast({
            title: "Registro Exitoso",
            description: "El nuevo comprador ha sido registrado en el sistema.",
            action: <CheckCircle className="text-green-500"/>
        });
    }

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <User className="h-8 w-8" />
                    Registro de Comprador
                </h1>
                <p className="text-muted-foreground mt-2">
                    Inscribe nuevos clientes con toda la información necesaria para facturación y verificación.
                </p>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Datos de Facturación</CardTitle>
                            <CardDescription>Completa la información fiscal del cliente.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="razon-social">Razón Social / Nombres y Apellidos</Label>
                                <Input id="razon-social" placeholder="Ej: Empresa S.A. o Juan Pérez" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rif">RIF / Cédula de Identidad</Label>
                                <Input id="rif" placeholder="Ej: J-12345678-9 o V-12345678" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input id="email" type="email" placeholder="contacto@empresa.com" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="telefono">Teléfono</Label>
                                <Input id="telefono" type="tel" placeholder="0412-1234567" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="direccion">Dirección Fiscal</Label>
                                <Input id="direccion" placeholder="Ej: Av. Principal, Edificio Centro, Caracas" required />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Verificación Facial</CardTitle>
                            <CardDescription>Captura una foto del rostro del cliente para mayor seguridad.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-4">
                            <div className="w-full aspect-video bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
                                {hasCameraPermission === false && (
                                    <Alert variant="destructive" className="m-4">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>Cámara No Disponible</AlertTitle>
                                        <AlertDescription>
                                            No se pudo acceder a la cámara. Por favor, verifica los permisos en tu navegador.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {hasCameraPermission && !capturedImage && (
                                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                                )}
                                {capturedImage && (
                                    <img src={capturedImage} alt="Foto capturada" className="w-full h-full object-cover" />
                                )}
                            </div>
                             <canvas ref={canvasRef} className="hidden"></canvas>
                             {hasCameraPermission && !capturedImage && (
                                <Button type="button" onClick={handleCapture}>
                                    <Camera className="mr-2"/> Capturar Foto
                                </Button>
                             )}
                             {capturedImage && (
                                 <Button type="button" variant="outline" onClick={handleRetake}>
                                    <RefreshCw className="mr-2"/> Volver a Tomar
                                </Button>
                             )}
                        </CardContent>
                    </Card>
                </div>
                 <CardFooter className="mt-8 p-0">
                    <Button type="submit" size="lg" className="w-full text-lg">
                        Registrar Comprador
                    </Button>
                </CardFooter>
            </form>
            
            <section className="mt-12">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Cpu className="text-primary"/> Proceso Automatizado: Pre-Registro de Clientes</CardTitle>
                        <CardDescription>Esta funcionalidad, conocida como Pre-registro o Facturación Rápida (Quick Billing), agiliza las ventas y asegura el cumplimiento con el SENIAT.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-lg flex items-center gap-2"><User className="h-5 w-5"/> 1. Módulos de Registro y Validación Inicial</h4>
                            <ul className="list-disc pl-8 mt-2 space-y-2 text-muted-foreground">
                                <li><strong>Captura de Datos:</strong> El cliente se registra con su Cédula/RIF, nombre completo y dirección fiscal.</li>
                                <li><strong>Validación con OCR:</strong> El sistema utiliza la foto de la cédula para rellenar campos automáticamente, minimizando errores.</li>
                                <li><strong>Verificación de RIF:</strong> Se valida la información contra bases de datos públicas para asegurar el cumplimiento fiscal antes de la primera venta.</li>
                                <li><strong>Ficha Única de Cliente:</strong> Se crea un perfil único en la base de datos, vinculado a la Cédula/RIF.</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold text-lg flex items-center gap-2"><FileText className="h-5 w-5"/> 2. Automatización en el Punto de Venta (TPV)</h4>
                            <ul className="list-disc pl-8 mt-2 space-y-2 text-muted-foreground">
                                <li><strong>Búsqueda por Cédula/RIF:</strong> El cajero solo necesita ingresar el número de identificación del cliente.</li>
                                <li><strong>Carga Instantánea de Datos:</strong> El sistema carga automáticamente todos los datos fiscales en el encabezado de la factura.</li>
                                <li><strong>Facturación Rápida:</strong> El cajero se enfoca solo en escanear los productos mientras el sistema gestiona el formato de factura del SENIAT, el cálculo de IVA y el número de control.</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold text-lg flex items-center gap-2"><Shield className="h-5 w-5"/> 3. Seguridad y Cumplimiento</h4>
                             <ul className="list-disc pl-8 mt-2 space-y-2 text-muted-foreground">
                                <li><strong>Integridad de Datos:</strong> Una vez validados, los datos fiscales clave (RIF, Razón Social) se bloquean en el TPV para evitar modificaciones.</li>
                                <li><strong>Verificación Final:</strong> El cajero puede verificar rápidamente que la persona que compra coincide con la cédula ingresada, añadiendo una capa final de seguridad.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
