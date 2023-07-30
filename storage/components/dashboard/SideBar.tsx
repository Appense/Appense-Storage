"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { AiFillHome } from "react-icons/ai"
import { BsFiles } from "react-icons/bs"
import { GrFavorite } from "react-icons/gr"
import {RiFolderSharedLine } from "react-icons/ri"
import { BsTrash} from "react-icons/bs"
import { useSidebarContext } from '@/app/providers'
import Link from 'next/link'
export default function SideBar() {

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
          <Link href={"/"} passHref ><Button variant="outline" className='w-4/5 flex justify-start gap-2'><AiFillHome/></Button></Link>
          <Link href={"/dashboard/files"} passHref ><Button variant="outline" className='w-4/5 flex justify-start gap-2'><BsFiles/></Button></Link>
          <Link href={"/favourite"} passHref ><Button variant="outline" className='w-4/5 flex justify-start gap-2'><GrFavorite/></Button></Link>
          <Link href={"/shared"} passHref ><Button variant="outline" className='w-4/5 flex justify-start gap-2'><RiFolderSharedLine/></Button></Link>
          <Link href={"/trash"} passHref ><Button variant="outline" className='w-4/5 flex justify-start gap-2'><BsTrash/></Button></Link>
        </div>
        :
        <div className='px-4 mt-8 flex flex-col gap-2'>
          <Link href={"/"} passHref ><Button variant="outline" className='w-full flex justify-start gap-2'><AiFillHome/>Home</Button></Link>
          <Link href={"/dashboard/files"} passHref ><Button variant="outline" className='w-full flex justify-start gap-2'><BsFiles/>My Files</Button></Link>
          <Link href={"/favourite"} passHref ><Button variant="outline" className='w-full flex justify-start gap-2'><GrFavorite/>Favorite</Button></Link>
          <Link href={"/shared"} passHref ><Button variant="outline" className='w-full flex justify-start gap-2'><RiFolderSharedLine/>Shared</Button></Link>
          <Link href={"/trash"} passHref ><Button variant="outline" className='w-full flex justify-start gap-2'><BsTrash/>Trash</Button></Link>
        </div>
      }
    </div>
  )

}