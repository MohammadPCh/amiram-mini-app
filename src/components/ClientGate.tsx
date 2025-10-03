'use client'

import React, { useEffect } from 'react'
// import { useAppKitAccount } from '@reown/appkit/react'
import { useClientMounted } from '@/hooks/useClientMount'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import { useRouter, usePathname } from 'next/navigation'

const VISITED_STORAGE_KEY = 'app_has_visited'

export default function ClientGate({ children }: { children: React.ReactNode }) {
  const mounted = useClientMounted()
  // const { isConnected } = useAppKitAccount()
  const { isAuthenticated, isTelegram } = useTelegramUser()
  const router = useRouter()
  const pathname = usePathname()
  // const [hasVisited, setHasVisited] = useState<boolean>(false)

  useEffect(() => {
    if (!mounted) return
    const visitedFlag = typeof window !== 'undefined' ? window.localStorage.getItem(VISITED_STORAGE_KEY) : null
    const visited = visitedFlag === 'true'
    if (!visited && typeof window !== 'undefined') {
      window.localStorage.setItem(VISITED_STORAGE_KEY, 'true')
    }
    // setHasVisited(visited)
  }, [mounted])

  const unauthenticated = !isAuthenticated
  const shouldRedirectToLogin = unauthenticated && pathname !== '/login'
  // const shouldAccessHome = !unauthenticated && isConnected

  useEffect(() => {
    if (!mounted) return
    if (shouldRedirectToLogin) {
      router.replace('/login')
    }
  }, [mounted, shouldRedirectToLogin, router])

  // Telegram UI adjustments: ready, expand, hide back button, confirm on close
  useEffect(() => {
    if (!mounted || !isTelegram) return
    const tg = (globalThis as unknown as { Telegram?: { WebApp?: any } }).Telegram?.WebApp
    if (!tg) return
    try { tg.ready?.() } catch {}
    try { tg.expand?.() } catch {}
    try { tg.BackButton?.hide?.() } catch {}
    try { tg.enableClosingConfirmation?.() } catch {}
  }, [mounted, isTelegram])
  if (!mounted) return null
  if (shouldRedirectToLogin) return null

  return <>{children}</>
}


