import type { Metadata } from "next";

import { headers } from "next/headers"; // added
import "./globals.css";
import ContextProvider from "@/context";
import Script from "next/script";
import { iransans, kalame } from "@/lib/fonts";
import { AppBar } from "@/components/AppBar";
import { NavigationBar } from "@/components/NavigationBar";
import ClientGate from "@/components/ClientGate";

export const metadata: Metadata = {
  title: "Amiram Bit",
  description: "Amiram Bit is a platform for buying and selling bitcoins.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersData = await headers();
  const cookies = headersData.get("cookie");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${iransans.variable} ${kalame.variable}`}
        suppressHydrationWarning
      >
        <Script
          id="telegram-web-app-sdk"
          src="https://telegram.org/js/telegram-web-app.js?59"
          strategy="beforeInteractive"
        />
        <ContextProvider cookies={cookies}>
          <div className="relative h-screen h-screen-dvh pb-4 pt-16 flex flex-col gap-4">
            <div className="absolute bottom-0 left-0 right-0 h-[100dvh] bg-radial-[at_50%_100%] from-base-300 to-base-200 to-80% z-[-1]" />

            <AppBar />
            <div className=" relative z-10 flex-1 overflow-x-hidden overflow-y-auto px-4">
              <ClientGate>{children}</ClientGate>
            </div>
            <NavigationBar />
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
