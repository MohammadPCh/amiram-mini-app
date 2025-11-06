"use client";

import React from "react";
import Image from "next/image";
import SpinWheelCanvas from "@/components/SpinWheelCanvas";
import { WheelProvider, useWheel } from "@/context/WheelContext";
import { useEffect, useMemo, useState } from "react";

function WheelPageContent() {
    const { spin, isSpinning, lastResult } = useWheel();
    const [showResult, setShowResult] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const segments = useMemo(() => [
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
    ], []);

  useEffect(() => {
    if (lastResult && !isSpinning) setShowResult(true);
  }, [lastResult, isSpinning]);

  useEffect(() => {
    if (showResult) {
      // Short delay to trigger animations on mount
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [showResult]);

  const closeResult = () => setShowResult(false);

  return (
    <div className="rounded-2xl border-2 border-base-300 h-full overflow-hidden overflow-y-auto relative"> {/* Added relative for overlay positioning */}
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

      {showResult && (
        <div 
          className={`fixed inset-0 z-40 transition-all duration-500 ease-out bg-gradient-to-t from-[#F5CF31]/90 to-transparent 
            ${isVisible ? 'opacity-70 translate-y-0 rise-glow' : 'opacity-0 translate-y-full'}`} // Increased opacity for stronger shine, covers content
        />
      )}

      {showResult && lastResult && (
        <div 
          className={`fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-base-300 rounded-t-4xl px-4 py-10 
            transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        >
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