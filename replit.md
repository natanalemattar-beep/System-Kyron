# System Kyron v2.8.2 - Ecosistema Corporativo

## Descripción
Ecosistema tecnológico integral para gestión corporativa: contabilidad, RRHH, legal, ventas, telecomunicaciones e IT. Diseñado para el mercado venezolano con cumplimiento VEN-NIF/SENIAT, IVA 16%, IGTF 3%, ISLR 34%.

## Stack Tecnológico
- **Framework**: Next.js 15 (App Router) con TypeScript
- **Internacionalización**: next-intl con prefijo obligatorio (`/es/`, `/en/`)
- **Estilos**: Tailwind CSS + shadcn/ui
- **Base de Datos**: PostgreSQL (Replit integrada) — REAL, sin datos demo
- **Autenticación**: JWT con HTTP-only cookies (bcryptjs + jose)
- **Animaciones**: Framer Motion
- **ORM**: pg (node-postgres, sin ORM, SQL directo)

## Arquitectura de Rutas
Todas las rutas de la app están bajo `src/app/[locale]/` para soportar i18n.
- Prefijo obligatorio: `localePrefix: 'always'` → todas las rutas comienzan con `/es/` o `/en/`
- Las páginas de registro (`(auth)/register/`) están en la raíz porque son importadas por `[locale]/(auth)/register/`

### Estructura de Grupos
- `[locale]/(auth)/` — Login, registro y recuperación de cuenta
- `[locale]/(admin)/` — Módulos de administración y contabilidad
- `[locale]/(hr)/` — Recursos Humanos
- `[locale]/(legal)/` — Asesoría Legal
- `[locale]/(main)/` — Módulos principales (IT, Socios, etc.)
- `[locale]/(natural)/` — Portal ciudadano personal
- `[locale]/(socios)/` — Socios y Directivos
- `[locale]/(telecom)/` — Telecomunicaciones
- `[locale]/(ventas)/` — Facturación y Ventas

## Base de Datos — Schema Completo (60+ tablas)
PostgreSQL integrada de Replit. Esquema centralizado en `src/lib/db-schema.ts`.
Inicializado automáticamente en `src/instrumentation.ts` al arrancar el servidor.
Conexión: DATABASE_URL (Replit built-in PostgreSQL, auto-provisionada).

### 1. Auth & Core
- `users` — Usuarios (naturales y jurídicos) con todos los campos VEN + representante legal
- `user_modules` — Módulos habilitados por usuario
- `user_sessions` — Sesiones activas multi-dispositivo
- `activity_log` — Auditoría completa (auth, contabilidad, rrhh, banco, ia, telecom, eco, legal, nomina)

### 2. Contabilidad & Finanzas (VEN-NIF / SENIAT)
- `facturas` — Facturas venta/compra con IVA 16%, IGTF 3%, tasa BCV, total USD
- `factura_items` — Líneas de detalle
- `clientes` — Clientes (naturales y jurídicos)
- `proveedores` — Directorio de proveedores con calificación
- `transacciones_pagos` — Pagos: pago móvil, Zelle, Binance, POS, transferencia
- `cuentas_bancarias` — Cuentas bancarias con saldo y disponible
- `movimientos_bancarios` — Libro diario: créditos y débitos
- `tasas_bcv` — Histórico de tipos de cambio BCV (USD, EUR, COP, USDT)
- `declaraciones_iva` — Declaraciones de IVA ante SENIAT
- `declaraciones_islr` — Declaraciones de ISLR
- `retenciones` — Retenciones IVA e ISLR a proveedores
- `arqueos_caja` — Arqueos de caja por turno
- `plan_cuentas` — Plan de cuentas contable VEN-NIF
- `inventario` — Inventario de productos y servicios

### 3. RRHH & Nómina
- `empleados` — Empleados con datos laborales venezolanos (LOTTT)
- `nominas` — Nóminas por período (quincenal, mensual, utilidades, vacaciones)
- `nomina_items` — Detalle por empleado (SSO, FAOV, LPH, RPE, ISLR)
- `permisos_laborales` — Permisos y vacaciones
- `certificados_laborales` — Certificados de trabajo, ingresos, referencias
- `horas_extras` — Registro de horas extras y nocturnas (LOTTT Art. 178)
- `vacaciones_control` — Control de vacaciones con cálculo de bono vacacional
- `utilidades_libro` — Utilidades Art. 131 LOTTT
- `aportes_parafiscales` — IVSS, FAOV, INCES, LOPCYMAT
- `solvencias_laborales` — Solvencias laborales con vencimiento
- `ingreso_egreso_empleados` — Libro de ingreso/egreso
- `islr_retenciones` — Retenciones ISLR sobre sueldos
- `maternidad_lactancia` — Pre/postnatal, lactancia (LOTTT Art. 335-345)
- `incapacidades` — Incapacidades temporales/permanentes
- `reposos_medicos` — Reposos médicos con seguimiento
- `cancelacion_rif_seniat` — Cancelación RIF ante SENIAT

