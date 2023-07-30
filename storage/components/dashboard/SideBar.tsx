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
    <div className={`bg-white border-r-2 border-neutral-800   ${!isOpen ? "w-24" : "w-1/5"} h-screen items-center `}>
      <div className="flex items-center justify-center  gap-4 p-5">
        <Image
          src="/vercel.svg"
          alt="Picture of the author"
          width={64}
          height={64}
        />
        {/* {!isOpen ? "" :
          <h1 className="text-black text-3xl font-bold">Appense Storage</h1>
        } */}
      </div>
      <div className="flex flex-col items-center gap-4 mt-4 p-4">
        {sidebarItems.map((item, index: number) => (
          <Link key={index} href={`/dashboard/${item.url}`} className={` flex justify-start p-2 rounded-xl hover:bg-slate-200
          ${isOpen && ' items-center w-full gap-4'}`}>
            {<item.icon />}<span className="text-slate-800">{isOpen && item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

