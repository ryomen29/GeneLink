import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type'
}

const friendlyError =
  'Oops! I’m having a tiny brain break right now 🥺✨ Please try again in a moment.'

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
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    })
  }

  try {
    // Environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')
    const aiApiKey = Deno.env.get('AI_API_KEY')

    if (!supabaseUrl || !anonKey) {
      console.error('Supabase environment variables are missing.')

      return jsonResponse(
        { error: friendlyError },
        500
      )
    }

    if (!aiApiKey) {
      console.error(
        'AI_API_KEY is not configured in Supabase secrets.'
      )

      return jsonResponse(
        { error: friendlyError },
        500
      )
    }

    // Authenticated Supabase client
    const userClient = createClient(
      supabaseUrl,
      anonKey,
      {
        global: {
          headers: {
            Authorization:
              req.headers.get('Authorization') ?? ''
          }
        }
      }
    )

    // Get authenticated user
    const {
      data: { user },
      error: userError
    } = await userClient.auth.getUser()

    if (userError || !user) {
      return jsonResponse(
        { error: 'Please log in first.' },
        401
      )
    }

    // Read request body
    const body = await req.json()

    const message =
      typeof body?.message === 'string'
        ? body.message.trim()
        : ''

    const rawContext =
      body?.context &&
      typeof body.context === 'object'
        ? body.context
        : {}

    const lessonId =
      Number.isInteger(rawContext.lessonId)
        ? rawContext.lessonId
        : null

    const topicId =
      Number.isInteger(rawContext.topicId)
        ? rawContext.topicId
        : null

    const lessonTitle =
      typeof rawContext.lessonTitle === 'string'
        ? rawContext.lessonTitle.slice(0, 160)
        : null

    const topicTitle =
      typeof rawContext.topicTitle === 'string'
        ? rawContext.topicTitle.slice(0, 160)
        : null

    const assessmentState =
      assessmentStates.has(rawContext.assessmentState)
        ? rawContext.assessmentState
        : 'lesson'

    const conversationId =
      typeof rawContext.conversationId === 'string'
        ? rawContext.conversationId
        : null

    if (!message || message.length > 2000) {
      return jsonResponse(
        {
          error:
            'Please enter a shorter question to continue.'
        },
        400
      )
    }

    // Create or continue conversation
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

      if (error) {
        throw error
      }

      conversation = data.id
    }

    // Load previous messages
    const {
      data: history,
      error: historyError
    } = await userClient
      .from('ai_messages')
      .select('role, message')
      .eq('conversation_id', conversation)
      .order('created_at', {
        ascending: true
      })
      .limit(20)

    if (historyError) {
      throw historyError
    }

    // AI instructions
    const systemPrompt = `
You are GENELInK Buddy, a friendly, supportive, and knowledgeable AI tutor for Grade 9 students studying genetics.

Your goal is to help students genuinely understand concepts, not just give short definitions.

PERSONALITY:
- Warm, patient, encouraging, and approachable.
- Friendly and occasionally playful, but never distracting.
- Sound natural and conversational.
- Do not pretend to be human.

SUBJECT FOCUS:
Help students learn about:
- DNA
- genes
- chromosomes
- the relationship between DNA, genes, and chromosomes
- inheritance
- traits
- basic genetics concepts appropriate for Grade 9

TEACHING STYLE:
When answering a question:
1. Start with a clear direct answer.
2. Explain the idea in simple Grade 9-friendly language.
3. Break difficult ideas into smaller steps.
4. Use relatable examples or analogies when helpful.
5. Explain WHY something works, not only WHAT it is.
6. If appropriate, end with a short helpful question, example, or memory tip.

ANSWER LENGTH:
Do not give extremely short or incomplete answers unless the student specifically asks for a short answer.

For normal questions, provide enough explanation for the student to understand the concept. Usually aim for:
- a direct answer
- 1 to 3 short explanatory paragraphs or sections
- an example when useful

For complex questions, you may provide a longer explanation when necessary. Do not stop in the middle of an explanation. Complete the thought before ending your response.

Use headings, bullet points, or numbered steps when they make the explanation easier to understand.

Do not overload the student with unnecessary information.

ACCURACY:
- Do not invent facts.
- If you are unsure, say so clearly.
- Do not provide harmful or inappropriate content.

ASSESSMENT RULES:

When the assessment state is "pretest_active" or "final_exam_active":

- Do NOT provide the exact answer to an active assessment question.
- Do NOT confirm whether the student's selected answer is correct.
- Do NOT identify which multiple-choice option the student should choose.
- Do NOT directly solve the exact assessment question.

Instead:
- Explain the underlying genetics concept.
- Give a similar example.
- Ask guiding questions.
- Help the student reason through the problem themselves.
- Encourage the student to make their own decision.

After an assessment is completed, you may explain concepts and help students understand why answers were correct or incorrect.

CURRENT CONTEXT:

Current lesson:
${lessonTitle || 'Not specified'}

Lesson ID:
${lessonId ?? 'Not specified'}

Current topic:
${topicTitle || 'Not specified'}

Topic ID:
${topicId ?? 'Not specified'}

Assessment state:
${assessmentState}
`

    // Convert chat history to Gemini format
    const geminiContents = [
      ...(history ?? []).map((item) => ({
        role:
          item.role === 'student'
            ? 'user'
            : 'model',
        parts: [
          {
            text: item.message
          }
        ]
      })),
      {
        role: 'user',
        parts: [
          {
            text: message
          }
        ]
      }
    ]

    // Gemini model from Supabase secrets
    const model =
      Deno.env.get('AI_MODEL') ??
      'gemini-3.6-flash'

    // Send request to Gemini
    const aiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model
      )}:generateContent?key=${encodeURIComponent(
        aiApiKey
      )}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: systemPrompt
              }
            ]
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 2000
          }
        })
      }
    )

    // Handle Gemini errors
    if (!aiResponse.ok) {
      const errorText = await aiResponse.text()

      console.error(
        'Gemini API request failed:',
        {
          status: aiResponse.status,
          statusText:
            aiResponse.statusText,
          body: errorText
        }
      )

      return jsonResponse(
        { error: friendlyError },
        502
      )
    }

    const aiData = await aiResponse.json()

    // Extract Gemini response
    const answer =
      aiData.candidates?.[0]?.content?.parts
        ?.map(
          (part: { text?: string }) =>
            part.text ?? ''
        )
        .join('')
        .trim()

    if (!answer) {
      console.error(
        'Gemini returned an empty response:',
        JSON.stringify(aiData)
      )

      return jsonResponse(
        { error: friendlyError },
        502
      )
    }

    // Save student message and AI response
    const { error: saveError } =
      await userClient
        .from('ai_messages')
        .insert([
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

    if (saveError) {
      throw saveError
    }

    return jsonResponse({
      answer,
      conversationId: conversation
    })
  } catch (error) {
    console.error(
      'AI tutor function failed:',
      error
    )

    return jsonResponse(
      { error: friendlyError },
      500
    )
  }
})