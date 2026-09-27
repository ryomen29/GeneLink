<template>
  <div class="app-shell">
    <aside class="desktop-sidebar">
      <StudentNav />
    </aside>

    <div v-if="isNavOpen" class="nav-backdrop" @click="closeNav"></div>

    <aside :class="['mobile-drawer', { open: isNavOpen }]">
      <StudentNav mobile @close-nav="closeNav" />
    </aside>

    <main class="main-content">
      <TopBar :title="title" @toggle-nav="toggleNav" />
      <StudyScheduleBanner />
      <section v-if="showScheduledLock" class="scheduled-lock" role="alert" aria-labelledby="scheduled-lock-title">
        <span class="lock-icon" aria-hidden="true">🔒</span>
        <div>
          <h1 id="scheduled-lock-title">{{ lockTitle }}</h1>
          <p>{{ lockMessage }}</p>
          <RouterLink class="secondary inline" to="/student">Return to Dashboard</RouterLink>
          <RouterLink class="schedule-lessons-link" to="/student/lessons">View the weekly schedule</RouterLink>
        </div>
      </section>
      <slot v-else />
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import StudentNav from './StudentNav.vue'
import TopBar from './TopBar.vue'
import StudyScheduleBanner from './StudyScheduleBanner.vue'
import { useStudySchedule } from '../composables/useStudySchedule'
import { studyScheduleService } from '../services/studySchedule'

defineProps({ title: String })

const isNavOpen = ref(false)
const route = useRoute()
const schedule = useStudySchedule()
const scheduledRouteActivity = computed(() => route.meta.scheduledActivity || null)
const routeMatchesToday = computed(() => studyScheduleService.matchesScheduledActivity(
  schedule.session.value,
  scheduledRouteActivity.value,
  route.params.id ?? null
))
const showScheduledLock = computed(() => {
  if (!scheduledRouteActivity.value) return false
  return Boolean(schedule.error.value || !schedule.session.value || !schedule.sessionOpen.value || !routeMatchesToday.value)
})
const lockTitle = computed(() => {
  if (schedule.error.value || !schedule.session.value) return '🔒 Schedule could not be verified'
  if (schedule.beforeSession.value) return '🔒 This session has not opened yet'
  if (schedule.sessionClosed.value) return "🔒 Today's learning session has ended"
  return '🔒 This activity is scheduled for another day'
})
const lockMessage = computed(() => {
  if (schedule.error.value || !schedule.session.value) return 'GENELInK could not confirm the server schedule. Learning content stays locked until the schedule is available.'
  if (schedule.beforeSession.value) return `Today's activity opens at ${schedule.sessionStart.value} ${schedule.config.timezone}.`
  if (schedule.sessionClosed.value) return `Today's ${schedule.sessionStart.value}–${schedule.sessionEnd.value} session is closed. The next day's activity opens at ${schedule.sessionStart.value}.`
  return `Today's scheduled activity is ${schedule.scheduledActivity.value?.title || 'listed on the Dashboard'}. Other learning activities remain locked.`
})

function toggleNav() {
  isNavOpen.value = !isNavOpen.value
}

function closeNav() {
  isNavOpen.value = false
}
</script>

<style scoped>
.scheduled-lock {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  max-width: 900px;
  margin: 34px auto;
  padding: 28px;
  border: 1px solid #e5d5b5;
  border-radius: 22px;
  background: #fffaf0;
  color: #4d5360;
}
.lock-icon { font-size: 2rem; }
.scheduled-lock h1 { margin: 0 0 8px; color: #39475d; font-size: 1.45rem; }
.scheduled-lock p { margin: 0 0 18px; line-height: 1.6; }
.schedule-lessons-link { display: inline-block; margin-left: 14px; color: #5142a9; font-weight: 800; }
@media (max-width: 767px) { .scheduled-lock { margin: 24px 14px; padding: 20px; } }
</style>
