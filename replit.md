# System Kyron - Ecosistema Corporativo

## Overview
System Kyron is an integrated technological ecosystem designed for comprehensive corporate management, specifically tailored for the Venezuelan market. It provides a unified platform covering accounting, HR, legal, sales, telecommunications, and IT. The project's main purpose is to ensure compliance with local regulations (VEN-NIF/SENIAT, IVA 16%, IGTF 3%, ISLR 34%) and offer businesses an efficient and compliant operational management system within Venezuela. The project prioritizes a visual, less text-heavy user experience, with future ambitions including AI integration for enhanced functionality and compliance.

## User Preferences
- All buttons in the application should have functional handlers (`onClick`).
- All `alert()` calls should be replaced with toast notifications.
- API endpoints for `inventario`, `clientes`, `declaraciones_iva`, `declaraciones_islr`, and `retenciones` must align with the corrected schema fields.
- Financial routes must include `try/catch` blocks for error handling and use `NaN-safe parseFloat/parseInt`.
- Never use hardcoded `text-white` on page headings — use `text-foreground` for theme compatibility. Only use `text-white` inside truly dark/colored containers (buttons, colored cards, active tab triggers).
- All 6 layouts use `PageTransition` from `src/components/ui/motion.tsx` for SSR-safe page entrance animations (mount-gated, respects `prefers-reduced-motion`).
- Use `MotionContainer` for scroll-triggered reveals, `StaggerContainer`/`StaggerItem` for staggered card grids, `CountUp` for animated numbers, `FloatingElement` for ambient motion.
- CSS utility classes: `hover-lift`, `hover-glow`, `hover-scale`, `btn-press`, `icon-hover` for micro-interactions. Stagger delays: `.stagger-1` through `.stagger-8`. Glow effects: `shadow-glow-emerald`, `shadow-glow-cyan`, `glow-pulse-green`, `glow-pulse-blue`.
- The system should support both `{destino, tipo}` and `{method, email, phone}` formats for `/api/auth/send-code`.
- The system should support both `{destino, codigo}` and `{email, code}` formats for `/api/auth/verify-code`. Both paths use the centralized `verifyCode()` helper from `src/lib/verification-codes.ts`.
- Registration email verification supports both 6-digit OTP code entry AND magic link click (in a new tab). A polling hook (`use-verification-poll.ts`) checks `/api/auth/check-verified` every 3 seconds to auto-detect when the magic link is clicked, only for email verification (not SMS/WhatsApp).
- **Magic link single-session design:** When user clicks magic link in a new tab, the verify-link API creates the session cookie (shared across tabs via domain). The verify-link *page* does NOT redirect — it shows "Vuelve a la pestaña original" message. The original login tab's polling detects verification and navigates to the dashboard. This prevents the double-session bug (two dashboard tabs opening).

## System Architecture
The system is built on Next.js 15.5.14 (App Router) with TypeScript and Turbopack. It uses `next-intl` for internationalization, Tailwind CSS and shadcn/ui for styling, and PostgreSQL as the database. Authentication uses JWT with HTTP-only cookies. Typography uses Inter (sans-serif) and JetBrains Mono (monospace) via `next/font/google`, mapped to CSS variables `--font-inter` and `--font-jetbrains-mono`.

**UI/UX Decisions:**
- Application routes are organized under `src/app/[locale]/` with grouped routes for various modules.
- Features a premium cinematic landing page with a dark-first design, interactive elements, and a focus on AI capabilities and compliance. The pricing section offers three tabs: "Combo Todo Incluido" (bundled plans), "Módulos Individuales" (standalone modules), and "IA Presupuesto" (AI budget configurator with employee slider, module toggles, budget tier selector, and instant personalized recommendations via `/api/budget`).
- All authentication pages support both light and dark themes, with a dark mode default and Apple-style liquid glass effects.
- Kyron Chat provides context-aware AI chat with 10+ identity modes, using Gemini Flash for personal portals and Claude Sonnet for business/admin portals.
- The system includes a comprehensive welcome and per-module tutorial system, and a unified seasonal calendar system (`src/lib/seasonal-themes.ts`) that auto-detects 10 Venezuelan/global holidays with dynamic effects.
- Header navigation is reorganized into 5 mega-groups: Finanzas, Talento, Legal, Negocio, and Sistema.
- The platform consistently uses "CENTRO" instead of "NODO."
- Dark Mode Layouts: All 9 layout groups use `dark:from-[hsl(...)]` and `dark:to-[hsl(...)]` gradient variants.

