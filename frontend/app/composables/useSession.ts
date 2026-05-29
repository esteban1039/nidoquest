type User = {
  id: number
  name: string
  email: string
  role: 'super_admin' | 'guide' | 'explorer'
  locale?: string
  must_change_password?: boolean
}

type Tenant = {
  id: number
  name: string
  status: string
}

export function useSession() {
  const token = useCookie<string | null>('nidoquest_token', { sameSite: 'lax' })
  const tenantId = useCookie<string | null>('nidoquest_tenant_id', { sameSite: 'lax' })
  const user = useState<User | null>('nidoquest_user', () => null)
  const tenant = useState<Tenant | null>('nidoquest_tenant', () => null)
  const { request } = useApi()
  const { locale, setLocale } = useI18n()

  const isAuthenticated = computed(() => Boolean(token.value && token.value !== 'demo-token'))
  const role = computed(() => user.value?.role || 'guide')

  function clearSession() {
    token.value = null
    tenantId.value = null
    user.value = null
    tenant.value = null
  }

  async function applyUserLocale(nextUser: User) {
    if (!nextUser.locale || nextUser.locale === locale.value) {
      return
    }

    try {
      await setLocale(nextUser.locale)
    } catch {
      locale.value = nextUser.locale
    }
  }

  async function login(email: string, password: string) {
    const response = await request<{ token: string; user: User; tenants?: { data?: Tenant[] } | Tenant[] }>('/auth/login', {
      method: 'POST',
      body: { email, password, device_name: 'nidoquest-web' }
    })

    token.value = response.token
    user.value = response.user
    await applyUserLocale(response.user)

    const tenants = Array.isArray(response.tenants) ? response.tenants : response.tenants?.data
    if (tenants?.[0]) {
      tenant.value = tenants[0]
      tenantId.value = String(tenants[0].id)
    } else {
      tenant.value = null
      tenantId.value = null
    }
  }

  async function register(payload: Record<string, unknown>) {
    const response = await request<{ token: string; user: User; tenant: { data?: Tenant } | Tenant }>('/auth/register', {
      method: 'POST',
      body: payload
    })

    token.value = response.token
    user.value = response.user
    await applyUserLocale(response.user)
    const createdTenant = 'data' in response.tenant ? response.tenant.data : response.tenant
    tenant.value = createdTenant
    tenantId.value = String(createdTenant.id)
  }

  async function fetchMe() {
    if (!token.value) {
      return
    }

    const response = await request<{ user: User; tenant?: { data?: Tenant } | Tenant | null }>('/me')
    user.value = response.user
    await applyUserLocale(response.user)
    const currentTenant = response.tenant && 'data' in response.tenant ? response.tenant.data : response.tenant
    tenant.value = currentTenant || tenant.value
  }

  async function logout() {
    if (token.value) {
      try {
        await request('/auth/logout', { method: 'POST' })
      } catch {
        // Keep logout local even if the API is unavailable.
      }
    }

    clearSession()
    await navigateTo('/')
  }

  return { token, tenantId, user, tenant, role, isAuthenticated, login, register, fetchMe, logout, clearSession }
}
