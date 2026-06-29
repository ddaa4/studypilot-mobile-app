'use client'

import { useState } from 'react'
import { CalendarDays, List, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { initialExams, initialSubjects, type Exam, type Subject } from './data'
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
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects)
  const [exams, setExams] = useState<Exam[]>(initialExams)

  const [showAddSubject, setShowAddSubject] = useState(false)
  const [subjectName, setSubjectName] = useState('')
  const [subjectGrade, setSubjectGrade] = useState('')
  const [subjectTopic, setSubjectTopic] = useState('')

  const [showAddExam, setShowAddExam] = useState(false)
  const [examName, setExamName] = useState('')
  const [examSubject, setExamSubject] = useState('')
  const [examDate, setExamDate] = useState('')
  const [examDuration, setExamDuration] = useState('')

  const addSubject = () => {
    const name = subjectName.trim()
    if (!name) return
    const grade = Math.min(100, Math.max(0, Number(subjectGrade) || 0))
    setSubjects((prev) => [
      ...prev,
      {
        id: `s${Date.now()}`,
        name,
        grade,
        progress: 0,
        nextTopic: subjectTopic.trim() || 'Getting started',
      },
    ])
    setSubjectName('')
    setSubjectGrade('')
    setSubjectTopic('')
    setShowAddSubject(false)
  }

  const addExam = () => {
    const title = examName.trim()
    const subject = examSubject.trim()
    if (!title || !subject || !examDate) return
    setExams((prev) => [
      ...prev,
      {
        id: `e${Date.now()}`,
        subject,
        title,
        date: examDate,
        durationMin: Math.max(0, Number(examDuration) || 0),
      },
    ])
    setExamName('')
    setExamSubject('')
    setExamDate('')
    setExamDuration('')
    setShowAddExam(false)
  }

  // Build a simple July 2026 calendar grid for the demo
  const examDays = new Set(
    exams.map((e) => new Date(e.date).getUTCDate()),
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
              onClick={() => setShowAddSubject(true)}
              className="flex items-center gap-1.5 rounded-[12px] bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform active:scale-95"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
              Add subject
            </button>
          }
        />
        <div className="space-y-3">
          {subjects.map((s) => (
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
            {exams.map((e) => (
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
              onClick={() => setShowAddExam(true)}
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

      {/* Add subject modal */}
      {showAddSubject && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/30 backdrop-blur-sm">
          <div className="animate-sp-fade-up mx-auto w-full max-w-md rounded-t-[24px] bg-card p-5 ring-1 ring-border">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                Add subject
              </h3>
              <button
                type="button"
                onClick={() => setShowAddSubject(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-[8px] bg-secondary text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Subject name
                </label>
                <input
                  autoFocus
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="e.g. Linear Algebra"
                  className="w-full rounded-[12px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Grade (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={subjectGrade}
                  onChange={(e) => setSubjectGrade(e.target.value)}
                  placeholder="e.g. 85"
                  className="w-full rounded-[12px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Next topic
                </label>
                <input
                  value={subjectTopic}
                  onChange={(e) => setSubjectTopic(e.target.value)}
                  placeholder="e.g. Eigenvalues"
                  className="w-full rounded-[12px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addSubject}
              className="mt-4 w-full rounded-[16px] bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              Add subject
            </button>
          </div>
        </div>
      )}

      {/* Add exam modal */}
      {showAddExam && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/30 backdrop-blur-sm">
          <div className="animate-sp-fade-up mx-auto w-full max-w-md rounded-t-[24px] bg-card p-5 ring-1 ring-border">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                Add exam
              </h3>
              <button
                type="button"
                onClick={() => setShowAddExam(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-[8px] bg-secondary text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Exam name
                </label>
                <input
                  autoFocus
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="e.g. Midterm"
                  className="w-full rounded-[12px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Subject
                </label>
                <input
                  value={examSubject}
                  onChange={(e) => setExamSubject(e.target.value)}
                  placeholder="e.g. Mathematics"
                  className="w-full rounded-[12px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Date
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full rounded-[12px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min={0}
                  value={examDuration}
                  onChange={(e) => setExamDuration(e.target.value)}
                  placeholder="e.g. 90"
                  className="w-full rounded-[12px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addExam}
              className="mt-4 w-full rounded-[16px] bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              Add exam
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
