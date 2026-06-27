'use client'

import { useState } from 'react'
import { CalendarDays, List, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { initialExams, initialSubjects } from './data'
import { ProgressBar, SectionHeader } from './ui-bits'

type ExamView = 'list' | 'calendar'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function gradeTone(grade: number) {
  if (grade >= 90) return 'text-primary'
  if (grade >= 80) return 'text-foreground'
  return 'text-muted-foreground'
}

export function AcademicTab() {
  const [examView, setExamView] = useState<ExamView>('list')

  // Build a simple July 2026 calendar grid for the demo
  const examDays = new Set(
    initialExams.map((e) => new Date(e.date).getUTCDate()),
  )
  const daysInMonth = 31
  const firstWeekday = new Date(Date.UTC(2026, 6, 1)).getUTCDay() // 0=Sun

  return (
    <div className="space-y-7 pb-8">
      <header className="pt-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Academic
        </h1>
        <p className="text-sm text-muted-foreground">
          Track subjects, grades and exams
        </p>
      </header>

      {/* Subjects */}
      <section>
        <SectionHeader
          title="Subjects"
          action={
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-[12px] bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform active:scale-95"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
              Add subject
            </button>
          }
        />
        <div className="space-y-3">
          {initialSubjects.map((s) => (
            <div
              key={s.id}
              className="rounded-[16px] bg-card p-4 ring-1 ring-border"
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {s.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    Next: {s.nextTopic}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 text-lg font-semibold tabular-nums',
                    gradeTone(s.grade),
                  )}
                >
                  {s.grade}%
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <ProgressBar value={s.progress} />
                <span className="w-9 shrink-0 text-right text-xs font-medium text-muted-foreground tabular-nums">
                  {s.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exam schedule */}
      <section>
        <SectionHeader
          title="Exam schedule"
          action={
            <div className="flex items-center gap-1 rounded-[12px] bg-secondary p-1">
              <button
                type="button"
                onClick={() => setExamView('list')}
                aria-label="List view"
                className={cn(
                  'grid h-7 w-7 place-items-center rounded-[8px] transition-colors',
                  examView === 'list'
                    ? 'bg-card text-foreground ring-1 ring-border'
                    : 'text-muted-foreground',
                )}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setExamView('calendar')}
                aria-label="Calendar view"
                className={cn(
                  'grid h-7 w-7 place-items-center rounded-[8px] transition-colors',
                  examView === 'calendar'
                    ? 'bg-card text-foreground ring-1 ring-border'
                    : 'text-muted-foreground',
                )}
              >
                <CalendarDays className="h-4 w-4" />
              </button>
            </div>
          }
        />

        {examView === 'list' ? (
          <div className="space-y-3">
            {initialExams.map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-4 rounded-[16px] bg-card p-4 ring-1 ring-border"
              >
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-[12px] bg-accent">
                  <span className="text-lg font-semibold leading-none text-accent-foreground">
                    {new Date(e.date).getUTCDate()}
                  </span>
                  <span className="mt-0.5 text-[10px] font-medium uppercase text-accent-foreground/70">
                    {new Date(e.date).toLocaleDateString('en-US', {
                      month: 'short',
                    })}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {e.subject}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {e.title} · {e.durationMin} min
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  {formatDate(e.date)}
                </span>
              </div>
            ))}
            <button
              type="button"
              className="w-full rounded-[16px] border border-dashed border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              + Add exam
            </button>
          </div>
        ) : (
          <div className="rounded-[24px] bg-card p-4 ring-1 ring-border">
            <p className="mb-3 text-center text-sm font-semibold text-foreground">
              July 2026
            </p>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium text-muted-foreground"
                >
                  {d}
                </span>
              ))}
              {Array.from({ length: firstWeekday }).map((_, i) => (
                <span key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const isExam = examDays.has(day)
                return (
                  <span
                    key={day}
                    className={cn(
                      'mx-auto grid h-9 w-9 place-items-center rounded-[12px] text-sm transition-colors',
                      isExam
                        ? 'bg-primary font-semibold text-primary-foreground'
                        : 'text-foreground',
                    )}
                  >
                    {day}
                  </span>
                )
              })}
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Exam day</span>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
