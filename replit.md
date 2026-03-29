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
- **Demo Seed Data (`src/lib/db-seed.ts`):** Realistic Venezuelan business data.
- **Health Check (`GET /api/db-health`):** Provides database metrics.
- **Enhanced Audit Trail:** `logAudit()` records detailed field-level changes.
- **API Routes:** Over 60 API routes for authentication, KPIs, and CRUD operations.
- **Authentication:** JWT utilities in `src/lib/auth/index.ts` with `AuthProvider` context. Login requires 2FA via email.
- **2FA Verification:** 6-digit code generation, email sending, and verification.
- **Security:** Implemented security headers, rate limiting, input validation, and parameterized SQL.
- **Payment Methods:** Integration with 12 payment gateways and 29 Venezuelan banks.
- **Special Pages:** Dedicated pages for Zedu Model: AutoMind AI project and a user manual.
- **Performance Optimizations:** Lazy loading, dynamic imports, loading skeletons, Next.js image optimization, and CSS-based animations replacing Framer Motion where possible.
- **Tutorial/Onboarding:** `WelcomeTutorial` component for first-time users.
- **Loading Screen:** Polished splash screen with Kyron Logo and progress bar.
- **Kyron Design System:** Signature gradient, CSS utilities, and animations defined in `globals.css`.
- **Route Protection:** Authentication required for sensitive pages, excluded from public sitemap and `robots.txt`.

## External Dependencies
- **Database:** PostgreSQL (Replit integrated)
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Gmail, Outlook, Resend for verification, alerts, and general emails, with a fallback chain.
- **AI Integrations:** Gemini 2.5 Flash for SAIME/SENIAT lookups and fiscal chat, Anthropic Claude Sonnet for Kyron Chat.
- **Alert Email Notifications:** Asynchronous email sending via `src/lib/alert-email-service.ts` for user notifications.
- **Permisología Module:** Data in `src/lib/permisologia-data.ts`, APIs in `src/app/api/permisologia/`. Covers SENIAT, various ministries, municipalities, and autonomous entities.
- **Carnets & Tarjetas Module:** Uses `api.qrserver.com` for QR generation on business, employee ID, accounting service, and insurance cards.
- **SMS:** Twilio (Replit connector) for 2FA verification codes and SMS alerts.
- **WhatsApp Alerts:** Twilio (Replit connector) for WhatsApp notifications.
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API.
- **Excel Export:** `exceljs`.
- **Telecom Module:** "Mi Línea" (personal) and "Mi Línea Empresa" (fleet) are separated in navigation and layout. Mi Línea uses real DB data from `lineas_telecom`/`facturas_telecom` tables via `/api/telecom` (GET/POST/PATCH/DELETE). PATCH validates enums, normalizes empty strings to NULL for nullable fields, and checks numeric values with `Number.isFinite`. Sidebar groups: "Mi Línea" → Mis Líneas + Nueva Línea; "Mi Línea Empresa" → Flota Empresarial.