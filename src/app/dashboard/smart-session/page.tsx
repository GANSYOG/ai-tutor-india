import Link from "next/link"
import { Sparkles, ArrowLeft, Play, Clock, ShieldAlert } from "lucide-react"

export default function SmartSessionPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 rounded-xl border border-border hover:bg-muted text-foreground">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
            SPEC §5: CORE ORCHESTRATOR
          </span>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">
            Start Smart Session
          </h1>
        </div>
      </div>

      <div className="bg-card border border-border p-8 rounded-3xl space-y-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-accent-500" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-lg text-foreground">Dynamic Session Generated (40 minutes)</h3>
            <p className="text-xs text-muted-foreground">
              Calculated based on your CBSE Class 10 Board exam deadline (in 20 days) and weak prerequisite factorisation.
            </p>
          </div>
        </div>

        {/* Dynamic breakdown */}
        <div className="space-y-2 border-y border-border py-4 text-xs">
          <div className="flex justify-between font-bold py-1.5 border-b border-border/50">
            <span className="text-muted-foreground">3 min • Recall Previous Material</span>
            <span className="text-foreground">Polynomial Roots</span>
          </div>
          <div className="flex justify-between font-bold py-1.5 border-b border-border/50">
            <span className="text-accent-600">7 min • Repair Prerequisite Weakness</span>
            <span className="text-foreground">Algebraic Factorisation</span>
          </div>
          <div className="flex justify-between font-bold py-1.5 border-b border-border/50">
            <span className="text-primary-600">15 min • Learn New Concept</span>
            <span className="text-foreground">Discriminant & Nature of Roots</span>
          </div>
          <div className="flex justify-between font-bold py-1.5 border-b border-border/50">
            <span className="text-muted-foreground">10 min • Guided Practice</span>
            <span className="text-foreground">Step-by-step NCERT Examples</span>
          </div>
          <div className="flex justify-between font-bold py-1.5">
            <span className="text-secondary-600">5 min • Mistake Correction & Summary</span>
            <span className="text-foreground">Sign Handling Verification</span>
          </div>
        </div>

        <div className="bg-primary-50 dark:bg-primary-950/50 p-4 rounded-xl border border-primary-200 dark:border-primary-900 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-primary-600 shrink-0" />
          <p className="text-xs text-primary-800 dark:text-primary-200 font-medium">
            Live AI Tutor Voice & Whiteboard streaming will launch in Phase 2 (Core AI Gateway).
          </p>
        </div>

        <Link
          href="/dashboard"
          className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-sm rounded-xl text-center shadow-md transition block"
        >
          Launch Session Prototype
        </Link>
      </div>
    </div>
  )
}
