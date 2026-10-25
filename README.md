# Blend Burger — Restaurant Website & Admin Demo 🍔

A responsive, bilingual restaurant portfolio project built with **React 19, TypeScript, Vite, CSS Modules, and SweetAlert2**. This version extends the original Blend Burger concept with a browser-only administration dashboard, editable menu and business hours, and an interactive demo order flow.

**Live demo:** https://blend-burger-demo.vercel.app/  
**Source:** https://github.com/pablo-gilabert/blend-burger-demo

> **Portfolio prototype, not a live restaurant management system.** All administrative credentials are public and client-side. Customer and order records are fictional; no cross-device synchronization, protected authentication, server, or production payment processor exists. Do not enter real customer data.

## Features

- **Public restaurant website** with Home, Menu, Orders, responsive photography, and preserved WhatsApp ordering.
- **Spanish / English** interface with a language selector, translated content, menu categories and descriptions.
- **Dark / light themes**, dark by default, saved in browser preferences.
- **Administrator sign-in** with an immediately visible demo account and a dashboard-inspired split layout.
- **Order management** featuring customer/contact data, pickup or delivery, order status, payment status and order totals.
- **SweetAlert2 dialogs** for adding and editing orders and products, changing hours, confirmation prompts, validation and deletion.
- **Editable menu and prices** with localized product names/descriptions and publication toggles.
- **Opening-hours editor** with an independent schedule per weekday.
- **Demo orders** submitted through a local form on the public ordering page; they appear on the same browser's admin dashboard.
- **Local persistence** through `localStorage`; demo sign-in uses `sessionStorage`.
- **SEO pipeline retained**: route-specific pre-rendered public metadata, canonical URLs, JSON-LD, Open Graph, robots and sitemap generation.

### Demo credentials

| Field | Value |
| --- | --- |
| Route | `/admin/login` |
| Email | `admin@demo.blendburger` |
| Password | `Demo2026!` |

These credentials are embedded in the client bundle intentionally. The admin route protection is for exploration only, not actual security.

## Stack

React 19, TypeScript 6, Vite 8, React Router, CSS Modules, SweetAlert2, TypeScript project references, Oxlint and Node.js test runner.

## Architecture

```text
src/
├── App.tsx                       # Route composition and demo access guard
├── context/
│   ├── DisplayContext.tsx        # Language and appearance preferences
│   └── RestaurantContext.tsx     # Browser-only mutable restaurant state
├── data/
│   ├── menuData.ts               # Original Spanish source used by static SEO
│   ├── orderData.ts              # Original WhatsApp endpoint
│   ├── RestaurantSeed.ts         # Local demo catalog, hours, sample orders
│   └── RestaurantTypes.ts        # Shared typed data contracts
├── i18n/Ui.ts                    # Shared Spanish and English translations
├── lib/Dialogs.ts                # Safe SweetAlert2 wrappers
├── components/
│   ├── AdminShell/
│   ├── DisplayControls/
│   ├── Navbar/
│   └── ...
├── pages/
│   ├── AdminCatalog/
│   ├── AdminDashboard/
│   ├── AdminHours/
│   ├── AdminLogin/
│   ├── Home/
│   ├── Menu/
│   ├── Order/
│   └── NotFound/
└── styles/
    ├── AdminShared.module.css
    ├── Themes.css
    └── ...
```

## Local development

Requires Node.js 22.12 or newer (within the supported Node range).

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

The production build includes static SEO generation and validation. `npm test` tests the generated production artifacts. `npm run validate` runs linting, the build, and tests.

## State and SEO scope

`RestaurantSeed.ts` uses the existing `menuData.ts` as its initial source. Interactive changes are deliberately **browser-local**. The build-time SEO generator uses the original data so pre-rendered structured data may differ from locally edited menu items; this limitation is intentional for a standalone frontend demonstration.

The real WhatsApp ordering action is unchanged and independent of locally simulated orders. Nothing created in a demo dialog reaches a restaurant or a remote database. A production implementation would require authenticated backend APIs, database persistence, authorization, input validation, privacy controls, and payment-provider integration.

## Accessibility and engineering choices

The application retains semantic navigation, keyboard focus, responsive layouts and reduced-motion handling. The demo interface uses typed translation keys, separate contexts for display settings and restaurant data, explicit data models, a reusable dialog layer, and escaped values when interpolating into modal HTML.

## License / attribution

Portfolio demonstration; product names, visual materials and business references remain subject to their respective rights. No affiliation or deployment for a real restaurant is implied by this demo.
