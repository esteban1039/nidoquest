<script setup lang="ts">
const { t } = useI18n()
const { user, tenant, logout, role } = useSession()
const route = useRoute()

const guideTab = computed(() => String(route.query.tab || 'explorers'))
const isProfile = computed(() => route.path === '/profile')
const isBilling = computed(() => route.path.startsWith('/billing'))

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
        <template v-if="role === 'guide'">
          <NuxtLink to="/dashboard/guide?tab=explorers" :class="{ active: guideTab === 'explorers' && route.path === '/dashboard/guide' }">Exploradores</NuxtLink>
          <NuxtLink to="/dashboard/guide?tab=missions" :class="{ active: guideTab === 'missions' && route.path === '/dashboard/guide' }">Misiones</NuxtLink>
          <NuxtLink to="/dashboard/guide?tab=rewards" :class="{ active: guideTab === 'rewards' && route.path === '/dashboard/guide' }">Recompensas</NuxtLink>
          <NuxtLink to="/billing" :class="{ active: isBilling }">Cobros</NuxtLink>
          <NuxtLink to="/profile" :class="{ active: isProfile }">Mi perfil</NuxtLink>
        </template>
        <template v-else-if="role === 'explorer'">
          <NuxtLink to="/dashboard/explorer" :class="{ active: section === 'explorer' }">Mis misiones</NuxtLink>
          <NuxtLink to="/profile" :class="{ active: isProfile }">Mi perfil</NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/dashboard/admin" :class="{ active: section === 'admin' }">Clientes SaaS</NuxtLink>
          <NuxtLink to="/profile" :class="{ active: isProfile }">Perfil</NuxtLink>
        </template>
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
          <button class="button small" type="button" @click="logout">Salir</button>
        </div>
      </header>
      <slot />
    </section>
  </div>
</template>
