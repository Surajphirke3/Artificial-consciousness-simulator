"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Preferences() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="autoSave" className="text-sm">
          Auto-save simulations
        </Label>
        <Switch id="autoSave" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="reducedMotion" className="text-sm">
          Reduced motion
        </Label>
        <Switch id="reducedMotion" />
      </div>
    </div>
  )
}
