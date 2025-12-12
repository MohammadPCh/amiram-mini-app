"use client";

import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import BottomSheet from "./BottomSheet";
import {
  useAppKit,
  useAppKitAccount,
  useWalletInfo,
  type Views,
} from "@reown/appkit/react";
import { ConnectionController } from "@reown/appkit-controllers";
import "@reown/appkit-ui/wui-qr-code";

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

type SupportedView = Extract<Views, "Connect" | "AllWallets">;

const desktopWallets: DesktopWalletOption[] = [
  {
    name: "MetaMask",
    short: "MM",
    colors: ["#FBE08B", "#F97316"],
  },
  {
    name: "Coinbase",
    short: "CB",
    colors: ["#60A5FA", "#2563EB"],
  },
  {
    name: "Zerion",
    short: "Z",
    colors: ["#9E9CFD", "#4C51F6"],
  },
  {
    name: "View More",
    short: "•••",
    colors: ["#34D399", "#0EA5E9"],
    actionView: "AllWallets",
  },
];

export const ClaimBox = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { walletInfo } = useWalletInfo();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [wcUri, setWcUri] = useState<string | undefined>();
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const [hasCopiedUri, setHasCopiedUri] = useState(false);
  const copyFeedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClaim = () => {
    setIsBottomSheetOpen(true);
  };

  useEffect(() => {
    if (!address) return;
    setWalletAddress(address);
  }, [address]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const unsubscribe = ConnectionController.subscribeKey("wcUri", (value) => {
      setWcUri(typeof value === "string" ? value : undefined);
    });
    return () => {
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (copyFeedbackTimer.current) {
        clearTimeout(copyFeedbackTimer.current);
      }
    };
  }, []);

  const ensureWalletConnectPairing = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      setQrError(null);
      setIsGeneratingQr(true);
      ConnectionController.resetUri();
      await ConnectionController.connectWalletConnect({ cache: "auto" });
    } catch (error) {
      console.error("Failed to create WalletConnect pairing", error);
      setQrError("خطا در تولید کد QR. لطفا دوباره تلاش کنید.");
    } finally {
      setIsGeneratingQr(false);
    }
  }, []);

  useEffect(() => {
    if (!isBottomSheetOpen) return;
    if (wcUri || isGeneratingQr) return;
    ensureWalletConnectPairing();
  }, [ensureWalletConnectPairing, isBottomSheetOpen, isGeneratingQr, wcUri]);

  const handleConfirm = () => {
    if (!walletAddress.trim()) return;
    setIsBottomSheetOpen(false);
  };

  const handleConnectWallet = useCallback(
    (view: SupportedView = "Connect") => {
      open({ view });
    },
    [open]
  );

  const handleCopyUri = useCallback(async () => {
    if (!wcUri || typeof navigator === "undefined" || !navigator.clipboard)
      return;
    try {
      await navigator.clipboard.writeText(wcUri);
      setHasCopiedUri(true);
      if (copyFeedbackTimer.current) {
        clearTimeout(copyFeedbackTimer.current);
      }
      copyFeedbackTimer.current = setTimeout(() => setHasCopiedUri(false), 2000);
    } catch (error) {
      console.error("Failed to copy WalletConnect URI", error);
    }
  }, [wcUri]);

  const handleDesktopWalletClick = useCallback(
    (wallet: DesktopWalletOption) => {
      handleConnectWallet(wallet.actionView ?? "Connect");
    },
    [handleConnectWallet]
  );

  const isConfirmDisabled = walletAddress.trim().length === 0;
  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }, [address]);

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
        <button
          className="w-full bg-yellow-400 text-black rounded-md py-2 cursor-pointer"
          onClick={handleClaim}
        >
          واریز به کیف پول{" "}
        </button>
      </div>
      <BottomSheet
        open={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        closeOnOverlayClick
        panelClassName="bg-transparent px-3 pb-3"
      >
        <div className="w-full max-w-[540px] rounded-[32px] border border-white/5 bg-[#101828] px-6 py-8 shadow-[0px_30px_60px_rgba(0,0,0,0.45)] text-white font-kalame">
          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm text-white/70" htmlFor="wallet-address-input">
              آدرس کیف پول:
            </label>
            <input
              id="wallet-address-input"
              placeholder="آدرس خود را وارد کنید."
              dir="ltr"
              value={walletAddress}
              onChange={(event) => setWalletAddress(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0C1424] px-4 py-3 text-base font-medium text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {isConnected ? (
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right text-xs text-white/70">
                <div>
                  <p className="text-white/80 text-sm font-bold">کیف پول متصل</p>
                  <p className="mt-1 font-mono text-white/60">{shortenedAddress}</p>
                </div>
                {walletInfo?.name && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    {walletInfo.name}
                  </span>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="w-full rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-primary/40 hover:text-white"
                onClick={() => handleConnectWallet("Connect")}
              >
                اتصال سریع به کیف پول با Reown
              </button>
            )}
          </div>
          <p className="mt-3 text-xs font-bold text-[#FF7070] text-right">
            فقط کیف پول USDT بر روی شبکه BEP20
          </p>
          <div className="mt-5 mb-6 flex items-center gap-3 text-white/60">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-bold">یا</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/5 bg-gradient-to-b from-[#152139] to-[#0C1424] p-5">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm font-bold text-[#5AC8FA]">موبایل</p>
                  <p className="text-xs text-white/60">با کیف پول خود اسکن کنید</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80">
                  <PhoneGlyph />
                </div>
              </div>
              <div className="mt-5 flex justify-center">
                {/* <div className="rounded-[24px] border border-white/10 bg-[#050C19]"> */}
                  {wcUri ? (
                    <wui-qr-code
                      uri={wcUri}
                      size={328}
                      theme="dark"
                      color="#F5CF31"
                      className="block"
                    />
                  ) : (
                    <div className="flex h-[220px] w-[220px] items-center justify-center rounded-3xl bg-[#0B1221]">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-primary" />
                    </div>
                  )}
                {/* </div> */}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={handleCopyUri}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-primary/70 hover:text-white"
                  disabled={!wcUri}
                >
                  {hasCopiedUri ? "کپی شد!" : "کپی لینک"}
                </button>
                <button
                  type="button"
                  onClick={ensureWalletConnectPairing}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:border-primary/70 hover:text-white disabled:opacity-60"
                  disabled={isGeneratingQr}
                >
                  {isGeneratingQr ? "در حال بروزرسانی..." : "تولید دوباره کد"}
                </button>
              </div>
              {qrError && (
                <p className="mt-3 text-center text-xs text-red-400">{qrError}</p>
              )}
            </div>
            <div className="rounded-[28px] border border-white/5 bg-[#0C1424] p-5">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-sm font-bold text-[#5AC8FA]">دسکتاپ</p>
                  <p className="text-xs text-white/60">یک کیف پول انتخاب کنید</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80">
                  <DesktopGlyph />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {desktopWallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    type="button"
                    onClick={() => handleDesktopWalletClick(wallet)}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center text-xs font-bold text-white/80 transition-colors hover:border-primary/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-black text-black shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
                      style={{
                        background: `linear-gradient(135deg, ${wallet.colors[0]}, ${wallet.colors[1]})`,
                      }}
                    >
                      {wallet.short}
                    </span>
                    {wallet.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#FDE047] via-[#FACC15] to-[#F59E0B] py-3 text-lg font-black text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isConfirmDisabled}
            onClick={handleConfirm}
          >
            تایید
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

interface ITokenBalanceProps {
  balance: string;
  symbol: string;
  color: string;
}

interface DesktopWalletOption {
  name: string;
  short: string;
  colors: [string, string];
  actionView?: SupportedView;
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

const PhoneGlyph = () => (
  <svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="18" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
    <rect x="7" y="24" width="6" height="2" rx="1" fill="currentColor" />
    <circle cx="10" cy="21" r="1.5" fill="currentColor" />
  </svg>
);

const DesktopGlyph = () => (
  <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="28" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
    <rect x="9" y="22" width="12" height="3" rx="1.5" fill="currentColor" />
    <rect x="6" y="19" width="18" height="2" rx="1" fill="currentColor" />
  </svg>
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wui-qr-code": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        uri?: string;
        size?: number;
        theme?: "dark" | "light";
        color?: string;
      };
    }
  }
}
