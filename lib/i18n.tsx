"use client"

export type Locale = "en" | "hi" | "mr"

export const dictionaries: Record<Locale, Record<string, string>> = {
	en: {
		app_title: "Artificial Consciousness Simulator",
		cta_start: "Start Simulating",
		cta_learn: "Learn the Theory",
		getting_started: "Getting Started",
	},
	hi: {
		app_title: "कृत्रिम चेतना सिमुलेटर",
		cta_start: "सिमुलेशन शुरू करें",
		cta_learn: "सिद्धांत सीखें",
		getting_started: "शुरुआत करें",
	},
	mr: {
		app_title: "कृत्रिम चेतना सिम्युलेटर",
		cta_start: "सिम्युलेशन सुरू करा",
		cta_learn: "सिद्धांत शिका",
		getting_started: "सुरुवात करा",
	},
}

export function getDictionary(locale: Locale) {
	return dictionaries[locale]
}

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type I18nContextValue = {
	locale: Locale
	setLocale: (l: Locale) => void
	t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
	const [locale, setLocale] = useState<Locale>("en")

	useEffect(() => {
		const saved = typeof window !== "undefined" ? (localStorage.getItem("locale") as Locale | null) : null
		if (saved && (saved === "en" || saved === "hi" || saved === "mr")) {
			setLocale(saved)
		}
	}, [])

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("locale", locale)
		}
	}, [locale])

	const dict = useMemo(() => getDictionary(locale), [locale])
	const t = (key: string) => dict[key] ?? key

	const value = useMemo(() => ({ locale, setLocale, t }), [locale, t])
	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
	const ctx = useContext(I18nContext)
	if (!ctx) throw new Error("useI18n must be used within I18nProvider")
	return ctx
}


