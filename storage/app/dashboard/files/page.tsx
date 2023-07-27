import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { Suspense } from "react"
import db from "@/lib/db"



const page = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return false

    const user = await db.user.findUnique({
        where: {
            email: session?.user?.email
        }
    })
    const files = await db.file.findMany({
        where: {
            userId: user?.id
        }
    })


  return (
    <div className="p-4">
        <Suspense fallback={<div>Loading...</div>}>
            <h1>Files</h1>
            {
                files?.map(file => (
                    <div className="p-4 border" key={file.id}>
                        <h2>{file.name}</h2>
                    </div>
                ))
            }
        </Suspense>
    </div>
  )
}

export default page