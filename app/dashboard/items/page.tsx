import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, ChevronLeft, MoreHorizontal } from "lucide-react"

export default function ContestPage() {
  return (
    <div className="h-screen flex flex-col items-center overflow-auto bg-gray-100">
      <header className="flex justify-between w-screen items-center p-4">
        <ChevronLeft className="w-6 h-6" />
        <Bookmark className="w-6 h-6" />
      </header>
      <main className="px-4">
        <Image
          src="/placeholder.svg?height=200&width=400"
          alt="BMW 5 520 M Sport"
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h1 className="text-2xl font-bold mt-4">BMW 5 520 M Sport</h1>
        <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-orange-500 font-semibold">Continuing</div>
            <div className="text-gray-500">Days left</div>
          </div>
          <div className="mt-2 h-2 bg-orange-200 rounded-full">
            <div className="h-full w-3/4 bg-orange-500 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div>Applicants: 344</div>
            <div>12 gün</div>
          </div>
          <div className="text-right text-sm text-gray-500">Draw day: 24 March</div>
          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Buy ticket</Button>
        </div>
        <div className="mt-4 bg-white border-none">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-2">Draw Rules</h2>
            <p className="text-sm text-gray-600 mb-2">
              Craft a captivating message that will draw your audience in and make them want to learn more. Use engaging
              language. Make sure to include a call to action that encourages your.
            </p>
            <p className="text-sm text-gray-600">
              Make sure to include a call to action that encourages your. Craft a captivating message that will draw your
              audience in and make them want to learn more. Use engaging language Make sure to include a call to action that
              encourages your. Make sure to include a call to action that encourages your.
            </p>
          </CardContent>
        </div>
        <div className="mt-4 bg-white rounded-lg pt-2 pb-2">
          <h2 className="font-semibold text-lg mb-2 ml-2 mt-2">Teswirler</h2>
          {[
            { name: "Atabay Kuliyew", likes: "3.6k", time: "2 min" },
            { name: "Muhammet Ovlyagulyyev", likes: "21", time: "2 min" },
            { name: "Mekan Bagbekow", likes: "0", time: "2 min" },
            { name: "Artur Melyayev", likes: "124", time: "2 min" },
          ].map((comment, index) => (
            <div key={index} className="flex mt-5 items-start space-x-3 mb-4 pl-2 pr-2">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} />
                <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{comment.name}</h3>
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Tempor dolor proident duis incididunt et. Cillum incididunt irure nisi excepteur sit ad ipsum consectetur
                  proident deserunt sint
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>{comment.likes} Jogap yaz</span>
                  <span className="ml-auto">{comment.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}