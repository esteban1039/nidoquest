<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

const { t } = useI18n()
const { user, tenant, fetchMe, role } = useSession()
const { request } = useApi()
const route = useRoute()
const section = computed(() => user.value?.role === 'super_admin' ? 'admin' : user.value?.role === 'explorer' ? 'explorer' : 'guide')

// Active tab ('profile' | 'billing')
const activeTab = ref(route.query.tab === 'billing' ? 'billing' : 'profile')

// Watch query param changes
watch(() => route.query.tab, (newTab) => {
  if (newTab === 'billing' || newTab === 'profile') {
    activeTab.value = newTab
  }
})

// Password change state
const saving = ref(false)
const error = ref('')
const success = ref('')
const form = reactive({
  current_password: '',
  password: '',
  password_confirmation: '',
})

async function submitPassword() {
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
    success.value = 'Contraseña actualizada correctamente.'
    await fetchMe()
  } catch (passwordError) {
    error.value = getApiErrorMessage(passwordError, 'No pudimos cambiar la contraseña.')
  } finally {
    saving.value = false
  }
}

// Billing composable & state
const { checkout, loading: billingLoading, history, historyLoading, createCheckout, openCheckout, subscriptionStatus, fetchHistory } = useBilling()
const billingError = ref('')
const subscription = ref<Awaited<ReturnType<typeof subscriptionStatus>>['data'] | null>(null)

// Receipt Modal state
const selectedReceipt = ref<{
  id: string | number
  reference: string
  date: string
  period: string
  amount: number
  currency: string
  status: string
  clientName: string
  clientEmail: string
  nestName: string
} | null>(null)

function formatCurrency(amountCents: number, currency = 'COP') {
  const amount = amountCents / (currency === 'COP' ? 100 : 100)
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency || 'COP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getPeriodName(dateStr: string | null) {
  if (!dateStr) return 'Período actual'
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
}

function openReceiptModal(payment?: any) {
  if (payment) {
    selectedReceipt.value = {
      id: payment.id,
      reference: payment.reference || 'NQ-PAY-' + payment.id,
      date: formatDate(payment.paid_at || payment.created_at),
      period: getPeriodName(payment.paid_at || payment.created_at),
      amount: payment.amount_cents,
      currency: payment.currency || 'COP',
      status: payment.status || 'APPROVED',
      clientName: user.value?.name || 'Titular del Nido',
      clientEmail: user.value?.email || '',
      nestName: tenant.value?.name || 'Nido Familiar',
    }
  } else {
    // Sample / Demo receipt for preview
    selectedReceipt.value = {
      id: 'REC-DEMO-001',
      reference: 'WOMPI-REF-NQ9824',
      date: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
      period: new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' }),
      amount: 14900000,
      currency: 'COP',
      status: 'APPROVED',
      clientName: user.value?.name || 'Familia NidoQuest',
      clientEmail: user.value?.email || 'familia@nidoquest.com',
      nestName: tenant.value?.name || 'Nido Principal',
    }
  }
}

function closeReceiptModal() {
  selectedReceipt.value = null
}

function printReceipt() {
  if (import.meta.client) {
    window.print()
  }
}

onMounted(async () => {
  if (role.value === 'guide') {
    try {
      const [subRes] = await Promise.all([
        subscriptionStatus(),
        fetchHistory(),
      ])
      subscription.value = subRes.data
    } catch {
      subscription.value = null
    }
  }
})

async function prepareCheckout() {
  billingError.value = ''
  try {
    await createCheckout()
  } catch {
    billingError.value = t('billing.checkoutFallback')
  }
}
</script>

