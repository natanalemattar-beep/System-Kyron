"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Printer, ArrowLeft } from "lucide-react";
import { Link } from "@/navigation";
import { PasswordGate } from "@/components/password-gate";

const permisos = [
  {
    organismo: "SAREN — Servicio Autónomo de Registros y Notarías",
    permiso: "Registro Mercantil (Acta Constitutiva)",
    descripcion: "Inscripción de la empresa. Otorga personalidad jurídica a System Kyron."
  },
  {
    organismo: "GACETA — Imprenta Nacional y Gaceta Oficial",
    permiso: "Publicación en Gaceta Oficial",
    descripcion: "Publicación del Registro Mercantil. Requisito posterior a la inscripción en SAREN."
  },
  {
    organismo: "SENIAT — Servicio Nacional Integrado de Administración Aduanera y Tributaria",
    permiso: "RIF (Registro de Información Fiscal)",
    descripcion: "Identificación tributaria. Obligatorio para facturar, declarar impuestos y operar."
  },
  {
    organismo: "SENIAT",
    permiso: "IVA (Impuesto al Valor Agregado)",
    descripcion: "Inscripción como contribuyente ordinario. Declaración y pago mensual."
  },
  {
    organismo: "SENIAT",
    permiso: "ISLR (Impuesto Sobre La Renta)",
    descripcion: "Registro como contribuyente. Declaración definitiva anual."
  },
  {
    organismo: "SENIAT",
    permiso: "Facturación Electrónica",
    descripcion: "Autorización para emitir facturas electrónicas. Sistema certificado."
  },
  {
    organismo: "SENIAT",
    permiso: "IGTF (Impuesto a Grandes Transacciones Financieras)",
    descripcion: "Registro y declaración del IGTF 3% en pagos en divisas."
  },
  {
    organismo: "ALCALDÍA — Municipio del domicilio fiscal",
    permiso: "Patente de Industria y Comercio",
    descripcion: "Licencia municipal para ejercer actividades comerciales o de servicios."
  },
  {
    organismo: "ALCALDÍA",
    permiso: "Conformidad de Uso",
    descripcion: "Certificación de uso comercial/oficina permitido en la zonificación."
  },
  {
    organismo: "ALCALDÍA",
    permiso: "Solvencia Municipal",
    descripcion: "Certificado de estar al día con tributos municipales."
  },
  {
    organismo: "IVSS — Instituto Venezolano de los Seguros Sociales",
    permiso: "Inscripción del Empleador (Patrono)",
    descripcion: "Registro patronal para asegurar a los trabajadores ante el Seguro Social."
  },
  {
    organismo: "INCES — Instituto Nacional de Capacitación y Educación Socialista",
    permiso: "Registro del Empleador",
    descripcion: "Inscripción patronal. Aporte del 2% sobre salarios."
  },
  {
    organismo: "BANAVIH — Banco Nacional de Vivienda y Hábitat",
    permiso: "Registro Patronal (Ley de Política Habitacional)",
    descripcion: "Registro obligatorio. Aporte del 3% sobre salarios al fondo de vivienda."
  },
  {
    organismo: "INPSASEL — Instituto Nacional de Prevención, Salud y Seguridad Laborales",
    permiso: "Registro de la Empresa (LOPCYMAT)",
    descripcion: "Registro en el sistema de seguridad y salud laboral. Incluye programa de prevención."
  },
  {
    organismo: "SAPI — Servicio Autónomo de la Propiedad Intelectual",
    permiso: "Registro de Marca «System Kyron»",
    descripcion: "Protección del nombre comercial, logotipo y eslogan a nivel nacional."
  },
  {
    organismo: "SAPI",
    permiso: "Registro de Dominio .com.ve",
    descripcion: "Registro del dominio web systemkyron.com.ve como activo de propiedad intelectual."
  },
  {
    organismo: "SENCAMER — Servicio de Normalización, Calidad y Reglamentos Técnicos",
    permiso: "Registro de Servicios Tecnológicos",
    descripcion: "Certificación de calidad de servicios. Recomendado para contratar con el Estado."
  },
  {
    organismo: "SUNDDE — Superintendencia Nacional para la Defensa de los Derechos Socioeconómicos",
    permiso: "Registro de Precios de Servicios",
    descripcion: "Registro de precios de servicios de telecomunicaciones y tecnología."
  },
  {
    organismo: "SDP — Superintendencia de Datos Personales",
    permiso: "Registro de Base de Datos Personales",
    descripcion: "Inscripción de bancos de datos con información de clientes, empleados y usuarios."
  },
  {
    organismo: "CONATEL — Comisión Nacional de Telecomunicaciones",
    permiso: "Habilitación Administrativa",
    descripcion: "Permiso para operar servicios de telecomunicaciones (VOIP, datos, valor agregado)."
  },
  {
    organismo: "CONATEL",
    permiso: "Asignación de Espectro Radioeléctrico",
    descripcion: "Permiso para usar frecuencias si opera enlaces de microondas o radio."
  },
  {
    organismo: "CONATEL",
    permiso: "Registro de Proveedor de Servicios de Internet",
    descripcion: "Registro como proveedor de servicios de conectividad si aplica."
  },
  {
    organismo: "BCV — Banco Central de Venezuela",
    permiso: "Registro de Operaciones Cambiarias",
    descripcion: "Registro si recibe pagos en divisas del exterior o requiere liquidar operaciones."
  },
  {
    organismo: "MINEC — Ministerio del Poder Popular para el Ecosocialismo",
    permiso: "Permiso Ambiental",
    descripcion: "Evaluación ambiental si genera desechos electrónicos o tiene instalaciones físicas."
  }
];

