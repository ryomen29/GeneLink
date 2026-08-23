<template>
  <AdminShell title="Overview">
    <div class="page-title">
      <p class="eyebrow">ADMIN CONTROL ROOM 🛡️</p>
      <h1>Welcome back, Admin!</h1>
      <p>Here’s a friendly snapshot of your Explorers’ learning journey.</p>
      <button class="icon-btn" title="Download Excel scores" @click="downloadScores(scores)">⬇️</button>
    </div>

    <div class="stats">
      <div class="stat"><span>👥</span><b>{{ scores.length }}</b><small>Student records</small></div>
      <div class="stat"><span>📝</span><b>{{ activeStudents }}</b><small>Active students</small></div>
      <div class="stat"><span>📈</span><b>{{ average }}%</b><small>Average score</small></div>
      <div class="stat"><span>🏆</span><b>{{ passed }}</b><small>Passing students</small></div>
    </div>

    <section class="panel">
      <div class="section-head">
        <h2>Score monitoring</h2>
        <RouterLink to="/admin/students">Manage students →</RouterLink>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Pre-test</th>
            <th>Final</th>
            <th>Average</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in scores" :key="student.email">
            <td>{{ student.name }}<small>{{ student.email }}</small></td>
            <td>{{ student.pretest }}%</td>
            <td>{{ student.final }}%</td>
            <td><b>{{ student.average }}%</b></td>
            <td><span class="status">{{ student.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </section>
  </AdminShell>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import AdminShell from '../../components/AdminShell.vue'
import { downloadScores } from '../../services/excel'
import { api } from '../../services/api'

const scores = ref([])
const activeStudents = computed(() => scores.value.length)

const average = computed(() => {
  if (!scores.value.length) return 0
  const total = scores.value.reduce((sum, item) => sum + Number(item.average || 0), 0)
  return Math.round(total / scores.value.length)
})

const passed = computed(() => scores.value.filter((item) => Number(item.final || 0) >= 75).length)

onMounted(async () => {
  try {
    const rows = await api.getAdminScores()
    scores.value = rows.map((student) => ({
      name: student.full_name,
      email: student.email,
      pretest: Number(student.pretest || 0),
      final: Number(student.final || 0),
      average: Number(student.average || 0),
      status: student.status || 'On track'
    }))
  } catch (error) {
    console.error('Admin score fetch failed:', error)
    scores.value = []
  }
})
</script>
