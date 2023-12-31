"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@prisma/client"
import { deleteUser } from "@/utils/deleteUser"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "space",
    header: "Space",
  },
  {
    accessorKey: "spaceUsed",
    header: "Space Used",
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  // },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const User = row.original
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(User.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 hover:text-red-600 focus:text-red-600" onClick={()=> deleteUser(User.email)}>Delete user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]