<script setup lang="ts">
const { t } = useI18n()
const { user, tenant, logout } = useSession()

defineProps<{
  title: string
  section: 'guide' | 'explorer' | 'admin'
}>()
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <NuxtLink class="brand shell-brand" to="/">
        <span class="brand-mark">NQ</span>
        <span>{{ t('app.name') }}</span>
      </NuxtLink>
      <nav class="side-nav" aria-label="Dashboard">
        <NuxtLink to="/dashboard/guide" :class="{ active: section === 'guide' }">{{ t('dashboard.guideTitle') }}</NuxtLink>
        <NuxtLink to="/dashboard/explorer" :class="{ active: section === 'explorer' }">{{ t('dashboard.explorerTitle') }}</NuxtLink>
        <NuxtLink to="/dashboard/admin" :class="{ active: section === 'admin' }">{{ t('dashboard.adminTitle') }}</NuxtLink>
      </nav>
    </aside>

    <section class="workspace">
      <header class="workspace-header">
        <div>
          <p class="eyebrow">{{ tenant?.name || t('app.name') }}</p>
          <h1>{{ title }}</h1>
        </div>
        <div class="profile-chip">
          <span>{{ user?.name || t('ui.calmProgress') }}</span>
          <NotificationCenter />
          <button class="icon-button" type="button" :aria-label="t('nav.logout')" @click="logout">↗</button>
        </div>
      </header>
      <slot />
    </section>
  </div>
</template>
