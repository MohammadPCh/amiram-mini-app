"use client";

import { AppBar } from "@/components/AppBar";
// import { cookieStorage, createStorage, http } from '@wagmi/core'

import ClientGate from "@/components/ClientGate";
import { WalletCoins } from "@/components/WalletCoins";
import { WheelBanner } from "@/components/WheelBanner";
import Image from "next/image";

export default function Home() {
  // Simulate work to show the global loading UI
  // await new Promise((r) => setTimeout(r, 1500));

  return (
    // // <ClientGate>
    //   <div className={"pages"}>
    //     <Image src="/reown.svg" alt="Reown" width={150} height={150} priority />
    //     <h1>AppKit Wagmi Next.js App Router Example</h1>
    //     user: {user?.first_name} {user?.last_name} {user?.username} {user?.language_code}
    //     <ConnectButton />
    //     <ActionButtonList />
    //     <div className="advice">
    //       <p>
    //         This projectId only works on localhost. <br/>Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
    //       </p>
    //     </div>
    //     <InfoList />
    //   </div>
    // // </ClientGate>
    <div className="flex flex-col gap-4">
      <AppBar />
      <WalletCoins />
      <div className="border-base-300 bg-base-200 border-2 rounded-2xl p-4 flex flex-col gap-4">
        <div className="text-2xl font-bold pb-4 border-primary border-b-2 text-center">
          ماموریت بیت
        </div>
        <div>
          <div className="bg-neutral rounded-2xl p-4 flex flex-col gap-4">
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
        <WheelBanner />
      </div>
      <div className="p-2">
        <h1>AppKit Wagmi Next.js App Router Example</h1>
        {/* user: {user?.first_name} {user?.last_name} {user?.username} {user?.language_code} */}
      </div>
    </div>
  );
}
