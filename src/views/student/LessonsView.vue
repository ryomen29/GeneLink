<template>
  <StudentShell title="Lessons">
    <div class="page-title"><p class="eyebrow">YOUR GENETICS ADVENTURE 🗺️</p><h1>Pick a lesson, Explorer!</h1><p>Every lesson starts with a tiny 5-question warm-up.</p></div>
    <div class="cards">
      <article v-for="lesson in lessons" :key="lesson.id" class="lesson-card">
        <div class="lesson-icon" :class="lesson.color">{{ lesson.emoji }}</div>
        <span class="pill">5-question pre-test · 8 min</span>
        <h2>{{ lesson.title }}</h2><h4>By the end, you’ll be able to…</h4>
        <ul><li v-for="objective in lesson.objectives" :key="objective">{{ objective }}</li></ul>
        <RouterLink class="primary inline" :to="`/student/pretest/${lesson.id}`">Take pre-test →</RouterLink>
      </article>
    </div>
  </StudentShell>
</template>

<script setup>
import StudentShell from '../../components/StudentShell.vue'
import { lessons } from '../../data/lessons'
</script>
