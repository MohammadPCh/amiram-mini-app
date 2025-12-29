export type JwtTokens = {
  access_token: string;
  refresh_token: string;
  access_expires_at?: string;
  refresh_expires_at?: string;
};

export type BackendUser = {
  id: number;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  level?: number;
  analyze_token?: number;
  created_at?: string;
  updated_at?: string;
};

export type AuthTelegramResponse = {
  is_new_user: boolean;
  user: BackendUser;
  tokens: JwtTokens;
};

export type AuthMeResponse = {
  user: BackendUser;
};

export type RefreshResponse = {
  tokens: JwtTokens;
};

export type BalanceResponse = {
  balance: number;
};

export type EnergyResponse = {
  energy: number;
};

export type WalletResponse = {
  wallet: string | null;
};

export type Reward = {
  id: number;
  type: string;
  amount: number;
  currency: string;
  status: "pending" | "claimed" | string;
  created_at: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

export type RewardsListResponse = {
  rewards: Reward[];
  pagination: Pagination;
};

export type RewardClaimResponse = {
  reward: Reward;
  balance: number;
  energy: number;
};

export type CheckoutRequest = { amount: number };
export type CheckoutResponse = { balance: number; tx_hash: string };

export type WheelConfig = {
  id: number;
  title: string;
  reward_amount: number;
  weight: number;
  reward_type: string; // "energy" | "USDT"
  status: string;
};

export type WheelConfigResponse = { configs: WheelConfig[] };
export type WheelSpinResponse = {
  reward_type: string;
  reward_amount: number;
  remaining_energy: number;
};

export type Level = {
  id: number;
  name: string;
  coefficient: number;
  min_score: number;
};
export type UserLevelResponse = { level: Level };
export type AllLevelsResponse = { levels: Level[] };

export type TeamLevel = {
  id: number;
  name: string;
  coefficient: number;
  min_score: number;
};
export type TeamLevelResponse = {
  total_score: number;
  members_count: number;
  level: TeamLevel;
  required_score: number;
  score_needed: number;
};

export type TeamLevelsResponse = { levels: TeamLevel[] };

export type InviteLinkResponse = { invite_link: string };

export type TeamMember = {
  telegram_id: number;
  username?: string;
  first_name?: string;
  score: number;
  balance: number;
  energy: number;
  joined_at: string;
};

export type TeamMembersResponse = {
  members: TeamMember[];
  pagination: Pagination;
};
