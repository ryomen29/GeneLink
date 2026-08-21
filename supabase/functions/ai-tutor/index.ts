import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const openAiKey = Deno.env.get('OPENAI_API_KEY')

    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY is not configured in Supabase secrets.')
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
      return new Response(
        JSON.stringify({ error: 'Please log in first.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { message, lessonId, conversationId } = await req.json()

    if (!message?.trim()) {
      throw new Error('Message is required.')
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
Explain concepts simply and accurately.
Use encouraging language like "Explorer!" occasionally, but do not overdo it.
Help the student understand instead of simply giving answers to tests.
Never reveal or invent answer keys for active assessments.
Keep explanations short, clear, and age-appropriate.
${lessonId ? `The student is currently studying lesson ${lessonId}.` : ''}
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
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: Deno.env.get('OPENAI_MODEL') ?? 'gpt-4o-mini',
        messages,
        temperature: 0.5,
        max_tokens: 500
      })
    })

    if (!aiResponse.ok) {
      throw new Error(`AI provider returned ${aiResponse.status}.`)
    }

    const aiData = await aiResponse.json()
    const answer =
      aiData.choices?.[0]?.message?.content ??
      'Hmm… my tiny brain needs another try. 🧬'

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

    return new Response(
      JSON.stringify({
        answer,
        conversationId: conversation
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message ?? 'AI tutor failed.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
