import React from "react";
import Image from "next/image";
import Link from "next/link";

type TaskProps = {
  title: string;
  description: string;
  reward: number;
  rewardSymbol: string;
  status: string;
  ctaHref: string;
  ctaText: string;
};

export const Task: React.FC<TaskProps> = ({
  title,
  description,
  reward,
  rewardSymbol,
  status,
  ctaHref,
  ctaText,
}) => {
  return (
    <div className="flex items-end">
      <div className="min-w-6 min-h-6 rounded-lg bg-neutral"></div>

      <div className="min-w-6 min-h-6 bg-neutral relative overflow-hidden">
        <div className="absolute -top-6 left-0 w-12 h-12 bg-base-200 rounded-full"></div>
      </div>

      <div className="bg-neutral rounded-2xl rounded-br-none p-4 flex flex-col gap-4 w-full">
        {/* header */}
        <div className="flex items-center gap-2">
          <p className="text-primary">{title}</p>

          <div className="flex gap-1 items-center justify-end flex-1">
            <div className="font-bold text-[#50AF95] pt-1">{reward}</div>

            <Image
              src={`/images/coins/${rewardSymbol}.svg`}
              alt="Coin"
              width={18}
              height={18}
            />
          </div>
        </div>

        <div className="text-sm text-neutral-content">{description}</div>

        {/* footer */}
        <div className="flex gap-2 items-center">
          <Link href={ctaHref}>
            <button className="flex-1 rounded-lg bg-primary py-1.5 px-3 text-primary-content">
              {ctaText}
            </button>
          </Link>

          {/* example badge */}
          <div className="flex items-center gap-1">
            {status === "completed" && (
              <span className="text-success">✓ انجام شد</span>
            )}
            {status === "pending" && (
              <span className="text-warning">در حال انجام</span>
            )}
            {status === "expired" && (
              <span className="text-error">منقضی شده</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
