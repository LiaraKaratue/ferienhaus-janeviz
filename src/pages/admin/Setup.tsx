import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Check, AlertCircle, Lock } from 'lucide-react';

export default function AdminSetup() {
  const navigate = useNavigate();
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  // Check if admin already exists
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const checkAdmin = async () => {
      const { data, error } = await supabase.
      from('admin_users').
      select('id').
      limit(1);

      if (error) {
        console.error('Error checking admin:', error);
      }

      setHasAdmin((data ?? []).length > 0);
      setLoading(false);
    };

    checkAdmin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      return;
    }

    if (formData.password.length < 8) {
      setError('Passwort muss mindestens 8 Zeichen haben');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Benutzer konnte nicht erstellt werden');

      // 2. Add to admin_users table
      const { error: adminError } = await supabase.
      from('admin_users').
      insert({
        id: authData.user.id,
        email: formData.email,
        full_name: formData.fullName
      });

      if (adminError) throw adminError;

      setSuccess(true);

      // Redirect to admin after short delay
      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (err) {
      console.error('Setup error:', err);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout hideFooter>
        <div data-ev-id="ev_62ebf1235d" className="min-h-[80vh] flex items-center justify-center">
          <div data-ev-id="ev_7603cd93ec" className="animate-pulse text-muted-foreground">Laden...</div>
        </div>
      </Layout>);

  }

  // Admin already exists - show locked message
  if (hasAdmin) {
    return (
      <Layout hideFooter>
        <div data-ev-id="ev_213d2f0e39" className="min-h-[80vh] flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div data-ev-id="ev_e4a7ef0b94" className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h1 data-ev-id="ev_392488113b" className="text-xl font-bold mb-2">Einrichtung abgeschlossen</h1>
              <p data-ev-id="ev_ce2b3fc1c1" className="text-muted-foreground mb-6">
                Ein Administrator wurde bereits eingerichtet. 
                Bitte melde dich mit deinen Zugangsdaten an.
              </p>
              <Button onClick={() => navigate('/verwaltung')} className="w-full">
                Zum Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>);

  }

  // Success state
  if (success) {
    return (
      <Layout hideFooter>
        <div data-ev-id="ev_dec2f6a5b0" className="min-h-[80vh] flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div data-ev-id="ev_f33ba65c95" className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h1 data-ev-id="ev_53bfaac525" className="text-xl font-bold mb-2">Einrichtung erfolgreich!</h1>
              <p data-ev-id="ev_db1ac8bb6a" className="text-muted-foreground mb-4">
                Dein Admin-Konto wurde erstellt. Du wirst jetzt weitergeleitet...
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>);

  }

  // Setup form
  return (
    <Layout hideFooter>
      <div data-ev-id="ev_7df18fefe3" className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center pb-2">
            <div data-ev-id="ev_6429e1fcc0" className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Verwaltung einrichten</CardTitle>
            <p data-ev-id="ev_4f9dd59976" className="text-muted-foreground text-sm mt-2">
              Erstelle dein Admin-Konto für die Ferienhausverwaltung
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form data-ev-id="ev_ff0ea03793" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Dein Name"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Max Mustermann"
                required />

              
              <Input
                label="E-Mail-Adresse"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="deine@email.de"
                required />

              
              <Input
                label="Passwort"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Mindestens 8 Zeichen"
                required />

              
              <Input
                label="Passwort bestätigen"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Passwort wiederholen"
                required />


              {error &&
              <div data-ev-id="ev_abcc439a55" className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span data-ev-id="ev_759d554ced">{error}</span>
                </div>
              }

              <Button type="submit" disabled={submitting} className="w-full mt-2">
                {submitting ? 'Wird eingerichtet...' : 'Admin-Konto erstellen'}
              </Button>

              <p data-ev-id="ev_06799695f6" className="text-xs text-muted-foreground text-center">
                🔒 Diese Seite ist nur einmal nutzbar. Nach der Einrichtung 
                ist sie gesperrt.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>);

}