# System Kyron v2.8.5 - Ecosistema Corporativo

## Overview
System Kyron is an integrated technological ecosystem for comprehensive corporate management, specifically tailored for the Venezuelan market. It covers accounting, HR, legal, sales, telecommunications, and IT, ensuring compliance with local regulations (VEN-NIF/SENIAT, IVA 16%, IGTF 3%, ISLR 34%). The project aims to provide a unified platform for businesses to manage operations efficiently and compliantly within Venezuela, with a focus on a less text-heavy and more visual user experience. The ambition is to offer a cutting-edge platform that integrates AI for enhanced functionality and compliance.

## User Preferences
- All buttons in the application should have functional handlers (`onClick`).
- All `alert()` calls should be replaced with toast notifications.
- API endpoints for `inventario`, `clientes`, `declaraciones_iva`, `declaraciones_islr`, and `retenciones` must align with the corrected schema fields.
- Financial routes must include `try/catch` blocks for error handling and use `NaN-safe parseFloat/parseInt`.
- Never use hardcoded `text-white` on page headings — use `text-foreground` for theme compatibility. Only use `text-white` inside truly dark/colored containers (buttons, colored cards, active tab triggers).
- All 6 layouts use `PageTransition` from `src/components/ui/motion.tsx` for SSR-safe page entrance animations (mount-gated, respects `prefers-reduced-motion`).
- Use `MotionContainer` for scroll-triggered reveals, `StaggerContainer`/`StaggerItem` for staggered card grids, `CountUp` for animated numbers, `FloatingElement` for ambient motion.
- CSS utility classes: `hover-lift`, `hover-glow`, `hover-scale`, `btn-press`, `icon-hover` for micro-interactions. Stagger delays: `.stagger-1` through `.stagger-8`.
- The system should support both `{destino, tipo}` and `{method, email, phone}` formats for `/api/auth/send-code`.
- The system should support both `{destino, codigo}` and `{method, email, phone, code}` formats for `/api/auth/verify-code`.

## System Architecture
The system is built on Next.js 15 (App Router) with TypeScript, utilizing `next-intl` for internationalization. Styling is managed with Tailwind CSS and shadcn/ui. PostgreSQL serves as the database. Authentication uses JWT with HTTP-only cookies.

**UI/UX Decisions:**
- Application routes are organized under `src/app/[locale]/` with grouped routes for authentication, administration, main application, natural persons, HR, legal, sales, partners, and telecommunications.
- A mobile sidebar provides smooth scrolling for landing pages and contextual navigation.
- The landing page is visually driven with simplified sections (Hero, Services, About, FAQ).
- Register pages feature custom prefix selectors, auto-hyphenation for RIF, SENIAT AI lookup for company data, SAIME cédula lookup with auto-fill, and rich result panels.
- Document upload functionality is reusable with drag-and-drop zones, file validation (PDF/JPG/PNG/WebP, max 10MB).
- Venezuela geography data is used for cascading state/municipality dropdowns in registration forms.
- SAIME integration simulates citizen registry lookup for enriched data.
- Background animations are optimized using pure CSS.
- Registration pages feature a redesign with custom step navigation, progress bars, rounded input fields, and visual password strength meters.
- Plan selection cards display prices in USD with live Bs. equivalent from the BCV daily rate.
- Login and Dashboard pages are redesigned for a cleaner, modern aesthetic with motion animations and real API data. Specialized login cards and dashboard KPIs are dynamically rendered.
- A slow connection banner dynamically detects network status and provides user feedback.
- A comprehensive FAQ system with search and category filters is available.
- Kyron Chat provides a full-page chat experience with 6 AI identities, streaming responses, and context-aware greetings. A floating chat button is also available across all authenticated layouts.
- Consistent heading sizes (`text-3xl md:text-5xl`) are applied across all pages.

**Technical Implementations:**
- **Database Schema:** A comprehensive PostgreSQL schema with 70+ tables is managed.
- **Database Layer:** Includes helpers for batch operations, upserts, existence checks, pagination, and health checks.
- **Demo Requests:** Landing page CTA form saves data, and sends branded notification emails using a multi-provider email service.
- **Demo Seed Data:** Realistic Venezuelan business data.
- **Health Check:** `GET /api/db-health` provides database metrics.
- **Enhanced Audit Trail:** `logAudit()` records detailed field-level changes.
- **API Routes:** Over 60 API routes for authentication, KPIs, and CRUD operations.
- **Authentication:** JWT utilities with an `AuthProvider` context. Login requires 2FA via email.
- **2FA Verification:** 6-digit code generation, email sending, and verification.
- **Security:** Implemented security headers, rate limiting, input validation, and parameterized SQL.
- **Payment Methods:** Integration with 12 payment gateways and 29 Venezuelan banks.
- **Special Pages:** Dedicated pages for Zedu Model: AutoMind AI project and an enhanced user manual.
- **Performance Optimizations:** Lazy loading, dynamic imports, loading skeletons, Next.js image optimization, CSS-based animations, WebP images (95% compression). Landing page content appears immediately without scroll triggers. Framer-motion removed from `demo-banner.tsx`, `welcome-tutorial.tsx`, and `comments-section.tsx`. Below-fold sections deferred via `requestIdleCallback` until hero is interactive. Only `scroll-cinematic-section` retains Framer Motion for scroll-driven parallax.
- **Tutorial/Onboarding:** `WelcomeTutorial` component for first-time users.
- **Loading Screen:** Polished splash screen with Kyron Logo and progress bar.
- **Kyron Design System:** Signature gradient, CSS utilities, and animations are defined globally.
- **Real RIF/Cédula Validation:** Uses Venezuelan modulo-11 check digit algorithm for RIF and strict format validation for Cédula. API endpoints perform DB-only lookups.
- **Route Protection:** Authentication is required for sensitive pages.
- **Alert Notifications:** Asynchronously sends alerts via email, WhatsApp, and SMS based on user preferences.
- **Permisología Module:** Covers SENIAT, various ministries, municipalities, and autonomous entities.
- **Carnets & Tarjetas Module:** Generates QR codes for various cards.
- **Telecom Module:** Manages personal and enterprise telecommunications lines with auto-assigned unique numbers.
- **Marco Legal Venezuela:** Comprehensive module with 14 fiscal entities, 9 fundamental laws, current tax rates, and calendar/filter helpers.
- **OTP Verification:** DB-primary storage with in-memory Map fallback, codes scoped by purpose, max 5 attempts per code.
- **Kyron Chat (Global):** VoiceAssistant component is available for all users (authenticated and unauthenticated) with hide/show toggle and context-aware greetings.
- **Back Button Component:** Reusable for consistent navigation across subpages.

## External Dependencies
- **Database:** PostgreSQL
- **Internationalization:** `next-intl`
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** `bcryptjs`, `jose`
- **Animations:** CSS keyframe animations (viewport-gated via IntersectionObserver), Framer Motion (scroll-cinematic only)
- **Email Services:** Gmail, Outlook, Resend (with fallback chain)
- **AI Integrations:** Anthropic Claude Sonnet (`claude-3-5-sonnet-20241022`)
- **SMS:** Twilio
- **WhatsApp Alerts:** Twilio
- **BCV Rate Auto-fetch:** PyDolar BCV, ExchangeRate API
- **Excel Export:** `exceljs`
- **QR Generation:** `api.qrserver.com`