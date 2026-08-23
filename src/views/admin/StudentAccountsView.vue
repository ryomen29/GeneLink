<template>
  <AdminShell title="Student Accounts">
    <div class="page-title">
      <p class="eyebrow">EXPLORER ROSTER 👥</p>
      <h1>Student accounts</h1>
      <p>Review accounts and remove one when necessary.</p>
    </div>

    <section class="panel">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.full_name }}</td>
            <td>{{ student.email }}</td>
            <td><button class="danger-btn" @click="remove(student.id)">🗑️ Delete</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  </AdminShell>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AdminShell from '../../components/AdminShell.vue'
import { api } from '../../services/api'

const students = ref([])

onMounted(async () => {
  try {
    students.value = await api.getAdminStudents()
  } catch (error) {
    console.error('Student roster fetch failed:', error)
  }
})

async function remove(studentId) {
  if (!confirm('Delete this student account?')) return

  try {
    await api.deleteStudent(studentId)
    students.value = students.value.filter((student) => student.id !== studentId)
  } catch (error) {
    console.error('Student deletion failed:', error)
    alert('This student could not be deleted. Check the admin permissions and try again.')
  }
}
</script>
