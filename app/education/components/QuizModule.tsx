"use client"

import { useState } from "react"
import { quizzes } from "../data/quizzes"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react"

export default function QuizModule() {
  const [currentTheory, setCurrentTheory] = useState<"gwt" | "iit" | "pp">("gwt")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)

  const theoryQuizzes = quizzes[currentTheory]
  const q = theoryQuizzes[currentQuestionIndex]
  const isCorrect = selected === q.answer

  const handleCheck = () => {
    if (!selected) return
    setAnswered(true)
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < theoryQuizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const handleTheoryChange = (theory: "gwt" | "iit" | "pp") => {
    setCurrentTheory(theory)
    setCurrentQuestionIndex(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["gwt", "iit", "pp"] as const).map((theory) => (
          <Button
            key={theory}
            variant={currentTheory === theory ? "default" : "outline"}
            size="sm"
            onClick={() => handleTheoryChange(theory)}
            className="text-xs"
          >
            {theory.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="text-xs text-muted-foreground">
        Question {currentQuestionIndex + 1} of {theoryQuizzes.length} | Score: {score}
      </div>

      <div className="space-y-3">
        <div className="text-sm font-medium">{q.prompt}</div>
        <RadioGroup value={selected || ""} onValueChange={setSelected} disabled={answered}>
          {q.options.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem id={opt.value} value={opt.value} />
              <Label htmlFor={opt.value} className="text-sm cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {!answered ? (
        <Button onClick={handleCheck} disabled={!selected} size="sm" className="w-full">
          Check Answer
        </Button>
      ) : (
        <Card className={isCorrect ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-2 flex-1">
                <p className="text-sm font-semibold">{isCorrect ? "Correct!" : "Incorrect"}</p>
                <p className="text-xs text-muted-foreground">{q.explanation}</p>
                <p className="text-xs italic text-muted-foreground">{q.reference}</p>
              </div>
            </div>
            {currentQuestionIndex < theoryQuizzes.length - 1 && (
              <Button onClick={handleNext} size="sm" className="mt-3 w-full bg-transparent" variant="outline">
                Next Question <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
