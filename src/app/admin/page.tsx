import { db } from "@/lib/db"
import Link from "next/link"
import { Users, BookOpen, Building, Shield, Activity, ArrowUpRight, Cpu } from "lucide-react"

export default async function AdminDashboardPage() {
  const usersCount = await db.user.count()
  const studentsCount = await db.user.count({ where: { role: "STUDENT" } })
  const teachersCount = await db.user.count({ where: { role: "TEACHER" } })
  const curriculumsCount = await db.curriculum.count()
  const orgsCount = await db.organization.count()
  const featureFlags = await db.featureFlag.findMany()

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 dark:bg-accent-950/60 text-xs font-bold text-accent-700 dark:text-accent-300 mb-2">
            <Shield className="w-3.5 h-3.5" /> Spec §80: SaaS Platform Control Center
          </div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            Platform Administration
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage users, tenant organizations, educational curricula, and AI model routing flags.
          </p>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-5 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{usersCount}</div>
          <div className="text-xs text-muted-foreground">{studentsCount} Students • {teachersCount} Teachers</div>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Active Curricula</span>
            <BookOpen className="w-4 h-4 text-secondary-600" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{curriculumsCount}</div>
          <div className="text-xs text-muted-foreground">CBSE, ICSE, State Boards</div>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Schools & Institutions</span>
            <Building className="w-4 h-4 text-accent-600" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{orgsCount}</div>
          <div className="text-xs text-muted-foreground">Multi-tenant isolated</div>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>AI Provider Status</span>
            <Cpu className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-2xl font-extrabold text-secondary-600">HEALTHY</div>
          <div className="text-xs text-muted-foreground">Fallback routing enabled</div>
        </div>
      </div>

      {/* Feature Flags Grid (Spec §114) */}
      <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
        <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary-600" /> Admin Feature Flags (Spec §114)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featureFlags.map((flag) => (
            <div key={flag.id} className="p-4 rounded-xl border border-border bg-muted/40 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-foreground">{flag.key}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{flag.description}</div>
              </div>
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                flag.enabled ? "bg-secondary-100 text-secondary-700 dark:bg-secondary-950 dark:text-secondary-300" : "bg-muted text-muted-foreground"
              }`}>
                {flag.enabled ? "ACTIVE" : "DISABLED"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/users"
          className="p-6 bg-card border border-border hover:border-primary-500 rounded-2xl shadow-xs transition group flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-base text-foreground group-hover:text-primary-600">User Management</h4>
            <p className="text-xs text-muted-foreground mt-1">View, filter, and assign roles to registered platform users.</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-600 transition" />
        </Link>

        <Link
          href="/admin/curriculum"
          className="p-6 bg-card border border-border hover:border-primary-500 rounded-2xl shadow-xs transition group flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-base text-foreground group-hover:text-primary-600">Curriculum CMS (Spec §81)</h4>
            <p className="text-xs text-muted-foreground mt-1">Manage grades, subjects, chapters, topics, and prerequisite graphs.</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-600 transition" />
        </Link>
      </div>
    </div>
  )
}
