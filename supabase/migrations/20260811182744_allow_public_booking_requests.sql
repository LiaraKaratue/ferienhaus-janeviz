-- Besucher dürfen Kunden-Einträge erstellen (für Buchungsanfragen)
CREATE POLICY "Anyone can create customer for booking" ON public.customers
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Besucher dürfen ihre eigene Buchung erstellen
CREATE POLICY "Anyone can create booking" ON public.bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);