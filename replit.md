# System Kyron - Ecosistema Corporativo

## Overview
System Kyron is an integrated technological ecosystem designed for comprehensive corporate management, specifically tailored for the Venezuelan market. It provides a unified platform covering accounting, HR, legal, sales, telecommunications, and IT, ensuring compliance with local regulations (VEN-NIF/SENIAT, IVA 16%, IGTF 3%, ISLR 34%). The project aims to offer businesses an efficient and compliant operational management system within Venezuela, prioritizing a visual and less text-heavy user experience. Future ambitions include integrating AI for enhanced functionality and compliance.

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

## System Architecture
The system is built on Next.js 15.5.14 (App Router) with TypeScript and Turbopack for fast dev compilation. It uses `next-intl` for internationalization. Styling is managed with Tailwind CSS and shadcn/ui. PostgreSQL serves as the database. Authentication uses JWT with HTTP-only cookies. Dev server runs on port 5000 with `--turbopack` flag.

**UI/UX Decisions:**
- Application routes are organized under `src/app/[locale]/` with grouped routes for various modules.
- Visually driven landing pages, intuitive mobile sidebar, redesigned Login/Dashboard, and dynamic pricing display.
- Custom form components for registration (prefix selectors, RIF/Cédula lookup), reusable document upload, and Venezuela geography data for cascading dropdowns.
- Kyron Chat provides context-aware AI chat with 10+ identity modes. Personal portal uses dedicated `/api/ai/kyron-chat-personal` endpoint powered by Gemini Flash (cost-effective for free accounts). Business/admin portals use `/api/ai/kyron-chat` powered by Claude Sonnet (premium). Full-page chat at `(natural)/chat-personal` for personal, `(admin)/kyron-chat` for business.
- Consistent heading sizes and an adaptive performance system.
- Themed screenshots for landing pages and AI-generated illustrations for services.
- Comprehensive welcome and per-module tutorial systems.
- Seasonal theming system for Venezuelan holidays.

