# Portfolio React + GSAP

## Deploy en Netlify (sin error MIME)

Este proyecto usa **Vite**. En Netlify debes publicar la carpeta `dist` (no la raíz del repo).

### Opción recomendada (automática)
Este repo incluye `netlify.toml`, así que Netlify debe tomar:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Si lo configuras manualmente en Netlify UI
- Build command: `npm run build`
- Publish directory: `dist`

## Desarrollo local

```bash
npm install
npm run dev
```

## Build local

```bash
npm run build
npm run preview
```

## Nota sobre errores de Bugsnag bloqueado
Mensajes como `sessions.bugsnag.com ... ERR_BLOCKED_BY_CLIENT` suelen venir de adblock/extensions.
No bloquean el funcionamiento principal del sitio.
