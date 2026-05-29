export default defineNuxtConfig({
  compatibilityDate: '2026-05-28',
  devtools: { enabled: true },
  srcDir: 'app',
  modules: ['@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    backendApiBase: process.env.NUXT_BACKEND_API_BASE || process.env.BACKEND_API_BASE || 'http://127.0.0.1:8000/api',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      appName: 'NidoQuest',
      vapidPublicKey: process.env.NUXT_PUBLIC_VAPID_PUBLIC_KEY || ''
    }
  },
  app: {
    head: {
      title: 'NidoQuest',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#79c7c5' },
        {
          name: 'description',
          content: 'Misiones, estrellas y recompensas sanas para formar hábitos positivos en familia.'
        }
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'icon', href: '/icons/icon.svg', type: 'image/svg+xml' }
      ],
      script: [{ src: '/pwa/register-sw.js', defer: true }]
    }
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: false
    },
    strategy: 'prefix_except_default',
    defaultLocale: 'es-LATAM',
    langDir: '../i18n/locales',
    locales: [
      { code: 'es-LATAM', name: 'Español LATAM', file: 'es-LATAM.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' }
    ]
  },
  nitro: {
    preset: 'cloudflare_pages',
    routeRules: {
      '/pwa/**': { headers: { 'cache-control': 'public, max-age=3600' } },
      '/icons/**': { headers: { 'cache-control': 'public, max-age=86400' } }
    }
  }
})
