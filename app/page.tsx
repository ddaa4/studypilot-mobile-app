'use client'

import { useEffect, useState } from 'react'
import { AcademicTab } from '@/components/study-pilot/academic-tab'
import { BottomNav, type TabId } from '@/components/study-pilot/bottom-nav'
import { GoalsTab } from '@/components/study-pilot/goals-tab'
import { HomeTab } from '@/components/study-pilot/home-tab'
import { StudyPilotLogo } from '@/components/study-pilot/logo'
import { ProfileTab } from '@/components/study-pilot/profile-tab'
import { ThemeToggle } from '@/components/study-pilot/theme-toggle'

export default function Page() {
  const [tab, setTab] = useState<TabId>('home')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col bg-background">
      {/* Top app bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/85 px-5 py-3 backdrop-blur-xl">
        <StudyPilotLogo />
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />
      </header>

      {/* Tab content */}
      <div key={tab} className="animate-sp-fade-up flex-1 px-5 pt-4">
        {tab === 'home' && <HomeTab />}
        {tab === 'academic' && <AcademicTab />}
        {tab === 'goals' && <GoalsTab />}
        {tab === 'profile' && <ProfileTab />}
      </div>

      <BottomNav active={tab} onChange={setTab} />
    </main>
  )
}
