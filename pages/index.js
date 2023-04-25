import Image from 'next/image'
import { Inter } from 'next/font/google'
import Editor from "@/components/Editor";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    // <main className="grid grid-cols-2 gap-4 place-items-center h-screen w-full p-24">
    <main className="h-screen w-full p-24">
      <div className="w-full h-full relative">
        <Editor />
      </div>
    </main>
  )
}
