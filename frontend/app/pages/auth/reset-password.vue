<script setup lang="ts">
const route = useRoute()
const { request } = useApi()
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const error = ref('')
const success = ref('')
const form = reactive({
  email: String(route.query.email || ''),
  token: String(route.query.token || ''),
  password: '',
  password_confirmation: '',
})

const passwordValid = computed(() => form.password.length >= 8)
const passwordsMatch = computed(() => form.password && form.password === form.password_confirmation)

async function submit() {
  if (!passwordValid.value) {
    error.value = 'La nueva contraseña debe tener al menos 8 caracteres.'
    return
  }

  if (!passwordsMatch.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await request('/auth/reset-password', {
      method: 'POST',
      body: form,
    })

    success.value = '¡Contraseña actualizada exitosamente! Ya puedes ingresar a tu Nido.'
  } catch (resetError) {
    error.value = getApiErrorMessage(resetError, 'No pudimos actualizar la contraseña. El enlace puede haber expirado.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthPanel
    title="Nueva contraseña"
    hint="Seguridad de tu cuenta"
    mode="reset"
  >
    <form class="auth-form-stack" @submit.prevent="submit">
      <!-- Alerts -->
      <div v-if="error" class="auth-error-banner" role="alert">
        <span class="error-icon">⚠️</span>
        <div class="error-msg">
          <strong>Error</strong>
          <p>{{ error }}</p>
        </div>
      </div>

      <div v-if="success" class="auth-success-banner" role="status">
        <span class="success-icon">🎉</span>
        <div class="success-msg">
          <strong>¡Contraseña lista!</strong>
          <p>{{ success }}</p>
        </div>
      </div>

      <!-- Email Field -->
      <div class="input-field-group">
        <label for="reset-email">
          <span>Correo electrónico</span>
        </label>
        <div class="input-with-icon">
          <span class="field-icon">✉️</span>
          <input
            id="reset-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
          >
        </div>
      </div>

      <!-- New Password -->
      <div class="input-field-group">
        <label for="reset-pass">
          <span>Nueva contraseña</span>
        </label>
        <div class="input-with-icon">
          <span class="field-icon">🔒</span>
          <input
            id="reset-pass"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            placeholder="Mínimo 8 caracteres"
            required
          >
          <button
            type="button"
            class="password-toggle-btn"
            @click="showPassword = !showPassword"
          >
            <span>{{ showPassword ? '🙈' : '👁️' }}</span>
          </button>
        </div>
      </div>

      <!-- Confirm New Password -->
      <div class="input-field-group">
        <label for="reset-pass-confirm">
          <span>Confirmar nueva contraseña</span>
          <span v-if="passwordsMatch" class="match-badge">✅ Coincide</span>
        </label>
        <div class="input-with-icon">
          <span class="field-icon">🔒</span>
          <input
            id="reset-pass-confirm"
            v-model="form.password_confirmation"
            :type="showConfirmPassword ? 'text' : 'password'"
            autocomplete="new-password"
            placeholder="Repite la contraseña"
            required
          >
          <button
            type="button"
            class="password-toggle-btn"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <span>{{ showConfirmPassword ? '🙈' : '👁️' }}</span>
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        class="auth-submit-btn"
        type="submit"
        :disabled="loading"
      >
        <span v-if="loading" class="btn-spinner" />
        <span>{{ loading ? 'Guardando...' : 'Cambiar Contraseña y Entrar 🚀' }}</span>
      </button>

      <!-- Bottom link to Login -->
      <div class="auth-switch-link">
        <NuxtLink class="highlight-link" to="/auth/login">
          ← Volver a Iniciar Sesión
        </NuxtLink>
      </div>
    </form>
  </AuthPanel>
</template>

<style scoped>
.auth-form-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-error-banner {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #fef2f2;
  border: 1.5px solid #fecaca;
  border-radius: 12px;
  padding: 12px 14px;
  color: #991b1b;
}

.auth-success-banner {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #f0fdf4;
  border: 1.5px solid #a7f3d0;
  border-radius: 12px;
  padding: 12px 14px;
  color: #065f46;
}

.error-icon, .success-icon {
  font-size: 1.15rem;
  line-height: 1;
}

.error-msg strong, .success-msg strong {
  display: block;
  font-size: 0.85rem;
  font-weight: 800;
  margin-bottom: 2px;
}

.error-msg p, .success-msg p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
}

.input-field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-field-group label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.84rem;
  font-weight: 800;
  color: #334155;
}

.match-badge {
  font-size: 0.74rem;
  color: #059669;
  font-weight: 800;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 14px;
  font-size: 1rem;
  color: #94a3b8;
  pointer-events: none;
}

.input-with-icon input {
  width: 100%;
  min-height: 48px;
  padding: 10px 42px 10px 42px;
  border: 1.5px solid #cbd5e1;
  border-radius: 14px;
  background: #ffffff;
  font-size: 0.95rem;
  color: #0f172a;
  transition: all 0.2s ease;
}

.input-with-icon input:focus {
  outline: none;
  border-color: #0d9488;
  box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.12);
}

.password-toggle-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  padding: 6px 8px;
  cursor: pointer;
  font-size: 1.1rem;
  color: #64748b;
  border-radius: 8px;
  display: grid;
  place-items: center;
}

.auth-submit-btn {
  width: 100%;
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #0d9488 0%, #059669 100%);
  color: #ffffff;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(13, 148, 136, 0.35);
  transition: all 0.2s ease;
}

.auth-submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(13, 148, 136, 0.45);
}

.auth-submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-switch-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6px;
}

.highlight-link {
  color: #0d9488;
  font-weight: 800;
  text-decoration: none;
}

.highlight-link:hover {
  text-decoration: underline;
}
</style>
