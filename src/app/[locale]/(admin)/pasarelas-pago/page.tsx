"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard, Banknote, Smartphone, Globe, ShieldCheck, Activity, Terminal,
  Wallet, Building2, Landmark, DollarSign, Zap, ArrowRightLeft, CircleDollarSign,
  Coins, QrCode, Store, BadgeCheck, TrendingUp, Lock, Eye, EyeOff,
  Copy, ExternalLink, Settings2, ToggleLeft, ToggleRight, CircleCheck, Hash
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Gateway {
  name: string;
  description: string;
  fees: string;
  status: "Activo" | "Configurado" | "Pendiente" | "Primario";
  icon: React.ElementType;
  color: string;
  bg: string;
  borderColor: string;
  currencies: string[];
  features?: string[];
  network?: string;
  popular?: boolean;
}

const internacionales: Gateway[] = [
  {
    name: "PayPal",
    description: "Cobros y pagos internacionales con protección al comprador. Compatible con PayPal Business, invoicing y suscripciones recurrentes.",
    fees: "3.49% + $0.49",
    status: "Activo",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    currencies: ["USD", "EUR", "GBP", "CAD", "MXN"],
    features: ["Protección al comprador", "Suscripciones", "Invoicing", "Checkout Express"],
    popular: true,
  },
  {
    name: "Zelle",
    description: "Transferencias instantáneas P2P desde cuentas bancarias en EE.UU. Sin comisiones para el receptor.",
    fees: "0% comisión",
    status: "Activo",
    icon: DollarSign,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    currencies: ["USD"],
    features: ["Instantáneo", "Sin comisiones", "Verificación automática"],
    popular: true,
  },
  {
    name: "Stripe Connect",
    description: "Procesador líder mundial. Visa, MasterCard, AMEX, Apple Pay, Google Pay. Split payments y marketplace.",
    fees: "2.9% + $0.30",
    status: "Configurado",
    icon: CreditCard,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    currencies: ["USD", "EUR", "GBP", "BRL"],
    features: ["Apple Pay", "Google Pay", "Split Payments", "Suscripciones"],
  },
  {
    name: "Zinli",
    description: "Billetera digital para Latinoamérica. Pagos en USD sin comisiones internas. Popular en Venezuela.",
    fees: "0% internas / 1% retiro",
    status: "Activo",
    icon: Wallet,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    currencies: ["USD"],
    features: ["Sin comisión interna", "Tarjeta virtual", "Retiro ATM"],
    popular: true,
  },
  {
    name: "Wise (TransferWise)",
    description: "Transferencias internacionales con tasa de cambio real del mercado medio. Multi-moneda.",
    fees: "0.41% - 1.5%",
    status: "Configurado",
    icon: ArrowRightLeft,
    color: "text-green-500",
    bg: "bg-green-500/10",
    borderColor: "border-green-500/20",
    currencies: ["USD", "EUR", "GBP", "BRL", "COP"],
    features: ["Tasa real", "Multi-moneda", "Cuenta local"],
  },
  {
    name: "Remitly / Western Union",
    description: "Recepción de remesas internacionales. Acreditación directa en bolívares o dólares.",
    fees: "Variable según origen",
    status: "Activo",
    icon: Globe,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    currencies: ["USD", "EUR", "VES"],
    features: ["Remesas", "Cobertura global", "Efectivo/Banco"],
  },
  {
    name: "Tarjeta Débito/Crédito VE",
    description: "Visa, MasterCard, AMEX, Maestro en bolívares o divisas. POS físico y virtual integrado.",
    fees: "2.5% + IVA",
    status: "Activo",
    icon: CreditCard,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    currencies: ["VES", "USD"],
    features: ["POS físico", "POS virtual", "Contactless", "NFC"],
  },
  {
    name: "Efectivo USD / EUR",
    description: "Registro manual de pagos en efectivo en divisas. Recibos automáticos con tasa BCV.",
    fees: "0% comisión",
    status: "Activo",
    icon: Banknote,
    color: "text-lime-500",
    bg: "bg-lime-500/10",
    borderColor: "border-lime-500/20",
    currencies: ["USD", "EUR"],
    features: ["Recibo automático", "Tasa BCV", "Arqueo de caja"],
  },
];

