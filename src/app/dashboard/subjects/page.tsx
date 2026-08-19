import { db } from "@/lib/db"
import { BookOpen, Layers, ChevronRight } from "lucide-react"

export default async function SubjectsPage() {
  const cbse = await db.curriculum.findUnique({
    where: { code: "CBSE" },
    include: {
      grades: {
        where: { name: "Class 10" },
        include: {
          subjects: {
            include: {
              chapters: {
                include: {
                  topics: true,
                },
              },
            },
          },
        },
      },
    },
  })

  const subjects = cbse?.grades[0]?.subjects || []

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary-600" /> CBSE Class 10 Subjects & Curriculum
        </h1>
        <p className="text-sm text-muted-foreground">
          Structured hierarchy: Curriculum → Grade → Subject → Chapter → Topic → Concept.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => (
          <div key={sub.id} className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xl text-foreground">{sub.name}</h3>
              <span className="text-xs font-bold text-secondary-600 bg-secondary-50 dark:bg-secondary-950 px-2.5 py-1 rounded-full">
                {sub.chapters.length} Chapters
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {sub.chapters.map((ch) => (
                <div key={ch.id} className="p-3.5 bg-muted/40 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-primary-600">Chapter {ch.order}</div>
                    <div className="text-sm font-bold text-foreground">{ch.name}</div>
                    <div className="text-[11px] text-muted-foreground">{ch.topics.length} Key Topics</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
