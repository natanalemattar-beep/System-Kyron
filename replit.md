# System Kyron v2.8.2 - Ecosistema Corporativo

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
- **Database Schema:** A comprehensive PostgreSQL schema with over 60 tables is centralized in `src/lib/db-schema.ts` and initialized automatically on server startup.
- **API Routes:** A robust set of API routes is provided for authentication, real-time KPIs, CRUD operations across various modules (banking, invoicing, clients, employees, payroll, declarations, retentions, BCV rates, personal documents, civil requests, eco-credits, telecom, legal documents, and notifications).
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