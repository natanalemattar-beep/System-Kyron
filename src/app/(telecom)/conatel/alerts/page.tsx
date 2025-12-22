
"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

const activeAlerts = [
    { id: "ALERT-001", type: "CRÍTICA", description: "CON-003 vencida - 68 días - Multa estimada: $1,054", date: "2024-06-01" },
    { id: "ALERT-002", type: "ADVERTENCIA", description: "CON-001 por vencer en 45 días.", date: "2028-02-04" },
];

const penaltyHistory = [
    { id: "MULTA-2023-01", date: "15/09/2023", license: "CON-001", amount: 500, reason: "Presentación extemporánea de informe", status: "Pagada" },
];

export default function AlertsPage() {
    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Alertas y Multas</h1>
                <p className="text-muted-foreground mt-2">
                    Panel centralizado para notificaciones de cumplimiento y gestión de sanciones.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Alertas Activas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {activeAlerts.map(alert => (
                        <Alert key={alert.id} variant={alert.type === 'CRÍTICA' ? 'destructive' : 'default'}>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>{alert.type}</AlertTitle>
                            <AlertDescription className="flex justify-between items-center">
                                <span>{alert.description}</span>
                                <Button size="sm" variant={alert.type === 'CRÍTICA' ? 'destructive' : 'secondary'}>Gestionar</Button>
                            </AlertDescription>
                        </Alert>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Sanciones</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Multa</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Licencia Afectada</TableHead>
                                <TableHead>Motivo</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {penaltyHistory.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.license}</TableCell>
                                    <TableCell>{item.reason}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.amount, '$')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Configuración de Notificaciones</CardTitle>
                    <CardDescription>Personaliza cómo y cuándo quieres recibir alertas.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for form controls */}
                    <div className="space-y-4">
                        <p>Controles de formulario para configurar notificaciones (Email, WhatsApp, etc.) irían aquí.</p>
                        <Button>
                            <Settings className="mr-2"/>
                            Guardar Preferencias
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
