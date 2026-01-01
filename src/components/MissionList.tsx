"use client";

import { Virtuoso } from "react-virtuoso";
import { useInfiniteMissionsWithStatus } from "@/hooks/useInfiniteMissionsWithStatus";
import { Task } from "./Task";

export function MissionList() {
  const {
    missions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    submitStatus,
  } = useInfiniteMissionsWithStatus();

  if (isLoading) return <div>Loading…</div>;

  return (
    <div className="h-[80vh]">
      <Virtuoso
        data={missions}
        endReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        overscan={200}
        itemContent={(index, mission) => (
          <div className="p-2">
            <Task
              title={mission.title}
              description={mission.description}
              reward={mission.reward_amount}
              rewardSymbol={"usdt"}
              status={mission.status}
              ctaHref={`/missions/${mission.id}`}
              ctaText={
                mission.status === "completed" ? "مشاهده" : "شروع ماموریت"
              }
            />
          </div>
        )}
      />

      {isFetchingNextPage && (
        <div className="text-center py-4 text-sm text-neutral-content">
          در حال بارگذاری...
        </div>
      )}
    </div>
  );
}
