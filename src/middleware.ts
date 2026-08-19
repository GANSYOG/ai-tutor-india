import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const role = req.auth?.user?.role

  const isAuthRoute = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register")
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/onboarding")
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (role === "PLATFORM_ADMIN" || role === "SCHOOL_ADMIN") {
        return NextResponse.redirect(new URL("/admin", nextUrl))
      }
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
    return NextResponse.next()
  }

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl))
    }
    if (role !== "PLATFORM_ADMIN" && role !== "SCHOOL_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
    return NextResponse.next()
  }

  if (isDashboardRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/admin/:path*", "/login", "/register"],
}
