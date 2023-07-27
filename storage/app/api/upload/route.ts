import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const data = await request.formData()
  // console.log(data);
  // console.log(request);
  
  
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = process.env.FILES_PATH + file.name || `tmp/${file.name}`
 
  await writeFile(path, buffer)
  console.log(`open ${path} to see the uploaded file`)
  const user = await prisma.user.findUnique({
    where: {
      email: data.get('email')?.toString()
    }
  })
  if (!user) return
  
  
  console.log(user?.id);
  
  // database file logic
  const createFile = await prisma.file.createMany({
    data: [
      {
        userId: user?.id,
        name: file.name,
        extension: file.name.slice(file.name.indexOf(".") + 1),
        path: path,

      }
    ]
  })  

  console.log(createFile.count);
  

  return NextResponse.json({ success: true })
}

// name: file.name,
//       extension: file.name.slice(file.name.indexOf(".") + 1),
//       path: path,
//       // spaceTaken: 0,
//       userId: user?.id