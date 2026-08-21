<template>
  <StudentShell title="Final Exam">
    <div class="test-wrap">
      <div v-if="!started && !submitted" class="result-card"><div class="big-emoji">🏆</div><h1>Final Exam: The Big Genetics Quest!</h1><p>You’ve completed the learning adventure. This exam brings back ideas from every topic and your pre-test warm-ups.</p><ul class="friendly-list"><li>{{ questions.length }} questions</li><li>Mixed review across all lessons</li><li>Take a breath and do your best 🌟</li></ul><button class="primary" @click="started = true">Start Final Exam 🚀</button></div>
      <div v-else-if="!submitted" class="question-card"><div class="progress">Question {{ current + 1 }} of {{ questions.length }}</div><h2>{{ questions[current].q }}</h2><button v-for="(option, index) in questions[current].options" :key="option" class="option" :class="{ selected: answers[current] === index }" @click="answers[current] = index">{{ String.fromCharCode(65 + index) }}. {{ option }}</button><div class="test-actions"><button class="primary" @click="next">{{ current === questions.length - 1 ? 'Submit exam' : 'Next →' }}</button></div></div>
      <div v-else class="result-card"><div class="big-emoji">🌟</div><h1>Quest complete!</h1><p>Your final score is <b>{{ score }} / {{ questions.length }}</b>.</p><p>Whatever the score, you just practiced thinking like a scientist. Keep exploring!</p><RouterLink class="secondary inline" to="/student">Back to home</RouterLink></div>
    </div>
  </StudentShell>
</template>

<script setup>
import { ref } from 'vue'
import StudentShell from '../../components/StudentShell.vue'
import { finalExam } from '../../data/lessons'

const questions = finalExam
const current = ref(0)
const answers = ref([])
const started = ref(false)
const submitted = ref(false)
const score = ref(0)

function next() {
  if (answers.value[current.value] === undefined) return
  if (current.value < questions.length - 1) current.value++
  else { score.value = questions.reduce((total, question, index) => total + (answers.value[index] === question.answer ? 1 : 0), 0); submitted.value = true }
}
</script>
