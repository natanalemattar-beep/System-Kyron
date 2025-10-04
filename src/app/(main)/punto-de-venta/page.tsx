
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Plus, Minus, X, TabletSmartphone, Printer, CheckCircle, ShieldCheck, User, Barcode, Search, QrCode } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const products = [
    { id: 1, name: "Hamburguesa Clásica", price: 12.50, barcode: "8591234567890" },
    { id: 2, name: "Pizza Margarita", price: 15.00, barcode: "8591234567891" },
    { id: 3, name: "Papas Fritas", price: 5.00, barcode: "8591234567892" },
    { id: 4, name: "Refresco", price: 2.50, barcode: "8591234567893" },
    { id: 5, name: "Ensalada César", price: 8.00, barcode: "8591234567894" },
    { id: 6, name: "Torta de Chocolate", price: 6.00, barcode: "8591234567895" },
    { id: 7, name: "Jugo Natural", price: 4.00, barcode: "8591234567896" },
    { id: 8, name: "Café Americano", price: 3.00, barcode: "8591234567897" },
];

const cashiers = [
    "Cajero 1", "Cajero 2", "Cajero 3", "Cajero 4", "Cajero 5",
    "Cajero 6", "Cajero 7", "Cajero 8", "Cajero 9", "Cajero 10"
];


type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type Currency = "Bs." | "USD" | "EUR";

const exchangeRates: Record<Currency, number> = {
    "Bs.": 40.0, // Tasa de referencia Bs. por USD
    "USD": 1,
    "EUR": 0.92, // Tasa de referencia EUR por USD
};


