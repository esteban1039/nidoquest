<script setup lang="ts">
const { t } = useI18n()
const { user, tenant, logout, role } = useSession()
const route = useRoute()

const guideTab = computed(() => String(route.query.tab || 'overview'))
const isProfile = computed(() => route.path === '/profile')
const isBilling = computed(() => route.path.startsWith('/billing'))

defineProps<{
  title: string
  section: 'guide' | 'explorer' | 'admin'
}>()
</script>

<template>
  <div class="app-shell-container">
    <!-- Desktop Sidebar -->
    <aside class="sidebar" aria-label="Navegación principal">
      <NuxtLink class="brand shell-brand" to="/">
        <span class="brand-mark">NQ</span>
        <span class="brand-name">{{ t('app.name') }}</span>
      </NuxtLink>

      <nav class="side-nav" aria-label="Dashboard">
        <template v-if="role === 'guide'">
          <NuxtLink
            to="/dashboard/guide"
            :class="{ active: (guideTab === 'overview' || !route.query.tab) && route.path === '/dashboard/guide' }"
          >
            <span>📊</span>
            <span>Indicadores</span>
          </NuxtLink>
          <NuxtLink
            to="/dashboard/guide?tab=explorers"
            :class="{ active: guideTab === 'explorers' && route.path === '/dashboard/guide' }"
          >
            <span>👥</span>
            <span>Exploradores</span>
          </NuxtLink>
          <NuxtLink
            to="/dashboard/guide?tab=missions"
            :class="{ active: guideTab === 'missions' && route.path === '/dashboard/guide' }"
          >
            <span>🎯</span>
            <span>Misiones y Hábitos</span>
          </NuxtLink>
          <NuxtLink
            to="/dashboard/guide?tab=rewards"
            :class="{ active: guideTab === 'rewards' && route.path === '/dashboard/guide' }"
          >
            <span>🎁</span>
            <span>Recompensas</span>
          </NuxtLink>
          <NuxtLink
            to="/dashboard/guide?tab=guides"
            :class="{ active: guideTab === 'guides' && route.path === '/dashboard/guide' }"
          >
            <span>🛡️</span>
            <span>Formadores</span>
          </NuxtLink>
          <NuxtLink
            to="/profile"
            :class="{ active: isProfile || isBilling }"
          >
            <span>👤</span>
            <span>Mi perfil y Pagos</span>
          </NuxtLink>
        </template>

        <template v-else-if="role === 'explorer'">
          <NuxtLink to="/dashboard/explorer" :class="{ active: section === 'explorer' }">
            <span>🎯</span>
            <span>Mis misiones</span>
          </NuxtLink>
          <NuxtLink to="/profile" :class="{ active: isProfile }">
            <span>👤</span>
            <span>Mi perfil</span>
          </NuxtLink>
        </template>

        <template v-else>
          <NuxtLink to="/dashboard/admin" :class="{ active: section === 'admin' }">
            <span>🏢</span>
            <span>Clientes SaaS</span>
          </NuxtLink>
          <NuxtLink to="/profile" :class="{ active: isProfile }">
            <span>👤</span>
            <span>Perfil</span>
          </NuxtLink>
        </template>
      </nav>
    </aside>

    <!-- Main Workspace Section -->
    <main class="workspace-area">
      <!-- Responsive Header -->
      <header class="workspace-top-header">
        <div class="header-titles">
          <p class="eyebrow-nest">🏡 {{ tenant?.name || t('app.name') }}</p>
          <h1 class="header-page-title">{{ title }}</h1>
        </div>

        <div class="header-user-actions">
          <div class="user-pill-badge" :title="user?.email">
            <span class="user-avatar-mini">{{ (user?.name || 'G').charAt(0).toUpperCase() }}</span>
            <span class="user-display-name">{{ user?.name || 'Guía' }}</span>
          </div>
          <NotificationCenter />
          <button
            class="logout-icon-btn"
            type="button"
            title="Cerrar sesión"
            :aria-label="t('nav.logout')"
            @click="logout"
          >
            <span>🚪</span>
            <span class="logout-text">Salir</span>
          </button>
        </div>
      </header>

      <OfflineBanner />

      <!-- Page Content -->
      <div class="workspace-content-body">
        <slot />
      </div>
    </main>

    <!-- Mobile Fixed Bottom Dock Navigation (Icon + Label) -->
    <nav class="mobile-bottom-dock" aria-label="Navegación móvil">
      <template v-if="role === 'guide'">
        <NuxtLink
          to="/dashboard/guide"
          class="dock-item"
          :class="{ active: (guideTab === 'overview' || !route.query.tab) && route.path === '/dashboard/guide' }"
        >
          <span class="dock-icon">📊</span>
          <span class="dock-label">Resumen</span>
        </NuxtLink>

        <NuxtLink
          to="/dashboard/guide?tab=explorers"
          class="dock-item"
          :class="{ active: guideTab === 'explorers' && route.path === '/dashboard/guide' }"
        >
          <span class="dock-icon">👥</span>
          <span class="dock-label">Hijos</span>
        </NuxtLink>

        <NuxtLink
          to="/dashboard/guide?tab=missions"
          class="dock-item"
          :class="{ active: guideTab === 'missions' && route.path === '/dashboard/guide' }"
        >
          <span class="dock-icon">🎯</span>
          <span class="dock-label">Misiones</span>
        </NuxtLink>

        <NuxtLink
          to="/dashboard/guide?tab=rewards"
          class="dock-item"
          :class="{ active: guideTab === 'rewards' && route.path === '/dashboard/guide' }"
        >
          <span class="dock-icon">🎁</span>
          <span class="dock-label">Premios</span>
        </NuxtLink>

        <NuxtLink
          to="/profile"
          class="dock-item"
          :class="{ active: isProfile || isBilling }"
        >
          <span class="dock-icon">👤</span>
          <span class="dock-label">Perfil</span>
        </NuxtLink>
      </template>

      <template v-else-if="role === 'explorer'">
        <NuxtLink
          to="/dashboard/explorer"
          class="dock-item"
          :class="{ active: section === 'explorer' }"
        >
          <span class="dock-icon">🎯</span>
          <span class="dock-label">Misiones</span>
        </NuxtLink>

        <NuxtLink
          to="/profile"
          class="dock-item"
          :class="{ active: isProfile }"
        >
          <span class="dock-icon">👤</span>
          <span class="dock-label">Mi Perfil</span>
        </NuxtLink>
      </template>

      <template v-else>
        <NuxtLink
          to="/dashboard/admin"
          class="dock-item"
          :class="{ active: section === 'admin' }"
        >
          <span class="dock-icon">🏢</span>
          <span class="dock-label">Nidos</span>
        </NuxtLink>

        <NuxtLink
          to="/profile"
          class="dock-item"
          :class="{ active: isProfile }"
        >
          <span class="dock-icon">👤</span>
          <span class="dock-label">Perfil</span>
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>

