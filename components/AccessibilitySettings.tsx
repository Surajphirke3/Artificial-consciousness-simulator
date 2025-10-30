"use client"

import { useEffect, useState } from "react"
import { useI18n, type Locale } from "@/lib/i18n"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/dropdown-menu"

export default function AccessibilitySettings() {
	const { locale, setLocale } = useI18n()
	const [reducedMotion, setReducedMotion] = useState(false)
	const [highContrast, setHighContrast] = useState(false)

	useEffect(() => {
		if (typeof document === "undefined") return
		document.documentElement.dataset.reduceMotion = reducedMotion ? "true" : "false"
		reducedMotion
			? document.documentElement.classList.add("motion-reduce")
			: document.documentElement.classList.remove("motion-reduce")
		localStorage.setItem("reducedMotion", JSON.stringify(reducedMotion))
	}, [reducedMotion])

	useEffect(() => {
		if (typeof document === "undefined") return
		highContrast
			? document.documentElement.classList.add("hc")
			: document.documentElement.classList.remove("hc")
		localStorage.setItem("highContrast", JSON.stringify(highContrast))
	}, [highContrast])

	useEffect(() => {
		if (typeof window === "undefined") return
		const rm = localStorage.getItem("reducedMotion")
		const hc = localStorage.getItem("highContrast")
		if (rm) setReducedMotion(JSON.parse(rm))
		if (hc) setHighContrast(JSON.parse(hc))
	}, [])

	return (
		<div className="grid gap-4">
			<div className="flex items-center justify-between">
				<Label htmlFor="reduced-motion" className="text-sm">Reduced Motion</Label>
				<Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
			</div>
			<div className="flex items-center justify-between">
				<Label htmlFor="high-contrast" className="text-sm">High Contrast</Label>
				<Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
			</div>
			<div className="flex items-center justify-between">
				<Label className="text-sm">Language</Label>
				<div>
					<select
						aria-label="Language selector"
						value={locale}
						onChange={(e) => setLocale(e.target.value as Locale)}
						className="rounded-md border border-border bg-background px-2 py-1 text-sm"
					>
						<option value="en">English</option>
						<option value="hi">हिंदी</option>
						<option value="mr">मराठी</option>
					</select>
				</div>
			</div>
		</div>
	)
}
