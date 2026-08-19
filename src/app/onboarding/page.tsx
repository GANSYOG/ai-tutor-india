"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, ArrowRight, ArrowLeft, Check, BookOpen, Clock, Target, Calendar } from "lucide-react"
import { toast } from "sonner"

const GRADES = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"]
const BOARDS = [
  { code: "CBSE", name: "CBSE (Central Board)" },
  { code: "ICSE", name: "ICSE / ISC" },
  { code: "MH-BOARD", name: "Maharashtra State Board" },
  { code: "OTHER-STATE", name: "Other State Board" },
  { code: "JEE-NEET", name: "JEE / NEET Foundation" },
]
const LANGUAGES = ["English", "Hindi", "Hinglish", "Marathi", "Gujarati", "Tamil", "Telugu", "Kannada", "Bengali"]
const SUBJECTS_LIST = ["Mathematics", "Physics", "Chemistry", "Biology", "Science", "English", "Social Science"]
const FORMATS = [
  { id: "Step-by-step", title: "Step-by-step", desc: "Break problems into logical steps" },
  { id: "Visual", title: "Visual & Diagrams", desc: "Use whiteboards, plots, and figures" },
  { id: "Examples", title: "Examples First", desc: "Show solved examples before rules" },
  { id: "Practice", title: "Practice & Quizzes", desc: "Learn by doing questions right away" },
  { id: "Story", title: "Story / Analogy", desc: "Relate concepts to real-world analogies" },
  { id: "Quick", title: "Quick Explanation", desc: "Concise summaries and key formulas" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form State
  const [ageRange, setAgeRange] = useState("14-16")
  const [gradeLevel, setGradeLevel] = useState("Class 10")
  const [curriculumBoard, setCurriculumBoard] = useState("CBSE")
  const [preferredLanguage, setPreferredLanguage] = useState("English")
  const [subjects, setSubjects] = useState<string[]>(["Mathematics", "Science"])
  const [learningGoals, setLearningGoals] = useState<string[]>(["Board Exams", "Conceptual Clarity"])
  const [targetScore, setTargetScore] = useState("90%+")
  const [examName, setExamName] = useState("CBSE Class 10 Board Exam")
  const [examDate, setExamDate] = useState("2026-03-01")
  const [availableStudyTime, setAvailableStudyTime] = useState("45 min/day")
  const [preferredFormat, setPreferredFormat] = useState("Step-by-step")

  const toggleSubject = (sub: string) => {
    setSubjects((prev) => (prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]))
  }

  const toggleGoal = (goal: string) => {
    setLearningGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ageRange,
          gradeLevel,
          curriculumBoard,
          preferredLanguage,
          subjects,
          learningGoals,
          targetScore,
          examDates: [{ name: examName, date: examDate }],
          availableStudyTime,
          preferredFormat,
        }),
      })

      if (!res.ok) throw new Error()
      toast.success("Learning Digital Twin initialized!")
      router.push("/dashboard")
      router.refresh()
    } catch {
      toast.error("Failed to complete onboarding.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-black text-sm">
            AI
          </div>
          <span className="font-bold text-lg text-foreground">AI Tutor</span>
        </div>
        <div className="text-xs font-semibold text-muted-foreground">
          Step {step} of 5
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto w-full bg-muted h-2 rounded-full overflow-hidden mb-8">
        <div
          className="bg-primary-600 h-full transition-all duration-300 ease-out"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      {/* Main Content Container */}
      <main id="main-content" className="max-w-2xl mx-auto w-full bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm my-auto">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-xs font-semibold text-primary-600 dark:text-primary-400">
              <Sparkles className="w-3.5 h-3.5" /> Step 1: Grade & Curriculum
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Tell us about your current grade and board
            </h2>
            <p className="text-sm text-muted-foreground">
              We align every chapter, formula, and question directly to your board syllabus.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Select Grade / Class
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGradeLevel(g)}
                      className={`p-3 text-xs sm:text-sm font-semibold rounded-xl border transition text-center ${
                        gradeLevel === g
                          ? "bg-primary-50 dark:bg-primary-950/50 border-primary-600 text-primary-600 dark:text-primary-400 shadow-sm"
                          : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Select Board / Curriculum
                </label>
                <div className="space-y-2">
                  {BOARDS.map((b) => (
                    <button
                      key={b.code}
                      type="button"
                      onClick={() => setCurriculumBoard(b.code)}
                      className={`w-full p-3.5 text-sm font-semibold rounded-xl border transition flex items-center justify-between ${
                        curriculumBoard === b.code
                          ? "bg-primary-50 dark:bg-primary-950/50 border-primary-600 text-primary-600 dark:text-primary-400"
                          : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{b.name}</span>
                      {curriculumBoard === b.code && <Check className="w-4 h-4 text-primary-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-xs font-semibold text-primary-600 dark:text-primary-400">
              <BookOpen className="w-3.5 h-3.5" /> Step 2: Subjects & Language
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              What subjects & language do you prefer?
            </h2>
            <p className="text-sm text-muted-foreground">
              AI Tutor can teach and explain in your comfortable language.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Select Subjects to Study
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUBJECTS_LIST.map((sub) => {
                    const selected = subjects.includes(sub)
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubject(sub)}
                        className={`p-3 text-xs sm:text-sm font-semibold rounded-xl border transition flex items-center justify-between ${
                          selected
                            ? "bg-primary-50 dark:bg-primary-950/50 border-primary-600 text-primary-600 dark:text-primary-400"
                            : "border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <span>{sub}</span>
                        {selected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Preferred Language
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {LANGUAGES.slice(0, 6).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setPreferredLanguage(lang)}
                      className={`p-3 text-xs font-semibold rounded-xl border transition ${
                        preferredLanguage === lang
                          ? "bg-primary-50 dark:bg-primary-950/50 border-primary-600 text-primary-600 dark:text-primary-400"
                          : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-xs font-semibold text-primary-600 dark:text-primary-400">
              <Target className="w-3.5 h-3.5" /> Step 3: Goals & Target Score
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              What are your academic goals?
            </h2>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Primary Goals
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Board Exams", "JEE Foundation", "NEET Foundation", "Conceptual Clarity", "School Rank", "Homework Doubts"].map((g) => {
                    const sel = learningGoals.includes(g)
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => toggleGoal(g)}
                        className={`p-3.5 text-xs sm:text-sm font-semibold rounded-xl border text-left transition flex items-center justify-between ${
                          sel
                            ? "bg-primary-50 dark:bg-primary-950/50 border-primary-600 text-primary-600 dark:text-primary-400"
                            : "border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <span>{g}</span>
                        {sel && <Check className="w-4 h-4" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Target Percentage / Score
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["80%+", "85%+", "90%+", "95%+"].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setTargetScore(score)}
                      className={`p-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition ${
                        targetScore === score
                          ? "bg-primary-50 dark:bg-primary-950/50 border-primary-600 text-primary-600 dark:text-primary-400"
                          : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-xs font-semibold text-primary-600 dark:text-primary-400">
              <Calendar className="w-3.5 h-3.5" /> Step 4: Exam & Study Routine
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              When is your next exam?
            </h2>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">
                  Exam Name
                </label>
                <input
                  type="text"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="e.g. CBSE Class 10 Board Exam"
                  className="w-full p-3 bg-background border border-input rounded-xl text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">
                  Target Exam Date
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full p-3 bg-background border border-input rounded-xl text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Clock className="w-4 h-4 inline mr-1" /> How much time can you study daily with AI Tutor?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["20 min", "30 min", "45 min", "60 min+"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setAvailableStudyTime(t)}
                      className={`p-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition ${
                        availableStudyTime === t
                          ? "bg-primary-50 dark:bg-primary-950/50 border-primary-600 text-primary-600 dark:text-primary-400"
                          : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-xs font-semibold text-primary-600 dark:text-primary-400">
              <Sparkles className="w-3.5 h-3.5" /> Step 5: Learning Digital Twin Preference
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              How do you usually understand things best?
            </h2>
            <p className="text-sm text-muted-foreground">
              Spec §8 requirement: We use your preferred format to tailor explanations and adapt teaching style.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {FORMATS.map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setPreferredFormat(fmt.id)}
                  className={`p-4 text-left rounded-xl border transition ${
                    preferredFormat === fmt.id
                      ? "bg-primary-50 dark:bg-primary-950/50 border-primary-600 text-primary-600 dark:text-primary-400 shadow-sm"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <div className="font-semibold text-sm">{fmt.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{fmt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-border mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 text-sm font-semibold rounded-xl border border-border hover:bg-muted text-foreground flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-xl shadow transition flex items-center gap-1.5"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="px-8 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Build My Learning Twin <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground">
        AI Tutor — Learn Smarter. Master Anything.
      </footer>
    </div>
  )
}
