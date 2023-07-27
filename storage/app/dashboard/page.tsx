'use client'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useState } from "react"

export default function Page() {
  const { data: session } = useSession()
  const [file, setFile] = useState<File>()
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !session?.user) return
    try {
      const data = new FormData()
      data.append('file', file)
      data.append('email', session?.user.email || '')
      data.append('name', session?.user.name || '')
      data.append('image', session?.user.image || '')

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
        <input type="file" name="file" id="file" onChange={e => setFile(e.target.files?.[0])} />
        <br />
        <input type="submit" value="Wyslij" />
      </form>
    </div>
  )
}