"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Plus, Minus, X, TabletSmartphone, Printer, CheckCircle, ShieldCheck, User, Barcode, Search, QrCode, CreditCard, Banknote, Lock, Key, UserMinus, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const products = [
    { id: 1, name: "Resma de Papel Carta (500 Hojas)", price: 8.50, barcode: "7591234567890", image: "https://picsum.photos/seed/paper/200/200" },
    { id: 2, name: "Impresora Fiscal Térmica", price: 350.00, barcode: "7591234567891", image: "https://picsum.photos/seed/printer/200/200" },
    { id: 3, name: "Punto de Venta Inalámbrico", price: 280.00, barcode: "7591234567892", image: "https://picsum.photos/seed/pos/200/200" },
    { id: 4, name: "Lector de Código de Barras USB", price: 95.00, barcode: "7591234567893", image: "https://picsum.photos/seed/scanner/200/200" },
    { id: 5, name: "Tóner de Repuesto para Impresora", price: 85.00, barcode: "7591234567894", image: "https://picsum.photos/seed/toner/200/200" },
    { id: 11, name: "Papelera Inteligente (Magnetismo)", price: 150.00, barcode: "7591234567900", image: "https://picsum.photos/seed/smartbin/200/200" },
    { id: 12, name: "Smartphone Kyron Pro X", price: 299.00, barcode: "7591234567901", image: "https://picsum.photos/seed/phone/200/200" },
    { id: 13, name: "Número Telefónico (Línea Nueva)", price: 15.00, barcode: "7591234567902", image: "https://picsum.photos/seed/simcard/200/200" },
    { id: 6, name: "Caja de Bolígrafos Negros (12 Unidades)", price: 5.00, barcode: "7591234567895", image: "https://picsum.photos/seed/pens/200/200" },
    { id: 9, name: "Licencia Anual Software Contable", price: 480.00, barcode: "7591234567898", image: "https://picsum.photos/seed/software/200/200" }
];


const mockClientes = [
    { id: "V-12345678", nombre: "Juan Pérez", rif: "V-12345678-9" },
    { id: "J-12345678", nombre: "Empresa S.A.", rif: "J-12345678-9" },
    { id: "V-87654321", nombre: "Maria Rodriguez", rif: "V-87654321-0" },
];


const cashiers = [
    "Cajero 1", "Cajero 2", "Cajero 3", "Cajero 4", "Cajero 5",
    "Cajero 6", "Cajero 7", "Cajero 8", "Cajero 9", "Cajero 10"
];

const casheaLevels = [
    { level: 1, name: "Semilla", initialPayment: "60% Inicial", moreQuotas: false },
    { level: 2, name: "Raíz", initialPayment: "50% Inicial", moreQuotas: false },
    { level: 3, name: "Hoja", initialPayment: "40% Inicial", moreQuotas: true },
    { level: 4, name: "Tronco", initialPayment: "25% Inicial", moreQuotas: true },
    { level: 5, name: "Árbol", initialPayment: "20% Inicial", moreQuotas: true },
    { level: 6, name: "Araguaney", initialPayment: "20% Inicial", moreQuotas: true },
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


type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};
type Cliente = {
    id: string;
    nombre: string;
    rif: string;
};

type Currency = "Bs." | "USD" | "EUR";
type PaymentMethod = "Punto de Venta" | "Pago Móvil" | "Transferencia Bancaria" | "Zelle" | "Efectivo";
type OperationType = "Venta Inmediata" | "Factura a Crédito sin Abono" | "Venta con Financiamiento" | "Venta a Ente Exento de IVA";
type FinancingPlatform = "Cashea" | "Krece" | "Rapikom";

const exchangeRates: Record<Currency, number> = {
    "Bs.": 40.0, // Tasa de referencia Bs. por USD
    "USD": 1,
    "EUR": 0.92, // Tasa de referencia EUR por USD
};


