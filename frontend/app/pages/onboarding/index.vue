<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
const { tenant } = useSession()
const { request } = useApi()
const loading = ref(false)
const error = ref('')
const form = reactive({
  nest: tenant.value?.name || '',
  explorer: '',
  area: 'study',
  mission: ''
})

const areas = ['study', 'home', 'wellbeing', 'reading']

const areaNames: Record<string, string> = {
  study: 'Estudio',
  home: 'Hogar',
  wellbeing: 'Bienestar',
  reading: 'Lectura'
}

async function submit() {
  loading.value = true
  error.value = ''

  try {
    await request('/onboarding/starter', {
      method: 'POST',
      body: {
        nest: form.nest,
        explorer: form.explorer,
        area: areaNames[form.area] || form.area,
        mission: form.mission,
      },
    })

    await navigateTo('/dashboard/guide')
  } catch (onboardingError) {
    error.value = getApiErrorMessage(onboardingError, 'No pudimos guardar el inicio de tu Nido.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="onboarding-page">
    <div class="onboarding-copy">
      <p class="eyebrow">{{ t('app.name') }}</p>
      <h1>{{ t('onboarding.title') }}</h1>
      <p>{{ t('onboarding.subtitle') }}</p>
    </div>

    <form class="onboarding-form" @submit.prevent="submit">
      <label>
        <span>{{ t('onboarding.nestName') }}</span>
        <input v-model="form.nest" required>
      </label>
      <label>
        <span>{{ t('onboarding.explorerName') }}</span>
        <input v-model="form.explorer" required>
      </label>
      <label>
        <span>{{ t('onboarding.focusArea') }}</span>
        <select v-model="form.area">
          <option v-for="area in areas" :key="area" :value="area">
            {{ t(`onboarding.areas.${area}`) }}
          </option>
        </select>
      </label>
      <label>
        <span>{{ t('onboarding.mission') }}</span>
        <input v-model="form.mission" required>
      </label>
      <p v-if="error" class="form-error">{{ error }}</p>
      <button class="button primary full" type="submit" :disabled="loading">
        {{ loading ? t('auth.loading') : t('onboarding.continue') }}
      </button>
    </form>
  </section>
</template>
