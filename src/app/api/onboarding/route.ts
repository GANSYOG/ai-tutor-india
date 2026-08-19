import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const {
      ageRange,
      gradeLevel,
      curriculumBoard,
      preferredLanguage,
      subjects,
      learningGoals,
      targetScore,
      examDates,
      availableStudyTime,
      preferredFormat,
    } = body

    const profile = await db.studentProfile.upsert({
      where: { userId: session.user.id },
      update: {
        ageRange,
        gradeLevel,
        curriculumBoard,
        preferredLanguage,
        subjects: JSON.stringify(subjects || []),
        learningGoals: JSON.stringify(learningGoals || []),
        targetScore,
        examDates: JSON.stringify(examDates || []),
        availableStudyTime,
        preferredFormat,
        diagnosticCompleted: false,
      },
      create: {
        userId: session.user.id,
        ageRange,
        gradeLevel,
        curriculumBoard,
        preferredLanguage,
        subjects: JSON.stringify(subjects || []),
        learningGoals: JSON.stringify(learningGoals || []),
        targetScore,
        examDates: JSON.stringify(examDates || []),
        availableStudyTime,
        preferredFormat,
        diagnosticCompleted: false,
      },
    })

    return NextResponse.json({ message: "Onboarding completed", profileId: profile.id })
  } catch (err) {
    console.error("Onboarding API error:", err)
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 })
  }
}
