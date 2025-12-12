export function getTelegramInitData(): string | null {
  if (typeof window === 'undefined') return null

  const tg = (globalThis as unknown as { Telegram?: { WebApp?: any } }).Telegram?.WebApp
  const initData = typeof tg?.initData === 'string' ? tg.initData : null
  if (initData && initData.trim().length > 0) return initData

  // Fallback: Postman doc uses raw init_data-like string. In browser we may receive it as tgWebAppData query param.
  try {
    const url = new URL(window.location.href)
    const fromQuery = url.searchParams.get('tgWebAppData')
    if (fromQuery && fromQuery.trim().length > 0) return fromQuery
  } catch {
    // ignore
  }

  return null
}


