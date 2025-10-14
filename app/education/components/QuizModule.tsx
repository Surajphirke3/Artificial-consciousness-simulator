"use client"

import { useState } from "react"
import { quizzes } from "../data/quizzes"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function QuizModule() {
  const [selected, setSelected] = useState<string | null>(null)
  const [result, setResult] = useState<string>("")

  const q = quizzes[0]

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">{q.prompt}</div>
      <RadioGroup onValueChange={setSelected} className="grid gap-2">
        {q.options.map((opt) => (
          <div key={opt.value} className="flex items-center gap-2">
            <RadioGroupItem id={opt.value} value={opt.value} />
            <Label htmlFor={opt.value} className="text-sm">
              {opt.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            if (!selected) return
            setResult(selected === q.answer ? "Correct!" : "Try again.")
          }}
          size="sm"
        >
          Check
        </Button>
        {result && <span className="text-sm text-muted-foreground">{result}</span>}
      </div>
    </div>
  )
}
