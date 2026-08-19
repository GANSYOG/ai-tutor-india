import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { Role } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: Role
      studentProfileId?: string
      teacherProfileId?: string
    } & DefaultSession["user"]
  }

  interface User {
    role: Role
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        const user = await db.user.findUnique({
          where: { email },
          include: {
            studentProfile: true,
            teacherProfile: true,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role

        const profile = await db.user.findUnique({
          where: { id: token.id as string },
          select: {
            studentProfile: { select: { id: true } },
            teacherProfile: { select: { id: true } },
          },
        })

        if (profile?.studentProfile) {
          session.user.studentProfileId = profile.studentProfile.id
        }
        if (profile?.teacherProfile) {
          session.user.teacherProfileId = profile.teacherProfile.id
        }
      }
      return session
    },
  },
})
