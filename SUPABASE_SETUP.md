# GENELInK + Supabase Setup

This version uses Supabase as the backend:
- Supabase Auth = student/admin login
- Supabase Postgres = lessons, questions, progress, scores, AI chat history
- Row Level Security = access control
- Supabase Edge Functions = secure AI calls and admin-only account deletion

## 1. Create a Supabase project

Create a project in the Supabase Dashboard.

Get:
- Project URL
- Publishable key

Supabase's current Vue quickstart uses `@supabase/supabase-js` plus `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

## 2. Configure the Vue app

Copy:

`.env.example` -> `.env.local`

Then replace:

VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY

Install packages:

npm install

Run:

npm run dev

## 3. Create the database

Run:

supabase/migrations/202608200001_genelink_schema.sql

in Supabase SQL Editor.

This creates:
- profiles
- lessons
- topics
- pretest_questions
- pretest_attempts
- student_lesson_progress
- student_topic_progress
- final_exam_questions
- final_exam_attempts
- ai_conversations
- ai_messages
- student_score_summary

It also enables Row Level Security and seeds the initial genetics lessons/questions.

## 4. Create the first admin

Important: public registration is STUDENT ONLY.

Register the admin account normally once through Supabase Auth or the app, then run:

update public.profiles
set role = 'admin'
where email = 'YOUR_ADMIN_EMAIL';

Do not add admin registration to the public UI.

## 5. Deploy the Edge Functions

Install/login to the Supabase CLI if you use the CLI workflow.

Deploy:

supabase functions deploy ai-tutor
supabase functions deploy delete-student

Set the AI secret:

supabase secrets set AI_API_KEY=YOUR_OPENAI_API_KEY

Optional model:

supabase secrets set AI_MODEL=gpt-4o-mini

Deploy the AI function after setting its secrets:

supabase functions deploy ai-tutor

The Vue frontend only uses these public environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- Optional: `VITE_SUPABASE_AI_FUNCTION=ai-tutor`

`AI_API_KEY` and `AI_MODEL` are Supabase Edge Function secrets only. NEVER put the
OpenAI API key in `.env.local`, a `VITE_` variable, Vercel frontend environment
variables, Vue/browser code, source code, or GitHub.

## 6. Why account deletion uses an Edge Function

A browser must never receive the Supabase service-role key.

The admin's Delete Student button calls the `delete-student` Edge Function. The function verifies the current user's admin role and then uses the service-role key server-side to delete the Auth account.

## 7. AI chat storage

The shy GENELInK Buddy calls:

supabase/functions/ai-tutor

The function:
1. verifies the logged-in student
2. creates/reuses an AI conversation
3. reads recent chat history
4. sends the prompt to the AI provider
5. stores both the student message and AI response
6. returns the answer to the Vue widget

So yes, the AI can store chat history in Supabase.

## 8. Important production rule

Frontend checks are for user experience. Security must be enforced by Supabase RLS and server-side/Edge Function checks.

The browser should only contain the Supabase publishable key. Never put a service-role key in Vue.
