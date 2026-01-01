"use client";

import { AppBar } from "@/components/AppBar";
// import { cookieStorage, createStorage, http } from '@wagmi/core'

import ClientGate from "@/components/ClientGate";
import { Task } from "@/components/Task";
import { WalletCoins } from "@/components/WalletCoins";
import { WheelBanner } from "@/components/WheelBanner";
import SpinWheel from "@/components/SpinWheel";
import { useWalletInfo } from "@reown/appkit/react";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import { MissionList } from "@/components/MissionList";

export default function Home() {
  // Simulate work to show the global loading UI
  // await new Promise((r) => setTimeout(r, 1500));
  const { walletInfo } = useWalletInfo();
  const { initData } = useTelegramUser();

  return (
    // <ClientGate>
    <div className="flex flex-col gap-4">
      <WalletCoins />
      <div className="border-base-300 bg-base-200 border-2 rounded-2xl p-4 flex flex-col gap-4">
        <div className="text-2xl font-bold pb-4 border-primary border-b-2 text-center">
          ماموریت بیت
        </div>
        {/* <Task /> */}
        <MissionList />
        <WheelBanner />
      </div>
      <div className="wrap-anywhere">{initData}</div>
      {/* <div className="p-2">
        <h1>AppKit Wagmi Next.js App Router Example</h1>
        {JSON.stringify(walletInfo)}
      </div> */}
    </div>
    // </ClientGate>
  );
}