export default function PuntoDeVentaPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
    const [tableNumber, setTableNumber] = useState("");
    const [currency, setCurrency] = useState<Currency>("Bs.");
    const [activeCashier, setActiveCashier] = useState<string | null>(null);
    const [barcode, setBarcode] = useState("");
    const barcodeRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    
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
            setBarcode(""); // Clear input after adding
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
    const iva = subtotalInCurrency * 0.16;
    const total = subtotalInCurrency + iva;
    
    const handleCheckout = () => {
        if (cart.length === 0) {
            toast({
                variant: "destructive",
                title: "Carrito Vacío",
                description: "Agrega productos al carrito antes de cobrar.",
            });
            return;
        }
        setIsReceiptOpen(true);
    };

    const handlePrint = () => {
        window.print();
        toast({
            title: "Imprimiendo Recibo",
            description: "Tu recibo se está enviando a la impresora.",
            action: <Printer className="text-gray-500" />
        });
    };
    
    const handleNewSale = () => {
        setIsReceiptOpen(false);
        setCart([]);
         toast({
            title: "Inventario y Costos Actualizados",
            description: "La venta se ha registrado y el inventario y la estructura de costos han sido actualizados automáticamente.",
             action: <CheckCircle className="text-green-500" />
        });
    }
    
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://systemcms.com/menu/table/${tableNumber}`;


    return (
        <div className="h-auto md:h-screen bg-muted flex flex-col p-2 md:p-4 gap-4">
            <header className="flex items-center justify-between bg-background p-3 rounded-lg shadow-sm flex-wrap gap-4">
                 <div className="flex items-center gap-2">
                    <TabletSmartphone className="h-6 w-6" />
                    <h1 className="text-xl font-bold">Punto de Venta</h1>
                </div>
                 {!activeCashier ? (
                     <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Label htmlFor="cashier-select" className="whitespace-nowrap">Seleccionar Cajero:</Label>
                         <Select onValueChange={(value) => setActiveCashier(value)}>
                            <SelectTrigger id="cashier-select" className="w-full sm:w-[180px]">
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
                             <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <QrCode className="mr-2 h-4 w-4"/>
                                        Generar QR para Mesa
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Generar QR para Pedido en Mesa</DialogTitle>
                                        <DialogDescription>Introduce el número de la mesa para generar su código QR único.</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-2">
                                        <Label htmlFor="table-number">Número de Mesa</Label>
                                        <Input id="table-number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} placeholder="Ej: 15" />
                                    </div>
                                    {tableNumber && (
                                        <div className="flex flex-col items-center justify-center pt-4">
                                            <Image src={qrCodeUrl} alt={`QR para mesa ${tableNumber}`} width={200} height={200} />
                                            <p className="font-bold mt-2 text-lg">Mesa {tableNumber}</p>
                                            <p className="text-sm text-muted-foreground">Escanea para ordenar</p>
                                        </div>
                                    )}
                                    <DialogFooter>
                                        <Button onClick={() => setIsQrDialogOpen(false)}>Cerrar</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <div className="relative w-full max-w-sm">
                                <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    ref={barcodeRef}
                                    type="text" 
                                    placeholder="Escanear o introducir código..." 
                                    className="pl-10 pr-20"
                                    value={barcode}
                                    onChange={(e) => setBarcode(e.target.value)}
                                    onKeyDown={handleBarcodeKeyDown}
                                    disabled={!activeCashier}
                                />
                                <Button onClick={handleBarcodeAdd} size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8">
                                    <Search className="h-4 w-4 md:mr-2"/> <span className="hidden md:inline">Añadir</span>
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4"/>
                                <span>Cajero: <span className="font-semibold">{activeCashier}</span></span>
                            </div>
                            <Button onClick={handleCloseShift} variant="outline" size="sm">Cerrar Turno</Button>
                        </div>
                    </>
                )}
            </header>

            <div className="flex-grow grid lg:grid-cols-3 gap-4 overflow-hidden h-full flex-col md:flex-row">
                {/* Product Catalog */}
                <div className="lg:col-span-2 bg-background p-4 rounded-lg shadow-sm overflow-y-auto h-[50vh] md:h-full">
                    <Table>
                        <TableBody>
                            {products.map(product => (
                                <TableRow key={product.id} onClick={() => addToCart(product)} className="cursor-pointer">
                                    <TableCell className="font-medium text-lg">{product.name}</TableCell>
                                    <TableCell className="text-right text-lg">{formatCurrency(getPriceInCurrency(product.price), currency)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Order Summary */}
                <Card className="lg:col-span-1 flex flex-col h-full">
                    <CardHeader>
                        <CardTitle>Resumen de Orden</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-y-auto">
                        {cart.length > 0 ? (
                            <Table>
                                <TableBody>
                                    {cart.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">{formatCurrency(getPriceInCurrency(item.price), currency)} c/u</p>
                                            </TableCell>
                                            <TableCell className="w-28">
                                                <div className="flex items-center gap-1">
                                                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.id, -1)}><Minus className="h-3 w-3"/></Button>
                                                    <span className="w-6 text-center">{item.quantity}</span>
                                                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.id, 1)}><Plus className="h-3 w-3"/></Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">{formatCurrency(getPriceInCurrency(item.price * item.quantity), currency)}</TableCell>
                                            <TableCell><Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => removeFromCart(item.id)}><X className="h-4 w-4"/></Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <p>El carrito está vacío</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex-col !p-4 border-t">
                        <div className="w-full mb-4">
                             <Label htmlFor="currency-select">Moneda</Label>
                             <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
                                <SelectTrigger id="currency-select">
                                    <SelectValue placeholder="Seleccionar moneda" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Bs.">Bolívares (Bs.)</SelectItem>
                                    <SelectItem value="USD">Dólares (USD)</SelectItem>
                                    <SelectItem value="EUR">Euros (EUR)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full space-y-2 text-sm mb-4">
                            <div className="flex justify-between"><span>Subtotal:</span><span>{formatCurrency(subtotalInCurrency, currency)}</span></div>
                            <div className="flex justify-between"><span>IVA (16%):</span><span>{formatCurrency(iva, currency)}</span></div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total a Pagar:</span><span>{formatCurrency(total, currency)}</span></div>
                        </div>
                        <Button className="w-full text-lg h-12" onClick={handleCheckout} disabled={!activeCashier}>Cobrar</Button>
                    </CardFooter>
                </Card>
            </div>
            
            {/* Receipt Dialog */}
            <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
                <DialogContent className="sm:max-w-md print:shadow-none print:border-none">
                     <div className="print-content">
                        <DialogHeader className="text-center">
                            <DialogTitle className="text-2xl">Empresa S.A.</DialogTitle>
                            <DialogDescription>RIF: J-12345678-9 <br/> Recibo de Venta</DialogDescription>
                        </DialogHeader>
                        <div className="my-4 text-xs space-y-1">
                            <p>Fecha: {new Date().toLocaleString('es-VE')}</p>
                            <p>Cajero: {activeCashier}</p>
                        </div>
                        <div className="my-4">
                            <Table className="mt-2">
                                 <TableBody>
                                    {cart.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell className="p-1">{item.name} <br/> <span className="text-muted-foreground text-xs">{item.quantity} x {formatCurrency(getPriceInCurrency(item.price), currency)}</span></TableCell>
                                            <TableCell className="text-right font-medium p-1">{formatCurrency(getPriceInCurrency(item.price * item.quantity), currency)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="my-4">
                            <h4 className="text-sm font-semibold mb-2">Métodos de Pago Aceptados:</h4>
                            <p className="text-xs text-muted-foreground">
                                Zelle, USDT (Binance), PayPal, Pago Móvil (Kontigo)
                            </p>
                        </div>
                         <div className="w-full space-y-1 text-sm">
                            <div className="flex justify-between"><span>Subtotal:</span><span>{formatCurrency(subtotalInCurrency, currency)}</span></div>
                            <div className="flex justify-between"><span>IVA (16%):</span><span>{formatCurrency(iva, currency)}</span></div>
                            <div className="flex justify-between font-bold text-lg pt-1"><span>TOTAL ({currency}):</span><span>{formatCurrency(total, currency)}</span></div>
                        </div>
                        <div className="flex flex-col items-center text-center mt-4">
                             <ShieldCheck className="h-6 w-6 text-green-500 mb-1"/>
                             <p className="text-xs text-muted-foreground">¡Gracias por su compra!</p>
                        </div>
                    </div>
                    <DialogFooter className="mt-6 gap-2 sm:justify-center print:hidden">
                        <Button variant="outline" onClick={handlePrint}><Printer className="mr-2"/> Imprimir Recibo</Button>
                        <Button onClick={handleNewSale}>Nueva Venta</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
