"use client";

import { ConnectButton } from "@/components/ConnectButton";
import LevelCard from "@/components/ui/LevelCard";
import EnergyDisplay from "@/components/ui/EnergyDisplay";
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

        <div className="flex flex-1 gap-2 justify-end items-center">
          <EnergyDisplay energy={energy?.energy} loading={isEnergyLoading} />
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
