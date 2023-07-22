'use client'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Welcome {session?.user?.name}</h1>
      <p>{session?.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}