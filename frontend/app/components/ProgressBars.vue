<script setup lang="ts">
type DayActivity = {
  day: string
  date: string
  is_today?: boolean
  missions_count: number
  stars_count?: number
}

const props = defineProps<{
  values?: number[]
  daysActivity?: DayActivity[]
  consistencyDays?: number
  weeklyTotal?: number
}>()

const defaultDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const computedDays = computed<DayActivity[]>(() => {
  if (props.daysActivity && props.daysActivity.length > 0) {
    return props.daysActivity
  }

  // Fallback using props.values if daysActivity is not provided
  const rawValues = props.values && props.values.length > 0 ? props.values : [0, 0, 0, 0, 0, 0, 0]
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

  return defaultDays.map((day, idx) => ({
    day,
    date: '',
    is_today: idx === todayIndex,
    missions_count: rawValues[idx] || 0,
    stars_count: (rawValues[idx] || 0) * 5,
  }))
})

const maxCount = computed(() => {
  const counts = computedDays.value.map((d) => d.missions_count)
  const max = Math.max(...counts, 1)
  return max
})

function getBarHeight(count: number) {
  if (count === 0) return '12%'
  const percentage = Math.round((count / maxCount.value) * 88) + 12
  return `${Math.min(100, Math.max(16, percentage))}%`
}
</script>

<template>
  <div class="weekly-chart-wrapper">
    <div class="weekly-chart-columns">
      <div
        v-for="(day, idx) in computedDays"
        :key="idx"
        class="weekly-day-col"
        :class="{ 'is-today': day.is_today, 'has-activity': day.missions_count > 0 }"
      >
        <div class="day-count-pill" :class="{ 'is-zero': day.missions_count === 0 }">
          {{ day.missions_count }}
        </div>

        <div class="day-bar-track">
          <div
            class="day-bar-fill"
            :style="{ height: getBarHeight(day.missions_count) }"
          />
        </div>

        <span class="day-label">{{ day.day }}</span>
        <span v-if="day.is_today" class="today-marker">Hoy</span>
      </div>
    </div>

    <div class="weekly-chart-footer">
      <div class="consistency-stat">
        <span class="stat-icon">🔥</span>
        <span>Constancia: <strong>{{ consistencyDays ?? computedDays.filter(d => d.missions_count > 0).length }}/7 días</strong></span>
      </div>
      <div v-if="weeklyTotal !== undefined || maxCount > 1" class="weekly-total-stat">
        <span>Total: <strong>{{ weeklyTotal ?? computedDays.reduce((acc, d) => acc + d.missions_count, 0) }} misiones</strong></span>
      </div>
    </div>
  </div>
</template>
