import { supabase } from '../lib/supabaseClient'

export const aiService = {
  async sendMessage(message, context = {}) {
    const functionName = import.meta.env.VITE_SUPABASE_AI_FUNCTION || 'ai-tutor'

    const { data, error } = await supabase.functions.invoke(functionName, {
      body: {
        message,
        context: {
          lessonId: context.lessonId ?? null,
          topicId: context.topicId ?? null,
          lessonTitle: context.lessonTitle ?? null,
          topicTitle: context.topicTitle ?? null,
          assessmentState: context.assessmentState ?? 'lesson',
          conversationId: context.conversationId ?? null
        }
      }
    })

    if (error) {
      console.error('AI tutor service error:', error)
      throw new Error('Oops! I’m having a tiny brain break right now 🥺✨ Please try again in a moment.')
    }

    if (!data?.answer?.trim()) {
      throw new Error('Oops! I’m having a tiny brain break right now 🥺✨ Please try again in a moment.')
    }

    return data
  }
}
