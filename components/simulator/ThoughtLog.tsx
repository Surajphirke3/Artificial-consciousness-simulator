"use client"

import { useEffect } from "react"
import { useSimulationStore } from "@/store/simulation-store"

const EMPTY_THOUGHTS: string[] = []

export default function ThoughtLog({ modelId }: { modelId: string }) {
  const thoughts = useSimulationStore((s) => s.logs[modelId] ?? EMPTY_THOUGHTS)
  const running = useSimulationStore((s) => s.running[modelId] ?? false)
  const pushThought = useSimulationStore((s) => s.pushThought)

  useEffect(() => {
    if (!running) return
    const words = ["signal", "self", "awareness", "pattern", "belief", "emotion", "memory", "attention"]
    const id = setInterval(() => {
      const t = words[Math.floor(Math.random() * words.length)]
      pushThought(modelId, `${new Date().toLocaleTimeString()} · ${t}`)
    }, 900)
    return () => clearInterval(id)
  }, [running, modelId, pushThought])

  return (
    <div
      className="h-full overflow-auto rounded-md border border-border p-2 text-sm"
      role="log"
      aria-label="Simulation thought log"
      aria-live="polite"
      aria-atomic="false"
    >
      {thoughts.length === 0 ? (
        <p className="text-muted-foreground">No thoughts yet. Start the simulation.</p>
      ) : (
        <ul className="space-y-1">
          {thoughts.slice(-100).map((t, i) => (
            <li key={i} className="text-foreground">
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
