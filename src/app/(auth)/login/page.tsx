"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sparkles, ArrowRight, ShieldCheck, BookOpen, GraduationCap } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        toast.error("Invalid email or password. Please try again.")
      } else {
        toast.success("Welcome back to AI Tutor!")
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      toast.error("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const fillDemoAccount = (role: "student" | "admin" | "teacher") => {
    if (role === "student") {
      setEmail("student@aitutor.in")
      setPassword("student123")
    } else if (role === "admin") {
      setEmail("admin@aitutor.in")
      setPassword("admin123")
    } else {
      setEmail("teacher@aitutor.in")
      setPassword("teacher123")
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
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your AI Tutor account to continue your personalized learning path.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="student@aitutor.in"
                  className="mt-1 block w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground font-medium mb-3 text-center">
                Quick Demo Login (One Click):
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount("student")}
                  className="px-3 py-2 text-xs font-semibold rounded-lg bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 hover:bg-primary-100 transition"
                >
                  🎓 Student
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount("teacher")}
                  className="px-3 py-2 text-xs font-semibold rounded-lg bg-secondary-50 dark:bg-secondary-950/50 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 transition"
                >
                  👩‍🏫 Teacher
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount("admin")}
                  className="px-3 py-2 text-xs font-semibold rounded-lg bg-accent-50 dark:bg-accent-950/50 text-accent-700 dark:text-accent-300 hover:bg-accent-100 transition"
                >
                  ⚙️ Admin
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
              Create student account free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column — Brand / Feature Showcase */}
      <div className="hidden lg:flex bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-primary-200">
            <Sparkles className="w-4 h-4 text-accent-400" /> Powered by Learning Digital Twin Engine
          </div>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
            "AI Tutor understands exactly where I get stuck in Class 10 Math."
          </h2>
          <p className="text-primary-200 text-lg">
            Diagnoses prerequisite gaps, generates personalized smart study sessions, and ensures 100% mastery for CBSE, ICSE, and Board Exams.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold text-white">100K+</div>
              <div className="text-xs text-primary-200">Active Learners</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">99.4%</div>
              <div className="text-xs text-primary-200">Solution Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-primary-200">Instant AI Help</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-primary-300 flex items-center gap-4">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> CBSE & ICSE Aligned</span>
          <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> NCERT Solutions</span>
          <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> JEE & NEET Prep</span>
        </div>
      </div>
    </div>
  )
}