**Technical Implementations:**
- **Database Layer:** PostgreSQL schema v3.3.0 with 95+ tables, GIN indexes for JSONB metadata, and numerous composite/partial indexes, supporting batch operations, upserts, and pagination.
- **API Routes:** Over 80 API routes for authentication, KPIs, and CRUD operations, including new modules for Legal, Personal, Telecom, Empresa, and expanded HR/Marketing.
- **Enterprise API Architecture (v3.5.0):** Features a standardized error hierarchy, response envelope, Zod request validation, composable route handler, pagination utilities, and a structured logger.
- **Authentication:** JWT utilities with 2FA (email, SMS, WhatsApp), challenge tokens, optional "access key," and magic link verification. Supports portal-type enforcement (`personal` | `business`).
- **Security:** Implements CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Permissions-Policy, rate limiting with brute-force lockout, memory-safe maps, password complexity, input sanitization, parameterized SQL, and AES-256-GCM encryption for sensitive PII at rest.
- **Payment Methods:** Supports 26+ payment gateways and 29 Venezuelan banks, including SENIAT-compliant pasarelas.
- **Performance Optimizations & Anti-Lag System:** Utilizes lazy loading, dynamic imports, loading skeletons, Next.js image optimization, WebP images, smart loading screens, IntersectionObserver, in-memory TTL cache, optimized database queries, and an adaptive performance pipeline with 3 tiers (high/medium/low) based on device detection and runtime FPS monitoring.
- **Enhanced Audit Trail & Blockchain Integration:** Records field-level changes with SHA-256 hashing and Merkle tree batch anchoring on Polygon/Ethereum/BSC.
- **RIF/Cédula Validation:** Real Venezuelan modulo-11 check digit algorithm for RIF and strict format validation for Cédula.
- **Modules:** Includes Permisología (with 483+ permits), Carnets & Tarjetas, Telecom, Marketing, Informática/IT, Marco Legal Venezuela, Contabilidad Avanzada, HR Module Expansion, and Viáticos.
- **Tool-Based Modules (v3.4.0):** 12 interactive calculator/simulator/analysis tools for Legal, Personal, Telecom, Empresa, Facturación, and Asesoría Contable.
- **Session Timeout:** Auto-logout after configurable inactivity with a warning dialog.
- **Global Search:** Command palette (⌘K) with 115+ searchable modules, fuzzy scoring, text match highlighting, recent searches, and categorized grouping.
- **Document Authenticity Verification:** Multi-AI forensic analysis system using Claude, OpenAI, and Gemini Vision for 6-layer scoring with AI consensus voting.
- **Bank Connection & Auto-Sync:** Direct bank connection for 10 Venezuelan banks via Gmail email notification parsing for automatic movement import.
- **Bulk Movement Import:** Excel (.xlsx/.xls) and CSV file import with smart column detection and flexible parsing.
- **Auto Journal Entries:** Automatic generation of double-entry journal entries from bank movements and invoices using the chart of accounts.
- **Real Automation Engine:** Database-backed system with 19 scheduled rules covering all modules, execution logging, and a live dashboard.
- **Automated Alert Categories:** Covers inventory, HR, payroll, accounts, budget, legal, security, and client-related alerts.
- **Automated Email System:** 10 email automation templates with scheduling, logging, and multi-channel delivery.
- **Notifications System:** `notificaciones` table with typed notifications, priority levels, and multi-channel delivery.
- **Alerts:** Expanded Fiscal Alerts monitoring 30+ Venezuelan fiscal obligations and Regulatory Alerts for legislative changes.
- **Subscription Plans:** Four bundle plans (Personal GRATIS — solo Cuenta Personal, Profesional $29, Empresarial $59, Kyron MAX $149). El plan Personal/Cuenta Personal es 100% gratis y solo incluye el módulo de cuenta personal; todos los demás módulos son de pago.
- **6 Paid Modules (each with tiered sub-plans):** Defined in `MODULOS_INDIVIDUALES` (planes-kyron.ts) with `SubPlanModulo[]` sub-plans from cheapest to most expensive:
  1. Mi Línea Personal — 6 data plans (Básico 2GB $3 → Infinite Ilimitado $35) with differentiated minutes, SMS, data, and international calls per tier
  2. Mi Línea Jurídica — 4 enterprise fleet plans (Básico 5 líneas $15 → Enterprise Ilimitado $120)
  3. Asesoría Contable — 4 accounting tiers (Esencial $8 → MAX $60)
  4. Asesoría Legal — 4 legal tiers (Básico $5 → MAX $50)
  5. Facturación — 4 invoicing tiers (Básico $6 → MAX $50)
  6. Socios y Directivos — 3 governance tiers (Básico $10 → Enterprise $45)
