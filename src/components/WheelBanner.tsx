"use client";

import Image from "next/image";

export const WheelBanner = () => {
  return (
    <div
      className="rounded-2xl p-[2px] mb-6 overflow-hidden"
      style={{
        background: 'linear-gradient(45deg, #cba400 0%, #000000 50%,#cba400 100%)',
      }}
    >
      <div className="flex gap-2 bg-primary rounded-2x justify-between">
        <Image src="/images/wheel.svg" alt="Wheel" width={140} height={140} className="mt-6" />
        <div className="flex flex-col gap-2 py-6">
          <div className="flex gap-2 bg-white py-3 px-2 rounded-r-2xl">
            <Image src="/images/coins/usdt.svg" alt="Coin" width={32} height={32} />
            <div className="text-5xl font-extrabold font-kalame text-[#50AF95] pt-1">
             36.000
            </div>
          </div>
          <p className="text-2xl font-kalame text-center text-base-300 font-bold">
            گردونه رو بچرخون
            <br />
            و جایزه ببر
          </p>
        </div>
      </div>
    </div>
  );
};
