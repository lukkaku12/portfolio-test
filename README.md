# Portfolio Landing (React + Vite + GSAP)

Landing tipo portfolio inspirada en el ritmo visual de estudios creativos (sin copiar diseño exacto), con:

- Loader inicial 0% → 100%
- Hero fullscreen editorial
- Menú fijo con comportamiento en scroll
- Secciones: Experiencia, Proyectos, Skills y Contacto
- Animaciones GSAP + ScrollTrigger
- Soporte para `prefers-reduced-motion`

## Ejecutar en local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Deploy en Netlify

Este repo ya incluye configuración en `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
