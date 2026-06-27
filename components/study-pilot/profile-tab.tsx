'use client'

import { Award, Lock, Settings, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { badges, studyTrend, user } from './data'
import { SectionHeader } from './ui-bits'

export function ProfileTab() {
  const maxHours = Math.max(...studyTrend.map((d) => d.hours))
  const totalHours = studyTrend.reduce((acc, d) => acc + d.hours, 0)
  const avgHours = totalHours / studyTrend.length
  const earnedCount = badges.filter((b) => b.earned).length

  return (
    <div className="space-y-7 pb-8">
      <header className="flex items-center justify-between pt-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Profile
        </h1>
        <button
          type="button"
          aria-label="Settings"
          className="grid h-10 w-10 place-items-center rounded-[12px] border border-border bg-card text-foreground transition-transform active:scale-90"
        >
          <Settings className="h-[18px] w-[18px]" />
        </button>
      </header>

      {/* Identity */}
      <section className="flex items-center gap-4 rounded-[24px] bg-card p-5 ring-1 ring-border">
        <div className="grid h-16 w-16 place-items-center rounded-[20px] bg-primary text-2xl font-semibold text-primary-foreground">
          {user.initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>
      </section>

      {/* Study trend chart */}
      <section>
        <SectionHeader
          title="Study insights"
          action={
            <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <TrendingUp className="h-3.5 w-3.5" />
              {avgHours.toFixed(1)}h avg/day
            </span>
          }
        />
        <div className="rounded-[24px] bg-card p-5 ring-1 ring-border">
          <p className="text-sm text-muted-foreground">This week</p>
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {totalHours.toFixed(1)}{' '}
            <span className="text-base font-medium text-muted-foreground">
              hours
            </span>
          </p>
          <div className="mt-5 flex h-36 items-end justify-between gap-2">
            {studyTrend.map((d) => {
              const isPeak = d.hours === maxHours
              return (
                <div
                  key={d.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    className={cn(
                      'w-full max-w-7 rounded-[8px] transition-all duration-700 ease-out',
                      isPeak ? 'bg-primary' : 'bg-muted',
                    )}
                    style={{ height: `${(d.hours / maxHours) * 100}%` }}
                  />
                  <span className="shrink-0 text-[10px] font-medium text-muted-foreground">
                    {d.day}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <SectionHeader
          title="Achievements"
          action={
            <span className="text-xs font-medium text-muted-foreground">
              {earnedCount}/{badges.length} earned
            </span>
          }
        />
        <div className="grid grid-cols-4 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className="flex flex-col items-center gap-2 rounded-[16px] bg-card p-3 ring-1 ring-border transition-transform active:scale-95"
            >
              <span
                className={cn(
                  'grid h-11 w-11 place-items-center rounded-[14px]',
                  b.earned
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {b.earned ? (
                  <Award className="h-5 w-5" strokeWidth={2.2} />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </span>
              <span
                className={cn(
                  'text-center text-[10px] font-medium leading-tight text-pretty',
                  b.earned ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
