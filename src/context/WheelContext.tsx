'use client'

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

type SpinOptions = { targetIndex?: number }
type SpinResult = { index: number }
type SpinExecutor = (options?: SpinOptions) => Promise<SpinResult>

type WheelContextValue = {
  spin: (options?: SpinOptions) => Promise<SpinResult>
  registerExecutor: (executor: SpinExecutor | null) => void
  isSpinning: boolean
  setIsSpinning: (spinning: boolean) => void
  lastResult: SpinResult | null
}

const WheelContext = createContext<WheelContextValue | null>(null)

export function WheelProvider({ children }: { children: React.ReactNode }) {
  const executorRef = useRef<SpinExecutor | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastResult, setLastResult] = useState<SpinResult | null>(null)

  const registerExecutor = useCallback((executor: SpinExecutor | null) => {
    executorRef.current = executor
  }, [])

  const spin = useCallback(async (options?: SpinOptions) => {
    if (!executorRef.current) throw new Error('Wheel executor not registered')
    const result = await executorRef.current(options)
    setLastResult(result)
    return result
  }, [])

  const value = useMemo(
    () => ({ spin, registerExecutor, isSpinning, setIsSpinning, lastResult }),
    [spin, registerExecutor, isSpinning, lastResult]
  )

  return <WheelContext.Provider value={value}>{children}</WheelContext.Provider>
}

export function useWheel() {
  const ctx = useContext(WheelContext)
  if (!ctx) throw new Error('useWheel must be used within WheelProvider')
  return ctx
}