const criptomonedas: Gateway[] = [
  {
    name: "Bitcoin (BTC)",
    description: "Red Bitcoin y Lightning Network. Pagos peer-to-peer con confirmación rápida vía Lightning.",
    fees: "Red: variable / LN: ~0.01%",
    status: "Activo",
    icon: Coins,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    currencies: ["BTC", "SATS"],
    network: "Bitcoin / Lightning",
    features: ["Lightning Network", "On-chain", "Cold wallet", "Auto-conversión VES"],
    popular: true,
  },
  {
    name: "Ethereum (ETH)",
    description: "Pagos en ETH y tokens ERC-20. Compatible con MetaMask, WalletConnect y hardware wallets.",
    fees: "Gas fee variable",
    status: "Activo",
    icon: Zap,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    currencies: ["ETH", "ERC-20"],
    network: "Ethereum / L2",
    features: ["MetaMask", "WalletConnect", "ERC-20", "Smart Contracts"],
  },
  {
    name: "USDT (Tether)",
    description: "Stablecoin 1:1 con USD. Disponible en TRC-20 (Tron), ERC-20 (Ethereum) y BEP-20 (BSC).",
    fees: "0.1% - 0.3% + gas",
    status: "Activo",
    icon: CircleDollarSign,
    color: "text-green-500",
    bg: "bg-green-500/10",
    borderColor: "border-green-500/20",
    currencies: ["USDT"],
    network: "TRC-20 / ERC-20 / BEP-20",
    features: ["Multi-red", "Stablecoin", "Liquidación VES", "Sin volatilidad"],
    popular: true,
  },
  {
    name: "USDC (Circle)",
    description: "Stablecoin regulada respaldada 1:1 con USD. Auditorías mensuales. Red Ethereum, Solana, Polygon.",
    fees: "0.1% conversión",
    status: "Activo",
    icon: CircleDollarSign,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    borderColor: "border-sky-500/20",
    currencies: ["USDC"],
    network: "ERC-20 / Solana / Polygon",
    features: ["Regulada", "Auditoría mensual", "Multi-red", "Reserve compatible"],
    popular: true,
  },
  {
    name: "Binance Pay",
    description: "Pasarela de pagos de Binance. Acepta BTC, ETH, BNB, USDT, BUSD y +300 criptos.",
    fees: "0% - 0.5%",
    status: "Activo",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    currencies: ["BTC", "ETH", "BNB", "USDT", "BUSD"],
    network: "Binance Smart Chain",
    features: ["QR Pay", "+300 criptos", "P2P Venezuela", "Auto-conversión"],
    popular: true,
  },
  {
    name: "Solana (SOL)",
    description: "Blockchain ultrarrápida con fees mínimos. Ideal para micropagos y transacciones frecuentes.",
    fees: "~$0.00025 por tx",
    status: "Configurado",
    icon: Zap,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    currencies: ["SOL", "SPL"],
    network: "Solana",
    features: ["Ultra-rápido", "Fees mínimos", "SPL tokens", "Phantom wallet"],
  },
  {
    name: "TRON (TRX)",
    description: "Red Tron para USDT-TRC20 y TRX. La red más usada en Venezuela para stablecoins.",
    fees: "~$0.50 por tx",
    status: "Activo",
    icon: Zap,
    color: "text-red-500",
    bg: "bg-red-500/10",
    borderColor: "border-red-500/20",
    currencies: ["TRX", "USDT-TRC20"],
    network: "TRON",
    features: ["TRC-20", "Bajo costo", "Popular en VE", "TronLink"],
  },
  {
    name: "Polygon (MATIC)",
    description: "Layer 2 de Ethereum. Transacciones rápidas y económicas. Compatible con dApps EVM.",
    fees: "~$0.01 por tx",
    status: "Configurado",
    icon: Hash,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    currencies: ["MATIC", "USDC", "USDT"],
    network: "Polygon",
    features: ["Layer 2", "EVM compatible", "Fees bajos", "USDC nativo"],
  },
  {
    name: "Litecoin (LTC)",
    description: "Pagos rápidos con confirmación en ~2.5 minutos. Alternativa económica a Bitcoin.",
    fees: "~$0.01 por tx",
    status: "Activo",
    icon: Coins,
    color: "text-slate-400",
    bg: "bg-slate-400/10",
    borderColor: "border-slate-400/20",
    currencies: ["LTC"],
    network: "Litecoin",
    features: ["Rápido", "Económico", "Amplia aceptación"],
  },
  {
    name: "Reserve (RSV/RToken)",
    description: "Protocolo descentralizado de stablecoins. Popular en Venezuela vía app Reserve.",
    fees: "0.1% por conversión",
    status: "Activo",
    icon: Wallet,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
    currencies: ["RSV", "USDC"],
    network: "Ethereum / Base",
    features: ["App Reserve", "Descentralizado", "Popular en VE", "Sin intermediarios"],
  },
];

