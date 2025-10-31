"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function Preferences() {
  const [autoSave, setAutoSave] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem("acs-preferences")
    if (saved) {
      const prefs = JSON.parse(saved)
      setAutoSave(prefs.autoSave ?? true)
      setReducedMotion(prefs.reducedMotion ?? false)
      setHighContrast(prefs.highContrast ?? false)
    }
  }, [])

  const handlePreferenceChange = (key: string, value: boolean) => {
    const newPrefs = {
      autoSave: key === "autoSave" ? value : autoSave,
      reducedMotion: key === "reducedMotion" ? value : reducedMotion,
      highContrast: key === "highContrast" ? value : highContrast,
    }

    if (key === "autoSave") setAutoSave(value)
    if (key === "reducedMotion") setReducedMotion(value)
    if (key === "highContrast") setHighContrast(value)

    localStorage.setItem("acs-preferences", JSON.stringify(newPrefs))

    // Apply reduced motion to document
    if (key === "reducedMotion") {
      if (value) {
        document.documentElement.style.setProperty("--motion-reduce", "1")
      } else {
        document.documentElement.style.removeProperty("--motion-reduce")
      }
    }

    // Apply high contrast to document
    if (key === "highContrast") {
      if (value) {
        document.documentElement.classList.add("high-contrast")
      } else {
        document.documentElement.classList.remove("high-contrast")
      }
    }

    toast({
      title: "Preference Updated",
      description: `${key === "autoSave" ? "Auto-save" : key === "reducedMotion" ? "Reduced motion" : "High contrast"} has been ${value ? "enabled" : "disabled"}.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="autoSave" className="text-sm font-medium">
            Auto-save Simulations
          </Label>
          <p className="text-xs text-muted-foreground">Automatically save simulation runs</p>
        </div>
        <Switch
          id="autoSave"
          checked={autoSave}
          onCheckedChange={(value) => handlePreferenceChange("autoSave", value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="reducedMotion" className="text-sm font-medium">
            Reduced Motion
          </Label>
          <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
        </div>
        <Switch
          id="reducedMotion"
          checked={reducedMotion}
          onCheckedChange={(value) => handlePreferenceChange("reducedMotion", value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="highContrast" className="text-sm font-medium">
            High Contrast
          </Label>
          <p className="text-xs text-muted-foreground">Increase color contrast for better visibility</p>
        </div>
        <Switch
          id="highContrast"
          checked={highContrast}
          onCheckedChange={(value) => handlePreferenceChange("highContrast", value)}
        />
      </div>
    </div>
  )
}
