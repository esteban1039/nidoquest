<script setup lang="ts">
const { t, tm } = useI18n()

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
    demoSpinPrize.value = t('landing.sim.wheelPrize')
    demoStars.value += 10
  }, 1800)
}

const ageGuides = computed(() => {
  const data = (tm('landing.ageGuide.guides') as Record<string, any>) || {}
  return data
})

const currentAgeGuide = computed(() => {
  return ageGuides.value[selectedAgeTab.value] || { badge: '', title: '', missions: [], rewards: [] }
})

const testimonials = computed(() => {
  return (tm('landing.testimonials.items') as Array<{ name: string; role: string; city: string; text: string }>) || []
})

const faqs = computed(() => {
  return (tm('landing.faq.items') as Array<{ q: string; a: string }>) || []
})
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
            <span>{{ t('landing.urgencyBadge') }}</span>
          </div>

          <h1 class="landing-hero-headline">
            {{ t('landing.heroTitle') }} <span class="gradient-text">{{ t('landing.heroTitleHighlight') }}</span>
          </h1>

          <p class="landing-hero-subhead">
            {{ t('landing.heroSubhead') }}
          </p>

          <div class="landing-hero-ctas">
            <NuxtLink class="landing-cta-primary pulse-glow" to="/auth/register">
              <span>{{ t('landing.heroCtaPrimary') }}</span>
              <small>{{ t('landing.heroCtaSubtext') }}</small>
            </NuxtLink>
            <a class="landing-cta-secondary" href="#demo">
              <span>{{ t('landing.heroCtaSecondary') }}</span>
            </a>
          </div>

          <div class="hero-trust-bar">
            <div class="trust-item"><span>✅</span> {{ t('landing.trustFreeTrial') }}</div>
            <div class="trust-item"><span>📱</span> {{ t('landing.trustPwa') }}</div>
            <div class="trust-item"><span>🔒</span> {{ t('landing.trustPrivate') }}</div>
          </div>
        </div>

        <!-- Right: Interactive Live Simulation Box -->
        <div id="demo" class="landing-hero-interactive">
          <div class="interactive-phone-frame">
            <div class="interactive-top-bar">
              <span class="dot red" />
              <span class="dot yellow" />
              <span class="dot green" />
              <span class="interactive-bar-title">{{ t('landing.sim.title') }}</span>
            </div>

            <div class="interactive-screen-body">
              <!-- Child Header -->
              <div class="sim-header">
                <div>
                  <small>{{ t('landing.sim.explorer') }}</small>
                  <h4>{{ t('landing.sim.childName') }}</h4>
                </div>
                <div class="sim-stars-badge">
                  <span>⭐</span>
                  <strong>{{ demoStars }}</strong>
                  <small>{{ t('landing.sim.stars') }}</small>
                </div>
              </div>

              <!-- Streak Bar -->
              <div class="sim-streak-bar">
                <div class="sim-flame-icon">🔥</div>
                <div class="sim-streak-text">
                  <strong>{{ t('landing.sim.streakDays', { count: demoStreak }) }}</strong>
                  <span>{{ demoStreakProtected ? t('landing.sim.streakProtected') : t('landing.sim.streakWarning') }}</span>
                </div>
                <span class="sim-multiplier-pill">{{ t('landing.sim.bonusMultiplier') }}</span>
              </div>

              <!-- Daily Lucky Wheel Demo Widget -->
              <div class="sim-wheel-card">
                <div class="sim-wheel-left">
                  <span>🎡 <strong>{{ t('landing.sim.wheelTitle') }}</strong></span>
                  <small v-if="!demoSpinPrize">{{ t('landing.sim.wheelSubtext') }}</small>
                  <small v-else class="prize-highlight">{{ demoSpinPrize }}</small>
                </div>
                <button
                  class="sim-wheel-btn"
                  type="button"
                  :disabled="demoSpinning || Boolean(demoSpinPrize)"
                  @click="spinDemoWheel"
                >
                  {{ demoSpinning ? t('landing.sim.wheelBtnSpinning') : demoSpinPrize ? t('landing.sim.wheelBtnClaimed') : t('landing.sim.wheelBtnSpin') }}
                </button>
              </div>

              <!-- Live Mission to Complete -->
              <div class="sim-mission-card">
                <div class="sim-mission-info">
                  <div class="sim-mission-title">{{ t('landing.sim.missionTitle') }}</div>
                  <div class="sim-mission-reward">{{ t('landing.sim.missionReward') }}</div>
                </div>
                <button
                  class="sim-action-btn"
                  :class="{ done: demoMissionDone }"
                  type="button"
                  @click="completeDemoMission"
                >
                  {{ demoMissionDone ? t('landing.sim.missionBtnDone') : t('landing.sim.missionBtnPending') }}
                </button>
              </div>

              <div class="sim-tip">
                <em>{{ t('landing.sim.tip') }}</em>
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
          <span>{{ t('landing.stats.satisfaction') }}</span>
        </div>
        <div class="stat-pill-item">
          <strong>-92%</strong>
          <span>{{ t('landing.stats.reduction') }}</span>
        </div>
        <div class="stat-pill-item">
          <strong>+120,000</strong>
          <span>{{ t('landing.stats.habitsCompleted') }}</span>
        </div>
        <div class="stat-pill-item">
          <strong>{{ t('landing.stats.minutesPerDay') }}</strong>
          <span>{{ t('landing.stats.parentTime') }}</span>
        </div>
      </div>
    </section>

    <!-- ═══ 3. BEFORE VS AFTER TRANSFORMATION ═══ -->
    <section class="transformation-section">
      <div class="section-badge-header">
        <span class="badge-tag">{{ t('landing.transformation.badge') }}</span>
        <h2>{{ t('landing.transformation.title') }}</h2>
        <p>{{ t('landing.transformation.subtitle') }}</p>
      </div>

      <div class="comparison-grid">
        <!-- Before -->
        <div class="comparison-card before">
          <div class="card-tag negative">{{ t('landing.transformation.beforeTitle') }}</div>
          <h3>{{ t('landing.transformation.beforeHeadline') }}</h3>
          <ul class="comparison-list">
            <li>{{ t('landing.transformation.beforeItem1') }}</li>
            <li>{{ t('landing.transformation.beforeItem2') }}</li>
            <li>{{ t('landing.transformation.beforeItem3') }}</li>
            <li>{{ t('landing.transformation.beforeItem4') }}</li>
          </ul>
        </div>

        <!-- After -->
        <div class="comparison-card after">
          <div class="card-tag positive">{{ t('landing.transformation.afterTitle') }}</div>
          <h3>{{ t('landing.transformation.afterHeadline') }}</h3>
          <ul class="comparison-list">
            <li>{{ t('landing.transformation.afterItem1') }}</li>
            <li>{{ t('landing.transformation.afterItem2') }}</li>
            <li>{{ t('landing.transformation.afterItem3') }}</li>
            <li>{{ t('landing.transformation.afterItem4') }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ═══ 4. THE 4 GAMIFIED ENGINES ═══ -->
    <section class="engines-section">
      <div class="section-badge-header">
        <span class="badge-tag">{{ t('landing.engines.badge') }}</span>
        <h2>{{ t('landing.engines.title') }}</h2>
        <p>{{ t('landing.engines.subtitle') }}</p>
      </div>

      <div class="engines-grid">
        <div class="engine-card">
          <div class="engine-icon-wrap wheel-bg">🎡</div>
          <h3>{{ t('landing.engines.wheelTitle') }}</h3>
          <p>{{ t('landing.engines.wheelText') }}</p>
        </div>

        <div class="engine-card">
          <div class="engine-icon-wrap flame-bg">🔥</div>
          <h3>{{ t('landing.engines.streakTitle') }}</h3>
          <p>{{ t('landing.engines.streakText') }}</p>
        </div>

        <div class="engine-card">
          <div class="engine-icon-wrap star-bg">⭐</div>
          <h3>{{ t('landing.engines.starsTitle') }}</h3>
          <p>{{ t('landing.engines.starsText') }}</p>
        </div>

        <div class="engine-card">
          <div class="engine-icon-wrap gift-bg">🎁</div>
          <h3>{{ t('landing.engines.rewardsTitle') }}</h3>
          <p>{{ t('landing.engines.rewardsText') }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ 5. AGE ADAPTATION GUIDE ═══ -->
    <section class="age-guide-section">
      <div class="section-badge-header">
        <span class="badge-tag">{{ t('landing.ageGuide.badge') }}</span>
        <h2>{{ t('landing.ageGuide.title') }}</h2>
        <p>{{ t('landing.ageGuide.subtitle') }}</p>
      </div>

      <div class="age-tabs-switcher">
        <button
          class="age-tab-btn"
          :class="{ active: selectedAgeTab === 'peques' }"
          type="button"
          @click="selectedAgeTab = 'peques'"
        >
          {{ t('landing.ageGuide.tabPeques') }}
        </button>
        <button
          class="age-tab-btn"
          :class="{ active: selectedAgeTab === 'medios' }"
          type="button"
          @click="selectedAgeTab = 'medios'"
        >
          {{ t('landing.ageGuide.tabMedios') }}
        </button>
        <button
          class="age-tab-btn"
          :class="{ active: selectedAgeTab === 'jovenes' }"
          type="button"
          @click="selectedAgeTab = 'jovenes'"
        >
          {{ t('landing.ageGuide.tabJovenes') }}
        </button>
      </div>

      <div class="age-tab-content-card">
        <div class="age-content-header">
          <span class="age-content-badge">{{ currentAgeGuide.badge }}</span>
          <h3>{{ currentAgeGuide.title }}</h3>
        </div>

        <div class="age-columns-preview">
          <!-- Sample Missions -->
          <div class="age-preview-col">
            <h4>{{ t('landing.ageGuide.missionsHeading') }}</h4>
            <div class="age-preview-items">
              <div
                v-for="mission in currentAgeGuide.missions"
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
            <h4>{{ t('landing.ageGuide.rewardsHeading') }}</h4>
            <div class="age-preview-items">
              <div
                v-for="reward in currentAgeGuide.rewards"
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
        <span class="badge-tag">{{ t('landing.testimonials.badge') }}</span>
        <h2>{{ t('landing.testimonials.title') }}</h2>
        <p>{{ t('landing.testimonials.subtitle') }}</p>
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
        <span class="badge-tag">{{ t('landing.pricing.badge') }}</span>
        <h2>{{ t('landing.pricing.title') }}</h2>
        <p>{{ t('landing.pricing.subtitle') }}</p>
      </div>

      <div class="pricing-cards-container">
        <!-- Plan Mensual -->
        <div class="pricing-plan-card">
          <div class="plan-header">
            <h3>{{ t('landing.pricing.monthlyTitle') }}</h3>
            <p>{{ t('landing.pricing.monthlySubtitle') }}</p>
            <div class="plan-price">
              <strong>{{ t('landing.pricing.monthlyPrice') }}</strong>
              <span>{{ t('landing.pricing.monthlyPeriod') }}</span>
            </div>
          </div>

          <ul class="plan-features">
            <li>✅ <strong>{{ t('landing.pricing.featureTrial') }}</strong></li>
            <li>✅ {{ t('landing.pricing.featureExplorers') }}</li>
            <li>✅ {{ t('landing.pricing.featureMissions') }}</li>
            <li>✅ {{ t('landing.pricing.featurePwa') }}</li>
            <li>✅ {{ t('landing.pricing.featureCancel') }}</li>
          </ul>

          <NuxtLink class="button primary large full-width" to="/auth/register">
            {{ t('landing.pricing.ctaMonthly') }}
          </NuxtLink>
        </div>

        <!-- Plan Anual Destacado -->
        <div class="pricing-plan-card featured">
          <div class="featured-ribbon">{{ t('landing.pricing.popularBadge') }}</div>
          <div class="plan-header">
            <h3>{{ t('landing.pricing.annualTitle') }}</h3>
            <p>{{ t('landing.pricing.annualSubtitle') }}</p>
            <div class="plan-price">
              <strong>{{ t('landing.pricing.annualPrice') }}</strong>
              <span>{{ t('landing.pricing.annualPeriod') }}</span>
            </div>
            <span class="plan-equivalent">{{ t('landing.pricing.annualEquivalent') }}</span>
          </div>

          <ul class="plan-features">
            <li>✅ <strong>{{ t('landing.pricing.featureTrial') }}</strong></li>
            <li>✅ <strong>{{ t('landing.pricing.featureSaveMonths') }}</strong></li>
            <li>✅ {{ t('landing.pricing.featureExplorers') }}</li>
            <li>✅ {{ t('landing.pricing.featureMissions') }}</li>
            <li>✅ {{ t('landing.pricing.featureStreaks') }}</li>
            <li>✅ {{ t('landing.pricing.featureSupport') }}</li>
          </ul>

          <NuxtLink class="button primary large full-width pulse-glow" to="/auth/register">
            {{ t('landing.pricing.ctaAnnual') }}
          </NuxtLink>
        </div>
      </div>

      <div class="pricing-guarantee-note">
        <span>{{ t('landing.pricing.guaranteeNote') }}</span>
      </div>
    </section>

    <!-- ═══ 8. FAQ ACCORDION ═══ -->
    <section id="faq" class="landing-faq-wrap">
      <div class="section-badge-header">
        <span class="badge-tag">{{ t('landing.faq.badge') }}</span>
        <h2>{{ t('landing.faq.title') }}</h2>
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
        <h2>{{ t('landing.finalCta.title') }}</h2>
        <p>{{ t('landing.finalCta.subtitle') }}</p>
        <div class="final-cta-actions">
          <NuxtLink class="landing-cta-primary large" to="/auth/register">
            {{ t('landing.finalCta.button') }}
          </NuxtLink>
        </div>
        <small>{{ t('landing.finalCta.note') }}</small>
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
