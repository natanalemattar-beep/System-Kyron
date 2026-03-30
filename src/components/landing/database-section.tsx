'use client';

import { useEffect, useRef, useState } from "react";
import { Database, Zap, Shield, Activity, Table2, GitBranch, Lock, RefreshCw, HardDrive, Layers, Network, BarChart2, CheckCircle2, ArrowRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from '@/hooks/use-in-view';

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
    const [displayed, setDisplayed] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        if (started.current) return;
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                observer.disconnect();
                const startTime = Date.now();
                const duration = 2200;
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setDisplayed(Math.round(to * eased));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.3 });
        observer.observe(el);
        return () => observer.disconnect();
    }, [to]);

    return <span ref={ref}>{prefix}{displayed.toLocaleString('en-US')}{suffix}</span>;
}

function Cursor() {
    return (
        <span className="inline-block w-[2px] h-3.5 bg-emerald-400 align-middle ml-0.5 animate-[blink_1s_step-end_infinite]" />
    );
}

const QUERIES = [
    `SELECT e.nombre, d.nombre AS dpto, e.salario\nFROM empleados e\nJOIN departamentos d ON e.dept_id = d.id\nWHERE e.activo = TRUE\nORDER BY e.salario DESC LIMIT 10;`,
    `INSERT INTO transacciones (monto, divisa, tipo, fecha)\nVALUES (14250.00, 'USD', 'FACTURA', NOW())\nRETURNING id, created_at;`,
    `UPDATE inventario SET stock = stock - 3\nWHERE producto_id = 'PRD-8821'\nAND almacen = 'CCS-NORTE'\nRETURNING sku, stock;`,
    `SELECT COUNT(*) AS total_facturas,\n       SUM(monto_bs) AS monto_total\nFROM facturas\nWHERE EXTRACT(MONTH FROM fecha) = EXTRACT(MONTH FROM NOW())\nAND estado = 'PAGADA';`,
    `SELECT nif, razon_social, impuesto_total\nFROM contribuyentes\nWHERE fecha_declaracion >= NOW() - INTERVAL '30 days'\nORDER BY impuesto_total DESC;`,
    `INSERT INTO auditoria_fiscal (nif, operacion, monto, resultado)\nVALUES ('12345678', 'VALIDACION-SENIAT', 45000.00, TRUE)\nRETURNING id, timestamp;`,
    `SELECT COUNT(*) AS transacciones_hoy\nFROM transacciones_log\nWHERE DATE(fecha) = CURRENT_DATE\nAND estado = 'COMPLETADA';`,
];

