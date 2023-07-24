"use client"
import { Input } from "@/components/ui/input"
import {BsChevronLeft} from "react-icons/bs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <div className="bg-neutral-800 w-full h-1/5 flex justify-between p-2">
    <span  className=" flex justify-center items-center">
      
      <Button variant="ghost" className="text-white"><BsChevronLeft/></Button>
    </span>
    
    <div>
      <Input type="email" placeholder="Search" />
    </div>
    

    <div >
      <Popover>
        <PopoverTrigger className="flex gap-2 items-center">
          <span className="font-light text-white">{session?.user?.email}</span>
          <Avatar>
            <AvatarImage src="https://github.com/Verti1234.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-4">
          <span>Misza to gej</span>
          <Button onClick={() => signOut()}>Sign out</Button>
        </PopoverContent>
      </Popover>
    </div>

    </div>
  )

}