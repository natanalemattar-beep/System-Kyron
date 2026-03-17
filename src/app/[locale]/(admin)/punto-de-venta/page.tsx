"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TabletSmartphone, Plus, Minus, X, CircleCheck as CheckCircle, Smartphone, Phone, Landmark, CreditCard, Banknote, Loader as Loader2, Search, Radio, Wallet, Lock, Clock, ShieldAlert, History, SquareCheck as CheckSquare, Settings2, ArrowRight } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const products = [
    { id: 1, name: "Resma de Papel Carta (500 Hojas)", price: 8.50, barcode: "7591234567890", image: "https://picsum.photos/seed/paper/200/200" },
    { id: 2, name: "Impresora Fiscal Térmica", price: 350.00, barcode: "7591234567891", image: "https://picsum.photos/seed/printer/200/200" },
    { id: 11, name: "Papelera Inteligente (Magnetismo)", price: 150.00, barcode: "7591234567900", image: "https://picsum.photos/seed/smartbin/200/200" },
    { id: 13, name: "SIM Card Física (Línea Nueva)", price: 5.00, barcode: "7591234567902", image: "https://picsum.photos/seed/simcard/200/200" },
    { id: 14, name: "eSIM Digital (Línea Nueva)", price: 10.00, barcode: "7591234567903", image: "https://picsum.photos/seed/esim/200/200" },
    { id: 3, name: "Punto de Venta Inalámbrico", price: 280.00, barcode: "7591234567892", image: "https://picsum.photos/seed/pos/200/200" },
    { id: 4, name: "Lector de Código de Barras USB", price: 95.00, barcode: "7591234567893", image: "https://picsum.photos/seed/scanner/200/200" },
    { id: 5, name: "Tóner de Repuesto para Impresora", price: 85.00, barcode: "7591234567894", image: "https://picsum.photos/seed/toner/200/200" },
    { id: 6, name: "Caja de Bolígrafos Negros (12 Unidades)", price: 5.00, barcode: "7591234567895", image: "https://picsum.photos/seed/pens/200/200" },
    { id: 9, name: "Licencia Anual Software Contable", price: 480.00, barcode: "7591234567898", image: "https://picsum.photos/seed/software/200/200" }
];

const cashiers = ["Cajero Principal", "Supervisor Ventas"];

const diasSemana = [
    { id: "lun", label: "Lunes" },
    { id: "mar", label: "Martes" },
    { id: "mie", label: "Miércoles" },
    { id: "jue", label: "Jueves" },
    { id: "vie", label: "Viernes" },
    { id: "sab", label: "Sábado" },
    { id: "dom", label: "Domingo" },
];

const exceptionsData = [
    { fecha: "2026-12-24", motivo: "Nochebuena", horario: "8:00 AM - 2:00 PM" },
    { fecha: "2026-12-25", motivo: "Navidad", horario: "Cerrado" },
    { fecha: "2027-01-01", motivo: "Año Nuevo", horario: "Cerrado" },
];

const turnReports = [
    { fecha: "25/07/2024", turno: "Mañana (8am-2pm)", empleado: "Carlos Pérez", total: 1250.50, transacciones: 15, cierre: "Ok" },
    { fecha: "25/07/2024", turno: "Tarde (2pm-8pm)", empleado: "María Gómez", total: 980.20, transacciones: 12, cierre: "Ok" },
];

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type Currency = "Bs." | "USD";
type PaymentMethod = "Punto de Venta" | "Pago Móvil" | "Transferencia" | "Efectivo" | "Billetera Kyron";

