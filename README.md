# GENELInK — Vue + Supabase

GENELInK is now structured as a Vue 3 frontend backed by Supabase.

## Architecture

Vue 3
  ↓
@supabase/supabase-js
  ↓
Supabase Auth + Postgres + RLS
  ↓
Supabase Edge Functions
  ├── ai-tutor
  └── delete-student

## Features

- Student-only public registration
- Student/Admin login
- Supabase Auth sessions
- Admin role stored in `profiles`
- Grade 9 genetics lessons
- 5-question / 8-minute pre-tests
- Topic progress
- Final exam
- Score persistence
- Admin score monitoring
- Student account deletion through a secure Edge Function
- Excel score export
- Shy floating AI Tutor
- AI conversation persistence in Supabase
- RLS policies for student data

## Setup

See `SUPABASE_SETUP.md`.

1. Copy `.env.example` to `.env.local`.
2. Add your Supabase URL and publishable key.
3. Run `npm install`.
4. Run the SQL migration in `supabase/migrations/`.
5. Create/promote your admin account.
6. Deploy the two Edge Functions.
7. Add `OPENAI_API_KEY` as a Supabase secret for the AI tutor.
8. Run `npm run dev`.

## Security

The frontend uses only the Supabase publishable key.

Do not place:
- Supabase service-role key
- OpenAI API key

in Vue or `.env.local`.

The service-role key is used only inside the `delete-student` Edge Function.
The OpenAI key is used only inside the `ai-tutor` Edge Function.
