import { computed, onMounted, onUnmounted, ref } from 'vue'
import { STUDY_CONFIG, studyScheduleService } from '../services/studySchedule'

const session = ref(null)
const activities = ref([])
const error = ref(null)
const estimatedServerNow = ref(0)
let serverTimeAnchor = 0
let monotonicAnchor = 0
let references = 0
let tickTimer = null
let refreshTimer = null
let visibilityHandler = null
let pendingRefresh = null

async function refresh() {
  if (pendingRefresh) return pendingRefresh

  pendingRefresh = (async () => {
    try {
      const [currentSession, weeklyActivities] = await Promise.all([
        studyScheduleService.getCurrentSession(),
        studyScheduleService.getWeeklyActivities()
      ])

      session.value = currentSession
      activities.value = weeklyActivities
      error.value = null
      serverTimeAnchor = Number(currentSession.server_time_ms)
      monotonicAnchor = performance.now()
      estimatedServerNow.value = serverTimeAnchor
      return currentSession
    } catch (cause) {
      // Fail closed: a client must not grant learning access if the DB clock
      // or schedule configuration cannot be verified.
      session.value = null
      activities.value = []
      error.value = cause
      console.error('Study schedule lookup failed:', cause)
      return null
    } finally {
      pendingRefresh = null
    }
  })()

  return pendingRefresh
}

function updateClock() {
  if (!session.value) return
  estimatedServerNow.value = serverTimeAnchor + (performance.now() - monotonicAnchor)
}

function start() {
  references += 1
  if (references !== 1) return

  refresh()
  tickTimer = window.setInterval(updateClock, 1000)
  refreshTimer = window.setInterval(refresh, 30000)
  visibilityHandler = () => {
    if (document.visibilityState === 'visible') refresh()
  }
  document.addEventListener('visibilitychange', visibilityHandler)
  window.addEventListener('focus', refresh)
}

function stop() {
  references = Math.max(0, references - 1)
  if (references !== 0) return

  window.clearInterval(tickTimer)
  window.clearInterval(refreshTimer)
  document.removeEventListener('visibilitychange', visibilityHandler)
  window.removeEventListener('focus', refresh)
  tickTimer = null
  refreshTimer = null
  visibilityHandler = null
}

export function useStudySchedule() {
  onMounted(start)
  onUnmounted(stop)

  const sessionStartMs = computed(() => Date.parse(session.value?.session_start_at ?? ''))
  const sessionEndMs = computed(() => Date.parse(session.value?.session_end_at ?? ''))
  const sessionOpen = computed(() => Boolean(
    session.value &&
    estimatedServerNow.value >= sessionStartMs.value &&
    estimatedServerNow.value < sessionEndMs.value
  ))
  const beforeSession = computed(() => Boolean(session.value && estimatedServerNow.value < sessionStartMs.value))
  const sessionClosed = computed(() => Boolean(session.value && estimatedServerNow.value >= sessionEndMs.value))
  const remainingSeconds = computed(() => sessionOpen.value
    ? Math.max(0, Math.ceil((sessionEndMs.value - estimatedServerNow.value) / 1000))
    : 0)
  const secondsUntilStart = computed(() => beforeSession.value
    ? Math.max(0, Math.ceil((sessionStartMs.value - estimatedServerNow.value) / 1000))
    : 0)

  return {
    session,
    activities,
    error,
    config: STUDY_CONFIG,
    currentDay: computed(() => session.value?.day_number ?? null),
    currentDayName: computed(() => session.value?.day_name ?? ''),
    sessionOpen,
    sessionClosed,
    beforeSession,
    minutesRemaining: computed(() => Math.floor(remainingSeconds.value / 60)),
    secondsRemaining: computed(() => remainingSeconds.value % 60),
    remainingSeconds,
    secondsUntilStart,
    sessionStart: computed(() => session.value?.session_start ?? STUDY_CONFIG.sessionStart),
    sessionEnd: computed(() => session.value?.session_end ?? STUDY_CONFIG.sessionEnd),
    scheduledActivity: computed(() => session.value?.scheduled_activity ?? null),
    isLearningLocked: computed(() => !sessionOpen.value),
    day1PretestComplete: computed(() => session.value?.day1_pretest_complete === true),
    refresh
  }
}
