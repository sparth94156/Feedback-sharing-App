"use client";
import { signOut, useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();   // const {data: session, status} = useSession()

  // If signed in
  if (session) {
    <p>Signed in as {session.user.email}</p>;
    <button onClick={() => signOut()}>Sign Out</button>
  }

  return (
    <a href="/api/auth/signin" className="bg-blue-500 p-3">
      Sign in
    </a>
  );
}
