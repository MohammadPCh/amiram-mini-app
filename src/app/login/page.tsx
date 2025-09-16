'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, isTelegram } = useTelegramUser()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) return null

  const botUsername = process.env.NEXT_PUBLIC_TG_BOT_USERNAME
  const telegramDeepLink = botUsername ? `https://t.me/${botUsername}/app` : 'https://t.me'

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-[#0b0f14] text-white p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-[#11161e] border border-white/10 shadow-xl overflow-hidden">
          <div className="px-5 pt-6 pb-4 flex items-center gap-3">
            <div className="shrink-0 rounded-xl bg-white/5 p-2">
              <Image src="/reown.svg" alt="Logo" width={36} height={36} />
            </div>
            <div className="flex-1">
              <div className="text-sm opacity-80">🎉✌️</div>
              <div className="font-bold">امپریم بیت ایر‌دراپ</div>
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="px-5 py-4 space-y-3 text-[13px] leading-6">
            <p>اوه! چه حس خوبی که تو اینجایی! 😍</p>
            <p>من امپریم باتم. اینجا با کلی امتیاز، جایزه نقدی، رمزارز و کلی چیز باورنکردنی دیگه برات منتظر باشه!</p>
            <div className="space-y-1">
              <p>🚀 چه کارایی اینجا می‌تونی انجام بدی؟</p>
              <p>✅ تسک‌های جذاب انجام بده و امتیاز بگیر!</p>
              <p>✅ ماموریت‌های رمضکشی رو کامل کن و جایزه ببر!</p>
              <p>✅ گروهت رو بساز و بچه‌ها رو یکشنبه بیدار باش!</p>
              <p>✅ هر روز کلی چیز بامزه و باحال منتظرته!</p>
            </div>
            <div className="space-y-1">
              <p>🪙 کریپتو واقعی؟ آره واقعیه!</p>
              <p>گل توکن و پول منتظر کساییه که باهام همراه میشن! فقط کافی فعّال باشی و کلی جایزه بگیری!</p>
            </div>
            <div className="space-y-1">
              <p>📌 نوت نزن:</p>
              <p>هر روز اومدی، یعنی هر روز کلی جایزه و هیجان منتظرته! 🔥</p>
            </div>
          </div>
          <div className="px-5 pb-5">
            <a href={telegramDeepLink} target="_blank" rel="noopener noreferrer" className="block w-full text-center rounded-xl bg-[#229ED9] hover:bg-[#1c86ba] transition-colors text-white font-semibold py-3">
              ورود با تلگرام
            </a>
            {!isTelegram && (
              <p className="text-center text-xs opacity-70 mt-2">اگر داخل تلگرام نیستی، روی دکمه بالا بزن تا اپ باز بشه.</p>
            )}
          </div>
        </div>
        <div className="mt-4 h-4 w-full bg-gradient-to-b from-yellow-500/30 to-transparent rounded-b-2xl" />
      </div>
    </div>
  )
}


