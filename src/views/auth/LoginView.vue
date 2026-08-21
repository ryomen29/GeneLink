<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="logo-big">🧬</div>

      <h1>Welcome to GENELInK!</h1>
      <p class="muted">Choose your doorway, Explorer.</p>

      <div class="login-tabs">
        <button
          :class="{ active: role === 'student' }"
          @click="role = 'student'"
        >
          🎒 Student
        </button>

        <button
          :class="{ active: role === 'admin' }"
          @click="role = 'admin'"
        >
          🛡️ Admin
        </button>
      </div>

      <form @submit.prevent="login">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />

        <button
          class="primary wide"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Opening your lab…' : 'Let’s Explore 🚀' }}
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>

      <p v-if="role === 'student'" class="switch">
        New Explorer?
        <RouterLink to="/register">Create a student account</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../../services/auth'

const router = useRouter()

const role = ref('student')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  error.value = ''
  loading.value = true

  try {
    const result = await auth.login({
      email: email.value,
      password: password.value,
      role: role.value
    })

    await router.push(result.profile.role === 'admin' ? '/admin' : '/student')
  } catch (err) {
    error.value = err.message || 'We could not log you in. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
