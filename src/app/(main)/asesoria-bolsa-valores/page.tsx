
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { AreaChart, LineChart, CandlestickChart, ArrowRight, TrendingUp, Zap, Send, Bell, CheckCircle } from "lucide-react";
import { Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { useToast } from "@/hooks/use-toast";

const marketData = [
  { date: "Ene '24", value: 4800 },
  { date: "Feb '24", value: 4950 },
  { date: "Mar '24", value: 5100 },
  { date: "Abr '24", value: 5050 },
  { date: "May '24", value: 5200 },
  { date: "Jun '24", value: 5350 },
  { date: "Jul '24", value: 5450 },
];

const stockRecommendations = [
    { ticker: "AAPL", company: "Apple Inc.", price: 195.50, recommendation: "Comprar", risk: "Bajo", reason: "Sólido ecosistema y lanzamiento de nuevos productos." },
    { ticker: "NVDA", company: "NVIDIA Corp.", price: 120.80, recommendation: "Comprar", risk: "Medio", reason: "Líder indiscutible en el mercado de IA y chips gráficos." },
    { ticker: "TSLA", company: "Tesla, Inc.", price: 230.10, recommendation: "Mantener", risk: "Alto", reason: "Potencial a largo plazo pero con alta volatilidad a corto plazo." },
    { ticker: "PFE", company: "Pfizer Inc.", price: 28.50, recommendation: "Vender", risk: "Bajo", reason: "Perspectivas de crecimiento post-pandemia a la baja." },
];

const portfolioData = [
  { name: 'Tecnología', value: 45 },
  { name: 'Consumo', value: 25 },
  { name: 'Salud', value: 15 },
  { name: 'Industrial', value: 10 },
  { name: 'Otros', value: 5 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const aiInsights = [
    "La recomendación de compra para NVIDIA se basa en su dominio del 80% del mercado de GPU para IA, un sector con un crecimiento proyectado del 35% anual.",
    "A pesar de la recomendación de 'Mantener' para Tesla, se debe monitorear de cerca la competencia creciente en el sector de vehículos eléctricos.",
    "La venta de Pfizer se sugiere para reasignar capital a sectores con mayor potencial de crecimiento a corto y mediano plazo, como la IA."
];

const riskVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
  Bajo: "default",
  Medio: "secondary",
  Alto: "destructive",
};
const recommendationVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Comprar: "default",
  Mantener: "secondary",
  Vender: "outline",
};

export default function AsesoriaBolsaPage() {
    const { toast } = useToast();

    const handleRequestApproval = (stock: any) => {
        toast({
            title: "Solicitud de Aprobación Enviada",
            description: `Se ha enviado una alerta para aprobar la compra de ${stock.ticker}.`,
            action: <CheckCircle className="text-green-500" />
        });
    };

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CandlestickChart className="h-8 w-8" />
            Asesoría de Inversión en Bolsa de Valores
        </h1>
        <p className="text-muted-foreground mt-2">
          Análisis de mercado, oportunidades y alertas de inversión generadas por IA.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">S&P 500</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500"/>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">5,450.70</p>
                <p className="text-xs text-green-500">+1.2%</p>
            </CardContent>
        </Card>
         <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Volatilidad (VIX)</CardTitle>
                <Activity className="h-4 w-4 text-orange-400"/>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">14.2</p>
                <p className="text-xs text-orange-400">Nivel Moderado</p>
            </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Market Cap Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">$45.5T</p>
                <p className="text-xs text-muted-foreground">Capitalización de mercado</p>
            </CardContent>
        </Card>
      </div>

       <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Tendencia del Mercado (S&P 500 YTD)</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketData}>
                         <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis domain={['dataMin - 100', 'dataMax + 100']} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))' }}/>
                        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Oportunidades de Inversión Identificadas por IA</CardTitle>
            <CardDescription>
                Recomendaciones basadas en análisis técnico, fundamental y de sentimiento de mercado.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Activo</TableHead>
                        <TableHead>Recomendación</TableHead>
                        <TableHead>Riesgo</TableHead>
                        <TableHead>Justificación</TableHead>
                        <TableHead className="text-right">Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stockRecommendations.map(stock => (
                        <TableRow key={stock.ticker}>
                            <TableCell className="font-medium">
                                {stock.company} ({stock.ticker})
                                <p className="text-sm text-muted-foreground">{formatCurrency(stock.price, "USD")}</p>
                            </TableCell>
                            <TableCell><Badge variant={recommendationVariant[stock.recommendation]}>{stock.recommendation}</Badge></TableCell>
                            <TableCell><Badge variant={riskVariant[stock.risk]}>{stock.risk}</Badge></TableCell>
                            <TableCell className="text-sm text-muted-foreground">{stock.reason}</TableCell>
                            <TableCell className="text-right">
                                {stock.recommendation === "Comprar" && (
                                    <Button size="sm" onClick={() => handleRequestApproval(stock)}>
                                        <Bell className="mr-2 h-4 w-4"/>
                                        Solicitar Aprobación
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Composición del Portafolio Actual</CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={portfolioData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {portfolioData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))' }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Zap className="text-primary"/>Conclusiones y Estrategias Sugeridas por IA</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {aiInsights.map((insight, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                                <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0"/>
                                <span>{insight}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                 <CardFooter>
                    <Button variant="outline">Ver Análisis Completo</Button>
                </CardFooter>
            </Card>
      </div>

    </div>
  );
}
