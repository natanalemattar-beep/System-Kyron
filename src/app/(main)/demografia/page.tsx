
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Globe, Building, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const globalStats = [
    { title: "Población Mundial", value: "8.1 Billones", icon: Globe },
    { title: "Tasa de Crecimiento Anual", value: "0.88%", icon: TrendingUp },
    { title: "Población Urbana", value: "57%", icon: Building },
    { title: "Edad Media Global", value: "30.5 años", icon: Users },
];

const pymesData = [
    { name: "Comercio", value: 45, fill: "hsl(var(--primary))" },
    { name: "Servicios", value: 35, fill: "hsl(var(--accent-foreground))" },
    { name: "Manufactura", value: 15, fill: "#64748b" },
    { name: "Otros", value: 5, fill: "#94a3b8" },
];

const comercioData = [
    { year: 2022, "Crecimiento E-commerce (%)": 15 },
    { year: 2023, "Crecimiento E-commerce (%)": 22 },
    { year: 2024, "Crecimiento E-commerce (%)": 28 },
    { year: 2025, "Crecimiento E-commerce (%)": 35 },
];


export default function DemografiaPage() {
  return (
    <div className="space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8" />
            Análisis Demográfico y de Mercado
        </h1>
        <p className="text-muted-foreground mt-2">
          Visión global del panorama demográfico y análisis de los sectores donde opera System C.M.S.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Demografía Mundial: Indicadores Clave</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalStats.map(stat => (
                <div key={stat.title} className="p-6 bg-secondary/50 rounded-lg text-center">
                    <stat.icon className="h-10 w-10 text-primary mx-auto mb-4"/>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                </div>
            ))}
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Análisis de Sectores Clave en Venezuela</CardTitle>
            <CardDescription>Entiende la estructura de los mercados donde tu negocio compite.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="pymes">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pymes">PYMES y Emprendedores</TabsTrigger>
                    <TabsTrigger value="comercio">Comercio y Servicios</TabsTrigger>
                </TabsList>
                <TabsContent value="pymes" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-lg">Radiografía de las PYMES</h4>
                            <div className="p-3 bg-secondary/50 rounded-lg">
                                <p className="text-sm text-muted-foreground">Número Estimado en Venezuela</p>
                                <p className="text-2xl font-bold">~ 280,000</p>
                            </div>
                            <div className="p-3 bg-secondary/50 rounded-lg">
                                <p className="text-sm text-muted-foreground">Contribución al Empleo</p>
                                <p className="text-2xl font-bold">~ 60%</p>
                            </div>
                             <div className="p-3 bg-secondary/50 rounded-lg">
                                <p className="text-sm text-muted-foreground">Principal Barrera de Crecimiento</p>
                                <p className="text-lg font-semibold">Complejidad Fiscal y Administrativa</p>
                            </div>
                        </div>
                         <div className="h-80">
                            <h4 className="font-semibold text-lg text-center mb-4">Distribución por Sector</h4>
                             <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                <Pie data={pymesData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                     {pymesData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))' }}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </TabsContent>
                 <TabsContent value="comercio" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-lg">El Sector Terciario</h4>
                            <div className="p-3 bg-secondary/50 rounded-lg">
                                <p className="text-sm text-muted-foreground">Tamaño del Sector (Aporte al PIB)</p>
                                <p className="text-2xl font-bold">~ 55%</p>
                            </div>
                            <div className="p-3 bg-secondary/50 rounded-lg">
                                <p className="text-sm text-muted-foreground">Establecimientos Comerciales</p>
                                <p className="text-2xl font-bold">+ 400,000</p>
                            </div>
                        </div>
                         <div className="h-80">
                            <h4 className="font-semibold text-lg text-center mb-4">Crecimiento del E-commerce</h4>
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={comercioData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip content={<ChartTooltipContent formatter={(value) => `${value}%`} />} />
                                <Legend />
                                <Bar dataKey="Crecimiento E-commerce (%)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
      
       <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
            <CardTitle>Proyecciones y Oportunidades Futuras</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p><strong className="text-primary">Digitalización Acelerada:</strong> La necesidad de cumplimiento fiscal y eficiencia está impulsando una rápida adopción de herramientas digitales, un mercado clave para System C.M.S.</p>
            <p><strong className="text-primary">Crecimiento del E-commerce:</strong> El auge del comercio electrónico exige sistemas de facturación y gestión de inventario integrados y automatizados.</p>
            <p><strong className="text-primary">Demanda de Sostenibilidad:</strong> Las empresas buscan cada vez más soluciones que, como la Papelera Inteligente, les ayuden a cumplir con objetivos de responsabilidad social y ambiental.</p>
        </CardContent>
      </Card>
    </div>
  );
}
