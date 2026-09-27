<template>
  <StudentShell title="Lesson">
    <InstructionalTopicFlow />
  </StudentShell>
</template>

<script setup>
import InstructionalTopicFlow from '../../components/InstructionalTopicFlow.vue'
import StudentShell from '../../components/StudentShell.vue'
</script>

<style scoped>
.lesson-discussion {
  display: grid;
  gap: 18px;
}

.lesson-discussion :deep(section) {
  background: #f8fbff;
  border: 1px solid #dfe8f5;
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: 0 2px 10px rgba(17, 38, 77, 0.04);
}

.lesson-discussion :deep(h3) {
  margin: 0 0 10px;
  font-size: 1.05rem;
  color: #1c2f4f;
}

.lesson-discussion :deep(p),
.lesson-discussion :deep(li) {
  margin: 0;
  line-height: 1.7;
  color: #304767;
}

.lesson-discussion :deep(.think-box),
.lesson-discussion :deep(.key-box),
.lesson-discussion :deep(.activity-box) {
  background: linear-gradient(135deg, #fef8e7, #f4f7ff);
  border-left: 4px solid #f3bd5e;
  border-radius: 14px;
  padding: 14px 16px;
}

.lesson-discussion :deep(.key-box) {
  background: linear-gradient(135deg, #edf9f0, #eef5ff);
  border-left-color: #44b37f;
}

.lesson-discussion :deep(.activity-box) {
  background: linear-gradient(135deg, #f5f0ff, #eef9ff);
  border-left-color: #8e7dff;
}

.lesson-discussion :deep(.mini-list) {
  margin: 10px 0 0;
  padding-left: 20px;
  display: grid;
  gap: 8px;
}
</style>
