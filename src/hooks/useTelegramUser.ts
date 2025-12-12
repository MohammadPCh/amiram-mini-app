'use client'

import { useEffect, useMemo, useState } from 'react'

type TelegramUser = {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
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
  const [loading, setLoading] = useState<boolean>(true)
  const [initData, setInitData] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let attempts = 0
    const maxAttempts = 50 // ~10s total with 200ms interval
    const intervalMs = 200
    let intervalId: ReturnType<typeof setInterval> | null = null
		let sdkScriptEl: HTMLScriptElement | null = null

    const resolveAndSetUser = () => {
      const tg = (globalThis as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp
      const url = new URL(window.location.href)
      const ua = navigator.userAgent || navigator.vendor

      const byObject = Boolean(tg)
      const byQuery = url.searchParams.has('tgWebAppData') || url.searchParams.has('tgWebAppVersion')
      const byUA = /Telegram/i.test(ua)
      const detectedTelegram = byObject || byQuery || byUA
      setIsTelegram(detectedTelegram)

      // If Telegram not detected yet, keep polling silently (no skeleton shown since isTelegram=false)
      if (!detectedTelegram) {
        if (attempts < maxAttempts) {
          attempts += 1
          return false
        }
        // Give up after max attempts
        setUser(null)
        setLoading(false)
        return true
      }

      // If the Telegram object isn't ready yet, keep waiting
      if (!byObject && !byQuery && attempts < maxAttempts) {
        attempts += 1
        return false
      }

      try {
        tg?.ready?.()
      } catch {}

      // Store raw initData for backend auth
      const rawInitData: string | null =
        (typeof (tg as any)?.initData === 'string' && (tg as any).initData.trim().length > 0
          ? (tg as any).initData
          : null) ??
        (url.searchParams.get('tgWebAppData') ? url.searchParams.get('tgWebAppData') : null)
      setInitData(rawInitData)

      let resolvedUser: TelegramUser | undefined = tg?.initDataUnsafe?.user

      if (!resolvedUser) {
        const tgDataRaw = url.searchParams.get('tgWebAppData')
        if (tgDataRaw) {
          try {
            const params = new URLSearchParams(tgDataRaw)
            const userJson = params.get('user')
            if (userJson) {
              resolvedUser = JSON.parse(userJson) as TelegramUser
            }
          } catch {
            // ignore parse errors
          }
        }
      }

      // Attempt to enrich photo_url if present in initData
      if (resolvedUser && tg?.initDataUnsafe?.user?.photo_url && !resolvedUser.photo_url) {
        resolvedUser.photo_url = tg.initDataUnsafe.user.photo_url
      }

      setUser(resolvedUser ?? null)
      return true
    }

		// Respond immediately when Telegram signals readiness
    const onTelegramReady: EventListener = () => {
      const finished = resolveAndSetUser()
      if (finished) {
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
        setLoading(false)
      }
    }
    document.addEventListener('TelegramWebAppReady', onTelegramReady)

		// If SDK script loads after mount, attempt resolution then
		const onSdkLoaded: EventListener = () => {
			const finished = resolveAndSetUser()
			if (finished) {
				if (intervalId) {
					clearInterval(intervalId)
					intervalId = null
				}
				setLoading(false)
			}
		}
		sdkScriptEl = document.getElementById('telegram-web-app-sdk') as HTMLScriptElement | null
		if (sdkScriptEl) {
			// If the script is already evaluated, resolve immediately; otherwise wait for load
			if ((globalThis as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp) {
				onSdkLoaded(new Event('load'))
			} else {
				sdkScriptEl.addEventListener('load', onSdkLoaded)
			}
		}

    // Try immediately once
    const done = resolveAndSetUser()
    if (!done) {
      intervalId = setInterval(() => {
        const finished = resolveAndSetUser()
        if (finished && intervalId) {
          clearInterval(intervalId)
          intervalId = null
          setLoading(false)
        }
        if (attempts >= maxAttempts && intervalId) {
          clearInterval(intervalId)
          intervalId = null
          setLoading(false)
        }
      }, intervalMs)
    } else {
      setLoading(false)
    }

		return () => {
      document.removeEventListener('TelegramWebAppReady', onTelegramReady)
			if (sdkScriptEl) sdkScriptEl.removeEventListener('load', onSdkLoaded)
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  const isAuthenticated = useMemo(() => Boolean(user?.id), [user])

  return { user, isAuthenticated, isTelegram, loading, initData }
}


