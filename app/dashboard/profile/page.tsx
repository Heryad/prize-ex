import { Bell, BellDot, ChevronRight, FileQuestion, Languages, LucideShoppingBasket, Plus } from "lucide-react";
import Image from "next/image";
import coin from '@/img/coin.png'
import { Button } from "@/components/ui/button";


export default function Component() {
  return (
    <div className='flex-col h-screen items-center overflow-auto bg-gray-100'>
      {/* Header Bar */}
      <section className="flex flex-row w-screen h-20 items-center">
        <span className="p-3 bg-[#FBDFB1] rounded-full ml-5 font-bold">LM</span>
        <BellDot size={45} className="p-2 bg-white rounded-full ml-auto" />
        <div className="flex flex-row ml-2 mr-5 p-2 bg-white rounded-full items-center">
          <Image src={coin} width={25} height={25} alt="coin" />
          <span className="text-center ml-2 mr-2 pt-1 font-bold">355</span>
        </div>
      </section>
      {/* Info Bar */}
      <section className="mt-3">
        <div className="flex flex-row ml-4 mr-4 bg-white p-5 rounded-xl items-center">
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-500">Balance</span>
            <span className="font-bold text-2xl">244 TKM</span>
          </div>

          <Button className="ml-auto rounded-full p-5 bg-[#5260FE]">
            <Plus className="mr-1"/>
            Top Up
          </Button>
        </div>

        <div className="flex flex-row ml-4 mr-4 mt-4 bg-green-300 p-5 rounded-xl items-center">
          <span className="text-lg">Invite Your Friends<br/>and earn<span className="font-bold text-xl"> 5 TKM</span></span>
          <Button className="ml-auto text-black bg-white rounded-full p-5">Invite</Button>
        </div>
      </section>
      {/* Settings Bar */}
      <section className="flex flex-col mt-4 ml-4 mr-4 bg-white p-5 rounded-xl">
        <span className="font-bold">Menu</span>
        <span className="mt-4 text-gray-500">Main</span>
        <button className="mt-5 flex flex-row items-center bg-white text-black border-none hover:bg-white">
          <LucideShoppingBasket size={45} className="p-2 bg-gray-50 rounded-full border" />
          <span className="font-bold ml-4">My Orders</span>
          <ChevronRight color="gray" className="ml-auto"/>
        </button>
        <span className="mt-8 text-gray-500">Settings</span>
        <button className="mt-5 flex flex-row items-center bg-white text-black border-none hover:bg-white">
          <Bell size={45} className="p-2 bg-gray-50 rounded-full border" />
          <span className="font-bold ml-4">Notifications</span>
          <ChevronRight color="gray" className="ml-auto"/>
        </button>
        <button className="mt-5 flex flex-row items-center bg-white text-black border-none hover:bg-white">
          <Languages size={45} className="p-2 bg-gray-50 rounded-full border" />
          <span className="font-bold ml-4">Language</span>
          <span className="ml-auto mr-1 text-gray-400">English</span>
          <ChevronRight color="gray"/>
        </button>
        <span className="mt-8 text-gray-500">Others</span>
        <button className="mt-5 flex flex-row items-center bg-white text-black border-none hover:bg-white">
          <FileQuestion size={45} className="p-2 bg-gray-50 rounded-full border" />
          <span className="font-bold ml-4">FAQ</span>
          <ChevronRight color="gray" className="ml-auto"/>
        </button>
      </section>
    </div>
  )
}