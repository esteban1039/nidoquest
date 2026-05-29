<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

const { t } = useI18n()
const route = useRoute()
const { request } = useApi()
const tones = ['mint', 'blue', 'yellow', 'coral'] as const

type GuideDashboard = {
  stars_by_explorer: { explorer_id: number; name: string; stars: number }[]
  pending_missions: number
  submitted_missions: number
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
  password?: string
  status?: string
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
  growth_area_id: number
  frequency: string
  difficulty: string
  evidence_type: string
  due_date?: string | null
  starts_at?: string | null
  ends_at?: string | null
  active: boolean
}

type Reward = {
  id: number
  name: string
  stars_cost: number
  type: string
  active: boolean
  requires_approval?: boolean
}

type RewardRedemption = {
  id: number
  status: string
  stars_cost: number
  note?: string | null
  created_at?: string
  approved_at?: string | null
  delivered_at?: string | null
  reward?: { id: number; name: string } | null
  explorer?: { id: number; name: string } | null
}

type Guide = {
  id: number
  name: string
  email: string
  password?: string
  active: boolean
  last_login_at?: string | null
}

const activeTab = computed<'explorers' | 'missions' | 'rewards' | 'guides'>({
  get() {
    return ['explorers', 'missions', 'rewards', 'guides'].includes(String(route.query.tab)) ? String(route.query.tab) as 'explorers' | 'missions' | 'rewards' | 'guides' : 'explorers'
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
  starts_at: new Date().toISOString().slice(0, 10),
  ends_at: '',
})

const rewardForm = reactive({
  name: '',
  stars_cost: 25,
  type: 'family',
})
const guideForm = reactive({
  name: '',
  email: '',
  password: '',
})
const editingExplorer = ref<number | null>(null)
const editingMission = ref<number | null>(null)
const editingReward = ref<number | null>(null)
const editingGuide = ref<number | null>(null)
const reviewingMission = ref<number | null>(null)
const reviewingReward = ref<number | null>(null)

const tabLabels: Record<'explorers' | 'missions' | 'rewards' | 'guides', string> = {
  explorers: 'Exploradores',
  missions: 'Misiones',
  rewards: 'Recompensas',
  guides: 'Formadores',
}

const statusLabels: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  pending: 'Pendiente',
  submitted: 'Por revisar',
  approved: 'Aprobada',
  rejected: 'Rechazada',
  completed: 'Completada',
  expired: 'Vencida',
  requested: 'Solicitada',
  delivered: 'Entregada',
}

const frequencyLabels: Record<string, string> = {
  once: 'Una sola vez',
  daily: 'Diaria',
  weekly: 'Semanal',
  monthly: 'Mensual',
  custom: 'Por rango de fechas',
}

const rewardTypeLabels: Record<string, string> = {
  family: 'Familia',
  experience: 'Experiencia',
  screen_time: 'Tiempo de pantalla',
  gift: 'Regalo',
  custom: 'Personalizada',
}

const redemptionStatusLabels: Record<string, string> = {
  requested: 'Solicitada',
  approved: 'Aprobada',
  rejected: 'Rechazada',
  delivered: 'Entregada',
}

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
  const items = Array.isArray(response.data) ? response.data : response.data.data || []

  return items.map((mission) => ({
    ...mission,
    due_date: mission.due_date ? String(mission.due_date).slice(0, 10) : '',
    starts_at: mission.starts_at ? String(mission.starts_at).slice(0, 10) : '',
    ends_at: mission.ends_at ? String(mission.ends_at).slice(0, 10) : '',
  }))
})
const { data: reviewMissions, refresh: refreshReviewMissions } = await useAsyncData('guide-review-missions', async () => {
  const response = await request<{ data: Mission[] | { data?: Mission[] } }>('/missions?status=submitted&per_page=100')
  const items = Array.isArray(response.data) ? response.data : response.data.data || []

  return items.map((mission) => ({
    ...mission,
    due_date: mission.due_date ? String(mission.due_date).slice(0, 10) : '',
    starts_at: mission.starts_at ? String(mission.starts_at).slice(0, 10) : '',
    ends_at: mission.ends_at ? String(mission.ends_at).slice(0, 10) : '',
  }))
})
const { data: rewards, refresh: refreshRewards } = await useAsyncData('guide-rewards', async () => {
  const response = await request<{ data: Reward[] | { data?: Reward[] } }>('/rewards')

  return Array.isArray(response.data) ? response.data : response.data.data || []
})
const { data: rewardRedemptions, refresh: refreshRewardRedemptions } = await useAsyncData('guide-reward-redemptions', async () => {
  const response = await request<{ data: RewardRedemption[] | { data?: RewardRedemption[] } }>('/reward-redemptions')

  return Array.isArray(response.data) ? response.data : response.data.data || []
})
const { data: guides, refresh: refreshGuides } = await useAsyncData('guide-users', async () => {
  const response = await request<{ data: Guide[] }>('/guides')

  return response.data
})

