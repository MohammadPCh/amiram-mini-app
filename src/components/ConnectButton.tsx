'use client'

import { useAppKit, useAppKitAccount, useWalletInfo } from "@reown/appkit/react";

export const ConnectButton = () => {
  const { open, close } = useAppKit();
  const { isConnected } = useAppKitAccount();
  const { walletInfo } = useWalletInfo();
  return isConnected ? (
    <div className=" text-white px-4 py-2 rounded-2xl text-sm cursor-pointer" onClick={() => open()}>
      {/* Show connector name and avatar */}
      <div className="flex items-center gap-2">
        <img
          src={
            walletInfo?.icon ||
            (Array.isArray(walletInfo?.icons) && walletInfo.icons.length > 0
              ? walletInfo.icons[0]
              : "/images/face-man.svg")
          }
          alt="avatar"
          width={24}
          height={24}
          style={{ borderRadius: "50%" }}
        />
        <div className="text-sm">{walletInfo?.name}</div>
      </div>
    </div>
  ) : (
    <div className="bg-primary text-white px-4 py-2 rounded-2xl text-sm cursor-pointer" onClick={() => open()}>
      اتصال به کیف پول
    </div>
  )
}
