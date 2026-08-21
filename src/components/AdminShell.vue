<template>
  <div class="app-shell">
    <AdminNav />
    <main class="main"><TopBar :title="title" /><slot /></main>
  </div>
</template>

<script setup>
import AdminNav from './AdminNav.vue'
import TopBar from './TopBar.vue'
defineProps({ title: String })
</script>
