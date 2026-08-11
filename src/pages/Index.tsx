import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { PricingPreview } from '@/components/home/PricingPreview';
import { Star, Quote, CalendarDays, Waves, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';

const testimonials = [
{
  id: 1,
  name: 'Familie Müller',
  location: 'München',
  rating: 5,
  text: 'Ein wunderschönes Ferienhaus! Die Ausstattung war perfekt und die Lage ideal zum Wandern. Wir kommen gerne wieder!'
},
{
  id: 2,
  name: 'Thomas & Sandra',
  location: 'Hamburg',
  rating: 5,
  text: 'Sehr sauber, toll eingerichtet und super nette Vermieter. Die Kommunikation war unkompliziert und schnell.'
},
{
  id: 3,
  name: 'Familie Schmidt',
  location: 'Berlin',
  rating: 5,
  text: 'Perfekt für Familien mit Kindern! Großer Garten, ruhige Lage und alles was man braucht. Top!'
}];


export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Pricing Preview */}
      <PricingPreview />

      {/* Testimonials Section */}
      <section data-ev-id="ev_e70767c1de" className="py-20 bg-background">
        <div data-ev-id="ev_67e39ba6d3" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_cc82b39928" className="text-center mb-14">
            <div data-ev-id="ev_044a746f1d" className="inline-flex items-center gap-2 bg-accent/30 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Gästebewertungen
            </div>
            <h2 data-ev-id="ev_aeec990282" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Das sagen unsere Gäste
            </h2>
            <p data-ev-id="ev_913a3befee" className="text-muted-foreground max-w-2xl mx-auto">
              Über 50 zufriedene Urlauber – lesen Sie ihre Erfahrungen
            </p>
          </div>

          <div data-ev-id="ev_9dc05db600" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) =>
            <div data-ev-id="ev_84eab0f9a2"
            key={testimonial.id}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">

                <Quote className="w-10 h-10 text-secondary/30 mb-4" />
                <p data-ev-id="ev_ee3510b16e" className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div data-ev-id="ev_1289de6482" className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) =>
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                )}
                </div>
                <div data-ev-id="ev_a5ada9b8eb">
                  <p data-ev-id="ev_6ff8f8d93a" className="font-semibold text-foreground">{testimonial.name}</p>
                  <p data-ev-id="ev_2416a5b5e4" className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-ev-id="ev_876667220e" className="relative py-24 overflow-hidden">
        {/* Background with gradient */}
        <div data-ev-id="ev_b4d162f280" className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary" />
        
        {/* Decorative waves */}
        <div data-ev-id="ev_3cd6a3f291" className="absolute inset-0 opacity-10">
          <svg data-ev-id="ev_a20d8090a3" className="absolute top-0 left-0 w-full" viewBox="0 0 1440 200" fill="none">
            <path data-ev-id="ev_267fc44d98" d="M0 100L60 108.3C120 116.7 240 133.3 360 133.3C480 133.3 600 116.7 720 108.3C840 100 960 100 1080 108.3C1200 116.7 1320 133.3 1380 141.7L1440 150V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V100Z" fill="white" />
          </svg>
          <svg data-ev-id="ev_d4e4a9ab4a" className="absolute bottom-0 left-0 w-full rotate-180" viewBox="0 0 1440 200" fill="none">
            <path data-ev-id="ev_3dfc3cc2d0" d="M0 100L60 108.3C120 116.7 240 133.3 360 133.3C480 133.3 600 116.7 720 108.3C840 100 960 100 1080 108.3C1200 116.7 1320 133.3 1380 141.7L1440 150V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V100Z" fill="white" />
          </svg>
        </div>
        
        <div data-ev-id="ev_28174bbcd7" className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Waves className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 data-ev-id="ev_3f58ac89e6" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Bereit für Ihren Traumurlaub?
          </h2>
          <p data-ev-id="ev_2ba7130fea" className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
            Buchen Sie jetzt Ihr Ostsee-Erlebnis und genießen Sie unvergessliche Tage 
            im Ferienhaus Janeviz.
          </p>
          <Link to="/buchung">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-semibold gap-2">
              <CalendarDays className="w-5 h-5" />
              Jetzt Verfügbarkeit prüfen
            </Button>
          </Link>
        </div>
      </section>
    </Layout>);

}