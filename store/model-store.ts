"use client"

import { create } from "zustand"
import { nanoid } from "nanoid"

type Params = { memory: number; attention: number; emotion: number; learningRate: number }
type Model = { id: string; name: string; params: Params }

type State = {
  models: Model[]
  addModel: () => void
  duplicateModel: (id: string) => void
  removeModel: (id: string) => void
  updateParams: (id: string, patch: Partial<Params>) => void
}

const defaultParams: Params = { memory: 50, attention: 50, emotion: 50, learningRate: 50 }

export const useModelStore = create<State>((set) => ({
  models: [
    { id: nanoid(6), name: "Model A", params: { ...defaultParams } },
    { id: nanoid(6), name: "Model B", params: { ...defaultParams, attention: 65 } },
  ],
  addModel: () =>
    set((s) => ({
      models: [
        ...s.models,
        { id: nanoid(6), name: `Model ${String.fromCharCode(65 + s.models.length)}`, params: { ...defaultParams } },
      ],
    })),
  duplicateModel: (id) =>
    set((s) => {
      const found = s.models.find((m) => m.id === id)
      if (!found) return s
      return { models: [...s.models, { id: nanoid(6), name: `${found.name} Copy`, params: { ...found.params } }] }
    }),
  removeModel: (id) => set((s) => ({ models: s.models.filter((m) => m.id !== id) })),
  updateParams: (id, patch) =>
    set((s) => ({
      models: s.models.map((m) => (m.id === id ? { ...m, params: { ...m.params, ...patch } } : m)),
    })),
}))
