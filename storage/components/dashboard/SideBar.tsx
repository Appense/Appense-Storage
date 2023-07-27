"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"

import {AiFillHome} from "react-icons/ai"
import {BsFiles} from "react-icons/bs"
import {GrFavorite} from "react-icons/gr"
import {RiFolderSharedLine} from "react-icons/ri"
import {BsTrash} from "react-icons/bs"
import {FiUsers} from "react-icons/fi"

import { useSidebarContext } from '@/app/providers'
import { useRouter } from 'next/navigation'
export default function SideBar() {
  const router = useRouter()
  const { isOpen } = useSidebarContext()
  return (
    <div className={`bg-neutral-100   ${isOpen ? "w-24" : "w-1/5"} h-screen items-center `}>
      <div className="flex items-center justify-center  gap-4 p-5">
        
      <Image
        src="/vercel.svg"
        alt="Picture of the author"
        width={64}
        height={64}
      />
      {isOpen ? null:
        <h1 className="text-black text-3xl font-bold">Appense Storage</h1>
      }
        </div>

      
      { isOpen ? 
        <div className='px-4 mt-8 flex flex-col  items-center gap-2'>
          <Button variant="outline" className='w-4/5 flex justify-start gap-2' onClick={()=> router.push('/dashboard')}><AiFillHome/></Button>
          <Button variant="outline" className='w-4/5 flex justify-start gap-2' onClick={()=> router.push('/dashboard/files')}><BsFiles/></Button>
          <Button variant="outline" className='w-4/5 flex justify-start gap-2' onClick={()=> router.push('/dashboard/users')}><FiUsers/></Button>
          <Button variant="outline" className='w-4/5 flex justify-start gap-2'><GrFavorite/></Button>
          <Button variant="outline" className='w-4/5 flex justify-start gap-2'><RiFolderSharedLine/></Button>
          <Button variant="outline" className='w-4/5 flex justify-start gap-2'><BsTrash/></Button>
        </div>
        :
        <div className='px-4 mt-8 flex flex-col gap-2'>
          <Button variant="outline" className='w-full flex justify-start gap-2' onClick={()=> router.push('/dashboard')}><AiFillHome/> Home</Button>
          <Button variant="outline" className='w-full flex justify-start gap-2' onClick={()=> router.push('/dashboard/files')}><BsFiles/> My Files</Button>
          <Button variant="outline" className='w-full flex justify-start gap-2' onClick={()=> router.push('/dashboard/users')}><FiUsers/>Users</Button>
          <Button variant="outline" className='w-full flex justify-start gap-2'><GrFavorite/>Favorite</Button>
          <Button variant="outline" className='w-full flex justify-start gap-2'><RiFolderSharedLine/>Shared</Button>
          <Button variant="outline" className='w-full flex justify-start gap-2'><BsTrash/>Trash</Button>
        </div>
      }
    </div>
  )

}