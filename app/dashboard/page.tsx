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
      <div className="flex flex-col w-screen mt-3">
        <span className="ml-4 font-bold">Draws</span>

        <div className={isBar ? 'space-y-4 mt-3 ml-3 mr-3 mb-3' : 'space-y-4 mt-3 ml-3 mr-3 mb-[80px]'}>
          {['Ipad Pro 256GB Space Grey'].map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2" onClick={() => { moveNext() }}>
                <span className="text-gray-500">Days left</span>

                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {index % 2 === 0 ? '42 days' : '64 days'}
                </span>
              </div>
              <Image alt='1221' width={100} height={100} src="https://s3-alpha-sig.figma.com/img/2395/20af/e36966274aef2836ab3c3561f6b69a23?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o1IvKWbdxay0wE1EnVnoMCVvgEvyaQNtc-7A3ajoTqyDQvDt4Ddaf~CxcMl0NEuhzApTebTMWN4uSKM5mX0ieT-TCj0SJWDv88phqlVGvDWL3fmTw1pt-4OvobnyCqb1YRFBcOu0INXk~DgH-5rK7n-WYHVRKQeK92HHYBt9xvM5Sg0l4tKWGPRGAhK-vWCYsOE209hggFdtypDRrWnhzHX-1I--M22GgLon4nL-BQmyL-Ml5g84BbzNfBI3pEOdAYpXS6vjH8-Q1TaKIQsaB3LDtDv29pcGU9tPagZ6ioJN5dzeZu4-U9lowbCDu6-yi33fAC0iztRdXDEqYbmVgA__" className="object-cover" />
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
                <button className="w-full bg-yellow-400 text-white py-2 rounded-lg mt-4 font-semibold" onClick={() => { moveNext() }}>
                  Buy ticket
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

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