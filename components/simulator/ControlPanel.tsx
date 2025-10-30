"use client"

import { Button } from "@/components/ui/button"
import { useSimulationStore } from "@/store/simulation-store"
import { useModelById } from "@/store/model-store"
import { Download, Play, Pause, RotateCcw, Save } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ControlPanel({ modelId }: { modelId: string }) {
  const running = useSimulationStore((s) => s.running[modelId] ?? false)
  const setRunning = useSimulationStore((s) => s.setRunning)
  const reset = useSimulationStore((s) => s.reset)
  const logs = useSimulationStore((s) => s.logs[modelId] ?? [])
  const saveSimulation = useSimulationStore((s) => s.saveSimulation)
  const saveSimulationConfig = useSimulationStore((s) => s.saveSimulationConfig)
  const model = useModelById(modelId)
  const [exporting, setExporting] = useState(false)

  const calculateResults = () => {
    const consciousnessLevels = logs
      .map((log) => {
        const match = log.match(/Consciousness: (\d+)%/)
        return match ? Number.parseInt(match[1]) : 0
      })
      .filter((v) => v > 0)

    return {
      finalConsciousnessLevel: consciousnessLevels[consciousnessLevels.length - 1] || 0,
      averageStability:
        consciousnessLevels.length > 0 ? consciousnessLevels.reduce((a, b) => a + b) / consciousnessLevels.length : 0,
      peakActivity: Math.max(...consciousnessLevels, 0),
      timestamp: Date.now(),
    }
  }

  const handleSaveSimulation = () => {
    if (!model) return
    const results = calculateResults()
    saveSimulation({
      id: `sim-${Date.now()}`,
      modelId: model.id,
      modelName: model.name,
      params: model.params,
      logs,
      results,
      createdAt: Date.now(),
      duration: logs.length * 100,
    })
  }

  const handleSaveConfig = () => {
    if (!model) return
    saveSimulationConfig({
      id: `config-${Date.now()}`,
      name: `${model.name} @ ${new Date().toLocaleTimeString()}`,
      params: model.params,
      modelId: model.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  }

  const handleExport = async (format: "csv" | "json") => {
    setExporting(true)
    try {
      let content: string
      let filename: string
      let mimeType: string

      if (format === "csv") {
        const headers = ["Timestamp", "Log Entry"]
        const rows = logs.map((log) => [new Date().toLocaleTimeString(), log])
        content = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")
        filename = `simulation-${modelId}-${Date.now()}.csv`
        mimeType = "text/csv"
      } else {
        const exportData = {
          model: model,
          logs,
          results: calculateResults(),
          exportedAt: new Date().toISOString(),
        }
        content = JSON.stringify(exportData, null, 2)
        filename = `simulation-${modelId}-${Date.now()}.json`
        mimeType = "application/json"
      }

      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Export error:", error)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border p-3">
      <Button onClick={() => setRunning(modelId, true)} disabled={running} size="sm">
        <Play className="mr-2 h-4 w-4" />
        Start
      </Button>
      <Button onClick={() => setRunning(modelId, false)} variant="secondary" disabled={!running} size="sm">
        <Pause className="mr-2 h-4 w-4" />
        Pause
      </Button>
      <Button onClick={() => reset(modelId)} variant="outline" size="sm">
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
      <Button onClick={handleSaveConfig} variant="outline" size="sm">
        <Save className="mr-2 h-4 w-4" />
        Save Config
      </Button>
      <Button onClick={handleSaveSimulation} variant="outline" size="sm">
        <Save className="mr-2 h-4 w-4" />
        Save Run
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={exporting || logs.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("json")}>Export as JSON</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
