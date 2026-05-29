<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

const { t } = useI18n()
const { request } = useApi()
const tones = ['blue', 'mint', 'yellow', 'coral'] as const

type TenantRow = {
  id: number
  name: string
  status: string
  owner_name: string | null
  owner_email: string | null
  owner_last_login_at: string | null
  explorers_count: number
  missions_count: number
  rewards_count: number
}

type AdminDashboard = {
  tenants: number
  active_tenants: number
  trial_tenants: number
  explorers: number
  missions: number
  missions_approved: number
  tenant_rows: TenantRow[]
}

const { data: admin } = await useAsyncData('admin-dashboard', () => request<AdminDashboard>('/dashboard/admin'))

const stats = computed(() => [
  { key: 'tenants', label: 'Nidos vendidos', value: admin.value?.tenants ?? 0 },
  { key: 'explorers', label: 'Exploradores', value: admin.value?.explorers ?? 0 },
  { key: 'missions', label: 'Misiones creadas', value: admin.value?.missions ?? 0 },
  { key: 'trial', label: 'Nidos en prueba', value: admin.value?.trial_tenants ?? 0 },
])
</script>

<template>
  <AppShell :title="t('dashboard.adminTitle')" section="admin">
    <section class="dashboard-grid">
      <MetricCard
        v-for="(stat, index) in stats"
        :key="stat.key"
        :label="stat.label"
        :value="stat.value"
        :tone="tones[index]"
      />
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>Clientes SaaS</h2>
        <span>{{ admin?.active_tenants || 0 }} activos</span>
      </div>

      <div class="tenant-table">
        <div class="tenant-row tenant-heading">
          <strong>Nido</strong>
          <strong>Comprador</strong>
          <strong>Ultimo ingreso</strong>
          <strong>Exploradores</strong>
          <strong>Misiones</strong>
        </div>
        <div v-for="tenant in admin?.tenant_rows || []" :key="tenant.id" class="tenant-row">
          <span>{{ tenant.name }}<small>{{ tenant.status }}</small></span>
          <span>{{ tenant.owner_name || 'Sin propietario' }}<small>{{ tenant.owner_email }}</small></span>
          <span>{{ tenant.owner_last_login_at ? new Date(tenant.owner_last_login_at).toLocaleString() : 'Sin ingreso' }}</span>
          <strong>{{ tenant.explorers_count }}</strong>
          <strong>{{ tenant.missions_count }}</strong>
        </div>
      </div>
    </section>
  </AppShell>
</template>
