<template>
  <div class="activity-card">
    <p class="eyebrow">🌱 Punnett Square Explorer</p>
    <div class="controls">
      <label>
        Parent 1
        <select v-model="parent1">
          <option value="AA">AA</option>
          <option value="Aa">Aa</option>
          <option value="aa">aa</option>
        </select>
      </label>

      <label>
        Parent 2
        <select v-model="parent2">
          <option value="AA">AA</option>
          <option value="Aa">Aa</option>
          <option value="aa">aa</option>
        </select>
      </label>
    </div>

    <div class="square-wrap">
      <table class="punnett-table">
        <tbody>
          <tr>
            <th></th>
            <th v-for="allele in parent2Split" :key="allele">{{ allele }}</th>
          </tr>
          <tr v-for="(rowAllele, rowIndex) in parent1Split" :key="rowAllele + rowIndex">
            <th>{{ rowAllele }}</th>
            <td v-for="(colAllele, colIndex) in parent2Split" :key="`${rowAllele}-${colAllele}-${colIndex}`">
              {{ combine(rowAllele, colAllele) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="results">
      <div v-for="item in results" :key="item.label" class="result-chip">
        <strong>{{ item.label }}</strong>
        <span>{{ item.percent }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const parent1 = ref('Aa')
const parent2 = ref('Aa')

const parent1Split = computed(() => parent1.value.split(''))
const parent2Split = computed(() => parent2.value.split(''))

function combine(a, b) {
  return `${a}${b}`
}

const results = computed(() => {
  const combinations = []
  for (const a of parent1Split.value) {
    for (const b of parent2Split.value) {
      combinations.push(`${a}${b}`)
    }
  }

  const counts = { AA: 0, Aa: 0, aa: 0 }
  combinations.forEach((combo) => {
    if (combo === 'AA') counts.AA += 1
    else if (combo === 'Aa' || combo === 'aA') counts.Aa += 1
    else counts.aa += 1
  })

  return [
    { label: 'AA', percent: (counts.AA / combinations.length) * 100 },
    { label: 'Aa', percent: (counts.Aa / combinations.length) * 100 },
    { label: 'aa', percent: (counts.aa / combinations.length) * 100 }
  ]
})
</script>

<style scoped>
.activity-card {
  background: linear-gradient(135deg, #f7fff4, #f5f2ff);
  border: 1px solid #dfeaf2;
  border-radius: 20px;
  padding: 18px;
}

.controls {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 14px 0;
}

.controls label {
  display: grid;
  gap: 6px;
  font-weight: 800;
  color: #334765;
}

.controls select {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #dfeaf2;
  background: white;
}

.square-wrap {
  overflow-x: auto;
}

.punnett-table {
  width: 100%;
  max-width: 300px;
  border-collapse: collapse;
  margin-top: 10px;
}

.punnett-table th,
.punnett-table td {
  border: 1px solid #dfeaf2;
  width: 70px;
  height: 60px;
  text-align: center;
  font-weight: 800;
  background: white;
}

.results {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.result-chip {
  background: white;
  border-radius: 12px;
  border: 1px solid #dfeaf2;
  padding: 8px 12px;
  display: flex;
  gap: 8px;
  font-weight: 700;
}
</style>
