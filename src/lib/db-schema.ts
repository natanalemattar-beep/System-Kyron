/**
 * Sistema Kyron v2.8.5 — Esquema Central de Base de Datos
 * Inicialización completa de todas las tablas del sistema.
 * Llamado automáticamente al iniciar el servidor.
 */

import { query } from '@/lib/db';

async function safeQuery(sql: string, params?: unknown[]): Promise<void> {
  try { await query(sql, params); } catch { /* column/table may not exist yet */ }
}

export async function initializeDatabase(): Promise<void> {
  try {
    await createCoreAuthTables();
    await createContabilidadTables();
    await createContabilidadExtendedTables();
    await createRRHHTables();
    await createRRHHExtendedTables();
    await createRRHHLibrosLaboralesTables();
    await createRRHHBienestarTables();
    await createViaticosTable();
    await createLegalTables();
    await createTelecomTables();
    await createTelecomExtendedTables();
    await createSostenibilidadTables();
    await createDocumentosTables();
    await createSectorTables();
    await createAnalyticsTables();
    await createConfiguracionTables();
    await createVentasTables();
    await createProyectosTables();
    await createAdvancedSystemTables();
    await createAutomationTables();
    await createPlanUsageTables();
    await createPerformanceOptimizations();
    console.log('[db-schema] Base de datos inicializada correctamente — v3.1.0');
  } catch (err) {
    console.error('[db-schema] Error inicializando base de datos:', err);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. AUTENTICACIÓN Y USUARIOS
// ─────────────────────────────────────────────────────────────────────────────
async function createCoreAuthTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id                  SERIAL PRIMARY KEY,
      email               TEXT UNIQUE NOT NULL,
      password_hash       TEXT NOT NULL,
      tipo                TEXT NOT NULL DEFAULT 'natural'
                          CHECK (tipo IN ('natural', 'juridico', 'admin')),
      nombre              TEXT,
      apellido            TEXT,
      cedula              TEXT UNIQUE,
      fecha_nacimiento    DATE,
      genero              TEXT,
      estado_civil        TEXT,
      estado_residencia   TEXT,
      municipio           TEXT,
      ciudad              TEXT,
      direccion           TEXT,
      telefono            TEXT,
      telefono_alt        TEXT,
      razon_social        TEXT,
      rif                 TEXT UNIQUE,
      tipo_empresa        TEXT,
      actividad_economica TEXT,
      codigo_ciiu         TEXT,
      fecha_constitucion  DATE,
      registro_mercantil  TEXT,
      capital_social      TEXT,
      estado_empresa      TEXT,
      municipio_empresa   TEXT,
      rep_nombre          TEXT,
      rep_cedula          TEXT,
      rep_email           TEXT,
      rep_cargo           TEXT,
      rep_telefono        TEXT,
      avatar_url          TEXT,
      verificado          BOOLEAN NOT NULL DEFAULT false,
      activo              BOOLEAN NOT NULL DEFAULT true,
      ultimo_login        TIMESTAMPTZ,
      access_key_hash     TEXT,
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS access_key_hash TEXT`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS plan TEXT`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS plan_monto NUMERIC(10,2)`);

  await query(`
    CREATE TABLE IF NOT EXISTS user_modules (
      id           SERIAL PRIMARY KEY,
      user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      module_id    TEXT NOT NULL,
      module_label TEXT,
      activo       BOOLEAN NOT NULL DEFAULT true,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, module_id)
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id           SERIAL PRIMARY KEY,
      user_id      INT REFERENCES users(id) ON DELETE SET NULL,
      evento       TEXT NOT NULL,
      categoria    TEXT NOT NULL,
      descripcion  TEXT,
      entidad_tipo TEXT,
      entidad_id   INT,
      metadata     JSONB,
      ip           TEXT,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_activity_log_user_id    ON activity_log(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_activity_log_categoria   ON activity_log(categoria)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_activity_log_created_at  ON activity_log(created_at DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS user_sessions (
      id          SERIAL PRIMARY KEY,
      user_id     INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash  TEXT NOT NULL UNIQUE,
      ip          TEXT,
      user_agent  TEXT,
      activa      BOOLEAN NOT NULL DEFAULT true,
      expires_at  TIMESTAMPTZ NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id)`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verificado BOOLEAN NOT NULL DEFAULT false`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS telefono_verificado BOOLEAN NOT NULL DEFAULT false`);

  await query(`
    CREATE TABLE IF NOT EXISTS saime_registros (
      id                SERIAL PRIMARY KEY,
      cedula            TEXT NOT NULL UNIQUE,
      primer_nombre     TEXT NOT NULL,
      segundo_nombre    TEXT,
      primer_apellido   TEXT NOT NULL,
      segundo_apellido  TEXT,
      fecha_nacimiento  DATE,
      sexo              TEXT CHECK (sexo IN ('M', 'F')),
      estado_civil      TEXT,
      nacionalidad      TEXT DEFAULT 'V' CHECK (nacionalidad IN ('V', 'E')),
      estado            TEXT,
      municipio         TEXT,
      parroquia         TEXT,
      lugar_nacimiento  TEXT,
      estatus           TEXT NOT NULL DEFAULT 'VIGENTE',
      fecha_emision     DATE,
      fecha_vencimiento DATE,
      source            TEXT NOT NULL DEFAULT 'manual',
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_saime_registros_cedula ON saime_registros(cedula)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONTABILIDAD Y FINANZAS (VEN-NIF / SENIAT)
// ─────────────────────────────────────────────────────────────────────────────
async function createContabilidadTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS clientes (
      id               SERIAL PRIMARY KEY,
      user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo             TEXT NOT NULL DEFAULT 'juridico'
                       CHECK (tipo IN ('natural', 'juridico', 'proveedor', 'mixto')),
      razon_social     TEXT,
      rif              TEXT,
      nombre_contacto  TEXT,
      cedula_contacto  TEXT,
      telefono         TEXT,
      email            TEXT,
      direccion        TEXT,
      estado           TEXT,
      municipio        TEXT,
      activo           BOOLEAN NOT NULL DEFAULT true,
      notas            TEXT,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS facturas (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      cliente_id        INT REFERENCES clientes(id) ON DELETE SET NULL,
      numero_factura    TEXT NOT NULL,
      numero_control    TEXT,
      serie             TEXT,
      tipo              TEXT NOT NULL DEFAULT 'venta'
                        CHECK (tipo IN ('venta','compra','nota_credito','nota_debito')),
      tipo_documento    TEXT NOT NULL DEFAULT 'FACTURA'
                        CHECK (tipo_documento IN ('FACTURA','NOTA_DEBITO','NOTA_CREDITO','ORDEN_ENTREGA','GUIA_DESPACHO')),
      condicion_pago    TEXT NOT NULL DEFAULT 'contado'
                        CHECK (condicion_pago IN ('contado','credito')),
      fecha_emision     DATE NOT NULL,
      fecha_vencimiento DATE,
      moneda            TEXT NOT NULL DEFAULT 'VES',
      subtotal          NUMERIC(18,2) NOT NULL DEFAULT 0,
      base_imponible    NUMERIC(18,2) NOT NULL DEFAULT 0,
      base_exenta       NUMERIC(18,2) NOT NULL DEFAULT 0,
      base_no_sujeta    NUMERIC(18,2) NOT NULL DEFAULT 0,
      porcentaje_iva    NUMERIC(5,2)  NOT NULL DEFAULT 16.00,
      alicuota_tipo     TEXT NOT NULL DEFAULT 'general'
                        CHECK (alicuota_tipo IN ('general','reducida','adicional','exento')),
      monto_iva         NUMERIC(18,2) NOT NULL DEFAULT 0,
      porcentaje_igtf   NUMERIC(5,2)  NOT NULL DEFAULT 3.00,
      monto_igtf        NUMERIC(18,2) NOT NULL DEFAULT 0,
      total             NUMERIC(18,2) NOT NULL DEFAULT 0,
      tasa_bcv          NUMERIC(12,4),
      total_usd         NUMERIC(18,2),
      monto_moneda_ext  NUMERIC(18,2),
      moneda_extranjera TEXT,
      retencion_iva     NUMERIC(18,2) NOT NULL DEFAULT 0,
      porcentaje_ret_iva NUMERIC(5,2) NOT NULL DEFAULT 0,
      retencion_islr    NUMERIC(18,2) NOT NULL DEFAULT 0,
      porcentaje_ret_islr NUMERIC(5,2) NOT NULL DEFAULT 0,
      total_a_pagar     NUMERIC(18,2) NOT NULL DEFAULT 0,
      rif_emisor        TEXT,
      razon_social_emisor TEXT,
      domicilio_fiscal_emisor TEXT,
      telefono_emisor   TEXT,
      factura_referencia_id INT REFERENCES facturas(id) ON DELETE SET NULL,
      factura_referencia_num TEXT,
      factura_referencia_fecha DATE,
      motivo_ajuste     TEXT,
      estado            TEXT NOT NULL DEFAULT 'emitida'
                        CHECK (estado IN ('borrador','emitida','pendiente','cobrada','pagada','vencida','anulada')),
      descripcion       TEXT,
      notas             TEXT,
      sin_derecho_credito_fiscal BOOLEAN NOT NULL DEFAULT false,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_facturas_user_id ON facturas(user_id)`);
  await safeQuery(`CREATE INDEX IF NOT EXISTS idx_facturas_estado  ON facturas(estado)`);

  await query(`
    CREATE TABLE IF NOT EXISTS factura_items (
      id               SERIAL PRIMARY KEY,
      factura_id       INT NOT NULL REFERENCES facturas(id) ON DELETE CASCADE,
      descripcion      TEXT NOT NULL,
      codigo           TEXT,
      unidad           TEXT NOT NULL DEFAULT 'UND',
      cantidad         NUMERIC(12,4) NOT NULL DEFAULT 1,
      precio_unitario  NUMERIC(18,2) NOT NULL DEFAULT 0,
      descuento_pct    NUMERIC(5,2)  NOT NULL DEFAULT 0,
      subtotal         NUMERIC(18,2) NOT NULL DEFAULT 0,
      aplica_iva       BOOLEAN NOT NULL DEFAULT true,
      tipo_gravamen    TEXT NOT NULL DEFAULT 'gravado'
                       CHECK (tipo_gravamen IN ('gravado','exento','no_sujeto'))
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS cuentas_bancarias (
      id                     SERIAL PRIMARY KEY,
      user_id                INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      banco                  TEXT NOT NULL,
      codigo_banco           TEXT NOT NULL,
      numero_cuenta          TEXT NOT NULL,
      tipo_cuenta            TEXT NOT NULL DEFAULT 'corriente'
                             CHECK (tipo_cuenta IN ('corriente','ahorro','corriente_en_dolares','fondo')),
      titular                TEXT,
      activa                 BOOLEAN NOT NULL DEFAULT true,
      saldo_actual           NUMERIC(18,2) NOT NULL DEFAULT 0,
      saldo_disponible       NUMERIC(18,2) NOT NULL DEFAULT 0,
      ultima_sincronizacion  TIMESTAMPTZ,
      created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS movimientos_bancarios (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      cuenta_id       INT REFERENCES cuentas_bancarias(id) ON DELETE SET NULL,
      fecha_operacion DATE NOT NULL,
      concepto        TEXT NOT NULL,
      monto           NUMERIC(18,2) NOT NULL,
      tipo            TEXT NOT NULL CHECK (tipo IN ('credito','debito')),
      referencia      TEXT,
      conciliado      BOOLEAN NOT NULL DEFAULT false,
      categoria       TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_movimientos_user_id ON movimientos_bancarios(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_movimientos_fecha   ON movimientos_bancarios(fecha_operacion DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS transacciones_pagos (
      id                    SERIAL PRIMARY KEY,
      user_id               INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      factura_id            INT REFERENCES facturas(id) ON DELETE SET NULL,
      tipo_pago             TEXT NOT NULL,
      medio_pago            TEXT,
      monto                 NUMERIC(18,2) NOT NULL,
      moneda                TEXT NOT NULL DEFAULT 'VES',
      tasa_bcv              NUMERIC(12,4),
      monto_usd             NUMERIC(18,2),
      referencia            TEXT,
      cedula_pagador        TEXT,
      nombre_pagador        TEXT,
      banco_origen          TEXT,
      banco_destino         TEXT,
      verificado            BOOLEAN NOT NULL DEFAULT false,
      verificado_en         TIMESTAMPTZ,
      segundos_verificacion INT,
      created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS tasas_bcv (
      id            SERIAL PRIMARY KEY,
      fecha         DATE NOT NULL UNIQUE,
      tasa_usd_ves  NUMERIC(12,4) NOT NULL,
      tasa_eur_ves  NUMERIC(12,4),
      tasa_cop_ves  NUMERIC(12,4),
      tasa_usdt_ves NUMERIC(12,4),
      fuente        TEXT NOT NULL DEFAULT 'BCV',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_tasas_bcv_fecha ON tasas_bcv(fecha DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS declaraciones_iva (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      periodo           TEXT NOT NULL,
      fecha_inicio      DATE NOT NULL,
      fecha_fin         DATE NOT NULL,
      fecha_declaracion DATE,
      base_imponible    NUMERIC(18,2) NOT NULL DEFAULT 0,
      iva_debito        NUMERIC(18,2) NOT NULL DEFAULT 0,
      iva_credito       NUMERIC(18,2) NOT NULL DEFAULT 0,
      iva_neto          NUMERIC(18,2) NOT NULL DEFAULT 0,
      estado            TEXT NOT NULL DEFAULT 'pendiente'
                        CHECK (estado IN ('pendiente','declarado','pagado','rectificado')),
      numero_forma      TEXT,
      notas             TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS declaraciones_islr (
      id                   SERIAL PRIMARY KEY,
      user_id              INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      ejercicio_fiscal     TEXT NOT NULL,
      fecha_declaracion    DATE,
      enriquecimiento_neto NUMERIC(18,2) NOT NULL DEFAULT 0,
      impuesto_causado     NUMERIC(18,2) NOT NULL DEFAULT 0,
      anticipo_pagado      NUMERIC(18,2) NOT NULL DEFAULT 0,
      impuesto_a_pagar     NUMERIC(18,2) NOT NULL DEFAULT 0,
      estado               TEXT NOT NULL DEFAULT 'pendiente'
                           CHECK (estado IN ('pendiente','declarado','pagado','rectificado')),
      numero_declaracion   TEXT,
      notas                TEXT,
      created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS retenciones (
      id               SERIAL PRIMARY KEY,
      user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo             TEXT NOT NULL CHECK (tipo IN ('iva','islr')),
      proveedor_rif    TEXT,
      proveedor_nombre TEXT,
      fecha_retencion  DATE NOT NULL,
      base_imponible   NUMERIC(18,2) NOT NULL DEFAULT 0,
      porcentaje       NUMERIC(5,2)  NOT NULL DEFAULT 0,
      monto_retenido   NUMERIC(18,2) NOT NULL DEFAULT 0,
      numero_comprobante TEXT,
      factura_ref      TEXT,
      periodo          TEXT,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS arqueos_caja (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      fecha           DATE NOT NULL,
      turno           TEXT DEFAULT 'dia',
      saldo_apertura  NUMERIC(18,2) NOT NULL DEFAULT 0,
      total_ingresos  NUMERIC(18,2) NOT NULL DEFAULT 0,
      total_egresos   NUMERIC(18,2) NOT NULL DEFAULT 0,
      saldo_cierre    NUMERIC(18,2) NOT NULL DEFAULT 0,
      diferencia      NUMERIC(18,2) NOT NULL DEFAULT 0,
      responsable     TEXT,
      estado          TEXT NOT NULL DEFAULT 'abierto'
                      CHECK (estado IN ('abierto','cerrado','auditado')),
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS plan_cuentas (
      id            SERIAL PRIMARY KEY,
      user_id       INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      codigo        TEXT NOT NULL,
      nombre        TEXT NOT NULL,
      tipo          TEXT NOT NULL CHECK (tipo IN ('activo','pasivo','patrimonio','ingreso','gasto','costo')),
      nivel         INT NOT NULL DEFAULT 1,
      cuenta_padre  INT REFERENCES plan_cuentas(id) ON DELETE SET NULL,
      activa        BOOLEAN NOT NULL DEFAULT true,
      descripcion   TEXT,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, codigo)
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS inventario (
      id               SERIAL PRIMARY KEY,
      user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      codigo           TEXT,
      nombre           TEXT NOT NULL,
      descripcion      TEXT,
      categoria        TEXT,
      unidad_medida    TEXT DEFAULT 'unidad',
      precio_costo     NUMERIC(18,2) NOT NULL DEFAULT 0,
      precio_venta     NUMERIC(18,2) NOT NULL DEFAULT 0,
      stock_actual     NUMERIC(12,4) NOT NULL DEFAULT 0,
      stock_minimo     NUMERIC(12,4) NOT NULL DEFAULT 0,
      aplica_iva       BOOLEAN NOT NULL DEFAULT true,
      activo           BOOLEAN NOT NULL DEFAULT true,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS proveedores (
      id               SERIAL PRIMARY KEY,
      user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      razon_social     TEXT NOT NULL,
      rif              TEXT,
      nombre_contacto  TEXT,
      cargo_contacto   TEXT,
      telefono         TEXT,
      email            TEXT,
      direccion        TEXT,
      estado           TEXT,
      municipio        TEXT,
      categoria        TEXT,
      condiciones_pago TEXT,
      calificacion     SMALLINT CHECK (calificacion BETWEEN 1 AND 5),
      activo           BOOLEAN NOT NULL DEFAULT true,
      notas            TEXT,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. RECURSOS HUMANOS Y NÓMINA
// ─────────────────────────────────────────────────────────────────────────────
async function createRRHHTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS empleados (
      id               SERIAL PRIMARY KEY,
      user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      nombre           TEXT NOT NULL,
      apellido         TEXT NOT NULL,
      cedula           TEXT NOT NULL,
      cargo            TEXT,
      departamento     TEXT,
      fecha_ingreso    DATE,
      fecha_egreso     DATE,
      salario_base     NUMERIC(18,2) NOT NULL DEFAULT 0,
      tipo_contrato    TEXT DEFAULT 'tiempo_indeterminado'
                       CHECK (tipo_contrato IN ('tiempo_indeterminado','tiempo_determinado','obra','aprendiz','pasante')),
      activo           BOOLEAN NOT NULL DEFAULT true,
      telefono         TEXT,
      email            TEXT,
      direccion        TEXT,
      cuenta_banco     TEXT,
      numero_cuenta    TEXT,
      rif              TEXT,
      fecha_nacimiento DATE,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_empleados_user_id ON empleados(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS nominas (
      id                 SERIAL PRIMARY KEY,
      user_id            INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      periodo            TEXT NOT NULL,
      fecha_inicio       DATE NOT NULL,
      fecha_fin          DATE NOT NULL,
      fecha_pago         DATE,
      tipo               TEXT NOT NULL DEFAULT 'quincenal'
                         CHECK (tipo IN ('semanal','quincenal','mensual','bonificacion','vacaciones','utilidades')),
      total_asignaciones NUMERIC(18,2) NOT NULL DEFAULT 0,
      total_deducciones  NUMERIC(18,2) NOT NULL DEFAULT 0,
      total_neto         NUMERIC(18,2) NOT NULL DEFAULT 0,
      estado             TEXT NOT NULL DEFAULT 'pendiente'
                         CHECK (estado IN ('pendiente','procesada','pagada','anulada')),
      notas              TEXT,
      created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_nominas_user_id ON nominas(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS nomina_items (
      id                 SERIAL PRIMARY KEY,
      nomina_id          INT NOT NULL REFERENCES nominas(id) ON DELETE CASCADE,
      empleado_id        INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      salario_base       NUMERIC(18,2) NOT NULL DEFAULT 0,
      dias_trabajados    NUMERIC(5,2)  NOT NULL DEFAULT 30,
      horas_extras       NUMERIC(8,2)  NOT NULL DEFAULT 0,
      bono_productividad NUMERIC(18,2) NOT NULL DEFAULT 0,
      cestaticket        NUMERIC(18,2) NOT NULL DEFAULT 0,
      utilidades         NUMERIC(18,2) NOT NULL DEFAULT 0,
      vacaciones         NUMERIC(18,2) NOT NULL DEFAULT 0,
      total_asignaciones NUMERIC(18,2) NOT NULL DEFAULT 0,
      sso                NUMERIC(18,2) NOT NULL DEFAULT 0,
      lph                NUMERIC(18,2) NOT NULL DEFAULT 0,
      faov               NUMERIC(18,2) NOT NULL DEFAULT 0,
      rpe                NUMERIC(18,2) NOT NULL DEFAULT 0,
      islr_retenido      NUMERIC(18,2) NOT NULL DEFAULT 0,
      otros_descuentos   NUMERIC(18,2) NOT NULL DEFAULT 0,
      total_deducciones  NUMERIC(18,2) NOT NULL DEFAULT 0,
      neto               NUMERIC(18,2) NOT NULL DEFAULT 0
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS permisos_laborales (
      id           SERIAL PRIMARY KEY,
      user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id  INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      tipo         TEXT NOT NULL
                   CHECK (tipo IN ('vacaciones','medico','personal','maternidad','paternidad','duelo','estudio','sindical','otro')),
      fecha_inicio DATE NOT NULL,
      fecha_fin    DATE NOT NULL,
      dias_habiles INT NOT NULL DEFAULT 1,
      motivo       TEXT,
      estado       TEXT NOT NULL DEFAULT 'solicitado'
                   CHECK (estado IN ('solicitado','aprobado','rechazado','disfrutado')),
      aprobado_por TEXT,
      notas        TEXT,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS certificados_laborales (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id       INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      tipo              TEXT NOT NULL
                        CHECK (tipo IN ('trabajo','ingresos','vacaciones','liquidacion','referencia','otro')),
      fecha_emision     DATE NOT NULL,
      fecha_vencimiento DATE,
      contenido         TEXT,
      firmado           BOOLEAN NOT NULL DEFAULT false,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3B-PRE. MÓDULO RRHH — VIÁTICOS Y GASTOS DE VIAJE
// ─────────────────────────────────────────────────────────────────────────────
async function createViaticosTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS viaticos (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT REFERENCES empleados(id) ON DELETE SET NULL,
      tipo_viaje      TEXT NOT NULL
                      CHECK (tipo_viaje IN ('internacional','nacional')),
      origen          TEXT NOT NULL DEFAULT 'empresa',
      destino_pais    TEXT,
      destino_ciudad  TEXT NOT NULL,
      motivo          TEXT NOT NULL,
      fecha_salida    DATE NOT NULL,
      fecha_retorno   DATE NOT NULL,
      dias            INT NOT NULL DEFAULT 1,
      categoria       TEXT NOT NULL
                      CHECK (categoria IN ('pasaje_aereo','pasaje_terrestre','hotel','restaurante','transporte_local','combustible','peaje','telefonia','seguro_viaje','visa','impuestos','propinas','lavanderia','representacion','otros')),
      descripcion     TEXT,
      proveedor       TEXT,
      numero_factura  TEXT,
      tiene_factura   BOOLEAN NOT NULL DEFAULT true,
      monto           NUMERIC(18,2) NOT NULL DEFAULT 0,
      moneda          TEXT NOT NULL DEFAULT 'USD'
                      CHECK (moneda IN ('USD','VES','EUR','COP','BRL')),
      tasa_cambio     NUMERIC(18,6),
      monto_ves       NUMERIC(18,2),
      estado          TEXT NOT NULL DEFAULT 'pendiente'
                      CHECK (estado IN ('pendiente','aprobado','rechazado','pagado','rendido')),
      aprobado_por    TEXT,
      fecha_aprobacion DATE,
      adjunto_url     TEXT,
      notas           TEXT,
      es_socio        BOOLEAN NOT NULL DEFAULT false,
      es_bono         BOOLEAN NOT NULL DEFAULT false,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_viaticos_user_id ON viaticos(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_viaticos_tipo ON viaticos(tipo_viaje)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_viaticos_estado ON viaticos(estado)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3B. MÓDULO RRHH — BIENESTAR LABORAL (Proyectos, Motivación, Vacaciones, Alianzas)
// ─────────────────────────────────────────────────────────────────────────────
async function createRRHHBienestarTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS proyectos_personal (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      titulo          TEXT NOT NULL,
      departamento    TEXT NOT NULL,
      tipo            TEXT NOT NULL DEFAULT 'estrategia' CHECK (tipo IN ('proyecto','estrategia','capacitacion','mejora_continua')),
      descripcion     TEXT,
      objetivo        TEXT,
      responsable     TEXT,
      fecha_inicio    DATE NOT NULL,
      fecha_fin_est   DATE,
      estado          TEXT NOT NULL DEFAULT 'planificado' CHECK (estado IN ('planificado','en_progreso','completado','suspendido')),
      progreso        INT NOT NULL DEFAULT 0 CHECK (progreso >= 0 AND progreso <= 100),
      prioridad       TEXT NOT NULL DEFAULT 'media' CHECK (prioridad IN ('alta','media','baja')),
      presupuesto     NUMERIC(18,2) DEFAULT 0,
      kpis            JSONB DEFAULT '[]',
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_proy_pers_user ON proyectos_personal(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_proy_pers_depto ON proyectos_personal(departamento)`);

  await query(`
    CREATE TABLE IF NOT EXISTS programas_motivacion (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      nombre          TEXT NOT NULL,
      categoria       TEXT NOT NULL DEFAULT 'reconocimiento' CHECK (categoria IN ('reconocimiento','incentivo','bienestar','team_building','formacion','gamificacion')),
      descripcion     TEXT,
      puntos_reward   INT NOT NULL DEFAULT 0,
      fecha_inicio    DATE NOT NULL,
      fecha_fin       DATE,
      activo          BOOLEAN NOT NULL DEFAULT true,
      participantes   INT NOT NULL DEFAULT 0,
      presupuesto     NUMERIC(18,2) DEFAULT 0,
      reglas          JSONB DEFAULT '{}',
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_prog_motiv_user ON programas_motivacion(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS reconocimientos_empleado (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      programa_id     INT REFERENCES programas_motivacion(id) ON DELETE SET NULL,
      tipo            TEXT NOT NULL DEFAULT 'logro' CHECK (tipo IN ('logro','antiguedad','desempeno','innovacion','liderazgo','compañerismo')),
      titulo          TEXT NOT NULL,
      descripcion     TEXT,
      puntos          INT NOT NULL DEFAULT 0,
      fecha           DATE NOT NULL DEFAULT CURRENT_DATE,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_reconoc_emp ON reconocimientos_empleado(empleado_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS alianzas_vacacionales (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      nombre_complejo TEXT NOT NULL,
      ubicacion       TEXT NOT NULL,
      estado_ve       TEXT NOT NULL,
      tipo            TEXT NOT NULL DEFAULT 'resort' CHECK (tipo IN ('resort','hotel','posada','campamento','spa','club')),
      estrellas       INT NOT NULL DEFAULT 3 CHECK (estrellas >= 1 AND estrellas <= 5),
      descuento_pct   NUMERIC(5,2) NOT NULL DEFAULT 0,
      precio_base_usd NUMERIC(18,2) NOT NULL DEFAULT 0,
      incluye_familia BOOLEAN NOT NULL DEFAULT true,
      max_personas    INT NOT NULL DEFAULT 4,
      servicios       JSONB DEFAULT '[]',
      contacto_nombre TEXT,
      contacto_telefono TEXT,
      contacto_email  TEXT,
      vigencia_inicio DATE NOT NULL,
      vigencia_fin    DATE NOT NULL,
      activa          BOOLEAN NOT NULL DEFAULT true,
      imagen_url      TEXT,
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_alianzas_vac_user ON alianzas_vacacionales(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS planes_vacaciones (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      alianza_id      INT REFERENCES alianzas_vacacionales(id) ON DELETE SET NULL,
      anio            INT NOT NULL,
      fecha_salida    DATE NOT NULL,
      fecha_retorno   DATE NOT NULL,
      dias_solicitados INT NOT NULL DEFAULT 15,
      incluye_familia BOOLEAN NOT NULL DEFAULT false,
      num_familiares  INT NOT NULL DEFAULT 0,
      estado          TEXT NOT NULL DEFAULT 'solicitado' CHECK (estado IN ('solicitado','aprobado','en_curso','completado','cancelado')),
      costo_estimado  NUMERIC(18,2) DEFAULT 0,
      subsidio_empresa NUMERIC(18,2) DEFAULT 0,
      destino         TEXT,
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_planes_vac_emp ON planes_vacaciones(empleado_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_planes_vac_anio ON planes_vacaciones(anio)`);

  await query(`
    CREATE TABLE IF NOT EXISTS manuales_procedimientos (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      titulo          TEXT NOT NULL,
      departamento    TEXT NOT NULL,
      cargo_destino   TEXT,
      version         TEXT NOT NULL DEFAULT '1.0',
      contenido       TEXT NOT NULL,
      procedimientos  JSONB DEFAULT '[]',
      prohibiciones   JSONB DEFAULT '[]',
      estado          TEXT NOT NULL DEFAULT 'borrador' CHECK (estado IN ('borrador','revision','aprobado','vigente','obsoleto')),
      aprobado_por    TEXT,
      fecha_aprobacion DATE,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_manuales_proc_user ON manuales_procedimientos(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_manuales_proc_depto ON manuales_procedimientos(departamento)`);

  await query(`
    CREATE TABLE IF NOT EXISTS organigrama_nodos (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      nombre_cargo    TEXT NOT NULL,
      departamento    TEXT NOT NULL,
      nivel           INT NOT NULL DEFAULT 0,
      padre_id        INT REFERENCES organigrama_nodos(id) ON DELETE SET NULL,
      titular         TEXT,
      empleado_id     INT REFERENCES empleados(id) ON DELETE SET NULL,
      tipo            TEXT NOT NULL DEFAULT 'cargo' CHECK (tipo IN ('direccion','gerencia','coordinacion','cargo','asistencia')),
      color           TEXT DEFAULT '#3b82f6',
      activo          BOOLEAN NOT NULL DEFAULT true,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_organi_user ON organigrama_nodos(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS contratos_laborales (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT REFERENCES empleados(id) ON DELETE SET NULL,
      titulo          TEXT NOT NULL,
      tipo_contrato   TEXT NOT NULL DEFAULT 'indefinido' CHECK (tipo_contrato IN ('indefinido','determinado','obra','temporal','pasantia')),
      fecha_inicio    DATE NOT NULL,
      fecha_fin       DATE,
      cargo           TEXT NOT NULL,
      departamento    TEXT NOT NULL,
      salario         NUMERIC(18,2) NOT NULL DEFAULT 0,
      beneficios      JSONB DEFAULT '[]',
      prohibiciones   JSONB DEFAULT '[]',
      clausulas       JSONB DEFAULT '[]',
      horario         TEXT DEFAULT 'Lunes a Viernes 8:00 AM - 5:00 PM',
      estado          TEXT NOT NULL DEFAULT 'borrador' CHECK (estado IN ('borrador','revision','firmado','vigente','finalizado','rescindido')),
      firmado_empleado BOOLEAN NOT NULL DEFAULT false,
      firmado_empresa  BOOLEAN NOT NULL DEFAULT false,
      fecha_firma     DATE,
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_contratos_lab_user ON contratos_laborales(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_contratos_lab_emp ON contratos_laborales(empleado_id)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. MÓDULO LEGAL / ESCRITORIO JURÍDICO
// ─────────────────────────────────────────────────────────────────────────────
async function createLegalTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS documentos_juridicos (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo              TEXT NOT NULL
                        CHECK (tipo IN ('contrato','poder','acta','escritura','demanda','recurso','comunicado','otro')),
      titulo            TEXT NOT NULL,
      descripcion       TEXT,
      partes            TEXT[],
      fecha_documento   DATE,
      fecha_vencimiento DATE,
      estado            TEXT NOT NULL DEFAULT 'vigente'
                        CHECK (estado IN ('borrador','vigente','vencido','rescindido','archivado')),
      archivo_url       TEXT,
      notaria           TEXT,
      registro_publico  TEXT,
      notas             TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_docs_juridicos_user_id ON documentos_juridicos(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS actas_asamblea (
      id                        SERIAL PRIMARY KEY,
      user_id                   INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      numero_acta               TEXT NOT NULL,
      tipo                      TEXT NOT NULL DEFAULT 'ordinaria'
                                CHECK (tipo IN ('ordinaria','extraordinaria','especial')),
      fecha_asamblea            DATE NOT NULL,
      lugar                     TEXT,
      quorum_pct                NUMERIC(5,2),
      orden_del_dia             TEXT[],
      acuerdos                  TEXT[],
      presidente                TEXT,
      secretario                TEXT,
      estado                    TEXT NOT NULL DEFAULT 'borrador'
                                CHECK (estado IN ('borrador','firmada','registrada','archivada')),
      registro_mercantil_entry  TEXT,
      notas                     TEXT,
      created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS socios (
      id                       SERIAL PRIMARY KEY,
      user_id                  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      nombre                   TEXT NOT NULL,
      cedula_rif               TEXT,
      tipo                     TEXT NOT NULL DEFAULT 'natural'
                               CHECK (tipo IN ('natural','juridico')),
      porcentaje_participacion NUMERIC(7,4) NOT NULL DEFAULT 0,
      cargo                    TEXT,
      fecha_ingreso            DATE,
      activo                   BOOLEAN NOT NULL DEFAULT true,
      email                    TEXT,
      telefono                 TEXT,
      created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS poderes_notariales (
      id                 SERIAL PRIMARY KEY,
      user_id            INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo               TEXT NOT NULL DEFAULT 'general'
                         CHECK (tipo IN ('general','especial','administrativo','judicial')),
      otorgante          TEXT NOT NULL,
      apoderado          TEXT NOT NULL,
      facultades         TEXT[],
      fecha_otorgamiento DATE,
      notaria            TEXT,
      tomo               TEXT,
      folio              TEXT,
      vigente            BOOLEAN NOT NULL DEFAULT true,
      fecha_vencimiento  DATE,
      created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. TELECOMUNICACIONES
// ─────────────────────────────────────────────────────────────────────────────
async function createTelecomTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS lineas_telecom (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      numero            TEXT NOT NULL,
      operadora         TEXT NOT NULL
                        CHECK (operadora IN ('movistar','digitel','movilnet','inter','cantv','simple','otro')),
      tipo_linea        TEXT NOT NULL DEFAULT 'postpago'
                        CHECK (tipo_linea IN ('prepago','postpago','datos','wan')),
      titular           TEXT,
      cedula_titular    TEXT,
      plan_contratado   TEXT,
      monto_plan        NUMERIC(18,2) NOT NULL DEFAULT 0,
      moneda_plan       TEXT NOT NULL DEFAULT 'USD',
      fecha_activacion  DATE,
      fecha_vencimiento DATE,
      activa            BOOLEAN NOT NULL DEFAULT true,
      uso_datos_gb      NUMERIC(8,2) NOT NULL DEFAULT 0,
      limite_datos_gb   NUMERIC(8,2),
      notas             TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS telecom_numeros_asignados (
      id                SERIAL PRIMARY KEY,
      numero            TEXT NOT NULL UNIQUE,
      tipo              TEXT NOT NULL DEFAULT 'personal'
                        CHECK (tipo IN ('personal','empresarial')),
      user_id           INT REFERENCES users(id) ON DELETE SET NULL,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS facturas_telecom (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      linea_id          INT REFERENCES lineas_telecom(id) ON DELETE SET NULL,
      periodo           TEXT NOT NULL,
      fecha_emision     DATE NOT NULL,
      fecha_vencimiento DATE,
      monto             NUMERIC(18,2) NOT NULL DEFAULT 0,
      moneda            TEXT NOT NULL DEFAULT 'USD',
      estado            TEXT NOT NULL DEFAULT 'pendiente'
                        CHECK (estado IN ('pendiente','pagada','vencida','en_disputa')),
      numero_factura    TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. SOSTENIBILIDAD / AMERU IA (ECO-CRÉDITOS)
// ─────────────────────────────────────────────────────────────────────────────
async function createSostenibilidadTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS eco_creditos (
      id                 SERIAL PRIMARY KEY,
      user_id            INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      balance            NUMERIC(12,2) NOT NULL DEFAULT 0,
      nivel              TEXT NOT NULL DEFAULT 'bronce'
                         CHECK (nivel IN ('bronce','plata','oro','platino')),
      total_kg_reciclado NUMERIC(10,2) NOT NULL DEFAULT 0,
      updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS eco_transacciones (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo_material   TEXT NOT NULL
                      CHECK (tipo_material IN ('papel','plastico','vidrio','metal','electronico','organico','textil','otro')),
      peso_kg         NUMERIC(8,3) NOT NULL DEFAULT 0,
      eco_creditos    NUMERIC(10,2) NOT NULL DEFAULT 0,
      punto_ameru     TEXT,
      codigo_qr       TEXT,
      verificado      BOOLEAN NOT NULL DEFAULT false,
      fecha_reciclaje TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_eco_trans_user_id ON eco_transacciones(user_id)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. DOCUMENTOS PERSONALES (Bóveda Digital)
// ─────────────────────────────────────────────────────────────────────────────
async function createDocumentosTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS documentos_personales (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      categoria         TEXT NOT NULL
                        CHECK (categoria IN ('identidad','fiscal','educacion','laboral','salud','propiedad','legal','otro')),
      nombre            TEXT NOT NULL,
      tipo_archivo      TEXT DEFAULT 'PDF',
      tamano_kb         INT,
      url_storage       TEXT,
      fecha_emision     DATE,
      fecha_vencimiento DATE,
      organismo         TEXT,
      descripcion       TEXT,
      activo            BOOLEAN NOT NULL DEFAULT true,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_docs_personales_user_id ON documentos_personales(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS solicitudes_documentos_civiles (
      id             SERIAL PRIMARY KEY,
      user_id        INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo           TEXT NOT NULL
                     CHECK (tipo IN ('partida_nacimiento','cedula','pasaporte','rif',
                                     'partida_matrimonio','partida_defuncion','acta_divorcio',
                                     'certificado_estudios','otro')),
      nombres        TEXT NOT NULL,
      acta           TEXT,
      folio          TEXT,
      tomo           TEXT,
      registro_civil TEXT,
      ano_evento     INT,
      estado         TEXT NOT NULL DEFAULT 'pendiente'
                     CHECK (estado IN ('pendiente','en_proceso','aprobado','rechazado','entregado')),
      notas          TEXT,
      created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_sol_docs_user_id ON solicitudes_documentos_civiles(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS documentos_generados_ia (
      id             SERIAL PRIMARY KEY,
      user_id        INT REFERENCES users(id) ON DELETE SET NULL,
      tipo_documento TEXT NOT NULL,
      titulo         TEXT,
      prompt_usado   TEXT,
      contenido      TEXT,
      modelo_ia      TEXT DEFAULT 'claude-sonnet',
      tokens_usados  INT,
      created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS verificaciones_documentos (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      documento_id    INT,
      archivo_path    TEXT NOT NULL,
      archivo_nombre  TEXT NOT NULL,
      tipo_mime       TEXT NOT NULL,
      categoria       TEXT DEFAULT 'general',
      hash_sha256     TEXT NOT NULL,
      veredicto       TEXT NOT NULL CHECK (veredicto IN ('autentico','sospechoso','fraudulento','no_determinado')),
      confianza       NUMERIC(5,2) NOT NULL,
      puntaje_total   INT NOT NULL,
      resultado       JSONB NOT NULL,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_verif_docs_user ON verificaciones_documentos(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_verif_docs_hash ON verificaciones_documentos(hash_sha256)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_verif_docs_path ON verificaciones_documentos(archivo_path)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. SECTOR PRIVADO / SOLICITUDES
// ─────────────────────────────────────────────────────────────────────────────
async function createSectorTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS sector_solicitudes (
      id                   SERIAL PRIMARY KEY,
      user_id              INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      categoria            TEXT NOT NULL,
      subcategoria         TEXT,
      empresa_solicitante  TEXT,
      rif                  TEXT,
      descripcion          TEXT,
      ciiu_codigo          TEXT,
      estado_operacion     TEXT,
      municipio            TEXT,
      personal_requerido   INT,
      presupuesto_estimado NUMERIC(18,2),
      moneda               TEXT NOT NULL DEFAULT 'USD',
      estado               TEXT NOT NULL DEFAULT 'pendiente'
                           CHECK (estado IN ('pendiente','en_revision','aprobado','rechazado','completado')),
      created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS alianzas_petroleras (
      id                  SERIAL PRIMARY KEY,
      user_id             INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empresa_solicitante TEXT,
      rif_solicitante     TEXT,
      nombre_contacto     TEXT NOT NULL,
      cargo_contacto      TEXT,
      email_contacto      TEXT NOT NULL,
      telefono            TEXT,
      tipo_alianza        TEXT NOT NULL,
      area_operacion      TEXT,
      descripcion         TEXT,
      servicios_ofrecidos TEXT[],
      estado              TEXT NOT NULL DEFAULT 'pendiente'
                          CHECK (estado IN ('pendiente','en_revision','activa','suspendida','finalizada')),
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

}

// ─────────────────────────────────────────────────────────────────────────────
// 9. ANALÍTICA Y VERIFICACIÓN
// ─────────────────────────────────────────────────────────────────────────────
async function createAnalyticsTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS verification_codes (
      id         SERIAL PRIMARY KEY,
      destino    TEXT NOT NULL,
      tipo       TEXT NOT NULL CHECK (tipo IN ('email', 'sms', 'whatsapp')),
      codigo     TEXT NOT NULL,
      usado      BOOLEAN NOT NULL DEFAULT false,
      intentos   INT NOT NULL DEFAULT 0,
      proposito  TEXT NOT NULL DEFAULT 'verification',
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`ALTER TABLE verification_codes ADD COLUMN IF NOT EXISTS proposito TEXT NOT NULL DEFAULT 'verification'`);
  await safeQuery(`ALTER TABLE verification_codes DROP CONSTRAINT IF EXISTS verification_codes_tipo_check`);
  await safeQuery(`ALTER TABLE verification_codes ADD CONSTRAINT verification_codes_tipo_check CHECK (tipo IN ('email', 'sms', 'whatsapp'))`);
  await query(`CREATE INDEX IF NOT EXISTS idx_verification_codes_destino ON verification_codes(destino)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_verification_codes_created_at ON verification_codes(created_at DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS page_events (
      id         SERIAL PRIMARY KEY,
      evento     TEXT NOT NULL,
      dato       TEXT,
      usuario_ip TEXT,
      creado_en  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_page_events_evento    ON page_events(evento)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_page_events_creado_en ON page_events(creado_en DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS page_visits (
      id          SERIAL PRIMARY KEY,
      page        TEXT NOT NULL DEFAULT '/',
      visitor_id  TEXT,
      user_id     INT REFERENCES users(id) ON DELETE SET NULL,
      module      TEXT DEFAULT 'other',
      ip          TEXT,
      user_agent  TEXT,
      referrer    TEXT,
      country     TEXT,
      device_type TEXT CHECK (device_type IN ('desktop','mobile','tablet','unknown')) DEFAULT 'unknown',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`ALTER TABLE page_visits ADD COLUMN IF NOT EXISTS user_id INT REFERENCES users(id) ON DELETE SET NULL`);
  await query(`ALTER TABLE page_visits ADD COLUMN IF NOT EXISTS module TEXT DEFAULT 'other'`);
  await query(`CREATE INDEX IF NOT EXISTS idx_page_visits_page       ON page_visits(page)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_page_visits_created_at ON page_visits(created_at DESC)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_page_visits_visitor_id ON page_visits(visitor_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_page_visits_module     ON page_visits(module)`);

  await query(`
    CREATE TABLE IF NOT EXISTS site_metrics (
      id           SERIAL PRIMARY KEY,
      metric_key   TEXT NOT NULL UNIQUE,
      metric_value BIGINT NOT NULL DEFAULT 0,
      updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`
    INSERT INTO site_metrics (metric_key, metric_value)
    VALUES ('total_visits', 0), ('unique_visitors', 0), ('active_sessions', 0)
    ON CONFLICT (metric_key) DO NOTHING
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id          SERIAL PRIMARY KEY,
      nombre      TEXT NOT NULL,
      email       TEXT NOT NULL,
      telefono    TEXT,
      empresa     TEXT,
      asunto      TEXT NOT NULL,
      mensaje     TEXT NOT NULL,
      leido       BOOLEAN NOT NULL DEFAULT false,
      respondido  BOOLEAN NOT NULL DEFAULT false,
      respuesta   TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_contact_messages_leido ON contact_messages(leido)`);

  await query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id          SERIAL PRIMARY KEY,
      email       TEXT NOT NULL UNIQUE,
      nombre      TEXT,
      activo      BOOLEAN NOT NULL DEFAULT true,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS feedback_items (
      id          SERIAL PRIMARY KEY,
      user_id     INT REFERENCES users(id) ON DELETE SET NULL,
      tipo        TEXT NOT NULL CHECK (tipo IN ('bug','mejora','idea','queja','felicitacion','otro')),
      titulo      TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      prioridad   TEXT NOT NULL DEFAULT 'normal' CHECK (prioridad IN ('baja','normal','alta','critica')),
      estado      TEXT NOT NULL DEFAULT 'nuevo' CHECK (estado IN ('nuevo','en_revision','en_progreso','resuelto','cerrado')),
      modulo      TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS comentarios_publicos (
      id          SERIAL PRIMARY KEY,
      user_id     INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      texto       TEXT NOT NULL,
      calificacion INT NOT NULL DEFAULT 5 CHECK (calificacion BETWEEN 1 AND 5),
      modulo      TEXT,
      aprobado    BOOLEAN NOT NULL DEFAULT false,
      visible     BOOLEAN NOT NULL DEFAULT true,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_comentarios_publicos_aprobado ON comentarios_publicos(aprobado, visible)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_comentarios_publicos_user ON comentarios_publicos(user_id)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2B. CONTABILIDAD EXTENDIDA — PROFORMAS, PERÍODO, LIBRO DIARIO
// ─────────────────────────────────────────────────────────────────────────────
async function createContabilidadExtendedTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS proformas (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      cliente_id        INT REFERENCES clientes(id) ON DELETE SET NULL,
      numero_proforma   TEXT NOT NULL,
      fecha_emision     DATE NOT NULL,
      fecha_vencimiento DATE,
      moneda            TEXT NOT NULL DEFAULT 'VES',
      subtotal          NUMERIC(18,2) NOT NULL DEFAULT 0,
      porcentaje_iva    NUMERIC(5,2)  NOT NULL DEFAULT 16.00,
      monto_iva         NUMERIC(18,2) NOT NULL DEFAULT 0,
      total             NUMERIC(18,2) NOT NULL DEFAULT 0,
      tasa_bcv          NUMERIC(12,4),
      total_usd         NUMERIC(18,2),
      estado            TEXT NOT NULL DEFAULT 'borrador'
                        CHECK (estado IN ('borrador','enviada','aprobada','rechazada','vencida','convertida')),
      condiciones_pago  TEXT,
      validez_dias      INT NOT NULL DEFAULT 30,
      descripcion       TEXT,
      notas             TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_proformas_user_id ON proformas(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS proforma_items (
      id               SERIAL PRIMARY KEY,
      proforma_id      INT NOT NULL REFERENCES proformas(id) ON DELETE CASCADE,
      descripcion      TEXT NOT NULL,
      cantidad         NUMERIC(12,4) NOT NULL DEFAULT 1,
      precio_unitario  NUMERIC(18,2) NOT NULL DEFAULT 0,
      descuento_pct    NUMERIC(5,2)  NOT NULL DEFAULT 0,
      subtotal         NUMERIC(18,2) NOT NULL DEFAULT 0,
      aplica_iva       BOOLEAN NOT NULL DEFAULT true
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS periodo_fiscal_cierres (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      periodo         TEXT NOT NULL,
      fecha_inicio    DATE NOT NULL,
      fecha_fin       DATE NOT NULL,
      fecha_cierre    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ingresos_total  NUMERIC(18,2) NOT NULL DEFAULT 0,
      gastos_total    NUMERIC(18,2) NOT NULL DEFAULT 0,
      utilidad_neta   NUMERIC(18,2) NOT NULL DEFAULT 0,
      facturas_emitidas INT NOT NULL DEFAULT 0,
      facturas_cobradas INT NOT NULL DEFAULT 0,
      estado          TEXT NOT NULL DEFAULT 'cerrado'
                      CHECK (estado IN ('cerrado','auditado','rectificado')),
      cerrado_por     TEXT,
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_periodo_cierres_user_id ON periodo_fiscal_cierres(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS libro_diario_asientos (
      id               SERIAL PRIMARY KEY,
      user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      numero_asiento   TEXT NOT NULL,
      fecha_asiento    DATE NOT NULL,
      concepto         TEXT NOT NULL,
      tipo_operacion   TEXT,
      referencia_doc   TEXT,
      total_debito     NUMERIC(18,2) NOT NULL DEFAULT 0,
      total_credito    NUMERIC(18,2) NOT NULL DEFAULT 0,
      estado           TEXT NOT NULL DEFAULT 'activo'
                       CHECK (estado IN ('activo','anulado','ajuste')),
      notas            TEXT,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_libro_diario_user_id ON libro_diario_asientos(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS libro_diario_lineas (
      id               SERIAL PRIMARY KEY,
      asiento_id       INT NOT NULL REFERENCES libro_diario_asientos(id) ON DELETE CASCADE,
      cuenta_codigo    TEXT NOT NULL,
      cuenta_nombre    TEXT NOT NULL,
      descripcion      TEXT,
      debe             NUMERIC(18,2) NOT NULL DEFAULT 0,
      haber            NUMERIC(18,2) NOT NULL DEFAULT 0
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS cuentas_por_cobrar (
      id               SERIAL PRIMARY KEY,
      user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      factura_id       INT REFERENCES facturas(id) ON DELETE SET NULL,
      cliente_id       INT REFERENCES clientes(id) ON DELETE SET NULL,
      concepto         TEXT NOT NULL,
      monto_original   NUMERIC(18,2) NOT NULL DEFAULT 0,
      monto_pendiente  NUMERIC(18,2) NOT NULL DEFAULT 0,
      moneda           TEXT NOT NULL DEFAULT 'VES',
      fecha_emision    DATE NOT NULL,
      fecha_vencimiento DATE,
      estado           TEXT NOT NULL DEFAULT 'pendiente'
                       CHECK (estado IN ('pendiente','parcial','cobrada','vencida','incobrable','anulada')),
      dias_vencimiento INT,
      notas            TEXT,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_cxc_user_id ON cuentas_por_cobrar(user_id)`);
  await safeQuery(`CREATE INDEX IF NOT EXISTS idx_cxc_estado  ON cuentas_por_cobrar(user_id, estado)`);

  await query(`
    CREATE TABLE IF NOT EXISTS cuentas_por_pagar (
      id               SERIAL PRIMARY KEY,
      user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      proveedor_id     INT REFERENCES proveedores(id) ON DELETE SET NULL,
      concepto         TEXT NOT NULL,
      monto_original   NUMERIC(18,2) NOT NULL DEFAULT 0,
      monto_pendiente  NUMERIC(18,2) NOT NULL DEFAULT 0,
      moneda           TEXT NOT NULL DEFAULT 'VES',
      fecha_emision    DATE NOT NULL,
      fecha_vencimiento DATE,
      numero_factura_proveedor TEXT,
      estado           TEXT NOT NULL DEFAULT 'pendiente'
                       CHECK (estado IN ('pendiente','parcial','pagada','vencida','en_disputa','anulada')),
      notas            TEXT,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_cxp_user_id ON cuentas_por_pagar(user_id)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3B. RRHH EXTENDIDO — VACANTES, CANDIDATOS, INCIDENTES, PRESTACIONES, CLIMA
// ─────────────────────────────────────────────────────────────────────────────
async function createRRHHExtendedTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS vacantes (
      id                 SERIAL PRIMARY KEY,
      user_id            INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      titulo             TEXT NOT NULL,
      departamento       TEXT NOT NULL,
      descripcion        TEXT,
      requisitos         TEXT[],
      tipo_contrato      TEXT NOT NULL DEFAULT 'tiempo_indeterminado'
                         CHECK (tipo_contrato IN ('tiempo_indeterminado','tiempo_determinado','obra','aprendiz','pasante')),
      modalidad          TEXT NOT NULL DEFAULT 'presencial'
                         CHECK (modalidad IN ('presencial','remoto','hibrido')),
      salario_min        NUMERIC(18,2),
      salario_max        NUMERIC(18,2),
      moneda_salario     TEXT NOT NULL DEFAULT 'USD',
      ubicacion          TEXT,
      estado             TEXT NOT NULL DEFAULT 'abierta'
                         CHECK (estado IN ('abierta','en_proceso','cerrada','cancelada','cubierta')),
      prioridad          TEXT NOT NULL DEFAULT 'normal'
                         CHECK (prioridad IN ('baja','normal','alta','urgente')),
      fecha_publicacion  DATE NOT NULL DEFAULT CURRENT_DATE,
      fecha_limite       DATE,
      created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_vacantes_user_id ON vacantes(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS candidatos_vacante (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      vacante_id        INT NOT NULL REFERENCES vacantes(id) ON DELETE CASCADE,
      nombre            TEXT NOT NULL,
      apellido          TEXT NOT NULL,
      cedula            TEXT,
      email             TEXT NOT NULL,
      telefono          TEXT,
      cv_url            TEXT,
      experiencia_anos  INT NOT NULL DEFAULT 0,
      nivel_educacion   TEXT NOT NULL DEFAULT 'universitario'
                        CHECK (nivel_educacion IN ('bachiller','tecnico','universitario','postgrado','maestria','doctorado')),
      pretension_salarial NUMERIC(18,2),
      moneda_pretension TEXT NOT NULL DEFAULT 'USD',
      etapa             TEXT NOT NULL DEFAULT 'aplicacion'
                        CHECK (etapa IN ('aplicacion','revision_cv','prueba_tecnica','entrevista_rrhh','entrevista_gerencia','oferta','contratado','rechazado','desistio')),
      puntuacion        SMALLINT CHECK (puntuacion BETWEEN 1 AND 10),
      notas_evaluacion  TEXT,
      fecha_aplicacion  DATE NOT NULL DEFAULT CURRENT_DATE,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_candidatos_user_id    ON candidatos_vacante(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_candidatos_vacante_id ON candidatos_vacante(vacante_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS incidentes_salud_seguridad (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id       INT REFERENCES empleados(id) ON DELETE SET NULL,
      tipo              TEXT NOT NULL
                        CHECK (tipo IN ('accidente_trabajo','enfermedad_ocupacional','incidente_peligroso','almost_accident','emergencia','visita_inspeccion','capacitacion','otro')),
      fecha_incidente   DATE NOT NULL,
      lugar             TEXT,
      descripcion       TEXT NOT NULL,
      lesiones          TEXT,
      dias_reposo       INT NOT NULL DEFAULT 0,
      requiere_inabi    BOOLEAN NOT NULL DEFAULT false,
      numero_inabi      TEXT,
      reportado_inpsasel BOOLEAN NOT NULL DEFAULT false,
      fecha_reporte_inpsasel DATE,
      medidas_correctivas TEXT,
      estado            TEXT NOT NULL DEFAULT 'abierto'
                        CHECK (estado IN ('abierto','en_investigacion','cerrado','reportado')),
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_incidentes_user_id ON incidentes_salud_seguridad(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS prestaciones_sociales (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id       INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      periodo           TEXT NOT NULL,
      fecha_inicio      DATE NOT NULL,
      fecha_corte       DATE NOT NULL,
      salario_integral  NUMERIC(18,2) NOT NULL DEFAULT 0,
      dias_antiguedad   INT NOT NULL DEFAULT 0,
      garantia          NUMERIC(18,2) NOT NULL DEFAULT 0,
      intereses         NUMERIC(18,2) NOT NULL DEFAULT 0,
      utilidades_frac   NUMERIC(18,2) NOT NULL DEFAULT 0,
      vacaciones_frac   NUMERIC(18,2) NOT NULL DEFAULT 0,
      total_prestaciones NUMERIC(18,2) NOT NULL DEFAULT 0,
      estado            TEXT NOT NULL DEFAULT 'calculado'
                        CHECK (estado IN ('calculado','pagado_parcial','liquidado')),
      notas             TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_prestaciones_user_id ON prestaciones_sociales(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS clima_organizacional (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id       INT REFERENCES empleados(id) ON DELETE SET NULL,
      periodo           TEXT NOT NULL,
      fecha_encuesta    DATE NOT NULL DEFAULT CURRENT_DATE,
      dimension         TEXT NOT NULL
                        CHECK (dimension IN ('comunicacion','liderazgo','trabajo_equipo','condiciones_trabajo','motivacion','satisfaccion_general','cultura','desarrollo_profesional')),
      puntuacion        SMALLINT NOT NULL CHECK (puntuacion BETWEEN 1 AND 10),
      comentario        TEXT,
      anonimo           BOOLEAN NOT NULL DEFAULT true,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_clima_user_id ON clima_organizacional(user_id)`);
}

async function createRRHHLibrosLaboralesTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS horas_extras (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      fecha           DATE NOT NULL,
      tipo            TEXT NOT NULL CHECK (tipo IN ('extra_diurna','extra_nocturna','nocturna_ordinaria')),
      horas           NUMERIC(5,2) NOT NULL DEFAULT 0,
      salario_hora    NUMERIC(18,2) NOT NULL DEFAULT 0,
      recargo_pct     NUMERIC(5,2) NOT NULL DEFAULT 0,
      monto_total     NUMERIC(18,2) NOT NULL DEFAULT 0,
      aprobado        BOOLEAN NOT NULL DEFAULT false,
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_horas_extras_emp ON horas_extras(empleado_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS vacaciones_control (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      periodo         TEXT NOT NULL,
      fecha_inicio    DATE NOT NULL,
      fecha_fin       DATE NOT NULL,
      dias_correspondientes INT NOT NULL DEFAULT 15,
      dias_disfrutados      INT NOT NULL DEFAULT 0,
      dias_pendientes       INT NOT NULL DEFAULT 15,
      bono_vacacional       NUMERIC(18,2) NOT NULL DEFAULT 0,
      dias_bono             INT NOT NULL DEFAULT 15,
      estado          TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente','en_curso','disfrutado','vencido')),
      alerta_enviada  BOOLEAN NOT NULL DEFAULT false,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_vacaciones_ctrl_emp ON vacaciones_control(empleado_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS utilidades_libro (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      anio            INT NOT NULL,
      dias_trabajados INT NOT NULL DEFAULT 360,
      dias_utilidades INT NOT NULL DEFAULT 15,
      salario_diario  NUMERIC(18,2) NOT NULL DEFAULT 0,
      monto_utilidades NUMERIC(18,2) NOT NULL DEFAULT 0,
      fecha_pago      DATE,
      pagado          BOOLEAN NOT NULL DEFAULT false,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_utilidades_emp ON utilidades_libro(empleado_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS aportes_parafiscales (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      periodo         TEXT NOT NULL,
      tipo            TEXT NOT NULL CHECK (tipo IN ('ivss','faov','inces','lopcymat')),
      base_calculo    NUMERIC(18,2) NOT NULL DEFAULT 0,
      pct_patronal    NUMERIC(5,2) NOT NULL DEFAULT 0,
      pct_empleado    NUMERIC(5,2) NOT NULL DEFAULT 0,
      monto_patronal  NUMERIC(18,2) NOT NULL DEFAULT 0,
      monto_empleado  NUMERIC(18,2) NOT NULL DEFAULT 0,
      pagado          BOOLEAN NOT NULL DEFAULT false,
      fecha_pago      DATE,
      referencia      TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_parafiscales_emp ON aportes_parafiscales(empleado_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS solvencias_laborales (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo            TEXT NOT NULL CHECK (tipo IN ('prestaciones','parafiscales','lottt','general')),
      fecha_emision   DATE NOT NULL DEFAULT CURRENT_DATE,
      fecha_vencimiento DATE NOT NULL,
      numero_solvencia TEXT,
      organismo       TEXT,
      estado          TEXT NOT NULL DEFAULT 'vigente' CHECK (estado IN ('vigente','por_vencer','vencida','renovada')),
      alerta_enviada  BOOLEAN NOT NULL DEFAULT false,
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_solvencias_user ON solvencias_laborales(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS ingreso_egreso_empleados (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      tipo            TEXT NOT NULL CHECK (tipo IN ('ingreso','egreso')),
      fecha           DATE NOT NULL,
      causa_egreso    TEXT CHECK (causa_egreso IN ('renuncia','despido_justificado','despido_injustificado','jubilacion','fallecimiento','mutuo_acuerdo','fin_contrato',NULL)),
      salario_al_momento NUMERIC(18,2),
      liquidacion_prestaciones NUMERIC(18,2) DEFAULT 0,
      liquidacion_vacaciones   NUMERIC(18,2) DEFAULT 0,
      liquidacion_utilidades   NUMERIC(18,2) DEFAULT 0,
      indemnizacion            NUMERIC(18,2) DEFAULT 0,
      total_liquidacion        NUMERIC(18,2) DEFAULT 0,
      observaciones   TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_ingreso_egreso_emp ON ingreso_egreso_empleados(empleado_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS islr_retenciones (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      periodo         TEXT NOT NULL,
      ingreso_gravable NUMERIC(18,2) NOT NULL DEFAULT 0,
      desgravamen     NUMERIC(18,2) NOT NULL DEFAULT 0,
      base_imponible  NUMERIC(18,2) NOT NULL DEFAULT 0,
      tarifa_pct      NUMERIC(5,2) NOT NULL DEFAULT 0,
      impuesto_causado NUMERIC(18,2) NOT NULL DEFAULT 0,
      retenido_acumulado NUMERIC(18,2) NOT NULL DEFAULT 0,
      saldo_retencion  NUMERIC(18,2) NOT NULL DEFAULT 0,
      planilla_generada BOOLEAN NOT NULL DEFAULT false,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_islr_ret_emp ON islr_retenciones(empleado_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS maternidad_lactancia (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      fecha_parto_estimada DATE,
      fecha_parto_real     DATE,
      inicio_prenatal      DATE NOT NULL,
      fin_prenatal         DATE,
      inicio_postnatal     DATE,
      fin_postnatal        DATE,
      semanas_pre          INT NOT NULL DEFAULT 6,
      semanas_post         INT NOT NULL DEFAULT 20,
      lactancia_inicio     DATE,
      lactancia_fin        DATE,
      horas_lactancia_diaria NUMERIC(3,1) NOT NULL DEFAULT 1.0,
      estado          TEXT NOT NULL DEFAULT 'prenatal' CHECK (estado IN ('prenatal','postnatal','lactancia','reintegrada','finalizado')),
      fecha_reintegro DATE,
      alerta_enviada  BOOLEAN NOT NULL DEFAULT false,
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_maternidad_emp ON maternidad_lactancia(empleado_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS incapacidades (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      tipo            TEXT NOT NULL CHECK (tipo IN ('parcial','permanente','temporal')),
      causa           TEXT NOT NULL CHECK (causa IN ('accidente_laboral','enfermedad_ocupacional','accidente_comun','enfermedad_comun')),
      fecha_inicio    DATE NOT NULL,
      fecha_evaluacion DATE,
      porcentaje_incapacidad NUMERIC(5,2) DEFAULT 0,
      salario_referencia NUMERIC(18,2) NOT NULL DEFAULT 0,
      indemnizacion_calculada NUMERIC(18,2) NOT NULL DEFAULT 0,
      anios_indemnizacion     NUMERIC(5,2) NOT NULL DEFAULT 1,
      reubicacion_propuesta   TEXT,
      evaluaciones_medicas    TEXT,
      estado          TEXT NOT NULL DEFAULT 'activa' CHECK (estado IN ('activa','en_evaluacion','reubicado','pensionado','cerrada')),
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_incapacidades_emp ON incapacidades(empleado_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS reposos_medicos (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
      tipo            TEXT NOT NULL CHECK (tipo IN ('enfermedad_comun','accidente_laboral','maternidad','enfermedad_ocupacional')),
      fecha_inicio    DATE NOT NULL,
      fecha_fin       DATE NOT NULL,
      dias_otorgados  INT NOT NULL DEFAULT 0,
      dias_consumidos INT NOT NULL DEFAULT 0,
      dias_pendientes INT NOT NULL DEFAULT 0,
      medico_tratante TEXT,
      centro_medico   TEXT,
      validado_ivss   BOOLEAN NOT NULL DEFAULT false,
      numero_reposo   TEXT,
      requiere_prorroga BOOLEAN NOT NULL DEFAULT false,
      estado          TEXT NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo','finalizado','prorrogado','vencido')),
      alerta_enviada  BOOLEAN NOT NULL DEFAULT false,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_reposos_emp ON reposos_medicos(empleado_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS cancelacion_rif_seniat (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      empleado_id     INT REFERENCES empleados(id) ON DELETE SET NULL,
      nombre_empleado TEXT NOT NULL,
      cedula          TEXT NOT NULL,
      rif_anterior    TEXT NOT NULL,
      fecha_cancelacion DATE NOT NULL,
      causa           TEXT NOT NULL CHECK (causa IN ('cierre_negocio','independiente','jubilacion','fallecimiento','cambio_regimen','suspension','otro')),
      fecha_notificacion DATE,
      comprobante_url TEXT,
      bloqueo_islr    BOOLEAN NOT NULL DEFAULT true,
      observaciones   TEXT,
      estado          TEXT NOT NULL DEFAULT 'cancelado' CHECK (estado IN ('cancelado','suspendido','reactivado')),
      alerta_enviada  BOOLEAN NOT NULL DEFAULT false,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_cancelacion_rif_user ON cancelacion_rif_seniat(user_id)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5B. TELECOMUNICACIONES EXTENDIDAS — FLOTA VEHICULAR, TICKETS
// ─────────────────────────────────────────────────────────────────────────────
async function createTelecomExtendedTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS vehiculos_flota (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      placa             TEXT NOT NULL,
      marca             TEXT NOT NULL,
      modelo            TEXT NOT NULL,
      ano               INT NOT NULL,
      color             TEXT,
      tipo_vehiculo     TEXT NOT NULL DEFAULT 'sedan'
                        CHECK (tipo_vehiculo IN ('sedan','suv','pickup','van','camion','moto','autobus','otro')),
      vin               TEXT,
      numero_motor      TEXT,
      asignado_a        TEXT,
      cedula_asignado   TEXT,
      departamento      TEXT,
      kilometraje       INT NOT NULL DEFAULT 0,
      estado            TEXT NOT NULL DEFAULT 'activo'
                        CHECK (estado IN ('activo','mantenimiento','fuera_servicio','vendido','siniestro')),
      seguro_empresa    TEXT,
      poliza_numero     TEXT,
      poliza_vencimiento DATE,
      intt_vencimiento  DATE,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_vehiculos_user_id ON vehiculos_flota(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS mantenimientos_vehiculo (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      vehiculo_id     INT NOT NULL REFERENCES vehiculos_flota(id) ON DELETE CASCADE,
      tipo            TEXT NOT NULL
                      CHECK (tipo IN ('preventivo','correctivo','revision','llanta','aceite','frenos','electrico','carroceria','otro')),
      fecha           DATE NOT NULL,
      kilometraje_mantenimiento INT,
      descripcion     TEXT NOT NULL,
      taller          TEXT,
      costo           NUMERIC(18,2) NOT NULL DEFAULT 0,
      moneda          TEXT NOT NULL DEFAULT 'USD',
      proximo_km      INT,
      proxima_fecha   DATE,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. VENTAS — PUNTO DE VENTA, FIDELIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────
async function createVentasTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS ventas_pos (
      id               SERIAL PRIMARY KEY,
      user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      cliente_id       INT REFERENCES clientes(id) ON DELETE SET NULL,
      numero_venta     TEXT NOT NULL,
      fecha_venta      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      subtotal         NUMERIC(18,2) NOT NULL DEFAULT 0,
      porcentaje_iva   NUMERIC(5,2)  NOT NULL DEFAULT 16.00,
      monto_iva        NUMERIC(18,2) NOT NULL DEFAULT 0,
      descuento_total  NUMERIC(18,2) NOT NULL DEFAULT 0,
      total            NUMERIC(18,2) NOT NULL DEFAULT 0,
      moneda           TEXT NOT NULL DEFAULT 'VES',
      tasa_bcv         NUMERIC(12,4),
      metodo_pago      TEXT NOT NULL DEFAULT 'efectivo'
                       CHECK (metodo_pago IN ('efectivo','transferencia','pago_movil','zelle','punto_bancario','dolares','mixto','paypal','stripe','zinli','wise','cripto_btc','cripto_eth','cripto_usdt','cripto_usdc','binance_pay','biopago','pago_qr','debito_inmediato','tarjeta','kyron_wallet','reserve','remesa','efectivo_divisa')),
      estado           TEXT NOT NULL DEFAULT 'completada'
                       CHECK (estado IN ('completada','anulada','devolucion')),
      cajero           TEXT,
      notas            TEXT,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_ventas_pos_user_id ON ventas_pos(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_ventas_pos_fecha   ON ventas_pos(fecha_venta DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS ventas_pos_items (
      id               SERIAL PRIMARY KEY,
      venta_id         INT NOT NULL REFERENCES ventas_pos(id) ON DELETE CASCADE,
      inventario_id    INT REFERENCES inventario(id) ON DELETE SET NULL,
      descripcion      TEXT NOT NULL,
      cantidad         NUMERIC(12,4) NOT NULL DEFAULT 1,
      precio_unitario  NUMERIC(18,2) NOT NULL DEFAULT 0,
      descuento_pct    NUMERIC(5,2)  NOT NULL DEFAULT 0,
      subtotal         NUMERIC(18,2) NOT NULL DEFAULT 0,
      aplica_iva       BOOLEAN NOT NULL DEFAULT true
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS clientes_fidelizacion (
      id                 SERIAL PRIMARY KEY,
      user_id            INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      cliente_id         INT REFERENCES clientes(id) ON DELETE SET NULL,
      nombre             TEXT NOT NULL,
      email              TEXT,
      telefono           TEXT,
      puntos_acumulados  INT NOT NULL DEFAULT 0,
      puntos_canjeados   INT NOT NULL DEFAULT 0,
      nivel_fidelidad    TEXT NOT NULL DEFAULT 'bronce'
                         CHECK (nivel_fidelidad IN ('bronce','plata','oro','platino','diamante')),
      total_compras      NUMERIC(18,2) NOT NULL DEFAULT 0,
      numero_compras     INT NOT NULL DEFAULT 0,
      ultima_compra      DATE,
      activo             BOOLEAN NOT NULL DEFAULT true,
      created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_fidelizacion_user_id ON clientes_fidelizacion(user_id)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. PROYECTOS, PROPUESTAS Y FACTIBILIDAD
// ─────────────────────────────────────────────────────────────────────────────
async function createProyectosTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS proyectos_propuesta (
      id                   SERIAL PRIMARY KEY,
      user_id              INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      nombre               TEXT NOT NULL,
      codigo               TEXT,
      tipo                 TEXT NOT NULL DEFAULT 'interno'
                           CHECK (tipo IN ('interno','cliente','gubernamental','mixto','inversion')),
      descripcion          TEXT,
      objetivo             TEXT,
      alcance              TEXT,
      cliente_empresa      TEXT,
      rif_cliente          TEXT,
      presupuesto_estimado NUMERIC(18,2) NOT NULL DEFAULT 0,
      moneda               TEXT NOT NULL DEFAULT 'USD',
      duracion_meses       INT NOT NULL DEFAULT 1,
      fecha_inicio_estimada DATE,
      fecha_fin_estimada    DATE,
      fase                 TEXT NOT NULL DEFAULT 'propuesta'
                           CHECK (fase IN ('propuesta','aprobado','en_ejecucion','pausado','completado','cancelado')),
      prioridad            TEXT NOT NULL DEFAULT 'normal'
                           CHECK (prioridad IN ('baja','normal','alta','critica')),
      responsable          TEXT,
      equipo               TEXT[],
      rentabilidad_esperada NUMERIC(7,4),
      notas                TEXT,
      created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_proyectos_user_id ON proyectos_propuesta(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS estudios_factibilidad (
      id                   SERIAL PRIMARY KEY,
      user_id              INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      proyecto_id          INT REFERENCES proyectos_propuesta(id) ON DELETE SET NULL,
      titulo               TEXT NOT NULL,
      mercado_objetivo     TEXT,
      poblacion_estimada   BIGINT,
      demanda_potencial    TEXT,
      inversion_inicial    NUMERIC(18,2) NOT NULL DEFAULT 0,
      costos_operativos    NUMERIC(18,2) NOT NULL DEFAULT 0,
      ingresos_proyectados NUMERIC(18,2) NOT NULL DEFAULT 0,
      punto_equilibrio_meses INT,
      roi_estimado         NUMERIC(7,4),
      tir_estimada         NUMERIC(7,4),
      van_estimado         NUMERIC(18,2),
      riesgo               TEXT NOT NULL DEFAULT 'medio'
                           CHECK (riesgo IN ('bajo','medio','alto','muy_alto')),
      conclusion           TEXT,
      created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS permisos_legales (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo              TEXT NOT NULL
                        CHECK (tipo IN ('licencia','permiso','registro','certificacion','habilitacion','solvencia','autorizacion','municipal','ambiental','sanitario','bomberos','trabajo','intt','seniat','sunagro','sasa','minpet','conatel','otro')),
      nombre_permiso    TEXT NOT NULL,
      numero_permiso    TEXT,
      organismo         TEXT NOT NULL,
      fecha_emision     DATE,
      fecha_vencimiento DATE,
      estado            TEXT NOT NULL DEFAULT 'vigente'
                        CHECK (estado IN ('en_tramite','vigente','vencido','en_renovacion','denegado','archivado')),
      descripcion       TEXT,
      responsable       TEXT,
      costo_tramite     NUMERIC(18,2) NOT NULL DEFAULT 0,
      moneda_costo      TEXT NOT NULL DEFAULT 'USD',
      archivo_url       TEXT,
      alertar_dias_antes INT NOT NULL DEFAULT 30,
      notas             TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_permisos_legales_user_id ON permisos_legales(user_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS tarjetas_reciclaje (
      id               SERIAL PRIMARY KEY,
      user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      numero_tarjeta   TEXT NOT NULL UNIQUE,
      nombre_titular   TEXT NOT NULL,
      cedula_titular   TEXT NOT NULL,
      telefono         TEXT,
      email            TEXT,
      punto_ameru      TEXT,
      estado           TEXT NOT NULL DEFAULT 'activa'
                       CHECK (estado IN ('activa','bloqueada','vencida','reemplazada')),
      fecha_emision    DATE NOT NULL DEFAULT CURRENT_DATE,
      fecha_vencimiento DATE,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_tarjetas_reciclaje_user_id ON tarjetas_reciclaje(user_id)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. CONFIGURACIÓN Y NOTIFICACIONES
// ─────────────────────────────────────────────────────────────────────────────
async function createConfiguracionTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS notificaciones (
      id         SERIAL PRIMARY KEY,
      user_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo       TEXT NOT NULL
                 CHECK (tipo IN ('alerta','info','exito','advertencia','fiscal','vencimiento','parafiscal','laboral','regulatorio','municipal','ambiental')),
      titulo     TEXT NOT NULL,
      mensaje    TEXT NOT NULL,
      leida      BOOLEAN NOT NULL DEFAULT false,
      accion_url TEXT,
      metadata   JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_notificaciones_user_id ON notificaciones(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_notificaciones_leida   ON notificaciones(user_id, leida)`);
  await safeQuery(`ALTER TABLE notificaciones DROP CONSTRAINT IF EXISTS notificaciones_tipo_check`);
  await safeQuery(`ALTER TABLE notificaciones ADD CONSTRAINT notificaciones_tipo_check CHECK (tipo IN ('alerta','info','exito','advertencia','fiscal','vencimiento','parafiscal','laboral','regulatorio','municipal','ambiental','sistema','bienvenida','recordatorio'))`);

  await query(`
    CREATE TABLE IF NOT EXISTS demo_requests (
      id           SERIAL PRIMARY KEY,
      name         TEXT NOT NULL,
      role         TEXT,
      email        TEXT NOT NULL,
      phone        TEXT,
      company      TEXT,
      company_size TEXT,
      sector       TEXT,
      urgency      TEXT,
      module       TEXT,
      message      TEXT,
      status       TEXT NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new','contacted','converted','discarded')),
      notas_internas TEXT,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS configuracion_usuario (
      id                 SERIAL PRIMARY KEY,
      user_id            INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      idioma             TEXT NOT NULL DEFAULT 'es',
      moneda_preferida   TEXT NOT NULL DEFAULT 'VES',
      zona_horaria       TEXT NOT NULL DEFAULT 'America/Caracas',
      notif_email        BOOLEAN NOT NULL DEFAULT true,
      notif_whatsapp     BOOLEAN NOT NULL DEFAULT false,
      telefono_whatsapp  TEXT,
      notif_sms          BOOLEAN NOT NULL DEFAULT false,
      telefono_sms       TEXT,
      notif_vencimientos BOOLEAN NOT NULL DEFAULT true,
      notif_pagos        BOOLEAN NOT NULL DEFAULT true,
      iva_pct            NUMERIC(5,2) NOT NULL DEFAULT 16.00,
      igtf_pct           NUMERIC(5,2) NOT NULL DEFAULT 3.00,
      islr_pct           NUMERIC(5,2) NOT NULL DEFAULT 34.00,
      rif_empresa        TEXT,
      nombre_comercial   TEXT,
      logo_url           TEXT,
      pie_factura        TEXT,
      updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`ALTER TABLE configuracion_usuario ADD COLUMN IF NOT EXISTS notif_sms BOOLEAN NOT NULL DEFAULT false`);
  await query(`ALTER TABLE configuracion_usuario ADD COLUMN IF NOT EXISTS telefono_sms TEXT`);
  await query(`ALTER TABLE configuracion_usuario ADD COLUMN IF NOT EXISTS email_verificacion TEXT`);
  await query(`ALTER TABLE configuracion_usuario ADD COLUMN IF NOT EXISTS email_alertas TEXT`);
  await query(`ALTER TABLE configuracion_usuario ADD COLUMN IF NOT EXISTS reducir_animaciones BOOLEAN NOT NULL DEFAULT false`);
  await query(`ALTER TABLE configuracion_usuario ADD COLUMN IF NOT EXISTS nav_lateral BOOLEAN NOT NULL DEFAULT false`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. SISTEMA AVANZADO — SALUD, AUDITORÍA, CACHÉ, REPORTES, ALERTAS, MIGRACIONES
// ─────────────────────────────────────────────────────────────────────────────
async function createAdvancedSystemTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS migration_versions (
      id           SERIAL PRIMARY KEY,
      version      TEXT NOT NULL UNIQUE,
      description  TEXT NOT NULL,
      applied_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      checksum     TEXT,
      execution_ms INT
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS system_health_log (
      id                SERIAL PRIMARY KEY,
      metric_type       TEXT NOT NULL
                        CHECK (metric_type IN ('db_latency','api_response','error_rate','pool_usage','memory','cpu','disk','query_count','active_connections','cache_hit_rate')),
      value             NUMERIC(18,4) NOT NULL,
      unit              TEXT NOT NULL DEFAULT 'ms',
      context           JSONB,
      recorded_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_health_log_type ON system_health_log(metric_type, recorded_at DESC)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_health_log_time ON system_health_log(recorded_at DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS auditoria_detallada (
      id              SERIAL PRIMARY KEY,
      user_id         INT REFERENCES users(id) ON DELETE SET NULL,
      tabla_afectada  TEXT NOT NULL,
      registro_id     INT,
      operacion       TEXT NOT NULL CHECK (operacion IN ('INSERT','UPDATE','DELETE','SELECT','EXPORT','IMPORT','LOGIN','LOGOUT')),
      datos_anteriores JSONB,
      datos_nuevos    JSONB,
      campos_modificados TEXT[],
      ip_address      TEXT,
      user_agent      TEXT,
      session_id      TEXT,
      risk_level      TEXT NOT NULL DEFAULT 'low' CHECK (risk_level IN ('low','medium','high','critical')),
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_auditoria_user ON auditoria_detallada(user_id, created_at DESC)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_auditoria_tabla ON auditoria_detallada(tabla_afectada, created_at DESC)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_auditoria_risk ON auditoria_detallada(risk_level) WHERE risk_level IN ('high','critical')`);

  await query(`ALTER TABLE auditoria_detallada ADD COLUMN IF NOT EXISTS blockchain_hash TEXT`);
  await query(`ALTER TABLE auditoria_detallada ADD COLUMN IF NOT EXISTS blockchain_verified BOOLEAN DEFAULT FALSE`);

  await query(`
    CREATE TABLE IF NOT EXISTS blockchain_proofs (
      id              SERIAL PRIMARY KEY,
      entity_type     TEXT NOT NULL,
      entity_id       TEXT NOT NULL,
      data_hash       TEXT NOT NULL,
      payload_snapshot JSONB,
      merkle_root     TEXT,
      tx_hash         TEXT,
      block_number    INT,
      chain_id        INT,
      chain_name      TEXT,
      status          TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','anchored','verified','failed')),
      anchor_attempts INT NOT NULL DEFAULT 0,
      last_error      TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      anchored_at     TIMESTAMPTZ
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_blockchain_entity ON blockchain_proofs(entity_type, entity_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_blockchain_hash ON blockchain_proofs(data_hash)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_blockchain_status ON blockchain_proofs(status) WHERE status = 'pending'`);
  await query(`CREATE INDEX IF NOT EXISTS idx_blockchain_tx ON blockchain_proofs(tx_hash) WHERE tx_hash IS NOT NULL`);

  await query(`
    CREATE TABLE IF NOT EXISTS dashboard_cache (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      cache_key       TEXT NOT NULL,
      cache_data      JSONB NOT NULL,
      ttl_seconds     INT NOT NULL DEFAULT 300,
      generated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at      TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '5 minutes',
      hit_count       INT NOT NULL DEFAULT 0,
      UNIQUE(user_id, cache_key)
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_dashboard_cache_expires ON dashboard_cache(expires_at)`);

  await query(`
    CREATE TABLE IF NOT EXISTS reportes_generados (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo_reporte    TEXT NOT NULL
                      CHECK (tipo_reporte IN ('balance_general','estado_resultados','libro_diario','libro_mayor','flujo_caja',
                                              'nomina_resumen','prestaciones','iva_mensual','islr_anual','retenciones',
                                              'inventario_valorizado','cxc_antigüedad','cxp_antigüedad','ventas_periodo',
                                              'auditoria','analytics','personalizado')),
      titulo          TEXT NOT NULL,
      periodo_inicio  DATE,
      periodo_fin     DATE,
      parametros      JSONB,
      formato         TEXT NOT NULL DEFAULT 'pdf' CHECK (formato IN ('pdf','xlsx','csv','json')),
      archivo_url     TEXT,
      tamano_bytes    BIGINT,
      estado          TEXT NOT NULL DEFAULT 'generando'
                      CHECK (estado IN ('generando','completado','error','expirado')),
      error_message   TEXT,
      generado_en_ms  INT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_reportes_user ON reportes_generados(user_id, created_at DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS alertas_programadas (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tipo_alerta     TEXT NOT NULL
                      CHECK (tipo_alerta IN ('vencimiento_factura','vencimiento_permiso','vencimiento_poliza',
                                             'stock_bajo','saldo_minimo','nomina_pendiente','declaracion_fiscal',
                                             'contrato_por_vencer','reposo_por_vencer','solvencia_por_vencer',
                                             'tasa_bcv','meta_ventas','personalizada')),
      titulo          TEXT NOT NULL,
      mensaje         TEXT NOT NULL,
      entidad_tipo    TEXT,
      entidad_id      INT,
      condicion       JSONB,
      dias_anticipacion INT NOT NULL DEFAULT 7,
      frecuencia      TEXT NOT NULL DEFAULT 'una_vez'
                      CHECK (frecuencia IN ('una_vez','diaria','semanal','mensual')),
      canal           TEXT NOT NULL DEFAULT 'sistema'
                      CHECK (canal IN ('sistema','email','sms','push','whatsapp')),
      activa          BOOLEAN NOT NULL DEFAULT true,
      ultima_ejecucion TIMESTAMPTZ,
      proxima_ejecucion TIMESTAMPTZ,
      total_enviadas  INT NOT NULL DEFAULT 0,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_alertas_user ON alertas_programadas(user_id, activa)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_alertas_proxima ON alertas_programadas(proxima_ejecucion) WHERE activa = true`);

  await query(`
    CREATE TABLE IF NOT EXISTS api_request_log (
      id              SERIAL PRIMARY KEY,
      method          TEXT NOT NULL,
      path            TEXT NOT NULL,
      status_code     INT NOT NULL,
      user_id         INT,
      ip_address      TEXT,
      duration_ms     INT NOT NULL,
      request_size    INT,
      response_size   INT,
      error_message   TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_api_log_path ON api_request_log(path, created_at DESC)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_api_log_status ON api_request_log(status_code) WHERE status_code >= 400`);
  await query(`CREATE INDEX IF NOT EXISTS idx_api_log_time ON api_request_log(created_at DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS backup_log (
      id              SERIAL PRIMARY KEY,
      tipo_backup     TEXT NOT NULL CHECK (tipo_backup IN ('full','incremental','schema','datos','tabla')),
      tablas          TEXT[],
      tamano_bytes    BIGINT,
      archivo_url     TEXT,
      duracion_ms     INT,
      registros_total BIGINT,
      estado          TEXT NOT NULL DEFAULT 'en_progreso'
                      CHECK (estado IN ('en_progreso','completado','error')),
      error_message   TEXT,
      iniciado_por    INT REFERENCES users(id) ON DELETE SET NULL,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS webhooks (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      nombre          TEXT NOT NULL,
      url             TEXT NOT NULL,
      eventos         TEXT[] NOT NULL,
      headers         JSONB,
      secreto         TEXT,
      activo          BOOLEAN NOT NULL DEFAULT true,
      ultimo_envio    TIMESTAMPTZ,
      ultimo_estado   INT,
      total_envios    INT NOT NULL DEFAULT 0,
      total_errores   INT NOT NULL DEFAULT 0,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_webhooks_user ON webhooks(user_id, activo)`);

  await query(`
    CREATE TABLE IF NOT EXISTS integraciones_externas (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      proveedor       TEXT NOT NULL
                      CHECK (proveedor IN ('seniat','bcv','ivss','faov','inces','banavih','conatel','inpsasel','sunagro',
                                           'mercadolibre','whatsapp','google','outlook','twilio','stripe','paypal')),
      tipo            TEXT NOT NULL DEFAULT 'api' CHECK (tipo IN ('api','oauth','webhook','scraping','manual')),
      nombre_conexion TEXT NOT NULL,
      configuracion   JSONB,
      estado          TEXT NOT NULL DEFAULT 'activa'
                      CHECK (estado IN ('activa','inactiva','error','pendiente','expirada')),
      ultimo_sync     TIMESTAMPTZ,
      sync_frecuencia TEXT DEFAULT 'manual',
      errores_consecutivos INT NOT NULL DEFAULT 0,
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_integraciones_user ON integraciones_externas(user_id, proveedor)`);

  await query(`
    CREATE TABLE IF NOT EXISTS plantillas_documento (
      id              SERIAL PRIMARY KEY,
      user_id         INT REFERENCES users(id) ON DELETE CASCADE,
      tipo            TEXT NOT NULL
                      CHECK (tipo IN ('factura','cotizacion','recibo','carta','contrato','nomina','certificado','reporte','nota_credito','nota_debito')),
      nombre          TEXT NOT NULL,
      contenido_html  TEXT NOT NULL,
      variables       TEXT[],
      es_default      BOOLEAN NOT NULL DEFAULT false,
      activa          BOOLEAN NOT NULL DEFAULT true,
      version         INT NOT NULL DEFAULT 1,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_plantillas_user ON plantillas_documento(user_id, tipo)`);

  await query(`
    CREATE TABLE IF NOT EXISTS presupuestos (
      id                SERIAL PRIMARY KEY,
      user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      nombre            TEXT NOT NULL,
      categoria         TEXT NOT NULL
                        CHECK (categoria IN ('operativo','capital','marketing','rrhh','tecnologia','legal','general')),
      periodo_inicio    DATE NOT NULL,
      periodo_fin       DATE NOT NULL,
      monto_presupuestado NUMERIC(18,2) NOT NULL DEFAULT 0,
      monto_ejecutado   NUMERIC(18,2) NOT NULL DEFAULT 0,
      monto_comprometido NUMERIC(18,2) NOT NULL DEFAULT 0,
      moneda            TEXT NOT NULL DEFAULT 'USD',
      estado            TEXT NOT NULL DEFAULT 'activo'
                        CHECK (estado IN ('borrador','activo','cerrado','excedido')),
      notas             TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await safeQuery(`CREATE INDEX IF NOT EXISTS idx_presupuestos_user ON presupuestos(user_id, estado)`);

  await query(`
    CREATE TABLE IF NOT EXISTS metas_kpi (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      nombre          TEXT NOT NULL,
      categoria       TEXT NOT NULL
                      CHECK (categoria IN ('ventas','finanzas','rrhh','operaciones','clientes','calidad','crecimiento')),
      indicador       TEXT NOT NULL,
      meta_valor      NUMERIC(18,4) NOT NULL,
      valor_actual    NUMERIC(18,4) NOT NULL DEFAULT 0,
      unidad          TEXT NOT NULL DEFAULT 'unidades',
      periodo         TEXT NOT NULL,
      fecha_inicio    DATE NOT NULL,
      fecha_fin       DATE NOT NULL,
      estado          TEXT NOT NULL DEFAULT 'en_progreso'
                      CHECK (estado IN ('en_progreso','alcanzada','no_alcanzada','cancelada')),
      responsable     TEXT,
      notas           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await safeQuery(`CREATE INDEX IF NOT EXISTS idx_metas_user ON metas_kpi(user_id, estado)`);
}

async function createAutomationTables(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS automation_rules (
      id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      name            TEXT NOT NULL,
      description     TEXT NOT NULL DEFAULT '',
      trigger_type    TEXT NOT NULL DEFAULT 'schedule'
                      CHECK (trigger_type IN ('schedule','event','manual')),
      trigger_config  JSONB NOT NULL DEFAULT '{}',
      action_type     TEXT NOT NULL,
      action_config   JSONB NOT NULL DEFAULT '{}',
      enabled         BOOLEAN NOT NULL DEFAULT true,
      last_run_at     TIMESTAMPTZ,
      next_run_at     TIMESTAMPTZ,
      run_count       INT NOT NULL DEFAULT 0,
      fail_count      INT NOT NULL DEFAULT 0,
      avg_duration_ms NUMERIC(12,2),
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_automation_action_unique ON automation_rules(action_type) WHERE trigger_type = 'schedule'`);
  await query(`CREATE INDEX IF NOT EXISTS idx_automation_enabled ON automation_rules(enabled, next_run_at)`);

  await query(`
    CREATE TABLE IF NOT EXISTS automation_logs (
      id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      rule_id         TEXT NOT NULL REFERENCES automation_rules(id) ON DELETE CASCADE,
      status          TEXT NOT NULL DEFAULT 'running'
                      CHECK (status IN ('running','success','error','skipped')),
      started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      finished_at     TIMESTAMPTZ,
      duration_ms     NUMERIC(12,2),
      result_summary  TEXT,
      error_message   TEXT
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_automation_logs_rule ON automation_logs(rule_id, started_at DESC)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_automation_logs_status ON automation_logs(status, started_at DESC)`);

  try {
    await seedAutomationRules();
  } catch {
    await seedAutomationRules();
  }
}

async function seedAutomationRules(): Promise<void> {
  const rules = [
    {
      name: 'Sincronización BCV',
      description: 'Obtiene tasas de cambio USD/VES del Banco Central de Venezuela automáticamente',
      trigger_type: 'schedule',
      trigger_config: { interval_hours: 6, label: 'Cada 6 horas' },
      action_type: 'bcv_sync',
    },
    {
      name: 'Alertas Fiscales Predictivas',
      description: 'Verifica vencimientos de IVA, ISLR, IGTF según calendario SENIAT y RIF terminal',
      trigger_type: 'schedule',
      trigger_config: { interval_hours: 4, label: 'Cada 4 horas' },
      action_type: 'fiscal_alerts',
    },
    {
      name: 'Monitor de Salud del Sistema',
      description: 'Verifica latencia de DB, usuarios activos, espacio en disco y tablas del sistema',
      trigger_type: 'schedule',
      trigger_config: { interval_hours: 2, label: 'Cada 2 horas' },
      action_type: 'db_health_check',
    },
    {
      name: 'Anclaje Blockchain por Lotes',
      description: 'Procesa pruebas de auditoría pendientes y las ancla al registro blockchain',
      trigger_type: 'schedule',
      trigger_config: { interval_hours: 12, label: 'Cada 12 horas' },
      action_type: 'blockchain_batch_anchor',
    },
    {
      name: 'Limpieza de Sesiones',
      description: 'Elimina sesiones expiradas y códigos de verificación obsoletos del sistema',
      trigger_type: 'schedule',
      trigger_config: { interval_hours: 24, label: 'Diario' },
      action_type: 'session_cleanup',
    },
    {
      name: 'Recordatorio de Facturas',
      description: 'Detecta facturas por vencer o vencidas y genera notificaciones automáticas de cobranza',
      trigger_type: 'schedule',
      trigger_config: { interval_hours: 8, label: 'Cada 8 horas' },
      action_type: 'invoice_reminders',
    },
    {
      name: 'Resumen de Actividad Diario',
      description: 'Genera un digest de actividad del sistema: eventos de auth, contabilidad y errores en 24h',
      trigger_type: 'schedule',
      trigger_config: { interval_hours: 24, label: 'Diario' },
      action_type: 'activity_digest',
    },
    {
      name: 'Monitor Regulatorio — Gacetas y Asamblea Nacional',
      description: 'Verifica cambios en Gacetas Oficiales, decretos de la Asamblea Nacional, providencias y resoluciones de entes gubernamentales. Genera alertas para empresas registradas.',
      trigger_type: 'schedule',
      trigger_config: { interval_hours: 6, label: 'Cada 6 horas' },
      action_type: 'regulatory_alerts',
    },
    {
      name: 'Emails Automáticos',
      description: 'Procesa reglas de email automatizado: facturas vencidas, resúmenes semanales, recordatorios de pago y alertas fiscales por correo',
      trigger_type: 'schedule',
      trigger_config: { interval_hours: 4, label: 'Cada 4 horas' },
      action_type: 'email_automation',
    },
  ];

  for (const rule of rules) {
    await query(
      `INSERT INTO automation_rules (name, description, trigger_type, trigger_config, action_type)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (action_type) WHERE trigger_type = 'schedule' DO NOTHING`,
      [rule.name, rule.description, rule.trigger_type, JSON.stringify(rule.trigger_config), rule.action_type]
    );
  }
}

async function createPlanUsageTables(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS uso_plan (
      id              SERIAL PRIMARY KEY,
      user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      plan            TEXT NOT NULL DEFAULT 'starter'
                      CHECK (plan IN ('starter','profesional','empresarial','kyron_max')),
      ciclo           TEXT NOT NULL DEFAULT 'mensual'
                      CHECK (ciclo IN ('mensual','anual')),
      periodo         TEXT NOT NULL,
      consultas_ai    INT NOT NULL DEFAULT 0,
      alertas_fiscales INT NOT NULL DEFAULT 0,
      alertas_regulatorias INT NOT NULL DEFAULT 0,
      facturas        INT NOT NULL DEFAULT 0,
      chat_mensajes   INT NOT NULL DEFAULT 0,
      simulador_multas INT NOT NULL DEFAULT 0,
      exportaciones   INT NOT NULL DEFAULT 0,
      consultas_rif   INT NOT NULL DEFAULT 0,
      blockchain_proofs INT NOT NULL DEFAULT 0,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(user_id, periodo)
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_uso_plan_user ON uso_plan(user_id, periodo)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_uso_plan_plan ON uso_plan(plan)`);

  try {
    await query(`ALTER TABLE uso_plan ADD COLUMN IF NOT EXISTS ciclo TEXT NOT NULL DEFAULT 'mensual' CHECK (ciclo IN ('mensual','anual'))`);
  } catch { /* column already exists */ }
}

async function createPerformanceOptimizations(): Promise<void> {
  await query(`CREATE TABLE IF NOT EXISTS email_log (
    id           SERIAL PRIMARY KEY,
    destinatario TEXT NOT NULL,
    asunto       TEXT NOT NULL,
    modulo       TEXT NOT NULL DEFAULT 'sistema',
    proveedor    TEXT NOT NULL,
    estado       TEXT NOT NULL CHECK (estado IN ('enviado','fallido')),
    error_msg    TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);
  await query(`CREATE INDEX IF NOT EXISTS idx_email_log_created ON email_log(created_at DESC)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_email_log_modulo ON email_log(modulo, created_at DESC)`);

  await query(`CREATE TABLE IF NOT EXISTS notificaciones (
    id           SERIAL PRIMARY KEY,
    user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tipo         TEXT NOT NULL DEFAULT 'info'
                 CHECK (tipo IN ('info','alerta','cobranza','fiscal','sistema','bienvenida','recordatorio')),
    titulo       TEXT NOT NULL,
    mensaje      TEXT NOT NULL,
    prioridad    TEXT NOT NULL DEFAULT 'normal'
                 CHECK (prioridad IN ('baja','normal','alta','critica')),
    leida        BOOLEAN NOT NULL DEFAULT false,
    canal        TEXT NOT NULL DEFAULT 'app'
                 CHECK (canal IN ('app','email','sms','whatsapp','multi')),
    metadata     JSONB DEFAULT '{}',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);
  await safeQuery(`ALTER TABLE notificaciones ADD COLUMN IF NOT EXISTS prioridad TEXT NOT NULL DEFAULT 'normal'`);
  await safeQuery(`ALTER TABLE notificaciones ADD COLUMN IF NOT EXISTS canal TEXT NOT NULL DEFAULT 'app'`);
  await safeQuery(`ALTER TABLE notificaciones ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'`);
  await safeQuery(`CREATE INDEX IF NOT EXISTS idx_notificaciones_user ON notificaciones(user_id, leida, created_at DESC)`);
  await safeQuery(`CREATE INDEX IF NOT EXISTS idx_notificaciones_tipo ON notificaciones(tipo, created_at DESC)`);
  await safeQuery(`CREATE INDEX IF NOT EXISTS idx_notificaciones_prioridad ON notificaciones(prioridad) WHERE leida = false`);

  await query(`CREATE TABLE IF NOT EXISTS email_automaticos (
    id             SERIAL PRIMARY KEY,
    tipo           TEXT NOT NULL
                   CHECK (tipo IN ('bienvenida','verificacion','factura_emitida','factura_vencida','nomina_lista','contrato_firmado','alerta_fiscal','resumen_semanal','recordatorio_pago','cambio_plan')),
    nombre         TEXT NOT NULL,
    asunto_template TEXT NOT NULL,
    activo         BOOLEAN NOT NULL DEFAULT true,
    destinatario_tipo TEXT NOT NULL DEFAULT 'usuario'
                   CHECK (destinatario_tipo IN ('usuario','admin','cliente','todos')),
    intervalo_horas INT,
    ultimo_envio   TIMESTAMPTZ,
    total_enviados INT NOT NULL DEFAULT 0,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);
  await safeQuery(`CREATE UNIQUE INDEX IF NOT EXISTS idx_email_auto_tipo_unique ON email_automaticos(tipo)`);
  await safeQuery(`CREATE INDEX IF NOT EXISTS idx_email_auto_tipo ON email_automaticos(tipo, activo)`);

  const safeIndex = async (sql: string) => {
    try { await query(sql); } catch { /* table/column may not exist yet */ }
  };

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_facturas_user_estado ON facturas(user_id, estado)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_facturas_created ON facturas(created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_facturas_fecha ON facturas(fecha_emision DESC)`);

  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS numero_control TEXT`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS serie TEXT`);
  await safeQuery(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS tipo_documento TEXT NOT NULL DEFAULT 'FACTURA'`);
  await safeQuery(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS condicion_pago TEXT NOT NULL DEFAULT 'contado'`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS base_imponible NUMERIC(18,2) NOT NULL DEFAULT 0`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS base_exenta NUMERIC(18,2) NOT NULL DEFAULT 0`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS base_no_sujeta NUMERIC(18,2) NOT NULL DEFAULT 0`);
  await safeQuery(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS alicuota_tipo TEXT NOT NULL DEFAULT 'general'`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS monto_moneda_ext NUMERIC(18,2)`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS moneda_extranjera TEXT`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS retencion_iva NUMERIC(18,2) NOT NULL DEFAULT 0`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS porcentaje_ret_iva NUMERIC(5,2) NOT NULL DEFAULT 0`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS retencion_islr NUMERIC(18,2) NOT NULL DEFAULT 0`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS porcentaje_ret_islr NUMERIC(5,2) NOT NULL DEFAULT 0`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS total_a_pagar NUMERIC(18,2) NOT NULL DEFAULT 0`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS rif_emisor TEXT`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS razon_social_emisor TEXT`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS domicilio_fiscal_emisor TEXT`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS telefono_emisor TEXT`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS factura_referencia_id INT REFERENCES facturas(id) ON DELETE SET NULL`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS factura_referencia_num TEXT`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS factura_referencia_fecha DATE`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS motivo_ajuste TEXT`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS sin_derecho_credito_fiscal BOOLEAN NOT NULL DEFAULT false`);

  await query(`ALTER TABLE factura_items ADD COLUMN IF NOT EXISTS codigo TEXT`);
  await query(`ALTER TABLE factura_items ADD COLUMN IF NOT EXISTS unidad TEXT NOT NULL DEFAULT 'UND'`);
  await safeQuery(`ALTER TABLE factura_items ADD COLUMN IF NOT EXISTS tipo_gravamen TEXT NOT NULL DEFAULT 'gravado'`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_facturas_numero_control ON facturas(numero_control)`);
  await safeIndex(`CREATE UNIQUE INDEX IF NOT EXISTS idx_facturas_user_control_unique ON facturas(user_id, numero_control) WHERE numero_control IS NOT NULL`);
  await safeIndex(`CREATE UNIQUE INDEX IF NOT EXISTS idx_facturas_user_factura_unique ON facturas(user_id, numero_factura)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_empleados_activo ON empleados(user_id, activo)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_empleados_cedula ON empleados(cedula)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_nominas_periodo ON nominas(user_id, fecha_inicio, fecha_fin)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_nominas_estado ON nominas(estado)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_lineas_user ON lineas_telecom(user_id, activa)`);
  await safeIndex(`CREATE UNIQUE INDEX IF NOT EXISTS idx_lineas_numero_unique ON lineas_telecom(numero)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_numeros_asignados_tipo ON telecom_numeros_asignados(tipo)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_eco_creditos_user ON eco_creditos(user_id)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_page_visits_created ON page_visits(created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_page_visits_module_created ON page_visits(module, created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_page_visits_device_created ON page_visits(device_type, created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_page_visits_page_created ON page_visits(page, created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_verification_codes_destino ON verification_codes(destino, created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_users_tipo ON users(tipo)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_users_cedula ON users(cedula)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_tasas_bcv_fecha ON tasas_bcv(fecha DESC)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_activity_log_metadata ON activity_log USING GIN (metadata jsonb_path_ops)`);
  await safeQuery(`ALTER TABLE auditoria_detallada ADD COLUMN IF NOT EXISTS metadata JSONB`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_auditoria_metadata ON auditoria_detallada USING GIN (metadata jsonb_path_ops)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_notificaciones_metadata ON notificaciones USING GIN (metadata jsonb_path_ops)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_clientes_user_activo ON clientes(user_id, activo)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_clientes_rif ON clientes(rif)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_clientes_email ON clientes(email)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_movimientos_fecha2 ON movimientos_bancarios(fecha_operacion DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_movimientos_cuenta ON movimientos_bancarios(cuenta_id, fecha_operacion DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_transacciones_user ON transacciones_pagos(user_id, created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_retenciones_user ON retenciones(user_id, tipo)`);
  await safeQuery(`CREATE TABLE IF NOT EXISTS contratos_legales (
    id          SERIAL PRIMARY KEY,
    user_id     INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    titulo      TEXT NOT NULL,
    tipo        TEXT DEFAULT 'general',
    descripcion TEXT,
    contraparte TEXT,
    fecha_inicio DATE,
    fecha_fin    DATE,
    monto        NUMERIC(18,2),
    moneda       TEXT DEFAULT 'VES',
    estado       TEXT DEFAULT 'borrador' CHECK (estado IN ('borrador','activo','vencido','cancelado','renovado')),
    archivo_url  TEXT,
    metadata     JSONB DEFAULT '{}',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_contratos_user ON contratos_legales(user_id, estado)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_automation_logs_rule ON automation_logs(rule_id, started_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_automation_logs_status ON automation_logs(status, started_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_email_log_estado ON email_log(estado, created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_system_health_type ON system_health_log(metric_type, recorded_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_blockchain_status ON blockchain_proofs(status)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_cxc_vencimiento ON cuentas_por_cobrar(fecha_vencimiento) WHERE estado = 'pendiente'`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_cxp_vencimiento ON cuentas_por_pagar(fecha_vencimiento) WHERE estado = 'pendiente'`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_vacantes_estado ON vacantes(estado)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_nomina_items_nomina ON nomina_items(nomina_id)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_eco_creditos_nivel ON eco_creditos(nivel)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_contact_messages_leido ON contact_messages(leido, created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_dashboard_cache_key ON dashboard_cache(cache_key, generated_at DESC)`);

  await seedEmailAutomaticos();

  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS emitida_at TIMESTAMPTZ`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS hash_fiscal TEXT`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS inmutable BOOLEAN NOT NULL DEFAULT false`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS anulada_at TIMESTAMPTZ`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS anulada_por_nc TEXT`);
  await query(`ALTER TABLE facturas ADD COLUMN IF NOT EXISTS cobrada_at TIMESTAMPTZ`);

  await safeQuery(`
    CREATE OR REPLACE FUNCTION proteger_factura_emitida()
    RETURNS TRIGGER AS $$
    BEGIN
      IF OLD.inmutable = true THEN

        IF NEW.inmutable IS DISTINCT FROM OLD.inmutable
           OR NEW.hash_fiscal IS DISTINCT FROM OLD.hash_fiscal
           OR NEW.emitida_at IS DISTINCT FROM OLD.emitida_at
        THEN
          RAISE EXCEPTION 'DOCUMENTO FISCAL INMUTABLE: Los campos de sellado fiscal (inmutable, hash_fiscal, emitida_at) no pueden ser alterados.';
        END IF;

        IF NEW.numero_factura IS DISTINCT FROM OLD.numero_factura
           OR NEW.numero_control IS DISTINCT FROM OLD.numero_control
           OR NEW.total IS DISTINCT FROM OLD.total
           OR NEW.subtotal IS DISTINCT FROM OLD.subtotal
           OR NEW.monto_iva IS DISTINCT FROM OLD.monto_iva
           OR NEW.base_imponible IS DISTINCT FROM OLD.base_imponible
           OR NEW.base_exenta IS DISTINCT FROM OLD.base_exenta
           OR NEW.base_no_sujeta IS DISTINCT FROM OLD.base_no_sujeta
           OR NEW.porcentaje_iva IS DISTINCT FROM OLD.porcentaje_iva
           OR NEW.monto_igtf IS DISTINCT FROM OLD.monto_igtf
           OR NEW.porcentaje_igtf IS DISTINCT FROM OLD.porcentaje_igtf
           OR NEW.retencion_iva IS DISTINCT FROM OLD.retencion_iva
           OR NEW.retencion_islr IS DISTINCT FROM OLD.retencion_islr
           OR NEW.total_a_pagar IS DISTINCT FROM OLD.total_a_pagar
           OR NEW.rif_emisor IS DISTINCT FROM OLD.rif_emisor
           OR NEW.razon_social_emisor IS DISTINCT FROM OLD.razon_social_emisor
           OR NEW.domicilio_fiscal_emisor IS DISTINCT FROM OLD.domicilio_fiscal_emisor
           OR NEW.telefono_emisor IS DISTINCT FROM OLD.telefono_emisor
           OR NEW.fecha_emision IS DISTINCT FROM OLD.fecha_emision
           OR NEW.cliente_id IS DISTINCT FROM OLD.cliente_id
           OR NEW.tipo_documento IS DISTINCT FROM OLD.tipo_documento
           OR NEW.condicion_pago IS DISTINCT FROM OLD.condicion_pago
           OR NEW.moneda IS DISTINCT FROM OLD.moneda
           OR NEW.serie IS DISTINCT FROM OLD.serie
           OR NEW.tasa_bcv IS DISTINCT FROM OLD.tasa_bcv
           OR NEW.total_usd IS DISTINCT FROM OLD.total_usd
           OR NEW.monto_moneda_ext IS DISTINCT FROM OLD.monto_moneda_ext
           OR NEW.moneda_extranjera IS DISTINCT FROM OLD.moneda_extranjera
           OR NEW.descripcion IS DISTINCT FROM OLD.descripcion
           OR NEW.factura_referencia_id IS DISTINCT FROM OLD.factura_referencia_id
           OR NEW.factura_referencia_num IS DISTINCT FROM OLD.factura_referencia_num
           OR NEW.motivo_ajuste IS DISTINCT FROM OLD.motivo_ajuste
           OR NEW.sin_derecho_credito_fiscal IS DISTINCT FROM OLD.sin_derecho_credito_fiscal
           OR NEW.user_id IS DISTINCT FROM OLD.user_id
        THEN
          RAISE EXCEPTION 'DOCUMENTO FISCAL INMUTABLE: La factura % (Control: %) ya fue emitida el % y no puede ser modificada según Providencia SNAT/2011/00071. Para correcciones use Nota de Crédito o Nota de Débito.',
            OLD.numero_factura, OLD.numero_control, OLD.emitida_at;
        END IF;

        IF NEW.estado IS DISTINCT FROM OLD.estado THEN
          IF OLD.estado = 'emitida' AND NEW.estado IN ('cobrada', 'pagada') THEN
            NEW.cobrada_at = NOW();
            RETURN NEW;
          END IF;

          IF OLD.estado IN ('emitida', 'cobrada', 'pagada') AND NEW.estado = 'anulada' AND NEW.anulada_por_nc IS NOT NULL THEN
            NEW.anulada_at = NOW();
            RETURN NEW;
          END IF;

          RAISE EXCEPTION 'DOCUMENTO FISCAL INMUTABLE: Transición de estado no permitida (% -> %). Solo se permite: emitida->cobrada/pagada, o anulación mediante Nota de Crédito.',
            OLD.estado, NEW.estado;
        END IF;

      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql
  `);

  await safeQuery(`DROP TRIGGER IF EXISTS trg_proteger_factura ON facturas`);
  await safeQuery(`
    CREATE TRIGGER trg_proteger_factura
    BEFORE UPDATE ON facturas
    FOR EACH ROW
    EXECUTE FUNCTION proteger_factura_emitida()
  `);

  await safeQuery(`
    CREATE OR REPLACE FUNCTION bloquear_delete_factura()
    RETURNS TRIGGER AS $$
    BEGIN
      IF OLD.inmutable = true THEN
        RAISE EXCEPTION 'DOCUMENTO FISCAL INMUTABLE: La factura % no puede ser eliminada. Los documentos fiscales emitidos son permanentes según la Providencia SNAT/2011/00071.',
          OLD.numero_factura;
      END IF;
      RETURN OLD;
    END;
    $$ LANGUAGE plpgsql
  `);

  await safeQuery(`DROP TRIGGER IF EXISTS trg_bloquear_delete_factura ON facturas`);
  await safeQuery(`
    CREATE TRIGGER trg_bloquear_delete_factura
    BEFORE DELETE ON facturas
    FOR EACH ROW
    EXECUTE FUNCTION bloquear_delete_factura()
  `);

  await safeQuery(`
    CREATE OR REPLACE FUNCTION bloquear_modificar_factura_items()
    RETURNS TRIGGER AS $$
    DECLARE
      is_inmutable BOOLEAN;
      target_factura_id INT;
    BEGIN
      IF TG_OP = 'DELETE' THEN
        target_factura_id := OLD.factura_id;
      ELSIF TG_OP = 'INSERT' THEN
        target_factura_id := NEW.factura_id;
      ELSE
        target_factura_id := OLD.factura_id;
      END IF;

      SELECT inmutable INTO is_inmutable FROM facturas WHERE id = target_factura_id;
      IF is_inmutable = true THEN
        RAISE EXCEPTION 'DOCUMENTO FISCAL INMUTABLE: No se pueden agregar, modificar ni eliminar items de una factura emitida.';
      END IF;

      IF TG_OP = 'DELETE' THEN
        RETURN OLD;
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql
  `);

  await safeQuery(`DROP TRIGGER IF EXISTS trg_bloquear_delete_items ON factura_items`);
  await safeQuery(`DROP TRIGGER IF EXISTS trg_bloquear_modificar_items ON factura_items`);
  await safeQuery(`
    CREATE TRIGGER trg_bloquear_modificar_items
    BEFORE INSERT OR UPDATE OR DELETE ON factura_items
    FOR EACH ROW
    EXECUTE FUNCTION bloquear_modificar_factura_items()
  `);
}

async function seedEmailAutomaticos(): Promise<void> {
  const templates: { tipo: string; nombre: string; asunto: string; destinatario_tipo: string; intervalo?: number }[] = [
    { tipo: 'bienvenida', nombre: 'Email de Bienvenida', asunto: '¡Bienvenido a System Kyron! Tu cuenta está lista', destinatario_tipo: 'usuario' },
    { tipo: 'verificacion', nombre: 'Verificación de Identidad', asunto: 'Código de verificación — System Kyron', destinatario_tipo: 'usuario' },
    { tipo: 'factura_emitida', nombre: 'Factura Emitida', asunto: 'Nueva factura emitida #{numero} — System Kyron', destinatario_tipo: 'cliente' },
    { tipo: 'factura_vencida', nombre: 'Recordatorio Factura Vencida', asunto: 'Factura #{numero} vencida — Acción requerida', destinatario_tipo: 'cliente', intervalo: 48 },
    { tipo: 'nomina_lista', nombre: 'Nómina Procesada', asunto: 'Nómina del periodo {periodo} procesada exitosamente', destinatario_tipo: 'admin' },
    { tipo: 'contrato_firmado', nombre: 'Contrato Firmado', asunto: 'Contrato #{ref} firmado y sellado — System Kyron', destinatario_tipo: 'usuario' },
    { tipo: 'alerta_fiscal', nombre: 'Alerta Fiscal Automática', asunto: 'Alerta fiscal: {tipo_alerta} — Vence {fecha}', destinatario_tipo: 'admin', intervalo: 4 },
    { tipo: 'resumen_semanal', nombre: 'Resumen Semanal Ejecutivo', asunto: 'Tu resumen semanal — System Kyron', destinatario_tipo: 'admin', intervalo: 168 },
    { tipo: 'recordatorio_pago', nombre: 'Recordatorio de Pago', asunto: 'Recordatorio: Pago pendiente de tu plan {plan}', destinatario_tipo: 'usuario', intervalo: 72 },
    { tipo: 'cambio_plan', nombre: 'Confirmación Cambio de Plan', asunto: 'Plan actualizado a {plan} — System Kyron', destinatario_tipo: 'usuario' },
  ];

  for (const t of templates) {
    await safeQuery(
      `INSERT INTO email_automaticos (tipo, nombre, asunto_template, destinatario_tipo, intervalo_horas)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (tipo) DO NOTHING`,
      [t.tipo, t.nombre, t.asunto, t.destinatario_tipo, t.intervalo ?? null]
    );
  }
}
