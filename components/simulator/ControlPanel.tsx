"use client"

import { Button } from "@/components/ui/button"
import { useSimulationStore } from "@/store/simulation-store"
import { useModelStore } from "@/store/model-store"

export default function ControlPanel({ modelId }: { modelId: string }) {
  const running = useSimulationStore((s) => s.running[modelId] ?? false)
  const setRunning = useSimulationStore((s) => s.setRunning)
  const reset = useSimulationStore((s) => s.reset)
  const save = useSimulationStore((s) => s.save)
  const model = useModelStore((s) => s.models.find((m) => m.id === modelId))

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border p-3">
      <Button onClick={() => setRunning(modelId, true)} disabled={running}>
        Start
      </Button>
      <Button onClick={() => setRunning(modelId, false)} variant="secondary" disabled={!running}>
        Pause
      </Button>
      <Button onClick={() => reset(modelId)} variant="outline">
        Reset
      </Button>
      <Button
        onClick={() =>
          model && save({ name: `${model.name} @ ${new Date().toLocaleTimeString()}`, params: model.params })
        }
        variant="outline"
      >
        Save
      </Button>
    </div>
  )
}
