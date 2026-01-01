"use client";

import {
  useInfiniteQuery,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { be } from "@/lib/api/endpoints";
import { beKeys, useSubmitMission } from "./be";
import { MissionsListResponse } from "@/lib/api/types";
import { useMemo } from "react";

export function useInfiniteMissionsWithStatus() {
  const qc = useQueryClient();

  const submitMutation = useSubmitMission();

  const missionsQuery = useInfiniteQuery<MissionsListResponse, Error>({
    queryKey: ["missions", "infinite"],
    queryFn: async ({ pageParam }) =>
      await be.missions.list({
        page: pageParam as number,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page >= lastPage.pagination.total_pages) {
        return undefined;
      }
      return lastPage.pagination.page + 1;
    },
  });

  const missions = missionsQuery.data?.pages.flatMap((p) => p.missions) ?? [];
  const missionIds = missions.map((m) => m.id);

  const statuses = useQueries({
    queries: missionIds.map((id) => ({
      queryKey: beKeys.missionStatus(id),
      queryFn: () => be.missions.status(id),
      enabled: missionIds.length > 0,
    })),
  });

  const missionsWithStatus = useMemo(() => {
    return missions.map((m, i) => {
      const statusData = statuses[i]?.data;
      if (statusData) {
        return { ...m, status: statusData.status };
      }
      return m;
    });
  }, [missions, statuses]);

  const bannerPosition = useMemo(() => {
    if (!missionsQuery.data?.pages[0]) return null;
    const firstPageMissions = missionsQuery.data.pages[0].missions;
    const maxPosition = Math.min(4, firstPageMissions.length - 1); // 0 to 4, or less if short page
    if (maxPosition < 0) return null;
    return Math.floor(Math.random() * (maxPosition + 1));
  }, [missionsQuery.data?.pages[0]?.missions.length]);

  const listData = useMemo(() => {
    if (!missionsQuery.data?.pages.length) return [];

    const allMissions = missionsWithStatus;
    const items: Array<(typeof allMissions)[0] | { type: "banner" }> = [
      ...allMissions,
    ];

    if (bannerPosition !== null) {
      items.splice(bannerPosition + 1, 0, { type: "banner" });
    }

    return items;
  }, [missionsWithStatus, bannerPosition]);

  return {
    missions: listData,
    fetchNextPage: missionsQuery.fetchNextPage,
    hasNextPage: missionsQuery.hasNextPage,
    isFetchingNextPage: missionsQuery.isFetchingNextPage,
    isLoading: missionsQuery.isLoading || statuses.some((s) => s.isLoading),
    submitStatus: submitMutation.mutateAsync,
    isSubmitting: submitMutation.isPending,
  };
}
