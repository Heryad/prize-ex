'use client'
import { BellDot, Plus } from "lucide-react";
import coin from '@/img/coin.png'
import Image from "next/image";
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation";

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])
  const router = useRouter();
  
  const moveNext = () => {
    router.push('/dashboard/items');
  }

  const items = [
    "Cars",
    "Electronics",
    'edede'
  ]
  
  return (
    <div className=' flex-col items-center overflow-auto bg-gray-100'>
      {/* Header Bar */}
      <section className="flex flex-row w-screen h-20 items-center">
        <span className="p-3 bg-[#FBDFB1] rounded-full ml-5 font-bold">LM</span>
        <BellDot size={45} className="p-2 bg-white rounded-full ml-auto" />
        <div className="flex flex-row ml-2 mr-5 p-2 bg-white rounded-full items-center">
          <Image src={coin} width={25} height={25} alt="coin" />
          <span className="text-center ml-2 mr-2 pt-1 font-bold">355</span>
          <Plus size={35} className="p-1 bg-gray-200 rounded-full" />
        </div>
      </section>
      {/* Carousel Bar */}
      <section className="embla h-36 w-screen mt-3" ref={emblaRef}>
        <div className="embla__container h-full">
          <div className="embla__slide w-screen">
            <Card className="bg-white h-full flex justify-center items-center  ml-4 mr-4">
              <span>one</span>
            </Card>
          </div>

          <div className="embla__slide w-screen">
            <Card className="bg-white h-full flex justify-center items-center  ml-4 mr-4">
              <span>two</span>
            </Card>
          </div>

          <div className="embla__slide w-screen">
            <Card className="bg-white h-full flex justify-center items-center ml-4 mr-4">
              <span>three</span>
            </Card>
          </div>
        </div>
      </section>
      {/* Categories Bar */}
      <section className="flex flex-col w-screen mt-3">
        <span className="ml-4 font-bold">Categories</span>

        <div className="flex flex-row w-screen mt-3 overflow-x-scroll">
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-4 pl-4 pr-4">
              {items.map((item, index) => (
                <div key={index} className="w-[190px] h-32 bg-white flex-shrink-0 rounded-lg">
                  <span className="font-semibold mt-4 ml-4 flex">{item}</span>
                  <Image src={coin} alt="coin" />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
      {/* Items Banner */}
      <div className="flex flex-col w-screen mt-3">
        <span className="ml-4 font-bold">Draws</span>

        <div className="space-y-4 mt-3 mb-3 ml-3 mr-3">
          {['Ipad Pro 256GB Space Grey', 'hello world'].map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2" onClick={() => {moveNext()}}>
                <span className="text-gray-500">Days left</span>

                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {index % 2 === 0 ? '42 days' : '64 days'}
                </span>
              </div>
              <img src="/placeholder.svg" alt={item} className="w-full h-40 object-cover rounded mb-2" />
              <h4 className="font-semibold">{item}</h4>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-sm text-gray-500">Ticket price:</p>
                  <p className="font-semibold text-orange-500">2 DOLLARS</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Event time:</p>
                  <p className="text-sm">05/04/2023</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Tickets sold: 79%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '79%' }}></div>
                </div>
              </div>
              {index === 1 ? (
                <div className="flex justify-between items-center mt-4">
                  <button className="bg-gray-200 text-gray-600 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <span className="text-xl font-semibold">1</span>
                  <button className="bg-gray-200 text-gray-600 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button className="w-full bg-yellow-400 text-white py-2 rounded-lg mt-4 font-semibold" onClick={() => {moveNext()}}>
                  Buy ticket
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}