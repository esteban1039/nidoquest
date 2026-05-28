<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
const { request } = useApi()
const tones = ['mint', 'blue', 'yellow', 'coral'] as const

type GuideDashboard = {
  stars_by_explorer: { explorer_id: number; name: string; stars: number }[]
  pending_missions: number
  completed_missions: number
  expired_missions: number
  requested_rewards: number
  weekly_progress: number
  consistency_indicator: number
}

const { data: dashboard } = await useAsyncData('guide-dashboard', () => request<GuideDashboard>('/dashboard/guide'))

const stats = computed(() => [
  { key: 'pendingMissions', value: dashboard.value?.pending_missions ?? 0 },
  { key: 'completedMissions', value: dashboard.value?.completed_missions ?? 0 },
  { key: 'expiredMissions', value: dashboard.value?.expired_missions ?? 0 },
  { key: 'requestedRewards', value: dashboard.value?.requested_rewards ?? 0 },
])

const weeklyProgress = computed(() => {
  const progress = dashboard.value?.weekly_progress ?? 0
  const consistency = dashboard.value?.consistency_indicator ?? 0
  const base = Math.max(progress, consistency, 1)

  return [0, 0, 0, progress, consistency, progress + consistency, base].map((value) => Math.min(100, Math.round((value / base) * 100)))
})
</script>

<template>
  <AppShell :title="t('dashboard.guideTitle')" section="guide">
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
          <h2>{{ t('dashboard.starsByExplorer') }}</h2>
          <span>{{ t('ui.active') }}</span>
        </div>
        <div class="explorer-list">
          <div v-for="explorer in dashboard?.stars_by_explorer || []" :key="explorer.explorer_id" class="explorer-row">
            <span>{{ explorer.name }}</span>
            <strong>{{ explorer.stars }} {{ t('ui.stars') }}</strong>
          </div>
          <div v-if="!dashboard?.stars_by_explorer?.length" class="explorer-row">
            <span>Crea tu primer explorador en el inicio guiado</span>
            <strong>0 {{ t('ui.stars') }}</strong>
          </div>
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <h2>{{ t('dashboard.weeklyProgress') }}</h2>
          <span>{{ t('dashboard.consistency') }}</span>
        </div>
        <ProgressBars :values="weeklyProgress" />
      </article>
    </section>

    <section class="dashboard-columns">
      <article class="panel">
        <h2>{{ t('dashboard.strongAreas') }}</h2>
        <div class="tag-list">
          <span>Estudio</span>
          <span>Lectura</span>
        </div>
      </article>
      <article class="panel">
        <h2>{{ t('dashboard.areasToSupport') }}</h2>
        <div class="tag-list support">
          <span>Hogar</span>
          <span>Bienestar</span>
        </div>
      </article>
      <article class="panel">
        <h2>{{ t('dashboard.usedRewards') }}</h2>
        <ul class="plain-list">
          <li>Plan familiar especial</li>
        </ul>
      </article>
    </section>

    <section class="billing-banner">
      <div>
        <p class="eyebrow">{{ t('billing.eyebrow') }}</p>
        <h2>{{ t('billing.bannerTitle') }}</h2>
      </div>
      <NuxtLink class="button primary" to="/billing">{{ t('billing.manage') }}</NuxtLink>
    </section>
  </AppShell>
</template>
