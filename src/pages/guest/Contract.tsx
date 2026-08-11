import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { GuestLayout } from '@/components/layout/GuestLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/lib/utils';
import { FileText, Check, AlertCircle, ArrowLeft, PenTool } from 'lucide-react';

interface ContractData {
  id: string;
  booking_id: string;
  contract_data: {
    guest_name: string;
    guest_address: string;
    check_in: string;
    check_out: string;
    guests_count: number;
    total_price: number;
    house_rules_accepted: boolean;
  };
  signed_at: string | null;
}

export default function Contract() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [contract, setContract] = useState<ContractData | null>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [signatureText, setSignatureText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!supabase || !user) return;

    const fetchContract = async () => {
      const { data } = await supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setContract({
          ...data,
          contract_data: data.contract_data as ContractData['contract_data'],
        });
      }
      setLoading(false);
    };

    fetchContract();
  }, [user]);

  const handleSign = async () => {
    if (!supabase || !contract || !signatureText.trim()) return;

    setSigning(true);
    setError(null);

    try {
      const { error: updateError } = await supabase.
      from('contracts').
      update({
        signed_at: new Date().toISOString(),
        signature_data: signatureText,
        ip_address: 'client' // Would be set server-side in production
      }).
      eq('id', contract.id);

      if (updateError) throw updateError;

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Unterschreiben');
    } finally {
      setSigning(false);
    }
  };

  if (authLoading || loading) {
    return (
      <GuestLayout title="Mietvertrag" subtitle="Ihr Vertrag für den Aufenthalt">
        <div data-ev-id="ev_6b323f7483" className="min-h-[80vh] flex items-center justify-center">
          <div data-ev-id="ev_47e09577b7" className="animate-pulse text-muted-foreground">Laden...</div>
        </div>
      </GuestLayout>);

  }

  if (!contract) {
    return (
      <GuestLayout title="Mietvertrag" subtitle="Ihr Vertrag für den Aufenthalt">
        <div data-ev-id="ev_279ad558f2" className="max-w-2xl mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 data-ev-id="ev_886971b747" className="text-xl font-semibold mb-2">Kein Vertrag vorhanden</h2>
              <p data-ev-id="ev_40fd30e2f3" className="text-muted-foreground mb-4">
                Es gibt derzeit keinen Mietvertrag für Sie zum Unterschreiben.
              </p>
              <Link to="/portal">
                <Button variant="outline">Zurück zum Portal</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </GuestLayout>);

  }

  if (success || contract.signed_at) {
    return (
      <GuestLayout title="Mietvertrag" subtitle="Ihr Vertrag für den Aufenthalt">
        <div data-ev-id="ev_210908487c" className="max-w-2xl mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <Check className="w-16 h-16 mx-auto mb-4 text-success" />
              <h2 data-ev-id="ev_2aad6c4e08" className="text-xl font-semibold mb-2">Vertrag unterschrieben</h2>
              <p data-ev-id="ev_3bf0745843" className="text-muted-foreground mb-4">
                Der Mietvertrag wurde erfolgreich unterschrieben am{' '}
                {formatDate(contract.signed_at || new Date().toISOString())}.
              </p>
              <Link to="/portal">
                <Button variant="outline">Zurück zum Portal</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </GuestLayout>);

  }

  const contractData = contract.contract_data;

  return (
    <GuestLayout title="Mietvertrag" subtitle="Ihr Vertrag für den Aufenthalt">
      <div data-ev-id="ev_55decadc65" className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/portal" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Portal
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Mietvertrag
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Contract Content */}
            <div data-ev-id="ev_598966f9f2" className="prose prose-sm max-w-none">
              <h3 data-ev-id="ev_525d550ad9">Ferienhausmietvertrag</h3>
              
              <p data-ev-id="ev_5d1c203906"><strong data-ev-id="ev_b4e35e49a9">Vermieter:</strong> Ferienhaus GmbH</p>
              <p data-ev-id="ev_8ee1e93866"><strong data-ev-id="ev_82c809e53d">Mieter:</strong> {contractData.guest_name}</p>
              <p data-ev-id="ev_7c56ae1c2b"><strong data-ev-id="ev_a438001a6d">Adresse:</strong> {contractData.guest_address}</p>
              
              <h4 data-ev-id="ev_53d9144485">Mietdauer</h4>
              <p data-ev-id="ev_3712206a1a">
                Anreise: {formatDate(contractData.check_in)} ab 15:00 Uhr<br data-ev-id="ev_90227dde86" />
                Abreise: {formatDate(contractData.check_out)} bis 10:00 Uhr
              </p>
              
              <h4 data-ev-id="ev_8b260cd261">Personenanzahl</h4>
              <p data-ev-id="ev_777d627766">{contractData.guests_count} Person(en)</p>
              
              <h4 data-ev-id="ev_ae197d5810">Mietpreis</h4>
              <p data-ev-id="ev_eb11168d5d">Gesamtpreis: {contractData.total_price} EUR (inkl. Endreinigung, Bettwäsche, Handtücher)</p>
              
              <h4 data-ev-id="ev_b4fb7c7947">Hausordnung</h4>
              <ul data-ev-id="ev_20382a9878">
                <li data-ev-id="ev_5172a7c5e6">Nachtruhe von 22:00 bis 07:00 Uhr</li>
                <li data-ev-id="ev_a642e1ef13">Rauchen nur im Außenbereich gestattet</li>
                <li data-ev-id="ev_60a2975946">Haustiere nur nach vorheriger Absprache</li>
                <li data-ev-id="ev_af30afb43d">Mülltrennung nach lokalem System</li>
                <li data-ev-id="ev_1ac6057278">Parken nur auf dem zugewiesenen Stellplatz</li>
              </ul>
              
              <h4 data-ev-id="ev_84f1d361f8">Stornierungsbedingungen</h4>
              <ul data-ev-id="ev_cae39167c3">
                <li data-ev-id="ev_78fffaff6e">Bis 30 Tage vor Anreise: kostenlos</li>
                <li data-ev-id="ev_10dfa480df">Bis 14 Tage vor Anreise: 50% des Mietpreises</li>
                <li data-ev-id="ev_07d71eb2c2">Weniger als 14 Tage: 100% des Mietpreises</li>
              </ul>
            </div>

            <hr data-ev-id="ev_60d2ac7d3e" className="border-border" />

            {/* Signature Section */}
            <div data-ev-id="ev_b4dfc6dc4a">
              <h4 data-ev-id="ev_18c0eec54b" className="font-semibold mb-4 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-primary" />
                Digitale Unterschrift
              </h4>
              <p data-ev-id="ev_e42a2d17e0" className="text-sm text-muted-foreground mb-4">
                Mit Ihrer Unterschrift bestätigen Sie, dass Sie die Vertragsbedingungen 
                und die Hausordnung gelesen haben und akzeptieren.
              </p>
              
              <Input
                label="Vollständiger Name (als Unterschrift)"
                placeholder="Max Mustermann"
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)} />


              {error &&
              <div data-ev-id="ev_316f8bc8dd" className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md mt-4">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span data-ev-id="ev_ef67147acd">{error}</span>
                </div>
              }

              <Button
                onClick={handleSign}
                disabled={signing || !signatureText.trim()}
                className="w-full mt-4 gap-2">

                <PenTool className="w-4 h-4" />
                {signing ? 'Wird unterschrieben...' : 'Vertrag unterschreiben'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </GuestLayout>);

}