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

## System Architecture
The system is built on Next.js 15.5.14 (App Router) with TypeScript and Turbopack. It uses `next-intl` for internationalization, Tailwind CSS and shadcn/ui for styling, and PostgreSQL as the database. Authentication uses JWT with HTTP-only cookies. Typography uses Inter (sans-serif) and JetBrains Mono (monospace) via `next/font/google`, mapped to CSS variables `--font-inter` and `--font-jetbrains-mono`.

**UI/UX Decisions:**
- Application routes are organized under `src/app/[locale]/` with grouped routes for various modules.
- Features premium cinematic landing page (15 sections, dark-first design): hero with rotating gradient text + floating metric cards + animated blur orbs + dashboard screenshot, trust numbers banner with glassmorphism animated counters (5 metrics), "¿Por qué System Kyron?" differentiator section with 6 interactive cards + comparison table vs generic ERPs, interactive modules grid (24 modules with category filter tabs + search), Triple AI Engine showcase (Claude/GPT/Gemini capabilities with live demo chat), speed/productivity benchmarks with animated bars + comparison chart, showcase gallery with hover glow effects + theme-aware screenshots, pricing section with monthly/annual toggle (Starter/Profesional/Enterprise), compliance section (6 regulations: SENIAT/BCV/LOTTT/CONATEL/VEN-NIF/SUDEBAN + live security status), integrations strip (4 categories: banking/payments/telecom/tech), about us, comments with star ratings + avatar gradients, CTA with demo request form + guarantee badges, FAQ with search filter, and premium footer with module marquee + tech badges. Design system: dark backgrounds `#060a14→#080d18`, gradient CTAs `from-cyan-500 via-blue-600 to-violet-600`, glassmorphism cards `border-white/[0.06] bg-white/[0.02]`, section divider lines `via-{color}-500/15`. All sections use Framer Motion scroll animations with `useDevicePerformance` tier gating. Intuitive mobile sidebar, redesigned Login/Dashboard.
- Custom form components include registration (prefix selectors, RIF/Cédula lookup), reusable document upload, and Venezuela geography data for cascading dropdowns.
- All authentication pages support both light and dark themes, with a dark mode default and Apple-style liquid glass effects.
- Specific module pages use brand colors and varied color schemes for plan cards.
- Kyron Chat provides context-aware AI chat with 10+ identity modes, using Gemini Flash for personal portals and Claude Sonnet for business/admin portals.
- The system includes a comprehensive welcome and per-module tutorial system, and a unified seasonal calendar system (`src/lib/seasonal-themes.ts`) that auto-detects 10 Venezuelan/global holidays with computed dates (Easter-based via computus algorithm for Carnaval and Semana Santa, nth-Sunday for Día de las Madres/Padres). Each event defines particles, gradients, effects (snow/fireworks/none), and date ranges. `getActiveEvent()` returns the current event or null; consumed by `SeasonalThemeProvider`, `SeasonalDecorations`, and `DynamicBackground`.
- Consolidated Navigation: Header navigation is reorganized into 5 mega-groups: Finanzas, Talento, Legal, Negocio, and Sistema.
- Terminology: The platform consistently uses "CENTRO" instead of "NODO."
- Dark Mode Layouts: All 9 layout groups use `dark:from-[hsl(...)]` and `dark:to-[hsl(...)]` gradient variants.

**Integrations Manifest (`src/lib/integrations-manifest.ts`):**
All external integrations are documented in a single manifest file that serves as both runtime config and migration documentation. Required integrations: Anthropic (`src/ai/anthropic.ts`), OpenAI (`src/ai/openai.ts`), Gemini (`src/ai/gemini.ts`), Gmail (`src/lib/gmail-client.ts`), PostgreSQL (`src/lib/db.ts`). Optional: Outlook (`src/lib/outlook-client.ts`), Twilio (`src/lib/twilio-client.ts`), Google Calendar. AI providers check `AI_INTEGRATIONS_*_API_KEY` first, then fallback env vars. OAuth services (Gmail, Outlook, Calendar) use the Replit Connector pattern (`REPLIT_CONNECTORS_HOSTNAME`). Health check: `/api/integrations-health` runs live tests against all providers.