const venezuela: Gateway[] = [
  {
    name: "Pago Móvil C2P",
    description: "Sistema de Cámara de Compensación Electrónica del BCV. Liquidación inmediata 24/7. Todos los bancos nacionales.",
    fees: "0% comisión",
    status: "Activo",
    icon: Smartphone,
    color: "text-primary",
    bg: "bg-primary/10",
    borderColor: "border-primary/20",
    currencies: ["VES"],
    features: ["24/7", "Instantáneo", "Todos los bancos", "Límite BCV diario"],
    popular: true,
  },
  {
    name: "Transferencia Bancaria",
    description: "Transferencias interbancarias vía ACH y LBTR. 29+ bancos conectados en red de compensación.",
    fees: "0% comisión",
    status: "Activo",
    icon: Landmark,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    currencies: ["VES"],
    features: ["ACH", "LBTR", "29 bancos", "Mismo día"],
    popular: true,
  },
  {
    name: "Biopago",
    description: "Sistema de pago biométrico del BDV. Autenticación con huella dactilar en puntos de venta.",
    fees: "0% comisión",
    status: "Activo",
    icon: BadgeCheck,
    color: "text-green-600",
    bg: "bg-green-600/10",
    borderColor: "border-green-600/20",
    currencies: ["VES"],
    features: ["Biométrico", "Huella dactilar", "Punto de venta", "BDV"],
  },
  {
    name: "Punto de Venta (POS)",
    description: "Terminales POS físicos y móviles. Compatible con todas las tarjetas nacionales Visa/MasterCard/Maestro.",
    fees: "1.5% - 3% + IVA",
    status: "Activo",
    icon: Store,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    currencies: ["VES"],
    features: ["Contactless", "Chip", "Banda magnética", "POS móvil"],
  },
  {
    name: "Pago QR (BCV)",
    description: "Sistema de pago con código QR estandarizado por el BCV. Escanea y paga desde cualquier banco.",
    fees: "0% comisión",
    status: "Configurado",
    icon: QrCode,
    color: "text-primary",
    bg: "bg-primary/10",
    borderColor: "border-primary/20",
    currencies: ["VES"],
    features: ["QR dinámico", "Estándar BCV", "Todos los bancos", "Inmediato"],
  },
  {
    name: "Débito Inmediato",
    description: "Domiciliación de pagos recurrentes. Cobro automático desde cuenta bancaria del cliente.",
    fees: "0% - 0.5%",
    status: "Activo",
    icon: ArrowRightLeft,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    currencies: ["VES"],
    features: ["Recurrente", "Automático", "Domiciliación", "Servicios"],
  },
  {
    name: "Efectivo Bolívares",
    description: "Registro manual de pagos en efectivo Bs. Generación automática de recibos y reportes fiscales.",
    fees: "0% comisión",
    status: "Activo",
    icon: Banknote,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    currencies: ["VES"],
    features: ["Recibo automático", "Arqueo", "Reporte fiscal", "SENIAT"],
  },
  {
    name: "Kyron Wallet",
    description: "Billetera digital interna del ecosistema. Transferencias instantáneas entre usuarios Kyron. Multi-moneda.",
    fees: "0% comisión",
    status: "Primario",
    icon: ShieldCheck,
    color: "text-primary",
    bg: "bg-primary/10",
    borderColor: "border-primary/20",
    currencies: ["VES", "USD", "EUR"],
    features: ["Instantáneo", "Multi-moneda", "Ecosistema", "Sin comisión"],
    popular: true,
  },
];

