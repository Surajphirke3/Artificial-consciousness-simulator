"use client"

import { useSimulationStore } from "@/store/simulation-store"
export function useSimulation(modelId: string) {
  const running = useSimulationStore((s) => s.running[modelId] ?? false)
  const setRunning = useSimulationStore((s) => s.setRunning)
  const reset = useSimulationStore((s) => s.reset)
  const pushThought = useSimulationStore((s) => s.pushThought)
  return { running, setRunning, reset, pushThought }
}
