'use client'
import { Button } from "@/components/ui/button"
import { ProgressIndicator } from "@/components/ui/ProgressIndicator"
import { ArrowLeft, Check, Timer } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from 'react'

export default function MyTickets() {

  const [isLoading, setIsLoading] = useState(false);
  const [itemData, setItemData] = useState([{ ticketStatus: '', ticketResult: '', itemImage: '', itemName: '', lotteryDate: '', itemPrice: '', ticketQty: '' }]);
  const [resultData, setResultData] = useState([{ itemName: '', imagePath: '', itemDate: '', lotteryWinner: '', _id: '' }]);
  const [dataMode, setDataMode] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    const itemResp = await fetch('/dashboard/api/Ticket', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID: localStorage.getItem('userID') })
    });
    const mCatData = await itemResp.json();
    if (mCatData.length >= 1) {
      setItemData(mCatData);
    } else {
      console.log('empty data');
    }
    setIsLoading(false);
  }

  const fetchResultData = async () => {
    const resultResp = await fetch('./api/Results')
    const mResultData = await resultResp.json();
    setResultData(mResultData);
  }

  useEffect(() => {
    fetchData();
    fetchResultData();
  }, [])

  return (
    <div className="flex-col h-screen items-center overflow-auto bg-gray-100">
      <div className="flex items-center mt-5">
        <ArrowLeft className="ml-5 bg-white rounded-full p-2" size={35} />
        <h1 className="text-xl font-semibold flex-grow text-center -ml-14">My tickets</h1>
      </div>

      <div className="flex mt-8 items-center justify-center">
        <Button className={`w-44 h-12 rounded-full black border-none ml-1 mr-1 hover:bg-[#5E6BFE] ${dataMode == 0 ? 'bg-[#5E6BFE]' : 'bg-white text-black'}`} onClick={() => { setDataMode(0) }}>My Tickets</Button>
        <Button className={`w-44 h-12 rounded-full black border-none ml-1 mr-1 hover:bg-[#5E6BFE] ${dataMode == 1 ? 'bg-[#5E6BFE]' : 'bg-white text-black'}`} onClick={() => { setDataMode(1) }}>Results</Button>
      </div>

      {dataMode == 0 ?
        <>
          {isLoading ? <div className="flex justify-center mt-10"><ProgressIndicator /></div>
            : itemData[0].ticketStatus == '' ? <div className="flex justify-center mt-10"><span>No Tickets</span></div>
              : <section className="mt-6 mb-3">
                {itemData.map((item, index) => (
                  <div className="flex flex-col bg-white mr-4 ml-4 rounded-lg p-2 mt-2" key={index}>
                    {item.ticketStatus != 'Pending' ? <section className={`flex items-center justify-center p-2 rounded-lg ml-2 mr-2 mt-2 ${item.ticketResult == 'won' ? 'bg-green-300' : 'bg-red-300'}`}>
                      <span className={`pt-1 pb-1 font-semibold ${item.ticketResult == 'won' ? 'text-green-600' : 'text-red-600'}`}>{item.ticketResult == 'won' ? 'Congratulations you have won! 🥳' : 'Unfortunately you lost '}</span>
                    </section> : <></>}

                    <section className="flex flex-row w-full mt-4">
                      <div className="bg-white rounded-md ml-2 w-52 h-42 justify-center content-center">
                        <Image alt="edde" src={item.itemImage} width={130} height={130} />
                      </div>
                      <div className="flex flex-col w-full">
                        <span className="pl-2 text-lg font-bold max-w-52">{item.itemName}</span>
                        <div className="flex w-full mt-1">
                          <span className="pl-2 text-gray-400">Duration :</span>
                          <span className="ml-auto mr-4 font-semibold">{item.lotteryDate}</span>
                        </div>
                        <div className="flex w-full mt-1">
                          <span className="pl-2 text-gray-400">Ticket Price :</span>
                          <span className="ml-auto mr-4 font-semibold">{item.itemPrice} $</span>
                        </div>
                        <div className="flex w-full mt-1">
                          <span className="pl-2 text-gray-400">Purchased Tickets :</span>
                          <span className="ml-auto mr-4 font-semibold">{item.ticketQty}</span>
                        </div>
                        <div className="flex w-full mt-1">
                          <span className="pl-2 text-gray-400">Total :</span>
                          <span className="ml-auto mr-4 font-semibold text-orange-500">{parseInt(item.itemPrice) * parseInt(item.ticketQty)} $</span>
                        </div>
                      </div>
                    </section>

                    <div className="flex h-[1px] bg-gray-200 ml-4 mr-4 mt-4" />

                    <section className="mt-4 ml-4 mb-2">
                      <Button className={`rounded-full p-5 ${item.ticketStatus == 'Pending' ? 'bg-orange-500' : 'bg-blue-600'}`}>{item.ticketStatus == 'Pending' ? <Timer className="mr-2" /> : <Check className="mr-2" />}{item.ticketStatus}</Button>
                    </section>
                  </div>
                ))}
              </section>
          }
        </> :
        <>
          {isLoading ? <div className="flex justify-center mt-10"><ProgressIndicator /></div>
            : resultData.length >= 1 ? <section className="mt-6 mb-3">
              {resultData.map((item, index) => (
                <div className="flex flex-row bg-white mr-4 ml-4 mt-3 p-2 rounded-lg justify-center items-center" key={index}>
                  <div className="bg-white rounded-md ml-2 w-52 h-42 justify-center content-center">
                    <Image alt="edde" src={item.imagePath} width={130} height={130} />
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="pl-2 text-lg font-bold max-w-52 line-clamp-2">{item.itemName}</span>
                    <div className="flex w-full mt-1">
                      <span className="pl-2 text-gray-400">Date :</span>
                      <span className="ml-auto mr-4 font-semibold">{item.itemDate}</span>
                    </div>
                    <div className="flex w-full mt-1">
                      <span className="pl-2 text-gray-400">Winner :</span>
                      <span className="ml-auto mr-4 font-semibold">{item.lotteryWinner}</span>
                    </div>
                    <div className="flex w-full mt-1">
                      <span className="pl-2 text-gray-400">Ticket No :</span>
                      <span className="ml-auto mr-4 font-semibold">{item._id.substring(0, 7)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>
              : <div className="flex justify-center mt-10"><span>No Tickets</span></div>
          }
        </>}
    </div>
  )
}