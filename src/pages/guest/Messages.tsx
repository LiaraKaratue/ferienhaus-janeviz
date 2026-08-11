import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { GuestLayout } from '@/components/layout/GuestLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/lib/utils';
import { MessageSquare, Send, ArrowLeft, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender_type: 'guest' | 'host';
  created_at: string;
  is_read: boolean;
}

export default function Messages() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!supabase || !user) return;

    const fetchMessages = async () => {
      // Get the user's booking first
      const { data: access } = await supabase.
      from('guest_access').
      select('booking_id').
      eq('user_id', user.id).
      limit(1).
      single();

      if (!access) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('booking_id', access.booking_id)
        .order('created_at', { ascending: true });

      setMessages((data ?? []).map(m => ({
        ...m,
        sender_type: m.sender_type as 'guest' | 'host',
      })));
      setLoading(false);

      // Mark messages as read
      await supabase.
      from('messages').
      update({ is_read: true }).
      eq('booking_id', access.booking_id).
      eq('sender_type', 'host').
      eq('is_read', false);
    };

    fetchMessages();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!supabase || !user || !newMessage.trim()) return;

    setSending(true);

    try {
      const { data: access } = await supabase.
      from('guest_access').
      select('booking_id').
      eq('user_id', user.id).
      limit(1).
      single();

      if (!access) throw new Error('Keine Buchung gefunden');

      const { data, error } = await supabase.
      from('messages').
      insert({
        booking_id: access.booking_id,
        content: newMessage.trim(),
        sender_type: 'guest'
      }).
      select().
      single();

      if (error) throw error;

      setMessages((prev) => [...prev, { ...data, sender_type: data.sender_type as 'guest' | 'host' }]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  if (authLoading || loading) {
    return (
      <GuestLayout title="Nachrichten" subtitle="Kommunikation mit Ihrem Gastgeber">
        <div data-ev-id="ev_0b1aa858b6" className="min-h-[80vh] flex items-center justify-center">
          <div data-ev-id="ev_36ca235452" className="animate-pulse text-muted-foreground">Laden...</div>
        </div>
      </GuestLayout>);

  }

  return (
    <GuestLayout title="Nachrichten" subtitle="Kommunikation mit Ihrem Gastgeber">
      <div data-ev-id="ev_a61c9974d1" className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/portal" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Portal
        </Link>

        <Card className="flex flex-col h-[70vh]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Nachrichten
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col overflow-hidden">
            {/* Messages List */}
            <div data-ev-id="ev_0d13a12c1e" className="flex-1 overflow-y-auto flex flex-col gap-4 mb-4">
              {messages.length === 0 ?
              <div data-ev-id="ev_2e430ff9bc" className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div data-ev-id="ev_807d856fb7" className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p data-ev-id="ev_f943444d83">Noch keine Nachrichten.</p>
                    <p data-ev-id="ev_223d7f8f7f" className="text-sm">Schreiben Sie uns bei Fragen!</p>
                  </div>
                </div> :

              messages.map((message) =>
              <div data-ev-id="ev_a3bfe9a717"
              key={message.id}
              className={`flex ${message.sender_type === 'guest' ? 'justify-end' : 'justify-start'}`}>

                    <div data-ev-id="ev_1d5a518745" className={`max-w-[80%] ${message.sender_type === 'guest' ? 'order-2' : 'order-1'}`}>
                      <div data-ev-id="ev_6096c44354"
                  className={`rounded-lg px-4 py-2 ${
                  message.sender_type === 'guest' ?
                  'bg-primary text-primary-foreground' :
                  'bg-muted'}`
                  }>

                        <p data-ev-id="ev_ee69245fdf" className="text-sm">{message.content}</p>
                      </div>
                      <p data-ev-id="ev_642ee19ccf" className="text-xs text-muted-foreground mt-1">
                        {formatDate(message.created_at, { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div data-ev-id="ev_a65c043f5b" className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mx-2 ${
                message.sender_type === 'guest' ? 'bg-primary order-1' : 'bg-secondary order-2'}`
                }>
                      <User className={`w-4 h-4 ${
                  message.sender_type === 'guest' ? 'text-primary-foreground' : 'text-secondary-foreground'}`
                  } />
                    </div>
                  </div>
              )
              }
              <div data-ev-id="ev_364b3751f0" ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div data-ev-id="ev_b2bd87801d" className="flex gap-2">
              <input data-ev-id="ev_ad551ef8e9"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ihre Nachricht..."
              className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />

              <Button onClick={handleSend} disabled={sending || !newMessage.trim()} className="gap-2">
                <Send className="w-4 h-4" />
                Senden
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </GuestLayout>);

}