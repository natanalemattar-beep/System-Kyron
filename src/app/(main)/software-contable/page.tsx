
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileWarning, Puzzle, ShieldCheck, Trophy } from "lucide-react";

const softwareList = [
    { rif: "J000126518", empresa: "COMPAÑÍA ANÓNIMA EMPRESA CINES UNIDOS", sistema: "VISTA", version: "5.0.12.26", categoria: "Gestión de cines y salas de entretenimiento." },
    { rif: "J001871985", empresa: "ALIMENTOS ARCOS DORADOS C.A.", sistema: "NEWPOS", version: "3.5", categoria: "Punto de venta (POS) para cadenas de comida rápida McDonald's." },
    { rif: "J301850971", empresa: "PAPELERÍA LA NUBE AZUL, C.A.", sistema: "SISTEMA ADMINISTRATIVO OFIMANIA (SAP)", version: "1.0", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J305125430", empresa: "INFOTAX INFORMÁTICA TRIBUTARIA S.A.", sistema: "GALAC SISTEMA ADMINISTRATIVO SAW", version: "30.0", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J506491060", empresa: "SAINT ENTERPRISE 2.0 C.A.", sistema: "SAINT ENTERPRISE ADMINISTRATIVO", version: "9.7.5.0", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J296717508", empresa: "TECNOLAB SISTEMAS 21", sistema: "INFOLAB", version: "2.0.a", categoria: "Gestión operativa de laboratorios, incluyendo facturación, control de muestras y resultados." },
    { rif: "J308016284", empresa: "A2SOFTWAY C.A.", sistema: "A2 PUNTO DE VENTA", version: "10.00.0ALX", categoria: "Gestión de punto de venta (POS) para ventas directas." },
    { rif: "J308016284", empresa: "A2SOFTWAY C.A.", sistema: "A2 HERRAMIENTA ADMINISTRATIVA CONFIGURABLE MODULO DE VENTA (HAC)", version: "13.01.0ALX", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J308016284", empresa: "A2SOFTWAY C.A.", sistema: "A2 ADMINISTRATIVO BASICO MODULO DE VENTAS", version: "10.0.1ALX", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J309827316", empresa: "SMS CONSULTORES C.A.", sistema: "SISTEMA OASIS", version: "12.0.2.5", categoria: "Sistema integral para la administración empresarial, gestión de operaciones, facturación (POS) e inventario." },
    { rif: "J294813488", empresa: "SISTEMAS D3XD C.A.", sistema: "D3XD CLÍNICAS ADMINISTRATIVO", version: "1.1.18", categoria: "Gestión administrativa integral (ERP) para clinicas y centros de salud." },
    { rif: "J294813488", empresa: "SISTEMAS D3XD C.A.", sistema: "D3Xd Gym", version: "1.0.10", categoria: "Gestión administrativa integral (ERP) para gimnasios." },
    { rif: "J294813488", empresa: "SISTEMAS D3XD C.A.", sistema: "GISIN3", version: "1.1.35", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J307928220", empresa: "KLK SISTEMAS, C.A.", sistema: "KLK POS", version: "4.0.1.7", categoria: "Sistema integral para la administración empresarial, gestión de operaciones, facturación (POS) e inventario." },
    { rif: "J299295760", empresa: "WINLEDGER INTERNACIONAL C.A.", sistema: "SOFTWARE WINLEDGER FACTURACIÓN Y PRODUCTOS", version: "2025.2.405", categoria: "Gestión administrativa integral (ERP) para ventas directas." },
    { rif: "J297059172", empresa: "CORPORACION VNET C.A.", sistema: "BUSINESS CENTRAL", version: "25.3.28755.29171", categoria: "Gestión administrativa integral (ERP) para proveedores de servicios de Internet, incluyendo administración de clientes, planes y facturación." },
    { rif: "J505724347", empresa: "TOTAL APLICACIONES L.C.A.", sistema: "SIMPLITPOS", version: "4.2.06.04", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J402385358", empresa: "THE FACTORY HKA VENEZUELA C.A.", sistema: "HKA FE (PORTAL WEB Y API DE EMISION DE DOCUMENTOS)", version: "1.1", categoria: "Portal web y API para emisión de facturas y otros documentos Fiscales." },
    { rif: "J316353737", empresa: "PROCERT ITFB, C.A.", sistema: "SIGECE (PORTAL WEB DE EMISION DE DOCUMENTOS)", version: "1.2", categoria: "Portal web para emisión de facturas y otros documentos Fiscales." },
    { rif: "J314584855", empresa: "INSITE VENEZUELA, C.A.", sistema: "HYBRID LITEPRO", version: "4", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J314584855", empresa: "INSITE VENEZUELA, C.A.", sistema: "HYBRID LITEOS", version: "3", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
];


const internationalSystems = [
    { name: "Odoo", description: "Un ERP de código abierto muy popular y personalizable. Su fortaleza es su modularidad (CRM, Ventas, Contabilidad, etc.), pero requiere una implementación y adaptación significativa para cumplir con las regulaciones fiscales específicas de Venezuela (como el SENIAT), lo que implica costos de consultoría adicionales." },
    { name: "SAP Business One", description: "Una solución robusta de un líder mundial, diseñada para PYMES. Es potente y escalable, pero su costo de licenciamiento e implementación es considerablemente más alto que las soluciones locales." },
    { name: "Oracle NetSuite", description: "Un ERP 100% en la nube que unifica contabilidad, CRM y comercio electrónico. Al igual que SAP, su principal desafío en Venezuela es el alto costo y la necesidad de localización para cumplir con la normativa fiscal." }
];

const competitorAnalysis = [
    {
        system: "Saint",
        target: "PYMES y grandes empresas",
        robustness: "Muy alta. Considerado uno de los más robustos y estables para manejar grandes volúmenes de transacciones y operaciones complejas.",
        easeOfUse: "Moderada a Baja. Su interfaz es tradicionalmente menos intuitiva y requiere personal con experiencia o capacitación específica.",
        ecosystem: "Fuerte. Posee una amplia red de canales de distribución y consultores, aunque su capacidad de integración vía API puede ser más limitada que sistemas modernos."
    },
    {
        system: "a2 (A2 Softway)",
        target: "PYMES, especialmente en el sector retail.",
        robustness: "Alta. Es un sistema muy popular y probado en el mercado venezolano, con buena capacidad para gestionar puntos de venta.",
        easeOfUse: "Moderada. Su interfaz es más amigable que la de sistemas más antiguos, pero aún puede tener una curva de aprendizaje.",
        ecosystem: "Fuerte. Amplia red de distribución y soporte técnico en todo el país. Buenas capacidades para puntos de venta."
    },
    {
        system: "Profit Plus",
        target: "PYMES y grandes empresas.",
        robustness: "Alta. Similar a Saint en cuanto a robustez, es una solución muy completa para la gestión administrativa y contable.",
        easeOfUse: "Moderada. La interfaz es funcional pero puede ser considerada densa para nuevos usuarios.",
        ecosystem: "Fuerte. Cuenta con una comunidad de consultores bien establecida y módulos que cubren diversas áreas del negocio."
    },
    {
        system: "Galac",
        target: "PYMES y corporaciones, con un enfoque fuerte en el cumplimiento fiscal.",
        robustness: "Alta. Conocido por su fiabilidad en el ámbito contable y su rápida adaptación a los cambios del SENIAT.",
        easeOfUse: "Moderada. Tradicionalmente enfocado en el contador, su interfaz prioriza la funcionalidad fiscal sobre la experiencia de usuario moderna.",
        ecosystem: "Moderado. Buena reputación en el nicho fiscal, pero puede tener menos integraciones que otros sistemas más abiertos."
    }
];


export default function SoftwareContablePage() {
    return (
        <div className="p-4 md:p-8 space-y-12">
           <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Puzzle className="h-10 w-10 text-primary"/>
            Guía para Elegir tu Sistema Administrativo en Venezuela
        </h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          En un entorno donde la inflación y los impuestos son retos constantes, contar con un sistema confiable no es un lujo: es un salvavidas que da control y tranquilidad al empresario.
        </p>
      </header>

      <Alert variant="destructive" className="max-w-4xl mx-auto">
          <FileWarning className="h-4 w-4"/>
          <AlertTitle>Advertencia Oficial del SENIAT</AlertTitle>
          <AlertDescription>
            Según la <strong>Providencia Administrativa N° SNAT/2024/000121</strong> (Gaceta Oficial N° 43.032), solo están autorizados los Software Homologados y sus versiones específicas. El uso de software no homologado puede acarrear severas sanciones.
          </AlertDescription>
      </Alert>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Trophy className="text-primary"/>Análisis Competitivo: ¿Cuál es el Sistema Más Robusto?</CardTitle>
                    <CardDescription>Aunque la elección del "mejor" sistema depende de las necesidades específicas de cada empresa, aquí comparamos los jugadores más consolidados del mercado venezolano.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[15%]">Sistema</TableHead>
                                    <TableHead className="w-[20%]">Mercado Objetivo</TableHead>
                                    <TableHead className="w-[25%]">Robustez y Escalabilidad</TableHead>
                                    <TableHead className="w-[20%]">Facilidad de Uso</TableHead>
                                    <TableHead className="w-[20%]">Ecosistema e Integraciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {competitorAnalysis.map((item) => (
                                    <TableRow key={item.system}>
                                        <TableCell className="font-bold text-lg">{item.system}</TableCell>
                                        <TableCell className="text-sm">{item.target}</TableCell>
                                        <TableCell className="text-sm">{item.robustness}</TableCell>
                                        <TableCell className="text-sm">{item.easeOfUse}</TableCell>
                                        <TableCell className="text-sm">{item.ecosystem}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                     <Alert className="mt-6">
                        <AlertTitle>Conclusión del Análisis</AlertTitle>
                        <AlertDescription>
                            Sistemas como **Saint** y **Profit Plus** son tradicionalmente considerados los más robustos para operaciones complejas y grandes volúmenes, aunque con una curva de aprendizaje más pronunciada. **A2** destaca por su fuerte presencia en el sector retail y puntos de venta. **Galac** es reconocido por su enfoque en el cumplimiento fiscal. **System C.M.S.** busca combinar la robustez de los sistemas tradicionales con una interfaz moderna, facilidad de uso y un ecosistema de IA integrado que ninguno de los competidores ofrece de forma nativa.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Listado de Software de Facturación Homologado</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>RIF</TableHead>
                                    <TableHead>Empresa</TableHead>
                                    <TableHead>Sistema</TableHead>
                                    <TableHead>Versión</TableHead>
                                    <TableHead>Categoría</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {softwareList.map((item) => (
                                    <TableRow key={item.rif + item.sistema + item.version}>
                                        <TableCell className="font-mono">{item.rif}</TableCell>
                                        <TableCell className="font-medium">{item.empresa}</TableCell>
                                        <TableCell>{item.sistema}</TableCell>
                                        <TableCell className="font-semibold">{item.version}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{item.categoria}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Alternativas Internacionales y su Contexto en Venezuela</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {internationalSystems.map(system => (
                        <div key={system.name} className="p-4 bg-secondary/50 rounded-lg">
                            <h4 className="font-semibold">{system.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{system.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}
