import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { getGreeting } from "@/lib/utils"
import Link from "next/link"
import {
  Sparkles,
  Play,
  Clock,
  BookOpen,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Brain,
  CheckCircle2,
  ChevronRight,
  Target,
} from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  const user = session?.user

  // Fetch student profile & learning state
  const profile = await db.studentProfile.findUnique({
    where: { userId: user?.id || "" },
  })

  const greeting = getGreeting()
  const studentName = user?.name || "Learner"
  const board = profile?.curriculumBoard || "CBSE"
  const grade = profile?.gradeLevel || "Class 10"
  const mastery = profile?.overallMastery || 78.5
  const streakDays = profile?.streakDays || 5
  const totalStudyTimeMins = profile?.totalStudyTimeMins || 420

  // Parse exam dates safely
  let examDatesList: { name: string; date: string }[] = []
  try {
    if (profile?.examDates) {
      examDatesList = JSON.parse(profile.examDates)
    }
  } catch {
    examDatesList = [{ name: `${board} ${grade} Board Exam`, date: "2026-03-01" }]
  }
  if (examDatesList.length === 0) {
    examDatesList = [{ name: `${board} ${grade} Board Exam`, date: "2026-03-01" }]
  }

  // Calculate exam countdown days
  const targetDate = new Date(examDatesList[0].date)
  const diffTime = targetDate.getTime() - new Date().getTime()
  const examDaysLeft = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner — Greeting & Primary CTA (Spec §14) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-900 via-primary-800 to-primary-950 p-6 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-primary-200">
              <Sparkles className="w-3.5 h-3.5 text-accent-400" /> {board} • {grade} • {streakDays} Day Streak 🔥
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {greeting}, {studentName}!
            </h1>
            <p className="text-primary-200 text-base max-w-xl">
              Here's the smartest way to study today based on your Learning Digital Twin.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/dashboard/smart-session"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-secondary-500 hover:bg-secondary-600 text-white font-extrabold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-5 h-5 fill-current" /> START SMART SESSION
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Section: Main Left Column & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Recommendation Card (Spec §14) */}
          <div className="bg-card border border-primary-200 dark:border-primary-900/60 p-6 rounded-2xl shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider">
              <Brain className="w-4 h-4 text-accent-500" /> AI Learning Orchestrator Recommendation
            </div>
            <p className="text-foreground text-base font-medium leading-relaxed">
              "Before continuing Quadratic Equations, revise <span className="font-bold text-primary-600 dark:text-primary-400 underline decoration-primary-300">Factorisation & Algebraic Identities</span> for 8 minutes to repair prerequisite stability."
            </p>
            <div className="pt-1 flex items-center gap-3">
              <Link
                href="/dashboard/smart-session"
                className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
              >
                Accept Recommendation & Launch Repair <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Continue Learning */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600" /> Continue Learning
              </h3>
              <span className="text-xs font-semibold text-muted-foreground">Class 10 Mathematics</span>
            </div>

            <div className="p-4 bg-muted/50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase">Chapter 2 • Lesson 3</div>
                <div className="text-base font-bold text-foreground">Discriminant & Nature of Roots</div>
                <div className="text-xs text-muted-foreground">Quadratic Equations (NCERT Ex 4.4)</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-semibold text-muted-foreground">Progress</div>
                  <div className="text-sm font-extrabold text-secondary-600">68%</div>
                </div>
                <Link
                  href="/dashboard/subjects"
                  className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  Resume Lesson
                </Link>
              </div>
            </div>
          </div>

          {/* Today's Recommended Plan */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="font-extrabold text-lg text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-500" /> Today's Adaptive Plan (45 min total)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                <div className="text-xs font-semibold text-muted-foreground">1. Prerequisite Repair</div>
                <div className="text-sm font-bold text-foreground">Factorisation (8 min)</div>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-accent-100 dark:bg-accent-950 text-accent-700 font-bold">Weak Gap</span>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                <div className="text-xs font-semibold text-muted-foreground">2. New Concept</div>
                <div className="text-sm font-bold text-foreground">Trigonometric Ratios (25 min)</div>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-950 text-primary-700 font-bold">Core Syllabus</span>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                <div className="text-xs font-semibold text-muted-foreground">3. Retention Test</div>
                <div className="text-sm font-bold text-foreground">Ohm's Law Recall (12 min)</div>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-secondary-100 dark:bg-secondary-950 text-secondary-700 font-bold">Spaced Review</span>
              </div>
            </div>
          </div>

          {/* Actionable Weak Concepts (Spec §14) */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" /> Actionable Weak Concepts
              </h3>
              <span className="text-xs text-muted-foreground">Updated by Digital Twin</span>
            </div>

            <div className="space-y-3">
              {[
                { concept: "Negative Sign Handling in Algebra", chapter: "Polynomials", frequency: "5 mistakes", status: "Active Misconception" },
                { concept: "Snell's Law Angle Calculation", chapter: "Light & Refraction", frequency: "3 mistakes", status: "Review Required" },
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-xl border border-border flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-foreground">{item.concept}</div>
                    <div className="text-xs text-muted-foreground">{item.chapter} • {item.frequency}</div>
                  </div>
                  <Link
                    href="/dashboard/practice"
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition"
                  >
                    Fix Concept
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar (1 Col wide) */}
        <div className="space-y-6">
          {/* Upcoming Exam Countdown (Spec §14 & §51) */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-600" /> Upcoming Exam
              </h3>
              <span className="text-xs font-bold text-secondary-600">ON TRACK</span>
            </div>

            <div className="text-center p-4 bg-primary-50 dark:bg-primary-950/50 rounded-2xl border border-primary-100 dark:border-primary-900">
              <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
                {examDaysLeft} Days
              </div>
              <div className="text-xs font-semibold text-muted-foreground mt-1">
                {examDatesList[0].name}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-muted-foreground">Syllabus Covered</span>
                <span className="text-foreground">84%</span>
              </div>
              <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary-600 h-full w-[84%]" />
              </div>

              <div className="flex justify-between font-semibold pt-1">
                <span className="text-muted-foreground">Concept Mastery</span>
                <span className="text-secondary-600">{mastery}%</span>
              </div>
              <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary-500 h-full" style={{ width: `${mastery}%` }} />
              </div>
            </div>
          </div>

          {/* Learning Progress & Stats */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-secondary-600" /> Weekly Learning Stats
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-muted/50 rounded-xl text-center">
                <div className="text-xl font-bold text-foreground">{Math.round(totalStudyTimeMins / 60)}h</div>
                <div className="text-[11px] text-muted-foreground font-semibold">Study Time</div>
              </div>
              <div className="p-3.5 bg-muted/50 rounded-xl text-center">
                <div className="text-xl font-bold text-secondary-600">24</div>
                <div className="text-[11px] text-muted-foreground font-semibold">Concepts Mastered</div>
              </div>
            </div>
          </div>

          {/* Quick Revision Due Today */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent-500" /> Revision Due Today
            </h3>
            <p className="text-xs text-muted-foreground">
              Spaced retention test predicts fading risk on 2 concepts.
            </p>
            <Link
              href="/dashboard/practice"
              className="w-full block py-2.5 px-4 bg-muted hover:bg-muted/80 text-center font-bold text-xs text-foreground rounded-xl transition"
            >
              Start 5-min Spaced Revision
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
