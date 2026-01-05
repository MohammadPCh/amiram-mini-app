"use client";

import React from "react";
import Image from "next/image";
import SpinWheelCanvas from "@/components/SpinWheelCanvas";
import { WheelProvider, useWheel } from "@/context/WheelContext";
import { useEffect, useMemo, useState } from "react";
import BottomSheet from "@/components/BottomSheet";
import { useWheelConfig, useWheelSpin } from "@/hooks/be";

function WheelPageContent() {
  const { spin, isSpinning, lastResult } = useWheel();
  const [showResult, setShowResult] = useState(false);
  const { data: configData, isLoading: configLoading } = useWheelConfig();
  const wheelSpin = useWheelSpin();
  const [remainingEnergy, setRemainingEnergy] = useState<number | null>(null);
  const [lastReward, setLastReward] = useState<{
    reward_type: string;
    reward_amount: number;
  } | null>(null);

  const segments = useMemo(() => {
    const configs = configData?.configs ?? [];
    if (configs.length === 0) return [];
    return configs.map((c, i) => ({
      label: `${c.reward_amount} ${
        c.reward_type === "energy" ? "Energy" : c.reward_type
      }`,
      color: i % 2 === 0 ? "#1C2737" : "#FFFFFF",
      payload: c,
    }));
  }, [configData?.configs]);

  useEffect(() => {
    if (lastResult && !isSpinning) setShowResult(true);
  }, [lastResult, isSpinning]);

  useEffect(() => {
    // No-op kept for potential future side-effects
  }, [showResult]);

  return (
    <div className="w-full rounded-2xl border-2 border-base-300 h-full overflow-hidden overflow-y-auto relative">
      {" "}
      {/* Added relative for overlay positioning */}
      <div className="text-center font-kalame font-black mt-6">
        <div className="text-5xl">گردونه رو</div>
        <div className="text-8xl text-primary -mt-4">بچرخون</div>
      </div>
      <div className="mt-12">
        <button
          onClick={async () => {
            try {
              const res = await wheelSpin.mutateAsync();
              setLastReward({
                reward_type: res.reward_type,
                reward_amount: res.reward_amount,
              });
              setRemainingEnergy(res.remaining_energy);
              const idx = segments.findIndex((s) => {
                const label = s.label.toLowerCase();
                const wantType = res.reward_type.toLowerCase();
                return (
                  label.includes(String(res.reward_amount)) &&
                  label.includes(wantType)
                );
              });
              await spin({ targetIndex: idx >= 0 ? idx : undefined });
            } catch (e) {
              console.error(e);
            }
          }}
          disabled={
            isSpinning ||
            wheelSpin.isPending ||
            segments.length === 0 ||
            (typeof remainingEnergy === "number" && remainingEnergy <= 0)
          }
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
            <span className="text-sm text-primary">
              {remainingEnergy === null ? "—" : remainingEnergy}
            </span>
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
      {configLoading ? (
        <div className="mt-10 text-center text-sm opacity-70">
          در حال دریافت تنظیمات گردونه...
        </div>
      ) : (
        <SpinWheelCanvas segments={segments} />
      )}
      <BottomSheet
        open={showResult}
        overlayClassName="bg-gradient-to-t from-[#F5CF31]/90 to-transparent rise-glow"
        overlayVisibleClassName="opacity-70"
        overlayHiddenClassName="opacity-0"
        closeOnOverlayClick={true}
        onClose={() => setShowResult(false)}
      >
        {lastResult && (
          <>
            <div className="text-center font-kalame font-black mt-6">
              <div className="text-5xl">با گردونه</div>
              <div className="text-8xl text-primary -mt-4">برنده شدی</div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="font-black font-kalame text-8xl text-[#50AF95]">
                {lastReward
                  ? `${lastReward.reward_amount} ${
                      lastReward.reward_type === "energy"
                        ? "Energy"
                        : lastReward.reward_type
                    }`
                  : segments[lastResult.index]?.label ?? ""}
              </div>
            </div>
            <button className="flex bg-primary rounded-t-xl py-4 text-center justify-center items-center gap-4 w-full">
              <div className="text-base font-bold text-primary-content">
                دریافت جایزه
              </div>
            </button>
          </>
        )}
      </BottomSheet>
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
