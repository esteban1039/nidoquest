<script setup lang="ts">
const props = defineProps<{
  explorerId: number
  canSpin: boolean
  lastSpinDate?: string | null
}>()

const emit = defineEmits<{
  (e: 'spinComplete', result: { prize: any; available_stars: number; streak: any }): void
}>()

const { request } = useApi()
const { showNotification } = usePwa()

const showModal = ref(false)
const isSpinning = ref(false)
const currentRotation = ref(0)
const winningPrize = ref<any>(null)
const spinError = ref('')
const hasSpunThisSession = ref(!props.canSpin)

const slices = [
  { id: 1, label: '+3 ⭐', type: 'stars', value: 3, color: '#10b981', icon: '⭐', name: '3 Estrellas' },
  { id: 2, label: '+5 ⭐', type: 'stars', value: 5, color: '#3b82f6', icon: '🌟', name: '5 Estrellas' },
  { id: 3, label: '+10 ⭐', type: 'stars', value: 10, color: '#f59e0b', icon: '✨', name: '10 Súper Estrellas' },
  { id: 4, label: '🛡️ Escudo', type: 'shield', value: 1, color: '#8b5cf6', icon: '🛡️', name: 'Escudo de Racha' },
  { id: 5, label: '🔥 +1 Racha', type: 'streak', value: 1, color: '#ef4444', icon: '🔥', name: 'Impulso de Racha (+1 día)' },
  { id: 6, label: '🎁 +20 ⭐', type: 'stars', value: 20, color: '#ec4899', icon: '🏆', name: '¡Cofre Legendario (20 ⭐)!' },
]

const sliceAngle = 360 / slices.length // 60 degrees

async function spinWheel() {
  if (isSpinning.value || hasSpunThisSession.value) return

  isSpinning.value = true
  spinError.value = ''
  winningPrize.value = null

  try {
    const res = await request<any>(`/explorers/${props.explorerId}/spin`, {
      method: 'POST',
      body: {},
    })

    const prize = res.prize
    const prizeIndex = slices.findIndex((s) => s.id === prize.id)
    const targetSliceIndex = prizeIndex >= 0 ? prizeIndex : 0

    // Calculate rotation: 5 full turns (1800 deg) + offset to align top pointer with slice center
    const extraTurns = 360 * 6
    const targetAngle = (360 - (targetSliceIndex * sliceAngle + sliceAngle / 2)) % 360
    const finalRotation = currentRotation.value + extraTurns + targetAngle

    currentRotation.value = finalRotation

    // Wait for animation to finish (4.5 seconds)
    setTimeout(() => {
      isSpinning.value = false
      winningPrize.value = prize
      hasSpunThisSession.value = true

      emit('spinComplete', {
        prize,
        available_stars: res.available_stars,
        streak: res.streak,
      })

      showNotification({
        title: '🎉 ¡Premio en la Ruleta Diaria!',
        body: `Has ganado ${prize.name}. ¡Sigue así!`,
        icon: '/icons/icon.svg',
      })
    }, 4600)
  } catch (err: any) {
    isSpinning.value = false
    spinError.value = err?.data?.message || 'No se pudo girar la ruleta en este momento.'
  }
}

watch(
  () => props.canSpin,
  (val) => {
    hasSpunThisSession.value = !val
  }
)
</script>

