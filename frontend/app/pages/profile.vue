<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

const { user, fetchMe } = useSession()
const { request } = useApi()
const section = computed(() => user.value?.role === 'super_admin' ? 'admin' : user.value?.role === 'explorer' ? 'explorer' : 'guide')
const saving = ref(false)
const error = ref('')
const success = ref('')
const form = reactive({
  current_password: '',
  password: '',
  password_confirmation: '',
})

async function submit() {
  saving.value = true
  error.value = ''
  success.value = ''

  try {
    await request('/me/password', {
      method: 'POST',
      body: form,
    })

    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''
    success.value = 'Contrasena actualizada.'
    await fetchMe()
  } catch (passwordError) {
    error.value = getApiErrorMessage(passwordError, 'No pudimos cambiar la contrasena.')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <AppShell title="Mi perfil" :section="section">
    <section class="panel">
      <div class="panel-header">
        <h2>{{ user?.name }}</h2>
        <span>{{ user?.email }}</span>
      </div>

      <p v-if="user?.must_change_password" class="form-error">
        Debes cambiar tu contrasena inicial antes de continuar.
      </p>
      <p v-if="error" class="form-error">{{ error }}</p>
      <p v-if="success" class="form-success">{{ success }}</p>

      <form class="form-stack profile-form" @submit.prevent="submit">
        <label>
          <span>Contrasena actual</span>
          <input v-model="form.current_password" type="password" required>
        </label>
        <label>
          <span>Nueva contrasena</span>
          <input v-model="form.password" type="password" minlength="10" required>
        </label>
        <label>
          <span>Confirmar nueva contrasena</span>
          <input v-model="form.password_confirmation" type="password" minlength="10" required>
        </label>
        <button class="button primary" type="submit" :disabled="saving">Actualizar contrasena</button>
      </form>
    </section>
  </AppShell>
</template>
