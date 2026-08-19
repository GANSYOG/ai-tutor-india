import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

export function daysUntil(date: Date | string): number {
  const now = new Date()
  const target = new Date(date)
  const diff = target.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

export function getMasteryLabel(score: number): string {
  if (score >= 90) return "Mastered"
  if (score >= 70) return "Proficient"
  if (score >= 50) return "Learning"
  if (score >= 30) return "Developing"
  return "Getting Started"
}

export function getMasteryColor(score: number): string {
  if (score >= 90) return "text-secondary-600 dark:text-secondary-400"
  if (score >= 70) return "text-primary-600 dark:text-primary-400"
  if (score >= 50) return "text-accent-600 dark:text-accent-400"
  return "text-destructive-500"
}
