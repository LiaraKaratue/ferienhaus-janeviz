-- Insert seasonal prices for Ferienhaus Janeviz
INSERT INTO public.seasonal_prices (name, start_date, end_date, price_per_night, min_nights, is_active)
VALUES 
  -- Hauptsaison 2025 (Mitte April - Mitte Oktober)
  ('Hauptsaison', '2025-04-15', '2025-10-14', 176, 3, true),
  -- Nebensaison 2024/2025 (Mitte Oktober - Mitte April)
  ('Nebensaison', '2024-10-15', '2025-04-14', 158, 2, true),
  -- Weihnachten & Neujahr 2024/2025
  ('Weihnachten & Neujahr', '2024-12-20', '2025-01-06', 176, 5, true),
  -- Hauptsaison 2026
  ('Hauptsaison', '2026-04-15', '2026-10-14', 176, 3, true),
  -- Nebensaison 2025/2026
  ('Nebensaison', '2025-10-15', '2026-04-14', 158, 2, true),
  -- Weihnachten & Neujahr 2025/2026
  ('Weihnachten & Neujahr', '2025-12-20', '2026-01-06', 176, 5, true);