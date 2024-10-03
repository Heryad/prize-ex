'use client'
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboard')
    }, 3000)
  }, [])
  
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <span className="font-bold text-2xl mt-auto">PRIZE-EX</span>
      <ProgressIndicator className='mt-auto mb-10' size={30}/>
    </div>
  );
}
