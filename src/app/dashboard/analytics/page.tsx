import { BarChart3, TrendingUp, Award, Clock } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary-600" /> Learning Analytics & Mastery Engine
        </h1>
        <p className="text-sm text-muted-foreground">
          Deterministic mastery signals: accuracy, hint usage, response time, and prerequisite stability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-2">
          <div className="text-xs font-bold text-muted-foreground">Overall Concept Mastery</div>
          <div className="text-3xl font-black text-secondary-600">78.5%</div>
          <p className="text-xs text-muted-foreground">Explainable scoring, not invented by LLM</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-2">
          <div className="text-xs font-bold text-muted-foreground">Confidence Calibration</div>
          <div className="text-3xl font-black text-primary-600">High</div>
          <p className="text-xs text-muted-foreground">Low overconfidence risk</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-2">
          <div className="text-xs font-bold text-muted-foreground">Retention Strength</div>
          <div className="text-3xl font-black text-accent-500">STABLE</div>
          <p className="text-xs text-muted-foreground">Forgetting risk estimated at 12%</p>
        </div>
      </div>
    </div>
  )
}
