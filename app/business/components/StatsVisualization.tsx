"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { data } from "../data/analyticsData"

export default function StatsVisualization() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="hsl(var(--color-border))" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="hsl(var(--color-muted-foreground))" />
          <YAxis stroke="hsl(var(--color-muted-foreground))" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="oklch(0.696 0.17 162.48)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
