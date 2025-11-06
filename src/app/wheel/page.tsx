"use client";

import React from "react";
import Image from "next/image";
import SpinWheelCanvas from "@/components/SpinWheelCanvas";
import { WheelProvider, useWheel } from "@/context/WheelContext";
import { useEffect, useMemo, useState } from "react";

const segments = [
  { label: "10 USDT" },
  { label: "1 USDT" },
  { label: "0.1 USDT" },
  { label: "0.01 USDT" },
  { label: "0.1 USDT" },
  { label: "1.1 USDT" },
  { label: "1 USDT" },
  { label: "0.01 USDT" },
  { label: "0.1 USDT" },
  { label: "0.01 USDT" },
];

function WheelPageContent() {
  const { spin, isSpinning, lastResult } = useWheel();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (lastResult && !isSpinning) setShowResult(true);
  }, [lastResult, isSpinning]);

  const closeResult = () => setShowResult(false);

  return (
    //     <div className="flex items-center justify-center gap-2 mt-3">
    //   <button
    //     onClick={() => spin()}
    //     disabled={isSpinning}
    //     className="px-3 py-1 rounded bg-primary text-primary-content disabled:opacity-50"
    //   >
    //     {isSpinning ? 'Spinning...' : 'Spin via Context'}
    //   </button>
    //   {lastResult && <span className="text-sm">Result index: {lastResult.index}</span>}
    // </div>
    <div className="rounded-2xl border-2 border-base-300 h-full overflow-hidden">
      <div className="text-center font-kalame font-black mt-6">
        <div className="text-5xl">گردونه رو</div>
        <div className="text-8xl text-primary -mt-4">بچرخون</div>
      </div>
      <div className="mt-12">
        <button
          onClick={() => spin()}
          disabled={isSpinning}
          className="flex bg-primary rounded-t-xl py-4 text-center justify-center items-center gap-4 w-full"
        >
          <div className="text-base font-bold text-primary-content">بچرخون</div>
          <div className="flex bg-black pr-2 rounded-lg items-center justify-center">
            <span className="text-primary">۱-</span>
            <Image
              src="/images/sparkle.png"
              alt="spark"
              width={32}
              height={32}
            />
          </div>
        </button>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="flex items-center justify-center">
            <span className="text-sm text-primary">۵</span>
            <Image
              src="/images/sparkle.png"
              alt="spark"
              width={32}
              height={32}
            />
          </div>
          <div>
            <span className="font-bold">باقی مانده است</span>
          </div>
        </div>
      </div>

      <SpinWheelCanvas segments={segments} />

      {showResult && lastResult && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-base-300 rounded-t-4xl px-4 py-10">
          <div className="text-center font-kalame font-black mt-6">
            <div className="text-5xl">با گردونه</div>
            <div className="text-8xl text-primary -mt-4">برنده شدی</div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="font-black font-kalame text-8xl text-[#50AF95]">
              {segments[lastResult.index]?.label ?? ""}
            </div>
          </div>
          <button className="flex bg-primary rounded-t-xl py-4 text-center justify-center items-center gap-4 w-full">
            <div className="text-base font-bold text-primary-content">
              دریافت جایزه
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

const WheelPage = () => {
  return (
    <WheelProvider>
      <WheelPageContent />
    </WheelProvider>
  );
};

export default WheelPage;