### 4. Legal / Escritorio Jurídico
- `documentos_juridicos` — Contratos, escrituras, demandas, poderes, actas
- `actas_asamblea` — Actas de asamblea ordinaria y extraordinaria
- `socios` — Registro de socios y accionistas con % participación
- `poderes_notariales` — Poderes notariales con facultades

### 5. Telecomunicaciones
- `lineas_telecom` — Líneas corporativas (Movistar, Digitel, Movilnet, CANTV)
- `facturas_telecom` — Facturación mensual de servicios telecom

### 6. Sostenibilidad / Ameru IA
- `eco_creditos` — Balance de eco-créditos por usuario (bronce→platino)
- `eco_transacciones` — Reciclaje verificado con cálculo automático de ECR

### 7. Documentos Personales (Bóveda Digital)
- `documentos_personales` — Documentos personales cifrados (cédula, RIF, título, etc.)
- `solicitudes_documentos_civiles` — Solicitudes partidas, pasaportes, certificados
- `documentos_generados_ia` — Historial de documentos generados por IA

### 8. Sector Privado
- `sector_solicitudes` — Solicitudes sectoriales empresariales
- `alianzas_petroleras` — Solicitudes de alianzas sector petrolero

### 9. Analítica & Comunidad
- `pitch_sessions` — Sesiones del Pitch IA
- `document_records` — Documentos generados (PPTX, PDF)
- `page_events` — Eventos de páginas (analítica frontend)
- `comentarios_publicos` — Comentarios verificados de usuarios reales (calificación 1-5, aprobación)

### 10. Configuración
- `notificaciones` — Notificaciones del sistema (fiscal, vencimientos, pagos)
- `configuracion_usuario` — Preferencias y configuración por usuario

## Inicialización DB
- **Auto-init**: `src/instrumentation.ts` → ejecuta al arrancar Next.js (NODE_ENV: nodejs)
- **Schema central**: `src/lib/db-schema.ts` → `initializeDatabase()` con todas las tablas
- **API manual**: `GET/POST /api/db-init` → verificación y re-inicialización en caliente

## API Routes
### Auth
- `POST /api/auth/register` — Registro natural/jurídico con bcrypt
- `POST /api/auth/login` — Login con JWT cookie httpOnly
- `POST /api/auth/logout` — Destruye cookie de sesión
- `GET  /api/auth/me` — Sesión actual + módulos habilitados

### Datos Reales
- `GET  /api/dashboard` — KPIs en tiempo real del usuario autenticado
- `GET/POST /api/cuentas-bancarias` — CRUD cuentas bancarias
- `GET/POST /api/movimientos` — CRUD movimientos bancarios (actualiza saldos)
- `GET/POST /api/facturas` — CRUD facturas (calcula IVA+IGTF automáticamente)
- `GET/POST /api/clientes` — CRUD clientes
- `GET/POST /api/empleados` — CRUD empleados
- `GET/POST /api/transacciones` — CRUD transacciones de pago
- `GET/POST/PATCH /api/nomina` — Gestión de nóminas + ítems por empleado
- `GET/POST /api/declaraciones` — Declaraciones IVA e ISLR (?impuesto=iva|islr)
- `GET/POST /api/retenciones` — Retenciones IVA e ISLR
- `GET/POST /api/tasas-bcv` — Histórico de tasas BCV (con upsert por fecha)
- `GET/POST/DELETE /api/documentos-personales` — Bóveda digital de documentos
- `GET/POST/PATCH /api/solicitudes-civiles` — Solicitudes de documentos civiles
- `GET/POST /api/eco-creditos` — Balance y transacciones de reciclaje Ameru IA
- `GET/POST /api/telecom` — Líneas telecom + facturas de servicios
- `GET/POST /api/rrhh/libros` — 13 libros laborales digitalizados (LOTTT) con alertas inteligentes
- `GET/POST /api/comentarios` — Comentarios públicos verificados de usuarios reales
- `GET /api/auth/check-document` — Verificación de documento existente (cédula/RIF)
- `GET/POST/PATCH /api/notificaciones` — Notificaciones del sistema
- `GET/POST/PATCH /api/proveedores` — Directorio de proveedores
- `GET/POST/PATCH /api/documentos-juridicos` — Documentos del escritorio jurídico
- `GET/PATCH /api/configuracion` — Configuración y preferencias del usuario
- `GET/POST /api/sector-solicitudes` — Solicitudes sectoriales
- `GET/POST /api/alianzas-petroleras` — Alianzas sector petrolero

