# NidoQuest Frontend

Frontend Nuxt para la Fase 2: landing, autenticación, onboarding y dashboards base.

## Instalación

```bash
npm install
npm run dev
```

Configura el backend Laravel en:

```bash
NUXT_PUBLIC_API_BASE=/api
NUXT_BACKEND_API_BASE=http://127.0.0.1:8000/api
```

## Incluye

- Landing comercial mobile-first.
- Login y registro.
- Onboarding de Nido.
- Dashboard Guía.
- Dashboard Explorador.
- Panel Administrador SaaS básico.
- Cliente API con token Sanctum.
- Manejo de sesión con `useCookie`.
- i18n: `es-LATAM`, `en`, `fr`.
- Manifest, service worker y pantalla offline.
- Prompt de instalación PWA.
- Preparación de push notifications con VAPID.
- Pantalla de suscripción y retorno Wompi.
