"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useModelStore } from "@/store/model-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Plus } from "lucide-react"

export default function UniversalNav() {
  const pathname = usePathname()
  const models = useModelStore((s) => s.models)
  const addModel = useModelStore((s) => s.addModel)

  const isDashboard = pathname.startsWith("/dashboard")

  const navItems = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/education", label: "Education" },
      { href: "/business", label: "Business" },
      { href: "/profile", label: "Profile" },
    ],
    [],
  )

  const isActive = useCallback(
    (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href)),
    [pathname],
  )

  return (
    <header className="border-b border-border bg-background/60 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-xs font-bold text-primary-foreground">
            ACS
          </div>
          <span className="font-semibold hidden sm:inline">Consciousness</span>
        </Link>

        {/* Main Navigation */}
        <nav className="flex items-center gap-1 flex-wrap">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={isActive(item.href) ? "default" : "ghost"}
              size="sm"
              className="text-sm"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Models Dropdown (only on dashboard) */}
        {isDashboard && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <span className="hidden sm:inline">Models</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm font-medium">Your Models</div>
              {models.length === 0 ? (
                <div className="px-2 py-2 text-xs text-muted-foreground">No models yet</div>
              ) : (
                models.map((model) => (
                  <DropdownMenuItem key={model.id} asChild>
                    <Link href={`/dashboard/${model.id}`} className="cursor-pointer">
                      {model.name}
                    </Link>
                  </DropdownMenuItem>
                ))
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => addModel()} className="cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                New Model
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
