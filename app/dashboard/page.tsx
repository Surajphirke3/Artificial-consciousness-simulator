"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useModelStore } from "@/store/model-store"
import DashboardHeader from "@/components/layout/DashboardHeader"

export default function DashboardHome() {
  const models = useModelStore((s) => s.models)
  const addModel = useModelStore((s) => s.addModel)

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader title="Dashboard" description="Manage and launch your consciousness models." />
      <Card>
        <CardHeader>
          <CardTitle>Models</CardTitle>
          <CardDescription>Manage your model library or start a new one.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={() => addModel()} variant="default">
            Add Model
          </Button>
          <Button asChild variant="outline">
            <Link href="/education">Learn Theories</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/business">Business Insights</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {models.map((m) => (
          <Card key={m.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{m.name}</span>
                <Button asChild size="sm" variant="secondary">
                  <Link href={`/dashboard/${m.id}`}>Open</Link>
                </Button>
              </CardTitle>
              <CardDescription className="text-xs">
                Memory {m.params.memory}, Attention {m.params.attention}, Emotion {m.params.emotion}, Learn{" "}
                {m.params.learningRate}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A configurable consciousness model ready to simulate.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
