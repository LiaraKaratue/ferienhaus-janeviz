import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, MessageSquare, Send, User, Clock, CheckCheck, Search } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Message {
  id: string;
  booking_id: string;
  content: string;
  sender_type: 'guest' | 'host';
  is_read: boolean;
  created_at: string;
}

interface Conversation {
  booking_id: string;
  booking_number: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

export default function AdminMessages() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      window.location.href = '/login';
    }
  }, [isAdmin, authLoading]);

  useEffect(() => {
    if (supabase && isAdmin) {
      fetchConversations();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (selectedBooking) {
      fetchMessages(selectedBooking);
      markAsRead(selectedBooking);
    }
  }, [selectedBooking]);

  const fetchConversations = async () => {
    if (!supabase) return;

    // Get all bookings with their messages
    const { data: bookings } = await supabase.
    from('bookings').
    select(`
        id, booking_number, check_in, check_out,
        customer:customers(first_name, last_name, email)
      `).
    order('created_at', { ascending: false });

    if (!bookings) {
      setLoading(false);
      return;
    }

    // Get message counts and last messages for each booking
    const conversationsData: Conversation[] = [];

    for (const booking of bookings) {
      const { data: messages } = await supabase.
      from('messages').
      select('*').
      eq('booking_id', booking.id).
      order('created_at', { ascending: false });

      if (messages && messages.length > 0) {
        const customer = Array.isArray(booking.customer) ? booking.customer[0] : booking.customer;
        const unreadCount = messages.filter((m) => m.sender_type === 'guest' && !m.is_read).length;

        conversationsData.push({
          booking_id: booking.id,
          booking_number: booking.booking_number,
          guest_name: customer ? `${customer.first_name} ${customer.last_name}` : 'Unbekannt',
          guest_email: customer?.email || '',
          check_in: booking.check_in,
          check_out: booking.check_out,
          last_message: messages[0].content,
          last_message_time: messages[0].created_at,
          unread_count: unreadCount
        });
      }
    }

    // Sort by last message time
    conversationsData.sort((a, b) =>
    new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime()
    );

    setConversations(conversationsData);
    setLoading(false);
  };

  const fetchMessages = async (bookingId: string) => {
    if (!supabase) return;

    const { data } = await supabase.
    from('messages').
    select('*').
    eq('booking_id', bookingId).
    order('created_at', { ascending: true });

    setMessages((data ?? []).map((m) => ({
      ...m,
      sender_type: m.sender_type as 'guest' | 'host'
    })));
  };

  const markAsRead = async (bookingId: string) => {
    if (!supabase) return;

    await supabase.
    from('messages').
    update({ is_read: true }).
    eq('booking_id', bookingId).
    eq('sender_type', 'guest').
    eq('is_read', false);

    // Update local state
    setConversations((prev) => prev.map((c) =>
    c.booking_id === bookingId ? { ...c, unread_count: 0 } : c
    ));
  };

  const handleSend = async () => {
    if (!supabase || !selectedBooking || !newMessage.trim()) return;

    setSending(true);

    const { data, error } = await supabase.
    from('messages').
    insert({
      booking_id: selectedBooking,
      content: newMessage.trim(),
      sender_type: 'host',
      is_read: false
    }).
    select().
    single();

    if (!error && data) {
      setMessages((prev) => [...prev, { ...data, sender_type: 'host' as const }]);
      setNewMessage('');

      // Update conversation list
      setConversations((prev) => prev.map((c) =>
      c.booking_id === selectedBooking ?
      { ...c, last_message: data.content, last_message_time: data.created_at } :
      c
      ));
    }

    setSending(false);
  };

  const filteredConversations = conversations.filter((c) =>
  c.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  c.guest_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  c.booking_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConversation = conversations.find((c) => c.booking_id === selectedBooking);

  if (authLoading || loading) {
    return (
      <AdminLayout title="Nachrichten" subtitle="Kommunikation mit Gästen">
        <div data-ev-id="ev_23fc3c6291" className="min-h-[80vh] flex items-center justify-center">
          <div data-ev-id="ev_fbe28a597b" className="animate-pulse text-muted-foreground">Laden...</div>
        </div>
      </AdminLayout>);

  }

  return (
    <AdminLayout title="Nachrichten" subtitle="Kommunikation mit Gästen">
      <div data-ev-id="ev_9681ee20e6" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Dashboard
        </Link>

        <h1 data-ev-id="ev_c70523982a" className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8">
          Nachrichten
        </h1>

        <div data-ev-id="ev_3d316c7143" className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-280px)] min-h-[500px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader className="pb-3">
              <div data-ev-id="ev_969be36df1" className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input data-ev-id="ev_3ab3d32476"
                type="text"
                placeholder="Suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-3 rounded-lg border border-input bg-background text-sm" />

              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              {filteredConversations.length === 0 ?
              <div data-ev-id="ev_c977457b96" className="p-6 text-center text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p data-ev-id="ev_7fe5cca335">Keine Nachrichten vorhanden</p>
                </div> :

              <div data-ev-id="ev_b0be3e1d52" className="flex flex-col">
                  {filteredConversations.map((conv) =>
                <button data-ev-id="ev_c332dbee51"
                key={conv.booking_id}
                onClick={() => setSelectedBooking(conv.booking_id)}
                className={`w-full text-left p-4 border-b border-border hover:bg-muted/50 transition-colors ${
                selectedBooking === conv.booking_id ? 'bg-muted' : ''}`
                }>

                      <div data-ev-id="ev_17cc1f6546" className="flex items-start justify-between gap-2">
                        <div data-ev-id="ev_2a4c4bf21d" className="flex-1 min-w-0">
                          <div data-ev-id="ev_f87f00e0de" className="flex items-center gap-2">
                            <p data-ev-id="ev_fc7ee855ad" className="font-medium text-foreground truncate">{conv.guest_name}</p>
                            {conv.unread_count > 0 &&
                        <span data-ev-id="ev_a186ccbe1c" className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full">
                                {conv.unread_count}
                              </span>
                        }
                          </div>
                          <p data-ev-id="ev_8743efc345" className="text-xs text-muted-foreground">#{conv.booking_number}</p>
                          <p data-ev-id="ev_c469f4adbb" className="text-sm text-muted-foreground truncate mt-1">
                            {conv.last_message}
                          </p>
                        </div>
                        <span data-ev-id="ev_4e8bd8bcbd" className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(conv.last_message_time, { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                    </button>
                )}
                </div>
              }
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedBooking && selectedConversation ?
            <>
                <CardHeader className="border-b border-border">
                  <div data-ev-id="ev_c0cd08dbd1" className="flex items-center justify-between">
                    <div data-ev-id="ev_c79c740f58">
                      <CardTitle className="text-lg">{selectedConversation.guest_name}</CardTitle>
                      <p data-ev-id="ev_a13cb998c8" className="text-sm text-muted-foreground">
                        Buchung #{selectedConversation.booking_number} · 
                        {formatDate(selectedConversation.check_in, { day: '2-digit', month: 'short' })} - 
                        {formatDate(selectedConversation.check_out, { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                    <Link to={`/admin/buchungen`}>
                      <Button variant="outline" size="sm">Buchung ansehen</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div data-ev-id="ev_809b5acaff" className="flex flex-col gap-4">
                    {messages.map((message) =>
                  <div data-ev-id="ev_d56718b560"
                  key={message.id}
                  className={`flex ${message.sender_type === 'host' ? 'justify-end' : 'justify-start'}`}>

                        <div data-ev-id="ev_4eeb59699e"
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender_type === 'host' ?
                    'bg-secondary text-white rounded-br-md' :
                    'bg-muted rounded-bl-md'}`
                    }>

                          <p data-ev-id="ev_048ebdb817" className="text-sm">{message.content}</p>
                          <div data-ev-id="ev_878150be86" className={`flex items-center gap-1 mt-1 ${
                      message.sender_type === 'host' ? 'justify-end' : ''}`
                      }>
                            <span data-ev-id="ev_fc1ce632a7" className={`text-xs ${
                        message.sender_type === 'host' ? 'text-white/70' : 'text-muted-foreground'}`
                        }>
                              {formatDate(message.created_at, { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.sender_type === 'host' && message.is_read &&
                        <CheckCheck className="w-3 h-3 text-white/70" />
                        }
                          </div>
                        </div>
                      </div>
                  )}
                  </div>
                </CardContent>
                <div data-ev-id="ev_063df82082" className="p-4 border-t border-border">
                  <div data-ev-id="ev_a09f58794d" className="flex gap-2">
                    <input data-ev-id="ev_a2156ec206"
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Nachricht schreiben..."
                  className="flex-1 h-10 px-4 rounded-full border border-input bg-background text-sm" />

                    <Button
                    onClick={handleSend}
                    disabled={sending || !newMessage.trim()}
                    className="rounded-full w-10 h-10 p-0 bg-secondary hover:bg-secondary/90">

                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </> :

            <div data-ev-id="ev_feccbad8f9" className="flex-1 flex items-center justify-center text-muted-foreground">
                <div data-ev-id="ev_bd1c1878c4" className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p data-ev-id="ev_377f9dc130">Wähle eine Konversation aus</p>
                </div>
              </div>
            }
          </Card>
        </div>
      </div>
    </AdminLayout>);

}