-- The existing permissive read policies are ANDed with the restrictive
-- schedule-window policies installed by 202609270002. Grant only the
-- authenticated read capability those policies protect; no writes or anon
-- access are granted.
grant select on table public.pretest_questions to authenticated;
grant select on table public.final_exam_questions to authenticated;
