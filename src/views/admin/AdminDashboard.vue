<template>
  <AdminShell title="Overview">
    <div class="page-title">
      <p class="eyebrow">
        TEACHER CONTROL ROOM 🛡️
      </p>

      <h1>
        Welcome back, Teacher!
      </h1>

      <p>
        Here’s a friendly snapshot of your
        Explorers’ learning journey.
      </p>

      <button
        class="icon-btn"
        type="button"
        title="Download Excel scores"
        @click="downloadScores(scores)"
      >
        ⬇️
      </button>
    </div>

    <!-- Loading state -->
    <div
      v-if="loading"
      class="panel"
    >
      <p>
        Loading student scores... 📊
      </p>
    </div>

    <!-- Error state -->
    <div
      v-else-if="errorMessage"
      class="panel"
    >
      <h2>
        Unable to load scores
      </h2>

      <p>
        {{ errorMessage }}
      </p>

      <button
        class="primary"
        type="button"
        @click="loadScores"
      >
        Try again
      </button>
    </div>

    <!-- Dashboard -->
    <template v-else>

      <!-- Statistics -->
      <div class="stats">

        <div class="stat">
          <span>👥</span>

          <b>
            {{ scores.length }}
          </b>

          <small>
            Student records
          </small>
        </div>

        <div class="stat">
          <span>📝</span>

          <b>
            {{ activeStudents }}
          </b>

          <small>
            Active students
          </small>
        </div>

        <div class="stat">
          <span>📈</span>

          <b>
            {{ average }}%
          </b>

          <small>
            Average score
          </small>
        </div>

        <div class="stat">
          <span>🏆</span>

          <b>
            {{ passed }}
          </b>

          <small>
            Passing students
          </small>
        </div>

      </div>

      <!-- Score monitoring -->
      <section class="panel">

        <div class="section-head">

          <h2>
            Score monitoring
          </h2>

          <RouterLink
            to="/admin/students"
          >
            Manage students →
          </RouterLink>

        </div>

        <!-- No students -->
        <div
          v-if="!scores.length"
          class="empty-state"
        >
          <div>
            📚
          </div>

          <h3>
            No student records yet
          </h3>

          <p>
            Student scores will appear here
            once students complete their
            assessments.
          </p>
        </div>

        <!-- Scores table -->
        <div
          v-else
          class="table-wrap"
        >

          <table>

            <thead>
              <tr>
                <th>
                  Student
                </th>

                <th>
                  Pre-test
                </th>

                <th>
                  Final
                </th>

                <th>
                  Average
                </th>

                <th>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              <tr
                v-for="student in scores"
                :key="
                  student.studentId ||
                  student.email
                "
              >

                <td>
                  <strong>
                    {{ student.name }}
                  </strong>

                  <small>
                    {{ student.email }}
                  </small>
                </td>

                <td>
                  {{ student.pretest }}%
                </td>

                <td>
                  <strong>
                    {{ student.final }}%
                  </strong>
                </td>

                <td>
                  <b>
                    {{ student.average }}%
                  </b>
                </td>

                <td>
                  <span
                    class="status"
                    :class="
                      getStatusClass(
                        student.status
                      )
                    "
                  >
                    {{ student.status }}
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </template>
  </AdminShell>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref
} from 'vue'

import AdminShell
  from '../../components/AdminShell.vue'

import {
  downloadScores
} from '../../services/excel'

import {
  api
} from '../../services/api'

const scores = ref([])

const loading = ref(true)

const errorMessage = ref('')

/*
 * Number of student records.
 */
const activeStudents = computed(() => {
  return scores.value.length
})

/*
 * Average of all student averages.
 */
const average = computed(() => {
  if (!scores.value.length) {
    return 0
  }

  const total =
    scores.value.reduce(
      (sum, student) =>
        sum +
        Number(
          student.average || 0
        ),
      0
    )

  return Math.round(
    total / scores.value.length
  )
})

/*
 * Students with a final exam
 * score of 75% or higher.
 */
const passed = computed(() => {
  return scores.value.filter(
    (student) =>
      Number(
        student.final || 0
      ) >= 75
  ).length
})

/*
 * Status styling helper.
 */
function getStatusClass(status) {
  if (status === 'Excellent') {
    return 'excellent'
  }

  if (status === 'On track') {
    return 'on-track'
  }

  if (status === 'Needs support') {
    return 'needs-support'
  }

  return ''
}

/*
 * Load scores from Supabase.
 */
async function loadScores() {
  loading.value = true
  errorMessage.value = ''

  try {
    const rows =
      await api.getAdminScores()

    console.log(
      'Admin scores received:',
      rows
    )

    if (!Array.isArray(rows)) {
      throw new Error(
        'The score service returned invalid data.'
      )
    }

    scores.value = rows.map(
      (student) => ({
        studentId:
          student.student_id,

        name:
          student.full_name ||
          'Unknown student',

        email:
          student.email || '',

        pretest:
          Number(
            student.pretest || 0
          ),

        final:
          Number(
            student.final || 0
          ),

        average:
          Number(
            student.average || 0
          ),

        status:
          student.status ||
          'Needs support'
      })
    )

    console.log(
      'Admin scores mapped:',
      scores.value
    )

  } catch (error) {

    console.error(
      'Admin score fetch failed:',
      error
    )

    errorMessage.value =
      error?.message ||
      'We could not load the student scores. Please try again.'

    scores.value = []

  } finally {

    loading.value = false

  }
}

/*
 * Load scores when the page opens.
 */
onMounted(() => {
  loadScores()
})
</script>