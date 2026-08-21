<template>
  <header class="topbar">
    <div><strong>GENELInK</strong><span class="crumb">{{ title }}</span></div>
    <div class="hello">Good {{ partOfDay }}, Explorer! ✨</div>
  </header>
</template>

<script setup>
defineProps({ title: String })
const hour = new Date().getHours()
const partOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'
</script>
