
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
    BookOpen, 
    Smartphone, 
    ShieldCheck, 
    ShoppingCart, 
    Users, 
    Gavel, 
    Recycle, 
    Cpu, 
    ArrowRight,
    FileText,
    Zap,
    Lock,
    Globe,
    Activity,
    Search,
    Download,
    Printer,
    CheckCircle2,
    Calculator,
    CreditCard,
    FileScan,
    BrainCircuit,
    Fingerprint,
    Radio,
    TabletSmartphone,
    Info,
    AlertTriangle,
    ChevronRight,
    Layers,
    Target
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const manualModules = [
    {
        id: "acceso",
        title: "1. Protocolo de Acceso y Seguridad",
        icon: Lock,
        description: "Gestión de entrada a los nodos del ecosistema y protección de identidad.",
        content: [
            {
                sub: "Selección de Portal",
                text: "Al ingresar a la plataforma, el sistema presenta una matriz de accesos. Debe identificar su rol (Ciudadano, Empresa, Socio, etc.). Cada portal cuenta con medidas de seguridad biométrica y cifrado de grado militar."
            },
            {
                sub: "Autenticación de Doble Factor (2FA)",
                text: "Para operaciones de alto impacto (nóminas, declaraciones fiscales), el sistema requerirá un código dinámico de 6 dígitos generado en su dispositivo vinculado. Este protocolo es obligatorio para el nivel de seguridad 2.6.5."
            },
            {
                sub: "Bóveda de Credenciales",
                text: "Sus claves nunca se almacenan en texto plano. Utilizamos algoritmos de hashing asimétrico para asegurar que solo usted posea el control de su nodo operativo."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Gestión de Telecomunicaciones 5G",
        icon: Radio,
        description: "Activación de líneas, gestión de datos y provisionamiento de hardware.",
        content: [
            {
                sub: "Activación de Líneas Kyron",
                text: "En el módulo 'Venta de Líneas', ingrese el RIF o Cédula del titular. El sistema validará la identidad y permitirá elegir entre numeración clásica o personalizada. El proceso de asignación toma menos de 15 segundos."
            },
            {
                sub: "Despliegue de eSIM",
                text: "Seleccione el medio 'eSIM (Digital)'. Tras procesar el pago, el sistema generará un código QR único. Escanee este código con su smartphone compatible para instalar el perfil de datos Kyron 5G de forma instantánea."
            },
            {
                sub: "Control de Flota Corporativa",
                text: "Los administradores pueden monitorear el consumo de datos de todas las líneas vinculadas al RIF de la empresa, establecer límites de navegación y realizar recargas masivas desde el dashboard de Telecom."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Terminal de Ventas (TPV) Inteligente",
        icon: TabletSmartphone,
        description: "Operación de ventas rápidas, facturación fiscal y control de caja.",
        content: [
            {
                sub: "Carga Fiscal Automática",
                text: "Gracias a la integración con el Ledger de Identidad, al ingresar el identificador del cliente en el TPV, todos los datos de facturación (Razón Social, Dirección) se cargan sin intervención manual, eliminando errores de transcripción."
            },
            {
                sub: "Multimoneda y Tasa Oficial",
                text: "El sistema actualiza automáticamente la tasa de cambio oficial. Puede registrar pagos combinados (ej. parte en Efectivo USD y parte en Pago Móvil VES) con cálculo inmediato del vuelto."
            },
            {
                sub: "Protocolo de Arqueo",
                text: "Al final de cada turno, el cajero debe ingresar el conteo físico de billetes por denominación. El sistema detectará automáticamente sobrantes o faltantes, generando una alerta al supervisor en caso de discrepancias mayores al 0.5%."
            }
        ]
    },
    {
        id: "contabilidad",
        title: "4. Blindaje Fiscal SENIAT",
        icon: Calculator,
        description: "Automatización de obligaciones tributarias con 0% de riesgo de error.",
        content: [
            {
                sub: "Libros Electrónicos",
                text: "Los Libros de Compra y Venta se alimentan en tiempo real de cada transacción procesada. Se generan en formato PDF y TXT listo para ser cargado en el portal fiscal nacional, cumpliendo con la Prov. Adm. 0071."
            },
            {
                sub: "Declaración de IVA",
                text: "El sistema calcula dinámicamente el Débito y Crédito fiscal. Al cerrar el periodo, el módulo de 'Declaración de IVA' muestra el monto exacto a pagar, permitiendo la liquidación mediante conciliación bancaria directa."
            },
            {
                sub: "Comprobantes AR-C",
                text: "Generación masiva de comprobantes de retención de ISLR para empleados y proveedores. Cada documento incluye un código QR de validación que permite verificar su autenticidad ante cualquier auditoría."
            }
        ]
    },
    {
        id: "rrhh",
        title: "5. Gestión de Talento y Nómina (LOTTT)",
        icon: Users,
        description: "Administración de personal, cálculos laborales y reclutamiento.",
        content: [
            {
                sub: "Cálculo de Nómina",
                text: "El motor de nómina procesa automáticamente sueldos base, bonificaciones, horas extras (diurnas/nocturnas) y deducciones de ley (IVSS, FAOV, Paro Forzoso) según el calendario de pagos de la empresa."
            },
            {
                sub: "Calculadora de Prestaciones",
                text: "Permite proyectar liquidaciones y finiquitos basados en la antigüedad acumulada. Incluye cálculos de garantía de antigüedad, días adicionales y utilidades fraccionadas según la LOTTT vigente."
            },
            {
                sub: "Gestión de Comunicados",
                text: "Los empleados pueden enviar notificaciones de inasistencia o permisos desde su portal personal. RR.HH. recibe estas alertas y puede aprobarlas o rechazarlas con un solo clic, actualizando el registro de asistencia automáticamente."
            }
        ]
    },
    {
        id: "legal",
        title: "6. Escritorio Jurídico y Corporativo",
        icon: Gavel,
        description: "Gestión de contratos, poderes y cumplimiento regulatorio.",
        content: [
            {
                sub: "Repositorio de Contratos Pro",
                text: "Acceda a una biblioteca de modelos de contratos (Servicios, Alquiler, Licencias). El sistema permite pre-llenar los campos con los datos de las partes y exportar el documento listo para firma."
            },
            {
                sub: "Control de Poderes",
                text: "Registre los datos de registro (Tomo, Número, Notaría) de los apoderados legales. El sistema emitirá alertas visuales 30 días antes del vencimiento de cualquier representación o permiso de alcaldía."
            },
            {
                sub: "Cumplimiento SAPI",
                text: "Guía detallada para el registro de marcas y patentes. Incluye modelos de cartas de solicitud y seguimiento de pasos ante el Servicio Autónomo de la Propiedad Intelectual."
            }
        ]
    },
    {
        id: "ciudadano",
        title: "7. Portal Ciudadano e Identidad 3D",
        icon: Fingerprint,
        description: "Gestión personal de documentos, salud y trámites civiles.",
        content: [
            {
                sub: "ID Digital Interactiva",
                text: "Su tarjeta digital 3D es el eje de su identidad en el ecosistema. Contiene su información de contacto verificada y permite exportar su ficha vCard para compartirla con socios comerciales."
            },
            {
                sub: "Bóveda Civil",
                text: "Almacenamiento seguro de copias certificadas de Partidas de Nacimiento, Actas de Matrimonio y Antecedentes Penales. Cada documento está cifrado y solo es accesible mediante sus credenciales biométricas."
            },
            {
                sub: "Directorio de Salud",
                text: "Acceso a la red de médicos y clínicas afiliadas. Permite agendar citas y consultar la cobertura de seguros vinculada a su identidad corporativa o personal."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "8. Reciclaje Magnético (Fundación Kyron)",
        icon: Recycle,
        description: "Monetización de hábitos ambientales mediante tecnología de inducción.",
        content: [
            {
                sub: "Uso de Smart Bins",
                text: "Ubique una papelera inteligente. Identifíquese con su código QR. La tecnología de magnetismo se activará para asegurar y clasificar sus envases metálicos y plásticos PET."
            },
            {
                sub: "Eco-Créditos",
                text: "Cada envase validado inyecta puntos en su billetera digital. Estos activos son inmutables y pueden canjearse por descuentos en la red de comercios aliados (Cafeterías, Cines, Tiendas)."
            },
            {
                sub: "Impacto Blockchain",
                text: "Cada gramo reciclado se registra en el ledger ambiental de la Fundación Kyron, permitiendo a las empresas certificar su huella de carbono positiva para beneficios fiscales."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "9. Ingeniería y Planificación IA",
        icon: Cpu,
        description: "Herramientas de diseño, presupuesto y factibilidad económica.",
        content: [
            {
                sub: "Generación de Planos IA",
                text: "Suba una fotografía de un local u oficina. El motor de visión artificial identificará los perímetros y generará un plano a escala detallado, identificando áreas de trabajo y flujos de circulación."
            },
            {
                sub: "Presupuestos de Obra",
                text: "Calculadora automática de materiales (porcelanato, pintura, iluminación) basada en las medidas del plano generado. Estima rendimientos y costos de mano de obra para proyectos de remodelación."
            },
            {
                sub: "Análisis de Factibilidad",
                text: "Evalúe la viabilidad de nuevos proyectos mediante indicadores VAN (Valor Actual Neto) y TIR (Tasa Interna de Retorno). Incluye proyecciones de flujo de caja a 5 años para inversionistas."
            }
        ]
    },
    {
        id: "bi",
        title: "10. Inteligencia de Negocio (Marketing BI)",
        icon: BrainCircuit,
        description: "Análisis de rentabilidad, competencia y estrategias de crecimiento.",
        content: [
            {
                sub: "Estrategias de Venta IA",
                text: "El sistema analiza el historial de su inventario y detecta productos 'estrella' y productos de 'baja rotación', sugiriendo automáticamente combos y promociones para maximizar el margen de utilidad."
            },
            {
                sub: "Análisis de Sentimiento",
                text: "Pegue las reseñas de sus clientes. La IA identificará la satisfacción real, puntos de dolor y oportunidades de mejora en el servicio al cliente basándose en el lenguaje natural."
            },
            {
                sub: "Estudio Demográfico",
                text: "Herramienta para analizar el potencial de mercado en zonas específicas. Proporciona datos de población estipulada, densidad comercial y nivel de competencia para planes de expansión."
            }
        ]
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredModules = useMemo(() => {
        if (!searchQuery) return manualModules;
        const query = searchQuery.toLowerCase();
        return manualModules.filter(m => 
            m.title.toLowerCase().includes(query) || 
            m.description.toLowerCase().includes(query) ||
            m.content.some(c => c.sub.toLowerCase().includes(query) || c.text.toLowerCase().includes(query))
        );
    }, [searchQuery]);

    const handleDownload = (format: 'pdf' | 'word') => {
        toast({
            title: `PROTOCOLO ${format.toUpperCase()} INICIADO`,
            description: "Compilando expediente técnico de alta fidelidad...",
            action: <CheckCircle2 className="text-primary h-4 w-4" />
        });

        if (format === 'pdf') {
            window.print();
        } else {
            // Document Builder for Word
            const header = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <title>Manual Maestro Kyron v2.6.5</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; padding: 40px; }
                        h1 { color: #2563eb; text-align: center; font-size: 28pt; margin-bottom: 10px; border-bottom: 2px solid #2563eb; }
                        h2 { color: #1e40af; font-size: 18pt; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
                        h3 { color: #2563eb; font-size: 14pt; margin-top: 20px; }
                        p { font-size: 11pt; text-align: justify; margin-bottom: 10px; }
                        .footer { font-size: 8pt; text-align: center; color: #999; margin-top: 50px; border-top: 1px solid #eee; padding-top: 10px; }
                        .version { text-align: center; font-weight: bold; color: #666; font-size: 10pt; }
                    </style>
                </head>
                <body>
                    <h1>MANUAL MAESTRO DE USUARIO</h1>
                    <p class="version">SYSTEM KYRON v2.6.5 • ECOSISTEMA DE MISIÓN CRÍTICA</p>
                    <p style="text-align: center; font-style: italic;">Este documento constituye la guía oficial de operación para los módulos comerciales, civiles y tecnológicos de la plataforma.</p>
            `;
            
            let body = "";
            manualModules.forEach(mod => {
                body += `<h2>${mod.title}</h2><p><strong>Descripción General:</strong> ${mod.description}</p>`;
                mod.content.forEach(c => {
                    body += `<h3>• ${c.sub}</h3><p>${c.text}</p>`;
                });
            });

            const footer = `
                    <div class="footer">
                        © ${new Date().getFullYear()} System Kyron, C.A. • RIF J-12345678-9 • Todos los derechos reservados.<br/>
                        Documento generado automáticamente por el Nodo de Documentación Central.
                    </div>
                </body></html>
            `;

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(header + body + footer);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = `Manual_Kyron_v2.6.5_${new Date().toISOString().split('T')[0]}.doc`;
            fileDownload.click();
            document.body.removeChild(fileDownload);
        }
    };

    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-32 animate-in fade-in duration-1000">
            {/* Header Maestro con Estética HUD */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-primary pl-8 py-2 mt-10 print:hidden">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <BookOpen className="h-3 w-3" /> PROTOCOLO DOC-2026-X
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">Manual <span className="text-primary">Maestro</span></h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">Guía de Entrenamiento y Protocolos de Operación v2.6.5</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white hover:bg-primary/10 transition-all" onClick={() => handleDownload('word')}>
                        <FileText className="mr-2 h-4 w-4" /> EXPORTAR .DOC
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl" onClick={() => handleDownload('pdf')}>
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR PDF
                    </Button>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Panel de Control de Navegación (Sticky) */}
                <aside className="lg:col-span-4 space-y-8 print:hidden">
                    <Card className="glass-card p-10 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/40">
                        <CardHeader className="p-0 mb-8 border-b border-white/5 pb-6">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                                <Activity className="h-4 w-4 animate-pulse" /> Mapa de Ingeniería
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-2">
                            {manualModules.map((mod) => (
                                <Button 
                                    key={mod.id}
                                    variant="ghost" 
                                    className="w-full justify-start h-12 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all text-white/30 group relative overflow-hidden"
                                    onClick={() => document.getElementById(mod.id)?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <mod.icon className="mr-4 h-4 w-4 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                    {mod.title.split('. ')[1]}
                                    <ChevronRight className="absolute right-4 opacity-0 group-hover:opacity-40 transition-all h-3 w-3" />
                                </Button>
                            ))}
                        </CardContent>
                        <CardFooter className="p-0 pt-10 mt-10 border-t border-white/5">
                            <div className="flex items-center gap-4 text-[8px] font-black uppercase tracking-[0.2em] text-white/20 italic">
                                <ShieldCheck className="h-3 w-3 text-emerald-500" /> Protocolo Seguro Verificado
                            </div>
                        </CardFooter>
                    </Card>
                </aside>

                {/* Contenido de Entrenamiento Detallado */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="relative mb-16 print:hidden">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-primary/40" />
                        <Input 
                            placeholder="ESCRIBA EL NOMBRE DE UN MÓDULO O PROCEDIMIENTO..." 
                            className="h-20 pl-16 rounded-3xl bg-white/[0.03] border-white/10 text-white font-black uppercase text-xs tracking-widest focus-visible:ring-primary shadow-inner"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="space-y-12" id="manual-content">
                        {filteredModules.length > 0 ? filteredModules.map((mod) => (
                            <motion.section 
                                key={mod.id} 
                                id={mod.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="scroll-mt-32"
                            >
                                <Card className="glass-card rounded-[3rem] border-white/5 overflow-hidden bg-black/40 hover:border-primary/20 transition-all group print:bg-white print:text-black print:border-none">
                                    <CardHeader className="p-12 border-b border-white/5 flex flex-row items-center gap-8 bg-white/[0.01] print:bg-white">
                                        <div className="p-6 bg-primary/10 rounded-3xl border border-primary/20 shadow-glow transition-transform group-hover:rotate-6 print:hidden">
                                            <mod.icon className="h-10 w-10 text-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-white print:text-black">{mod.title}</CardTitle>
                                            <CardDescription className="text-xs font-bold uppercase tracking-widest opacity-40 text-primary print:text-gray-500">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-12 space-y-10">
                                        {mod.content.map((item, i) => (
                                            <div key={i} className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-px flex-1 bg-white/5 print:bg-gray-200" />
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic print:text-blue-700">{item.sub}</h4>
                                                    <div className="h-px w-8 bg-white/5 print:bg-gray-200" />
                                                </div>
                                                <p className="text-sm font-medium text-white/60 leading-relaxed text-justify indent-8 border-l-2 border-primary/10 pl-8 print:text-black print:border-gray-300">
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <CardFooter className="p-8 bg-white/[0.01] border-t border-white/5 flex justify-between items-center print:hidden">
                                        <div className="flex items-center gap-3">
                                            <Zap className="h-3.5 w-3.5 text-yellow-400" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Eficiencia Operativa: 100%</span>
                                        </div>
                                        <Button variant="link" className="text-[8px] font-black uppercase text-primary hover:tracking-widest transition-all">Ver video tutorial <ArrowRight className="ml-2 h-3 w-3"/></Button>
                                    </CardFooter>
                                </Card>
                            </motion.section>
                        )) : (
                            <div className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
                                <Search className="h-16 w-16 text-white/5 mx-auto mb-6" />
                                <p className="text-white/20 font-black uppercase tracking-[0.4em] text-sm">Sin resultados para su búsqueda</p>
                            </div>
                        )}
                    </div>

                    {/* Footer de Soporte de Misión Crítica */}
                    <Card className="bg-primary text-primary-foreground rounded-[3.5rem] p-16 text-center shadow-glow border-none relative overflow-hidden group print:hidden mt-20">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                            <BrainCircuit className="h-48 w-48" />
                        </div>
                        <div className="relative z-10 max-w-xl mx-auto space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] font-black uppercase tracking-[0.4em]">
                                <Activity className="h-3 w-3" /> Soporte 24/7 Nivel 3
                            </div>
                            <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none shadow-glow-text">¿Necesita Entrenamiento Personalizado?</h3>
                            <p className="text-base font-bold opacity-80 leading-relaxed italic">
                                Nuestro nodo de consultoría ofrece sesiones remotas de alta fidelidad para capacitar a sus equipos en el uso avanzado de la red Kyron.
                            </p>
                            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl h-16 px-12 font-black text-xs uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95">
                                CONTACTAR OFICIAL DE CUENTA
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
            
            {/* Disclaimer Legal HUD */}
            <div className="pt-20 text-center space-y-4 opacity-20 hover:opacity-100 transition-opacity duration-1000 print:hidden">
                <div className="flex justify-center gap-8 text-[8px] font-black uppercase tracking-[0.5em]">
                    <span>Cifrado: AES-512</span>
                    <span>Protocolo: TLS 1.3</span>
                    <span>Ledger: Verified</span>
                </div>
                <p className="max-w-2xl mx-auto text-[7px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                    Propiedad Intelectual Protegida. La divulgación de estos protocolos fuera del ecosistema Kyron sin autorización de los nodos socios conlleva sanciones legales según el Art. 226 del COT.
                </p>
            </div>
        </div>
    );
}
