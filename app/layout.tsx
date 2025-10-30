import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import UniversalNav from "@/components/layout/UniversalNav"

export const metadata: Metadata = {
  title: "Artificial Consciousness Simulator | Explore AI & Consciousness Theories",
  description:
    "Run multi-model simulations of consciousness theories (GWT, IIT, Predictive Processing). Learn, experiment, and discover real-world applications in an immersive interface.",
  keywords: ["consciousness", "AI", "simulation", "GWT", "IIT", "predictive processing", "neuroscience"],
  generator: "v0.app",
  applicationName: "Artificial Consciousness Simulator",
  authors: [{ name: "Artificial Consciousness Simulator Team" }],
  creator: "v0.app",
  publisher: "Vercel",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://acs-simulator.vercel.app",
    siteName: "Artificial Consciousness Simulator",
    title: "Artificial Consciousness Simulator | Explore AI & Consciousness Theories",
    description:
      "Run multi-model simulations of consciousness theories. Learn GWT, IIT, and Predictive Processing with interactive diagrams and quizzes.",
    images: [
      {
        url: "https://acs-simulator.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Artificial Consciousness Simulator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artificial Consciousness Simulator",
    description: "Explore consciousness theories with interactive simulations and learning modules.",
    images: ["https://acs-simulator.vercel.app/og-image.png"],
    creator: "@vercel",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://acs-simulator.vercel.app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <UniversalNav />
            <main id="main-content">{children}</main>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
