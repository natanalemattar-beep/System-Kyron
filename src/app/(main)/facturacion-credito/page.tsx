
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePlus, PlusCircle, Trash2, CreditCard, CheckCircle, Download, Smartphone, Lock, Unlock, Mail, Bot, Loader2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const initialClientes = [
    { id: "CLI-001", nombre: "Tech Solutions LLC", bloqueado: false, email: "billing@techsolutions.com", telefono: "+1 (555) 123-4567" },
    { id: "CLI-002", nombre: "Innovate Corp", bloqueado: true, email: "accounts@innovatecorp.com", telefono: "+44 20 7946 0958" },
    { id: "CLI-003", nombre: "Marketing Pro", bloqueado: false, email: "contact@marketingpro.net", telefono: "+58 (412) 555-1234" },
];

const initialFacturas = [
    { id: "FACC-001", clienteId: "CLI-001", cliente: "Tech Solutions LLC", fechaEmision: "2024-07-25", fechaVencimiento: "2024-08-24", monto: 5500, estado: "Pendiente", metodo: "Crédito Directo" },
    { id: "FACC-002", clienteId: "CLI-002", cliente: "Innovate Corp", fechaEmision: "2024-06-15", fechaVencimiento: "2024-07-15", monto: 3200, estado: "Vencida", metodo: "Crédito Directo" },
    { id: "FACC-003", clienteId: "CLI-003", cliente: "Marketing Pro", fechaEmision: "2024-07-20", fechaVencimiento: "2024-08-20", monto: 800, estado: "Pendiente", metodo: "Cashea" },
];

const casheaLevels = [
    { level: 1, name: "Semilla", requirements: "Nivel base", initialPayment: "60%", moreQuotas: "No" },
    { level: 2, name: "Raíz", requirements: "5 cuotas pagadas a tiempo o $120 en compras", initialPayment: "50%", moreQuotas: "No" },
    { level: 3, name: "Hoja", requirements: "10 cuotas pagadas a tiempo o $400 en compras", initialPayment: "40% (Desde 30% en aliados sel.)", moreQuotas: "SÍ" },
    { level: 4, name: "Tronco", requirements: "20 cuotas pagadas a tiempo o $800 en compras", initialPayment: "40% (Desde 25% en aliados sel.)", moreQuotas: "SÍ" },
    { level: 5, name: "Árbol", requirements: "40 cuotas pagadas a tiempo o $2000 en compras", initialPayment: "40% (Desde 20% en aliados sel.)", moreQuotas: "SÍ" },
    { level: 6, name: "Araguaney", requirements: "80 cuotas pagadas a tiempo o $4000 en compras", initialPayment: "40% (Desde 20% en aliados sel. y pronto desde 0%)", moreQuotas: "SÍ" },
];

const kreceLevels = [
    { level: 'Azul', name: "Azul (Base)", initialPayment: "40% Inicial" },
    { level: 'Plata', name: "Plata", initialPayment: "35% Inicial" },
    { level: 'Oro', name: "Oro", initialPayment: "30% Inicial" },
    { level: 'Platino', name: "Platino", initialPayment: "25% Inicial" },
];

const rapikomLines = [
  { id: 'clasica', name: 'Línea Clásica (3 cuotas)' },
  { id: 'express', name: 'Línea Express (1-2 cuotas)' },
];

const internationalOptions = {
    europe: [
        { name: "Klarna", description: "Ofrece servicios BNPL en varios países europeos como el Reino Unido, Alemania, Suecia y España." },
        { name: "Afterpay", description: "Ampliamente disponible en Europa, con opciones de pago fraccionado para compras en línea." },
        { name: "PayPal", description: 'Incluye su opción "Paga en 4" en algunos países europeos.' },
    ],
    arab_world: [
        { name: "Tarjetas de crédito y débito", description: "Son el método de pago más común, permitiendo pagos a plazos según el banco emisor." },
        { name: "Plataformas de financiamiento", description: "Existen plataformas de financiamiento locales y regionales que permiten la compra de productos y servicios en cuotas." },
    ],
    how_to_find: [
        "Buscar en tiendas: Pregunta en tiendas de ropa, electrónica y otros comercios si ofrecen financiamiento o pago a plazos.",
        "Usar filtros de búsqueda: Utiliza los filtros de búsqueda en tiendas en línea o en las aplicaciones de tus comercios favoritos para encontrar opciones de pago en cuotas.",
    ]
}


type Item = { id: number; descripcion: string; cantidad: number; precio: number };
type Factura = typeof initialFacturas[0];
type Cliente = typeof initialClientes[0];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Pagada: "default",
  Pendiente: "secondary",
  Vencida: "destructive",
};

