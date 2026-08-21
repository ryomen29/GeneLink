<template>
  <div class="app-shell">
    <StudentNav />
    <main class="main"><TopBar :title="title" /><slot /></main>
  </div>
</template>

<script setup>
import StudentNav from './StudentNav.vue'
import TopBar from './TopBar.vue'
defineProps({ title: String })
</script>
