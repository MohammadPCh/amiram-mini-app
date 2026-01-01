import { apiFetch } from "./http";
import type {
  AllLevelsResponse,
  AuthMeResponse,
  AuthTelegramResponse,
  BalanceResponse,
  CheckoutRequest,
  CheckoutResponse,
  EnergyResponse,
  InviteLinkResponse,
  RewardClaimResponse,
  RewardsListResponse,
  TeamLevelResponse,
  TeamLevelsResponse,
  TeamMembersResponse,
  UserLevelResponse,
  WalletResponse,
  WheelConfigResponse,
  WheelSpinResponse,
} from "./types";

export const be = {
  auth: {
    telegram: (init_data: string) =>
      apiFetch<AuthTelegramResponse>("/api/auth/telegram", {
        method: "POST",
        auth: false,
        body: JSON.stringify({ init_data }),
      }),
    me: () => apiFetch<AuthMeResponse>("/api/auth/me"),
  },

  shared: {
    all: () => apiFetch<AllLevelsResponse>("/api/levels"),
  },

  user: {
    balance: () => apiFetch<BalanceResponse>("/api/user/balance"),
    level: () => apiFetch<UserLevelResponse>("/api/user/level"),
    energy: () => apiFetch<EnergyResponse>("/api/user/energy"),
    walletGet: () => apiFetch<WalletResponse>("/api/user/wallet"),
    walletUpdate: (wallet: string) =>
      apiFetch<WalletResponse>("/api/user/wallet", {
        method: "PUT",
        body: JSON.stringify({ wallet }),
      }),
  },

  rewards: {
    list: (params: { page?: number; status?: string }) => {
      const page = params.page ?? 1;
      const status = params.status ?? "pending";
      return apiFetch<RewardsListResponse>(
        `/api/rewards?page=${page}&status=${encodeURIComponent(status)}`
      );
    },
    claim: (rewardId: number) =>
      apiFetch<RewardClaimResponse>(`/api/rewards/${rewardId}/claim`, {
        method: "POST",
      }),
    checkout: (req: CheckoutRequest) =>
      apiFetch<CheckoutResponse>("/api/rewards/checkout", {
        method: "POST",
        body: JSON.stringify(req),
      }),
  },

  wheel: {
    config: () => apiFetch<WheelConfigResponse>("/api/wheel/config"),
    spin: () =>
      apiFetch<WheelSpinResponse>("/api/wheel/spin", { method: "POST" }),
  },

  team: {
    level: () => apiFetch<TeamLevelResponse>("/api/team/level"),
    levels: () => apiFetch<TeamLevelsResponse>("/api/team/levels"),
    inviteLink: () => apiFetch<InviteLinkResponse>("/api/team/invite-link"),
    members: (params: { page?: number }) => {
      const page = params.page ?? 1;
      return apiFetch<TeamMembersResponse>(`/api/team/members?page=${page}`);
    },
  },
};