<template>
  <AppShell :title="role === 'guide' ? 'Perfil y Suscripción' : 'Mi perfil'" :section="section">
    <!-- User Header Card -->
    <div class="profile-user-summary">
      <div class="profile-avatar-circle">
        {{ (user?.name || 'N').charAt(0).toUpperCase() }}
      </div>
      <div class="profile-user-info">
        <strong>{{ user?.name }}</strong>
        <span>{{ user?.email }}</span>
        <span v-if="tenant?.name" style="font-size: 0.8rem; color: var(--muted);">
          🏡 Nido: <strong>{{ tenant.name }}</strong>
        </span>
      </div>
      <span class="profile-user-badge">
        {{ role === 'guide' ? 'Guía / Formador' : role === 'explorer' ? 'Explorador' : 'Admin' }}
      </span>
    </div>

    <!-- Profile & Billing Tabs for Guides -->
    <div v-if="role === 'guide'" class="profile-tabs-nav">
      <button
        class="profile-tab-btn"
        :class="{ active: activeTab === 'profile' }"
        type="button"
        @click="activeTab = 'profile'"
      >
        <span>👤 Datos del perfil</span>
      </button>
      <button
        class="profile-tab-btn"
        :class="{ active: activeTab === 'billing' }"
        type="button"
        @click="activeTab = 'billing'"
      >
        <span>💳 Suscripción y Cobros</span>
      </button>
    </div>

    <!-- TAB 1: Profile & Security -->
    <div v-show="activeTab === 'profile' || role !== 'guide'">
      <section class="panel">
        <div class="panel-header">
          <h2>Seguridad y Contraseña</h2>
          <span>Administra tus credenciales de acceso</span>
        </div>

        <p v-if="user?.must_change_password" class="form-error">
          Debes cambiar tu contraseña inicial antes de continuar.
        </p>
        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="success" class="form-success">{{ success }}</p>

        <form class="form-stack profile-form" @submit.prevent="submitPassword">
          <label>
            <span>Contraseña actual</span>
            <input v-model="form.current_password" type="password" required autocomplete="current-password">
          </label>
          <label>
            <span>Nueva contraseña</span>
            <input v-model="form.password" type="password" minlength="10" required autocomplete="new-password">
          </label>
          <label>
            <span>Confirmar nueva contraseña</span>
            <input v-model="form.password_confirmation" type="password" minlength="10" required autocomplete="new-password">
          </label>
          <button class="button primary" type="submit" :disabled="saving">
            {{ saving ? 'Guardando...' : 'Actualizar contraseña' }}
          </button>
        </form>
      </section>
    </div>

    <!-- TAB 2: Billing & Charges History (Guides Only) -->
    <div v-show="activeTab === 'billing' && role === 'guide'">
      <!-- Plan & Subscription Status Panel -->
      <section class="panel">
        <div class="panel-header">
          <h2>{{ t('billing.title') }}</h2>
          <span>{{ t('billing.eyebrow') }}</span>
        </div>

        <p v-if="subscription?.access" class="billing-status">
          {{ subscription.access.message }}
          <span v-if="subscription.access.state === 'trial'">
            {{ t('billing.trialDays', { days: subscription.access.trial_days_remaining || 0 }) }}
          </span>
        </p>

        <div class="billing-price">
          <span>{{ t('landing.priceTitle') }}</span>
          <strong>{{ t('landing.price') }}</strong>
        </div>

        <div class="form-stack" style="margin-top: 18px; max-width: 520px;">
          <button class="button primary full" type="button" :disabled="billingLoading" @click="prepareCheckout">
            {{ billingLoading ? t('auth.loading') : t('billing.prepare') }}
          </button>

          <div v-if="checkout" class="checkout-summary">
            <span>{{ t('billing.reference') }}</span>
            <strong>{{ checkout.reference }}</strong>
            <span>{{ t('billing.expires') }}</span>
            <strong>{{ new Date(checkout.checkout.expiration_time).toLocaleString() }}</strong>
            <button class="button primary full" type="button" @click="openCheckout">
              {{ t('billing.pay') }}
            </button>
          </div>

          <p v-if="billingError" class="form-error">{{ billingError }}</p>
        </div>
      </section>

      <!-- Monthly Charges & Receipts Section -->
      <section class="panel" style="margin-top: 24px;">
        <div class="panel-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2>Historial de Cobros y Recibos</h2>
            <span>Listado mes a mes de suscripción y comprobantes de pago</span>
          </div>
          <button
            v-if="history.length === 0"
            class="button secondary small"
            type="button"
            @click="openReceiptModal()"
          >
            📄 Ver modelo de recibo
          </button>
        </div>

        <div v-if="historyLoading" style="padding: 24px; text-align: center; color: var(--muted);">
          Cargando historial de pagos...
        </div>

        <!-- Real Payments List -->
        <div v-else-if="history.length > 0" class="payments-table-container">
          <table class="payments-table">
            <thead>
              <tr>
                <th>Período / Fecha</th>
                <th>Referencia</th>
                <th>Monto</th>
                <th>Estado</th>
                <th style="text-align: right;">Comprobante</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in history" :key="item.id">
                <td>
                  <strong>{{ getPeriodName(item.paid_at || item.created_at) }}</strong>
                  <div style="font-size: 0.78rem; color: var(--muted);">{{ formatDate(item.paid_at || item.created_at) }}</div>
                </td>
                <td>
                  <span class="payment-ref-badge">{{ item.reference }}</span>
                </td>
                <td>
                  <strong>{{ formatCurrency(item.amount_cents, item.currency) }}</strong>
                </td>
                <td>
                  <span
                    class="payment-status-pill"
                    :class="item.status.toLowerCase()"
                  >
                    {{ item.status === 'APPROVED' || item.status === 'approved' ? 'Aprobado' : item.status }}
                  </span>
                </td>
                <td style="text-align: right;">
                  <button class="btn-receipt" type="button" @click="openReceiptModal(item)">
                    <span>🧾</span>
                    <span>Ver recibo</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State (e.g. During Free Trial) -->
        <div v-else style="padding: 28px 16px; text-align: center; background: var(--surface-hover); border-radius: var(--radius-md); border: 1px dashed var(--line-light);">
          <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 6px; color: var(--text);">
            🌱 Estás disfrutando del período de prueba gratuita
          </p>
          <p style="font-size: 0.88rem; color: var(--muted); max-width: 480px; margin: 0 auto 16px auto;">
            Una vez actives tu suscripción anual con Wompi, aquí aparecerá el desglose mes a mes con sus respectivos recibos y comprobantes oficiales para descargar o imprimir.
          </p>
          <button class="button secondary small" type="button" @click="openReceiptModal()">
            <span>🧾 Previsualizar formato de recibo</span>
          </button>
        </div>
      </section>
    </div>

    <!-- Official Receipt Modal -->
    <div v-if="selectedReceipt" class="receipt-modal-backdrop" @click.self="closeReceiptModal">
      <div class="receipt-modal-dialog">
        <div class="receipt-paper">
          <!-- Receipt Header -->
          <div class="receipt-header">
            <div class="receipt-brand">
              <div class="receipt-brand-mark">NQ</div>
              <div>
                <div class="receipt-brand-title">NidoQuest</div>
                <div class="receipt-brand-sub">Misiones, hábitos y recompensas</div>
              </div>
            </div>
            <div class="receipt-doc-info">
              <div class="receipt-doc-number">RECIBO #{{ selectedReceipt.id }}</div>
              <div class="receipt-doc-date">Fecha: {{ selectedReceipt.date }}</div>
              <div class="receipt-stamp">PAGADO</div>
            </div>
          </div>

          <!-- Customer & Nest Info -->
          <div class="receipt-details-grid">
            <div class="receipt-detail-item">
              <span>Titular del Nido:</span>
              <span>{{ selectedReceipt.clientName }}</span>
            </div>
            <div class="receipt-detail-item">
              <span>Correo electrónico:</span>
              <span>{{ selectedReceipt.clientEmail }}</span>
            </div>
            <div class="receipt-detail-item">
              <span>Nido Familiar:</span>
              <span>{{ selectedReceipt.nestName }}</span>
            </div>
            <div class="receipt-detail-item">
              <span>Referencia de pago:</span>
              <span style="font-family: monospace;">{{ selectedReceipt.reference }}</span>
            </div>
          </div>

          <!-- Items Breakdown -->
          <table class="receipt-items-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Período</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Suscripción NidoQuest Familiar</strong>
                  <div style="font-size: 0.75rem; color: #64748b;">Plan anual completo con acceso ilimitado a formadores y exploradores</div>
                </td>
                <td>{{ selectedReceipt.period }}</td>
                <td style="text-align: right; font-weight: 600;">
                  {{ formatCurrency(selectedReceipt.amount, selectedReceipt.currency) }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Totals -->
          <div class="receipt-totals">
            <div class="receipt-total-row">
              <span>Subtotal:</span>
              <span>{{ formatCurrency(selectedReceipt.amount, selectedReceipt.currency) }}</span>
            </div>
            <div class="receipt-total-row">
              <span>IVA (0% Régimen):</span>
              <span>$0 COP</span>
            </div>
            <div class="receipt-total-row grand-total">
              <span>Total Pagado:</span>
              <span>{{ formatCurrency(selectedReceipt.amount, selectedReceipt.currency) }}</span>
            </div>
          </div>

          <!-- Receipt Footer -->
          <div class="receipt-footer">
            <p>Procesado de forma segura mediante <strong>Wompi Colombia</strong>.</p>
            <p style="margin-top: 4px;">Gracias por cuidar los hábitos y la armonía de tu Nido Familiar.</p>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="receipt-actions">
          <button class="button secondary small" type="button" @click="closeReceiptModal">
            Cerrar
          </button>
          <button class="button primary small" type="button" @click="printReceipt">
            🖨️ Imprimir / Guardar PDF
          </button>
        </div>
      </div>
    </div>
  </AppShell>
</template>

<style scoped>
.profile-user-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 16px 18px;
  background: #ffffff;
  border-radius: 18px;
  border: 1.5px solid #e2e8f0;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  flex-wrap: wrap;
}

.profile-avatar-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d9488, #059669);
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 1.25rem;
  font-weight: 800;
  flex-shrink: 0;
}

.profile-user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 160px;
}

.profile-user-info strong {
  font-size: 1.05rem;
  color: #0f172a;
}

.profile-user-info span {
  font-size: 0.84rem;
  color: #64748b;
}

.profile-user-badge {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  background: #ccfbf1;
  color: #0f766e;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.profile-tabs-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  background: #f1f5f9;
  padding: 5px;
  border-radius: 14px;
  margin-bottom: 22px;
}

.profile-tab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.86rem;
  font-weight: 700;
  color: #64748b;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.profile-tab-btn:hover {
  color: #0f172a;
}

.profile-tab-btn.active {
  background: #ffffff;
  color: #0d9488;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

@media (max-width: 640px) {
  .profile-user-summary {
    padding: 14px;
  }

  .profile-tab-btn {
    font-size: 0.78rem;
    padding: 8px 6px;
  }
}
</style>

