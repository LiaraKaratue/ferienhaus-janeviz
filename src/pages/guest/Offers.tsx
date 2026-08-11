import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { GuestLayout } from '@/components/layout/GuestLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Gift, Calendar, Moon, Sparkles, Lock, CheckCircle } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount_percent: number;
  valid_from: string;
  valid_until: string;
  min_nights: number;
}

export default function GuestOffers() {
  const { user, loading: authLoading } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/login';
    }
  }, [user, authLoading]);

  useEffect(() => {
    const checkAccessAndLoad = async () => {
      if (!supabase || !user) return;

      // Check if user has valid guest access (returning guest)
      const { data: accessData } = await supabase.
      from('guest_access').
      select('id').
      eq('user_id', user.id).
      gt('access_expires_at', new Date().toISOString()).
      limit(1);

      if (accessData && accessData.length > 0) {
        setHasAccess(true);

        // Load offers (RLS will filter to only show active offers for returning guests)
        const { data: offersData } = await supabase.
        from('special_offers').
        select('*').
        order('created_at', { ascending: false });

        setOffers(offersData || []);
      }

      setLoading(false);
    };

    if (user) {
      checkAccessAndLoad();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <GuestLayout title="Exklusive Angebote" subtitle="Nur für unsere Stammgäste">
        <div data-ev-id="ev_bdf167ee9a" className="min-h-[80vh] flex items-center justify-center">
          <div data-ev-id="ev_27687e7107" className="animate-pulse text-muted-foreground">Laden...</div>
        </div>
      </GuestLayout>);

  }

  if (!hasAccess) {
    return (
      <GuestLayout title="Exklusive Angebote" subtitle="Nur für unsere Stammgäste">
        <div data-ev-id="ev_f4e8b34c7b" className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div data-ev-id="ev_55957cc460" className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 data-ev-id="ev_be71c00f6f" className="font-display text-2xl font-bold text-foreground mb-4">
            Exklusive Angebote
          </h1>
          <p data-ev-id="ev_896b047077" className="text-muted-foreground mb-8">
            Diese Seite ist nur für Gäste verfügbar, die bereits bei uns übernachtet haben.
            Nach Ihrem Aufenthalt erhalten Sie Zugang zu exklusiven Wiederkommer-Rabatten.
          </p>
          <Link to="/portal">
            <Button variant="outline">Zurück zum Portal</Button>
          </Link>
        </div>
      </GuestLayout>);

  }

  return (
    <GuestLayout title="Exklusive Angebote" subtitle="Nur für unsere Stammgäste">
      <div data-ev-id="ev_35cb14a488" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/portal" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Portal
        </Link>

        {/* Header */}
        <div data-ev-id="ev_e0180cfc02" className="text-center mb-12">
          <div data-ev-id="ev_4940396032" className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-8 h-8 text-secondary" />
          </div>
          <h1 data-ev-id="ev_43feebf87f" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Exklusive Angebote für Sie
          </h1>
          <p data-ev-id="ev_b2ea9eb6cb" className="text-muted-foreground max-w-xl mx-auto">
            Als geschätzter Gast erhalten Sie Zugang zu unseren besten Rabatten.
            Buchen Sie direkt und sparen Sie bei Ihrem nächsten Aufenthalt.
          </p>
        </div>

        {/* Offers */}
        {offers.length > 0 ?
        <div data-ev-id="ev_33dcf92493" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) =>
          <Card key={offer.id} className="overflow-hidden border-secondary/20 hover:border-secondary/40 transition-colors">
                <div data-ev-id="ev_e4db078575" className="bg-gradient-to-r from-secondary/10 to-accent/10 px-6 py-4 border-b border-secondary/10">
                  <div data-ev-id="ev_e6b8363604" className="flex items-center justify-between">
                    <div data-ev-id="ev_1374b393ce" className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-secondary" />
                      <span data-ev-id="ev_7e278bc93c" className="font-display text-lg font-semibold text-foreground">{offer.title}</span>
                    </div>
                    <span data-ev-id="ev_d9bdfcaa12" className="text-2xl font-bold text-secondary">{offer.discount_percent}%</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p data-ev-id="ev_6b6a9a796f" className="text-muted-foreground mb-6">{offer.description}</p>
                  
                  <div data-ev-id="ev_c8abdcbb43" className="flex flex-wrap gap-3 mb-6">
                    <div data-ev-id="ev_e7e1bbee18" className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-sm">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span data-ev-id="ev_c2390156f6">
                        {formatDate(offer.valid_from, { day: '2-digit', month: 'short' })} - {formatDate(offer.valid_until, { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div data-ev-id="ev_05f0ca244e" className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-sm">
                      <Moon className="w-4 h-4 text-secondary" />
                      <span data-ev-id="ev_fe8f606a25">Mind. {offer.min_nights} Nächte</span>
                    </div>
                  </div>

                  <div data-ev-id="ev_ce8a9b5485" className="flex flex-col gap-3">
                    <Link to="/buchen" className="w-full">
                      <Button className="w-full gap-2 bg-secondary hover:bg-secondary/90">
                        <CheckCircle className="w-4 h-4" />
                        Jetzt mit Rabatt buchen
                      </Button>
                    </Link>
                    <p data-ev-id="ev_15653300f0" className="text-xs text-center text-muted-foreground">
                      Der Rabatt wird automatisch bei der Buchung angewendet
                    </p>
                  </div>
                </CardContent>
              </Card>
          )}
          </div> :

        <div data-ev-id="ev_a3acdc6911" className="text-center py-12">
            <Gift className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p data-ev-id="ev_017448dae6" className="text-muted-foreground">Aktuell keine aktiven Angebote.</p>
            <p data-ev-id="ev_3a7796326c" className="text-sm text-muted-foreground mt-2">
              Schauen Sie bald wieder vorbei – neue Angebote kommen regelmäßig!
            </p>
          </div>
        }

        {/* Trust Badge */}
        <div data-ev-id="ev_7e7a8e303b" className="mt-12 text-center">
          <div data-ev-id="ev_858add29b7" className="inline-flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span data-ev-id="ev_ce895024b3">Diese Angebote sind exklusiv für Sie als Stammgast</span>
          </div>
        </div>
      </div>
    </GuestLayout>);

}