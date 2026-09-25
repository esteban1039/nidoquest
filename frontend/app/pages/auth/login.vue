<script setup lang="ts">
const { t } = useI18n()
const { login, token, clearSession, role, user } = useSession()
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(true)
const form = reactive({
  email: 'guia@nidoquest.test',
  password: 'Password123!'
})
const error = ref('')

if (token.value === 'demo-token') {
  clearSession()
}

function fillDemoAccount(type: 'guide' | 'explorer' | 'admin') {
  error.value = ''
  if (type === 'guide') {
    form.email = 'guia@nidoquest.test'
    form.password = 'Password123!'
  } else if (type === 'explorer') {
    form.email = 'mateo@nidoquest.test'
    form.password = 'Password123!'
  } else {
    form.email = 'admin@nidoquest.test'
    form.password = 'Password123!'
  }
}

async function submit() {
  if (!form.email || !form.password) return
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
    console.error(loginError)
    error.value = getApiErrorMessage(loginError, 'No pudimos iniciar sesión. Revisa tu correo o contraseña.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthPanel
    :title="t('auth.welcome')"
    hint="Misiones, estrellas y hábitos"
    mode="login"
  >
    <!-- Quick Demo Accounts Helper -->
    <div class="demo-accounts-bar">
      <div class="demo-accounts-header">
        <span>💡</span>
        <small>Acceso rápido para probar:</small>
      </div>
      <div class="demo-pills-row">
        <button
          type="button"
          class="demo-pill-btn"
          :class="{ active: form.email === 'guia@nidoquest.test' }"
          @click="fillDemoAccount('guide')"
        >
          <span>👨‍👩‍👧</span>
          <span>Guía (Padres)</span>
        </button>
        <button
          type="button"
          class="demo-pill-btn"
          :class="{ active: form.email === 'mateo@nidoquest.test' }"
          @click="fillDemoAccount('explorer')"
        >
          <span>🚀</span>
          <span>Explorador (Hijo)</span>
        </button>
      </div>
    </div>

    <!-- Main Login Form -->
    <form class="auth-form-stack" @submit.prevent="submit">
      <!-- Error Alert -->
      <div v-if="error" class="auth-error-banner" role="alert">
        <span class="error-icon">⚠️</span>
        <div class="error-msg">
          <strong>Error al ingresar</strong>
          <p>{{ error }}</p>
        </div>
      </div>

      <!-- Email Field -->
      <div class="input-field-group">
        <label for="login-email">
          <span>{{ t('auth.email') }}</span>
        </label>
        <div class="input-with-icon">
          <span class="field-icon">✉️</span>
          <input
            id="login-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="ejemplo@correo.com"
            required
          >
        </div>
      </div>

      <!-- Password Field with Show/Hide Toggle -->
      <div class="input-field-group">
        <div class="label-with-link">
          <label for="login-password">
            <span>{{ t('auth.password') }}</span>
          </label>
          <NuxtLink class="forgot-link" to="/auth/forgot-password">
            {{ t('auth.forgotPassword') }}
          </NuxtLink>
        </div>
        <div class="input-with-icon">
          <span class="field-icon">🔒</span>
          <input
            id="login-password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            placeholder="••••••••••••"
            required
          >
          <button
            type="button"
            class="password-toggle-btn"
            :aria-label="showPassword ? 'Ocultar contraseña' : 'Ver contraseña'"
            @click="showPassword = !showPassword"
          >
            <span>{{ showPassword ? '🙈' : '👁️' }}</span>
          </button>
        </div>
      </div>

      <!-- Remember me checkbox -->
      <div class="remember-row">
        <label class="checkbox-label">
          <input v-model="rememberMe" type="checkbox">
          <span>{{ t('auth.rememberMe') }}</span>
        </label>
      </div>

      <!-- Submit Button -->
      <button
        class="auth-submit-btn"
        type="submit"
        :disabled="loading"
      >
        <span v-if="loading" class="btn-spinner" />
        <span>{{ loading ? t('auth.loading') : t('auth.login') }}</span>
      </button>

      <!-- Bottom link to Register -->
      <div class="auth-switch-link">
        <span>¿Aún no tienes cuenta?</span>
        <NuxtLink class="highlight-link" to="/auth/register">
          Comienza 7 días gratis →
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

/* Demo Accounts Bar */
.demo-accounts-bar {
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 14px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-accounts-header {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #475569;
  font-size: 0.78rem;
  font-weight: 700;
}

.demo-pills-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.demo-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 10px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  font-size: 0.78rem;
  font-weight: 700;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
}

.demo-pill-btn:hover {
  border-color: var(--mint);
  background: #f0fdfa;
  transform: translateY(-1px);
}

.demo-pill-btn.active {
  border-color: var(--mint-dark);
  background: #ccfbf1;
  color: #0f766e;
}

/* Error Banner */
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

.error-icon {
  font-size: 1.15rem;
  line-height: 1;
}

.error-msg strong {
  display: block;
  font-size: 0.85rem;
  font-weight: 800;
  margin-bottom: 2px;
}

.error-msg p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
  color: #b91c1c;
}

/* Input Field Groups */
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

.label-with-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.forgot-link {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--mint-dark);
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
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
  z-index: 2;
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
  transition: opacity 0.2s ease;
}

.password-toggle-btn:hover {
  opacity: 0.8;
  background: #f1f5f9;
}

/* Remember Row */
.remember-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  min-height: 16px;
  border-radius: 4px;
  accent-color: #0d9488;
  cursor: pointer;
}

/* Submit Button */
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
  margin-top: 6px;
}

.auth-submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(13, 148, 136, 0.45);
}

.auth-submit-btn:active:not(:disabled) {
  transform: translateY(0);
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

/* Switch Link */
.auth-switch-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.84rem;
  color: #64748b;
  padding-top: 6px;
  flex-wrap: wrap;
  text-align: center;
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
