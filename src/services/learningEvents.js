import { supabase } from '../lib/supabaseClient'

const ALLOWED_EVENTS = new Set([
  'session_started',
  'session_completed',
  'simulation_started',
  'prediction_submitted',
  'simulation_completed',
  'simulation_result_correct',
  'simulation_result_incorrect',
  'explanation_submitted',
  'ai_assistance_offered',
  'ai_assistance_requested',
  'application_completed',
  'reflection_completed',
  'topic_completed'
])

export const learningEventService = {
  async record({ eventName, lessonId, topicId, phase, sessionDay = null, details = {} }) {
    if (!ALLOWED_EVENTS.has(eventName)) return

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError
    if (!user?.id) throw new Error('You must be logged in to record learning progress.')

    const { error } = await supabase.from('student_learning_events').insert({
      student_id: user.id,
      lesson_id: lessonId ?? null,
      topic_id: topicId ?? null,
      event_name: eventName,
      phase: phase ?? null,
      session_day: sessionDay,
      details
    })

    if (error) throw error
  }
}
