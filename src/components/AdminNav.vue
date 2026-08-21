<template>
  <aside class="side-nav">
    <div class="brand">🧬 <span>GENELInK Admin</span></div>
    <nav>
      <RouterLink to="/admin">📊 Overview</RouterLink>
      <RouterLink to="/admin/students">👥 Students</RouterLink>
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
