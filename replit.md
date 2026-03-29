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
- Register pages feature custom prefix selectors, auto-hyphenation for RIF, SENIAT AI lookup for company data, and rich result panels.
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
- **Authentication:** JWT utilities (`createToken`, `verifyToken`, `getSession`) are in `src/lib/auth/index.ts` with an `AuthProvider` React context.
- **Security:** Implemented security headers, in-memory rate limiting, input validation, anti-enumeration, parameterized SQL queries, and XSS protection.
- **Payment Methods:** Integrated PayPal, Zinli, Zelle, Pago Móvil / C2P, Venezuelan Bank Transfers, Binance Pay / Crypto, Debit/Credit Cards, and Kyron Digital Wallet.
- **Special Pages:** Dedicated pages for the Zedu Model: AutoMind AI project and a comprehensive user manual.
- **Performance Optimizations:** Lazy loading for `ChatDialog` and `VoiceAssistant`, dynamic imports for heavy landing sections, loading skeletons, and Next.js configuration for compression and image optimization. Scroll cinematic section optimized (500vh, stiffness 120). Loading screen uses Logo component with ~2s total duration (RAF-based progress). Page scroll progress bar spring tightened (stiffness 200, damping 50).
- **Tutorial/Onboarding:** `WelcomeTutorial` component triggers on first visit (localStorage `kyron-tutorial-seen`), not after registration. Shows 7-step walkthrough of the platform.
- **Loading Screen:** `src/components/landing/loading-screen.tsx` — polished splash with Kyron Logo, gradient progress bar, ~1.6s progress + 0.4s exit fade. Uses `requestAnimationFrame` for smooth progress.

## External Dependencies
- **Database:** PostgreSQL (Replit integrated)
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Microsoft Outlook (Replit connector), Gmail (Replit connector & REST API), Resend (transactional fallback). Email templates use the hexagonal Kyron logo (`public/logo-kyron-email.png`) served via hosted URL, with "SYSTEM KYRON / Inteligencia Corporativa" text fallback for clients that block images.
- **AI Integrations:** Gemini 2.0 Flash (for fiscal chat and general chat), OpenAI GPT-4o (for dashboard analysis).
- **SMS:** Twilio (optional)
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API.
- **Excel Export:** `exceljs`.