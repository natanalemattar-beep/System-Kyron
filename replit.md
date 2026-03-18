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

## Base de Datos — Schema Completo (18 tablas)
PostgreSQL integrada de Replit. Schema general creado y gestionado centralmente.

### Auth & Core
- `users` — Usuarios (naturales y jurídicos) con todos los campos VEN + representante legal
- `user_modules` — Módulos habilitados por usuario
- `activity_log` — Auditoría completa del sistema (auth, contabilidad, rrhh, banco, ia, telecom, eco, legal, nomina)

### Contabilidad & Facturación
- `facturas` — Facturas de venta/compra con IVA 16%, IGTF 3%, tasa BCV, total USD
- `factura_items` — Líneas de detalle de facturas
- `clientes` — Clientes (personas naturales y jurídicas)
- `proveedores` — Proveedores
- `transacciones_pagos` — Pagos: pago móvil, Zelle, Binance, POS, transferencia

### Banca & Flujo de Caja
- `cuentas_bancarias` — Cuentas bancarias con saldo actual y disponible
- `movimientos_bancarios` — Libro mayor: créditos y débitos por cuenta

### RRHH
- `empleados` — Empleados con datos laborales venezolanos
- `nomina` — Nómina por período con SSO, FAOV, LPH y neto a pagar

### Módulos Especializados
- `documentos_legales` — Documentos legales (permisos, contratos, poderes, etc.)
- `sector_solicitudes` — Solicitudes sector público/privado
- `alianzas_petroleras` — Solicitudes de alianzas sector petrolero y energético
- `telecom_lineas` — Líneas telefónicas corporativas (física, eSIM, 5G)
- `eco_creditos` — Eco-créditos de sostenibilidad (clasificación IA de residuos)
- `pitch_analytics` — Analítica de presentaciones de pitch

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
