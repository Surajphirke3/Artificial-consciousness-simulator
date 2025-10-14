"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTAButton() {
  return (
    <Button asChild variant="secondary">
      <Link href="/dashboard">{"Try This Model in Dashboard"}</Link>
    </Button>
  )
}
