'use client'
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import WebApp from '@twa-dev/sdk'

export default function Home() {
  const router = useRouter()

  const loginUser = async () => {
    const date = new Date()
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    if (typeof window !== "undefined") {
      if (WebApp.initDataUnsafe.user) {
        const catResp = await fetch('/dashboard/api/Login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ telegramID: WebApp.initDataUnsafe.user?.id, userName: WebApp.initDataUnsafe.user?.username, userFirstName: WebApp.initDataUnsafe.user?.first_name, registerDate: formattedDate, userBalance: '0', invitedBy: WebApp.initDataUnsafe?.start_param || ''})
        });
        if (catResp != null) {
          const mCatData = await catResp.json();
          localStorage.setItem('userID', mCatData.data.telegramID);
          localStorage.setItem('userName', mCatData.data.userFirstName);
          router.push('/dashboard')
        }
      }
    }
  }

  useEffect(() => {
    loginUser();
  }, [])

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <span className="font-bold text-2xl mt-auto">PRIZEX</span>
      <ProgressIndicator className='mt-auto mb-10' size={30} />
    </div>
  );
}
