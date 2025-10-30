"use client"

import { create } from "zustand"
import { nanoid } from "nanoid"

type Params = { memory: number; attention: number; emotion: number; learningRate: number }

type Model = {
  id: string
  name: string
  params: Params
  createdAt: number
  updatedAt: number
  description?: string
}

type State = {
  models: Model[]
  addModel: () => void
  duplicateModel: (id: string) => void
  removeModel: (id: string) => void
  updateParams: (id: string, patch: Partial<Params>) => void
  updateModel: (id: string, patch: Partial<Model>) => void
  saveToBackend: () => Promise<void>
  loadFromBackend: () => Promise<void>
}

const defaultParams: Params = { memory: 50, attention: 50, emotion: 50, learningRate: 50 }

export const useModelStore = create<State>((set, get) => ({
  models: [
    {
      id: nanoid(6),
      name: "Model A",
      params: { ...defaultParams },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      description: "Default consciousness model",
    },
    {
      id: nanoid(6),
      name: "Model B",
      params: { ...defaultParams, attention: 65 },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      description: "High attention variant",
    },
  ],
  addModel: () =>
    set((s) => {
      const newModel: Model = {
        id: nanoid(6),
        name: `Model ${String.fromCharCode(65 + s.models.length)}`,
        params: { ...defaultParams },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      return { models: [...s.models, newModel] }
    }),
  duplicateModel: (id) =>
    set((s) => {
      const found = s.models.find((m) => m.id === id)
      if (!found) return s
      const duplicate: Model = {
        id: nanoid(6),
        name: `${found.name} Copy`,
        params: { ...found.params },
        createdAt: Date.now(),
        updatedAt: Date.now(),
        description: found.description,
      }
      return { models: [...s.models, duplicate] }
    }),
  removeModel: (id) => set((s) => ({ models: s.models.filter((m) => m.id !== id) })),
  updateParams: (id, patch) =>
    set((s) => ({
      models: s.models.map((m) =>
        m.id === id ? { ...m, params: { ...m.params, ...patch }, updatedAt: Date.now() } : m,
      ),
    })),
  updateModel: (id, patch) =>
    set((s) => ({
      models: s.models.map((m) => (m.id === id ? { ...m, ...patch, updatedAt: Date.now() } : m)),
    })),
  saveToBackend: async () => {
    const models = get().models
    try {
      const response = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ models }),
      })
      if (!response.ok) throw new Error("Failed to save models")
    } catch (error) {
      console.error("[v0] Error saving models to backend:", error)
    }
  },
  loadFromBackend: async () => {
    try {
      const response = await fetch("/api/models")
      if (!response.ok) throw new Error("Failed to load models")
      const data = await response.json()
      set({ models: data.models || [] })
    } catch (error) {
      console.error("[v0] Error loading models from backend:", error)
    }
  },
}))

export const useModelById = (modelId: string) => {
  return useModelStore((s) => s.models.find((m) => m.id === modelId) ?? null)
}

export const useModelParams = (modelId: string) => {
  return useModelStore((s) => s.models.find((m) => m.id === modelId)?.params ?? null)
}
