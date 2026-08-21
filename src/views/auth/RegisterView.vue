<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="logo-big">🎒</div>

      <h1>Join the Explorer Crew!</h1>
      <p class="muted">
        Your learning adventure starts here.
      </p>

      <form @submit.prevent="register">
        <input
          v-model="name"
          placeholder="Full name"
          required
        />

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Create password"
          minlength="6"
          required
        />

        <button
          class="primary wide"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Creating your account…' : 'Create My Account ✨' }}
        </button>
      </form>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>

      <p class="switch">
        Already registered?
        <RouterLink to="/login">Back to login</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../../services/auth'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const message = ref('')

async function register() {
  error.value = ''
  message.value = ''
  loading.value = true

  try {
    const data = await auth.registerStudent({
      name: name.value,
      email: email.value,
      password: password.value
    })

    if (!data.session) {
      message.value =
        'Account created! 📩 Check your email to confirm your account, then come back to log in.'
    } else {
      await router.push('/student')
    }
  } catch (err) {
    error.value = err.message || 'We could not create your account.'
  } finally {
    loading.value = false
  }
}
</script>
