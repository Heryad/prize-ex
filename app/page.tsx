'use client'
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import WebApp from '@twa-dev/sdk'

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: string;
}

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams();

  const loginUser = async () => {
    const date = new Date()
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    if (WebApp.initDataUnsafe.user) {
      const catResp = await fetch('/dashboard/api/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramID: WebApp.initDataUnsafe.user?.id, userName: WebApp.initDataUnsafe.user?.username, userFirstName: WebApp.initDataUnsafe.user?.first_name, registerDate: formattedDate, userBalance: '0',  invitedBy: WebApp.initDataUnsafe?.start_param})
      });
      if(catResp != null){
        const mCatData = await catResp.json();
        localStorage.setItem('userID', mCatData.data[0].telegramID);
        localStorage.setItem('userName', mCatData.data[0].userFirstName);
        router.push('/dashboard')
      }
    }
  }

  useEffect(() => {
    loginUser();
  }, [])

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <span className="font-bold text-2xl mt-auto">PRIZE-EX</span>
      <span>{searchParams.get('refID')}</span>
      <ProgressIndicator className='mt-auto mb-10' size={30} />
    </div>
  );
}
