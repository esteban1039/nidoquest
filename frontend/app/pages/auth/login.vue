<script setup lang="ts">
const { t } = useI18n()
const { login, token, clearSession, role, user } = useSession()
const loading = ref(false)
const form = reactive({ email: 'guia@nidoquest.test', password: 'Password123!' })
const error = ref('')

if (token.value === 'demo-token') {
  clearSession()
}

async function submit() {
  loading.value = true
  error.value = ''

  try {
    await login(form.email, form.password)
    if (user.value?.must_change_password) {
      await navigateTo('/profile')
    } else {
      await navigateTo(role.value === 'super_admin' ? '/dashboard/admin' : role.value === 'explorer' ? '/dashboard/explorer' : '/dashboard/guide')
    }
  } catch (loginError) {
    error.value = getApiErrorMessage(loginError, 'No pudimos iniciar sesión. Revisa el correo, la contraseña y que el backend esté encendido.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthPanel :title="t('auth.welcome')" :hint="t('app.tagline')">
    <form class="form-stack" @submit.prevent="submit">
      <label>
        <span>{{ t('auth.email') }}</span>
        <input v-model="form.email" type="email" autocomplete="email" required>
      </label>
      <label>
        <span>{{ t('auth.password') }}</span>
        <input v-model="form.password" type="password" autocomplete="current-password" required>
      </label>
      <p v-if="error" class="form-error">{{ error }}</p>
      <button class="button primary full" type="submit" :disabled="loading">
        {{ loading ? t('auth.loading') : t('auth.login') }}
      </button>
      <NuxtLink class="text-link" to="/auth/register">{{ t('auth.noAccount') }}</NuxtLink>
    </form>
  </AuthPanel>
</template>
