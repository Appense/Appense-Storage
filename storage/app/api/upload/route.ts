import { writeFile } from 'fs/promises'
import { existsSync, statSync } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(request: NextRequest) {
  const data = await request.formData()  

  console.log(data);

  // validate user
  const user = await db.user.findUnique({
    where: {
      id: data.get('id')?.toString()
    }
  })

  if (!user) return
  
  
  // const files: File[] | null = data.get('files[]') as unknown as File[]
  const files = data.getAll('files[]') as unknown as File[]

  console.log(files);
  
  // reject if files were not uploaded
  if (!files) return new NextResponse("No files were uploaded.",{ status: 400 })

  const alreadyExistingFiles: string[] = []

  const filesToDb = await Promise.resolve(files.map( (file) => {
    try {
      console.log(file);
      const path = process.env.FILES_PATH + file.name || `tmp/${file.name}`

      // check if file already exists
      const exists = existsSync(path)

      if (exists) {
        alreadyExistingFiles.push(file.name)
        return 
      }
    
      file.arrayBuffer().then(bytes => {
        const buffer = Buffer.from(bytes)
        // With the file data in the buffer, you can do whatever you want with it.
      // For this, we'll just write it to the filesystem in a new location
      

      writeFile(path, buffer)
      console.log(`Uploaded file ${file.name}. Open ${path} to see the uploaded file.`)
      })
      
      
      
      const type = file.type.split('/')[0]
      const extension = file.type.split('/')[1]

      if (!type || !extension) throw new Error("Something went wrong when splitting file formats.")

      const fileToDb = {
        userId: user.id,
        name: file.name,
        type,
        extension,
        path,
        size: file.size
      }

      console.log(fileToDb);
      
      
      return fileToDb

    } catch (e) {
      throw e
    }
  }))

  console.log(filesToDb);
  
  
 
  // database file logic
  // filesToDb.then(async (filesxd) => {
  //   console.log(filesxd);
    
  //   const createFile = await db.file.createMany({
  //     data: filesxd
  //   })  

  // })


  // remove non-files 
  const filteredFilesToDb: any[] = filesToDb.filter(v => v)

  console.log(filteredFilesToDb);

  // reject if the files already exist and the array of new non-existing files is empty
  if (filteredFilesToDb.length == 0) return  

  
  // this works xd
  try {
    const createFile = await db.file.createMany({
      data: filteredFilesToDb
    })
    console.log(createFile);
    console.log("Successfully saved " + createFile.count + " files to database!");

    const updateUser = await db.user.update({
      where: {
        id: user.id
      },
      data: {
        filesUploaded: {
          increment: createFile.count
        }
      }
    })

    if (updateUser) console.log(`User ${updateUser.name} uploaded ${createFile.count} files. He's uploaded a total of ${updateUser.filesUploaded} files.`);
    
  } catch (error) {
    throw error
  }
  
  
  
  
  
 
  

  return NextResponse.json({ success: true })
}

// name: file.name,
//       extension: file.name.slice(file.name.indexOf(".") + 1),
//       path: path,
//       // spaceTaken: 0,
//       userId: user?.id