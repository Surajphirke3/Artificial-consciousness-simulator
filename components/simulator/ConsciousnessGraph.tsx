"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Points, PointMaterial } from "@react-three/drei"
import { useMemo } from "react"
import * as THREE from "three"
import { useModelStore } from "@/store/model-store"

export default function ConsciousnessGraph({ modelId }: { modelId: string }) {
  const params = useModelStore((s) => s.models.find((m) => m.id === modelId)?.params)
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
