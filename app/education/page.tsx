"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TheoryTabs from "./components/TheoryTabs"
import InteractiveDiagram from "./components/InteractiveDiagram"
import QuizModule from "./components/QuizModule"
import CTAButton from "./components/CTAButton"

export default function EducationPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Educational Modules</CardTitle>
          <CardDescription>Explore popular theories and test your understanding.</CardDescription>
        </CardHeader>
        <CardContent>
          <TheoryTabs />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Diagram</CardTitle>
            <CardDescription>Manipulate inputs and observe outputs.</CardDescription>
          </CardHeader>
          <CardContent>
            <InteractiveDiagram />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Quiz</CardTitle>
            <CardDescription>A short quiz per theory.</CardDescription>
          </CardHeader>
          <CardContent>
            <QuizModule />
            <div className="mt-4">
              <CTAButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
