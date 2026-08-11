import { Link } from 'react-router';
import { Mail, Phone, MapPin, Waves, Anchor } from 'lucide-react';
import logo from '@/assets/uploads/logo-janeviz.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-ev-id="ev_aa9e421cac" className="bg-primary text-white">
      {/* Wave decoration */}
      <div data-ev-id="ev_522e886cc7" className="bg-background">
        <svg data-ev-id="ev_3fdb925d45" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path data-ev-id="ev_cf2fcea03d" d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 32.5C672 35 768 40 864 42.5C960 45 1056 45 1152 42.5C1248 40 1344 35 1392 32.5L1440 30V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z" fill="#1F3A5F" />
        </svg>
      </div>

      <div data-ev-id="ev_94fa0058b5" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div data-ev-id="ev_2250f4b69e" className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div data-ev-id="ev_3ab810755a" className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img data-ev-id="ev_6b3647f305" src={logo} alt="Ferienhaus Janeviz" className="h-16 w-auto" />
            </Link>
            <p data-ev-id="ev_08e519e274" className="text-white/70 text-sm leading-relaxed">
              Ihr gemütliches Urlaubszuhause an der Ostsee. Entspannen Sie in Jennewitz, 
              nur wenige Minuten vom Strand entfernt.
            </p>
          </div>

          {/* Quick Links */}
          <div data-ev-id="ev_5b94260bf8">
            <h3 data-ev-id="ev_a57d34ec92" className="font-display font-semibold mb-4 flex items-center gap-2">
              <Waves className="w-4 h-4 text-accent" />
              Seiten
            </h3>
            <ul data-ev-id="ev_cea477b2ca" className="flex flex-col gap-2 text-sm text-white/70">
              <li data-ev-id="ev_b53c524479">
                <Link to="/" className="hover:text-white transition-colors">Startseite</Link>
              </li>
              <li data-ev-id="ev_15025f9493">
                <Link to="/buchung" className="hover:text-white transition-colors">Verfügbarkeit & Buchung</Link>
              </li>
              <li data-ev-id="ev_44e37ae035">
                <Link to="/ausstattung" className="hover:text-white transition-colors">Ausstattung</Link>
              </li>
              <li data-ev-id="ev_b175406240">
                <Link to="/events" className="hover:text-white transition-colors">Events & Ausflüge</Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div data-ev-id="ev_82cde725c4">
            <h3 data-ev-id="ev_56331da11e" className="font-display font-semibold mb-4 flex items-center gap-2">
              <Anchor className="w-4 h-4 text-accent" />
              Informationen
            </h3>
            <ul data-ev-id="ev_d06b0f3179" className="flex flex-col gap-2 text-sm text-white/70">
              <li data-ev-id="ev_55ef82b4d5">
                <Link to="/hausordnung" className="hover:text-white transition-colors">Hausordnung</Link>
              </li>
              <li data-ev-id="ev_87ddddd79e">
                <Link to="/anreise" className="hover:text-white transition-colors">Anreise</Link>
              </li>
              <li data-ev-id="ev_dfc422e096">
                <Link to="/kontakt" className="hover:text-white transition-colors">Kontakt</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div data-ev-id="ev_94a99f333a">
            <h3 data-ev-id="ev_48ef5310c6" className="font-display font-semibold mb-4">Kontakt</h3>
            <ul data-ev-id="ev_2cba2ad6e2" className="flex flex-col gap-3 text-sm text-white/70">
              <li data-ev-id="ev_f688a2ac37" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span data-ev-id="ev_e563f6713d">Jennewitz bei Kühlungsborn</span>
              </li>
              <li data-ev-id="ev_42f22f6ed7" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a data-ev-id="ev_a8d9cad4ca" href="tel:+491234567890" className="hover:text-white transition-colors">
                  +49 123 456 7890
                </a>
              </li>
              <li data-ev-id="ev_ffe8d767bd" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a data-ev-id="ev_b5873b514d" href="mailto:info@janeviz.de" className="hover:text-white transition-colors">
                  info@janeviz.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr data-ev-id="ev_98a62259e3" className="my-8 border-white/20" />

        <div data-ev-id="ev_a7b98793da" className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p data-ev-id="ev_f3ccb931b6">© {currentYear} Ferienhaus Janeviz. Alle Rechte vorbehalten.</p>
          <div data-ev-id="ev_27fe09ec94" className="flex items-center gap-4">
            <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link to="/agb" className="hover:text-white transition-colors">AGB</Link>
          </div>
        </div>
      </div>
    </footer>);

}