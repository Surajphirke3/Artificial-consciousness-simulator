"use client"

import { useSimulationStore } from "@/store/simulation-store"
import { Button } from "@/components/ui/button"

export default function SavedSimulations() {
  const saved = useSimulationStore((s) => s.saved)
  const load = useSimulationStore((s) => s.loadSaved)

  if (!saved.length) {
    return <p className="text-sm text-muted-foreground">No saved simulations yet.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {saved.map((s, idx) => (
        <div key={idx} className="rounded-lg border border-border p-3">
          <div className="text-sm font-medium">{s.name}</div>
          <div className="text-xs text-muted-foreground">
            Memory {s.params.memory}, Attention {s.params.attention}, Emotion {s.params.emotion}, Learn{" "}
            {s.params.learningRate}
          </div>
          <div className="mt-2">
            <Button size="sm" variant="secondary" onClick={() => load(idx)}>
              Load
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