const bancosVenezuela = [
  { nombre: "Banco de Venezuela", codigo: "0102", tipo: "Universal", pago_movil: true },
  { nombre: "Banesco", codigo: "0134", tipo: "Universal", pago_movil: true },
  { nombre: "Mercantil", codigo: "0105", tipo: "Universal", pago_movil: true },
  { nombre: "BBVA Provincial", codigo: "0108", tipo: "Universal", pago_movil: true },
  { nombre: "BNC", codigo: "0191", tipo: "Comercial", pago_movil: true },
  { nombre: "BOD", codigo: "0116", tipo: "Universal", pago_movil: true },
  { nombre: "Bancaribe", codigo: "0114", tipo: "Universal", pago_movil: true },
  { nombre: "Banco Exterior", codigo: "0115", tipo: "Universal", pago_movil: true },
  { nombre: "Banco Plaza", codigo: "0138", tipo: "Comercial", pago_movil: true },
  { nombre: "Banco Caroní", codigo: "0128", tipo: "Microfinanzas", pago_movil: true },
  { nombre: "Bancrecer", codigo: "0168", tipo: "Microfinanzas", pago_movil: true },
  { nombre: "BanFANB", codigo: "0177", tipo: "Especial", pago_movil: true },
  { nombre: "Banco del Tesoro", codigo: "0163", tipo: "Universal", pago_movil: true },
  { nombre: "Banco Bicentenario", codigo: "0175", tipo: "Universal", pago_movil: true },
  { nombre: "Banco Sofitasa", codigo: "0137", tipo: "Universal", pago_movil: true },
  { nombre: "100% Banco", codigo: "0156", tipo: "Comercial", pago_movil: true },
  { nombre: "Banco Activo", codigo: "0171", tipo: "Comercial", pago_movil: true },
  { nombre: "Bancamiga", codigo: "0172", tipo: "Universal", pago_movil: true },
  { nombre: "Banplus", codigo: "0174", tipo: "Comercial", pago_movil: true },
  { nombre: "Banco Fondo Común (BFC)", codigo: "0151", tipo: "Universal", pago_movil: true },
  { nombre: "Mi Banco", codigo: "0169", tipo: "Microfinanzas", pago_movil: true },
  { nombre: "Banco Venezolano de Crédito", codigo: "0104", tipo: "Universal", pago_movil: true },
  { nombre: "Banco Nacional de Crédito (BNC)", codigo: "0192", tipo: "Comercial", pago_movil: true },
  { nombre: "Bangente", codigo: "0166", tipo: "Microfinanzas", pago_movil: true },
  { nombre: "Banco Agrícola de Venezuela", codigo: "0176", tipo: "Especial", pago_movil: false },
  { nombre: "Instituto Municipal de Crédito Popular", codigo: "0601", tipo: "Especial", pago_movil: false },
  { nombre: "Del Sur Banco Universal", codigo: "0157", tipo: "Universal", pago_movil: true },
  { nombre: "Banco Internacional de Desarrollo", codigo: "0173", tipo: "Comercial", pago_movil: true },
  { nombre: "N58 Banco Digital", codigo: "0178", tipo: "Digital", pago_movil: true },
];

const statsData = [
  { label: "Pasarelas Activas", value: "26+", icon: CreditCard, color: "text-primary" },
  { label: "Criptomonedas", value: "10+", icon: Coins, color: "text-amber-500" },
  { label: "Bancos VE", value: "29", icon: Landmark, color: "text-cyan-500" },
  { label: "Monedas", value: "15+", icon: CircleDollarSign, color: "text-emerald-500" },
];

