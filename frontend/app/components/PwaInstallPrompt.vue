<script setup lang="ts">
const { t } = useI18n()
const { canInstall, install, enableNotifications, notificationPermission } = usePwa()
const dismissed = useCookie<boolean>('nidoquest_pwa_prompt_dismissed', { sameSite: 'lax' })

const show = computed(() => !dismissed.value && (canInstall.value || notificationPermission.value === 'default'))
</script>

<template>
  <aside v-if="show" class="pwa-prompt" aria-live="polite">
    <div>
      <strong>{{ t('pwa.title') }}</strong>
      <p>{{ t('pwa.text') }}</p>
    </div>
    <div class="pwa-actions">
      <button v-if="canInstall" class="button primary small" type="button" @click="install">{{ t('pwa.install') }}</button>
      <button v-if="notificationPermission === 'default'" class="button ghost small" type="button" @click="enableNotifications">{{ t('pwa.notifications') }}</button>
      <button class="icon-button" type="button" :aria-label="t('pwa.dismiss')" @click="dismissed = true">×</button>
    </div>
  </aside>
</template>
