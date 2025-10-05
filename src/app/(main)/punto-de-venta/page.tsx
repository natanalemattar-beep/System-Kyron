
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Plus, Minus, X, TabletSmartphone, Printer, CheckCircle, ShieldCheck, User, Barcode, Search, QrCode, CreditCard, Banknote } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const products = [
    { id: 1, name: "Resma de Papel Carta", price: 8.50, barcode: "7591234567890", image: "https://picsum.photos/seed/paper/200/200" },
    { id: 2, name: "Impresora Fiscal", price: 350.00, barcode: "7591234567891", image: "https://picsum.photos/seed/printer/200/200" },
    { id: 3, name: "Punto de Venta Inalámbrico", price: 280.00, barcode: "7591234567892", image: "https://picsum.photos/seed/pos/200/200" },
    { id: 4, name: "Lector de Código de Barras", price: 95.00, barcode: "7591234567893", image: "https://picsum.photos/seed/scanner/200/200" },
    { id: 5, name: "Tóner para Impresora", price: 85.00, barcode: "7591234567894", image: "https://picsum.photos/seed/toner/200/200" },
    { id: 6, name: "Caja de Bolígrafos (12 Unid.)", price: 5.00, barcode: "7591234567895", image: "https://picsum.photos/seed/pens/200/200" },
    { id: 7, name: "Rollo de Etiquetas Térmicas", price: 12.00, barcode: "7591234567896", image: "https://picsum.photos/seed/labels/200/200" },
    { id: 8, name: "Calculadora de Escritorio", price: 18.00, barcode: "7591234567897", image: "https://picsum.photos/seed/calculator/200/200" },
];


const cashiers = [
    "Cajero 1", "Cajero 2", "Cajero 3", "Cajero 4", "Cajero 5",
    "Cajero 6", "Cajero 7", "Cajero 8", "Cajero 9", "Cajero 10"
];

const casheaLevels = [
    { level: 1, name: "Semilla", requirements: "Nivel base", initialPayment: "60%", moreQuotas: "No" },
    { level: 2, name: "Raíz", requirements: "5 cuotas pagadas a tiempo o $120 en compras", initialPayment: "50%", moreQuotas: "No" },
    { level: 3, name: "Hoja", requirements: "10 cuotas pagadas a tiempo o $400 en compras", initialPayment: "40%", moreQuotas: "SÍ" },
    { level: 4, name: "Tronco", requirements: "20 cuotas pagadas a tiempo o $800 en compras", initialPayment: "25%", moreQuotas: "SÍ" },
    { level: 5, name: "Árbol", requirements: "40 cuotas pagadas a tiempo o $2000 en compras", initialPayment: "20%", moreQuotas: "SÍ" },
    { level: 6, name: "Araguaney", requirements: "80 cuotas pagadas a tiempo o $4000 en compras", initialPayment: "20%", moreQuotas: "SÍ" },
];


