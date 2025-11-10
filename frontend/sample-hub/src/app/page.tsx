'use client'

import { useRef } from "react"
import Header from "@/components/Header"
import UploadForm from "@/components/UploadForm"
import SampleGrid from "@/components/SampleGrid"

export default function Home() {
  const uploadRef = useRef<HTMLDivElement>(null)

  return (
    <main className="min-h-screen">
      <Header onUploadClick={() => uploadRef.current?.scrollIntoView({ behavior: 'smooth' })} />

      <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
        <section ref={uploadRef} className="scroll-mt-24">
          <UploadForm />
        </section>

        <section className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Latest uploads</h2>
          <SampleGrid />
        </section>
      </div>
    </main>
  )
}
