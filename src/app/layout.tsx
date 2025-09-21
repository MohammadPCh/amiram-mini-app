import type { Metadata } from "next";

import { headers } from 'next/headers' // added
import './globals.css';
import ContextProvider from '@/context'
import Script from 'next/script'
import { iransans, kalame } from '@/lib/fonts'

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
  const cookies = headersData.get('cookie');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${iransans.variable} ${kalame.variable}`}>
        <Script src="https://telegram.org/js/telegram-web-app.js?59" strategy="afterInteractive" />
        <ContextProvider cookies={cookies}>
          <div className="min-h-dvh p-6 bg-[#0C0E12]">
            {children}
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
