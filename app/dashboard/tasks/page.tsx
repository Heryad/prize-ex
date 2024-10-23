'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import coin from '@/img/coin.png'
import { ChevronRight } from "lucide-react"
import { ProgressIndicator } from "@/components/ui/ProgressIndicator"

export default function Component() {
  const [dataMode, setDataMode] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  const [taskData, setTaskData] = useState([{ taskName: '', taskReward: '', taskType: '', imagePath: '' }]);


  const fetchData = async () => {
    setIsLoading(true);
    const taskResp = await fetch('./api/Task')
    const mTaskData = await taskResp.json();
    setTaskData(mTaskData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='h-screen flex flex-col items-center overflow-auto bg-gray-100'>
      <div className="flex mt-8 items-center justify-center">
        <Button className={`w-44 h-12 rounded-full black border-none ml-1 mr-1 hover:bg-[#5E6BFE] ${dataMode == 0 ? 'bg-[#5E6BFE]' : 'bg-white text-black'}`} onClick={() => { setDataMode(0) }}>New Tasks</Button>
        <Button className={`w-44 h-12 rounded-full black border-none ml-1 mr-1 hover:bg-[#5E6BFE] ${dataMode == 1 ? 'bg-[#5E6BFE]' : 'bg-white text-black'}`} onClick={() => { setDataMode(1) }}>Finished Tasks</Button>
      </div>

      <section className="w-screen mt-5 p-4">
        <span className="text-xl">{dataMode == 0 ? 'Task List' : 'Finished Tasks'}</span>

        {dataMode == 0 ?
        <>
          {isLoading ? <div className="flex justify-center mt-10"><ProgressIndicator /></div>
            : taskData[0].taskName == '' ? <div className="flex justify-center mt-10"><span>No Task Available</span></div>
              : <section className="mt-6 mb-3">
                {taskData.map((item, index) => (
                  <div className="flex flex-row bg-white rounded-2xl shadow-md mt-3 pt-4 pb-4 pl-4 items-center" key={index}>
                  <Image src={item.imagePath} alt="" height={60} width={60} />
                  <div className="flex flex-col ml-4">
                    <span className="text-lg">{item.taskName}</span>
                    <div className="flex flex-row pt-2">
                      <Image src={coin} alt="" height={25} width={25} />
                      <span className="pl-2 font-bold">+{item.taskReward}</span>
                    </div>
                  </div>
                  <ChevronRight className="ml-auto mr-2 text-gray-500" />
                </div>
                ))}
              </section>
          }
        </> :
        <>
          
        </>}
      </section>
    </div>
  )
}