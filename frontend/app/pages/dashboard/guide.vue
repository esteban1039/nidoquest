<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

const { t } = useI18n()
const route = useRoute()
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

type Explorer = {
  id: number
  name: string
  email?: string | null
  available_stars: number
}

type GrowthArea = {
  id: number
  name: string
}

type Mission = {
  id: number
  title: string
  stars: number
  status: string
  explorer_id: number
}

type Reward = {
  id: number
  name: string
  stars_cost: number
  type: string
  active: boolean
}

const activeTab = computed<'explorers' | 'missions' | 'rewards'>({
  get() {
    return ['explorers', 'missions', 'rewards'].includes(String(route.query.tab)) ? String(route.query.tab) as 'explorers' | 'missions' | 'rewards' : 'explorers'
  },
  set(tab) {
    navigateTo({ path: '/dashboard/guide', query: { tab } })
  },
})
const saving = ref(false)
const error = ref('')
const success = ref('')

const explorerForm = reactive({
  name: '',
  email: '',
  password: '',
})

const missionForm = reactive({
  title: '',
  explorer_id: '',
  growth_area_id: '',
  stars: 5,
  frequency: 'daily',
  difficulty: 'easy',
  evidence_type: 'none',
  due_date: new Date().toISOString().slice(0, 10),
})

const rewardForm = reactive({
  name: '',
  stars_cost: 25,
  type: 'family',
})

const { data: dashboard, refresh: refreshDashboard } = await useAsyncData('guide-dashboard', () => request<GuideDashboard>('/dashboard/guide'))
const { data: explorers, refresh: refreshExplorers } = await useAsyncData('guide-explorers', async () => {
  const response = await request<{ data: Explorer[] | { data?: Explorer[] } }>('/explorers')

  return Array.isArray(response.data) ? response.data : response.data.data || []
})
const { data: growthAreas } = await useAsyncData('growth-areas', async () => {
  const response = await request<{ data: GrowthArea[] }>('/growth-areas')

  return response.data
})
const { data: missions, refresh: refreshMissions } = await useAsyncData('guide-missions', async () => {
  const response = await request<{ data: Mission[] | { data?: Mission[] } }>('/missions')

  return Array.isArray(response.data) ? response.data : response.data.data || []
})
const { data: rewards, refresh: refreshRewards } = await useAsyncData('guide-rewards', async () => {
  const response = await request<{ data: Reward[] | { data?: Reward[] } }>('/rewards')

  return Array.isArray(response.data) ? response.data : response.data.data || []
})

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

watchEffect(() => {
  if (!missionForm.explorer_id && explorers.value?.[0]) {
    missionForm.explorer_id = String(explorers.value[0].id)
  }

  if (!missionForm.growth_area_id && growthAreas.value?.[0]) {
    missionForm.growth_area_id = String(growthAreas.value[0].id)
  }
})

function resetMessages() {
  error.value = ''
  success.value = ''
}

async function reloadWorkspace() {
  await Promise.all([refreshDashboard(), refreshExplorers(), refreshMissions(), refreshRewards()])
}

async function createExplorer() {
  saving.value = true
  resetMessages()

  try {
    await request('/explorers', {
      method: 'POST',
      body: {
        name: explorerForm.name,
        email: explorerForm.email || undefined,
        password: explorerForm.password || undefined,
      },
    })

    success.value = explorerForm.email
      ? 'Explorador creado. Ya puede ingresar con su correo y contrasena.'
      : 'Explorador creado.'
    explorerForm.name = ''
    explorerForm.email = ''
    explorerForm.password = ''
    await reloadWorkspace()
  } catch (createError) {
    error.value = getApiErrorMessage(createError, 'No pudimos crear el explorador.')
  } finally {
    saving.value = false
  }
}

async function createMission() {
  saving.value = true
  resetMessages()

  try {
    await request('/missions', {
      method: 'POST',
      body: {
        title: missionForm.title,
        explorer_id: Number(missionForm.explorer_id),
        growth_area_id: Number(missionForm.growth_area_id),
        stars: Number(missionForm.stars),
        frequency: missionForm.frequency,
        due_date: missionForm.due_date || undefined,
        difficulty: missionForm.difficulty,
        evidence_required: false,
        evidence_type: missionForm.evidence_type,
        active: true,
      },
    })

    success.value = 'Mision creada.'
    missionForm.title = ''
    await reloadWorkspace()
  } catch (createError) {
    error.value = getApiErrorMessage(createError, 'No pudimos crear la mision.')
  } finally {
    saving.value = false
  }
}

