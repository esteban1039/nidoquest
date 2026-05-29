export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, fetchMe, token, user, tenant, clearSession } = useSession()

  if (token.value === 'demo-token') {
    clearSession()

    return navigateTo('/auth/login')
  }

  if (!isAuthenticated.value) {
    return navigateTo('/auth/login')
  }

  if (!user.value) {
    try {
      await fetchMe()
    } catch {
      clearSession()

      return navigateTo('/auth/login')
    }
  }

  if (user.value?.must_change_password && to.path !== '/profile') {
    return navigateTo('/profile')
  }

  if (tenant.value?.subscription && !tenant.value.subscription.allowed && !to.path.startsWith('/billing') && to.path !== '/profile') {
    return navigateTo('/billing')
  }

  const role = user.value?.role
  const dashboardByRole = role === 'super_admin'
    ? '/dashboard/admin'
    : role === 'explorer'
      ? '/dashboard/explorer'
      : '/dashboard/guide'

  if (to.path === '/dashboard/admin' && role !== 'super_admin') {
    return navigateTo(dashboardByRole)
  }

  if (to.path === '/dashboard/guide' && role !== 'guide') {
    return navigateTo(dashboardByRole)
  }

  if (to.path === '/dashboard/explorer' && role !== 'explorer') {
    return navigateTo(dashboardByRole)
  }

  if (to.path.startsWith('/billing') && role !== 'guide' && tenant.value?.subscription?.allowed) {
    return navigateTo(dashboardByRole)
  }
})
