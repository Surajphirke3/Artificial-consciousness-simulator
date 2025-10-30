"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InteractiveDiagram() {
  const [currentTheory, setCurrentTheory] = useState<"gwt" | "iit" | "pp">("gwt")
  const [attention, setAttention] = useState(50)
  const [memory, setMemory] = useState(50)
  const [integration, setIntegration] = useState(50)

  const renderDiagram = () => {
    switch (currentTheory) {
      case "gwt":
        return (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground mb-3">
              Adjust attention and memory to see how information flows through the global workspace.
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium">Attention Level: {attention}%</label>
                <Slider value={[attention]} onValueChange={(v) => setAttention(v[0])} max={100} />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium">Memory Capacity: {memory}%</label>
                <Slider value={[memory]} onValueChange={(v) => setMemory(v[0])} max={100} />
              </div>
            </div>
            <div className="flex h-48 items-center justify-center rounded-md border border-border bg-card/50 p-4">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Global Workspace visualization */}
                <div
                  className="absolute rounded-full border-2 border-dashed"
                  style={{
                    width: `${Math.max(100, attention + 50)}px`,
                    height: `${Math.max(100, attention + 50)}px`,
                    borderColor: `color-mix(in oklab, var(--color-chart-2) ${attention}%, transparent)`,
                  }}
                />
                {/* Memory storage */}
                <div
                  className="absolute rounded-lg border-2"
                  style={{
                    width: `${Math.max(60, memory / 2 + 30)}px`,
                    height: `${Math.max(60, memory / 2 + 30)}px`,
                    borderColor: `color-mix(in oklab, var(--color-chart-1) ${memory}%, transparent)`,
                    right: "20px",
                    top: "20px",
                  }}
                />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{Math.round((attention + memory) / 2)}%</div>
                  <div className="text-xs text-muted-foreground">Consciousness Level</div>
                </div>
              </div>
            </div>
          </div>
        )
      case "iit":
        return (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground mb-3">
              Adjust integration to see how Phi (Φ) changes with system complexity.
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium">Integration Level (Φ): {integration}%</label>
              <Slider value={[integration]} onValueChange={(v) => setIntegration(v[0])} max={100} />
            </div>
            <div className="flex h-48 items-center justify-center rounded-md border border-border bg-card/50 p-4">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Integrated system visualization */}
                <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs">
                  {[0, 1, 2, 3].map((i) => (
                    <circle
                      key={i}
                      cx={100 + 60 * Math.cos((i * Math.PI) / 2)}
                      cy={100 + 60 * Math.sin((i * Math.PI) / 2)}
                      r={20}
                      fill="none"
                      stroke={`color-mix(in oklab, var(--color-chart-${i + 1}) ${integration}%, transparent)`}
                      strokeWidth="2"
                    />
                  ))}
                  {[0, 1, 2, 3].map((i) => (
                    <line
                      key={`line-${i}`}
                      x1={100 + 60 * Math.cos((i * Math.PI) / 2)}
                      y1={100 + 60 * Math.sin((i * Math.PI) / 2)}
                      x2={100}
                      y2={100}
                      stroke={`color-mix(in oklab, var(--color-primary) ${integration / 2}%, transparent)`}
                      strokeWidth="1"
                    />
                  ))}
                  <circle cx="100" cy="100" r="15" fill="var(--color-primary)" opacity={integration / 100} />
                </svg>
              </div>
            </div>
            <div className="text-center text-sm">
              <div className="font-semibold">Φ = {(integration * 2.55).toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">Integrated Information</div>
            </div>
          </div>
        )
      case "pp":
        return (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground mb-3">
              Adjust prediction error to see how the brain updates its model.
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium">Prediction Error: {attention}%</label>
              <Slider value={[attention]} onValueChange={(v) => setAttention(v[0])} max={100} />
            </div>
            <div className="flex h-48 items-center justify-center rounded-md border border-border bg-card/50 p-4">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Prediction error curve */}
                <svg viewBox="0 0 300 150" className="w-full h-full">
                  <defs>
                    <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={attention / 100} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={attention / 100} />
                    </linearGradient>
                  </defs>
                  <polyline
                    points={`10,${130 - (attention / 100) * 100} 50,${130 - (attention / 100) * 80} 100,${130 - (attention / 100) * 40} 150,${130 - (attention / 100) * 20} 200,${130 - (attention / 100) * 30} 250,${130 - (attention / 100) * 60} 290,${130 - (attention / 100) * 90}`}
                    fill="none"
                    stroke="url(#errorGradient)"
                    strokeWidth="3"
                  />
                  <line x1="10" y1="130" x2="290" y2="130" stroke="var(--color-border)" strokeWidth="1" />
                </svg>
              </div>
            </div>
            <div className="text-center text-sm">
              <div className="font-semibold">Error Magnitude: {attention.toFixed(0)}</div>
              <div className="text-xs text-muted-foreground">Lower error = Better prediction</div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      <Tabs value={currentTheory} onValueChange={(v) => setCurrentTheory(v as "gwt" | "iit" | "pp")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gwt" className="text-xs">
            GWT
          </TabsTrigger>
          <TabsTrigger value="iit" className="text-xs">
            IIT
          </TabsTrigger>
          <TabsTrigger value="pp" className="text-xs">
            PP
          </TabsTrigger>
        </TabsList>
        <TabsContent value={currentTheory} className="mt-4">
          {renderDiagram()}
        </TabsContent>
      </Tabs>
    </div>
  )
}
