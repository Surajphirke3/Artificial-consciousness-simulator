export default function DashboardHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
  )
}
