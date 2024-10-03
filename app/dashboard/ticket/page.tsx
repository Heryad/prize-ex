import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, TimerIcon } from "lucide-react"
import Image from "next/image"

export default function MyTickets() {
  return (
    <div className="flex-col h-screen items-center overflow-auto bg-gray-100">
      <div className="flex items-center mt-5">
        <ArrowLeft className="ml-5 bg-white rounded-full p-2" size={35} />
        <h1 className="text-xl font-semibold flex-grow text-center -ml-14">My tickets</h1>
      </div>

      <div className="flex mt-8 items-center justify-center">
        <Button className="w-44 h-12 rounded-full black border-none ml-1 mr-1 bg-[#5E6BFE]">Results</Button>
        <Button className="w-44 h-12 rounded-full bg-white text-black border-none ml-1 mr-1">Results</Button>
      </div>

      <section className="mt-6 mb-3">
        <div className="flex flex-col bg-white mr-4 ml-4 rounded-lg p-2 mt-2">
          <section className="flex bg-green-200 items-center justify-center p-2 rounded-lg ml-2 mr-2 mt-2">
            <span className="pt-1 pb-1 font-semibold text-green-600">Congratulations you have won! 🥳</span>
          </section>

          <section className="flex flex-row w-full mt-4">
            <div className="bg-gray-100 rounded-md ml-2 w-52 h-42 justify-center content-center">
              <Image alt="edde" src={'https://s3-alpha-sig.figma.com/img/7d1c/53ee/fef15958411f39c506f7e024a6d42879?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=myO7QE1V5mPF3iqsL15IO4aSZ0YbWvNwKmdny83CmrKGyvIpVUZomvCqHHL70~AOli~HzggDQqLHDED4pyuPZlE9ia1JU9hlD13Znqutt-dj1tNN6uksG5jc7vCpkFTIi4aDyHuDTYrmUoCESkTEq3trrO3iapTUk8jo8HOiq2GN6o~fyECj6T7ZoF1DcUmoSuHwfkGADwXAmBT1ahbvKwgr5TWCSIJQoldgfmomCQEqYi3ewE7yme8Tpx3sPfWci6rxPOE1Go-y8tzouTPXkCnroIG1-ZzKq2ZZfzLjn01qdwCAuMXifLhkaJb0ofhtXWMhtygAOK56APYTTb3SFQ__'} width={130} height={130} />
            </div>
            <div className="flex flex-col w-full">
              <span className="pl-2 text-lg font-bold max-w-52">Iphone 15 Pro 256GB Titanium Blue</span>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Duration :</span>
                <span className="ml-auto mr-4 font-semibold">02/21/2024</span>
              </div>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Ticket Price :</span>
                <span className="ml-auto mr-4 font-semibold">1,500 TMT</span>
              </div>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Purchased Tickets :</span>
                <span className="ml-auto mr-4 font-semibold">1 TK</span>
              </div>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Total :</span>
                <span className="ml-auto mr-4 font-semibold text-orange-500">1,500 TMT</span>
              </div>
            </div>
          </section>

          <div className="flex h-[1px] bg-gray-200 ml-4 mr-4 mt-4" />

          <section className="mt-4 ml-4 mb-2">
            <Button className="rounded-full bg-[#5E6BFE] p-5"><Check className="mr-2" /> Draw Completed</Button>
          </section>
        </div>

        <div className="flex flex-col bg-white mr-4 ml-4 rounded-lg p-2 mt-2">
          <section className="flex bg-red-200 items-center justify-center p-2 rounded-lg ml-2 mr-2 mt-2">
            <span className="pt-1 pb-1 font-semibold text-red-600">Unfortunately you didn’t win 🥺</span>
          </section>

          <section className="flex flex-row w-full mt-4">
            <div className="bg-gray-100 rounded-md ml-2 w-52 h-42 justify-center content-center">
              <Image alt="edde" src={'https://s3-alpha-sig.figma.com/img/45a0/9f5c/e0192a7448df3e638552d3e5432b36c7?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LcUyvGAuOt4r47Hqb~iEtnMiMExxyWMgU75hQ2xtKvEzJDgJ0n-9-pMgGubpsmG4mX6hIA1qWmYFak4ElmflZkzzxL-30SdWHEtqlZpdFmTnMWYiszHVDWyCinvKr0N5SUpew1O-xVcIVFsw~sA7e8GD2rLDRY~NDLOT27tMQVw24lxu7mDcDuXDQqyR2U3lnqiU~99I2iBDpY4GfUaU~sIlrgR8ZKlX32-jArUQQaV9O7ZPw8QSSSIbmp-cDma0xx02C4utBjOIfbt7SX0j2msB1ATjBOWnoBc-sgVZpsmzT3HFYP6rwRwbCaFq5WlpqXXkmpjW87WNE9naSA~78w__'} width={130} height={130} />
            </div>
            <div className="flex flex-col w-full">
              <span className="pl-2 text-lg font-bold max-w-52">LG OLED55G2 55-inch 139 Screen 4K</span>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Duration :</span>
                <span className="ml-auto mr-4 font-semibold">02/21/2024</span>
              </div>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Ticket Price :</span>
                <span className="ml-auto mr-4 font-semibold">10 TMT</span>
              </div>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Purchased Tickets :</span>
                <span className="ml-auto mr-4 font-semibold">2 TK</span>
              </div>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Total :</span>
                <span className="ml-auto mr-4 font-semibold text-orange-500">20 TMT</span>
              </div>
            </div>
          </section>

          <div className="flex h-[1px] bg-gray-200 ml-4 mr-4 mt-4" />

          <section className="mt-4 ml-4 mb-2">
            <Button className="rounded-full bg-orange-500 p-5"><TimerIcon className="mr-2" /> Continuing</Button>
          </section>
        </div>

        <div className="flex flex-col bg-white mr-4 ml-4 rounded-lg p-2 mt-2">
          <section className="flex bg-red-200 items-center justify-center p-2 rounded-lg ml-2 mr-2 mt-2">
            <span className="pt-1 pb-1 font-semibold text-red-600">Unfortunately you didn’t win 🥺</span>
          </section>

          <section className="flex flex-row w-full mt-4">
            <div className="bg-gray-100 rounded-md ml-2 w-52 h-42 justify-center content-center">
              <Image alt="edde" src={'https://s3-alpha-sig.figma.com/img/45a0/9f5c/e0192a7448df3e638552d3e5432b36c7?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LcUyvGAuOt4r47Hqb~iEtnMiMExxyWMgU75hQ2xtKvEzJDgJ0n-9-pMgGubpsmG4mX6hIA1qWmYFak4ElmflZkzzxL-30SdWHEtqlZpdFmTnMWYiszHVDWyCinvKr0N5SUpew1O-xVcIVFsw~sA7e8GD2rLDRY~NDLOT27tMQVw24lxu7mDcDuXDQqyR2U3lnqiU~99I2iBDpY4GfUaU~sIlrgR8ZKlX32-jArUQQaV9O7ZPw8QSSSIbmp-cDma0xx02C4utBjOIfbt7SX0j2msB1ATjBOWnoBc-sgVZpsmzT3HFYP6rwRwbCaFq5WlpqXXkmpjW87WNE9naSA~78w__'} width={130} height={130} />
            </div>
            <div className="flex flex-col w-full">
              <span className="pl-2 text-lg font-bold max-w-52">LG OLED55G2 55-inch 139 Screen 4K</span>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Duration :</span>
                <span className="ml-auto mr-4 font-semibold">02/21/2024</span>
              </div>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Ticket Price :</span>
                <span className="ml-auto mr-4 font-semibold">10 TMT</span>
              </div>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Purchased Tickets :</span>
                <span className="ml-auto mr-4 font-semibold">2 TK</span>
              </div>
              <div className="flex w-full mt-1">
                <span className="pl-2 text-gray-400">Total :</span>
                <span className="ml-auto mr-4 font-semibold text-orange-500">20 TMT</span>
              </div>
            </div>
          </section>

          <div className="flex h-[1px] bg-gray-200 ml-4 mr-4 mt-4" />

          <section className="mt-4 ml-4 mb-2">
            <Button className="rounded-full bg-orange-500 p-5"><TimerIcon className="mr-2" /> Continuing</Button>
          </section>
        </div>
      </section>
    </div>
  )
}