**Technical Implementations:**
- **Database Layer:** PostgreSQL schema v3.1.0 with 80+ tables (including `contratos_legales`), GIN indexes for JSONB metadata columns, 40+ composite/partial indexes, supporting batch operations, upserts, and pagination. All column/index mismatches resolved (zero DB startup errors).
- **API Routes:** Over 60 API routes for authentication, KPIs, and CRUD operations. Includes `/api/solicitudes` for generic service requests and `/api/arqueo-caja` for cash register closings. All 40+ action buttons across every module now wired to real API persistence (zero toast-only fake saves remain).
- **Authentication:** JWT utilities with 2FA (email, SMS, WhatsApp), challenge tokens, optional "access key," and magic link verification. Dev mode fallback: when email delivery is unavailable (no SMTP/OAuth configured), the API returns the verification code in the JSON response and the frontend displays it in an amber "Modo Desarrollo" warning box above the code input fields.
- **Security:** CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Permissions-Policy, rate limiting with brute-force lockout, memory-safe maps, password complexity, input sanitization, and parameterized SQL.
- **Payment Methods:** Support for 26+ payment gateways and 29 Venezuelan banks.
- **Performance Optimizations:** Lazy loading, dynamic imports, loading skeletons, Next.js image optimization, CSS animations, WebP images, adaptive performance, smart loading screens, IntersectionObserver, in-memory TTL cache, and optimized database queries with composite indexes.
- **Enhanced Audit Trail & Blockchain Integration:** Records field-level changes with SHA-256 hashing and Merkle tree batch anchoring for critical entries on Polygon/Ethereum/BSC.
- **Real RIF/Cédula Validation:** Uses Venezuelan modulo-11 check digit algorithm for RIF and strict format validation for Cédula.
- **Route Protection:** Authentication required for sensitive pages.
- **Alert Notifications:** Asynchronously sends alerts via email, WhatsApp, and SMS based on user preferences.
- **Modules:** Includes Permisología, Carnets & Tarjetas, Telecom, Marketing, Informática/IT, Marco Legal Venezuela, Contabilidad Avanzada (10 sub-modules), and HR Module Expansion.
- **Permisología Integral:** Comprehensive permits database with 93 government organisms and 199 permit types. SENIAT fully integrated with 54 permits covering: all national taxes (IVA, ISLR, IGTF, IGP, DPP, sucesiones, donaciones, cigarrillos, alcohol, juegos de azar, regalías mineras, activos empresariales, ganancias fortuitas/capital), portal services (RIF digital, DIMAFI, facturación digital PA-000102, certificado residencia fiscal, calendario SPE, consulta deudas, verificación retenciones), succession/partner events (7 permits for declaración sucesoral, participaciones societarias, fallecimiento trabajador, liquidación de socio, herencias empresariales), and administrative procedures (anulación declaraciones, recursos tributarios, compensación, convenio de pago, devolución/reintegro, prescripción, Plan Evasión Cero, constancia no contribuyente, exención Decreto 6.585). 10 Gaceta Oficial permits. 19 gobernación-level, 15 alcaldía-level permits. Filterable by 21 economic sectors. Auto-generates formal solicitation letters (inscripción/renovación) with company letterhead.
- **Settings Page:** Allows user configuration of animation, navigation, notification, fiscal, and company data.
- **Global Search (Ctrl+K/Cmd+K):** Command palette for instant navigation to any module/page. Indexed 35+ pages with keyword search.
- **Scroll-to-Top Button:** Floating button on all portal layouts for easy navigation on long pages.
- **Custom Scrollbars:** Styled thin scrollbars across the entire app for a polished look.
- **Focus States:** Improved accessibility with consistent focus-visible outlines.
- **Breadcrumbs Navigation:** Auto-generated breadcrumbs in AppHeader showing the current page path with clickable links.
- **Enhanced Layouts:** HR and Ventas layouts upgraded with full AppHeader, PageTransition, ScrollToTop, footer, and visual background effects.
- **CSS Utility Classes:** card-hover-lift, shimmer-border, glow-text, surface-interactive, badge-pulse, text-balance, themed ::selection colors.
- **Document Authenticity Verification (AI-Powered):** Multi-layer verification using Claude Vision AI for Venezuelan documents, checking integrity, metadata, and visual content.
- **Real Automation Engine:** Database-backed system with 9 scheduled rules (BCV Sync, Fiscal Alerts, Regulatory Monitor, Health Check, Blockchain Batch, Session Cleanup, Invoice Reminders, Activity Digest, Email Automation), execution logging, and a live dashboard.
- **Automated Email System:** 10 email automation templates (welcome, verification, invoice issued/overdue, payroll, contract signed, fiscal alert, weekly summary, payment reminder, plan change) backed by `email_automaticos` table with scheduling, logging, and multi-channel delivery (Gmail, Outlook, SMS, WhatsApp).
- **Notifications System:** `notificaciones` table with typed notifications (info, alert, billing, fiscal, system, welcome, reminder), priority levels, multi-channel delivery, and JSONB metadata.
- **Alertas Fiscales Expandidas:** Monitors 30+ Venezuelan fiscal obligations.
- **Alertas Regulatorias:** Monitors legislative changes from Gacetas and National Assembly.
- **Admin Message Endpoint:** POST `/api/admin/send-message` for sending personalized emails.
- **Sistema de Planes con Límites:** 4 subscription plans with progressive resource limits.
- **Facturación Homologada SENIAT (Providencia 0071):** Billing compliant with Venezuelan regulations, including fiscal hashes and immutability.
- **Dashboard Widgets:** Company dashboard includes Tax Calendar (SENIAT deadlines: IVA, ISLR, retenciones, parafiscales, FAOV), Accounts Aging (0-30/31-60/61-90/90+ day buckets), and Fiscal Status cards. Natural person dashboard includes Document Expiry Alerts (cédula, RIF, pasaporte, licencia) with color-coded urgency badges, and Eco-Credits mini chart with material breakdown. Both dashboards include an Activity Timeline showing real-time user activity log.
- **Financial Toolkit (Ctrl+J):** Floating calculator panel mounted in all 9 portal layouts (admin, natural, hr, ventas, telecom, legal, informatica, main, socios) with 4 tabs: USD↔VES converter (live BCV rate from PyDolar API with 30-min cache, explicit "tasa no disponible" error state), IVA calculator (16%), IGTF calculator (3%), and ISLR retention calculator (services, honorarios, comisiones, alquiler). Copy-to-clipboard on all results.
- **Live BCV Rate Badge:** Always-visible exchange rate badge in the app header showing the current BCV USD/VES rate, auto-refreshes every 30 minutes.
- **BCV Rate API (`/api/bcv-rate`):** Server-side endpoint fetching official BCV exchange rate from PyDolar API with DolarAPI fallback, 30-minute in-memory cache.
- **Multi-Currency Display:** `CurrencyContext` (`src/lib/currency-context.tsx`) provides VES/USD/EUR display conversion across all billing and dashboard pages. `CurrencyProvider` is in admin and ventas layouts. `CurrencySelector` and `CurrencySelectorCompact` components allow switching. All amounts are stored/submitted in VES; display conversion is reference-only using static exchange rates. Pages using it: facturacion, proformas, facturacion-credito, nota-debito, nota-credito, dashboard-empresa.

## External Dependencies
- **Database:** PostgreSQL
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Gmail, Hotmail/Outlook, SMTP, Resend (with a two-account fallback system)
- **AI Integrations (Multi-Provider with Fallbacks):** Three AI providers strategically distributed via Replit AI Integrations, each endpoint with automatic provider fallback:
  - **Anthropic Claude** (`src/ai/anthropic.ts`): Kyron Chat corporate conversational AI (fallback → Gemini), document verification (vision/multimodal, no fallback — requires vision), automated data entry from images (no fallback — requires vision)
  - **Google Gemini** (`src/ai/gemini.ts`): Personal chat, fiscal chat, legal docs, Gaceta 6952 consultant (all fallback → OpenAI)
  - **OpenAI** (`src/ai/openai.ts`): Dashboard analysis, sales strategies, sentiment analysis, transaction categorization (all fallback → Gemini)
- **SMS:** Twilio
- **WhatsApp:** Twilio
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API
- **Excel Export:** `exceljs`
- **QR Generation:** `api.qrserver.com`
- **Blockchain:** ethers.js v6 (Polygon/Ethereum/BSC)