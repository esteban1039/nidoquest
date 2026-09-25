<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const { isAuthenticated, logout, role } = useSession()
const route = useRoute()

const availableLocales = computed(() => {
  const list = unref(locales)
  return Array.isArray(list) ? list : []
})

const isAuthPage = computed(() => route.path.startsWith('/auth'))
const isLogin = computed(() => route.path === '/auth/login')
const isRegister = computed(() => route.path === '/auth/register')
</script>

<template>
  <div class="app-root-layout">
    <header class="site-header" :class="{ 'auth-header': isAuthPage }">
      <NuxtLink class="brand" to="/">
        <span class="brand-mark">NQ</span>
        <span class="brand-name">{{ t('app.name') }}</span>
      </NuxtLink>

      <!-- Standard landing navigation (only when not on auth pages and not logged in) -->
      <nav v-if="!isAuthenticated && !isAuthPage" class="nav-links" aria-label="Primary">
        <NuxtLink to="/#how">{{ t('nav.how') }}</NuxtLink>
        <NuxtLink to="/#pricing">{{ t('nav.pricing') }}</NuxtLink>
        <NuxtLink to="/#faq">{{ t('nav.faq') }}</NuxtLink>
      </nav>

      <div class="nav-actions">
        <!-- Compact Language Picker -->
        <div class="locale-select-wrap">
          <select
            class="locale-select-compact"
            :value="locale"
            aria-label="Language"
            @change="setLocale(($event.target as HTMLSelectElement).value)"
          >
            <option v-for="item in availableLocales" :key="item.code" :value="item.code">
              {{ item.code === 'es-LATAM' ? '🌐 ES' : item.code === 'en' ? '🌐 EN' : item.code === 'fr' ? '🌐 FR' : item.code }}
            </option>
          </select>
        </div>

        <!-- Auth page specific contextual navigation -->
        <template v-if="isAuthPage">
          <NuxtLink v-if="isLogin" class="button primary small auth-nav-btn" to="/auth/register">
            <span>✨ {{ t('auth.create') }}</span>
          </NuxtLink>
          <NuxtLink v-else-if="isRegister" class="button ghost small auth-nav-btn" to="/auth/login">
            <span>🔑 {{ t('nav.login') }}</span>
          </NuxtLink>
          <NuxtLink v-else class="button ghost small auth-nav-btn" to="/auth/login">
            <span>← {{ t('nav.login') }}</span>
          </NuxtLink>
        </template>

        <!-- General non-auth actions -->
        <template v-else-if="!isAuthenticated">
          <NuxtLink class="button ghost small nav-login-btn" to="/auth/login">{{ t('nav.login') }}</NuxtLink>
          <NuxtLink class="button primary small nav-register-btn" to="/auth/register">{{ t('nav.register') }}</NuxtLink>
        </template>

        <!-- Authenticated actions -->
        <template v-else>
          <NuxtLink class="button ghost small" :to="role === 'super_admin' ? '/dashboard/admin' : role === 'explorer' ? '/dashboard/explorer' : '/dashboard/guide'">
            {{ t('nav.dashboard') }}
          </NuxtLink>
          <NotificationCenter />
          <button class="icon-button" type="button" :aria-label="t('nav.logout')" @click="logout">
            <span>↗</span>
          </button>
        </template>
      </div>
    </header>

    <main>
      <OfflineBanner />
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-root-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.locale-select-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.locale-select-compact {
  min-height: 38px;
  height: 38px;
  padding: 0 10px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #334155;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.locale-select-compact:focus {
  outline: none;
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
}

.auth-nav-btn {
  font-weight: 800;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .site-header {
    min-height: 60px;
    padding: 10px 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    width: auto;
  }

  .brand-name {
    font-size: 1.05rem;
  }

  .locale-select-compact {
    min-height: 34px;
    height: 34px;
    padding: 0 6px;
    font-size: 0.76rem;
  }

  .auth-nav-btn,
  .nav-login-btn,
  .nav-register-btn {
    padding: 6px 10px;
    font-size: 0.78rem;
    min-height: 34px;
  }
}
</style>
