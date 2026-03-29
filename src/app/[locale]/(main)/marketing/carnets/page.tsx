"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import {
  CreditCard, Users, Building2, ShieldCheck, Printer,
  Phone, Mail, MapPin, Briefcase, User, Globe, CalendarDays, Hash,
  HeartPulse, CheckCircle2
} from "lucide-react";
import Image from "next/image";

const companyInfo = {
  nombre: "System Kyron, C.A.",
  rif: "J-50328471-6",
  direccion: "Torre Kyron, Piso 8, Av. Francisco de Miranda, Urb. El Rosal, Chacao",
  telefono: "0212-267-8490",
  email: "contacto@systemkyron.com",
  web: "systemkyron.com",
};

const sampleEmployees = [
  { id: "EMP-001", nombre: "Carlos", apellido: "Mattar", cedula: "V-32.855.496", cargo: "Director General de Tecnología", departamento: "Dirección", telefono: "+58 414-9377068", email: "c.mattar@systemkyron.com", fechaIngreso: "2020-01-15", tipoSangre: "O+", foto: null },
  { id: "EMP-002", nombre: "Beatriz Elena", apellido: "Martínez de López", cedula: "V-14.589.031", cargo: "Directora de Gestión de Talento", departamento: "RRHH", telefono: "+58 412-5551234", email: "b.martinez@systemkyron.com", fechaIngreso: "2020-02-01", tipoSangre: "A+", foto: null },
  { id: "EMP-003", nombre: "María Teresa", apellido: "Hernández Urdaneta", cedula: "V-10.347.825", cargo: "Consultora Jurídica Senior", departamento: "Legal", telefono: "+58 416-7890123", email: "m.hernandez@systemkyron.com", fechaIngreso: "2021-03-15", tipoSangre: "B+", foto: null },
  { id: "EMP-004", nombre: "Alejandro", apellido: "Rodríguez Pérez", cedula: "V-25.123.456", cargo: "Analista Contable Senior", departamento: "Contabilidad", telefono: "+58 424-3456789", email: "a.rodriguez@systemkyron.com", fechaIngreso: "2022-06-01", tipoSangre: "AB+", foto: null },
  { id: "EMP-005", nombre: "Daniela", apellido: "Gómez Fuentes", cedula: "V-28.654.321", cargo: "Ingeniera de Software", departamento: "Tecnología", telefono: "+58 412-1234567", email: "d.gomez@systemkyron.com", fechaIngreso: "2023-01-10", tipoSangre: "O-", foto: null },
];

