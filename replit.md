# System Kyron v2.8.5 - Ecosistema Corporativo

### Landing Page Redesign (v2.8.3)
The landing page was redesigned to be less text-heavy and more visual/scannable:
- **Hero**: Simplified headline ("Todo tu negocio en un solo lugar"), short subtitle, fiscal badges (IVA/IGTF/BCV/VEN-NIF). i18n keys: `title_line1/2/3`, `badge`, `subtitle`, `slogan`, `cta_main`, `cta_secondary`.
- **Services (Ecosistema)**: Compact 4-column icon grid (12 modules), each card shows icon + title + tag. No long descriptions. Rounded-3xl cards with gradient icon boxes.
- **About (Nosotros)**: Stats counters (Usuarios/Cumplimiento/Empresas) + 3 pillar cards (AES-256/VEN-NIF/Gemini 2.0). Removed mission/vision paragraphs, tech stack section, and image.
- **FAQ**: Reduced from 7 to 5 questions with shorter answers.
- **CTA**: Simplified heading ("¿Listo para empezar?") with shorter description.
- **Translation files**: `src/messages/es.json` and `src/messages/en.json` (NOT root `messages/`).
- **Google Calendar**: Connected via connector `ccfg_google-calendar_DDDBAC03DE404369B74F32E78D`. Client helper: `getUncachableGoogleCalendarClient()`.


### Background Optimization (v2.8.5)
- **DynamicBackground:** Removed Framer Motion (rotating logo, animated glow). Now pure CSS with static radial gradients and reduced-opacity HUD grid.
- **Hero Section:** Removed JS-animated blur blobs (500px/400px, blur-120px/100px). Replaced with static CSS divs (400px/350px, blur-100px/80px). Unified bg color to `#020810` for seamless transition to scroll section. Added entrance animations (opacity/y) on hero content.
- **ScrollCinematicSection:** 60 Framer Motion particles → 18 CSS-animated particles (`animate-float-particle`). Removed CentralOrb (dynamic blur 60-100px) → AmbientGlow (static gradient, no blur filter). Removed ScanLine (boxShadow glow). Removed duplicate HUD grid (already in DynamicBackground). Removed per-card blur/scale/rotateX transforms (simplified to opacity+y). Added `will-change` hints on scroll-animated elements. Scroll-hint dot uses CSS animation instead of Framer Motion.
- **ServicesSection:** Reduced blur-3xl → blur-xl on image glows, reduced inset from -6 to -4, removed scale on hover.
- **CSS additions:** `@keyframes float-particle` and `@keyframes scroll-dot` in globals.css.
- **Result:** Unified #020810 color palette across hero→scroll→services transitions. Drastically reduced GPU compositing layers and JS animation overhead.

### Overview
System Kyron is an integrated technological ecosystem designed for comprehensive corporate management, specifically tailored for the Venezuelan market. It covers accounting, HR, legal, sales, telecommunications, and IT, ensuring compliance with local regulations such as VEN-NIF/SENIAT, IVA 16%, IGTF 3%, and ISLR 34%. The project aims to provide a unified platform for businesses to manage their operations efficiently and compliantly within Venezuela.

### User Preferences
- All buttons in the application should have functional handlers (`onClick`).
- All `alert()` calls should be replaced with toast notifications.
- API endpoints for `inventario`, `clientes`, `declaraciones_iva`, `declaraciones_islr`, and `retenciones` must align with the corrected schema fields.
- Financial routes must include `try/catch` blocks for error handling and use `NaN-safe parseFloat/parseInt`.
- **Never use hardcoded `text-white`** on page headings — use `text-foreground` for theme compatibility. Only use `text-white` inside truly dark/colored containers (buttons, colored cards, active tab triggers).
- All 6 layouts use `PageTransition` from `src/components/ui/motion.tsx` for SSR-safe page entrance animations (mount-gated, respects `prefers-reduced-motion`).
- Use `MotionContainer` for scroll-triggered reveals, `StaggerContainer`/`StaggerItem` for staggered card grids, `CountUp` for animated numbers, `FloatingElement` for ambient motion.
- CSS utility classes: `hover-lift`, `hover-glow`, `hover-scale`, `btn-press`, `icon-hover` for micro-interactions. Stagger delays: `.stagger-1` through `.stagger-8`.
- The system should support both `{destino, tipo}` and `{method, email, phone}` formats for `/api/auth/send-code`.
- The system should support both `{destino, codigo}` and `{method, email, phone, code}` formats for `/api/auth/verify-code`.

