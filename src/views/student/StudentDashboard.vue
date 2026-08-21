<template>
  <StudentShell title="Home">
    <section class="hero">
      <div>
        <p class="eyebrow">GOOD DAY, EXPLORER 🌈</p>
        <h1>Ready to uncover some tiny secrets of life?</h1>
        <p>DNA, genes, chromosomes and traits are waiting for you. No lab coat required! 🥼</p>
        <RouterLink class="primary inline" to="/student/lessons">Start Learning →</RouterLink>
      </div>
      <div class="hero-art">🧬✨</div>
    </section>
    <div class="section-head"><h2>Your adventure map</h2><span>Keep going — you’ve got this! 💪</span></div>
    <div class="cards">
      <article v-for="lesson in lessons" :key="lesson.id" class="lesson-mini">
        <div class="emoji">{{ lesson.emoji }}</div><h3>{{ lesson.title }}</h3><p>Pre-test → learn → challenge</p>
        <RouterLink :to="`/student/lesson/${lesson.id}`">Open lesson →</RouterLink>
      </article>
    </div>
  </StudentShell>
</template>

<script setup>
import StudentShell from '../../components/StudentShell.vue'
import { lessons } from '../../data/lessons'
</script>
