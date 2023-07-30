import db from "@/lib/db"
import { unlinkSync } from "fs"


export async function DELETE(request: Request) {
    const data = await request.formData()

    const userId = data.get('userId')
    console.log(userId);
    
    
    // reject unauthorized user (not existing tbh)
    if (!userId) return new Response("User unauthorized", {
        status: 401
    })

    const filesToRemove = data.getAll('files[]') as string[]

    // reject if files not found
    if (filesToRemove.length == 0) return new Response("Files not found", {
        status: 400
    })


   try {
    filesToRemove.forEach(async file => {
        console.log(file);
        
        const filesDeleted = await db.file.delete({
            where: {
                name: file
            }
        })
        console.log(filesDeleted);
        

        unlinkSync(process.env.FILES_PATH + file)
        console.log(`Successfully deleted ${filesToRemove.length} files. `);
        
    })
    
    
   } catch (error) {
        console.error("An error occured while removing files", error);
   }

   

   

}