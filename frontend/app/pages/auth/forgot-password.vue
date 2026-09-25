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

    success.value = '¡Listo! Si el correo está registrado, recibirás un enlace seguro para restablecer tu contraseña.'
  } catch (forgotError) {
    error.value = getApiErrorMessage(forgotError, 'No pudimos procesar la solicitud. Revisa el correo ingresado.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthPanel
    title="Recuperar contraseña"
    hint="Acceso y seguridad"
    mode="forgot"
  >
    <form class="auth-form-stack" @submit.prevent="submit">
      <p class="auth-instructions">
        Ingresa tu correo electrónico registrado y te enviaremos un enlace seguro para crear una nueva contraseña.
      </p>

      <!-- Alerts -->
      <div v-if="error" class="auth-error-banner" role="alert">
        <span class="error-icon">⚠️</span>
        <div class="error-msg">
          <strong>No se pudo enviar</strong>
          <p>{{ error }}</p>
        </div>
      </div>

      <div v-if="success" class="auth-success-banner" role="status">
        <span class="success-icon">✉️</span>
        <div class="success-msg">
          <strong>Enlace enviado</strong>
          <p>{{ success }}</p>
        </div>
      </div>

      <!-- Email Field -->
      <div class="input-field-group">
        <label for="forgot-email">
          <span>Correo electrónico</span>
        </label>
        <div class="input-with-icon">
          <span class="field-icon">✉️</span>
          <input
            id="forgot-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="ejemplo@correo.com"
            required
          >
        </div>
      </div>

      <!-- Submit Button -->
      <button
        class="auth-submit-btn"
        type="submit"
        :disabled="loading"
      >
        <span v-if="loading" class="btn-spinner" />
        <span>{{ loading ? 'Enviando enlace...' : 'Enviar enlace de recuperación ✉️' }}</span>
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

.auth-instructions {
  margin: 0;
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.5;
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
  font-size: 0.84rem;
  font-weight: 800;
  color: #334155;
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
  padding: 10px 14px 10px 42px;
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
