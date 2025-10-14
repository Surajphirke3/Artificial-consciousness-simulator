"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

export default function InteractiveDiagram() {
  const [attention, setAttention] = useState(50)
  const [memory, setMemory] = useState(50)

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Attention</label>
          <Slider value={[attention]} onValueChange={(v) => setAttention(v[0])} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Memory</label>
          <Slider value={[memory]} onValueChange={(v) => setMemory(v[0])} />
        </div>
      </div>
      <div className="flex h-40 items-center justify-center rounded-md border border-border bg-card">
        <div
          aria-label="diagram"
          className="h-24 w-24 rounded-full"
          style={{
            boxShadow: `0 0 ${Math.max(attention / 4, 6)}px color-mix(in oklab, var(--color-chart-2) 50%, transparent),
                        0 0 ${Math.max(memory / 4, 6)}px color-mix(in oklab, var(--color-chart-1) 50%, transparent)`,
            background: "var(--color-secondary)",
          }}
        />
      </div>
    </div>
  )
}
