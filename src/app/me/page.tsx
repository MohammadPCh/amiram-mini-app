'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import { useWalletInfo } from '@reown/appkit/react'

export default function MePage() {
  const { user, isAuthenticated, isTelegram } = useTelegramUser()
  const router = useRouter()
  const { walletInfo } = useWalletInfo();

  useEffect(() => {
    if (!isTelegram) {
      router.replace('/login')
    }
  }, [isTelegram, router])

  if (!isTelegram) return null
  

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-[#0b0f14] text-white p-6">
      <div className="w-full max-w-md rounded-2xl bg-[#11161e] border border-white/10 shadow-xl p-6">
        <h1 className="text-xl font-bold mb-4">اطلاعات کاربر تلگرام</h1>
        {isAuthenticated ? (
          <div className="space-y-2 text-sm">
            <p>آیدی: {user?.id}</p>
            {user?.first_name && <p>نام: {user.first_name}</p>}
            {user?.last_name && <p>نام خانوادگی: {user.last_name}</p>}
            {user?.username && <p>نام کاربری: @{user.username}</p>}
            {user?.language_code && <p>زبان: {user.language_code}</p>}
            {JSON.stringify(walletInfo)}
          </div>
        ) : (
          <p className="opacity-80">در انتظار دریافت اطلاعات کاربر...</p>
        )}
      </div>
    </div>
  )
}


