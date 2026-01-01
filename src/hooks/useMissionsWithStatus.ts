import { useQueries, useQueryClient } from "@tanstack/react-query";
import { BE_DISABLED, beKeys, useMissions, useSubmitMission } from "./be";
import { be } from "@/lib/api/endpoints";

export function useMissionsWithStatus(params?: { page?: number }) {
  const page = params?.page ?? 1;

  const missionsQuery = useMissions({ page });

  const qc = useQueryClient();

  const submitMutation = useSubmitMission();

  const statuses = useQueries({
    queries:
      missionsQuery.data?.missions.map((m) => ({
        queryKey: beKeys.missionStatus(m.id),
        queryFn: () => be.missions.status(m.id),
        enabled: !BE_DISABLED,
      })) ?? [],
  });

  const missionsWithStatus =
    missionsQuery.data?.missions.map((m, i) => ({
      ...m,
      status: statuses[i]?.data?.status ?? "unknown",
    })) ?? [];

  return {
    loading: missionsQuery.isLoading || statuses.some((s) => s.isLoading),

    missions: missionsWithStatus,
    pagination: missionsQuery.data?.pagination,

    submitStatus: submitMutation.mutateAsync,

    // manual helpers
    refetch: missionsQuery.refetch,
    isSubmitting: submitMutation.isPending,
  };
}
