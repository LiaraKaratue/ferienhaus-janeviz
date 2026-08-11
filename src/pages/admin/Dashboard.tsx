import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  CalendarDays, Users, TrendingUp, AlertCircle,
  ChevronRight, Bell } from
'lucide-react';

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  upcomingBookings: number;
  totalRevenue: number;
  unreadMessages: number;
}

interface RecentBooking {
  id: string;
  booking_number: string;
  check_in: string;
  check_out: string;
  status: string;
  total_price: number;
  customer: {first_name: string;last_name: string;} | null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    upcomingBookings: 0,
    totalRevenue: 0,
    unreadMessages: 0
  });
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/verwaltung');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (!supabase || !user || !isAdmin) return;

    const fetchDashboardData = async () => {
      try {
        const { data: bookings } = await supabase.
        from('bookings').
        select('id, status, total_price, check_in');

        const today = new Date().toISOString().split('T')[0];
        const allBookings = bookings ?? [];

        setStats({
          totalBookings: allBookings.length,
          pendingBookings: allBookings.filter((b) => b.status === 'pending').length,
          upcomingBookings: allBookings.filter((b) => b.status === 'confirmed' && b.check_in >= today).length,
          totalRevenue: allBookings.
          filter((b) => b.status === 'confirmed' || b.status === 'completed').
          reduce((sum, b) => sum + (b.total_price || 0), 0),
          unreadMessages: 0
        });

        const { data: recent } = await supabase.
        from('bookings').
        select(`id, booking_number, check_in, check_out, status, total_price, customer:customers(first_name, last_name)`).
        order('created_at', { ascending: false }).
        limit(5);

        setRecentBookings(
          (recent ?? []).map((b) => ({
            ...b,
            customer: Array.isArray(b.customer) ? b.customer[0] : b.customer
          }))
        );
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, isAdmin]);

  if (authLoading || loading) {
    return (
      <AdminLayout title="Dashboard" subtitle="Laden...">
        <div data-ev-id="ev_c4d1888706" className="min-h-[60vh] flex items-center justify-center">
          <div data-ev-id="ev_cf0d72b149" className="animate-pulse text-gray-400">Daten werden geladen...</div>
        </div>
      </AdminLayout>);

  }

  return (
    <AdminLayout title="Dashboard" subtitle="Übersicht deiner Ferienhausvermietung">
      {/* Alert Banner */}
      {stats.pendingBookings > 0 &&
      <Card className="mb-6 bg-amber-500/10 border-amber-500/30">
          <CardContent className="p-4">
            <div data-ev-id="ev_c76975a32e" className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-amber-400" />
              <span data-ev-id="ev_1b22bfbe59" className="text-amber-200 flex-1">
                {stats.pendingBookings} neue Anfrage{stats.pendingBookings > 1 ? 'n' : ''} warten auf Freigabe
              </span>
              <Link to="/admin/buchungen?filter=pending">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black">
                  Jetzt prüfen
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      }

      {/* Stats Grid */}
      <div data-ev-id="ev_84d8e87a58" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-[#1e293b] border-[#334155]">
          <CardContent className="p-6">
            <div data-ev-id="ev_c75fdd10a7" className="flex items-center justify-between">
              <div data-ev-id="ev_db7e88783f">
                <p data-ev-id="ev_3b6ca3a58d" className="text-sm text-gray-400">Buchungen</p>
                <p data-ev-id="ev_be58ab439e" className="text-3xl font-bold text-white">{stats.totalBookings}</p>
              </div>
              <CalendarDays className="w-10 h-10 text-blue-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-[#334155]">
          <CardContent className="p-6">
            <div data-ev-id="ev_37d19e79ed" className="flex items-center justify-between">
              <div data-ev-id="ev_e7aca57b12">
                <p data-ev-id="ev_f026c09350" className="text-sm text-gray-400">Anstehend</p>
                <p data-ev-id="ev_12a789cbb8" className="text-3xl font-bold text-white">{stats.upcomingBookings}</p>
              </div>
              <Users className="w-10 h-10 text-emerald-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-[#334155]">
          <CardContent className="p-6">
            <div data-ev-id="ev_973e946967" className="flex items-center justify-between">
              <div data-ev-id="ev_7b3bc4cf90">
                <p data-ev-id="ev_cfe36a2eb7" className="text-sm text-gray-400">Umsatz</p>
                <p data-ev-id="ev_c4a54bc559" className="text-3xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-cyan-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-[#334155]">
          <CardContent className="p-6">
            <div data-ev-id="ev_6f11d312ca" className="flex items-center justify-between">
              <div data-ev-id="ev_1027c2ff37">
                <p data-ev-id="ev_f212e04135" className="text-sm text-gray-400">Ausstehend</p>
                <p data-ev-id="ev_b34a5b0682" className="text-3xl font-bold text-white">{stats.pendingBookings}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-amber-400 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="bg-[#1e293b] border-[#334155]">
        <CardHeader className="flex flex-row items-center justify-between border-b border-[#334155]">
          <CardTitle className="text-white">Neueste Buchungen</CardTitle>
          <Link to="/admin/buchungen">
            <Button variant="ghost" size="sm" className="gap-1 text-gray-400 hover:text-white">
              Alle anzeigen
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {recentBookings.length === 0 ?
          <div data-ev-id="ev_491c3af2de" className="text-center py-12 text-gray-500">
              Noch keine Buchungen vorhanden.
            </div> :

          <div data-ev-id="ev_dbcfa98f78" className="divide-y divide-[#334155]">
              {recentBookings.map((booking) =>
            <div data-ev-id="ev_c6f8f7ee8e"
            key={booking.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-[#334155]/30 transition-colors">

                  <div data-ev-id="ev_b8d7576393">
                    <p data-ev-id="ev_fcc78386b3" className="font-medium text-white">
                      {booking.customer ?
                  `${booking.customer.first_name} ${booking.customer.last_name}` :
                  'Unbekannt'}
                    </p>
                    <p data-ev-id="ev_08ec3674ac" className="text-sm text-gray-400">
                      {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                    </p>
                    <p data-ev-id="ev_f7b76d2e9b" className="text-xs text-gray-500">#{booking.booking_number}</p>
                  </div>
                  <div data-ev-id="ev_71aa5a8493" className="flex items-center gap-4">
                    <span data-ev-id="ev_4b84d50e76"
                className={`px-2 py-1 rounded text-xs font-medium ${
                booking.status === 'confirmed' ?
                'bg-emerald-500/20 text-emerald-400' :
                booking.status === 'pending' ?
                'bg-amber-500/20 text-amber-400' :
                booking.status === 'cancelled' ?
                'bg-red-500/20 text-red-400' :
                'bg-gray-500/20 text-gray-400'}`
                }>

                      {booking.status === 'confirmed' ?
                  'Bestätigt' :
                  booking.status === 'pending' ?
                  'Neue Anfrage' :
                  booking.status === 'cancelled' ?
                  'Storniert' :
                  'Abgeschlossen'}
                    </span>
                    <span data-ev-id="ev_1acf2aecb7" className="font-semibold text-white">
                      {formatCurrency(booking.total_price)}
                    </span>
                    <Link to={`/admin/buchungen/${booking.id}`}>
                      <Button variant="outline" size="sm" className="border-[#334155] text-gray-300 hover:bg-[#334155]">
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
            )}
            </div>
          }
        </CardContent>
      </Card>
    </AdminLayout>);

}