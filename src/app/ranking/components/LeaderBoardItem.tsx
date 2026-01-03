import clsx from "clsx";
import React from "react";

export interface LeaderBoardItemProps {
  ind: number;
  title?: React.ReactNode;
  currencyImage?: string;
  currencyName?: string;
  currencyColor?: string;
  amount?: number;
}

export default function LeaderBoardItem({
  ind,
  amount,
  currencyImage,
  currencyName,
  currencyColor,
  title,
}: LeaderBoardItemProps) {
  return (
    <div className="w-full flex flex-row-reverse grow-0 shrink-0 items-center gap-2 flex-nowrap">
      <div className="flex min-w-[16px]">
        <p className="font-kalame text-body text-primary">{ind + 1}</p>
      </div>
      <div className="flex grow-0 shrink-0 items-center justify-center w-[36px] h-[26px] rounded-lg drop-shadow-2xl">
        P
      </div>
      <div className="flex grow-1 shrink-0 items-center justify-center">
        <p
          className="w-full font-kalame text-lg text-primary"
          style={{ direction: "ltr" }}
        >
          {title}
        </p>
      </div>
      <div className="flex flex-row-reverse grow-0 shrink-0 items-center justify-center flex-nowrap gap-2">
        <img src={currencyImage} width={24} height={24} alt={currencyName} />
        <p
          className={clsx(
            "w-full font-kalame text-2xl",
            `text-[${currencyColor}]`
          )}
        >{`${amount} ${currencyName}`}</p>
      </div>
    </div>
  );
}
