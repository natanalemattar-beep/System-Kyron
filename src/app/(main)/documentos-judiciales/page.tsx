
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const documentos = [
    {
        id: "DJ-2024-001",
        fecha: "10/06/2024",
        tipo: "Sentencia Definitiva",
        caso: "Expediente N° 123-456",
        estado: "Archivado",
    },
    {
        id: "DJ-2024-002",
        fecha: "20/07/2024",
        tipo: "Auto de Admisión",
        caso: "Expediente N° 789-012",
        estado: "Activo",
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Archivado: "outline",
  Activo: "secondary",
};


export default function DocumentosJudicialesPage() {
  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentos Judiciales</h1>
          <p className="text-muted-foreground">
            Consulta y gestiona tus documentos judiciales.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2" />
          Nueva Solicitud
        </Button>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nro. Documento</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Caso</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documentos.map((doc) => (
                        <TableRow key={doc.id}>
                            <TableCell className="font-medium">{doc.id}</TableCell>
                            <TableCell>{doc.fecha}</TableCell>
                            <TableCell>{doc.tipo}</TableCell>
                            <TableCell>{doc.caso}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[doc.estado]}>{doc.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="mr-2">
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <FileDown className="h-4 w-4" />
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
