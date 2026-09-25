<script setup lang="ts">
defineProps<{
  title: string
  hint?: string
  mode?: 'login' | 'register' | 'forgot' | 'reset'
}>()
</script>

<template>
  <section class="auth-page-enhanced">
    <!-- Left Atmospheric Showcase Column -->
    <div class="auth-showcase-column">
      <div class="showcase-glow-backdrop" aria-hidden="true" />

      <div class="showcase-content">
        <div class="showcase-badge">
          <span>🌟</span>
          <span>NidoQuest Familiar</span>
        </div>

        <h2 class="showcase-headline">
          Menos batallas por las rutinas, <span class="highlight">más sonrisas en familia.</span>
        </h2>

        <p class="showcase-description">
          Acompaña a tus hijos a formar hábitos positivos con misiones claras, estrellas y recompensas que querrán ganar todos los días.
        </p>

        <!-- Floating Interactive Game Widgets Preview -->
        <div class="showcase-cards-stack">
          <!-- Widget 1: Streak -->
          <div class="showcase-mini-card streak-card">
            <div class="mini-card-icon">🔥</div>
            <div class="mini-card-info">
              <strong>7 Días de Racha Activa</strong>
              <span>✨ ¡Fuego familiar protegido hoy! • +10% bonus</span>
            </div>
            <span class="mini-badge orange">⚡ Nivel 2</span>
          </div>

          <!-- Widget 2: Completed Mission -->
          <div class="showcase-mini-card mission-card">
            <div class="mini-card-icon green">✅</div>
            <div class="mini-card-info">
              <strong>Tender la cama al despertar</strong>
              <span>Mateo ganó <strong>+10 ⭐</strong> para su meta</span>
            </div>
            <span class="mini-badge mint">+10 ⭐</span>
          </div>

          <!-- Widget 3: Daily Lucky Wheel -->
          <div class="showcase-mini-card wheel-card">
            <div class="mini-card-icon purple">🎁</div>
            <div class="mini-card-info">
              <strong>Ruleta Diaria Disponible</strong>
              <span>Gira todos los días por estrellas y escudos</span>
            </div>
            <span class="mini-badge purple">¡Girar!</span>
          </div>
        </div>

        <!-- Social Proof Pill -->
        <div class="showcase-social-proof">
          <div class="avatars-cluster">
            <span>👩</span>
            <span>👨</span>
            <span>👧</span>
            <span>👦</span>
          </div>
          <div>
            <div class="stars-row">⭐⭐⭐⭐⭐</div>
            <small>Más de <strong>1,400 familias</strong> disfrutando su Nido</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Form Card Column -->
    <div class="auth-form-column">
      <div class="auth-card-enhanced">
        <!-- Top Tab Switcher for Login / Register -->
        <div v-if="mode === 'login' || mode === 'register'" class="auth-tab-switcher">
          <NuxtLink
            to="/auth/login"
            class="auth-tab-btn"
            :class="{ active: mode === 'login' }"
          >
            <span>🔑</span>
            <span>Iniciar Sesión</span>
          </NuxtLink>
          <NuxtLink
            to="/auth/register"
            class="auth-tab-btn"
            :class="{ active: mode === 'register' }"
          >
            <span>✨</span>
            <span>Crear Cuenta (7d gratis)</span>
          </NuxtLink>
        </div>

        <!-- Card Header -->
        <div class="auth-card-header">
          <p v-if="hint" class="auth-card-eyebrow">{{ hint }}</p>
          <h1 class="auth-card-title">{{ title }}</h1>
        </div>

        <!-- Main Form Slot -->
        <slot />

        <!-- Security & Privacy footer -->
        <div class="auth-card-security">
          <span>🔒 Conexión segura y privada</span>
          <span>•</span>
          <span>Sin publicidad</span>
          <span>•</span>
          <span>100% para familias</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auth-page-enhanced {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(360px, 490px);
  gap: clamp(24px, 5vw, 64px);
  align-items: center;
  min-height: calc(100vh - 72px);
  padding: clamp(24px, 4vw, 56px) clamp(16px, 4vw, 48px);
  max-width: 1280px;
  margin: 0 auto;
}

