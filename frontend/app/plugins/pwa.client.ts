export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const { setupInstallPrompt } = usePwa()
    setupInstallPrompt()
  }
})
