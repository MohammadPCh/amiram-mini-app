import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { be } from '@/lib/api/endpoints'
import type { CheckoutRequest, Reward, RewardsListResponse, TeamMembersResponse, WheelConfigResponse } from '@/lib/api/types'

const BE_DISABLED = process.env.NEXT_PUBLIC_BE_DISABLED === 'true'

function isoDaysAgo(days: number) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

const MOCK_BALANCE = 70
const MOCK_WALLET = '0x4C9183f5bA34046E5E35220EDA478450D044c2ab'

const MOCK_REWARDS: Reward[] = [
  { id: 31, type: 'volume', amount: 0.6, currency: 'USDT', status: 'pending', created_at: isoDaysAgo(2) },
  { id: 29, type: 'volume', amount: 0.3, currency: 'USDT', status: 'pending', created_at: isoDaysAgo(3) },
  { id: 27, type: 'invite', amount: 5, currency: 'USDT', status: 'pending', created_at: isoDaysAgo(5) },
]

const MOCK_WHEEL_CONFIG: WheelConfigResponse = {
  configs: [
    { id: 12, title: 'energy1', reward_amount: 200, weight: 50, reward_type: 'energy', status: 'active' },
    { id: 13, title: 'energy2', reward_amount: 100, weight: 70, reward_type: 'energy', status: 'active' },
    { id: 14, title: 'energy3', reward_amount: 30, weight: 500, reward_type: 'energy', status: 'active' },
    { id: 15, title: 'money1', reward_amount: 20, weight: 50, reward_type: 'USDT', status: 'active' },
    { id: 16, title: 'money2', reward_amount: 200, weight: 10, reward_type: 'USDT', status: 'active' },
  ],
}

const MOCK_TEAM_LEVEL = {
  total_score: 3600,
  members_count: 2,
  level: { id: 3, name: 'خفن', coefficient: 3, min_score: 3600 },
  required_score: 3600,
  score_needed: 0,
}

const MOCK_TEAM_LEVELS = {
  levels: [
    { id: 1, name: 'تازه وارد', coefficient: 1, min_score: 1200 },
    { id: 2, name: 'درخشان', coefficient: 2, min_score: 2400 },
    { id: 3, name: 'خفن', coefficient: 3, min_score: 3600 },
  ],
}

const MOCK_INVITE = { invite_link: 'https://t.me/AmiramTest1bot?start=AB192952011' }

const MOCK_TEAM_MEMBERS: TeamMembersResponse = {
  members: [
    { telegram_id: 7937770824, username: 'Amiramtests', first_name: 'Pouya', score: 30, balance: 0, energy: 0, joined_at: isoDaysAgo(1) },
    { telegram_id: 6097494356, username: 'Jsiskg', first_name: 'Liom', score: 1830, balance: 5, energy: 4, joined_at: isoDaysAgo(30) },
  ],
  pagination: { page: 1, limit: 20, total: 2, total_pages: 1 },
}

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
    enabled: !BE_DISABLED,
    initialData: { balance: MOCK_BALANCE },
    staleTime: BE_DISABLED ? Infinity : 0,
  })
}

export function useWallet() {
  return useQuery({
    queryKey: beKeys.wallet,
    queryFn: () => be.user.walletGet(),
    enabled: !BE_DISABLED,
    initialData: { wallet: MOCK_WALLET },
    staleTime: BE_DISABLED ? Infinity : 0,
  })
}

export function useUpdateWallet() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (wallet: string) => {
      if (BE_DISABLED) return { wallet }
      return await be.user.walletUpdate(wallet)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: beKeys.wallet })
    },
  })
}

export function useRewards(params?: { page?: number; status?: string }) {
  const page = params?.page ?? 1
  const status = params?.status ?? 'pending'
  const initialData: RewardsListResponse = {
    rewards: MOCK_REWARDS,
    pagination: { page: 1, limit: 5, total: MOCK_REWARDS.length, total_pages: 1 },
  }
  return useQuery({
    queryKey: beKeys.rewards(page, status),
    queryFn: () => be.rewards.list({ page, status }),
    enabled: !BE_DISABLED,
    initialData,
    staleTime: BE_DISABLED ? Infinity : 0,
  })
}

