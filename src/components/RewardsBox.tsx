import Image from "next/image";

const mockData = [
  {
    id: 1,
    title: "دوبار به ربات سر بزن",
    amount: 10,
    dateTime: new Date("2025-01-01 12:00:00"),
  },
  {
    id: 2,
    title: "یکی از دوستات رو دعوت کن",
    amount: 34.5,
    dateTime: new Date("2025-01-01 12:00:00"),
  },
  {
    id: 3,
    title: "بیشتر از ۲۰۰ دلار معامله کن",
    amount: 57.6,
    dateTime: new Date("2025-01-01 12:00:00"),
  },
];

const RewardsBox = () => {
  return (
    <div className="bg-base-100 rounded-2xl p-4 border-2 border-base-300 flex flex-col gap-4">
      <h1 className="text-2xl font-bold font-kalame text-center pb-4 border-b border-primary">
        جوایز
      </h1>
      <div className="flex flex-col gap-4">
        {mockData.map((item) => (
          <RewardItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

const RewardItem = ({
  id,
  title,
  amount,
  dateTime,
}: {
  id: number;
  title: string;
  amount: number;
  dateTime: Date;
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
                src="/images/coins/usdt.svg"
                alt="Coin"
                width={18}
                height={18}
              />
            </div>
          </div>
          <button className="flex-1 rounded-lg bg-base-100 py-1.5 px-3 text-base-content">
            دریافت جایزه
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardsBox;
