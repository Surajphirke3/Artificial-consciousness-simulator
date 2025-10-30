export default function DashboardHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h1 className="text-2xl font-bold text-balance">{title}</h1>
      {description ? <p className="text-sm text-muted-foreground mt-1">{description}</p> : null}
    </div>
  )
}
