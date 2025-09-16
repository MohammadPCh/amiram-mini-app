'use client'

import React, { useEffect, useState } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { useClientMounted } from '@/hooks/useClientMount'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import { useRouter, usePathname } from 'next/navigation'

const VISITED_STORAGE_KEY = 'app_has_visited'

export default function ClientGate({ children }: { children: React.ReactNode }) {
  const mounted = useClientMounted()
  const { isConnected } = useAppKitAccount()
  const { isAuthenticated } = useTelegramUser()
  const router = useRouter()
  const pathname = usePathname()
  const [hasVisited, setHasVisited] = useState<boolean>(false)

  useEffect(() => {
    if (!mounted) return
    const visitedFlag = typeof window !== 'undefined' ? window.localStorage.getItem(VISITED_STORAGE_KEY) : null
    const visited = visitedFlag === 'true'
    if (!visited && typeof window !== 'undefined') {
      window.localStorage.setItem(VISITED_STORAGE_KEY, 'true')
    }
    setHasVisited(visited)
  }, [mounted])

  if (!mounted) return null

  const unauthenticated = !isAuthenticated
  const shouldRedirectToLogin = unauthenticated && pathname !== '/login'
  const shouldAccessHome = !unauthenticated && isConnected

  if (shouldRedirectToLogin) {
    router.replace('/login')
    return null
  }

  return <>{children}</>
}


