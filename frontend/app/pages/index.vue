<script setup lang="ts">
const { t } = useI18n()

const steps = ['nest', 'explorers', 'missions', 'stars', 'rewards']
const benefits = ['talks', 'motivation', 'habits', 'controlledRewards', 'progress', 'support']
const faqs = ['parenting', 'children', 'customRewards', 'mobile', 'languages']
</script>

<template>
  <div class="landing">
    <section class="hero-section">
      <div class="hero-content">
        <p class="eyebrow">{{ t('app.tagline') }}</p>
        <h1>{{ t('landing.heroTitle') }}</h1>
        <p>{{ t('landing.heroSubtitle') }}</p>
        <div class="hero-actions">
          <NuxtLink class="button primary large" to="/auth/register">{{ t('landing.primaryCta') }}</NuxtLink>
          <NuxtLink class="button ghost large" to="/#how">{{ t('landing.secondaryCta') }}</NuxtLink>
        </div>
      </div>
      <div class="hero-product" aria-hidden="true">
        <div class="phone-frame">
          <div class="phone-top" />
          <div class="mission-row active">
            <span />
            <strong>{{ t('ui.missions') }}</strong>
            <em>+8</em>
          </div>
          <div class="mission-row">
            <span />
            <strong>{{ t('ui.progress') }}</strong>
            <em>78%</em>
          </div>
          <div class="mission-row">
            <span />
            <strong>{{ t('ui.rewards') }}</strong>
            <em>3</em>
          </div>
          <div class="star-total">84 {{ t('ui.stars') }}</div>
        </div>
      </div>
    </section>

    <section class="split-section">
      <article>
        <p class="eyebrow">{{ t('landing.problemTitle') }}</p>
        <h2>{{ t('landing.problemText') }}</h2>
      </article>
      <article>
        <p class="eyebrow">{{ t('landing.solutionTitle') }}</p>
        <h2>{{ t('landing.solutionText') }}</h2>
      </article>
    </section>

    <section id="how" class="band-section">
      <div class="section-heading">
        <p class="eyebrow">{{ t('landing.howTitle') }}</p>
        <h2>{{ t('landing.solutionText') }}</h2>
      </div>
      <div class="step-grid">
        <article v-for="(step, index) in steps" :key="step" class="step-card">
          <span>{{ index + 1 }}</span>
          <h3>{{ t(`landing.steps.${step}`) }}</h3>
        </article>
      </div>
    </section>

    <section class="benefit-section">
      <div class="section-heading">
        <p class="eyebrow">{{ t('landing.benefitsTitle') }}</p>
        <h2>{{ t('ui.calmProgress') }}</h2>
      </div>
      <div class="benefit-grid">
        <article v-for="benefit in benefits" :key="benefit" class="benefit-item">
          <span />
          <p>{{ t(`landing.benefits.${benefit}`) }}</p>
        </article>
      </div>
    </section>

    <section id="pricing" class="pricing-section">
      <div>
        <p class="eyebrow">{{ t('landing.priceTitle') }}</p>
        <h2>{{ t('landing.price') }}</h2>
      </div>
      <div class="pricing-actions">
        <NuxtLink class="button primary large" to="/auth/register">{{ t('landing.primaryCta') }}</NuxtLink>
        <NuxtLink class="button ghost large" to="/billing">{{ t('billing.manage') }}</NuxtLink>
      </div>
    </section>

    <section id="faq" class="faq-section">
      <div class="section-heading">
        <p class="eyebrow">{{ t('landing.faqTitle') }}</p>
        <h2>{{ t('landing.faq.parentingA') }}</h2>
      </div>
      <div class="faq-list">
        <details v-for="item in faqs" :key="item">
          <summary>{{ t(`landing.faq.${item}Q`) }}</summary>
          <p>{{ t(`landing.faq.${item}A`) }}</p>
        </details>
      </div>
    </section>
  </div>
</template>
