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
- The system should support both `{destino, codigo}` and `{method, email, phone, code}` formats for `/api/auth/verify-code`.

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
- **Database Schema:** A comprehensive PostgreSQL schema with over 80 tables.
- **Database Layer:** Includes helpers for batch operations, upserts, existence checks, pagination, and health checks.
- **API Routes:** Over 60 API routes for authentication, KPIs, and CRUD operations.
- **Authentication:** JWT utilities with 2FA via email, SMS, or WhatsApp (3-channel verification). Users with a verified phone number can choose between email, SMS, or WhatsApp for receiving OTP codes. A challenge token (HMAC-signed) binds SMS/WhatsApp resend requests to a valid login session to prevent abuse. An optional "access key" allows skipping 2FA entirely.
- **Security:** Implemented security headers, rate limiting, input validation, and parameterized SQL.
- **Payment Methods:** 26+ payment gateways organized in 3 categories: Internacional (PayPal, Zelle, Stripe, Zinli, Wise, tarjetas), Criptomonedas (Bitcoin, Ethereum, USDT, USDC, Binance Pay, Solana, TRON, Polygon, Litecoin, Reserve), and Venezuela (Pago Móvil C2P, transferencias, Biopago, POS, QR BCV, débito inmediato, Kyron Wallet). 29 Venezuelan banks connected. Tabbed UI with stats, expandable card details, and security/protocol sections.
- **Performance Optimizations:** Lazy loading, dynamic imports, loading skeletons, Next.js image optimization, CSS-based animations, and WebP images. Background animations are optimized using pure CSS.
- **Scroll Lock Fix:** The WelcomeTutorial dialog uses a `useRemoveScrollLock` hook to counteract Radix UI's `react-remove-scroll` body scroll lock, ensuring the landing page remains scrollable while the tutorial is displayed. CSS uses `overflow-x: clip` (not `hidden`) on html/body to avoid unintended scroll containers. The DynamicBackground fixed overlay has `pointer-events-none`.
- **Adaptive Performance System:** Detects device tiers (low/mid/high) based on hardware and network capabilities to dynamically adjust animation complexity and visual effects for optimal performance. Includes media queries for reduced motion, touch devices, and slow refresh rates.
- **Enhanced Audit Trail:** Records detailed field-level changes with blockchain proof-of-existence hashing for critical and high-risk entries.
- **Blockchain Integration:** SHA-256 hashing of audit entries, Merkle tree batch anchoring, support for Polygon/Ethereum/BSC chains. Critical tables (transacciones_pagos, facturas, declaraciones_iva/islr, retenciones, nomina, contratos, users) and high/critical risk operations automatically generate blockchain proofs. API at `/api/blockchain` for stats, proofs listing, verification, and batch anchoring. Env vars: `BLOCKCHAIN_RPC_URL`, `BLOCKCHAIN_PRIVATE_KEY`, `BLOCKCHAIN_CHAIN` (default: polygon_amoy).
- **Real RIF/Cédula Validation:** Uses Venezuelan modulo-11 check digit algorithm for RIF and strict format validation for Cédula.
- **Route Protection:** Authentication is required for sensitive pages.
- **Alert Notifications:** Asynchronously sends alerts via email, WhatsApp, and SMS based on user preferences.
- **Modules:** Includes Permisología, Carnets & Tarjetas, Telecom (with data usage visualization, plan comparisons, network status, recharge), Marketing (investment dashboard, campaign management, social media analytics, SEO/traffic analytics), and Marco Legal Venezuela (fiscal entities, laws, tax rates, calendar).
- **HR Module Expansion (Bienestar Laboral):** Features personnel projects, motivational systems, vacation planning, procedure manuals, corporate org charts, and labor contracts.
- **Settings Page:** Allows users to toggle animation reduction and navigation layout preferences, manage notification settings, fiscal parameters, and company data.
- **Real Automation Engine (v2.9):** Database-backed automation system with 8 scheduled rules, execution logging, and live dashboard. Rules: BCV Sync (6h), Fiscal Alerts (4h), DB Health Check (2h), Blockchain Batch Anchor (12h), Session Cleanup (daily), Invoice Reminders (8h), Activity Digest (daily), Regulatory Alerts (6h). Engine runs via `instrumentation.ts` on hourly intervals. API: `/api/automations` (GET rules/stats/logs, POST execute/toggle/run_scheduled). DB tables: `automation_rules`, `automation_logs`. Dashboard at `/automatizaciones` with real-time stats, per-rule execution history, manual execute/pause controls.
- **Alertas Fiscales Expandidas:** 30+ obligaciones fiscales de todos los entes gubernamentales venezolanos con riesgo de multas: SENIAT (IVA, ISLR, IGTF, IGP, retenciones, facturación), IVSS (seguro social), INCES (aportes 2%), BANAVIH/FAOV (vivienda), INPSASEL (seguridad laboral), MINPPTRASS (solvencia laboral, utilidades), SUNDDE (precios justos), SUNAGRO (guías SADA), SENCAMER (normas COVENIN), MPPS (permiso sanitario), CONATEL (habilitaciones), Alcaldías (IAE/patente, licencias, inmuebles urbanos, aseo), MINEC (certificación ambiental, RASDA). Cada obligación incluye monto de multa, base legal y descripción del riesgo. API: `/api/alertas-predictivas` (GET con vista=obligaciones|riesgos-multas).
- **Alertas Regulatorias — Gacetas y Asamblea Nacional:** Monitor de cambios legislativos con 8+ Gacetas Oficiales y 8+ cambios de la Asamblea Nacional. Incluye Gaceta 6.952 (Reforma Tributaria 2026), ajuste UT, reforma LOTTT, providencias SUNDDE/SUNAGRO, facturación electrónica, régimen cambiario, certificación ambiental. Cambios AN: reforma COT, teletrabajo, protección de datos, incentivos tecnológicos, grandes contribuyentes, control de precios, economía digital/criptoactivos, zonas libres. API: `/api/alertas-regulatorias` (GET con vista=resumen|gacetas|asamblea|alertas|riesgos-multas, POST para verificar). Notificaciones multicanal (email, WhatsApp, SMS). Automatización cada 6 horas.

## External Dependencies
- **Database:** PostgreSQL
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** CSS keyframe animations, Framer Motion (select components, performance-aware)
- **Email Services:** Gmail (for OTP/2FA), Outlook/Microsoft (for alerts/notifications), Resend (fallback)
- **AI Integrations:** Gemini, OpenAI, Anthropic Claude (all via Replit AI Integrations)
- **SMS:** Twilio (for OTP/2FA and system alerts)
- **WhatsApp:** Twilio (for OTP/2FA and system alerts)
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API
- **Excel Export:** `exceljs`
- **QR Generation:** `api.qrserver.com`
- **Blockchain:** ethers.js v6 (Polygon/Ethereum/BSC proof-of-existence anchoring)