import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { GuestLayout } from '@/components/layout/GuestLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  FileText, MessageSquare, CalendarDays,
  Home, Gift, ChevronRight, Clock, Star, Waves } from
'lucide-react';

interface GuestBooking {
  id: string;
  booking_number: string;
  check_in: string;
  check_out: string;
  status: string;
  total_price: number;
  deposit_paid: boolean;
  fully_paid: boolean;
}

export default function GuestPortal() {
  const navigate = useNavigate();
  const { user, loading: authLoading, isGuest } = useAuth();
  const [bookings, setBookings] = useState<GuestBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!supabase || !user) return;

    const fetchBookings = async () => {
      const { data } = await supabase.
      from('bookings').
      select('id, booking_number, check_in, check_out, status, total_price, deposit_paid, fully_paid').
      order('check_in', { ascending: false });

      setBookings(data ?? []);
      setLoading(false);
    };

    fetchBookings();
  }, [user]);

  if (authLoading || loading) {
    return (
      <GuestLayout title="Willkommen" subtitle="Laden...">
        <div data-ev-id="ev_f0f48ad9cb" className="min-h-[40vh] flex items-center justify-center">
          <div data-ev-id="ev_ba937663bf" className="animate-pulse text-muted-foreground">Daten werden geladen...</div>
        </div>
      </GuestLayout>);

  }

  const activeBooking = bookings.find(
    (b) => b.status === 'confirmed' && new Date(b.check_out) >= new Date()
  );

  return (
    <GuestLayout title="Willkommen zurück!" subtitle={user?.email}>
      {/* Active Booking Banner */}
      {activeBooking &&
      <Card className="mb-8 bg-gradient-to-r from-secondary/20 to-primary/10 border-secondary/30">
          <CardContent className="p-6">
            <div data-ev-id="ev_8306265c81" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div data-ev-id="ev_3f9a860416" className="flex items-center gap-4">
                <div data-ev-id="ev_a9a5c21469" className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Waves className="w-6 h-6 text-secondary" />
                </div>
                <div data-ev-id="ev_46c3ede485">
                  <p data-ev-id="ev_f34001e77f" className="text-sm text-secondary font-medium mb-1">Ihre nächste Auszeit</p>
                  <p data-ev-id="ev_b3f6cc2713" className="font-display font-semibold text-lg text-primary">
                    {formatDate(activeBooking.check_in)} - {formatDate(activeBooking.check_out)}
                  </p>
                  <p data-ev-id="ev_89d2d3aa0c" className="text-sm text-muted-foreground">#{activeBooking.booking_number}</p>
                </div>
              </div>
              <Button className="gap-2 bg-secondary hover:bg-secondary/90">
                <CalendarDays className="w-4 h-4" />
                Details ansehen
              </Button>
            </div>
          </CardContent>
        </Card>
      }

      {/* Quick Actions */}
      <div data-ev-id="ev_264b34ccf7" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link to="/portal/vertrag">
          <Card className="h-full hover:shadow-lg hover:border-secondary/30 transition-all cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div data-ev-id="ev_a0ec22368e" className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 data-ev-id="ev_7fc3e0c949" className="font-semibold text-sm text-foreground">Mietvertrag</h3>
              <p data-ev-id="ev_7773bddbd8" className="text-xs text-muted-foreground mt-1">Einsehen & unterschreiben</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/portal/nachrichten">
          <Card className="h-full hover:shadow-lg hover:border-secondary/30 transition-all cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div data-ev-id="ev_236f030796" className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 data-ev-id="ev_996e75b0df" className="font-semibold text-sm text-foreground">Nachrichten</h3>
              <p data-ev-id="ev_05ea0aa0ff" className="text-xs text-muted-foreground mt-1">Mit uns schreiben</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/portal/dokumente">
          <Card className="h-full hover:shadow-lg hover:border-secondary/30 transition-all cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div data-ev-id="ev_b5b01ace2b" className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <h3 data-ev-id="ev_803dbba494" className="font-semibold text-sm text-foreground">Hausinfos</h3>
              <p data-ev-id="ev_0f93785e03" className="text-xs text-muted-foreground mt-1">Hausordnung & Tipps</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/portal/angebote">
          <Card className="h-full hover:shadow-lg hover:border-accent/30 transition-all cursor-pointer group border-accent/20 bg-accent/5">
            <CardContent className="p-6 text-center">
              <div data-ev-id="ev_1b1be78a58" className="w-12 h-12 mx-auto mb-3 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <h3 data-ev-id="ev_9a50f1deaa" className="font-semibold text-sm text-foreground">Exklusiv-Angebote</h3>
              <p data-ev-id="ev_b52eb2ab76" className="text-xs text-muted-foreground mt-1">Nur für Stammgäste</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            Ihre Buchungen
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ?
          <div data-ev-id="ev_4f4b7a2186" className="text-center py-12">
              <CalendarDays className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p data-ev-id="ev_ddd465891c" className="text-muted-foreground mb-4">Noch keine Buchungen vorhanden.</p>
              <Link to="/buchung">
                <Button className="gap-2 bg-secondary hover:bg-secondary/90">
                  <Waves className="w-4 h-4" />
                  Jetzt buchen
                </Button>
              </Link>
            </div> :

          <div data-ev-id="ev_23aa3c00ae" className="flex flex-col gap-3">
              {bookings.map((booking) =>
            <div data-ev-id="ev_d341aa8321"
            key={booking.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-xl gap-4 hover:bg-muted/50 transition-colors">

                  <div data-ev-id="ev_3cd7353c91">
                    <p data-ev-id="ev_049492b9b8" className="font-medium text-foreground">
                      {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                    </p>
                    <p data-ev-id="ev_6e4193ca55" className="text-sm text-muted-foreground">#{booking.booking_number}</p>
                  </div>
                  <div data-ev-id="ev_afa0362fd9" className="flex items-center gap-4">
                    <span data-ev-id="ev_665a618974"
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === 'confirmed' ?
                'bg-success/10 text-success' :
                booking.status === 'pending' ?
                'bg-warning/10 text-warning' :
                booking.status === 'cancelled' ?
                'bg-destructive/10 text-destructive' :
                'bg-muted text-muted-foreground'}`
                }>

                      {booking.status === 'confirmed' ?
                  'Bestätigt' :
                  booking.status === 'pending' ?
                  'Ausstehend' :
                  booking.status === 'cancelled' ?
                  'Storniert' :
                  'Abgeschlossen'}
                    </span>
                    <span data-ev-id="ev_c825e03d73" className="font-semibold text-foreground">
                      {formatCurrency(booking.total_price)}
                    </span>
                  </div>
                </div>
            )}
            </div>
          }
        </CardContent>
      </Card>

      {/* Rebooking CTA */}
      {bookings.some((b) => b.status === 'completed') &&
      <Card className="mt-8 bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/20">
          <CardContent className="p-6">
            <div data-ev-id="ev_da8a9afdad" className="flex flex-col sm:flex-row items-center gap-4">
              <div data-ev-id="ev_00b507f8a1" className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Star className="w-7 h-7 text-accent" />
              </div>
              <div data-ev-id="ev_48508f74d0" className="flex-1 text-center sm:text-left">
                <h3 data-ev-id="ev_44d0daaefb" className="font-display font-semibold text-lg text-primary">Wieder buchen?</h3>
                <p data-ev-id="ev_300cba1170" className="text-sm text-muted-foreground">
                  Als Stammgast erhalten Sie exklusive Angebote für Ihren nächsten Aufenthalt.
                </p>
              </div>
              <Link to="/portal/angebote">
                <Button className="gap-2 bg-accent hover:bg-accent/90 text-primary">
                  Angebote ansehen
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      }
    </GuestLayout>);

}