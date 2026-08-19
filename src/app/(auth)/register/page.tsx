"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"STUDENT" | "TEACHER" | "PARENT">("STUDENT")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Registration failed")
      } else {
        toast.success("Account created successfully! Please sign in.")
        router.push("/login")
      }
    } catch {
      toast.error("An error occurred during registration.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Column — Form */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-primary-600 dark:text-primary-400">
            <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-black">
              AI
            </div>
            AI Tutor <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 dark:bg-secondary-900/50 text-secondary-700 dark:text-secondary-300 font-semibold">INDIA</span>
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold text-foreground tracking-tight">
            Start Learning Free
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your account to experience adaptive AI tutoring tailored to your curriculum.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["STUDENT", "TEACHER", "PARENT"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition flex flex-col items-center gap-1 ${
                        role === r
                          ? "bg-primary-50 dark:bg-primary-950/50 border-primary-600 text-primary-600 dark:text-primary-400"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{r === "STUDENT" ? "🎓 Student" : r === "TEACHER" ? "👩‍🏫 Teacher" : "👪 Parent"}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="mt-1 block w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="mt-1 block w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="mt-1 block w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Create Free Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-border text-center">
              <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary-600" /> Free Forever Plan Available • No Credit Card
              </span>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column — Benefits */}
      <div className="hidden lg:flex bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="relative z-10 max-w-lg space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Why 100,000+ Indian students choose AI Tutor
            </h2>
            <p className="mt-2 text-primary-200">
              Transform question-answering into true concept mastery.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { title: "Learning Digital Twin", desc: "Builds a structured model of your exact mastery, gaps, and prerequisites." },
              { title: "CBSE & Board Alignment", desc: "100% aligned to NCERT Class 6–12, ICSE, and State Board curricula." },
              { title: "Smart Sessions", desc: "AI designs your 20-minute daily session targeting your weakest prerequisite." },
              { title: "Live Whiteboard & Voice", desc: "Ask doubts in English, Hindi, or Hinglish with interactive drawing." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-secondary-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-white">{item.title}</h4>
                  <p className="text-xs text-primary-200 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-primary-300">
          © 2026 AI Tutor India. All rights reserved.
        </div>
      </div>
    </div>
  )
}
