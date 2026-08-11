-- Helper-Funktion: Prüft ob noch kein Admin existiert
CREATE FUNCTION public.no_admin_exists()
RETURNS boolean LANGUAGE sql STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT NOT EXISTS (SELECT 1 FROM public.admin_users);
$$;

GRANT EXECUTE ON FUNCTION public.no_admin_exists() TO authenticated;

-- Erlaube Ersteinrichtung: Der erste Admin kann sich selbst registrieren
CREATE POLICY "Allow first admin setup" ON public.admin_users
  FOR INSERT TO authenticated
  WITH CHECK (
    public.no_admin_exists()
    AND (SELECT auth.uid()) = id
  );