# Cómo aplicar esta optimización sobre tu proyecto existente

Este paquete contiene el código completo optimizado, configuración y nuevos componentes, **pero no duplica los archivos binarios de `src/assets/` ni `package-lock.json`**: el entorno pudo leer el código de GitHub, pero no descargar de forma íntegra el ZIP original con las imágenes. Para conservar exactamente tus fotografías, tu logo y el lockfile, hay que instalarlo sobre una copia del proyecto actual, no sustituirlo por una carpeta vacía.

## Pasos seguros

1. Hacé una copia de seguridad de tu carpeta actual `blend-burger`.
2. Descomprimí este ZIP en otra carpeta.
3. **Opción automática:** ejecutá `powershell -ExecutionPolicy Bypass -File .\apply-to-existing.ps1 -ProjectPath "C:\ruta\a\blend-burger"` desde la carpeta descomprimida. El script respalda los archivos anteriores y reemplaza solo el código. **Opción manual:** copiá el contenido sobre tu proyecto, sin borrar `src/assets/` ni `package-lock.json`.
4. El script también respalda y retira las carpetas obsoletas `src/pages/About/` y `src/pages/Contact/`. Si aplicás el cambio manualmente, retiralas vos. Conservá `src/pages/NotFound/`.
5. Ejecutá `npm install`, `npm run build` y `npm run lint` en tu PC.
6. Revisá el resultado antes de hacer `git add .`, `git commit` y `git push`.

Rutas: `/` Inicio, `/menu` Carta, `/order` Pedidos, `/ordernow` redirige a `/order`, y cualquier ruta restante presenta el componente NotFound.

Si querés un ZIP verdaderamente autónomo que incluya los mismos bytes de todas tus imágenes y el `package-lock.json` original, adjuntá el ZIP actual del repositorio; no conviene sustituirlos por imágenes similares o inventadas.

## Ajustes posteriores: carta y navegación

- La carta muestra una categoría debajo de otra en todas las resoluciones; en desktop usa el 85% del ancho de la pantalla.
- `ScrollToTop` en `src/App.tsx` lleva la vista al comienzo después de cada navegación interna, incluso al pulsar un enlace hacia la ruta actual. Los enlaces externos no se modifican.
