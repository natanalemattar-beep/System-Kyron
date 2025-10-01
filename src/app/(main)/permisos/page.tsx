
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, PlusCircle, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const permisos = [
    { id: "PERM-001", tipo: "Permiso Sanitario", emisor: "SACS", fechaEmision: "15/01/2024", fechaVencimiento: "15/01/2025", estado: "Vigente" },
    { id: "PERM-002", tipo: "Licencia de Actividades Económicas", emisor: "Alcaldía de Caracas", fechaEmision: "01/03/2024", fechaVencimiento: "01/03/2025", estado: "Vigente" },
    { id: "PERM-003", tipo: "Conformidad de Uso (Bomberos)", emisor: "Cuerpo de Bomberos", fechaEmision: "20/02/2024", fechaVencimiento: "20/08/2024", estado: "Por Vencer" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Vigente: "default",
  "Por Vencer": "secondary",
  Vencido: "destructive",
};

export default function PermisosPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <UserCheck className="h-8 w-8" />
                Gestión de Permisos
            </h1>
            <p className="text-muted-foreground mt-2">
                Consulta y gestiona todos los permisos y licencias de tu empresa.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            Solicitar Nuevo Permiso
        </Button>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Permisos y Licencias</CardTitle>
            <CardDescription>Listado de todos los permisos activos y su estado.</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Referencia</TableHead>
                        <TableHead>Tipo de Permiso</TableHead>
                        <TableHead>Ente Emisor</TableHead>
                        <TableHead>Fecha Emisión</TableHead>
                        <TableHead>Fecha Vencimiento</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {permisos.map((permiso) => (
                        <TableRow key={permiso.id}>
                            <TableCell className="font-medium">{permiso.id}</TableCell>
                            <TableCell>{permiso.tipo}</TableCell>
                            <TableCell>{permiso.emisor}</TableCell>
                            <TableCell>{permiso.fechaEmision}</TableCell>
                            <TableCell>{permiso.fechaVencimiento}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[permiso.estado]}>{permiso.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
