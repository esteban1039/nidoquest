<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

const { t } = useI18n()
const { checkout, loading, createCheckout, openCheckout, subscriptionStatus } = useBilling()
const error = ref('')
const subscription = ref<Awaited<ReturnType<typeof subscriptionStatus>>['data'] | null>(null)

onMounted(async () => {
  try {
    const response = await subscriptionStatus()
    subscription.value = response.data
  } catch {
    subscription.value = null
  }
})

async function prepareCheckout() {
  error.value = ''

  try {
    await createCheckout()
  } catch {
    error.value = t('billing.checkoutFallback')
  }
}
</script>

<template>
  <AppShell title="Cobros" section="guide">
    <section class="billing-page">
      <div class="billing-copy">
        <p class="eyebrow">{{ t('billing.eyebrow') }}</p>
        <h1>{{ t('billing.title') }}</h1>
        <p>{{ t('billing.subtitle') }}</p>
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
      </div>

      <aside class="billing-card">
        <h2>{{ t('billing.checkoutTitle') }}</h2>
        <p>{{ t('billing.checkoutText') }}</p>

        <button class="button primary full" type="button" :disabled="loading" @click="prepareCheckout">
          {{ loading ? t('auth.loading') : t('billing.prepare') }}
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

        <p v-if="error" class="form-error">{{ error }}</p>
      </aside>
    </section>
  </AppShell>
</template>
