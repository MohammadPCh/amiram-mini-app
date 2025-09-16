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
    setIsTelegram(Boolean(tg))
    try {
      tg?.ready?.()
    } catch {}
    const u: TelegramUser | undefined = tg?.initDataUnsafe?.user
    setUser(u ?? null)
  }, [])

  const isAuthenticated = useMemo(() => Boolean(user?.id), [user])

  return { user, isAuthenticated, isTelegram }
}


