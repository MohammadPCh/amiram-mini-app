'use client'

import { useEffect, useMemo, useState } from 'react'

type TelegramUser = {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
}

type TelegramInitDataUnsafe = {
  user?: TelegramUser
}

type TelegramWebApp = {
  ready?: () => void
  initDataUnsafe?: TelegramInitDataUnsafe
}

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isTelegram, setIsTelegram] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const tg = (globalThis as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp
    const url = new URL(window.location.href)
    const ua = navigator.userAgent || navigator.vendor

    // Base detection
    const byObject = Boolean(tg)
    const byQuery = url.searchParams.has('tgWebAppData') || url.searchParams.has('tgWebAppVersion')
    const byUA = /Telegram/i.test(ua)
    const detectedTelegram = byObject || byQuery || byUA
    setIsTelegram(detectedTelegram)
    try {
      tg?.ready?.()
    } catch {}
    let u: TelegramUser | undefined = tg?.initDataUnsafe?.user

    // Fallback: parse tgWebAppData
    if (!u) {
      const tgDataRaw = url.searchParams.get('tgWebAppData')
      if (tgDataRaw) {
        try {
          const params = new URLSearchParams(tgDataRaw)
          const userJson = params.get('user')
          if (userJson) {
            const parsed = JSON.parse(userJson) as TelegramUser
            u = parsed
          }
        } catch {
          // ignore parse errors
        }
      }
    }

    setUser(u ?? null)
  }, [])

  const isAuthenticated = useMemo(() => Boolean(user?.id), [user])

  return { user, isAuthenticated, isTelegram }
}


