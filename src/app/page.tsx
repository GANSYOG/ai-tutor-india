"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BrainCircuit,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  Send,
  Layers,
  GraduationCap,
  Users,
  Award,
  Play,
  FileText,
  Volume2,
} from "lucide-react"

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  // Interactive Live Demo Chat state
  const [demoInput, setDemoInput] = useState("")
  const [demoMessages, setDemoMessages] = useState([
    {
      role: "ai",
      text: "Namaste! 👋 I'm your AI Tutor. Ask me any doubt from Class 6 to 12 NCERT, CBSE, ICSE, or Board exams!",
    },
    {
      role: "user",
      text: "How to solve Ohm's Law problem V=IR when R=50 ohms and I=0.2A?",
    },
    {
      role: "ai",
      text: "Here is the step-by-step solution: \nGiven: R = 50 Ω, I = 0.2 A \nFormula: Potential Difference V = I × R \nCalculation: V = 0.2 × 50 = 10 Volts ✨ \nAnswer: 10V. Would you like a follow-up question or explanation in Hinglish?",
    },
  ])

  const handleDemoSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!demoInput.trim()) return

    const newMsg = demoInput
    setDemoMessages((prev) => [
      ...prev,
      { role: "user", text: newMsg },
      {
        role: "ai",
        text: `Great question! Based on your Class 10 Physics syllabus, let's analyze "${newMsg}". In our full Smart Session, I'll draw this on the interactive whiteboard and guide you step-by-step.`,
      },
    ])
    setDemoInput("")
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary-500 selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
              AI
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight text-foreground leading-none">
                AI Tutor
              </div>
              <span className="text-[10px] font-bold text-secondary-600 dark:text-secondary-400">
                INDIA
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition">How It Works</a>
            <a href="#curriculum" className="hover:text-foreground transition">Curriculum</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-xl transition"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-md transition transform hover:-translate-y-0.5"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section (Spec §86) */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-xs font-bold text-primary-600 dark:text-primary-400">
                <Sparkles className="w-4 h-4 text-accent-500" /> Trusted by 100,000+ Students Across CBSE, ICSE & Boards
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                AI Tutor India: Your Personal <span className="gradient-text">AI Teacher</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                AI Tutor learns how you learn, finds what you're struggling with, and builds every lesson around you.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Start Learning Free <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="#demo"
                  className="w-full sm:w-auto px-7 py-4 bg-card border border-border hover:bg-muted text-foreground font-bold text-base rounded-2xl shadow-xs transition flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-primary-600 fill-current" /> See AI Tutor in Action
                </a>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-secondary-600" /> No Credit Card Required</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> 100% NCERT Aligned</span>
              </div>
            </div>

            {/* Right Visual: Interactive Live Demo Chat Widget */}
            <div id="demo" className="relative">
              <div className="bg-card border border-border rounded-3xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                      ⚡
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">AI Guru (Physics Specialist)</div>
                      <div className="text-xs text-secondary-600 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" /> Online • 24/7 Active
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-muted font-bold text-muted-foreground">
                    Class 10 CBSE
                  </span>
                </div>

                {/* Messages Box */}
                <div className="space-y-3 max-h-72 overflow-y-auto p-1 text-xs">
                  {demoMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary-600 text-white rounded-br-none"
                            : "bg-muted text-foreground rounded-bl-none border border-border"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Demo Input Form */}
                <form onSubmit={handleDemoSend} className="flex gap-2 pt-2 border-t border-border">
                  <input
                    type="text"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="Ask any question from NCERT Math, Science..."
                    className="flex-1 px-4 py-2.5 bg-background border border-input rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-primary-600 text-white rounded-xl font-bold text-xs hover:bg-primary-700 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Spec §2 Central Product Loop) */}
      <section id="how-it-works" className="py-20 bg-muted/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
              The Central Product Loop
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Beyond Question → AI Answer
            </h2>
            <p className="text-muted-foreground text-sm">
              AI Tutor evolves traditional doubt solving into a continuous adaptive learning cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Diagnose", desc: "Adaptive assessment maps your prerequisite knowledge." },
              { step: "02", title: "Digital Twin", desc: "Builds a structured model of your concept state." },
              { step: "03", title: "Smart Session", desc: "Orchestrator generates your daily targeted plan." },
              { step: "04", title: "Teach & Whiteboard", desc: "Interactive voice and visual teaching." },
              { step: "05", title: "Retain & Master", desc: "Spaced retrieval prevents forgetting before exams." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-2xl space-y-2 relative">
                <span className="text-3xl font-black text-primary-600/20">{item.step}</span>
                <h3 className="font-extrabold text-base text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Differentiators (Spec §3, §4, §21, §25, §31) */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-secondary-600 uppercase tracking-widest">
              Core Moat & Differentiators
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Built Specifically for Indian Students
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-8 rounded-3xl space-y-4 shadow-xs hover:border-primary-500 transition">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl text-foreground">Learning Digital Twin</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Not a generic profile. Tracks concepts mastered, active misconceptions, prerequisite weaknesses, and forgetting risks in real-time.
              </p>
            </div>

            <div className="bg-card border border-border p-8 rounded-3xl space-y-4 shadow-xs hover:border-primary-500 transition">
              <div className="w-12 h-12 rounded-2xl bg-secondary-50 dark:bg-secondary-950 text-secondary-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl text-foreground">AI Learning Orchestrator</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Evaluates exam deadlines, mastery, and availability to recommend the single Next Best Learning Action every day.
              </p>
            </div>

            <div className="bg-card border border-border p-8 rounded-3xl space-y-4 shadow-xs hover:border-primary-500 transition">
              <div className="w-12 h-12 rounded-2xl bg-accent-50 dark:bg-accent-950 text-accent-600 flex items-center justify-center">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl text-foreground">Multilingual Voice & Whiteboard</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Speak and listen in English, Hindi, or Hinglish with real-time synchronized interactive canvas drawing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Spec §83) */}
      <section id="pricing" className="py-20 bg-muted/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
              Configurable Pricing Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Invest in Long-Term Mastery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-card border border-border p-8 rounded-3xl space-y-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <h3 className="font-extrabold text-xl text-foreground">Free Starter</h3>
                <div className="text-3xl font-black text-foreground">₹0</div>
                <p className="text-xs text-muted-foreground">Ideal for trying doubt solving and NCERT solutions.</p>
                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> 10 AI doubt solutions/day</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> Basic diagnostic test</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> NCERT chapter search</li>
                </ul>
              </div>
              <Link href="/register" className="w-full py-3 bg-muted text-foreground font-bold text-xs rounded-xl text-center hover:bg-muted/80 transition">
                Start Free
              </Link>
            </div>

            {/* Student Pro Plan */}
            <div className="bg-card border-2 border-primary-600 p-8 rounded-3xl space-y-6 flex flex-col justify-between shadow-xl relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 text-white text-[10px] font-extrabold uppercase rounded-full tracking-wider">
                MOST POPULAR
              </div>
              <div className="space-y-4">
                <h3 className="font-extrabold text-xl text-foreground">Student Pro</h3>
                <div className="text-3xl font-black text-primary-600">₹299<span className="text-sm font-semibold text-muted-foreground">/mo</span></div>
                <p className="text-xs text-muted-foreground">Complete AI Tutor with Learning Digital Twin & Voice.</p>
                <ul className="space-y-2 text-xs text-foreground pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> Unlimited 24/7 AI Tutor access</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> Full Learning Digital Twin & Graph</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> Multilingual Voice & Whiteboard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> Homework OCR Scanner</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> Exam Readiness & Recovery Plan</li>
                </ul>
              </div>
              <Link href="/register" className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl text-center shadow-md transition">
                Get Student Pro
              </Link>
            </div>

            {/* Institution / School Plan */}
            <div className="bg-card border border-border p-8 rounded-3xl space-y-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <h3 className="font-extrabold text-xl text-foreground">School / Institution</h3>
                <div className="text-2xl font-black text-foreground">Custom</div>
                <p className="text-xs text-muted-foreground">Multi-tenant platform for schools and coaching institutes.</p>
                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> Teacher & Parent dashboards</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> Class mastery analytics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary-600" /> Tenant data isolation</li>
                </ul>
              </div>
              <Link href="/register" className="w-full py-3 bg-muted text-foreground font-bold text-xs rounded-xl text-center hover:bg-muted/80 transition">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-foreground">Frequently Asked Questions</h2>
          <p className="text-xs text-muted-foreground">Everything you need to know about AI Tutor</p>
        </div>

        <div className="space-y-3">
          {[
            { q: "Is AI Tutor aligned with NCERT and CBSE Class 6 to 12?", a: "Yes! AI Tutor is built from the ground up to follow official NCERT syllabi for CBSE, ICSE, and State Boards, including JEE/NEET foundation concepts." },
            { q: "What is the Learning Digital Twin?", a: "The Learning Digital Twin is a structured educational model of your knowledge state — tracking concepts mastered, weak prerequisites, active misconceptions, and retention strength." },
            { q: "Can I speak and ask doubts in Hindi or Hinglish?", a: "Absolutely. AI Tutor natively understands and speaks English, Hindi, Hinglish, Marathi, Gujarati, Tamil, Telugu, and other Indian languages." },
            { q: "How does the Start Smart Session work?", a: "The AI Learning Orchestrator dynamically designs a 20-45 minute custom study session targeting your weakest prerequisite before introducing new concepts." },
          ].map((item, index) => (
            <div key={index} className="bg-card border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-5 text-left font-bold text-sm text-foreground flex justify-between items-center hover:bg-muted/50 transition"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeFaq === index ? "rotate-180 text-primary-600" : ""}`} />
              </button>
              {activeFaq === index && (
                <div className="p-5 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/50">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <div className="w-6 h-6 rounded bg-primary-600 text-white flex items-center justify-center text-xs">AI</div>
            AI Tutor India
          </div>
          <div>© 2026 AI Tutor India — Learn Smarter. Master Anything.</div>
        </div>
      </footer>
    </div>
  )
}
