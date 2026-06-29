'use client'

import { useState } from 'react'
import { Check, Plus, X } from 'lucide-react'
import { initialGoals, type Goal } from './data'
import { CircularProgress, SectionHeader } from './ui-bits'

function GoalCard({ goal }: { goal: Goal }) {
  const pct = Math.round((goal.current / goal.target) * 100)
  return (
    <div className="flex items-center gap-4 rounded-[16px] bg-card p-4 ring-1 ring-border">
      <CircularProgress
        value={pct}
        size={60}
        stroke={6}
        label={`${pct}%`}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {goal.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {goal.current} / {goal.target} {goal.unit}
        </p>
      </div>
      {goal.done && (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-primary text-primary-foreground">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
      )}
    </div>
  )
}

export function GoalsTab() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [showAdd, setShowAdd] = useState(false)
  const [goalTitle, setGoalTitle] = useState('')
  const [goalTarget, setGoalTarget] = useState('')

  const addGoal = () => {
    const title = goalTitle.trim()
    const target = Number(goalTarget)
    if (!title || !target || target <= 0) return
    setGoals((prev) => [
      ...prev,
      {
        id: `g${Date.now()}`,
        title,
        period: 'Weekly',
        current: 0,
        target,
        unit: 'units',
        done: false,
      },
    ])
    setGoalTitle('')
    setGoalTarget('')
    setShowAdd(false)
  }

  const weekly = goals.filter((g) => g.period === 'Weekly')
  const monthly = goals.filter((g) => g.period === 'Monthly')
  const active = goals.filter((g) => !g.done)
  const completed = goals.filter((g) => g.done)

  const overall = Math.round(
    (goals.reduce(
      (acc, g) => acc + Math.min(1, g.current / g.target),
      0,
    ) /
      goals.length) *
      100,
  )

  return (
    <div className="space-y-7 pb-8">
      <header className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Goals
          </h1>
          <p className="text-sm text-muted-foreground">
            {active.length} active · {completed.length} completed
          </p>
        </div>
        <button
          type="button"
          aria-label="Add goal"
          onClick={() => setShowAdd(true)}
          className="grid h-10 w-10 place-items-center rounded-[12px] bg-primary text-primary-foreground transition-transform active:scale-90"
        >
          <Plus className="h-5 w-5" strokeWidth={2.4} />
        </button>
      </header>

      {/* Overall summary */}
      <section className="flex items-center gap-5 rounded-[24px] bg-card p-5 ring-1 ring-border">
        <CircularProgress
          value={overall}
          size={84}
          stroke={8}
          label={`${overall}%`}
          sublabel="overall"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">
            You&apos;re on track
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
            Keep going to hit all of this period&apos;s targets.
          </p>
        </div>
      </section>

      {/* Weekly */}
      <section>
        <SectionHeader title="Weekly goals" />
        <div className="space-y-3">
          {weekly.map((g) => (
            <GoalCard key={g.id} goal={g} />
          ))}
        </div>
      </section>

      {/* Monthly */}
      <section>
        <SectionHeader title="Monthly goals" />
        <div className="space-y-3">
          {monthly.map((g) => (
            <GoalCard key={g.id} goal={g} />
          ))}
        </div>
      </section>

      {/* Completed archive */}
      {completed.length > 0 && (
        <section>
          <SectionHeader title="Completed" />
          <div className="space-y-2.5">
            {completed.map((g) => (
              <div
                key={g.id}
                className="flex items-center gap-3 rounded-[12px] bg-secondary px-4 py-3"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="flex-1 text-sm font-medium text-foreground">
                  {g.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {g.period}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Add goal modal */}
      {showAdd && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/30 backdrop-blur-sm">
          <div className="animate-sp-fade-up mx-auto w-full max-w-md rounded-t-[24px] bg-card p-5 ring-1 ring-border">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                Add goal
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
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Goal title
                </label>
                <input
                  autoFocus
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="e.g. Study sessions"
                  className="w-full rounded-[12px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Target
                </label>
                <input
                  type="number"
                  min={1}
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                  placeholder="e.g. 7"
                  className="w-full rounded-[12px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addGoal}
              className="mt-4 w-full rounded-[16px] bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              Add goal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
