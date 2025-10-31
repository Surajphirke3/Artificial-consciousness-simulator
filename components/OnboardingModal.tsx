"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const steps = [
	{
		title: "Welcome",
		desc: "Explore consciousness theories and run interactive simulations.",
	},
	{
		title: "Adjust Parameters",
		desc: "Tune memory, attention, emotion, and learning rate to see effects.",
	},
	{
		title: "Track Metrics",
		desc: "Watch awareness trends and export results for analysis.",
	},
]

export default function OnboardingModal() {
	const { t } = useI18n()
	const [open, setOpen] = useState(false)
	const [idx, setIdx] = useState(0)

	useEffect(() => {
		if (typeof window === "undefined") return
		const seen = localStorage.getItem("onboardingSeen")
		if (!seen) setOpen(true)
	}, [])

	function close() {
		setOpen(false)
		if (typeof window !== "undefined") localStorage.setItem("onboardingSeen", "1")
	}

	if (!open) return null

	const s = steps[idx]
	const last = idx === steps.length - 1

	return (
		<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/60" onClick={close} />
			<div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-card p-4 shadow-lg">
				<div className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Getting Started</div>
				<h3 className="text-lg font-semibold">{s.title}</h3>
				<p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
				<div className="mt-4 flex items-center justify-between">
					<div className="text-xs text-muted-foreground">Step {idx + 1} / {steps.length}</div>
					<div className="flex gap-2">
						{idx > 0 && (
							<Button size="sm" variant="outline" onClick={() => setIdx((v) => Math.max(0, v - 1))}>Back</Button>
						)}
						{!last ? (
							<Button size="sm" onClick={() => setIdx((v) => Math.min(steps.length - 1, v + 1))}>Next</Button>
						) : (
							<Button size="sm" onClick={close}>Finish</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
