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
The system is built on Next.js 15 (App Router) with TypeScript, utilizing `next-intl` for internationalization. Styling is managed with Tailwind CSS and shadcn/ui. PostgreSQL serves as the database. Authentication uses JWT with HTTP-only cookies.

**UI/UX Decisions:**
- Application routes are organized under `src/app/[locale]/` with grouped routes for authentication, administration, main application, natural persons, HR, legal, sales, partners, and telecommunications.
- A mobile sidebar provides smooth scrolling for landing pages and contextual navigation.
- The landing page is visually driven with simplified sections (Hero, Services, About, FAQ).
- Register pages feature custom prefix selectors, auto-hyphenation for RIF, SENIAT AI lookup for company data, SAIME cédula lookup with auto-fill, and rich result panels. Module selection: Persona Natural, Asesoría Contable (includes RRHH/Nómina), Escritorio Jurídico, Mi Línea 5G, and Punto de Venta & Ventas. RRHH registration redirects to Asesoría Contable. Asesoría Contable registration has 3 steps: 1) Plan Selection (Básico $12, Profesional $28 recommended, Empresarial $52, Premium $95), 2) Company data + credentials, 3) Location. Plan is saved in `users.plan` and `users.plan_monto` with server-side validation. Mobile view includes fiscal metrics (IVA 16%, IGTF 3%, ISLR 34%) and anti-multa description.
- Document upload functionality is reusable with drag-and-drop zones, file validation (PDF/JPG/PNG/WebP, max 10MB).
- Venezuela geography data is used for cascading state/municipality dropdowns in registration forms.
- SAIME cédula lookup uses Claude AI (`claude-sonnet-4-6` via Replit AI Integrations) for real data searches. Results cached in `saime_registros` with `source: 'ia'`. If AI can't find real data, returns `found: false` and lets user enter data manually.
- Background animations are optimized using pure CSS.
- Registration pages feature a redesign with custom step navigation, progress bars, rounded input fields, and visual password strength meters.
- Plan selection cards display prices in USD with live Bs. equivalent from the BCV daily rate.
- Login and Dashboard pages are redesigned for a cleaner, modern aesthetic with motion animations and real API data. Specialized login cards and dashboard KPIs are dynamically rendered.
- A slow connection banner dynamically detects network status and provides user feedback.
- A comprehensive FAQ system with search and category filters is available.
- Kyron Chat (`LazyChatDialog`) provides context-aware AI chat in authenticated layouts with 10+ identity modes. The duplicate `VoiceAssistant` floating button has been removed — only Kyron Chat remains.
- Consistent heading sizes (`text-3xl md:text-5xl`) are applied across all pages.

