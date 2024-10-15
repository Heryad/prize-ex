'use client'
import { BellDot, Minus, Plus } from "lucide-react";
import coin from '@/img/coin.png'
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter()

  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])
  const [isBarOpen, setIsBarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([{ nameEN: '', imagePath: '' }]);
  const [itemData, setItemData] = useState([{ imagePath: '', itemName: '', itemDate: '', itemPrice: '', itemSoldQuantity: '', _id: '', itemCategory: '' }]);
  const [searchData, setSearchData] = useState([{ imagePath: '', itemName: '', itemDate: '', itemPrice: '', itemSoldQuantity: '', _id: '', itemCategory: '' }]);
  const [basketData, setBasketData] = useState(1);
  const [filterEntry, setFilterEntry] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  //User Profile
  const [userName, setUserName] = useState('N/A');
  const [userBalance, setUserBalance] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    const loginResp = await fetch('/dashboard/api/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramID: localStorage.getItem('userID') })
    });
    const mLoginData = await loginResp.json();
    setUserName(mLoginData.data.userName);
    setUserBalance(mLoginData.data.userBalance);

    const catResp = await fetch('dashboard/api/Category')
    const mCatData = await catResp.json();
    setCategoryData(mCatData);

    const itemResp = await fetch('dashboard/api/Lottery')
    const mItemData = await itemResp.json();
    setItemData(mItemData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleNavigate = (id: string) => {
    const data = { id: id }

    // Convert the data object to a query string
    const queryString = new URLSearchParams(data).toString()

    // Navigate to the destination page with the data
    router.push(`dashboard/items?${queryString}`)
  }

  function handleSearch(term: string) {
    setFilterEntry(filterEntry + 1)
    let mData = itemData;
    mData = itemData.filter((itemData: { itemCategory: string; }) =>
      itemData.itemCategory.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    )
    if(filterEntry == 2){
      setSearchData([{ imagePath: '', itemName: '', itemDate: '', itemPrice: '', itemSoldQuantity: '', _id: '', itemCategory: '' }])
      setFilterEntry(1);
    }else{
      setSearchData(mData);
    }
  }

  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const insertTicket = async () => {
    setPurchaseLoading(true);
    const rs = await fetch('/dashboard/api/Ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemID: itemData[itemIndex]._id, itemName: itemData[itemIndex].itemName, itemImage: itemData[itemIndex].imagePath, itemPrice: itemData[itemIndex].itemPrice, ticketQty: basketData, ticketStatus: 'Pending', ticketResult: 'n/a', purchaseDate: 'now date', lotteryDate: itemData[itemIndex].itemDate, userName: localStorage.getItem('userName'), userID: localStorage.getItem('userID') })
    })
    if (rs.status == 200) {
      const mCatData = await rs.json();
      if(mCatData.msg == 'Balance Error'){
        toast('Balance Error : Enough amount not available')
        setIsBarOpen(false);
        setItemPrice(0);
        setItemIndex(0);
        setPurchaseLoading(false);
        setBasketData(1);
      }else if(mCatData.msg == 'Quantity Error'){
        toast('Quantity Error : Enough amount not available')
        setIsBarOpen(false);
        setItemPrice(0);
        setItemIndex(0);
        setPurchaseLoading(false);
        setBasketData(1);
      }
      else{
        toast('Ticket Purchased Succesfully')
        setPurchaseLoading(false);
        setIsBarOpen(false);
        setItemPrice(0);
        setItemIndex(0);
        setBasketData(1);

        const loginResp = await fetch('/dashboard/api/Login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ telegramID: localStorage.getItem('userID') })
        });
        const mLoginData = await loginResp.json();
        setUserName(mLoginData.data.userName);
        setUserBalance(mLoginData.data.userBalance);
      }
    }
  }

  return (
    <div className='flex-col h-screen items-center overflow-auto bg-gray-100'>
      {/* Header Bar */}
      <section className="flex flex-row w-screen h-20 items-center">
        <span className="p-3 bg-[#FBDFB1] rounded-full ml-5 font-bold">{userName}</span>
        <BellDot size={45} className="p-2 bg-white rounded-full ml-auto" />
        <div className="flex flex-row ml-2 mr-5 p-2 bg-white rounded-full items-center">
          <Image src={coin} width={25} height={25} alt="coin" />
          <span className="text-center ml-2 mr-2 pt-1 font-bold">{userBalance}</span>
          <Plus size={35} className="p-1 bg-gray-200 rounded-full" onClick={() => { router.push('dashboard/payment') }} />
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
      {isLoading ?
        <div className="flex justify-center items-center mt-12">
          <ProgressIndicator className='mt-auto mb-10' size={30} />
        </div>
        :
        <>
          {/* Categories Bar */}
          <section className="flex flex-col w-screen mt-3">
            <span className="ml-4 font-bold">Categories</span>

            <ScrollArea className="w-full whitespace-nowrap rounded-md mt-3 overflow-hidden">
              <div className="flex w-max space-x-4 pl-4 pr-4 overflow-hidden">
                {categoryData.map((item, index) => (
                  <div key={index} className='w-[190px] bg-white rounded-lg' onClick={() => { handleSearch(item.nameEN)}}>
                    <span className="font-semibold mt-2 mb-2 ml-4 flex">{item.nameEN}</span>
                    <div className="flex w-full h-20 justify-center items-center">
                      <Image className="max-h-[120px] p-3" width={150} height={10} src={item.imagePath} alt="coin" />
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
          {/* Items Banner */}
          <section className={`flex flex-col w-screen mt-3 ${isBarOpen ? 'mb-20' : 'mb-2'}`}>
            <span className="ml-4 font-bold">Draws</span>

            <div className="grid grid-cols-2 ml-4 mr-4 mt-1">
              {searchData[0].imagePath != '' ?
                <>
                  {searchData.map((item, index) => (
                    <div className="bg-white rounded-lg m-2" key={index}>
                      <div className="flex flex-row p-3 items-center">
                        <span className="text-md text-gray-600">Days Left</span>
                        <span className="ml-auto bg-blue-500 text-white rounded-md p-1">0 Days</span>
                      </div>
                      <div className="flex justify-center" onClick={() => { handleNavigate(item._id) }}>
                        <Image src={item.imagePath} alt="1" width={150} height={150} className="max-h-[150px] max-w-[150px] min-w-[150px] min-h-[150px]" onClick={() => { }} />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-center max-w-32 font-bold mb-1 mt-1">{item.itemName}</span>
                        <span className="flex w-40 h-[1px] bg-gray-200 ml-1 mr-1" />

                        <div className="flex flex-row w-full pl-3 pr-3 items-center mt-2">
                          <span className="text-[14px] text-gray-600">Ticket Price :</span>
                          <span className="ml-auto text-orange-600 font-bold">{item.itemPrice} $</span>
                        </div>
                        <div className="flex flex-row w-full pl-3 pr-3 items-center mt-1">
                          <span className="text-[14px] text-gray-600">Event Time :</span>
                          <span className="ml-auto font-bold text-sm">{item.itemDate}</span>
                        </div>
                        <div className="flex flex-col w-full pl-3 pr-3 mt-2">
                          <span className="text-[14px] text-gray-600">Tickets Sold : {item.itemSoldQuantity}%</span>
                          <Progress value={parseInt(item.itemSoldQuantity)} className="mt-1 h-2" />

                          <Button className="mt-3 mb-2 rounded-lg bg-yellow-400 text-black font-bold" onClick={() => { setIsBarOpen(true); setItemPrice(parseInt(item.itemPrice)); setItemIndex(index)}}>Buy Ticket</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </> :
                <>
                  {itemData.map((item, index) => (
                    <div className="bg-white rounded-lg m-2" key={index}>
                      <div className="flex flex-row p-3 items-center">
                        <span className="text-md text-gray-600">Days Left</span>
                        <span className="ml-auto bg-blue-500 text-white rounded-md p-1">0 Days</span>
                      </div>
                      <div className="flex justify-center" onClick={() => { handleNavigate(item._id) }}>
                        <Image src={item.imagePath} alt="1" width={150} height={150} className="max-h-[150px] max-w-[150px] min-w-[150px] min-h-[150px]" onClick={() => { }} />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-center max-w-32 font-bold mb-1 mt-1">{item.itemName}</span>
                        <span className="flex w-40 h-[1px] bg-gray-200 ml-1 mr-1" />

                        <div className="flex flex-row w-full pl-3 pr-3 items-center mt-2">
                          <span className="text-[14px] text-gray-600">Ticket Price :</span>
                          <span className="ml-auto text-orange-600 font-bold">{item.itemPrice} $</span>
                        </div>
                        <div className="flex flex-row w-full pl-3 pr-3 items-center mt-1">
                          <span className="text-[14px] text-gray-600">Event Time :</span>
                          <span className="ml-auto font-bold text-sm">{item.itemDate}</span>
                        </div>
                        <div className="flex flex-col w-full pl-3 pr-3 mt-2">
                          <span className="text-[14px] text-gray-600">Tickets Sold : {item.itemSoldQuantity}%</span>
                          <Progress value={parseInt(item.itemSoldQuantity)} className="mt-1 h-2" />

                          <Button className="mt-3 mb-2 rounded-lg bg-yellow-400 text-black font-bold" onClick={() => { setIsBarOpen(true); setItemPrice(parseInt(item.itemPrice)); setItemIndex(index)}}>Buy Ticket</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              }
            </div>
          </section>
        </>
      }

      <div className="fixed bottom-[70px] left-0 right-0 bg-yellow-500 text-primary-foreground p-4 shadow-lg z-50" hidden={!isBarOpen}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-row gap-5 items-center">
            <Minus className="bg-white text-black rounded-full w-8 h-8" onClick={() => { basketData >= 2 ? setBasketData(basketData - 1) : setIsBarOpen(false) }} />
            <span className="ml-1 mr-1 text-xl font-bold">{basketData}</span>
            <Plus className="bg-white text-black rounded-full w-8 h-8" onClick={() => { setBasketData(basketData + 1) }} />

          </div>
          <span className="font-bold text-2xl ml-auto mr-4">{itemPrice * basketData} $</span>

          <Button className="bg-white text-black rounded-xl h-10 font-semibold" onClick={() => {insertTicket()}}>
            {purchaseLoading ? <ProgressIndicator /> : 'Purchase'}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}