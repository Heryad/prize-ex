'use client'
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const loginUser = async () => {
    const catResp = await fetch('/dashboard/api/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramID: '0x002', userName: 'ata', userEmail: 'heryad@gmail.com', userPhone: '+9647501827172', registerDate: 'now', userBalance: '0',  invitedBy: '6704cec2f02e3be4ca96d471'})
    });
    if(catResp != null){
      const mCatData = await catResp.json();
      
      localStorage.setItem('userID', mCatData.data[0].telegramID);
      localStorage.setItem('userName', mCatData.data[0].userName);
      router.push('/dashboard')
    }
  }

  useEffect(() => {
    loginUser();
  }, [])
  
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <span className="font-bold text-2xl mt-auto">PRIZE-EX</span>
      <ProgressIndicator className='mt-auto mb-10' size={30}/>
    </div>
  );
}
