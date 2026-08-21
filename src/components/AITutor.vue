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
          <small>Shh… I’m right here if you need me!</small>
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
          placeholder="Ask me about genetics…"
          :disabled="loading"
        />

        <button :disabled="loading">➤</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '../services/api'

const open = ref(false)
const hover = ref(false)
const loading = ref(false)
const text = ref('')

const messages = ref([
  {
    role: 'ai',
    text: 'Hi, Explorer! 🌟 I’m your tiny genetics buddy. Stuck on a lesson? I’m here!'
  }
])

async function send() {
  const question = text.value.trim()

  if (!question || loading.value) {
    return
  }

  messages.value.push({
    role: 'student',
    text: question
  })

  text.value = ''
  loading.value = true

  try {
    const result = await api.aiChat({
      message: question,
      lessonId: null
    })

    messages.value.push({
      role: 'ai',
      text: result.answer || 'Let’s figure it out together! 🧬'
    })
  } catch (error) {
    messages.value.push({
      role: 'ai',
      text:
        error.message ||
        'Oops! My tiny lab computer needs a moment. Try again! 🧪'
    })
  } finally {
    loading.value = false
  }
}
</script>
