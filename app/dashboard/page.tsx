'use client'
import { BellDot, Plus } from "lucide-react";
import coin from '@/img/coin.png'
import Image from "next/image";
import React, { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])
  const [isBar] = useState(true);

  const router = useRouter();

  const moveNext = () => {
    router.push('/dashboard/items');
  }

  const items = [
    {
      itemName: 'Cars',
      imgURL: 'https://s3-alpha-sig.figma.com/img/283d/6a67/f081a2b907ada331acda430adefbd53b?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VdIaLhDcuf0LHgfyOQgTp4-kOnIpy~Pt50ohFW1ahpcuzp-5lFl8ZOEvQ3u9vMAiqZ6e8KPCmZwFLYpJyXspwVO~QjaqoqUCGwslVnxUF39urwa~aR-RLqtU-xGImQlj6RAX4LRtd2rS6AJ63pLS1GHVwK2fWpPeQiDG2BHVGkQZP1Xoa9R5GZSyibvUeIewccYFTM3fRe9cfzeMFFKAZm3duqk0aD8zZUcSbP5Nk5Hnfs472Hv1Pubpbenx287ABmRL2b~zDf9aTOG3LLS3eB91Wv8QWhBPSqryDvWeKjd60uxqb6AN~iMC-Cu00fucEJRwySn4VeOZ3LXrkG3JIw__'
    },
    {
      itemName: 'Electronics',
      imgURL: 'https://s3-alpha-sig.figma.com/img/c319/787e/206111fc550e203e578e81ea2e005703?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qeAablLT~v8yMlpGFz9oTsJJIJYtP5FIP5WQs4kVRcmIHGG5XB10IYoJvXdsK-emqAfYqwUrssBBxC587BY8hyDUcMb~dQDV3HqXa-nqmJ77YPldSbrVFpubAbsHKkFN3EhtWKyLJTsX5s3OraqJWqjxGJsNSdvTApFXxYhBXdcBsZAEpaGZjNXdmiHTjGnqQVzojX1yAjyl2~YYo~P3gh-OSNW~p61nqOGLKQWOnpk7Q2BjpBRRck2FeAWT~Pyml9jFtgY99y0VjiwwVbLCdnsO7ZI8mlwR4YQ6MePqRed0brLZR~KftzM7rPl5Xv80Rs6TtDCAYunD2FA1HNn0IA__'
    },
    {
      itemName: 'Cars',
      imgURL: 'https://s3-alpha-sig.figma.com/img/283d/6a67/f081a2b907ada331acda430adefbd53b?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VdIaLhDcuf0LHgfyOQgTp4-kOnIpy~Pt50ohFW1ahpcuzp-5lFl8ZOEvQ3u9vMAiqZ6e8KPCmZwFLYpJyXspwVO~QjaqoqUCGwslVnxUF39urwa~aR-RLqtU-xGImQlj6RAX4LRtd2rS6AJ63pLS1GHVwK2fWpPeQiDG2BHVGkQZP1Xoa9R5GZSyibvUeIewccYFTM3fRe9cfzeMFFKAZm3duqk0aD8zZUcSbP5Nk5Hnfs472Hv1Pubpbenx287ABmRL2b~zDf9aTOG3LLS3eB91Wv8QWhBPSqryDvWeKjd60uxqb6AN~iMC-Cu00fucEJRwySn4VeOZ3LXrkG3JIw__'
    },
  ]

  return (
    <div className='flex-col h-screen items-center overflow-auto bg-gray-100'>
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
            <div className="bg-white h-full flex justify-center items-center rounded-lg ml-4 mr-4">
              <span>one</span>
            </div>
          </div>

          <div className="embla__slide w-screen">
            <div className="bg-white h-full flex justify-center items-center rounded-lg ml-4 mr-4">
              <span>two</span>
            </div>
          </div>
        </div>
      </section>
      {/* Categories Bar */}
      <section className="flex flex-col w-screen mt-3">
        <span className="ml-4 font-bold">Categories</span>

        <ScrollArea className="w-full whitespace-nowrap rounded-md mt-3 overflow-hidden">
          <div className="flex w-max space-x-4 pl-4 pr-4 overflow-hidden">
            {items.map((item, index) => (
              <div key={index} className="w-[190px] bg-white rounded-lg">
                <span className="font-semibold mt-2 mb-2 ml-4 flex">{item.itemName}</span>
                <div className="flex w-full h-20 justify-center items-center">
                  <Image className="max-h-[120px] p-3" width={150} height={10} src={item.imgURL} alt="coin" />
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
      {/* Items Banner */}
      <section className="flex flex-col w-screen mt-3">
        <span className="ml-4 font-bold">Draws</span>

        <div className="grid grid-cols-2 ml-4 mr-4 mt-1">
          {/* Card */}
          <div className="bg-white rounded-lg m-2">
            <div className="flex flex-row p-3 items-center">
              <span className="text-md text-gray-600">Days Left</span>
              <span className="ml-auto bg-blue-500 text-white rounded-md p-1">42 Days</span>
            </div>
            <div className="flex justify-center">
              <Image src={items[1].imgURL} alt="1" width={150} height={150} className="max-h-[150px] max-w-[150px] min-w-[150px] min-h-[150px]" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-center max-w-32 font-bold mb-1 mt-1">Ipad Pro 256GB Space Gray</span>
              <span className="flex w-40 h-[1px] bg-gray-200 ml-1 mr-1" />

              <div className="flex flex-row w-full pl-3 pr-3 items-center mt-2">
                <span className="text-[14px] text-gray-600">Ticket Price :</span>
                <span className="ml-auto text-orange-600 font-bold">200 TMT</span>
              </div>
              <div className="flex flex-row w-full pl-3 pr-3 items-center mt-1">
                <span className="text-[14px] text-gray-600">Event Time :</span>
                <span className="ml-auto font-bold">12/12/2024</span>
              </div>
              <div className="flex flex-col w-full pl-3 pr-3 mt-2">
                <span className="text-[14px] text-gray-600">Tickets Sold : 79%</span>
                <Progress value={25} className="mt-1 h-2" />

                <Button className="mt-3 mb-2 rounded-lg bg-yellow-400 text-black font-bold">Buy Ticket</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-[70px] left-0 right-0 bg-yellow-500 text-primary-foreground p-4 shadow-lg z-50" hidden={isBar}>
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-lg font-bold">290$</p>
          <Button className="bg-white text-black rounded-lg h-10 font-semibold">
            Complete Purchase
          </Button>
        </div>
      </div>
    </div>
  );
}