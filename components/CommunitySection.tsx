"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function CommunitySection({ threadId = "general" }: { threadId?: string }) {
	const [comments, setComments] = useState<Array<{ id: string; text: string; at: number }>>([])
	const [text, setText] = useState("")

	function addComment() {
		if (!text.trim()) return
		setComments((c) => [...c, { id: String(Date.now()), text: text.trim(), at: Date.now() }])
		setText("")
		// Future: persist to Supabase/Appwrite via RPC or REST
	}

	return (
		<div className="rounded-lg border border-border p-3">
			<div className="mb-2 text-sm font-medium">Discussion</div>
			<div className="mb-3">
				<Textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Share your thoughts or findings…"
					rows={3}
				/>
				<div className="mt-2 flex justify-end">
					<Button size="sm" onClick={addComment}>Post</Button>
				</div>
			</div>
			<div className="space-y-2">
				{comments.length === 0 ? (
					<p className="text-xs text-muted-foreground">Be the first to start the conversation.</p>
				) : (
					comments.slice().reverse().map((c) => (
						<div key={c.id} className="rounded-md border border-border p-2 text-sm">
							<div className="text-xs text-muted-foreground">{new Date(c.at).toLocaleString()}</div>
							<div className="mt-1 whitespace-pre-wrap">{c.text}</div>
						</div>
					))
				)}
			</div>
		</div>
	)
}
