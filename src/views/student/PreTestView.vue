<template>
  <StudentShell title="Pre-test">
    <div class="test-wrap">
      <div class="test-header">
        <div><p class="eyebrow">WARM-UP TIME 🔥</p><h1>{{ lesson.title }}</h1><p>Answer all 5 questions before unlocking the lesson.</p></div>
        <div class="timer" :class="{ danger: seconds < 60 }">⏱ {{ formattedTime }}</div>
      </div>
      <div v-if="!submitted" class="question-card">
        <div class="progress">Question {{ current + 1 }} of 5</div>
        <h2>{{ questions[current].q }}</h2>
        <button v-for="(option, index) in questions[current].options" :key="option" class="option" :class="{ selected: answers[current] === index }" @click="answers[current] = index">{{ String.fromCharCode(65 + index) }}. {{ option }}</button>
        <div class="test-actions"><button v-if="current" class="secondary" @click="current--">← Back</button><button class="primary" @click="next">{{ current === 4 ? 'Finish pre-test' : 'Next →' }}</button></div>
      </div>
      <div v-else class="result-card"><div class="big-emoji">🎉</div><h2>Warm-up complete!</h2><p>You scored <b>{{ score }} / 5</b>. Great start, Explorer!</p><RouterLink class="primary inline" :to="`/student/lesson/${lesson.id}`">Unlock the lesson →</RouterLink></div>
    </div>
  </StudentShell>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import StudentShell from '../../components/StudentShell.vue'
import { lessons, pretests } from '../../data/lessons'

const id = Number(useRoute().params.id)
const lesson = lessons.find((item) => item.id === id)
const questions = pretests[id]
const current = ref(0)
const answers = ref([])
const seconds = ref(480)
const submitted = ref(false)
const score = ref(0)
const formattedTime = computed(() => `${String(Math.floor(seconds.value / 60)).padStart(2, '0')}:${String(seconds.value % 60).padStart(2, '0')}`)

const timer = setInterval(() => {
  if (!submitted.value && seconds.value > 0) seconds.value--
  else if (seconds.value === 0 && !submitted.value) finish()
}, 1000)
onBeforeUnmount(() => clearInterval(timer))

function next() {
  if (answers.value[current.value] === undefined) return
  if (current.value < 4) current.value++
  else finish()
}
function finish() {
  score.value = questions.reduce((total, question, index) => total + (answers.value[index] === question.answer ? 1 : 0), 0)
  submitted.value = true
}
</script>
