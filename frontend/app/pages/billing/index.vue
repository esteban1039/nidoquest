<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: false })

await navigateTo('/profile?tab=billing', { replace: true })
</script>

<template>
  <div />
</template>
