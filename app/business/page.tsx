"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UseCaseSection from "./components/UseCaseSection"
import StatsVisualization from "./components/StatsVisualization"
import DemoRequestForm from "./components/DemoRequestForm"

export default function BusinessPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance">Business & Use Cases</h1>
        <p className="text-muted-foreground mt-2">
          Explore how the Artificial Consciousness Simulator can drive value across industries and research domains.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Real-World Applications</CardTitle>
          <CardDescription>Discover practical use cases and implementation strategies.</CardDescription>
        </CardHeader>
        <CardContent>
          <UseCaseSection />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Market Insights</CardTitle>
            <CardDescription>Key metrics and adoption indicators.</CardDescription>
          </CardHeader>
          <CardContent>
            <StatsVisualization />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Request a Demo</CardTitle>
            <CardDescription>Get in touch with our team to learn more.</CardDescription>
          </CardHeader>
          <CardContent>
            <DemoRequestForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
