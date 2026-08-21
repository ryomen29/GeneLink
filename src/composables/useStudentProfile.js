import { computed, ref } from 'vue'

// This file intentionally holds demo/placeholder data for preview-only UI work.
// Later, replace each section below with a per-user Supabase fetch based on the
// authenticated student ID and the existing public.profiles table.
//
// Example future replacement:
// const { data: profileData } = await supabase
//   .from('profiles')
//   .select('full_name, email, role, created_at')
//   .eq('id', currentUser.id)
//
// Example future replacement for lessons:
// const { data: lessonsData } = await supabase
//   .from('student_lesson_progress')
//   .select('lesson_id, status, score, lessons(title)')
//   .eq('student_id', currentUser.id)

const demoLessonCatalog = [
  { id: 1, slug: 'intro', title: 'Introduction to the Topic' },
  { id: 2, slug: 'basics', title: 'Understanding the Basics' },
  { id: 3, slug: 'concepts', title: 'Exploring Key Concepts' },
  { id: 4, slug: 'application', title: 'Applying What You Learned' },
  { id: 5, slug: 'final-adventure', title: 'Final Learning Adventure' }
]

const demoStudent = {
  profile: {
    id: 'demo-student-001',
    full_name: 'Demo Explorer',
    email: 'student@example.com',
    role: 'student',
    created_at: '2026-08-01',
    avatar: ''
  },
  progress: {
    completedLessons: 3,
    totalLessons: demoLessonCatalog.length
  },
  scores: {
    pretestScore: 4,
    pretestTotal: 5,
    finalExamScore: 38,
    finalExamTotal: 50,
    bestScore: 92
  },
  lessons: demoLessonCatalog.map((lesson, index) => ({
    id: lesson.id,
    title: lesson.title,
    completed: index < 3,
    score: index < 3 ? [85, 90, 88][index] : null,
    status: index < 3 ? 'completed' : index === 3 ? 'in-progress' : 'locked'
  })),
  chartData: [
    { label: 'Pre-Test', score: 80 },
    { label: 'Lesson 1', score: 75 },
    { label: 'Lesson 2', score: 82 },
    { label: 'Lesson 3', score: 88 },
    { label: 'Lesson 4', score: 85 },
    { label: 'Lesson 5', score: 90 },
    { label: 'Final Exam', score: 76 }
  ]
}

export function useStudentProfile() {
  const profile = ref({ ...demoStudent.profile })

  const progress = ref({ ...demoStudent.progress })

  const scores = ref({ ...demoStudent.scores })

  const lessons = ref(demoStudent.lessons.map((item) => ({ ...item })))

  const chartData = ref(demoStudent.chartData.map((item) => ({ ...item })))

  const overallProgress = computed(() => {
    if (!progress.value.totalLessons) return 0
    return (progress.value.completedLessons / progress.value.totalLessons) * 100
  })

  const remainingLessons = computed(() => {
    return Math.max(progress.value.totalLessons - progress.value.completedLessons, 0)
  })

  const pretestPercentage = computed(() => {
    if (!scores.value.pretestTotal) return 0
    return (scores.value.pretestScore / scores.value.pretestTotal) * 100
  })

  const finalExamPercentage = computed(() => {
    if (!scores.value.finalExamTotal) return 0
    return (scores.value.finalExamScore / scores.value.finalExamTotal) * 100
  })

  const averageScore = computed(() => {
    if (!chartData.value.length) return 0

    const total = chartData.value.reduce((sum, item) => sum + item.score, 0)
    return total / chartData.value.length
  })

  const bestScore = computed(() => {
    return scores.value.bestScore || Math.max(...chartData.value.map(item => item.score))
  })

  const learningInsight = computed(() => {
    if (scores.value.finalExamScore > 0) {
      return 'Amazing work! You have completed your learning journey! 🎉'
    }

    if (overallProgress.value >= 50) {
      return 'You are halfway through your learning adventure! Keep the momentum going! 🔥'
    }

    return 'You are just getting started, Explorer! Every lesson brings you closer to your goal. 🚀'
  })

  const achievements = computed(() => {
    const unlocked = [
      {
        key: 'first-step',
        icon: '🌱',
        name: 'First Step',
        description: 'Completed your first lesson',
        unlocked: progress.value.completedLessons >= 1
      },
      {
        key: 'knowledge-seeker',
        icon: '📚',
        name: 'Knowledge Seeker',
        description: 'Completed 3 lessons',
        unlocked: progress.value.completedLessons >= 3
      },
      {
        key: 'on-a-roll',
        icon: '🔥',
        name: 'On a Roll',
        description: 'Completed multiple lessons',
        unlocked: progress.value.completedLessons >= 4
      },
      {
        key: 'quiz-whiz',
        icon: '🧠',
        name: 'Quiz Whiz',
        description: 'Scored 90% or higher',
        unlocked: bestScore.value >= 90
      },
      {
        key: 'explorer-champion',
        icon: '🏆',
        name: 'Explorer Champion',
        description: 'Completed all lessons',
        unlocked: progress.value.completedLessons === progress.value.totalLessons
      },
      {
        key: 'final-boss',
        icon: '🎓',
        name: 'Final Boss',
        description: 'Completed the final exam',
        unlocked: scores.value.finalExamScore > 0
      }
    ]

    return unlocked
  })

  return {
    profile,
    progress,
    scores,
    lessons,
    chartData,
    overallProgress,
    remainingLessons,
    pretestPercentage,
    finalExamPercentage,
    averageScore,
    bestScore,
    learningInsight,
    achievements
  }
}
