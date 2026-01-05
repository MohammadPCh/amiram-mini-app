import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import EnergyDisplay from "./ui/EnergyDisplay";
import { Mission } from "@/lib/api/types";
import { useSubmitMission } from "@/hooks/be";

type TaskProps = {
  mission: Mission;
  ctaHref?: string;
  ctaText?: string;
};

export const Task: React.FC<TaskProps> = ({
  mission,
  ctaHref = "#",
  ctaText = "انجام",
}) => {
  const {
    title,
    description,
    reward_amount,
    reward_energy,
    status = "pending",
    expire_at,
    type,
  } = mission;
  const submitMutation = useSubmitMission();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isCompleted = status === "done";
  const isFailed = status === "failed";

  const isExpired = new Date(expire_at).getTime() < Date.now();

  const isEnergyBonus = reward_energy > reward_amount;

  const handleLinkMissionClick = () => {
    if (!ctaHref) return;

    window.open(ctaHref, "_blank");

    // save in localStorage
    localStorage.setItem(`linkMission_${mission.id}`, Date.now().toString());

    timerRef.current = setTimeout(() => {
      submitMutation.mutateAsync({ missionId: mission.id, status: "done" });
      localStorage.removeItem(`linkMission_${mission.id}`);
    }, 5000); // 30 seconds
  };

  // run on mount to check missed missions
  useEffect(() => {
    const timestamp = localStorage.getItem(`linkMission_${mission.id}`);
    if (timestamp) {
      const elapsed = Date.now() - Number(timestamp);
      const remaining = Math.max(5000 - elapsed, 0);
      timerRef.current = setTimeout(() => {
        submitMutation.mutateAsync({ missionId: mission.id, status: "done" });
        localStorage.removeItem(`linkMission_${mission.id}`);
      }, remaining);
    }
  }, [mission.id, submitMutation]);

  return (
    <div className="flex gap-3 items-end relative">
      {/* checkbox */}
      <div
        className={clsx(
          "w-7 h-7 rounded-sm border flex items-center justify-center",
          {
            "bg-success border-success": isCompleted,
            "bg-red-400 border-red-700": isFailed || isExpired,
            "bg-neutral border-neutral-content":
              !isCompleted && !isFailed && !isExpired,
          }
        )}
      >
        {isCompleted && (
          <svg
            viewBox="0 0 20 20"
            className="w-5 h-5 text-success-content fill-current"
          >
            <path d="M7.629 13.314l-3.59-3.59L2.5 11.264l5.129 5.129L17.5 6.522l-1.539-1.539z" />
          </svg>
        )}

        {(isFailed || isExpired) && (
          <svg
            viewBox="0 0 20 20"
            className="w-5 h-5 text-red-900 stroke-current"
          >
            <line
              x1="4"
              y1="10"
              x2="16"
              y2="10"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* card */}
      <div
        className={clsx(
          "bg-neutral rounded-2xl rounded-br-none p-4 flex flex-col gap-3 w-full relative overflow-visible",
          {
            "border-primary border-2": isEnergyBonus,
            "opacity-50": isFailed || isExpired,
          }
        )}
      >
        {/* energy lightning badge */}
        {isEnergyBonus && (
          <div className="absolute -left-3 -top-3">
            <img
              src="/images/icons/energy.svg"
              width={32}
              height={44}
              alt="energy"
            />
          </div>
        )}

        {/* header */}
        <div className="flex items-center gap-2">
          <p
            className={clsx("font-bold", {
              "text-success": isCompleted,
              "text-red-400": isFailed || isExpired,
              "text-primary": !isCompleted && !isFailed && !isExpired,
            })}
          >
            {title}
          </p>

          {/* reward coin */}
          <div className="flex gap-1 items-center justify-end flex-1">
            <div className="font-bold text-[#50AF95] pt-1">{reward_amount}</div>

            <Image
              src={`/images/coins/usdt.svg`}
              alt="Coin"
              width={18}
              height={18}
            />
          </div>
        </div>

        <div className="text-sm text-neutral-content leading-6">
          {description}
        </div>

        {/* footer actions */}
        <div className="flex w-full gap-2 items-center">
          {isCompleted && (
            <button className="text-success bg-base-100 flex-1 rounded-lg py-1.5 px-3 text-center">
              انجام شد :)
            </button>
          )}

          {status === "pending" && !isExpired && (
            <>
              {type === "link" ? (
                <button
                  onClick={handleLinkMissionClick}
                  className="flex-1 rounded-lg bg-primary py-1.5 px-3 text-primary-content"
                >
                  {ctaText}
                </button>
              ) : (
                <button className="flex-1 rounded-lg bg-primary py-1.5 px-3 text-primary-content">
                  {ctaText}
                </button>
              )}
            </>
          )}

          {isFailed && (
            <button className="text-error bg-base-100 flex-1 rounded-lg py-1.5 px-3">
              انجام نشد
            </button>
          )}

          {isExpired && (
            <button
              className="text-red-500 bg-base-100 flex-1 rounded-lg py-1.5 px-3"
              disabled
            >
              تمام شد ):
            </button>
          )}

          <EnergyDisplay energy={reward_energy} />
        </div>
      </div>
    </div>
  );
};
