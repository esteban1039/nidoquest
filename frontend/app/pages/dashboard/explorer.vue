<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

const { t } = useI18n()
const { request } = useApi()
const { showNotification } = usePwa()

type Explorer = {
  id: number
  name: string
  available_stars: number
}

type StreakData = {
  count: number
  is_active_today: boolean
  at_risk: boolean
  shields: number
  multiplier: number
  multiplier_label?: string | null
  next_milestone: number
  days_to_milestone: number
  progress_percent: number
}

type DailySpinData = {
  can_spin: boolean
  last_spin_date?: string | null
  prizes?: any[]
}

type ExplorerDashboard = {
  available_stars: number
  reserved_stars: number
  redeemable_stars: number
  streak?: StreakData
  daily_spin?: DailySpinData
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

const selectedExplorerId = ref<number | null>(null)

const activeExplorer = computed(() => {
  const list = explorers.value || []
  return list.find((explorer) => explorer.id === selectedExplorerId.value) || list[0] || null
})

const nextGoal = computed(() => {
  const costs = (explorer.value?.available_rewards || [])
    .map((reward) => reward.stars_cost)
    .filter((cost) => cost > 0)
  return costs.length ? Math.min(...costs) : null
})

const goalProgress = computed(() => {
  if (!nextGoal.value) {
    return 0
  }
  return Math.min(100, ((explorer.value?.available_stars || 0) / nextGoal.value) * 100)
})

const { data: explorer, refresh: refreshExplorer } = await useAsyncData(
  'explorer-dashboard',
  () => activeExplorer.value
    ? request<ExplorerDashboard>(`/dashboard/explorer/${activeExplorer.value.id}`)
    : Promise.resolve(null),
  { watch: [activeExplorer] }
)

function onSpinComplete(result: { prize: any; available_stars: number; streak: any }) {
  if (explorer.value) {
    explorer.value.available_stars = result.available_stars
    explorer.value.redeemable_stars = Math.max(0, result.available_stars - (explorer.value.reserved_stars || 0))
    if (result.streak) {
      explorer.value.streak = result.streak
    }
    if (explorer.value.daily_spin) {
      explorer.value.daily_spin.can_spin = false
    }
  }
  success.value = `🎉 ¡Ganaste ${result.prize.name}! Tus estrellas se han actualizado.`
}

async function submitMission(missionId: number) {
  submittingMission.value = missionId
  error.value = ''
  success.value = ''

  try {
    const result = await request<{ queued?: boolean }>(`/missions/${missionId}/submit`, {
      method: 'POST',
      body: {},
    })

    if (result?.queued) {
      success.value = t('ui.queuedAction')
    } else {
      success.value = '🚀 ¡Misión enviada a revisión! Tu formador la revisará pronto.'
      showNotification({
        title: '🎯 Misión enviada',
        body: 'Has enviado tu misión a revisión. ¡Sigue con esa racha!',
        icon: '/icons/icon.svg',
      })
    }

    await refreshExplorer()
  } catch (submitError) {
    error.value = getApiErrorMessage(submitError, 'No pudimos marcar la misión como realizada.')
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
    const result = await request<{ queued?: boolean }>(`/rewards/${reward.id}/redeem`, {
      method: 'POST',
      body: { explorer_id: activeExplorer.value.id },
    })

    success.value = result?.queued ? t('ui.queuedAction') : '🎁 Recompensa solicitada. Un formador la revisará pronto.'
    await refreshExplorer()
  } catch (redeemError) {
    error.value = getApiErrorMessage(redeemError, 'No pudimos solicitar la recompensa.')
  } finally {
    redeemingReward.value = null
  }
}
</script>

<template>
  <AppShell :title="t('dashboard.explorerTitle')" section="explorer">
    <!-- PWA Install & Push Notification Banner -->
    <PwaBanner />

    <!-- Explorer Hero Bar -->
    <section class="explorer-hero">
      <div>
        <p class="eyebrow">{{ explorer?.daily_message || t('dashboard.dailyMessage') }}</p>
        <h2>{{ activeExplorer?.name || t('ui.calmProgress') }}</h2>
      </div>
      <div class="explorer-hero-stars">
        <span class="stars-icon">⭐</span>
        <strong>{{ explorer?.redeemable_stars ?? explorer?.available_stars ?? 0 }}</strong>
        <span class="stars-label">{{ t('ui.stars') }}</span>
      </div>
    </section>

    <!-- Explorer Picker Switcher (if multiple kids) -->
    <div v-if="(explorers || []).length > 1" class="explorer-picker" style="margin-bottom: 20px;">
      <label for="explorer-picker">{{ t('dashboard.viewingAs') }}</label>
      <select id="explorer-picker" v-model.number="selectedExplorerId">
        <option v-for="item in explorers || []" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
    </div>

    <!-- ═══ GAMIFICATION: STREAK BANNER & DAILY LUCKY WHEEL ═══ -->
    <StreakBanner :streak="explorer?.streak" />

    <DailyLuckyWheel
      v-if="activeExplorer"
      :explorer-id="activeExplorer.id"
      :can-spin="explorer?.daily_spin?.can_spin ?? true"
      :last-spin-date="explorer?.daily_spin?.last_spin_date"
      @spin-complete="onSpinComplete"
    />

    <!-- Feedback Alerts -->
    <p v-if="error" class="form-error" style="margin-bottom: 16px;">{{ error }}</p>
    <p v-if="success" class="form-success" style="margin-bottom: 16px;">{{ success }}</p>

    <!-- ═══ MAIN SECTIONS ═══ -->
    <section class="dashboard-columns">
      <article class="panel wide">
        <div class="panel-header">
          <h2>{{ t('dashboard.todayMissions') }}</h2>
          <span>{{ explorer?.weekly_progress || 0 }}% esta semana</span>
        </div>
        <div class="mission-list">
          <div v-for="mission in explorer?.today_missions || []" :key="mission.id" class="mission-action">
            <span>{{ mission.title }} <strong v-if="mission.stars">+{{ mission.stars }} {{ t('ui.stars') }}</strong></span>
            <button
              class="button small primary"
              type="button"
              :disabled="submittingMission === mission.id"
              @click="submitMission(mission.id)"
            >
              {{ submittingMission === mission.id ? t('auth.loading') : '✅ ' + t('dashboard.markDone') }}
            </button>
          </div>
          <div v-if="!explorer?.today_missions?.length" class="mission-action" style="padding: 24px; text-align: center; color: var(--muted);">
            <span>🎉 ¡Excelente trabajo! No tienes misiones pendientes por hoy.</span>
          </div>
        </div>
      </article>

      <article class="panel">
        <h2>{{ t('dashboard.nextGoal') }}</h2>
        <p v-if="nextGoal" class="goal-number">{{ nextGoal }} {{ t('ui.stars') }}</p>
        <p v-else class="muted">{{ t('dashboard.noGoal') }}</p>
        <div v-if="nextGoal" class="progress-track">
          <span :style="{ width: `${goalProgress}%` }" />
        </div>
      </article>
    </section>

    <section class="dashboard-columns" style="margin-top: 20px;">
      <article class="panel">
        <h2>{{ t('dashboard.availableRewards') }}</h2>
        <p class="muted" v-if="explorer?.reserved_stars">
          Tienes <strong>{{ explorer.reserved_stars }}</strong> estrellas reservadas en solicitudes pendientes.
        </p>
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
          <p v-if="!explorer?.available_rewards?.length" class="muted">Aún no hay recompensas activas.</p>
        </div>
      </article>

      <article class="panel">
        <h2>Mis solicitudes de canje</h2>
        <div class="reward-list">
          <div v-for="redemption in explorer?.reward_redemptions || []" :key="redemption.id" class="reward-button">
            <span>{{ redemption.reward_name }}<small>{{ redemption.stars_cost }} {{ t('ui.stars') }}</small></span>
            <strong>{{ redemptionStatusLabels[redemption.status] || redemption.status }}</strong>
          </div>
          <p v-if="!explorer?.reward_redemptions?.length" class="muted">Aún no has solicitado recompensas.</p>
        </div>
      </article>
    </section>
  </AppShell>
</template>

<style scoped>
.explorer-hero-stars {
  display: flex;
  align-items: baseline;
  gap: 6px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 18px;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1.5px solid #fed7aa;
}

.explorer-hero-stars .stars-icon {
  font-size: 1.4rem;
}

.explorer-hero-stars strong {
  font-size: 1.8rem;
  font-weight: 900;
  color: #ea580c;
  line-height: 1;
}

.explorer-hero-stars .stars-label {
  font-size: 0.85rem;
  font-weight: 800;
  color: #9a3412;
}
</style>
