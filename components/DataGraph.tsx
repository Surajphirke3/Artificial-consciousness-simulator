"use client"

import { useMemo, useRef } from "react"
import {
	ResponsiveContainer,
	LineChart,
	Line,
	AreaChart,
	Area,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	BarChart,
	Bar,
} from "recharts"
import { Button } from "@/components/ui/button"

export type GraphType = "line" | "area" | "bar"

export default function DataGraph({
	data,
	lines,
	type = "line",
	height = 280,
	title,
}: {
	data: Array<Record<string, number | string>>
	lines: Array<{ key: string; color?: string; name?: string }>
	type?: GraphType
	height?: number
	title?: string
}) {
	const containerRef = useRef<HTMLDivElement>(null)
	const downloadPng = () => {
		// Simple client-side snapshot using HTMLCanvasElement from svg isn't trivial; leave as future enhancement
		// For now, suggest browser screenshot or future export with html-to-image
		console.info("Export PNG: consider adding html-to-image for rasterization.")
	}

	const Content = useMemo(() => {
		if (type === "area") {
			return (
				<AreaChart data={data}>
					<CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
					<XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
					<YAxis stroke="var(--color-muted-foreground)" />
					<Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }} />
					{lines.map((l, idx) => (
						<Area key={idx} type="monotone" dataKey={l.key} stroke={l.color ?? "#22d3ee"} fillOpacity={0.2} fill={l.color ?? "#22d3ee"} name={l.name} />
					))}
				</AreaChart>
			)
		}
		if (type === "bar") {
			return (
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
					<XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
					<YAxis stroke="var(--color-muted-foreground)" />
					<Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }} />
					{lines.map((l, idx) => (
						<Bar key={idx} dataKey={l.key} fill={l.color ?? "#22d3ee"} name={l.name} />
					))}
				</BarChart>
			)
		}
		return (
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
				<XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
				<YAxis stroke="var(--color-muted-foreground)" />
				<Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }} />
				{lines.map((l, idx) => (
					<Line key={idx} type="monotone" dataKey={l.key} stroke={l.color ?? "#22d3ee"} dot={false} name={l.name} />
				))}
			</LineChart>
		)
	}, [type, data, lines])

	return (
		<div ref={containerRef} className="w-full">
			{title ? <div className="mb-2 text-sm font-medium text-muted-foreground">{title}</div> : null}
			<div className="rounded-md border border-border">
				<div className="h-[var(--graph-h,280px)]" style={{ ["--graph-h" as any]: `${height}px` }}>
					<ResponsiveContainer width="100%" height="100%">
						{Content}
					</ResponsiveContainer>
				</div>
				<div className="flex items-center justify-end gap-2 p-2">
					<Button size="sm" variant="outline" onClick={downloadPng} aria-label="Export PNG">Export PNG</Button>
				</div>
			</div>
		</div>
	)
}
