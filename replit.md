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
The system is built on Next.js 15 (App Router) with TypeScript, utilizing `next-intl` for internationalization (`/es/`, `/en/` prefixes). Styling is managed with Tailwind CSS and shadcn/ui. PostgreSQL serves as the database (Replit integrated), accessed directly via `node-postgres`. Authentication uses JWT with HTTP-only cookies.

**UI/UX Decisions:**
- Application routes are organized under `src/app/[locale]/` with grouped routes like `(auth)`, `(admin)`, `(main)`.
- A mobile sidebar provides smooth scrolling for landing pages and contextual navigation for the main application.
- The landing page is designed to be visual and scannable, featuring simplified sections for Hero, Services, About, and FAQ, with reduced text and increased visual elements.
- Register pages feature custom prefix selectors, auto-hyphenation for RIF, SENIAT AI lookup for company data, SAIME cédula lookup with auto-fill, and rich result panels.
- **SAIME Integration:** `saime_registros` DB table (50 citizen records) serves as simulated SAIME registry. API at `GET /api/cedula/consulta?cedula=V-XXXXXXXX` queries: users → empleados → saime_registros. Returns enriched data: full name, date of birth, sex, civil status, state, municipality, parroquia, nationality, document status, emission/expiry dates. Registration page auto-queries on cédula input and displays a detailed card with VIGENTE badge. Data flows via URL params to the natural registration form for auto-fill.
- Background animations are optimized, replacing Framer Motion with pure CSS for static radial gradients and reduced-opacity HUD grids, minimizing GPU overhead.
- Registration pages feature a deep redesign inspired by telecom UIs, with custom step navigation, progress bars, rounded input fields, and visual password strength meters.
- Plan selection cards are implemented for both Telecom and Contabilidad registration flows, offering rich UI for choosing service plans.

**Technical Implementations:**
- **Database Schema:** A comprehensive PostgreSQL schema with 70+ tables is managed in `src/lib/db-schema.ts`, initialized on server startup, and includes tables for auditing, caching, reports, and integrations.
- **Database Layer (`src/lib/db.ts`):** Enhanced with `batchInsert`, `upsert`, `exists`, `count`, `paginate`, and `healthCheck` helpers, including slow query detection and connection monitoring.
- **Demo Seed Data (`src/lib/db-seed.ts`):** Realistic Venezuelan business data for various modules, triggerable via `POST /api/db-seed`.
- **Health Check (`GET /api/db-health`):** Provides database latency, pool stats, and query metrics.
- **Enhanced Audit Trail:** `logAudit()` records detailed field-level changes with risk levels and session tracking.
- **API Routes:** Over 60 API routes cover authentication, real-time KPIs, and CRUD operations across banking, invoicing, clients, employees, payroll, declarations, and more.
- **Authentication:** JWT utilities (`createToken`, `verifyToken`, `getSession`) are in `src/lib/auth/index.ts` with an `AuthProvider` React context. Login now requires 2FA verification code sent via email (Outlook/Gmail/Resend fallback chain).
- **2FA Verification:** On successful password check, a 6-digit code is generated (`src/lib/verification-codes.ts`, in-memory Map with 10min expiry, max 5 attempts), emailed via `sendEmail()`, and verified at `/api/auth/verify-code`. Both `specialized-login-card.tsx` and `login-personal/page.tsx` implement the two-step UI (credentials → code input). Code auto-submits when 6 digits entered; supports paste.
- **Security:** Implemented security headers, in-memory rate limiting, input validation, anti-enumeration, parameterized SQL queries, and XSS protection.
- **Payment Methods:** Integrated PayPal, Zinli, Zelle, Pago Móvil / C2P, Venezuelan Bank Transfers, Binance Pay / Crypto, Debit/Credit Cards, and Kyron Digital Wallet.
- **Special Pages:** Dedicated pages for the Zedu Model: AutoMind AI project and a comprehensive user manual.
- **Performance Optimizations:** Lazy loading for `ChatDialog` and `VoiceAssistant`, dynamic imports for heavy landing sections, loading skeletons, and Next.js configuration for compression and image optimization. Scroll cinematic section optimized (350vh, CSS particles reduced from 18→8, ~20 useTransform calls consolidated). Page scroll progress bar uses CSS `animation-timeline: scroll()` with a lightweight JS fallback for unsupported browsers (single passive scroll listener). All infinite framer-motion JS animations (blob scale/opacity, floating particles, traffic light dots) replaced with static CSS or removed across hero, comments, CTA, and live-stats sections. Spring physics `whileHover` animations on cards replaced with CSS `hover:-translate-y-1` transitions. `animate-gradient-shift` continuous CSS gradient animation removed from all heading spans. `backdrop-blur` removed from high-repaint elements (kept only on modals/overlays). Hero floating stat cards use CSS `animate-float-slow` keyframes instead of framer-motion. Landing page: `DemoBanner`, `WhatsAppButton`, `WelcomeTutorial`, `PageTracker` are all dynamically imported. Hero dashboard image uses `priority` + `sizes`. Below-fold images use `loading="lazy"` + `sizes`. `optimizePackageImports` expanded (accordion, avatar, checkbox, switch, zod, jose). Cache headers: `/images/*` (24h + 7d stale-while-revalidate), `/favicon.ico` (7d immutable).
- **Tutorial/Onboarding:** `WelcomeTutorial` component triggers on first visit (localStorage `kyron-tutorial-seen`), not after registration. Shows 7-step walkthrough of the platform.
- **Loading Screen:** `src/components/landing/loading-screen.tsx` — polished splash with Kyron Logo, gradient progress bar, ~1.6s progress + 0.4s exit fade. Uses `requestAnimationFrame` for smooth progress.
- **Route Protection:** `sector-privado-system-kyron` page requires authentication (client-side check via `/api/auth/me`). Removed from public sitemap and blocked in `robots.txt`. Manual de Usuario link redirects to login instead of direct access. Dashboard/HR routes excluded from sitemap and robots.txt.

