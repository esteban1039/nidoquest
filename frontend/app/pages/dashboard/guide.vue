<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { request } = useApi()
const { tenant } = useSession()
const tones = ['mint', 'blue', 'yellow', 'coral'] as const

type GuideDashboard = {
  stars_by_explorer: { explorer_id: number; name: string; stars: number; streak?: number; streak_active_today?: boolean; status?: string; age_group?: string }[]
  total_stars_balance?: number
  completion_rate?: number
  daily_activity?: { day: string; date: string; is_today?: boolean; missions_count: number; stars_count: number }[]
  pending_missions: number
  submitted_missions: number
  completed_missions: number
  expired_missions: number
  requested_rewards: number
  weekly_progress: number
  consistency_indicator: number
  household?: {
    explorers_active: number
    approvals_last_7_days: number
    stars_earned_last_7_days: number
    family_weekly_goal: number | null
    family_goal_progress: number | null
  } | null
}

type MissionGuidance = {
  difficulty: string
  stars_min: number
  stars_max: number
}

type Explorer = {
  id: number
  name: string
  email?: string | null
  login_identifier?: string | null
  has_account?: boolean
  password?: string
  status?: string
  birthdate?: string | null
  available_stars: number
  age?: number | null
  age_group?: string | null
  mission_guidance?: MissionGuidance | null
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

type GuideTab = 'overview' | 'explorers' | 'missions' | 'rewards' | 'guides'

const activeTab = computed<GuideTab>({
  get() {
    const q = String(route.query.tab || 'overview')
    return ['explorers', 'missions', 'rewards', 'guides'].includes(q) ? q as GuideTab : 'overview'
  },
  set(tab: GuideTab) {
    switchTab(tab)
  },
})

function switchTab(tab: GuideTab) {
  router.replace(tab === 'overview' ? { path: '/dashboard/guide', query: {} } : { path: '/dashboard/guide', query: { tab } })
}

const pageTitle = computed(() => {
  switch (activeTab.value) {
    case 'explorers': return 'Exploradores'
    case 'missions': return 'Misiones y Hábitos'
    case 'rewards': return 'Recompensas'
    case 'guides': return 'Formadores'
    default: return t('dashboard.guideTitle')
  }
})

const showCreateExplorer = ref(false)
const showCreateMission = ref(false)
const showCreateReward = ref(false)
const showCreateGuide = ref(false)
const missionsFilter = ref<'all' | 'pending_review' | 'active' | 'inactive'>('all')
const rewardsFilter = ref<'catalog' | 'redemptions'>('catalog')

const rewardTypeIcons: Record<string, string> = {
  family: '👪',
  experience: '🎟️',
  screen_time: '📱',
  gift: '🎁',
  custom: '✨',
}

const saving = ref(false)
const error = ref('')
const success = ref('')
const pendingDelete = ref<string | null>(null)
let pendingDeleteTimer: ReturnType<typeof setTimeout> | null = null

function armDelete(key: string): boolean {
  if (pendingDelete.value === key) {
    if (pendingDeleteTimer) {
      clearTimeout(pendingDeleteTimer)
      pendingDeleteTimer = null
    }
    pendingDelete.value = null
    return true
  }
  pendingDelete.value = key
  if (pendingDeleteTimer) {
    clearTimeout(pendingDeleteTimer)
  }
  pendingDeleteTimer = setTimeout(() => {
    pendingDelete.value = null
    pendingDeleteTimer = null
  }, 4000)
  return false
}

const explorerForm = reactive({
  name: '',
  age: 8,
  birthdate: '',
  ageMode: 'age' as 'age' | 'birthdate',
  has_account: false,
  identifier: '',
  password: '',
})

function calculateAgeFromBirthdate(bdate?: string | null): number | null {
  if (!bdate) return null
  const birth = new Date(bdate)
  if (isNaN(birth.getTime())) return null
  const diff = Date.now() - birth.getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)))
}

function getGuidanceForAge(age: number | null | undefined) {
  if (age === null || age === undefined) {
    return {
      group: 'peques',
      label: '5 a 8 años',
      icon: '🐣',
      name: 'Peques',
      difficulty: 'Fácil',
      stars: '3 a 8 ⭐',
      focus: 'Hábitos diarios, orden del cuarto, higiene y rutinas sencillas.',
    }
  }
  if (age <= 8) {
    return {
      group: 'peques',
      label: '5 a 8 años',
      icon: '🐣',
      name: 'Peques',
      difficulty: 'Fácil',
      stars: '3 a 8 ⭐',
      focus: 'Hábitos diarios, orden del cuarto, higiene y rutinas sencillas.',
    }
  }
  if (age <= 13) {
    return {
      group: 'medios',
      label: '9 a 13 años',
      icon: '🎒',
      name: 'Medios',
      difficulty: 'Media',
      stars: '5 a 15 ⭐',
      focus: 'Tareas escolares, autonomía, lectura, colaboración en casa y deporte.',
    }
  }
  return {
    group: 'jovenes',
    label: '14 a 17 años',
    icon: '🚀',
    name: 'Jóvenes',
    difficulty: 'Desafiante',
    stars: '10 a 30 ⭐',
    focus: 'Gestión de proyectos, estudio profundo, metas personales y finanzas.',
  }
}

