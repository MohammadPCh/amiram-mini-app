import React, { FC, HTMLAttributes } from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  image: string;
  level: number;
  points: number;
  rewards: number;
}

export const MyTeam: FC<{
  className?: HTMLAttributes<HTMLDivElement>["className"];
}> = ({ className }) => {
  const team: TeamMember[] = [];
  return (
    <div
      className={`flex flex-col gap-3 justify-center items-center text-center border-2 border-base-300 rounded-2xl p-4 ${className}`}
    >
      <div>تیم من</div>
      <hr className="w-full border-primary" />
      {team.length > 0 ? (
        team.map((item) => (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-base-300 rounded-full"></div>
            <div className="text-base-content">{item.name}</div>
          </div>
        ))
      ) : (
        <div className="p-7">
            <Image src="/images/robot/sad.svg" alt="sad robot" width={100} height={100} className="mx-auto" />
            <hr className="w-full border-primary" />
            <div className="text-base-content py-2">هنوز کسی رو دعوت نکردی</div>
        </div>
      )}
    </div>
  );
};