function LiveQueryBox() {
    const [queryIndex, setQueryIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    const [ms, setMs] = useState(0);

    useEffect(() => {
        setDisplayed("");
        setDone(false);
        const text = QUERIES[queryIndex];
        let i = 0;
        const speed = 22;
        const iv = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(iv);
                setDone(true);
                setMs(Math.floor(Math.random() * 18) + 2);
            }
        }, speed);
        return () => clearInterval(iv);
    }, [queryIndex]);

    useEffect(() => {
        if (!done) return;
        const t = setTimeout(() => setQueryIndex((p) => (p + 1) % QUERIES.length), 2600);
        return () => clearTimeout(t);
    }, [done]);

    return (
        <div className="rounded-2xl border border-emerald-500/20 bg-black/60 backdrop-blur-md overflow-hidden shadow-[0_0_60px_-10px_rgba(16,185,129,0.25)]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-emerald-500/10 bg-emerald-950/30">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-[9px] font-black uppercase tracking-widest text-emerald-400/60">
                    kyron_db — consulta en vivo
                </span>
                <div className="ml-auto flex items-center gap-1.5 animate-[pulse_2s_ease-in-out_infinite]">
                    <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">LIVE</span>
                </div>
            </div>
            <div className="p-5 font-mono text-[11px] leading-[1.85] min-h-[130px]">
                {displayed.split("\n").map((line, i) => {
                    const colored = line
                        .replace(/\b(SELECT|FROM|WHERE|JOIN|ON|ORDER BY|LIMIT|INSERT|INTO|VALUES|RETURNING|UPDATE|SET|AND|CREATE|INDEX|CONCURRENTLY)\b/g,
                            '<span class="text-blue-400 font-black">$1</span>')
                        .replace(/\b(TRUE|FALSE|NULL|NOW)\b/g, '<span class="text-orange-400">$1</span>')
                        .replace(/'([^']*)'/g, '<span class="text-amber-300">\'$1\'</span>')
                        .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-purple-300">$1</span>');
                    return (
                        <div key={i} className="flex">
                            <span className="text-emerald-900/60 select-none w-5 shrink-0 text-right mr-3">{i + 1}</span>
                            <span className="text-emerald-100/80" dangerouslySetInnerHTML={{ __html: colored }} />
                        </div>
                    );
                })}
                {!done && <Cursor />}
            </div>
            {done && (
                <div className="flex items-center gap-3 px-5 py-2.5 border-t border-emerald-500/10 bg-emerald-950/20 animate-[fadeSlideUp_0.3s_both]">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                        Query exitosa — {ms}ms
                    </span>
                    <div className="ml-auto flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-3 w-1 rounded-full bg-emerald-500"
                                style={{ transform: `scaleY(${[0.2, 1, 0.4, 0.8, 0.3][i]})` }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

interface SchemaTable { name: string; rows: number; color: string; fields: { name: string; type: string; pk?: boolean; fk?: boolean }[] }
const SCHEMA: SchemaTable[] = [
    {
        name: "empleados", rows: 3840, color: "violet",
        fields: [
            { name: "id", type: "SERIAL", pk: true },
            { name: "nombre", type: "VARCHAR(120)" },
            { name: "dept_id", type: "INT", fk: true },
            { name: "salario", type: "NUMERIC(12,2)" },
            { name: "activo", type: "BOOLEAN" },
        ],
    },
    {
        name: "facturas", rows: 127440, color: "blue",
        fields: [
            { name: "id", type: "BIGSERIAL", pk: true },
            { name: "cliente_id", type: "INT", fk: true },
            { name: "monto_bs", type: "NUMERIC(16,4)" },
            { name: "estado", type: "VARCHAR(20)" },
            { name: "fecha", type: "TIMESTAMPTZ" },
        ],
    },
    {
        name: "inventario", rows: 52200, color: "emerald",
        fields: [
            { name: "sku", type: "VARCHAR(40)", pk: true },
            { name: "producto_id", type: "INT", fk: true },
            { name: "stock", type: "INT" },
            { name: "almacen", type: "VARCHAR(30)" },
        ],
    },
    {
        name: "transacciones", rows: 980120, color: "amber",
        fields: [
            { name: "id", type: "BIGSERIAL", pk: true },
            { name: "monto", type: "NUMERIC(14,2)" },
            { name: "divisa", type: "CHAR(3)" },
            { name: "tipo", type: "VARCHAR(20)" },
            { name: "fecha", type: "TIMESTAMPTZ" },
        ],
    },
    {
        name: "contribuyentes", rows: 18560, color: "cyan",
        fields: [
            { name: "nif", type: "VARCHAR(20)", pk: true },
            { name: "razon_social", type: "VARCHAR(255)" },
            { name: "impuesto_total", type: "NUMERIC(14,2)" },
            { name: "fecha_declaracion", type: "DATE" },
        ],
    },
    {
        name: "auditoria_fiscal", rows: 2340000, color: "rose",
        fields: [
            { name: "id", type: "BIGSERIAL", pk: true },
            { name: "nif", type: "VARCHAR(20)", fk: true },
            { name: "operacion", type: "VARCHAR(50)" },
            { name: "resultado", type: "BOOLEAN" },
        ],
    },
];

const colorMap: Record<string, string> = {
    violet: "text-violet-400 border-violet-500/20 bg-violet-500/10",
    blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/10",
    cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
    rose: "text-rose-400 border-rose-500/20 bg-rose-500/10",
};

function SchemaCard({ table, delay }: { table: SchemaTable; delay: number }) {
    return (
        <div
            className={cn("rounded-2xl border bg-card/20 backdrop-blur-sm overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-default animate-[fadeSlideUp_0.6s_both]", colorMap[table.color].split(" ")[1])}
            style={{ animationDelay: `${delay}s` }}
        >
            <div className={cn("flex items-center justify-between px-4 py-3 border-b", colorMap[table.color].split(" ")[1])}>
                <div className="flex items-center gap-2">
                    <Table2 className={cn("h-3.5 w-3.5", colorMap[table.color].split(" ")[0])} />
                    <span className={cn("font-black text-[11px] uppercase tracking-wider", colorMap[table.color].split(" ")[0])}>
                        {table.name}
                    </span>
                </div>
                <span className="text-[8px] font-black text-muted-foreground/70 uppercase tracking-widest">
                    {table.rows.toLocaleString('en-US')} filas
                </span>
            </div>
            <div className="p-3 space-y-1.5">
                {table.fields.map((f) => (
                    <div key={f.name} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                            {f.pk && <span className="text-[7px] px-1 py-0.5 rounded bg-yellow-500/15 text-yellow-400 font-black">PK</span>}
                            {f.fk && <span className="text-[7px] px-1 py-0.5 rounded bg-blue-500/15 text-blue-400 font-black">FK</span>}
                            {!f.pk && !f.fk && <span className="w-5" />}
                            <span className="text-[10px] font-mono text-foreground/70">{f.name}</span>
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground/70">{f.type}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MetricPill({ icon: Icon, label, value, suffix, color }: { icon: React.ElementType; label: string; value: number; suffix?: string; color: string; delay?: number }) {
    return (
        <div
            className={cn("flex flex-col gap-2 p-5 rounded-2xl border bg-card/20 backdrop-blur-sm hover:bg-card/40 transition-colors duration-300 animate-[fadeSlideUp_0.5s_both]", color.split(" ")[1])}
        >
            <div className="flex items-center gap-2">
                <div className={cn("p-1.5 rounded-lg", color.split(" ")[2])}>
                    <Icon className={cn("h-3.5 w-3.5", color.split(" ")[0])} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/50">{label}</span>
            </div>
            <p className={cn("text-2xl font-black tabular-nums tracking-tight", color.split(" ")[0])}>
                <Counter to={value} suffix={suffix} />
            </p>
        </div>
    );
}

function FloatOrb({ className }: { className?: string }) {
    return (
        <div className={cn("absolute rounded-full blur-[120px] pointer-events-none animate-[orbPulse_8s_ease-in-out_infinite]", className)} />
    );
}

function ReplicationNode({ label, role, color, delay }: { label: string; role: string; color: string; delay: number }) {
    return (
        <div
            className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border backdrop-blur-sm animate-[fadeSlideUp_0.5s_both]", color)}
            style={{ animationDelay: `${delay}s` }}
        >
            <HardDrive className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            <span className="text-[8px] font-semibold text-muted-foreground/50 uppercase tracking-widest">{role}</span>
            <div className="flex gap-0.5 animate-[pulse_1.4s_ease-in-out_infinite]" style={{ animationDelay: `${delay}s` }}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className="h-1 w-1 rounded-full bg-current" />
                ))}
            </div>
        </div>
    );
}

export function DatabaseSection() {
    const [sectionRef, inView] = useInView(0.05);

    return (
        <section
            ref={sectionRef}
            id="base-de-datos"
            className={`relative w-full overflow-hidden py-28 md:py-40 ${!inView ? 'animate-hidden' : ''}`}
            style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.75) 60%, transparent 100%)" }}
        >
            <FloatOrb className="w-[600px] h-[600px] bg-emerald-500/30 top-[-10%] left-[-10%]" />
            <FloatOrb className="w-[500px] h-[500px] bg-blue-500/20 bottom-[-5%] right-[-5%]" />
            <FloatOrb className="w-[400px] h-[400px] bg-violet-500/20 top-[40%] left-[40%]" />

            <div className="absolute inset-0 opacity-[0.04] hud-grid pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-10">

                <div className="text-center mb-20 space-y-5 animate-[fadeSlideUp_0.8s_both]">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400">
                        <Database className="h-3 w-3" />
                        Infraestructura de Datos
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-[1.1] overflow-hidden">
                        Base de Datos
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
                            Empresarial Total
                        </span>
                    </h2>
                    <p className="text-muted-foreground/60 max-w-2xl mx-auto font-semibold text-sm leading-relaxed">
                        PostgreSQL de alto rendimiento con replicación en tiempo real, cifrado AES-256,
                        respaldos automáticos y acceso multi-módulo desde un único núcleo de datos.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-16">
                    {[
                        { icon: Activity, label: "Queries / día", value: 2480000, suffix: "", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" },
                        { icon: Table2, label: "Tablas activas", value: 84, color: "text-blue-400 border-blue-500/20 bg-blue-500/10" },
                        { icon: HardDrive, label: "GB almacenados", value: 340, suffix: " GB", color: "text-violet-400 border-violet-500/20 bg-violet-500/10" },
                        { icon: Zap, label: "Latencia media", value: 8, suffix: " ms", color: "text-amber-400 border-amber-500/20 bg-amber-500/10" },
                        { icon: Shield, label: "Respaldos", value: 99, suffix: "%", color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10" },
                        { icon: Network, label: "Conexiones", value: 512, color: "text-rose-400 border-rose-500/20 bg-rose-500/10" },
                    ].map((m) => (
                        <MetricPill key={m.label} {...m} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
                    <div className="space-y-4 animate-[fadeSlideUp_0.8s_both]">
                        <div className="flex items-center gap-2 mb-2">
                            <RefreshCw className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Terminal SQL en vivo</span>
                        </div>
                        <LiveQueryBox />
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: "Cache hits", val: "98.7%" },
                                { label: "Índices activos", val: "147" },
                                { label: "Tiempo activo", val: "99.99%" },
                            ].map((s) => (
                                <div key={s.label} className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border/20 bg-card/10">
                                    <span className="text-sm font-black text-foreground/80">{s.val}</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/70">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                            <Layers className="h-3.5 w-3.5 text-blue-400" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">Esquema relacional completo</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {SCHEMA.map((t, i) => (
                                <SchemaCard key={t.name} table={t} delay={i * 0.1} />
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    className="relative rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-violet-950/30 to-emerald-950/40 backdrop-blur-md p-8 md:p-12 overflow-hidden mb-16 animate-[fadeSlideUp_0.8s_both]"
                >
                    <div className="absolute inset-0 opacity-[0.06] hud-grid pointer-events-none rounded-3xl" />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-[9px] font-black uppercase tracking-[0.3em] text-violet-400">
                                <GitBranch className="h-3 w-3" /> Replicación & Alta Disponibilidad
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
                                Arquitectura de<br />
                                <span className="text-violet-400">Cero Pérdida</span> de Datos
                            </h3>
                            <p className="text-sm text-muted-foreground/60 font-semibold leading-relaxed max-w-sm">
                                Streaming replication con WAL (Write-Ahead Log), failover automático en &lt;30s
                                y point-in-time recovery hasta 30 días atrás.
                            </p>
                            <ul className="space-y-2.5">
                                {[
                                    "Replicación síncrona Primary → Standby",
                                    "Respaldos automáticos cada 6 horas",
                                    "Cifrado AES-256 en reposo y tránsito",
                                    "Monitoreo continuo con alertas instantáneas",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-[11px] font-semibold text-foreground/70">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="grid grid-cols-3 gap-4 w-full">
                                <ReplicationNode label="Primary" role="Escritura" color="text-emerald-400 border-emerald-500/20 bg-emerald-500/10 border" delay={0} />
                                <ReplicationNode label="Standby" role="Lectura" color="text-blue-400 border-blue-500/20 bg-blue-500/10 border" delay={0.1} />
                                <ReplicationNode label="Backup" role="Archivo" color="text-violet-400 border-violet-500/20 bg-violet-500/10 border" delay={0.2} />
                            </div>
                            <div className="flex items-center gap-2 w-full px-2">
                                <div className="h-0.5 flex-1 bg-gradient-to-r from-emerald-500/0 via-emerald-400/60 to-blue-400/60" />
                                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-[flowDot_3s_ease-in-out_infinite]" />
                                <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-400/60 via-violet-400/60 to-violet-500/0" />
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-[pulse_1.2s_ease-in-out_infinite]" />
                                Streaming WAL activo
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-16 space-y-6 animate-[fadeSlideUp_0.8s_both]">
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400">
                            <Network className="h-3 w-3" />
                            Integración Multi-Módulo
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                            Conectividad<span className="text-emerald-400"> Centralizada</span>
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { module: "CONTABILIDAD FISCAL", tables: ["contribuyentes", "facturas", "auditoria_fiscal"], icon: "📋" },
                            { module: "NÓMINA & RRHH", tables: ["empleados", "transacciones", "inventario"], icon: "👥" },
                            { module: "MI LÍNEA 5G", tables: ["líneas_activas", "consumo_datos", "facturación_telecom"], icon: "📡" },
                            { module: "IA LEGAL", tables: ["contratos", "documentos", "análisis_ia"], icon: "⚖️" },
                            { module: "ECO-CRÉDITOS", tables: ["reciclaje_log", "créditos_otorgados", "transacciones_eco"], icon: "♻️" },
                            { module: "ANALÍTICA EJECUTIVA", tables: ["kpis_temps", "reportes", "dashboards"], icon: "📊" },
                        ].map((item, i) => (
                            <div
                                key={item.module}
                                className="p-5 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-300 group cursor-default animate-[fadeSlideUp_0.5s_both]"
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="text-[7px] px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-black uppercase">CONECTADO</span>
                                </div>
                                <h4 className="text-xs font-black uppercase tracking-tight text-foreground/90 mb-2">{item.module}</h4>
                                <div className="text-[9px] text-muted-foreground/60 space-y-1">
                                    {item.tables.map((t) => (
                                        <div key={t} className="flex items-center gap-1.5">
                                            <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
                                            <code className="text-emerald-400/70">{t}</code>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-16 space-y-6 animate-[fadeSlideUp_0.8s_0.1s_both]">
                    <div className="text-center space-y-3 mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-[9px] font-black uppercase tracking-[0.3em] text-rose-400">
                            <Shield className="h-3 w-3" />
                            Cumplimiento Normativo
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                            Regulaciones<span className="text-rose-400"> Venezolanas</span>
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-7 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-tight text-cyan-400">SENIAT & Fiscalidad</h4>
                            <ul className="space-y-2.5">
                                {[
                                    "Validación RIF/NIF en tiempo real",
                                    "IVA + IGTF + Impuesto sobre la Renta",
                                    "Auditoría automática de facturas",
                                    "Reportes CFI compatibles",
                                    "Sincronización portal BCV",
                                    "Retención IAE precisa al centavo",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-[10px] font-semibold text-foreground/70">
                                        <CheckCircle2 className="h-3 w-3 text-cyan-400 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-7 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-tight text-violet-400">LOTTT & Laboral</h4>
                            <ul className="space-y-2.5">
                                {[
                                    "Cálculo automático utilidades (LOTTT)",
                                    "Domingos y días feriados 2x",
                                    "Fondos de garantía previsionales",
                                    "IVSS + Seguros Sociales",
                                    "Prestaciones 15 días de salario",
                                    "Nómina dual USD/BsS certificada",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-[10px] font-semibold text-foreground/70">
                                        <CheckCircle2 className="h-3 w-3 text-violet-400 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            icon: Lock, color: "text-amber-400",
                            bg: "bg-amber-500/10 border-amber-500/20",
                            title: "Row-Level Security",
                            desc: "Políticas de acceso por fila garantizan que cada módulo solo vea sus propios datos, sin filtración cruzada.",
                        },
                        {
                            icon: BarChart2, color: "text-cyan-400",
                            bg: "bg-cyan-500/10 border-cyan-500/20",
                            title: "Query Planner IA",
                            desc: "EXPLAIN ANALYZE automático y sugerencias de índices generadas por IA para mantener el rendimiento óptimo.",
                        },
                        {
                            icon: RefreshCw, color: "text-rose-400",
                            bg: "bg-rose-500/10 border-rose-500/20",
                            title: "Migraciones Cero-Downtime",
                            desc: "Cambios de esquema aplicados con lock-free DDL para no interrumpir operaciones en producción.",
                        },
                        {
                            icon: Network, color: "text-indigo-400",
                            bg: "bg-indigo-500/10 border-indigo-500/20",
                            title: "Pool de Conexiones",
                            desc: "PgBouncer integrado gestiona hasta 10.000 conexiones simultáneas con overhead mínimo.",
                        },
                    ].map((item, i) => (
                        <div
                            key={item.title}
                            className={cn("group p-6 rounded-2xl border backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 animate-[fadeSlideUp_0.6s_both]", item.bg)}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className={cn("p-2.5 rounded-xl w-fit mb-4 border border-border/10", item.bg)}>
                                <item.icon className={cn("h-5 w-5", item.color)} />
                            </div>
                            <h4 className={cn("font-black text-sm uppercase tracking-tight mb-2", item.color)}>{item.title}</h4>
                            <p className="text-[10px] text-muted-foreground/55 font-semibold leading-relaxed">{item.desc}</p>
                            <div className={cn("mt-4 flex items-center gap-1 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity", item.color)}>
                                Ver docs <ArrowRight className="h-2.5 w-2.5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
