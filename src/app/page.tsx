"use client"
import connectToDB from "@/lib/dbConnect";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    connectToDB()
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     Main page
    </main>
  );
}