**Technical Implementations:**
- **Database Layer:** PostgreSQL schema v3.3.0 with 95+ tables (including marketing: `campanas_marketing`, `email_campaigns`, `email_lists`, `embudos_ventas`, `etapas_embudo`, `redes_sociales` and `desarrollo_personal` for career plans), GIN indexes for JSONB metadata, and numerous composite/partial indexes, supporting batch operations, upserts, and pagination. The `clientes` table includes marketing fields: `segmento`, `valor_estimado`, `satisfaccion`. Employee seed data has been removed — the system starts without fictitious employees.
- **API Routes:** Over 80 API routes for authentication, KPIs, and CRUD operations. New modules (v3.3.0): Legal (poderes, litigios, cumplimiento), Personal (historial-medico, seguros, vehiculos), Telecom (portabilidad, roaming, paquetes-adicionales), Empresa (proveedores, directorio-corporativo, flujo-aprobaciones), Facturación (cotizaciones, ordenes-compra, cobros). HR modules (Reclutamiento, Clima Organizacional, Desarrollo Personal) and Marketing module (campanas, email-campaigns, embudos, redes-sociales, dashboard) use real API data instead of hardcoded arrays.
- **Authentication:** JWT utilities with 2FA (email, SMS, WhatsApp), challenge tokens, optional "access key," and magic link verification. Portal-type enforcement: login API requires `portal` parameter (`personal` | `business`) and validates user `tipo` (`natural` vs `juridico`) against the portal — prevents cross-portal login with descriptive error messages and redirect buttons.
- **Security:** Implements CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Permissions-Policy, rate limiting with brute-force lockout, memory-safe maps, password complexity, input sanitization, and parameterized SQL. AES-256-GCM encryption (`src/lib/encryption.ts`) for sensitive PII at rest (phone numbers, addresses, representative details). `/api/security-status` endpoint provides live verification of 13 security controls. All landing page security claims are backed by real implementations (false E2E/biometrics claims removed).
- **Payment Methods:** Supports 26+ payment gateways and 29 Venezuelan banks, including SENIAT-compliant pasarelas with direct bank URL integration.
- **Performance Optimizations & Anti-Lag System:** Utilizes lazy loading, dynamic imports (framer-motion `dynamic()` on 4 heavy dashboard pages), loading skeletons, Next.js image optimization, CSS animations (no GPU-heavy filter blur transitions in framer-motion — removed for performance), WebP images, smart loading screens, IntersectionObserver, in-memory TTL cache with LRU eviction (middleware session cache: 500 max entries, 20s TTL, smart eviction at 80% capacity), reduced background blur element sizes, optimized database queries with 11+ custom indexes, `React.memo` on heavy chart components, batch INSERT for factura_items, `Promise.any` for parallel BCV rate fetching, `optimizePackageImports` for 32+ packages, and extended API cache TTLs (stats 60s, BCV rate 30min, tasa 10min). **Anti-Lag System:** Centralized adaptive performance pipeline with 3 tiers (high/medium/low). Detection runs once in `PerformanceProvider` (singleton) and distributes via context to all components. Detects: CPU cores, RAM, GPU tier (WebGL probe), connection quality, DPR, data-saver mode, `prefers-reduced-motion`. **Runtime FPS monitor** (`createFpsMonitor`) samples 90 frames after 2.5s warmup; auto-downgrades tier if FPS < 30 (→low) or < 45 (→one tier down), persists decision in localStorage for 6h. CSS vars injected per tier: `--blur-intensity`, `--glass-blur`, `--shadow-strength`, `--animation-speed`, `--transition-speed`, `--particle-opacity`, `--gradient-complexity`, `--hover-scale`, `--backdrop-blur`. `html[data-tier]` CSS rules kill animations, backdrop-blur, shadows, hover effects, seasonal particles on low/mid devices. Files: `src/lib/device-performance.ts` (detection + FPS monitor), `src/hooks/use-device-performance.ts` (context + singleton detector), `src/hooks/use-device-tier.ts` (GPU/connection/refresh-rate), `src/components/performance-provider.tsx` (merges both, injects CSS). Components consume `useDevicePerformance()` (context) for `tier`, `config.enableBlur`, `config.enableParticles`, etc.
- **Enhanced Audit Trail & Blockchain Integration:** Records field-level changes with SHA-256 hashing and Merkle tree batch anchoring on Polygon/Ethereum/BSC.
- **RIF/Cédula Validation:** Real Venezuelan modulo-11 check digit algorithm for RIF and strict format validation for Cédula.
- **Modules:** Includes Permisología (with 483+ permits across various organisms), Carnets & Tarjetas, Telecom, Marketing, Informática/IT, Marco Legal Venezuela, Contabilidad Avanzada (10 sub-modules), HR Module Expansion, and Viáticos (travel expense management).
- **Tool-Based Modules (v3.4.0):** 12 interactive calculator/simulator/analysis tools (no CRUD tables — all local useState, no DB):
  - **Legal:** Calculadora de Honorarios (fee calculator by case type/complexity/baremo), Calendario Legal (visual calendar with SENIAT/IVSS/FAOV deadlines by RIF digit)
  - **Personal:** Calculadora de Prestaciones LOTTT (antigüedad Art.142, vacaciones Art.190, bono vacacional Art.192, utilidades, intereses), Presupuesto Personal (income/expense tracker with categories and tips)
  - **Telecom:** Comparador de Planes (Movistar/Digitel/Movilnet side-by-side comparison), Diagnóstico de Red (speed test simulation with quality assessment)
  - **Empresa:** Organigrama Interactivo (visual org chart with add/remove/search), Calculadora de Costos Operativos (break-even analysis, fixed vs variable costs, margins)
  - **Facturación:** Simulador Fiscal (IVA 16%, IGTF 3%, ISLR retentions, IVA retentions, 5-tab all-in-one tax calculator), Análisis de Clientes (ABC classification, Pareto analysis, profitability ranking)
  - **Asesoría Contable:** Calendario Fiscal SENIAT (all deadlines by RIF terminal digit, 4 tabs), Ratios Financieros (liquidity, solvency, profitability, efficiency ratios with visual gauges)
