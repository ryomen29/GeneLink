<template>
  <div v-if="!lesson" class="empty-state">
    <h2>Lesson not found</h2>
    <RouterLink to="/student/lessons">Back to lessons</RouterLink>
  </div>

  <div v-else-if="!schedule.day1PretestComplete.value" class="lesson-detail">
    <div class="lesson-banner">
      <span>{{ lesson.emoji }}</span>
      <div>
        <p class="eyebrow">DAY {{ schedule.currentDay.value }} — {{ schedule.currentDayName.value.toUpperCase() }}</p>
        <h1>{{ lesson.title }}</h1>
        <p>Today's scheduled session is open. The weekly calendar continues on time.</p>
      </div>
    </div>

    <section class="pretest-lock" role="status" aria-labelledby="pretest-lock-title">
      <p class="eyebrow">🔒 TOPICS LOCKED</p>
      <h2 id="pretest-lock-title">Complete the Day 1 pre-test to unlock learning topics</h2>
      <p>The pre-test is available only during its scheduled Day 1 session. If it was missed, it returns in the next weekly cycle; today's lesson and later days do not shift.</p>
      <div class="locked-topic-list" aria-label="Locked learning topics">
        <article v-for="topic in lesson.topics" :key="topic.id" class="locked-topic-preview" aria-disabled="true">
          <span aria-hidden="true">🔒</span>
          <div class="locked-topic-copy">
            <h3>{{ topic.title }}</h3>
            <p>{{ topic.intro }}</p>
          </div>
          <strong>Locked</strong>
        </article>
      </div>
      <RouterLink class="secondary inline" to="/student/lessons">View weekly schedule</RouterLink>
    </section>
  </div>

  <div v-else class="lesson-detail">
    <div class="lesson-banner">
      <span>{{ lesson.emoji }}</span>
      <div>
        <p class="eyebrow">YOUR GENETICS LEARNING JOURNEY</p>
        <h1>{{ lesson.title }}</h1>
        <p>Explore, test an idea, and use evidence to explain what you discover.</p>
      </div>
    </div>

    <section class="objectives">
      <h2>🎯 Today’s mission</h2>
      <ul>
        <li v-for="objective in currentTopic.objectives.slice(0, 3)" :key="objective">{{ objective }}</li>
      </ul>
    </section>

    <section class="topic-list">
      <h2>📚 Topics</h2>
      <article v-for="(topic, index) in lesson.topics" :key="topic.id">
        <span>{{ index + 1 }}</span>
        <div>
          <h3>{{ topic.title }}</h3>
          <p>{{ topic.intro }}</p>
        </div>
        <button :disabled="!canSelectTopic(index)" @click="selectTopic(index)">
          {{ completedTopicIds.has(topic.id) ? 'Review' : active === index ? 'Current topic' : canSelectTopic(index) ? 'Explore' : '🔒 Locked' }}
        </button>
      </article>
    </section>

    <section v-if="currentTopic" class="topic-content">
      <div class="topic-header-row">
        <h2>🔬 {{ currentTopic.title }}</h2>
        <span class="pill">Topic {{ active + 1 }} of {{ lesson.topics.length }}</span>
      </div>

      <nav class="phase-progress" aria-label="Lesson phase progress">
        <button
          v-for="(phase, index) in instructionalPhases"
          :key="phase.id"
          type="button"
          :disabled="index >= currentPhaseIndex"
          class="phase-item"
          :class="{
            active: currentPhaseIndex === index,
            complete: currentPhaseIndex > index,
            clickable: index < currentPhaseIndex
          }"
          :aria-current="currentPhaseIndex === index ? 'step' : undefined"
          @click="goToCompletedPhase(index)"
        >
          <span class="phase-icon">{{ currentPhaseIndex > index ? '✓' : phase.icon }}</span>
          <span>{{ phase.label }}</span>
        </button>
      </nav>

      <ProgressBar :value="currentPhaseIndex + 1" :total="instructionalPhases.length" />

      <section class="phase-card" :aria-labelledby="`phase-${currentPhase.id}`">
        <p class="eyebrow">PHASE {{ currentPhaseIndex + 1 }} OF {{ instructionalPhases.length }}</p>
        <h2 :id="`phase-${currentPhase.id}`">{{ currentPhase.label }}</h2>

        <template v-if="currentPhase.id === 'engage'">
          <p class="phase-lead">{{ currentTopic.intro }}</p>
          <p class="prompt-card">What makes you curious about this idea? Keep one question in mind as you explore.</p>
          <button class="primary" @click="advancePhase">Start exploring →</button>
        </template>

        <template v-else-if="currentPhase.id === 'explore'">
          <p class="phase-lead">Learning objective: {{ learningConfig.learningObjective }}</p>
          <div class="lead lesson-discussion" v-html="currentTopic.content"></div>
          <button class="primary" @click="advancePhase">Make a prediction →</button>
        </template>

        <template v-else-if="currentPhase.id === 'predict'">
          <label class="phase-label" for="prediction-response">{{ learningConfig.predictionPrompt }}</label>
          <textarea id="prediction-response" v-model="predictionResponse" rows="3" maxlength="1200" placeholder="Share your prediction in your own words…"></textarea>
          <button class="primary" :disabled="!predictionResponse.trim()" @click="submitPrediction">Continue to the activity →</button>
        </template>

        <template v-else-if="currentPhase.id === 'simulate'">
          <div class="simulation-instructions">
            <span class="pill">{{ learningConfig.provider }}</span>
            <h3>{{ learningConfig.title }}</h3>
            <p>{{ learningConfig.instructions }}</p>
          </div>
          <TopicActivity :topic="currentTopic" />
          <p class="helper-text">External simulations are not automatically inspected by GENELInK. Use your observations in the guided question that follows.</p>
          <button class="primary" @click="completeSimulation">I’ve explored the activity →</button>
        </template>

        <template v-else-if="currentPhase.id === 'explain'">
          <label class="phase-label" for="explanation-response">What did you observe, and how does it connect to the learning objective?</label>
          <textarea id="explanation-response" v-model="explanationResponse" rows="4" maxlength="1600" placeholder="Describe a pattern or result you noticed…"></textarea>
          <button class="primary" :disabled="!explanationResponse.trim()" @click="submitExplanation">Check my understanding →</button>
        </template>

        <template v-else-if="currentPhase.id === 'feedback'">
          <template v-if="!feedbackSubmitted">
            <label class="phase-label">{{ learningConfig.evaluationQuestion }}</label>
            <div class="evaluation-options">
              <button
                v-for="(option, index) in learningConfig.evaluationOptions"
                :key="option"
                :class="{ selected: selectedEvaluation === index }"
                @click="selectedEvaluation = index"
              >
                {{ option }}
              </button>
            </div>
            <button class="primary" :disabled="selectedEvaluation === null" @click="checkEvaluation">Check my observation →</button>
          </template>
          <div v-else class="feedback-result" :class="{ supportive: !evaluationCorrect }" role="status">
            <p class="feedback-title">{{ evaluationCorrect ? '✓ Your observation' : 'Not quite — let’s look at what happened.' }}</p>
            <p>{{ evaluationCorrect ? learningConfig.feedbackCorrect : learningConfig.feedbackIncorrect }}</p>
            <p v-if="!evaluationCorrect" class="guiding-observation">Guiding idea: {{ learningConfig.expectedOutcome }}</p>
          </div>

          <div v-if="feedbackSubmitted && shouldOfferAI" class="ai-recommendation">
            <p><strong>💡 This concept can be tricky.</strong></p>
            <p>Would you like a little help from GENELInK Buddy?</p>
            <div v-if="!aiRequested" class="ai-actions">
              <button class="secondary" @click="requestAI">Ask GENELInK Buddy</button>
              <button class="text-button" @click="continueWithoutAI">Continue without AI</button>
            </div>
            <AITutor
              v-if="aiRequested"
              inline
              open-on-mount
              :context="aiContext"
              @close="aiRequested = false"
            />
          </div>

          <button v-if="feedbackSubmitted && !aiRequested" class="primary" @click="advancePhase">Continue to application →</button>
          <button v-else-if="feedbackSubmitted && aiRequested" class="primary" @click="advancePhase">Continue to application →</button>
        </template>

        <template v-else-if="currentPhase.id === 'apply'">
          <label class="phase-label" for="application-response">{{ learningConfig.applicationPrompt }}</label>
          <textarea id="application-response" v-model="applicationResponse" rows="4" maxlength="1600" placeholder="Apply the idea to this new example…"></textarea>
          <button class="primary" :disabled="!applicationResponse.trim()" @click="submitApplication">Continue to reflection →</button>
        </template>

        <template v-else-if="currentPhase.id === 'reflect'">
          <p class="phase-lead">Your prediction: {{ predictionResponse }}</p>
          <label class="phase-label" for="reflection-response">{{ learningConfig.reflectionPrompt }}</label>
          <textarea id="reflection-response" v-model="reflectionResponse" rows="3" maxlength="1200" placeholder="What changed in your thinking?…"></textarea>
          <button class="primary" :disabled="!reflectionResponse.trim() || savingTopic" @click="finishTopic">
            {{ savingTopic ? 'Saving progress…' : active < lesson.topics.length - 1 ? 'Complete topic and continue →' : 'Complete lesson →' }}
          </button>
        </template>
      </section>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AITutor from './AITutor.vue'
