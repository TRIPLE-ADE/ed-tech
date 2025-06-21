"use client"

import { Menu, Search, Plus, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "../theme-toggle"
import { useLayout } from "./layout-provider"

export function DashboardHeader() {
  const { toggleSidebar } = useLayout()

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="flex h-16 items-center gap-4 px-6">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search documents..." className="pl-10 bg-slate-100 dark:bg-slate-700 border-0" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Document
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
              3
            </Badge>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
