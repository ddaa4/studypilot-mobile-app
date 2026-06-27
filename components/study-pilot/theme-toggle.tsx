'use client'

import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle({
  isDark,
  onToggle,
  className,
}: {
  isDark: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'grid h-10 w-10 place-items-center rounded-[12px] border border-border bg-card text-foreground transition-all active:scale-90',
        className,
      )}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px] text-primary" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  )
}
