<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
const { request } = useApi()
const tones = ['blue', 'mint', 'yellow', 'coral'] as const

type AdminDashboard = {
  tenants: number
  active_tenants: number
  trial_tenants: number
  explorers: number
  missions_approved: number
}

const { data: admin } = await useAsyncData('admin-dashboard', () => request<AdminDashboard>('/dashboard/admin'))

const stats = computed(() => [
  { key: 'tenants', value: admin.value?.tenants ?? 0 },
  { key: 'users', value: admin.value?.explorers ?? 0 },
  { key: 'plans', value: admin.value?.trial_tenants ?? 0 },
  { key: 'payments', value: admin.value?.missions_approved ?? 0 },
])

const metrics = computed(() => [
  { name: 'Nidos activos', value: String(admin.value?.active_tenants ?? 0) },
  { name: 'Nidos en prueba', value: String(admin.value?.trial_tenants ?? 0) },
  { name: 'Misiones aprobadas', value: String(admin.value?.missions_approved ?? 0) },
])
</script>

<template>
  <AppShell :title="t('dashboard.adminTitle')" section="admin">
    <section class="dashboard-grid">
      <MetricCard
        v-for="(stat, index) in stats"
        :key="stat.key"
        :label="t(`dashboard.${stat.key}`)"
        :value="stat.value"
        :tone="tones[index]"
      />
    </section>

    <section class="dashboard-columns">
      <article class="panel wide">
        <div class="panel-header">
          <h2>{{ t('dashboard.globalMetrics') }}</h2>
          <span>{{ t('ui.active') }}</span>
        </div>
        <div class="admin-metrics">
          <div v-for="metric in metrics" :key="metric.name">
            <span>{{ metric.name }}</span>
            <strong>{{ metric.value }}</strong>
          </div>
        </div>
      </article>
      <article class="panel">
        <h2>{{ t('dashboard.payments') }}</h2>
        <p class="muted">{{ t('landing.price') }}</p>
        <div class="progress-track"><span :style="{ width: `${Math.min(100, admin?.active_tenants || 0)}%` }" /></div>
      </article>
    </section>
  </AppShell>
</template>
