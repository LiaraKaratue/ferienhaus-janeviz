import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  ArrowLeft, User, Calendar, CreditCard, Mail, Phone,
  FileText, Key, CheckCircle, AlertCircle, MessageSquare,
  Loader2, Copy, Check, X, Sparkles, Send } from
'lucide-react';

interface BookingDetail {
  id: string;
  booking_number: string;
  check_in: string;
  check_out: string;
  status: string;
  total_price: number;
  deposit_amount: number | null;
  deposit_paid: boolean;
  fully_paid: boolean;
  guests_adults: number;
  guests_children: number;
  special_requests: string | null;
  source: string;
  created_at: string;
  customer: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
  } | null;
}

interface GuestAccess {
  id: string;
  user_id: string;
  access_granted_at: string;
  access_expires_at: string;
}

interface Contract {
  id: string;
  signed_at: string | null;
}

export default function AdminBookingDetail() {
  const { id } = useParams<{id: string;}>();
  const { isAdmin, loading: authLoading } = useAuth();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [guestAccess, setGuestAccess] = useState<GuestAccess | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loginLink, setLoginLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      window.location.href = '/login';
    }
  }, [isAdmin, authLoading]);

  useEffect(() => {
    const loadData = async () => {
      if (!supabase || !id) return;

      const { data } = await supabase
        .from('bookings')
        .select(`*, customer:customers(*)`)
        .eq('id', id)
        .single();

      if (data) {
        const customer = Array.isArray(data.customer) ? data.customer[0] : data.customer;
        setBooking({ ...data, customer });

        const { data: accessData } = await supabase
          .from('guest_access')
          .select('*')
          .eq('booking_id', id)
          .single();
        if (accessData) setGuestAccess(accessData);

        const { data: contractData } = await supabase
          .from('contracts')
          .select('id, signed_at')
          .eq('booking_id', id)
          .single();
        if (contractData) setContract(contractData);
      }

      setLoading(false);
    };

    if (isAdmin && id) {
      loadData();
    }
  }, [isAdmin, id]);

  const refreshData = async () => {
    if (!supabase || !id) return;

    const { data } = await supabase
      .from('bookings')
      .select(`*, customer:customers(*)`)
      .eq('id', id)
      .single();

    if (data) {
      const customer = Array.isArray(data.customer) ? data.customer[0] : data.customer;
      setBooking({ ...data, customer });

      const { data: accessData } = await supabase
        .from('guest_access')
        .select('*')
        .eq('booking_id', id)
        .single();
      if (accessData) setGuestAccess(accessData);

      const { data: contractData } = await supabase
        .from('contracts')
        .select('id, signed_at')
        .eq('booking_id', id)
        .single();
      if (contractData) setContract(contractData);
    }
  };

  // One-Click: Bestätigen + Zugang + Vertrag + Nachricht
  const handleOneClickConfirm = async () => {
    if (!supabase || !booking || !booking.customer) return;

    setProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      const email = booking.customer.email;
      const password = generatePassword();

      // 1. Buchung bestätigen
      await supabase.
      from('bookings').
      update({ status: 'confirmed' }).
      eq('id', booking.id);

      // 2. Auth-User erstellen
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: booking.customer.first_name,
            last_name: booking.customer.last_name
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Benutzer konnte nicht erstellt werden');

      // 3. Guest Access anlegen (30 Tage nach Checkout)
      const expiryDate = new Date(booking.check_out);
      expiryDate.setDate(expiryDate.getDate() + 30);

      await supabase.from('guest_access').insert({
        booking_id: booking.id,
        user_id: authData.user.id,
        access_granted_at: new Date().toISOString(),
        access_expires_at: expiryDate.toISOString()
      });

      // 4. Vertrag erstellen
      await supabase.from('contracts').insert({
        booking_id: booking.id,
        contract_data: {
          guest_name: `${booking.customer.first_name} ${booking.customer.last_name}`,
          guest_email: booking.customer.email,
          check_in: booking.check_in,
          check_out: booking.check_out,
          total_price: booking.total_price,
          deposit_amount: booking.deposit_amount,
          guests_adults: booking.guests_adults,
          guests_children: booking.guests_children
        }
      });

      // 5. Willkommensnachricht
      await supabase.from('messages').insert({
        booking_id: booking.id,
        content: `Liebe/r ${booking.customer.first_name},\n\nvielen Dank für Ihre Buchung im Ferienhaus Janeviz!\n\nIhre Buchung #${booking.booking_number} wurde bestätigt.\n\nZeitraum: ${formatDate(booking.check_in, { day: '2-digit', month: 'long' })} - ${formatDate(booking.check_out, { day: '2-digit', month: 'long', year: 'numeric' })}\n\nIn Ihrem Gästeportal finden Sie:\n• Ihren Mietvertrag zum Unterschreiben\n• Alle wichtigen Dokumente (Hausordnung, WLAN, Anreise)\n• Direkten Kontakt zu uns\n\nWir freuen uns auf Sie!\n\nHerzliche Grüße,\nIhr Janeviz-Team`,
        sender_type: 'host',
        is_read: false
      });

      // Login-Link generieren
      const siteUrl = window.location.origin;
      setLoginLink(`${siteUrl}/login`);

      setSuccess(`Alles erledigt! Zugangsdaten für ${email}:\nPasswort: ${password}`);
      refreshData();

    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setProcessing(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!supabase || !booking) return;
    await supabase.from('bookings').update({ status: newStatus }).eq('id', booking.id);
    setBooking({ ...booking, status: newStatus });
  };

  const handlePaymentToggle = async (field: 'deposit_paid' | 'fully_paid') => {
    if (!supabase || !booking) return;
    const newValue = !booking[field];
    await supabase.from('bookings').update({ [field]: newValue }).eq('id', booking.id);
    setBooking({ ...booking, [field]: newValue });
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusConfig: Record<string, {color: string;label: string;}> = {
    pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Ausstehend' },
    confirmed: { color: 'bg-green-100 text-green-800', label: 'Bestätigt' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Storniert' },
    completed: { color: 'bg-blue-100 text-blue-800', label: 'Abgeschlossen' }
  };

  if (authLoading || loading) {
    return (
      <AdminLayout title="Buchungsdetails" subtitle="Buchung verwalten">
        <div data-ev-id="ev_80716671e3" className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        </div>
      </AdminLayout>);

  }

  if (!booking) {
    return (
      <AdminLayout title="Buchungsdetails" subtitle="Buchung verwalten">
        <div data-ev-id="ev_d6771c762b" className="max-w-7xl mx-auto px-4 py-8">
          <p data-ev-id="ev_d0b7e1782d">Buchung nicht gefunden.</p>
        </div>
      </AdminLayout>);

  }

  const canOneClickConfirm = booking.status === 'pending' && !guestAccess && booking.customer;

  return (
    <AdminLayout title="Buchungsdetails" subtitle="Buchung verwalten">
      <div data-ev-id="ev_ad9f95b925" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/admin/buchungen" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Zurück zu Buchungen
        </Link>

        <div data-ev-id="ev_271728f786" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div data-ev-id="ev_4b8465535e">
            <h1 data-ev-id="ev_3c442d81c1" className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Buchung #{booking.booking_number}
            </h1>
            <p data-ev-id="ev_5531cc1af5" className="text-muted-foreground">
              {formatDate(booking.created_at, { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <span data-ev-id="ev_6338a56eb8" className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[booking.status || 'pending'].color}`}>
            {statusConfig[booking.status || 'pending'].label}
          </span>
        </div>

        {/* One-Click Confirm Banner */}
        {canOneClickConfirm &&
        <Card className="mb-6 border-secondary bg-secondary/5">
            <CardContent className="p-6">
              <div data-ev-id="ev_fae7122a7d" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div data-ev-id="ev_eb8e2c0c52" className="flex items-start gap-4">
                  <div data-ev-id="ev_1cd5ea1128" className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-secondary" />
                  </div>
                  <div data-ev-id="ev_af27c375c5">
                    <h3 data-ev-id="ev_0533934fee" className="font-semibold text-foreground">Anfrage freigeben</h3>
                    <p data-ev-id="ev_3940116ef7" className="text-sm text-muted-foreground">
                      Mit einem Klick: Buchung bestätigen, Gästezugang erstellen, Vertrag & Willkommensnachricht senden.
                    </p>
                  </div>
                </div>
                <Button
                onClick={handleOneClickConfirm}
                disabled={processing}
                className="gap-2 bg-secondary hover:bg-secondary/90 whitespace-nowrap">

                  {processing ?
                <Loader2 className="w-4 h-4 animate-spin" /> :

                <Check className="w-4 h-4" />
                }
                  Freigeben
                </Button>
              </div>

              {error &&
            <div data-ev-id="ev_f2adddfc67" className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                  {error}
                </div>
            }

              {success &&
            <div data-ev-id="ev_b41803c09c" className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p data-ev-id="ev_94754fc44a" className="text-sm text-green-800 font-medium mb-2">✅ {success.split('\n')[0]}</p>
                  <div data-ev-id="ev_72bde089e1" className="bg-white p-3 rounded border border-green-200">
                    <p data-ev-id="ev_43cdc836f6" className="text-xs text-green-700 mb-1">Zugangsdaten zum Kopieren:</p>
                    <pre data-ev-id="ev_b0f6c052f8" className="text-sm font-mono whitespace-pre-wrap">{success.split('\n').slice(1).join('\n')}</pre>
                  </div>
                  <div data-ev-id="ev_2ffce542b4" className="flex gap-2 mt-3">
                    <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(success)}
                  className="gap-1">

                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Kopiert!' : 'Kopieren'}
                    </Button>
                    {loginLink &&
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(`Login: ${loginLink}\n${success.split('\n').slice(1).join('\n')}`)}
                  className="gap-1">

                        <Send className="w-3 h-3" />
                        Mit Link kopieren
                      </Button>
                }
                  </div>
                </div>
            }
            </CardContent>
          </Card>
        }

        <div data-ev-id="ev_5e49d7f580" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div data-ev-id="ev_002a8fb1e4" className="lg:col-span-2 flex flex-col gap-6">
            {/* Guest */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-secondary" />
                  Gast
                </CardTitle>
              </CardHeader>
              <CardContent>
                {booking.customer ?
                <div data-ev-id="ev_5653d167df" className="flex flex-col gap-2">
                    <p data-ev-id="ev_89b5141b27" className="text-lg font-semibold">
                      {booking.customer.first_name} {booking.customer.last_name}
                    </p>
                    <a data-ev-id="ev_0fdb9af37c" href={`mailto:${booking.customer.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                      <Mail className="w-4 h-4" />
                      {booking.customer.email}
                    </a>
                    {booking.customer.phone &&
                  <a data-ev-id="ev_0a782119b2" href={`tel:${booking.customer.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <Phone className="w-4 h-4" />
                        {booking.customer.phone}
                      </a>
                  }
                  </div> :

                <p data-ev-id="ev_7fa86cab2f" className="text-muted-foreground">Keine Gastdaten</p>
                }
              </CardContent>
            </Card>

            {/* Stay */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  Aufenthalt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div data-ev-id="ev_7d95f6f630" className="grid grid-cols-2 gap-4">
                  <div data-ev-id="ev_e86ff2eea1">
                    <p data-ev-id="ev_8c58e84dcb" className="text-sm text-muted-foreground">Check-in</p>
                    <p data-ev-id="ev_44439204a8" className="font-medium">{formatDate(booking.check_in, { weekday: 'short', day: '2-digit', month: 'long' })}</p>
                  </div>
                  <div data-ev-id="ev_2c104ef5e6">
                    <p data-ev-id="ev_131207d031" className="text-sm text-muted-foreground">Check-out</p>
                    <p data-ev-id="ev_c093b83efe" className="font-medium">{formatDate(booking.check_out, { weekday: 'short', day: '2-digit', month: 'long' })}</p>
                  </div>
                  <div data-ev-id="ev_8e051545ec">
                    <p data-ev-id="ev_5c99049c15" className="text-sm text-muted-foreground">Gäste</p>
                    <p data-ev-id="ev_af4229fd6c" className="font-medium">{booking.guests_adults} Erw.{booking.guests_children > 0 && `, ${booking.guests_children} Kind.`}</p>
                  </div>
                  <div data-ev-id="ev_666f21bff0">
                    <p data-ev-id="ev_0e5663fbd4" className="text-sm text-muted-foreground">Quelle</p>
                    <p data-ev-id="ev_18680dd55d" className="font-medium capitalize">{booking.source || 'Direkt'}</p>
                  </div>
                </div>
                {booking.special_requests &&
                <div data-ev-id="ev_533abdf053" className="mt-4 pt-4 border-t">
                    <p data-ev-id="ev_f356ed2ecf" className="text-sm text-muted-foreground mb-1">Besondere Wünsche</p>
                    <p data-ev-id="ev_87c4c98a1c">{booking.special_requests}</p>
                  </div>
                }
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-secondary" />
                  Zahlung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div data-ev-id="ev_16791c0bc6" className="flex flex-col gap-4">
                  <div data-ev-id="ev_54d24b17b8" className="flex justify-between items-center">
                    <span data-ev-id="ev_417aa4247a" className="text-muted-foreground">Gesamtpreis</span>
                    <span data-ev-id="ev_c2febaae2d" className="font-bold text-lg">{formatCurrency(booking.total_price)}</span>
                  </div>
                  <div data-ev-id="ev_096788c2b1" className="flex justify-between items-center">
                    <span data-ev-id="ev_dc0143a989" className="text-muted-foreground">Anzahlung ({formatCurrency(booking.deposit_amount || 0)})</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePaymentToggle('deposit_paid')}
                      className={booking.deposit_paid ? 'bg-green-600 hover:bg-green-700' : ''}>

                      {booking.deposit_paid ? <><CheckCircle className="w-4 h-4 mr-1" /> Bezahlt</> : 'Als bezahlt markieren'}
                    </Button>
                  </div>
                  <div data-ev-id="ev_ff43f9d648" className="flex justify-between items-center">
                    <span data-ev-id="ev_868d8ae553" className="text-muted-foreground">Restzahlung ({formatCurrency(booking.total_price - (booking.deposit_amount || 0))})</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePaymentToggle('fully_paid')}
                      className={booking.fully_paid ? 'bg-green-600 hover:bg-green-700' : ''}>

                      {booking.fully_paid ? <><CheckCircle className="w-4 h-4 mr-1" /> Bezahlt</> : 'Als bezahlt markieren'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div data-ev-id="ev_2571e56e23" className="flex flex-col gap-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status ändern</CardTitle>
              </CardHeader>
              <CardContent>
                <div data-ev-id="ev_5c733dafd1" className="grid grid-cols-2 gap-2">
                  {Object.entries(statusConfig).map(([status, config]) =>
                  <Button
                    key={status}
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(status)}
                    disabled={booking.status === status}
                    className="text-xs">

                      {config.label}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Access Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-secondary" />
                  Gästezugang
                </CardTitle>
              </CardHeader>
              <CardContent>
                {guestAccess ?
                <div data-ev-id="ev_f1d2002669" className="flex flex-col gap-3">
                    <div data-ev-id="ev_d51ef441bf" className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span data-ev-id="ev_ba67a7bca1" className="font-medium">Aktiv</span>
                    </div>
                    <p data-ev-id="ev_bf7fa4ab0f" className="text-sm text-muted-foreground">
                      Gültig bis {formatDate(guestAccess.access_expires_at, { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div> :

                <div data-ev-id="ev_d91714533a" className="flex items-center gap-2 text-muted-foreground">
                    <AlertCircle className="w-5 h-5" />
                    <span data-ev-id="ev_dd7390c576">Noch nicht erstellt</span>
                  </div>
                }
              </CardContent>
            </Card>

            {/* Contract Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  Vertrag
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contract ?
                <div data-ev-id="ev_7528cac169" className="flex items-center gap-2">
                    {contract.signed_at ?
                  <><CheckCircle className="w-5 h-5 text-green-600" /><span data-ev-id="ev_afb1dfbee8" className="text-green-600 font-medium">Unterschrieben</span></> :

                  <><AlertCircle className="w-5 h-5 text-yellow-600" /><span data-ev-id="ev_bfc0a6dee4" className="text-yellow-600">Wartet auf Unterschrift</span></>
                  }
                  </div> :

                <div data-ev-id="ev_d67a9f1707" className="flex items-center gap-2 text-muted-foreground">
                    <AlertCircle className="w-5 h-5" />
                    <span data-ev-id="ev_2d31db0955">Noch nicht erstellt</span>
                  </div>
                }
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Schnellaktionen</CardTitle>
              </CardHeader>
              <CardContent>
                <div data-ev-id="ev_15f27b14b4" className="flex flex-col gap-2">
                  <Link to="/admin/nachrichten">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Nachrichten
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>);

}