## External Dependencies
- **Database:** PostgreSQL (Replit integrated)
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Microsoft Outlook (Replit connector), Gmail (Replit connector & REST API), Resend (transactional fallback). Email templates use the hexagonal Kyron logo (`public/logo-kyron-email.png`) served via hosted URL, with "SYSTEM KYRON / Inteligencia Corporativa" text fallback for clients that block images.
- **AI Integrations:** Gemini 2.0 Flash (for fiscal chat and general chat), OpenAI GPT-4o (for dashboard analysis), Anthropic Claude (via Replit AI Integrations — `AI_INTEGRATIONS_ANTHROPIC_API_KEY`/`AI_INTEGRATIONS_ANTHROPIC_BASE_URL`).
- **Permisología Module:** Comprehensive permit management at `/contabilidad/tributos/permisos` — covers SENIAT (RIF, IVA, ISLR, IGTF, solvencia, facturación, aduanas, retenciones), 13+ Ministerios, 10 Alcaldías, 10 Gobernaciones, and Entes Autónomos (CONATEL, SUNDDE, INPSASEL, IVSS, INCES, BANAVIH, SAREN, SAPI). Features: catálogo de permisos con requisitos de inscripción y renovación, generador de cartas oficiales de solicitud/renovación, sistema de alertas por vencimiento (30/60/90 días), registro de permisos propios, filtros por organismo y sector económico. Data in `src/lib/permisologia-data.ts`, APIs in `src/app/api/permisologia/`.
- **Carnets & Tarjetas Module:** Design and print center at `/marketing/carnets` — 4 card types: (1) Business cards (tarjetas de presentación) with editable fields and front/back preview, (2) Employee ID cards (carnet de personal) for all staff with photo initials, QR code, blood type, department, (3) Accounting service request cards with QR, (4) Insurance service cards with QR authorization/approval code. All cards use the dark Kyron corporate theme and are printable. Uses `api.qrserver.com` for QR generation.
- **SMS:** Twilio (optional)
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API.
- **Excel Export:** `exceljs`.