export function useClaimReward() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (rewardId: number) => {
      if (!BE_DISABLED) return await be.rewards.claim(rewardId)
      const rewardsKeyPrefix = ['be', 'rewards'] as const
      // remove claimed reward from any cached rewards lists
      qc.getQueryCache()
        .findAll({ queryKey: rewardsKeyPrefix })
        .forEach((q) => {
          qc.setQueryData(q.queryKey, (old: RewardsListResponse | undefined) => {
            if (!old) return old
            return { ...old, rewards: old.rewards.filter((r) => r.id !== rewardId) }
          })
        })
      return { reward: { id: rewardId, type: 'mock', amount: 0, currency: 'USDT', status: 'claimed', created_at: new Date().toISOString() }, balance: MOCK_BALANCE, energy: 0 }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: beKeys.balance })
      qc.invalidateQueries({ queryKey: ['be', 'rewards'] })
    },
  })
}

export function useCheckout() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (req: CheckoutRequest) => {
      if (!BE_DISABLED) return await be.rewards.checkout(req)
      const nextBalance = Math.max(0, MOCK_BALANCE - req.amount)
      qc.setQueryData(beKeys.balance, { balance: nextBalance })
      return { balance: nextBalance, tx_hash: '0xMOCK_TX_HASH' }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: beKeys.balance })
    },
  })
}

export function useWheelConfig() {
  return useQuery({
    queryKey: beKeys.wheelConfig,
    queryFn: () => be.wheel.config(),
    enabled: !BE_DISABLED,
    initialData: MOCK_WHEEL_CONFIG,
    staleTime: BE_DISABLED ? Infinity : 0,
  })
}

export function useWheelSpin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      if (!BE_DISABLED) return await be.wheel.spin()
      const cfg = MOCK_WHEEL_CONFIG.configs[Math.floor(Math.random() * MOCK_WHEEL_CONFIG.configs.length)]
      // pretend energy decreases
      const remaining = 5 + Math.floor(Math.random() * 20)
      // if USDT reward, bump mock balance a bit
      if (cfg.reward_type !== 'energy') {
        const current = (qc.getQueryData(beKeys.balance) as { balance: number } | undefined)?.balance ?? MOCK_BALANCE
        qc.setQueryData(beKeys.balance, { balance: current + cfg.reward_amount })
      }
      return { reward_type: cfg.reward_type, reward_amount: cfg.reward_amount, remaining_energy: remaining }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: beKeys.balance })
    },
  })
}

export function useTeamLevel() {
  return useQuery({
    queryKey: beKeys.teamLevel,
    queryFn: () => be.team.level(),
    enabled: !BE_DISABLED,
    initialData: MOCK_TEAM_LEVEL,
    staleTime: BE_DISABLED ? Infinity : 0,
  })
}

export function useTeamLevels() {
  return useQuery({
    queryKey: beKeys.teamLevels,
    queryFn: () => be.team.levels(),
    enabled: !BE_DISABLED,
    initialData: MOCK_TEAM_LEVELS,
    staleTime: BE_DISABLED ? Infinity : 0,
  })
}

export function useInviteLink() {
  return useQuery({
    queryKey: beKeys.inviteLink,
    queryFn: () => be.team.inviteLink(),
    enabled: !BE_DISABLED,
    initialData: MOCK_INVITE,
    staleTime: BE_DISABLED ? Infinity : 0,
  })
}

export function useTeamMembers(params?: { page?: number }) {
  const page = params?.page ?? 1
  return useQuery({
    queryKey: beKeys.teamMembers(page),
    queryFn: () => be.team.members({ page }),
    enabled: !BE_DISABLED,
    initialData: MOCK_TEAM_MEMBERS,
    staleTime: BE_DISABLED ? Infinity : 0,
  })
}


