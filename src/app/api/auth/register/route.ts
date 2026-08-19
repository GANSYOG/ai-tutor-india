import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { Role } from "@prisma/client"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().optional().transform((val) => (val ? val.toUpperCase() as Role : Role.STUDENT)),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = registerSchema.parse(body)

    const existingUser = await db.user.findUnique({
      where: { email: parsed.email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(parsed.password, 10)

    const user = await db.user.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        password: hashedPassword,
        role: parsed.role,
        ...(parsed.role === Role.STUDENT && {
          studentProfile: {
            create: {
              preferredLanguage: "English",
            },
          },
        }),
      },
    })

    return NextResponse.json(
      { message: "Registration successful", userId: user.id },
      { status: 201 }
    )
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 })
    }
    console.error("Registration error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