<template>
  <div>
    <!-- Launcher Button Widget -->
    <div class="lucky-wheel-widget">
      <div class="lucky-wheel-info">
        <div class="lucky-wheel-badge">
          <span>🎡</span>
          <span>Ruleta de la Suerte</span>
        </div>
        <p v-if="!hasSpunThisSession" class="lucky-wheel-desc">
          ¡Gira tu ruleta diaria y gana estrellas, escudos y multiplicadores de racha!
        </p>
        <p v-else class="lucky-wheel-desc completed">
          ✅ ¡Ya recibiste tu premio de hoy! Vuelve mañana para un nuevo giro.
        </p>
      </div>

      <button
        class="lucky-spin-cta-btn"
        :class="{ 'has-available-spin': !hasSpunThisSession }"
        type="button"
        @click="showModal = true"
      >
        <span class="spin-cta-icon">{{ hasSpunThisSession ? '🎁' : '✨' }}</span>
        <span>{{ hasSpunThisSession ? 'Ver Ruleta' : '¡Girar Ruleta Gratis!' }}</span>
      </button>
    </div>

    <!-- Interactive Wheel Modal -->
    <div v-if="showModal" class="wheel-modal-backdrop" @click.self="!isSpinning && (showModal = false)">
      <div class="wheel-modal-card">
        <div class="wheel-modal-header">
          <div>
            <h3>🎡 Ruleta Diaria de la Suerte</h3>
            <p>1 giro gratis cada día para ganar premios instantáneos</p>
          </div>
          <button
            v-if="!isSpinning"
            type="button"
            class="wheel-modal-close"
            @click="showModal = false"
          >
            ✕
          </button>
        </div>

        <p v-if="spinError" class="form-error" style="margin-bottom: 12px;">{{ spinError }}</p>

        <!-- Wheel Container -->
        <div class="wheel-stage">
          <!-- Pointer indicator -->
          <div class="wheel-pointer-pin">
            <div class="wheel-pointer-arrow">▼</div>
          </div>

          <!-- Rotating Wheel Disc -->
          <div
            class="wheel-disc"
            :style="{ transform: `rotate(${currentRotation}deg)` }"
          >
            <svg viewBox="0 0 300 300" class="wheel-svg">
              <g transform="translate(150, 150)">
                <!-- Slice 1 -->
                <path d="M 0 0 L 0 -140 A 140 140 0 0 1 121.24 -70 Z" fill="#10b981" />
                <!-- Slice 2 -->
                <path d="M 0 0 L 121.24 -70 A 140 140 0 0 1 121.24 70 Z" fill="#3b82f6" />
                <!-- Slice 3 -->
                <path d="M 0 0 L 121.24 70 A 140 140 0 0 1 0 140 Z" fill="#f59e0b" />
                <!-- Slice 4 -->
                <path d="M 0 0 L 0 140 A 140 140 0 0 1 -121.24 70 Z" fill="#8b5cf6" />
                <!-- Slice 5 -->
                <path d="M 0 0 L -121.24 70 A 140 140 0 0 1 -121.24 -70 Z" fill="#ef4444" />
                <!-- Slice 6 -->
                <path d="M 0 0 L -121.24 -70 A 140 140 0 0 1 0 -140 Z" fill="#ec4899" />

                <!-- Center border circle -->
                <circle r="140" fill="none" stroke="#ffffff" stroke-width="4" />
              </g>
            </svg>

            <!-- Text Labels on slices -->
            <div
              v-for="(slice, index) in slices"
              :key="`label-${slice.id}`"
              class="wheel-slice-label"
              :style="{ transform: `rotate(${index * 60 + 30}deg)` }"
            >
              <span class="slice-text">{{ slice.label }}</span>
            </div>

            <!-- Center Cap Hub -->
            <div class="wheel-center-hub">
              <span>🌟</span>
            </div>
          </div>
        </div>

        <!-- Wheel Controls / Status -->
        <div class="wheel-footer-actions">
          <button
            v-if="!hasSpunThisSession"
            class="wheel-action-spin-btn"
            type="button"
            :disabled="isSpinning"
            @click="spinWheel"
          >
            <span v-if="isSpinning">🎰 ¡Girando la suerte...!</span>
            <span v-else>🎲 ¡Girar Ahora!</span>
          </button>
          <div v-else class="wheel-already-spun-pill">
            <span>✅ Ya reclamaste tu giro de hoy. ¡Vuelve mañana!</span>
          </div>
        </div>

        <!-- Winning Prize Overlay Alert -->
        <div v-if="winningPrize" class="prize-celebration-card">
          <div class="prize-sparkle-icon">{{ winningPrize.icon || '🎉' }}</div>
          <h4>¡Felicitaciones!</h4>
          <p class="prize-title">{{ winningPrize.name }}</p>
          <p class="prize-desc">El premio ha sido acreditado en tu cuenta.</p>
          <button class="button primary small" type="button" @click="winningPrize = null; showModal = false">
            ¡Genial, gracias!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lucky-wheel-widget {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #fff;
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.lucky-wheel-info {
  flex: 1;
  min-width: 200px;
}

.lucky-wheel-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  margin-bottom: 6px;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.lucky-wheel-desc {
  font-size: 0.9rem;
  color: #cbd5e1;
  margin: 0;
}

.lucky-wheel-desc.completed {
  color: #94a3b8;
}

.lucky-spin-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-full);
  font-weight: 800;
  font-size: 0.92rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.lucky-spin-cta-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
}

.lucky-spin-cta-btn.has-available-spin {
  animation: pulseButton 2s infinite;
}

@keyframes pulseButton {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.6); }
  70% { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
}

/* Modal Styling */
.wheel-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.2s ease-out;
}

.wheel-modal-card {
  position: relative;
  background: #ffffff;
  border-radius: var(--radius-xl);
  max-width: 440px;
  width: 100%;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  overflow: hidden;
}

.wheel-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  text-align: left;
}

.wheel-modal-header h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 4px;
}

.wheel-modal-header p {
  font-size: 0.82rem;
  color: #64748b;
  margin: 0;
}

.wheel-modal-close {
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 0.9rem;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wheel-stage {
  position: relative;
  width: 280px;
  height: 280px;
  margin: 0 auto 24px auto;
}

.wheel-pointer-pin {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));
}

.wheel-pointer-arrow {
  color: #ef4444;
  font-size: 1.8rem;
  line-height: 1;
}

.wheel-disc {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transition: transform 4.5s cubic-bezier(0.15, 0.95, 0.35, 1);
}

.wheel-svg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.wheel-slice-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: 50% 50%;
  pointer-events: none;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.slice-text {
  margin-top: 24px;
  font-weight: 800;
  font-size: 0.8rem;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.wheel-center-hub {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  background: #ffffff;
  border-radius: 50%;
  border: 4px solid #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
}

.wheel-footer-actions {
  margin-top: 16px;
}

.wheel-action-spin-btn {
  width: 100%;
  padding: 14px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  border: none;
  font-weight: 800;
  font-size: 1.05rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
  transition: transform 0.15s ease;
}

.wheel-action-spin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wheel-action-spin-btn:not(:disabled):hover {
  transform: scale(1.02);
}

.wheel-already-spun-pill {
  padding: 12px;
  background: #f1f5f9;
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  font-weight: 600;
  color: #64748b;
}

.prize-celebration-card {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.prize-sparkle-icon {
  font-size: 3.5rem;
  margin-bottom: 8px;
  animation: bounce 1s infinite alternate;
}

.prize-celebration-card h4 {
  font-size: 1.3rem;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 4px;
}

.prize-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #d97706;
  margin-bottom: 6px;
}

.prize-desc {
  font-size: 0.86rem;
  color: #64748b;
  margin-bottom: 20px;
}

@keyframes popIn {
  0% { transform: scale(0.85); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px); }
}
</style>
