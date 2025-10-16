import type { Metadata } from "next";

import { headers } from "next/headers"; // added
import "./globals.css";
import ContextProvider from "@/context";
import Script from "next/script";
import { iransans, kalame } from "@/lib/fonts";
import { AppBar } from "@/components/AppBar";
import { NavigationBar } from "@/components/NavigationBar";

export const metadata: Metadata = {
  title: "AppKit in Next.js + wagmi",
  description: "AppKit example dApp",
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
          <div className="h-screen h-screen-dvh pb-4 pt-16 bg-primary-content flex flex-col gap-4">
            <AppBar />
            <div className="flex-1 overflow-x-hidden overflow-y-auto px-4">{children}</div>
            <NavigationBar />
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
