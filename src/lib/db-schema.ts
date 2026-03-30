/**
 * Sistema Kyron v2.8.5 — Esquema Central de Base de Datos
 * Inicialización completa de todas las tablas del sistema.
 * Llamado automáticamente al iniciar el servidor.
 */

import { query } from '@/lib/db';

async function safeQuery(sql: string): Promise<void> {
  try { await query(sql); } catch { /* column/table may not exist yet */ }
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
    await createPerformanceOptimizations();
    console.log('[db-schema] Base de datos inicializada correctamente — v2.8.5');
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
      tipo              TEXT NOT NULL DEFAULT 'venta'
                        CHECK (tipo IN ('venta','compra','nota_credito','nota_debito')),
      fecha_emision     DATE NOT NULL,
      fecha_vencimiento DATE,
      moneda            TEXT NOT NULL DEFAULT 'VES',
      subtotal          NUMERIC(18,2) NOT NULL DEFAULT 0,
      porcentaje_iva    NUMERIC(5,2)  NOT NULL DEFAULT 16.00,
      monto_iva         NUMERIC(18,2) NOT NULL DEFAULT 0,
      porcentaje_igtf   NUMERIC(5,2)  NOT NULL DEFAULT 3.00,
      monto_igtf        NUMERIC(18,2) NOT NULL DEFAULT 0,
      total             NUMERIC(18,2) NOT NULL DEFAULT 0,
      tasa_bcv          NUMERIC(12,4),
      total_usd         NUMERIC(18,2),
      estado            TEXT NOT NULL DEFAULT 'emitida'
                        CHECK (estado IN ('borrador','emitida','pendiente','cobrada','pagada','vencida','anulada')),
      descripcion       TEXT,
      notas             TEXT,
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
      cantidad         NUMERIC(12,4) NOT NULL DEFAULT 1,
      precio_unitario  NUMERIC(18,2) NOT NULL DEFAULT 0,
      descuento_pct    NUMERIC(5,2)  NOT NULL DEFAULT 0,
      subtotal         NUMERIC(18,2) NOT NULL DEFAULT 0,
      aplica_iva       BOOLEAN NOT NULL DEFAULT true
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
      tipo       TEXT NOT NULL CHECK (tipo IN ('email', 'sms')),
      codigo     TEXT NOT NULL,
      usado      BOOLEAN NOT NULL DEFAULT false,
      intentos   INT NOT NULL DEFAULT 0,
      proposito  TEXT NOT NULL DEFAULT 'verification',
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`ALTER TABLE verification_codes ADD COLUMN IF NOT EXISTS proposito TEXT NOT NULL DEFAULT 'verification'`);
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
                       CHECK (metodo_pago IN ('efectivo','transferencia','pago_movil','zelle','punto_bancario','dolares','mixto')),
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
                        CHECK (tipo IN ('municipal','ambiental','sanitario','bomberos','trabajo','intt','seniat','sunagro','sasa','minpet','conatel','otro')),
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
                 CHECK (tipo IN ('alerta','info','exito','advertencia','fiscal','vencimiento')),
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

  const safeIndex = async (sql: string) => {
    try { await query(sql); } catch { /* table/column may not exist yet */ }
  };

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_facturas_user_estado ON facturas(user_id, estado)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_facturas_created ON facturas(created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_facturas_fecha ON facturas(fecha_emision DESC)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_empleados_activo ON empleados(user_id, activo)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_empleados_cedula ON empleados(cedula)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_nominas_periodo ON nominas(user_id, fecha_inicio, fecha_fin)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_nominas_estado ON nominas(estado)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_lineas_user ON lineas_telecom(user_id, activa)`);
  await safeIndex(`CREATE UNIQUE INDEX IF NOT EXISTS idx_lineas_numero_unique ON lineas_telecom(numero)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_numeros_asignados_tipo ON telecom_numeros_asignados(tipo)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_eco_creditos_user ON eco_creditos(user_id)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_page_visits_created ON page_visits(created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_verification_codes_destino ON verification_codes(destino, created_at DESC)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_users_tipo ON users(tipo)`);
  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_users_cedula ON users(cedula)`);

  await safeIndex(`CREATE INDEX IF NOT EXISTS idx_tasas_bcv_fecha ON tasas_bcv(fecha DESC)`);
}
