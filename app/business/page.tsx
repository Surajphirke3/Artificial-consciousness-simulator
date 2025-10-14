"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UseCaseSection from "./components/UseCaseSection"
import StatsVisualization from "./components/StatsVisualization"
import DemoRequestForm from "./components/DemoRequestForm"

export default function BusinessPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Business & Use Cases</CardTitle>
          <CardDescription>Explore how ACS can drive value across domains.</CardDescription>
        </CardHeader>
        <CardContent>
          <UseCaseSection />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>High-level indicators for adoption.</CardDescription>
          </CardHeader>
          <CardContent>
            <StatsVisualization />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Request a Demo</CardTitle>
            <CardDescription>Tell us about your needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <DemoRequestForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
