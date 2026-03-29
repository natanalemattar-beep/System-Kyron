# System Kyron v2.8.5 - Ecosistema Corporativo

## Overview
System Kyron is an integrated technological ecosystem for comprehensive corporate management, specifically tailored for the Venezuelan market. It covers accounting, HR, legal, sales, telecommunications, and IT, ensuring compliance with local regulations (VEN-NIF/SENIAT, IVA 16%, IGTF 3%, ISLR 34%). The project aims to provide a unified platform for businesses to manage operations efficiently and compliantly within Venezuela, with a focus on a less text-heavy and more visual user experience. The ambition is to offer a cutting-edge platform that integrates AI for enhanced functionality and compliance.

## User Preferences
- All buttons in the application should have functional handlers (`onClick`).
- All `alert()` calls should be replaced with toast notifications.
- API endpoints for `inventario`, `clientes`, `declaraciones_iva`, `declaraciones_islr`, and `retenciones` must align with the corrected schema fields.
- Financial routes must include `try/catch` blocks for error handling and use `NaN-safe parseFloat/parseInt`.
- Never use hardcoded `text-white` on page headings — use `text-foreground` for theme compatibility. Only use `text-white` inside truly dark/colored containers (buttons, colored cards, active tab triggers).
- All 6 layouts use `PageTransition` from `src/components/ui/motion.tsx` for SSR-safe page entrance animations (mount-gated, respects `prefers-reduced-motion`).
- Use `MotionContainer` for scroll-triggered reveals, `StaggerContainer`/`StaggerItem` for staggered card grids, `CountUp` for animated numbers, `FloatingElement` for ambient motion.
- CSS utility classes: `hover-lift`, `hover-glow`, `hover-scale`, `btn-press`, `icon-hover` for micro-interactions. Stagger delays: `.stagger-1` through `.stagger-8`.
- The system should support both `{destino, tipo}` and `{method, email, phone}` formats for `/api/auth/send-code`.
- The system should support both `{destino, codigo}` and `{method, email, phone, code}` formats for `/api/auth/verify-code`.

## System Architecture
The system is built on Next.js 15 (App Router) with TypeScript, utilizing `next-intl` for internationalization. Styling is managed with Tailwind CSS and shadcn/ui. PostgreSQL serves as the database, accessed directly via `node-postgres`. Authentication uses JWT with HTTP-only cookies.

**UI/UX Decisions:**
- Application routes are organized under `src/app/[locale]/` with grouped routes for authentication, administration, main application, natural persons, HR, legal, sales, partners, and telecommunications.
- A mobile sidebar provides smooth scrolling for landing pages and contextual navigation.
- The landing page is visually driven with simplified sections (Hero, Services, About, FAQ).
- Register pages feature custom prefix selectors, auto-hyphenation for RIF, SENIAT AI lookup for company data, SAIME cédula lookup with auto-fill, and rich result panels.
- Venezuela geography data (`ESTADOS_VE`, `ESTADOS_MUNICIPIOS`) is used for cascading state/municipality dropdowns in registration forms.
- SAIME integration simulates citizen registry lookup for enriched data (full name, DOB, etc.) on cédula input.
- Background animations are optimized using pure CSS.
- Registration pages feature a redesign with custom step navigation, progress bars, rounded input fields, and visual password strength meters.
- Plan selection cards are implemented for Telecom and Contabilidad registration, displaying prices in USD with live Bs. equivalent from the BCV daily rate.

