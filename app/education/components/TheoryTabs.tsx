"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { theories } from "../data/theories"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

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
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{theories[k].description}</p>
              <div className="rounded-md bg-card/50 p-3">
                <p className="text-sm leading-relaxed">{theories[k].fullDescription}</p>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Info className="h-4 w-4" />
                  Key Points
                </h4>
                <ul className="space-y-1">
                  {theories[k].keyPoints.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold">References</h4>
                <div className="space-y-1">
                  {theories[k].references.map((ref, i) => (
                    <p key={i} className="text-xs text-muted-foreground italic">
                      {ref}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
