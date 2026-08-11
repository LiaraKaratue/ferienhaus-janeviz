-- Special Offers for returning guests
CREATE TABLE public.special_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount_percent INTEGER NOT NULL CHECK (discount_percent >= 1 AND discount_percent <= 50),
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  min_nights INTEGER NOT NULL DEFAULT 2,
  is_active BOOLEAN NOT NULL DEFAULT true,
  for_returning_guests BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.special_offers ENABLE ROW LEVEL SECURITY;

-- Admin can manage all offers
CREATE POLICY "Admin full access" ON public.special_offers
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = (SELECT auth.uid())));

-- Returning guests can view active offers
CREATE POLICY "Returning guests view active offers" ON public.special_offers
  FOR SELECT TO authenticated
  USING (
    is_active = true 
    AND for_returning_guests = true
    AND EXISTS (
      SELECT 1 FROM public.guest_access ga 
      WHERE ga.user_id = (SELECT auth.uid()) 
      AND ga.access_expires_at > now()
    )
  );

-- Index
CREATE INDEX idx_special_offers_active ON public.special_offers(is_active, for_returning_guests);