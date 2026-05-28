export default defineNuxtPlugin(() => {
  const { setupInstallPrompt } = usePwa()
  setupInstallPrompt()
})