**Technical Implementations:**
- **Database Schema:** A comprehensive PostgreSQL schema with 80+ tables is managed.
- **Database Layer:** Includes helpers for batch operations, upserts, existence checks, pagination, and health checks.
- **Demo Requests:** Landing page CTA form saves data, and sends branded notification emails using a multi-provider email service.
- **Demo Seed Data:** Realistic Venezuelan business data.
- **Health Check:** `GET /api/db-health` provides database metrics.
- **Enhanced Audit Trail:** `logAudit()` records detailed field-level changes.
- **API Routes:** Over 60 API routes for authentication, KPIs, and CRUD operations.
- **Authentication:** JWT utilities with an `AuthProvider` context. Login requires 2FA via email. Optional "access key" (llave de acceso) allows users to skip 2FA by providing a personal key (min 6 chars, bcrypt-hashed in `users.access_key_hash`). Access key management API at `/api/auth/access-key` (GET/POST/DELETE). All login pages support the access key toggle.
- **2FA Verification:** 6-digit code generation, email sending, and verification.
- **Security:** Implemented security headers, rate limiting, input validation, and parameterized SQL.
- **Payment Methods:** Integration with 12 payment gateways and 29 Venezuelan banks.
- **Special Pages:** Dedicated pages for Zedu Model: AutoMind AI project and an enhanced user manual.
- **Performance Optimizations:** Lazy loading, dynamic imports, loading skeletons, Next.js image optimization, CSS-based animations, WebP images (95% compression). Hero section uses separate background images for light mode (`hero-bg-light.webp`) and dark mode (`hero-bg-dark.webp`) with CSS class-based switching (`dark:hidden` / `hidden dark:block`). Landing page content appears immediately without scroll triggers. Framer-motion removed from `demo-banner.tsx`, `welcome-tutorial.tsx`, `comments-section.tsx`, `facturacion/page.tsx`, and `sostenibilidad/page.tsx`. Below-fold sections deferred via `requestIdleCallback` until hero is interactive. Only `scroll-cinematic-section` retains Framer Motion for scroll-driven parallax.
- **Adaptive Performance System:** Silent device tier detection (`src/hooks/use-device-tier.ts`) classifies devices into low/mid/high tiers based on CPU cores, RAM, GPU capability (WebGL probe), network speed, and screen density. `PerformanceProvider` (`src/components/performance-provider.tsx`) wraps the app and sets CSS custom properties + `data-tier` attribute on `<html>`. DynamicBackground consumes tier via React context to conditionally render orbs, grid, and festive effects. CSS tier-adaptive rules in `globals.css` disable backdrop-filter/animations on low-tier, reduce blur on mid-tier, and enable full effects on high-tier. Additional media queries: `@media (update: slow)` kills animations on low-refresh displays, `@media (pointer: coarse)` disables hover effects on touch devices, `@media (prefers-reduced-motion: reduce)` respects OS accessibility settings. Mobile detection hook (`use-mobile.tsx`) uses `matchMedia` instead of resize listeners for efficiency.
- **Dashboard-Socios Page:** Page at `src/app/[locale]/(socios)/dashboard-socios/page.tsx` with shareholder composition table, KPI cards, recent assembly acts, and corporate governance modules. Fetches from `/api/socios` (CRUD for `socios` and `actas_asamblea` tables). Supports adding/editing/deleting socios with dialog form.
- **Sostenibilidad Page:** Page at `src/app/[locale]/(main)/sostenibilidad/page.tsx` fetches from `/api/eco-creditos` (tables: `eco_creditos`, `eco_transacciones`). Supports registering recycling activities with dialog form. Shows real balance, CO₂ impact, and transaction history.
- **Tutorial/Onboarding:** `WelcomeTutorial` component for first-time users.
- **Loading Screen:** Polished splash screen with Kyron Logo and progress bar. Imported directly (not dynamically) to prevent blank-page flash during SSR→client transition.
- **Kyron Design System:** Signature gradient, CSS utilities, and animations are defined globally.
- **Real RIF/Cédula Validation:** Uses Venezuelan modulo-11 check digit algorithm for RIF and strict format validation for Cédula. API endpoints perform DB-only lookups.
- **Route Protection:** Authentication is required for sensitive pages.
- **Alert Notifications:** Asynchronously sends alerts via email, WhatsApp, and SMS based on user preferences. Document-ready notifications auto-trigger when document status changes to ready states (aprobado, entregado, vigente, firmado, etc.) via `notifyDocumentReady()` helper in `src/lib/document-notifications.ts`.
- **Permisología Module:** Covers SENIAT, various ministries, municipalities, and autonomous entities.
- **Carnets & Tarjetas Module:** Generates QR codes for various cards.
- **Telecom Module:** Manages personal and enterprise telecommunications lines with auto-assigned unique numbers. Enhanced with per-line data usage visualization (color-coded progress bars), plans comparison section (Conecta/Global/Infinite with pricing), network status panel (latency, 5G coverage, speeds), and quick recharge buttons ($5–$50 with auto-recarga option).
- **Marketing Module:** Investment dashboard with market alerts (IBVC, BCV bonds, real estate, crypto, banking), financial analysis tables, payment alternatives. Enhanced with campaign management section (email/SMS/WhatsApp campaigns with sent/opened/clicks/conversion metrics), social media analytics (Instagram/LinkedIn/X/TikTok with followers/growth/engagement), ROI by channel table, and SEO/traffic analytics panel.
- **Marco Legal Venezuela:** Comprehensive module with 14 fiscal entities, 9 fundamental laws, current tax rates, and calendar/filter helpers.
- **OTP Verification:** DB-primary storage with in-memory Map fallback, codes scoped by purpose, max 5 attempts per code.
- **Kyron Chat (Global):** VoiceAssistant component is available for all users (authenticated and unauthenticated) with hide/show toggle and context-aware greetings.
- **HR Module Expansion (Bienestar Laboral):**
  - **Proyectos y Estrategias de Personal** (`/proyectos-personal`): Departmental HR projects with Kanban/list views, filters by department/status/priority, progress tracking. Tables: `proyectos_personal`.
  - **Bienestar Laboral** (`/bienestar-laboral`): Motivational system (recognition programs, incentive gamification, points rewards), vacation planning (LOTTT-compliant), and resort alliances for employees/families. Tables: `programas_motivacion`, `reconocimientos_empleado`, `alianzas_vacacionales`, `planes_vacaciones`.
  - **Manuales y Contratos** (`/manuales-rrhh`): Procedure manuals per department/role (with procedures and workplace prohibitions), corporate org chart (hierarchical levels: direction/management/coordination/positions), and labor contracts (benefits, restrictions, LOTTT compliance). Tables: `manuales_procedimientos`, `organigrama_nodos`, `contratos_laborales`.
  - API routes: `/api/rrhh/proyectos-personal`, `/api/rrhh/bienestar`, `/api/rrhh/manuales`.
