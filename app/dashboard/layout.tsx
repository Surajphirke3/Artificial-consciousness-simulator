import type { ReactNode } from "react"
import Sidebar from "@/components/layout/Sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border border-border bg-card">
          <Sidebar />
        </aside>
        <section className="min-h-[70vh] rounded-lg border border-border bg-card p-4">{children}</section>
      </div>
    </div>
  )
}
