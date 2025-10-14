"use client"

import { useModelStore } from "@/store/model-store"

export default function ModelComparison({ activeId }: { activeId: string }) {
  const models = useModelStore((s) => s.models)
  if (models.length <= 1) {
    return <p className="text-sm text-muted-foreground">Add more models to compare parameters side-by-side.</p>
  }
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
      {models.map((m) => (
        <div key={m.id} className={`rounded-md border p-3 ${m.id === activeId ? "border-primary" : "border-border"}`}>
          <div className="text-sm font-medium">{m.name}</div>
          <div className="text-xs text-muted-foreground">
            Memory {m.params.memory}, Attention {m.params.attention}, Emotion {m.params.emotion}, Learn{" "}
            {m.params.learningRate}
          </div>
        </div>
      ))}
    </div>
  )
}
