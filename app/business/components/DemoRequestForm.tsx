"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function DemoRequestForm() {
  const [status, setStatus] = useState<string>("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("Submitting...")
    // backend code here: POST to /api/request
    await new Promise((r) => setTimeout(r, 700))
    setStatus("Submitted! We will reach out shortly.")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input placeholder="Company or Name" required />
      <Input type="email" placeholder="Email" required />
      <Textarea placeholder="Describe your use case" />
      <Button type="submit">Request Demo</Button>
      {status && <p className="text-sm text-muted-foreground">{status}</p>}
    </form>
  )
}
