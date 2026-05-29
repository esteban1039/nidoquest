<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

const { t } = useI18n()
const { request } = useApi()

type Explorer = {
  id: number
  name: string
  available_stars: number
}

type ExplorerDashboard = {
  available_stars: number
  reserved_stars: number
  redeemable_stars: number
  today_missions: { id: number; title: string; stars?: number }[]
  available_rewards: { id: number; name: string; description?: string | null; stars_cost: number; type: string; can_redeem: boolean }[]
  reward_redemptions: { id: number; reward_name: string; status: string; stars_cost: number; created_at: string; approved_at?: string | null; delivered_at?: string | null }[]
  badges: { id: number; name: string }[]
  weekly_progress: number
  daily_message: string
}

const submittingMission = ref<number | null>(null)
const redeemingReward = ref<number | null>(null)
const error = ref('')
const success = ref('')

const redemptionStatusLabels: Record<string, string> = {
  requested: 'Solicitada',
  approved: 'Aprobada',
  rejected: 'Rechazada',
  delivered: 'Entregada',
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

async function submitMission(missionId: number) {
  submittingMission.value = missionId
  error.value = ''
  success.value = ''

  try {
    await request(`/missions/${missionId}/submit`, {
      method: 'POST',
      body: {},
    })

    await refreshNuxtData('explorer-dashboard')
  } catch (submitError) {
    error.value = getApiErrorMessage(submitError, 'No pudimos marcar la mision como realizada.')
  } finally {
    submittingMission.value = null
  }
}

async function redeemReward(reward: ExplorerDashboard['available_rewards'][number]) {
  if (!activeExplorer.value) {
    return
  }

  redeemingReward.value = reward.id
  error.value = ''
  success.value = ''

  try {
    await request(`/rewards/${reward.id}/redeem`, {
      method: 'POST',
      body: { explorer_id: activeExplorer.value.id },
    })

    success.value = 'Recompensa solicitada. Un formador la revisara pronto.'
    await refreshNuxtData('explorer-dashboard')
  } catch (redeemError) {
    error.value = getApiErrorMessage(redeemError, 'No pudimos solicitar la recompensa.')
  } finally {
    redeemingReward.value = null
  }
}
</script>

<template>
  <AppShell :title="t('dashboard.explorerTitle')" section="explorer">
    <section class="explorer-hero">
      <div>
        <p class="eyebrow">{{ explorer?.daily_message || t('dashboard.dailyMessage') }}</p>
        <h2>{{ activeExplorer?.name || t('ui.calmProgress') }}</h2>
      </div>
      <strong>{{ explorer?.redeemable_stars ?? explorer?.available_stars ?? 0 }} {{ t('ui.stars') }}</strong>
    </section>

    <section class="dashboard-columns">
      <article class="panel wide">
        <div class="panel-header">
          <h2>{{ t('dashboard.todayMissions') }}</h2>
          <span>{{ explorer?.weekly_progress || 0 }}%</span>
        </div>
        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="success" class="form-success">{{ success }}</p>
        <div class="mission-list">
          <div v-for="mission in explorer?.today_missions || []" :key="mission.id" class="mission-action">
            <span>{{ mission.title }} <strong v-if="mission.stars">+{{ mission.stars }} {{ t('ui.stars') }}</strong></span>
            <button class="button small primary" type="button" :disabled="submittingMission === mission.id" @click="submitMission(mission.id)">
              {{ submittingMission === mission.id ? t('auth.loading') : t('dashboard.markDone') }}
            </button>
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
        <p class="muted" v-if="explorer?.reserved_stars">Tienes {{ explorer.reserved_stars }} estrellas reservadas en solicitudes pendientes.</p>
        <div class="reward-list">
          <button
            v-for="reward in explorer?.available_rewards || []"
            :key="reward.id"
            class="reward-button"
            type="button"
            :disabled="!reward.can_redeem || redeemingReward === reward.id"
            @click="redeemReward(reward)"
          >
            <span>{{ reward.name }}<small>{{ reward.stars_cost }} {{ t('ui.stars') }}</small></span>
            <strong>{{ redeemingReward === reward.id ? t('auth.loading') : reward.can_redeem ? t('dashboard.redeem') : 'Faltan estrellas' }}</strong>
          </button>
          <p v-if="!explorer?.available_rewards?.length" class="muted">Aun no hay recompensas activas.</p>
        </div>
      </article>
      <article class="panel">
        <h2>Mis solicitudes</h2>
        <div class="reward-list">
          <div v-for="redemption in explorer?.reward_redemptions || []" :key="redemption.id" class="reward-button">
            <span>{{ redemption.reward_name }}<small>{{ redemption.stars_cost }} {{ t('ui.stars') }}</small></span>
            <strong>{{ redemptionStatusLabels[redemption.status] || redemption.status }}</strong>
          </div>
          <p v-if="!explorer?.reward_redemptions?.length" class="muted">Aun no has solicitado recompensas.</p>
        </div>
      </article>
    </section>
  </AppShell>
</template>
