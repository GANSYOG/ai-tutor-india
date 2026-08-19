"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Sparkles, Menu, X, Command } from "lucide-react"

interface HeaderProps {
  userRole?: string
  studentName?: string
}

export function Header({ studentName = "Student" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Mobile Brand Logo */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg border border-border text-foreground hover:bg-muted"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link href="/dashboard" className="font-bold text-base text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-600 text-white flex items-center justify-center font-black text-xs">
            AI
          </div>
          <span>AI Tutor</span>
        </Link>
      </div>

      {/* Quick Search / Command Palette trigger (Spec §115) */}
      <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-muted/60 border border-border rounded-xl text-xs text-muted-foreground w-72">
        <Command className="w-3.5 h-3.5" />
        <span>Search concepts, formulas, lessons...</span>
        <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-mono bg-background border border-border rounded shadow-xs">
          ⌘K
        </kbd>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/smart-session"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-xs font-bold hover:bg-primary-100 transition shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-500" /> Start Smart Session
        </Link>

        <button
          className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full" />
        </button>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-card border-b border-border p-4 space-y-3 md:hidden shadow-lg animate-fade-in">
          <div className="text-xs font-bold text-muted-foreground px-2">Signed in as {studentName}</div>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-sm hover:bg-muted"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/smart-session"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-sm bg-primary-50 text-primary-600 dark:bg-primary-950"
          >
            ⚡ Start Smart Session
          </Link>
          <Link
            href="/dashboard/subjects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-sm hover:bg-muted"
          >
            Subjects & Curriculum
          </Link>
          <Link
            href="/dashboard/practice"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-sm hover:bg-muted"
          >
            Practice & Mistakes
          </Link>
        </div>
      )}
    </header>
  )
}
