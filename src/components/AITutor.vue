<template>
  <div class="ai-wrap">
    <button
      class="ai-hidey"
      :class="{ open }"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      @click="open = !open"
      aria-label="Open AI Tutor"
    >
      <span>{{ open || hover ? '😊' : '🙈' }}</span>
      <i>✦</i>
    </button>

    <section v-if="open" class="ai-panel">
      <header>
        <div>
          <b>🧸 GENELInK Buddy</b>
          <small>Hi, explorer! Need a tiny hint?</small>
        </div>

        <button @click="open = false">×</button>
      </header>

      <div class="ai-messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['msg', message.role]"
        >
          {{ message.text }}
        </div>

        <div v-if="loading" class="msg ai">
          Thinking… 💭
        </div>
      </div>

      <form @submit.prevent="send">
        <input
          v-model="text"
          placeholder="Ask for a clue about this topic…"
          :disabled="loading"
        />

        <button :disabled="loading">➤</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { aiService } from '../services/ai'
import { getLessonById } from '../data/lessons'

const route = useRoute()
const open = ref(false)
const hover = ref(false)
const loading = ref(false)
const text = ref('')
const conversationId = ref(null)

const currentLesson = computed(() => getLessonById(route.params.id))
const currentTopic = computed(() => {
  const lesson = currentLesson.value
  if (!lesson || !route.params.id) return null
  const topicIndex = Number(route.query.topic ?? 0)
  return lesson.topics[topicIndex] || lesson.topics[0]
})

const messages = ref([
  {
    role: 'ai',
    text: `Hi, Explorer! 👀 I’m your tiny genetics buddy. ${currentLesson.value ? `Right now we’re exploring ${currentLesson.value.title}.` : 'Ask me for a hint, and I’ll help you think it through.'}`
  }
])

async function send() {
  const question = text.value.trim()

  if (!question || loading.value) {
    return
  }

  const lessonId = currentLesson.value?.id ?? null
  const topicId = currentTopic.value?.id ?? null

  messages.value.push({ role: 'student', text: question })
  text.value = ''
  loading.value = true

  try {
    const result = await aiService.ask({
      message: question,
      lessonId,
      topicId,
      conversationId: conversationId.value
    })

    if (result?.conversationId) {
      conversationId.value = result.conversationId
    }

    messages.value.push({
      role: 'ai',
      text: result?.answer || 'Let’s figure it out together! 🧬'
    })
  } catch (error) {
    console.error('AI tutor call failed:', error)
    messages.value.push({
      role: 'ai',
      text: error.message || 'Oops! My tiny lab computer needs a moment. Try again! 🧪'
    })
  } finally {
    loading.value = false
  }
}
</script>
