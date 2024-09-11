'use client'
import { useSession, } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()

  if (session){
    return <p>Signed in as {session.user.email}</p>
  }

  return <a href="/api/auth/signin" className="bg-blue-500">Sign in</a>
}