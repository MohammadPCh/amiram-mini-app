"use client";

import { ConnectButton } from "@/components/ConnectButton";
import LevelCard from "@/components/ui/LevelCard";
import { useEnergy, useLevel } from "@/hooks/be";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import TelegramProfile from "./ui/TelegramProfile";

export const AppBar = () => {
  const { user, loading, isTelegram } = useTelegramUser();
  const { data: userLevel, isLoading: userLevelIsLoading } = useLevel();
  const { data: energy, isLoading: isEnergyLoading } = useEnergy();

  return (
    <div className="mx-4 py-2.5 px-4">
      <div className="p-2 flex gap-2 items-center border-2 border-base-300 rounded-2xl glass">
        <ConnectButton />
        <div className="flex flex-1 gap-2 justify-end items-cener">
          <div className="flex gap-1 flex-nowrap items-center">
            <p className="font-kalame text-primary text-base">
              {energy?.energy}
            </p>
            <img
              src="/images/icons/energy.svg"
              width={16}
              height={22}
              alt="energy"
            />
          </div>
          <TelegramProfile
            user={user}
            loading={loading}
            isTelegram={isTelegram}
          />
        </div>
      </div>
      <LevelCard level={userLevel?.level} loaded={!userLevelIsLoading} />
    </div>
  );
};
