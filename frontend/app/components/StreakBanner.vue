<script setup lang="ts">
type StreakData = {
  count: number
  is_active_today: boolean
  at_risk: boolean
  shields: number
  multiplier: number
  multiplier_label?: string | null
  next_milestone: number
  days_to_milestone: number
  progress_percent: number
}

defineProps<{
  streak?: StreakData | null
}>()
</script>

<template>
  <div class="streak-gamification-card">
    <div class="streak-top-row">
      <!-- Flame & Count -->
      <div class="streak-flame-group">
        <div class="streak-flame-icon" :class="{ 'is-active': streak?.is_active_today, 'is-risk': streak?.at_risk }">
          🔥
        </div>
        <div>
          <div class="streak-days-title">
            <span>{{ streak?.count || 1 }}</span>
            <small>Día{{ (streak?.count || 1) === 1 ? '' : 's' }} de Racha</small>
          </div>
          <p v-if="streak?.is_active_today" class="streak-status-text success">
            ✨ ¡Racha protegida hoy!
          </p>
          <p v-else-if="streak?.at_risk" class="streak-status-text warning">
            ⚠️ Completa 1 misión hoy para mantener tu fuego
          </p>
          <p v-else class="streak-status-text">
            🌟 Comienza tu racha completando tu hábito de hoy
          </p>
        </div>
      </div>

      <!-- Badges: Shields & Multiplier -->
      <div class="streak-badges-cluster">
        <div v-if="streak?.multiplier_label" class="streak-pill-chip multiplier">
          <span>⚡</span>
          <span>{{ streak.multiplier_label }}</span>
        </div>

        <div class="streak-pill-chip shield" :title="`${streak?.shields || 0} escudos protegen tu racha si olvidas un día`">
          <span>🛡️</span>
          <span>{{ streak?.shields || 0 }} Escudo{{ (streak?.shields || 0) === 1 ? '' : 's' }}</span>
        </div>
      </div>
    </div>

    <!-- Milestone Progress Bar -->
    <div class="streak-milestone-bar">
      <div class="streak-milestone-labels">
        <span>🏆 Meta: <strong>{{ streak?.next_milestone || 3 }} días</strong></span>
        <span v-if="(streak?.days_to_milestone ?? 0) > 0">
          Faltan <strong>{{ streak?.days_to_milestone }} día{{ (streak?.days_to_milestone || 0) === 1 ? '' : 's' }}</strong>
        </span>
        <span v-else class="milestone-achieved">¡Meta alcanzada! 🎉</span>
      </div>
      <div class="streak-track">
        <div
          class="streak-progress-fill"
          :style="{ width: `${streak?.progress_percent || 33}%` }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.streak-gamification-card {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border: 1.5px solid #fed7aa;
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 14px rgba(249, 115, 22, 0.08);
}

.streak-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.streak-flame-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.streak-flame-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ffedd5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.2);
  border: 2px solid #fdba74;
}

.streak-flame-icon.is-active {
  background: linear-gradient(135deg, #ea580c, #c2410c);
  border-color: #f97316;
  animation: flamePulse 1.8s infinite;
}

@keyframes flamePulse {
  0% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.5); transform: scale(1); }
  50% { box-shadow: 0 0 0 10px rgba(234, 88, 12, 0); transform: scale(1.06); }
  100% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0); transform: scale(1); }
}

.streak-flame-icon.is-risk {
  animation: riskWiggle 1s infinite alternate ease-in-out;
}

@keyframes riskWiggle {
  0% { transform: rotate(-6deg); }
  100% { transform: rotate(6deg); }
}

.streak-days-title {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.streak-days-title span {
  font-size: 1.45rem;
  font-weight: 900;
  color: #9a3412;
  line-height: 1;
}

.streak-days-title small {
  font-size: 0.92rem;
  font-weight: 800;
  color: #c2410c;
}

.streak-status-text {
  font-size: 0.82rem;
  font-weight: 600;
  margin: 3px 0 0 0;
  color: #7c2d12;
}

.streak-status-text.success {
  color: #15803d;
}

.streak-status-text.warning {
  color: #b45309;
}

.streak-badges-cluster {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.streak-pill-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 800;
}

.streak-pill-chip.multiplier {
  background: #fef08a;
  color: #854d0e;
  border: 1px solid #facc15;
}

.streak-pill-chip.shield {
  background: #ede9fe;
  color: #6b21a8;
  border: 1px solid #ddd6fe;
}

/* Progress bar */
.streak-milestone-bar {
  background: rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  border: 1px solid #fed7aa;
}

.streak-milestone-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: #9a3412;
  margin-bottom: 6px;
}

.milestone-achieved {
  color: #15803d;
  font-weight: 800;
}

.streak-track {
  height: 8px;
  background: #ffedd5;
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 1px solid #fed7aa;
}

.streak-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f97316, #ea580c);
  border-radius: var(--radius-full);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
