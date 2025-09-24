'use client'

import { AppBar } from '@/components/AppBar';
// import { cookieStorage, createStorage, http } from '@wagmi/core'

import ClientGate from '@/components/ClientGate'
import { WalletCoins } from '@/components/WalletCoins';

export default function Home() {
  // Simulate work to show the global loading UI
  // await new Promise((r) => setTimeout(r, 1500));



  return (
    // // <ClientGate>
    //   <div className={"pages"}>
    //     <Image src="/reown.svg" alt="Reown" width={150} height={150} priority />
    //     <h1>AppKit Wagmi Next.js App Router Example</h1>
    //     user: {user?.first_name} {user?.last_name} {user?.username} {user?.language_code}
    //     <ConnectButton />
    //     <ActionButtonList />
    //     <div className="advice">
    //       <p>
    //         This projectId only works on localhost. <br/>Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
    //       </p>
    //     </div>
    //     <InfoList />
    //   </div>
    // // </ClientGate>
    <div className="flex flex-col gap-4">
      <AppBar />
      <WalletCoins />
      <div className="border-primary border-2 rounded-2xl p-2">hi</div>
      <div className="p-2">
        <h1>AppKit Wagmi Next.js App Router Example</h1>
        {/* user: {user?.first_name} {user?.last_name} {user?.username} {user?.language_code} */}
      </div>
    </div>
  );
}