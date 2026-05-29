export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, fetchMe, token, user, clearSession } = useSession()

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
})