const stats = computed(() => [
  { key: 'pendingMissions', value: dashboard.value?.pending_missions ?? 0 },
  { key: 'submittedMissions', label: 'Por revisar', value: dashboard.value?.submitted_missions ?? 0 },
  { key: 'completedMissions', value: dashboard.value?.completed_missions ?? 0 },
  { key: 'requestedRewards', value: dashboard.value?.requested_rewards ?? 0 },
])

const submittedMissions = computed(() => reviewMissions.value || [])

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

function labelFrom(map: Record<string, string>, value?: string | null, fallback = 'Sin definir') {
  if (!value) {
    return fallback
  }

  return map[value] || value
}

async function reloadWorkspace() {
  await Promise.all([refreshDashboard(), refreshExplorers(), refreshMissions(), refreshReviewMissions(), refreshRewards(), refreshRewardRedemptions(), refreshGuides()])
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
        starts_at: missionForm.starts_at || missionForm.due_date || undefined,
        ends_at: missionForm.ends_at || undefined,
        difficulty: missionForm.difficulty,
        evidence_required: false,
        evidence_type: missionForm.evidence_type,
        active: true,
      },
    })

    success.value = 'Mision creada.'
    missionForm.title = ''
    missionForm.ends_at = ''
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

async function createGuide() {
  saving.value = true
  resetMessages()

  try {
    await request('/guides', {
      method: 'POST',
      body: guideForm,
    })

    success.value = 'Formador creado.'
    guideForm.name = ''
    guideForm.email = ''
    guideForm.password = ''
    await reloadWorkspace()
  } catch (createError) {
    error.value = getApiErrorMessage(createError, 'No pudimos crear el formador.')
  } finally {
    saving.value = false
  }
}

async function updateExplorer(explorer: Explorer) {
  saving.value = true
  resetMessages()

  try {
    await request(`/explorers/${explorer.id}`, {
      method: 'PUT',
      body: {
        name: explorer.name,
        email: explorer.email || undefined,
        password: explorer.password || undefined,
        status: explorer.status || 'active',
      },
    })

    editingExplorer.value = null
    success.value = 'Explorador actualizado.'
    await reloadWorkspace()
  } catch (updateError) {
    error.value = getApiErrorMessage(updateError, 'No pudimos actualizar el explorador.')
  } finally {
    saving.value = false
  }
}

async function updateGuide(guide: Guide) {
  saving.value = true
  resetMessages()

  try {
    await request(`/guides/${guide.id}`, {
      method: 'PUT',
      body: {
        name: guide.name,
        email: guide.email,
        password: guide.password || undefined,
        active: guide.active,
      },
    })

    guide.password = ''
    editingGuide.value = null
    success.value = 'Formador actualizado.'
    await reloadWorkspace()
  } catch (updateError) {
    error.value = getApiErrorMessage(updateError, 'No pudimos actualizar el formador.')
  } finally {
    saving.value = false
  }
}

async function updateMission(mission: Mission) {
  saving.value = true
  resetMessages()

  try {
    await request(`/missions/${mission.id}`, {
      method: 'PUT',
      body: {
        title: mission.title,
        explorer_id: mission.explorer_id,
        growth_area_id: mission.growth_area_id,
        stars: Number(mission.stars),
        frequency: mission.frequency || 'daily',
        due_date: mission.due_date || undefined,
        starts_at: mission.starts_at || mission.due_date || undefined,
        ends_at: mission.ends_at || undefined,
        difficulty: mission.difficulty || 'easy',
        evidence_required: false,
        evidence_type: mission.evidence_type || 'none',
        active: mission.active,
      },
    })

    editingMission.value = null
    success.value = 'Mision actualizada.'
    await reloadWorkspace()
  } catch (updateError) {
    error.value = getApiErrorMessage(updateError, 'No pudimos actualizar la mision.')
  } finally {
    saving.value = false
  }
}