function getQrUrl(data: string, size = 200) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&bgcolor=ffffff&color=0a1628&margin=2`;
}

function getInitials(nombre: string, apellido: string) {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
}

export default function CarnetsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("presentacion");
  const [employees, setEmployees] = useState(sampleEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(sampleEmployees[0]);

  useEffect(() => {
    fetch('/api/empleados').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map((e: any, i: number) => ({
          id: `EMP-${String(i + 1).padStart(3, '0')}`,
          nombre: e.nombre || 'Sin nombre',
          apellido: e.apellido || '',
          cedula: e.cedula || 'N/A',
          cargo: e.cargo || 'Empleado',
          departamento: e.departamento || 'General',
          telefono: e.telefono || 'N/A',
          email: e.email || 'N/A',
          fechaIngreso: e.fecha_ingreso || '2026-01-01',
          tipoSangre: 'N/D',
          foto: null,
        }));
        setEmployees(mapped);
        setSelectedEmployee(mapped[0]);
      }
    }).catch(() => {});
  }, []);
  const [businessCardData, setBusinessCardData] = useState({
    nombre: "Carlos Mattar", cargo: "Director General de Tecnología",
    telefono: "+58 414-9377068", email: "c.mattar@systemkyron.com",
    departamento: "Dirección"
  });
  const [insuranceData, setInsuranceData] = useState({
    poliza: "POL-2026-001847", aseguradora: "Seguros Kyron Shield",
    tipoCobertura: "Premium Corporativo", titular: "Carlos Mattar",
    cedula: "V-32.855.496", vigencia: "01/01/2026 — 31/12/2026",
    serviciosAprobados: "Consulta General, Emergencias, Hospitalización, Laboratorio, Imagenología, Odontología"
  });
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <CreditCard className="h-3 w-3" /> DISEÑADOR DE CARNETS
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">
            Carnets & <span className="text-primary italic">Tarjetas</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">
            Presentación • Personal • Servicios • Seguros
          </p>
        </div>
        <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" /> IMPRIMIR CARNET
        </Button>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 border border-white/10 rounded-2xl p-1.5 h-auto flex-wrap gap-1">
          <TabsTrigger value="presentacion" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
            <CreditCard className="mr-2 h-3.5 w-3.5" /> Tarjeta de Presentación
          </TabsTrigger>
          <TabsTrigger value="personal" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
            <Users className="mr-2 h-3.5 w-3.5" /> Carnet de Personal
          </TabsTrigger>
          <TabsTrigger value="servicio" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
            <Building2 className="mr-2 h-3.5 w-3.5" /> Solicitud de Servicio
          </TabsTrigger>
          <TabsTrigger value="seguro" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
            <ShieldCheck className="mr-2 h-3.5 w-3.5" /> Carnet de Seguro
          </TabsTrigger>
        </TabsList>

        <TabsContent value="presentacion" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card border-none rounded-[2rem] bg-card/40">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Datos de la Tarjeta</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                {[
                  { label: "Nombre completo", key: "nombre" as const, icon: User },
                  { label: "Cargo", key: "cargo" as const, icon: Briefcase },
                  { label: "Departamento", key: "departamento" as const, icon: Building2 },
                  { label: "Teléfono", key: "telefono" as const, icon: Phone },
                  { label: "Email", key: "email" as const, icon: Mail },
                ].map(field => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                      <field.icon className="h-3 w-3" /> {field.label}
                    </label>
                    <Input className="h-11 rounded-xl bg-white/5 border-white/10" value={businessCardData[field.key]} onChange={e => setBusinessCardData(p => ({ ...p, [field.key]: e.target.value }))} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">VISTA PREVIA — FRENTE</p>
              <BusinessCardFront data={businessCardData} />
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center mt-8">VISTA PREVIA — REVERSO</p>
              <BusinessCardBack data={businessCardData} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="personal" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card border-none rounded-[2rem] bg-card/40">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Seleccionar Empleado</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-3">
                {employees.map(emp => (
                  <button key={emp.id} onClick={() => setSelectedEmployee(emp)} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${selectedEmployee.id === emp.id ? 'bg-primary/10 border border-primary/30' : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.05]'}`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-xs ${selectedEmployee.id === emp.id ? 'bg-primary text-white' : 'bg-white/10 text-foreground/60'}`}>
                      {getInitials(emp.nombre, emp.apellido)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">{emp.nombre} {emp.apellido}</p>
                      <p className="text-[9px] text-muted-foreground/60 uppercase">{emp.cargo}</p>
                    </div>
                    <Badge variant="outline" className="text-[7px] font-black uppercase shrink-0">{emp.departamento}</Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">CARNET DE IDENTIFICACIÓN — FRENTE</p>
              <EmployeeCardFront employee={selectedEmployee} />
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center mt-8">CARNET DE IDENTIFICACIÓN — REVERSO</p>
              <EmployeeCardBack employee={selectedEmployee} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="servicio" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card border-none rounded-[2rem] bg-card/40">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Información del Servicio</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4 text-sm text-muted-foreground/80">
                  <p>Este carnet identifica a {companyInfo.nombre} como empresa autorizada para solicitar y proveer servicios de asesoría contable, fiscal y administrativa.</p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { label: "Servicios", value: "Contabilidad, Fiscal, RRHH, Legal" },
                      { label: "Jurisdicción", value: "República Bolivariana de Venezuela" },
                      { label: "Vigencia", value: "Enero 2026 — Diciembre 2026" },
                      { label: "Categoría", value: "Proveedor Premium Clase A" },
                    ].map(item => (
                      <div key={item.label} className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] font-black uppercase text-muted-foreground/40">{item.label}</p>
                        <p className="text-xs font-bold text-foreground/80 mt-1">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">CARNET DE SOLICITUD DE SERVICIO — FRENTE</p>
              <ServiceCardFront />
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center mt-8">CARNET DE SOLICITUD DE SERVICIO — REVERSO</p>
              <ServiceCardBack />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seguro" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card border-none rounded-[2rem] bg-card/40">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Datos del Seguro</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                {[
                  { label: "N° Póliza", key: "poliza" as const },
                  { label: "Aseguradora", key: "aseguradora" as const },
                  { label: "Tipo de Cobertura", key: "tipoCobertura" as const },
                  { label: "Titular", key: "titular" as const },
                  { label: "Cédula", key: "cedula" as const },
                  { label: "Vigencia", key: "vigencia" as const },
                  { label: "Servicios Aprobados", key: "serviciosAprobados" as const },
                ].map(field => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{field.label}</label>
                    <Input className="h-11 rounded-xl bg-white/5 border-white/10" value={insuranceData[field.key]} onChange={e => setInsuranceData(p => ({ ...p, [field.key]: e.target.value }))} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">CARNET DE SEGURO — FRENTE</p>
              <InsuranceCardFront data={insuranceData} />
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center mt-8">CARNET DE SEGURO — REVERSO (QR AUTORIZACIÓN)</p>
              <InsuranceCardBack data={insuranceData} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BusinessCardFront({ data }: { data: { nombre: string; cargo: string; telefono: string; email: string; departamento: string } }) {
  return (
    <div className="mx-auto w-full max-w-[420px] aspect-[1.75/1] rounded-2xl overflow-hidden shadow-2xl relative" style={{ background: 'linear-gradient(135deg, #020810 0%, #0a1628 40%, #0f2847 100%)' }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/10 blur-3xl -translate-y-10 translate-x-10" />
      <div className="relative h-full flex flex-col justify-between p-7">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/90">System Kyron</p>
            <p className="text-[6px] font-bold uppercase tracking-[0.5em] text-primary/60">Inteligencia Corporativa</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">{data.nombre}</h2>
          <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">{data.cargo}</p>
          <div className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent my-3 w-24" />
          <div className="flex gap-6 text-[8px] text-white/50 font-bold">
            <span className="flex items-center gap-1.5"><Phone className="h-2.5 w-2.5 text-primary/60" />{data.telefono}</span>
            <span className="flex items-center gap-1.5"><Mail className="h-2.5 w-2.5 text-primary/60" />{data.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessCardBack({ data }: { data: { nombre: string; email: string } }) {
  const qrData = `MECARD:N:${data.nombre};EMAIL:${data.email};ORG:${companyInfo.nombre};URL:${companyInfo.web};;`;
  return (
    <div className="mx-auto w-full max-w-[420px] aspect-[1.75/1] rounded-2xl overflow-hidden shadow-2xl relative" style={{ background: 'linear-gradient(135deg, #020810 0%, #0a1628 40%, #0f2847 100%)' }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="relative h-full flex items-center justify-between p-7">
        <div className="flex-1 space-y-3">
          <Logo className="h-10 w-10 mb-4" />
          <p className="text-[7px] font-bold text-white/40 uppercase tracking-widest leading-relaxed max-w-[200px]">{companyInfo.direccion}</p>
          <div className="space-y-1.5 text-[8px] text-white/50 font-bold">
            <p className="flex items-center gap-2"><Phone className="h-2.5 w-2.5 text-primary/50" /> {companyInfo.telefono}</p>
            <p className="flex items-center gap-2"><Globe className="h-2.5 w-2.5 text-primary/50" /> {companyInfo.web}</p>
            <p className="flex items-center gap-2"><Mail className="h-2.5 w-2.5 text-primary/50" /> {companyInfo.email}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 bg-white rounded-xl shadow-lg">
            <Image src={getQrUrl(qrData, 120)} alt="QR" width={120} height={120} className="rounded-lg" unoptimized />
          </div>
          <p className="text-[6px] font-black uppercase tracking-widest text-primary/40">Escanear contacto</p>
        </div>
      </div>
    </div>
  );
}

function EmployeeCardFront({ employee }: { employee: typeof sampleEmployees[0] }) {
  const qrData = `KYRON-EMP:${employee.id}|${employee.cedula}|${employee.nombre} ${employee.apellido}|${employee.cargo}`;
  return (
    <div className="mx-auto w-full max-w-[400px] aspect-[0.63/1] rounded-2xl overflow-hidden shadow-2xl relative" style={{ background: 'linear-gradient(180deg, #020810 0%, #0a1628 50%, #0d1f3c 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-br from-primary/20 to-primary/5" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
      <div className="relative h-full flex flex-col items-center p-6 pt-5">
        <div className="flex items-center gap-2 mb-4">
          <Logo className="h-7 w-7" />
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/90">System Kyron</p>
            <p className="text-[5px] font-bold uppercase tracking-[0.5em] text-primary/60">Identificación Corporativa</p>
          </div>
        </div>

        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/30 flex items-center justify-center mb-3 shadow-lg">
          <span className="text-2xl font-black text-white">{getInitials(employee.nombre, employee.apellido)}</span>
        </div>

        <h3 className="text-base font-black text-white text-center uppercase tracking-tight">{employee.nombre}</h3>
        <p className="text-base font-black text-white text-center uppercase tracking-tight -mt-0.5">{employee.apellido}</p>
        <Badge className="mt-2 bg-primary/20 text-primary border-primary/30 text-[7px] font-black uppercase px-3">{employee.cargo}</Badge>

        <div className="w-full mt-4 space-y-2">
          {[
            { icon: Hash, label: "Cédula", value: employee.cedula },
            { icon: Building2, label: "Departamento", value: employee.departamento },
            { icon: CalendarDays, label: "Ingreso", value: new Date(employee.fechaIngreso).toLocaleDateString('es-VE', { year: 'numeric', month: 'short' }) },
            { icon: HeartPulse, label: "Tipo de Sangre", value: employee.tipoSangre },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/[0.03]">
              <item.icon className="h-3 w-3 text-primary/50 shrink-0" />
              <p className="text-[7px] font-bold text-white/30 uppercase w-20">{item.label}</p>
              <p className="text-[9px] font-black text-white/80 flex-1 text-right">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-3 flex items-center gap-2">
          <div className="p-1 bg-white rounded-lg">
            <Image src={getQrUrl(qrData, 60)} alt="QR" width={60} height={60} className="rounded" unoptimized />
          </div>
          <div>
            <p className="text-[6px] font-black uppercase tracking-widest text-primary/40">ID: {employee.id}</p>
            <p className="text-[5px] font-bold text-white/20 uppercase">Escanear para verificar</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployeeCardBack({ employee }: { employee: typeof sampleEmployees[0] }) {
  return (
    <div className="mx-auto w-full max-w-[400px] aspect-[0.63/1] rounded-2xl overflow-hidden shadow-2xl relative" style={{ background: 'linear-gradient(180deg, #020810 0%, #0a1628 50%, #0d1f3c 100%)' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
      <div className="relative h-full flex flex-col p-6">
        <div className="flex items-center gap-2 mb-6">
          <Logo className="h-6 w-6" />
          <p className="text-[7px] font-black uppercase tracking-[0.3em] text-white/60">System Kyron, C.A.</p>
        </div>

        <div className="space-y-3 flex-1">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <p className="text-[7px] font-black uppercase tracking-widest text-primary/50">Contacto</p>
            <div className="space-y-1.5 text-[8px] text-white/60 font-bold">
              <p className="flex items-center gap-2"><Phone className="h-2.5 w-2.5 text-primary/40" /> {employee.telefono}</p>
              <p className="flex items-center gap-2"><Mail className="h-2.5 w-2.5 text-primary/40" /> {employee.email}</p>
              <p className="flex items-center gap-2"><MapPin className="h-2.5 w-2.5 text-primary/40" /> {companyInfo.direccion}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <p className="text-[7px] font-black uppercase tracking-widest text-primary/50">En caso de emergencia</p>
            <p className="text-[8px] text-white/50 font-bold">Comunicarse con RRHH: {companyInfo.telefono}</p>
            <p className="text-[8px] text-white/50 font-bold">Tipo de Sangre: {employee.tipoSangre}</p>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
            <p className="text-[7px] font-black uppercase tracking-widest text-primary/50">Aviso Legal</p>
            <p className="text-[7px] text-white/30 leading-relaxed">Este documento es propiedad de {companyInfo.nombre}. Su uso indebido será sancionado conforme a las leyes vigentes. En caso de extravío, notificar a RRHH inmediatamente.</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
          <p className="text-[6px] font-bold text-white/20 uppercase">RIF: {companyInfo.rif}</p>
          <p className="text-[6px] font-bold text-white/20 uppercase">Válido hasta: 31/12/2026</p>
        </div>
      </div>
    </div>
  );
}

function ServiceCardFront() {
  const qrData = `KYRON-SVC:CONTABILIDAD|${companyInfo.rif}|PROVEEDOR-PREMIUM|2026`;
  return (
    <div className="mx-auto w-full max-w-[420px] aspect-[1.5/1] rounded-2xl overflow-hidden shadow-2xl relative" style={{ background: 'linear-gradient(135deg, #020810 0%, #0a1628 30%, #0b2040 60%, #0f2847 100%)' }}>
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
      <div className="relative h-full flex flex-col justify-between p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/90">System Kyron</p>
              <p className="text-[5px] font-bold uppercase tracking-[0.5em] text-emerald-400/60">Asesoría Contable Integral</p>
            </div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[6px] font-black uppercase px-2">Premium</Badge>
        </div>

        <div>
          <p className="text-[7px] font-black uppercase tracking-widest text-emerald-400/50 mb-1">Carnet de Solicitud de Servicio</p>
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Asesoría Contable</h3>
          <p className="text-[8px] text-white/40 font-bold uppercase tracking-wider">Fiscal • Tributario • Nómina • Legal</p>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-1 text-[7px] text-white/40 font-bold">
            <p>RIF: {companyInfo.rif}</p>
            <p>Vigencia: 2026</p>
          </div>
          <div className="p-1.5 bg-white rounded-lg shadow-lg">
            <Image src={getQrUrl(qrData, 70)} alt="QR" width={70} height={70} className="rounded" unoptimized />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCardBack() {
  return (
    <div className="mx-auto w-full max-w-[420px] aspect-[1.5/1] rounded-2xl overflow-hidden shadow-2xl relative" style={{ background: 'linear-gradient(135deg, #020810 0%, #0a1628 30%, #0b2040 60%, #0f2847 100%)' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
      <div className="relative h-full flex flex-col p-7">
        <div className="flex items-center gap-2 mb-5">
          <Logo className="h-6 w-6" />
          <p className="text-[7px] font-black uppercase tracking-[0.3em] text-white/60">{companyInfo.nombre}</p>
        </div>

        <div className="flex-1 space-y-3">
          <p className="text-[7px] font-black uppercase tracking-widest text-emerald-400/50 mb-2">Servicios Incluidos</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Contabilidad General", "Declaraciones SENIAT",
              "Nómina y LOTTT", "Retenciones IVA/ISLR",
              "IGTF y Parafiscales", "Asesoría Legal",
              "Auditoría Interna", "Certificaciones"
            ].map(svc => (
              <div key={svc} className="flex items-center gap-1.5 text-[7px] text-white/50 font-bold">
                <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400/40 shrink-0" />
                {svc}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 space-y-1 text-[7px] text-white/30 font-bold">
          <p className="flex items-center gap-2"><MapPin className="h-2.5 w-2.5 text-emerald-400/30" /> {companyInfo.direccion}</p>
          <p className="flex items-center gap-2"><Phone className="h-2.5 w-2.5 text-emerald-400/30" /> {companyInfo.telefono}</p>
          <p className="flex items-center gap-2"><Globe className="h-2.5 w-2.5 text-emerald-400/30" /> {companyInfo.web}</p>
        </div>
      </div>
    </div>
  );
}

function InsuranceCardFront({ data }: { data: { poliza: string; aseguradora: string; tipoCobertura: string; titular: string; cedula: string; vigencia: string; serviciosAprobados: string } }) {
  return (
    <div className="mx-auto w-full max-w-[420px] aspect-[1.5/1] rounded-2xl overflow-hidden shadow-2xl relative" style={{ background: 'linear-gradient(135deg, #020810 0%, #0a1628 30%, #1a0a28 60%, #0f2847 100%)' }}>
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-violet-500/5 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
      <div className="relative h-full flex flex-col justify-between p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <ShieldCheck className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/90">{data.aseguradora}</p>
              <p className="text-[5px] font-bold uppercase tracking-[0.5em] text-violet-400/60">Servicio de Seguro Corporativo</p>
            </div>
          </div>
          <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 text-[6px] font-black uppercase px-2">{data.tipoCobertura}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[7px] font-black uppercase tracking-widest text-violet-400/50 mb-1">Titular</p>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">{data.titular}</h3>
              <p className="text-[9px] text-white/40 font-bold">{data.cedula}</p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-[7px] text-white/40 font-bold flex items-center gap-1.5"><Hash className="h-2.5 w-2.5 text-violet-400/40" /> Póliza: {data.poliza}</p>
            <p className="text-[7px] text-white/40 font-bold flex items-center gap-1.5"><CalendarDays className="h-2.5 w-2.5 text-violet-400/40" /> {data.vigencia}</p>
          </div>
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 opacity-30" />
            <p className="text-[5px] font-black uppercase tracking-widest text-white/20">Powered by Kyron</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsuranceCardBack({ data }: { data: { poliza: string; aseguradora: string; tipoCobertura: string; titular: string; cedula: string; vigencia: string; serviciosAprobados: string } }) {
  const qrData = `KYRON-SEGURO:AUTORIZAR|POL:${data.poliza}|TIT:${data.titular}|CI:${data.cedula}|COB:${data.tipoCobertura}|VIG:${data.vigencia}|ESTADO:ACTIVO`;
  const servicios = data.serviciosAprobados.split(',').map(s => s.trim());

  return (
    <div className="mx-auto w-full max-w-[420px] aspect-[1.5/1] rounded-2xl overflow-hidden shadow-2xl relative" style={{ background: 'linear-gradient(135deg, #020810 0%, #0a1628 30%, #1a0a28 60%, #0f2847 100%)' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
      <div className="relative h-full flex p-7 gap-5">
        <div className="flex-1 flex flex-col">
          <p className="text-[7px] font-black uppercase tracking-widest text-violet-400/50 mb-3">Servicios Autorizados</p>
          <div className="space-y-1.5 flex-1">
            {servicios.map(svc => (
              <div key={svc} className="flex items-center gap-1.5 text-[8px] text-white/60 font-bold">
                <CheckCircle2 className="h-2.5 w-2.5 text-violet-400/50 shrink-0" />
                {svc}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-3 border-t border-white/5">
            <p className="text-[6px] text-white/20 font-bold leading-relaxed">Presente este carnet en el centro de salud. Escanee el QR para autorización inmediata del servicio. Sujeto a condiciones de la póliza.</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="p-3 bg-white rounded-2xl shadow-2xl">
            <Image src={getQrUrl(qrData, 140)} alt="QR Autorización" width={140} height={140} className="rounded-xl" unoptimized />
          </div>
          <div className="text-center">
            <p className="text-[7px] font-black uppercase tracking-widest text-violet-400/60">QR de Autorización</p>
            <p className="text-[5px] text-white/20 font-bold uppercase mt-0.5">Escanear para aprobar servicio</p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[7px] font-black uppercase px-3 py-1">
            <CheckCircle2 className="mr-1 h-2.5 w-2.5" /> ACTIVO
          </Badge>
        </div>
      </div>
    </div>
  );
}
