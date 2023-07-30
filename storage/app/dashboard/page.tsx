'use client'
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function Page() {
  const { data: session } = useSession()
  const [files, setFiles] = useState<FileList>()

  // handling files upload
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!files || !session?.user) return

    try {
      const data = new FormData()

      // append multiple files to formdata
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) data.append('files[]', file); // Use 'files[]' as the key to indicate an array of files
      }

      // append user info
      //-------------
      //  TODO
      //  add ID to session for better logic and not using email for authorization
      //-------------

      // this works but it's not typed. -> solve later
      data.append('id', session?.user.id)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })

      // handle the error
      if (!res.ok) throw new Error(await res.text())
      
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }

  }

  return (
    <div className="p-4">
      <h1>Welcome {session?.user?.name}</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" id="file" multiple onChange={e => setFiles(e.target.files || undefined)} />

        <br />
        <input type="submit" value="Wyslij" />
      </form>
    </div>
  )
}