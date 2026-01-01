"use client";

import { Virtuoso } from "react-virtuoso";
import { useInfiniteMissionsWithStatus } from "@/hooks/useInfiniteMissionsWithStatus";
import { Task } from "./Task";
import { useEffect, useMemo } from "react";
import { WheelBanner } from "./WheelBanner";
import { Mission } from "@/lib/api/types";

export function MissionList() {
  const {
    missions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    submitStatus,
  } = useInfiniteMissionsWithStatus();

  useEffect(() => {
    console.log("missions", missions);
  }, [missions]);

  if (isLoading && !missions.length) return <div>Loading…</div>;

  return (
    <div className="h-full">
      <Virtuoso
        data={missions}
        endReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        overscan={200}
        itemContent={(_, item) => {
          if ("type" in item && item.type === "banner") {
            return (
              <div className="p-4">
                <WheelBanner />
              </div>
            );
          }
          const mission = item as Mission;
          return (
            <div className="p-2">
              <Task
                title={mission.title}
                description={mission.description}
                reward={mission.reward_amount}
                energy={mission.reward_energy}
                rewardSymbol="usdt"
                status={mission.status}
                ctaHref={`/missions/${mission.id}`}
                ctaText={
                  mission.status === "completed" ? "مشاهده" : "شروع ماموریت"
                }
              />
            </div>
          );
        }}
      />

      {isFetchingNextPage && (
        <div className="text-center font-kalame py-4 text-sm text-neutral-content">
          در حال بارگذاری...
        </div>
      )}
    </div>
  );
}
