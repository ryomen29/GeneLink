  import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type'
  }

  const friendlyError = 'Oops! I’m having a tiny brain break right now 🥺✨ Please try again in a moment.'
  const assessmentStates = new Set([
    'lesson',
    'pretest_active',
    'pretest_completed',
    'final_exam_active',
    'final_exam_completed'
  ])

  function jsonResponse(body: Record<string, unknown>, status = 200) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!
      const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
      const aiApiKey = Deno.env.get('AI_API_KEY')

      if (!aiApiKey) {
        console.error('AI_API_KEY is not configured in Supabase secrets.')
        return jsonResponse({ error: friendlyError }, 500)
      }

      const userClient = createClient(supabaseUrl, anonKey, {
        global: {
          headers: {
            Authorization: req.headers.get('Authorization') ?? ''
          }
        }
      })

      const {
        data: { user },
        error: userError
      } = await userClient.auth.getUser()

      if (userError || !user) {
        return jsonResponse({ error: 'Please log in first.' }, 401)
      }

      const body = await req.json()
      const message = typeof body?.message === 'string' ? body.message.trim() : ''
      const rawContext = body?.context && typeof body.context === 'object' ? body.context : {}
      const lessonId = Number.isInteger(rawContext.lessonId) ? rawContext.lessonId : null
      const topicId = Number.isInteger(rawContext.topicId) ? rawContext.topicId : null
      const lessonTitle = typeof rawContext.lessonTitle === 'string' ? rawContext.lessonTitle.slice(0, 160) : null
      const topicTitle = typeof rawContext.topicTitle === 'string' ? rawContext.topicTitle.slice(0, 160) : null
      const assessmentState = assessmentStates.has(rawContext.assessmentState)
        ? rawContext.assessmentState
        : 'lesson'
      const conversationId = typeof rawContext.conversationId === 'string'
        ? rawContext.conversationId
        : null

      if (!message || message.length > 2000) {
        return jsonResponse({ error: 'Please enter a shorter question to continue.' }, 400)
      }

      let conversation = conversationId

      if (!conversation) {
        const { data, error } = await userClient
          .from('ai_conversations')
          .insert({
            student_id: user.id,
            title: message.slice(0, 80)
          })
          .select()
          .single()

        if (error) throw error
        conversation = data.id
      }

      const { data: history } = await userClient
        .from('ai_messages')
        .select('role, message')
        .eq('conversation_id', conversation)
        .order('created_at', { ascending: true })
        .limit(20)

      const systemPrompt = `
  You are GENELInK Buddy, a cute, friendly AI tutor for Grade 9 students studying genetics.
    Be warm, patient, playful but not distracting, and clear without sounding overly childish.
    Focus on DNA, genes, chromosomes, their relationship, inheritance, and traits.
    Explain ideas step by step with relatable examples and analogies. Ask guiding questions when useful.
    Use Grade 9-friendly language and keep replies reasonably concise unless the student asks for more detail.
    Do not pretend to be human, invent facts, or provide harmful or inappropriate content.
    When the assessment state is pretest_active or final_exam_active, never provide or confirm the answer to an active question,
    identify which option to choose, or solve the exact question. Instead, explain the relevant concept, use a similar example,
    and guide the student's reasoning in a friendly way.
    After an assessment is completed, you may explain the related concept and why answers were correct or incorrect if asked.
    Current lesson: ${lessonTitle || 'Not specified'} (ID: ${lessonId ?? 'not specified'})
    Current topic: ${topicTitle || 'Not specified'} (ID: ${topicId ?? 'not specified'})
    Assessment state: ${assessmentState}
  `

      const messages = [
        { role: 'system', content: systemPrompt },
        ...(history ?? []).map((item) => ({
          role: item.role === 'student' ? 'user' : 'assistant',
          content: item.message
        })),
        { role: 'user', content: message }
      ]

      const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${aiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: Deno.env.get('AI_MODEL') ?? 'gpt-4o-mini',
          messages,
          temperature: 0.5,
          max_tokens: 500
        })
      })

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text()
        console.error('AI provider request failed:', {
          status: aiResponse.status,
          statusText: aiResponse.statusText,
          body: errorText
        })
        return jsonResponse({ error: friendlyError }, 502)
      }

      const aiData = await aiResponse.json()
      const answer = aiData.choices?.[0]?.message?.content?.trim()

      if (!answer) {
        console.error('AI provider returned an empty response.')
        return jsonResponse({ error: friendlyError }, 502)
      }

      await userClient.from('ai_messages').insert([
        {
          conversation_id: conversation,
          role: 'student',
          message
        },
        {
          conversation_id: conversation,
          role: 'ai',
          message: answer
        }
      ])

      return jsonResponse({ answer, conversationId: conversation })
    } catch (error) {
      console.error('AI tutor function failed:', error)
      return jsonResponse({ error: friendlyError }, 500)
    }
  })
