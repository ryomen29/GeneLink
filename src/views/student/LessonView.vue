<template>
  <StudentShell title="Lesson">
    <div class="lesson-detail">
      <div class="lesson-banner"><span>{{ lesson.emoji }}</span><div><p class="eyebrow">NICE WORK, EXPLORER! 🌟</p><h1>{{ lesson.title }}</h1><p>Take your time. Curiosity is your superpower.</p></div></div>
      <section class="objectives"><h2>🎯 Today’s mission</h2><ul><li v-for="objective in lesson.objectives" :key="objective">{{ objective }}</li></ul></section>
      <section class="topic-list"><h2>📚 Explore the topics</h2><article v-for="(topic, index) in lesson.topics" :key="topic"><span>{{ index + 1 }}</span><div><h3>{{ topic }}</h3><p>Read, explore, then explain it in your own words.</p></div><button @click="active = index">Explore</button></article></section>
      <section class="topic-content"><h2>🔬 {{ lesson.topics[active] }}</h2><p>{{ content[active] }}</p><div class="callout">💡 Buddy tip: If you can explain it to a friend using your own words, you’re really getting it!</div><button v-if="active < lesson.topics.length - 1" class="primary" @click="active++">Next topic →</button><RouterLink v-else class="primary inline" to="/student/final-exam">All done? Check the final exam →</RouterLink></section>
    </div>
  </StudentShell>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import StudentShell from '../../components/StudentShell.vue'
import { lessons } from '../../data/lessons'

const lesson = lessons.find((item) => item.id === Number(useRoute().params.id))
const active = ref(0)
const content = lesson.topics.map((topic) => `Let’s explore ${topic}. This space is ready for your lesson content, images, activities, and PhET simulation. Connect the real instructional material here when your backend/content API is ready.`)
</script>
