<script setup lang="ts">
const { t } = useI18n()
const { pending, syncing, notice, stale, online, watchOnline, refreshPending, flush, dismissNotice } = useOutbox()

async function refreshAll() {
  await refreshNuxtData()
}

onMounted(() => {
  watchOnline(() => flush(refreshAll))
  refreshPending()
  flush(refreshAll)
})
</script>

<template>
  <div v-if="!online || pending > 0 || stale || notice" class="offline-banner" role="status">
    <p v-if="!online">
      <strong>{{ t('ui.offlineTitle') }}</strong>
      {{ t('ui.offlineText') }}
    </p>
    <p v-else-if="pending > 0">
      <strong>{{ syncing ? t('ui.syncing') : t('ui.pendingActions', { count: pending }) }}</strong>
    </p>
    <p v-if="stale && online && pending === 0">
      {{ t('ui.staleData') }}
    </p>
    <p v-if="notice === 'conflicted'">
      {{ t('ui.conflicted') }}
      <button class="button small" type="button" @click="dismissNotice">{{ t('notifications.close') }}</button>
    </p>
  </div>
</template>
