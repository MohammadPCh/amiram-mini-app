"use client";

import { ConnectButton } from "@/components/ConnectButton";
import LevelCard from "@/components/ui/LevelCard";
import { useLevel } from "@/hooks/be";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import TelegramProfile from "./ui/TelegramProfile";

export const AppBar = () => {
  const { user, loading, isTelegram } = useTelegramUser();
  const { data: userLevel, isLoading: userLevelIsLoading } = useLevel();

  return (
    <div className="mx-4 py-2.5 px-4">
      <div className="p-2 flex gap-2 items-center border-2 border-base-300 rounded-2xl glass">
        <ConnectButton />
        <div className="flex flex-1 gap-2 justify-end items-center">
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
