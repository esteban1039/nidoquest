type NotificationItem = {
  id: string
  data: string | Record<string, unknown>
  read_at: string | null
  created_at: string
}

export function useNotifications() {
  const { request } = useApi()
  const items = useState<NotificationItem[]>('nidoquest_notifications', () => [])

  const unreadCount = computed(() => items.value.filter((item) => !item.read_at).length)

  async function fetchNotifications() {
    try {
      const response = await request<{ data: { data?: NotificationItem[] } | NotificationItem[] }>('/notifications')
      items.value = Array.isArray(response.data) ? response.data : response.data.data || []
    } catch {
      items.value = []
    }
  }

  async function markRead(id: string) {
    const item = items.value.find((notification) => notification.id === id)

    if (item) {
      item.read_at = new Date().toISOString()
    }

    await request(`/notifications/${id}/read`, { method: 'POST' })
  }

  function notificationText(item: NotificationItem) {
    const data = typeof item.data === 'string' ? JSON.parse(item.data || '{}') : item.data

    return {
      title: String(data.title || data.subject || 'NidoQuest'),
      body: String(data.body || data.message || '')
    }
  }

  return { items, unreadCount, fetchNotifications, markRead, notificationText }
}
