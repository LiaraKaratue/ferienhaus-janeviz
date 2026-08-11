-- =====================================================
-- FERIENHAUS VERMIETUNGS-PLATTFORM - KOMPLETTES SCHEMA
-- =====================================================

-- Kunden-Tabelle
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address_street TEXT,
  address_city TEXT,
  address_postal_code TEXT,
  address_country TEXT DEFAULT 'DE',
  is_returning_guest BOOLEAN DEFAULT false,
  special_offers_enabled BOOLEAN DEFAULT true,
  portal_access_until TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_customers_email ON public.customers(email);

-- Saisonpreise-Tabelle
CREATE TABLE public.seasonal_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price_per_night DECIMAL(10,2) NOT NULL,
  min_nights INTEGER DEFAULT 2,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_seasonal_prices_dates ON public.seasonal_prices(start_date, end_date);

-- Buchungen-Tabelle
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  booking_number TEXT NOT NULL UNIQUE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests_adults INTEGER DEFAULT 2,
  guests_children INTEGER DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2),
  deposit_paid BOOLEAN DEFAULT false,
  fully_paid BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'direct' CHECK (source IN ('direct', 'booking', 'airbnb', 'fewo', 'traum', 'other')),
  external_booking_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_bookings_customer ON public.bookings(customer_id);
CREATE INDEX idx_bookings_dates ON public.bookings(check_in, check_out);
CREATE INDEX idx_bookings_status ON public.bookings(status);

-- Blockierte Termine (von externen Portalen via iCal)
CREATE TABLE public.blocked_dates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  source TEXT NOT NULL,
  external_uid TEXT,
  summary TEXT,
  synced_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_blocked_dates ON public.blocked_dates(start_date, end_date);

-- Zahlungen-Tabelle
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_type TEXT NOT NULL CHECK (payment_type IN ('deposit', 'final', 'refund')),
  payment_method TEXT CHECK (payment_method IN ('stripe', 'paypal', 'bank_transfer', 'cash')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_payment_id TEXT,
  paypal_order_id TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_booking ON public.payments(booking_id);

-- Mietverträge-Tabelle
CREATE TABLE public.contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL UNIQUE,
  contract_data JSONB NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE,
  signature_data TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_contracts_booking ON public.contracts(booking_id);

-- Nachrichten-Tabelle (Vermieter <-> Gast)
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('guest', 'host')),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_messages_booking ON public.messages(booking_id);
CREATE INDEX idx_messages_unread ON public.messages(is_read) WHERE is_read = false;

-- Rechnungen-Tabelle
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL UNIQUE,
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  line_items JSONB NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_invoices_booking ON public.invoices(booking_id);
CREATE INDEX idx_invoices_customer ON public.invoices(customer_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);

-- Gast-Portal Zugang (verknüpft Supabase Auth mit Buchungen)
CREATE TABLE public.guest_access (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  access_granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  access_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE(user_id, booking_id)
);

CREATE INDEX idx_guest_access_user ON public.guest_access(user_id);
CREATE INDEX idx_guest_access_booking ON public.guest_access(booking_id);

-- Admin-Benutzer Tabelle (Vermieter)
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  notification_email BOOLEAN DEFAULT true,
  notification_push BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- iCal Feed Konfiguration
CREATE TABLE public.ical_feeds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  feed_url TEXT NOT NULL,
  feed_type TEXT NOT NULL CHECK (feed_type IN ('import', 'export')),
  last_synced_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Feedback/Bewertungen
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL UNIQUE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_public BOOLEAN DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_feedback_booking ON public.feedback(booking_id);

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Admin-Check Funktion (für Vermieter-Zugang)
CREATE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE id = (SELECT auth.uid()));
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Gast-Zugang Check Funktion
CREATE FUNCTION public.has_guest_access(_booking_id uuid)
RETURNS boolean LANGUAGE sql STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.guest_access 
    WHERE user_id = (SELECT auth.uid()) 
    AND booking_id = _booking_id 
    AND access_expires_at > now()
  );
$$;

GRANT EXECUTE ON FUNCTION public.has_guest_access(uuid) TO authenticated;

-- CUSTOMERS: Nur Admins können alles sehen/bearbeiten
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all customers" ON public.customers
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Admins can insert customers" ON public.customers
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update customers" ON public.customers
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete customers" ON public.customers
  FOR DELETE TO authenticated USING (public.is_admin());

