import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Tutor — Learn Smarter. Master Anything.",
  description: "India's leading adaptive AI learning operating system for CBSE, ICSE, State Boards & JEE/NEET. 24/7 personal tutor, diagnostic assessments, and concept mastery graph.",
  keywords: ["AI Tutor India", "CBSE AI tutor", "ICSE online tutor", "JEE preparation AI", "NEET doubt solver", "Adaptive Learning"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
