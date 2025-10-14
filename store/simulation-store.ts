"use client"

import { create } from "zustand"

type Saved = { name: string; params: { memory: number; attention: number; emotion: number; learningRate: number } }

type State = {
  running: Record<string, boolean>
  logs: Record<string, string[]>
  saved: Saved[]
  setRunning: (id: string, running: boolean) => void
  reset: (id: string) => void
  pushThought: (id: string, thought: string) => void
  save: (item: Saved) => void
  loadSaved: (index: number) => void
}

export const useSimulationStore = create<State>((set, get) => ({
  running: {},
  logs: {},
  saved: [],
  setRunning: (id, running) => set((s) => ({ running: { ...s.running, [id]: running } })),
  reset: (id) => set((s) => ({ logs: { ...s.logs, [id]: [] }, running: { ...s.running, [id]: false } })),
  pushThought: (id, thought) => set((s) => ({ logs: { ...s.logs, [id]: [...(s.logs[id] ?? []), thought] } })),
  save: (item) => set((s) => ({ saved: [...s.saved, item] })),
  loadSaved: (index) => {
    const item = get().saved[index]
    if (!item) return
    // backend code here: apply params to a chosen model; for now no-op
  },
}))