function GatewayCard({ gateway, index }: { gateway: Gateway; index: number }) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
    >
      <Card className={cn(
        "border bg-card/60 backdrop-blur-sm rounded-2xl h-full flex flex-col justify-between shadow-lg relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-[1.01]",
        gateway.borderColor,
        gateway.popular && "ring-1 ring-primary/10"
      )}>
        {gateway.popular && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-primary/15 text-primary border-primary/20 text-[7px] font-black uppercase px-2 py-0.5">Popular</Badge>
          </div>
        )}
        <div className="absolute top-0 right-0 p-5 opacity-[0.03] group-hover:opacity-[0.06] group-hover:rotate-6 transition-all duration-700">
          <gateway.icon className="h-24 w-24" />
        </div>

        <div className="p-6 space-y-4 relative z-10 flex-1">
          <div className="flex items-start gap-3">
            <div className={cn("p-2.5 rounded-xl border shrink-0", gateway.bg, gateway.borderColor)}>
              <gateway.icon className={cn("h-5 w-5", gateway.color)} />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-sm font-black tracking-tight leading-tight">{gateway.name}</CardTitle>
              {gateway.network && (
                <p className={cn("text-[9px] font-bold mt-0.5", gateway.color)}>{gateway.network}</p>
              )}
            </div>
          </div>

          <CardDescription className="text-[11px] text-muted-foreground/70 leading-relaxed line-clamp-3">
            {gateway.description}
          </CardDescription>

          <div className="flex flex-wrap gap-1">
            {gateway.currencies.map(c => (
              <span key={c} className={cn("text-[8px] font-bold px-1.5 py-0.5 rounded-md", gateway.bg, gateway.color)}>{c}</span>
            ))}
          </div>

          <AnimatePresence>
            {expanded && gateway.features && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-border/30 space-y-1.5">
                  {gateway.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <CircleCheck className={cn("h-3 w-3 shrink-0", gateway.color)} />
                      <span className="text-[10px] font-medium text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-3 border-t border-border/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[8px] font-bold uppercase text-muted-foreground/40 tracking-wider">Comisión</p>
                <p className="text-[11px] font-mono font-bold text-foreground/80 mt-0.5">{gateway.fees}</p>
              </div>
              <Badge variant="outline" className={cn(
                "text-[7px] font-black uppercase border-none px-2",
                gateway.status === "Activo" && "bg-emerald-500/10 text-emerald-500",
                gateway.status === "Configurado" && "bg-amber-500/10 text-amber-500",
                gateway.status === "Pendiente" && "bg-muted text-muted-foreground",
                gateway.status === "Primario" && "bg-primary/10 text-primary",
              )}>
                {gateway.status}
              </Badge>
            </div>
          </div>
        </div>

        <CardFooter className="p-4 pt-0 gap-2">
          {gateway.features && (
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 h-9 rounded-lg text-[10px] font-bold text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <EyeOff className="mr-1.5 h-3 w-3" /> : <Eye className="mr-1.5 h-3 w-3" />}
              {expanded ? "Ocultar" : "Detalles"}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className={cn("flex-1 h-9 rounded-lg text-[10px] font-bold", gateway.color)}
            onClick={() => toast({
              title: gateway.name,
              description: gateway.status === "Activo" || gateway.status === "Primario"
                ? `${gateway.name} está activo y procesando pagos.`
                : `${gateway.name} requiere configuración adicional.`,
              action: <Settings2 className={cn("h-4 w-4", gateway.color)} />,
            })}
          >
            <Settings2 className="mr-1.5 h-3 w-3" />
            Configurar
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function PasarelasDePagoPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("todas");

  const allGateways = activeTab === "todas"
    ? [...internacionales, ...criptomonedas, ...venezuela]
    : activeTab === "internacional"
      ? internacionales
      : activeTab === "cripto"
        ? criptomonedas
        : venezuela;

  return (
    <div className="space-y-10 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-4">
          <CreditCard className="h-3 w-3" /> CENTRO DE LIQUIDACIÓN
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-none">
          Pasarelas <span className="text-primary">de Pago</span>
        </h1>
        <p className="text-muted-foreground text-xs mt-2 max-w-2xl">
          Ecosistema financiero omnicanal — PayPal, Stripe, Zelle, Zinli, criptomonedas, Pago Móvil, transferencias bancarias y 29+ bancos venezolanos integrados.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsData.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="border bg-card/60 backdrop-blur-sm p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-muted/50">
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <div>
                  <p className="text-2xl font-black tracking-tight">{stat.value}</p>
                  <p className="text-[10px] font-medium text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-11 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger value="todas" className="rounded-lg text-xs font-bold data-[state=active]:shadow-sm px-4">
            Todas ({internacionales.length + criptomonedas.length + venezuela.length})
          </TabsTrigger>
          <TabsTrigger value="internacional" className="rounded-lg text-xs font-bold data-[state=active]:shadow-sm px-4">
            <Globe className="mr-1.5 h-3.5 w-3.5" /> Internacional ({internacionales.length})
          </TabsTrigger>
          <TabsTrigger value="cripto" className="rounded-lg text-xs font-bold data-[state=active]:shadow-sm px-4">
            <Coins className="mr-1.5 h-3.5 w-3.5" /> Cripto ({criptomonedas.length})
          </TabsTrigger>
          <TabsTrigger value="venezuela" className="rounded-lg text-xs font-bold data-[state=active]:shadow-sm px-4">
            <Landmark className="mr-1.5 h-3.5 w-3.5" /> Venezuela ({venezuela.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allGateways.map((gateway, i) => (
              <GatewayCard key={gateway.name} gateway={gateway} index={i} />
            ))}
          </div>
        </div>
      </Tabs>

      <Card className="border bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
        <CardHeader className="p-8 border-b border-border/30 bg-muted/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <Landmark className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-black tracking-tight">Bancos Venezolanos Conectados</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Red de {bancosVenezuela.length} entidades bancarias — Pago Móvil, transferencias ACH y LBTR</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-bold">
              {bancosVenezuela.filter(b => b.pago_movil).length} con Pago Móvil
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {bancosVenezuela.map((banco, i) => (
              <motion.div
                key={banco.codigo + banco.nombre}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02, duration: 0.25 }}
              >
                <div className="p-4 rounded-xl bg-muted/20 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-default">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-primary/50 group-hover:text-primary transition-colors" />
                      {banco.pago_movil && (
                        <Smartphone className="h-3 w-3 text-emerald-500/60" />
                      )}
                    </div>
                    <span className="text-[8px] font-mono font-bold text-muted-foreground/40">{banco.codigo}</span>
                  </div>
                  <p className="text-[10px] font-bold text-foreground/80 leading-tight">{banco.nombre}</p>
                  <p className="text-[8px] font-medium text-muted-foreground/50 mt-1">{banco.tipo}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border bg-card/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight">Seguridad Financiera</h3>
              <p className="text-xs text-muted-foreground">Protección de grado bancario</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Cifrado AES-256", desc: "Datos en tránsito y reposo protegidos" },
              { label: "PCI DSS Compliant", desc: "Cumplimiento de estándar de tarjetas" },
              { label: "TLS 1.3", desc: "Protocolo de seguridad de transporte" },
              { label: "Antifraude AI", desc: "Detección de transacciones anómalas" },
              { label: "Ledger Inmutable", desc: "Registro auditable de todas las operaciones" },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3">
                <Lock className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border bg-card/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight">Protocolo de Liquidación</h3>
              <p className="text-xs text-muted-foreground">Flujo automático de fondos</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", label: "Captura multimoneda", desc: "VES, USD, EUR, USDT, BTC, ETH y +15 monedas" },
              { step: "02", label: "Validación fiscal", desc: "IGTF 3% automático en operaciones en divisas" },
              { step: "03", label: "Conciliación T+0", desc: "Conciliación bancaria automática el mismo día" },
              { step: "04", label: "Conversión BCV", desc: "Tasa oficial del día para acreditación en VES" },
              { step: "05", label: "Reporte SENIAT", desc: "Generación automática de reportes fiscales" },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-4">
                <span className="text-sm font-black text-primary font-mono shrink-0">[{item.step}]</span>
                <div>
                  <p className="text-xs font-bold text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
