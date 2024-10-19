'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import coin from '@/img/coin.png'
import copylink from '@/img/twitter.png'
import { ChevronRight } from "lucide-react"

export default function Component() {
  const [dataMode, setDataMode] = useState(0)

  return (
    <div className='h-screen flex flex-col items-center overflow-auto bg-gray-100'>
      <div className="flex mt-8 items-center justify-center">
        <Button className={`w-44 h-12 rounded-full black border-none ml-1 mr-1 hover:bg-[#5E6BFE] ${dataMode == 0 ? 'bg-[#5E6BFE]' : 'bg-white text-black'}`} onClick={() => { setDataMode(0) }}>New Tasks</Button>
        <Button className={`w-44 h-12 rounded-full black border-none ml-1 mr-1 hover:bg-[#5E6BFE] ${dataMode == 1 ? 'bg-[#5E6BFE]' : 'bg-white text-black'}`} onClick={() => { setDataMode(1) }}>Finished Tasks</Button>
      </div>

      <section className="w-screen mt-5 p-4">
        <span className="text-xl">Task List</span>
        <div className="flex flex-row bg-white rounded-2xl shadow-md mt-3 pt-4 pb-4 pl-4 items-center">
          <Image src={copylink} alt="" height={60} width={60}/>
          <div className="flex flex-col ml-4">
            <span className="text-lg">Follow us on instagram</span>
            <div className="flex flex-row pt-2">
              <Image src={coin} alt="" height={25} width={25}/>
              <span className="pl-2 font-bold">+10</span>
            </div>
          </div>

          <ChevronRight className="ml-auto mr-2 text-gray-500"/>
        </div>

      </section>
    </div>
  )
}