<style scoped>
.app-shell-container {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 24px 18px;
  background: #ffffff;
  border-right: 1.5px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  z-index: 20;
}

.shell-brand {
  margin-bottom: 28px;
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.side-nav a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 12px;
  color: #475569;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.side-nav a:hover {
  background: #f0fdfa;
  color: #0d9488;
}

.side-nav a.active {
  background: #ccfbf1;
  color: #0f766e;
  font-weight: 800;
}

/* Workspace Area */
.workspace-area {
  min-width: 0;
  width: 100%;
  padding: clamp(18px, 3vw, 36px);
  box-sizing: border-box;
}

.workspace-top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.header-titles {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.eyebrow-nest {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 800;
  color: #0d9488;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-page-title {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 900;
  color: #0f172a;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.header-user-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--radius-full);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.user-avatar-mini {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d9488, #059669);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 900;
  display: grid;
  place-items: center;
}

.user-display-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: #334155;
  max-width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-icon-btn:hover {
  background: #fef2f2;
  border-color: #fecaca;
  color: #b91c1c;
}

.workspace-content-body {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

/* Mobile Bottom Dock */
.mobile-bottom-dock {
  display: none;
}

/* ─── Responsive for Tablets & Mobiles (<= 980px) ─── */
@media (max-width: 980px) {
  .app-shell-container {
    grid-template-columns: 1fr;
    display: block;
  }

  .sidebar {
    display: none;
  }

  .workspace-area {
    padding: 14px 12px 92px 12px;
  }

  .workspace-top-header {
    margin-bottom: 16px;
    align-items: flex-start;
  }

  .header-page-title {
    font-size: 1.35rem;
  }

  .user-display-name {
    display: none; /* Keep compact avatar icon on mobile */
  }

  .logout-text {
    display: none;
  }

  .logout-icon-btn {
    padding: 6px 8px;
  }

  /* Fixed Bottom Dock */
  .mobile-bottom-dock {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(255, 255, 255, 0.96);
    border-top: 1px solid #e2e8f0;
    padding: 6px 4px calc(6px + env(safe-area-inset-bottom)) 4px;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-sizing: border-box;
  }

  .dock-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    flex: 1;
    min-width: 0;
    padding: 6px 2px;
    border-radius: 10px;
    text-decoration: none;
    color: #64748b;
    transition: all 0.15s ease;
  }

  .dock-icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  .dock-label {
    font-size: 0.68rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
  }

  .dock-item.active {
    color: #0d9488;
    background: #f0fdfa;
  }

  .dock-item.active .dock-label {
    font-weight: 900;
  }
}
</style>
