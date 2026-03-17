"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TabletSmartphone, Plus, Minus, X, CircleCheck as CheckCircle, Smartphone, Phone, Landmark, CreditCard, Banknote, Loader as Loader2, Search, Radio, Wallet, Lock } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
    const [currency, setCurrency] = useState<Currency>("Bs.");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [activeCashier, setActiveCashier] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [qrCodeData, setQrCodeData] = useState("");
    
    const { toast } = useToast();

    useEffect(() => {
        if (isReceiptOpen) {
            setQrCodeData(`SystemKyron-Factura-${Math.random().toString(36).substr(2, 9)}`);
        }
    }, [isReceiptOpen]);
    
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
        setIsCheckoutOpen(true);
    };

    const handleFinalizeTransaction = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsCheckoutOpen(false);
            setIsReceiptOpen(true);
            toast({ 
                title: "Venta Exitosa", 
                description: paymentMethod === "Billetera Kyron" 
                    ? "Monto descontado de Caja Digital y factura sellada." 
                    : "La factura ha sido generada.", 
                action: <CheckCircle className="text-green-500" /> 
            });
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-4">
            <header className="flex items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
                 <div className="flex items-center gap-2">
                    <TabletSmartphone className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-black uppercase tracking-tight italic text-primary">System Kyron TPV</h1>
                </div>
                 {!activeCashier ? (
                     <Select onValueChange={(value) => setActiveCashier(value)}>
                        <SelectTrigger className="w-[200px] rounded-xl h-10">
                            <SelectValue placeholder="Seleccionar Cajero" />
                        </SelectTrigger>
                        <SelectContent>
                            {cashiers.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Buscar..." className="pl-9 h-10 rounded-xl" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <Button onClick={() => setActiveCashier(null)} variant="ghost" size="sm" className="text-xs font-black text-destructive uppercase">Cerrar</Button>
                    </div>
                )}
            </header>

            <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-card p-6 rounded-[2rem] border shadow-sm">
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                         {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                            <Card key={product.id} onClick={() => addToCart(product)} className="group cursor-pointer hover:border-primary transition-all rounded-2xl overflow-hidden bg-background">
                                <div className="aspect-square relative overflow-hidden">
                                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-3">
                                    <p className="font-bold text-[10px] leading-tight mb-1">{product.name}</p>
                                    <p className="text-sm font-black text-primary italic">{formatCurrency(product.price, 'USD')}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card className="flex flex-col bg-card rounded-[2rem] border shadow-lg overflow-hidden">
                    <CardHeader className="p-6 pb-2">
                        <CardTitle className="text-base font-black uppercase tracking-tight">Orden Actual</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-y-auto px-6 max-h-[400px]">
                        {cart.length > 0 ? (
                            <div className="space-y-3">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-2 bg-secondary/20 rounded-xl">
                                        <div className="flex-1 min-0">
                                            <p className="font-bold text-[10px] truncate">{item.name}</p>
                                            <p className="text-[9px] text-muted-foreground">{item.quantity} x {formatCurrency(item.price, 'USD')}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.id, -1)}><Minus className="h-3 w-3"/></Button>
                                            <span className="text-xs font-bold">{item.quantity}</span>
                                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.id, 1)}><Plus className="h-3 w-3"/></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48 opacity-20">
                                <Plus className="h-12 w-12" />
                                <p className="text-[10px] font-black uppercase tracking-widest mt-2">Cesta vacía</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex-col !p-6 border-t gap-4 bg-muted/30">
                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-[10px] font-bold"><span>SUBTOTAL:</span><span>{formatCurrency(totalInCurrency, currency)}</span></div>
                            <div className="flex justify-between text-[10px] font-bold"><span>IVA (16%):</span><span>{formatCurrency(iva, currency)}</span></div>
                            <div className="flex justify-between text-xl font-black text-primary pt-2 border-t border-primary/5"><span>TOTAL:</span><span className="italic">{formatCurrency(total, currency)}</span></div>
                        </div>
                        
                        <div className="w-full grid grid-cols-2 gap-2">
                            <Select value={currency} onValueChange={(val) => setCurrency(val as any)}>
                                <SelectTrigger className="rounded-xl h-10 font-bold"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Bs.">VES</SelectItem>
                                    <SelectItem value="USD">USD</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="w-full h-10 rounded-xl text-[10px] font-black shadow-lg btn-3d-primary" onClick={handleCheckout} disabled={cart.length === 0 || !activeCashier}>
                                COBRAR
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="rounded-[2rem]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black italic uppercase">Finalizar Cobro</DialogTitle>
                        <DialogDescription className="sr-only">Seleccione el método de pago para completar la transacción.</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-3 py-4">
                        {["Punto de Venta", "Pago Móvil", "Efectivo", "Transferencia", "Billetera Kyron"].map((method) => (
                            <Button 
                                key={method}
                                variant={paymentMethod === method ? "default" : "outline"}
                                className={cn(
                                    "h-12 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2", 
                                    paymentMethod === method && "bg-primary text-white",
                                    method === "Billetera Kyron" && "border-primary/40 text-primary"
                                )}
                                onClick={() => setPaymentMethod(method as any)}
                            >
                                {method === "Billetera Kyron" && <Wallet className="h-3 w-3" />}
                                {method}
                            </Button>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button onClick={handleFinalizeTransaction} disabled={isProcessing || !paymentMethod} className="w-full h-12 rounded-xl font-black">
                            {isProcessing ? <Loader2 className="animate-spin mr-2"/> : "CONFIRMAR PAGO"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
                <DialogContent className="sm:max-w-md rounded-[2.5rem]">
                    <DialogHeader>
                        <DialogTitle className="sr-only">Factura de Venta Registrada</DialogTitle>
                        <DialogDescription className="sr-only">Confirmación de la transacción exitosa y código QR fiscal.</DialogDescription>
                    </DialogHeader>
                    <div className="p-6 text-center space-y-6">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black tracking-tighter uppercase italic">Venta Registrada</h2>
                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                                <Lock className="h-3 w-3" /> Sellado en Ledger Digital
                            </div>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-2xl border border-primary/10">
                            {qrCodeData && (
                                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeData)}`} alt="Factura QR" width={120} height={120} className="mx-auto border p-2 bg-white rounded-xl" />
                            )}
                        </div>
                        <Button onClick={() => { setIsReceiptOpen(false); setCart([]); }} className="w-full h-12 rounded-xl font-black uppercase text-xs">Nueva Venta</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}