**Technical Implementations:**
- **Database Schema:** A comprehensive PostgreSQL schema with 70+ tables is managed in `src/lib/db-schema.ts`.
- **Database Layer (`src/lib/db.ts`):** Includes helpers for batch operations, upserts, existence checks, pagination, and health checks.
- **Demo Requests:** Landing page CTA form (`src/components/landing/cta-form.tsx`) submits via server action (`src/app/actions/send-demo-request.ts`). Data is saved to `demo_requests` and `contact_messages` tables, and a branded notification email is sent to `infosystemkyron@gmail.com` with full request details using the multi-provider email service (Gmail → Outlook → Resend fallback).
- **Demo Seed Data (`src/lib/db-seed.ts`):** Realistic Venezuelan business data.
- **Health Check (`GET /api/db-health`):** Provides database metrics.
- **Enhanced Audit Trail:** `logAudit()` records detailed field-level changes.
- **API Routes:** Over 60 API routes for authentication, KPIs, and CRUD operations.
- **Authentication:** JWT utilities in `src/lib/auth/index.ts` with `AuthProvider` context. Login requires 2FA via email.
- **2FA Verification:** 6-digit code generation, email sending, and verification.
- **Security:** Implemented security headers, rate limiting, input validation, and parameterized SQL.
- **Payment Methods:** Integration with 12 payment gateways and 29 Venezuelan banks.
- **Special Pages:** Dedicated pages for Zedu Model: AutoMind AI project and an enhanced user manual with interactive TOC sidebar, search, reading progress bar, scroll-to-top, and Word export.
- **Login & Dashboard Redesign (v2.8.5+):** Login pages and dashboards redesigned with a cleaner, modern aesthetic. Login selector (`/login`) uses staggered framer-motion animations, gradient icon badges, sectioned citizen/corporate portals with ring-hover cards. `SpecializedLoginCard` component uses true 50/50 grid split with gradient left panel, `rounded-3xl` card, `bg-muted/20` inputs, themed `btnBg` button colors, and motion entrance animations. Login-personal matches design with biometric option. Dashboard Empresa uses ALL real API data from `/api/dashboard` including variaciones (month-over-month), tasaBCV, cuentasCobrar/cuentasPagar as objects, facturasEsteMes, clientesActivos, inventarioBajoStock, notificacionesNoLeidas, and a real 12-month `chartMensual` from the database. Includes: time-of-day greeting, live health score (0-100%), mini-sparkline charts in KPI cards, clickable stat cards, live clock, hover-lift animations. Dashboard Personal features: greeting with first name, verification level system (Básico→Plata→Oro→Platino) with animated progress bar, clickable KPI cards, notification badges. Design system uses `border-border/30 bg-card/80 ring-0 hover:ring-4 ring-{color}/10` card pattern consistently across all redesigned pages.
- **Slow Connection Banner (`src/components/ui/slow-connection-banner.tsx`):** Detects slow/offline connections via Network Information API, fetch timing, and online/offline events. Shows amber banner for slow ("Conexión lenta detectada") or red banner for offline ("Sin conexión a Internet"). Loaded via `next/dynamic` with `ssr: false` inside `DynamicBackground` component (rendered as a sibling outside the `-z-50` background container via React Fragment). Auto-dismisses when connection restores; rechecks after 5s.
- **Performance Optimizations:** Lazy loading, dynamic imports, loading skeletons, Next.js image optimization, and CSS-based animations replacing Framer Motion where possible.
- **Tutorial/Onboarding:** `WelcomeTutorial` component for first-time users.
- **Loading Screen:** Polished splash screen with Kyron Logo and progress bar.
- **Kyron Design System:** Signature gradient, CSS utilities, and animations defined in `globals.css`.
- **FAQ System:** Landing page shows 6 most important questions with "Ver más preguntas frecuentes" link to `/faq`. Dedicated FAQ page (`src/app/[locale]/faq/page.tsx`) has 26 questions in 9 categories (General, Seguridad, IA, Fiscal, RRHH, Telecom, Sostenibilidad, Pagos, Soporte) with search and category filters. Public route.
- **Route Protection:** Authentication required for sensitive pages, excluded from public sitemap and `robots.txt`.

