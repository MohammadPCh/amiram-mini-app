"use client";

import { MissionList } from "@/components/MissionList";
import { WalletCoins } from "@/components/WalletCoins";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import { useWalletInfo } from "@reown/appkit/react";

export default function Home() {
  const { walletInfo } = useWalletInfo();
  const { initData } = useTelegramUser();

  return (
    <div className="w-full flex flex-col shrink-0 gap-4 overflow-y-hidden">
      <WalletCoins />
      <div className="w-full border-base-300 bg-base-200 border-2 rounded-2xl p-4 flex flex-1 shrink-0 flex-col gap-4">
        <div className="text-2xl font-bold pb-4 border-primary border-b-2 text-center">
          ماموریت بیت
        </div>
        <MissionList />
      </div>
    </div>
  );
}
