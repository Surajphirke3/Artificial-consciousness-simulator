"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Play, GraduationCap } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        {/* Subtle particle aura using framer-motion, no heavy gradients */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.2 }}
        >
          <div
            className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "color-mix(in oklab, var(--color-chart-2) 40%, transparent)" }}
          />
          <div
            className="absolute -bottom-24 left-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "color-mix(in oklab, var(--color-chart-1) 35%, transparent)" }}
          />
          <div
            className="absolute -bottom-16 right-16 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "color-mix(in oklab, var(--color-chart-4) 25%, transparent)" }}
          />
        </motion.div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-20 text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm text-muted-foreground backdrop-blur"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Artificial Consciousness Simulator
          </motion.div>

          <motion.h1
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Explore the frontier of AI, Mind, and Awareness
          </motion.h1>

          <motion.p
            className="text-pretty max-w-2xl text-muted-foreground"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Run multi-model simulations, learn leading theories of consciousness, and discover real-world applications —
            all in an immersive, futuristic interface.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <Button asChild size="lg">
              <Link href="/dashboard">
                <Play className="mr-2 h-4 w-4" />
                Start Simulation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/education">
                <GraduationCap className="mr-2 h-4 w-4" />
                Learn More
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-border bg-card/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Multi-Model</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Run independent models side-by-side with adjustable parameters.
              </CardContent>
            </Card>
            <Card className="border-border bg-card/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Interactive Learning</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Explore GWT, IIT, and Predictive Processing with diagrams and quizzes.
              </CardContent>
            </Card>
            <Card className="border-border bg-card/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Business Insights</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Charts and forms to evaluate research and organizational impact.
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
