"use client"

import { useModelStore } from "@/store/model-store"
export function useModelManager() {
  const { models, addModel, duplicateModel, removeModel, updateParams } = useModelStore()
  return { models, addModel, duplicateModel, removeModel, updateParams }
}
