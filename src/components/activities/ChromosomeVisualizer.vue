<template>
  <div class="activity-card">
    <p class="eyebrow">🧫 Pack the DNA!</p>
    <div class="visual-flow">
      <div
        v-for="(stage, index) in stages"
        :key="stage.label"
        class="stage"
        :class="{ active: index === currentStep, done: index < currentStep }"
      >
        <span>{{ stage.icon }}</span>
        <strong>{{ stage.label }}</strong>
      </div>
    </div>

    <div class="stage-detail">
      <h4>{{ currentStage.label }}</h4>
      <p>{{ currentStage.text }}</p>
    </div>

    <button class="primary inline" @click="nextStep">
      {{ currentStep === stages.length - 1 ? 'Review again' : 'Next step' }}
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const stages = [
  { icon: '🧬', label: 'DNA', text: 'DNA is a long molecule carrying genetic information.' },
  { icon: '🧵', label: 'DNA + proteins', text: 'DNA wraps around proteins to help it fit in the nucleus.' },
  { icon: '🧶', label: 'Chromatin', text: 'The DNA and proteins fold into a more compact structure.' },
  { icon: '🧬', label: 'Chromosome', text: 'Chromosomes are the highly organized form of DNA seen during cell division.' }
]

const currentStep = ref(0)
const currentStage = computed(() => stages[currentStep.value])

function nextStep() {
  currentStep.value = currentStep.value === stages.length - 1 ? 0 : currentStep.value + 1
}
</script>

<style scoped>
.activity-card {
  background: linear-gradient(135deg, #fff9ee, #f1f7ff);
  border: 1px solid #e5ebf7;
  border-radius: 22px;
  padding: 18px;
}

.visual-flow {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 10px;
  margin: 20px 0;
}

.stage {
  border-radius: 16px;
  padding: 16px 12px;
  border: 1px solid #deebf7;
  background: #fff;
  text-align: center;
  transition: transform 0.2s ease, border 0.2s ease;
}

.stage.active {
  border-color: #7c6df8;
  background: #f1efff;
  transform: translateY(-2px);
}

.stage.done {
  background: #e8fff4;
}

.stage span {
  display: block;
  font-size: 32px;
  margin-bottom: 8px;
}

.stage-detail {
  margin: 14px 0 18px;
  background: #fff;
  border-radius: 14px;
  padding: 14px 16px;
}
</style>
