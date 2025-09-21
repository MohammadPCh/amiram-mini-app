'use client'

// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from 'next/image';
import ClientGate from '@/components/ClientGate'
import { useTelegramUser } from '@/hooks/useTelegramUser'

export default function Home() {
  // Simulate work to show the global loading UI
  // await new Promise((r) => setTimeout(r, 1500));
  const { user } = useTelegramUser()
  console.log(user)


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
    <div className="flex flex-col gap-2">
      <div className="p-2 flex gap-2 items-center">
      <div className="flex flex-1">
        {/* Telegram Profile Picture */}
        <Image src={user?.photo_url || '/images/face-man.svg'} alt="Telegram Profile Picture" width={100} height={100} />
      </div>

      </div>
      <div className="p-2">
        <h1>AppKit Wagmi Next.js App Router Example</h1>
        user: {user?.first_name} {user?.last_name} {user?.username} {user?.language_code}
      </div>
    </div>
  );
}