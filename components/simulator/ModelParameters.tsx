"use client"

import { Slider } from "@/components/ui/slider"
import { useModelStore } from "@/store/model-store"

export default function ModelParameters({ modelId }: { modelId: string }) {
  const model = useModelStore((s) => s.models.find((m) => m.id === modelId))
  const updateParams = useModelStore((s) => s.updateParams)

  if (!model) return null
  const { memory, attention, emotion, learningRate } = model.params

  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg border border-border p-3 md:grid-cols-2">
      <Param label="Memory" value={memory} onChange={(v) => updateParams(modelId, { memory: v })} />
      <Param label="Attention" value={attention} onChange={(v) => updateParams(modelId, { attention: v })} />
      <Param label="Emotion" value={emotion} onChange={(v) => updateParams(modelId, { emotion: v })} />
      <Param label="Learning Rate" value={learningRate} onChange={(v) => updateParams(modelId, { learningRate: v })} />
    </div>
  )
}

function Param({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-1 text-xs text-muted-foreground">
        {label}: {value}
      </div>
      <Slider value={[value]} min={0} max={100} step={1} onValueChange={(v) => onChange(v[0])} />
    </div>
  )
}
