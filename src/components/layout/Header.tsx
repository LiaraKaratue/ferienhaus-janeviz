import { Link } from 'react-router';
import { Menu, X, Home, CalendarDays, Info, Phone, User, Calendar, Anchor } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import logo from '@/assets/uploads/logo-janeviz.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, isGuest } = useAuth();

  const navLinks = [
  { href: '/', label: 'Startseite', icon: Home },
  { href: '/buchung', label: 'Buchen', icon: CalendarDays },
  { href: '/ausstattung', label: 'Ausstattung', icon: Anchor },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/kontakt', label: 'Kontakt', icon: Phone }];


  return (
    <header data-ev-id="ev_90f36cabea" className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border shadow-sm">
      <div data-ev-id="ev_a72d2746fd" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-ev-id="ev_32ef1b7335" className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img data-ev-id="ev_f578212350" src="/src/assets/uploads/56ca3c08-5331-4756-9408-dc326ca09457.jpeg"

            alt="Ferienhaus Janeviz" className="w-auto h-12" />


          </Link>

          {/* Desktop Navigation */}
          <nav data-ev-id="ev_9dd231acd0" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
            <Link
              key={link.href}
              to={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-colors">

                {link.label}
              </Link>
            )}
          </nav>

          {/* Auth / Portal Links - nur für eingeloggte User sichtbar */}
          <div data-ev-id="ev_a2f2d5d9eb" className="hidden md:flex items-center gap-3">
            {user &&
            <Link
              to={isAdmin ? '/admin' : '/portal'}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">

                <User className="w-4 h-4" />
                {isAdmin ? 'Verwaltung' : 'Mein Bereich'}
              </Link>
            }
            <Link
              to="/buchung"
              className="bg-secondary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-secondary/90 transition-colors">

              Jetzt buchen
            </Link>
          </div>

          {/* Mobile menu button */}
          <button data-ev-id="ev_0d9d9e6c0f"
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menü">

            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div data-ev-id="ev_e934079f29"
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        )}>

          <nav data-ev-id="ev_9661b3c19a" className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) =>
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">

                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            )}
            <hr data-ev-id="ev_b37067a6f9" className="my-2 border-border" />
            {user &&
            <Link
              to={isAdmin ? '/admin' : '/portal'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-primary hover:bg-muted transition-colors">

                <User className="w-5 h-5" />
                {isAdmin ? 'Verwaltung' : 'Mein Bereich'}
              </Link>
            }
            <Link
              to="/buchung"
              onClick={() => setMobileMenuOpen(false)}
              className="mx-3 mt-2 bg-secondary text-white px-4 py-3 rounded-full text-sm font-medium text-center hover:bg-secondary/90 transition-colors">

              Jetzt buchen
            </Link>
          </nav>
        </div>
      </div>
    </header>);

}