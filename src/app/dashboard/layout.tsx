import { auth } from "@/lib/auth"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user = session?.user

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <Sidebar userRole={user?.role} studentName={user?.name || "Student"} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header userRole={user?.role} studentName={user?.name || "Student"} />
        <main id="main-content" className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
