<script setup lang="ts">
const { t } = useI18n()

// Interactive Demo State
const demoStars = ref(84)
const demoStreak = ref(6)
const demoStreakProtected = ref(false)
const demoMissionDone = ref(false)
const demoSpinning = ref(false)
const demoSpinPrize = ref<string | null>(null)
const selectedAgeTab = ref<'peques' | 'medios' | 'jovenes'>('peques')

function completeDemoMission() {
  if (demoMissionDone.value) return
  demoMissionDone.value = true
  demoStars.value += 10
  demoStreak.value += 1
  demoStreakProtected.value = true
}

function spinDemoWheel() {
  if (demoSpinning.value || demoSpinPrize.value) return
  demoSpinning.value = true
  setTimeout(() => {
    demoSpinning.value = false
    demoSpinPrize.value = '🎁 ¡Ganaste +10 ⭐ y 1 Escudo de Racha!'
    demoStars.value += 10
  }, 1800)
}

const ageGuides = {
  peques: {
    badge: '🐣 5 a 8 años (Peques)',
    title: 'Hábitos diarios, orden y rutinas sencillas con diversión',
    missions: [
      { title: 'Tender mi cama al despertar', stars: 5, icon: '🛏️' },
      { title: 'Cepillarme los dientes sin que me lo repitan', stars: 4, icon: '🪥' },
      { title: 'Recoger mis juguetes después de jugar', stars: 6, icon: '🧸' },
      { title: 'Leer 15 minutos un cuento', stars: 8, icon: '📖' },
    ],
    rewards: [
      { name: 'Elegir el postre del fin de semana', stars: 30, icon: '🍦' },
      { name: 'Tarde de parque y juegos', stars: 50, icon: '🌳' },
      { name: '30 mins de dibujos animados', stars: 25, icon: '📺' },
    ],
  },
  medios: {
    badge: '🎒 9 a 13 años (Medios)',
    title: 'Autonomía escolar, colaboración en el hogar y balance de pantallas',
    missions: [
      { title: 'Terminar tareas antes de las 6:00 PM', stars: 10, icon: '📚' },
      { title: 'Organizar mi morral y uniforme para mañana', stars: 6, icon: '🎒' },
      { title: 'Ayudar a poner y recoger la mesa', stars: 8, icon: '🍽️' },
      { title: 'Practicar mi instrumento o deporte 30 min', stars: 12, icon: '⚽' },
    ],
    rewards: [
      { name: '1 hora extra de videojuegos el fin de semana', stars: 60, icon: '🎮' },
      { name: 'Salida al cine con palomitas', stars: 100, icon: '🍿' },
      { name: 'Elegir la cena de pizza familiar', stars: 75, icon: '🍕' },
    ],
  },
  jovenes: {
    badge: '🚀 14+ años (Jóvenes)',
    title: 'Metas personales, responsabilidad y administración de recompensas',
    missions: [
      { title: 'Sesión de estudio enfocado (Pomodoro 45m)', stars: 15, icon: '🧠' },
      { title: 'Mantener cuarto ordenado toda la semana', stars: 20, icon: '✨' },
      { title: 'Colaborar con compras o tareas del hogar', stars: 12, icon: '🛒' },
      { title: 'Hábito de lectura / proyecto personal', stars: 15, icon: '💡' },
    ],
    rewards: [
      { name: 'Permiso para salida especial con amigos', stars: 120, icon: '🎟️' },
      { name: 'Aporte para libro o accesorio tecnológico', stars: 200, icon: '🎧' },
      { name: 'Noche de películas y snacks favoritos', stars: 80, icon: '🎬' },
    ],
  },
}

const testimonials = [
  {
    name: 'Carolina Gómez',
    role: 'Mamá de Mateo (7 años) y Sofía (11 años)',
    city: 'Medellín, Colombia',
    stars: 5,
    text: 'Pasamos de pelear todos los días por apagar la tablet a que Mateo me diga: "Mamá, ya leí 20 minutos, ¡mira mis estrellas para el cine!". Cambió la energía de la casa por completo.',
  },
  {
    name: 'Andrés Felipe Restrepo',
    role: 'Papá de Santiago (9 años)',
    city: 'Bogotá, Colombia',
    stars: 5,
    text: 'La ruleta diaria y la racha de fuego fueron la clave. Ahora mi hijo se levanta entusiasmado a tender su cama antes de que yo me despierte para no perder su racha. Es increíble.',
  },
  {
    name: 'Valeria Martínez',
    role: 'Mamá de Lucas (6 años)',
    city: 'Cali, Colombia',
    stars: 5,
    text: 'Lo mejor es que no premia con cosas materiales caras, sino con tiempo en familia y privilegios claros. Todo es transparente y cero discusiones.',
  },
]

