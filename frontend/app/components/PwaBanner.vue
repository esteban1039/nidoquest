<script setup lang="ts">
const { canInstall, isInstalled, pushPermission, installApp, requestPushNotifications } = usePwa()
const isDismissed = ref(false)
const requestingAlerts = ref(false)
const installing = ref(false)

const showBanner = computed(() => {
  if (isDismissed.value) return false
  return canInstall.value || (pushPermission.value === 'default' && !isInstalled.value) || pushPermission.value === 'default'
})

async function onInstall() {
  installing.value = true
  try {
    await installApp()
  } finally {
    installing.value = false
  }
}

async function onEnablePush() {
  requestingAlerts.value = true
  try {
    await requestPushNotifications()
  } finally {
    requestingAlerts.value = false
  }
}
</script>

<template>
  <div v-if="showBanner" class="pwa-action-banner">
    <div class="pwa-banner-left">
      <div class="pwa-app-icon">
        <span>📲</span>
      </div>
      <div class="pwa-banner-text">
        <strong>{{ canInstall ? '¡Instala NidoQuest en tu celular!' : '🔔 Activa las notificaciones de tu Nido' }}</strong>
        <p>
          {{ canInstall
            ? 'Accede en 1 toque y recibe avisos de misiones, premios y rachas.'
            : 'Recibe alertas instantáneas cuando haya misiones listas o recompensas.'
          }}
        </p>
      </div>
    </div>

    <div class="pwa-banner-buttons">
      <button
        v-if="canInstall"
        class="button primary small pwa-btn-highlight"
        type="button"
        :disabled="installing"
        @click="onInstall"
      >
        <span>📲 Instalar App</span>
      </button>

      <button
        v-if="pushPermission !== 'granted'"
        class="button secondary small"
        type="button"
        :disabled="requestingAlerts"
        @click="onEnablePush"
      >
        <span>🔔 {{ requestingAlerts ? 'Activando...' : 'Activar Alertas' }}</span>
      </button>

      <button
        type="button"
        class="pwa-banner-dismiss"
        title="Ocultar aviso"
        @click="isDismissed = true"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<style scoped>
.pwa-action-banner {
  background: linear-gradient(135deg, #0f766e 0%, #115e59 100%);
  color: #ffffff;
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  box-shadow: 0 4px 16px rgba(15, 118, 110, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.15);
  animation: slideDown 0.3s ease-out;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.pwa-banner-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.pwa-app-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.pwa-banner-text {
  min-width: 0;
  flex: 1;
}

.pwa-banner-text strong {
  display: block;
  font-size: 0.9rem;
  font-weight: 800;
  margin-bottom: 2px;
  line-height: 1.2;
}

.pwa-banner-text p {
  font-size: 0.78rem;
  color: #ccfbf1;
  margin: 0;
  line-height: 1.3;
}

.pwa-banner-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.pwa-btn-highlight {
  background: #ffffff !important;
  color: #0f766e !important;
  font-weight: 800;
  border: none !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}

.pwa-banner-buttons .button.secondary {
  background: rgba(255, 255, 255, 0.15) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  white-space: nowrap;
}

.pwa-banner-dismiss {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  transition: all 0.15s ease;
  line-height: 1;
}

.pwa-banner-dismiss:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.15);
}

@keyframes slideDown {
  0% { transform: translateY(-10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@media (max-width: 640px) {
  .pwa-action-banner {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 12px 14px;
  }

  .pwa-banner-buttons {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .pwa-banner-buttons .button {
    flex: 1;
  }
}
</style>
