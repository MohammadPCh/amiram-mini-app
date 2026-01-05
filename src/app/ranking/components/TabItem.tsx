import clsx from "clsx";
import React, { useCallback } from "react";

interface TabItemProps {
  id: string;
  title?: React.ReactNode;
  selected?: boolean;
  onSelect?: (arg: string) => void;
}

export default function TabItem({
  id,
  onSelect,
  selected,
  title,
}: TabItemProps) {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      onSelect?.(id);
    },
    []
  );

  return (
    <div
      key={`tab-content-${id}`}
      className={clsx(
        "flex justify-center pb-2 grow-1 shrink-0  border-primary gap-2",
        selected && "border-b",
        "cursor-pointer",
        "drop-shadow-2xl"
      )}
      onClick={onClick}
    >
      <h3 className="text-lg font-kalame">{title}</h3>
    </div>
  );
}
