'use client'
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Bookmark() {
  const [itemData, setItemData] = useState([{ imagePath: '', itemName: '', itemDate: '', itemPrice: '', itemSoldQuantity: '', _id: '', itemCategory: '' }]);

  const fetchData = async () => {
    const itemResp = await fetch('/dashboard/api/Lottery')
    const mItemData = await itemResp.json();

    const bookmarkTerm = localStorage.getItem('itemKey') || '';
    for(let i = 0; i <= mItemData.length -1; i++){
      if(mItemData[i]._id == bookmarkTerm){
        console.log('found match', mItemData[i].itemName);
        setItemData(mItemData);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='h-screen flex flex-col items-center'>
      <section className='flex flex-col w-screen mt-3'>
        <span className="ml-4 font-bold">Bookmarks</span>

        {itemData[0].imagePath == '' ? 
        <div className="flex mt-96 justify-center items-center">
          <span className="font-bold text-xl">No Bookmarks !</span>
        </div>
         : 
        <div className="grid grid-cols-2 ml-4 mr-4 mt-1">
            <div className="bg-white rounded-lg m-2">
              <div className="flex flex-row p-3 items-center">
                <span className="text-md text-gray-600">Days Left</span>
                <span className="ml-auto bg-blue-500 text-white rounded-md p-1">42 Days</span>
              </div>
              <div className="flex justify-center" onClick={() => {  }}>
                <Image src={itemData[0].imagePath} alt="1" width={150} height={150} className="max-h-[150px] max-w-[150px] min-w-[150px] min-h-[150px]" onClick={() => { }} />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-center max-w-32 font-bold mb-1 mt-1">{itemData[0].itemName}</span>
                <span className="flex w-40 h-[1px] bg-gray-200 ml-1 mr-1" />

                <div className="flex flex-row w-full pl-3 pr-3 items-center mt-2">
                  <span className="text-[14px] text-gray-600">Ticket Price :</span>
                  <span className="ml-auto text-orange-600 font-bold">{itemData[0].itemPrice} $</span>
                </div>
                <div className="flex flex-row w-full pl-3 pr-3 items-center mt-1">
                  <span className="text-[14px] text-gray-600">Event Time :</span>
                  <span className="ml-auto font-bold text-sm">{itemData[0].itemDate}</span>
                </div>
                <div className="flex flex-col w-full pl-3 pr-3 mt-2">
                  <span className="text-[14px] text-gray-600">Tickets Sold : {itemData[0].itemSoldQuantity}%</span>
                  <Progress value={parseInt(itemData[0].itemSoldQuantity)} className="mt-1 h-2" />

                  <Button className="mt-3 mb-2 rounded-lg bg-yellow-400 text-black font-bold" onClick={() => {}}>Buy Ticket</Button>
                </div>
              </div>
            </div>
        </div>}
      </section>
    </div>
  );
}