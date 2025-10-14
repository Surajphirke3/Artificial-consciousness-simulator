"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="border-b border-border bg-background/60 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/placeholder-logo.svg" alt="ACS logo" className="h-6 w-6" />
          <span className="font-medium">ACS</span>
        </Link>
        <nav className="flex items-center gap-3">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/education">Education</NavLink>
          <NavLink href="/business">Business</NavLink>
          <NavLink href="/profile">Profile</NavLink>
        </nav>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button asChild variant="ghost" size="sm" className="text-sm">
      <Link href={href}>{children}</Link>
    </Button>
  )
}
