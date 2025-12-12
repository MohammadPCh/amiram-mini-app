import { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { be } from '@/lib/api/endpoints'
import { getStoredTokens, setStoredTokens } from '@/lib/api/storage'

export function useBackendAuth(initData: string | null) {
  const [ready, setReady] = useState(false)
  const [tokensPresent, setTokensPresent] = useState<boolean>(() => Boolean(getStoredTokens()?.access_token))

  useEffect(() => {
    setTokensPresent(Boolean(getStoredTokens()?.access_token))
  }, [])

  const loginMutation = useMutation({
    mutationFn: async () => {
      if (!initData) throw new Error('Missing Telegram initData')
      const res = await be.auth.telegram(initData)
      setStoredTokens(res.tokens)
      setTokensPresent(true)
      return res
    },
  })

  useEffect(() => {
    let cancelled = false
    async function run() {
      // If we already have tokens, we’re good.
      if (getStoredTokens()?.access_token) {
        if (!cancelled) setReady(true)
        return
      }
      // If we have initData, try to login once automatically.
      if (initData) {
        try {
          await loginMutation.mutateAsync()
        } catch {
          // tokens cleared by mutation or http layer on failure
        }
      }
      if (!cancelled) setReady(true)
    }
    run()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData])

  const isLoggedIn = useMemo(() => Boolean(getStoredTokens()?.access_token), [tokensPresent])

  return {
    ready,
    isLoggedIn,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    login: loginMutation.mutateAsync,
  }
}


