<template>
  <StudentShell title="Lesson">
    <div v-if="!lesson" class="empty-state">
      <h2>Lesson not found</h2>
      <RouterLink to="/student/lessons">Back to lessons</RouterLink>
    </div>

    <div v-else class="lesson-detail">
      <div class="lesson-banner">
        <span>{{ lesson.emoji }}</span>
        <div>
          <p class="eyebrow">NICE WORK, EXPLORER! 🌟</p>
          <h1>{{ lesson.title }}</h1>
          <p>Take your time. Curiosity is your superpower.</p>
        </div>
      </div>

      <section class="objectives">
        <h2>🎯 Today’s mission</h2>
        <ul>
          <li v-for="objective in displayObjectives" :key="objective">{{ objective }}</li>
        </ul>
      </section>

      <section class="topic-list">
        <h2>📚 Explore the topics</h2>
        <article v-for="(topic, index) in lesson.topics" :key="topic.id">
          <span>{{ index + 1 }}</span>
          <div>
            <h3>{{ topic.title }}</h3>
            <p>{{ topic.intro }}</p>
          </div>
          <button @click="selectTopic(index)">Explore</button>
        </article>
      </section>

      <section class="topic-content">
        <div class="topic-header-row">
          <h2>🔬 {{ currentTopic.title }}</h2>
          <span class="pill">Topic {{ active + 1 }} of {{ lesson.topics.length }}</span>
        </div>

        <div class="lead lesson-discussion" v-html="currentTopic.content"></div>
        <div class="callout">💡 Buddy tip: If you can explain it to a friend using your own words, you’re really getting it!</div>

        <TopicActivity :topic="currentTopic" />

        <div class="explorer-box">
          <h3>Explorer challenge</h3>
          <p>{{ currentTopic.challenge }}</p>
        </div>

        <div class="topic-actions">
          <button v-if="active < lesson.topics.length - 1" class="primary" @click="nextTopic">Next topic →</button>
          <button v-else class="primary" @click="completeLesson">Mark lesson complete →</button>
        </div>
      </section>
    </div>
  </StudentShell>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StudentShell from '../../components/StudentShell.vue'
import TopicActivity from '../../components/activities/TopicActivity.vue'
import ProgressBar from '../../components/common/ProgressBar.vue'
import { getLessonById } from '../../data/lessons'
import { lessonService } from '../../services/lessons'

const route = useRoute()
const router = useRouter()

const lesson = computed(() => getLessonById(route.params.id))
const active = ref(0)
const progress = ref([])

const currentTopic = computed(() => lesson.value?.topics[active.value] || lesson.value?.topics[0])
const displayObjectives = computed(() => {
  const objectives = currentTopic.value?.objectives || lesson.value?.objectives || []
  return objectives.slice(0, 3)
})

onMounted(async () => {
  try {
    const { lessonProgress } = await lessonService.getStudentProgress()
    const matched = lessonProgress.find((item) => item.lesson_id === Number(route.params.id))

    if (!matched?.pretest_completed) {
      router.replace(`/student/pretest/${route.params.id}`)
      return
    }

    progress.value = lessonProgress
  } catch (error) {
    console.error('Lesson view progress check failed:', error)
  }
})

function selectTopic(index) {
  active.value = index
}

function nextTopic() {
  if (active.value < (lesson.value?.topics.length || 1) - 1) {
    active.value += 1
  }
}

async function completeLesson() {
  if (!lesson.value || !currentTopic.value) return

  try {
    await lessonService.markTopicComplete({
      lessonId: lesson.value.id,
      topicId: currentTopic.value.id
    })
    router.push('/student/final-exam')
  } catch (error) {
    console.error('Topic completion failed:', error)
    alert('Oops! We could not save your progress yet. Please try again.')
  }
}
</script>

<style scoped>
.lesson-discussion {
  display: grid;
  gap: 18px;
}

.lesson-discussion :deep(section) {
  background: #f8fbff;
  border: 1px solid #dfe8f5;
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: 0 2px 10px rgba(17, 38, 77, 0.04);
}

.lesson-discussion :deep(h3) {
  margin: 0 0 10px;
  font-size: 1.05rem;
  color: #1c2f4f;
}

.lesson-discussion :deep(p),
.lesson-discussion :deep(li) {
  margin: 0;
  line-height: 1.7;
  color: #304767;
}

.lesson-discussion :deep(.think-box),
.lesson-discussion :deep(.key-box),
.lesson-discussion :deep(.activity-box) {
  background: linear-gradient(135deg, #fef8e7, #f4f7ff);
  border-left: 4px solid #f3bd5e;
  border-radius: 14px;
  padding: 14px 16px;
}

.lesson-discussion :deep(.key-box) {
  background: linear-gradient(135deg, #edf9f0, #eef5ff);
  border-left-color: #44b37f;
}

.lesson-discussion :deep(.activity-box) {
  background: linear-gradient(135deg, #f5f0ff, #eef9ff);
  border-left-color: #8e7dff;
}

.lesson-discussion :deep(.mini-list) {
  margin: 10px 0 0;
  padding-left: 20px;
  display: grid;
  gap: 8px;
}
</style>
