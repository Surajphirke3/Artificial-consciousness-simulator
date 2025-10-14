"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => setTheme("light")}>
        Light
      </Button>
      <Button variant="outline" size="sm" onClick={() => setTheme("dark")}>
        Dark
      </Button>
      <span className="text-xs text-muted-foreground">Current: {theme ?? "system"}</span>
    </div>
  )
}
