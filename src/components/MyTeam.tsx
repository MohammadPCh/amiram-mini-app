import React, { FC, HTMLAttributes } from "react";
import Image from "next/image";

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
  const team: TeamMember[] = [
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
  ];
  return (
    <div
      className={`flex flex-col gap-3 justify-center items-center text-center border-2 border-base-300 rounded-2xl p-4 ${className}`}
    >
      <div>تیم من</div>
      <hr className="w-full border-primary" />
      {team.length > 0 ? (
        team.map((item) => (
          <div className="w-full flex gap-2 " key={item.id}>
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
          </div>
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
    </div>
  );
};
