import db from "@/lib/db"
import { existsSync } from "fs"

export async function GET(req: Request) {
    const data = await req.json() as { userId: string }
    const userId: string = data.userId


    //check for user exists
    const userExists = db.user.findUnique({
        where: { id: userId }
    })

    if (!userExists) return new Response("ERROR: User doesn't exist", {
        status: 401, //unauthorized
    })

    //get files from db
    const files = await db.file.findMany({
        where: { id: userId }
    })

    files.forEach(file => {
        if (!existsSync(file.path)) return //check if file exists
    })



    // return new Response("", {
    //     headers: {
    //         "Content-Type": "application/octet-stream",
    //         "Content-Disposition": "attachment; filename=" + files[0].name
    //     }
    // })
}