async function updateReward(reward: Reward) {
  saving.value = true
  resetMessages()

  try {
    await request(`/rewards/${reward.id}`, {
      method: 'PUT',
      body: {
        name: reward.name,
        stars_cost: Number(reward.stars_cost),
        type: reward.type,
        requires_approval: reward.requires_approval ?? true,
        active: reward.active,
      },
    })

    editingReward.value = null
    success.value = 'Recompensa actualizada.'
    await reloadWorkspace()
  } catch (updateError) {
    error.value = getApiErrorMessage(updateError, 'No pudimos actualizar la recompensa.')
  } finally {
    saving.value = false
  }
}

async function deleteMission(mission: Mission) {
  if (!confirm(`Borrar la mision "${mission.title}"?`)) {
    return
  }

  saving.value = true
  resetMessages()

  try {
    await request(`/missions/${mission.id}`, { method: 'DELETE' })
    success.value = 'Mision borrada.'
    await reloadWorkspace()
  } catch (deleteError) {
    error.value = getApiErrorMessage(deleteError, 'No pudimos borrar la mision.')
  } finally {
    saving.value = false
  }
}

async function deleteReward(reward: Reward) {
  if (!confirm(`Borrar la recompensa "${reward.name}"?`)) {
    return
  }

  saving.value = true
  resetMessages()

  try {
    await request(`/rewards/${reward.id}`, { method: 'DELETE' })
    success.value = 'Recompensa borrada.'
    await reloadWorkspace()
  } catch (deleteError) {
    error.value = getApiErrorMessage(deleteError, 'No pudimos borrar la recompensa.')
  } finally {
    saving.value = false
  }
}

async function deleteGuide(guide: Guide) {
  if (!confirm(`Borrar el formador "${guide.name}"?`)) {
    return
  }

  saving.value = true
  resetMessages()

  try {
    await request(`/guides/${guide.id}`, { method: 'DELETE' })
    success.value = 'Formador borrado.'
    await reloadWorkspace()
  } catch (deleteError) {
    error.value = getApiErrorMessage(deleteError, 'No pudimos borrar el formador.')
  } finally {
    saving.value = false
  }
}

async function reviewMission(mission: Mission, action: 'approve' | 'reject') {
  reviewingMission.value = mission.id
  resetMessages()

  try {
    await request(`/missions/${mission.id}/${action}`, {
      method: 'POST',
      body: {},
    })

    success.value = action === 'approve' ? 'Mision aprobada. Estrellas acumuladas.' : 'Mision rechazada.'
    await reloadWorkspace()
  } catch (reviewError) {
    error.value = getApiErrorMessage(reviewError, 'No pudimos revisar la mision.')
  } finally {
    reviewingMission.value = null
  }
}

async function reviewReward(redemption: RewardRedemption, action: 'approve' | 'reject' | 'deliver') {
  reviewingReward.value = redemption.id
  resetMessages()

  try {
    const pathByAction = {
      approve: 'approve',
      reject: 'reject',
      deliver: 'deliver',
    }

    await request(`/reward-redemptions/${redemption.id}/${pathByAction[action]}`, {
      method: 'POST',
      body: {},
    })

    success.value = action === 'approve'
      ? 'Recompensa aprobada. Las estrellas fueron descontadas.'
      : action === 'deliver'
        ? 'Recompensa marcada como entregada.'
        : 'Solicitud rechazada.'
    await reloadWorkspace()
  } catch (reviewError) {
    error.value = getApiErrorMessage(reviewError, 'No pudimos actualizar la solicitud.')
  } finally {
    reviewingReward.value = null
  }
}

async function toggleExplorer(explorer: Explorer) {
  explorer.status = explorer.status === 'inactive' ? 'active' : 'inactive'
  await updateExplorer(explorer)
}

async function toggleMission(mission: Mission) {
  mission.active = !mission.active
  await updateMission(mission)
}

async function toggleReward(reward: Reward) {
  reward.active = !reward.active
  await updateReward(reward)
}

async function toggleGuide(guide: Guide) {
  guide.active = !guide.active
  await updateGuide(guide)
}
</script>

