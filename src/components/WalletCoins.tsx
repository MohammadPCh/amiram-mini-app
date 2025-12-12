"use client";

import Image from "next/image";
import { useBalance } from "@/hooks/be";

export const WalletCoins = () => {
  const { data, isLoading } = useBalance();
  const balance = data?.balance ?? 0;
  return (
    <div
      className="p-2.5 border-2 border-primary rounded-2xl bg-base-100 flex flex-col gap-4"
      style={{
        backgroundImage: "url('/images/bg/card-bg.svg')",
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <div className="py-2 px-2.5 flex gap-2 items-center justify-center">
        <Image src="/images/coins/usdt.svg" alt="Coin" width={32} height={32} />
        <div className="text-5xl font-extrabold font-kalame text-[#50AF95] pt-1">
          {isLoading ? "—" : balance.toFixed(3)}
        </div>
      </div>
      <div className="text-neutral-content text-center">
        <p>
          با انجام اولین ماموریت &nbsp;
          <span className="text-primary font-bold">پول در آوردن</span>
          <br />
          رو شـــــــــروع کن!
        </p>
      </div>
    </div>
  );
};
