# Blend Burger

React + TypeScript + Vite + CSS Modules. The application contains three main pages: **Inicio** (`/`), **Carta** (`/menu`), and **Pedidos** (`/order`), plus a branded 404 fallback. The previous `/ordernow` endpoint redirects to `/order`.

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Project structure

- `src/App.tsx` mounts the shared Navbar and Footer exactly once and owns all routes.
- `src/data/menuData.ts` stores product names, descriptions, prices, and categories.
- `src/data/orderData.ts` stores order-page content and the WhatsApp URL.
- `src/components/Icon` stores the SVG icon definitions shared by the order page.
- `src/pages/NotFound` provides a dedicated fallback screen and a home link.
- `src/styles/variables.css` contains reusable design tokens; `src/index.css` contains only site-wide resets and defaults.

## Asset preservation

The original repository's photographs and brand logo must remain in `src/assets`. Do not delete those folders when applying this update. The project uses the exact original asset import paths.

## Hosting

`vercel.json` rewrites direct URL requests to the SPA entry point. The React router then displays the matching page or the branded 404 page.
