import { Users, columns } from "./columns"
import { DataTable } from "./data-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"





export default async function Page() {
  const users = await prisma.user.findMany({
    // Returns all user fields
  })
  console.log(users)


  const formattedUsers= users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString() ,
  })) as unknown as any


  return (
    <div className="p-4">
      <h1>Users</h1>
      <div className="w-1/5 flex gap-2 py-4" >
        <Input placeholder="Email"/>
        <Button className="flex gap-4">Invite user</Button>
      </div>


      <DataTable columns={columns} data={formattedUsers} />
    </div>
  )
}