-- SEASONAL_PRICES: Öffentlich lesbar, nur Admins können bearbeiten
ALTER TABLE public.seasonal_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active seasonal prices" ON public.seasonal_prices
  FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Admins can manage seasonal prices" ON public.seasonal_prices
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- BOOKINGS: Admins alles, Gäste nur eigene
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all bookings" ON public.bookings
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Guests can view their bookings" ON public.bookings
  FOR SELECT TO authenticated USING (public.has_guest_access(id));

CREATE POLICY "Admins can manage bookings" ON public.bookings
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Öffentliche Buchungsanfragen erlauben
CREATE POLICY "Anyone can create booking requests" ON public.bookings
  FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending');

-- BLOCKED_DATES: Öffentlich lesbar für Verfügbarkeitskalender
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blocked dates" ON public.blocked_dates
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage blocked dates" ON public.blocked_dates
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- PAYMENTS: Admins alles, Gäste eigene
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all payments" ON public.payments
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Guests can view their payments" ON public.payments
  FOR SELECT TO authenticated USING (public.has_guest_access(booking_id));

CREATE POLICY "Admins can manage payments" ON public.payments
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- CONTRACTS: Admins alles, Gäste eigene
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all contracts" ON public.contracts
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Guests can view their contracts" ON public.contracts
  FOR SELECT TO authenticated USING (public.has_guest_access(booking_id));

CREATE POLICY "Guests can sign their contracts" ON public.contracts
  FOR UPDATE TO authenticated 
  USING (public.has_guest_access(booking_id) AND signed_at IS NULL)
  WITH CHECK (public.has_guest_access(booking_id));

CREATE POLICY "Admins can manage contracts" ON public.contracts
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- MESSAGES: Admins alles, Gäste eigene
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all messages" ON public.messages
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Guests can view their messages" ON public.messages
  FOR SELECT TO authenticated USING (public.has_guest_access(booking_id));

CREATE POLICY "Guests can send messages" ON public.messages
  FOR INSERT TO authenticated WITH CHECK (
    public.has_guest_access(booking_id) AND sender_type = 'guest'
  );

CREATE POLICY "Admins can manage messages" ON public.messages
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- INVOICES: Admins alles, Gäste eigene
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all invoices" ON public.invoices
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Guests can view their invoices" ON public.invoices
  FOR SELECT TO authenticated USING (public.has_guest_access(booking_id));

CREATE POLICY "Admins can manage invoices" ON public.invoices
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- GUEST_ACCESS: Nur Admins können Zugang gewähren
ALTER TABLE public.guest_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage guest access" ON public.guest_access
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Users can view their own access" ON public.guest_access
  FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);

-- ADMIN_USERS: Nur existierende Admins können neue hinzufügen
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view admin users" ON public.admin_users
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Admins can manage admin users" ON public.admin_users
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ICAL_FEEDS: Nur Admins
ALTER TABLE public.ical_feeds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage ical feeds" ON public.ical_feeds
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- FEEDBACK: Gäste können eigenes Feedback geben, Admins sehen alles
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all feedback" ON public.feedback
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Guests can submit feedback" ON public.feedback
  FOR INSERT TO authenticated WITH CHECK (public.has_guest_access(booking_id));

CREATE POLICY "Public can view public feedback" ON public.feedback
  FOR SELECT TO anon, authenticated USING (is_public = true);

-- =====================================================
-- TRIGGER FÜR UPDATED_AT
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE
  ON public.customers FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE
  ON public.bookings FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- BUCHUNGSNUMMER GENERATOR
-- =====================================================

CREATE OR REPLACE FUNCTION public.generate_booking_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.booking_number := 'FH-' || TO_CHAR(NOW(), 'YYMM') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_booking_number BEFORE INSERT
  ON public.bookings FOR EACH ROW
  WHEN (NEW.booking_number IS NULL)
  EXECUTE FUNCTION public.generate_booking_number();

-- =====================================================
-- RECHNUNGSNUMMER GENERATOR
-- =====================================================

CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TRIGGER AS $$
DECLARE
    next_num INTEGER;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 10) AS INTEGER)), 0) + 1
    INTO next_num
    FROM public.invoices
    WHERE invoice_number LIKE 'RE-' || TO_CHAR(NOW(), 'YYYY') || '-%';
    
    NEW.invoice_number := 'RE-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(next_num::TEXT, 4, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_invoice_number BEFORE INSERT
  ON public.invoices FOR EACH ROW
  WHEN (NEW.invoice_number IS NULL)
  EXECUTE FUNCTION public.generate_invoice_number();