"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { theories } from "../data/theories"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TheoryTabs() {
  const keys = Object.keys(theories) as Array<keyof typeof theories>
  return (
    <Tabs defaultValue={keys[0]} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {keys.map((k) => (
          <TabsTrigger key={k} value={k} className="text-xs sm:text-sm">
            {theories[k].name}
          </TabsTrigger>
        ))}
      </TabsList>
      {keys.map((k) => (
        <TabsContent key={k} value={k}>
          <Card className="mt-3">
            <CardHeader>
              <CardTitle className="text-base">{theories[k].name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{theories[k].description}</CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
