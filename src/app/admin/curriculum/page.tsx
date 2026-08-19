import { db } from "@/lib/db"
import { BookOpen, Layers, CheckCircle2 } from "lucide-react"

export default async function AdminCurriculumPage() {
  const curriculums = await db.curriculum.findMany({
    include: {
      grades: {
        include: {
          subjects: {
            include: {
              chapters: true,
            },
          },
        },
      },
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-secondary-600" /> Curriculum CMS (Spec §81)
          </h1>
          <p className="text-sm text-muted-foreground">
            Extensible educational taxonomy: Curriculum → Grade → Subject → Chapter → Topic → Concept.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {curriculums.map((curr) => (
          <div key={curr.id} className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
                  {curr.code}
                </span>
                <h3 className="font-extrabold text-lg text-foreground mt-1">{curr.name}</h3>
              </div>
              {curr.isOfficial && (
                <span className="flex items-center gap-1 text-xs font-semibold text-secondary-600">
                  <CheckCircle2 className="w-4 h-4" /> Official NCERT
                </span>
              )}
            </div>

            <p className="text-xs text-muted-foreground">{curr.description}</p>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-primary-600" /> Included Grades & Chapters ({curr.grades.length} Grades)
              </div>
              {curr.grades.length === 0 ? (
                <div className="text-xs text-muted-foreground italic">No grades configured yet</div>
              ) : (
                <div className="space-y-2">
                  {curr.grades.map((grade) => (
                    <div key={grade.id} className="p-3 bg-muted/40 rounded-xl text-xs space-y-1">
                      <div className="font-bold text-foreground flex justify-between">
                        <span>{grade.name}</span>
                        <span className="text-muted-foreground">{grade.subjects.length} Subjects</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {grade.subjects.map((sub) => (
                          <span key={sub.id} className="px-2 py-0.5 rounded bg-background border border-border font-medium text-foreground">
                            {sub.name} ({sub.chapters.length} chapters)
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
