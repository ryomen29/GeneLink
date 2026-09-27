<template>
  <StudentShell title="Lessons">
    <div class="page-title">
      <p class="eyebrow">YOUR GENETICS ADVENTURE 🗺️</p>
      <h1>Pick a lesson, Explorer!</h1>
      <p>Your weekly genetics activities unlock on their scheduled day during the daily session.</p>
    </div>

    <div class="cards">
      <article
        v-for="lesson in lessons"
        :key="lesson.id"
        class="lesson-card schedule-lesson-card"
        :class="{ 'is-locked': !canViewLessonTopics(lesson.id) }"
        :aria-label="lessonStatus(lesson.id)"
      >
        <div class="lesson-icon" :class="lesson.color">{{ lesson.emoji }}</div>
        <span class="pill">{{ lessonScheduleLabel(lesson.id) }}</span>
        <h2>{{ lesson.title }}</h2>
        <div :class="{ 'locked-preview': !canViewLessonTopics(lesson.id) }" :aria-hidden="!canViewLessonTopics(lesson.id)">
          <h4>By the end, you’ll be able to…</h4>
          <ul>
            <li v-for="objective in lesson.objectives.slice(0, 3)" :key="objective">{{ objective }}</li>
          </ul>
        </div>

        <p v-if="canOpenPretest(lesson.id)" class="locked-notice" role="status">
          🔒 Learning topics unlock after the Day 1 pre-test.
        </p>
        <p v-else-if="canOpenLesson(lesson.id) && !schedule.day1PretestComplete.value" class="locked-notice" role="status">
          🔒 Today's scheduled session is open. Topic content unlocks after the Day 1 pre-test.
        </p>
        <p v-else-if="!canOpenLesson(lesson.id)" class="locked-notice" role="status">
          🔒 {{ lockReason(lesson.id) }}
        </p>

        <RouterLink v-if="canOpenPretest(lesson.id)" class="primary inline" :to="`/student/pretest/${lesson.id}`">
          {{ isStarted(lesson.id) ? 'Continue Day 1 pre-test →' : 'Start Day 1 pre-test →' }}
        </RouterLink>
        <RouterLink v-else-if="canOpenLesson(lesson.id)" class="primary inline" :to="`/student/lesson/${lesson.id}`">
          Open today's lesson →
        </RouterLink>
      </article>
    </div>
  </StudentShell>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import StudentShell from '../../components/StudentShell.vue'
import { lessons } from '../../data/lessons'
import { lessonService } from '../../services/lessons'
import { useStudySchedule } from '../../composables/useStudySchedule'

const lessonProgressMap = ref({})
const schedule = useStudySchedule()

onMounted(async () => {
  try {
    const { lessonProgress } = await lessonService.getStudentProgress()
    const map = {}
    lessonProgress.forEach((entry) => {
      map[entry.lesson_id] = entry
    })
    lessonProgressMap.value = map
  } catch (error) {
    console.error('Lesson progress lookup failed:', error)
  }
})

function isStarted(lessonId) {
  return Boolean(lessonProgressMap.value[lessonId])
}

function lessonDay(lessonId) {
  const activity = schedule.activities.value.find((item) =>
    item.activity_type === 'lesson' && Number(item.lesson_id) === Number(lessonId)
  )
  return activity?.day_number ?? null
}

function canOpenPretest(lessonId) {
  const activity = schedule.scheduledActivity.value
  return Boolean(
    schedule.sessionOpen.value &&
    activity?.activity_type === 'pretest' &&
    Number(activity.lesson_id) === Number(lessonId)
  )
}

function canOpenLesson(lessonId) {
  const activity = schedule.scheduledActivity.value
  return Boolean(
    schedule.sessionOpen.value &&
    activity?.activity_type === 'lesson' &&
    Number(activity.lesson_id) === Number(lessonId)
  )
}

function canViewLessonTopics(lessonId) {
  return canOpenLesson(lessonId) && schedule.day1PretestComplete.value
}

function lessonScheduleLabel(lessonId) {
  if (canOpenPretest(lessonId)) return 'DAY 1 · PRE-TEST'
  const day = lessonDay(lessonId)
  if (!day) return 'SCHEDULE UNAVAILABLE'
  if (canOpenLesson(lessonId)) return `DAY ${day} · TODAY'S LESSON`
  return `DAY ${day} · SCHEDULED`
}

function lessonStatus(lessonId) {
  if (canOpenLesson(lessonId) && !schedule.day1PretestComplete.value) {
    return 'Today’s scheduled lesson is open, but learning topics are locked until the Day 1 pre-test is complete.'
  }
  return canOpenLesson(lessonId) || canOpenPretest(lessonId)
    ? 'Available in the current scheduled session'
    : `Locked. ${lockReason(lessonId)}`
}

function lockReason(lessonId) {
  if (!schedule.session.value) return 'Schedule unavailable; learning activities stay locked.'
  if (schedule.beforeSession.value) return `Available at ${schedule.sessionStart.value} ${schedule.config.timezone}.`
  if (schedule.sessionClosed.value) return 'Today’s scheduled learning session has ended.'
  if (!schedule.day1PretestComplete.value) return 'Complete the Day 1 pre-test to unlock learning topics.'
  if (schedule.scheduledActivity.value?.activity_type === 'pretest') return 'Complete the scheduled Day 1 pre-test first.'
  if (schedule.scheduledActivity.value?.activity_type === 'post_test') return 'Today is scheduled for the post-test.'
  const day = lessonDay(lessonId)
  return day
    ? `Available on Day ${day} during its scheduled session.`
    : 'The activity schedule is unavailable right now.'
}
</script>

<style scoped>
.schedule-lesson-card.is-locked { position: relative; color: #637087; background: #f3f5f8; }
.locked-preview { filter: blur(4px); opacity: 0.58; user-select: none; pointer-events: none; }
.locked-notice { padding: 10px 12px; border-radius: 12px; background: #fff8e8; color: #65512d; font-weight: 700; }
</style>
