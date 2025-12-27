import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function LeaderBoardCard({ title, children }: Props) {
  return (
    <div className="w-full p-2 flex-col gap-2 items-center border-2 border-base-300 rounded-2xl bg-base-100 translate-y-[calc(-1*4px)]">
      <h1 className="w-full text-2xl font-bold font-kalame text-center pb-4 border-b border-primary">
        {title}
      </h1>

      {children}
    </div>
  );
}
