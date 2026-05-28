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

export function useApi() {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('nidoquest_token', { sameSite: 'lax' })
  const tenantId = useCookie<string | null>('nidoquest_tenant_id', { sameSite: 'lax' })

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

    return await $fetch<T>(`${apiBaseUrl()}${path}`, {
      method: options.method || 'GET',
      body: options.body,
      headers
    })
  }

  return { request }
}
