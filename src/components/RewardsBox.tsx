import Image from "next/image";
import { useClaimReward, useRewards } from "@/hooks/be";

const RewardsBox = () => {
  const { data, isLoading } = useRewards({ page: 1, status: "pending" });
  const claim = useClaimReward();
  const rewards = data?.rewards ?? [];
  return (
    <div className="bg-base-100 rounded-2xl p-4 border-2 border-base-300 flex flex-col gap-4">
      <h1 className="text-2xl font-bold font-kalame text-center pb-4 border-b border-primary">
        جوایز
      </h1>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="text-center text-sm opacity-70">در حال دریافت...</div>
        ) : rewards.length === 0 ? (
          <div className="text-center text-sm opacity-70">جایزه‌ای برای دریافت ندارید.</div>
        ) : (
          rewards.map((item) => (
            <RewardItem
              key={item.id}
              id={item.id}
              title={item.type}
              amount={item.amount}
              currency={item.currency}
              dateTime={new Date(item.created_at)}
              isClaiming={claim.isPending}
              onClaim={() => claim.mutate(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const RewardItem = ({
  id,
  title,
  amount,
  currency,
  dateTime,
  isClaiming,
  onClaim,
}: {
  id: number;
  title: string;
  amount: number;
  currency: string;
  dateTime: Date;
  isClaiming: boolean;
  onClaim: () => void;
}) => {
  return (
    <div className="flex items-end font-iran-sans">
      <div className="min-w-6 min-h-6 rounded-lg bg-success p-0.75">
        <Image
          src="/images/icons/check.svg"
          alt="Coin"
          width={18}
          height={18}
        />
      </div>
      <div className="min-w-6 min-h-6 bg-neutral relative overflow-hidden">
        <div className="absolute -top-6 left-0 w-12 h-12 bg-base-100 rounded-full"></div>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <div className="text-sm text-neutral-700">{dateTime.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
        <div className="bg-neutral rounded-2xl rounded-br-none p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[#50AF95] font-bold">{title}</p>
            <div className="flex gap-1 items-center justify-end flex-1">
              <div className="font-bold text-[#50AF95] pt-1">{amount}</div>
              <Image
                src={currency?.toUpperCase() === "USDT" ? "/images/coins/usdt.svg" : "/images/coins/usdt.svg"}
                alt="Coin"
                width={18}
                height={18}
              />
            </div>
          </div>
          <button
            className="flex-1 rounded-lg bg-base-100 py-1.5 px-3 text-base-content disabled:opacity-60"
            onClick={onClaim}
            disabled={isClaiming}
          >
            دریافت جایزه
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardsBox;