export default function PuntoDeVentaPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [currency, setCurrency] = useState<Currency>("Bs.");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [activeCashier, setActiveCashier] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [qrCodeData, setQrCodeData] = useState("");
    
    // Schedule States
    const [blockOutsideHours, setBlockOutsideHours] = useState(true);
    const [isManager, setIsManager] = useState(false); // Simulated manager role

    const { toast } = useToast();

    useEffect(() => {
        if (isReceiptOpen) {
            setQrCodeData(`SystemKyron-Factura-${Math.random().toString(36).substr(2, 9)}`);
        }
    }, [isReceiptOpen]);
    
    const addToCart = (product: typeof products[0]) => {
        if (!activeCashier) {
            toast({ variant: "destructive", title: "Acceso Denegado", description: "Debe seleccionar un cajero para iniciar una venta." });
            return;
        }
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: number, amount: number) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + amount;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter(Boolean) as CartItem[];
        });
    };
    
    const exchangeRate = 40.0;
    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
    const totalInCurrency = currency === 'Bs.' ? subtotal * exchangeRate : subtotal;
    const iva = totalInCurrency * 0.16;
    const total = totalInCurrency + iva;
    
    const handleCheckout = () => {
        if (cart.length === 0) return;

        // Simulated Schedule Check
        const now = new Date();
        const currentHour = now.getHours();
        const isOutsideHours = currentHour < 8 || currentHour >= 18; // Simulated 8am - 6pm

        if (blockOutsideHours && isOutsideHours && !isManager) {
            toast({
                variant: "destructive",
                title: "⚠️ OPERACIÓN BLOQUEADA",
                description: "Fuera de horario laboral. Operación no permitida. Contacta a tu gerente para autorización maestra.",
            });
            return;
        }

        setIsCheckoutOpen(true);
    };

    const handleFinalizeTransaction = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsCheckoutOpen(false);
            setIsReceiptOpen(true);
            toast({ 
                title: "Venta Registrada", 
                description: paymentMethod === "Billetera Kyron" 
                    ? "Transacción sellada en Ledger Kyron y Eco-Créditos procesados." 
                    : "La factura fiscal ha sido generada.", 
                action: <CheckCircle className="text-green-500" /> 
            });
        }, 1500);
    };

    const handleSaveSchedule = () => {
        toast({
            title: "Configuración Guardada",
            description: "Los horarios laborales y turnos han sido actualizados en el sistema central.",
            action: <CheckCircle className="text-primary" />
        });
        setIsScheduleOpen(false);
    };

    return (
        <div className="flex flex-col gap-4 animate-in fade-in duration-500">
            <header className="flex items-center justify-between bg-card/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <TabletSmartphone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-tighter italic text-primary">System Kyron</h1>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40">Punto de Venta Profesional</p>
                    </div>
                </div>
                 {!activeCashier ? (
                     <div className="flex items-center gap-2">
                        <Badge variant="outline" className="h-8 border-rose-500/20 text-rose-500 bg-rose-500/5 px-3">Terminal Inactivo</Badge>
                        <Select onValueChange={(value) => setActiveCashier(value)}>
                            <SelectTrigger className="w-[200px] rounded-xl h-10 border-primary/20 bg-primary/5 font-bold">
                                <SelectValue placeholder="Seleccionar Cajero" />
                            </SelectTrigger>
                            <SelectContent>
                                {cashiers.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                     </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black uppercase text-primary leading-none">{activeCashier}</p>
                            <p className="text-[8px] font-bold text-muted-foreground uppercase mt-1">Turno: Mañana</p>
                        </div>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Escanear o buscar..." className="pl-9 h-10 rounded-xl bg-white/5 border-white/10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        
                        <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:text-primary transition-all">
                                    <Settings2 className="h-5 w-5" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl rounded-[2.5rem] bg-card/95 backdrop-blur-2xl border-white/10 p-0 overflow-hidden">
                                <div className="p-8 border-b border-white/5 bg-primary/5">
                                    <DialogHeader>
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="p-3 bg-primary/10 rounded-2xl">
                                                <Clock className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Horarios y Turnos</DialogTitle>
                                                <DialogDescription className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">Configuración Maestra del Establecimiento</DialogDescription>
                                            </div>
                                        </div>
                                    </DialogHeader>
                                </div>

                                <Tabs defaultValue="horario" className="w-full">
                                    <TabsList className="w-full justify-start rounded-none bg-white/5 border-b border-white/5 h-14 px-8 gap-8">
                                        <TabsTrigger value="horario" className="text-[10px] font-black uppercase tracking-widest data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Horario General</TabsTrigger>
                                        <TabsTrigger value="excepciones" className="text-[10px] font-black uppercase tracking-widest data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Excepciones</TabsTrigger>
                                        <TabsTrigger value="reportes" className="text-[10px] font-black uppercase tracking-widest data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Reporte por Turno</TabsTrigger>
                                    </TabsList>

                                    <div className="p-8 overflow-y-auto max-h-[60vh]">
                                        <TabsContent value="horario" className="mt-0 space-y-8">
                                            <div className="grid gap-6">
                                                {diasSemana.map((dia) => (
                                                    <div key={dia.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-primary/20 transition-all">
                                                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                                            <Checkbox id={`check-${dia.id}`} defaultChecked={dia.id !== 'dom'} className="rounded-md border-primary/40 data-[state=checked]:bg-primary" />
                                                            <Label htmlFor={`check-${dia.id}`} className="text-xs font-black uppercase tracking-widest w-24">{dia.label}</Label>
                                                        </div>
                                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                                            <div className="space-y-1">
                                                                <p className="text-[8px] font-bold text-white/30 uppercase ml-1">Apertura</p>
                                                                <Input type="time" defaultValue="08:00" className="bg-black/20 border-white/10 h-10 w-32 font-mono text-xs" />
                                                            </div>
                                                            <ArrowRight className="h-4 w-4 text-white/10 mt-4" />
                                                            <div className="space-y-1">
                                                                <p className="text-[8px] font-bold text-white/30 uppercase ml-1">Cierre</p>
                                                                <Input type="time" defaultValue="18:00" className="bg-black/20 border-white/10 h-10 w-32 font-mono text-xs" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <ShieldAlert className="h-6 w-6 text-primary" />
                                                    <div className="space-y-1">
                                                        <Label className="text-xs font-black uppercase text-white">Bloqueo de Seguridad</Label>
                                                        <p className="text-[9px] font-bold text-white/40 uppercase">Bloquear ventas fuera del horario establecido</p>
                                                    </div>
                                                </div>
                                                <Checkbox checked={blockOutsideHours} onCheckedChange={(val) => setBlockOutsideHours(!!val)} className="rounded-md h-6 w-6 border-primary/40 data-[state=checked]:bg-primary" />
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="excepciones" className="mt-0 space-y-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-sm font-black uppercase italic tracking-widest text-primary">Días Festivos y Especiales</h3>
                                                <Button size="sm" className="rounded-xl h-9 px-4 text-[9px] font-bold uppercase tracking-widest bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                                                    <Plus className="mr-2 h-3.5 w-3.5" /> Agregar Excepción
                                                </Button>
                                            </div>
                                            <div className="border border-white/5 rounded-2xl overflow-hidden">
                                                <Table>
                                                    <TableHeader className="bg-white/5">
                                                        <TableRow className="hover:bg-transparent">
                                                            <TableHead className="text-[9px] font-black uppercase tracking-widest p-4">Fecha</TableHead>
                                                            <TableHead className="text-[9px] font-black uppercase tracking-widest p-4">Motivo</TableHead>
                                                            <TableHead className="text-[9px] font-black uppercase tracking-widest p-4">Horario Especial</TableHead>
                                                            <TableHead className="text-right p-4"></TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {exceptionsData.map((exc, i) => (
                                                            <TableRow key={i} className="hover:bg-white/5 border-white/5">
                                                                <TableCell className="p-4 font-mono text-xs font-bold text-white/70">{exc.fecha}</TableCell>
                                                                <TableCell className="p-4 text-[10px] font-black uppercase text-primary italic">{exc.motivo}</TableCell>
                                                                <TableCell className="p-4">
                                                                    <Badge variant="outline" className="text-[8px] border-white/10 uppercase">{exc.horario}</Badge>
                                                                </TableCell>
                                                                <TableCell className="p-4 text-right">
                                                                    <Button variant="ghost" size="icon" className="text-white/20 hover:text-rose-500">
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="reportes" className="mt-0 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {turnReports.map((rep, i) => (
                                                    <Card key={i} className="bg-white/[0.03] border-white/5 rounded-[2rem] p-6 space-y-4">
                                                        <div className="flex justify-between items-start">
                                                            <div className="p-3 bg-secondary/10 rounded-2xl">
                                                                <History className="h-5 w-5 text-secondary" />
                                                            </div>
                                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black">CIERRE: {rep.cierre}</Badge>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">{rep.turno}</p>
                                                            <p className="text-[9px] font-bold text-white/30 uppercase">{rep.fecha} • {rep.empleado}</p>
                                                        </div>
                                                        <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                                                            <div>
                                                                <p className="text-[8px] font-black text-white/20 uppercase">Total Ventas</p>
                                                                <p className="text-xl font-black italic text-white">{formatCurrency(rep.total, 'USD')}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[8px] font-black text-white/20 uppercase">Transacciones</p>
                                                                <p className="text-xs font-bold text-white/60">{rep.transacciones}</p>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        </TabsContent>
                                    </div>
                                </Tabs>

                                <div className="p-8 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="manager-role" checked={isManager} onCheckedChange={(val) => setIsManager(!!val)} />
                                            <Label htmlFor="manager-role" className="text-[9px] font-black uppercase text-white/40 cursor-pointer">Simular Rol Gerente</Label>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="ghost" className="rounded-xl h-12 px-8 text-[10px] font-bold uppercase tracking-widest text-white/40" onClick={() => setIsScheduleOpen(false)}>Cancelar</Button>
                                        <Button className="rounded-xl h-12 px-10 btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl" onClick={handleSaveSchedule}>Aplicar Cambios</Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Button onClick={() => setActiveCashier(null)} variant="ghost" size="sm" className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-500/10 rounded-lg">Finalizar Turno</Button>
                    </div>
                )}
            </header>

            <div className="grid lg:grid-cols-3 gap-4 h-full min-h-[calc(100vh-14rem)]">
                <div className="lg:col-span-2 bg-card/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-lg overflow-y-auto custom-scrollbar">
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                         {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                            <Card key={product.id} onClick={() => addToCart(product)} className="group cursor-pointer hover:border-primary transition-all rounded-[1.5rem] overflow-hidden bg-background/50 border-white/5 relative flex flex-col h-full">
                                <div className="aspect-square relative overflow-hidden bg-white/5">
                                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                        <Plus className="h-6 w-6 text-white ml-auto" />
                                    </div>
                                </div>
                                <div className="p-4 flex-grow flex flex-col justify-between">
                                    <p className="font-bold text-[10px] uppercase tracking-tight text-white/70 leading-tight mb-2 line-clamp-2">{product.name}</p>
                                    <p className="text-sm font-black text-primary italic tracking-tighter">{formatCurrency(product.price, 'USD')}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card className="flex flex-col bg-card/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
                    <CardHeader className="p-8 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-black uppercase italic tracking-tighter text-white">Orden Actual</CardTitle>
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-black">{cart.length} ITEMS</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-y-auto px-8 space-y-4 custom-scrollbar">
                        {cart.length > 0 ? (
                            <div className="space-y-3">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl group hover:bg-white/[0.05] transition-all">
                                        <div className="flex-1 min-w-0 pr-2">
                                            <p className="font-bold text-[10px] uppercase text-white/80 truncate mb-1">{item.name}</p>
                                            <p className="text-xs font-black text-primary italic">{formatCurrency(item.price, 'USD')}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-black/40 rounded-xl p-1 border border-white/5">
                                            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg hover:bg-white/10" onClick={() => updateQuantity(item.id, -1)}><Minus className="h-3 w-3"/></Button>
                                            <span className="text-xs font-black text-white w-4 text-center">{item.quantity}</span>
                                            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg hover:bg-white/10" onClick={() => updateQuantity(item.id, 1)}><Plus className="h-3 w-3"/></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-6 opacity-20">
                                <div className="p-8 bg-white/5 rounded-full border-2 border-dashed border-white/20">
                                    <ShoppingCart className="h-16 w-16" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.4em]">Cesta Vacía</p>
                                    <p className="text-[10px] font-bold uppercase mt-2">Seleccione productos para facturar</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex-col !p-8 border-t border-white/10 gap-6 bg-black/40">
                        <div className="w-full space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase text-white/30"><span>Sub-Total Bruto:</span><span className="text-white/60">{formatCurrency(totalInCurrency, currency)}</span></div>
                            <div className="flex justify-between text-[10px] font-black uppercase text-white/30"><span>IVA Aplicado (16%):</span><span className="text-white/60">{formatCurrency(iva, currency)}</span></div>
                            <div className="flex justify-between text-2xl font-black text-primary pt-4 border-t border-white/5 shadow-glow-text">
                                <span className="italic uppercase tracking-tighter">Total a Pagar:</span>
                                <span className="italic tracking-tighter">{formatCurrency(total, currency)}</span>
                            </div>
                        </div>
                        
                        <div className="w-full grid grid-cols-2 gap-3">
                            <Select value={currency} onValueChange={(val) => setCurrency(val as any)}>
                                <SelectTrigger className="rounded-xl h-14 font-black bg-white/5 border-white/10 text-xs text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border-white/10">
                                    <SelectItem value="Bs." className="text-xs font-bold uppercase">🇻🇪 VES</SelectItem>
                                    <SelectItem value="USD" className="text-xs font-bold uppercase">🇺🇸 USD</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="w-full h-14 rounded-xl text-xs font-black shadow-2xl btn-3d-primary uppercase tracking-widest italic" onClick={handleCheckout} disabled={cart.length === 0 || !activeCashier}>
                                COBRAR AHORA
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="rounded-[3rem] bg-black/95 backdrop-blur-3xl border-white/10 p-10">
                    <DialogHeader className="mb-8">
                        <div className="p-3 bg-primary/10 rounded-2xl w-fit mb-4">
                            <CheckSquare className="h-8 w-8 text-primary" />
                        </div>
                        <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">Confirmar <br/> Transacción</DialogTitle>
                        <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Seleccione el medio de inyección de liquidez</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        {[
                            { id: "Punto de Venta", icon: CreditCard },
                            { id: "Pago Móvil", icon: Smartphone },
                            { id: "Efectivo", icon: Banknote },
                            { id: "Transferencia", icon: Landmark },
                            { id: "Billetera Kyron", icon: Wallet }
                        ].map((method) => (
                            <Button 
                                key={method.id}
                                variant={paymentMethod === method.id ? "default" : "outline"}
                                className={cn(
                                    "h-16 rounded-2xl text-[10px] font-black uppercase tracking-widest flex flex-col items-center justify-center gap-2 transition-all duration-300", 
                                    paymentMethod === method.id 
                                        ? "bg-primary text-white border-primary shadow-glow" 
                                        : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white hover:border-white/20",
                                    method.id === "Billetera Kyron" && "border-primary/40 text-primary bg-primary/5"
                                )}
                                onClick={() => setPaymentMethod(method.id as any)}
                            >
                                <method.icon className="h-5 w-5" />
                                {method.id}
                            </Button>
                        ))}
                    </div>
                    <DialogFooter className="mt-8 flex flex-col gap-4">
                        <Button onClick={handleFinalizeTransaction} disabled={isProcessing || !paymentMethod} className="w-full h-16 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl btn-3d-primary italic">
                            {isProcessing ? <Loader2 className="animate-spin mr-3 h-5 w-5"/> : <CheckCircle className="mr-3 h-5 w-5"/>}
                            {isProcessing ? "SELLANDO LEDGER..." : "PROCESAR FACTURA"}
                        </Button>
                        <Button variant="ghost" className="w-full h-12 text-[10px] font-black uppercase text-white/20 hover:text-white" onClick={() => setIsCheckoutOpen(false)}>Cancelar Operación</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
                <DialogContent className="sm:max-w-md rounded-[3rem] bg-black/95 backdrop-blur-3xl border-white/10 p-10">
                    <DialogHeader className="text-center mb-8">
                        <DialogTitle className="text-3xl font-black tracking-tighter uppercase italic text-white">Transacción Exitosa</DialogTitle>
                        <DialogDescription className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 w-fit mx-auto mt-4">
                            <Lock className="h-3 w-3 mr-2 inline" /> Sellado en Ledger Digital v2.6
                        </DialogDescription>
                    </DialogHeader>
                    <div className="text-center space-y-8">
                        <div className="relative mx-auto w-24 h-24">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
                            <div className="relative bg-emerald-500/10 p-6 rounded-[2rem] border-2 border-emerald-500/30">
                                <CheckCircle className="h-12 w-12 text-emerald-500" />
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-[2.5rem] shadow-2xl relative group">
                            <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] blur-xl scale-0 group-hover:scale-110 transition-transform" />
                            {qrCodeData && (
                                <div className="relative z-10 p-2 bg-white rounded-2xl border-4 border-slate-50">
                                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData)}&bgcolor=ffffff&color=000000&margin=1`} alt="Factura QR" width={180} height={180} className="mx-auto" />
                                </div>
                            )}
                            <p className="mt-4 text-[8px] font-black uppercase text-slate-400 tracking-widest">Código Fiscal Homologado</p>
                        </div>

                        <div className="space-y-3">
                            <Button onClick={() => { setIsReceiptOpen(false); setCart([]); }} className="w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest btn-3d-primary shadow-xl italic">NUEVA OPERACIÓN</Button>
                            <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[9px] tracking-[0.2em] text-white/40">COMPARTIR COMPROBANTE</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