export default function FacturacionCreditoPage() {
    const [facturas, setFacturas] = useState<Factura[]>(initialFacturas);
    const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
    const [items, setItems] = useState<Item[]>([{ id: 1, descripcion: '', cantidad: 1, precio: 0 }]);
    const [metodoCredito, setMetodoCredito] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();
    
    const totalFactura = items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

    const handleAddItem = () => {
        setItems([...items, { id: Date.now(), descripcion: '', cantidad: 1, precio: 0 }]);
    };

    const handleRemoveItem = (id: number) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };
    
    const handleCreateInvoice = () => {
        toast({
            title: "Factura a Crédito Creada",
            description: "La nueva factura se ha registrado como pendiente de cobro.",
        });
    }

    const handleRegisterPayment = (facturaId: string, clienteId: string) => {
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) return;
        
        setIsProcessing(true);
        const { dismiss } = toast({
            title: "Verificando pago...",
            description: "Estamos confirmando la transacción con la entidad bancaria.",
            action: <Loader2 className="h-5 w-5 animate-spin" />,
        });

        setTimeout(() => {
            setIsProcessing(false);
            dismiss();

            setFacturas(facturas.map(f => f.id === facturaId ? { ...f, estado: "Pagada" } : f));
            
            toast({
                title: "Pago Verificado y Registrado",
                description: `Constancia de pago enviada a ${cliente.nombre} por correo y WhatsApp.`,
                action: <CheckCircle className="text-green-500" />
            });
        }, 2000);
    }
    
    const toggleBlockCustomer = (clienteId: string, nombreCliente: string) => {
        setClientes(clientes.map(c => {
            if (c.id === clienteId) {
                const isBlocked = !c.bloqueado;
                toast({
                    title: `Cliente ${isBlocked ? 'Bloqueado' : 'Desbloqueado'}`,
                    description: `${nombreCliente} ha sido ${isBlocked ? 'bloqueado por impago.' : 'desbloqueado.'}`,
                    variant: isBlocked ? 'destructive' : 'default'
                });
                return { ...c, bloqueado: !c.bloqueado };
            }
            return c;
        }));
    };
    
    const handleNotifyCustomer = (cliente: Cliente) => {
        toast({
            title: "Notificación Enviada",
            description: `Se ha enviado un recordatorio de pago a ${cliente.nombre} al correo ${cliente.email}.`,
        });
    };

    return (
        <div className="p-4 md:p-8 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <CreditCard className="h-8 w-8" />
                        Facturación a Crédito y Financiamiento
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Genera facturas, gestiona cuentas por cobrar y conoce las plataformas de financiamiento.
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Crear Factura a Crédito
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Nueva Factura a Crédito</DialogTitle>
                            <DialogDescription>
                                Completa los datos del cliente, los items y las condiciones de pago.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cliente">Cliente</Label>
                                    <Select>
                                        <SelectTrigger id="cliente">
                                            <SelectValue placeholder="Selecciona un cliente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {initialClientes.map(c => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="metodo-credito">Método de Crédito</Label>
                                     <Select onValueChange={setMetodoCredito}>
                                        <SelectTrigger id="metodo-credito">
                                            <SelectValue placeholder="Selecciona el método" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="directo">Crédito Directo Empresa</SelectItem>
                                            <SelectItem value="cashea">Cashea</SelectItem>
                                            <SelectItem value="krece">Krece</SelectItem>
                                            <SelectItem value="rapikom">Rapikom</SelectItem>
                                            <SelectItem value="popclik">Popclik</SelectItem>
                                            <SelectItem value="zueno">Zueño</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             {metodoCredito === 'cashea' && (
                                <div className="space-y-2 animate-in fade-in">
                                    <Label htmlFor="cashea-level">Nivel de Cliente en Cashea</Label>
                                    <Select>
                                        <SelectTrigger id="cashea-level">
                                            <SelectValue placeholder="Seleccionar nivel..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {casheaLevels.map(l => (
                                                <SelectItem key={l.level} value={String(l.level)}>Nivel {l.level}: {l.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                )}
                            <div className="space-y-2 pt-4">
                                <Label>Items de la Factura</Label>
                                <div className="space-y-2">
                                    {items.map((item, index) => (
                                        <div key={item.id} className="flex gap-2 items-center">
                                            <Input placeholder="Descripción del producto o servicio" className="flex-grow" />
                                            <Input type="number" placeholder="Cant." className="w-20" defaultValue={1} />
                                            <Input type="number" placeholder="Precio" className="w-28" />
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} disabled={items.length <= 1}>
                                                <Trash2 className="h-4 w-4 text-destructive"/>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" size="sm" onClick={handleAddItem}>
                                    <PlusCircle className="mr-2 h-4 w-4"/> Añadir Item
                                </Button>
                            </div>
                        </div>
                        <DialogFooter className="border-t pt-4">
                            <div className="flex justify-between items-center w-full">
                                <span className="text-lg font-bold">Total: {formatCurrency(totalFactura, 'Bs.')}</span>
                                <Button onClick={handleCreateInvoice}>Guardar Factura</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Guía de Plataformas de Financiamiento</CardTitle>
                    <CardDescription>
                        Información sobre las principales aplicaciones de "Compra Ahora, Paga Después" (BNPL) en Venezuela.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="cashea">
                        <TabsList className="grid w-full grid-cols-6">
                            <TabsTrigger value="cashea">Cashea</TabsTrigger>
                            <TabsTrigger value="lysto">Lysto</TabsTrigger>
                            <TabsTrigger value="zueno">Zueño</TabsTrigger>
                            <TabsTrigger value="krece">Krece</TabsTrigger>
                            <TabsTrigger value="rapikom">Rapikom</TabsTrigger>
                            <TabsTrigger value="popclik">Popclik</TabsTrigger>
                        </TabsList>
                        <TabsContent value="cashea" className="mt-6">
                           <Card className="bg-secondary/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Smartphone/> Guía Completa de Cashea</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                     <div>
                                        <h4 className="font-semibold mb-2">Proceso de Compra:</h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                                            <li><strong>Registro:</strong> Descarga la aplicación, completa tus datos (nombre, cédula, fecha de nacimiento) y verifica tu identidad con una foto de tu cédula y una selfie.</li>
                                            <li><strong>Línea de compra:</strong> La aplicación te asigna una línea de compra inicial que varía según tu perfil.</li>
                                            <li><strong>Compra en tienda:</strong> Al pagar, escaneas un código QR en la caja y pagas el inicial en el punto de venta.</li>
                                            <li><strong>Compra en línea:</strong> Seleccionas Cashea como método de pago al hacer la compra en la aplicación.</li>
                                            <li><strong>Pago de cuotas:</strong> El resto del monto se divide en cuotas sin intereses que se cancelan cada 14 días.</li>
                                        </ol>
                                     </div>
                                     <div>
                                        <h4 className="font-semibold mb-2">Características Principales:</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5"/> <span><strong>Sin intereses:</strong> La suma del pago inicial y las cuotas es igual al precio del producto.</span></li>
                                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5"/> <span><strong>Compra inmediata:</strong> Disfrutas del producto desde el primer momento.</span></li>
                                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5"/> <span><strong>Flexibilidad:</strong> El "Modo Más Cuotas" permite financiar en 6, 9 o 12 cuotas.</span></li>
                                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5"/> <span><strong>Línea Cotidiana:</strong> Úsalo para compras del día a día en supermercados y farmacias.</span></li>
                                             <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5"/> <span><strong>Expansión de crédito:</strong> Solicita un aumento de tu línea de compra desde la app.</span></li>
                                        </ul>
                                     </div>
                                     
                                    <div>
                                        <h4 className="font-semibold pt-4">Club Cashea Más: Niveles y Beneficios</h4>
                                        <Table className="mt-2">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Nivel</TableHead>
                                                    <TableHead>Requisitos para Subir</TableHead>
                                                    <TableHead>Pago Inicial</TableHead>
                                                    <TableHead>Acceso a Más Cuotas</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {casheaLevels.map(level => (
                                                    <TableRow key={level.level}>
                                                        <TableCell className="font-bold">{level.level}: {level.name}</TableCell>
                                                        <TableCell className="text-xs">{level.requirements}</TableCell>
                                                        <TableCell className="text-xs">{level.initialPayment}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={level.moreQuotas ? 'default' : 'outline'}>{level.moreQuotas ? "SÍ" : "No"}</Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    
                                     <div>
                                        <h4 className="font-semibold pt-4">Comisiones por Servicio para el Comercio:</h4>
                                          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                            <li><strong>4%</strong> para tiendas físicas de la Línea Principal.</li>
                                            <li><strong>3%</strong> para supermercados y farmacias de la Línea Cotidiana.</li>
                                            <li><strong>5%</strong> para restaurantes y bebidas de la Línea Cotidiana.</li>
                                            <li><strong>6%</strong> para las ventas realizadas a través de Cashea Online.</li>
                                         </ul>
                                     </div>
                                </CardContent>
                           </Card>
                        </TabsContent>
                        <TabsContent value="lysto" className="mt-6">
                            <Card className="bg-secondary/30">
                                <CardHeader>
                                    <CardTitle>Lysto</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Lysto funciona como una plataforma de pago en cuotas sin intereses que permite a los usuarios comprar bienes y servicios y pagarlos en plazos fijos. Para usarla, debes descargar la aplicación, registrarte con tus datos y subir tu identificación para obtener una línea de compra aprobada. Al hacer una compra en un comercio aliado, escaneas el código QR, eliges el plan de pago en cuotas sin interés y haces un pago inicial. El resto del monto se pagará en las cuotas acordadas, con fechas de pago fijas los días 1 y 16 de cada mes, coincidiendo con la quincena para facilitar las finanzas.
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="zueno" className="mt-6">
                             <Card className="bg-secondary/30">
                                <CardHeader>
                                    <CardTitle>Zueño</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Se presenta como una alternativa más flexible que Cashea. La principal diferencia es que <span className="font-semibold text-foreground">el usuario puede elegir el monto de las cuotas y la frecuencia de los pagos</span>, adaptando el plan de financiamiento a su ritmo y capacidad económica.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="krece" className="mt-6">
                            <Card className="bg-secondary/30">
                                <CardHeader>
                                    <CardTitle>Krece</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Fue una de las primeras aplicaciones en ofrecer crédito al consumo en Venezuela. Permite financiar la compra de productos, especialmente tecnología como celulares, en varias cuotas.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="rapikom" className="mt-6">
                             <Card className="bg-secondary/30">
                                <CardHeader>
                                    <CardTitle>Rapikom</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Otra aplicación que compite directamente en el mercado de "Compra Ahora, Paga Después", ofreciendo servicios de financiamiento y crédito para la compra de diversos productos en el país.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="popclik" className="mt-6">
                            <Card className="bg-secondary/30">
                                <CardHeader>
                                    <CardTitle>Popclik</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Es una plataforma que también surgió como una alternativa para financiar compras, permitiendo a los consumidores adquirir productos de forma más accesible a través de un esquema de pagos en cuotas.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Alternativas de Financiamiento Internacional</CardTitle>
                    <CardDescription>
                        Información sobre servicios "Compra Ahora, Paga Después" (BNPL) en Europa, el mundo árabe y otras regiones.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Europa</AccordionTrigger>
                            <AccordionContent className="pt-2">
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    {internationalOptions.europe.map(opt => (
                                        <li key={opt.name}><strong>{opt.name}:</strong> {opt.description}</li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Mundo Árabe y Otras Regiones</AccordionTrigger>
                            <AccordionContent className="pt-2">
                                 <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    {internationalOptions.arab_world.map(opt => (
                                        <li key={opt.name}><strong>{opt.name}:</strong> {opt.description}</li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-3">
                            <AccordionTrigger>¿Cómo encontrar estas alternativas?</AccordionTrigger>
                            <AccordionContent className="pt-2">
                                 <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    {internationalOptions.how_to_find.map((tip, index) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Historial de Facturas a Crédito</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nro. Factura</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Método</TableHead>
                                <TableHead>Vencimiento</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                                <TableHead className="text-center">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {facturas.map((factura) => {
                                const cliente = clientes.find(c => c.id === factura.clienteId);
                                return (
                                <TableRow key={factura.id}>
                                    <TableCell className="font-mono">{factura.id}</TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {cliente?.bloqueado && <Lock className="h-4 w-4 text-destructive" />}
                                            {factura.cliente}
                                        </div>
                                    </TableCell>
                                    <TableCell>{factura.metodo}</TableCell>
                                    <TableCell>{formatDate(factura.fechaVencimiento)}</TableCell>
                                    <TableCell className="text-right font-semibold">{formatCurrency(factura.monto, 'Bs.')}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={statusVariant[factura.estado]}>{factura.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        {factura.estado !== "Pagada" && (
                                            <Button size="sm" variant="outline" onClick={() => handleRegisterPayment(factura.id, factura.clienteId)} disabled={isProcessing}>
                                                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                                                Registrar Pago
                                            </Button>
                                        )}
                                        {factura.estado === "Vencida" && factura.metodo === "Crédito Directo" && cliente && (
                                           <>
                                             <Button 
                                                size="sm" 
                                                variant="outline"
                                                onClick={() => handleNotifyCustomer(cliente)}
                                            >
                                                <Mail className="mr-2 h-4 w-4"/>
                                                Notificar
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant={cliente?.bloqueado ? 'secondary' : 'destructive'}
                                                onClick={() => toggleBlockCustomer(factura.clienteId, factura.cliente)}
                                            >
                                                {cliente?.bloqueado ? <Unlock className="mr-2 h-4 w-4"/> : <Lock className="mr-2 h-4 w-4"/>}
                                                {cliente?.bloqueado ? 'Desbloquear' : 'Bloquear'}
                                            </Button>
                                           </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
