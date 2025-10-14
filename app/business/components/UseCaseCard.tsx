"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Item = {
  icon?: React.ReactNode
  title: string
  description: string
}

export default function UseCaseCard({ item }: { item: Item }) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-base">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p className="mb-3">{item.description}</p>
        <Button variant="secondary" size="sm">
          Learn more
        </Button>
      </CardContent>
    </Card>
  )
}
