"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { AiFillHome } from "react-icons/ai"
import { BsFiles } from "react-icons/bs"
import { GrFavorite } from "react-icons/gr"
import {RiFolderSharedLine } from "react-icons/ri"
import { BsTrash } from "react-icons/bs"
import { useSidebarContext } from '@/app/providers'
import Link from 'next/link'
import { sidebarItems } from '@/constants'

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
      {sidebarItems.map((item, index: number) => (
        <Link key={index} href={`/dashboard/${item.url}`}><Button variant={"outline"} className='w-full flex justify-start gap-2'><item.icon/>{item.name}</Button></Link>
      ))}
    </div>
  )
}

