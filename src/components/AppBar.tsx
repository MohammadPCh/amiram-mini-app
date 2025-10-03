"use client";

import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from "next/image";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import Levels, { Level } from "@/components/ui/LevelCard";
import LevelCard from "@/components/ui/LevelCard";
import Link from "next/link";

export const AppBar = () => {
  const { user, loading, isTelegram } = useTelegramUser();
  console.log(user);
  return (
    <div className="py-2.5 px-4">
      <div className="p-2 flex gap-2 items-center border-2 border-base-300 rounded-2xl bg-base-100">
        <ConnectButton />
        <div className="flex flex-1 gap-2 justify-end items-center">
          {/* Telegram Profile Placeholder while loading */}
          {isTelegram && loading ? (
            <>
              <div className="h-4 w-20 rounded bg-base-200 animate-pulse" />
              <div className="h-9 w-9 rounded-2xl bg-base-200 animate-pulse" />
            </>
          ) : (
            <Link href="/me">
              <p className="text-xs font-bold">{user?.username}</p>
              <img
                src={user?.photo_url || "/images/face-man.svg"}
                alt="Telegram Profile Picture"
                width={36}
                height={36}
                className="rounded-2xl w-9 h-9"
              />
            </Link>
          )}
        </div>
      </div>
      <LevelCard level={Level.Gold} />
    </div>
  );
};