import TopicActivity from './activities/TopicActivity.vue'
import ProgressBar from './common/ProgressBar.vue'
import { getLessonById } from '../data/lessons'
import { getTopicLearningConfig, instructionalPhases } from '../data/instructionalFlow'
import { buildLessonAIContext, shouldRecommendAI } from '../services/aiRecommendations'
import { learningEventService } from '../services/learningEvents'
import { lessonService } from '../services/lessons'
import { useStudySchedule } from '../composables/useStudySchedule'

const route = useRoute()
const router = useRouter()
const schedule = useStudySchedule()
const lesson = computed(() => getLessonById(route.params.id))
const active = ref(0)
const activePhaseIndex = ref(0)
const completedTopicIds = ref(new Set())
const predictionResponse = ref('')
const explanationResponse = ref('')
const applicationResponse = ref('')
const reflectionResponse = ref('')
const selectedEvaluation = ref(null)
const feedbackSubmitted = ref(false)
const evaluationCorrect = ref(false)
const misconceptionDetected = ref(false)
const incorrectAttempts = ref(0)
const aiRequested = ref(false)
const aiOfferRecorded = ref(false)
const savingTopic = ref(false)
const simulationStarted = ref(false)

const currentTopic = computed(() => lesson.value?.topics[active.value] ?? null)
const learningConfig = computed(() => getTopicLearningConfig(currentTopic.value))
const currentPhaseIndex = computed(() => activePhaseIndex.value)
const currentPhase = computed(() => instructionalPhases[currentPhaseIndex.value])
const shouldOfferAI = computed(() => feedbackSubmitted.value && shouldRecommendAI({
  difficulty: learningConfig.value.difficulty,
  misconceptionDetected: misconceptionDetected.value,
  incorrectAttempts: incorrectAttempts.value,
  studentResponse: explanationResponse.value
}))
const aiContext = computed(() => buildLessonAIContext({
  lesson: lesson.value,
  topic: currentTopic.value,
  phase: currentPhase.value?.label,
  learningObjective: learningConfig.value.learningObjective,
  studentResponse: explanationResponse.value,
  simulationResult: feedbackSubmitted.value
    ? { evaluated: true, correct: evaluationCorrect.value, expectedOutcome: learningConfig.value.expectedOutcome }
    : null
}))

