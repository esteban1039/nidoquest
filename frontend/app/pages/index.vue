<script setup lang="ts">
const { t } = useI18n()

const outcomes = ['arguments', 'routine', 'screens']
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
        <div class="hero-proof">
          <span>{{ t('landing.proof.habits') }}</span>
          <span>{{ t('landing.proof.rewards') }}</span>
          <span>{{ t('landing.proof.progress') }}</span>
        </div>
      </div>

      <div class="hero-product" aria-hidden="true">
        <div class="product-window">
          <div class="product-bar">
            <span>NidoQuest</span>
            <strong>{{ t('landing.product.status') }}</strong>
          </div>
          <div class="product-hero">
            <div>
              <small>{{ t('landing.product.nest') }}</small>
              <strong>{{ t('landing.product.family') }}</strong>
            </div>
            <span>84 {{ t('ui.stars') }}</span>
          </div>
          <div class="product-grid">
            <article class="product-card">
              <small>{{ t('ui.missions') }}</small>
              <strong>8</strong>
              <span>{{ t('landing.product.today') }}</span>
            </article>
            <article class="product-card blue">
              <small>{{ t('ui.progress') }}</small>
              <strong>78%</strong>
              <span>{{ t('landing.product.week') }}</span>
            </article>
            <article class="product-card yellow">
              <small>{{ t('ui.rewards') }}</small>
              <strong>3</strong>
              <span>{{ t('landing.product.ready') }}</span>
            </article>
          </div>
          <div class="product-list">
            <div>
              <span />
              <p>{{ t('landing.product.missionOne') }}</p>
              <strong>+10</strong>
            </div>
            <div>
              <span />
              <p>{{ t('landing.product.missionTwo') }}</p>
              <strong>+6</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="outcome-strip" aria-label="Resultados esperados">
      <article v-for="outcome in outcomes" :key="outcome">
        <strong>{{ t(`landing.outcomes.${outcome}Title`) }}</strong>
        <span>{{ t(`landing.outcomes.${outcome}Text`) }}</span>
      </article>
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
        <h2>{{ t('landing.howHeadline') }}</h2>
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
        <h2>{{ t('landing.benefitsHeadline') }}</h2>
      </div>
      <div class="benefit-grid">
        <article v-for="benefit in benefits" :key="benefit" class="benefit-item">
          <span />
          <p>{{ t(`landing.benefits.${benefit}`) }}</p>
        </article>
      </div>
    </section>

    <section class="social-proof-section">
      <div>
        <p class="eyebrow">{{ t('landing.trustEyebrow') }}</p>
        <h2>{{ t('landing.trustTitle') }}</h2>
      </div>
      <blockquote>{{ t('landing.trustQuote') }}</blockquote>
    </section>

    <section id="pricing" class="pricing-section">
      <div>
        <p class="eyebrow">{{ t('landing.priceTitle') }}</p>
        <h2>{{ t('landing.price') }}</h2>
        <p>{{ t('landing.priceText') }}</p>
      </div>
      <div class="pricing-actions">
        <NuxtLink class="button primary large" to="/auth/register">{{ t('landing.primaryCta') }}</NuxtLink>
        <NuxtLink class="button ghost large" to="/auth/login">{{ t('nav.login') }}</NuxtLink>
      </div>
    </section>

    <section id="faq" class="faq-section">
      <div class="section-heading">
        <p class="eyebrow">{{ t('landing.faqTitle') }}</p>
        <h2>{{ t('landing.faqHeadline') }}</h2>
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
