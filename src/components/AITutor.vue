<template>
  <div v-if="inline || !isLessonRoute" class="ai-wrap" :class="{ inline }">
    <button
      v-if="!inline"
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

    <section v-if="open || inline" class="ai-panel" :class="{ 'ai-panel-inline': inline }">
      <header>
        <div>
          <b>🧸 GENELInK Buddy</b>
          <small>Hi, explorer! Need a tiny hint?</small>
        </div>

        <button @click="close">×</button>
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
const props = defineProps({
  inline: { type: Boolean, default: false },
  openOnMount: { type: Boolean, default: false },
  context: { type: Object, default: null }
})
const emit = defineEmits(['close'])
const open = ref(props.openOnMount || props.inline)
const hover = ref(false)
const loading = ref(false)
const text = ref('')
const conversationId = ref(null)

const currentLesson = computed(() => getLessonById(route.params.id))
const isLessonRoute = computed(() => route.path.startsWith('/student/lesson/'))
const currentTopic = computed(() => {
  const lesson = currentLesson.value
  if (!lesson || !route.params.id) return null
  const topicIndex = Number(route.query.topic ?? 0)
  return lesson.topics[topicIndex] || lesson.topics[0]
})
const assessmentState = computed(() => {
  if (props.context?.assessmentState) return props.context.assessmentState
  if (route.path.startsWith('/student/pretest/')) return 'pretest_active'
  if (route.path === '/student/final-exam') return 'final_exam_active'
  return 'lesson'
})

function close() {
  open.value = false
  emit('close')
}

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

  const lessonId = props.context?.lessonId ?? currentLesson.value?.id ?? null
  const topicId = props.context?.topicId ?? currentTopic.value?.id ?? null

  messages.value.push({ role: 'student', text: question })
  text.value = ''
  loading.value = true

  try {
    const result = await aiService.sendMessage(question, {
      lessonId,
      topicId,
      lessonTitle: props.context?.lessonTitle ?? currentLesson.value?.title ?? null,
      topicTitle: props.context?.topicTitle ?? currentTopic.value?.title ?? null,
      phase: props.context?.phase ?? null,
      learningObjective: props.context?.learningObjective ?? null,
      studentResponse: props.context?.studentResponse ?? null,
      simulationResult: props.context?.simulationResult ?? null,
      assessmentState: assessmentState.value,
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
    text.value = question
    messages.value.push({
      role: 'ai',
      text: error.message || 'Oops! I’m having a tiny brain break right now 🥺✨ Please try again in a moment.'
    })
  } finally {
    loading.value = false
  }
}
</script>
