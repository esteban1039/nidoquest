<script setup lang="ts">
defineProps<{
  title: string
  hint: string
}>()
</script>

<template>
  <section class="auth-page">
    <div class="auth-visual" aria-hidden="true">
      <div class="nest-scene">
        <span class="scene-token one" />
        <span class="scene-token two" />
        <span class="scene-token three" />
        <div class="mission-board">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
    <div class="auth-card">
      <p class="eyebrow">{{ hint }}</p>
      <h1>{{ title }}</h1>
      <slot />
    </div>
  </section>
</template>
