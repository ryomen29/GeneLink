-- Restore only the authenticated operations needed by the existing student
-- progress/assessment services. Existing owner-scoped RLS policies remain the
-- row boundary; no anonymous grants are added.
grant insert, update on table public.student_topic_progress to authenticated;

grant usage, select on sequence public.pretest_attempts_id_seq to authenticated;
grant usage, select on sequence public.final_exam_attempts_id_seq to authenticated;
grant usage, select on sequence public.student_lesson_progress_id_seq to authenticated;
grant usage, select on sequence public.student_topic_progress_id_seq to authenticated;
