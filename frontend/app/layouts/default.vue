<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const { isAuthenticated, logout, role } = useSession()
const availableLocales = computed(() => locales.value)
</script>

<template>
  <div>
    <header class="site-header">
      <NuxtLink class="brand" to="/">
        <span class="brand-mark">NQ</span>
        <span>{{ t('app.name') }}</span>
      </NuxtLink>

      <nav v-if="!isAuthenticated" class="nav-links" aria-label="Primary">
        <NuxtLink to="/#how">{{ t('nav.how') }}</NuxtLink>
        <NuxtLink to="/#pricing">{{ t('nav.pricing') }}</NuxtLink>
        <NuxtLink to="/#faq">{{ t('nav.faq') }}</NuxtLink>
      </nav>

      <div class="nav-actions">
        <select class="locale-select" :value="locale" aria-label="Language" @change="setLocale(($event.target as HTMLSelectElement).value)">
          <option v-for="item in availableLocales" :key="item.code" :value="item.code">
            {{ item.code }}
          </option>
        </select>
        <NuxtLink v-if="!isAuthenticated" class="button ghost" to="/auth/login">{{ t('nav.login') }}</NuxtLink>
        <NuxtLink v-if="!isAuthenticated" class="button primary" to="/auth/register">{{ t('nav.register') }}</NuxtLink>
        <NuxtLink v-if="isAuthenticated" class="button ghost" :to="role === 'super_admin' ? '/dashboard/admin' : role === 'explorer' ? '/dashboard/explorer' : '/dashboard/guide'">
          {{ t('nav.dashboard') }}
        </NuxtLink>
        <NotificationCenter v-if="isAuthenticated" />
        <button v-if="isAuthenticated" class="icon-button" type="button" :aria-label="t('nav.logout')" @click="logout">
          <span>↗</span>
        </button>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>
