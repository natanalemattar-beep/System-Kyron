
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Plus, Minus, X, TabletSmartphone, Printer, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const products = [
    { id: 1, name: "Resma de Papel", price: 7.50, image: "https://picsum.photos/seed/paper/200/200" },
    { id: 2, name: "Tóner de Impresora", price: 85.00, image: "https://picsum.photos/seed/toner/200/200" },
    { id: 3, name: "Caja de Bolígrafos", price: 5.00, image: "https://picsum.photos/seed/pens/200/200" },
    { id: 4, name: "Silla de Oficina", price: 150.00, image: "https://picsum.photos/seed/chair/200/200" },
    { id: 5, name: "Laptop 14''", price: 650.00, image: "https://picsum.photos/seed/laptop/200/200" },
    { id: 6, name: "Monitor 24''", price: 250.00, image: "https://picsum.photos/seed/monitor/200/200" },
    { id: 7, name: "Teclado Inalámbrico", price: 45.00, image: "https://picsum.photos/seed/keyboard/200/200" },
    { id: 8, name: "Mouse Óptico", price: 25.00, image: "https://picsum.photos/seed/mouse/200/200" },
];

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

export default function PuntoDeVentaPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const { toast } = useToast();

    const addToCart = (product: typeof products[0]) => {
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
    
    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }

    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    
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
            title: "Venta Completada",
            description: "El punto de venta está listo para una nueva transacción.",
             action: <CheckCircle className="text-green-500" />
        });
    }

    return (
        <div className="h-screen bg-muted flex flex-col p-4 gap-4">
            <header className="flex items-center justify-between bg-background p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                    <TabletSmartphone className="h-6 w-6" />
                    <h1 className="text-xl font-bold">Punto de Venta</h1>
                </div>
                <Button onClick={() => setCart([])} variant="destructive" size="sm">Vaciar Carrito</Button>
            </header>

            <div className="flex-grow grid lg:grid-cols-3 gap-4 overflow-hidden">
                {/* Product Catalog */}
                <div className="lg:col-span-2 bg-background p-4 rounded-lg shadow-sm overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map(product => (
                            <Card key={product.id} onClick={() => addToCart(product)} className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-0 flex flex-col items-center">
                                    <Image src={product.image} alt={product.name} width={200} height={200} className="aspect-square object-cover rounded-t-lg" />
                                    <div className="p-2 text-center w-full">
                                        <p className="text-sm font-medium truncate">{product.name}</p>
                                        <p className="text-xs text-muted-foreground">{formatCurrency(product.price, 'Bs.')}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <Card className="lg:col-span-1 flex flex-col">
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
                                                <p className="text-xs text-muted-foreground">{formatCurrency(item.price, 'Bs.')} c/u</p>
                                            </TableCell>
                                            <TableCell className="w-28">
                                                <div className="flex items-center gap-1">
                                                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.id, -1)}><Minus className="h-3 w-3"/></Button>
                                                    <span className="w-6 text-center">{item.quantity}</span>
                                                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.id, 1)}><Plus className="h-3 w-3"/></Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">{formatCurrency(item.price * item.quantity, 'Bs.')}</TableCell>
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
                        <div className="w-full space-y-2 text-sm mb-4">
                            <div className="flex justify-between"><span>Subtotal:</span><span>{formatCurrency(subtotal, 'Bs.')}</span></div>
                            <div className="flex justify-between"><span>IVA (16%):</span><span>{formatCurrency(iva, 'Bs.')}</span></div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total a Pagar:</span><span>{formatCurrency(total, 'Bs.')}</span></div>
                        </div>
                        <Button className="w-full text-lg h-12" onClick={handleCheckout}>Cobrar</Button>
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
                        <div className="my-4">
                            <p className="text-xs">Fecha: {new Date().toLocaleString('es-VE')}</p>
                            <Table className="mt-2">
                                 <TableBody>
                                    {cart.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name} <br/> <span className="text-muted-foreground text-xs">{item.quantity} x {formatCurrency(item.price, 'Bs.')}</span></TableCell>
                                            <TableCell className="text-right font-medium">{formatCurrency(item.price * item.quantity, 'Bs.')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <Separator className="my-2"/>
                         <div className="w-full space-y-1 text-sm">
                            <div className="flex justify-between"><span>Subtotal:</span><span>{formatCurrency(subtotal, 'Bs.')}</span></div>
                            <div className="flex justify-between"><span>IVA (16%):</span><span>{formatCurrency(iva, 'Bs.')}</span></div>
                            <div className="flex justify-between font-bold text-lg pt-1"><span>TOTAL:</span><span>{formatCurrency(total, 'Bs.')}</span></div>
                        </div>
                        <p className="text-center text-xs mt-4">¡Gracias por su compra!</p>
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

// Add styles for printing
const styles = `
@media print {
    body * {
        visibility: hidden;
    }
    .print-content, .print-content * {
        visibility: visible;
    }
    .print-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }
    @page {
        size: 80mm auto; /* Adjust for thermal printer roll width */
        margin: 5mm;
    }
}
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
