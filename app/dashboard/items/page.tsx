'use client'
import Image from "next/image"
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Bookmark, ChevronLeft } from "lucide-react"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"

export default function ContestPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const itemID = searchParams.get('id') ?? '';

  const [isBarOpen, setIsBarOpen] = useState(false);
  const [basketData, setBasketData] = useState(1);

  const [itemDetails, setItemDetails] = useState({ imagePath: '', itemName: '', itemDate: '', itemPrice: '', itemSoldQuantity: '', _id: '', drawRules: '', itemQuantity: '', itemCategory: '' });

  const fetchData = async () => {
    setIsLoading(true);

    const catResp = await fetch('/dashboard/api/LotterySingle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: itemID })
    });
    const mCatData = await catResp.json();
    setItemDetails(mCatData);
    setIsLoading(false);
  }

  const insertTicket = async () => {
    setIsLoading(true);
    const rs = await fetch('/dashboard/api/Ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemID: itemDetails._id, itemName: itemDetails.itemName, itemImage: itemDetails.imagePath, itemPrice: itemDetails.itemPrice, ticketQty: basketData, ticketStatus: 'Pending', ticketResult: 'n/a', purchaseDate: 'now date', lotteryDate: itemDetails.itemDate, userName: localStorage.getItem('userName'), userID: localStorage.getItem('userID') })
    })
    if (rs.status == 200) {
      const mCatData = await rs.json();
      if (mCatData.msg == 'Balance Error') {
        alert('Not Enaugh Balance to buy')
        router.back();
      } else {
        setIsLoading(false);
        alert('Purchase Succeful');
        router.back();
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const addBookmark = () => {
    localStorage.setItem('itemKey', itemDetails._id);
    alert('item added to bookmark')
  }

  return (
    <div className="h-screen flex-col items-center overflow-auto bg-gray-100">
      <header className="flex justify-between w-screen items-center p-4">
        <ChevronLeft className="w-6 h-6" onClick={() => { router.back() }} />
        <Bookmark className="w-6 h-6" onClick={() => { addBookmark() }} />
      </header>
      <main className="px-4">
        <Image
          src={itemDetails.imagePath}
          alt="BMW 5 520 M Sport"
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h1 className="text-2xl font-bold mt-4">{itemDetails.itemName}</h1>
        <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-orange-500 font-semibold">Continuing</div>
            <div className="text-gray-500">Days left</div>
          </div>
          <div className="mt-2 h-2 bg-orange-200 rounded-full">
            <div className="h-full w-3/4 bg-orange-500 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div>Applicants: {itemDetails.itemSoldQuantity}</div>
            <div>{itemDetails.itemDate}</div>
          </div>
          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => { setIsBarOpen(true) }}>Buy ticket</Button>
        </div>
        <div className="mt-4 bg-white border-none">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-2">Draw Rules</h2>
            <p className="text-sm text-gray-600 mb-2">
              {itemDetails.drawRules}
            </p>
          </CardContent>
        </div>
        <div className="fixed bottom-[70px] left-0 right-0 bg-yellow-500 text-primary-foreground p-4 shadow-lg z-50" hidden={!isBarOpen}>
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex flex-row gap-5 items-center">
              <Minus className="bg-white text-black rounded-full w-8 h-8" onClick={() => { basketData >= 2 ? setBasketData(basketData - 1) : setIsBarOpen(false) }} />
              <span className="ml-1 mr-1 text-xl font-bold">{basketData}</span>
              <Plus className="bg-white text-black rounded-full w-8 h-8" onClick={() => { setBasketData(basketData + 1) }} />

            </div>
            <span className="font-bold text-2xl ml-auto mr-4">{parseInt(itemDetails.itemPrice) * basketData} $</span>

            <Button className="bg-white text-black rounded-xl h-10 font-semibold" onClick={() => { insertTicket(); }} disabled={isLoading}>
              {isLoading ? 'Please Wait' : 'Purchase'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}