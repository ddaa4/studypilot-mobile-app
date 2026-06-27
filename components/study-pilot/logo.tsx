import { cn } from '@/lib/utils'

export function StudyPilotMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label="StudyPilot logo"
    >
      {/* Diamond cap merged with a forward-slanted airplane wing.
         Geometric abstraction: graduation cap (diamond) + flight (slanted wings). */}
      <path
        d="M24 4 L44 16 L24 24 L4 16 Z"
        className="fill-primary"
      />
      <path
        d="M24 24 L44 16 L30 40 Z"
        className="fill-foreground"
      />
      <path
        d="M24 24 L4 16 L12 34 Z"
        className="fill-foreground/70"
      />
    </svg>
  )
}

export function StudyPilotLogo({
  className,
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-secondary">
        <StudyPilotMark className="h-5 w-5" />
      </span>
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          StudyPilot
        </span>
      )}
    </div>
  )
}
