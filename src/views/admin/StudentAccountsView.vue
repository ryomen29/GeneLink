<template>
  <AdminShell title="Student Accounts">
    <div class="page-title"><p class="eyebrow">EXPLORER ROSTER 👥</p><h1>Student accounts</h1><p>Review accounts and remove one when necessary.</p></div>
    <section class="panel"><table><thead><tr><th>Name</th><th>Email</th><th>Action</th></tr></thead><tbody><tr v-for="student in students" :key="student.email"><td>{{ student.name }}</td><td>{{ student.email }}</td><td><button class="danger-btn" @click="remove(student.email)">🗑️ Delete</button></td></tr></tbody></table></section>
  </AdminShell>
</template>

<script setup>
import { ref } from 'vue'
import AdminShell from '../../components/AdminShell.vue'

const students = ref([
  { name: 'Sample Explorer', email: 'student@example.com' },
  { name: 'Alex Rivera', email: 'alex@example.com' },
  { name: 'Jamie Cruz', email: 'jamie@example.com' }
])
function remove(email) {
  if (confirm('Delete this student account?')) students.value = students.value.filter((student) => student.email !== email)
}
</script>
