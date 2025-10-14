"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UserInfo from "./components/UserInfo"
import SavedSimulations from "./components/SavedSimulations"
import Preferences from "./components/Preferences"
import ThemeToggle from "./components/ThemeToggle"

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>// backend code here: user profile data</CardDescription>
          </CardHeader>
          <CardContent>
            <UserInfo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme & Preferences</CardTitle>
            <CardDescription>Control your appearance and defaults.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ThemeToggle />
            <Preferences />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Saved Simulations</CardTitle>
          <CardDescription>// backend code here: saved simulations</CardDescription>
        </CardHeader>
        <CardContent>
          <SavedSimulations />
        </CardContent>
      </Card>
    </main>
  )
}
