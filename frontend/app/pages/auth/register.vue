<script setup lang="ts">
const { t, locale } = useI18n()
const { register, clearSession } = useSession()
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const error = ref('')
const form = reactive({
  name: '',
  email: '',
  tenant_name: '',
  password: '',
  password_confirmation: ''
})

clearSession()

const passwordLengthValid = computed(() => form.password.length >= 8)
const passwordsMatch = computed(() => {
  return form.password && form.password_confirmation && form.password === form.password_confirmation
})

async function submit() {
  if (!passwordLengthValid.value) {
    error.value = 'La contraseña debe tener al menos 8 caracteres.'
    return
  }

  if (form.password !== form.password_confirmation) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await register({ ...form, locale: locale.value })
    await navigateTo('/onboarding')
  } catch (registerError) {
    error.value = getApiErrorMessage(registerError, 'No pudimos crear el Nido. Revisa los datos y vuelve a intentarlo.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthPanel
    :title="t('auth.create')"
    hint="Empieza tu prueba de 7 días gratis"
    mode="register"
  >
    <!-- Value proposition mini-banner -->
    <div class="register-perks-box">
      <div class="perk-badge">🎁 7 DÍAS GRATIS</div>
      <p class="perks-text">Acceso completo e ilimitado para toda tu familia. Sin compromisos.</p>
    </div>

    <!-- Main Register Form -->
    <form class="auth-form-stack" @submit.prevent="submit">
      <!-- Error Alert -->
      <div v-if="error" class="auth-error-banner" role="alert">
        <span class="error-icon">⚠️</span>
        <div class="error-msg">
          <strong>No pudimos crear la cuenta</strong>
          <p>{{ error }}</p>
        </div>
      </div>

      <!-- Parent / Guide Name -->
      <div class="input-field-group">
        <label for="reg-name">
          <span>{{ t('auth.name') }}</span>
        </label>
        <div class="input-with-icon">
          <span class="field-icon">👤</span>
          <input
            id="reg-name"
            v-model="form.name"
            autocomplete="name"
            placeholder="Ej: Laura Gómez (Mamá/Papá)"
            required
          >
        </div>
      </div>

      <!-- Email Field -->
      <div class="input-field-group">
        <label for="reg-email">
          <span>{{ t('auth.email') }}</span>
        </label>
        <div class="input-with-icon">
          <span class="field-icon">✉️</span>
          <input
            id="reg-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="tu@correo.com"
            required
          >
        </div>
      </div>

      <!-- Family Nest Name -->
      <div class="input-field-group">
        <label for="reg-tenant">
          <span>{{ t('auth.tenantName') }}</span>
        </label>
        <div class="input-with-icon">
          <span class="field-icon">🏡</span>
          <input
            id="reg-tenant"
            v-model="form.tenant_name"
            placeholder="Ej: Familia Gómez"
            required
          >
        </div>
        <small class="field-hint">Así se llamará el espacio privado de tu hogar</small>
      </div>

      <!-- Passwords Row -->
      <div class="passwords-grid">
        <!-- Password -->
        <div class="input-field-group">
          <label for="reg-password">
            <span>{{ t('auth.password') }}</span>
          </label>
          <div class="input-with-icon">
            <span class="field-icon">🔒</span>
            <input
              id="reg-password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Mínimo 8 caracteres"
              required
            >
            <button
              type="button"
              class="password-toggle-btn"
              :aria-label="showPassword ? 'Ocultar' : 'Ver'"
              @click="showPassword = !showPassword"
            >
              <span>{{ showPassword ? '🙈' : '👁️' }}</span>
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="input-field-group">
          <label for="reg-password-confirm">
            <span>{{ t('auth.confirmPassword') }}</span>
            <span v-if="passwordsMatch" class="match-badge">✅ Coincide</span>
          </label>
          <div class="input-with-icon">
            <span class="field-icon">🔒</span>
            <input
              id="reg-password-confirm"
              v-model="form.password_confirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Repite la contraseña"
              required
            >
            <button
              type="button"
              class="password-toggle-btn"
              :aria-label="showConfirmPassword ? 'Ocultar' : 'Ver'"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <span>{{ showConfirmPassword ? '🙈' : '👁️' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        class="auth-submit-btn register-gradient"
        type="submit"
        :disabled="loading"
      >
        <span v-if="loading" class="btn-spinner" />
        <span>{{ loading ? t('auth.loading') : 'Crear mi Nido y Comenzar Gratis ✨' }}</span>
      </button>

      <!-- Bottom link to Login -->
      <div class="auth-switch-link">
        <span>¿Ya tienes una cuenta creada?</span>
        <NuxtLink class="highlight-link" to="/auth/login">
          Iniciar sesión aquí →
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

/* Perks Box */
.register-perks-box {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border: 1.5px solid #a7f3d0;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.perk-badge {
  background: #059669;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 900;
  padding: 4px 8px;
  border-radius: 6px;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.perks-text {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: #065f46;
  line-height: 1.35;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.84rem;
  font-weight: 800;
  color: #334155;
}

.field-hint {
  font-size: 0.74rem;
  color: #64748b;
  margin-top: 1px;
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

/* Passwords Grid */
.passwords-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 520px) {
  .passwords-grid {
    grid-template-columns: 1fr;
  }
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

.auth-submit-btn.register-gradient {
  background: linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #059669 100%);
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
