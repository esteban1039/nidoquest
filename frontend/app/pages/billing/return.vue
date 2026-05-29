<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

const { t } = useI18n()
const route = useRoute()
const { transactionStatus } = useBilling()
const loading = ref(Boolean(route.query.id))
const status = ref('')

onMounted(async () => {
  const id = String(route.query.id || '')

  if (!id) {
    return
  }

  try {
    const response = await transactionStatus(id) as { data?: { status?: string } }
    status.value = response.data?.status || ''
  } catch {
    status.value = 'PENDING'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <AppShell title="Estado del pago" section="guide">
    <section class="billing-return">
      <div class="return-card">
        <p class="eyebrow">{{ t('billing.returnEyebrow') }}</p>
        <h1>{{ loading ? t('billing.verifying') : t('billing.returnTitle') }}</h1>
        <p>{{ status ? t(`billing.status.${status.toLowerCase()}`) : t('billing.returnText') }}</p>
        <NuxtLink class="button primary" to="/dashboard/guide">{{ t('nav.dashboard') }}</NuxtLink>
      </div>
    </section>
  </AppShell>
</template>
