import React from 'react'
import Image from "next/image";

export const Task = () => {
    return (
        <div className='flex items-end'>
            <div className='min-w-6 min-h-6 rounded-lg bg-neutral'></div>
            <div className='min-w-6 min-h-6 bg-neutral relative overflow-hidden'>
                <div className='absolute -top-6 left-0 w-12 h-12 bg-base-200 rounded-full'></div>
            </div>
            <div className="bg-neutral rounded-2xl rounded-br-none p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <p className="text-primary">یکی از دوستات رو دعوت کن!</p>
                    <div className="flex gap-1 items-center justify-end flex-1">
                        <div className="font-bold text-[#50AF95] pt-1">12.32</div>
                        <Image
                            src="/images/coins/usdt.svg"
                            alt="Coin"
                            width={18}
                            height={18}
                        />
                    </div>
                </div>
                <div className="text-sm text-neutral-content">
                    با یک دعوت می تونی ۱۰ دلار به دست بیاری فقط لینک خودتو برای دوستت
                    بفرست.
                </div>
                <div className="flex gap-2 items-center">
                    <button className="flex-1 rounded-lg bg-primary py-1.5 px-3 text-primary-content">
                        ارسال لینک دعوت
                    </button>
                    <div className="flex items-center">
                        <Image
                            src="/images/spark1.png"
                            alt="Coin"
                            width={28}
                            height={28}
                        />
                        <div className="text-primary">۱+</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
