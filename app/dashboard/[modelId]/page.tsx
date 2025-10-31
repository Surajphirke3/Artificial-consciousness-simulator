"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import DashboardHeader from "@/components/layout/DashboardHeader"
import ConsciousnessGraph from "@/components/simulator/ConsciousnessGraph"
import ThoughtLog from "@/components/simulator/ThoughtLog"
import ControlPanel from "@/components/simulator/ControlPanel"
import ModelParameters from "@/components/simulator/ModelParameters"
import ModelComparison from "@/components/simulator/ModelComparison"
import { useModelById } from "@/store/model-store"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataGraph from "@/components/DataGraph"

export default function ModelWorkspace() {
  const { modelId } = useParams<{ modelId: string }>()
  const router = useRouter()
  const model = useModelById(modelId)
  const redirectAttempted = useRef(false)

  useEffect(() => {
    if (!model && !redirectAttempted.current) {
      redirectAttempted.current = true
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
        <Tabs defaultValue="controls" className="w-full">
          <TabsList>
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="controls">
            <ControlPanel modelId={model.id} />
          </TabsContent>
          <TabsContent value="parameters">
            <ModelParameters modelId={model.id} />
          </TabsContent>
          <TabsContent value="logs">
            <div className="h-[320px]">
              <ThoughtLog modelId={model.id} />
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="h-[320px]">
                <DataGraph
                  title="Awareness Trend"
                  type="line"
                  height={300}
                  data={[]}
                  lines={[{ key: "consciousness", name: "Consciousness", color: "#22d3ee" }]}
                />
              </div>
              <div className="h-[320px]">
                <ModelComparison activeId={model.id} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
