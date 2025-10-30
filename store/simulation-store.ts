"use client"

import { create } from "zustand"

type Params = { memory: number; attention: number; emotion: number; learningRate: number }

type SimulationRun = {
  id: string
  modelId: string
  modelName: string
  params: Params
  logs: string[]
  results: {
    finalConsciousnessLevel: number
    averageStability: number
    peakActivity: number
    timestamp: number
  }
  createdAt: number
  duration: number
}

type SavedSimulation = {
  id: string
  name: string
  params: Params
  modelId: string
  createdAt: number
  updatedAt: number
}

type State = {
  running: Record<string, boolean>
  logs: Record<string, string[]>
  simulations: SimulationRun[]
  saved: SavedSimulation[]
  setRunning: (id: string, running: boolean) => void
  reset: (id: string) => void
  pushThought: (id: string, thought: string) => void
  saveSimulation: (simulation: SimulationRun) => void
  saveSimulationConfig: (config: SavedSimulation) => void
  loadSaved: (id: string) => SavedSimulation | undefined
  deleteSimulation: (id: string) => void
  saveToBackend: () => Promise<void>
  loadFromBackend: () => Promise<void>
}

const EMPTY_LOGS: string[] = []

export const useSimulationStore = create<State>((set, get) => ({
  running: {},
  logs: {},
  simulations: [],
  saved: [],
  setRunning: (id, running) => set((s) => ({ running: { ...s.running, [id]: running } })),
  reset: (id) => set((s) => ({ logs: { ...s.logs, [id]: [] }, running: { ...s.running, [id]: false } })),
  pushThought: (id, thought) =>
    set((s) => ({
      logs: { ...s.logs, [id]: [...(s.logs[id] ?? []), `[${new Date().toLocaleTimeString()}] ${thought}`] },
    })),
  saveSimulation: (simulation) =>
    set((s) => ({
      simulations: [...s.simulations, simulation],
    })),
  saveSimulationConfig: (config) =>
    set((s) => ({
      saved: [...s.saved, config],
    })),
  loadSaved: (id) => {
    const saved = get().saved.find((s) => s.id === id)
    return saved
  },
  deleteSimulation: (id) =>
    set((s) => ({
      simulations: s.simulations.filter((sim) => sim.id !== id),
    })),
  saveToBackend: async () => {
    const { simulations, saved } = get()
    try {
      const response = await fetch("/api/simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ simulations, saved }),
      })
      if (!response.ok) throw new Error("Failed to save simulations")
    } catch (error) {
      console.error("[v0] Error saving simulations to backend:", error)
    }
  },
  loadFromBackend: async () => {
    try {
      const response = await fetch("/api/simulation")
      if (!response.ok) throw new Error("Failed to load simulations")
      const data = await response.json()
      set({ simulations: data.simulations || [], saved: data.saved || [] })
    } catch (error) {
      console.error("[v0] Error loading simulations from backend:", error)
    }
  },
}))

export const useSimulationLogs = (modelId: string) => {
  return useSimulationStore((s) => s.logs[modelId] || EMPTY_LOGS)
}

export const useSimulationRunning = (modelId: string) => {
  return useSimulationStore((s) => s.running[modelId] ?? false)
}
