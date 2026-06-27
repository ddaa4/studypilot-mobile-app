'use client'

import { GraduationCap, Home, Target, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TabId = 'home' | 'academic' | 'goals' | 'profile'

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'academic', label: 'Academic', icon: GraduationCap },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'profile', label: 'Profile', icon: User },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (tab: TabId) => void
}) {
  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-30 border-t border-border bg-card/90 backdrop-blur-xl"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-2.5">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <li key={tab.id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className="group flex w-full flex-col items-center gap-1.5 rounded-[12px] py-1.5 transition-colors"
              >
                <span
                  className={cn(
                    'grid h-9 w-12 place-items-center rounded-[12px] transition-all duration-300',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground group-active:scale-90',
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 2} />
                </span>
                <span
                  className={cn(
                    'text-[11px] font-medium transition-colors',
                    isActive ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {tab.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
