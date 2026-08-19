"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Target,
  BarChart3,
  Calendar,
  Settings,
  LogOut,
  Moon,
  Sun,
  Bot,
  BrainCircuit,
} from "lucide-react"
import { useTheme } from "next-themes"

interface SidebarProps {
  userRole?: string
  studentName?: string
}

export function Sidebar({ userRole = "STUDENT", studentName = "Student" }: SidebarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  interface NavItem {
    label: string
    href: string
    icon: any
    badge?: string
  }

  const studentNav: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "AI Smart Session", href: "/dashboard/smart-session", icon: Sparkles, badge: "AI Core" },
    { label: "Curriculum & Subjects", href: "/dashboard/subjects", icon: BookOpen },
    { label: "Practice & Mistakes", href: "/dashboard/practice", icon: Target },
    { label: "Learning Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Study Planner & Exams", href: "/dashboard/planner", icon: Calendar },
  ]

  const adminNav: NavItem[] = [
    { label: "Admin Overview", href: "/admin", icon: LayoutDashboard },
    { label: "User Management", href: "/admin/users", icon: Settings },
    { label: "Curriculum CMS", href: "/admin/curriculum", icon: BookOpen },
    { label: "AI Feature Control", href: "/admin/features", icon: BrainCircuit },
  ]

  const navItems = userRole === "PLATFORM_ADMIN" || userRole === "SCHOOL_ADMIN" ? adminNav : studentNav

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col justify-between hidden md:flex min-h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center font-black text-base shadow-sm">
              AI
            </div>
            <div>
              <div className="font-bold text-base text-foreground leading-none">AI Tutor</div>
              <div className="text-[10px] font-semibold text-secondary-600 dark:text-secondary-400 mt-1">
                ADAPTIVE STUDY OS
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase px-3 mb-2 tracking-wider">
            {userRole === "PLATFORM_ADMIN" ? "Admin Controls" : "Main Navigation"}
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary-600 dark:text-primary-400" : ""}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 dark:bg-accent-950/60 text-accent-700 dark:text-accent-300 font-extrabold">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* User Footer & Theme Toggle */}
      <div className="p-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-xl">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold shrink-0">
              {studentName.slice(0, 2).toUpperCase()}
            </div>
            <div className="truncate text-xs font-semibold text-foreground">
              {studentName}
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 transition"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  )
}
