import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'

import StudentDashboard from '../views/student/StudentDashboard.vue'
import LessonsView from '../views/student/LessonsView.vue'
import LessonView from '../views/student/LessonView.vue'
import PreTestView from '../views/student/PreTestView.vue'
import FinalExamView from '../views/student/FinalExamView.vue'

import AdminDashboard from '../views/admin/AdminDashboard.vue'
import StudentAccountsView from '../views/admin/StudentAccountsView.vue'

import { auth } from '../services/auth'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    component: LoginView,
    meta: { guestOnly: true }
  },

  {
    path: '/register',
    component: RegisterView,
    meta: { guestOnly: true }
  },

  {
    path: '/student',
    component: StudentDashboard,
    meta: {
      requiresAuth: true,
      role: 'student'
    }
  },

  {
    path: '/student/profile',
    component: () => import('../views/student/ProfileView.vue'),
    meta: {
      requiresAuth: true,
      role: 'student'
    }
  },

  {
    path: '/student/lessons',
    component: LessonsView,
    meta: {
      requiresAuth: true,
      role: 'student'
    }
  },

  {
    path: '/student/lesson/:id',
    component: LessonView,
    meta: {
      requiresAuth: true,
      role: 'student'
    }
  },

  {
    path: '/student/pretest/:id',
    component: PreTestView,
    meta: {
      requiresAuth: true,
      role: 'student'
    }
  },

  {
    path: '/student/final-exam',
    component: FinalExamView,
    meta: {
      requiresAuth: true,
      role: 'student'
    }
  },

  {
    path: '/admin',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  },

  {
    path: '/admin/students',
    component: StudentAccountsView,
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  try {
    const account = await auth.getCurrentUser()

    // 1. User is not logged in but tries to access
    // a protected page.
    if (to.meta.requiresAuth && !account?.user) {
      return '/login'
    }

    // 2. Logged-in user does not have a profile.
    // Send them to login instead of endlessly redirecting.
    if (to.meta.requiresAuth && account?.user && !account?.profile) {
      console.error('User is authenticated but has no profile.')

      return '/login'
    }

    // 3. Check if the user's role matches the route.
    if (
      to.meta.requiresAuth &&
      to.meta.role &&
      account?.profile
    ) {
      const userRole = account.profile.role
      const requiredRole = to.meta.role

      if (userRole !== requiredRole) {
        // Only redirect if we are NOT already
        // on that user's correct dashboard.
        if (userRole === 'admin') {
          if (to.path !== '/admin') {
            return '/admin'
          }
        }

        if (userRole === 'student') {
          if (to.path !== '/student') {
            return '/student'
          }
        }

        // Unknown role.
        return '/login'
      }
    }

    // 4. Logged-in users should not stay on
    // Login or Register pages.
    if (to.meta.guestOnly && account?.profile) {
      if (account.profile.role === 'admin') {
        return '/admin'
      }

      if (account.profile.role === 'student') {
        return '/student'
      }
    }

    // Allow navigation.
    return true
  } catch (error) {
    console.error('Router navigation guard error:', error)

    // If authentication checking itself fails,
    // only redirect protected pages to login.
    if (to.meta.requiresAuth) {
      return '/login'
    }

    return true
  }
})

export default router