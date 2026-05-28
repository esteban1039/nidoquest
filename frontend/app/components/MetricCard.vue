<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  tone?: 'mint' | 'blue' | 'yellow' | 'coral'
}>()
</script>

<template>
  <article class="metric-card" :class="tone || 'mint'">
    <span>{{ label }}</span>
    <strong>{{ value }}</strong>
  </article>
</template>