- **Back Button Component:** Reusable for consistent navigation across subpages.
- **Settings Page (`/configuracion`):** Under `(admin)` route group. Allows users to toggle "Reducir Animaciones" (disables CSS animations/transitions globally via `.reduce-motion` class on `<html>`) and "Navegación Lateral" (switches from top-bar navigation to a fixed sidebar in admin layouts). UI preferences are managed by `PreferencesProvider` (in `src/lib/preferences-context.tsx`) with localStorage fallback and API persistence. The page also manages notification preferences, fiscal parameters (IVA/IGTF/ISLR), and company data. DB columns: `configuracion_usuario.reducir_animaciones`, `configuracion_usuario.nav_lateral`.

## External Dependencies
- **Database:** PostgreSQL
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** CSS keyframe animations (viewport-gated via IntersectionObserver), Framer Motion (landing sections: hero, features, services, about-us with stagger/fadeUp variants; scroll-cinematic for parallax; login selector with AnimatePresence; dashboards with staggered mount animations). Device-performance-aware: `src/lib/device-performance.ts` + `src/hooks/use-device-performance.ts` detect CPU cores, RAM, connection type, reduced motion preference — animations disabled on low-tier devices.
- **Email Services:**
  - **Gmail (Replit Integration):** Used exclusively for sending verification codes (OTP/2FA)
  - **Outlook/Microsoft (Replit Integration):** Used for all types of alerts and notifications (fiscal deadlines, document status, system alerts, SENIAT reminders)
  - **Resend:** Fallback email provider
- **AI Integrations:** Gemini (via Replit AI Integrations), OpenAI (via Replit AI Integrations), Anthropic Claude (via Replit AI Integrations)
- **SMS (Twilio):** Dual-purpose — envío de códigos de verificación (OTP/2FA) + alertas y notificaciones del sistema
- **WhatsApp (Twilio):** Dual-purpose — envío de códigos de verificación (OTP/2FA) + alertas y notificaciones del sistema
- **Google Calendar:** Not configured (user dismissed integration — ask for credentials if needed in the future)
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API
- **Excel Export:** `exceljs`
- **QR Generation:** `api.qrserver.com`