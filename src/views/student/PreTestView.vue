<template>
  <StudentShell title="Pre-test">
    <div class="test-wrap">
      <div class="test-header">
        <div>
          <p class="eyebrow">Ready, explorer? 🔎</p>
          <h1>{{ lesson.title }}</h1>
          <p>Let’s see what you already know! Don’t worry about getting everything right. This is just your starting point!</p>
        </div>
        <div class="timer" :class="{ danger: seconds < 60 }">⏱ {{ formattedTime }}</div>
      </div>

      <div v-if="!submitted" class="question-card">
        <div class="progress">Question {{ current + 1 }} of 5</div>
        <h2>{{ questions[current].q }}</h2>
        <button
          v-for="(option, index) in questions[current].options"
          :key="option"
          class="option"
          :class="{ selected: answers[current] === index }"
          @click="answers[current] = index"
        >
          {{ String.fromCharCode(65 + index) }}. {{ option }}
        </button>

        <div class="test-actions">
          <button v-if="current" class="secondary" @click="current--">← Back</button>
          <button class="primary" @click="next">{{ current === 4 ? 'Finish pre-test' : 'Next →' }}</button>
        </div>
      </div>

      <div v-else class="result-card">
        <div class="big-emoji">🎉</div>
        <h2>Warm-up complete!</h2>
        <p>You scored <b>{{ score }} / 5</b>. Great start, Explorer!</p>
        <RouterLink class="primary inline" :to="`/student/lesson/${lesson.id}`">Unlock the lesson →</RouterLink>
      </div>
    </div>
  </StudentShell>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StudentShell from '../../components/StudentShell.vue'
import { getLessonById, lessons, pretests } from '../../data/lessons'
import { lessonService } from '../../services/lessons'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const lesson = getLessonById(id) || lessons.find((item) => item.id === id)
const questions = pretests[id] || []
const current = ref(0)
const answers = ref(Array(5).fill(undefined))
const seconds = ref(480)
const submitted = ref(false)
const score = ref(0)
const isSaving = ref(false)
const formattedTime = computed(() => `${String(Math.floor(seconds.value / 60)).padStart(2, '0')}:${String(seconds.value % 60).padStart(2, '0')}`)

if (!lesson || !questions.length) {
  router.replace('/student/lessons')
}

const timer = setInterval(() => {
  if (!submitted.value && seconds.value > 0) seconds.value--
  else if (seconds.value === 0 && !submitted.value) finish()
}, 1000)

onBeforeUnmount(() => clearInterval(timer))

async function finish() {
  if (isSaving.value || submitted.value) return

  const computedScore = questions.reduce((total, question, index) => total + (answers.value[index] === question.answer ? 1 : 0), 0)
  score.value = computedScore
  submitted.value = true
  isSaving.value = true

  try {
    await lessonService.submitPretestAttempt({
      lessonId: lesson.id,
      answers: answers.value,
      score: computedScore,
      totalQuestions: questions.length
    })
  } catch (error) {
    console.error('[Pretest UI] persistence failed with full Supabase error:', error)
    alert(error?.message || 'Pre-test save failed. See console for the exact Supabase error.')
  } finally {
    isSaving.value = false
  }
}

function next() {
  if (answers.value[current.value] === undefined) return
  if (current.value < 4) current.value++
  else finish()
}
</script>
