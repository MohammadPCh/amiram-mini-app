"use client";

import Image from "next/image";
import { useBalance } from "@/hooks/be";

export const WheelBanner = () => {
  const { data, isLoading } = useBalance();
  const balance = data?.balance ?? 0;
  return (
    <div
      className="rounded-2xl p-[2px] overflow-hidden"
      style={{
        background:
          "linear-gradient(45deg, #cba400 0%, #000000 50%,#cba400 100%)",
      }}
    >
      <div className="flex relative gap-2 bg-primary rounded-2xl justify-end overflow-hidden">
        <Image
          src="/images/wheel.svg"
          alt="Wheel"
          width={100}
          height={100}
          className="absolute bottom-0 right-0"
        />
        <div className="flex flex-col gap-2 py-3">
          <div className="flex gap-2 bg-white py-3 px-2 rounded-r-2xl">
            <Image
              src="/images/coins/usdt.svg"
              alt="Coin"
              width={32}
              height={32}
            />
            <div className="text-5xl font-extrabold font-kalame text-[#50AF95] pt-1">
              {isLoading ? "—" : balance.toFixed(3)}
            </div>
          </div>
          <p className="text-2xl font-kalame text-center text-base-300 font-bold">
            گردونه رو بچرخون
            <br />و جایزه ببر
          </p>
        </div>
      </div>
    </div>
  );
};