export default function PermisosSystemKyronPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PasswordGate title="Permisos Requeridos — System Kyron">
    <style>{`
      @media print {
        @page { margin: 1.5cm; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
        .no-print { display: none !important; }
        .print-only { display: block !important; }
        .bg-\\[\\#020617\\] { background: white !important; }
        .text-white { color: black !important; }
        .text-zinc-500 { color: #444 !important; }
        .text-cyan-400\\/70 { color: #0369a1 !important; }
        .border-white\\/\\[0\\.06\\] { border-color: #ddd !important; }
        .bg-cyan-500\\/5 { background: #f0f9ff !important; }
        .border-cyan-500\\/10 { border-color: #bae6fd !important; }
        .fixed { display: none !important; }
      }
      .print-only { display: none; }
    `}</style>
    <div className="min-h-screen bg-[#020617] text-white font-[family-name:var(--font-outfit)]">
      <div className="fixed inset-0 pointer-events-none z-0 print:hidden">
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-5%] right-[-5%] w-[700px] h-[700px] bg-blue-600/8 blur-[200px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 no-print">
          <Link href="/brand-kit" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors text-sm font-bold">
            <ArrowLeft className="h-4 w-4" />
            Volver a Brand Kit
          </Link>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/30 text-zinc-400 hover:text-cyan-300 transition-all text-xs font-bold uppercase tracking-wider">
            <Printer className="h-4 w-4" />
            Imprimir / PDF
          </button>
        </div>

        <div className="no-print">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md mb-6">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Cumplimiento Normativo — System Kyron</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-6">
            Permisos <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-white bg-clip-text text-transparent">Requeridos</span>
          </h1>
          <p className="text-zinc-400 text-base lg:text-lg font-medium leading-relaxed max-w-2xl mb-16">
            Todos los permisos, licencias, registros y habilitaciones que System Kyron debe obtener 
            para operar legalmente en Venezuela.
          </p>
        </div>

        <div className="print-only mb-8">
          <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0, color: '#000' }}>Permisos Requeridos</h1>
          <p style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>System Kyron — Cumplimiento Normativo. Actualizado mayo 2026</p>
          <hr style={{ border: 'none', borderTop: '2px solid #000', marginTop: '12px' }} />
        </div>

        <div className="space-y-3">
          {permisos.map((p, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.06] p-6">
              <h3 className="text-lg font-black tracking-tight text-white mb-1">{p.permiso}</h3>
              <p className="text-xs font-medium text-cyan-400/70 mb-2">{p.organismo}</p>
              <p className="text-sm text-zinc-500 leading-relaxed">{p.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
          <p className="text-xs text-zinc-500 leading-relaxed">
            Lista actualizada a mayo 2026. Verificar requisitos específicos según el domicilio fiscal 
            y servicios que preste System Kyron al momento de cada trámite.
          </p>
        </div>
      </main>
    </div>
    </PasswordGate>
  );
}
