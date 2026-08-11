import { Link } from 'react-router';
import { CalendarDays, Star, MapPin, Users, Waves, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import heroImage from '@/assets/uploads/aussenansicht-birken.jpg';

export function HeroSection() {
  return (
    <section data-ev-id="ev_d798761873" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div data-ev-id="ev_89f89e666c" className="absolute inset-0">
        <img data-ev-id="ev_3480b54c23"
        src={heroImage}
        alt="Ferienhaus Janeviz mit großen Birken im Frühling"
        className="w-full h-full object-cover" />

        {/* Elegant gradient overlay */}
        <div data-ev-id="ev_1e5445bd3b" className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-secondary/50" />
        
        {/* Decorative pattern overlay */}
        <div data-ev-id="ev_c56a53a117" className="absolute inset-0 opacity-5">
          <svg data-ev-id="ev_71f77672c7" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs data-ev-id="ev_c3cee0d78d">
              <pattern data-ev-id="ev_07d9256d5d" id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                <path data-ev-id="ev_2af613ffcc" d="M0 10 Q25 0 50 10 T100 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect data-ev-id="ev_156a54b4cf" width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>
      </div>

      {/* Decorative sand-colored accent bar */}
      <div data-ev-id="ev_ccbbdb0b05" className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/80 to-transparent" />

      {/* Decorative Wave Bottom with multiple layers */}
      <div data-ev-id="ev_bb2827f595" className="absolute bottom-0 left-0 right-0 z-10">
        {/* Back wave - teal accent */}
        <svg data-ev-id="ev_d6b487b9b3" viewBox="0 0 1440 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto absolute bottom-0">
          <path data-ev-id="ev_670cf9880d" d="M0 140L48 125C96 110 192 80 288 70C384 60 480 70 576 77.5C672 85 768 90 864 87.5C960 85 1056 75 1152 72.5C1248 70 1344 75 1392 77.5L1440 80V140H0Z" fill="#2FA4A9" fillOpacity="0.3" />
        </svg>
        {/* Middle wave - sand accent */}
        <svg data-ev-id="ev_082f80da56" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto absolute bottom-0">
          <path data-ev-id="ev_dcf02c0aca" d="M0 120L60 108C120 96 240 72 360 60C480 48 600 48 720 54C840 60 960 72 1080 78C1200 84 1320 84 1380 84L1440 84V120H0Z" fill="#D6B98C" fillOpacity="0.4" />
        </svg>
        {/* Front wave - background color */}
        <svg data-ev-id="ev_1f81be5066" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto relative">
          <path data-ev-id="ev_f0204aa70f" d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" fill="#F5F3EF" />
        </svg>
      </div>
      
      <div data-ev-id="ev_b486a7c1fd" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div data-ev-id="ev_4ca2cb21eb" className="max-w-2xl">
          {/* Elegant top accent */}
          <div data-ev-id="ev_856b269683" className="flex items-center gap-3 mb-6">
            <div data-ev-id="ev_4229da161d" className="h-px w-12 bg-accent" />
            <Anchor className="w-5 h-5 text-accent" />
            <span data-ev-id="ev_6ad0265188" className="text-accent font-medium tracking-widest text-xs uppercase">Ostsee · Jennewitz</span>
          </div>

          {/* Rating Badge */}
          <div data-ev-id="ev_8612fbccb2" className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 px-4 py-2 rounded-full mb-6">
            <div data-ev-id="ev_4eb08654d5" className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) =>
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              )}
            </div>
            <span data-ev-id="ev_e7785cc756" className="text-sm font-medium text-white">4.9 von 5 Sternen</span>
          </div>

          <h1 data-ev-id="ev_b3741ef87d" className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
            Ferienhaus
            <span data-ev-id="ev_f331a76350" className="block text-accent">Janeviz</span>
          </h1>
          
          <p data-ev-id="ev_7ab2c26438" className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
            Ihr idyllisches Urlaubszuhause – nur 16 Minuten vom Strand in Kühlungsborn. 
            Entspannen Sie unter alten Birken an der Ostsee.
          </p>

          {/* Quick Info Pills */}
          <div data-ev-id="ev_c38247d53e" className="flex flex-wrap items-center gap-3 mb-10">
            <div data-ev-id="ev_61a45fcba3" className="flex items-center gap-2 text-sm text-white bg-secondary/40 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/30">
              <MapPin className="w-4 h-4 text-accent" />
              <span data-ev-id="ev_69fae55f72">Jennewitz bei Kühlungsborn</span>
            </div>
            <div data-ev-id="ev_5e6b0663fc" className="flex items-center gap-2 text-sm text-white bg-secondary/40 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/30">
              <Users className="w-4 h-4 text-accent" />
              <span data-ev-id="ev_0ead9f5e8f">Bis zu 4 Gäste</span>
            </div>
            <div data-ev-id="ev_17d735468c" className="flex items-center gap-2 text-sm text-white bg-secondary/40 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/30">
              <Waves className="w-4 h-4 text-accent" />
              <span data-ev-id="ev_fce0fe00db">16 Min. zum Strand</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div data-ev-id="ev_d809033082" className="flex flex-wrap gap-4">
            <Link to="/buchung">
              <Button size="lg" className="gap-2 bg-accent text-primary hover:bg-accent/90 font-semibold shadow-lg shadow-accent/25 px-8">
                <CalendarDays className="w-5 h-5" />
                Verfügbarkeit prüfen
              </Button>
            </Link>
            <Link to="/ausstattung">
              <Button variant="outline" size="lg" className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-8">
                Haus entdecken
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative side element */}
      <div data-ev-id="ev_f529287c4e" className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-accent to-transparent" />
    </section>);

}