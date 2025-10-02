
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, PlusCircle, CreditCard, Eye, FileScan } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const cuentasBancarias = [
    { id: 1, banco: "Banco de Venezuela", logo: "/banks/bdv.png", numero: "**** **** **** 1234", tipo: "Corriente", saldo: 150000, moneda: "Bs." },
    { id: 2, banco: "Banesco", logo: "/banks/banesco.png", numero: "**** **** **** 5678", tipo: "Corriente", saldo: 25000, moneda: "Bs." },
    { id: 3, banco: "Mercantil", logo: "/banks/mercantil.png", numero: "**** **** **** 9012", tipo: "Corriente", saldo: 75000, moneda: "Bs." },
    { id: 4, banco: "Bancamiga", logo: "/banks/bancamiga.png", numero: "**** **** **** 3456", tipo: "Cuenta en Dólares", saldo: 12500, moneda: "USD" },
    { id: 5, banco: "Banco Provincial", logo: "/banks/provincial.png", numero: "**** **** **** 1122", tipo: "Corriente", saldo: 95000, moneda: "Bs." },
    { id: 6, banco: "Banco Nacional de Crédito", logo: "/banks/bnc.png", numero: "**** **** **** 3344", tipo: "Corriente", saldo: 62000, moneda: "Bs." },
    { id: 7, banco: "Bancaribe", logo: "/banks/bancaribe.png", numero: "**** **** **** 5566", tipo: "Corriente", saldo: 48000, moneda: "Bs." },
    { id: 8, banco: "Banco Exterior", logo: "/banks/exterior.png", numero: "**** **** **** 7788", tipo: "Corriente", saldo: 31000, moneda: "Bs." },
    { id: 9, banco: "Banco del Tesoro", logo: "/banks/tesoro.png", numero: "**** **** **** 9900", tipo: "Gubernamental", saldo: 250000, moneda: "Bs." },
    { id: 10, banco: "Banco Bicentenario", logo: "/banks/bicentenario.png", numero: "**** **** **** 1212", tipo: "Gubernamental", saldo: 180000, moneda: "Bs." },
];

const puntosDeVenta = [
    { id: "POS-001", banco: "Banesco", cuentaAfiliada: "**** 5678", estado: "Activo" },
    { id: "POS-002", banco: "Banco de Venezuela", cuentaAfiliada: "**** 1234", estado: "Activo" },
    { id: "POS-003", banco: "Mercantil", cuentaAfiliada: "**** 9012", estado: "Inactivo" },
];

const statusVariant: { [key: string]: "default" | "destructive" } = {
  Activo: "default",
  Inactivo: "destructive",
};

export default function CuentasBancariasPage() {
    const { toast } = useToast();

    const handleAction = (message: string) => {
        toast({
            title: "Acción Realizada",
            description: message,
        });
    };

  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Landmark className="h-8 w-8" />
                Cuentas Bancarias y POS
            </h1>
            <p className="text-muted-foreground mt-2">
              Consulta saldos, movimientos y gestiona tus puntos de venta.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            Agregar Cuenta/POS
        </Button>
      </header>

      {/* Cuentas Bancarias */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cuentas Bancarias</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cuentasBancarias.map(cuenta => (
                <Card key={cuenta.id} className="bg-card/50 backdrop-blur-sm flex flex-col">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <Image src={cuenta.logo} alt={`${cuenta.banco} logo`} width={48} height={48} className="rounded-md" />
                        <div>
                            <CardTitle>{cuenta.banco}</CardTitle>
                            <CardDescription>{cuenta.tipo}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">Nro. de Cuenta</p>
                        <p className="font-mono text-lg">{cuenta.numero}</p>
                        <p className="text-sm text-muted-foreground mt-4">Saldo Disponible</p>
                        <p className="text-3xl font-bold text-primary">{formatCurrency(cuenta.saldo, cuenta.moneda)}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            <Eye className="mr-2"/>
                            Ver Estado de Cuenta
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>

      {/* Puntos de Venta */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Puntos de Venta (POS)</h2>
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Terminales Afiliados</CardTitle>
                <CardDescription>Gestiona los cierres de lote y el estado de tus puntos de venta.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID Terminal</TableHead>
                            <TableHead>Banco</TableHead>
                            <TableHead>Cuenta Afiliada</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {puntosDeVenta.map(pos => (
                            <TableRow key={pos.id}>
                                <TableCell className="font-mono">{pos.id}</TableCell>
                                <TableCell className="font-medium">{pos.banco}</TableCell>
                                <TableCell>{pos.cuentaAfiliada}</TableCell>
                                <TableCell><Badge variant={statusVariant[pos.estado]}>{pos.estado}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => handleAction(`Cierre de lote solicitado para ${pos.id}.`)}>
                                        <FileScan className="mr-2 h-4 w-4"/>
                                        Solicitar Cierre de Lote
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
