
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePlus, PlusCircle, Trash2, CreditCard, CheckCircle, Download, Smartphone, Lock, Unlock, Mail, Bot } from "lucide-react";
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
    { id: "CLI-001", nombre: "Tech Solutions LLC", bloqueado: false, email: "billing@techsolutions.com" },
    { id: "CLI-002", nombre: "Innovate Corp", bloqueado: true, email: "accounts@innovatecorp.com" },
    { id: "CLI-003", nombre: "Marketing Pro", bloqueado: false, email: "contact@marketingpro.net" },
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

    const handleRegisterPayment = (facturaId: string) => {
        setFacturas(facturas.map(f => f.id === facturaId ? { ...f, estado: "Pagada" } : f));
        toast({
            title: "Pago Registrado",
            description: `Se ha marcado la factura ${facturaId} como pagada.`,
        });
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
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cliente">Cliente</Label>
                                    <Select>
                                        <SelectTrigger id="cliente">
                                            <SelectValue placeholder="Selecciona un cliente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clientes.map(c => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}
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
                            </div>
                            
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
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="cashea">Cashea</TabsTrigger>
                            <TabsTrigger value="zueno">Zueño</TabsTrigger>
                            <TabsTrigger value="krece">Krece</TabsTrigger>
                            <TabsTrigger value="rapikom">Rapikom</TabsTrigger>
                            <TabsTrigger value="popclik">Popclik</TabsTrigger>
                        </TabsList>
                        <TabsContent value="cashea" className="mt-6">
                           <Card className="bg-secondary/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Smartphone/> ¿Cómo funciona Cashea?</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                     <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                                        <li><strong>Descarga la app y regístrate:</strong> El usuario debe validar su identidad con su cédula y una selfie.</li>
                                        <li><strong>Obtén una línea de compra:</strong> Cashea preaprueba un monto en minutos.</li>
                                        <li><strong>Realiza la compra:</strong> El cliente paga un porcentaje inicial en la tienda y se lleva el producto.</li>
                                        <li><strong>Paga las cuotas:</strong> El resto se divide en cuotas fijas (generalmente 3) sin intereses, que se pagan cada 14 días desde la app.</li>
                                    </ol>
                                     <h4 className="font-semibold pt-2">Beneficios Clave:</h4>
                                     <ul className="space-y-2">
                                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/> <span><strong>Sin Intereses:</strong> El precio final es el mismo que el precio de contado.</span></li>
                                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/> <span><strong>Club Cashea Más:</strong> Pagar a tiempo acumula puntos para subir de nivel y obtener mejores beneficios (más línea de crédito, más cuotas).</span></li>
                                     </ul>
                                     
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
                                                            <Badge variant={level.moreQuotas === 'SÍ' ? 'default' : 'outline'}>{level.moreQuotas}</Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    
                                     <div>
                                        <h4 className="font-semibold pt-4">¿Qué es el "Modo Más Cuotas"?</h4>
                                        <p className="text-sm text-muted-foreground mt-2">Es un beneficio para usuarios de nivel 3 o superior que permite financiar compras en 6, 9 o hasta 12 cuotas sin interés en tiendas y productos seleccionados, comprando exclusivamente desde la app de Cashea.</p>
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
                                            <Button size="sm" variant="outline" onClick={() => handleRegisterPayment(factura.id)}>
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
