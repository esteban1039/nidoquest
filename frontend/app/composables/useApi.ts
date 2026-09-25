type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: Record<string, unknown>
  headers?: Record<string, string>
}

export function getApiErrorMessage(error: unknown, fallback = 'No pudimos conectar con el servidor.') {
  if (error && typeof error === 'object' && 'data' in error) {
    const data = (error as { data?: { message?: string; errors?: Record<string, string[]> } }).data

    if (data?.errors) {
      const firstError = Object.values(data.errors)[0]?.[0]

      if (firstError) {
        return firstError
      }
    }

    if (data?.message) {
      return data.message
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

export type QueuedResult = { queued: boolean; client_mutation_id: string }

function queueableKind(path: string): 'submit-mission' | 'redeem-reward' | null {
  if (/^\/missions\/\d+\/submit$/.test(path)) {
    return 'submit-mission'
  }
  if (/^\/rewards\/\d+\/redeem$/.test(path)) {
    return 'redeem-reward'
  }
  return null
}

function isNetworkFailure(error: unknown): boolean {
  if (error instanceof TypeError) {
    return true
  }
  const status = (error as { response?: { status?: number } })?.response?.status
  return status === undefined || status === 0
}

export function useApi() {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('nidoquest_token', { sameSite: 'lax' })
  const tenantId = useCookie<string | null>('nidoquest_tenant_id', { sameSite: 'lax' })
  const { enqueue, cachePut, cacheGet, stale } = useOutbox()

  function apiBaseUrl() {
    const configuredBase = String(config.public.apiBase || '').replace(/\/$/, '')

    if (
      configuredBase === 'http://localhost/api' ||
      configuredBase === 'https://localhost/api'
    ) {
      return '/api'
    }

    return configuredBase || '/api'
  }

  async function request<T>(path: string, options: ApiOptions = {}) {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    }

    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }

    if (tenantId.value) {
      headers['X-Tenant-ID'] = tenantId.value
    }

    const method = options.method || 'GET'
    const kind = method === 'POST' ? queueableKind(path) : null
    const body = { ...(options.body || {}) } as Record<string, unknown>

    if (kind && typeof body.client_mutation_id !== 'string') {
      body.client_mutation_id = newMutationId()
    }

    try {
      const data = await $fetch<T>(`${apiBaseUrl()}${path}`, { method, body: options.body ? body : undefined, headers })

      if (method === 'GET') {
        stale.value = false
        cachePut(path, data)
      }

      return data
    } catch (error) {
      // Sin red: las mutaciones de niño se encolan, las lecturas usan caché.
      // Los errores HTTP del servidor (4xx/5xx) siempre se propagan.
      if (import.meta.client && isNetworkFailure(error)) {
        if (kind) {
          await enqueue(kind, path, body, String(body.client_mutation_id))
          return { queued: true, client_mutation_id: String(body.client_mutation_id) } as T
        }

        if (method === 'GET') {
          const cached = cacheGet<T>(path)
          if (cached !== null) {
            stale.value = true
            return cached
          }
        }
      }

      throw error
    }
  }

  return { request }
}
