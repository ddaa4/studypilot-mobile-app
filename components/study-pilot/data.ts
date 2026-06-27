export type Subject = {
  id: string
  name: string
  grade: number // percentage
  progress: number // course completion percentage
  nextTopic: string
}

export type Exam = {
  id: string
  subject: string
  title: string
  date: string // ISO date
  durationMin: number
}

export type Task = {
  id: string
  title: string
  subject: string
  done: boolean
}

export type Goal = {
  id: string
  title: string
  period: 'Weekly' | 'Monthly'
  current: number
  target: number
  unit: string
  done: boolean
}

export type Badge = {
  id: string
  label: string
  earned: boolean
}

export const user = {
  name: 'Lina',
  role: 'Computer Science · Year 2',
  initials: 'L',
}

export const streak = {
  current: 14,
  best: 31,
  quote: 'Small steps every day lead to big results.',
  // 7 days, true = studied
  week: [true, true, true, false, true, true, true],
  weekLabels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
}

export const stats = [
  { id: 'subjects', label: 'Total Subjects', value: '6' },
  { id: 'exams', label: 'Upcoming Exams', value: '3' },
  { id: 'grade', label: 'Average Grade', value: '88%' },
  { id: 'hours', label: 'Study Hours', value: '47h' },
]

export const initialTasks: Task[] = [
  { id: 't1', title: 'Review linked lists chapter', subject: 'Data Structures', done: false },
  { id: 't2', title: 'Finish calculus problem set 4', subject: 'Mathematics', done: false },
  { id: 't3', title: 'Read networking lecture notes', subject: 'Networks', done: true },
  { id: 't4', title: 'Draft essay introduction', subject: 'Academic Writing', done: false },
]

export const initialSubjects: Subject[] = [
  { id: 's1', name: 'Data Structures', grade: 91, progress: 72, nextTopic: 'Balanced Trees' },
  { id: 's2', name: 'Mathematics', grade: 84, progress: 58, nextTopic: 'Integration by Parts' },
  { id: 's3', name: 'Networks', grade: 88, progress: 65, nextTopic: 'TCP Congestion' },
  { id: 's4', name: 'Academic Writing', grade: 93, progress: 80, nextTopic: 'Argument Structure' },
  { id: 's5', name: 'Operating Systems', grade: 79, progress: 44, nextTopic: 'Virtual Memory' },
  { id: 's6', name: 'Databases', grade: 90, progress: 61, nextTopic: 'Normalization' },
]

export const initialExams: Exam[] = [
  { id: 'e1', subject: 'Mathematics', title: 'Midterm', date: '2026-07-02', durationMin: 90 },
  { id: 'e2', subject: 'Data Structures', title: 'Quiz 3', date: '2026-07-06', durationMin: 45 },
  { id: 'e3', subject: 'Networks', title: 'Final', date: '2026-07-14', durationMin: 120 },
]

export const initialGoals: Goal[] = [
  { id: 'g1', title: 'Study sessions', period: 'Weekly', current: 5, target: 7, unit: 'sessions', done: false },
  { id: 'g2', title: 'Focused hours', period: 'Weekly', current: 9, target: 12, unit: 'hours', done: false },
  { id: 'g3', title: 'Problem sets solved', period: 'Weekly', current: 4, target: 4, unit: 'sets', done: true },
  { id: 'g4', title: 'Chapters completed', period: 'Monthly', current: 12, target: 20, unit: 'chapters', done: false },
  { id: 'g5', title: 'Mock exams', period: 'Monthly', current: 3, target: 3, unit: 'exams', done: true },
]

export const badges: Badge[] = [
  { id: 'b1', label: 'First Streak', earned: true },
  { id: 'b2', label: '7-Day Focus', earned: true },
  { id: 'b3', label: 'Early Bird', earned: true },
  { id: 'b4', label: 'Top Scorer', earned: true },
  { id: 'b5', label: 'Marathon', earned: false },
  { id: 'b6', label: 'Night Owl', earned: false },
  { id: 'b7', label: 'Perfect Week', earned: false },
  { id: 'b8', label: 'Goal Crusher', earned: true },
]

// Weekly study trend (hours per day) for profile insights
export const studyTrend = [
  { day: 'Mon', hours: 3.2 },
  { day: 'Tue', hours: 2.4 },
  { day: 'Wed', hours: 4.1 },
  { day: 'Thu', hours: 1.8 },
  { day: 'Fri', hours: 3.6 },
  { day: 'Sat', hours: 5.2 },
  { day: 'Sun', hours: 2.9 },
]
