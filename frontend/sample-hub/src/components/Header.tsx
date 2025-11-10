'use client'

import { Upload, Search } from "lucide-react"

export default function Header({ onUploadClickAction }: { onUploadClickAction?: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-bg-base/70 backdrop-blur supports-[backdrop-filter]:bg-bg-base/50 border-b border-bg-border">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <div className="text-xl font-semibold tracking-tight">🎵 Sample Hub</div>

        <div className="ml-4 flex-1">
          <div className="group flex items-center gap-2 bg-bg-muted border border-bg-border rounded-xl px-3 py-2">
            <Search className="size-4 text-text-secondary" />
            <input
              className="w-full bg-transparent outline-none placeholder:text-text-secondary/60 text-sm"
              placeholder="Search samples, tags, BPM, key..."
            />
          </div>
        </div>

        <button
          onClick={onUploadClickAction}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-3 py-2 text-sm font-medium shadow-soft hover:opacity-90 transition"
        >
          <Upload className="size-4" />
          Upload
        </button>
      </div>
    </header>
  )
}
