import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, AlertCircle, Home } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, isAdmin, isGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Redirect based on user role
    if (isAdmin) {
      navigate('/admin');
    } else if (isGuest) {
      navigate('/portal');
    } else {
      navigate('/');
    }
  };

  return (
    <Layout hideFooter>
      <div data-ev-id="ev_9842197934" className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div data-ev-id="ev_f987c368ad" className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Anmelden</CardTitle>
            <CardDescription>
              Melden Sie sich an, um auf Ihr Gästeportal oder den Admin-Bereich zuzugreifen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form data-ev-id="ev_be1bb2e611" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div data-ev-id="ev_7fe05fac9a" className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input data-ev-id="ev_a361020b2f"
                type="email"
                placeholder="E-Mail-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />

              </div>
              <div data-ev-id="ev_a23315d0a3" className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input data-ev-id="ev_7f0b21bb51"
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />

              </div>

              {error &&
              <div data-ev-id="ev_f045dd2383" className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span data-ev-id="ev_292b880bc0">{error}</span>
                </div>
              }

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Wird angemeldet...' : 'Anmelden'}
              </Button>
            </form>

            <div data-ev-id="ev_88a8b85a8f" className="mt-6 text-center text-sm text-muted-foreground">
              <p data-ev-id="ev_82b492ff40">
                Sie haben eine Buchung aber noch kein Konto?{' '}
                <Link to="/kontakt" className="text-primary hover:underline">
                  Kontaktieren Sie uns
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>);

}