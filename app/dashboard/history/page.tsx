'use client'
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function PaymentHistory() {
    const [itemData, setItemData] = useState([{methodName: '', paymentDate: '', paymentStatus: '', paymentAmount: ''}]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const fetchData = async () => {
        setIsLoading(true);
        const rs = await fetch('/dashboard/api/History', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID: localStorage.getItem('userID') })
        })
        if (rs.status == 200) {
            const mrs = await rs.json();
            setItemData(mrs);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='flex-col h-screen items-center overflow-auto bg-gray-100'>
            <section className="flex items-center ml-5 mt-5">
                <button className="mr-4" onClick={() => { router.back(); }}>
                    <ChevronLeft className="h-6 w-6" />
                </button>
            </section>
            <section className='flex flex-col justify-center p-4'>
                <span className='text-center text-xl mb-3'>Payment Request History</span>
                {isLoading ? <ProgressIndicator className='mt-auto mb-10 self-center' size={30} />
                : <>
                    {itemData.map((item, index) => (
                        <div className="flex flex-col bg-white mt-4 p-2 rounded-lg" key={index}>
                        <span className="flex text-center self-center text-xl">Deposit</span>
    
                        <div className="flex flex-row mt-3 p-2">
                            <span className="text-[20px] text-gray-500">Payment Method :</span>
                            <span className="text-[20px] ml-auto">{item.methodName}</span>
                        </div>
    
                        <div className="flex flex-row p-2">
                            <span className="text-[20px] text-gray-500">Date :</span>
                            <span className="text-[20px] ml-auto">{item.paymentDate}</span>
                        </div>
    
                        <div className="flex flex-row p-2 items-center">
                            <span className="text-[20px] text-gray-500">Status :</span>
                            <span className={`text-[20px] ml-auto p-2 rounded-lg ${item.paymentStatus == 'pending' ? 'bg-orange-600 text-orange-100' : 'bg-green-600 text-green-100'}`}>{item.paymentStatus}</span>
                        </div>
    
                        <div className="flex h-[1px] bg-gray-300 ml-3 mr-3 mt-1 mb-1" />
    
                        <div className="flex flex-row p-2 items-center">
                            <span className="text-[20px] text-gray-500">Total :</span>
                            <span className="text-[22px] ml-auto font-bold">{item.paymentAmount} $</span>
                        </div>
                    </div>
                    ))}
                </>}
            </section>
        </div>
    )
}
