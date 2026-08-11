import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  ArrowLeft, Search, Filter, CalendarDays, Check, X, Clock,
  ChevronDown, MoreHorizontal } from
'lucide-react';

interface Booking {
  id: string;
  booking_number: string;
  check_in: string;
  check_out: string;
  status: string;
  total_price: number;
  deposit_paid: boolean;
  fully_paid: boolean;
  source: string;
  created_at: string;
  customer: {first_name: string;last_name: string;email: string;} | null;
}

export default function AdminBookings() {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/login');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (!supabase || !user || !isAdmin) return;

    const fetchBookings = async () => {
      const { data } = await supabase.
      from('bookings').
      select(`
          id, booking_number, check_in, check_out, status, total_price,
          deposit_paid, fully_paid, source, created_at,
          customer:customers(first_name, last_name, email)
        `).
      order('created_at', { ascending: false });

      const mapped = (data ?? []).map((b) => ({
        ...b,
        customer: Array.isArray(b.customer) ? b.customer[0] : b.customer
      }));
      setBookings(mapped);
      setFilteredBookings(mapped);
      setLoading(false);
    };

    fetchBookings();
  }, [user, isAdmin]);

  useEffect(() => {
    let filtered = bookings;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((b) =>
      b.booking_number.toLowerCase().includes(term) ||
      b.customer?.first_name.toLowerCase().includes(term) ||
      b.customer?.last_name.toLowerCase().includes(term) ||
      b.customer?.email.toLowerCase().includes(term)
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, statusFilter, searchTerm]);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    if (!supabase) return;

    const { error } = await supabase.
    from('bookings').
    update({ status: newStatus }).
    eq('id', bookingId);

    if (!error) {
      setBookings((prev) =>
      prev.map((b) => b.id === bookingId ? { ...b, status: newStatus } : b)
      );
    }
  };

  if (authLoading || loading) {
    return (
      <AdminLayout title="Buchungen" subtitle="Alle Buchungsanfragen verwalten">
        <div data-ev-id="ev_5450d1c2ec" className="min-h-[80vh] flex items-center justify-center">
          <div data-ev-id="ev_31bd29fecc" className="animate-pulse text-muted-foreground">Laden...</div>
        </div>
      </AdminLayout>);

  }

  return (
    <AdminLayout title="Buchungen" subtitle="Alle Buchungsanfragen verwalten">
      <div data-ev-id="ev_5f1922cec1" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Dashboard
        </Link>

        <div data-ev-id="ev_e023010e30" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 data-ev-id="ev_4cb099135d" className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Buchungen
          </h1>
        </div>

        {/* Pending Requests Banner */}
        {bookings.filter((b) => b.status === 'pending').length > 0 &&
        <Card className="mb-6 border-warning bg-warning/5">
            <CardContent className="p-4">
              <div data-ev-id="ev_c8aff29899" className="flex items-center justify-between">
                <div data-ev-id="ev_36de20d28f" className="flex items-center gap-3">
                  <div data-ev-id="ev_e50281f77b" className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                  <div data-ev-id="ev_474efd87bc">
                    <p data-ev-id="ev_206b7a69f1" className="font-semibold text-foreground">
                      {bookings.filter((b) => b.status === 'pending').length} neue Anfrage{bookings.filter((b) => b.status === 'pending').length > 1 ? 'n' : ''} warten auf Freigabe
                    </p>
                    <p data-ev-id="ev_ff26ceb4f3" className="text-sm text-muted-foreground">Klicke auf eine Anfrage um sie zu prüfen und freizugeben</p>
                  </div>
                </div>
                <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusFilter('pending')}
                className="gap-2 border-warning text-warning hover:bg-warning/10">

                  <Filter className="w-4 h-4" />
                  Nur Anfragen
                </Button>
              </div>
            </CardContent>
          </Card>
        }

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div data-ev-id="ev_c2b20f41b0" className="flex flex-col sm:flex-row gap-4">
              <div data-ev-id="ev_c8aff29899" className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input data-ev-id="ev_3238cdc699"
                type="text"
                placeholder="Suchen nach Name, E-Mail oder Buchungsnummer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />

              </div>
              <select data-ev-id="ev_7df5912c22"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-md border border-input bg-background text-sm">

                <option data-ev-id="ev_a7fa5a03a4" value="all">Alle Status</option>
                <option data-ev-id="ev_e950789607" value="pending">Neue Anfragen</option>
                <option data-ev-id="ev_fad87218d1" value="confirmed">Bestätigt</option>
                <option data-ev-id="ev_4862478ce5" value="cancelled">Storniert</option>
                <option data-ev-id="ev_88b9b26be2" value="completed">Abgeschlossen</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <Card>
          <CardContent className="p-0">
            {filteredBookings.length === 0 ?
            <div data-ev-id="ev_61a4dd3cf2" className="text-center py-12 text-muted-foreground">
                <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p data-ev-id="ev_329f5411e2">Keine Buchungen gefunden.</p>
              </div> :

            <div data-ev-id="ev_e48afa0998" className="overflow-x-auto">
                <table data-ev-id="ev_f9fb23bf7b" className="w-full">
                  <thead data-ev-id="ev_94d381ec8c">
                    <tr data-ev-id="ev_5b5c65fe80" className="border-b border-border">
                      <th data-ev-id="ev_cc560023c6" className="text-left p-4 text-sm font-medium text-muted-foreground">Buchung</th>
                      <th data-ev-id="ev_be810b2cb1" className="text-left p-4 text-sm font-medium text-muted-foreground">Gast</th>
                      <th data-ev-id="ev_6de939ff0b" className="text-left p-4 text-sm font-medium text-muted-foreground">Zeitraum</th>
                      <th data-ev-id="ev_7193f85c05" className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th data-ev-id="ev_6cbe8781fd" className="text-left p-4 text-sm font-medium text-muted-foreground">Zahlung</th>
                      <th data-ev-id="ev_d93a582434" className="text-right p-4 text-sm font-medium text-muted-foreground">Betrag</th>
                      <th data-ev-id="ev_f277456ae9" className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody data-ev-id="ev_48b9aa54eb">
                    {filteredBookings.map((booking) =>
                  <tr data-ev-id="ev_17414c5b31" key={booking.id} className="border-b border-border hover:bg-muted/50">
                        <td data-ev-id="ev_eaadc4b954" className="p-4">
                          <p data-ev-id="ev_82b2c9ce39" className="font-medium">{booking.booking_number}</p>
                          <p data-ev-id="ev_ceb3ff8e28" className="text-xs text-muted-foreground">
                            {booking.source === 'direct' ? 'Direkt' :
                        booking.source === 'booking' ? 'Booking.com' :
                        booking.source === 'airbnb' ? 'Airbnb' : booking.source}
                          </p>
                        </td>
                        <td data-ev-id="ev_e7746baa55" className="p-4">
                          <p data-ev-id="ev_29bc4296e9" className="font-medium">
                            {booking.customer ?
                        `${booking.customer.first_name} ${booking.customer.last_name}` :
                        'Unbekannt'}
                          </p>
                          <p data-ev-id="ev_3da9a1d60e" className="text-xs text-muted-foreground">{booking.customer?.email}</p>
                        </td>
                        <td data-ev-id="ev_a424432bff" className="p-4">
                          <p data-ev-id="ev_053dbf680a" className="text-sm">
                            {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                          </p>
                        </td>
                        <td data-ev-id="ev_e45701c053" className="p-4">
                          <span data-ev-id="ev_b18141cb8c" className={`px-2 py-1 rounded text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-success/10 text-success' :
                      booking.status === 'pending' ? 'bg-warning/10 text-warning' :
                      booking.status === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                      'bg-muted text-muted-foreground'}`
                      }>
                            {booking.status === 'confirmed' ? 'Bestätigt' :
                        booking.status === 'pending' ? 'Neue Anfrage' :
                        booking.status === 'cancelled' ? 'Storniert' : 'Abgeschlossen'}
                          </span>
                        </td>
                        <td data-ev-id="ev_5f9213cda8" className="p-4">
                          <div data-ev-id="ev_558237d954" className="flex items-center gap-2">
                            {booking.fully_paid ?
                        <span data-ev-id="ev_d587a70614" className="text-success text-xs">Bezahlt</span> :
                        booking.deposit_paid ?
                        <span data-ev-id="ev_188f6dd27f" className="text-warning text-xs">Anzahlung</span> :

                        <span data-ev-id="ev_7285f934b6" className="text-destructive text-xs">Offen</span>
                        }
                          </div>
                        </td>
                        <td data-ev-id="ev_c498878189" className="p-4 text-right font-semibold">
                          {formatCurrency(booking.total_price)}
                        </td>
                        <td data-ev-id="ev_f4303dcce7" className="p-4">
                          <div data-ev-id="ev_e0cc3405f2" className="flex items-center gap-2">
                            {booking.status === 'pending' &&
                        <Link to={`/admin/buchungen/${booking.id}`}>
                          <Button
                            size="sm"
                            className="gap-1 bg-warning text-warning-foreground hover:bg-warning/90">

                            <Clock className="w-3 h-3" />
                            Prüfen & Freigeben
                          </Button>
                        </Link>
                        }
                            <Link to={`/admin/buchungen/${booking.id}`}>
                              <Button size="sm" variant="ghost">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </AdminLayout>);

}