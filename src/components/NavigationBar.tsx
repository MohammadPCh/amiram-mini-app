"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: string;
  badge?: number;
};

const ITEMS: NavItem[] = [
  {
    key: "ranking",
    label: "رتبه بندی",
    href: "/ranking",
    icon: "/images/navigation/race.svg",
  },
  {
    key: "rewards",
    label: "جوایز",
    href: "/rewards",
    icon: "/images/navigation/wallet.svg",
    badge: 12,
  },
  {
    key: "wheel",
    label: "گردونه",
    href: "/wheel",
    icon: "/images/navigation/wheel.svg",
  },
  {
    key: "friends",
    label: "دوستان",
    href: "/friends",
    icon: "/images/navigation/freinds.svg",
  },
  {
    key: "home",
    label: "خانه",
    href: "/",
    icon: "/images/navigation/home.svg",
  },
];

export const NavigationBarItem = ({
  item,
  active,
  badge,
}: {
  item: NavItem;
  active: boolean;
  badge?: number;
}) => {
  return (
    <Link
      href={item.href!}
      className={`relative transition-[width] duration-300 flex items-center justify-center  gap-1 rounded-2xl h-8 ${
        active ? "bg-[#4E4949] to-base py-2 px-6" : "w-8"
      }`}
    >
      <Image src={item.icon} alt={item.label} width={24} height={24} />
      {active && (
        <span className="text-sm font-bold whitespace-nowrap">
          {item.label}
        </span>
      )}
      {badge && (
        <span className="absolute top-0 right-0 min-w-4.5 h-4.5 px-1 rounded-full bg-warning text-primary-content text-[10px] leading-4.5 text-center font-bold">
          {badge.toLocaleString("fa-IR")}
        </span>
      )}
    </Link>
  );
};

export const NavigationBar = () => {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (!item.href) return false;
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };

  return (
    <nav className="mx-4">
      <div className="border-2 border-base-300 rounded-2xl bg-base-100/70 backdrop-blur p-2 flex items-center justify-between flex-row-reverse">
        {ITEMS.map((item) => (
          <NavigationBarItem
            key={item.key}
            item={item}
            active={isActive(item)}
            badge={item.badge}
          />
        ))}
      </div>
      <div className="pb-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};
