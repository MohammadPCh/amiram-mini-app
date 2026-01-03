"use client";

import Link from "next/link";

interface TelegramProfileProps {
  user?: { username?: string; photo_url?: string } | null;
  loading: boolean;
  isTelegram: boolean;
  initData?: string;
}

const TelegramProfile = ({
  user,
  loading,
  isTelegram,
  initData,
}: TelegramProfileProps) => {
  const handleDoubleClick = async () => {
    if (!initData) return;

    try {
      await navigator.clipboard.writeText(initData);
      alert("Init data copied to clipboard");
    } catch (err) {
      alert("Failed to copy");
    }
  };

  if (isTelegram && loading) {
    return (
      <>
        <div className="h-4 w-20 rounded bg-base-200 animate-pulse" />
        <div className="h-9 w-9 rounded-2xl bg-base-200 animate-pulse" />
      </>
    );
  }

  return (
    <>
      <p
        className="text-xs font-bold cursor-pointer select-text"
        onDoubleClick={handleDoubleClick}
        title="Double click to copy initData"
      >
        {user?.username}
      </p>

      <Link href="/me">
        <img
          src={user?.photo_url || "/images/face-man.svg"}
          alt="Telegram Profile Picture"
          width={36}
          height={36}
          className="rounded-2xl w-9 h-9"
        />
      </Link>
    </>
  );
};

export default TelegramProfile;
