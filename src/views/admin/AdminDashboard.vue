<template>
  <AdminShell title="Overview">
    <div class="page-title"><p class="eyebrow">ADMIN CONTROL ROOM 🛡️</p><h1>Welcome back, Admin!</h1><p>Here’s a friendly snapshot of your Explorers’ learning journey.</p><button class="icon-btn" title="Download Excel scores" @click="downloadScores(scores)">⬇️</button></div>
    <div class="stats"><div class="stat"><span>👥</span><b>{{ scores.length }}</b><small>Student score records</small></div><div class="stat"><span>📝</span><b>{{ scores.length }}</b><small>Score records</small></div><div class="stat"><span>📈</span><b>{{ average }}%</b><small>Average final score</small></div><div class="stat"><span>🏆</span><b>{{ passed }}</b><small>Students passing</small></div></div>
    <section class="panel"><div class="section-head"><h2>Score monitoring</h2><RouterLink to="/admin/students">Manage students →</RouterLink></div><table><thead><tr><th>Student</th><th>Pre-test</th><th>Final</th><th>Average</th><th>Status</th></tr></thead><tbody><tr v-for="student in scores" :key="student.email"><td>{{ student.name }}<small>{{ student.email }}</small></td><td>{{ student.pretest }}%</td><td>{{ student.final }}%</td><td><b>{{ student.average }}%</b></td><td><span class="status">{{ student.status }}</span></td></tr></tbody></table></section>
  </AdminShell>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminShell from '../../components/AdminShell.vue'
import { downloadScores } from '../../services/excel'

const scores = ref([
  { name: 'Sample Explorer', email: 'student@example.com', pretest: 60, final: 86, average: 73, status: 'On track' },
  { name: 'Alex Rivera', email: 'alex@example.com', pretest: 80, final: 92, average: 86, status: 'Excellent' },
  { name: 'Jamie Cruz', email: 'jamie@example.com', pretest: 40, final: 68, average: 54, status: 'Needs support' }
])
const average = computed(() => Math.round(scores.value.reduce((total, item) => total + item.average, 0) / scores.value.length))
const passed = computed(() => scores.value.filter((item) => item.final >= 75).length)
</script>
