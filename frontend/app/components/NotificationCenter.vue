<script setup lang="ts">
const { t } = useI18n()
const { items, unreadCount, fetchNotifications, markRead, notificationText } = useNotifications()
const open = ref(false)

async function toggle() {
  open.value = !open.value

  if (open.value && items.value.length === 0) {
    await fetchNotifications()
  }
}
</script>

<template>
  <div class="notification-center">
    <button class="icon-button notification-trigger" type="button" :aria-label="t('notifications.title')" @click="toggle">
      <span>!</span>
      <em v-if="unreadCount">{{ unreadCount }}</em>
    </button>

    <section v-if="open" class="notification-popover">
      <header>
        <h2>{{ t('notifications.title') }}</h2>
        <button class="icon-button" type="button" :aria-label="t('notifications.close')" @click="open = false">×</button>
      </header>
      <div class="notification-list">
        <article v-for="item in items" :key="item.id" :class="{ unread: !item.read_at }">
          <strong>{{ notificationText(item).title }}</strong>
          <p>{{ notificationText(item).body }}</p>
          <button v-if="!item.read_at" class="text-button" type="button" @click="markRead(item.id)">
            {{ t('notifications.markRead') }}
          </button>
        </article>
      </div>
    </section>
  </div>
</template>