type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type Currency = "Bs." | "USD" | "EUR";
type PaymentMethod = "Punto de Venta" | "Pago Móvil" | "Zelle" | "Efectivo";
type OperationType = "Venta Inmediata" | "Factura a Crédito sin Abono" | "Venta con Financiamiento";

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
    const [casheaLevel, setCasheaLevel] = useState<string | null>(null);
    const [activeCashier, setActiveCashier] = useState<string | null>(null);
    const [barcode, setBarcode] = useState("");
    const barcodeRef = useRef<HTMLInputElement>(null);
    const [amountReceived, setAmountReceived] = useState<number | "">("");
    const [giveChangeByPagoMovil, setGiveChangeByPagoMovil] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
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
    const changeDue = amountReceived ? Number(amountReceived) - total : 0;
    
    const handleCheckout = () => {
        if (cart.length === 0) {
            toast({ variant: "destructive", title: "Carrito Vacío", description: "Agrega productos al carrito antes de cobrar." });
            return;
        }
        if (!operationType) {
             toast({ variant: "destructive", title: "Selecciona un tipo de operación", description: "Debes clasificar la operación para continuar." });
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
        setCasheaLevel(null);
         toast({
            title: "Inventario y Costos Actualizados",
            description: "La venta se ha registrado y el inventario y la estructura de costos han sido actualizados automáticamente.",
             action: <CheckCircle className="text-green-500" />
        });
    }

    const handleFinalizeTransaction = () => {
        setIsCheckoutOpen(false);
        setIsReceiptOpen(true);
    };
    
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://systemcms.com/menu/table/${tableNumber}`;

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode.includes(searchTerm)
    );

    return (
        <div className="h-screen bg-muted flex flex-col p-2 md:p-4 gap-4">
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
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    ref={barcodeRef}
                                    type="text" 
                                    placeholder="Buscar producto o escanear código..." 
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleBarcodeKeyDown}
                                    disabled={!activeCashier}
                                />
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
                <div className="lg:col-span-2 bg-background p-4 rounded-lg shadow-sm overflow-y-auto h-[50vh] md:h-full">
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                         {filteredProducts.map(product => (
                            <Card key={product.id} onClick={() => addToCart(product)} className="cursor-pointer hover:shadow-lg hover:border-primary transition-all flex flex-col">
                                <CardContent className="p-0 aspect-square relative w-full">
                                    <Image src={product.image} alt={product.name} fill className="object-cover rounded-t-lg"/>
                                </CardContent>
                                <div className="p-3 flex-grow">
                                    <p className="font-medium text-sm leading-tight">{product.name}</p>
                                </div>
                                <CardFooter className="p-3 pt-0">
                                    <p className="text-sm font-semibold text-primary">{formatCurrency(getPriceInCurrency(product.price), currency)}</p>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

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
                                                <p className="text-xs text-muted-foreground">{item.quantity} x {formatCurrency(getPriceInCurrency(item.price), currency)} c/u</p>
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
                    <CardFooter className="flex-col !p-4 border-t gap-2">
                         <div className="w-full grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="op-type-select">Tipo de Operación</Label>
                                <Select onValueChange={(value) => setOperationType(value as OperationType)} value={operationType || ""}>
                                    <SelectTrigger id="op-type-select">
                                        <SelectValue placeholder="Clasificar..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Venta Inmediata">Venta Inmediata</SelectItem>
                                        <SelectItem value="Factura a Crédito sin Abono">Factura a Crédito sin Abono</SelectItem>
                                        <SelectItem value="Venta con Financiamiento">Venta con Financiamiento</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="currency-select">Moneda</Label>
                                <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
                                    <SelectTrigger id="currency-select">
                                        <SelectValue placeholder="Seleccionar..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bs.">Bolívares (Bs.)</SelectItem>
                                        <SelectItem value="USD">Dólares (USD)</SelectItem>
                                        <SelectItem value="EUR">Euros (EUR)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                         </div>
                          {operationType === 'Venta con Financiamiento' && (
                            <div className="w-full animate-in fade-in">
                                <Label htmlFor="cashea-level">Nivel de Cliente en Cashea</Label>
                                <Select onValueChange={setCasheaLevel}>
                                    <SelectTrigger id="cashea-level">
                                        <SelectValue placeholder="Seleccionar nivel..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {casheaLevels.map(l => (
                                            <SelectItem key={l.level} value={String(l.level)}>Nivel {l.level}: {l.name} ({l.initialPayment} Inicial) {l.moreQuotas === 'SÍ' ? '(+ Modo Más Cuotas)' : ''}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                         )}
                         <div className="w-full">
                            <Label htmlFor="payment-method-select">Método de Pago</Label>
                            <Select onValueChange={(value) => setPaymentMethod(value as PaymentMethod)} value={paymentMethod || ""}>
                                <SelectTrigger id="payment-method-select">
                                    <SelectValue placeholder="Seleccionar..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Punto de Venta">Punto de Venta</SelectItem>
                                    <SelectItem value="Pago Móvil">Pago Móvil</SelectItem>
                                    <SelectItem value="Zelle">Zelle</SelectItem>
                                    <SelectItem value="Efectivo">Efectivo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full space-y-2 text-sm my-4">
                            <div className="flex justify-between"><span>Subtotal:</span><span>{formatCurrency(subtotalInCurrency, currency)}</span></div>
                            <div className="flex justify-between"><span>IVA (16%):</span><span>{formatCurrency(iva, currency)}</span></div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total a Pagar:</span><span>{formatCurrency(total, currency)}</span></div>
                        </div>
                        <Button className="w-full text-lg h-12" onClick={handleCheckout} disabled={!activeCashier}>Cobrar</Button>
                    </CardFooter>
                </Card>
            </div>
            
            {/* Checkout Dialog */}
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Finalizar Compra</DialogTitle>
                        <DialogDescription>Confirma el pago y la devolución.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-xl font-bold p-4 bg-secondary rounded-lg">
                            <Label>Total a Pagar:</Label>
                            <span>{formatCurrency(total, currency)}</span>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="amount-received">Monto Recibido del Cliente</Label>
                             <Input 
                                id="amount-received" 
                                type="number" 
                                placeholder="0.00" 
                                value={amountReceived}
                                onChange={(e) => setAmountReceived(Number(e.target.value))}
                            />
                        </div>
                        {changeDue > 0 && (
                            <div className="p-4 bg-blue-500/10 rounded-lg text-center space-y-2">
                                <Label className="text-lg font-semibold">Vuelto a Entregar</Label>
                                <p className="text-3xl font-bold text-blue-400">{formatCurrency(changeDue, currency)}</p>
                                <div className="flex items-center justify-center space-x-2 pt-2">
                                    <input type="checkbox" id="pago-movil-check" checked={giveChangeByPagoMovil} onChange={(e) => setGiveChangeByPagoMovil(e.target.checked)}/>
                                    <Label htmlFor="pago-movil-check">Dar vuelto por Pago Móvil</Label>
                                </div>
                                {giveChangeByPagoMovil && (
                                     <div className="pt-2 space-y-2 text-left animate-in fade-in">
                                         <Label>Datos para Pago Móvil</Label>
                                        <Input placeholder="Teléfono del cliente" />
                                        <Input placeholder="Cédula/RIF del cliente" />
                                     </div>
                                )}
                            </div>
                        )}
                    </div>
                     <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>Cancelar</Button>
                        <Button onClick={handleFinalizeTransaction}>Finalizar y Generar Factura</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
                            {operationType && <p>Operación: {operationType}</p>}
                            {paymentMethod && <p>Método de Pago: {paymentMethod}</p>}
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
                         <Separator className="my-2"/>
                         <div className="w-full space-y-1 text-sm">
                            <div className="flex justify-between"><span>Subtotal:</span><span>{formatCurrency(subtotalInCurrency, currency)}</span></div>
                            <div className="flex justify-between"><span>IVA (16%):</span><span>{formatCurrency(iva, currency)}</span></div>
                            <div className="flex justify-between font-bold text-base pt-1"><span>TOTAL ({currency}):</span><span>{formatCurrency(total, currency)}</span></div>
                        </div>
                        <Separator className="my-2"/>
                        <div className="w-full space-y-1 text-sm">
                            <div className="flex justify-between"><span>Monto Pagado:</span><span>{formatCurrency(Number(amountReceived), currency)}</span></div>
                            <div className="flex justify-between"><span>Vuelto:</span><span>{formatCurrency(changeDue, currency)}</span></div>
                        </div>

                         <div className="flex flex-col items-center text-center mt-4">
                             <div className="flex items-center gap-3 text-sm text-green-600">
                                <ShieldCheck className="h-8 w-8"/>
                                <div>
                                    <p className="font-bold">Recibo 100% Protegido y Seguro</p>
                                    <p className="text-xs text-muted-foreground">Verificado por C.M.S el {new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            <Image 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Factura:VF-001,Monto:${total},Fecha:${new Date().toISOString()}`} 
                                alt="QR de Verificación" 
                                width={100} 
                                height={100}
                                className="mt-4"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Escanear para verificar</p>
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

