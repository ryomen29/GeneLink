import { supabase } from '../lib/supabaseClient'

export const aiService = {
  async ask({ message, topicId, lessonId, conversationId }) {
    const functionName = import.meta.env.VITE_SUPABASE_AI_FUNCTION || 'ai-tutor'

    const { data, error } = await supabase.functions.invoke(functionName, {
      body: {
        message,
        topicId,
        lessonId,
        conversationId
      }
    })

    if (error) throw error
    return data
  }
}
