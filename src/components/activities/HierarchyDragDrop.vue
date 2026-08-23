<template>
  <div class="activity-card">
    <p class="eyebrow">🧠 Who's Inside Whom?</p>
    <p class="helper">Drag each item into the correct level so the relationship makes sense.</p>

    <div class="drop-area-wrap">
      <div class="drop-column">
        <div class="label">Chromosome</div>
        <div class="drop-zone" @drop.prevent="onDrop('chromosome')" @dragover.prevent>
          <span v-if="!selected.chromosome">Drop here</span>
          <strong v-else>Chromosome</strong>
        </div>
      </div>

      <div class="drop-column">
        <div class="label">DNA</div>
        <div class="drop-zone" @drop.prevent="onDrop('dna')" @dragover.prevent>
          <span v-if="!selected.dna">Drop here</span>
          <strong v-else>DNA</strong>
        </div>
      </div>

      <div class="drop-column">
        <div class="label">Gene</div>
        <div class="drop-zone" @drop.prevent="onDrop('gene')" @dragover.prevent>
          <span v-if="!selected.gene">Drop here</span>
          <strong v-else>Gene</strong>
        </div>
      </div>
    </div>

    <div class="choices">
      <button
        v-for="item in items"
        :key="item.id"
        class="choice-pill"
        draggable="true"
        @dragstart="dragStart(item.id)"
        @click="selected[item.id] = !selected[item.id]"
      >
        {{ item.label }}
      </button>
    </div>

    <p v-if="resultText" class="result-text">{{ resultText }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const items = [
  { id: 'chromosome', label: 'Chromosome' },
  { id: 'dna', label: 'DNA' },
  { id: 'gene', label: 'Gene' }
]

const selected = ref({ chromosome: false, dna: false, gene: false })
const dragged = ref(null)

function dragStart(id) {
  dragged.value = id
}

function onDrop(id) {
  if (!dragged.value) return
  selected.value[dragged.value] = false
  selected.value[id] = true
  dragged.value = null
}

const resultText = computed(() => {
  if (selected.value.chromosome && selected.value.dna && selected.value.gene) {
    return 'Correct! A chromosome contains long DNA, and DNA contains genes.'
  }
  return 'Keep exploring. The correct idea is: chromosome → contains DNA → which contains genes.'
})
</script>

<style scoped>
.activity-card {
  background: linear-gradient(135deg, #f4f7ff, #f8fff9);
  border: 1px solid #dfeaf8;
  border-radius: 22px;
  padding: 18px;
}

.helper {
  color: #51637c;
}

.drop-area-wrap {
  display: grid;
  grid-template-columns: repeat(3, minmax(140px, 1fr));
  gap: 12px;
  margin: 18px 0;
}

.drop-column {
  background: white;
  border: 1px solid #e1e8f6;
  border-radius: 16px;
  padding: 10px;
}

.label {
  font-weight: 800;
  margin-bottom: 8px;
  color: #374863;
}

.drop-zone {
  min-height: 88px;
  border: 2px dashed #d9e2f2;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: #7588a5;
  background: #f8fafc;
}

.choices {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 14px;
}

.choice-pill {
  background: #eef0ff;
  color: #2d3d5b;
  border-radius: 10px;
  padding: 10px 12px;
  font-weight: 800;
}

.result-text {
  margin-top: 14px;
  font-weight: 700;
  color: #2d5d4d;
}
</style>