watch(shouldOfferAI, async (offered) => {
  if (offered && !aiOfferRecorded.value) {
    aiOfferRecorded.value = true
    await recordEvent('ai_assistance_offered', 'feedback')
  }
})

onMounted(async () => {
  if (!lesson.value) {
    router.replace('/student/lessons')
    return
  }

  try {
    const { topics } = await lessonService.getStudentProgress()

    completedTopicIds.value = new Set(
      topics.filter((item) => item.lesson_id === lesson.value.id).map((item) => Number(item.topic_id))
    )
    await recordEvent('session_started', 'engage', { activityType: 'lesson' })
  } catch (error) {
    console.error('Lesson progress check failed:', error)
  }
})

function canSelectTopic(index) {
  if (index === 0 || completedTopicIds.value.has(lesson.value?.topics[index - 1]?.id)) return true
  return index <= active.value
}

function selectTopic(index) {
  if (!canSelectTopic(index)) return
  active.value = index
  resetTopicFlow()
}

function resetTopicFlow() {
  activePhaseIndex.value = 0
  predictionResponse.value = ''
  explanationResponse.value = ''
  applicationResponse.value = ''
  reflectionResponse.value = ''
  selectedEvaluation.value = null
  feedbackSubmitted.value = false
  evaluationCorrect.value = false
  misconceptionDetected.value = false
  incorrectAttempts.value = 0
  aiRequested.value = false
  aiOfferRecorded.value = false
  simulationStarted.value = false
}

