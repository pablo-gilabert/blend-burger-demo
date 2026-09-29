# Refactor summary

- Centralized routing and shared layout; Navbar and Footer mount once.
- Standardized links on `/`, `/menu`, and `/order`; legacy `/ordernow` redirects.
- Added the `NotFound` fallback component with a working home link.
- Kept the current menu product data, descriptions, and prices; rendering is category-driven.
- Kept the current WhatsApp URL; moved it to one data module.
- Replaced the duplicate responsive hero images with one `picture` element.
- Made below-the-fold food images lazy-loaded and decoded asynchronously.
- Extracted reused SVG icons to a small typed component.
- Added CSS design tokens for reused colors, radii, page width, and navbar height.
- Moved only cross-application resets into the global stylesheet; module selectors remain locally scoped.
- Added keyboard-focus styles, reduced-motion handling, proper page heading structure, and a Spanish document language.
- Added Vercel SPA rewrites for direct deep links.
- Preserved asset import paths and the original dependency versions.

## Ajuste responsive y desplazamiento

- Carta desktop: una sola columna, productos apilados y contenedor del 85% del viewport.
- Restablecimiento inmediato del scroll al principio de cada navegación mediante React Router (`location.key`).
