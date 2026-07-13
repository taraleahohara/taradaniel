-- Security fix: the original "Admins can view all opt-ins" policy used `using (true)`,
-- which let anyone holding the public anon key SELECT every guest name + email in
-- honeymoon_emails. Opt-ins are only ever read from the Supabase dashboard, which uses
-- the service role and bypasses RLS entirely, so no client-facing SELECT policy is needed.
-- Dropping it removes public read access; INSERT (the public opt-in form) is unaffected.

drop policy if exists "Admins can view all opt-ins" on public.honeymoon_emails;
