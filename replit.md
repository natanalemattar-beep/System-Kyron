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
The system is built on Next.js 15 (App Router) with TypeScript, utilizing `next-intl` for internationalization. Styling is managed with Tailwind CSS and shadcn/ui. PostgreSQL serves as the database. Authentication uses JWT with HTTP-only cookies.

**UI/UX Decisions:**
- Application routes are organized under `src/app/[locale]/` with grouped routes for authentication, administration, main application, natural persons, HR, legal, sales, partners, and telecommunications.
- Visually driven landing pages and an intuitive mobile sidebar enhance navigation.
- Registration processes feature custom prefix selectors, auto-hyphenation for RIF, SENIAT AI lookup for company data, SAIME cédula lookup with auto-fill, and rich result panels.
- Document upload functionality is reusable with drag-and-drop zones and robust validation.
- Venezuela geography data is used for cascading dropdowns in forms.
- Dynamic pricing displays live exchange rates (USD to Bs.).
- Login and Dashboard pages are redesigned for a cleaner, modern aesthetic with motion animations and real API data.
- A slow connection banner dynamically detects network status.
- A comprehensive FAQ system with search and category filters is available.
- Kyron Chat provides context-aware AI chat with 10+ identity modes.
- Consistent heading sizes are applied across all pages.

**Technical Implementations:**
- **Database Layer:** Comprehensive PostgreSQL schema with over 80 tables, including helpers for batch operations, upserts, existence checks, pagination, and health checks.
- **API Routes:** Over 60 API routes for authentication, KPIs, and CRUD operations.
- **Authentication:** JWT utilities with 2FA via email, SMS, or WhatsApp (3-channel verification). Includes a challenge token for SMS/WhatsApp resend requests, an optional "access key" to skip 2FA, and **magic link verification** — emails include a one-click button that verifies identity without entering a code. Magic links use 32-byte hex tokens stored in `verification_codes` table with `proposito='magic_link'`, verified via `/api/auth/verify-link` and landing page at `/verify-link/[token]`.
- **Security:** Comprehensive security layer: Content Security Policy (CSP) in production, HSTS with preload, X-Content-Type-Options, X-Frame-Options, Permissions-Policy, rate limiting with progressive brute-force lockout (3min/10min/30min after 5/7/10 failures), memory-safe maps with 10K entry cap, password complexity (8+ chars, upper/lower/number/special + common pattern blacklist), input sanitization, and parameterized SQL.
- **Payment Methods:** 26+ payment gateways organized into International, Cryptocurrency, and Venezuelan categories, supporting 29 Venezuelan banks.
- **Performance Optimizations:** Lazy loading, dynamic imports, loading skeletons, Next.js image optimization, CSS-based animations, and WebP images. Includes an Adaptive Performance System that detects device tiers to adjust animation complexity. Smart loading screen preloads critical hero assets (hero-bg-light.webp, hero-bg-dark.webp, hero-dashboard-dark.jpg, hero-dashboard-light.jpg) with real progress tracking. IntersectionObserver lazy sections with 400px rootMargin for below-fold content. In-memory TTL cache (`src/lib/cache.ts`) with 200-entry cap for API responses (stats 30s, analytics 60s, comments 120s, BCV rate 5min). Middleware JWT verification cache (15s TTL, bounded by token exp). Fire-and-forget visit tracking with combined CTE query (INSERT + upsert in single round trip). Consolidated subselect queries in analytics/visits GET to reduce DB round trips. Composite indexes on page_visits (module+created_at, device_type+created_at, page+created_at) for analytics query acceleration.
- **Theme-Aware Screenshots:** All landing page images (hero dashboard, showcase, and services sections) use the `ThemeImage` component (`src/components/ui/theme-image.tsx`) which renders both dark and light variants stacked with CSS `dark:opacity-0`/`dark:opacity-100` classes. Hero dashboard shows real contabilidad dashboard screenshots instead of stock imagery. Screenshot assets stored as `*-dark.jpg` and `*-light.jpg` pairs in `public/images/landing/`.
- **Welcome Tutorial (General):** Simplified 5-step intro (Welcome, Login, Register, Explore Modules, Done) with time-of-day greeting, typing animation, directional slide transitions, lazy image preloading, and confetti on final step. Tutorial screenshots stored in `public/images/tutorial/`.
- **Per-Module Tutorial System:** Each module shows its own first-visit onboarding tutorial via `ModuleTutorial` component (`src/components/module-tutorial.tsx`) with config from `src/lib/module-tutorials.ts`. Uses localStorage key `kyron-module-tutorial-{moduleId}`. Covers 10 modules: dashboard-empresa, contabilidad, facturacion, rrhh, legal, marketing, telecom, sostenibilidad, ciudadano, kyron-ia. Each has module-specific steps with icons, bullets, and color theming.
- **Scroll Lock Fix:** Custom hook `useRemoveScrollLock` for Radix UI dialogs, ensuring page scrollability.
- **Enhanced Audit Trail & Blockchain Integration:** Records detailed field-level changes with SHA-256 hashing and Merkle tree batch anchoring for critical and high-risk entries, supporting Polygon/Ethereum/BSC chains.
- **Real RIF/Cédula Validation:** Uses Venezuelan modulo-11 check digit algorithm for RIF and strict format validation for Cédula.
- **Route Protection:** Authentication is required for sensitive pages.
- **Alert Notifications:** Asynchronously sends alerts via email, WhatsApp, and SMS based on user preferences.
- **Modules:** Includes Permisología, Carnets & Tarjetas, Telecom, Marketing, Informática/IT, and Marco Legal Venezuela.
- **Contabilidad Avanzada:** 10 modules covering Financial Statements, Chart of Accounts, Journal Entries, Business Budgeting, Guided Financial Close, Financial Indicators, Fixed Asset Depreciation, Cost Centers, SENIAT Export, and Accountant's Opinion.
- **HR Module Expansion (Bienestar Laboral):** Features personnel projects, motivational systems, vacation planning, procedure manuals, corporate org charts, and labor contracts.
- **Settings Page:** Allows users to configure animation, navigation, notification, fiscal, and company data preferences.
- **Document Authenticity Verification (AI-Powered):** Multi-layer document verification system using Claude Vision AI. Checks file integrity (magic bytes, extension match), metadata analysis (PDF producer/creator, EXIF, editing software detection), and AI-powered visual analysis for Venezuelan documents (cédulas, RIF, passports, certificates). Produces a verdict (auténtico/sospechoso/fraudulento) with confidence score, detailed breakdown across 4 categories (integridad, visual, metadatos, contenido), alerts and recommendations. Results stored in `verificaciones_documentos` table with SHA-256 hash. Integrated into document vault (`/documentos`) and document upload component.
- **Real Automation Engine:** Database-backed system with 8 scheduled rules, execution logging, and a live dashboard for managing tasks like BCV Sync, Fiscal Alerts, and Blockchain Batch Anchoring.
- **Alertas Fiscales Expandidas:** Monitors 30+ Venezuelan fiscal obligations from various governmental entities, detailing penalties and legal bases.
- **Alertas Regulatorias — Gacetas y Asamblea Nacional:** Monitors legislative changes from 8+ Official Gazettes and 8+ National Assembly changes, providing multi-channel notifications.
- **Seasonal Theming System:** Auto-detects Venezuelan holidays and special dates to show themed decorations. Config in `src/lib/seasonal-themes.ts`, provider in `src/components/seasonal-theme-provider.tsx`, decorations in `src/components/seasonal-decorations.tsx`. Supports 10 events: Año Nuevo, San Valentín, Carnavales, Semana Santa, Día del Trabajador, Día de las Madres, Día del Padre, Independencia (5 de Julio), Halloween, Navidad. Features: floating emoji particles, accent color line, seasonal greeting in dashboard, dismissible banner. Users can toggle decorations on/off (persisted in localStorage). Easter-dependent events (Carnavales, Semana Santa) auto-calculate dates.
- **Admin Message Endpoint:** POST `/api/admin/send-message` allows authenticated users to send personalized emails to any recipient using the System Kyron email template. Requires `to` and `message` params.
- **Sistema de Planes con Límites:** Offers 4 subscription plans (Starter, Profesional, Empresarial, Kyron MAX) with progressive limits on 17 controlled resources (AI queries, fiscal alerts, invoices, employees, etc.), ensuring only Kyron MAX offers unlimited access.
- **Facturación Homologada SENIAT (Providencia 0071):** Billing system compliant with Venezuelan administrative provision SNAT/2011/00071, including control numbers, series, document types, payment conditions, tax bases, dual currency support, and specific legends.
- **Inmutabilidad Fiscal de Documentos (SENIAT):** Implements multi-layered immutability for issued fiscal documents (invoices, credit/debit notes) using SHA-256 fiscal hashes, database flags, and PostgreSQL triggers to prevent unauthorized modifications or deletions, adhering to Providencia SNAT/2011/00071.

