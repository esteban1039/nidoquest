export function usePwa() {
  const { request } = useApi()
  const canInstall = useState<boolean>('pwa_can_install', () => false)
  const isInstalled = useState<boolean>('pwa_is_installed', () => false)
  const pushPermission = useState<NotificationPermission>('pwa_push_permission', () => 'default')
  const deferredPrompt = useState<any>('pwa_deferred_prompt', () => null)

  function setupInstallPrompt() {
    if (typeof window === 'undefined') return

    // Check if running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      isInstalled.value = true
    }

    // Check Notification permission
    if ('Notification' in window) {
      pushPermission.value = Notification.permission
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      canInstall.value = true
    })

    window.addEventListener('appinstalled', () => {
      canInstall.value = false
      isInstalled.value = true
      deferredPrompt.value = null
    })
  }

  onMounted(() => {
    setupInstallPrompt()
  })

  async function installApp(): Promise<boolean> {
    if (!deferredPrompt.value) return false

    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    deferredPrompt.value = null
    canInstall.value = false

    return outcome === 'accepted'
  }

  async function requestPushNotifications(): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      pushPermission.value = permission

      if (permission === 'granted' && 'serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready

        // Register push subscription if supported
        if ('pushManager' in registration) {
          try {
            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlB64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U')
            })

            const subJson = subscription.toJSON()
            await request('/notifications/subscriptions', {
              method: 'POST',
              body: {
                endpoint: subJson.endpoint,
                keys: subJson.keys || null,
              }
            })
          } catch (e) {
            console.warn('PushManager subscription registered locally without VAPID keys:', e)
          }
        }

        // Send a welcome test notification
        showNotification({
          title: '🔔 ¡Notificaciones de NidoQuest activadas!',
          body: 'Te avisaremos cuando haya misiones listas, recompensas y rachas por proteger.',
          icon: '/icons/icon.svg',
        })

        return true
      }

      return permission === 'granted'
    } catch (err) {
      console.error('Error requesting notification permission:', err)
      return false
    }
  }

  function showNotification(options: { title: string; body: string; icon?: string; url?: string }) {
    if (typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') {
      return
    }

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(options.title, {
          body: options.body,
          icon: options.icon || '/icons/icon.svg',
          badge: '/icons/icon.svg',
          vibrate: [200, 100, 200],
          data: { url: options.url || '/' },
        } as any)
      })
    } else {
      new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/icons/icon.svg',
      })
    }
  }

  function urlB64ToUint8Array(base64String: string): BufferSource {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    const buffer = new ArrayBuffer(rawData.length)
    const outputArray = new Uint8Array(buffer)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray as BufferSource
  }

  return {
    canInstall,
    isInstalled,
    pushPermission,
    setupInstallPrompt,
    installApp,
    requestPushNotifications,
    showNotification,
  }
}