## Autenticación
- `src/lib/db.ts` — Pool de conexión PostgreSQL
- `src/lib/auth/index.ts` — JWT utilities (createToken, verifyToken, getSession)
- `src/lib/auth/context.tsx` — AuthProvider React context
- Cookie: `sk_session` (httpOnly, secure en producción, 7 días)

## Páginas Especiales
- `/es/sector-privado-system-kyron` — Modelo Zedu: proyecto AutoMind AI (Miguel Uzcategui, Miguel Angel Goites, Joaquin de Barros / Colegio Santa Rosa de Lima). Documento completo con 8 secciones: equipo, población, análisis del problema, solución, presupuesto, aliados, plan de acción e impacto. Con descarga en Word (.doc) e impresión.
- `/es/manual-usuario` — Manual de usuario (21 capítulos, incluye Capítulo 21 Modelo ZEDU). Capítulo 21 contiene enlace directo al documento Modelo Zedu.

## Variables de Entorno
- `DATABASE_URL` — PostgreSQL (auto-configurada por Replit)
- `JWT_SECRET` — Secreto JWT (configurado, 128 chars hex)
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` — Credenciales PG
- `RESEND_API_KEY` — (Opcional) Para envío real de emails de verificación. Sin ella, códigos se guardan en DB y el flujo funciona sin envío de correo real
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` — (Opcional) Para SMS

## Integraciones de Email (Cascada: Outlook → Gmail → Resend)
- **Microsoft Outlook** — Conector Replit (conn_outlook), SDK @microsoft/microsoft-graph-client. Permisos: Mail.Send, Mail.ReadWrite, Calendars.ReadWrite
- **Gmail** — Conector Replit (ccfg_google-mail), API REST directa. Pendiente autorización OAuth
- **Resend** — Fallback transaccional con RESEND_API_KEY
- Servicio unificado: `src/lib/email-service.ts` — cascada automática con logging a tabla `email_log`
- Cliente Outlook: `src/lib/outlook-client.ts` — patrón getUncachableOutlookClient()
- API de envío: `POST /api/email/send` — envío por módulo (RRHH, Legal, Contabilidad, Telecom, Eco)
- Códigos de verificación: `POST /api/auth/send-code` — usa el servicio unificado

## Integraciones IA
- **Gemini 2.0 Flash** — Chat fiscal (`/api/ai/fiscal-chat`), Genkit (`src/ai/genkit.ts`), chat general (`src/ai/flows/chat.ts`). Keys: AI_INTEGRATIONS_GEMINI_API_KEY || GEMINI_API_KEY || GOOGLE_API_KEY
- **OpenAI GPT-4o** — Análisis dashboard (`/api/ai/analyze-dashboard`). Key: AI_INTEGRATIONS_OPENAI_API_KEY

## Auto-fetch Tasas BCV
- `GET /api/tasas-bcv/auto-fetch` — Obtiene tasa USD/VES del día de fuentes públicas (PyDolar BCV, ExchangeRate API). Inserta/actualiza en tabla tasas_bcv automáticamente

## Optimización DB (20+ índices compuestos)
- Tabla `email_log` para auditoría de correos enviados
- Índices compuestos en: facturas, empleados, nóminas, asientos contables, telecom, eco-créditos, legal, visitas, users

## Schema-Route Alignment (Bug Fixes Applied)
- `inventario` API: uses `codigo` (not `sku`), `precio_costo` (not `costo_unitario`), `stock_actual` (not `cantidad`)
- `clientes` join: uses `nombre_contacto` (not `nombre`) — `razon_social` is primary
- `declaraciones_iva` API: uses `iva_debito`/`iva_credito`/`iva_neto` (not `credito_fiscal`/`debito_fiscal`)
- `declaraciones_islr` API: uses `impuesto_causado` (not `impuesto_determinado`), `anticipo_pagado`, `impuesto_a_pagar`
- `retenciones` API: uses `fecha_retencion` (not `fecha`), `proveedor_rif`/`proveedor_nombre` (not `rif_proveedor`/`proveedor`), `numero_comprobante` (not `comprobante`), tipo values lowercase (`'iva'`/`'islr'`)
- All financial routes have try/catch with 500 error responses and NaN-safe parseFloat/parseInt

## Seguridad Implementada
- **Headers de seguridad** en middleware y next.config: X-Content-Type-Options, X-Frame-Options (SAMEORIGIN), X-XSS-Protection, Referrer-Policy, Permissions-Policy, HSTS, X-DNS-Prefetch-Control
- **Rate limiting** en memoria para todos los endpoints críticos:
  - Login: 10 intentos/IP/15min + 5 intentos/email/15min
  - Registro: 5 intentos/IP/15min
  - Send-code: 5 intentos/IP/min + 3 códigos/min en DB
  - Reset-password: 5 intentos/IP/15min
  - Check-document: 15 intentos/IP/min
  - AI endpoints: 20-30 req/usuario/min