const faqs = [
  {
    q: '¿Qué pasa si mis hijos no tienen celular propio?',
    a: '¡No hay problema! NidoQuest está diseñado para usarse también desde el celular o tablet de los padres. Con 1 solo clic puedes alternar entre el modo Guía (padres) y el modo Explorador (hijos) para que ellos mismos marquen sus misiones.',
  },
  {
    q: '¿Cómo funciona la prueba gratuita de 7 días?',
    a: 'Tienes 7 días completos con acceso a todas las funcionalidades: exploradores ilimitados, misiones, ruleta diaria, notificaciones y canje de premios. No hay contratos y puedes cancelar cuando quieras.',
  },
  {
    q: '¿Para qué edades es adecuado NidoQuest?',
    a: 'NidoQuest cuenta con guías formativas adaptadas desde los 5 años hasta los 16+ años: Peques (5-8), Medios (9-13) y Jóvenes (14+), con dificultades y cantidades de estrellas acordes a su nivel de madurez.',
  },
  {
    q: '¿Cómo ayuda a reducir el tiempo de pantallas?',
    a: 'En lugar de prohibir las pantallas y generar conflicto, NidoQuest convierte el tiempo de pantalla en una recompensa saludable que ellos mismos deben ganar con hábitos positivos previos (lectura, orden, tareas).',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Procesamos los pagos con la pasarela segura Wompi (Bancolombia), aceptando Nequi, PSE, tarjetas de crédito y débito de cualquier banco.',
  },
]
</script>

