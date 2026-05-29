<script setup lang="ts">
const route = useRoute()
const { request } = useApi()
const loading = ref(false)
const error = ref('')
const success = ref('')
const form = reactive({
  email: String(route.query.email || ''),
  token: String(route.query.token || ''),
  password: '',
  password_confirmation: '',
})

async function submit() {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await request('/auth/reset-password', {
      method: 'POST',
      body: form,
    })

    success.value = 'Contrasena actualizada. Ya puedes ingresar.'
  } catch (resetError) {
    error.value = getApiErrorMessage(resetError, 'No pudimos actualizar la contrasena.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthPanel title="Nueva contrasena" hint="Crea una contrasena segura para volver a entrar.">
    <form class="form-stack" @submit.prevent="submit">
      <label>
        <span>Correo</span>
        <input v-model="form.email" type="email" autocomplete="email" required>
      </label>
      <label>
        <span>Nueva contrasena</span>
        <input v-model="form.password" type="password" autocomplete="new-password" minlength="10" required>
      </label>
      <label>
        <span>Confirmar contrasena</span>
        <input v-model="form.password_confirmation" type="password" autocomplete="new-password" minlength="10" required>
      </label>
      <p v-if="error" class="form-error">{{ error }}</p>
      <p v-if="success" class="form-success">{{ success }}</p>
      <button class="button primary full" type="submit" :disabled="loading">
        {{ loading ? 'Guardando' : 'Cambiar contrasena' }}
      </button>
      <NuxtLink class="text-link" to="/auth/login">Ingresar</NuxtLink>
    </form>
  </AuthPanel>
</template>
