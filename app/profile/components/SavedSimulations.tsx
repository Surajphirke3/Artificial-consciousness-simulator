"use client"

import { useSimulationStore } from "@/store/simulation-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, RotateCcw, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function SavedSimulations() {
  const simulations = useSimulationStore((s) => s.simulations)
  const saved = useSimulationStore((s) => s.saved)
  const deleteSimulation = useSimulationStore((s) => s.deleteSimulation)
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    toast({
      title: "Deleted",
      description: "Simulation has been removed.",
    })
  }

  const handleExport = (sim: any) => {
    try {
      const content = JSON.stringify(sim, null, 2)
      const blob = new Blob([content], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `simulation-${sim.id}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      toast({
        title: "Exported",
        description: "Simulation data has been downloaded.",
      })
    } catch (error) {
      console.error("[v0] Export error:", error)
      toast({
        title: "Error",
        description: "Failed to export simulation.",
        variant: "destructive",
      })
    }
  }

  if (simulations.length === 0 && saved.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">No saved simulations yet.</p>
        <p className="text-xs text-muted-foreground mt-1">Run a simulation and save it to see it here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {simulations.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold">Simulation Runs</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {simulations.map((sim) => (
              <Card key={sim.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{sim.modelName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(sim.createdAt).toLocaleDateString()} at {new Date(sim.createdAt).toLocaleTimeString()}
                      </p>
                      <div className="mt-2 space-y-1">
                        <p className="text-xs">
                          <span className="text-muted-foreground">Consciousness:</span>{" "}
                          <span className="font-semibold">{sim.results.finalConsciousnessLevel}%</span>
                        </p>
                        <p className="text-xs">
                          <span className="text-muted-foreground">Stability:</span>{" "}
                          <span className="font-semibold">{sim.results.averageStability.toFixed(1)}%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleExport(sim)} className="flex-1">
                      <Download className="mr-1 h-3 w-3" />
                      Export
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(sim.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {saved.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold">Saved Configurations</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {saved.map((config) => (
              <Card key={config.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{config.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(config.createdAt).toLocaleDateString()}</p>
                      <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                        <p>
                          <span className="text-muted-foreground">Memory:</span> {config.params.memory}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Attention:</span> {config.params.attention}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Emotion:</span> {config.params.emotion}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Learn:</span> {config.params.learningRate}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => router.push(`/dashboard`)} className="flex-1">
                      <RotateCcw className="mr-1 h-3 w-3" />
                      Load
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(config.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
