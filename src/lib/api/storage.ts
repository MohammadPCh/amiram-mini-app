import type { JwtTokens } from './types'

const STORAGE_KEY = 'be_tokens'

export function getStoredTokens(): JwtTokens | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as JwtTokens
  } catch {
    return null
  }
}

export function setStoredTokens(tokens: JwtTokens | null) {
  if (typeof window === 'undefined') return
  try {
    if (!tokens) {
      window.localStorage.removeItem(STORAGE_KEY)
      return
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
  } catch {
    // ignore
  }
}


