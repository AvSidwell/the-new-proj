'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import SampleCard, { Sample } from "./SampleCard"

export default function SampleGrid() {
  const [samples, setSamples] = useState<Sample[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase
        .from("samples")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(60)

      if (!error && data) setSamples(data as Sample[])
      setLoading(false)
    })()
  }, [])

  if (loading) return <p className="text-text-secondary">Loading samples…</p>

  if (!samples.length)
    return <p className="text-text-secondary">No samples yet. Be the first to upload!</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {samples.map((s) => <SampleCard key={s.id} sample={s} />)}
    </div>
  )
}
