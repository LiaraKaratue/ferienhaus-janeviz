import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowLeft, Plus, Percent, Calendar, Trash2, Edit2, Save, X, Tag, Users } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount_percent: number;
  valid_from: string;
  valid_until: string;
  min_nights: number;
  is_active: boolean;
  for_returning_guests: boolean;
  created_at: string;
}

export default function AdminOffers() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount_percent: 10,
    valid_from: '',
    valid_until: '',
    min_nights: 2,
    is_active: true,
    for_returning_guests: true
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      window.location.href = '/login';
    }
  }, [isAdmin, authLoading]);

  useEffect(() => {
    if (supabase && isAdmin) {
      fetchOffers();
    }
  }, [isAdmin]);

  const fetchOffers = async () => {
    if (!supabase) return;

    const { data } = await supabase.
    from('special_offers').
    select('*').
    order('created_at', { ascending: false });

    setOffers(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!supabase) return;

    if (editing) {
      await supabase.
      from('special_offers').
      update(formData).
      eq('id', editing);
    } else {
      await supabase.
      from('special_offers').
      insert(formData);
    }

    setEditing(null);
    setShowNew(false);
    resetForm();
    fetchOffers();
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm('Angebot wirklich löschen?')) return;
    await supabase.from('special_offers').delete().eq('id', id);
    fetchOffers();
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    if (!supabase) return;
    await supabase.from('special_offers').update({ is_active: !currentState }).eq('id', id);
    fetchOffers();
  };

  const startEdit = (offer: Offer) => {
    setFormData({
      title: offer.title,
      description: offer.description,
      discount_percent: offer.discount_percent,
      valid_from: offer.valid_from,
      valid_until: offer.valid_until,
      min_nights: offer.min_nights,
      is_active: offer.is_active,
      for_returning_guests: offer.for_returning_guests
    });
    setEditing(offer.id);
    setShowNew(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      discount_percent: 10,
      valid_from: new Date().toISOString().split('T')[0],
      valid_until: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      min_nights: 2,
      is_active: true,
      for_returning_guests: true
    });
  };

  if (authLoading || loading) {
    return (
      <AdminLayout title="Angebote" subtitle="Exklusive Angebote für Stammgäste">
        <div data-ev-id="ev_d50faaf9db" className="min-h-[80vh] flex items-center justify-center">
          <div data-ev-id="ev_847accc06c" className="animate-pulse text-muted-foreground">Laden...</div>
        </div>
      </AdminLayout>);

  }

  return (
    <AdminLayout title="Angebote" subtitle="Exklusive Angebote für Stammgäste">
      <div data-ev-id="ev_ec18e3086e" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Dashboard
        </Link>

        <div data-ev-id="ev_0b289eec37" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div data-ev-id="ev_0a7623aabc">
            <h1 data-ev-id="ev_b2831f068e" className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Angebote für Wiederkommer
            </h1>
            <p data-ev-id="ev_ba099a2444" className="text-muted-foreground">Spezialangebote nur für Gäste mit vorherigem Aufenthalt</p>
          </div>
          <Button
            onClick={() => {setShowNew(true);setEditing(null);resetForm();}}
            className="gap-2 bg-secondary hover:bg-secondary/90">

            <Plus className="w-4 h-4" />
            Neues Angebot
          </Button>
        </div>

        {/* New/Edit Form */}
        {(showNew || editing) &&
        <Card className="mb-6 border-secondary">
            <CardHeader>
              <CardTitle>{editing ? 'Angebot bearbeiten' : 'Neues Angebot'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div data-ev-id="ev_07f9985f7a" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div data-ev-id="ev_ba84502818" className="md:col-span-2">
                  <label data-ev-id="ev_dd973c2fe1" className="block text-sm font-medium mb-1">Titel</label>
                  <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="z.B. Frühbucher-Rabatt" />

                </div>
                <div data-ev-id="ev_85de125e72" className="md:col-span-2">
                  <label data-ev-id="ev_c8274f5082" className="block text-sm font-medium mb-1">Beschreibung</label>
                  <textarea data-ev-id="ev_93ee76f740"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Beschreiben Sie das Angebot..."
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm" />

                </div>
                <div data-ev-id="ev_926942d279">
                  <label data-ev-id="ev_913d6ebdad" className="block text-sm font-medium mb-1">Rabatt (%)</label>
                  <Input
                  type="number"
                  min="1"
                  max="50"
                  value={formData.discount_percent}
                  onChange={(e) => setFormData({ ...formData, discount_percent: parseInt(e.target.value) || 0 })} />

                </div>
                <div data-ev-id="ev_6514dbd448">
                  <label data-ev-id="ev_926b067a3c" className="block text-sm font-medium mb-1">Mind. Nächte</label>
                  <Input
                  type="number"
                  min="1"
                  value={formData.min_nights}
                  onChange={(e) => setFormData({ ...formData, min_nights: parseInt(e.target.value) || 1 })} />

                </div>
                <div data-ev-id="ev_f329357f60">
                  <label data-ev-id="ev_626869e791" className="block text-sm font-medium mb-1">Gültig ab</label>
                  <Input
                  type="date"
                  value={formData.valid_from}
                  onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })} />

                </div>
                <div data-ev-id="ev_45dd234559">
                  <label data-ev-id="ev_d28f1810ee" className="block text-sm font-medium mb-1">Gültig bis</label>
                  <Input
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })} />

                </div>
                <div data-ev-id="ev_2c4347dc5b" className="md:col-span-2 flex items-center gap-4">
                  <label data-ev-id="ev_57f7e9ecdd" className="flex items-center gap-2">
                    <input data-ev-id="ev_7c97bc8919"
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded border-input" />

                    <span data-ev-id="ev_efc79eb013" className="text-sm">Aktiv</span>
                  </label>
                  <label data-ev-id="ev_ba4d640df5" className="flex items-center gap-2">
                    <input data-ev-id="ev_5358a583f5"
                  type="checkbox"
                  checked={formData.for_returning_guests}
                  onChange={(e) => setFormData({ ...formData, for_returning_guests: e.target.checked })}
                  className="rounded border-input" />

                    <span data-ev-id="ev_efa9c5a2c7" className="text-sm">Nur für Wiederkommer</span>
                  </label>
                </div>
              </div>
              <div data-ev-id="ev_f291deeaa4" className="flex gap-2 mt-4">
                <Button onClick={handleSave} className="gap-2 bg-secondary hover:bg-secondary/90">
                  <Save className="w-4 h-4" />
                  Speichern
                </Button>
                <Button variant="outline" onClick={() => {setShowNew(false);setEditing(null);}}>
                  <X className="w-4 h-4 mr-1" />
                  Abbrechen
                </Button>
              </div>
            </CardContent>
          </Card>
        }

        {/* Offers List */}
        <div data-ev-id="ev_5e1fcb2143" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((offer) =>
          <Card key={offer.id} className={`${!offer.is_active ? 'opacity-60' : ''}`}>
              <CardContent className="p-5">
                <div data-ev-id="ev_977afb3dc6" className="flex items-start justify-between mb-3">
                  <div data-ev-id="ev_885085bd19" className="flex items-center gap-3">
                    <div data-ev-id="ev_f120acedde" className={`w-12 h-12 rounded-xl flex items-center justify-center ${offer.is_active ? 'bg-secondary/10' : 'bg-muted'}`}>
                      <Percent className={`w-6 h-6 ${offer.is_active ? 'text-secondary' : 'text-muted-foreground'}`} />
                    </div>
                    <div data-ev-id="ev_1d053eb41d">
                      <p data-ev-id="ev_13ae48796d" className="font-semibold">{offer.title}</p>
                      <p data-ev-id="ev_705b989d9f" className="text-2xl font-bold text-secondary">{offer.discount_percent}% Rabatt</p>
                    </div>
                  </div>
                  <div data-ev-id="ev_bca1e06e52" className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => startEdit(offer)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(offer.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p data-ev-id="ev_03d429c2dd" className="text-sm text-muted-foreground mb-3">{offer.description}</p>

                <div data-ev-id="ev_01a264a37b" className="flex flex-wrap gap-2 text-xs">
                  <span data-ev-id="ev_9df6a9d143" className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                    <Calendar className="w-3 h-3" />
                    {formatDate(offer.valid_from, { day: '2-digit', month: 'short' })} - {formatDate(offer.valid_until, { day: '2-digit', month: 'short' })}
                  </span>
                  <span data-ev-id="ev_238d3b9613" className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                    <Tag className="w-3 h-3" />
                    Mind. {offer.min_nights} Nächte
                  </span>
                  {offer.for_returning_guests &&
                <span data-ev-id="ev_58b0dc6269" className="flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded">
                      <Users className="w-3 h-3" />
                      Nur Wiederkommer
                    </span>
                }
                </div>

                <div data-ev-id="ev_be8317cb23" className="mt-4 pt-3 border-t border-border">
                  <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleActive(offer.id, offer.is_active)}
                  className="w-full">

                    {offer.is_active ? 'Deaktivieren' : 'Aktivieren'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {offers.length === 0 && !showNew &&
        <div data-ev-id="ev_fa00f68ff2" className="text-center py-12 text-muted-foreground">
            <Percent className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p data-ev-id="ev_2480fe3829">Noch keine Angebote erstellt.</p>
            <Button
            onClick={() => {setShowNew(true);resetForm();}}
            variant="outline"
            className="mt-4">

              Erstes Angebot erstellen
            </Button>
          </div>
        }
      </div>
    </AdminLayout>);

}