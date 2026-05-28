<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
const { request } = useApi()

type Explorer = {
  id: number
  name: string
  available_stars: number
}

type ExplorerDashboard = {
  available_stars: number
  today_missions: { id: number; title: string }[]
  available_rewards: { id: number; name: string }[]
  badges: { id: number; name: string }[]
  weekly_progress: number
  daily_message: string
}

const { data: explorers } = await useAsyncData('explorers', async () => {
  const response = await request<{ data: Explorer[] | { data?: Explorer[] } }>('/explorers')

  return Array.isArray(response.data) ? response.data : response.data.data || []
})

const activeExplorer = computed(() => explorers.value?.[0] || null)

const { data: explorer } = await useAsyncData(
  'explorer-dashboard',
  () => activeExplorer.value
    ? request<ExplorerDashboard>(`/dashboard/explorer/${activeExplorer.value.id}`)
    : Promise.resolve(null),
  { watch: [activeExplorer] }
)
</script>

<template>
  <AppShell :title="t('dashboard.explorerTitle')" section="explorer">
    <section class="explorer-hero">
      <div>
        <p class="eyebrow">{{ explorer?.daily_message || t('dashboard.dailyMessage') }}</p>
        <h2>{{ activeExplorer?.name || t('ui.calmProgress') }}</h2>
      </div>
      <strong>{{ explorer?.available_stars || 0 }} {{ t('ui.stars') }}</strong>
    </section>

    <section class="dashboard-columns">
      <article class="panel wide">
        <div class="panel-header">
          <h2>{{ t('dashboard.todayMissions') }}</h2>
          <span>{{ explorer?.weekly_progress || 0 }}%</span>
        </div>
        <div class="mission-list">
          <div v-for="mission in explorer?.today_missions || []" :key="mission.id" class="mission-action">
            <span>{{ mission.title }}</span>
            <button class="button small primary" type="button">{{ t('dashboard.markDone') }}</button>
          </div>
          <div v-if="!explorer?.today_missions?.length" class="mission-action">
            <span>Aun no hay misiones para hoy.</span>
          </div>
        </div>
      </article>

      <article class="panel">
        <h2>{{ t('dashboard.nextGoal') }}</h2>
        <p class="goal-number">100 {{ t('ui.stars') }}</p>
        <div class="progress-track"><span :style="{ width: `${Math.min(100, explorer?.available_stars || 0)}%` }" /></div>
      </article>
    </section>

    <section class="dashboard-columns">
      <article class="panel">
        <h2>{{ t('dashboard.availableRewards') }}</h2>
        <div class="reward-list">
          <button v-for="reward in explorer?.available_rewards || []" :key="reward.id" class="reward-button" type="button">
            <span>{{ reward.name }}</span>
            <strong>{{ t('dashboard.redeem') }}</strong>
          </button>
          <p v-if="!explorer?.available_rewards?.length" class="muted">Aun no hay recompensas activas.</p>
        </div>
      </article>
      <article class="panel">
        <h2>{{ t('dashboard.badges') }}</h2>
        <div class="badge-list">
          <span v-for="badge in explorer?.badges || []" :key="badge.id">{{ badge.name }}</span>
          <p v-if="!explorer?.badges?.length" class="muted">Aun no hay insignias ganadas.</p>
        </div>
      </article>
    </section>
  </AppShell>
</template>