/* Left Showcase */
.auth-showcase-column {
  position: relative;
  padding: clamp(20px, 3vw, 40px);
}

.showcase-glow-backdrop {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle at 30% 30%, rgba(121, 199, 197, 0.35), transparent 70%),
              radial-gradient(circle at 70% 80%, rgba(244, 201, 93, 0.25), transparent 60%);
  filter: blur(40px);
  z-index: 0;
  pointer-events: none;
}

.showcase-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.showcase-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  padding: 6px 14px;
  background: rgba(121, 199, 197, 0.18);
  border: 1px solid rgba(121, 199, 197, 0.4);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--mint-dark);
}

.showcase-headline {
  margin: 0;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  line-height: 1.15;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -0.02em;
}

.showcase-headline .highlight {
  background: linear-gradient(135deg, #0d9488 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.showcase-description {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--muted);
  max-width: 520px;
}

/* Floating Cards Stack */
.showcase-cards-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 8px 0;
}

.showcase-mini-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.88);
  border: 1.5px solid rgba(215, 235, 232, 0.9);
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(31, 75, 72, 0.06);
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.showcase-mini-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(31, 75, 72, 0.1);
}

.mini-card-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #ffedd5;
  display: grid;
  place-items: center;
  font-size: 1.35rem;
  flex-shrink: 0;
}

.mini-card-icon.green {
  background: #dcfce7;
}

.mini-card-icon.purple {
  background: #f3e8ff;
}

.mini-card-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.mini-card-info strong {
  font-size: 0.92rem;
  color: var(--ink);
  font-weight: 800;
}

.mini-card-info span {
  font-size: 0.8rem;
  color: var(--muted);
}

.mini-badge {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 800;
  white-space: nowrap;
}

.mini-badge.orange {
  background: #ffedd5;
  color: #c2410c;
}

.mini-badge.mint {
  background: #ccfbf1;
  color: #0f766e;
}

.mini-badge.purple {
  background: #f3e8ff;
  color: #7e22ce;
}

/* Social proof */
.showcase-social-proof {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-top: 8px;
}

.avatars-cluster {
  display: flex;
  margin-right: -8px;
}

.avatars-cluster span {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #fff;
  display: grid;
  place-items: center;
  font-size: 1.1rem;
  margin-right: -8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.stars-row {
  font-size: 0.85rem;
  line-height: 1;
  margin-bottom: 2px;
}

.showcase-social-proof small {
  font-size: 0.82rem;
  color: var(--muted);
}

/* Right Form Card */
.auth-form-column {
  display: flex;
  justify-content: center;
  width: 100%;
}

.auth-card-enhanced {
  width: 100%;
  background: #ffffff;
  border: 1.5px solid rgba(121, 199, 197, 0.4);
  border-radius: 26px;
  padding: clamp(24px, 4vw, 36px);
  box-shadow: 0 20px 50px rgba(31, 75, 72, 0.12),
              0 4px 12px rgba(121, 199, 197, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Top Tab Switcher */
.auth-tab-switcher {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  background: #f1f5f9;
  padding: 5px;
  border-radius: 14px;
  margin-bottom: 4px;
}

.auth-tab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 0.84rem;
  font-weight: 700;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
}

.auth-tab-btn:hover {
  color: var(--ink);
}

.auth-tab-btn.active {
  background: #ffffff;
  color: var(--mint-dark);
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.auth-card-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.auth-card-eyebrow {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--mint-dark);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.auth-card-title {
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 900;
  color: var(--ink);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.auth-card-security {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.74rem;
  color: #94a3b8;
  font-weight: 600;
  padding-top: 6px;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
  text-align: center;
}

/* Responsive */
@media (max-width: 880px) {
  .auth-page-enhanced {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 16px 14px 40px;
    gap: 24px;
  }

  .auth-showcase-column {
    display: none; /* Hide heavy illustration on mobile to keep 100% focus on crisp form */
  }

  .auth-card-enhanced {
    padding: 24px 18px;
    border-radius: 20px;
  }
}
</style>
