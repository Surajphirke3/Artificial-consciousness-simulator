"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Points, PointMaterial } from "@react-three/drei"
import { useMemo, useEffect, useState } from "react"
import * as THREE from "three"
import { useModelParams } from "@/store/model-store"
import { useSimulationLogs, useSimulationRunning } from "@/store/simulation-store"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function ConsciousnessGraph({ modelId }: { modelId: string }) {
  const params = useModelParams(modelId)
  const running = useSimulationRunning(modelId)
  const logs = useSimulationLogs(modelId)
  const [chartData, setChartData] = useState<Array<{ time: number; consciousness: number }>>([])

  useEffect(() => {
    const data = logs
      .map((log, idx) => {
        const match = log.match(/Consciousness: (\d+)%/)
        return {
          time: idx,
          consciousness: match ? Number.parseInt(match[1]) : 0,
        }
      })
      .filter((d) => d.consciousness > 0)
    setChartData(data)
  }, [logs])

  if (chartData.length > 0) {
    return (
      <div className="w-full h-full p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Line
              type="monotone"
              dataKey="consciousness"
              stroke="var(--color-chart-2)"
              dot={false}
              isAnimationActive={running}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <OrbitControls enablePan={false} />
      <Swarm count={600} radius={params ? 0.6 + params.attention / 100 : 1} />
    </Canvas>
  )
}

function Swarm({ count = 400, radius = 1 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = radius + Math.random() * radius
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions.set(
        [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)],
        i * 3,
      )
    }
    return positions
  }, [count, radius])

  const color = new THREE.Color("hsl(200, 80%, 60%)")
  return (
    <Points positions={points} stride={3}>
      <PointMaterial transparent color={color} size={0.02} sizeAttenuation depthWrite={false} />
    </Points>
  )
}
