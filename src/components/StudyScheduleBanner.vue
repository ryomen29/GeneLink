<template>
  <section class="schedule-banner" aria-label="Weekly learning schedule" aria-live="polite">
    <div class="schedule-status">
      <div class="schedule-date">
        <p class="eyebrow">{{ session ? `DAY ${currentDay} — ${currentDayName.toUpperCase()}` : 'WEEKLY LEARNING CYCLE' }}</p>
        <h2>Today's learning session</h2>
        <p>Session: {{ timeLabel(sessionStart) }} – {{ timeLabel(sessionEnd) }} · {{ config.timezone }}</p>
      </div>

      <div v-if="error" class="schedule-state unavailable" role="status">
        <strong>🔒 Schedule unavailable</strong>
        <span>We can't verify the schedule right now. Learning activities are locked; Dashboard and Profile remain available.</span>
        <button type="button" class="schedule-retry" @click="refresh">Try again</button>
      </div>

      <div v-else-if="!session" class="schedule-state" role="status">
        <strong>Checking today's schedule…</strong>
      </div>

      <div v-else-if="beforeSession" class="schedule-state upcoming" role="status">
        <strong>⏳ Today's session opens at {{ timeLabel(sessionStart) }}.</strong>
        <span>{{ scheduledActivity?.title }}</span>
      </div>

      <div v-else-if="sessionOpen" class="schedule-state open" role="status">
        <strong>🟢 Session is open · Time remaining {{ formattedRemaining }}</strong>
        <span>{{ scheduledActivity?.title }}</span>
        <RouterLink v-if="activityLink" class="schedule-action" :to="activityLink">Open today's activity →</RouterLink>
        <RouterLink v-else class="schedule-action" to="/student/lessons">View today's learning →</RouterLink>
      </div>

      <div v-else class="schedule-state closed" role="status">
        <strong>🔒 Today's learning session has ended.</strong>
        <span>{{ scheduledActivity?.title }} · The next scheduled activity opens tomorrow at {{ timeLabel(sessionStart) }}.</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useStudySchedule } from '../composables/useStudySchedule'

const {
  session,
  error,
  config,
  currentDay,
  currentDayName,
  sessionOpen,
  beforeSession,
  minutesRemaining,
  secondsRemaining,
  sessionStart,
  sessionEnd,
  scheduledActivity,
  refresh
} = useStudySchedule()

const formattedRemaining = computed(() =>
  `${String(minutesRemaining.value).padStart(2, '0')}:${String(secondsRemaining.value).padStart(2, '0')}`
)
const activityLink = computed(() => {
  const activity = scheduledActivity.value
  if (!sessionOpen.value || !activity) return null
  if (activity.activity_type === 'pretest' && activity.lesson_id) return `/student/pretest/${activity.lesson_id}`
  if (activity.activity_type === 'lesson' && activity.lesson_id) {
    return `/student/lesson/${activity.lesson_id}`
  }
  if (activity.activity_type === 'post_test') return '/student/final-exam'
  return null
})

function timeLabel(value) {
  const [hourText, minuteText] = String(value).split(':')
  const hour = Number(hourText)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minuteText} ${suffix}`
}
</script>

<style scoped>
.schedule-banner {
  max-width: 1180px;
  margin: 20px auto 0;
  padding: 0 24px;
}
.schedule-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  padding: 16px 20px;
  border: 1px solid #dfe7f3;
  border-radius: 18px;
  background: linear-gradient(120deg, #f3f1ff, #effbf7);
}
.schedule-date .eyebrow { margin: 0 0 4px; }
.schedule-date h2 { margin: 0; font-size: 1.08rem; }
.schedule-date p:last-child { margin: 4px 0 0; color: #66758b; font-size: 0.9rem; }
.schedule-state { display: grid; gap: 4px; max-width: 560px; color: #465772; }
.schedule-state strong { color: #263852; }
.schedule-state.open strong { color: #19754f; }
.schedule-state.closed strong, .schedule-state.unavailable strong { color: #965320; }
.schedule-action { color: #5142a9; font-weight: 800; text-decoration: underline; }
.schedule-retry { justify-self: start; padding: 4px 0; border: 0; background: transparent; color: #5142a9; font-weight: 800; text-decoration: underline; }
@media (max-width: 767px) { .schedule-banner { padding: 0 12px; } }
</style>
