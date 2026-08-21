import { supabase } from '../lib/supabaseClient'

export const auth = {
  async registerStudent({ name, email, password }) {
    const cleanEmail = email.trim().toLowerCase()

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: name,
          role: 'student'
        }
      }
    })

    if (error) {
      console.error('REGISTRATION ERROR:', error)
      throw new Error(error.message)
    }

    // A database trigger creates the public profile automatically.
    return data
  },

  async login({ email, password, role }) {
    // Clean the email before logging in.
    const cleanEmail = email.trim().toLowerCase()

    // Step 1: Authenticate using Supabase Auth.
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password
    })

    // These will help us see the REAL Supabase response.
    console.log('LOGIN DATA:', data)
    console.log('LOGIN ERROR:', error)

    if (error) {
      throw new Error(`Login failed: ${error.message}`)
    }

    // Step 2: Get the user's profile.
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, created_at')
      .eq('id', data.user.id)
      .single()

    if (profileError) {
      console.error('PROFILE LOOKUP FAILED:', profileError)

      await supabase.auth.signOut()

      throw new Error(`Profile error: ${profileError.message}`)
    }

    // Step 3: Make sure the account is using the correct login type.
    if (profile.role !== role) {
      await supabase.auth.signOut()

      throw new Error(
        `This account is not registered as a ${role}.`
      )
    }

    // Everything is successful.
    return {
      user: data.user,
      profile,
      session: data.session
    }
  },

  async getCurrentUser() {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, created_at')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('GET CURRENT USER PROFILE ERROR:', error)
      return {
        user,
        profile: null
      }
    }

    return {
      user,
      profile
    }
  },

  async logout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('LOGOUT ERROR:', error)
      throw new Error(error.message)
    }
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}