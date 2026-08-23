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
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StudentNav from './StudentNav.vue'
import TopBar from './TopBar.vue'

defineProps({ title: String })

const isNavOpen = ref(false)

function toggleNav() {
  isNavOpen.value = !isNavOpen.value
}

function closeNav() {
  isNavOpen.value = false
}
</script>
