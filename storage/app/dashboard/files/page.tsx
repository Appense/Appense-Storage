import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormEvent, Suspense } from "react"
import db from "@/lib/db"
import DeleteFilesForm from "@/components/dashboard/deleteFilesForm"
import { FilesTable } from "./files-table"
import { columns } from "./columns"

const page = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return false

    const user = await db.user.findUnique({
        where: {
            email: session?.user?.email
        }
    })
    console.log(user)
    const files = await db.file.findMany({
        where: {
            // userId: user?.id
            userId: 'clkqer4fz0000uem8oyw957hu'
        }
    })
    console.log(files)
    
    const formattedFiles = files.map((file) => ({
      ...file,
      userId: user?.name,
      createdAt: new Date(file.createdAt).toLocaleDateString(),
      size: (Number(file.size) / (1024*1024)).toFixed(2) + " MB",
    })) as unknown as any

    

  return (
    <div className="p-8">
        <Suspense fallback={<div>Loading...</div>}>
            <h1 className=" pl-4 text-4xl text-neutral-800">Files</h1>
            <div className="p-4 flex flex-col flex-wrap gap-8 mt-16">
              
            <FilesTable columns={columns} data={formattedFiles} />
              <DeleteFilesForm />
                {/* {
                    files?.map(file => (
                        <div key={file.id}>
                            <FileCard {...file} />
                        </div>
                    ))
                } */}
            </div>
        </Suspense>
    </div>
  )
}

// na grid widok
function FileCard({ 
    id, name, path, extension, size, createdAt, updatedAt, userId
 }: { id: string;
    name: string;
    path: string;
    extension: string;
    size: bigint;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}) {
    return (
        <Card className=" rounded-xl">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="">
            
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    )
}

export default page