- **Settings Page:** Allows user configuration of animation, navigation, notification, fiscal, and company data.
- **Global Search:** Command palette (⌘K) with 115+ searchable modules, accent-insensitive fuzzy scoring, text match highlighting, recent searches (localStorage), result count indicator, locale-aware navigation, and categorized grouping. Covers all contabilidad, tributos, libros, certificaciones, and ministerio routes.
- **Accessibility & UI Enhancements:** Scroll-to-Top button, custom scrollbars, improved focus states, and auto-generated breadcrumbs.
- **Document Authenticity Verification:** Multi-AI forensic analysis system using Claude, OpenAI, and Gemini Vision in parallel. 6-layer scoring (Integrity, Visual, Quality/Blur, Forensic, Metadata, Content) with AI consensus voting (unanimous/majority/divided). Auto-verifies on upload. Includes JPEG quality estimation, image dimension analysis, and path-traversal security protection.
- **Bank Connection & Auto-Sync:** Direct bank connection for 10 Venezuelan banks (Banesco, Mercantil, Provincial, BdV, BNC, BOD, Exterior, BFC, Bancaribe, Sofitasa) via Gmail email notification parsing. Automatic movement import with duplicate detection.
- **Bulk Movement Import:** Excel (.xlsx/.xls) and CSV file import with smart column detection, flexible date/amount parsing (Venezuelan formats), drag-and-drop UI, and downloadable CSV template.
- **Auto Journal Entries:** Automatic generation of double-entry journal entries from bank movements and invoices. Intelligent account classification using the chart of accounts (Plan de Cuentas). Tracks processed items via `referencia_doc` to prevent duplicates.
- **Real Automation Engine:** Database-backed system with 19 scheduled rules covering all modules (fiscal, RRHH, inventario, nómina, CxC/CxP, presupuestos, legal, seguridad, clientes), execution logging, and a live dashboard.
- **Automated Alert Categories:** Inventory (stock bajo/agotado), HR contracts (vencimientos 30d), vacations (acumulación excesiva), payroll (nómina pendiente), accounts receivable/payable (vencidas/próximas), budget (excedido >100%, cerca >85%), legal contracts (vencidos/próximos), security (login fallidos, IPs sospechosas), clients (inactivos 90d+, baja satisfacción).
- **Automated Email System:** 10 email automation templates with scheduling, logging, and multi-channel delivery.
- **Notifications System:** `notificaciones` table with typed notifications, priority levels, multi-channel delivery, and JSONB metadata.
- **Alerts:** Expanded Fiscal Alerts monitoring 30+ Venezuelan fiscal obligations and Regulatory Alerts for legislative changes.
- **Subscription Plans:** Four plans with progressive resource limits.
- **SENIAT Compliant Billing:** Facturación Homologada SENIAT (Providencia 0071) with fiscal hashes and immutability.
- **Dashboard Widgets:** Company dashboard includes Tax Calendar, Cuentas por Cobrar/Pagar, and Fiscal Status cards. Natural person dashboard includes Document Expiry Alerts and Eco-Credits chart. Both feature an Activity Timeline.
- **Financial Toolkit:** Floating calculator panel with USD↔VES converter (live BCV rate), IVA calculator (16%), IGTF calculator (3%), and ISLR retention calculator.
- **Live BCV Rate:** Always-visible exchange rate badge in the app header, auto-refreshing via DB-first fetch with fallbacks (PyDolar → ExchangeRate → DolarAPI).
- **Multi-Currency Display:** `CurrencyContext` provides VES/USD/EUR display conversion across billing and dashboard pages, with amounts stored in VES.
- **NUEVO Badge System:** Nav items support `badge` and `section` properties for dynamic display of "NUEVO" badges and subgroup headers.
- **Telecom Module:** Includes personal pages for internet/phone services and enterprise pages for dedicated plans, Centrex/SIP/VoIP, additional services (VPN/MPLS), and a provider comparison tool. Features CONATEL Regulatory Compliance module (homologation status, permit expiration) and advanced enterprise features like fleet geolocation, MDM, app restriction rules, and executive dashboards. `Reserva de Datos Panel` provides a data reserve for app usage.
- **Enterprise and Personal Security:** Dedicated pages for enterprise security (Centro de Seguridad, audit log, device management) and personal account security (2FA, active sessions).
- **Module-Variant Registration:** The `/register/asesoria-contable` page supports a `?modulo=` query param to customize the experience for different module types.
- **Profile Pages:** Natural users use `/perfil`, while empresa/admin users use `/perfil-empresa`, dynamically displaying user data based on authentication.
- **Dynamic User Identity:** All layout groups dynamically build the header user object, displaying `razon_social` for juridico users and `nombre + apellido` for natural users.
- **Hydration Safety:** Pages avoid `new Date()` or `Math.random()` in `useState` initializers or direct JSX, using `useEffect` for client-only values.

