"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useModelStore } from "@/store/model-store"

export default function Sidebar() {
  const models = useModelStore((s) => s.models)
  const addModel = useModelStore((s) => s.addModel)
  const duplicateModel = useModelStore((s) => s.duplicateModel)
  const removeModel = useModelStore((s) => s.removeModel)

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Models</div>
        <Button size="sm" onClick={() => addModel()}>
          Add
        </Button>
      </div>
      <div className="space-y-2">
        {models.map((m) => (
          <div key={m.id} className="flex items-center justify-between rounded-md border border-border p-2">
            <Link href={`/dashboard/${m.id}`} className="text-sm hover:underline">
              {m.name}
            </Link>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" aria-label="Duplicate" onClick={() => duplicateModel(m.id)}>
                ⎘
              </Button>
              <Button size="icon" variant="ghost" aria-label="Delete" onClick={() => removeModel(m.id)}>
                ✕
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
