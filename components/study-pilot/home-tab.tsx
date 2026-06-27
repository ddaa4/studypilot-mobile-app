'use client'

import { useMemo, useState } from 'react'
import {
  Award,
  BookOpen,
  Check,
  Clock,
  Flame,
  GraduationCap,
  Plus,
  TrendingUp,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  badges,
  initialTasks,
  stats,
  streak,
  user,
  type Task,
} from './data'
import { ProgressBar } from './ui-bits'

const statIcons: Record<string, typeof BookOpen> = {
  subjects: BookOpen,
  exams: GraduationCap,
  grade: TrendingUp,
  hours: Clock,
}

export function HomeTab() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showAdd, setShowAdd] = useState(false)
  const [draft, setDraft] = useState('')

  const completion = useMemo(() => {
    if (tasks.length === 0) return 0
    return (tasks.filter((t) => t.done).length / tasks.length) * 100
  }, [tasks])

  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )

  const addTask = () => {
    const title = draft.trim()
    if (!title) return
    setTasks((prev) => [
      { id: `t${Date.now()}`, title, subject: 'Quick task', done: false },
      ...prev,
    ])
    setDraft('')
    setShowAdd(false)
  }

  return (
    <div className="relative space-y-6 pb-8">
      {/* Welcome */}
      <header className="flex items-center justify-between pt-1">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {user.name}
          </h1>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-[16px] bg-primary text-lg font-semibold text-primary-foreground">
          {user.initials}
        </div>
      </header>

      {/* Streak hero card */}
      <section className="rounded-[24px] bg-card p-5 ring-1 ring-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-[16px] bg-accent">
              <Flame className="h-6 w-6 text-primary" strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Current streak</p>
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                {streak.current}{' '}
                <span className="text-base font-medium text-muted-foreground">
                  days
                </span>
              </p>
            </div>
          </div>
          <span className="rounded-[8px] bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Best {streak.best}d
          </span>
        </div>

        {/* Weekly circles */}
        <div className="mt-5 flex items-center justify-between">
          {streak.week.map((active, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-full text-xs font-semibold transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {active ? <Check className="h-4 w-4" strokeWidth={3} /> : ''}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground">
                {streak.weekLabels[i]}
              </span>
            </div>
          ))}
        </div>

        {/* Quote */}
        <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
          {streak.quote}
        </p>

        {/* Badges row */}
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
          {badges
            .filter((b) => b.earned)
            .map((b) => (
              <span
                key={b.id}
                className="flex shrink-0 items-center gap-1.5 rounded-[8px] bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground"
              >
                <Award className="h-3.5 w-3.5 text-primary" />
                {b.label}
              </span>
            ))}
        </div>
      </section>

      {/* Stats 2x2 grid */}
      <section className="grid grid-cols-2 gap-3">
        {stats.map((s) => {
          const Icon = statIcons[s.id] ?? BookOpen
          return (
            <div
              key={s.id}
              className="rounded-[16px] bg-card p-4 ring-1 ring-border"
            >
              <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-accent">
                <Icon className="h-[18px] w-[18px] text-accent-foreground" />
              </span>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          )
        })}
      </section>

      {/* Today's tasks */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Today&apos;s tasks
          </h2>
          <span className="text-xs font-medium text-muted-foreground">
            {Math.round(completion)}% done
          </span>
        </div>

        <ProgressBar value={completion} className="mb-4" />

        <ul className="space-y-2.5">
          {tasks.map((task) => (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className="flex w-full items-center gap-3 rounded-[16px] bg-card p-3.5 text-left ring-1 ring-border transition-all active:scale-[0.99]"
              >
                <span
                  className={cn(
                    'grid h-6 w-6 shrink-0 place-items-center rounded-[8px] border-2 transition-all',
                    task.done
                      ? 'animate-sp-pop border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-transparent',
                  )}
                >
                  {task.done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block truncate text-sm font-medium transition-colors',
                      task.done
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground',
                    )}
                  >
                    {task.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {task.subject}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Quick add sheet */}
      {showAdd && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/30 backdrop-blur-sm">
          <div className="animate-sp-fade-up mx-auto w-full max-w-md rounded-t-[24px] bg-card p-5 ring-1 ring-border">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                Quick add task
              </h3>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-[8px] bg-secondary text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="What do you need to do?"
              className="w-full rounded-[12px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={addTask}
              className="mt-3 w-full rounded-[16px] bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              Add task
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        type="button"
        onClick={() => setShowAdd(true)}
        aria-label="Quick actions"
        className="fixed bottom-24 right-5 z-30 grid h-14 w-14 place-items-center rounded-[20px] bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-90"
      >
        <Plus className="h-6 w-6" strokeWidth={2.4} />
      </button>
    </div>
  )
}