const currentExplorerAgeGuidance = computed(() => {
  const age = explorerForm.ageMode === 'birthdate'
    ? calculateAgeFromBirthdate(explorerForm.birthdate)
    : explorerForm.age
  return getGuidanceForAge(age)
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

const difficultyLabels: Record<string, string> = {
  easy: 'Fácil',
  medium: 'Media',
  challenging: 'Desafiante',
}

const ageGroupLabels: Record<string, string> = {
  peques: '5 a 8 años',
  medios: '9 a 13 años',
  jovenes: '14 a 17 años',
}

const selectedExplorerGuidance = computed(() => {
  const explorer = (explorers.value || []).find((item) => String(item.id) === String(missionForm.explorer_id))
  return explorer?.mission_guidance ? { name: explorer.name, ageGroup: explorer.age_group, ...explorer.mission_guidance } : null
})

const familyGoalForm = reactive({ stars: 30 })

async function saveFamilyGoal() {
  if (!tenant.value?.id) {
    return
  }
  saving.value = true
  resetMessages()

  try {
    await request(`/nests/${tenant.value.id}/family-goal`, {
      method: 'PUT',
      body: { stars: Number(familyGoalForm.stars) },
    })

    success.value = 'Meta del Nido actualizada.'
    await refreshDashboard()
  } catch (goalError) {
    error.value = getApiErrorMessage(goalError, 'No pudimos fijar la meta del Nido.')
  } finally {
    saving.value = false
  }
}

const tabLabels: Record<GuideTab, string> = {
  overview: 'Indicadores',
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

function extractItems<T>(res: any): T[] {
  if (!res) return []
  if (Array.isArray(res)) return res
  if (Array.isArray(res.data)) return res.data
  if (res.data && Array.isArray(res.data.data)) return res.data.data
  return []
}

const { data: dashboard, refresh: refreshDashboard } = await useAsyncData('guide-dashboard', () => request<GuideDashboard>('/dashboard/guide'))
const { data: explorers, refresh: refreshExplorers } = await useAsyncData('guide-explorers', async () => {
  const response = await request<any>('/explorers')
  return extractItems<Explorer>(response)
})
const { data: growthAreas } = await useAsyncData('growth-areas', async () => {
  const response = await request<any>('/growth-areas')
  return extractItems<GrowthArea>(response)
})
const { data: missions, refresh: refreshMissions } = await useAsyncData('guide-missions', async () => {
  const response = await request<any>('/missions')
  const items = extractItems<Mission>(response)

  return items.map((mission) => ({
    ...mission,
    due_date: mission.due_date ? String(mission.due_date).slice(0, 10) : '',
    starts_at: mission.starts_at ? String(mission.starts_at).slice(0, 10) : '',
    ends_at: mission.ends_at ? String(mission.ends_at).slice(0, 10) : '',
  }))
})
const { data: reviewMissions, refresh: refreshReviewMissions } = await useAsyncData('guide-review-missions', async () => {
  const response = await request<any>('/missions?status=submitted&per_page=100')
  const items = extractItems<Mission>(response)

  return items.map((mission) => ({
    ...mission,
    due_date: mission.due_date ? String(mission.due_date).slice(0, 10) : '',
    starts_at: mission.starts_at ? String(mission.starts_at).slice(0, 10) : '',
    ends_at: mission.ends_at ? String(mission.ends_at).slice(0, 10) : '',
  }))
})
const { data: rewards, refresh: refreshRewards } = await useAsyncData('guide-rewards', async () => {
  const response = await request<any>('/rewards')
  return extractItems<Reward>(response)
})
const { data: rewardRedemptions, refresh: refreshRewardRedemptions } = await useAsyncData('guide-reward-redemptions', async () => {
  const response = await request<any>('/reward-redemptions')
  return extractItems<RewardRedemption>(response)
})
const { data: guides, refresh: refreshGuides } = await useAsyncData('guide-users', async () => {
  const response = await request<any>('/guides')
  return extractItems<Guide>(response)
})

const stats = computed(() => [
  {
    key: 'pendingMissions',
    label: 'Misiones en curso',
    icon: '🎯',
    value: dashboard.value?.pending_missions ?? 0,
    hint: 'Misiones activas asignadas',
    tab: 'missions' as GuideTab,
    tone: 'mint' as const,
  },
  {
    key: 'submittedMissions',
    label: 'Por revisar',
    icon: '⏳',
    value: dashboard.value?.submitted_missions ?? 0,
    hint: (dashboard.value?.submitted_missions ?? 0) > 0 ? 'Esperando tu aprobación' : 'Todo al día',
    badge: (dashboard.value?.submitted_missions ?? 0) > 0 ? '¡Por revisar!' : undefined,
    tab: 'missions' as GuideTab,
    tone: 'yellow' as const,
  },
  {
    key: 'completedMissions',
    label: 'Cumplidas',
    icon: '✅',
    value: dashboard.value?.completed_missions ?? 0,
    hint: 'Misiones aprobadas',
    tab: 'missions' as GuideTab,
    tone: 'blue' as const,
  },
  {
    key: 'requestedRewards',
    label: 'Recompensas',
    icon: '🎁',
    value: dashboard.value?.requested_rewards ?? 0,
    hint: (dashboard.value?.requested_rewards ?? 0) > 0 ? 'Canjes solicitados' : 'Sin canjes pendientes',
    badge: (dashboard.value?.requested_rewards ?? 0) > 0 ? '¡Por entregar!' : undefined,
    tab: 'rewards' as GuideTab,
    tone: 'coral' as const,
  },
])

const isEditingGoal = ref(false)

const totalExplorerStars = computed(() => {
  const list = dashboard.value?.stars_by_explorer || []
  const total = list.reduce((acc, e) => acc + e.stars, 0)
  return total > 0 ? total : 1
})

const avatarGradients = [
  'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #3b82f6, #2563eb)',
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #ec4899, #db2777)',
  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
]

const submittedMissions = computed(() => reviewMissions.value || [])

const rewardSearch = ref('')
const rewardCategoryFilter = ref<string>('all')
const redemptionStatusFilter = ref<string>('all')

const filteredRewardsList = computed(() => {
  let list = rewards.value || []
  if (rewardCategoryFilter.value !== 'all') {
    list = list.filter((r) => r.type === rewardCategoryFilter.value)
  }
  if (rewardSearch.value.trim()) {
    const q = rewardSearch.value.toLowerCase().trim()
    list = list.filter((r) => r.name.toLowerCase().includes(q))
  }
  return list
})

const filteredRedemptionsList = computed(() => {
  let list = rewardRedemptions.value || []
  if (redemptionStatusFilter.value !== 'all') {
    list = list.filter((r) => r.status === redemptionStatusFilter.value)
  }
  if (rewardSearch.value.trim()) {
    const q = rewardSearch.value.toLowerCase().trim()
    list = list.filter((r) =>
      (r.reward?.name || '').toLowerCase().includes(q) ||
      (r.explorer?.name || '').toLowerCase().includes(q)
    )
  }
  return list
})

const missionSearch = ref('')
const selectedMissionExplorer = ref<number | 'all'>('all')
const selectedMissionFrequency = ref<string>('all')
const selectedMissionArea = ref<number | 'all'>('all')
const missionGroupBy = ref<'explorer' | 'frequency' | 'flat'>('explorer')
const missionViewMode = ref<'table' | 'cards'>('table')

function openCreateMissionForExplorer(explorerId?: number) {
  if (explorerId) {
    missionForm.explorer_id = String(explorerId)
  }
  showCreateMission.value = true
  editingMission.value = null
}

const filteredMissionsList = computed(() => {
  let list = missions.value || []

  if (missionsFilter.value === 'active') {
    list = list.filter((m) => m.active)
  } else if (missionsFilter.value === 'inactive') {
    list = list.filter((m) => !m.active)
  } else if (missionsFilter.value === 'pending_review') {
    list = list.filter((m) => m.status === 'submitted')
  }

  if (selectedMissionExplorer.value !== 'all') {
    list = list.filter((m) => m.explorer_id === Number(selectedMissionExplorer.value))
  }

  if (selectedMissionFrequency.value !== 'all') {
    list = list.filter((m) => m.frequency === selectedMissionFrequency.value)
  }

  if (selectedMissionArea.value !== 'all') {
    list = list.filter((m) => m.growth_area_id === Number(selectedMissionArea.value))
  }

  if (missionSearch.value.trim()) {
    const q = missionSearch.value.toLowerCase().trim()
    list = list.filter((m) =>
      m.title.toLowerCase().includes(q) ||
      getExplorerName(m.explorer_id).toLowerCase().includes(q) ||
      getGrowthAreaName(m.growth_area_id).toLowerCase().includes(q)
    )
  }

  return list
})

const filteredMissions = filteredMissionsList

const missionsByExplorer = computed(() => {
  const exps = explorers.value || []
  const allFiltered = filteredMissionsList.value

  const groups = exps.map((exp, index) => {
    const expMissions = allFiltered.filter((m) => m.explorer_id === exp.id)
    const activeCount = expMissions.filter((m) => m.active).length
    const dailyStars = expMissions.filter((m) => m.active && m.frequency === 'daily').reduce((sum, m) => sum + m.stars, 0)
    return {
      explorer: exp,
      index,
      missions: expMissions,
      activeCount,
      dailyStars,
    }
  })

  const orphanMissions = allFiltered.filter((m) => !exps.some((e) => e.id === m.explorer_id))
  if (orphanMissions.length > 0) {
    groups.push({
      explorer: { id: 0, name: 'Sin asignar', available_stars: 0 } as any,
      index: 99,
      missions: orphanMissions,
      activeCount: orphanMissions.filter((m) => m.active).length,
      dailyStars: 0,
    })
  }

  if (selectedMissionExplorer.value !== 'all') {
    return groups.filter((g) => g.explorer.id === Number(selectedMissionExplorer.value))
  }

  return groups
})

const missionsByFrequency = computed(() => {
  const frequencies = [
    { key: 'daily', label: '🔁 Rutinas Diarias / Hábitos', icon: '☀️' },
    { key: 'weekly', label: '📅 Metas Semanales', icon: '🗓️' },
    { key: 'once', label: '🎯 Misiones Únicas / Retos', icon: '🏆' },
    { key: 'monthly', label: '📆 Metas Mensuales', icon: '🎯' },
    { key: 'custom', label: '⚡ Rango Personalizado', icon: '⏳' },
  ]
  const allFiltered = filteredMissionsList.value

  return frequencies.map((freq) => {
    const list = allFiltered.filter((m) => m.frequency === freq.key)
    return {
      ...freq,
      missions: list,
      activeCount: list.filter((m) => m.active).length,
      totalStars: list.reduce((sum, m) => sum + m.stars, 0),
    }
  }).filter((f) => f.missions.length > 0)
})

const missionsSummaryStats = computed(() => {
  const list = missions.value || []
  const activeList = list.filter((m) => m.active)
  const dailyActive = activeList.filter((m) => m.frequency === 'daily')
  const dailyStarsTotal = dailyActive.reduce((sum, m) => sum + m.stars, 0)

  return {
    total: list.length,
    active: activeList.length,
    inactive: list.length - activeList.length,
    dailyCount: dailyActive.length,
    dailyStarsTotal,
  }
})

const editingExplorerData = reactive({
  id: 0,
  name: '',
  age: 8 as number | null,
  birthdate: '',
  ageMode: 'age' as 'age' | 'birthdate',
  has_account: false,
  identifier: '',
  password: '',
  status: 'active',
  available_stars: 0,
})

const editingExplorerAgeGuidance = computed(() => {
  const age = editingExplorerData.ageMode === 'birthdate'
    ? calculateAgeFromBirthdate(editingExplorerData.birthdate)
    : editingExplorerData.age
  return getGuidanceForAge(age)
})

function startEditExplorer(exp: Explorer) {
  editingExplorer.value = exp.id
  editingExplorerData.id = exp.id
  editingExplorerData.name = exp.name
  const calculatedAge = exp.age ?? (exp.birthdate ? calculateAgeFromBirthdate(exp.birthdate) : 8)
  editingExplorerData.age = calculatedAge
  editingExplorerData.birthdate = exp.birthdate ? String(exp.birthdate).slice(0, 10) : ''
  editingExplorerData.ageMode = exp.birthdate ? 'birthdate' : 'age'
  editingExplorerData.has_account = Boolean(exp.has_account || exp.login_identifier || (exp.email && !exp.email.endsWith('@nidoquest.local')))
  editingExplorerData.identifier = exp.login_identifier || (exp.email && !exp.email.endsWith('@nidoquest.local') ? exp.email : '')
  editingExplorerData.password = ''
  editingExplorerData.status = exp.status || 'active'
  editingExplorerData.available_stars = exp.available_stars
  showCreateExplorer.value = false
}

const editingMissionData = reactive<Mission>({
  id: 0,
  title: '',
  explorer_id: 0,
  growth_area_id: 0,
  stars: 5,
  status: 'pending',
  frequency: 'daily',
  difficulty: 'easy',
  evidence_type: 'none',
  due_date: '',
  starts_at: '',
  ends_at: '',
  active: true,
})

function startEditMission(m: Mission) {
  editingMission.value = m.id
  Object.assign(editingMissionData, m)
  showCreateMission.value = false
}

const editingRewardData = reactive<Reward>({
  id: 0,
  name: '',
  description: '',
  stars_cost: 25,
  type: 'family',
  active: true,
})

function startEditReward(r: Reward) {
  editingReward.value = r.id
  Object.assign(editingRewardData, r)
  showCreateReward.value = false
}

const editingGuideData = reactive<Guide>({
  id: 0,
  name: '',
  email: '',
  password: '',
  active: true,
})

function startEditGuide(g: Guide) {
  editingGuide.value = g.id
  Object.assign(editingGuideData, g)
  editingGuideData.password = ''
  showCreateGuide.value = false
}

function getExplorerName(id?: number | string) {
  const explorer = (explorers.value || []).find((e) => String(e.id) === String(id))
  return explorer?.name || 'Explorador'
}

function getGrowthAreaName(id?: number | string) {
  const area = (growthAreas.value || []).find((a) => String(a.id) === String(id))
  return area?.name || 'Área general'
}

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

  let finalBirthdate: string | undefined = undefined
  if (explorerForm.ageMode === 'birthdate' && explorerForm.birthdate) {
    finalBirthdate = explorerForm.birthdate
  } else if (explorerForm.age !== null && explorerForm.age !== undefined) {
    const targetYear = new Date().getFullYear() - Number(explorerForm.age)
    finalBirthdate = `${targetYear}-06-15`
  }

  try {
    await request('/explorers', {
      method: 'POST',
      body: {
        name: explorerForm.name,
        birthdate: finalBirthdate,
        email: explorerForm.has_account && explorerForm.identifier ? explorerForm.identifier : undefined,
        password: explorerForm.has_account && explorerForm.password ? explorerForm.password : undefined,
      },
    })

    success.value = explorerForm.has_account && explorerForm.identifier
      ? `¡Explorador ${explorerForm.name} registrado con éxito! Ya puede ingresar con su identificador/correo.`
      : `¡Explorador ${explorerForm.name} registrado en modo tutelado!`
    
    explorerForm.name = ''
    explorerForm.age = 8
    explorerForm.birthdate = ''
    explorerForm.has_account = false
    explorerForm.identifier = ''
    explorerForm.password = ''
    showCreateExplorer.value = false
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
        birthdate: explorer.birthdate || undefined,
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

async function saveEditingExplorer() {
  saving.value = true
  resetMessages()

  let finalBirthdate: string | undefined = undefined
  if (editingExplorerData.ageMode === 'birthdate' && editingExplorerData.birthdate) {
    finalBirthdate = editingExplorerData.birthdate
  } else if (editingExplorerData.age !== null && editingExplorerData.age !== undefined) {
    const targetYear = new Date().getFullYear() - Number(editingExplorerData.age)
    finalBirthdate = `${targetYear}-06-15`
  }

  try {
    await request(`/explorers/${editingExplorerData.id}`, {
      method: 'PUT',
      body: {
        name: editingExplorerData.name,
        birthdate: finalBirthdate,
        email: editingExplorerData.has_account && editingExplorerData.identifier ? editingExplorerData.identifier : undefined,
        password: editingExplorerData.has_account && editingExplorerData.password ? editingExplorerData.password : undefined,
        status: editingExplorerData.status || 'active',
      },
    })

    editingExplorer.value = null
    success.value = `Explorador ${editingExplorerData.name} actualizado con éxito.`
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
  if (!armDelete(`mission-${mission.id}`)) {
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
  if (!armDelete(`reward-${reward.id}`)) {
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
  if (!armDelete(`guide-${guide.id}`)) {
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
  <AppShell :title="pageTitle" section="guide">
    <PwaBanner />

    <!-- Top Workspace Main Tabs Navigation -->
    <nav class="workspace-main-tabs" aria-label="Pestañas del Nido">
      <button
        type="button"
        class="workspace-tab-btn"
        :class="{ active: activeTab === 'overview' }"
        @click="switchTab('overview')"
      >
        <span>📊</span>
        <span>Indicadores</span>
      </button>
      <button
        type="button"
        class="workspace-tab-btn"
        :class="{ active: activeTab === 'explorers' }"
        @click="switchTab('explorers')"
      >
        <span>👥</span>
        <span>Exploradores</span>
        <span class="workspace-tab-count">{{ (explorers || []).length }}</span>
      </button>
      <button
        type="button"
        class="workspace-tab-btn"
        :class="{ active: activeTab === 'missions' }"
        @click="switchTab('missions')"
      >
        <span>🎯</span>
        <span>Misiones y Hábitos</span>
        <span class="workspace-tab-count">{{ (missions || []).length }}</span>
        <span v-if="submittedMissions.length > 0" class="workspace-tab-alert-badge" title="Entregas por revisar">
          {{ submittedMissions.length }}
        </span>
      </button>
      <button
        type="button"
        class="workspace-tab-btn"
        :class="{ active: activeTab === 'rewards' }"
        @click="switchTab('rewards')"
      >
        <span>🎁</span>
        <span>Recompensas</span>
        <span class="workspace-tab-count">{{ (rewards || []).length }}</span>
      </button>
      <button
        type="button"
        class="workspace-tab-btn"
        :class="{ active: activeTab === 'guides' }"
        @click="switchTab('guides')"
      >
        <span>🛡️</span>
        <span>Formadores</span>
        <span class="workspace-tab-count">{{ (guides || []).length }}</span>
      </button>
    </nav>

    <template v-if="activeTab === 'overview'">
      <!-- Main Metric Cards Grid -->
      <section class="dashboard-grid">
        <MetricCard
          v-for="stat in stats"
          :key="stat.key"
          :label="stat.label"
          :value="stat.value"
          :icon="stat.icon"
          :hint="stat.hint"
          :badge="stat.badge"
          :tone="stat.tone"
          :clickable="true"
          @click="activeTab = stat.tab"
        />
      </section>

      <!-- Dashboard Columns: Explorers & Weekly Activity -->
      <section class="dashboard-columns">
        <!-- Explorers Stars & Contribution Card -->
        <article class="panel wide">
          <div class="panel-header">
            <div>
              <h2>{{ t('dashboard.starsByExplorer') }}</h2>
              <span style="font-size: 0.8rem; color: var(--muted); font-weight: normal;">
                Balance y avance por cada explorador
              </span>
            </div>
            <button
              class="button secondary small"
              type="button"
              @click="activeTab = 'explorers'"
            >
              + Explorador
            </button>
          </div>

          <div class="explorer-list" style="margin-top: 10px;">
            <div
              v-for="(explorer, index) in dashboard?.stars_by_explorer || []"
              :key="explorer.explorer_id"
              class="explorer-card-enhanced"
            >
              <div class="explorer-card-header">
                <div class="explorer-card-left">
                  <div
                    class="explorer-avatar-sm"
                    :style="{ background: avatarGradients[index % avatarGradients.length] }"
                  >
                    {{ explorer.name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <div class="explorer-card-name">{{ explorer.name }}</div>
                    <div v-if="explorer.age_group" class="explorer-card-age">
                      {{ ageGroupLabels[explorer.age_group] || explorer.age_group }}
                    </div>
                  </div>
                </div>
                <div class="explorer-card-right" style="display: flex; align-items: center; gap: 8px;">
                  <div
                    v-if="explorer.streak"
                    class="explorer-card-streak-pill"
                    :title="`Racha actual: ${explorer.streak} días seguidos`"
                    style="background: #ffedd5; color: #ea580c; border: 1px solid #fdba74; font-size: 0.78rem; font-weight: 800; padding: 2px 8px; border-radius: var(--radius-full); display: inline-flex; align-items: center; gap: 4px;"
                  >
                    <span>🔥</span>
                    <span>{{ explorer.streak }}d</span>
                  </div>
                  <div class="explorer-card-stars">
                    <span>⭐</span>
                    <span>{{ explorer.stars }}</span>
                  </div>
                </div>
              </div>

              <!-- Share of Total Stars Progress Bar -->
              <div class="explorer-card-bar-bg" :title="`${Math.round((explorer.stars / totalExplorerStars) * 100)}% del total`">
                <div
                  class="explorer-card-bar-fill"
                  :style="{ width: `${Math.min(100, Math.round((explorer.stars / totalExplorerStars) * 100))}%` }"
                />
              </div>
            </div>

            <div v-if="!dashboard?.stars_by_explorer?.length" style="padding: 20px; text-align: center; background: var(--surface-hover); border-radius: var(--radius-md); border: 1px dashed var(--line-light);">
              <p style="font-size: 0.95rem; font-weight: 600; color: var(--text); margin-bottom: 4px;">Aún no tienes exploradores</p>
              <p style="font-size: 0.8rem; color: var(--muted); margin-bottom: 12px;">Agrega a tus hijos para asignarles misiones y estrellas.</p>
              <button class="button primary small" type="button" @click="activeTab = 'explorers'">
                Crear primer explorador
              </button>
            </div>
          </div>
        </article>

        <!-- Weekly Activity & Consistency Chart -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <h2>{{ t('dashboard.weeklyProgress') }}</h2>
              <span style="font-size: 0.8rem; color: var(--muted); font-weight: normal;">
                Actividad de los últimos 7 días
              </span>
            </div>
            <span class="family-goal-status-badge">
              🔥 {{ dashboard?.consistency_indicator || 0 }}/7 días
            </span>
          </div>

          <ProgressBars
            :days-activity="dashboard?.daily_activity"
            :consistency-days="dashboard?.consistency_indicator"
            :weekly-total="dashboard?.weekly_progress"
          />
        </article>
      </section>

      <!-- Family Goal Card -->
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Meta del Nido en Familia</h2>
            <span style="font-size: 0.8rem; color: var(--muted); font-weight: normal;">
              Un objetivo compartido para sumar hábitos en equipo
            </span>
          </div>
          <button
            class="button secondary small"
            type="button"
            @click="isEditingGoal = !isEditingGoal"
          >
            {{ isEditingGoal ? 'Cerrar' : (dashboard?.household?.family_weekly_goal ? 'Ajustar meta' : 'Fijar meta') }}
          </button>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="success" class="form-success">{{ success }}</p>

        <div class="family-goal-wrapper">
          <!-- Active Goal Progress Box -->
          <div v-if="dashboard?.household?.family_weekly_goal" class="family-goal-progress-box">
            <div class="family-goal-header">
              <span style="font-weight: 700; font-size: 0.95rem; color: var(--text);">
                Avance semanal conjunto
              </span>
              <span class="family-goal-status-badge">
                {{ dashboard.household.family_goal_progress || 0 }}% completado
              </span>
            </div>

            <!-- Glowing Progress Bar -->
            <div class="family-goal-bar-track">
              <div
                class="family-goal-bar-fill"
                :style="{ width: `${Math.min(100, dashboard.household.family_goal_progress || 0)}%` }"
              />
            </div>

            <div class="family-goal-meta-stats">
              <span>Estrellas ganadas esta semana: <strong>{{ dashboard.household.stars_earned_last_7_days || 0 }} ⭐</strong></span>
              <span>Meta fijada: <strong>{{ dashboard.household.family_weekly_goal }} ⭐</strong></span>
            </div>

            <div class="family-goal-message">
              <span v-if="(dashboard.household.family_goal_progress || 0) >= 100">
                🎉 ¡Felicitaciones! El Nido superó la meta familiar de esta semana.
              </span>
              <span v-else-if="(dashboard.household.family_goal_progress || 0) >= 50">
                🚀 ¡Van por excelente camino! Más de la mitad de la meta alcanzada.
              </span>
              <span v-else>
                🌱 Cada misión diaria cuenta para alcanzar la meta en familia.
              </span>
            </div>
          </div>

          <!-- Empty Goal State -->
          <div v-else style="padding: 18px; text-align: center; background: var(--surface-hover); border-radius: var(--radius-md); border: 1px dashed var(--line-light);">
            <p style="font-weight: 600; font-size: 0.95rem; color: var(--text); margin-bottom: 4px;">
              Fijen una meta semanal del Nido
            </p>
            <p style="font-size: 0.82rem; color: var(--muted); margin-bottom: 12px;">
              Un objetivo en estrellas que toda la familia suma unida sin comparar exploradores.
            </p>
            <button class="button primary small" type="button" @click="isEditingGoal = true">
              Fijar meta familiar
            </button>
          </div>

          <!-- Inline Edit Goal Form -->
          <form v-if="isEditingGoal" class="form-stack" style="max-width: 420px; margin-top: 8px;" @submit.prevent="saveFamilyGoal(); isEditingGoal = false">
            <label>
              <span>Nueva meta semanal (en estrellas)</span>
              <input v-model.number="familyGoalForm.stars" type="number" min="1" max="10000" required placeholder="Ej: 50">
            </label>
            <div style="display: flex; gap: 8px;">
              <button class="button primary small" type="submit" :disabled="saving">
                {{ saving ? 'Guardando...' : 'Guardar meta' }}
              </button>
              <button class="button secondary small" type="button" @click="isEditingGoal = false">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Quick Action Shortcuts -->
      <section class="panel">
        <div class="panel-header">
          <h2>Acciones Rápidas</h2>
          <span>Atajos para gestionar tu Nido</span>
        </div>

        <div class="quick-actions-grid">
          <button class="quick-action-btn" type="button" @click="activeTab = 'missions'">
            <div class="quick-action-icon">🎯</div>
            <div class="quick-action-info">
              <strong>Asignar Misión</strong>
              <span>Crear hábitos y tareas</span>
            </div>
          </button>

          <button class="quick-action-btn" type="button" @click="activeTab = 'missions'">
            <div class="quick-action-icon">⏳</div>
            <div class="quick-action-info">
              <strong>Revisar Entregas</strong>
              <span v-if="(dashboard?.submitted_missions ?? 0) > 0" style="color: #dc2626; font-weight: 700;">
                {{ dashboard?.submitted_missions }} pendiente{{ (dashboard?.submitted_missions ?? 0) > 1 ? 's' : '' }}
              </span>
              <span v-else>Todo revisado</span>
            </div>
          </button>

          <button class="quick-action-btn" type="button" @click="activeTab = 'rewards'">
            <div class="quick-action-icon">🎁</div>
            <div class="quick-action-info">
              <strong>Recompensas</strong>
              <span v-if="(dashboard?.requested_rewards ?? 0) > 0" style="color: #ea580c; font-weight: 700;">
                {{ dashboard?.requested_rewards }} por canjear
              </span>
              <span v-else>Catálogo de premios</span>
            </div>
          </button>

          <button class="quick-action-btn" type="button" @click="activeTab = 'explorers'">
            <div class="quick-action-icon">👥</div>
            <div class="quick-action-info">
              <strong>Exploradores</strong>
              <span>Gestionar hijos y perfiles</span>
            </div>
          </button>
        </div>
      </section>
    </template>

    <!-- TAB: EXPLORADORES -->
    <template v-else-if="activeTab === 'explorers'">
      <section class="panel">
        <div class="section-header-bar">
          <div class="section-header-info">
            <h2>Exploradores del Nido</h2>
            <p>Administra los perfiles de tus hijos, sus estrellas disponibles y su acceso individual</p>
          </div>
          <button
            class="button primary small"
            type="button"
            @click="showCreateExplorer = !showCreateExplorer; editingExplorer = null"
          >
            {{ showCreateExplorer ? '✕ Cerrar formulario' : '➕ Nuevo Explorador' }}
          </button>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="success" class="form-success">{{ success }}</p>

        <!-- Form: Create Explorer -->
        <div v-if="showCreateExplorer" class="item-form-card" style="margin-bottom: 24px;">
          <div class="item-form-header">
            <div>
              <h3>Registrar Nuevo Explorador</h3>
              <p style="font-size: 0.82rem; color: var(--muted); margin: 2px 0 0 0;">Crea el perfil de tu hijo y define si accederá desde su propio dispositivo</p>
            </div>
            <button class="button secondary small" type="button" @click="showCreateExplorer = false">Cancelar</button>
          </div>

          <form class="form-stack explorer-form-container" @submit.prevent="createExplorer()">
            <!-- Nombre -->
            <label>
              <span style="font-weight: 700;">Nombre del explorador *</span>
              <input v-model="explorerForm.name" required placeholder="Ej: Mateo, Sofía...">
            </label>

            <!-- Edad y Grupo Formativo -->
            <div class="age-selection-box">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <span style="font-weight: 700; font-size: 0.9rem; color: var(--text);">Edad y Grupo Formativo</span>
                <div class="age-mode-tabs">
                  <button
                    type="button"
                    class="age-mode-btn"
                    :class="{ active: explorerForm.ageMode === 'age' }"
                    @click="explorerForm.ageMode = 'age'"
                  >
                    Selector de edad
                  </button>
                  <button
                    type="button"
                    class="age-mode-btn"
                    :class="{ active: explorerForm.ageMode === 'birthdate' }"
                    @click="explorerForm.ageMode = 'birthdate'"
                  >
                    Fecha de nacimiento
                  </button>
                </div>
              </div>

              <!-- Selector de edad directo -->
              <div v-if="explorerForm.ageMode === 'age'" class="age-slider-row">
                <input
                  v-model.number="explorerForm.age"
                  type="range"
                  min="4"
                  max="17"
                  step="1"
                  class="age-slider"
                >
                <div class="age-badge-display">
                  🎂 {{ explorerForm.age }} años
                </div>
              </div>

              <!-- Selector por fecha de nacimiento -->
              <div v-else>
                <label style="margin: 0;">
                  <span style="font-size: 0.82rem; color: var(--muted);">Fecha de nacimiento del explorador</span>
                  <input v-model="explorerForm.birthdate" type="date">
                </label>
              </div>

              <!-- Age Guidance Card -->
              <div class="age-guidance-card" :class="currentExplorerAgeGuidance.group">
                <div class="age-guidance-header">
                  <div class="age-guidance-tag">
                    <span>{{ currentExplorerAgeGuidance.icon }}</span>
                    <span>Grupo {{ currentExplorerAgeGuidance.name }} ({{ currentExplorerAgeGuidance.label }})</span>
                  </div>
                  <div class="age-guidance-pills">
                    <span class="age-guidance-pill">🎯 Dificultad: {{ currentExplorerAgeGuidance.difficulty }}</span>
                    <span class="age-guidance-pill stars">⭐ {{ currentExplorerAgeGuidance.stars }}</span>
                  </div>
                </div>
                <div class="age-guidance-desc">
                  💡 <strong>Enfoque recomendado:</strong> {{ currentExplorerAgeGuidance.focus }}
                </div>
              </div>
            </div>

            <!-- Acceso individual (Celular / Documento / Usuario / Correo) -->
            <div class="account-toggle-card">
              <label class="account-toggle-header">
                <input v-model="explorerForm.has_account" type="checkbox">
                <div class="account-toggle-text">
                  <strong>¿Tendrá acceso en su propio celular, tablet o PC?</strong>
                  <span>Habilita un usuario para que tu hijo entre a marcar misiones cumplidas y canjear premios.</span>
                </div>
              </label>

              <!-- If has account enabled -->
              <div v-if="explorerForm.has_account" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 6px; padding-top: 12px; border-top: 1px dashed var(--line);">
                <label>
                  <span style="font-weight: 700;">Celular, Identificación, Usuario o Correo *</span>
                  <input
                    v-model="explorerForm.identifier"
                    required
                    placeholder="Ej: 3001234567, 1020304050 o mateo"
                  >
                  <span class="identifier-input-note">
                    ℹ️ Puede ser su número de celular, documento o apodo; no requiere tener un correo real.
                  </span>
                </label>
                <label>
                  <span style="font-weight: 700;">Contraseña inicial *</span>
                  <input
                    v-model="explorerForm.password"
                    type="password"
                    minlength="8"
                    required
                    placeholder="Mínimo 8 caracteres"
                  >
                  <span class="identifier-input-note">
                    🔒 La usará para iniciar sesión junto con su celular, documento o usuario.
                  </span>
                </label>
              </div>

              <!-- If no account (Tutelado mode) -->
              <div v-else class="tutelado-banner">
                <span>🌱</span>
                <span><strong>Modo tutelado:</strong> El explorador no necesita dispositivo ni correo. Tú como formador gestionarás sus misiones y estrellas directamente.</span>
              </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 6px;">
              <button class="button primary" type="submit" :disabled="saving">
                {{ saving ? 'Guardando...' : 'Crear explorador' }}
              </button>
              <button class="button secondary" type="button" @click="showCreateExplorer = false">
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <!-- Form: Edit Explorer -->
        <div v-if="editingExplorer" class="item-form-card" style="margin-bottom: 24px;">
          <div class="item-form-header">
            <div>
              <h3>Editar Explorador</h3>
              <p style="font-size: 0.82rem; color: var(--muted); margin: 2px 0 0 0;">Modifica los datos del perfil y las credenciales de acceso</p>
            </div>
            <button class="button secondary small" type="button" @click="editingExplorer = null">Cancelar</button>
          </div>

          <form class="form-stack explorer-form-container" @submit.prevent="saveEditingExplorer()">
            <!-- Nombre -->
            <label>
              <span style="font-weight: 700;">Nombre del explorador *</span>
              <input v-model="editingExplorerData.name" required>
            </label>

            <!-- Edad y Grupo Formativo -->
            <div class="age-selection-box">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <span style="font-weight: 700; font-size: 0.9rem; color: var(--text);">Edad y Grupo Formativo</span>
                <div class="age-mode-tabs">
                  <button
                    type="button"
                    class="age-mode-btn"
                    :class="{ active: editingExplorerData.ageMode === 'age' }"
                    @click="editingExplorerData.ageMode = 'age'"
                  >
                    Selector de edad
                  </button>
                  <button
                    type="button"
                    class="age-mode-btn"
                    :class="{ active: editingExplorerData.ageMode === 'birthdate' }"
                    @click="editingExplorerData.ageMode = 'birthdate'"
                  >
                    Fecha de nacimiento
                  </button>
                </div>
              </div>

              <!-- Selector de edad directo -->
              <div v-if="editingExplorerData.ageMode === 'age'" class="age-slider-row">
                <input
                  v-model.number="editingExplorerData.age"
                  type="range"
                  min="4"
                  max="17"
                  step="1"
                  class="age-slider"
                >
                <div class="age-badge-display">
                  🎂 {{ editingExplorerData.age }} años
                </div>
              </div>

              <!-- Selector por fecha de nacimiento -->
              <div v-else>
                <label style="margin: 0;">
                  <span style="font-size: 0.82rem; color: var(--muted);">Fecha de nacimiento del explorador</span>
                  <input v-model="editingExplorerData.birthdate" type="date">
                </label>
              </div>

              <!-- Age Guidance Card -->
              <div class="age-guidance-card" :class="editingExplorerAgeGuidance.group">
                <div class="age-guidance-header">
                  <div class="age-guidance-tag">
                    <span>{{ editingExplorerAgeGuidance.icon }}</span>
                    <span>Grupo {{ editingExplorerAgeGuidance.name }} ({{ editingExplorerAgeGuidance.label }})</span>
                  </div>
                  <div class="age-guidance-pills">
                    <span class="age-guidance-pill">🎯 Dificultad: {{ editingExplorerAgeGuidance.difficulty }}</span>
                    <span class="age-guidance-pill stars">⭐ {{ editingExplorerAgeGuidance.stars }}</span>
                  </div>
                </div>
                <div class="age-guidance-desc">
                  💡 <strong>Enfoque recomendado:</strong> {{ editingExplorerAgeGuidance.focus }}
                </div>
              </div>
            </div>

            <!-- Acceso individual -->
            <div class="account-toggle-card">
              <label class="account-toggle-header">
                <input v-model="editingExplorerData.has_account" type="checkbox">
                <div class="account-toggle-text">
                  <strong>¿Tiene acceso en su propio celular, tablet o PC?</strong>
                  <span>Habilita o edita las credenciales para que tu hijo ingrese a su panel de explorador.</span>
                </div>
              </label>

              <!-- If has account enabled -->
              <div v-if="editingExplorerData.has_account" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 6px; padding-top: 12px; border-top: 1px dashed var(--line);">
                <label>
                  <span style="font-weight: 700;">Celular, Identificación, Usuario o Correo</span>
                  <input
                    v-model="editingExplorerData.identifier"
                    placeholder="Ej: 3001234567, 1020304050 o mateo"
                  >
                  <span class="identifier-input-note">
                    ℹ️ Puede ser su número de celular, documento o apodo sin @correo.
                  </span>
                </label>
                <label>
                  <span style="font-weight: 700;">Nueva contraseña (opcional)</span>
                  <input
                    v-model="editingExplorerData.password"
                    type="password"
                    placeholder="Dejar en blanco para conservar la actual"
                  >
                  <span class="identifier-input-note">
                    🔒 Déjala vacía si no deseas cambiar su clave.
                  </span>
                </label>
              </div>

              <!-- If no account -->
              <div v-else class="tutelado-banner">
                <span>🌱</span>
                <span><strong>Modo tutelado:</strong> Sin acceso individual independiente. El formador administra sus misiones y estrellas.</span>
              </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 6px;">
              <button class="button primary" type="submit" :disabled="saving">Guardar cambios</button>
              <button class="button secondary" type="button" @click="editingExplorer = null">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- Explorers Cards Grid -->
        <div class="workspace-cards-grid">
          <div
            v-for="(explorer, index) in explorers || []"
            :key="explorer.id"
            class="workspace-item-card"
            :class="{ 'is-inactive': explorer.status === 'inactive' }"
          >
            <div class="workspace-item-card-header">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div
                  class="explorer-avatar-sm"
                  :style="{ background: avatarGradients[index % avatarGradients.length] }"
                >
                  {{ explorer.name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <div class="workspace-item-title">{{ explorer.name }}</div>
                  <span v-if="explorer.age" style="font-size: 0.8rem; font-weight: 600; color: var(--text);">
                    🎂 {{ explorer.age }} años
                  </span>
                  <span v-else style="font-size: 0.8rem; color: var(--muted);">Edad sin especificar</span>
                </div>
              </div>
              <div class="workspace-item-stars">
                <span>⭐</span>
                <span>{{ explorer.available_stars }}</span>
              </div>
            </div>

            <div class="workspace-item-meta">
              <span class="workspace-meta-pill">{{ explorer.status === 'inactive' ? 'Inactivo' : 'Activo' }}</span>
              <span v-if="explorer.age_group" class="workspace-meta-pill area">
                {{ explorer.age_group === 'peques' ? '🐣 Peques (5 a 8 años)' : (explorer.age_group === 'medios' ? '🎒 Medios (9 a 13 años)' : '🚀 Jóvenes (14 a 17 años)') }}
              </span>
              <span v-if="explorer.has_account || explorer.login_identifier || explorer.email" class="workspace-meta-pill explorer" :title="explorer.login_identifier || explorer.email || ''">
                📱 Acceso: {{ explorer.login_identifier || explorer.email }}
              </span>
              <span v-else class="workspace-meta-pill" style="background: rgba(16, 185, 129, 0.08); color: #065f46;">
                🌱 Modo tutelado
              </span>
            </div>

            <div class="workspace-item-actions">
              <button class="button small secondary" type="button" @click="startEditExplorer(explorer)">Editar</button>
              <button class="button small secondary" type="button" @click="toggleExplorer(explorer)">
                {{ explorer.status === 'inactive' ? 'Activar' : 'Inactivar' }}
              </button>
            </div>
          </div>

          <div v-if="!explorers?.length" style="grid-column: 1 / -1; padding: 32px; text-align: center; background: var(--surface-hover); border-radius: var(--radius-md); border: 1px dashed var(--line-light);">
            <p style="font-size: 1.05rem; font-weight: 600; margin-bottom: 6px;">No tienes exploradores registrados aún</p>
            <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 14px;">Registra a tus hijos para comenzar a asignarles misiones y estrellas formativas.</p>
            <button class="button primary small" type="button" @click="showCreateExplorer = true">
              ➕ Crear primer explorador
            </button>
          </div>
        </div>
      </section>
    </template>

    <!-- TAB: MISIONES Y HÁBITOS -->
    <template v-else-if="activeTab === 'missions'">
      <section class="panel">
        <div class="section-header-bar">
          <div class="section-header-info">
            <h2>Misiones y Hábitos</h2>
            <p>Define misiones formativas y califica las entregas enviadas por tus exploradores</p>
          </div>
          <button
            class="button primary small"
            type="button"
            @click="showCreateMission = !showCreateMission; editingMission = null"
          >
            {{ showCreateMission ? '✕ Cerrar formulario' : '➕ Nueva Misión' }}
          </button>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="success" class="form-success">{{ success }}</p>

        <!-- Missions Summary Metrics Bar -->
        <div class="missions-summary-strip">
          <div class="missions-stat-pill">
            <span>🎯</span>
            <span><strong>{{ missionsSummaryStats.total }}</strong> misiones creadas</span>
          </div>
          <div class="missions-stat-pill active-pill">
            <span>⚡</span>
            <span><strong>{{ missionsSummaryStats.active }}</strong> activas</span>
          </div>
          <div class="missions-stat-pill stars-pill">
            <span>⭐</span>
            <span><strong>{{ missionsSummaryStats.dailyStarsTotal }} ⭐/día</strong> en hábitos diarios</span>
          </div>
          <div
            v-if="submittedMissions.length > 0"
            class="missions-stat-pill review-pill"
            @click="missionsFilter = 'pending_review'"
          >
            <span>⏳</span>
            <span><strong>{{ submittedMissions.length }}</strong> por revisar</span>
          </div>
        </div>

        <!-- Explorer Switcher Tabs -->
        <div class="missions-explorer-tabs">
          <button
            class="missions-explorer-tab"
            :class="{ active: selectedMissionExplorer === 'all' }"
            type="button"
            @click="selectedMissionExplorer = 'all'"
          >
            <span>👥 Todos los exploradores</span>
            <span class="missions-explorer-tab-badge">{{ (missions || []).length }}</span>
          </button>
          <button
            v-for="explorer in explorers || []"
            :key="`tab-exp-${explorer.id}`"
            class="missions-explorer-tab"
            :class="{ active: selectedMissionExplorer === explorer.id }"
            type="button"
            @click="selectedMissionExplorer = explorer.id"
          >
            <span>{{ explorer.name }}</span>
            <span class="missions-explorer-tab-badge">
              {{ (missions || []).filter((m) => m.explorer_id === explorer.id).length }}
            </span>
          </button>
        </div>

        <!-- Search and Filters Toolbar -->
        <div class="missions-toolbar">
          <div class="missions-toolbar-filters">
            <!-- Search -->
            <input
              v-model="missionSearch"
              type="search"
              placeholder="🔍 Buscar misión o hábito..."
              class="missions-search-input"
            >

            <!-- Status Subfilter -->
            <select v-model="missionsFilter" class="missions-select-filter">
              <option value="all">Estado: Todos</option>
              <option value="active">Solo Activas</option>
              <option value="inactive">Solo Inactivas</option>
              <option value="pending_review">Por revisar ({{ submittedMissions.length }})</option>
            </select>

            <!-- Frequency Filter -->
            <select v-model="selectedMissionFrequency" class="missions-select-filter">
              <option value="all">Frecuencia: Todas</option>
              <option value="daily">🔁 Diarias / Hábitos</option>
              <option value="weekly">📅 Semanales</option>
              <option value="once">🎯 Retos Únicos</option>
              <option value="monthly">📆 Mensuales</option>
              <option value="custom">⚡ Rango</option>
            </select>

            <!-- Area Filter -->
            <select v-model="selectedMissionArea" class="missions-select-filter">
              <option value="all">Área: Todas</option>
              <option v-for="area in growthAreas || []" :key="area.id" :value="area.id">{{ area.name }}</option>
            </select>

            <!-- Group By Selector -->
            <select v-model="missionGroupBy" class="missions-select-filter">
              <option value="explorer">Agrupar: Por Explorador</option>
              <option value="frequency">Agrupar: Por Frecuencia</option>
              <option value="flat">Sin agrupar (Lista completa)</option>
            </select>
          </div>

          <!-- View Mode (Compact Table vs Cards) -->
          <div class="missions-view-toggles">
            <button
              type="button"
              class="missions-view-btn"
              :class="{ active: missionViewMode === 'table' }"
              title="Vista compacta en tabla"
              @click="missionViewMode = 'table'"
            >
              📋 Tabla
            </button>
            <button
              type="button"
              class="missions-view-btn"
              :class="{ active: missionViewMode === 'cards' }"
              title="Vista en tarjetas"
              @click="missionViewMode = 'cards'"
            >
              🎴 Tarjetas
            </button>
          </div>
        </div>

        <!-- Pending Review Queue (Highlight) -->
        <div v-if="(missionsFilter === 'all' || missionsFilter === 'pending_review') && submittedMissions.length > 0" style="margin-bottom: 24px;">
          <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 12px; color: #b45309; display: flex; align-items: center; gap: 6px;">
            <span>⏳</span> Entregas esperando tu revisión ({{ submittedMissions.length }})
          </h3>
          <div class="workspace-cards-grid">
            <div
              v-for="mission in submittedMissions"
              :key="`review-${mission.id}`"
              class="review-card-highlight"
            >
              <div class="review-card-top">
                <div>
                  <strong style="font-size: 1rem; color: #0f172a;">{{ mission.title }}</strong>
                  <div style="font-size: 0.8rem; color: #64748b; margin-top: 2px;">
                    Explorador: <strong>{{ getExplorerName(mission.explorer_id) }}</strong>
                  </div>
                </div>
                <div class="workspace-item-stars">
                  <span>⭐</span>
                  <span>{{ mission.stars }}</span>
                </div>
              </div>
              <div class="review-card-actions">
                <button
                  class="button small primary"
                  type="button"
                  :disabled="reviewingMission === mission.id"
                  @click="reviewMission(mission, 'approve')"
                >
                  ✅ Aprobar (+{{ mission.stars }} ⭐)
                </button>
                <button
                  class="button small secondary"
                  type="button"
                  :disabled="reviewingMission === mission.id"
                  @click="reviewMission(mission, 'reject')"
                >
                  Rechazar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Form: Create Mission -->
        <div v-if="showCreateMission" class="item-form-card" style="margin-bottom: 24px;">
          <div class="item-form-header">
            <h3>Crear Nueva Misión</h3>
            <button class="button secondary small" type="button" @click="showCreateMission = false">Cancelar</button>
          </div>
          <form class="form-stack" @submit.prevent="createMission(); showCreateMission = false">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
              <label style="grid-column: 1 / -1;">
                <span>Título de la misión</span>
                <input v-model="missionForm.title" required placeholder="Ej: Leer 20 minutos antes de dormir">
              </label>
              <label>
                <span>Explorador asignado</span>
                <select v-model="missionForm.explorer_id" required>
                  <option v-for="explorer in explorers || []" :key="explorer.id" :value="explorer.id">{{ explorer.name }}</option>
                </select>
              </label>
              <label>
                <span>Área de crecimiento</span>
                <select v-model="missionForm.growth_area_id" required>
                  <option v-for="area in growthAreas || []" :key="area.id" :value="area.id">{{ area.name }}</option>
                </select>
              </label>
              <label>
                <span>Estrellas de recompensa</span>
                <input v-model.number="missionForm.stars" type="number" min="1" max="100" required>
              </label>
              <label>
                <span>Frecuencia / Repetición</span>
                <select v-model="missionForm.frequency">
                  <option value="once">Una sola vez (Reto)</option>
                  <option value="daily">Diaria (Hábito)</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                  <option value="custom">Por rango de fechas</option>
                </select>
              </label>
              <label>
                <span>Fecha inicial</span>
                <input v-model="missionForm.due_date" type="date">
              </label>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="button primary" type="submit" :disabled="saving || !explorers?.length">
                {{ saving ? 'Guardando...' : 'Crear misión' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Form: Edit Mission -->
        <div v-if="editingMission" class="item-form-card" style="margin-bottom: 24px;">
          <div class="item-form-header">
            <h3>Editar Misión</h3>
            <button class="button secondary small" type="button" @click="editingMission = null">Cancelar</button>
          </div>
          <form class="form-stack" @submit.prevent="updateMission(editingMissionData)">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
              <label style="grid-column: 1 / -1;">
                <span>Título</span>
                <input v-model="editingMissionData.title" required>
              </label>
              <label>
                <span>Explorador</span>
                <select v-model="editingMissionData.explorer_id" required>
                  <option v-for="explorer in explorers || []" :key="explorer.id" :value="explorer.id">{{ explorer.name }}</option>
                </select>
              </label>
              <label>
                <span>Área</span>
                <select v-model="editingMissionData.growth_area_id" required>
                  <option v-for="area in growthAreas || []" :key="area.id" :value="area.id">{{ area.name }}</option>
                </select>
              </label>
              <label>
                <span>Estrellas</span>
                <input v-model.number="editingMissionData.stars" type="number" min="1" max="100">
              </label>
              <label>
                <span>Repetición</span>
                <select v-model="editingMissionData.frequency">
                  <option value="once">Una sola vez</option>
                  <option value="daily">Diaria</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                  <option value="custom">Por rango</option>
                </select>
              </label>
              <label>
                <span>Fecha</span>
                <input v-model="editingMissionData.due_date" type="date">
              </label>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="button primary" type="submit" :disabled="saving">Guardar cambios</button>
              <button class="button secondary" type="button" @click="editingMission = null">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- ═══ MODE 1: GROUPED BY EXPLORER ═══ -->
        <template v-if="missionsFilter !== 'pending_review' && missionGroupBy === 'explorer'">
          <div
            v-for="group in missionsByExplorer"
            :key="`group-exp-${group.explorer.id}`"
            class="missions-explorer-group"
          >
            <!-- Group Header -->
            <div class="missions-group-header">
              <div class="missions-group-left">
                <div
                  class="explorer-avatar-sm"
                  :style="{ background: avatarGradients[group.index % avatarGradients.length] }"
                >
                  {{ group.explorer.name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <div class="missions-group-title">{{ group.explorer.name }}</div>
                  <div class="missions-group-meta">
                    <span>⚡ {{ group.activeCount }} activa{{ group.activeCount === 1 ? '' : 's' }}</span>
                    <span>•</span>
                    <span>⭐ {{ group.dailyStars }} estrellas/día</span>
                    <span v-if="group.explorer.age_group" class="workspace-meta-pill" style="margin-left: 4px;">
                      {{ ageGroupLabels[group.explorer.age_group] || group.explorer.age_group }}
                    </span>
                  </div>
                </div>
              </div>

              <button
                class="button small secondary"
                type="button"
                @click="openCreateMissionForExplorer(group.explorer.id)"
              >
                ➕ Asignar misión a {{ group.explorer.name }}
              </button>
            </div>

            <!-- Table View -->
            <div v-if="missionViewMode === 'table'" class="missions-table-wrap">
              <table class="missions-compact-table">
                <thead>
                  <tr>
                    <th style="width: 110px;">Estado</th>
                    <th>Misión</th>
                    <th style="width: 140px;">Área</th>
                    <th style="width: 130px;">Frecuencia</th>
                    <th style="width: 90px;">Recompensa</th>
                    <th style="width: 140px; text-align: right;">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="mission in group.missions"
                    :key="mission.id"
                    :class="{ 'is-inactive': !mission.active }"
                  >
                    <td class="col-status">
                      <button
                        type="button"
                        class="inline-switch-btn"
                        :class="mission.active ? 'active' : 'inactive'"
                        :title="mission.active ? 'Clic para pausar' : 'Clic para activar'"
                        @click="toggleMission(mission)"
                      >
                        <span>{{ mission.active ? '● Activa' : '○ Pausada' }}</span>
                      </button>
                    </td>
                    <td class="col-title">
                      <div class="missions-table-title" :class="{ 'inactive-title': !mission.active }">
                        {{ mission.title }}
                      </div>
                    </td>
                    <td class="col-area">
                      <span class="workspace-meta-pill area">{{ getGrowthAreaName(mission.growth_area_id) }}</span>
                    </td>
                    <td class="col-freq">
                      <span class="workspace-meta-pill">{{ labelFrom(frequencyLabels, mission.frequency) }}</span>
                    </td>
                    <td class="col-stars">
                      <span class="workspace-item-stars" style="font-size: 0.8rem; padding: 2px 7px;">
                        ⭐ {{ mission.stars }}
                      </span>
                    </td>
                    <td class="col-actions">
                      <div class="inline-action-btns">
                        <button class="button small secondary" type="button" @click="startEditMission(mission)">
                          Editar
                        </button>
                        <button
                          class="button small danger"
                          type="button"
                          :disabled="saving"
                          @click="deleteMission(mission)"
                        >
                          {{ pendingDelete === `mission-${mission.id}` ? '¿Borrar?' : '🗑️' }}
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- Empty state for explorer without missions -->
                  <tr v-if="!group.missions.length" class="empty-table-row">
                    <td colspan="6" style="text-align: center; padding: 24px; color: var(--muted); background: var(--surface-hover);">
                      <p style="font-size: 0.92rem; font-weight: 600; color: var(--text); margin-bottom: 6px;">
                        {{ group.explorer.name }} no tiene misiones registradas todavía
                      </p>
                      <button class="button primary small" type="button" @click="openCreateMissionForExplorer(group.explorer.id)">
                        ➕ Crear primera misión para {{ group.explorer.name }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Cards View -->
            <div v-else class="workspace-cards-grid" style="padding: 16px;">
              <div
                v-for="mission in group.missions"
                :key="mission.id"
                class="workspace-item-card"
                :class="{ 'is-inactive': !mission.active }"
              >
                <div class="workspace-item-card-header">
                  <div>
                    <div class="workspace-item-title">{{ mission.title }}</div>
                  </div>
                  <div class="workspace-item-stars">
                    <span>⭐</span>
                    <span>{{ mission.stars }}</span>
                  </div>
                </div>

                <div class="workspace-item-meta">
                  <span class="workspace-meta-pill area">{{ getGrowthAreaName(mission.growth_area_id) }}</span>
                  <span class="workspace-meta-pill">{{ labelFrom(frequencyLabels, mission.frequency) }}</span>
                  <span class="workspace-meta-pill">{{ mission.active ? 'Activa' : 'Inactiva' }}</span>
                </div>

                <div class="workspace-item-actions">
                  <button class="button small secondary" type="button" @click="startEditMission(mission)">Editar</button>
                  <button class="button small secondary" type="button" @click="toggleMission(mission)">
                    {{ mission.active ? 'Inactivar' : 'Activar' }}
                  </button>
                  <button
                    class="button small danger"
                    type="button"
                    :disabled="saving"
                    @click="deleteMission(mission)"
                  >
                    {{ pendingDelete === `mission-${mission.id}` ? t('ui.confirmDeleteTap') : 'Borrar' }}
                  </button>
                </div>
              </div>

              <!-- Empty cards state for explorer -->
              <div v-if="!group.missions.length" style="grid-column: 1 / -1; padding: 22px; text-align: center; background: var(--surface-hover); border-radius: var(--radius-sm); border: 1px dashed var(--line-light);">
                <p style="font-size: 0.92rem; font-weight: 600; margin-bottom: 6px;">{{ group.explorer.name }} no tiene misiones registradas todavía</p>
                <button class="button primary small" type="button" @click="openCreateMissionForExplorer(group.explorer.id)">
                  ➕ Crear primera misión para {{ group.explorer.name }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="!missionsByExplorer.length" style="padding: 32px; text-align: center; background: var(--surface-hover); border-radius: var(--radius-md); border: 1px dashed var(--line-light);">
            <p style="font-size: 1.05rem; font-weight: 600; margin-bottom: 6px;">No se encontraron misiones con estos filtros</p>
            <button class="button primary small" type="button" @click="openCreateMissionForExplorer()">
              ➕ Crear nueva misión
            </button>
          </div>
        </template>

        <!-- ═══ MODE 2: GROUPED BY FREQUENCY ═══ -->
        <template v-else-if="missionsFilter !== 'pending_review' && missionGroupBy === 'frequency'">
          <div
            v-for="group in missionsByFrequency"
            :key="`group-freq-${group.key}`"
            class="missions-explorer-group"
          >
            <!-- Group Header -->
            <div class="missions-group-header">
              <div class="missions-group-left">
                <span style="font-size: 1.4rem;">{{ group.icon }}</span>
                <div>
                  <div class="missions-group-title">{{ group.label }}</div>
                  <div class="missions-group-meta">
                    <span>⚡ {{ group.activeCount }} activa{{ group.activeCount === 1 ? '' : 's' }}</span>
                    <span>•</span>
                    <span>⭐ {{ group.totalStars }} estrellas</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Table View -->
            <div v-if="missionViewMode === 'table'" class="missions-table-wrap">
              <table class="missions-compact-table">
                <thead>
                  <tr>
                    <th style="width: 110px;">Estado</th>
                    <th>Misión</th>
                    <th style="width: 140px;">Explorador</th>
                    <th style="width: 140px;">Área</th>
                    <th style="width: 90px;">Recompensa</th>
                    <th style="width: 140px; text-align: right;">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="mission in group.missions"
                    :key="mission.id"
                    :class="{ 'is-inactive': !mission.active }"
                  >
                    <td class="col-status">
                      <button
                        type="button"
                        class="inline-switch-btn"
                        :class="mission.active ? 'active' : 'inactive'"
                        @click="toggleMission(mission)"
                      >
                        <span>{{ mission.active ? '● Activa' : '○ Pausada' }}</span>
                      </button>
                    </td>
                    <td class="col-title">
                      <div class="missions-table-title" :class="{ 'inactive-title': !mission.active }">
                        {{ mission.title }}
                      </div>
                    </td>
                    <td class="col-explorer">
                      <span class="workspace-meta-pill explorer">{{ getExplorerName(mission.explorer_id) }}</span>
                    </td>
                    <td class="col-area">
                      <span class="workspace-meta-pill area">{{ getGrowthAreaName(mission.growth_area_id) }}</span>
                    </td>
                    <td class="col-stars">
                      <span class="workspace-item-stars" style="font-size: 0.8rem; padding: 2px 7px;">
                        ⭐ {{ mission.stars }}
                      </span>
                    </td>
                    <td class="col-actions">
                      <div class="inline-action-btns">
                        <button class="button small secondary" type="button" @click="startEditMission(mission)">
                          Editar
                        </button>
                        <button
                          class="button small danger"
                          type="button"
                          :disabled="saving"
                          @click="deleteMission(mission)"
                        >
                          {{ pendingDelete === `mission-${mission.id}` ? '¿Borrar?' : '🗑️' }}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Cards View -->
            <div v-else class="workspace-cards-grid" style="padding: 16px;">
              <div
                v-for="mission in group.missions"
                :key="mission.id"
                class="workspace-item-card"
                :class="{ 'is-inactive': !mission.active }"
              >
                <div class="workspace-item-card-header">
                  <div>
                    <div class="workspace-item-title">{{ mission.title }}</div>
                    <div style="font-size: 0.8rem; color: var(--muted); margin-top: 2px;">
                      Para: <strong>{{ getExplorerName(mission.explorer_id) }}</strong>
                    </div>
                  </div>
                  <div class="workspace-item-stars">
                    <span>⭐</span>
                    <span>{{ mission.stars }}</span>
                  </div>
                </div>

                <div class="workspace-item-meta">
                  <span class="workspace-meta-pill area">{{ getGrowthAreaName(mission.growth_area_id) }}</span>
                  <span class="workspace-meta-pill">{{ mission.active ? 'Activa' : 'Inactiva' }}</span>
                </div>

                <div class="workspace-item-actions">
                  <button class="button small secondary" type="button" @click="startEditMission(mission)">Editar</button>
                  <button class="button small secondary" type="button" @click="toggleMission(mission)">
                    {{ mission.active ? 'Inactivar' : 'Activar' }}
                  </button>
                  <button
                    class="button small danger"
                    type="button"
                    :disabled="saving"
                    @click="deleteMission(mission)"
                  >
                    {{ pendingDelete === `mission-${mission.id}` ? t('ui.confirmDeleteTap') : 'Borrar' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ═══ MODE 3: FLAT LIST ═══ -->
        <template v-else-if="missionsFilter !== 'pending_review'">
          <!-- Flat Table View -->
          <div v-if="missionViewMode === 'table'" class="missions-table-wrap missions-flat-table-wrap">
            <table class="missions-compact-table">
              <thead>
                <tr>
                  <th style="width: 110px;">Estado</th>
                  <th>Misión</th>
                  <th style="width: 140px;">Explorador</th>
                  <th style="width: 140px;">Área</th>
                  <th style="width: 130px;">Frecuencia</th>
                  <th style="width: 90px;">Recompensa</th>
                  <th style="width: 140px; text-align: right;">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="mission in filteredMissionsList"
                  :key="mission.id"
                  :class="{ 'is-inactive': !mission.active }"
                >
                  <td class="col-status">
                    <button
                      type="button"
                      class="inline-switch-btn"
                      :class="mission.active ? 'active' : 'inactive'"
                      @click="toggleMission(mission)"
                    >
                      <span>{{ mission.active ? '● Activa' : '○ Pausada' }}</span>
                    </button>
                  </td>
                  <td class="col-title">
                    <div class="missions-table-title" :class="{ 'inactive-title': !mission.active }">
                      {{ mission.title }}
                    </div>
                  </td>
                  <td class="col-explorer">
                    <span class="workspace-meta-pill explorer">{{ getExplorerName(mission.explorer_id) }}</span>
                  </td>
                  <td class="col-area">
                    <span class="workspace-meta-pill area">{{ getGrowthAreaName(mission.growth_area_id) }}</span>
                  </td>
                  <td class="col-freq">
                    <span class="workspace-meta-pill">{{ labelFrom(frequencyLabels, mission.frequency) }}</span>
                  </td>
                  <td class="col-stars">
                    <span class="workspace-item-stars" style="font-size: 0.8rem; padding: 2px 7px;">
                      ⭐ {{ mission.stars }}
                    </span>
                  </td>
                  <td class="col-actions">
                    <div class="inline-action-btns">
                      <button class="button small secondary" type="button" @click="startEditMission(mission)">
                        Editar
                      </button>
                      <button
                        class="button small danger"
                        type="button"
                        :disabled="saving"
                        @click="deleteMission(mission)"
                      >
                        {{ pendingDelete === `mission-${mission.id}` ? '¿Borrar?' : '🗑️' }}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Flat Cards View -->
          <div v-else class="workspace-cards-grid">
            <div
              v-for="mission in filteredMissionsList"
              :key="mission.id"
              class="workspace-item-card"
              :class="{ 'is-inactive': !mission.active }"
            >
              <div class="workspace-item-card-header">
                <div>
                  <div class="workspace-item-title">{{ mission.title }}</div>
                  <div style="font-size: 0.8rem; color: var(--muted); margin-top: 2px;">
                    Para: <strong>{{ getExplorerName(mission.explorer_id) }}</strong>
                  </div>
                </div>
                <div class="workspace-item-stars">
                  <span>⭐</span>
                  <span>{{ mission.stars }}</span>
                </div>
              </div>

              <div class="workspace-item-meta">
                <span class="workspace-meta-pill area">{{ getGrowthAreaName(mission.growth_area_id) }}</span>
                <span class="workspace-meta-pill">{{ labelFrom(frequencyLabels, mission.frequency) }}</span>
                <span class="workspace-meta-pill">{{ mission.active ? 'Activa' : 'Inactiva' }}</span>
              </div>

              <div class="workspace-item-actions">
                <button class="button small secondary" type="button" @click="startEditMission(mission)">Editar</button>
                <button class="button small secondary" type="button" @click="toggleMission(mission)">
                  {{ mission.active ? 'Inactivar' : 'Activar' }}
                </button>
                <button
                  class="button small danger"
                  type="button"
                  :disabled="saving"
                  @click="deleteMission(mission)"
                >
                  {{ pendingDelete === `mission-${mission.id}` ? t('ui.confirmDeleteTap') : 'Borrar' }}
                </button>
              </div>
            </div>
          </div>
        </template>
      </section>
    </template>

    <!-- TAB: RECOMPENSAS -->
    <template v-else-if="activeTab === 'rewards'">
      <section class="panel">
        <div class="section-header-bar">
          <div class="section-header-info">
            <h2>Recompensas y Canjes</h2>
            <p>Gestiona los premios canjeables y aprueba las solicitudes de tus exploradores</p>
          </div>
          <button
            class="button primary small"
            type="button"
            @click="showCreateReward = !showCreateReward; editingReward = null"
          >
            {{ showCreateReward ? '✕ Cerrar formulario' : '➕ Nueva Recompensa' }}
          </button>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="success" class="form-success">{{ success }}</p>

        <!-- Prominent Subfilter Switcher -->
        <div class="missions-toolbar" style="margin-bottom: 20px;">
          <div class="missions-view-toggles" style="width: 100%; max-width: 520px; padding: 4px;">
            <button
              class="missions-view-btn"
              :class="{ active: rewardsFilter === 'catalog' }"
              type="button"
              style="padding: 10px 18px; font-size: 0.9rem; flex: 1;"
              @click="rewardsFilter = 'catalog'"
            >
              🎁 Catálogo de Premios ({{ (rewards || []).length }})
            </button>
            <button
              class="missions-view-btn"
              :class="{ active: rewardsFilter === 'redemptions' }"
              type="button"
              style="padding: 10px 18px; font-size: 0.9rem; flex: 1;"
              @click="rewardsFilter = 'redemptions'"
            >
              🎟️ Solicitudes de Canje
              <span v-if="(rewardRedemptions || []).filter(r => r.status === 'requested').length > 0" class="workspace-tab-alert-badge" style="margin-left: 6px;">
                {{ (rewardRedemptions || []).filter(r => r.status === 'requested').length }}
              </span>
              <span v-else class="workspace-tab-count" style="margin-left: 6px;">
                {{ (rewardRedemptions || []).length }}
              </span>
            </button>
          </div>
        </div>

        <!-- Form: Create Reward -->
        <div v-if="showCreateReward" class="item-form-card" style="margin-bottom: 24px;">
          <div class="item-form-header">
            <h3>Crear Nueva Recompensa</h3>
            <button class="button secondary small" type="button" @click="showCreateReward = false">Cancelar</button>
          </div>
          <form class="form-stack" @submit.prevent="createReward(); showCreateReward = false">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
              <label style="grid-column: 1 / -1;">
                <span>Nombre de la recompensa *</span>
                <input v-model="rewardForm.name" required placeholder="Ej: Salida a comer helado en familia">
              </label>
              <label>
                <span>Costo en estrellas *</span>
                <input v-model.number="rewardForm.stars_cost" type="number" min="1" required>
              </label>
              <label>
                <span>Categoría / Tipo</span>
                <select v-model="rewardForm.type">
                  <option value="family">Familia 👪</option>
                  <option value="experience">Experiencia 🎟️</option>
                  <option value="screen_time">Tiempo de pantalla 📱</option>
                  <option value="gift">Regalo 🎁</option>
                  <option value="custom">Personalizada ✨</option>
                </select>
              </label>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="button primary" type="submit" :disabled="saving">
                {{ saving ? 'Guardando...' : 'Crear recompensa' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Form: Edit Reward -->
        <div v-if="editingReward" class="item-form-card" style="margin-bottom: 24px;">
          <div class="item-form-header">
            <h3>Editar Recompensa</h3>
            <button class="button secondary small" type="button" @click="editingReward = null">Cancelar</button>
          </div>
          <form class="form-stack" @submit.prevent="updateReward(editingRewardData)">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
              <label style="grid-column: 1 / -1;">
                <span>Nombre *</span>
                <input v-model="editingRewardData.name" required>
              </label>
              <label>
                <span>Costo en estrellas *</span>
                <input v-model.number="editingRewardData.stars_cost" type="number" min="1">
              </label>
              <label>
                <span>Tipo</span>
                <select v-model="editingRewardData.type">
                  <option value="family">Familia 👪</option>
                  <option value="experience">Experiencia 🎟️</option>
                  <option value="screen_time">Tiempo de pantalla 📱</option>
                  <option value="gift">Regalo 🎁</option>
                  <option value="custom">Personalizada ✨</option>
                </select>
              </label>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="button primary" type="submit" :disabled="saving">Guardar cambios</button>
              <button class="button secondary" type="button" @click="editingReward = null">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- ═══ SUB-TAB 1: SOLICITUDES DE CANJE ═══ -->
        <div v-if="rewardsFilter === 'redemptions'">
          <!-- Redemptions Status Subfilter Bar -->
          <div class="section-subfilters">
            <button
              class="subfilter-btn"
              :class="{ active: redemptionStatusFilter === 'all' }"
              type="button"
              @click="redemptionStatusFilter = 'all'"
            >
              Todas ({{ (rewardRedemptions || []).length }})
            </button>
            <button
              class="subfilter-btn"
              :class="{ active: redemptionStatusFilter === 'requested' }"
              type="button"
              @click="redemptionStatusFilter = 'requested'"
            >
              ⏳ Pendientes por aprobar ({{ (rewardRedemptions || []).filter(r => r.status === 'requested').length }})
            </button>
            <button
              class="subfilter-btn"
              :class="{ active: redemptionStatusFilter === 'approved' }"
              type="button"
              @click="redemptionStatusFilter = 'approved'"
            >
              ✅ Aprobadas ({{ (rewardRedemptions || []).filter(r => r.status === 'approved').length }})
            </button>
            <button
              class="subfilter-btn"
              :class="{ active: redemptionStatusFilter === 'delivered' }"
              type="button"
              @click="redemptionStatusFilter = 'delivered'"
            >
              🎁 Entregadas ({{ (rewardRedemptions || []).filter(r => r.status === 'delivered').length }})
            </button>
            <button
              class="subfilter-btn"
              :class="{ active: redemptionStatusFilter === 'rejected' }"
              type="button"
              @click="redemptionStatusFilter = 'rejected'"
            >
              ❌ Rechazadas ({{ (rewardRedemptions || []).filter(r => r.status === 'rejected').length }})
            </button>
          </div>

          <!-- Redemptions Cards Grid -->
          <div v-if="filteredRedemptionsList.length > 0" class="workspace-cards-grid">
            <div
              v-for="redemption in filteredRedemptionsList"
              :key="`redemption-${redemption.id}`"
              class="workspace-item-card"
            >
              <div class="workspace-item-card-header">
                <div>
                  <div class="workspace-item-title">{{ redemption.reward?.name || 'Premio del catálogo' }}</div>
                  <div style="font-size: 0.8rem; color: var(--muted); margin-top: 2px;">
                    Solicitado por: <strong>{{ redemption.explorer?.name || 'Explorador' }}</strong>
                  </div>
                </div>
                <div class="workspace-item-stars">
                  <span>⭐</span>
                  <span>{{ redemption.stars_cost }}</span>
                </div>
              </div>

              <div class="workspace-item-meta">
                <span class="workspace-meta-pill" :class="{ 'area': redemption.status === 'approved', 'explorer': redemption.status === 'requested' }">
                  {{ labelFrom(redemptionStatusLabels, redemption.status) }}
                </span>
                <span class="workspace-meta-pill">{{ redemption.created_at ? new Date(redemption.created_at).toLocaleDateString() : 'Reciente' }}</span>
              </div>

              <div class="workspace-item-actions">
                <button
                  v-if="redemption.status === 'requested'"
                  class="button small primary"
                  type="button"
                  :disabled="reviewingReward === redemption.id"
                  @click="reviewReward(redemption, 'approve')"
                >
                  ✅ Aprobar canje (-{{ redemption.stars_cost }} ⭐)
                </button>
                <button
                  v-if="redemption.status === 'requested'"
                  class="button small secondary"
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
                  🎁 Marcar entregada
                </button>
              </div>
            </div>
          </div>

          <!-- Empty Redemptions State with Helpful Flow Guide -->
          <div v-else style="padding: 36px 20px; text-align: center; background: var(--surface-hover); border-radius: var(--radius-md); border: 1px dashed var(--line);">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">🎟️</div>
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text); margin-bottom: 6px;">
              No hay solicitudes de canje en este filtro
            </h3>
            <p style="font-size: 0.88rem; color: var(--muted); max-width: 520px; margin: 0 auto 16px auto; line-height: 1.45;">
              Cuando tus exploradores acumulen estrellas cumpliendo misiones, podrán pedir recompensas del catálogo desde su panel. Tú las aprobarás aquí para entregárselas en familia.
            </p>
            <button class="button secondary small" type="button" @click="rewardsFilter = 'catalog'">
              🎁 Ver catálogo de recompensas
            </button>
          </div>
        </div>

        <!-- ═══ SUB-TAB 2: CATÁLOGO DE PREMIOS ═══ -->
        <div v-else>
          <!-- Catalog Category Filters -->
          <div class="section-subfilters">
            <button
              class="subfilter-btn"
              :class="{ active: rewardCategoryFilter === 'all' }"
              type="button"
              @click="rewardCategoryFilter = 'all'"
            >
              Todos ({{ (rewards || []).length }})
            </button>
            <button
              class="subfilter-btn"
              :class="{ active: rewardCategoryFilter === 'family' }"
              type="button"
              @click="rewardCategoryFilter = 'family'"
            >
              Familia 👪 ({{ (rewards || []).filter(r => r.type === 'family').length }})
            </button>
            <button
              class="subfilter-btn"
              :class="{ active: rewardCategoryFilter === 'experience' }"
              type="button"
              @click="rewardCategoryFilter = 'experience'"
            >
              Experiencia 🎟️ ({{ (rewards || []).filter(r => r.type === 'experience').length }})
            </button>
            <button
              class="subfilter-btn"
              :class="{ active: rewardCategoryFilter === 'screen_time' }"
              type="button"
              @click="rewardCategoryFilter = 'screen_time'"
            >
              Pantalla 📱 ({{ (rewards || []).filter(r => r.type === 'screen_time').length }})
            </button>
            <button
              class="subfilter-btn"
              :class="{ active: rewardCategoryFilter === 'gift' }"
              type="button"
              @click="rewardCategoryFilter = 'gift'"
            >
              Regalo 🎁 ({{ (rewards || []).filter(r => r.type === 'gift').length }})
            </button>
          </div>

          <!-- Rewards Grid -->
          <div v-if="filteredRewardsList.length > 0" class="workspace-cards-grid">
            <div
              v-for="reward in filteredRewardsList"
              :key="reward.id"
              class="workspace-item-card"
              :class="{ 'is-inactive': !reward.active }"
            >
              <div class="workspace-item-card-header">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="font-size: 1.8rem; line-height: 1;">
                    {{ rewardTypeIcons[reward.type] || '🎁' }}
                  </div>
                  <div>
                    <div class="workspace-item-title">{{ reward.name }}</div>
                    <span style="font-size: 0.78rem; color: var(--muted);">{{ labelFrom(rewardTypeLabels, reward.type) }}</span>
                  </div>
                </div>
                <div class="workspace-item-stars">
                  <span>⭐</span>
                  <span>{{ reward.stars_cost }}</span>
                </div>
              </div>

              <div class="workspace-item-meta">
                <span class="workspace-meta-pill">{{ reward.active ? 'Activa' : 'Inactiva' }}</span>
                <span class="workspace-meta-pill area">{{ labelFrom(rewardTypeLabels, reward.type) }}</span>
              </div>

              <div class="workspace-item-actions">
                <button class="button small secondary" type="button" @click="startEditReward(reward)">Editar</button>
                <button class="button small secondary" type="button" @click="toggleReward(reward)">
                  {{ reward.active ? 'Inactivar' : 'Activar' }}
                </button>
                <button
                  class="button small danger"
                  type="button"
                  :disabled="saving"
                  @click="deleteReward(reward)"
                >
                  {{ pendingDelete === `reward-${reward.id}` ? t('ui.confirmDeleteTap') : 'Borrar' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Empty Catalog State -->
          <div v-else style="grid-column: 1 / -1; padding: 36px 20px; text-align: center; background: var(--surface-hover); border-radius: var(--radius-md); border: 1px dashed var(--line-light);">
            <p style="font-size: 1.05rem; font-weight: 700; margin-bottom: 6px;">No hay recompensas en esta categoría</p>
            <p style="font-size: 0.85rem; color: var(--muted); margin-bottom: 14px;">Crea premios motivacionales como salidas, tiempo libre o experiencias en familia.</p>
            <button class="button primary small" type="button" @click="showCreateReward = true">
              ➕ Crear nueva recompensa
            </button>
          </div>
        </div>
      </section>
    </template>

    <!-- TAB: FORMADORES -->
    <template v-else-if="activeTab === 'guides'">
      <section class="panel">
        <div class="section-header-bar">
          <div class="section-header-info">
            <h2>Formadores del Nido</h2>
            <p>Padres, madres o tutores autorizados para crear hábitos y calificar misiones</p>
          </div>
          <button
            class="button primary small"
            type="button"
            @click="showCreateGuide = !showCreateGuide; editingGuide = null"
          >
            {{ showCreateGuide ? '✕ Cerrar formulario' : '➕ Invitar Formador' }}
          </button>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="success" class="form-success">{{ success }}</p>

        <!-- Form: Create Guide -->
        <div v-if="showCreateGuide" class="item-form-card">
          <div class="item-form-header">
            <h3>Registrar Nuevo Formador</h3>
            <button class="button secondary small" type="button" @click="showCreateGuide = false">Cancelar</button>
          </div>
          <form class="form-stack" @submit.prevent="createGuide(); showCreateGuide = false">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
              <label>
                <span>Nombre del formador</span>
                <input v-model="guideForm.name" required placeholder="Ej: Mamá / Papá">
              </label>
              <label>
                <span>Correo electrónico</span>
                <input v-model="guideForm.email" type="email" required placeholder="formador@familia.com">
              </label>
              <label>
                <span>Contraseña inicial</span>
                <input v-model="guideForm.password" type="password" minlength="8" required placeholder="Mínimo 8 caracteres">
              </label>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="button primary" type="submit" :disabled="saving">
                {{ saving ? 'Guardando...' : 'Crear formador' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Form: Edit Guide -->
        <div v-if="editingGuide" class="item-form-card">
          <div class="item-form-header">
            <h3>Editar Formador</h3>
            <button class="button secondary small" type="button" @click="editingGuide = null">Cancelar</button>
          </div>
          <form class="form-stack" @submit.prevent="updateGuide(editingGuideData)">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
              <label>
                <span>Nombre</span>
                <input v-model="editingGuideData.name" required>
              </label>
              <label>
                <span>Correo</span>
                <input v-model="editingGuideData.email" type="email" required>
              </label>
              <label>
                <span>Nueva contraseña (opcional)</span>
                <input v-model="editingGuideData.password" type="password" placeholder="Dejar en blanco para conservar">
              </label>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="button primary" type="submit" :disabled="saving">Guardar cambios</button>
              <button class="button secondary" type="button" @click="editingGuide = null">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- Guides Cards Grid -->
        <div class="workspace-cards-grid">
          <div
            v-for="(guide, index) in guides || []"
            :key="guide.id"
            class="workspace-item-card"
            :class="{ 'is-inactive': !guide.active }"
          >
            <div class="workspace-item-card-header">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div
                  class="explorer-avatar-sm"
                  :style="{ background: avatarGradients[(index + 2) % avatarGradients.length] }"
                >
                  {{ guide.name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <div class="workspace-item-title">{{ guide.name }}</div>
                  <span style="font-size: 0.8rem; color: var(--muted);">{{ guide.email }}</span>
                </div>
              </div>
            </div>

            <div class="workspace-item-meta">
              <span class="workspace-meta-pill">{{ guide.active ? 'Activo' : 'Inactivo' }}</span>
              <span class="workspace-meta-pill">
                {{ guide.last_login_at ? 'Último ingreso: ' + new Date(guide.last_login_at).toLocaleDateString() : 'Sin ingresos registrados' }}
              </span>
            </div>

            <div class="workspace-item-actions">
              <button class="button small secondary" type="button" @click="startEditGuide(guide)">Editar</button>
              <button class="button small secondary" type="button" @click="toggleGuide(guide)">
                {{ guide.active ? 'Inactivar' : 'Activar' }}
              </button>
              <button
                class="button small danger"
                type="button"
                :disabled="saving"
                @click="deleteGuide(guide)"
              >
                {{ pendingDelete === `guide-${guide.id}` ? t('ui.confirmDeleteTap') : 'Borrar' }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </template>

    <section class="billing-banner">
      <div>
        <p class="eyebrow">{{ t('billing.eyebrow') }}</p>
        <h2>{{ t('billing.bannerTitle') }}</h2>
      </div>
      <NuxtLink class="button primary" to="/profile?tab=billing">{{ t('billing.manage') }}</NuxtLink>
    </section>
  </AppShell>
</template>
