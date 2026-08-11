import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Search, User, Mail, Phone, Calendar, MoreHorizontal } from 'lucide-react';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  created_at: string;
  bookings_count: number;
  last_booking: string | null;
}

export default function AdminCustomers() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      window.location.href = '/login';
    }
  }, [isAdmin, authLoading]);

  useEffect(() => {
    if (supabase && isAdmin) {
      fetchCustomers();
    }
  }, [isAdmin]);

  const fetchCustomers = async () => {
    if (!supabase) return;

    const { data } = await supabase.
    from('customers').
    select(`
        id, first_name, last_name, email, phone, created_at,
        bookings:bookings(id, check_in)
      `).
    order('created_at', { ascending: false });

    if (data) {
      const mapped = data.map((c) => {
        const bookings = Array.isArray(c.bookings) ? c.bookings : [];
        const sortedBookings = bookings.sort((a, b) =>
        new Date(b.check_in).getTime() - new Date(a.check_in).getTime()
        );
        return {
          ...c,
          bookings_count: bookings.length,
          last_booking: sortedBookings[0]?.check_in || null
        };
      });
      setCustomers(mapped);
    }
    setLoading(false);
  };

  const filteredCustomers = customers.filter((c) =>
  `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
  c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <AdminLayout title="Kunden" subtitle="Kundendaten verwalten">
        <div data-ev-id="ev_dff53f2a56" className="min-h-[80vh] flex items-center justify-center">
          <div data-ev-id="ev_992ade06a2" className="animate-pulse text-muted-foreground">Laden...</div>
        </div>
      </AdminLayout>);

  }

  return (
    <AdminLayout title="Kunden" subtitle="Kundendaten verwalten">
      <div data-ev-id="ev_ae56c41a7c" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Dashboard
        </Link>

        <div data-ev-id="ev_a6e9516142" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 data-ev-id="ev_b48fb84409" className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Kunden ({customers.length})
          </h1>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div data-ev-id="ev_155640c08c" className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input data-ev-id="ev_5bf4343ac0"
              type="text"
              placeholder="Suchen nach Name oder E-Mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background text-sm" />

            </div>
          </CardContent>
        </Card>

        {/* Customer List */}
        <div data-ev-id="ev_6638771685" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) =>
          <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div data-ev-id="ev_792c1f79ed" className="flex items-start justify-between mb-3">
                  <div data-ev-id="ev_4d6c9fca8d" className="flex items-center gap-3">
                    <div data-ev-id="ev_85e9630880" className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-secondary" />
                    </div>
                    <div data-ev-id="ev_3b32a8f964">
                      <p data-ev-id="ev_584e3c87cc" className="font-semibold">{customer.first_name} {customer.last_name}</p>
                      <p data-ev-id="ev_6900a7245b" className="text-xs text-muted-foreground">
                        {customer.bookings_count} Buchung{customer.bookings_count !== 1 && 'en'}
                      </p>
                    </div>
                  </div>
                </div>

                <div data-ev-id="ev_7fb56ce3a5" className="flex flex-col gap-2 text-sm">
                  <div data-ev-id="ev_33a3994edd" className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span data-ev-id="ev_3d8d77af5e" className="truncate">{customer.email}</span>
                  </div>
                  {customer.phone &&
                <div data-ev-id="ev_a7331ee8af" className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span data-ev-id="ev_62b9daedff">{customer.phone}</span>
                    </div>
                }
                  {customer.last_booking &&
                <div data-ev-id="ev_bf7e91134c" className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span data-ev-id="ev_91c7aeea81">Letzter Aufenthalt: {formatDate(customer.last_booking, { month: 'short', year: 'numeric' })}</span>
                    </div>
                }
                </div>

                <div data-ev-id="ev_ed0d8abab8" className="mt-4 pt-3 border-t border-border">
                  <Link to={`/admin/buchungen?customer=${customer.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Buchungen ansehen
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {filteredCustomers.length === 0 &&
        <div data-ev-id="ev_94c2b83cbb" className="text-center py-12 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p data-ev-id="ev_f0d66d8e47">Keine Kunden gefunden.</p>
          </div>
        }
      </div>
    </AdminLayout>);

}