### System Architecture
The system is built on Next.js 15 (App Router) with TypeScript, utilizing `next-intl` for internationalization with mandatory locale prefixes (`/es/`, `/en/`). Styling is managed with Tailwind CSS and shadcn/ui. PostgreSQL serves as the database (Replit integrated), accessed directly via `node-postgres` without an ORM. Authentication is handled using JWT with HTTP-only cookies. Framer Motion is used for animations.

**UI/UX Decisions:**
- All application routes are organized under `src/app/[locale]/` for i18n support.
- Grouped routes include `(auth)`, `(admin)`, `(hr)`, `(legal)`, `(main)`, `(natural)`, `(socios)`, `(telecom)`, and `(ventas)`.
- A mobile sidebar is implemented with smooth scrolling for landing pages and contextual navigation for the main application, including user profile, quick actions, and automatic closure on navigation.
- **Admin nav reorganized (v2.8.3):** Consolidated from 7 groups to 5: Contabilidad (8 items), Fiscal (10 items), Permisos (6 items — NEW), Planificación (6 items), Sistema (1 item). Dropdown widths auto-adjust for larger groups (560px vs 400px).

**Technical Implementations:**
- **Database Schema:** A comprehensive PostgreSQL schema with 70+ tables is centralized in `src/lib/db-schema.ts` and initialized automatically on server startup. v2.8.5 added: `migration_versions`, `system_health_log`, `auditoria_detallada`, `dashboard_cache`, `reportes_generados`, `alertas_programadas`, `api_request_log`, `backup_log`, `webhooks`, `integraciones_externas`, `plantillas_documento`, `presupuestos`, `metas_kpi`.
- **Database Layer (`src/lib/db.ts`):** Enhanced with `batchInsert`, `upsert`, `exists`, `count`, `paginate`, `healthCheck`, `getQueryMetrics`, `queryWithCount` helpers. Includes slow query detection (>500ms), pool metrics, and connection health monitoring.
- **Demo Seed Data (`src/lib/db-seed.ts`):** Realistic Venezuelan business data for clients, providers, bank accounts, inventory, invoices, employees, BCV rates, chart of accounts, bank movements, and notifications. Triggered via `POST /api/db-seed`.
- **Health Check (`GET /api/db-health`):** Returns DB latency, pool stats, PostgreSQL version, uptime, query metrics, and per-table record counts.
- **Enhanced Audit Trail:** `logAudit()` in `activity-logger.ts` records detailed field-level changes with risk levels, previous/new data in JSONB, and session tracking.
- **API Routes:** A robust set of 60+ API routes for authentication, real-time KPIs, CRUD operations across various modules (banking, invoicing, clients, employees, payroll, declarations, retentions, BCV rates, personal documents, civil requests, eco-credits, telecom, legal documents, notifications, health checks, and seeding).
- **Authentication:** JWT utilities (`createToken`, `verifyToken`, `getSession`) are located in `src/lib/auth/index.ts`, with an `AuthProvider` React context. Session cookies (`sk_session`) are httpOnly and secure.
- **Security:** Implemented security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, HSTS, X-DNS-Prefetch-Control), in-memory rate limiting for critical endpoints, input validation (email, strong passwords, sanitization, payload size limits), anti-enumeration techniques, parameterized SQL queries, and XSS protection.
- **Payment Methods:** Integrated various payment methods including PayPal, Zinli, Zelle, Pago Móvil / C2P, Venezuelan Bank Transfers, Binance Pay / Crypto, Debit/Credit Cards, and a proprietary Kyron Digital Wallet.
- **Special Pages:**
    - `/es/sector-privado-system-kyron`: Dedicated page for the Zedu Model: AutoMind AI project, including team, problem analysis, solution, budget, allies, action plan, and impact, with Word download and print functionality.
    - `/es/manual-usuario`: User manual with 21 chapters, linking directly to the Zedu Model document.

### External Dependencies
- **Database:** PostgreSQL (Replit integrated)
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose` (for JWT)
- **Animations:** Framer Motion
- **Email Services (Cascading):**
    - Microsoft Outlook (via Replit connector `conn_outlook` and `@microsoft/microsoft-graph-client` SDK)
    - Gmail (via Replit connector `ccfg_google-mail` and direct REST API)
    - Resend (transactional fallback with `RESEND_API_KEY`)
- **AI Integrations:**
    - Gemini 2.0 Flash (for fiscal chat and general chat, using `AI_INTEGRATIONS_GEMINI_API_KEY`, `GEMINI_API_KEY`, or `GOOGLE_API_KEY`)
    - OpenAI GPT-4o (for dashboard analysis, using `AI_INTEGRATIONS_OPENAI_API_KEY`)
- **SMS:** Twilio (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`) - optional
- **BCV Rate Auto-fetch:** Public sources like PyDolar BCV and ExchangeRate API.
- **Excel Export:** `exceljs` (replaced `xlsx` for security)

