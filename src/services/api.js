import { supabase } from '../lib/supabaseClient'

export const api = {
  async getLessons() {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        id,
        title,
        emoji,
        color,
        sort_order,
        objectives,
        topics (
          id,
          title,
          sort_order,
          content
        )
      `)
      .order('sort_order')

    if (error) throw error
    return data
  },

  async getPretest(lessonId) {
    const { data, error } = await supabase
      .from('pretest_questions')
      .select('id, lesson_id, question, options, sort_order')
      .eq('lesson_id', lessonId)
      .order('sort_order')

    if (error) throw error
    return data
  },

  async submitPretest({ lessonId, answers, score }) {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id

    if (!userId) throw new Error('You must be logged in.')

    const { data, error } = await supabase
      .from('pretest_attempts')
      .insert({
        student_id: userId,
        lesson_id: lessonId,
        answers,
        score,
        total_questions: 5
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getLessonProgress(lessonId) {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id
    if (!userId) return null

    const { data, error } = await supabase
      .from('student_lesson_progress')
      .select('*')
      .eq('student_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle()

    if (error) throw error
    return data
  },

  async completeTopic({ lessonId, topicId }) {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id
    if (!userId) throw new Error('You must be logged in.')

    const { data, error } = await supabase
      .from('student_topic_progress')
      .upsert(
        {
          student_id: userId,
          lesson_id: lessonId,
          topic_id: topicId,
          completed_at: new Date().toISOString()
        },
        { onConflict: 'student_id,topic_id' }
      )
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getFinalExam() {
    const { data, error } = await supabase
      .from('final_exam_questions')
      .select('id, question, options, sort_order')
      .order('sort_order')

    if (error) throw error
    return data
  },

  async submitFinalExam({ answers, score, totalQuestions }) {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id
    if (!userId) throw new Error('You must be logged in.')

    const { data, error } = await supabase
      .from('final_exam_attempts')
      .insert({
        student_id: userId,
        answers,
        score,
        total_questions: totalQuestions
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getAdminScores() {
    const { data, error } = await supabase
      .from('student_score_summary')
      .select('*')
      .order('full_name')

    if (error) throw error
    return data
  },

  async getAdminStudents() {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, created_at')
      .eq('role', 'student')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async deleteStudent(studentId) {
    const functionName =
      import.meta.env.VITE_SUPABASE_DELETE_STUDENT_FUNCTION || 'delete-student'

    const { data, error } = await supabase.functions.invoke(functionName, {
      body: { studentId }
    })

    if (error) throw error
    return data
  },

  async aiChat({ message, lessonId, conversationId }) {
    const functionName =
      import.meta.env.VITE_SUPABASE_AI_FUNCTION || 'ai-tutor'

    const { data, error } = await supabase.functions.invoke(functionName, {
      body: {
        message,
        lessonId,
        conversationId
      }
    })

    if (error) throw error
    return data
  }
}
