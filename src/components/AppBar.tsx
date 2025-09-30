"use client";

import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from "next/image";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import Levels, { Level } from "@/components/ui/LevelCard";
import LevelCard from "@/components/ui/LevelCard";

export const AppBar = () => {
  const { user } = useTelegramUser();
  console.log(user);
  return (
    <div className="py-2.5 px-4">
      <div className="p-2 flex gap-2 items-center border-2 border-base-300 rounded-2xl bg-base-100">
        <ConnectButton />
        <div className="flex flex-1 gap-2 justify-end items-center">
          {/* Telegram Profile Picture */}
          <p className="text-xs font-bold">{user?.username}</p>
          <Image
            src={user?.photo_url || "/images/face-man.svg"}
            alt="Telegram Profile Picture"
            width={36}
            height={36}
            className="rounded-2xl"
          />
        </div>
      </div>
      <LevelCard level={Level.Gold} />
    </div>
  );
};
