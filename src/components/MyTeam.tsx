"use client";

import React, { FC, HTMLAttributes, useMemo, useState } from "react";
import Image from "next/image";
import BottomSheet from "./BottomSheet";
import TeamMemberDetails from "./TeamMemberDetails";
import { useTeamMembers } from "@/hooks/be";

interface TeamMember {
  id: string;
  name: string;
  image: string;
  level: number;
  points: number;
  rewards: number;
}

export const MyTeam: FC<{
  className?: HTMLAttributes<HTMLDivElement>["className"];
}> = ({ className }) => {
  const { data, isLoading } = useTeamMembers({ page: 1 });
  const team: TeamMember[] = useMemo(() => {
    const members = data?.members ?? [];
    return members.map((m) => ({
      id: String(m.telegram_id),
      name: m.first_name || (m.username ? `@${m.username}` : String(m.telegram_id)),
      image: "/images/face-man.svg",
      level: 0,
      points: m.score,
      rewards: m.balance,
    }));
  }, [data?.members]);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const openMemberDetails = (member: TeamMember) => {
    setSelectedMember(member);
    setIsBottomSheetOpen(true);
  };

  const closeMemberDetails = () => {
    setIsBottomSheetOpen(false);
  };
  return (
    <div
      className={`flex flex-col gap-3 justify-center items-center text-center border-2 border-base-300 rounded-2xl p-4 ${className}`}
    >
      <div>تیم من</div>
      <hr className="w-full border-primary" />
      {isLoading ? (
        <div className="text-sm opacity-70 py-6">در حال دریافت اعضا...</div>
      ) : team.length > 0 ? (
        team.map((item) => (
          <button
            type="button"
            className="w-full flex gap-2 hover:bg-base-200 transition-colors rounded-xl p-2 text-left"
            key={item.id}
            onClick={() => openMemberDetails(item)}
          >
            <div className="flex items-center gap-1 font-bold text-teal-400">
              <span>USDT</span>
              <span className="font-kalame text-2xl leading-none">
                {item.rewards}
              </span>
              <Image
                src="/images/coins/usdt.svg"
                alt="Coin"
                width={24}
                height={24}
              />
            </div>
            <div className="flex gap-1 text-primary font-bold flex-1 items-center flex-row-reverse">
              <div>{item.name}</div>
              <div>|</div>
              <div>امتیاز</div>
              <div>{item.points}</div>
            </div>
            <div className="rounded-xl bg-gray-700 p-2">
              <Image
                src={item.image}
                alt={item.name}
                width={18}
                height={18}
              />
            </div>
          </button>
        ))
      ) : (
        <div className="p-7">
          <Image
            src="/images/robot/sad.svg"
            alt="sad robot"
            width={100}
            height={100}
            className="mx-auto"
          />
          <hr className="w-full border-primary" />
          <div className="text-base-content py-2">هنوز کسی رو دعوت نکردی</div>
        </div>
      )}
      <BottomSheet
        open={isBottomSheetOpen}
        onClose={closeMemberDetails}
        closeOnOverlayClick
        panelClassName="px-6 py-6"
        overlayClassName="bg-gradient-to-t from-[#F5CF31]/90 to-transparent rise-glow"
        overlayVisibleClassName="opacity-70"
        overlayHiddenClassName="opacity-0"
      >
        {selectedMember && (
          <TeamMemberDetails member={selectedMember} onClose={closeMemberDetails} />
        )}
      </BottomSheet>
    </div>
  );
};
