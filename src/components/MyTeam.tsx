'use client';

import React, { FC, HTMLAttributes, useMemo, useState } from "react";
import Image from "next/image";
import BottomSheet from "./BottomSheet";

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
  const team: TeamMember[] = useMemo(
    () => [
      {
        id: "1",
        name: "John Doe",
        image: "/images/team/1.png",
        level: 1,
        points: 100,
        rewards: 100,
      },
      {
        id: "2",
        name: "John Doe",
        image: "/images/team/1.png",
        level: 1,
        points: 1200,
        rewards: 10,
      },
      {
        id: "3",
        name: "John Doe",
        image: "/images/team/1.png",
        level: 1,
        points: 1400,
        rewards: 15,
      },
    ],
    []
  );

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
      {team.length > 0 ? (
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
                src="/images/face-man.svg"
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
          <div className="w-full max-w-md">
            <div className="border-2 border-warning rounded-3xl p-5 text-center mb-5">
              <div className="text-warning font-extrabold text-4xl leading-none">
                {selectedMember.name}
              </div>
              <div className="text-base-content mt-3">
                {selectedMember.points} امتیاز در تیم (در 30 روز اخیر)
              </div>
            </div>

            <div className="border border-base-300 rounded-2xl p-5 bg-base-100/10">
              <div className="flex items-center justify-between py-2">
                <div className="text-right text-base-content font-bold">
                  حجم معامله:
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-success">+1 $</span>
                  <span className="opacity-60">|</span>
                  <span className="text-warning">+100 S</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="text-right text-base-content font-bold">
                  اولین معامله 100 دلاری:
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-success">+3 $</span>
                  <span className="opacity-60">|</span>
                  <span className="text-warning">+400 S</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="text-right text-base-content font-bold">
                  اولین معامله 200 دلاری:
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-success">+4 $</span>
                  <span className="opacity-60">|</span>
                  <span className="text-warning">+500 S</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-5">
                <div className="text-right text-lg font-extrabold text-base-content">
                  مجموع سود برای شما:
                </div>
                <div className="flex items-center gap-2 text-teal-400">
                  <Image
                    src="/images/coins/usdt.svg"
                    alt="USDT"
                    width={28}
                    height={28}
                  />
                  <span className="font-kalame text-2xl leading-none">
                    +{selectedMember.rewards} USDT
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-warning w-full mt-6 rounded-2xl text-lg"
              onClick={closeMemberDetails}
            >
              بستن
            </button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};
