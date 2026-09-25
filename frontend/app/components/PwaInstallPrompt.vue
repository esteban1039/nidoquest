<script setup lang="ts">
const { t } = useI18n()
const { canInstall, installApp, requestPushNotifications, pushPermission } = usePwa()
const dismissed = useCookie<boolean>('nidoquest_pwa_prompt_dismissed', { sameSite: 'lax' })

const show = computed(() => !dismissed.value && (canInstall.value || pushPermission.value === 'default'))
</script>

<template>
  <aside v-if="show" class="pwa-prompt" aria-live="polite">
    <div>
      <strong>{{ t('pwa.title') }}</strong>
      <p>{{ t('pwa.text') }}</p>
    </div>
    <div class="pwa-actions">
      <button v-if="canInstall" class="button primary small" type="button" @click="installApp">{{ t('pwa.install') }}</button>
      <button v-if="pushPermission === 'default'" class="button ghost small" type="button" @click="requestPushNotifications">{{ t('pwa.notifications') }}</button>
      <button class="icon-button" type="button" :aria-label="t('pwa.dismiss')" @click="dismissed = true">×</button>
    </div>
  </aside>
</template>
