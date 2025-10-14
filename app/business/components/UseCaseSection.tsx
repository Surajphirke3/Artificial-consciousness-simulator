"use client"

import { useCases } from "../data/useCases"
import UseCaseCard from "./UseCaseCard"

export default function UseCaseSection() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {useCases.map((c) => (
        <UseCaseCard key={c.title} item={c} />
      ))}
    </div>
  )
}
