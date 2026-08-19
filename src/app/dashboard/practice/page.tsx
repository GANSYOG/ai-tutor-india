import { Target, AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react"

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <Target className="w-6 h-6 text-accent-500" /> Personal Question Bank & Mistakes (Spec §39 & §40)
        </h1>
        <p className="text-sm text-muted-foreground">
          Structural mistake intelligence tracking calculation, sign, formula, and conceptual error frequencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
          <h3 className="font-extrabold text-lg text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" /> Active Misconceptions
          </h3>
          <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20 space-y-2">
            <div className="font-bold text-sm text-destructive">Negative Sign Handling in Algebra</div>
            <p className="text-xs text-muted-foreground">
              "Subtracting negative numbers incorrectly across equality boundary." Frequency: 5 times.
            </p>
            <button className="px-3 py-1.5 bg-destructive text-white rounded-lg text-xs font-bold hover:bg-destructive/90 transition">
              Launch Targeted Repair Lesson
            </button>
          </div>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
          <h3 className="font-extrabold text-lg text-foreground flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-secondary-600" /> One-Tap Spaced Revision
          </h3>
          <div className="p-4 bg-secondary-50 dark:bg-secondary-950/50 rounded-xl border border-secondary-200 dark:border-secondary-900 space-y-2">
            <div className="font-bold text-sm text-foreground">2 Concepts Ready For Review</div>
            <p className="text-xs text-muted-foreground">
              Retention tests show Snell's Law and Quadratic Discriminant formulas are fading.
            </p>
            <button className="px-4 py-2 bg-secondary-600 text-white rounded-lg text-xs font-bold hover:bg-secondary-700 transition">
              Revise What I Need Today
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
