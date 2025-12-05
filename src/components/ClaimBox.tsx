import React, { FC } from "react";
import Image from "next/image";

const mockData = [
  {
    balance: "12.32",
    symbol: "USDT",
    color: "#50AF95",
  },

  {
    balance: "0.001",
    symbol: "BNB",
    color: "#F3BA2F",
  },
  {
    balance: "10.00",
    symbol: "ADA",
    color: "#FFFFFF",
  },
  {
    balance: "0.006",
    symbol: "XRP",
    color: "#F5CF31",
  },
];

export const ClaimBox = () => {
  return (
    <div
      className="flex flex-col gap-3 justify-center items-center text-center border-2 border-primary rounded-2xl py-4"
      style={{
        backgroundImage: "url('/images/bg/card-bg.svg')",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="flex items-center gap-3 text-teal-400">
        <Image src="/images/coins/usdt.svg" alt="Coin" width={32} height={32} />
        <span className="font-kalame font-black text-5xl leading-none">
          5.00
        </span>
      </div>
      <div className="w-full flex flex-row-reverse items-center justify-center gap-4">
        {mockData.map((item) => (
          <TokenBalance key={item.symbol} {...item} />
        ))}
      </div>
      <div className="w-full px-7">
        <button className="w-full bg-yellow-400 text-black rounded-md py-2 cursor-pointer">
          واریز به کیف پول{" "}
        </button>
      </div>
    </div>
  );
};

interface ITokenBalanceProps {
  balance: string;
  symbol: string;
  color: string;
}

const TokenBalance: FC<ITokenBalanceProps> = ({ balance, symbol, color }) => {
  return (
    <div className="flex gap-1 items-center">
      <div className="text-base font-bold font-kalame" style={{ color }}>
        {balance}
      </div>
      <div className="w-4 h-4 rounded-lg">
        <Image
          src={`/images/coins/${symbol.toLowerCase()}.svg`}
          alt={symbol}
          width={16}
          height={16}
        />
      </div>
    </div>
  );
};