## External Dependencies
- **Database:** PostgreSQL (Replit integrated)
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Gmail, Outlook, Resend for verification, alerts, and general emails, with a fallback chain.
- **AI Integrations:** Anthropic Claude Sonnet (`claude-3-5-sonnet-20241022`) is the sole AI provider. Used for Kyron Chat, fiscal chat, dashboard analysis, SAIME/SENIAT lookups, transaction categorization, sentiment analysis, sales strategy generation, legal document generation, Gaceta 6952 consultation, and automated data entry from images. Helper module at `src/ai/anthropic.ts`.
- **Alert Notifications (Email, WhatsApp, SMS):** When a notification is created via `POST /api/notificaciones`, the system asynchronously sends alerts through all enabled channels: email (`src/lib/alert-email-service.ts`), WhatsApp (`src/lib/whatsapp-service.ts`), and SMS (`src/lib/sms-service.ts`). Each channel checks the user's preferences in `configuracion_usuario` before sending. The notifications page (`/notificaciones`) fetches real data from the API with tab filtering (all/unread), mark-as-read, mark-all-read, and a notification channel settings panel where users can toggle email/WhatsApp/SMS and configure phone numbers. The header bell icon shows a real-time unread count badge that refreshes every 60 seconds.
- **Permisología Module:** Data in `src/lib/permisologia-data.ts`, APIs in `src/app/api/permisologia/`. Covers SENIAT, various ministries, municipalities, and autonomous entities.
- **Carnets & Tarjetas Module:** Uses `api.qrserver.com` for QR generation on business, employee ID, accounting service, and insurance cards.
- **SMS:** Twilio (Replit connector) for 2FA verification codes and SMS alerts.
- **WhatsApp Alerts:** Twilio (Replit connector) for WhatsApp notifications.
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API.
- **Excel Export:** `exceljs`.
- **Telecom Module:** "Mi Línea" (personal) and "Mi Línea Empresa" (fleet) are separated in navigation and layout. Mi Línea uses real DB data from `lineas_telecom`/`facturas_telecom` tables via `/api/telecom` (GET/POST/PATCH/DELETE). PATCH validates enums, normalizes empty strings to NULL for nullable fields, and checks numeric values with `Number.isFinite`. Sidebar groups: "Mi Línea" → Mis Líneas + Nueva Línea; "Mi Línea Empresa" → Flota Empresarial. **Auto-generated numbers:** When registering a new line, a unique number is auto-assigned via `/api/telecom/generate-number` (POST). Personal lines get Venezuelan mobile format (`04XX-XXXXXXX`, random prefix from 0412/0414/0424/0416/0426). Enterprise lines get corporate codes (`KYR-EMP-XXXXXX`). Numbers are never recycled — checked against both `lineas_telecom` and `telecom_numeros_asignados` tables. The allocation table persists all ever-issued numbers permanently. DB-level unique index on `lineas_telecom(numero)`. PATCH also validates number uniqueness before updates.
- **Marco Legal Venezuela (`src/lib/marco-legal-venezuela.ts`):** Comprehensive Venezuelan legal/fiscal framework module with 14 fiscal entities (SENIAT, SAREN, SAIME, SAPI, CONATEL, SUNDDE, IVSS, INCES, BANAVIH, INPSASEL, SUNAGRO, BCV, SUDEBAN, SUDEASEG), 9 fundamental laws with key articles, current tax rates, and calendar/filter helpers. Exports: `entesFiscales`, `leyesFundamentales`, `tasasVigentes`, `getCalendarioFiscal()`, `getEnteFiscalById()`, `getEntesPorTipo()`, `getObligacionesPorPeriodicidad()`, `getLeyById()`, `getTodasLasObligaciones()`.
- **OTP Verification (`src/lib/verification-codes.ts`):** DB-primary storage with in-memory Map fallback. Codes are scoped by `proposito` field (`'verification'` for login, `'password-reset'` for reset flow) to prevent cross-flow OTP reuse. Max 5 attempts per code.
- **Security:** JWT_SECRET is enforced in production (both middleware and auth module throw if missing). Twilio phone number validated before SMS send. Rate limiting on all auth endpoints.