'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import coin from '@/img/coin.png'
import { Check, ChevronRight, X } from "lucide-react"
import { ProgressIndicator } from "@/components/ui/ProgressIndicator"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Component() {
  const [dataMode, setDataMode] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  const [taskData, setTaskData] = useState([{ taskName: '', taskReward: '', taskType: '', imagePath: '', taskURL: '' }]);
  const [finishedData, setFinishedData] = useState([{ taskName: '', taskReward: '', imagePath: '' }]);
  const [itemIndex, setItemIndex] = useState(0);
  const [bannerOpen, SetBannerOpen] = useState(false);

  const [time, setTime] = useState(30)
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)

    } else if (time === 0) {
      setIsRunning(false);
      setTime(30);
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, time])

  useEffect(() => {
    fetchData()
    fetchFinishedTasks();
  }, [])

  const fetchData = async () => {
    setIsLoading(true);
    const taskResp = await fetch('./api/Task')
    const mTaskData = await taskResp.json();
    setTaskData(mTaskData);
    setIsLoading(false);
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const [claimLoading, setClaimLoading] = useState(false);

  const openLink = () => {
    if (isDone) {
      setClaimLoading(true);
      fetch('/dashboard/api/Balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID: localStorage.getItem('userID'), paymentAmount: taskData[itemIndex].taskReward })
      }).then(response => response.json())
        .then(data => {
          console.log(data);
          insertFTask();
        });
    } else {
      setIsRunning(true);
      setIsDone(true);
      window.open(taskData[itemIndex].taskURL, '_blank', 'noopener,noreferrer')
    }
  }

  const insertFTask = async () => {
    fetch('/dashboard/api/Finished', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskName: taskData[itemIndex].taskName, taskReward: taskData[itemIndex].taskReward, imagePath: taskData[itemIndex].imagePath, userID: localStorage.getItem('userID') })
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        setClaimLoading(false);
        toast('Reward Claimed Successfuly !');
        SetBannerOpen(false);
        setIsDone(false);
        fetchFinishedTasks();
      });
  }

  const fetchFinishedTasks = async () => {
    fetch('/dashboard/api/Finished', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID: localStorage.getItem('userID') })
    }).then(response => response.json())
      .then(data => {
        setFinishedData(data);
      });
  }

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
                    <div className="flex flex-row bg-white rounded-2xl shadow-md mt-3 pt-4 pb-4 pl-4 items-center" key={index} onClick={() => { SetBannerOpen(true); setItemIndex(index); setIsDone(false) }}>
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
            <section className="mt-6 mb-3">
              {finishedData.map((item, index) => (
                <div className="flex flex-row bg-white rounded-2xl shadow-md mt-3 pt-4 pb-4 pl-4 items-center" key={index}>
                  <Image src={item.imagePath} alt="" height={60} width={60} />
                  <div className="flex flex-col ml-4">
                    <span className="text-lg">{item.taskName}</span>
                    <div className="flex flex-row pt-2">
                      <Image src={coin} alt="" height={25} width={25} />
                      <span className="pl-2 font-bold">+{item.taskReward}</span>
                    </div>
                  </div>
                  <Check className="ml-auto mr-2 text-gray-500" />
                </div>
              ))}
            </section>
          </>}
      </section>

      <div className="fixed h-[400px] bottom-[70px] left-0 right-0 shadow-[0px_-70px_50px_18px_rgba(204,204,204,0.86)] bg-white text-primary-foreground border-none p-3 rounded-t-lg z-50" hidden={!bannerOpen}>
        <X color="black" className="ml-auto" onClick={() => { SetBannerOpen(false); setIsRunning(false); setTime(30) }} />
        <div className="flex flex-col gap-5 justify-center items-center">
          <Image src={taskData[itemIndex].imagePath} alt="" width={80} height={80} />
          <span className="text-black text-2xl">{taskData[itemIndex].taskName}</span>
          <span className="text-black font-bold text-center">Wait {formatTime(time)} <br />for moderation check to claim the prize</span>
          <div className="flex flex-row items-center justify-center gap-x-2">
            <Image src={coin} alt="" width={35} height={35} />
            <span className="text-black font-bold text-lg">+{taskData[itemIndex].taskReward}</span>
          </div>
          <Button className="w-56 h-14 rounded-xl text-lg" onClick={() => { openLink() }} disabled={isRunning}>{!isDone ? 'Check' : claimLoading ? 'Claiming ...' : 'Claim Rewards'}</Button>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}