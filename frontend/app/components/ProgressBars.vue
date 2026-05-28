<script setup lang="ts">
defineProps<{
  values: number[]
}>()
</script>

<template>
  <div class="progress-bars" aria-hidden="true">
    <span v-for="(value, index) in values" :key="index" :style="{ height: `${Math.max(18, value)}%` }" />
  </div>
</template>
