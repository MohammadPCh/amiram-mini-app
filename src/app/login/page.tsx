'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import Image from 'next/image'

export default function LoginPage() {
  // const router = useRouter()
  const { isAuthenticated, isTelegram, user } = useTelegramUser()

  // useEffect(() => {
  //   if (isTelegram) {
  //     router.replace('/me')
  //     return
  //   }
  //   if (isAuthenticated) {
  //     router.replace('/')
  //   }
  // }, [isTelegram, isAuthenticated, router])

  if (isAuthenticated) return null

  const botUsername = process.env.NEXT_PUBLIC_TG_BOT_USERNAME
  const telegramDeepLink = botUsername ? `https://t.me/${botUsername}/app` : 'https://t.me'

  return (
    <div className='flex flex-col gap-2'>
      <div className='p-6'></div>
      <div className='p-6 flex gap-2'>
        <div className='w-1/2 text-primary flex flex-col items-center text-6xl pt-4 font-kalame font-black' style={{ lineHeight: 0.7 }}>
          <h1>خوش</h1>
          <h1>اومــــــــدی</h1>
        </div>
        <div className='w-1/2'>
          <Image src="/images/robot.svg" alt="Robot" width={240} height={240} priority className="mx-auto relative z-10 drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]" />
        </div>
      </div>
      <div className='relative z-10 -mt-14 border-base-300 border rounded-2xl backdrop-blur-sm p-4 text-lg'>
        <p className='text-2xl font-bold border-primary border-b text-center pb-4'>امپریم بیت ایر‌دراپ 🎉✌️</p>
        <p className='pt-4'>اوه! چه حس خوبی که تو اینجایی! 😍</p>
        <br />
        <p>من امیرم باتم. اینجام تا کلی امتیاز، جایزه نقدی، رمزارز و کلی چیز باورنکردنی دیگر برات داشته باشه!</p>
        <br />
        <div className="space-y-1">
          <p>🚀 چه کارایی اینجا می‌تونی انجام بدی؟</p>
          <p>✅ تسک‌های جذاب انجام بده و امتیاز بگیر!</p>
          <p>✅ ماموریت‌های رمزگشایی رو کامل کن و جایزه ببر!</p>
          <p>✅ گردونه شانس رو بچرخون و یک‌شبه پولدار شو!</p>
          <p>✅ هر روز کلی چیز جدید و باحال منتظرته!</p>
        </div>
        <br />
        <div className="space-y-1">
          <p>💰 کریپتو رایگان؟ آره واقعیه!</p>
          <p>کلی توکن و پول منتظر کساییه که با ما همراه میشن!</p>
          <p>فقط کافیه فعال باشی و کلی جایزه ببری!</p>
        </div>
        <br />
        <div className="space-y-1">
          <p>📌 یادت نره:</p>
          <p>هر روز سر بزن، چون هر روز کلی جایزه و هیجان منتظرته!</p>
          <p>🔥 امیربیت — ثروت تو از همینجا شروع میشه! 🔥</p>
        </div>
        <div className='py-6'>
          <a href={telegramDeepLink} target="_blank" rel="noopener noreferrer" className="block w-full text-center rounded-2xl bg-secondary hover:bg-secondary/80 transition-colors text-white font-semibold py-3">
            ورود با تلگرام
          </a>
        </div>
      </div>
    </div>
  )
}