- **Validación de entrada**: email format, contraseñas fuertes (8+ chars, mayúscula, minúscula, número), sanitización de strings, límites de tamaño de payload (50KB en AI)
- **Anti-enumeración**: timing uniforme en login/check-document/reset-password, no revela si cuenta existe en reset
- **JWT**: fallback secret solo en dev, falla hard en producción sin JWT_SECRET
- **Login bruteforce**: rate limit + logging de intentos fallidos en activity_log
- **Autenticación obligatoria**: AI routes, analytics, email/send, BCV auto-fetch (todos protegidos con getSession)
- **SQL injection**: 100% queries parametrizadas, check-document usa whitelist de columnas
- **XSS**: React escaping + sanitización de inputs + security headers
- **Archivos**: `src/lib/rate-limiter.ts`, `src/lib/security-headers.ts`, `src/lib/input-sanitizer.ts`

## Verificación de Código (Auth)
- API `/api/auth/send-code` acepta ambos formatos: `{destino, tipo}` y `{method, email, phone}`
- API `/api/auth/verify-code` acepta ambos formatos: `{destino, codigo}` y `{method, email, phone, code}`
- OTP generado con `crypto.randomInt` (CSPRNG)
- Sin RESEND_API_KEY: código se guarda en DB, retorna success, no envía email (modo desarrollo)
- Con RESEND_API_KEY: envía email con template HTML branded
- 6 formularios de registro usan este flujo: natural, juridico, contabilidad, rrhh, telecom, sostenibilidad

## Botones y Acciones
- Todos los botones de la aplicación tienen handlers funcionales (onClick)
- **Formulario de contacto/demo** — `sendDemoRequestAction` guarda en tablas `demo_requests` + `contact_messages` (DB directo, sin Resend)
- **Bóveda Digital** (`/documentos`) — CRUD completo con API `/api/documentos-personales`: upload dialog, búsqueda, vista previa, descarga, eliminación
- **Archivo de Contratos** (`/contratos`) — CRUD completo con API `/api/documentos-juridicos`: crear contrato, stats en vivo, búsqueda, PDF, eliminación
- **Generador de Documentos** (`/generador-documentos`) — Download exporta archivo .txt, "Guardar en Bóveda" guarda en documentos jurídicos vía API
- **Exportar/Descargar** — Botones de exportación usan `window.print()` o toast de confirmación
- **Trámites/Asesorías** — Botones muestran toast de confirmación (solicitud registrada)
- Cero llamadas a `alert()` en toda la aplicación — todas reemplazadas con toast notifications

## Métodos de Pago Integrados
- **PayPal** — Cobros internacionales, USD/EUR/GBP
- **Zinli** — Billetera digital VE, USD sin comisiones internas
- **Zelle** — Transferencias bancarias desde EE.UU., 0% comisión
- **Pago Móvil / C2P** — Todos los bancos VE conectados, verificación en 3s
- **Transferencia Bancaria VE** — BdV, Banesco, Mercantil, Provincial, BNC, BOD, Bancaribe, Exterior, Plaza, Caroní, Bancrecer, BanFANB
- **Binance Pay / Cripto** — USDT, USDC, BTC con conversión automática
- **Tarjeta Débito/Crédito** — Visa, MasterCard, AMEX (POS físico y virtual)
- **Kyron Digital Wallet** — Transferencias internas del ecosistema

## Barra Lateral Móvil
- **Landing**: Sheet desde la izquierda, nav items con smooth scroll, botones de acceso/registro, theme toggle + language switcher
- **App**: Sheet controlada desde la izquierda (85vw, max 340px), perfil de usuario, dashboard link, nav groups contextuales con indicador activo, cierre automático al navegar, acciones rápidas (idioma, tema, notificaciones, ajustes, logout)

## Configuración de Desarrollo
- Puerto: 5000 (requerido por Replit)
- Host: 0.0.0.0
- Comando: `npm run dev`
- `.npmrc`: `legacy-peer-deps=true` (requerido por conflicto Genkit)

## Normas Venezolanas Implementadas
- IVA: 16%, IGTF: 3%, ISLR: 34%
- Tasa BCV: Bs./USD integrada en facturas y pagos
- RIF format: J/G/V/E-XXXXXXXX-X
- Cédula: V/E-XXXXXXX
- Bancos: BdV (0102), Banesco (0134), Mercantil (0105), BBVA (0108), BNC (0191), BOD (0116)
