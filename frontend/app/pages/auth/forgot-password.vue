<script setup lang="ts">
const { request } = useApi()
const loading = ref(false)
const error = ref('')
const success = ref('')
const form = reactive({ email: '' })

async function submit() {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await request('/auth/forgot-password', {
      method: 'POST',
      body: form,
    })

    success.value = 'Si el correo existe, enviaremos instrucciones para recuperar la contrasena.'
  } catch (forgotError) {
    error.value = getApiErrorMessage(forgotError, 'No pudimos enviar el correo de recuperacion.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthPanel title="Recuperar contrasena" hint="Te enviaremos un enlace seguro por correo.">
    <form class="form-stack" @submit.prevent="submit">
      <label>
        <span>Correo</span>
        <input v-model="form.email" type="email" autocomplete="email" required>
      </label>
      <p v-if="error" class="form-error">{{ error }}</p>
      <p v-if="success" class="form-success">{{ success }}</p>
      <button class="button primary full" type="submit" :disabled="loading">
        {{ loading ? 'Enviando' : 'Enviar enlace' }}
      </button>
      <NuxtLink class="text-link" to="/auth/login">Volver al login</NuxtLink>
    </form>
  </AuthPanel>
</template>
