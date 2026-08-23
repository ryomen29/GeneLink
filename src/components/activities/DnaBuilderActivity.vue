<template>
  <div class="activity-card">
    <p class="eyebrow">🧬 Build-a-DNA</p>
    <p class="helper">Match each DNA base with its partner. Remember: A pairs with T, and C pairs with G.</p>

    <div class="strand-row">
      <div class="strand-label">Original strand</div>
      <div class="base-list">
        <button
          v-for="(base, index) in leftStrand"
          :key="`${base}-${index}`"
          class="base-pill"
          :class="{ selected: selectedIndex === index }"
          @click="selectedIndex = index"
        >
          {{ base }}
        </button>
      </div>
    </div>

    <div class="strand-row">
      <div class="strand-label">Complement</div>
      <div class="base-list">
        <button
          v-for="(base, index) in rightStrand"
          :key="`${base}-${index}`"
          class="base-pill partner"
          :class="{ correct: isCorrect(index), wrong: isWrong(index) }"
          @click="choosePartner(index)"
        >
          {{ base }}
        </button>
      </div>
    </div>

    <div class="answer-row">
      <strong>Base pairing rule:</strong>
      <span>A ↔ T</span>
      <span>C ↔ G</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const leftStrand = ref(['A', 'T', 'C', 'G', 'A'])
const rightStrand = ref(['T', 'A', 'G', 'C', 'T'])
const selectedIndex = ref(0)
const clickedIndex = ref(null)

const pairingMap = {
  A: 'T',
  T: 'A',
  C: 'G',
  G: 'C'
}

const isCorrect = (index) => {
  const expected = pairingMap[leftStrand.value[index]]
  return rightStrand.value[index] === expected && clickedIndex.value === index
}

const isWrong = (index) => {
  const expected = pairingMap[leftStrand.value[index]]
  return rightStrand.value[index] !== expected && clickedIndex.value === index
}

function choosePartner(index) {
  clickedIndex.value = index
  const targetBase = leftStrand.value[selectedIndex.value]
  const nextValue = pairingMap[targetBase]
  rightStrand.value[index] = nextValue
}

const completed = computed(() => {
  return rightStrand.value.every((base, index) => base === pairingMap[leftStrand.value[index]])
})

defineExpose({ completed })
</script>

<style scoped>
.activity-card {
  background: linear-gradient(135deg, #effef8, #f6f0ff);
  border: 1px solid #dfe8f5;
  border-radius: 20px;
  padding: 18px;
}

.helper {
  color: #53627b;
  margin: 0 0 14px;
}

.strand-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.strand-label {
  min-width: 120px;
  font-weight: 800;
  color: #334765;
}

.base-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.base-pill {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: 1px solid #d9e4f5;
  background: white;
  font-weight: 900;
  color: #2d3c53;
}

.base-pill.selected {
  background: #e6ecff;
  border-color: #7c6df8;
}

.base-pill.partner.correct {
  background: #dffaf2;
  border-color: #2fb57f;
}

.base-pill.partner.wrong {
  background: #ffe7ec;
  border-color: #e15d7d;
}

.answer-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  font-weight: 700;
  color: #384d69;
}
</style>
