<script setup lang="ts">
const { t } = useI18n()
const { register, clearSession } = useSession()
const loading = ref(false)
const error = ref('')
const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  tenant_name: ''
})

clearSession()

async function submit() {
  loading.value = true
  error.value = ''

  try {
    await register(form)
    await navigateTo('/onboarding')
  } catch (registerError) {
    error.value = getApiErrorMessage(registerError, 'No pudimos crear el Nido. Revisa los datos y que el backend esté encendido.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthPanel :title="t('auth.create')" :hint="t('app.tagline')">
    <form class="form-stack" @submit.prevent="submit">
      <label>
        <span>{{ t('auth.name') }}</span>
        <input v-model="form.name" autocomplete="name" required>
      </label>
      <label>
        <span>{{ t('auth.email') }}</span>
        <input v-model="form.email" type="email" autocomplete="email" required>
      </label>
      <label>
        <span>{{ t('auth.tenantName') }}</span>
        <input v-model="form.tenant_name" required>
      </label>
      <div class="form-grid">
        <label>
          <span>{{ t('auth.password') }}</span>
          <input v-model="form.password" type="password" autocomplete="new-password" required>
        </label>
        <label>
          <span>{{ t('auth.confirmPassword') }}</span>
          <input v-model="form.password_confirmation" type="password" autocomplete="new-password" required>
        </label>
      </div>
      <p v-if="error" class="form-error">{{ error }}</p>
      <button class="button primary full" type="submit" :disabled="loading">
        {{ loading ? t('auth.loading') : t('auth.register') }}
      </button>
      <NuxtLink class="text-link" to="/auth/login">{{ t('auth.hasAccount') }}</NuxtLink>
    </form>
  </AuthPanel>
</template>
