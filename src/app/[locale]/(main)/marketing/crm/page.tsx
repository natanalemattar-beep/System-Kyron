"use client";

import React, { useState } from "react";
import { Users, Plus, Search, Star, Phone, Mail, Building2, TrendingUp, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const clientes = [
  {
    id: "CLI-001",
    nombre: "Inversiones Delta C.A.",
    rif: "J-40521834-9",
    contacto: "Ing. Carlos Mendoza",
    email: "cmendoza@invdelta.com.ve",
    telefono: "+58 412-555-0101",
    segmento: "Corporativo",
    valor: "USD 45,200",
    ultimaCompra: "28/03/2026",
    estado: "activo",
    satisfaccion: 5,
    color: "text-emerald-500",
  },
  {
    id: "CLI-002",
    nombre: "Distribuidora Nacional Express",
    rif: "J-30987654-1",
    contacto: "Lcda. María Fernández",
    email: "mfernandez@dne.com.ve",
    telefono: "+58 414-555-0202",
    segmento: "Mayorista",
    valor: "USD 28,900",
    ultimaCompra: "15/03/2026",
    estado: "activo",
    satisfaccion: 4,
    color: "text-primary",
  },
  {
    id: "CLI-003",
    nombre: "TechVenezuela Solutions",
    rif: "J-50123456-7",
    contacto: "Ing. José Hernández",
    email: "jhernandez@techvzla.com",
    telefono: "+58 416-555-0303",
    segmento: "Tecnología",
    valor: "USD 67,800",
    ultimaCompra: "01/04/2026",
    estado: "activo",
    satisfaccion: 5,
    color: "text-cyan-500",
  },
  {
    id: "CLI-004",
    nombre: "Comercial Andina S.A.",
    rif: "J-29876543-2",
    contacto: "Sr. Pedro Ramírez",
    email: "pramirez@candina.com.ve",
    telefono: "+58 424-555-0404",
    segmento: "Retail",
    valor: "USD 12,400",
    ultimaCompra: "20/02/2026",
    estado: "inactivo",
    satisfaccion: 3,
    color: "text-amber-500",
  },
  {
    id: "CLI-005",
    nombre: "Constructora Bolívar 2020",
    rif: "J-41234567-8",
    contacto: "Arq. Ana López",
    email: "alopez@constbolivar.com.ve",
    telefono: "+58 412-555-0505",
    segmento: "Construcción",
    valor: "USD 89,500",
    ultimaCompra: "30/03/2026",
    estado: "activo",
    satisfaccion: 5,
    color: "text-violet-500",
  },
];

export default function CRMPage() {
  const [search, setSearch] = useState("");

  const filteredClients = clientes.filter(c =>
    !search || c.nombre.toLowerCase().includes(search.toLowerCase()) || c.rif.includes(search)
  );

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Users className="h-3 w-3" /> CRM EMPRESARIAL
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            CRM de <span className="text-primary italic">Clientes</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Base de Datos • Segmentación • Seguimiento • Fidelización • IA
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> EXPORTAR
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
            <Plus className="h-4 w-4" /> NUEVO CLIENTE
          </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Clientes Activos", val: clientes.filter(c => c.estado === "activo").length.toString(), icon: Users, color: "text-primary" },
          { label: "Valor Total", val: "USD 243.8K", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Satisfacción", val: "4.4/5", icon: Star, color: "text-amber-500" },
          { label: "Tasa Retención", val: "92%", icon: Building2, color: "text-cyan-500" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card/60 border-border/50 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <p className={cn("text-xl font-black tracking-tight", kpi.color)}>{kpi.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre, RIF o contacto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 h-11 rounded-xl"
        />
      </div>

      <div className="space-y-4">
        {filteredClients.map((cliente, i) => (
          <motion.div key={cliente.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className="rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4 p-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                  {cliente.nombre.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold truncate">{cliente.nombre}</p>
                    <Badge className={cn("text-[8px] font-bold", cliente.estado === "activo" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted/50 text-muted-foreground")}>
                      {cliente.estado}
                    </Badge>
                    <Badge className="text-[8px] font-bold bg-muted/30">{cliente.segmento}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{cliente.contacto} • {cliente.rif}</p>
                  <div className="flex gap-4 mt-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {cliente.email}</span>
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {cliente.telefono}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn("text-lg font-black", cliente.color)}>{cliente.valor}</p>
                  <p className="text-[9px] text-muted-foreground">Última compra: {cliente.ultimaCompra}</p>
                  <div className="flex gap-0.5 justify-end mt-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={cn("h-3 w-3", j < cliente.satisfaccion ? "text-amber-500 fill-amber-500" : "text-muted-foreground/20")} />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