async function createReward() {
  saving.value = true
  resetMessages()

  try {
    await request('/rewards', {
      method: 'POST',
      body: {
        name: rewardForm.name,
        stars_cost: Number(rewardForm.stars_cost),
        type: rewardForm.type,
        requires_approval: true,
        active: true,
      },
    })

    success.value = 'Recompensa creada.'
    rewardForm.name = ''
    rewardForm.stars_cost = 25
    await reloadWorkspace()
  } catch (createError) {
    error.value = getApiErrorMessage(createError, 'No pudimos crear la recompensa.')
  } finally {
    saving.value = false
  }
}
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
            <span>Crea tu primer explorador</span>
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

    <section class="panel">
      <div class="panel-header">
        <h2>Operacion del Nido</h2>
        <span>{{ activeTab }}</span>
      </div>

      <div class="workspace-tabs">
        <button class="button small" :class="{ primary: activeTab === 'explorers' }" type="button" @click="activeTab = 'explorers'">Exploradores</button>
        <button class="button small" :class="{ primary: activeTab === 'missions' }" type="button" @click="activeTab = 'missions'">Misiones</button>
        <button class="button small" :class="{ primary: activeTab === 'rewards' }" type="button" @click="activeTab = 'rewards'">Recompensas</button>
      </div>

      <p v-if="error" class="form-error">{{ error }}</p>
      <p v-if="success" class="form-success">{{ success }}</p>

      <div v-if="activeTab === 'explorers'" class="workspace-manager">
        <form class="form-stack" @submit.prevent="createExplorer">
          <label>
            <span>Nombre del explorador</span>
            <input v-model="explorerForm.name" required>
          </label>
          <label>
            <span>Correo para ingreso</span>
            <input v-model="explorerForm.email" type="email" placeholder="explorador@familia.com">
          </label>
          <label>
            <span>Contrasena inicial</span>
            <input v-model="explorerForm.password" type="password" minlength="8" placeholder="Minimo 8 caracteres">
          </label>
          <button class="button primary full" type="submit" :disabled="saving">Crear explorador</button>
        </form>

        <div class="manager-list">
          <div v-for="explorer in explorers || []" :key="explorer.id" class="explorer-row">
            <span>{{ explorer.name }}</span>
            <strong>{{ explorer.available_stars }} {{ t('ui.stars') }}</strong>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'missions'" class="workspace-manager">
        <form class="form-stack" @submit.prevent="createMission">
          <label>
            <span>Titulo de la mision</span>
            <input v-model="missionForm.title" required>
          </label>
          <label>
            <span>Explorador</span>
            <select v-model="missionForm.explorer_id" required>
              <option v-for="explorer in explorers || []" :key="explorer.id" :value="explorer.id">{{ explorer.name }}</option>
            </select>
          </label>
          <label>
            <span>Area</span>
            <select v-model="missionForm.growth_area_id" required>
              <option v-for="area in growthAreas || []" :key="area.id" :value="area.id">{{ area.name }}</option>
            </select>
          </label>
          <label>
            <span>Estrellas</span>
            <input v-model.number="missionForm.stars" type="number" min="1" max="100" required>
          </label>
          <label>
            <span>Fecha para mostrarla</span>
            <input v-model="missionForm.due_date" type="date">
          </label>
          <button class="button primary full" type="submit" :disabled="saving || !explorers?.length">Crear mision</button>
        </form>

        <div class="manager-list">
          <div v-for="mission in missions || []" :key="mission.id" class="explorer-row">
            <span>{{ mission.title }}</span>
            <strong>{{ mission.stars }} {{ t('ui.stars') }}</strong>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'rewards'" class="workspace-manager">
        <form class="form-stack" @submit.prevent="createReward">
          <label>
            <span>Nombre de la recompensa</span>
            <input v-model="rewardForm.name" required>
          </label>
          <label>
            <span>Costo en estrellas</span>
            <input v-model.number="rewardForm.stars_cost" type="number" min="1" required>
          </label>
          <label>
            <span>Tipo</span>
            <select v-model="rewardForm.type">
              <option value="family">Familia</option>
              <option value="experience">Experiencia</option>
              <option value="screen_time">Tiempo de pantalla</option>
              <option value="gift">Regalo</option>
              <option value="custom">Personalizada</option>
            </select>
          </label>
          <button class="button primary full" type="submit" :disabled="saving">Crear recompensa</button>
        </form>

        <div class="manager-list">
          <div v-for="reward in rewards || []" :key="reward.id" class="explorer-row">
            <span>{{ reward.name }}</span>
            <strong>{{ reward.stars_cost }} {{ t('ui.stars') }}</strong>
          </div>
        </div>
      </div>
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
