import React from "react";
import Image from "next/image";

function RewardRow({
  label,
  dollarReward,
  scoreReward,
}: {
  label: React.ReactNode;
  dollarReward: string;
  scoreReward: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="text-right text-base-content font-bold">{label}</div>
      <div className="flex items-center gap-2 font-bold">
        <span className="text-primary">{scoreReward}</span>
        <span className="opacity-60">|</span>
        <span className="text-teal-400">{dollarReward}</span>
      </div>
    </div>
  );
}

type Member = {
  name: string;
  points: number;
  rewards: number;
};

export default function TeamMemberDetails({
  member,
  onClose,
}: {
  member: Member;
  onClose: () => void;
}) {
  return (
    <div className="w-full max-w-md">
      <div className="text-primary border-2 border-primary rounded-3xl p-5 text-center mb-5">
        <div className=" font-extrabold text-4xl leading-none">
          {member.name}
        </div>
        <div className="font-bold mt-3">
          {member.points} امتیاز در تیم (در 30 روز اخیر)
        </div>
      </div>

      <div className="border border-white/20 rounded-2xl p-5 bg-base-100/10">
        <RewardRow label="حجم معامله:" dollarReward="$ 1+" scoreReward="+100 S" />
        <RewardRow
          label={
            <>
              اولین معامله {(100).toLocaleString("fa-IR")} دلاری:
            </>
          }
          dollarReward="$ 3+"   
          scoreReward="+400 S"
        />
        <RewardRow
          label={
            <>
              اولین معامله {(200).toLocaleString("fa-IR")} دلاری:
            </>
          }
          dollarReward="$ 4+"
          scoreReward="+500 S"
        />
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="text-right text-lg font-extrabold text-base-content">
          مجموع سود برای شما:
        </div>
        <div className="flex items-center gap-2 text-teal-400 font-kalame text-2xl leading-none">
          <span>USDT</span>
          <span className="font-bold">
            {member.rewards}+
          </span>
          <Image
            src="/images/coins/usdt.svg"
            alt="USDT"
            width={28}
            height={28}
          />
        </div>
      </div>

      <button
        type="button"
        className="btn bg-primary w-full mt-6 rounded-t-2xl font-bold py-4 text-base-100"
        onClick={onClose}
      >
        بستن
      </button>
    </div>
  );
}


