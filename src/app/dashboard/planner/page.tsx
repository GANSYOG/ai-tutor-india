import { Calendar, Clock, AlertTriangle } from "lucide-react"

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary-600" /> Personal Study Planner & Exam Readiness (Spec §50 & §53)
        </h1>
        <p className="text-sm text-muted-foreground">
          Adaptive planner recalculating daily target schedule based on exam proximity and missed sessions.
        </p>
      </div>

      <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-foreground">CBSE Class 10 Board Examination</h3>
            <p className="text-xs text-muted-foreground">Target Date: March 1, 2026</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-primary-600">78 / 100</div>
            <div className="text-[11px] font-bold text-secondary-600 uppercase">Exam Readiness Score</div>
          </div>
        </div>

        <div className="p-4 bg-muted/40 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-foreground">Readiness Breakdown:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-muted-foreground">
            <div>Syllabus Coverage: <b className="text-foreground">84%</b></div>
            <div>Mastery Level: <b className="text-foreground">78%</b></div>
            <div>Retention Rate: <b className="text-foreground">82%</b></div>
            <div>Prerequisite Stability: <b className="text-foreground">Solid</b></div>
          </div>
        </div>
      </div>
    </div>
  )
}
