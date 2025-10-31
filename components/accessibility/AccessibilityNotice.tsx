"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AccessibilityNotice() {
  return (
    <Alert className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        This application is designed to be accessible. If you encounter any accessibility issues, please{" "}
        <a href="mailto:accessibility@example.com" className="underline hover:no-underline">
          contact us
        </a>
        .
      </AlertDescription>
    </Alert>
  )
}
