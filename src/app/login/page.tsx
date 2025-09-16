'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, isTelegram, user } = useTelegramUser()

  useEffect(() => {
    if (isTelegram) {
      router.replace('/me')
      return
    }
    if (isAuthenticated) {
      router.replace('/')
    }
  }, [isTelegram, isAuthenticated, router])

  if (isAuthenticated) return null

  const botUsername = process.env.NEXT_PUBLIC_TG_BOT_USERNAME
  const telegramDeepLink = botUsername ? `https://t.me/${botUsername}/app` : 'https://t.me'

  return (
    <div className="relative min-h-dvh w-full bg-[#0b0f14] text-white overflow-hidden">
      <div className="absolute inset-x-0 bottom-0">
        <Image src="/images/wave.svg" alt="" width={1440} height={200} className="w-full h-auto pointer-events-none select-none" />
      </div>
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md relative">
          <Image src="/images/robot.svg" alt="Robot" width={240} height={240} priority className="mx-auto relative z-10 drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]" />
          <div className="mt-[-80px] rounded-2xl bg-[#11161e] border border-white/10 shadow-xl overflow-hidden">
            <div className="px-5 pt-12 pb-3 text-center">
              <div className="text-sm opacity-80">🎉✌️</div>
              <div className="text-5xl sm:text-6xl font-extrabold leading-tight mt-1 [text-shadow:0_4px_0_rgba(0,0,0,0.4)]">
                <div>خوش</div>
                <div>اومدی؟</div>
              </div>
              <div className="font-bold mt-1">امپریم بیت ایر‌دراپ</div>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="px-5 py-5 space-y-3 text-[12.5px] leading-6 text-white/85">
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
            <div>
            user: {user?.first_name} {user?.last_name} {user?.username} {user?.language_code}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


