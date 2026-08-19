import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // 1. Feature Flags
  await prisma.featureFlag.upsert({
    where: { key: "live_classroom" },
    update: {},
    create: { key: "live_classroom", enabled: true, description: "Realtime Voice & Whiteboard Live Classroom" },
  })

  await prisma.featureFlag.upsert({
    where: { key: "smart_session" },
    update: {},
    create: { key: "smart_session", enabled: true, description: "AI Learning Orchestrator Smart Sessions" },
  })

  await prisma.featureFlag.upsert({
    where: { key: "homework_scanner" },
    update: {},
    create: { key: "homework_scanner", enabled: true, description: "Multimodal OCR & Vision Homework Review" },
  })

  // 2. Demo Users (Admin, Student, Teacher)
  const adminPassword = await bcrypt.hash("admin123", 10)
  const studentPassword = await bcrypt.hash("student123", 10)
  const teacherPassword = await bcrypt.hash("teacher123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@aitutor.in" },
    update: {},
    create: {
      name: "Platform Admin",
      email: "admin@aitutor.in",
      password: adminPassword,
      role: Role.PLATFORM_ADMIN,
    },
  })

  const student = await prisma.user.upsert({
    where: { email: "student@aitutor.in" },
    update: {},
    create: {
      name: "Aarav Sharma",
      email: "student@aitutor.in",
      password: studentPassword,
      role: Role.STUDENT,
      studentProfile: {
        create: {
          ageRange: "14-16",
          gradeLevel: "Class 10",
          curriculumBoard: "CBSE",
          preferredLanguage: "English",
          subjects: JSON.stringify(["Mathematics", "Science", "English"]),
          learningGoals: JSON.stringify(["Board Exams", "JEE Foundation"]),
          targetScore: "95%",
          examDates: JSON.stringify([{ name: "CBSE Board Exams", date: "2026-03-01" }]),
          availableStudyTime: "45 min/day",
          preferredFormat: "Step-by-step",
          diagnosticCompleted: true,
          overallMastery: 78.5,
          totalStudyTimeMins: 420,
          streakDays: 5,
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: "teacher@aitutor.in" },
    update: {},
    create: {
      name: "Mrs. Sunita Verma",
      email: "teacher@aitutor.in",
      password: teacherPassword,
      role: Role.TEACHER,
      teacherProfile: {
        create: {
          specialization: "Physics & Mathematics",
          schoolName: "Delhi Public School, R.K. Puram",
        },
      },
    },
  })

  // 3. Demo Organization
  const org = await prisma.organization.upsert({
    where: { slug: "dps-rk-puram" },
    update: {},
    create: {
      name: "Delhi Public School",
      slug: "dps-rk-puram",
      code: "DPS-DELHI",
      campuses: {
        create: {
          name: "Main Campus (R.K. Puram)",
          classes: {
            create: [
              { name: "Class 10-A", grade: "Class 10" },
              { name: "Class 10-B", grade: "Class 10" },
              { name: "Class 12-Science", grade: "Class 12" },
            ],
          },
        },
      },
    },
  })

  // 4. Curricula: CBSE, ICSE, Maharashtra State Board, JEE/NEET
  const cbse = await prisma.curriculum.upsert({
    where: { code: "CBSE" },
    update: {},
    create: {
      name: "Central Board of Secondary Education (CBSE)",
      code: "CBSE",
      description: "Official NCERT-aligned curriculum for India's central board.",
      isOfficial: true,
      grades: {
        create: [
          {
            name: "Class 10",
            level: 10,
            subjects: {
              create: [
                {
                  name: "Mathematics",
                  code: "MATH-10",
                  chapters: {
                    create: [
                      {
                        name: "Real Numbers",
                        order: 1,
                        topics: {
                          create: [
                            {
                              name: "Fundamental Theorem of Arithmetic",
                              concepts: {
                                create: [{ name: "Prime Factorisation & Euclid's Lemma" }],
                              },
                            },
                          ],
                        },
                      },
                      {
                        name: "Quadratic Equations",
                        order: 2,
                        topics: {
                          create: [
                            {
                              name: "Roots of Quadratic Equation",
                              concepts: {
                                create: [{ name: "Discriminant & Nature of Roots" }, { name: "Quadratic Formula Step-by-Step" }],
                              },
                            },
                          ],
                        },
                      },
                      {
                        name: "Trigonometry",
                        order: 3,
                        topics: {
                          create: [
                            {
                              name: "Trigonometric Ratios & Identities",
                              concepts: {
                                create: [{ name: "Sin, Cos, Tan Fundamentals" }, { name: "Pythagorean Trigonometric Identities" }],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  name: "Science (Physics, Chemistry, Biology)",
                  code: "SCI-10",
                  chapters: {
                    create: [
                      {
                        name: "Light - Reflection and Refraction",
                        order: 1,
                        topics: {
                          create: [
                            {
                              name: "Spherical Mirrors & Lenses",
                              concepts: {
                                create: [{ name: "Mirror Formula & Magnification" }, { name: "Snell's Law of Refraction" }],
                              },
                            },
                          ],
                        },
                      },
                      {
                        name: "Electricity",
                        order: 2,
                        topics: {
                          create: [
                            {
                              name: "Ohm's Law & Resistance",
                              concepts: {
                                create: [{ name: "Ohm's Law (V = IR)" }, { name: "Series & Parallel Resistors" }],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })

  const icse = await prisma.curriculum.upsert({
    where: { code: "ICSE" },
    update: {},
    create: {
      name: "Council for the Indian School Certificate Examinations (ICSE)",
      code: "ICSE",
      description: "Comprehensive English-medium curriculum for Class 9-10.",
      isOfficial: true,
    },
  })

  const stateBoard = await prisma.curriculum.upsert({
    where: { code: "MH-BOARD" },
    update: {},
    create: {
      name: "Maharashtra State Board (SSC & HSC)",
      code: "MH-BOARD",
      description: "State Board curriculum for Maharashtra state schools.",
      isOfficial: true,
    },
  })

  const jeeNeet = await prisma.curriculum.upsert({
    where: { code: "JEE-NEET" },
    update: {},
    create: {
      name: "JEE Main & NEET Competitive Exam Foundation",
      code: "JEE-NEET",
      description: "Advanced conceptual mastery for engineering and medical entrance exams.",
      isOfficial: false,
    },
  })

  console.log("✅ Database seeded successfully!")
  console.log(`- Created Demo Student: student@aitutor.in (password: student123)`)
  console.log(`- Created Demo Admin: admin@aitutor.in (password: admin123)`)
  console.log(`- Created Demo Teacher: teacher@aitutor.in (password: teacher123)`)
  console.log(`- Seeded Curricula: CBSE, ICSE, Maharashtra Board, JEE/NEET`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
