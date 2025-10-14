"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import DashboardHeader from "@/components/layout/DashboardHeader"
import ConsciousnessGraph from "@/components/simulator/ConsciousnessGraph"
import ThoughtLog from "@/components/simulator/ThoughtLog"
import ControlPanel from "@/components/simulator/ControlPanel"
import ModelParameters from "@/components/simulator/ModelParameters"
import ModelComparison from "@/components/simulator/ModelComparison"
import { useModelStore } from "@/store/model-store"
import { Separator } from "@/components/ui/separator"

export default function ModelWorkspace() {
  const { modelId } = useParams<{ modelId: string }>()
  const router = useRouter()
  const model = useModelStore((s) => s.models.find((m) => m.id === modelId))

  useEffect(() => {
    if (!model) {
      router.replace("/dashboard")
    }
  }, [model, router])

  if (!model) {
    return <div className="p-4 text-sm text-muted-foreground">Redirecting back to dashboard…</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader
        title={`Model: ${model.name}`}
        description="Run, monitor, and adjust your model's simulation in real time."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4 xl:col-span-2">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Consciousness Graph</h3>
          <div className="h-[380px] rounded-md border border-border">
            <ConsciousnessGraph modelId={model.id} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Thought Log</h3>
          <div className="h-[380px]">
            <ThoughtLog modelId={model.id} />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ControlPanel modelId={model.id} />
          <ModelParameters modelId={model.id} />
        </div>
        <Separator className="my-4" />
        <ModelComparison activeId={model.id} />
      </div>
    </div>
  )
}
