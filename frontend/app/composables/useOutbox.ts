// Outbox offline: cola en IndexedDB + caché de lectura en localStorage.
// El ledger del servidor es la fuente de verdad; aquí solo se encolan
// mutaciones reintentables (submit de misión, redeem de recompensa) con
// client_mutation_id para que el replay no duplique.

export type OutboxKind = 'submit-mission' | 'redeem-reward'

export type OutboxItem = {
  id?: number
  kind: OutboxKind
  path: string
  body: Record<string, unknown>
  mutationId: string
  createdAt: number
  status: 'pending' | 'done' | 'conflicted'
}

export function newMutationId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 32)
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 18)}`
}

let listenersReady = false

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('nidoquest', 1)
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains('outbox')) {
        req.result.createObjectStore('outbox', { keyPath: 'id', autoIncrement: true })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const transaction = db.transaction('outbox', mode)
        const req = run(transaction.objectStore('outbox'))
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
      })
  )
}

export function useOutbox() {
  const pending = useState('outbox-pending', () => 0)
  const syncing = useState('outbox-syncing', () => false)
  const notice = useState('outbox-notice', () => '')
  const stale = useState('data-stale', () => false)
  const online = useState('net-online', () => true)

  function watchOnline(onReconnect: () => void) {
    if (!import.meta.client || listenersReady) {
      return
    }
    listenersReady = true
    online.value = navigator.onLine
    window.addEventListener('online', () => {
      online.value = true
      onReconnect()
    })
    window.addEventListener('offline', () => {
      online.value = false
    })
  }

  async function refreshPending() {
    if (!import.meta.client) {
      return
    }
    try {
      const items = await tx('readonly', (store) => store.getAll())
      pending.value = (items as OutboxItem[]).filter((item) => item.status === 'pending').length
    } catch {
      pending.value = 0
    }
  }

  async function enqueue(kind: OutboxKind, path: string, body: Record<string, unknown>, mutationId: string) {
    await tx('readwrite', (store) =>
      store.add({
        kind,
        path,
        body,
        mutationId,
        createdAt: Date.now(),
        status: 'pending',
      } as OutboxItem)
    )
    await refreshPending()
  }

  function apiBase(): string {
    const config = useRuntimeConfig()
    const base = String(config.public.apiBase || '').replace(/\/$/, '')
    return base || '/api'
  }

  function authHeaders(): Record<string, string> {
    const token = useCookie<string | null>('nidoquest_token', { sameSite: 'lax' })
    const tenantId = useCookie<string | null>('nidoquest_tenant_id', { sameSite: 'lax' })
    const headers: Record<string, string> = { Accept: 'application/json', 'Content-Type': 'application/json' }
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }
    if (tenantId.value) {
      headers['X-Tenant-ID'] = tenantId.value
    }
    return headers
  }

  // Envía la cola en orden. 2xx = ok; 422 = el servidor ya avanzó
  // (p. ej. el formador aprobó mientras tanto): se acepta su verdad.
  // 401/403 o error de red detienen el envío para reintentar luego.
  async function flush(onFlushed: () => Promise<void> | void): Promise<void> {
    if (!import.meta.client || syncing.value) {
      return
    }
    syncing.value = true

    try {
      const items = (await tx('readonly', (store) => store.getAll())) as OutboxItem[]
      let changed = false

      for (const item of items.filter((entry) => entry.status === 'pending').sort((a, b) => a.createdAt - b.createdAt)) {
        try {
          await $fetch(`${apiBase()}${item.path}`, {
            method: 'POST',
            body: { ...item.body, client_mutation_id: item.mutationId },
            headers: authHeaders(),
          })
          await tx('readwrite', (store) => store.delete(item.id as number))
          changed = true
        } catch (error) {
          const status = (error as { response?: { status?: number } })?.response?.status
          if (status === 422) {
            await tx('readwrite', (store) => store.delete(item.id as number))
            notice.value = 'conflicted'
            changed = true
          } else {
            break
          }
        }
      }

      await refreshPending()
      if (changed) {
        await onFlushed()
      }
    } finally {
      syncing.value = false
    }
  }

  function cacheKey(path: string): string {
    return `nq-cache:${path}`
  }

  function cachePut(path: string, data: unknown) {
    if (!import.meta.client) {
      return
    }
    try {
      localStorage.setItem(cacheKey(path), JSON.stringify({ at: Date.now(), data }))
    } catch {
      // Almacenamiento lleno o bloqueado: la app sigue online-only.
    }
  }

  function cacheGet<T>(path: string): T | null {
    if (!import.meta.client) {
      return null
    }
    try {
      const raw = localStorage.getItem(cacheKey(path))
      if (!raw) {
        return null
      }
      return (JSON.parse(raw) as { data: T }).data
    } catch {
      return null
    }
  }

  function dismissNotice() {
    notice.value = ''
  }

  return { pending, syncing, notice, stale, online, watchOnline, refreshPending, enqueue, flush, cachePut, cacheGet, dismissNotice }
}
