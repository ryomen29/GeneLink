import { supabase } from '../lib/supabaseClient'

export const scoreService = {
  async getStudentSummary() {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id

    if (!userId) return null

    const { data, error } = await supabase
      .from('student_score_summary')
      .select('*')
      .eq('student_id', userId)
      .maybeSingle()

    if (error) throw error
    return data
  },

  async submitFinalExamAttempt({ answers, score, totalQuestions }) {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id

    if (!userId) throw new Error('You must be logged in.')

    const { data, error } = await supabase
      .from('final_exam_attempts')
      .insert({
        student_id: userId,
        answers,
        score,
        total_questions: totalQuestions,
        submitted_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}
