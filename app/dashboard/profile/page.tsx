'use client'
import { Bell, BellDot, ChevronRight, FileQuestion, Languages, LucideShoppingBasket, Plus, X } from "lucide-react";
import Image from "next/image";
import coin from '@/img/coin.png'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copylink from '@/img/copylink.png'
import facebook from '@/img/facebook.png'
import twitter from '@/img/twitter.png'
import whatsapp from '@/img/whatsapp.png'

export default function Component() {
  const router = useRouter();

  const [isBarOpen, setIsBarOpen] = useState(false);
  const [teamBar, setTeamBar] = useState(false);

  //User Profile
  const [userName, setUserName] = useState('N/A');
  const [userBalance, setUserBalance] = useState(0);

  const fetchData = async () => {
    const loginResp = await fetch('/dashboard/api/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramID: localStorage.getItem('userID') })
    });
    const mLoginData = await loginResp.json();
    setUserName(mLoginData.data.userName);
    setUserBalance(mLoginData.data.userBalance);
  }

  const shareLink = async() => {
    navigator.clipboard.writeText('https://t.me/PrizeX_Game_Bot/prz?startapp=' + localStorage.getItem('userID'));
    toast('Invite Link Copied To Clipboard');
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='flex-col h-screen items-center overflow-auto bg-gray-100'>
      {/* Header Bar */}
      <section className="flex flex-row w-screen h-20 items-center">
        <span className="p-3 bg-[#FBDFB1] rounded-full ml-5 font-bold">{userName}</span>
        <BellDot size={45} className="p-2 bg-white rounded-full ml-auto" />
        <div className="flex flex-row ml-2 mr-5 p-2 bg-white rounded-full items-center">
          <Image src={coin} width={25} height={25} alt="coin" />
          <span className="text-center ml-2 mr-2 pt-1 font-bold">{userBalance}</span>
        </div>
      </section>
      {/* Info Bar */}
      <section className="mt-3">
        <div className="flex flex-row ml-4 mr-4 bg-white p-5 rounded-xl items-center">
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-500">Balance</span>
            <span className="font-bold text-2xl">{userBalance} $</span>
          </div>

          <Button className="ml-auto rounded-full p-5 bg-[#5260FE]" onClick={() => { router.push('/dashboard/payment') }}>
            <Plus className="mr-1" />
            Top Up
          </Button>
        </div>

        <div className="flex flex-row ml-4 mr-4 mt-4 bg-green-300 p-5 rounded-xl items-center">
          <span className="text-lg">Invite Your Friends<br />and earn<span className="font-bold text-xl"> 2 $</span></span>
          <Button className="ml-auto text-black bg-white rounded-full p-5 hover:bg-white" onClick={() => {setIsBarOpen(true)}}>Invite</Button>
          <Button className="ml-2 text-black bg-white rounded-full p-5 hover:bg-white" onClick={() => {setTeamBar(true)}}>My Team</Button>

        </div>
      </section>
      {/* Settings Bar */}
      <section className="flex flex-col mt-4 ml-4 mr-4 bg-white p-5 rounded-xl">
        <span className="font-bold">Menu</span>
        <span className="mt-4 text-gray-500">Main</span>
        <button className="mt-5 flex flex-row items-center bg-white text-black border-none hover:bg-white" onClick={() => {router.replace('/dashboard/ticket')}}>
          <LucideShoppingBasket size={45} className="p-2 bg-gray-50 rounded-full border" />
          <span className="font-bold ml-4">My Orders</span>
          <ChevronRight color="gray" className="ml-auto" />
        </button>
        <span className="mt-8 text-gray-500">Settings</span>
        <button className="mt-5 flex flex-row items-center bg-white text-black border-none hover:bg-white">
          <Bell size={45} className="p-2 bg-gray-50 rounded-full border" />
          <span className="font-bold ml-4">Notifications</span>
          <ChevronRight color="gray" className="ml-auto" />
        </button>
        <button className="mt-5 flex flex-row items-center bg-white text-black border-none hover:bg-white">
          <Languages size={45} className="p-2 bg-gray-50 rounded-full border" />
          <span className="font-bold ml-4">Language</span>
          <span className="ml-auto mr-1 text-gray-400">English</span>
          <ChevronRight color="gray" />
        </button>
        <span className="mt-8 text-gray-500">Others</span>
        <button className="mt-5 flex flex-row items-center bg-white text-black border-none hover:bg-white">
          <FileQuestion size={45} className="p-2 bg-gray-50 rounded-full border" />
          <span className="font-bold ml-4">FAQ</span>
          <ChevronRight color="gray" className="ml-auto" />
        </button>
      </section>

      <div className="fixed h-36 bottom-[72px] left-0 right-0 shadow-[0px_-70px_50px_18px_rgba(204,204,204,0.86)] bg-white text-primary-foreground border-none p-3 rounded-t-lg z-50" hidden={!isBarOpen}>
        <X color="black" className="ml-auto" onClick={() => {setIsBarOpen(false)}}/>
        <div className="flex h-32 flex-row gap-7 justify-center items-center">
          <span className="justify-center items-center flex flex-col p-1 text-black" onClick={() => {shareLink();}}>
            <Image src={copylink} alt="" width={50} height={50}/>
            Copy Link
          </span>
          
          <span className="justify-center items-center flex flex-col p-1 text-black" onClick={() => {shareLink();}}>
            <Image src={whatsapp} alt="" width={50} height={50}/>
            Whatsapp
          </span>

          <span className="justify-center items-center flex flex-col p-1 text-black" onClick={() => {shareLink();}}>
            <Image src={facebook} alt="" width={50} height={50}/>
            Facebook
          </span>

          <span className="justify-center items-center flex flex-col p-1 text-black" onClick={() => {shareLink();}}>
            <Image src={twitter} alt="" width={50} height={50}/>
            X
          </span>
        </div>
      </div>

      <div className="fixed h-[550px] bottom-[70px] left-0 right-0 shadow-[0px_-70px_50px_18px_rgba(204,204,204,0.86)] bg-white text-primary-foreground border-none p-3 rounded-t-lg z-50" hidden={!teamBar}>
        <X color="black" className="ml-auto" onClick={() => {setTeamBar(false)}}/>
        <span className="flex text-black justify-center pt-2 font-bold text-lg">My Team</span>
        <div className="flex flex-row gap-7 justify-center items-center">
          
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}