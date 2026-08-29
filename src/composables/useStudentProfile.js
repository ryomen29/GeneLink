import { computed, ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

export function useStudentProfile() {
  // ============================================================
  // STATE
  // ============================================================

  const profile = ref({
    id: null,
    full_name: '',
    email: '',
    role: '',
    created_at: null,
    avatar: ''
  })

  const progress = ref({
    completedLessons: 0,
    totalLessons: 0
  })

  const scores = ref({
    pretestScore: 0,
    pretestTotal: 0,
    finalExamScore: 0,
    finalExamTotal: 0,
    bestScore: 0
  })

  const lessons = ref([])
  const chartData = ref([])

  const loading = ref(false)
  const error = ref(null)

  // ============================================================
  // COMPUTED: OVERALL LESSON PROGRESS
  // ============================================================

  const overallProgress = computed(() => {
    if (!progress.value.totalLessons) {
      return 0
    }

    return Math.round(
      (progress.value.completedLessons /
        progress.value.totalLessons) *
        100
    )
  })

  // ============================================================
  // COMPUTED: REMAINING LESSONS
  // ============================================================

  const remainingLessons = computed(() => {
    return Math.max(
      progress.value.totalLessons -
        progress.value.completedLessons,
      0
    )
  })

  // ============================================================
  // COMPUTED: PRETEST PERCENTAGE
  // ============================================================

  const pretestPercentage = computed(() => {
    if (!scores.value.pretestTotal) {
      return 0
    }

    return Math.round(
      (scores.value.pretestScore /
        scores.value.pretestTotal) *
        100
    )
  })

  // ============================================================
  // COMPUTED: FINAL EXAM PERCENTAGE
  // ============================================================

  const finalExamPercentage = computed(() => {
    if (!scores.value.finalExamTotal) {
      return 0
    }

    return Math.round(
      (scores.value.finalExamScore /
        scores.value.finalExamTotal) *
        100
    )
  })

  // ============================================================
  // COMPUTED: AVERAGE SCORE
  // ============================================================

  const averageScore = computed(() => {
    const values = chartData.value
      .map((item) => Number(item.score))
      .filter((score) => Number.isFinite(score))

    if (!values.length) {
      return 0
    }

    const total = values.reduce(
      (sum, score) => sum + score,
      0
    )

    return Math.round(total / values.length)
  })

  // ============================================================
  // COMPUTED: BEST SCORE
  // ============================================================

  const bestScore = computed(() => {
    const values = chartData.value
      .map((item) => Number(item.score))
      .filter((score) => Number.isFinite(score))

    if (!values.length) {
      return Number(scores.value.bestScore) || 0
    }

    return Math.max(
      Number(scores.value.bestScore) || 0,
      ...values
    )
  })

  // ============================================================
  // COMPUTED: LEARNING INSIGHT
  // ============================================================

  const learningInsight = computed(() => {
    const completed =
      progress.value.completedLessons

    const total =
      progress.value.totalLessons

    const finalCompleted =
      scores.value.finalExamTotal > 0

    if (
      total > 0 &&
      completed >= total &&
      finalCompleted
    ) {
      return 'Amazing work! You have completed your learning journey! 🎉'
    }

    if (finalCompleted) {
      return 'You completed the Final Exam! Take a moment to celebrate your progress! 🏆'
    }

    if (
      total > 0 &&
      completed >= total
    ) {
      return 'You completed all of the learning missions! Your Final Exam is ready! 🏆'
    }

    if (overallProgress.value >= 75) {
      return 'You are almost at the finish line! Keep going, Explorer! 🚀'
    }

    if (overallProgress.value >= 50) {
      return 'You are more than halfway through your learning adventure! Keep the momentum going! 🔥'
    }

    if (overallProgress.value > 0) {
      return 'Great start, Explorer! Keep going and discover what comes next! 🌱'
    }

    return 'You are just getting started, Explorer! Every lesson brings you closer to your goal. 🚀'
  })

  // ============================================================
  // COMPUTED: ACHIEVEMENTS
  // ============================================================

  const achievements = computed(() => {
    const completed =
      progress.value.completedLessons

    const total =
      progress.value.totalLessons

    const best =
      bestScore.value

    const finalCompleted =
      scores.value.finalExamTotal > 0

    return [
      {
        key: 'first-step',
        icon: '🌱',
        name: 'First Step',
        description: 'Completed your first lesson',
        unlocked: completed >= 1
      },

      {
        key: 'knowledge-seeker',
        icon: '📚',
        name: 'Knowledge Seeker',
        description: 'Completed 3 lessons',
        unlocked: completed >= 3
      },

      {
        key: 'on-a-roll',
        icon: '🔥',
        name: 'On a Roll',
        description: 'Completed 4 or more lessons',
        unlocked: completed >= 4
      },

      {
        key: 'quiz-whiz',
        icon: '🧠',
        name: 'Quiz Whiz',
        description: 'Scored 90% or higher',
        unlocked: best >= 90
      },

      {
        key: 'explorer-champion',
        icon: '🏆',
        name: 'Explorer Champion',
        description: 'Completed all lessons',
        unlocked:
          total > 0 &&
          completed >= total
      },

      {
        key: 'final-boss',
        icon: '🎓',
        name: 'Final Boss',
        description: 'Completed the final exam',
        unlocked: finalCompleted
      }
    ]
  })

  // ============================================================
  // HELPER: CONVERT SCORE TO PERCENTAGE
  // ============================================================

  function calculatePercentage(
    score,
    totalQuestions
  ) {
    const numericScore = Number(score)
    const numericTotal = Number(totalQuestions)

    if (
      !Number.isFinite(numericScore) ||
      !Number.isFinite(numericTotal) ||
      numericTotal <= 0
    ) {
      return 0
    }

    return Math.round(
      (numericScore / numericTotal) * 100
    )
  }

  // ============================================================
  // LOAD PROFILE
  // ============================================================

  async function loadProfile() {
    loading.value = true
    error.value = null

    try {
      // ========================================================
      // 1. GET CURRENT USER
      // ========================================================

      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser()

      if (authError) {
        throw authError
      }

      if (!user) {
        throw new Error(
          'No authenticated student found.'
        )
      }

      // ========================================================
      // 2. GET PROFILE
      // ========================================================

      const {
        data: profileData,
        error: profileError
      } = await supabase
        .from('profiles')
        .select(
          'id, full_name, email, role, created_at'
        )
        .eq('id', user.id)
        .maybeSingle()

      if (profileError) {
        throw profileError
      }

      if (!profileData) {
        throw new Error(
          'Student profile was not found.'
        )
      }

      profile.value = {
        id: profileData.id,
        full_name:
          profileData.full_name ||
          user.user_metadata?.full_name ||
          '',
        email:
          profileData.email ||
          user.email ||
          '',
        role:
          profileData.role ||
          'student',
        created_at:
          profileData.created_at ||
          null,
        avatar: ''
      }

      // ========================================================
      // 3. LOAD ALL REQUIRED DATA
      //
      // These queries are all scoped to the authenticated
      // student's ID where appropriate.
      // ========================================================

      const [
        lessonsResult,
        lessonProgressResult,
        topicProgressResult,
        pretestResult,
        finalExamResult
      ] = await Promise.all([
        // ------------------------------------------------------
        // ALL LESSONS
        // ------------------------------------------------------

        supabase
          .from('lessons')
          .select(
            'id, title, emoji, color, sort_order'
          )
          .order('sort_order', {
            ascending: true
          }),

        // ------------------------------------------------------
        // STUDENT LESSON PROGRESS
        // ------------------------------------------------------

        supabase
          .from('student_lesson_progress')
          .select(
            'id, lesson_id, pretest_completed, completed_at'
          )
          .eq('student_id', user.id),

        // ------------------------------------------------------
        // STUDENT TOPIC PROGRESS
        // ------------------------------------------------------

        supabase
          .from('student_topic_progress')
          .select(
            'id, lesson_id, topic_id, completed_at'
          )
          .eq('student_id', user.id),

        // ------------------------------------------------------
        // PRETEST ATTEMPTS
        // ------------------------------------------------------

        supabase
          .from('pretest_attempts')
          .select(
            'id, lesson_id, score, total_questions, submitted_at'
          )
          .eq('student_id', user.id)
          .order('submitted_at', {
            ascending: false
          }),

        // ------------------------------------------------------
        // FINAL EXAM ATTEMPTS
        // ------------------------------------------------------

        supabase
          .from('final_exam_attempts')
          .select(
            'id, score, total_questions, submitted_at'
          )
          .eq('student_id', user.id)
          .order('submitted_at', {
            ascending: false
          })
      ])

      // ========================================================
      // 4. CHECK QUERY ERRORS
      // ========================================================

      if (lessonsResult.error) {
        throw lessonsResult.error
      }

      if (lessonProgressResult.error) {
        throw lessonProgressResult.error
      }

      if (topicProgressResult.error) {
        throw topicProgressResult.error
      }

      if (pretestResult.error) {
        throw pretestResult.error
      }

      if (finalExamResult.error) {
        throw finalExamResult.error
      }

      const lessonData =
        lessonsResult.data || []

      const lessonProgressData =
        lessonProgressResult.data || []

      const topicProgressData =
        topicProgressResult.data || []

      const pretestData =
        pretestResult.data || []

      const finalExamData =
        finalExamResult.data || []

      // ========================================================
      // 5. CREATE LOOKUP MAPS
      // ========================================================

      const lessonProgressMap =
        new Map()

      for (
        const item of lessonProgressData
      ) {
        lessonProgressMap.set(
          item.lesson_id,
          item
        )
      }

      // ========================================================
      // 6. GROUP PRETEST ATTEMPTS BY LESSON
      // ========================================================

      const pretestsByLesson =
        new Map()

      for (
        const attempt of pretestData
      ) {
        if (
          !pretestsByLesson.has(
            attempt.lesson_id
          )
        ) {
          pretestsByLesson.set(
            attempt.lesson_id,
            []
          )
        }

        pretestsByLesson
          .get(attempt.lesson_id)
          .push(attempt)
      }

      // ========================================================
      // 7. DETERMINE COMPLETED LESSONS
      //
      // A lesson is considered completed when either:
      //
      // - completed_at exists
      // OR
      // - pretest_completed is true
      //
      // This makes the profile consistent with the existing
      // lesson-unlocking logic.
      // ========================================================

      const completedLessons =
        lessonData.filter((lesson) => {
          const progressEntry =
            lessonProgressMap.get(
              lesson.id
            )

          return Boolean(
            progressEntry?.completed_at ||
            progressEntry?.pretest_completed
          )
        })

      progress.value = {
        completedLessons:
          completedLessons.length,

        totalLessons:
          lessonData.length
      }

      // ========================================================
      // 8. BUILD LESSON PROGRESS
      // ========================================================

      lessons.value =
        lessonData.map(
          (lesson, index) => {
            const progressEntry =
              lessonProgressMap.get(
                lesson.id
              )

            const lessonPretests =
              pretestsByLesson.get(
                lesson.id
              ) || []

            // The query is already ordered newest first.
            const latestPretest =
              lessonPretests[0] || null

            const completed =
              Boolean(
                progressEntry?.completed_at ||
                progressEntry?.pretest_completed
              )

            let status = 'locked'

            if (completed) {
              status = 'completed'
            } else if (
              progressEntry ||
              index === 0
            ) {
              status = 'in-progress'
            }

            const score =
              latestPretest
                ? calculatePercentage(
                    latestPretest.score,
                    latestPretest.total_questions
                  )
                : null

            const lessonTopicProgress =
              topicProgressData.filter(
                (topic) =>
                  topic.lesson_id ===
                  lesson.id
              )

            const completedTopics =
              lessonTopicProgress.filter(
                (topic) =>
                  Boolean(
                    topic.completed_at
                  )
              ).length

            return {
              id: lesson.id,
              title: lesson.title,
              emoji:
                lesson.emoji || '📚',
              color:
                lesson.color || '',
              completed,
              status,
              score,
              pretestScore:
                latestPretest?.score ??
                null,
              pretestTotal:
                latestPretest?.total_questions ??
                null,
              completedTopics,
              topicCount:
                lessonTopicProgress.length
            }
          }
        )

      // ========================================================
      // 9. GET LATEST PRETEST
      // ========================================================

      const latestPretest =
        pretestData[0] || null

      // ========================================================
      // 10. GET LATEST FINAL EXAM
      // ========================================================

      const latestFinal =
        finalExamData[0] || null

      // ========================================================
      // 11. UPDATE SCORE OVERVIEW
      // ========================================================

      scores.value = {
        pretestScore:
          latestPretest?.score || 0,

        pretestTotal:
          latestPretest?.total_questions || 0,

        finalExamScore:
          latestFinal?.score || 0,

        finalExamTotal:
          latestFinal?.total_questions || 0,

        bestScore: 0
      }

      // ========================================================
      // 12. BUILD CHART DATA
      //
      // Each lesson gets its own pretest score.
      // Then the final exam is added if completed.
      // ========================================================

      const newChartData = []

      // --------------------------------------------------------
      // Add each lesson's score
      // --------------------------------------------------------

      lessons.value.forEach(
        (lesson, index) => {
          if (
            lesson.score !== null &&
            lesson.score !== undefined
          ) {
            newChartData.push({
              label:
                lesson.title ||
                `Lesson ${index + 1}`,
              score: lesson.score
            })
          }
        }
      )

      // --------------------------------------------------------
      // Add final exam score
      // --------------------------------------------------------

      if (latestFinal) {
        const finalPercentage =
          calculatePercentage(
            latestFinal.score,
            latestFinal.total_questions
          )

        newChartData.push({
          label: 'Final Exam',
          score: finalPercentage
        })
      }

      chartData.value =
        newChartData

      // ========================================================
      // 13. CALCULATE BEST SCORE
      // ========================================================

      const chartScores =
        newChartData
          .map((item) =>
            Number(item.score)
          )
          .filter((score) =>
            Number.isFinite(score)
          )

      scores.value.bestScore =
        chartScores.length
          ? Math.max(...chartScores)
          : 0

    } catch (err) {
      console.error(
        'Failed to load student profile:',
        err
      )

      error.value =
        err?.message ||
        'Unable to load your profile.'

      // Reset data so stale/demo information
      // never appears after a failed request.
      lessons.value = []
      chartData.value = []

      progress.value = {
        completedLessons: 0,
        totalLessons: 0
      }

      scores.value = {
        pretestScore: 0,
        pretestTotal: 0,
        finalExamScore: 0,
        finalExamTotal: 0,
        bestScore: 0
      }
    } finally {
      loading.value = false
    }
  }

  // ============================================================
  // LOAD PROFILE AUTOMATICALLY
  // ============================================================

  loadProfile()

  // ============================================================
  // RETURN EVERYTHING NEEDED BY PROFILEVIEW.VUE
  // ============================================================

  return {
    profile,
    progress,
    scores,
    lessons,
    chartData,

    loading,
    error,

    overallProgress,
    remainingLessons,

    pretestPercentage,
    finalExamPercentage,

    averageScore,
    bestScore,

    learningInsight,
    achievements,

    loadProfile
  }
}