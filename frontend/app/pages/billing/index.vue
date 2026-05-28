<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
const { checkout, loading, createCheckout, openCheckout } = useBilling()
const error = ref('')

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
  <section class="billing-page">
    <div class="billing-copy">
      <p class="eyebrow">{{ t('billing.eyebrow') }}</p>
      <h1>{{ t('billing.title') }}</h1>
      <p>{{ t('billing.subtitle') }}</p>
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
</template>
