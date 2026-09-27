<template>
  <StudentShell title="Pre-test">
    <div class="test-wrap">
      <div class="test-header">
        <div>
          <p class="eyebrow">Ready, explorer? 🔎</p>
          <h1>{{ lesson.title }}</h1>
          <p>Let’s see what you already know! Don’t worry about getting everything right. This is just your starting point!</p>
        </div>
        <div class="timer" :class="{ danger: remainingSeconds < 60 }" aria-live="polite">⏱ {{ formattedTime }} left in today's session</div>
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
        <p>Lesson 1 opens on its scheduled day. Your score has been saved.</p>
        <RouterLink class="primary inline" to="/student/lessons">View the weekly schedule →</RouterLink>
      </div>
    </div>
  </StudentShell>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StudentShell from '../../components/StudentShell.vue'
import { getLessonById, lessons, pretests } from '../../data/lessons'
import { lessonService } from '../../services/lessons'
import { useStudySchedule } from '../../composables/useStudySchedule'
import { learningEventService } from '../../services/learningEvents'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const lesson = getLessonById(id) || lessons.find((item) => item.id === id)
const questions = pretests[id] || []
const current = ref(0)
const answers = ref(Array(5).fill(undefined))
const submitted = ref(false)
const score = ref(0)
const isSaving = ref(false)
const schedule = useStudySchedule()
const remainingSeconds = computed(() => schedule.remainingSeconds.value)
const formattedTime = computed(() => `${String(Math.floor(remainingSeconds.value / 60)).padStart(2, '0')}:${String(remainingSeconds.value % 60).padStart(2, '0')}`)

if (!lesson || !questions.length) {
  router.replace('/student/lessons')
}

onMounted(() => recordPretestEvent('session_started'))

async function recordPretestEvent(eventName) {
  try {
    await learningEventService.record({
      eventName,
      lessonId: lesson.id,
      phase: eventName === 'session_started' ? 'engage' : 'feedback',
      sessionDay: schedule.currentDay.value,
      details: { activityType: 'pretest' }
    })
  } catch (error) {
    if (eventName === 'session_started' && error?.code === '23505') return
    console.warn(`Pre-test event ${eventName} could not be saved:`, error)
  }
}

async function finish() {
  if (isSaving.value || submitted.value || !schedule.sessionOpen.value) return

  const computedScore = questions.reduce((total, question, index) => total + (answers.value[index] === question.answer ? 1 : 0), 0)
  isSaving.value = true

  try {
    await lessonService.submitPretestAttempt({
      lessonId: lesson.id,
      answers: answers.value,
      score: computedScore,
      totalQuestions: questions.length
    })
    await recordPretestEvent('session_completed')
    score.value = computedScore
    submitted.value = true
  } catch (error) {
    console.error('[Pretest UI] persistence failed with full Supabase error:', error)
    alert(error?.message || 'We could not save your pre-test. Check that the scheduled session is still open, then try again.')
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
