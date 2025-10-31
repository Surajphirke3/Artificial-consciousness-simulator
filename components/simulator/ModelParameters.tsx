"use client"

import { Slider } from "@/components/ui/slider"
import { useModelStore } from "@/store/model-store"
import { Label } from "@/components/ui/label"
import { useMemo } from "react"

export default function ModelParameters({ modelId }: { modelId: string }) {
  const model = useMemo(() => useModelStore.getState().models.find((m) => m.id === modelId), [modelId])

  const updateParams = useModelStore((s) => s.updateParams)

  if (!model) return null
  const { memory, attention, emotion, learningRate } = model.params

  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg border border-border p-3 md:grid-cols-2">
      <Param id="memory" label="Memory" value={memory} onChange={(v) => updateParams(modelId, { memory: v })} />
      <Param
        id="attention"
        label="Attention"
        value={attention}
        onChange={(v) => updateParams(modelId, { attention: v })}
      />
      <Param id="emotion" label="Emotion" value={emotion} onChange={(v) => updateParams(modelId, { emotion: v })} />
      <Param
        id="learningRate"
        label="Learning Rate"
        value={learningRate}
        onChange={(v) => updateParams(modelId, { learningRate: v })}
      />
    </div>
  )
}

function Param({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-medium">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Slider
          id={id}
          value={[value]}
          min={0}
          max={100}
          step={1}
          onValueChange={(v) => onChange(v[0])}
          aria-label={`${label} slider`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${value}%`}
          className="flex-1"
        />
        <span className="text-xs font-semibold text-primary min-w-12 text-right" aria-live="polite">
          {value}%
        </span>
      </div>
    </div>
  )
}
