<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  tone?: 'mint' | 'blue' | 'yellow' | 'coral'
  icon?: string
  hint?: string
  badge?: string
  clickable?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <article
    class="metric-card"
    :class="[tone || 'mint', { 'is-clickable': clickable }]"
    @click="$emit('click')"
  >
    <div class="metric-card-top">
      <div class="metric-card-header-left">
        <span v-if="icon" class="metric-card-icon">{{ icon }}</span>
        <span class="metric-card-label">{{ label }}</span>
      </div>
      <span v-if="badge" class="metric-card-badge">{{ badge }}</span>
    </div>

    <strong class="metric-card-value">{{ value }}</strong>

    <div v-if="hint" class="metric-card-hint">
      {{ hint }}
    </div>
  </article>
</template>