- **Registration page (juridico):** Module selection step shows only the 6 paid modules with "Desde $X/mes" pricing, aligned with landing page.
- **Error Handling:** Centralized `isNetworkError()` utility in `src/lib/utils.ts` differentiates network failures from server errors across all catch blocks (auth, dashboards, verify-link). No more false "Error de conexión" messages.
- **SENIAT Compliant Billing:** Facturación Homologada SENIAT with fiscal hashes and immutability.
- **Dashboard Widgets:** Company dashboard includes Tax Calendar, Cuentas por Cobrar/Pagar, and Fiscal Status cards. Natural person dashboard includes Document Expiry Alerts and Eco-Credits chart.
- **Financial Toolkit:** Floating calculator panel with USD↔VES converter, IVA calculator, IGTF calculator, and ISLR retention calculator.
- **Live BCV Rate:** Always-visible exchange rate badge in the app header, auto-refreshing via DB-first fetch with fallbacks.
- **Multi-Currency Display:** `CurrencyContext` provides VES/USD/EUR display conversion across billing and dashboard pages.
- **Telecom Module:** Includes personal and enterprise pages for services, CONATEL Regulatory Compliance, and advanced enterprise features.
- **Enterprise and Personal Security:** Dedicated pages for enterprise security (Centro de Seguridad, audit log, device management) and personal account security (2FA, active sessions).
- **Profile Pages:** Natural users use `/perfil`, while empresa/admin users use `/perfil-empresa`, dynamically displaying user data based on authentication.

## External Dependencies
- **Database:** PostgreSQL
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Gmail, Hotmail/Outlook, SMTP, Resend, Replit Google Mail connector
- **AI System (Centralized Architecture v2.0):**
  - **Core:** `src/ai/providers.ts` (singleton clients, unified config, fallback chains), `src/ai/stream.ts` (multi-provider SSE streaming), `src/ai/prompts.ts` (composable system prompts)
  - **Providers:** Anthropic Claude, Google Gemini, OpenAI, DeepSeek — all with automatic failover
  - **Endpoints:** kyron-chat (Claude→DeepSeek→Gemini), kyron-chat-personal (Gemini→DeepSeek→OpenAI), fiscal-chat, analyze-dashboard, kyron-mail-ai, kyron-chat-trial, speed-test
  - **Flows:** automated-data-entry (Claude Vision), gaceta-6952, legal-doc-generator, sales-strategy, sentiment-analysis, transaction-categorization
  - **Document Verifier:** Multi-AI forensic analysis (Claude+OpenAI+Gemini Vision consensus)
- **SMS:** Twilio
- **WhatsApp:** Twilio
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API
- **Excel/CSV Import:** `xlsx`
- **Excel Export:** `exceljs`
- **QR Generation:** `api.qrserver.com`
- **Blockchain:** ethers.js v6