"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useInviteLink, useTeamLevel } from "@/hooks/be";

export const InviteBox = () => {
  const { data: inviteData, isLoading } = useInviteLink();
  const { data: teamLevel } = useTeamLevel();
  const [copied, setCopied] = useState(false);

  const inviteLink = inviteData?.invite_link ?? "";
  const scoreNeeded = teamLevel?.score_needed ?? null;
  const coefficient = teamLevel?.level?.coefficient ?? null;

  const handleInvite = useCallback(async () => {
    if (!inviteLink) return;
    const tg = (globalThis as unknown as { Telegram?: { WebApp?: any } }).Telegram?.WebApp;
    try {
      // Prefer Telegram-native open if available
      if (tg?.openTelegramLink) {
        tg.openTelegramLink(inviteLink);
        return;
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (e) {
      console.error(e);
    }
  }, [inviteLink]);

  return (
    <div
      className="flex flex-col gap-3 justify-center items-center text-center border-2 border-primary rounded-2xl py-4"
      style={{
        backgroundImage: "url('/images/bg/card-bg.svg')",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="w-full px-7">
        <button
          className="w-full bg-yellow-400 text-black rounded-md py-2 cursor-pointer disabled:opacity-60"
          onClick={handleInvite}
          disabled={isLoading || !inviteLink}
        >
          {copied ? "کپی شد!" : "ارسال لینک دعوت"}
        </button>
      </div>

      <div className="w-full flex items-center justify-center gap-6 px-6">
        <div className="flex items-center gap-3 text-teal-400">
          <Image
            src="/images/coins/usdt.svg"
            alt="Coin"
            width={32}
            height={32}
          />
          <span className="font-kalame font-black text-5xl leading-none">
            5.00
          </span>
        </div>
        <div className="h-8 w-px bg-yellow-500/40" />
        <div className="flex items-center justify-center text-yellow-300">
          <Image src="/images/spark2.png" alt="Coin" width={36} height={36} />
          <span className="font-kalame text-2xl font-bold">
            {teamLevel?.members_count ?? 0}+
          </span>
        </div>
      </div>

      <div className="w-full px-6 pt-1 text-base">
        <span className="text-yellow-400 text-base font-bold align-middle">
          {scoreNeeded === null ? "—" : scoreNeeded.toLocaleString("fa-IR")}
        </span>
        &nbsp;
        <span>امتیاز تا سطح بعدی و ضریب</span>
        &nbsp;
        <span className="text-yellow-400 text-base font-bold align-middle">
          {coefficient === null ? "—" : `${coefficient}x`}
        </span>
        &nbsp;
        <span>جوایز</span>
      </div>
    </div>
  );
};
