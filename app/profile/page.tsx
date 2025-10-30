"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UserInfo from "./components/UserInfo"
import SavedSimulations from "./components/SavedSimulations"
import Preferences from "./components/Preferences"
import ThemeToggle from "./components/ThemeToggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your account, preferences, and saved simulations.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="simulations">Saved Simulations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Update your account information and avatar.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserInfo />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme & Appearance</CardTitle>
              <CardDescription>Customize how the app looks and behaves.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ThemeToggle />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simulation Preferences</CardTitle>
              <CardDescription>Configure default settings for simulations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Preferences />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Simulations</CardTitle>
              <CardDescription>View, reopen, and manage your saved simulation runs and configurations.</CardDescription>
            </CardHeader>
            <CardContent>
              <SavedSimulations />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
