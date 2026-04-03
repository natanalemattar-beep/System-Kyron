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

## System Architecture
The system is built on Next.js 15.5.14 (App Router) with TypeScript and Turbopack. It uses `next-intl` for internationalization, Tailwind CSS and shadcn/ui for styling, and PostgreSQL as the database. Authentication uses JWT with HTTP-only cookies.

**UI/UX Decisions:**
- Application routes are organized under `src/app/[locale]/` with grouped routes for various modules.
- Features visually driven landing pages, intuitive mobile sidebar, redesigned Login/Dashboard, and dynamic pricing display.
- Custom form components include registration (prefix selectors, RIF/Cédula lookup), reusable document upload, and Venezuela geography data for cascading dropdowns.
- All authentication pages enforce a light theme.
- Specific module pages use brand colors (Asesoría Contable) and varied color schemes for plan cards.
- Implements a dark/light theme system with smooth transitions, defaulting to dark mode, and Apple-style liquid glass effects.
- Asesoría Contable verification offers Email, SMS, and WhatsApp channels.
- Kyron Chat provides context-aware AI chat with 10+ identity modes, using Gemini Flash for personal portals and Claude Sonnet for business/admin portals.
- The system includes a comprehensive welcome and per-module tutorial system, and a seasonal theming system for Venezuelan holidays.

**Technical Implementations:**
- **Database Layer:** PostgreSQL schema v3.1.0 with 80+ tables, GIN indexes for JSONB metadata, and numerous composite/partial indexes, supporting batch operations, upserts, and pagination.
- **API Routes:** Over 60 API routes for authentication, KPIs, and CRUD operations, with all action buttons wired to real API persistence.
- **Authentication:** JWT utilities with 2FA (email, SMS, WhatsApp), challenge tokens, optional "access key," and magic link verification. Includes a development mode fallback for verification codes.
- **Security:** Implements CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Permissions-Policy, rate limiting with brute-force lockout, memory-safe maps, password complexity, input sanitization, and parameterized SQL.
- **Payment Methods:** Supports 26+ payment gateways and 29 Venezuelan banks.
- **Performance Optimizations:** Utilizes lazy loading, dynamic imports, loading skeletons, Next.js image optimization, CSS animations, WebP images, adaptive performance, smart loading screens, IntersectionObserver, in-memory TTL cache, and optimized database queries.
- **Enhanced Audit Trail & Blockchain Integration:** Records field-level changes with SHA-256 hashing and Merkle tree batch anchoring on Polygon/Ethereum/BSC.
- **RIF/Cédula Validation:** Real Venezuelan modulo-11 check digit algorithm for RIF and strict format validation for Cédula.
- **Modules:** Includes Permisología, Carnets & Tarjetas, Telecom, Marketing, Informática/IT, Marco Legal Venezuela, Contabilidad Avanzada (10 sub-modules), and HR Module Expansion. Permisología Integral includes a comprehensive permits database with auto-generation of solicitation letters.
- **Settings Page:** Allows user configuration of animation, navigation, notification, fiscal, and company data.
- **Global Search:** Command palette for instant navigation.
- **Accessibility & UI Enhancements:** Scroll-to-Top button, custom scrollbars, improved focus states, and auto-generated breadcrumbs.
- **CSS Utility Classes:** `card-hover-lift`, `shimmer-border`, `glow-text`, `surface-interactive`, `badge-pulse`, `text-balance`, themed `::selection` colors.
- **Document Authenticity Verification:** AI-powered multi-layer verification using Claude Vision AI.
- **Real Automation Engine:** Database-backed system with 9 scheduled rules, execution logging, and a live dashboard.
- **Automated Email System:** 10 email automation templates with scheduling, logging, and multi-channel delivery.
- **Notifications System:** `notificaciones` table with typed notifications, priority levels, multi-channel delivery, and JSONB metadata.
- **Alerts:** Expanded Fiscal Alerts monitoring 30+ Venezuelan fiscal obligations and Regulatory Alerts for legislative changes.
- **Admin Message Endpoint:** `POST /api/admin/send-message` for personalized emails.
- **Subscription Plans:** Four plans with progressive resource limits.
- **SENIAT Compliant Billing:** Facturación Homologada SENIAT (Providencia 0071) with fiscal hashes and immutability.
- **Dashboard Widgets:** Company dashboard includes Tax Calendar, Accounts Aging, and Fiscal Status cards. Natural person dashboard includes Document Expiry Alerts and Eco-Credits chart. Both feature an Activity Timeline.
- **Activity Log Column Mapping:** The `activity_log` DB table uses `created_at` but the API returns it aliased as `creado_en` for all frontend consumers.
- **Chart THEMES Fix:** `src/components/ui/chart.tsx` THEMES object uses `{ light: "", dark: ".dark" }` — both key and value must be explicit to avoid Turbopack SSR bundling errors.
- **Financial Toolkit:** Floating calculator panel with USD↔VES converter (live BCV rate), IVA calculator (16%), IGTF calculator (3%), and ISLR retention calculator.
- **Live BCV Rate:** Always-visible exchange rate badge in the app header, auto-refreshing. DB-first fetch with `fetchTodayFromDb()`, cache validates date matches today, fallback order: PyDolar → ExchangeRate → DolarAPI.
- **Multi-Currency Display:** `CurrencyContext` provides VES/USD/EUR display conversion across billing and dashboard pages, with amounts stored in VES.
- **NUEVO Badge System:** Nav items in `app-sidebar-nav-items.tsx` support `badge?: string` property. Sidebar and header render pulsing green "NUEVO" badges in desktop dropdowns and mobile sheet.
- **Enterprise Security Pages:** `/seguridad-empresarial` (Centro de Seguridad with toggleable protections, threat log, recommendations), `/seguridad-empresarial/auditoria` (full access audit log), `/seguridad-empresarial/dispositivos` (device management with session control).
- **Personal Account Security:** `/seguridad-cuenta` (2FA toggle, active sessions, security history, quick actions).
- **Terminology:** Platform uses "CENTRO" instead of "NODO" throughout. "CENTRO DE VENTAS", "Estado del Sistema", "AUTENTICAR ACCESO".
- **Dark Mode Layouts:** All 9 layout groups (admin, natural, main, telecom, informatica, hr, ventas, socios, legal) use `dark:from-[hsl(...)]` and `dark:to-[hsl(...)]` gradient variants alongside light HSL values. Auth layout intentionally forces light theme.
- **Hydration Safety:** Pages must not use `new Date()` or `Math.random()` in `useState` initializers or direct JSX. Use `useEffect` to set client-only values after mount.

## External Dependencies
- **Database:** PostgreSQL
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Gmail, Hotmail/Outlook, SMTP, Resend
- **AI Integrations:**
  - **Anthropic Claude:** Kyron Chat (corporate), document verification, automated data entry (with fallbacks).
  - **Google Gemini:** Personal chat, fiscal chat, legal docs, Gaceta 6952 consultant (with fallbacks).
  - **OpenAI:** Dashboard analysis, sales strategies, sentiment analysis, transaction categorization (with fallbacks).
- **SMS:** Twilio
- **WhatsApp:** Twilio
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API
- **Excel Export:** `exceljs`
- **QR Generation:** `api.qrserver.com`
- **Blockchain:** ethers.js v6 (Polygon/Ethereum/BSC)