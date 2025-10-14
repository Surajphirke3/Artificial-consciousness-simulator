"use client"

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function UserInfo() {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/placeholder-user.jpg"
        alt="User avatar"
        width={64}
        height={64}
        className="rounded-full border border-border"
      />
      <div className="flex flex-1 items-center gap-2">
        <Input placeholder="Display name" defaultValue="Researcher" />
        <Button>Save</Button>
      </div>
    </div>
  )
}
