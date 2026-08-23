<template>
  <div class="app-shell">
    <aside class="desktop-sidebar">
      <AdminNav />
    </aside>

    <div v-if="isNavOpen" class="nav-backdrop" @click="closeNav"></div>

    <aside :class="['mobile-drawer', { open: isNavOpen }]">
      <AdminNav mobile @close-nav="closeNav" />
    </aside>

    <main class="main-content">
      <TopBar :title="title" @toggle-nav="toggleNav" />
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminNav from './AdminNav.vue'
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
