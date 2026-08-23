<template>
  <div class="progress-track" aria-label="Progress">
    <span :style="{ width: `${clampedPercent}%` }" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 100
  }
})

const clampedPercent = computed(() => {
  if (!props.total) return 0
  return Math.min(100, Math.max(0, (props.value / props.total) * 100))
})
</script>

<style scoped>
.progress-track {
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: #edf1f8;
  overflow: hidden;
}

.progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #7c6df8, #4ad0a7);
  transition: width 0.25s ease;
}
</style>
