import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {AiFillHome} from "react-icons/ai"
import {BsFiles} from "react-icons/bs"

export default function SideBar() {
  return (
    <div className="bg-neutral-700  w-1/5 h-screen items-center ">
      <div className="flex items-center justify-center  gap-4 p-5">
      <Image
        src="/vercel.svg"
        alt="Picture of the author"
        width={64}
        height={64}
      />
        <h1 className="text-white text-3xl font-bold">Appense Storage</h1>
      </div>

      <div className='px-4 mt-8 flex flex-col gap-2'>
        <Button variant="outline" className='w-full flex justify-start gap-2'><AiFillHome/> Home</Button>
        <Button variant="outline" className='w-full flex justify-start gap-2'><BsFiles/> My Files</Button>
      </div>
    </div>
  )

}