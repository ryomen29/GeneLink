<template>
  <header class="desktop-header">
    <div class="desktop-header-title">{{ title }}</div>
    <div class="hello">Good {{ partOfDay }}, Explorer! ✨</div>
  </header>

  <header class="mobile-header">
    <button class="menu-button" @click="$emit('toggle-nav')" aria-label="Open navigation">
      ☰
    </button>
    <div class="mobile-brand">
      <span class="brand-icon">🧬</span>
      <span>GENELInK</span>
    </div>
    <div class="mobile-badge">✨</div>
  </header>
</template>

<script setup>
defineProps({ title: String })
const hour = new Date().getHours()
const partOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'
</script>
