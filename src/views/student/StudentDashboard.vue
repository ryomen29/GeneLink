<template>
  <StudentShell title="Home">
    <section class="hero">
      <div>
        <p class="eyebrow">GOOD DAY, EXPLORER 🌈</p>
        <h1>Ready to uncover the code of life?</h1>
        <p>DNA, genes, chromosomes, and inheritance are waiting for you. Your genetics mission starts here. 🧬</p>
        <RouterLink class="primary inline" to="/student/lessons">Start Learning →</RouterLink>
      </div>
      <div class="hero-art">🧬✨</div>
    </section>

    <div class="section-head">
      <h2>Your adventure map</h2>
      <span>Keep going — you’ve got this! 💪</span>
    </div>

    <div class="cards">
      <article
        v-for="lesson in lessons"
        :key="lesson.id"
        class="lesson-mini"
        :class="{ 'lesson-locked': !canViewLessonTopics(lesson.id) }"
      >
        <div class="emoji">{{ lesson.emoji }}</div>
        <h3>{{ lesson.title }}</h3>
        <p v-if="canOpenLesson(lesson.id) && !schedule.day1PretestComplete.value">Today's session is open · topics locked until the Day 1 pre-test</p>
        <p v-else-if="canOpenLesson(lesson.id)">Today's scheduled lesson</p>
        <p v-else-if="canOpenPretest(lesson.id)">Day 1 pre-test · Learning topics unlock after completion</p>
        <p v-else-if="lessonProgressMap[lesson.id]?.pretest_completed">{{ scheduledDayLabel(lesson.id) }}</p>
        <p v-else class="locked-copy">🔒 {{ scheduledDayLabel(lesson.id) }}</p>
        <RouterLink :to="`/student/pretest/${lesson.id}`" v-if="canOpenPretest(lesson.id)">Take Day 1 pre-test →</RouterLink>
        <RouterLink :to="`/student/lesson/${lesson.id}`" v-else-if="canOpenLesson(lesson.id)">Open today's lesson →</RouterLink>
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
    console.error('Student dashboard progress lookup failed:', error)
  }
})

function scheduledDayLabel(lessonId) {
  const day = schedule.activities.value.find((item) =>
    item.activity_type === 'lesson' && Number(item.lesson_id) === Number(lessonId)
  )?.day_number
  return day ? `Scheduled for Day ${day}` : 'Schedule unavailable'
}

function canOpenPretest(lessonId) {
  const activity = schedule.scheduledActivity.value
  return Boolean(schedule.sessionOpen.value && activity?.activity_type === 'pretest' && Number(activity.lesson_id) === Number(lessonId))
}

function canOpenLesson(lessonId) {
  const activity = schedule.scheduledActivity.value
  return Boolean(schedule.sessionOpen.value && activity?.activity_type === 'lesson' && Number(activity.lesson_id) === Number(lessonId))
}

function canViewLessonTopics(lessonId) {
  return canOpenLesson(lessonId) && schedule.day1PretestComplete.value
}
</script>

<style scoped>
.lesson-mini.lesson-locked { background: #f2f4f8; color: #66758b; }
.lesson-locked .emoji, .lesson-locked h3, .lesson-locked .locked-copy { filter: blur(1.5px); }
.lesson-locked::after { content: '🔒 Locked'; color: #5c687b; font-weight: 800; }
</style>
