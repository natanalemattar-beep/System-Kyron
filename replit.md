# System Kyron v2.8.0 - Ecosistema Corporativo

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
- `[locale]/(auth)/` — Login y registro
- `[locale]/(admin)/` — Módulos de administración y contabilidad
- `[locale]/(hr)/` — Recursos Humanos
- `[locale]/(legal)/` — Asesoría Legal
- `[locale]/(main)/` — Módulos principales (IT, Socios, etc.)
- `[locale]/(natural)/` — Portal ciudadano personal
- `[locale]/(socios)/` — Socios y Directivos
- `[locale]/(telecom)/` — Telecomunicaciones
- `[locale]/(ventas)/` — Facturación y Ventas

## Base de Datos — Schema Completo (20 tablas)
PostgreSQL en Replit, schema creado en v2.7.0:

### Auth & Core
- `users` — Usuarios (naturales y jurídicos) con todos los campos VEN
- `user_modules` — Módulos habilitados por usuario
- `session_log` — Log de inicios de sesión
- `demo_requests` — Solicitudes de demo

### Contabilidad
- `cuentas_bancarias` — Cuentas bancarias (BdV, Banesco, Mercantil, BBVA, BNC, BOD)
- `movimientos_bancarios` — Movimientos/transacciones bancarias
- `asientos_contables` — Asientos del libro diario
- `kpi_snapshots` — Snapshots de KPIs para el dashboard

### Facturación
- `facturas` — Facturas de venta/compra con IVA, IGTF, tasa BCV
- `factura_items` — Líneas de detalle de facturas
- `clientes` — Clientes (personas naturales y jurídicas)
- `proveedores` — Proveedores

### Pagos
- `transacciones_pagos` — Pago móvil, Zelle, Binance, POS, etc.
- `terminales_pos` — Terminales punto de venta

### RRHH
- `empleados` — Empleados con datos laborales venezolanos
- `nomina_pagos` — Pagos de nómina con deducciones SSO/INCE/ISLR
- `beneficiarios_salud` — Beneficiarios del seguro de salud

### Otros
- `polizas_seguros` — Pólizas (Mercantil Seguros, Mapfre, Chévere Salud)
- `lineas_telefonicas` — Líneas corporativas
- `whatsapp_mensajes` — Log de mensajes WhatsApp empresarial

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

## Autenticación
- `src/lib/db.ts` — Pool de conexión PostgreSQL
- `src/lib/auth/index.ts` — JWT utilities (createToken, verifyToken, getSession)
- `src/lib/auth/context.tsx` — AuthProvider React context
- Cookie: `sk_session` (httpOnly, secure en producción, 7 días)

## Páginas Especiales
- `/es/sector-privado-system-kyron` — Guión de pitch inversores (10 actos, 27 min, $500K seed)

## Variables de Entorno
- `DATABASE_URL` — PostgreSQL (auto-configurada por Replit)
- `JWT_SECRET` — Secreto JWT (configurado, 128 chars hex)
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` — Credenciales PG

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
