<template>
  <div class="side-nav">
    <div class="nav-top">
      <div class="brand">
        <span class="brand-icon">🧬</span>
        <span class="brand-text">GENELInK</span>
      </div>

      <button v-if="mobile" class="nav-close" @click="$emit('close-nav')" aria-label="Close navigation">
        ✕
      </button>
    </div>

    <nav>
      <RouterLink to="/student" @click="closeDrawerIfNeeded">
        <span class="nav-icon">🏠</span>
        <span class="nav-label">Home</span>
      </RouterLink>
      <RouterLink to="/student/profile" @click="closeDrawerIfNeeded">
        <span class="nav-icon">👤</span>
        <span class="nav-label">My Profile</span>
      </RouterLink>
      <RouterLink to="/student/lessons" @click="closeDrawerIfNeeded">
        <span class="nav-icon">📚</span>
        <span class="nav-label">Lessons</span>
      </RouterLink>
      <RouterLink to="/student/final-exam" @click="closeDrawerIfNeeded">
        <span class="nav-icon">🏆</span>
        <span class="nav-label">Final Exam</span>
      </RouterLink>
    </nav>

    <button class="logout" @click="logout">
      <span class="nav-icon">↪</span>
      <span class="logout-text">Log out</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { auth } from '../services/auth'

const props = defineProps({
  mobile: { type: Boolean, default: false }
})
const emit = defineEmits(['close-nav'])
const router = useRouter()

function closeDrawerIfNeeded() {
  if (props.mobile) emit('close-nav')
}

function logout() {
  if (props.mobile) emit('close-nav')
  auth.logout(); router.push('/login')
}
</script>
