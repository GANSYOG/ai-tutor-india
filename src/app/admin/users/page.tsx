import { db } from "@/lib/db"
import { Users, Shield, Calendar } from "lucide-react"

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      studentProfile: true,
      teacherProfile: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary-600" /> User Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Total {users.length} registered accounts across Platform Admin, Teacher, Student, and Parent roles.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border text-xs uppercase font-bold text-muted-foreground">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Profile Info</th>
                <th className="p-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30 transition">
                  <td className="p-4 font-semibold text-foreground">
                    <div>{u.name}</div>
                    <div className="text-xs text-muted-foreground font-normal">{u.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      u.role === "PLATFORM_ADMIN"
                        ? "bg-accent-100 text-accent-800 dark:bg-accent-950 dark:text-accent-300"
                        : u.role === "TEACHER"
                        ? "bg-secondary-100 text-secondary-800 dark:bg-secondary-950 dark:text-secondary-300"
                        : "bg-primary-100 text-primary-800 dark:bg-primary-950 dark:text-primary-300"
                    }`}>
                      <Shield className="w-3 h-3" /> {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">
                    {u.studentProfile ? (
                      <span>{u.studentProfile.curriculumBoard} • {u.studentProfile.gradeLevel}</span>
                    ) : u.teacherProfile ? (
                      <span>{u.teacherProfile.specialization}</span>
                    ) : (
                      <span>System Account</span>
                    )}
                  </td>
                  <td className="p-4 text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(u.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
