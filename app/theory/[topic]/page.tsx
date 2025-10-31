"use client"

import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const theoryContent: Record<string, { title: string; sections: Array<{ h: string; p: string }> }> = {
	gwt: {
		title: "Global Workspace Theory (GWT)",
		sections: [
			{ h: "Overview", p: "Consciousness arises when information becomes globally available across specialized modules." },
			{ h: "Predictions", p: "Broadcast signatures, ignition dynamics, and widespread cortical activation." },
		],
	},
	iit: {
		title: "Integrated Information Theory (IIT)",
		sections: [
			{ h: "Overview", p: "Consciousness correlates with integrated information (Φ) within causal structures." },
			{ h: "Predictions", p: "High Φ systems exhibit rich cause-effect power and exclusion principles." },
		],
	},
	pp: {
		title: "Predictive Processing (PP)",
		sections: [
			{ h: "Overview", p: "Brains minimize prediction error via hierarchical generative models and precision weighting." },
			{ h: "Predictions", p: "Attention as precision, perception as inference, and action as prediction fulfillment." },
		],
	},
}

export default function TheoryTopicPage() {
	const { topic } = useParams<{ topic: string }>()
	const data = useMemo(() => theoryContent[topic?.toLowerCase?.() ?? ""] ?? null, [topic])
	const [openIdx, setOpenIdx] = useState<number | null>(0)

	if (!data) {
		return <div className="p-4 text-sm text-muted-foreground">Unknown theory. Try gwt, iit, or pp.</div>
	}

	return (
		<div className="flex flex-col gap-4">
			<Card>
				<CardHeader>
					<CardTitle>{data.title}</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-3">
					{data.sections.map((s, i) => (
						<div key={i} className="rounded-md border border-border p-3">
							<div className="flex items-center justify-between">
								<h3 className="text-sm font-medium">{s.h}</h3>
								<Button size="sm" variant="ghost" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
									{openIdx === i ? "Hide" : "Expand"}
								</Button>
							</div>
							{openIdx === i && <p className="mt-2 text-sm text-muted-foreground">{s.p}</p>}
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	)
}