async function recordEvent(eventName, phase, details = {}) {
  try {
    await learningEventService.record({
      eventName,
      lessonId: lesson.value?.id,
      topicId: currentTopic.value?.id,
      phase,
      sessionDay: schedule.currentDay.value,
      details
    })
  } catch (error) {
    // Event telemetry must never block the instructional activity.
    console.warn(`Learning event ${eventName} could not be saved:`, error)
  }
}

function advancePhase() {
  if (currentPhaseIndex.value < instructionalPhases.length - 1) activePhaseIndex.value += 1
}

function goToCompletedPhase(index) {
  if (index < currentPhaseIndex.value) activePhaseIndex.value = index
}

async function submitPrediction() {
  if (!predictionResponse.value.trim()) return
  await recordEvent('prediction_submitted', 'predict', { responseLength: predictionResponse.value.trim().length })
  activePhaseIndex.value = 3
  if (!simulationStarted.value) {
    simulationStarted.value = true
    await recordEvent('simulation_started', 'simulate', { provider: learningConfig.value.provider })
  }
}

async function completeSimulation() {
  await recordEvent('simulation_completed', 'simulate', { studentReportedCompletion: true })
  activePhaseIndex.value = 4
}

async function submitExplanation() {
  if (!explanationResponse.value.trim()) return
  const text = explanationResponse.value.toLowerCase()
  misconceptionDetected.value = /gene is (the )?trait|chromosome is (a )?gene|dna is made of genes|punnett square (always )?guarantee/.test(text)
  await recordEvent('explanation_submitted', 'explain', {
    responseLength: explanationResponse.value.trim().length,
    misconceptionDetected: misconceptionDetected.value
  })
  activePhaseIndex.value = 5
}

async function checkEvaluation() {
  if (selectedEvaluation.value === null) return
  feedbackSubmitted.value = true
  evaluationCorrect.value = selectedEvaluation.value === learningConfig.value.correctOption
  if (!evaluationCorrect.value) incorrectAttempts.value += 1

  await recordEvent(
    evaluationCorrect.value ? 'simulation_result_correct' : 'simulation_result_incorrect',
    'feedback',
    { evaluationType: learningConfig.value.evaluationType, externalResultVerified: false }
  )
}

async function requestAI() {
  aiRequested.value = true
  await recordEvent('ai_assistance_requested', 'feedback')
}

function continueWithoutAI() {
  aiRequested.value = false
  advancePhase()
}

async function submitApplication() {
  if (!applicationResponse.value.trim()) return
  await recordEvent('application_completed', 'apply', { responseLength: applicationResponse.value.trim().length })
  advancePhase()
}

async function finishTopic() {
  if (!reflectionResponse.value.trim() || savingTopic.value) return
  savingTopic.value = true

  try {
    await recordEvent('reflection_completed', 'reflect', { responseLength: reflectionResponse.value.trim().length })
    const { error } = await lessonService.markTopicComplete({ lessonId: lesson.value.id, topicId: currentTopic.value.id })
    if (error) throw error
    await recordEvent('topic_completed', 'reflect')
    completedTopicIds.value = new Set([...completedTopicIds.value, currentTopic.value.id])

    if (active.value < lesson.value.topics.length - 1) {
      active.value += 1
      resetTopicFlow()
    } else {
      await lessonService.markLessonComplete({ lessonId: lesson.value.id })
      await recordEvent('session_completed', 'reflect', { activityType: 'lesson' })
      router.push('/student/lessons')
    }
  } catch (error) {
    console.error('Topic completion failed:', error)
    alert('Oops! We could not save your progress yet. Please try again.')
  } finally {
    savingTopic.value = false
  }
}
</script>