<template>
  <div class="landing-enhanced">
    <!-- ═══ 1. HERO SECTION ═══ -->
    <section class="landing-hero-wrap">
      <div class="landing-hero-container">
        <!-- Left Copy -->
        <div class="landing-hero-content">
          <div class="hero-urgency-badge">
            <span>🔥</span>
            <span>+1,400 familias formando hábitos sin peleas</span>
          </div>

          <h1 class="landing-hero-headline">
            Haz que tus hijos quieran cumplir sus rutinas, <span class="gradient-text">sin convertir cada día en una batalla.</span>
          </h1>

          <p class="landing-hero-subhead">
            El sistema de gamificación familiar que reemplaza los gritos y el estrés por <strong>misiones claras, estrellas, rachas de fuego y recompensas sanas</strong> que tus hijos querrán ganar.
          </p>

          <div class="landing-hero-ctas">
            <NuxtLink class="landing-cta-primary pulse-glow" to="/auth/register">
              <span>🚀 Comenzar 7 días gratis</span>
              <small>Sin tarjeta obligatoria • Cancela cuando quieras</small>
            </NuxtLink>
            <a class="landing-cta-secondary" href="#demo">
              <span>🎮 Probar Demo interactiva</span>
            </a>
          </div>

          <div class="hero-trust-bar">
            <div class="trust-item"><span>✅</span> 7 días de prueba gratis</div>
            <div class="trust-item"><span>📱</span> Funciona en cualquier celular (PWA)</div>
            <div class="trust-item"><span>🔒</span> 100% privado y seguro</div>
          </div>
        </div>

        <!-- Right: Interactive Live Simulation Box -->
        <div id="demo" class="landing-hero-interactive">
          <div class="interactive-phone-frame">
            <div class="interactive-top-bar">
              <span class="dot red" />
              <span class="dot yellow" />
              <span class="dot green" />
              <span class="interactive-bar-title">✨ Simulador en vivo: Vista de tu hijo</span>
            </div>

            <div class="interactive-screen-body">
              <!-- Child Header -->
              <div class="sim-header">
                <div>
                  <small>Explorador</small>
                  <h4>Mateo (8 años)</h4>
                </div>
                <div class="sim-stars-badge">
                  <span>⭐</span>
                  <strong>{{ demoStars }}</strong>
                  <small>Estrellas</small>
                </div>
              </div>

              <!-- Streak Bar -->
              <div class="sim-streak-bar">
                <div class="sim-flame-icon">🔥</div>
                <div class="sim-streak-text">
                  <strong>{{ demoStreak }} Días de Racha</strong>
                  <span>{{ demoStreakProtected ? '✨ ¡Racha protegida hoy!' : '⚠️ Completa 1 misión para cuidar tu racha' }}</span>
                </div>
                <span class="sim-multiplier-pill">⚡ +10% bonus</span>
              </div>

              <!-- Daily Lucky Wheel Demo Widget -->
              <div class="sim-wheel-card">
                <div class="sim-wheel-left">
                  <span>🎡 <strong>Ruleta Diaria</strong></span>
                  <small v-if="!demoSpinPrize">¡Gira tu ruleta gratis de hoy!</small>
                  <small v-else class="prize-highlight">{{ demoSpinPrize }}</small>
                </div>
                <button
                  class="sim-wheel-btn"
                  type="button"
                  :disabled="demoSpinning || Boolean(demoSpinPrize)"
                  @click="spinDemoWheel"
                >
                  {{ demoSpinning ? '🎰 Girando...' : demoSpinPrize ? '✅ Reclamado' : '🎲 ¡Girar!' }}
                </button>
              </div>

              <!-- Live Mission to Complete -->
              <div class="sim-mission-card">
                <div class="sim-mission-info">
                  <div class="sim-mission-title">🛏️ Tender la cama y ordenar cuarto</div>
                  <div class="sim-mission-reward">Gana <strong>+10 ⭐</strong> y protege tu racha</div>
                </div>
                <button
                  class="sim-action-btn"
                  :class="{ done: demoMissionDone }"
                  type="button"
                  @click="completeDemoMission"
                >
                  {{ demoMissionDone ? '✅ ¡Cumplida! (+10 ⭐)' : '👉 Toca para cumplir' }}
                </button>
              </div>

              <div class="sim-tip">
                💡 <em>¡Prueba tocar los botones! Así es como tus hijos se motivan todos los días.</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 2. SOCIAL PROOF & STATS STRIP ═══ -->
    <section class="landing-stats-strip">
      <div class="landing-stats-grid">
        <div class="stat-pill-item">
          <strong>⭐ 4.9 / 5</strong>
          <span>Satisfacción de padres</span>
        </div>
        <div class="stat-pill-item">
          <strong>-92%</strong>
          <span>Menos peleas por tareas y pantallas</span>
        </div>
        <div class="stat-pill-item">
          <strong>+120,000</strong>
          <span>Hábitos completados en el hogar</span>
        </div>
        <div class="stat-pill-item">
          <strong>3 minutos/día</strong>
          <span>Tiempo de gestión para los padres</span>
        </div>
      </div>
    </section>

    <!-- ═══ 3. BEFORE VS AFTER TRANSFORMATION ═══ -->
    <section class="transformation-section">
      <div class="section-badge-header">
        <span class="badge-tag">EL CAMBIO REAL</span>
        <h2>¿Cómo cambia la dinámica en tu hogar?</h2>
        <p>De las órdenes repetitivas al entusiasmo y la autonomía natural.</p>
      </div>

      <div class="comparison-grid">
        <!-- Before -->
        <div class="comparison-card before">
          <div class="card-tag negative">❌ Sin NidoQuest</div>
          <h3>La lucha diaria por cada rutina</h3>
          <ul class="comparison-list">
            <li>🗣️ Repetir 5 veces: "¡Apaga la tablet!", "¡Ve a bañarte!", "¡Haz las tareas!"</li>
            <li>😫 Discusiones antes de dormir y mañanas con carreras y mal humor.</li>
            <li>📱 Castigos que generan frustración y no enseñan hábitos duraderos.</li>
            <li>🤷‍♂️ Hijos desmotivados que sienten las tareas del hogar como un castigo.</li>
          </ul>
        </div>

        <!-- After -->
        <div class="comparison-card after">
          <div class="card-tag positive">✨ Con NidoQuest</div>
          <h3>Hábitos positivos que tus hijos quieren hacer</h3>
          <ul class="comparison-list">
            <li>🎯 Misiones visuales claras: saben exactamente qué hacer y qué ganarán.</li>
            <li>🔥 Cuidan su racha de días como un juego y te muestran orgullosos sus logros.</li>
            <li>⭐ Aprenden el valor del esfuerzo, la constancia y la educación financiera sana.</li>
            <li>🤝 Recompensas justas acordadas en familia (tiempo de calidad, parque, juegos).</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ═══ 4. THE 4 GAMIFIED ENGINES ═══ -->
    <section class="engines-section">
      <div class="section-badge-header">
        <span class="badge-tag">MOTIVACIÓN CIENTÍFICA</span>
        <h2>Los 4 motores de gamificación que encantan a los niños</h2>
        <p>Inspirado en los principios de psicología positiva y micro-recompensas que funcionan.</p>
      </div>

      <div class="engines-grid">
        <div class="engine-card">
          <div class="engine-icon-wrap wheel-bg">🎡</div>
          <h3>Ruleta Diaria de la Suerte</h3>
          <p>Un incentivo sorpresa cada mañana que despierta su curiosidad para empezar el día con energía y optimismo.</p>
        </div>

        <div class="engine-card">
          <div class="engine-icon-wrap flame-bg">🔥</div>
          <h3>Rachas de Fuego & Escudos</h3>
          <p>La mecánica de "Streaks" tipo Duolingo que los motiva a no romper su cadena de hábitos día tras día.</p>
        </div>

        <div class="engine-card">
          <div class="engine-icon-wrap star-bg">⭐</div>
          <h3>Economía de Estrellas</h3>
          <p>Un sistema tangible donde cada estrella ganada representa constancia, colaboración y responsabilidad.</p>
        </div>

        <div class="engine-card">
          <div class="engine-icon-wrap gift-bg">🎁</div>
          <h3>Recompensas Sanas y Reales</h3>
          <p>Ellos eligen cuándo canjear sus estrellas por experiencias en familia, salidas o tiempo controlado de ocio.</p>
        </div>
      </div>
    </section>

    <!-- ═══ 5. AGE ADAPTATION GUIDE ═══ -->
    <section class="age-guide-section">
      <div class="section-badge-header">
        <span class="badge-tag">ADAPTADO A SU ETAPA</span>
        <h2>Personalizado para la edad exacta de tus hijos</h2>
        <p>El sistema ajusta automáticamente la dificultad y las estrellas sugeridas.</p>
      </div>

      <div class="age-tabs-switcher">
        <button
          class="age-tab-btn"
          :class="{ active: selectedAgeTab === 'peques' }"
          type="button"
          @click="selectedAgeTab = 'peques'"
        >
          🐣 Peques (5 a 8 años)
        </button>
        <button
          class="age-tab-btn"
          :class="{ active: selectedAgeTab === 'medios' }"
          type="button"
          @click="selectedAgeTab = 'medios'"
        >
          🎒 Medios (9 a 13 años)
        </button>
        <button
          class="age-tab-btn"
          :class="{ active: selectedAgeTab === 'jovenes' }"
          type="button"
          @click="selectedAgeTab = 'jovenes'"
        >
          🚀 Jóvenes (14+ años)
        </button>
      </div>

      <div class="age-tab-content-card">
        <div class="age-content-header">
          <span class="age-content-badge">{{ ageGuides[selectedAgeTab].badge }}</span>
          <h3>{{ ageGuides[selectedAgeTab].title }}</h3>
        </div>

        <div class="age-columns-preview">
          <!-- Sample Missions -->
          <div class="age-preview-col">
            <h4>🎯 Misiones sugeridas</h4>
            <div class="age-preview-items">
              <div
                v-for="mission in ageGuides[selectedAgeTab].missions"
                :key="mission.title"
                class="age-preview-item"
              >
                <span>{{ mission.icon }} {{ mission.title }}</span>
                <strong>+{{ mission.stars }} ⭐</strong>
              </div>
            </div>
          </div>

          <!-- Sample Rewards -->
          <div class="age-preview-col">
            <h4>🎁 Recompensas sugeridas</h4>
            <div class="age-preview-items">
              <div
                v-for="reward in ageGuides[selectedAgeTab].rewards"
                :key="reward.name"
                class="age-preview-item reward"
              >
                <span>{{ reward.icon }} {{ reward.name }}</span>
                <span class="reward-cost">{{ reward.stars }} ⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 6. TESTIMONIALS ═══ -->
    <section class="testimonials-section">
      <div class="section-badge-header">
        <span class="badge-tag">FAMILIAS FELICES</span>
        <h2>Lo que dicen los padres que ya transformaron su hogar</h2>
        <p>Resultados reales desde la primera semana de uso.</p>
      </div>

      <div class="testimonials-grid">
        <div
          v-for="item in testimonials"
          :key="item.name"
          class="testimonial-card"
        >
          <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
          <p class="testimonial-quote">"{{ item.text }}"</p>
          <div class="testimonial-author">
            <strong>{{ item.name }}</strong>
            <span>{{ item.role }}</span>
            <small>{{ item.city }}</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 7. PRICING SECTION ═══ -->
    <section id="pricing" class="landing-pricing-wrap">
      <div class="section-badge-header">
        <span class="badge-tag">INVERSIÓN FAMILIAR</span>
        <h2>Menos de lo que cuesta un café a la semana</h2>
        <p>Una pequeña inversión para una armonía familiar que no tiene precio.</p>
      </div>

      <div class="pricing-cards-container">
        <!-- Plan Mensual -->
        <div class="pricing-plan-card">
          <div class="plan-header">
            <h3>Plan Mensual</h3>
            <p>Máxima flexibilidad mes a mes</p>
            <div class="plan-price">
              <strong>$14.900</strong>
              <span>COP / mes</span>
            </div>
          </div>

          <ul class="plan-features">
            <li>✅ <strong>7 Días de Prueba Gratis</strong></li>
            <li>✅ Hijos / Exploradores ilimitados</li>
            <li>✅ Misiones, hábitos y ruleta diaria</li>
            <li>✅ Notificaciones PWA al celular</li>
            <li>✅ Cancela en 1 clic cuando quieras</li>
          </ul>

          <NuxtLink class="button primary large full-width" to="/auth/register">
            Comenzar 7 días gratis
          </NuxtLink>
        </div>

        <!-- Plan Anual Destacado -->
        <div class="pricing-plan-card featured">
          <div class="featured-ribbon">⭐ MÁS POPULAR • AHORRA 35%</div>
          <div class="plan-header">
            <h3>Plan Anual Familiar</h3>
            <p>12 meses de tranquilidad y hábitos sólidos</p>
            <div class="plan-price">
              <strong>$119.000</strong>
              <span>COP / año</span>
            </div>
            <span class="plan-equivalent">Equivale a solo <strong>$9.900 COP / mes</strong></span>
          </div>

          <ul class="plan-features">
            <li>✅ <strong>7 Días de Prueba Gratis</strong></li>
            <li>✅ <strong>Ahorras 2 meses gratis</strong></li>
            <li>✅ Hijos / Exploradores ilimitados</li>
            <li>✅ Misiones, hábitos y ruleta diaria</li>
            <li>✅ Multiplicadores y escudos de racha</li>
            <li>✅ Soporte prioritario para familias</li>
          </ul>

          <NuxtLink class="button primary large full-width pulse-glow" to="/auth/register">
            🚀 Comenzar con 7 días gratis
          </NuxtLink>
        </div>
      </div>

      <div class="pricing-guarantee-note">
        <span>🔒 Pagos 100% seguros procesados por <strong>Wompi (Bancolombia, Nequi, PSE, Tarjetas)</strong></span>
      </div>
    </section>

    <!-- ═══ 8. FAQ ACCORDION ═══ -->
    <section id="faq" class="landing-faq-wrap">
      <div class="section-badge-header">
        <span class="badge-tag">PREGUNTAS FRECUENTES</span>
        <h2>¿Tienes preguntas? Te las respondemos</h2>
      </div>

      <div class="landing-faq-list">
        <details v-for="item in faqs" :key="item.q" class="faq-accordion-item">
          <summary class="faq-question">
            <span>{{ item.q }}</span>
            <span class="faq-chevron">▾</span>
          </summary>
          <div class="faq-answer">
            <p>{{ item.a }}</p>
          </div>
        </details>
      </div>
    </section>

    <!-- ═══ 9. FINAL CTA BANNER ═══ -->
    <section class="final-cta-section">
      <div class="final-cta-box">
        <h2>¿Listo para transformar la rutina de tu familia hoy mismo?</h2>
        <p>Únete a más de 1,400 familias que cambiaron las peleas por cooperación y entusiasmo.</p>
        <div class="final-cta-actions">
          <NuxtLink class="landing-cta-primary large" to="/auth/register">
            🚀 Empezar mi prueba gratis de 7 días
          </NuxtLink>
        </div>
        <small>Toma menos de 2 minutos configurar tu Nido Familiar.</small>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing-enhanced {
  overflow-x: hidden;
  font-family: inherit;
  color: var(--ink);
}

