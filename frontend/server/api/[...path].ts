export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const requestUrl = getRequestURL(event)
  const path = String(event.context.params?.path || '').replace(/^\/+/, '')
  const backendApiBase = String(config.backendApiBase || 'http://127.0.0.1:8000/api').replace(/\/$/, '')

  return proxyRequest(event, `${backendApiBase}/${path}${requestUrl.search}`)
})
