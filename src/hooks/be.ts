import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { be } from '@/lib/api/endpoints'
import type { CheckoutRequest } from '@/lib/api/types'

export const beKeys = {
  balance: ['be', 'balance'] as const,
  rewards: (page: number, status: string) => ['be', 'rewards', { page, status }] as const,
  wheelConfig: ['be', 'wheel', 'config'] as const,
  teamLevel: ['be', 'team', 'level'] as const,
  teamLevels: ['be', 'team', 'levels'] as const,
  inviteLink: ['be', 'team', 'invite-link'] as const,
  teamMembers: (page: number) => ['be', 'team', 'members', { page }] as const,
  wallet: ['be', 'user', 'wallet'] as const,
}

export function useBalance() {
  return useQuery({
    queryKey: beKeys.balance,
    queryFn: () => be.user.balance(),
  })
}

export function useWallet() {
  return useQuery({ queryKey: beKeys.wallet, queryFn: () => be.user.walletGet() })
}

export function useUpdateWallet() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (wallet: string) => be.user.walletUpdate(wallet),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: beKeys.wallet })
    },
  })
}

export function useRewards(params?: { page?: number; status?: string }) {
  const page = params?.page ?? 1
  const status = params?.status ?? 'pending'
  return useQuery({
    queryKey: beKeys.rewards(page, status),
    queryFn: () => be.rewards.list({ page, status }),
  })
}

export function useClaimReward() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (rewardId: number) => be.rewards.claim(rewardId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: beKeys.balance })
      qc.invalidateQueries({ queryKey: ['be', 'rewards'] })
    },
  })
}

export function useCheckout() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (req: CheckoutRequest) => be.rewards.checkout(req),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: beKeys.balance })
    },
  })
}

export function useWheelConfig() {
  return useQuery({ queryKey: beKeys.wheelConfig, queryFn: () => be.wheel.config() })
}

export function useWheelSpin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => be.wheel.spin(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: beKeys.balance })
    },
  })
}

export function useTeamLevel() {
  return useQuery({ queryKey: beKeys.teamLevel, queryFn: () => be.team.level() })
}

export function useTeamLevels() {
  return useQuery({ queryKey: beKeys.teamLevels, queryFn: () => be.team.levels() })
}

export function useInviteLink() {
  return useQuery({ queryKey: beKeys.inviteLink, queryFn: () => be.team.inviteLink() })
}

export function useTeamMembers(params?: { page?: number }) {
  const page = params?.page ?? 1
  return useQuery({ queryKey: beKeys.teamMembers(page), queryFn: () => be.team.members({ page }) })
}


