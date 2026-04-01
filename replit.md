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
- **Authentication:** JWT utilities with 2FA via email, SMS, or WhatsApp (3-channel verification). Includes a challenge token for SMS/WhatsApp resend requests and an optional "access key" to skip 2FA.
- **Security:** Implemented security headers, rate limiting, input validation, and parameterized SQL.
- **Payment Methods:** 26+ payment gateways organized into International, Cryptocurrency, and Venezuelan categories, supporting 29 Venezuelan banks.
- **Performance Optimizations:** Lazy loading, dynamic imports, loading skeletons, Next.js image optimization, CSS-based animations, and WebP images. Includes an Adaptive Performance System that detects device tiers to adjust animation complexity.
- **Scroll Lock Fix:** Custom hook `useRemoveScrollLock` for Radix UI dialogs, ensuring page scrollability.
- **Enhanced Audit Trail & Blockchain Integration:** Records detailed field-level changes with SHA-256 hashing and Merkle tree batch anchoring for critical and high-risk entries, supporting Polygon/Ethereum/BSC chains.
- **Real RIF/Cédula Validation:** Uses Venezuelan modulo-11 check digit algorithm for RIF and strict format validation for Cédula.
- **Route Protection:** Authentication is required for sensitive pages.
- **Alert Notifications:** Asynchronously sends alerts via email, WhatsApp, and SMS based on user preferences.
- **Modules:** Includes Permisología, Carnets & Tarjetas, Telecom, Marketing, Informática/IT, and Marco Legal Venezuela.
- **Contabilidad Avanzada:** 10 modules covering Financial Statements, Chart of Accounts, Journal Entries, Business Budgeting, Guided Financial Close, Financial Indicators, Fixed Asset Depreciation, Cost Centers, SENIAT Export, and Accountant's Opinion.
- **HR Module Expansion (Bienestar Laboral):** Features personnel projects, motivational systems, vacation planning, procedure manuals, corporate org charts, and labor contracts.
- **Settings Page:** Allows users to configure animation, navigation, notification, fiscal, and company data preferences.
- **Real Automation Engine:** Database-backed system with 8 scheduled rules, execution logging, and a live dashboard for managing tasks like BCV Sync, Fiscal Alerts, and Blockchain Batch Anchoring.
- **Alertas Fiscales Expandidas:** Monitors 30+ Venezuelan fiscal obligations from various governmental entities, detailing penalties and legal bases.
- **Alertas Regulatorias — Gacetas y Asamblea Nacional:** Monitors legislative changes from 8+ Official Gazettes and 8+ National Assembly changes, providing multi-channel notifications.
- **Sistema de Planes con Límites:** Offers 4 subscription plans (Starter, Profesional, Empresarial, Kyron MAX) with progressive limits on 17 controlled resources (AI queries, fiscal alerts, invoices, employees, etc.), ensuring only Kyron MAX offers unlimited access.
- **Facturación Homologada SENIAT (Providencia 0071):** Billing system compliant with Venezuelan administrative provision SNAT/2011/00071, including control numbers, series, document types, payment conditions, tax bases, dual currency support, and specific legends.
- **Inmutabilidad Fiscal de Documentos (SENIAT):** Implements multi-layered immutability for issued fiscal documents (invoices, credit/debit notes) using SHA-256 fiscal hashes, database flags, and PostgreSQL triggers to prevent unauthorized modifications or deletions, adhering to Providencia SNAT/2011/00071.

## External Dependencies
- **Database:** PostgreSQL
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Gmail, Outlook/Microsoft, Resend
- **AI Integrations:** Gemini, OpenAI, Anthropic Claude (via Replit AI Integrations)
- **SMS:** Twilio
- **WhatsApp:** Twilio
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API
- **Excel Export:** `exceljs`
- **QR Generation:** `api.qrserver.com`
- **Blockchain:** ethers.js v6 (Polygon/Ethereum/BSC)