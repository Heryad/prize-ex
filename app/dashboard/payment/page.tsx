'use client'
import { useState } from 'react'
import { ChevronLeft, Clipboard } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import wallet from '@/img/wallet.png'
import trc from '@/img/trc.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function TopUpBalance() {
  const router = useRouter();

  const [amount, setAmount] = useState(0)

  const insertPayment = async () => {
    const date = new Date()
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const rs = await fetch('/dashboard/api/Payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ methodName: 'USDT-TRC20', paymentAmount: amount, userID: localStorage.getItem('userID'), paymentDate: formattedDate, userName: localStorage.getItem('userName'), paymentStatus: 'pending' })
    })
    if (rs.status == 200) {
      alert('Payment Completed');
      router.back();
    }
  }

  return (
    <div className='flex-col h-screen items-center overflow-auto bg-gray-100'>
      <section className="flex items-center ml-5 mt-5">
        <button className="mr-4" onClick={() => {router.back();}}>
          <ChevronLeft className="h-6 w-6" />
        </button>
      </section>

      <section className='flex flex-col justify-center mt-2 p-4'>
        <span className='text-center text-xl'>Top Up Balance</span>

        <span className='mt-5 pl-1 mb-1'>Amount</span>
        <Input placeholder='$' type='number' className='mt-1 bg-white rounded-xl h-14' value={amount} onChange={e => {setAmount(parseInt(e.target.value))}}/>

        <div className='bg-white flex flex-col rounded-xl mt-2 p-3'>
          <span className='font-bold text-gray-500 mt-2 mb-2'>Payment Method</span>

          <RadioGroup>
            <div className="space-y-2">
              <Label
                htmlFor="trc20"
                className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-center">
                  <Image src={trc} alt="trc20" width={35} height={35} className="mr-3" />
                  <span>USDT-TRC 20</span>
                </div>
                <RadioGroupItem value="trc20" id="trc20" />
              </Label>

            </div>
          </RadioGroup>

          <Image src={wallet} alt='' width={150} height={150} className='self-center mt-5' />
          <div className='flex flex-row justify-center items-center bg-gray-200 p-4 rounded-lg'>
            <span className='text-center text-sm'>TBXSuEEDjp8JdgXTtzJGaYx7qNq5h1KJrP</span>
            <Clipboard className='ml-2 bg-blue-500 rounded-xl p-2 text-blue-100' size={35}/>
          </div>
        </div>

        <div className="fixed bottom-[80px] left-4 right-4 rounded-lg z-50">
        <div className="container mx-auto flex flex-col justify-between items-center p-3">
          <div className='flex flex-row w-full items-center'>
            <span className='text-gray-400'>To be top up</span>
            <span className='font-bold ml-auto text-2xl'>{amount} $</span>
          </div>

          <Button className='mt-5 p-5 w-full rounded-full h-14 bg-blue-600 text-xl' onClick={() => {insertPayment();}}>
            Confirm Payment
          </Button>
        </div>
      </div>
      </section>
    </div>
  )
}