<style scoped>
.lesson-detail { display: grid; gap: 22px; }
.pretest-lock { display: grid; gap: 14px; margin-top: 22px; padding: 24px; border: 1px solid #ead7aa; border-radius: 22px; background: #fffaf0; }
.pretest-lock h2, .pretest-lock p { margin: 0; }
.pretest-lock > p:not(.eyebrow) { color: #59677e; line-height: 1.6; }
.locked-topic-list { display: grid; gap: 10px; }
.locked-topic-preview { display: flex; align-items: center; gap: 12px; padding: 14px; border: 1px solid #e1e5ec; border-radius: 14px; background: #f2f4f8; color: #637087; }
.locked-topic-copy { min-width: 0; flex: 1; filter: blur(3px); opacity: .62; user-select: none; }
.locked-topic-copy h3, .locked-topic-copy p { margin: 0; }
.locked-topic-preview > strong { white-space: nowrap; color: #65512d; }
.phase-progress {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin: 18px 0 12px;
}
.phase-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 10px;
  border: 0;
  border-radius: 12px;
  background: #f0f3f8;
  color: #66758b;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 700;
}
.phase-item.active { background: #eeeaff; color: #4937b3; box-shadow: inset 0 0 0 1px #9f91f5; }
.phase-item.complete { background: #e8f8ef; color: #22714e; }
.phase-item.clickable { cursor: pointer; }
.phase-item:disabled { cursor: default; opacity: 1; }
.phase-icon { font-size: 1rem; }
.phase-card { display: grid; gap: 14px; padding: 22px; border: 1px solid #dfe8f5; border-radius: 20px; background: #fff; }
.phase-card h2, .phase-card h3, .phase-card p { margin-top: 0; }
.phase-lead, .phase-label { color: #304767; line-height: 1.65; }
.phase-label { font-weight: 800; }
.phase-card textarea {
  width: 100%;
  resize: vertical;
  border: 1px solid #cbd7e8;
  border-radius: 12px;
  padding: 12px 14px;
  font: inherit;
  color: #243651;
}
.phase-card textarea:focus { outline: 3px solid #dedaff; border-color: #7c6df8; }
.prompt-card, .simulation-instructions, .feedback-result, .ai-recommendation {
  padding: 16px;
  border-radius: 15px;
  background: #f5f7ff;
  border: 1px solid #e2e8f5;
}
.evaluation-options { display: grid; gap: 9px; }
.evaluation-options button { text-align: left; padding: 12px 14px; border: 1px solid #d8e2f0; border-radius: 12px; background: #fff; color: #304767; }
.evaluation-options button.selected { border-color: #7969ec; background: #f0edff; }
.feedback-result.supportive { background: #fff9e9; border-color: #f1d99b; }
.feedback-title { font-size: 1.1rem; font-weight: 900; }
.guiding-observation { margin-bottom: 0; }
.ai-recommendation { margin-top: 8px; background: #f4f0ff; border-color: #dfd6ff; }
.ai-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.text-button { border: 0; background: transparent; color: #5142a9; font-weight: 800; text-decoration: underline; }
.helper-text { color: #66758b; font-size: 0.9rem; }
.lesson-discussion { display: grid; gap: 18px; }
.lesson-discussion :deep(section) { background: #f8fbff; border: 1px solid #dfe8f5; border-radius: 18px; padding: 18px 20px; box-shadow: 0 2px 10px rgba(17, 38, 77, 0.04); }
.lesson-discussion :deep(h3) { margin: 0 0 10px; font-size: 1.05rem; color: #1c2f4f; }
.lesson-discussion :deep(p), .lesson-discussion :deep(li) { margin: 0; line-height: 1.7; color: #304767; }
.lesson-discussion :deep(.think-box), .lesson-discussion :deep(.key-box), .lesson-discussion :deep(.activity-box) { background: linear-gradient(135deg, #fef8e7, #f4f7ff); border-left: 4px solid #f3bd5e; border-radius: 14px; padding: 14px 16px; }
.lesson-discussion :deep(.key-box) { background: linear-gradient(135deg, #edf9f0, #eef5ff); border-left-color: #44b37f; }
.lesson-discussion :deep(.activity-box) { background: linear-gradient(135deg, #f5f0ff, #eef9ff); border-left-color: #8e7dff; }
.lesson-discussion :deep(.mini-list) { margin: 10px 0 0; padding-left: 20px; display: grid; gap: 8px; }
@media (max-width: 800px) { .phase-progress { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