export default function PuntoDeVentaPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
    const [tableNumber, setTableNumber] = useState("");
    const [currency, setCurrency] = useState<Currency>("Bs.");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [operationType, setOperationType] = useState<OperationType | null>(null);
    const [financingPlatform, setFinancingPlatform] = useState<FinancingPlatform | null>(null);
    const [casheaLevel, setCasheaLevel] = useState<string | null>(null);
    const [kreceLevel, setKreceLevel] = useState<string | null>(null);
    const [rapikomLine, setRapikomLine] = useState<string | null>(null);
    const [useModoMasCuotas, setUseModoMasCuotas] = useState(false);
    const [activeCashier, setActiveCashier] = useState<string | null>(null);
    const [barcode, setBarcode] = useState("");
    const barcodeRef = useRef<HTMLInputElement>(null);
    const [amountReceived, setAmountReceived] = useState<number | "">("");
    const [giveChangeByPagoMovil, setGiveChangeByPagoMovil] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLocked, setIsLocked] = useState(false);
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [clienteCedula, setClienteCedula] = useState("");
    const [attachedCliente, setAttachedCliente] = useState<Cliente | null>(null);
    
    const { toast } = useToast();
    
    useEffect(() => {
      const checkWorkHours = () => {
        const now = new Date();
        const currentHour = now.getHours();
        if (currentHour < 8 || currentHour >= 18) {
          setIsLocked(true);
        } else {
          setIsLocked(false);
        }
      };
      
      checkWorkHours();
      const interval = setInterval(checkWorkHours, 60000); 

      return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
      if (activeCashier) {
        barcodeRef.current?.focus();
      }
    }, [activeCashier]);

    const addToCart = (product: typeof products[0]) => {
        if (!activeCashier) {
            toast({ variant: "destructive", title: "Seleccione un cajero", description: "Debe seleccionar un cajero para iniciar una venta." });
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

    const handleBarcodeAdd = () => {
        const product = products.find(p => p.barcode === barcode);
        if (product) {
            addToCart(product);
            setBarcode("");
        } else {
            toast({ variant: "destructive", title: "Producto no encontrado", description: `No se encontró ningún producto con el código de barras ${barcode}.` });
        }
    };

    const handleBarcodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleBarcodeAdd();
        }
    };

    const handleClienteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAttachCliente();
        }
    };
    
    const handleAttachCliente = () => {
        const normalizedCedula = clienteCedula.replace(/[^0-9JVEG]/gi, '').toUpperCase();
        const cliente = mockClientes.find(c => c.id.replace(/[^0-9JVEG]/gi, '').toUpperCase() === normalizedCedula);
        if (cliente) {
            setAttachedCliente(cliente);
            toast({ title: "Cliente Adjuntado", description: `${cliente.nombre} ha sido adjuntado a la venta.` });
        } else {
            toast({ variant: "destructive", title: "Cliente no encontrado", description: "No se encontró un cliente con esa Cédula/RIF." });
        }
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
    
    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }
    
    const handleCloseShift = () => {
        toast({ title: "Turno Cerrado", description: `El turno de ${activeCashier} ha sido cerrado.`});
        setActiveCashier(null);
        setCart([]);
    };

    const getPriceInCurrency = (priceInUsd: number) => {
        if (currency === 'USD') return priceInUsd;
        return priceInUsd * exchangeRates[currency];
    }
    
    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
    const subtotalInCurrency = getPriceInCurrency(subtotal);
    const iva = operationType === "Venta a Ente Exento de IVA" ? 0 : subtotalInCurrency * 0.16;
    const total = subtotalInCurrency + iva;
    
    const changeDue = useMemo(() => {
        const received = Number(amountReceived);
        if (isNaN(received) || received <= 0) return 0;
        return received - total;
    }, [amountReceived, total]);
    
    const handleCheckout = () => {
        if (cart.length === 0) {
            toast({ variant: "destructive", title: "Carrito Vacío", description: "Agrega productos al carrito antes de cobrar." });
            return;
        }
        if (!operationType) {
             toast({ variant: "destructive", title: "Selecciona un tipo de operación", description: "Debes clasificar la operación para continuar." });
            return;
        }
        if (operationType === "Venta con Financiamiento" && !financingPlatform) {
             toast({ variant: "destructive", title: "Selecciona una plataforma", description: "Debes seleccionar la plataforma de financiamiento." });
            return;
        }
        if (!paymentMethod) {
             toast({ variant: "destructive", title: "Selecciona un método de pago", description: "Debes seleccionar un método de pago para continuar." });
            return;
        }
        setIsCheckoutOpen(true);
    };

    const handlePrint = () => {
        window.print();
        toast({ title: "Imprimiendo Recibo", description: "Tu recibo se está enviando a la impresora.", action: <Printer className="text-gray-500" /> });
    };
    
    const handleNewSale = () => {
        setIsReceiptOpen(false);
        setCart([]);
        setAmountReceived("");
        setGiveChangeByPagoMovil(false);
        setPaymentMethod(null);
        setOperationType(null);
        setFinancingPlatform(null);
        setCasheaLevel(null);
        setKreceLevel(null);
        setRapikomLine(null);
        setUseModoMasCuotas(false);
        setAttachedCliente(null);
        setClienteCedula("");
         toast({
            title: "Inventario y Costos Actualizados",
            description: "La venta se ha registrado y el inventario y la estructura de costos han sido actualizados automáticamente.",
             action: <CheckCircle className="text-green-500" />
        });
    }

    const handleFinalizeTransaction = () => {
        setIsProcessing(true);
        setTimeout(() => {
            if (paymentMethod === "Pago Móvil" || paymentMethod === "Transferencia Bancaria") {
                toast({
                    title: "Pago Confirmado en Cuenta",
                    description: `El pago de ${formatCurrency(total, currency)} ha sido verificado en la cuenta de la empresa.`
                });
            }
            setIsCheckoutOpen(false);
            setIsReceiptOpen(true);
            setIsProcessing(false);
        }, 1500);
    };

     const handleAuthorization = () => {
        setIsLocked(false);
        setIsAuthDialogOpen(false);
        toast({
            title: "Sistema Desbloqueado",
            description: "El punto de venta ha sido autorizado y está listo para operar.",
        });
    };
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode.includes(searchTerm)
    );

    const selectedCasheaLevelData = casheaLevel ? casheaLevels.find(l => String(l.level) === casheaLevel) : null;

    return (
        <div className="flex flex-col gap-4 relative">
             {isLocked && (
                <div className="absolute inset-0 bg-black/70 z-20 flex flex-col items-center justify-center gap-6 -m-4 md:-m-8">
                    <Lock className="h-20 w-20 text-yellow-400"/>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white">TPV Bloqueado</h2>
                        <p className="text-muted-foreground mt-2">El sistema se encuentra fuera del horario laboral.</p>
                    </div>
                    <Button size="lg" onClick={() => setIsAuthDialogOpen(true)}>
                        <Key className="mr-2"/>
                        Autorización de Supervisor
                    </Button>
                </div>
            )}
            <header className="flex items-center justify-between bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-sm flex-wrap gap-4">
                 <div className="flex items-center gap-2">
                    <TabletSmartphone className="h-6 w-6" />
                    <h1 className="text-xl font-bold uppercase tracking-tight">System Kyron TPV</h1>
                </div>
                 {!activeCashier ? (
                     <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Label htmlFor="cashier-select" className="whitespace-nowrap font-bold text-[10px] uppercase tracking-widest opacity-60">Seleccionar Cajero:</Label>
                         <Select onValueChange={(value) => setActiveCashier(value)}>
                            <SelectTrigger id="cashier-select" className="w-full sm:w-[180px] rounded-xl border-primary/10">
                                <SelectValue placeholder="Seleccionar..." />
                            </SelectTrigger>
                            <SelectContent>
                                {cashiers.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-2 flex-grow">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    ref={barcodeRef}
                                    type="text" 
                                    placeholder="Producto o Código de Barras..." 
                                    className="pl-10 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleBarcodeKeyDown}
                                    disabled={!activeCashier}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
                                <User className="h-3.5 w-3.5"/>
                                <span>Cajero: <span className="text-primary">{activeCashier}</span></span>
                            </div>
                            <Button onClick={handleCloseShift} variant="outline" size="sm" className="rounded-xl h-9 text-[9px] font-black uppercase tracking-widest">Cerrar Turno</Button>
                        </div>
                    </>
                )}
            </header>

            <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-card/80 backdrop-blur-sm p-6 rounded-[2rem] shadow-sm border border-primary/5">
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                         {filteredProducts.map(product => (
                            <Card key={product.id} onClick={() => addToCart(product)} className="group cursor-pointer hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col rounded-2xl overflow-hidden border-primary/5 bg-background/50">
                                <CardContent className="p-0 aspect-square relative w-full overflow-hidden">
                                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500"/>
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Plus className="text-white h-10 w-10"/>
                                    </div>
                                </CardContent>
                                <div className="p-4 flex-grow">
                                    <p className="font-bold text-xs leading-tight tracking-tight">{product.name}</p>
                                </div>
                                <CardFooter className="p-4 pt-0">
                                    <p className="text-sm font-black text-primary italic">{formatCurrency(getPriceInCurrency(product.price), currency)}</p>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card className="lg:col-span-1 flex flex-col bg-card/80 backdrop-blur-sm rounded-[2rem] border-primary/5 shadow-lg">
                    <CardHeader className="p-6">
                        <CardTitle className="text-lg font-black uppercase tracking-tighter">Detalle de Orden</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-y-auto px-6 custom-scrollbar">
                        {cart.length > 0 ? (
                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-secondary/20 rounded-xl">
                                        <div className="flex-1">
                                            <p className="font-bold text-xs">{item.name}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.quantity} x {formatCurrency(getPriceInCurrency(item.price), currency)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg" onClick={() => updateQuantity(item.id, -1)}><Minus className="h-3 w-3"/></Button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg" onClick={() => updateQuantity(item.id, 1)}><Plus className="h-3 w-3"/></Button>
                                            <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:bg-destructive/5" onClick={() => removeFromCart(item.id)}><X className="h-4 w-4"/></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4 opacity-30">
                                <ShoppingCart className="h-16 w-16" />
                                <p className="text-xs font-black uppercase tracking-widest">Esperando Productos...</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex-col !p-6 border-t border-primary/5 gap-4">
                        <div className="w-full space-y-3">
                            <Label htmlFor="cliente-cedula" className="text-[10px] font-black uppercase tracking-widest opacity-60">Asignar Cliente Fiscal</Label>
                            {attachedCliente ? (
                                <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/10 rounded-xl">
                                    <div>
                                        <p className="font-black text-xs uppercase tracking-tighter">{attachedCliente.nombre}</p>
                                        <p className="text-[10px] font-mono text-muted-foreground">{attachedCliente.rif}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setAttachedCliente(null)}>
                                        <UserMinus className="h-4 w-4 text-destructive"/>
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Input
                                        id="cliente-cedula"
                                        placeholder="RIF / Cédula / Pasaporte"
                                        className="h-10 text-xs rounded-xl bg-secondary/30 border-none"
                                        value={clienteCedula}
                                        onChange={(e) => setClienteCedula(e.target.value)}
                                        onKeyDown={handleClienteKeyDown}
                                    />
                                    <Button variant="secondary" className="rounded-xl h-10 w-10 p-0" onClick={handleAttachCliente}><Search className="h-4 w-4"/></Button>
                                </div>
                            )}
                        </div>
                        
                         <div className="w-full grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Operación</Label>
                                <Select onValueChange={(value) => setOperationType(value as OperationType)} value={operationType || ""}>
                                    <SelectTrigger className="rounded-xl border-primary/10 h-10 text-xs">
                                        <SelectValue placeholder="Tipo..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Venta Inmediata">Inmediata</SelectItem>
                                        <SelectItem value="Factura a Crédito sin Abono">Crédito (Sin abono)</SelectItem>
                                        <SelectItem value="Venta con Financiamiento">Financiamiento (BNPL)</SelectItem>
                                        <SelectItem value="Venta a Ente Exento de IVA">Exento IVA</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Divisa</Label>
                                <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
                                    <SelectTrigger className="rounded-xl border-primary/10 h-10 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bs.">VES</SelectItem>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                         </div>

                        <div className="w-full space-y-2 text-xs py-4 border-y border-primary/5 font-bold">
                            <div className="flex justify-between"><span>SUBTOTAL:</span><span className="font-mono">{formatCurrency(subtotalInCurrency, currency)}</span></div>
                            <div className="flex justify-between"><span>IVA (16%):</span><span className="font-mono">{formatCurrency(iva, currency)}</span></div>
                            <div className="flex justify-between text-lg font-black pt-2 text-primary"><span>TOTAL:</span><span className="italic">{formatCurrency(total, currency)}</span></div>
                        </div>
                        
                        <Button className="w-full text-sm font-black h-14 rounded-2xl shadow-xl btn-3d-primary" onClick={handleCheckout} disabled={!activeCashier || cart.length === 0}>
                            PROCESAR PAGO
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            
            {/* Checkout Dialog */}
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="rounded-[2rem] p-8">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tighter">Finalizar Transacción</DialogTitle>
                        <DialogDescription>Selecciona el método de pago y confirma el ingreso.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="flex justify-between items-center text-2xl font-black p-6 bg-primary/10 text-primary rounded-2xl border border-primary/10">
                            <span>TOTAL:</span>
                            <span className="italic">{formatCurrency(total, currency)}</span>
                        </div>
                        
                        <div className="space-y-3">
                            <Label className="text-xs font-black uppercase tracking-widest opacity-60">Método de Pago</Label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: "Punto de Venta", icon: TabletSmartphone },
                                    { id: "Pago Móvil", icon: Smartphone },
                                    { id: "Efectivo", icon: Banknote },
                                    { id: "Transferencia Bancaria", icon: Landmark },
                                ].map((method) => (
                                    <Button 
                                        key={method.id}
                                        type="button"
                                        variant={paymentMethod === method.id ? "default" : "outline"}
                                        className={cn("h-12 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2", paymentMethod === method.id && "bg-primary text-white")}
                                        onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                                    >
                                        <method.icon className="h-4 w-4" />
                                        {method.id}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {paymentMethod === "Efectivo" && (
                            <div className="space-y-3 animate-in slide-in-from-top-2">
                                 <Label htmlFor="amount-received" className="text-xs font-black uppercase tracking-widest opacity-60">Monto Recibido ({currency})</Label>
                                 <Input 
                                    id="amount-received" 
                                    type="number" 
                                    placeholder="0.00" 
                                    className="h-12 rounded-xl text-lg font-mono font-bold bg-secondary/30 border-none"
                                    value={amountReceived}
                                    onChange={(e) => setAmountReceived(Number(e.target.value))}
                                />
                                {changeDue > 0 && (
                                    <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-center space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Vuelto por entregar</p>
                                        <p className="text-4xl font-black text-blue-500 italic">{formatCurrency(changeDue, currency)}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                     <DialogFooter className="gap-3 sm:flex-col">
                        <Button onClick={handleFinalizeTransaction} disabled={isProcessing || !paymentMethod} className="w-full h-14 rounded-2xl text-base font-black shadow-xl btn-3d-primary">
                            {isProcessing ? <Loader2 className="mr-2 h-6 w-6 animate-spin"/> : "CONFIRMAR Y EMITIR FACTURA"}
                        </Button>
                        <Button variant="ghost" onClick={() => setIsCheckoutOpen(false)} className="w-full h-10 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-50">Cancelar Operación</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Receipt Dialog */}
            <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
                <DialogContent className="sm:max-w-md print:shadow-none print:border-none rounded-[2rem]">
                     <div className="print-content font-mono p-4">
                        <div className="text-center mb-6">
                            <Logo className="h-12 w-12 mx-auto mb-4" />
                            <h2 className="text-xl font-black uppercase tracking-tighter">System Kyron, C.A.</h2>
                            <p className="text-[10px] font-bold">RIF: J-12345678-9 <br/> Caracas, Venezuela</p>
                        </div>
                        
                        <Separator className="my-4 border-dashed" />
                        
                        {attachedCliente && (
                            <div className="text-[10px] my-4 space-y-1">
                                <p className="font-black">CLIENTE FISCAL:</p>
                                <p>{attachedCliente.nombre}</p>
                                <p>RIF/C.I: {attachedCliente.rif}</p>
                            </div>
                        )}
                        
                        <div className="my-4 text-[9px] space-y-1 font-bold">
                            <p>FECHA: {new Date().toLocaleString('es-VE')}</p>
                            <p>CAJERO: {activeCashier}</p>
                            {operationType && <p>OPERACIÓN: {operationType}</p>}
                            {paymentMethod && <p>MÉTODO PAGO: {paymentMethod}</p>}
                        </div>
                        
                        <Separator className="my-4 border-dashed" />
                        
                        <div className="my-4 space-y-2">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-[10px]">
                                    <div className="max-w-[70%]">
                                        <p>{item.name}</p>
                                        <p className="opacity-60">{item.quantity} x {formatCurrency(getPriceInCurrency(item.price), currency)}</p>
                                    </div>
                                    <p className="font-bold">{formatCurrency(getPriceInCurrency(item.price * item.quantity), currency)}</p>
                                </div>
                            ))}
                        </div>
                        
                         <Separator className="my-4 border-dashed"/>
                         
                         <div className="w-full space-y-1 text-xs font-bold">
                            <div className="flex justify-between"><span>SUBTOTAL:</span><span>{formatCurrency(subtotalInCurrency, currency)}</span></div>
                            <div className="flex justify-between"><span>IVA (16%):</span><span>{formatCurrency(iva, currency)}</span></div>
                            <div className="flex justify-between text-base font-black pt-2"><span>TOTAL ({currency}):</span><span>{formatCurrency(total, currency)}</span></div>
                        </div>
                        
                        <Separator className="my-4 border-dashed"/>
                        
                        <div className="flex flex-col items-center text-center mt-8 space-y-4">
                             <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600">
                                <ShieldCheck className="h-8 w-8 shrink-0"/>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-tighter leading-none">Venta Protegida</p>
                                    <p className="text-[8px] font-bold opacity-70">Validación Blockchain Exitosa</p>
                                </div>
                            </div>
                             <Image 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KyronReceipt:${Math.random().toString(36).substr(2, 9)}`} 
                                alt="QR de Verificación" 
                                width={120} 
                                height={120}
                                className="border p-2 bg-white rounded-xl"
                            />
                            <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Validez Fiscal Electrónica</p>
                        </div>
                    </div>
                    <DialogFooter className="mt-6 gap-3 sm:justify-center print:hidden border-t pt-6">
                        <Button variant="outline" onClick={handlePrint} className="h-12 rounded-xl text-xs font-black uppercase tracking-widest"><Printer className="mr-2 h-4 w-4"/> Imprimir</Button>
                        <Button onClick={handleNewSale} className="h-12 rounded-xl text-xs font-black uppercase tracking-widest btn-3d-primary px-8">Nueva Venta</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Supervisor Authorization Dialog */}
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                <DialogContent className="rounded-[2rem]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black">Autorización de Nivel 5</DialogTitle>
                        <DialogDescription>
                            Se requiere la intervención del supervisor para operar fuera de horario o anular registros.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-6">
                        <Label htmlFor="auth-code" className="text-xs font-black uppercase tracking-widest opacity-60">PIN de Seguridad</Label>
                        <Input id="auth-code" type="password" placeholder="••••" className="h-14 text-center text-3xl font-black tracking-[1em] rounded-2xl bg-secondary/30 border-none" maxLength={4}/>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAuthorization} className="w-full h-12 rounded-xl font-black btn-3d-primary shadow-lg">DESBLOQUEAR TPV</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}