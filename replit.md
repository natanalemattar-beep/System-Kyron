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
- Application routes are organized under `src/app/[locale]/` with grouped routes for various modules.
- Visually driven landing pages, intuitive mobile sidebar, redesigned Login/Dashboard, and dynamic pricing display.
- Custom form components for registration (prefix selectors, RIF/Cédula lookup), reusable document upload, and Venezuela geography data for cascading dropdowns.
- Kyron Chat provides context-aware AI chat with 10+ identity modes.
- Consistent heading sizes and an adaptive performance system.
- Themed screenshots for landing pages and AI-generated illustrations for services.
- Comprehensive welcome and per-module tutorial systems.
- Seasonal theming system for Venezuelan holidays.

**Technical Implementations:**
- **Database Layer:** PostgreSQL schema v3.1.0 with 80+ tables, GIN indexes for JSONB metadata columns, 40+ composite/partial indexes, supporting batch operations, upserts, and pagination.
- **API Routes:** Over 60 API routes for authentication, KPIs, and CRUD operations. Includes `/api/solicitudes` for generic service requests and `/api/arqueo-caja` for cash register closings. All 40+ action buttons across every module now wired to real API persistence (zero toast-only fake saves remain).
- **Authentication:** JWT utilities with 2FA (email, SMS, WhatsApp), challenge tokens, optional "access key," and magic link verification.
- **Security:** CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Permissions-Policy, rate limiting with brute-force lockout, memory-safe maps, password complexity, input sanitization, and parameterized SQL.
- **Payment Methods:** Support for 26+ payment gateways and 29 Venezuelan banks.
- **Performance Optimizations:** Lazy loading, dynamic imports, loading skeletons, Next.js image optimization, CSS animations, WebP images, adaptive performance, smart loading screens, IntersectionObserver, in-memory TTL cache, and optimized database queries with composite indexes.
- **Enhanced Audit Trail & Blockchain Integration:** Records field-level changes with SHA-256 hashing and Merkle tree batch anchoring for critical entries on Polygon/Ethereum/BSC.
- **Real RIF/Cédula Validation:** Uses Venezuelan modulo-11 check digit algorithm for RIF and strict format validation for Cédula.
- **Route Protection:** Authentication required for sensitive pages.
- **Alert Notifications:** Asynchronously sends alerts via email, WhatsApp, and SMS based on user preferences.
- **Modules:** Includes Permisología, Carnets & Tarjetas, Telecom, Marketing, Informática/IT, Marco Legal Venezuela, Contabilidad Avanzada (10 sub-modules), and HR Module Expansion.
- **Settings Page:** Allows user configuration of animation, navigation, notification, fiscal, and company data.
- **Document Authenticity Verification (AI-Powered):** Multi-layer verification using Claude Vision AI for Venezuelan documents, checking integrity, metadata, and visual content.
- **Real Automation Engine:** Database-backed system with 9 scheduled rules (BCV Sync, Fiscal Alerts, Regulatory Monitor, Health Check, Blockchain Batch, Session Cleanup, Invoice Reminders, Activity Digest, Email Automation), execution logging, and a live dashboard.
- **Automated Email System:** 10 email automation templates (welcome, verification, invoice issued/overdue, payroll, contract signed, fiscal alert, weekly summary, payment reminder, plan change) backed by `email_automaticos` table with scheduling, logging, and multi-channel delivery (Gmail, Outlook, SMS, WhatsApp).
- **Notifications System:** `notificaciones` table with typed notifications (info, alert, billing, fiscal, system, welcome, reminder), priority levels, multi-channel delivery, and JSONB metadata.
- **Alertas Fiscales Expandidas:** Monitors 30+ Venezuelan fiscal obligations.
- **Alertas Regulatorias:** Monitors legislative changes from Gacetas and National Assembly.
- **Admin Message Endpoint:** POST `/api/admin/send-message` for sending personalized emails.
- **Sistema de Planes con Límites:** 4 subscription plans with progressive resource limits.
- **Facturación Homologada SENIAT (Providencia 0071):** Billing compliant with Venezuelan regulations, including fiscal hashes and immutability.
- **Multi-Currency Display:** `CurrencyContext` (`src/lib/currency-context.tsx`) provides VES/USD/EUR display conversion across all billing and dashboard pages. `CurrencyProvider` is in admin and ventas layouts. `CurrencySelector` and `CurrencySelectorCompact` components allow switching. All amounts are stored/submitted in VES; display conversion is reference-only using static exchange rates. Pages using it: facturacion, proformas, facturacion-credito, nota-debito, nota-credito, dashboard-empresa.

## External Dependencies
- **Database:** PostgreSQL
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** Framer Motion
- **Email Services:** Gmail, Hotmail/Outlook, SMTP, Resend (with a two-account fallback system)
- **AI Integrations (Multi-Provider):** Three AI providers strategically distributed via Replit AI Integrations:
  - **Anthropic Claude** (`src/ai/anthropic.ts`): Kyron Chat conversational AI, document verification (vision/multimodal), automated data entry from images
  - **Google Gemini** (`src/ai/gemini.ts`): Document generation (legal documents, fiscal chat, Gaceta 6952 consultant)
  - **OpenAI** (`src/ai/openai.ts`): Business analysis & insights (dashboard analysis, sales strategies, sentiment analysis, transaction categorization)
- **SMS:** Twilio
- **WhatsApp:** Twilio
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API
- **Excel Export:** `exceljs`
- **QR Generation:** `api.qrserver.com`
- **Blockchain:** ethers.js v6 (Polygon/Ethereum/BSC)