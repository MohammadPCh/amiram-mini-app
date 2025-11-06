"use client";

import React from "react";
import Image from "next/image";
import SpinWheelCanvas from "@/components/SpinWheelCanvas";
import { WheelProvider, useWheel } from "@/context/WheelContext";

function WheelPageContent() {
  const { spin, isSpinning, lastResult } = useWheel();
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

      <SpinWheelCanvas
        segments={[
          { label: "10 USDT" },
          { label: "1 USDT" },
          { label: "0.1 USDT" },
          { label: "0.01 USDT" },
          { label: "0.001 USDT" },
          { label: "0.0001 USDT" },
          { label: "0.00001 USDT" },
          { label: "0.000001 USDT" },
          { label: "0.0000001 USDT" },
          { label: "0.00000001 USDT" },
        ]}
      />
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
