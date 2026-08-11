import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import {
  Home, FileText, MessageSquare, FolderOpen,
  Gift, LogOut, Menu, X, Anchor } from
'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GuestLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const navItems = [
{ href: '/portal', label: 'Übersicht', icon: Home },
{ href: '/portal/vertrag', label: 'Mietvertrag', icon: FileText },
{ href: '/portal/nachrichten', label: 'Nachrichten', icon: MessageSquare },
{ href: '/portal/dokumente', label: 'Dokumente', icon: FolderOpen },
{ href: '/portal/angebote', label: 'Angebote', icon: Gift }];


export function GuestLayout({ children, title, subtitle }: GuestLayoutProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div data-ev-id="ev_edb2d600d8" className="min-h-screen bg-gradient-to-b from-[#f0f9f9] to-white">
      {/* Header */}
      <header data-ev-id="ev_38f2902215" className="bg-white/80 backdrop-blur-md border-b border-secondary/20 sticky top-0 z-50">
        <div data-ev-id="ev_121ddfe414" className="max-w-5xl mx-auto px-4">
          <div data-ev-id="ev_8310db96ac" className="flex items-center justify-between h-16">
            <div data-ev-id="ev_f84818984b" className="flex items-center gap-3">
              <div data-ev-id="ev_db68bfac6c" className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center shadow-md">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <div data-ev-id="ev_04ec678877">
                <h1 data-ev-id="ev_fc7a4744b3" className="text-primary font-display font-semibold">Mein Janeviz</h1>
                <p data-ev-id="ev_8a71783265" className="text-xs text-muted-foreground">Gästeportal</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav data-ev-id="ev_851f0c34b5" className="hidden md:flex items-center gap-1">
              {navItems.map((item) =>
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-secondary/10 transition-colors">

                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )}
            </nav>

            <div data-ev-id="ev_d3f2468e01" className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="hidden md:flex text-muted-foreground hover:text-primary">

                <LogOut className="w-4 h-4 mr-2" />
                Abmelden
              </Button>
              <button data-ev-id="ev_8cf724ac0e"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-secondary/10">

                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <div data-ev-id="ev_71ad79a956" className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            menuOpen ? 'max-h-80 pb-4' : 'max-h-0'
          )}>
            <nav data-ev-id="ev_aa076bd5db" className="flex flex-col gap-1 pt-2 border-t border-secondary/10">
              {navItems.map((item) =>
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/10 transition-colors">

                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )}
              <hr data-ev-id="ev_43b544fb3a" className="my-2 border-secondary/10" />
              <button data-ev-id="ev_ac8bbd5f38"
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors text-left">

                <LogOut className="w-5 h-5" />
                Abmelden
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div data-ev-id="ev_ca243de4bf" className="bg-gradient-to-r from-secondary/10 via-primary/5 to-accent/10 border-b border-secondary/10">
        <div data-ev-id="ev_91d54ccccd" className="max-w-5xl mx-auto px-4 py-8">
          <h2 data-ev-id="ev_b8e362a4eb" className="font-display text-2xl sm:text-3xl font-bold text-primary">{title}</h2>
          {subtitle && <p data-ev-id="ev_f983c3f76a" className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <main data-ev-id="ev_05b7cc069a" className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer data-ev-id="ev_473fa8a7f5" className="border-t border-secondary/10 bg-white/50">
        <div data-ev-id="ev_5106666604" className="max-w-5xl mx-auto px-4 py-6 text-center">
          <p data-ev-id="ev_c48128ed23" className="text-sm text-muted-foreground">
            🌊 Ferienhaus Janeviz • Ihr Zuhause am Meer
          </p>
        </div>
      </footer>
    </div>);

}