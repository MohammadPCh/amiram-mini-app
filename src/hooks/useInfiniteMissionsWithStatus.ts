"use client";

import {
  useInfiniteQuery,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { be } from "@/lib/api/endpoints";
import { beKeys, useSubmitMission } from "./be";
import { MissionsListResponse } from "@/lib/api/types";

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

  const missionsWithStatus = missions.map((m, i) => ({
    ...m,
    status: statuses[i]?.data?.status ?? "unknown",
  }));

  return {
    missions: missionsWithStatus,

    fetchNextPage: missionsQuery.fetchNextPage,
    hasNextPage: missionsQuery.hasNextPage,
    isFetchingNextPage: missionsQuery.isFetchingNextPage,

    isLoading: missionsQuery.isLoading || statuses.some((s) => s.isLoading),

    submitStatus: submitMutation.mutateAsync,
    isSubmitting: submitMutation.isPending,
  };
}
