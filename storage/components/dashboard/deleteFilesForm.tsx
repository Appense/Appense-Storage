'use client'
import { useSession } from 'next-auth/react'
import { FormEvent } from 'react'

const DeleteFilesForm = () => {
    const { data: session } = useSession()

    async function  handleSubmit(e: FormEvent) {
        e.preventDefault()
  
        const data = new FormData()
        
        data.append('userId', session?.user?.id)
        data.append('paths[]', "D:\\GitHub\\Appense-Storage\\storage\\public\\files\\363463080_6837866489579355_4096501621367859487_n.mp4")
        data.append('paths[]', "D:\\GitHub\\Appense-Storage\\storage\\public\\files\\IMG_20230612_185916_180.png")
        
        const res = await fetch("/api/remove", {
          body: data,
          method: "DELETE"
        })
      }
  return (
    <form onSubmit={handleSubmit}>
        <input type="submit" value="xdxdxdxd" />
    </form>
  )
}

export default DeleteFilesForm