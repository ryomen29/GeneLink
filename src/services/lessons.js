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
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    const userId = user?.id

    if (!userId) {
      throw new Error('You must be logged in.')
    }

    const { data, error } = await supabase
      .from('pretest_attempts')
      .insert({
        student_id: userId,
        lesson_id: lessonId,
        answers,
        score,
        total_questions: totalQuestions,
        submitted_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    // The schedule migration updates student_lesson_progress from an AFTER
    // INSERT trigger in the same transaction as this assessment attempt.
    return data
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

  async markLessonComplete({ lessonId }) {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id

    if (!userId) throw new Error('You must be logged in.')

    const { data, error } = await supabase
      .from('student_lesson_progress')
      .upsert({
        student_id: userId,
        lesson_id: lessonId,
        completed_at: new Date().toISOString()
      }, { onConflict: 'student_id,lesson_id' })
      .select()
      .single()

    if (error) throw error
    return data
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
