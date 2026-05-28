export function usePwa() {
  const config = useRuntimeConfig()
  const installPrompt = useState<Event | null>('nidoquest_install_prompt', () => null)
  const canInstall = computed(() => Boolean(installPrompt.value))
  const notificationPermission = useState<NotificationPermission | 'unsupported'>('nidoquest_notification_permission', () => 'default')
  const { request } = useApi()

  function setupInstallPrompt() {
    if (!import.meta.client) {
      return
    }

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault()
      installPrompt.value = event
    })

    if (!('Notification' in window)) {
      notificationPermission.value = 'unsupported'
    } else {
      notificationPermission.value = Notification.permission
    }
  }

  async function install() {
    const prompt = installPrompt.value as unknown as { prompt?: () => Promise<void>; userChoice?: Promise<unknown> } | null

    if (!prompt?.prompt) {
      return
    }

    await prompt.prompt()
    await prompt.userChoice
    installPrompt.value = null
  }

  async function enableNotifications() {
    if (!import.meta.client || !('Notification' in window) || !('serviceWorker' in navigator)) {
      notificationPermission.value = 'unsupported'
      return
    }

    const permission = await Notification.requestPermission()
    notificationPermission.value = permission

    if (permission !== 'granted') {
      return
    }

    const registration = await navigator.serviceWorker.ready
    const existing = await registration.pushManager.getSubscription()
    const vapidKey = config.public.vapidPublicKey

    if (!vapidKey) {
      return
    }

    const subscription = existing || await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey)
    })

    await request('/notifications/subscriptions', {
      method: 'POST',
      body: subscription.toJSON() as Record<string, unknown>
    })
  }

  return { canInstall, notificationPermission, setupInstallPrompt, install, enableNotifications }
}

function urlBase64ToUint8Array(value: string) {
  const padding = '='.repeat((4 - value.length % 4) % 4)
  const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const output = new Uint8Array(rawData.length)

  for (let index = 0; index < rawData.length; ++index) {
    output[index] = rawData.charCodeAt(index)
  }

  return output
}
