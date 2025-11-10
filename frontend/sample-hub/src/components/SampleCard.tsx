'use client'

import { useRef, useState } from "react"
import { Howl } from "howler"
import { Play, Pause, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"

export type Sample = {
  id: string
  title: string
  file_url: string
  bpm?: number | null
  musical_key?: string | null
  votes?: number | null
}

export default function SampleCard({ sample }: { sample: Sample }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const howlRef = useRef<Howl | null>(null)

  const ensureHowl = () => {
    if (!howlRef.current) {
      howlRef.current = new Howl({
        src: [sample.file_url],
        html5: true,        // more reliable for larger files
        volume: 0.9,
      })
    }
    return howlRef.current
  }

  const play = () => { ensureHowl().play(); setIsPlaying(true) }
  const stop = () => { howlRef.current?.stop(); setIsPlaying(false) }

  // desktop hover
  const onEnter = () => { setHovered(true); setTimeout(() => { if (hovered) play() }, 120) }
  const onLeave = () => { setHovered(false); stop() }

  // mobile tap toggle
  const onTap = () => { isPlaying ? stop() : play() }

  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onTap}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-2xl bg-bg.card border border-bg-border p-4 cursor-pointer select-none"
    >
      {/* cover / waveform placeholder */}
      <div className="relative h-36 rounded-xl bg-gradient-to-br from-bg-muted to-bg-base flex items-center justify-center">
        <motion.div
          animate={{ opacity: isPlaying ? [0.5, 1, 0.5] : 0.7, scale: isPlaying ? [1, 1.03, 1] : 1 }}
          transition={{ repeat: isPlaying ? Infinity : 0, duration: 1.2 }}
          className="h-10 w-10 rounded-full bg-brand-primary/80"
        />
        <div className="absolute bottom-3 left-3 text-[11px] text-text-secondary/80">
          {sample.bpm ? `${sample.bpm} BPM` : ""} {sample.musical_key ? `• ${sample.musical_key}` : ""}
        </div>

        <button
          className="absolute right-3 bottom-3 inline-flex items-center justify-center rounded-xl bg-bg-base/90 border border-bg-border px-3 py-2 text-xs hover:bg-bg-muted"
          onClick={(e) => { e.stopPropagation(); isPlaying ? stop() : play() }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
      </div>

      {/* meta */}
      <div className="mt-3 flex items-start gap-3">
        <div className="flex-1">
          <div className="line-clamp-1 font-medium">{sample.title}</div>
          <div className="text-xs text-text.secondary text-text-secondary mt-0.5">Hover to preview • Click to toggle</div>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-secondary">
          <ThumbsUp className="size-3.5 opacity-80" />
          {sample.votes ?? 0}
        </div>
      </div>
    </motion.div>
  )
}