## External Dependencies
- **Database:** PostgreSQL
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Two primary accounts with mutual backup:
  - **Gmail** (`noreplysystemkyron@gmail.com`): Verification codes, notifications, general emails. Backup for alerts when Hotmail fails.
  - **Hotmail/Outlook** (`alertas_systemkyron@hotmail.com`): All alerts. Backup for verification/notifications when Gmail fails.
  - Provider order for verification/general: Gmail → Outlook → SMTP → Resend.
  - Provider order for alerts: Outlook → Gmail → SMTP → Resend.
  - Connector clients fetch all connections without `connector_names` filter to avoid 401 errors.
- **AI Integrations:** Gemini, OpenAI, Anthropic Claude (via Replit AI Integrations)
- **SMS:** Twilio
- **WhatsApp:** Twilio
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API
- **Excel Export:** `exceljs`
- **QR Generation:** `api.qrserver.com`
- **Blockchain:** ethers.js v6 (Polygon/Ethereum/BSC)

## Environment Setup Status
**Configured:**
- DATABASE_URL (PostgreSQL provisioned)
- TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, TWILIO_MESSAGING_SERVICE_SID
- GMAIL_USER (noreplysystemkyron@gmail.com)
- SESSION_SECRET
- ADMIN_ALERT_EMAIL

**Pending Configuration:**
- Gmail Connector: OAuth needs to be authorized via Replit Integrations panel (for sending verification codes)
- Outlook Connector: OAuth needs to be authorized via Replit Integrations panel (for sending alerts from alertas_systemkyron@hotmail.com)
- GMAIL_APP_PASSWORD: Required for SMTP fallback if Gmail connector fails
- RESEND_API_KEY: Optional, last-resort email fallback
- JWT_SECRET: Uses dev fallback in development; must be set for production
- BLOCKCHAIN_RPC_URL, BLOCKCHAIN_PRIVATE_KEY: Required for blockchain anchoring feature
- DB_INIT_SECRET, ADMIN_PROMOTE_SECRET, CRON_SECRET: Administrative secrets

## Email System Architecture
Two-account fallback system:
1. **Verification/General emails**: Gmail (OAuth) → Outlook → Gmail (SMTP) → Resend
2. **Alert emails**: Outlook → Gmail (OAuth) → Gmail (SMTP) → Resend
- Gmail: noreplysystemkyron@gmail.com
- Hotmail/Outlook: alertas_systemkyron@hotmail.com