import { supabase } from '../lib/supabaseClient'

export const STUDY_CONFIG = Object.freeze({
  timezone: 'Asia/Manila',
  cycleType: 'weekly',
  cycleDays: 7,
  sessionStart: '08:00',
  sessionEnd: '08:45'
})

export const studyScheduleService = {
  async getCurrentSession() {
    const { data, error } = await supabase.rpc('get_current_study_session')
    if (error) throw error
    if (!data?.day_number || !data?.server_time_ms || !data?.scheduled_activity) {
      throw new Error('The study schedule response is incomplete.')
    }
    return data
  },

  async getWeeklyActivities() {
    const { data, error } = await supabase
      .from('weekly_learning_schedule')
      .select('day_number, activity_type, lesson_id, title, description, is_active')
      .eq('is_active', true)
      .order('day_number', { ascending: true })

    if (error) throw error
    return data ?? []
  },

  matchesScheduledActivity(session, activityType, lessonId = null) {
    const activity = session?.scheduled_activity
    if (!activity || activity.activity_type !== activityType) return false
    if (lessonId === null || lessonId === undefined) return true
    return Number(activity.lesson_id) === Number(lessonId)
  },

  async assertScheduledActivity(activityType, lessonId = null) {
    const session = await this.getCurrentSession()
    const open = session.session_open === true
    const matches = this.matchesScheduledActivity(session, activityType, lessonId)

    if (!open) {
      return { allowed: false, reason: session.before_session ? 'before_session' : 'session_closed', session }
    }
    if (!matches) return { allowed: false, reason: 'activity_not_scheduled', session }
    // The calendar activity opens regardless of whether a prior day was
    // completed. The Day 1 pre-test prerequisite is enforced at topic-content
    // and database-read/write boundaries, not by delaying a later day's route.
    return { allowed: true, reason: null, session }
  }
}
