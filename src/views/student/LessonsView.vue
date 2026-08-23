<template>
  <StudentShell title="Lessons">
    <div class="page-title">
      <p class="eyebrow">YOUR GENETICS ADVENTURE 🗺️</p>
      <h1>Pick a lesson, Explorer!</h1>
      <p>Every lesson starts with a 5-question warm-up and unlocks your next mission.</p>
    </div>

    <div class="cards">
      <article v-for="lesson in lessons" :key="lesson.id" class="lesson-card">
        <div class="lesson-icon" :class="lesson.color">{{ lesson.emoji }}</div>
        <span class="pill">5-question pre-test · 8 min</span>
        <h2>{{ lesson.title }}</h2>
        <h4>By the end, you’ll be able to…</h4>
        <ul>
          <li v-for="objective in lesson.objectives.slice(0, 3)" :key="objective">{{ objective }}</li>
        </ul>

        <RouterLink
          v-if="!isCompleted(lesson.id)"
          class="primary inline"
          :to="`/student/pretest/${lesson.id}`"
        >
          {{ isStarted(lesson.id) ? 'Continue pre-test →' : 'Take pre-test →' }}
        </RouterLink>

        <RouterLink v-else class="primary inline" :to="`/student/lesson/${lesson.id}`">
          Open lesson →
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

const lessonProgressMap = ref({})

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

function isCompleted(lessonId) {
  return Boolean(lessonProgressMap.value[lessonId]?.pretest_completed)
}

function isStarted(lessonId) {
  return Boolean(lessonProgressMap.value[lessonId])
}
</script>
