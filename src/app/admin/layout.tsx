import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user = session?.user

  // Ensure role protection
  if (user?.role !== "PLATFORM_ADMIN" && user?.role !== "SCHOOL_ADMIN") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole={user?.role} studentName={user?.name || "Admin"} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header userRole={user?.role} studentName={user?.name || "Admin"} />
        <main id="main-content" className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