### Bug Fixes (v2.8.5)
- **Invalid hook call fix:** Moved 4 inline `useTransform()` calls from JSX in `scroll-cinematic-section.tsx` to the top level of `ScrollCinematicSection` component. Calling hooks inside JSX violates React's Rules of Hooks and caused "Invalid hook call" + hydration mismatch errors.
- **Safe JSON parsing:** Added `res.ok` guards before `.json()` calls in `about-us-section.tsx`, `comments-section.tsx`, and `auth/context.tsx` to prevent `SyntaxError: Unexpected end of JSON input` during initial compilation.
- **Loading screen stability:** Rewrote `loading-screen.tsx` to use `useRef` for `onComplete` callback, preventing double-firing.
- **DB health endpoint:** Restricted `/api/db-health` to admin-only access.

### Performance Optimizations (v2.8.3)
- **Lazy ChatDialog:** All 7 layouts use `LazyChatDialog` (`src/components/chat-dialog-lazy.tsx`) with `next/dynamic` + `ssr: false` to defer loading until client-side.
- **Lazy VoiceAssistant:** Locale layout uses `LazyVoiceAssistant` (`src/components/voice-assistant-lazy.tsx`) with same pattern.
- **Landing lazy sections:** Dynamic imports for heavy landing sections (features, FAQ, etc.) in the landing page.
- **Loading skeletons:** `loading.tsx` files for `dashboard-empresa` and `contabilidad` routes provide instant skeleton UI during navigation.
- **Next.js config:** Compression enabled, `optimizePackageImports` for lucide-react/framer-motion/recharts, AVIF/WebP image formats, static asset cache headers.
- **DB pool:** `statement_timeout` configured, `transaction()` helper available in `src/lib/db.ts`.

### Registration Page Deep Redesign (Telecom-Inspired)
- **File:** `src/app/[locale]/(auth)/register/natural/page.tsx`
- **Inspiration:** Digitel.com.ve (clean minimalism, warm elegance) + Movistar.com.ve (bold typography, pill tabs, icon-forward), combined into something original.
- **Layout:** No traditional Card wrapper — uses `rounded-3xl bg-card shadow-2xl` container with decorative gradient orbs (blur-3xl) in background.
- **Header:** "System Kyron" brand label + gradient dash, "Crear tu Cuenta" heading, step counter pill (1/4).
- **Step navigation:** Pill-shaped tab buttons (like Movistar's category tabs) with icons (User, Phone, Lock, Fingerprint). Active tab: primary color + shadow. Completed: primary/10 tint, clickable. Future: muted.
- **Progress bar:** Gradient bar (primary → blue-500 → emerald-500), smooth 700ms transition.
- **Section banners:** Rounded-2xl cards with gradient icon boxes (blue, emerald, orange, violet) + title + subtitle.
- **Inputs:** `rounded-xl bg-muted/30 border-border/50 h-11` — soft, rounded, telecom-style. Focus transitions to `bg-background`.
- **Labels:** Uppercase, tracking-wider, 13px, semibold — clean corporate style.
- **Footer buttons:** `rounded-2xl h-12` with step-specific gradients (primary→blue, amber→orange, emerald→teal). Shadow effects.
- **Step 3 password:** Visual strength meter (4-bar indicator: red→amber→blue→emerald).
- **Step 4 verification:** Gradient icon cards for email/SMS selection, rounded-2xl code input, violet gradient buttons.
- **Success screen:** Separate layout with gradient orbs, emerald gradient checkmark, gradient text "System Kyron!", icon cards for next steps, full-width gradient CTA.
- **Accessibility:** `aria-label` on step tabs, password toggles. Step tab text uses `aria-hidden` so screen readers use the aria-label.
- **Constants:** `FORM_STEPS = TOTAL_STEPS - 1` to avoid hardcoded step counts.

### Plan Selection Cards (Registration)
- **Telecom** (`register/telecom/page.tsx`): Step 2 replaced dropdown with 6 rich plan cards (Básico 4G, Estándar LTE, Pro 5G, Empresarial 5G, Solo Datos, Internacional). Each card shows: name badge, price, description, feature checklist, and selection indicator. "Popular" badge on Estándar LTE.
- **Contabilidad** (`register/contabilidad/page.tsx`): New step 1 added (TOTAL_STEPS 5→6) with 4 plan cards (Básico, Profesional, Empresarial, Premium). Schema extended with `plan_contable` field. "Recomendado" badge on Profesional. Plan sent in onSubmit payload.
- **Card UI:** `rounded-xl border` with selection state (`border-primary/blue-500 ring-1 shadow-lg`), radio-style circle indicator, checkmark feature lists, `aria-label` on each card button.