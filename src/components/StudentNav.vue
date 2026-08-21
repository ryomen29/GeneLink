<template>
  <aside class="side-nav">
    <div class="brand">🧬 <span>GENELInK</span></div>
    <nav>
      <RouterLink to="/student">🏠 Home</RouterLink>
      <RouterLink to="/student/profile">👤 My Profile</RouterLink>
      <RouterLink to="/student/lessons">📚 Lessons</RouterLink>
      <RouterLink to="/student/final-exam">🏆 Final Exam</RouterLink>
    </nav>
    <button class="logout" @click="logout">↪ Log out</button>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { auth } from '../services/auth'

const router = useRouter()
function logout() { auth.logout(); router.push('/login') }
</script>