/* ─── Hero Section ─── */
.landing-hero-wrap {
  padding: 48px clamp(18px, 4vw, 56px) 60px;
  background: radial-gradient(circle at 80% 20%, rgba(121, 199, 197, 0.25), transparent 50%),
              radial-gradient(circle at 10% 80%, rgba(245, 158, 11, 0.15), transparent 40%),
              var(--background);
}

.landing-hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 40px;
  align-items: center;
}

@media (max-width: 960px) {
  .landing-hero-container {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

.hero-urgency-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffedd5;
  color: #9a3412;
  border: 1.5px solid #fed7aa;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.84rem;
  font-weight: 800;
  margin-bottom: 20px;
}

.landing-hero-headline {
  font-size: clamp(2.2rem, 4.2vw, 3.4rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--ink);
  margin-bottom: 20px;
}

.gradient-text {
  background: linear-gradient(135deg, #0f766e 0%, #059669 50%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.landing-hero-subhead {
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  line-height: 1.6;
  color: #475569;
  margin-bottom: 32px;
  max-width: 580px;
}

.landing-hero-ctas {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.landing-cta-primary {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, #0f766e, #059669);
  color: #ffffff;
  font-weight: 900;
  font-size: 1.1rem;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(15, 118, 110, 0.35);
  transition: all 0.2s ease;
}

.landing-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(15, 118, 110, 0.45);
}

.landing-cta-primary small {
  font-size: 0.72rem;
  font-weight: 600;
  color: #ccfbf1;
  margin-top: 2px;
}

.landing-cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 14px 24px;
  border-radius: var(--radius-full);
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  color: #1e293b;
  font-weight: 800;
  font-size: 0.98rem;
  text-decoration: none;
  transition: all 0.15s ease;
}

.landing-cta-secondary:hover {
  background: #f8fafc;
  border-color: #0f766e;
  color: #0f766e;
}

.pulse-glow {
  animation: heroPulse 2.5s infinite;
}

@keyframes heroPulse {
  0% { box-shadow: 0 0 0 0 rgba(15, 118, 110, 0.6); }
  70% { box-shadow: 0 0 0 14px rgba(15, 118, 110, 0); }
  100% { box-shadow: 0 0 0 0 rgba(15, 118, 110, 0); }
}

.hero-trust-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.82rem;
  font-weight: 700;
  color: #64748b;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ─── Interactive Phone Frame Simulator ─── */
.interactive-phone-frame {
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  border: 8px solid #0f172a;
  max-width: 420px;
  margin: 0 auto;
}

.interactive-top-bar {
  background: #0f172a;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.interactive-top-bar .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.interactive-bar-title {
  color: #94a3b8;
  font-size: 0.72rem;
  font-weight: 700;
  margin-left: 6px;
}

.interactive-screen-body {
  padding: 16px;
  background: #f8fafc;
}

.sim-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.sim-header small {
  font-size: 0.75rem;
  color: #64748b;
}

.sim-header h4 {
  font-size: 1.1rem;
  font-weight: 900;
  color: #0f172a;
  margin: 0;
}

.sim-stars-badge {
  background: #fff;
  border: 1.5px solid #fed7aa;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.sim-stars-badge strong {
  font-size: 1.15rem;
  font-weight: 900;
  color: #ea580c;
}

.sim-stars-badge small {
  font-size: 0.7rem;
  font-weight: 700;
  color: #9a3412;
}

.sim-streak-bar {
  background: linear-gradient(135deg, #ffedd5, #fed7aa);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.sim-flame-icon {
  font-size: 1.6rem;
  animation: flameBounce 1.5s infinite alternate;
}

@keyframes flameBounce {
  0% { transform: scale(1); }
  100% { transform: scale(1.15); }
}

.sim-streak-text {
  flex: 1;
}

.sim-streak-text strong {
  display: block;
  font-size: 0.88rem;
  color: #9a3412;
  line-height: 1.1;
}

.sim-streak-text span {
  font-size: 0.72rem;
  color: #7c2d12;
}

.sim-multiplier-pill {
  background: #fef08a;
  color: #854d0e;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: var(--radius-full);
}

.sim-wheel-card {
  background: #0f172a;
  color: #fff;
  border-radius: var(--radius-md);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.sim-wheel-left span {
  display: block;
  font-size: 0.85rem;
  color: #f59e0b;
}

.sim-wheel-left small {
  font-size: 0.72rem;
  color: #94a3b8;
}

.prize-highlight {
  color: #34d399 !important;
  font-weight: 800;
}

.sim-wheel-btn {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  border: none;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.sim-wheel-btn:not(:disabled):hover {
  transform: scale(1.05);
}

.sim-mission-card {
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 12px;
  margin-bottom: 12px;
}

.sim-mission-title {
  font-size: 0.88rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 2px;
}

.sim-mission-reward {
  font-size: 0.76rem;
  color: #64748b;
  margin-bottom: 8px;
}

.sim-action-btn {
  width: 100%;
  padding: 8px;
  border-radius: var(--radius-sm);
  background: #0f766e;
  color: #fff;
  font-weight: 800;
  font-size: 0.84rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sim-action-btn.done {
  background: #10b981;
}

.sim-tip {
  font-size: 0.72rem;
  color: #64748b;
  text-align: center;
  background: #e2e8f0;
  padding: 6px;
  border-radius: 6px;
}

/* ─── 2. Social Proof & Stats Strip ─── */
.landing-stats-strip {
  background: #ffffff;
  border-top: 1px solid var(--line-light);
  border-bottom: 1px solid var(--line-light);
  padding: 24px clamp(18px, 4vw, 48px);
}

.landing-stats-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  text-align: center;
}

.stat-pill-item strong {
  display: block;
  font-size: 1.65rem;
  font-weight: 900;
  color: #0f766e;
  letter-spacing: -0.02em;
}

.stat-pill-item span {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}

/* ─── Headers ─── */
.section-badge-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 40px auto;
}

.badge-tag {
  display: inline-block;
  background: #ccfbf1;
  color: #0f766e;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  margin-bottom: 10px;
}

.section-badge-header h2 {
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}

.section-badge-header p {
  font-size: 1.05rem;
  color: #64748b;
  margin: 0;
}

/* ─── 3. Transformation Section ─── */
.transformation-section {
  padding: 80px clamp(18px, 4vw, 48px);
  background: #f8fafc;
}

.comparison-grid {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

.comparison-card {
  background: #ffffff;
  border-radius: var(--radius-xl);
  padding: 32px;
  border: 1px solid var(--line-light);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.04);
}

.comparison-card.before {
  border-left: 6px solid #ef4444;
}

.comparison-card.after {
  border-left: 6px solid #10b981;
  background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%);
}

.card-tag {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  margin-bottom: 12px;
}

.card-tag.negative { background: #fee2e2; color: #dc2626; }
.card-tag.positive { background: #dcfce7; color: #15803d; }

.comparison-card h3 {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 18px;
}

.comparison-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.comparison-list li {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #334155;
}

/* ─── 4. Engines Section ─── */
.engines-section {
  padding: 80px clamp(18px, 4vw, 48px);
  background: #ffffff;
}

.engines-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.engine-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  padding: 28px 22px;
  text-align: left;
  transition: transform 0.2s ease;
}

.engine-card:hover {
  transform: translateY(-4px);
  border-color: #0f766e;
}

.engine-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 18px;
}

.wheel-bg { background: #fef3c7; }
.flame-bg { background: #ffedd5; }
.star-bg { background: #ccfbf1; }
.gift-bg { background: #fce7f3; }

.engine-card h3 {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
}

.engine-card p {
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

/* ─── 5. Age Guide Section ─── */
.age-guide-section {
  padding: 80px clamp(18px, 4vw, 48px);
  background: #f1f5f9;
}

.age-tabs-switcher {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.age-tab-btn {
  padding: 10px 22px;
  border-radius: var(--radius-full);
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  font-weight: 700;
  font-size: 0.92rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;
}

.age-tab-btn.active {
  background: #0f766e;
  color: #ffffff;
  border-color: #0f766e;
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.25);
}

.age-tab-content-card {
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: var(--radius-xl);
  padding: 32px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.age-content-header {
  margin-bottom: 24px;
  text-align: left;
}

.age-content-badge {
  display: inline-block;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  margin-bottom: 8px;
}

.age-content-header h3 {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.age-columns-preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .age-columns-preview {
    grid-template-columns: 1fr;
  }
}

.age-preview-col h4 {
  font-size: 1rem;
  font-weight: 800;
  color: #334155;
  margin-bottom: 12px;
}

.age-preview-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.age-preview-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #f8fafc;
  border-radius: var(--radius-sm);
  border: 1px solid #e2e8f0;
  font-size: 0.88rem;
  color: #1e293b;
  font-weight: 600;
}

.age-preview-item strong {
  color: #059669;
}

.reward-cost {
  background: #fef3c7;
  color: #b45309;
  font-weight: 800;
  font-size: 0.78rem;
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

/* ─── 6. Testimonials ─── */
.testimonials-section {
  padding: 80px clamp(18px, 4vw, 48px);
  background: #ffffff;
}

.testimonials-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.testimonial-card {
  background: #f8fafc;
  border-radius: var(--radius-lg);
  padding: 28px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.testimonial-stars {
  font-size: 1.1rem;
  margin-bottom: 12px;
}

.testimonial-quote {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #334155;
  margin-bottom: 20px;
  flex: 1;
}

.testimonial-author strong {
  display: block;
  font-size: 0.95rem;
  color: #0f172a;
}

.testimonial-author span {
  display: block;
  font-size: 0.82rem;
  color: #0f766e;
  font-weight: 700;
}

.testimonial-author small {
  font-size: 0.76rem;
  color: #94a3b8;
}

/* ─── 7. Pricing Section ─── */
.landing-pricing-wrap {
  padding: 80px clamp(18px, 4vw, 48px);
  background: radial-gradient(circle at 50% 10%, rgba(121, 199, 197, 0.15), transparent 60%), #f8fafc;
}

.pricing-cards-container {
  max-width: 860px;
  margin: 0 auto 30px auto;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 24px;
  align-items: stretch;
}

@media (max-width: 768px) {
  .pricing-cards-container {
    grid-template-columns: 1fr;
  }
}

.pricing-plan-card {
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--radius-xl);
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.pricing-plan-card.featured {
  position: relative;
  border-color: #0f766e;
  border-width: 2.5px;
  box-shadow: 0 12px 40px rgba(15, 118, 110, 0.15);
}

.featured-ribbon {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  padding: 4px 16px;
  border-radius: var(--radius-full);
  box-shadow: 0 3px 10px rgba(245, 158, 11, 0.4);
  white-space: nowrap;
}

.plan-header h3 {
  font-size: 1.35rem;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 4px;
}

.plan-header p {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 20px;
}

.plan-price {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 6px;
}

.plan-price strong {
  font-size: 2.4rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
}

.plan-price span {
  font-size: 0.9rem;
  font-weight: 700;
  color: #64748b;
}

.plan-equivalent {
  display: block;
  font-size: 0.82rem;
  color: #0f766e;
  font-weight: 700;
  margin-bottom: 20px;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 20px 0 30px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-features li {
  font-size: 0.92rem;
  color: #334155;
  line-height: 1.4;
}

.full-width {
  width: 100%;
  text-align: center;
  justify-content: center;
}

.pricing-guarantee-note {
  text-align: center;
  font-size: 0.85rem;
  color: #64748b;
}

/* ─── 8. FAQ ─── */
.landing-faq-wrap {
  padding: 80px clamp(18px, 4vw, 48px);
  background: #ffffff;
}

.landing-faq-list {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.faq-accordion-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 16px 20px;
  cursor: pointer;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.02rem;
  font-weight: 800;
  color: #0f172a;
  list-style: none;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-chevron {
  font-size: 1.2rem;
  color: #94a3b8;
  transition: transform 0.2s ease;
}

details[open] .faq-chevron {
  transform: rotate(180deg);
  color: #0f766e;
}

.faq-answer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.faq-answer p {
  font-size: 0.92rem;
  line-height: 1.6;
  color: #475569;
  margin: 0;
}

/* ─── 9. Final CTA ─── */
.final-cta-section {
  padding: 60px clamp(18px, 4vw, 48px) 100px;
  background: #ffffff;
}

.final-cta-box {
  max-width: 900px;
  margin: 0 auto;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  border-radius: var(--radius-xl);
  padding: 48px 32px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.2);
}

.final-cta-box h2 {
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
  font-weight: 900;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.final-cta-box p {
  font-size: 1.1rem;
  color: #94a3b8;
  max-width: 580px;
  margin: 0 auto 30px auto;
}

.final-cta-box small {
  display: block;
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 16px;
}
</style>
