import { supabase } from '../lib/supabaseClient'

export const lessonService = {
  async getLessonCatalog() {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async getTopicsForLesson(lessonId) {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async getPreTestQuestions(lessonId) {
    const { data, error } = await supabase
      .from('pretest_questions')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async getFinalExamQuestions() {
    const { data, error } = await supabase
      .from('final_exam_questions')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async submitPretestAttempt({ lessonId, answers, score, totalQuestions }) {
    console.log('[Pretest] Starting save', {
      lessonId,
      answers,
      score,
      totalQuestions
    })

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    console.log('[Pretest] getSession result', { sessionData, sessionError })

    const { data: userData, error: userError } = await supabase.auth.getUser()
    console.log('[Pretest] getUser result', { userData, userError })

    const userId = userData?.user?.id ?? sessionData?.session?.user?.id
    console.log('[Pretest] resolved userId', userId)

    if (!userId) {
      const error = new Error('You must be logged in.')
      console.error('[Pretest] no authenticated user found', {
        sessionData,
        sessionError,
        userData,
        userError
      })
      throw error
    }

    const insertPayload = {
      student_id: userId,
      lesson_id: lessonId,
      answers,
      score,
      total_questions: totalQuestions,
      submitted_at: new Date().toISOString()
    }

    console.log('[Pretest] insert payload', insertPayload)

    const insertResult = await supabase
      .from('pretest_attempts')
      .insert(insertPayload)
      .select()
      .single()

    console.log('[Pretest] insert result', insertResult)

    if (insertResult.error) {
      console.error('[Pretest] insert failed with Supabase error', insertResult.error)
      throw insertResult.error
    }

    const progressPayload = {
      student_id: userId,
      lesson_id: lessonId,
      pretest_completed: true,
      completed_at: new Date().toISOString()
    }

    console.log('[Pretest] progress upsert payload', progressPayload)

    const progressResult = await supabase
      .from('student_lesson_progress')
      .upsert(progressPayload, { onConflict: 'student_id,lesson_id' })
      .select()
      .single()

    console.log('[Pretest] progress upsert result', progressResult)

    if (progressResult.error) {
      console.error('[Pretest] progress upsert failed with Supabase error', progressResult.error)
      throw progressResult.error
    }

    return insertResult.data
  },

  async markTopicComplete({ lessonId, topicId }) {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id

    if (!userId) throw new Error('You must be logged in.')

    return supabase
      .from('student_topic_progress')
      .upsert({
        student_id: userId,
        lesson_id: lessonId,
        topic_id: topicId,
        completed_at: new Date().toISOString()
      }, { onConflict: 'student_id,topic_id' })
  },

  async getStudentProgress() {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id

    if (!userId) return { topics: [], lessonProgress: [] }

    const [{ data: topics }, { data: lessons }] = await Promise.all([
      supabase
        .from('student_topic_progress')
        .select('*')
        .eq('student_id', userId),
      supabase
        .from('student_lesson_progress')
        .select('*')
        .eq('student_id', userId)
    ])

    return {
      topics: topics ?? [],
      lessonProgress: lessons ?? []
    }
  }
}