## External Dependencies
- **Database:** PostgreSQL
- **Internationalization:** `next-intl` — translation files live in `src/messages/{es,en}.json` (loaded by `src/i18n/request.ts`). The root `messages/` folder is NOT used at runtime.
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Gmail, Hotmail/Outlook, SMTP, Resend, Replit Google Mail connector
- **AI Integrations (Replit Managed):**
  - Anthropic Claude (Kyron Chat corporate, document verification) — with Gemini fallback
  - Google Gemini (Personal chat, fiscal chat, legal docs) — with OpenAI fallback
  - OpenAI (Dashboard analysis, sales strategies, sentiment analysis) — with Gemini fallback
  - All AI chat endpoints use SSE streaming with AbortController support
  - Rate limiters use periodic cleanup (every 5 min) to prevent memory leaks
  - Floating Kyron Chat (`voice-assistant.tsx`): localStorage persistence (`kyron-floating-chat-history`), MarkdownRenderer for AI responses, stop streaming button, auth guard on landing page
- **SMS:** Twilio
- **WhatsApp:** Twilio
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API
- **Excel/CSV Import:** `xlsx` (bank movement bulk import with smart column detection)
- **Excel Export:** `exceljs`
- **QR Generation:** `api.qrserver.com`
- **Blockchain:** ethers.js v6 (Polygon/Ethereum/BSC)