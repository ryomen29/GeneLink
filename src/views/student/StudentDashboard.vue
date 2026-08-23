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
      <article v-for="lesson in lessons" :key="lesson.id" class="lesson-mini">
        <div class="emoji">{{ lesson.emoji }}</div>
        <h3>{{ lesson.title }}</h3>
        <p>{{ lessonProgressMap[lesson.id]?.pretest_completed ? 'Pre-test complete' : '5-question pre-test • 8 minutes' }}</p>
        <RouterLink :to="`/student/pretest/${lesson.id}`" v-if="!lessonProgressMap[lesson.id]?.pretest_completed">Take pre-test →</RouterLink>
        <RouterLink :to="`/student/lesson/${lesson.id}`" v-else>Open lesson →</RouterLink>
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
    console.error('Student dashboard progress lookup failed:', error)
  }
})
</script>