<template>
  <AppShell :title="t('dashboard.guideTitle')" section="guide">
    <section class="dashboard-grid">
      <MetricCard
        v-for="(stat, index) in stats"
        :key="stat.key"
        :label="'label' in stat ? stat.label : t(`dashboard.${stat.key}`)"
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
        <span>{{ tabLabels[activeTab] }}</span>
      </div>

      <div class="workspace-tabs">
        <button class="button small" :class="{ primary: activeTab === 'explorers' }" type="button" @click="activeTab = 'explorers'">Exploradores</button>
        <button class="button small" :class="{ primary: activeTab === 'missions' }" type="button" @click="activeTab = 'missions'">Misiones</button>
        <button class="button small" :class="{ primary: activeTab === 'rewards' }" type="button" @click="activeTab = 'rewards'">Recompensas</button>
        <button class="button small" :class="{ primary: activeTab === 'guides' }" type="button" @click="activeTab = 'guides'">Formadores</button>
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
            <template v-if="editingExplorer === explorer.id">
              <input v-model="explorer.name" aria-label="Nombre del explorador">
              <input v-model="explorer.email" type="email" aria-label="Correo del explorador">
              <input v-model="explorer.password" type="password" placeholder="Nueva contrasena opcional" aria-label="Nueva contrasena">
              <button class="button small primary" type="button" :disabled="saving" @click="updateExplorer(explorer)">Guardar</button>
            </template>
            <template v-else>
              <span>{{ explorer.name }}<small>{{ explorer.email || 'Sin ingreso propio' }} - {{ labelFrom(statusLabels, explorer.status || 'active') }}</small></span>
              <strong>{{ explorer.available_stars }} {{ t('ui.stars') }}</strong>
              <button class="button small" type="button" @click="editingExplorer = explorer.id">Editar</button>
              <button class="button small" type="button" @click="toggleExplorer(explorer)">{{ explorer.status === 'inactive' ? 'Activar' : 'Inactivar' }}</button>
            </template>
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
            <span>Repeticion</span>
            <select v-model="missionForm.frequency">
              <option value="once">Una sola vez</option>
              <option value="daily">Diaria</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
              <option value="custom">Por rango de fechas</option>
            </select>
          </label>
          <label>
            <span>Fecha inicial</span>
            <input v-model="missionForm.due_date" type="date">
          </label>
          <label v-if="missionForm.frequency !== 'once'">
            <span>Repetir desde</span>
            <input v-model="missionForm.starts_at" type="date">
          </label>
          <label v-if="missionForm.frequency !== 'once'">
            <span>Repetir hasta</span>
            <input v-model="missionForm.ends_at" type="date">
          </label>
          <button class="button primary full" type="submit" :disabled="saving || !explorers?.length">Crear mision</button>
        </form>

        <div class="manager-list">
          <div v-for="mission in submittedMissions" :key="`review-${mission.id}`" class="explorer-row">
            <span>{{ mission.title }}<small>Terminada por el explorador. Pendiente de revision.</small></span>
            <strong>{{ mission.stars }} {{ t('ui.stars') }}</strong>
            <button class="button small primary" type="button" :disabled="reviewingMission === mission.id" @click="reviewMission(mission, 'approve')">Aprobar</button>
            <button class="button small" type="button" :disabled="reviewingMission === mission.id" @click="reviewMission(mission, 'reject')">Rechazar</button>
          </div>
          <div v-for="mission in missions || []" :key="mission.id" class="explorer-row">
            <template v-if="editingMission === mission.id">
              <input v-model="mission.title" aria-label="Titulo de la mision">
              <input v-model.number="mission.stars" type="number" min="1" max="100" aria-label="Estrellas">
              <select v-model="mission.frequency" aria-label="Repeticion">
                <option value="once">Una sola vez</option>
                <option value="daily">Diaria</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
                <option value="custom">Por rango</option>
              </select>
              <input v-model="mission.due_date" type="date" aria-label="Fecha">
              <input v-model="mission.starts_at" type="date" aria-label="Inicio">
              <input v-model="mission.ends_at" type="date" aria-label="Fin">
              <button class="button small primary" type="button" :disabled="saving" @click="updateMission(mission)">Guardar</button>
            </template>
            <template v-else>
              <span>{{ mission.title }}<small>{{ labelFrom(statusLabels, mission.status) }} - {{ labelFrom(frequencyLabels, mission.frequency) }}</small></span>
              <strong>{{ mission.stars }} {{ t('ui.stars') }}</strong>
              <button class="button small" type="button" @click="editingMission = mission.id">Editar</button>
              <button class="button small" type="button" @click="toggleMission(mission)">{{ mission.active ? 'Inactivar' : 'Activar' }}</button>
              <button class="button small danger" type="button" :disabled="saving" @click="deleteMission(mission)">Borrar</button>
            </template>
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
          <div v-for="redemption in rewardRedemptions || []" :key="`redemption-${redemption.id}`" class="explorer-row">
            <span>
              {{ redemption.reward?.name || 'Recompensa' }}
              <small>{{ redemption.explorer?.name || 'Explorador' }} - {{ labelFrom(redemptionStatusLabels, redemption.status) }} - {{ redemption.stars_cost }} {{ t('ui.stars') }}</small>
            </span>
            <strong>{{ redemption.created_at ? new Date(redemption.created_at).toLocaleDateString() : 'Solicitud' }}</strong>
            <button
              v-if="redemption.status === 'requested'"
              class="button small primary"
              type="button"
              :disabled="reviewingReward === redemption.id"
              @click="reviewReward(redemption, 'approve')"
            >
              Aprobar
            </button>
            <button
              v-if="redemption.status === 'requested'"
              class="button small"
              type="button"
              :disabled="reviewingReward === redemption.id"
              @click="reviewReward(redemption, 'reject')"
            >
              Rechazar
            </button>
            <button
              v-if="redemption.status === 'approved'"
              class="button small primary"
              type="button"
              :disabled="reviewingReward === redemption.id"
              @click="reviewReward(redemption, 'deliver')"
            >
              Entregar
            </button>
          </div>
          <div v-for="reward in rewards || []" :key="reward.id" class="explorer-row">
            <template v-if="editingReward === reward.id">
              <input v-model="reward.name" aria-label="Nombre de la recompensa">
              <input v-model.number="reward.stars_cost" type="number" min="1" aria-label="Costo">
              <button class="button small primary" type="button" :disabled="saving" @click="updateReward(reward)">Guardar</button>
            </template>
            <template v-else>
              <span>{{ reward.name }}<small>{{ labelFrom(rewardTypeLabels, reward.type) }} - {{ reward.active ? 'Activa' : 'Inactiva' }}</small></span>
              <strong>{{ reward.stars_cost }} {{ t('ui.stars') }}</strong>
              <button class="button small" type="button" @click="editingReward = reward.id">Editar</button>
              <button class="button small" type="button" @click="toggleReward(reward)">{{ reward.active ? 'Inactivar' : 'Activar' }}</button>
              <button class="button small danger" type="button" :disabled="saving" @click="deleteReward(reward)">Borrar</button>
            </template>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'guides'" class="workspace-manager">
        <form class="form-stack" @submit.prevent="createGuide">
          <label>
            <span>Nombre del formador</span>
            <input v-model="guideForm.name" required>
          </label>
          <label>
            <span>Correo</span>
            <input v-model="guideForm.email" type="email" required>
          </label>
          <label>
            <span>Contrasena inicial</span>
            <input v-model="guideForm.password" type="password" minlength="8" required>
          </label>
          <button class="button primary full" type="submit" :disabled="saving">Crear formador</button>
        </form>

        <div class="manager-list">
          <div v-for="guide in guides || []" :key="guide.id" class="explorer-row">
            <template v-if="editingGuide === guide.id">
              <input v-model="guide.name" aria-label="Nombre del formador">
              <input v-model="guide.email" type="email" aria-label="Correo del formador">
              <input v-model="guide.password" type="password" placeholder="Nueva contrasena opcional" aria-label="Nueva contrasena">
              <button class="button small primary" type="button" :disabled="saving" @click="updateGuide(guide)">Guardar</button>
            </template>
            <template v-else>
              <span>{{ guide.name }}<small>{{ guide.email }} - {{ guide.active ? 'Activo' : 'Inactivo' }}</small></span>
              <strong>{{ guide.last_login_at ? new Date(guide.last_login_at).toLocaleDateString() : 'Sin ingreso' }}</strong>
              <button class="button small" type="button" @click="editingGuide = guide.id">Editar</button>
              <button class="button small" type="button" @click="toggleGuide(guide)">{{ guide.active ? 'Inactivar' : 'Activar' }}</button>
              <button class="button small danger" type="button" :disabled="saving" @click="deleteGuide(guide)">Borrar</button>
            </template>
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
