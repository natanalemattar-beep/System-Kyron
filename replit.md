# System Kyron v2.6.5 - Ecosistema Corporativo

## Descripción
Ecosistema tecnológico integral para gestión corporativa: contabilidad, RRHH, legal, ventas, telecomunicaciones e IT.

## Stack Tecnológico
- **Framework**: Next.js 15 (App Router) con TypeScript
- **Internacionalización**: next-intl con prefijo obligatorio (`/es/`, `/en/`)
- **Estilos**: Tailwind CSS + shadcn/ui
- **Base de Datos**: PostgreSQL (Replit integrada)
- **Autenticación**: JWT con HTTP-only cookies (bcryptjs + jose)
- **Animaciones**: Framer Motion
- **Email**: Resend API

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

## Base de Datos
Tablas PostgreSQL en Replit:
- `users` — Usuarios (naturales y jurídicos)
- `user_modules` — Módulos habilitados por usuario
- `sessions` — Sesiones JWT (tabla de respaldo)
- `demo_requests` — Solicitudes de demo desde la landing

## Autenticación
- `src/lib/db.ts` — Pool de conexión PostgreSQL
- `src/lib/auth/index.ts` — JWT utilities (createToken, verifyToken, getSession)
- `src/lib/auth/context.tsx` — AuthProvider React context
- `src/app/api/auth/register/route.ts` — POST registro
- `src/app/api/auth/login/route.ts` — POST login
- `src/app/api/auth/logout/route.ts` — POST logout
- `src/app/api/auth/me/route.ts` — GET sesión actual

## Módulos del Sistema (desde loginOptions)
1. Cuenta Personal
2. Mi Línea Personal
3. Mi Línea Empresa
4. Contabilidad
5. Asesoría Legal
6. Facturación
7. Recursos Humanos
8. Socios y Directivos
9. Sostenibilidad
10. Administración de Red
11. Ingeniería e IT

## Variables de Entorno Necesarias
- `DATABASE_URL` — PostgreSQL (auto-configurada por Replit)
- `JWT_SECRET` — Secreto para JWT (usar uno seguro en producción)
- `RESEND_API_KEY` — Para envío de emails (opcional)

## Configuración de Desarrollo
- Puerto: 5000 (requerido por Replit)
- Host: 0.0.0.0
- Comando: `npm run dev`
